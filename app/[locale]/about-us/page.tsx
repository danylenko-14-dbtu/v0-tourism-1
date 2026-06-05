import { notFound } from 'next/navigation'
import { AboutIntroText } from '@/components/sections/about-intro-text'
import { AboutPageHero } from '@/components/sections/about-page-hero'
import { About } from '@/components/sections/about'
import { AboutContact } from '@/components/sections/about-contact'
import { CTA } from '@/components/sections/cta'
import { Partners } from '@/components/sections/partners'
import { TestimonialsCarousel } from '@/components/sections/testimonials-carousel'
import { getDictionary } from '@/lib/dictionaries'
import { locales, type Locale } from '@/lib/i18n'

interface PageProps {
  params: Promise<{ locale: string }>
}

export default async function AboutUsPage({ params }: PageProps) {
  const { locale } = await params

  if (!locales.includes(locale as Locale)) {
    notFound()
  }

  const typedLocale = locale as Locale
  const dictionary = await getDictionary(typedLocale)

  return (
    <main className="flex-1">
      <AboutPageHero title={dictionary.aboutPage.hero.title} ctaLabel={dictionary.hero.cta} />
      <AboutIntroText
        title={dictionary.aboutPage.intro.title}
        paragraphs={dictionary.aboutPage.intro.paragraphs}
      />
      <TestimonialsCarousel
        title={dictionary.aboutPage.teacherComments.title}
        subtitle={dictionary.aboutPage.teacherComments.subtitle}
        items={dictionary.aboutPage.teacherComments.items}
      />
      <About dictionary={dictionary} />
      <AboutContact dictionary={dictionary} />
      <Partners dictionary={dictionary} />
      <CTA dictionary={dictionary} locale={typedLocale} />
    </main>
  )
}
