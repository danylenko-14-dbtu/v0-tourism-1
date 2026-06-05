import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContactDialog } from "@/components/contact-dialog";
import { Footer } from "@/components/sections/footer";
import { Header } from "@/components/sections/header";
import { ContactDialogProvider } from "@/hooks/use-contact-dialog";
import { locales, type Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries";
import { serverEnv } from "@/lib/env";

interface LocaleLayoutProps {
  children: React.ReactNode;
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
    title: dictionary.metadata.title,
    description: dictionary.metadata.description,

    alternates: {
      canonical: `${siteUrl}/${locale}`,
      languages: {
        uk: `${siteUrl}/uk`,
        en: `${siteUrl}/en`,
        "x-default": `${siteUrl}/uk`,
      },
    },

    openGraph: {
      title: dictionary.metadata.title,
      description: dictionary.metadata.description,
      url: `${siteUrl}/${locale}`,
      siteName: "Туризм та рекреація ДБТУ",
      locale: locale === "uk" ? "uk_UA" : "en_US",
      type: "website",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: dictionary.metadata.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: dictionary.metadata.title,
      description: dictionary.metadata.description,
      images: [ogImage],
    },
  };
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;

  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  const typedLocale = locale as Locale;
  const dictionary = await getDictionary(typedLocale);

  return (
    <ContactDialogProvider>
      <div id="top" className="flex min-h-screen flex-col pb-14 lg:pb-0">
        <Header locale={typedLocale} dictionary={dictionary} />
        {children}
        <Footer dictionary={dictionary} locale={typedLocale} />
        <ContactDialog dictionary={dictionary} />
      </div>
    </ContactDialogProvider>
  );
}
