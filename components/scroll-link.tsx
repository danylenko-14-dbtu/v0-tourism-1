'use client'

import type { MouseEvent, ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface ScrollLinkProps {
  href: string
  className?: string
  onClick?: () => void
  children: ReactNode
}

export function ScrollLink({ href, className, onClick, children }: ScrollLinkProps) {
  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()

    const hashIndex = href.indexOf('#')
    const id = hashIndex >= 0 ? href.slice(hashIndex + 1) : href
    const element = document.getElementById(id)

    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      window.history.pushState(null, '', href)
    } else {
      window.location.href = href
    }

    onClick?.()
  }

  return (
    <a
      href={href}
      onClick={handleClick}
      className={cn(
        'outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring/80 focus-visible:ring-2 focus-visible:ring-ring/30',
        className,
      )}
    >
      {children}
    </a>
  )
}
