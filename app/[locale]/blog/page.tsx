import { getAllPosts } from "@/lib/blog";
import { urlFor } from "@/lib/sanity";

export default async function BlogPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const posts = await getAllPosts(locale);

  return (
    <main>
      <h1>Блог</h1>
      <p>Постів: {posts.length}</p>
      <ul>
        {posts.map((post) => (
          <li key={post._id}>
            {post.mainImage && (
              <img
                src={urlFor(post.mainImage).width(400).height(225).fit("crop").url()}
                alt={post.mainImage.alt ?? post.title}
                width={400}
                height={225}
              />
            )}
            <strong>{post.title}</strong> — {post.publishedAt}
            <p>{post.excerpt}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
