import { notFound } from 'next/navigation'
import { CTA } from '@/components/sections/cta'
import { HowToApply } from '@/components/sections/how-to-apply'
import { LearningProcess } from '@/components/sections/learning-process'
import { Pricing } from '@/components/sections/pricing'
import { ProgramFacts } from '@/components/sections/program-facts'
import { getDictionary } from '@/lib/dictionaries'
import { locales, type Locale } from '@/lib/i18n'

interface PageProps {
  params: Promise<{ locale: string }>
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
