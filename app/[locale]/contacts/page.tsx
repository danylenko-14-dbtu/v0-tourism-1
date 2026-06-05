import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { AboutContact } from '@/components/sections/about-contact'
import { getDictionary } from '@/lib/dictionaries'
import { locales, type Locale } from '@/lib/i18n'
import { serverEnv } from '@/lib/env'

interface PageProps {
  params: Promise<{ locale: string }>
}

const { siteUrl } = serverEnv

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params

  if (!locales.includes(locale as Locale)) {
    return {}
  }

  const dictionary = await getDictionary(locale as Locale)
  const ogImage = locale === 'uk' ? '/og_image_uk.jpg' : '/og_image_en.jpg'
  const url = `${siteUrl}/${locale}/contacts`

  return {
    title: `${dictionary.aboutPage.contact.title} — ${dictionary.brand.name}`,
    description: `${dictionary.footer.address}. ${dictionary.aboutPage.contact.subtitle}`,
    alternates: {
      canonical: url,
      languages: {
        uk: `${siteUrl}/uk/contacts`,
        en: `${siteUrl}/en/contacts`,
        'x-default': `${siteUrl}/uk/contacts`,
      },
    },
    openGraph: {
      title: `${dictionary.aboutPage.contact.title} — ${dictionary.brand.name}`,
      description: `${dictionary.footer.address}. ${dictionary.aboutPage.contact.subtitle}`,
      url,
      type: 'website',
      images: [{ url: ogImage, width: 1200, height: 630 }],
    },
  }
}

export default async function ContactsPage({ params }: PageProps) {
  const { locale } = await params

  if (!locales.includes(locale as Locale)) {
    notFound()
  }

  const dictionary = await getDictionary(locale as Locale)

  return (
    <main className="flex-1">
      <AboutContact dictionary={dictionary} />
    </main>
  )
}
