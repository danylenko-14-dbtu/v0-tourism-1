'use client'

import { Menu } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { HeaderContactButton } from '@/components/header-contact-button'
import { LanguageSwitcher } from '@/components/language-switcher'
import { ThemeToggle } from '@/components/theme-toggle'
import type { Locale } from '@/lib/i18n'
import { cn } from '@/lib/utils'

interface NavItem {
  href: string
  label: string
  exact?: boolean
}

interface MobileMenuProps {
  navItems: NavItem[]
  locale: Locale
  contactLabel: string
}

function isActivePath(pathname: string, item: NavItem) {
  if (item.exact) {
    return pathname === item.href || pathname === `${item.href}/`
  }

  return pathname === item.href || pathname.startsWith(`${item.href}/`)
}

export function MobileMenu({ navItems, locale, contactLabel }: MobileMenuProps) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <Drawer open={open} onOpenChange={setOpen} modal={false} noBodyStyles>
      <DrawerTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          aria-label="Open menu"
          onClick={(event) => event.currentTarget.blur()}
        >
          <Menu className="h-5 w-5" />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="md:hidden">
        <DrawerTitle className="sr-only">
          {locale === 'en' ? 'Mobile navigation' : 'Мобільна навігація'}
        </DrawerTitle>
        <DrawerDescription className="sr-only">
          {locale === 'en'
            ? 'Site navigation, contact button, language switcher, and theme settings.'
            : 'Навігація сайтом, кнопка звʼязку, перемикач мови та налаштування теми.'}
        </DrawerDescription>
        <nav className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-4 py-5">
          {navItems.map((item) => {
            const active = isActivePath(pathname, item)

            return (
              <DrawerClose key={item.href} asChild>
                <Link
                  href={item.href}
                  className={cn(
                    'focus-visible-ring rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-link-hover focus-visible:bg-muted focus-visible:text-link-hover',
                    active ? 'text-primary' : 'text-muted-foreground',
                  )}
                >
                  {item.label}
                </Link>
              </DrawerClose>
            )
          })}
          <div className="mt-2">
            <HeaderContactButton
              label={contactLabel}
              showLabelOnMobile
              className="w-full justify-center gap-2"
            />
          </div>
          <div className="mt-2 flex items-center justify-between border-t border-border/50 pt-4">
            <LanguageSwitcher currentLocale={locale} variant="segmented" />
            <ThemeToggle />
          </div>
        </nav>
      </DrawerContent>
    </Drawer>
  )
}
