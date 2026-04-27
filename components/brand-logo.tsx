import Image from 'next/image'
import { HomeLogoLink } from '@/components/home-logo-link'

interface BrandLogoProps {
  href: string
  label: string
  className?: string
  textClassName?: string
  imageClassName?: string
}

export function BrandLogo({
  href,
  label,
  className,
  textClassName,
  imageClassName,
}: BrandLogoProps) {
  return (
    <HomeLogoLink href={href} className={className}>
      <span className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-xl">
        <Image
          src="/dbtu-logo.png"
          alt={label}
          fill
          priority
          sizes="40px"
          className={`object-contain dark:hidden ${imageClassName ?? ''}`}
        />
        <Image
          src="/dbtu-logo.png"
          alt={label}
          fill
          priority
          sizes="40px"
          className={`hidden object-contain dark:block ${imageClassName ?? ''}`}
        />
      </span>
      <span className={textClassName}>{label}</span>
    </HomeLogoLink>
  )
}
