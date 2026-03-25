'use client'

import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ScrollLink } from '@/components/scroll-link'
import { LanguageSwitcher } from '@/components/language-switcher'
import { cn } from '@/lib/utils'
import type { Locale } from '@/lib/i18n'

interface NavItem {
  href: string
  label: string
}

interface MobileMenuProps {
  navItems: NavItem[]
  locale: Locale
}

export function MobileMenu({ navItems, locale }: MobileMenuProps) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [])

  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = open ? 'hidden' : previousOverflow

    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [open])

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setOpen(false)
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls="mobile-nav"
        aria-label={open ? 'Close menu' : 'Open menu'}
      >
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {open && (
        <div
          className="fixed inset-x-0 bottom-0 top-16 z-40 bg-background/60 backdrop-blur-sm"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}

      <div
        id="mobile-nav"
        role="navigation"
        className={cn(
          'absolute left-0 right-0 top-full z-50 overflow-hidden border-b border-border/50 bg-background shadow-lg transition-all duration-300 md:hidden',
          open ? 'max-h-[calc(100vh-4rem)]' : 'max-h-0 border-b-0'
        )}
      >
        <nav className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-4">
          {navItems.map((item) => (
            <ScrollLink
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              {item.label}
            </ScrollLink>
          ))}
          <div className="pt-2 sm:hidden">
            <LanguageSwitcher currentLocale={locale} />
          </div>
        </nav>
      </div>
    </>
  )
}
