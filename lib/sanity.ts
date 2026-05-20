import { createClient } from "@sanity/client";
import { createImageUrlBuilder, SanityImageSource } from "@sanity/image-url";

export interface PostListItem {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt: string;
  publishedAt: string;
  mainImage?: {
    asset: { _ref: string; _type: "reference" };
    alt?: string;
  };
}

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;

if (!projectId) throw new Error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID");

export const sanityClient = createClient({
  projectId,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  apiVersion: "2026-05-02",
  useCdn: true,
});

// Image URL builder
const builder = createImageUrlBuilder(sanityClient);
export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

export const ALL_POSTS_QUERY = `
  *[_type == "post" && language == $locale && draft != true]
  | order(publishedAt desc) {
    _id, title, slug, excerpt, publishedAt,
    mainImage { asset, alt }
  }
`;
