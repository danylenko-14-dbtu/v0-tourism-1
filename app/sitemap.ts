import { MetadataRoute } from "next";
import { locales } from "@/lib/i18n";
import { serverEnv } from "@/lib/env";
import { getAllPosts } from "@/lib/blog";

const { siteUrl } = serverEnv;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages = ["", "/about-us", "/program", "/blog", "/contacts", "/faq"];

  const staticPageEntries = locales.flatMap((locale) =>
    staticPages.map((page) => ({
      url: `${siteUrl}/${locale}${page}`,
      lastModified: new Date(),
      changeFrequency: page === "/blog" ? ("weekly" as const) : ("monthly" as const),
      priority: getStaticPagePriority(page),
    }))
  );

  const [ukPosts, enPosts] = await Promise.all([
    getAllPosts("uk", { limit: 1000 }),
    getAllPosts("en", { limit: 1000 }),
  ]);

  const ukPostEntries = ukPosts.flatMap((post) => {
    const slug = post.slug?.current;
    if (!slug) return [];

    return [
      {
        url: `${siteUrl}/uk/blog/${slug}`,
        lastModified: post.publishedAt ? new Date(post.publishedAt) : new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.7,
      },
    ];
  });

  const enPostEntries = enPosts.flatMap((post) => {
    const slug = post.slug?.current;
    if (!slug) return [];

    return [
      {
        url: `${siteUrl}/en/blog/${slug}`,
        lastModified: post.publishedAt ? new Date(post.publishedAt) : new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.7,
      },
    ];
  });

  return [...staticPageEntries, ...ukPostEntries, ...enPostEntries];
}

function getStaticPagePriority(page: string) {
  if (page === "") return 1;
  if (page === "/contacts") return 0.9;
  if (page === "/program") return 0.9;
  return 0.8;
}
