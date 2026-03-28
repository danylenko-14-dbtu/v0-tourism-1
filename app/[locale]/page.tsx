import { notFound } from 'next/navigation'
import { getDictionary } from '@/lib/dictionaries'
import { locales, type Locale } from '@/lib/i18n'
import { Header } from '@/components/sections/header'
import { Hero } from '@/components/sections/hero'
import { Professions } from '@/components/sections/professions'
import { LearningProcess } from '@/components/sections/learning-process'
import { GraduatesWork } from '@/components/sections/graduates-work'
import { ProgramFacts } from '@/components/sections/program-facts'
import { HowToApply } from '@/components/sections/how-to-apply'
import { About } from '@/components/sections/about'
import { Pricing } from '@/components/sections/pricing'
import { CTA } from '@/components/sections/cta'
import { Footer } from '@/components/sections/footer'

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
    <div id="top" className="flex min-h-screen flex-col">
      <Header locale={typedLocale} dictionary={dictionary} />
      <main className="flex-1">
        <Hero dictionary={dictionary} />
        <Professions dictionary={dictionary} />
        <LearningProcess dictionary={dictionary} />
        <GraduatesWork dictionary={dictionary} />
        <ProgramFacts dictionary={dictionary} />
        <HowToApply dictionary={dictionary} />
        <About dictionary={dictionary} />
        <Pricing dictionary={dictionary} />
        <CTA dictionary={dictionary} />
      </main>
      <Footer dictionary={dictionary} locale={typedLocale} />
    </div>
  )
}
