import { MetadataRoute } from "next";
import { locales } from "@/lib/i18n";
import { serverEnv } from "@/lib/env";

const { siteUrl } = serverEnv;

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = ["", "/faq"];

  return locales.flatMap((locale) =>
    staticPages.map((page) => ({
      url: `${siteUrl}/${locale}${page}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: page === "" ? 1 : 0.8,
    }))
  );
}
