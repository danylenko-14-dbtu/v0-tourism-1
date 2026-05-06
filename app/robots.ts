import { MetadataRoute } from "next";
import { serverEnv } from "@/lib/env";

const { siteUrl } = serverEnv;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
