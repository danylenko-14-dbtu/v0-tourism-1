import { getDictionary } from '@/lib/dictionaries'
import type { Locale } from '@/lib/i18n'
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
  params: Promise<{ locale: Locale }>
}

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params
  const dictionary = await getDictionary(locale)

  return (
    <div className="flex min-h-screen flex-col">
      <Header locale={locale} dictionary={dictionary} />
      <main className="flex-1">
        <Hero dictionary={dictionary} />
        <Professions dictionary={dictionary} />
        <LearningProcess dictionary={dictionary} />
        <GraduatesWork dictionary={dictionary} />
        <ProgramFacts dictionary={dictionary} />
        <HowToApply dictionary={dictionary as any} />
        <About dictionary={dictionary} />
        <Pricing dictionary={dictionary} />
        <CTA dictionary={dictionary} />
      </main>
      <Footer dictionary={dictionary} />
    </div>
  )
}
