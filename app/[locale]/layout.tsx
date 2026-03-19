import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ThemeProvider } from '@/components/theme-provider'
import { locales, type Locale } from '@/lib/i18n'
import { getDictionary } from '@/lib/dictionaries'

interface LocaleLayoutProps {
  children: React.ReactNode
  params: Promise<{ locale: Locale }>
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>
}): Promise<Metadata> {
  const { locale } = await params
  const dictionary = await getDictionary(locale)
  
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

  if (!locales.includes(locale)) {
    notFound()
  }

  return (
    <html lang={locale} suppressHydrationWarning data-scroll-behavior="smooth">
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
