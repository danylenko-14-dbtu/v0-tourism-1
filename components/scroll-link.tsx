'use client'

import { useRouter, usePathname } from 'next/navigation'
import { useParams } from 'next/navigation'
import type { MouseEvent, ReactNode } from 'react'
import { getLocalizedPath } from '@/lib/navigation'
import type { Locale } from '@/lib/i18n'

interface ScrollLinkProps {
  href: string
  className?: string
  onClick?: () => void
  children: ReactNode
}

export function ScrollLink({ href, className, onClick, children }: ScrollLinkProps) {
  const router = useRouter()
  const pathname = usePathname()
  const params = useParams()
  const locale = (params.locale as Locale) || 'en'

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()

    // Extract hash from href
    const hashIndex = href.indexOf('#')
    const hash = hashIndex >= 0 ? href.slice(hashIndex + 1) : ''
    
    // Check if we're on the homepage
    const isHomepage = pathname === `/${locale}` || pathname === `/${locale}/`

    if (isHomepage) {
      // On homepage: scroll to section
      if (hash) {
        const element = document.getElementById(hash)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' })
          window.history.pushState(null, '', `#${hash}`)
        }
      }
    } else {
      // On other pages: navigate to homepage with hash
      const targetPath = hash ? `/${locale}/#${hash}` : `/${locale}`
      router.push(targetPath)
    }

    onClick?.()
  }

  return (
    <a
      href={href}
      onClick={handleClick}
      className={className}
    >
      {children}
    </a>
  )
}
