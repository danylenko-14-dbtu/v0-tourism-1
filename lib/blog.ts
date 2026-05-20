import { sanityClient, ALL_POSTS_QUERY, type PostListItem } from "./sanity";

export async function getAllPosts(locale: string): Promise<PostListItem[]> {
  return sanityClient.fetch(ALL_POSTS_QUERY, { locale });
}
