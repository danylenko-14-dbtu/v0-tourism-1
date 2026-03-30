import type { Locale } from './i18n'

/**
 * Generate a localized path with the given locale prefix
 * @param path - The path (e.g., '/faq', '#section', or 'faq')
 * @param locale - The current locale
 * @returns The full localized path
 */
export function getLocalizedPath(path: string, locale: Locale): string {
  // Handle absolute paths and hashes
  if (path.startsWith('/') || path.startsWith('#')) {
    if (path.startsWith('#')) {
      return `/${locale}${path}`
    }
    return `/${locale}${path}`
  }
  
  // Handle relative paths
  return `/${locale}/${path}`
}
