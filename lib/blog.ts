import { sanityClient, ALL_POSTS_QUERY, BLOG_POSTS_TAG, type PostListItem } from "./sanity";

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
