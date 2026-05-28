import { getAllPosts, asDisplayString } from "@/lib/blog";
import { BlogGrid } from "@/components/blog/BlogGrid";

export const revalidate = 3600;

const BLOG_POSTS_LIMIT = 7;

export default async function BlogPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const normalizedLocale = locale === "en" ? "en" : "uk";
  const posts = await getAllPosts(normalizedLocale, { limit: BLOG_POSTS_LIMIT });

  const postsForDisplay = posts.flatMap((post) => {
    const slug = post.slug?.current;
    if (!slug) return [];

    return {
      _id: post._id,
      title: asDisplayString(post.title, normalizedLocale) ?? "",
      href: `/${normalizedLocale}/blog/${slug}`,
      mainImage: post.mainImage,
      categoryLabel: asDisplayString(post.categories?.[0]?.title, normalizedLocale),
      formattedDate: new Date(post.publishedAt).toLocaleDateString(
        normalizedLocale === "uk" ? "uk-UA" : "en-US",
        { year: "numeric", month: "long", day: "numeric" }
      ),
      excerpt: asDisplayString(post.excerpt, normalizedLocale) ?? "",
    };
  });

  return (
    <main className="bg-background">
      <BlogGrid posts={postsForDisplay} locale={normalizedLocale} />
    </main>
  );
}
