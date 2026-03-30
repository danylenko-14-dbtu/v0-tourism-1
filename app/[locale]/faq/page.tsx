import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getDictionary } from '@/lib/dictionaries'
import { locales, type Locale } from '@/lib/i18n'
import { Header } from '@/components/sections/header'
import { FAQ } from '@/components/sections/faq'
import { Footer } from '@/components/sections/footer'
import { ContactDialog } from '@/components/contact-dialog'

interface FAQPageProps {
  params: Promise<{ locale: string }>
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params

  if (!locales.includes(locale as Locale)) {
    return {}
  }

  const dictionary = await getDictionary(locale as Locale)

  return {
    title: `${dictionary.faq.title} — ${dictionary.brand.name}`,
    description: dictionary.faq.subtitle,
  }
}

export default async function FAQPage({ params }: FAQPageProps) {
  const { locale } = await params

  if (!locales.includes(locale as Locale)) {
    notFound()
  }

  const typedLocale = locale as Locale
  const dictionary = await getDictionary(typedLocale)

  return (
    <div className="flex min-h-screen flex-col">
      <Header locale={typedLocale} dictionary={dictionary} />
      <main className="flex-1">
        <FAQ dictionary={dictionary} />
      </main>
      <Footer dictionary={dictionary} locale={typedLocale} />
      <ContactDialog dictionary={dictionary} />
    </div>
  )
}
