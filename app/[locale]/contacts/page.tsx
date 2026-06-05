import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { AboutContact } from '@/components/sections/about-contact'
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
    route: '/contacts',
    getTitle: (dictionary) => `${dictionary.aboutPage.contact.title} — ${dictionary.brand.name}`,
    getDescription: (dictionary) =>
      `${dictionary.footer.address}. ${dictionary.aboutPage.contact.subtitle}`,
  })
}

export default async function ContactsPage({ params }: PageProps) {
  const { locale } = await params

  if (!locales.includes(locale as Locale)) {
    notFound()
  }

  const dictionary = await getDictionary(locale as Locale)

  return (
    <main className="flex-1">
      <AboutContact dictionary={dictionary} />
    </main>
  )
}
