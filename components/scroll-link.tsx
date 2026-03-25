'use client'

import type { MouseEvent, ReactNode } from 'react'

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
    <a href={href} onClick={handleClick} className={className}>
      {children}
    </a>
  )
}
