import {
  sanityClient,
  ALL_POSTS_QUERY,
  POST_BY_SLUG_QUERY,
  RECENT_POST_SLUGS_QUERY,
  BLOG_POSTS_TAG,
  type PostListItem,
  type PostFull,
} from "./sanity";

interface GetAllPostsOptions {
  limit?: number;
}

export async function getAllPosts(
  locale: string,
  { limit = 7 }: GetAllPostsOptions = {}
): Promise<PostListItem[]> {
  return sanityClient.fetch(
    ALL_POSTS_QUERY,
    { locale, limit },
    { next: { tags: [BLOG_POSTS_TAG] } }
  );
}

export async function getPostBySlug(
  locale: string,
  slug: string
): Promise<PostFull | null> {
  return sanityClient.fetch(
    POST_BY_SLUG_QUERY,
    { locale, slug },
    { next: { tags: [BLOG_POSTS_TAG] } }
  );
}

export async function getRecentPostSlugs(limit = 20): Promise<string[]> {
  const result = await sanityClient.fetch<Array<{ slug: string }>>(
    RECENT_POST_SLUGS_QUERY,
    { limit },
    { next: { tags: [BLOG_POSTS_TAG] } }
  );
  return result.map((r) => r.slug).filter(Boolean);
}

export function asDisplayString(
  value: unknown,
  locale: "uk" | "en"
): string | undefined {
  if (typeof value === "string") return value;
  if (value && typeof value === "object") {
    const obj = value as Record<string, unknown>;
    const pick = (k: string) =>
      typeof obj[k] === "string" ? (obj[k] as string) : undefined;
    return pick(locale) ?? pick("uk") ?? pick("en");
  }
  return undefined;
}
