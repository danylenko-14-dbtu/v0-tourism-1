import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { CTA } from '@/components/sections/cta'
import { HowToApply } from '@/components/sections/how-to-apply'
import { LearningProcess } from '@/components/sections/learning-process'
import { Pricing } from '@/components/sections/pricing'
import { ProgramFacts } from '@/components/sections/program-facts'
import { getDictionary } from '@/lib/dictionaries'
import { locales, type Locale } from '@/lib/i18n'
import { generatePageMetadata } from '@/lib/metadata'

interface PageProps {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params
  return generatePageMetadata({
    locale,
    route: '/program',
    getTitle: (dictionary) => `${dictionary.programFacts.title} — ${dictionary.brand.name}`,
    getDescription: (dictionary) => dictionary.programFacts.subtitle,
  })
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
