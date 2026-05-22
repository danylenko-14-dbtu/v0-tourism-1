import { createClient } from "@sanity/client";
import { createImageUrlBuilder, SanityImageSource } from "@sanity/image-url";

export interface PostListItem {
  _id: string;
  title: string;
  slug?: { current?: string };
  excerpt: string;
  publishedAt: string;
  categories?: Array<{
    _id: string;
    title: string;
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

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;

export const sanityClient = projectId
  ? createClient({
      projectId,
      dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
      apiVersion: "2026-05-02",
      useCdn: false,
    })
  : null;

function assertSanityClient(): NonNullable<typeof sanityClient> {
  if (!sanityClient) {
    throw new Error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID");
  }
  return sanityClient;
}

// Image URL builder
const builder = sanityClient ? createImageUrlBuilder(sanityClient) : null;
export function urlFor(source: SanityImageSource) {
  if (!builder) {
    throw new Error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID");
  }
  return builder.image(source);
}

export function buildImageUrl(
  source: PostListItem["mainImage"],
  width: number,
  height: number
): string | undefined {
  if (!source?.asset || !builder) return undefined;
  return builder
    .image(source)
    .width(width)
    .height(height)
    .fit("crop")
    .auto("format")
    .url();
}

export { assertSanityClient };

export const BLOG_POSTS_TAG = "blog-posts";

export const ALL_POSTS_QUERY = `
  *[_type == "post" && language == $locale && !(_id in path("drafts.**"))]
  | order(publishedAt desc) [0...$limit] {
    _id, title, slug, excerpt, publishedAt,
    categories[]-> {
      _id,
      "title": select(
        defined(title[$locale]) => title[$locale],
        defined(title.uk) => title.uk,
        defined(title.en) => title.en,
        title
      )
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
