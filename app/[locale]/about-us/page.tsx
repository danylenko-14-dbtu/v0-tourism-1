import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { AboutIntroText } from '@/components/sections/about-intro-text'
import { AboutPageHero } from '@/components/sections/about-page-hero'
import { About } from '@/components/sections/about'
import { AboutContact } from '@/components/sections/about-contact'
import { CTA } from '@/components/sections/cta'
import { Partners } from '@/components/sections/partners'
import { TestimonialsCarousel } from '@/components/sections/testimonials-carousel'
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
  const url = `${siteUrl}/${locale}/about-us`

  return {
    title: `${dictionary.about.title} — ${dictionary.brand.name}`,
    description: dictionary.aboutPage.intro.paragraphs[0] ?? dictionary.about.description,
    alternates: {
      canonical: url,
      languages: {
        uk: `${siteUrl}/uk/about-us`,
        en: `${siteUrl}/en/about-us`,
        'x-default': `${siteUrl}/uk/about-us`,
      },
    },
    openGraph: {
      title: `${dictionary.about.title} — ${dictionary.brand.name}`,
      description: dictionary.aboutPage.intro.paragraphs[0] ?? dictionary.about.description,
      url,
      type: 'website',
      images: [{ url: ogImage, width: 1200, height: 630 }],
    },
  }
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
