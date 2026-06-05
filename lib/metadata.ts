import type { Metadata } from "next";
import { getDictionary, type Dictionary } from "@/lib/dictionaries";
import { locales, type Locale } from "@/lib/i18n";
import { serverEnv } from "@/lib/env";

interface GeneratePageMetadataOptions {
  locale: string;
  route: `/${string}`;
  getTitle: (dictionary: Dictionary) => string;
  getDescription: (dictionary: Dictionary) => string;
}

const siteOrigin = serverEnv.siteUrl.replace(/\/$/, "");

export async function generatePageMetadata({
  locale,
  route,
  getTitle,
  getDescription,
}: GeneratePageMetadataOptions): Promise<Metadata> {
  if (!locales.includes(locale as Locale)) {
    return {};
  }

  const typedLocale = locale as Locale;
  const dictionary = await getDictionary(typedLocale);
  const path = `/${typedLocale}${route}`;
  const url = `${siteOrigin}${path}`;
  const ogImage = `${siteOrigin}${typedLocale === "uk" ? "/og_image_uk.jpg" : "/og_image_en.jpg"}`;
  const title = getTitle(dictionary);
  const description = getDescription(dictionary);

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        uk: `${siteOrigin}/uk${route}`,
        en: `${siteOrigin}/en${route}`,
        "x-default": `${siteOrigin}/uk${route}`,
      },
    },
    openGraph: {
      title,
      description,
      url,
      type: "website",
      images: [{ url: ogImage, width: 1200, height: 630 }],
    },
  };
}
