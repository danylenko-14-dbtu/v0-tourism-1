'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu'
import { cn } from '@/lib/utils'

export interface HeaderNavItem {
  href: string
  label: string
  exact?: boolean
}

interface HeaderNavProps {
  items: HeaderNavItem[]
  className?: string
}

function isActivePath(pathname: string, item: HeaderNavItem) {
  if (item.exact) {
    return pathname === item.href || pathname === `${item.href}/`
  }

  return pathname === item.href || pathname.startsWith(`${item.href}/`)
}

export function HeaderNav({ items, className }: HeaderNavProps) {
  const pathname = usePathname()

  return (
    <NavigationMenu viewport={false} className={className ?? 'hidden md:flex'}>
      <NavigationMenuList className="gap-3">
        {items.map((item) => {
          const active = isActivePath(pathname, item)

          return (
            <NavigationMenuItem key={item.href}>
              <NavigationMenuLink
                asChild
                active={active}
                className={cn(
                  'rounded-md bg-transparent px-2 py-1 text-sm font-medium transition-colors hover:bg-transparent focus:bg-muted/50',
                  active
                    ? 'text-primary data-[active=true]:bg-transparent data-[active=true]:text-primary'
                    : 'text-muted-foreground hover:text-link-hover focus:text-link-hover',
                )}
              >
                <Link href={item.href}>{item.label}</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          )
        })}
      </NavigationMenuList>
    </NavigationMenu>
  )
}
