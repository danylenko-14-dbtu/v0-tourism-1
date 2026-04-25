import Image from 'next/image'

interface PartnerLogoProps {
  name: string
  url: string
  logo: string
}

export function PartnerLogo({ name, url, logo }: PartnerLogoProps) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={name}
      className="group relative flex h-16 w-40 shrink-0 items-center justify-center text-muted-foreground opacity-70 transition-opacity duration-300 hover:opacity-100 focus-visible-ring sm:h-20 sm:w-56 md:w-60"
    >
      <Image
        src={logo}
        alt=""
        width={240}
        height={64}
        aria-hidden="true"
        className="h-10 w-auto object-contain sm:h-12"
        loading="lazy"
        unoptimized
      />
      <span
        className="pointer-events-none absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-medium text-foreground opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100"
      >
        {name}
      </span>
    </a>
  )
}
