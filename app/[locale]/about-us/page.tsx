import { notFound } from 'next/navigation'
import { About } from '@/components/sections/about'
import { CTA } from '@/components/sections/cta'
import { Partners } from '@/components/sections/partners'
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
      <About dictionary={dictionary} />
      <Partners dictionary={dictionary} />
      <CTA dictionary={dictionary} locale={typedLocale} />
    </main>
  )
}
