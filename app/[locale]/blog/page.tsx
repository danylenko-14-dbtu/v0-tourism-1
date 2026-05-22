import { getAllPosts } from "@/lib/blog";
import { BlogGrid } from "@/components/blog/BlogGrid";

const BLOG_POSTS_LIMIT = 7;

function asDisplayString(value: unknown) {
  return typeof value === "string" ? value : undefined;
}

export default async function BlogPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const normalizedLocale = locale === "en" ? "en" : "uk";
  const posts = await getAllPosts(normalizedLocale, { limit: BLOG_POSTS_LIMIT });

  const postsForDisplay = posts.map((post) => ({
    _id: post._id,
    title: post.title,
    href: `/${normalizedLocale}/blog/${post.slug.current}`,
    mainImage: post.mainImage,
    categoryLabel: asDisplayString(post.categories?.[0]?.title),
    formattedDate: new Date(post.publishedAt).toLocaleDateString(
      normalizedLocale === "uk" ? "uk-UA" : "en-US",
      { year: "numeric", month: "long", day: "numeric" }
    ),
    excerpt: post.excerpt,
  }));

  return (
    <main className="bg-background">
      <BlogGrid posts={postsForDisplay} locale={normalizedLocale} />
    </main>
  );
}
