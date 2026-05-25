import { getAllPosts, asDisplayString } from "@/lib/blog";
import { BlogGrid } from "@/components/blog/BlogGrid";

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
      title: post.title,
      href: `/${normalizedLocale}/blog/${slug}`,
      mainImage: post.mainImage,
      categoryLabel: asDisplayString(post.categories?.[0]?.title, normalizedLocale),
      formattedDate: new Date(post.publishedAt).toLocaleDateString(
        normalizedLocale === "uk" ? "uk-UA" : "en-US",
        { year: "numeric", month: "long", day: "numeric" }
      ),
      excerpt: post.excerpt,
    };
  });

  return (
    <main className="bg-background">
      <BlogGrid posts={postsForDisplay} locale={normalizedLocale} />
    </main>
  );
}
