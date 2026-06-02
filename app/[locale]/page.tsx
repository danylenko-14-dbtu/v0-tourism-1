import { notFound } from 'next/navigation'
import { getDictionary } from '@/lib/dictionaries'
import { locales, type Locale } from '@/lib/i18n'
import { Hero } from '@/components/sections/hero'
import { Professions } from '@/components/sections/professions'
import { LearningProcess } from '@/components/sections/learning-process'
import { Graduates } from '@/components/sections/graduates'
import { ProgramFacts } from '@/components/sections/program-facts'
import { HowToApply } from '@/components/sections/how-to-apply'
import { About } from '@/components/sections/about'
import { Pricing } from '@/components/sections/pricing'
import { Partners } from '@/components/sections/partners'
import { CTA } from '@/components/sections/cta'

interface PageProps {
  params: Promise<{ locale: string }>
}

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params

  if (!locales.includes(locale as Locale)) {
    notFound()
  }

  const typedLocale = locale as Locale
  const dictionary = await getDictionary(typedLocale)

  return (
    <main className="flex-1">
      <Hero dictionary={dictionary} locale={typedLocale} />
      <Professions dictionary={dictionary} />
      <LearningProcess dictionary={dictionary} />
      <Graduates dictionary={dictionary} />
      <HowToApply dictionary={dictionary} />
      <Partners dictionary={dictionary} />
      <CTA dictionary={dictionary} locale={typedLocale} />
    </main>
  )
}
