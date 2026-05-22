import { BlogGrid } from "@/components/blog/BlogGrid";
import { MOCK_POSTS } from "@/mocks/mockPosts";

export const metadata = {
  title: "Blog Grid Preview",
  robots: { index: false, follow: false },
};

export default async function BlogPreviewPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const normalizedLocale = locale === "en" ? "en" : "uk";
  return (
    <main className="bg-background">
      <BlogGrid posts={MOCK_POSTS} locale={normalizedLocale} />
    </main>
  );
}
