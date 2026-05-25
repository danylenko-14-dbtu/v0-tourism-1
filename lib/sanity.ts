import { createClient } from "@sanity/client";
import { createImageUrlBuilder, SanityImageSource } from "@sanity/image-url";

export type LocalizedString = string | { uk?: string; en?: string };

export interface PostListItem {
  _id: string;
  title: string;
  slug?: { current?: string };
  excerpt: string;
  publishedAt: string;
  categories?: Array<{
    _id: string;
    title: LocalizedString;
  }>;
  mainImage?: {
    asset: { _ref: string; _type: "reference" };
    metadata?: {
      lqip?: string;
      dimensions?: {
        width?: number;
        height?: number;
      };
    };
    alt?: string;
    hotspot?: {
      x: number;
      y: number;
      height?: number;
      width?: number;
    };
    crop?: object;
  };
}

export interface PostBodySpan {
  _type: "span";
  _key: string;
  text: string;
  marks?: string[];
}

export interface PostBodyBlock {
  _type: "block";
  _key: string;
  style?: string;
  listItem?: "bullet" | "number";
  markDefs?: unknown[];
  children: PostBodySpan[];
}

export interface PostBodyImage {
  _type: "image";
  _key: string;
  asset: { _type: "reference"; _ref?: string; url?: string };
  alt?: string;
}

export type PostBodyNode = PostBodyBlock | PostBodyImage;

export interface PostFull extends PostListItem {
  body: PostBodyNode[];
  author?: {
    _id?: string;
    name?: string;
    role?: LocalizedString;
    avatarUrl?: string;
  };
}

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;

if (!projectId) throw new Error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID");

export const sanityClient = createClient({
  projectId,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  apiVersion: "2026-05-02",
  useCdn: false,
});

// Image URL builder
const builder = createImageUrlBuilder(sanityClient);
export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

export function buildImageUrl(
  source: PostListItem["mainImage"],
  width: number,
  height: number
): string | undefined {
  if (!source?.asset) return undefined;
  return urlFor(source)
    .width(width)
    .height(height)
    .fit("crop")
    .auto("format")
    .url();
}

export const BLOG_POSTS_TAG = "blog-posts";

export const ALL_POSTS_QUERY = `
  *[_type == "post" && language == $locale && !(_id in path("drafts.**"))]
  | order(publishedAt desc) [0...$limit] {
    _id, title, slug, excerpt, publishedAt,
    categories[]-> {
      _id,
      title
    },
    mainImage {
      asset,
      "metadata": asset->metadata { lqip, dimensions { width, height } },
      alt,
      hotspot,
      crop
    }
  }
`;

export const POST_BY_SLUG_QUERY = `
  *[_type == "post" && language == $locale && slug.current == $slug && !(_id in path("drafts.**"))][0] {
    _id, title, slug, excerpt, publishedAt,
    categories[]-> {
      _id,
      title
    },
    mainImage {
      asset,
      "metadata": asset->metadata { lqip, dimensions { width, height } },
      alt,
      hotspot,
      crop
    },
    body[]{
      ...,
      _type == "image" => {
        ...,
        "asset": asset->{ _type, _ref, "url": url }
      }
    },
    "author": author->{
      _id,
      "name": coalesce(name, fullName),
      role,
      "avatarUrl": image.asset->url
    }
  }
`;

export const RECENT_POST_SLUGS_QUERY = `
  *[_type == "post" && defined(slug.current) && !(_id in path("drafts.**"))]
  | order(publishedAt desc) [0...$limit] {
    "slug": slug.current
  }
`;
