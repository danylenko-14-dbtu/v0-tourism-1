import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { CTA } from '@/components/sections/cta'
import { HowToApply } from '@/components/sections/how-to-apply'
import { LearningProcess } from '@/components/sections/learning-process'
import { Pricing } from '@/components/sections/pricing'
import { ProgramFacts } from '@/components/sections/program-facts'
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
  const url = `${siteUrl}/${locale}/program`

  return {
    title: `${dictionary.programFacts.title} — ${dictionary.brand.name}`,
    description: dictionary.programFacts.subtitle,
    alternates: {
      canonical: url,
      languages: {
        uk: `${siteUrl}/uk/program`,
        en: `${siteUrl}/en/program`,
        'x-default': `${siteUrl}/uk/program`,
      },
    },
    openGraph: {
      title: `${dictionary.programFacts.title} — ${dictionary.brand.name}`,
      description: dictionary.programFacts.subtitle,
      url,
      type: 'website',
      images: [{ url: ogImage, width: 1200, height: 630 }],
    },
  }
}

export default async function ProgramPage({ params }: PageProps) {
  const { locale } = await params

  if (!locales.includes(locale as Locale)) {
    notFound()
  }

  const typedLocale = locale as Locale
  const dictionary = await getDictionary(typedLocale)

  return (
    <main className="flex-1">
      <ProgramFacts dictionary={dictionary} />
      <LearningProcess dictionary={dictionary} />
      <HowToApply dictionary={dictionary} />
      <Pricing dictionary={dictionary} />
      <CTA dictionary={dictionary} locale={typedLocale} />
    </main>
  )
}
