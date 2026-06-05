import { notFound } from 'next/navigation'
import { AboutContact } from '@/components/sections/about-contact'
import { getDictionary } from '@/lib/dictionaries'
import { locales, type Locale } from '@/lib/i18n'

interface PageProps {
  params: Promise<{ locale: string }>
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
