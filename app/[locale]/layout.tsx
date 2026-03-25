import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ThemeProvider } from '@/components/theme-provider'
import { locales, type Locale } from '@/lib/i18n'
import { getDictionary } from '@/lib/dictionaries'

interface LocaleLayoutProps {
  children: React.ReactNode
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
    title: dictionary.metadata.title,
    description: dictionary.metadata.description,
  }
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params

  if (!locales.includes(locale as Locale)) {
    notFound()
  }

  const typedLocale = locale as Locale

  return (
    <html lang={typedLocale} suppressHydrationWarning data-scroll-behavior="smooth">
      <body className="font-sans antialiased" suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
