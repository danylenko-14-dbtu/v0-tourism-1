import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getDictionary } from "@/lib/dictionaries";
import { locales, type Locale } from "@/lib/i18n";
import { FAQ } from "@/components/sections/faq";
import { serverEnv } from "@/lib/env";

interface FAQPageProps {
  params: Promise<{ locale: string }>;
}

const { siteUrl } = serverEnv;

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  if (!locales.includes(locale as Locale)) {
    return {};
  }

  const dictionary = await getDictionary(locale as Locale);
  const ogImage = locale === "uk" ? "/og_image_uk.jpg" : "/og_image_en.jpg";

  return {
    title: `${dictionary.faq.title} — ${dictionary.brand.name}`,
    description: dictionary.faq.subtitle,

    alternates: {
      canonical: `${siteUrl}/${locale}/faq`,
      languages: {
        uk: `${siteUrl}/uk/faq`,
        en: `${siteUrl}/en/faq`,
        "x-default": `${siteUrl}/uk/faq`,
      },
    },

    openGraph: {
      title: `${dictionary.faq.title} — ${dictionary.brand.name}`,
      description: dictionary.faq.subtitle,
      url: `${siteUrl}/${locale}/faq`,
      type: "website",
      images: [{ url: ogImage, width: 1200, height: 630 }],
    },
  };
}

export default async function FAQPage({ params }: FAQPageProps) {
  const { locale } = await params;

  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  const typedLocale = locale as Locale;
  const dictionary = await getDictionary(typedLocale);

  return (
    <main className="flex-1">
      <FAQ dictionary={dictionary} />
    </main>
  );
}
