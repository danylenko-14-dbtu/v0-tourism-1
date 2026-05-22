import { BlogGrid } from "@/components/blog/BlogGrid";
import { MOCK_POSTS } from "@/mocks/mockPosts";

export const metadata = {
  title: "Blog Grid Preview",
  robots: { index: false, follow: false },
};

export default function BlogPreviewPage() {
  return (
    <main className="bg-background">
      <BlogGrid posts={MOCK_POSTS} locale="uk" />
    </main>
  );
}
