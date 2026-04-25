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
      title={name}
      aria-label={name}
      className="group flex h-20 w-40 shrink-0 items-center justify-center rounded-xl border border-border/50 bg-background/50 px-6 opacity-80 transition-opacity duration-300 hover:opacity-100 focus-visible-ring sm:h-24 sm:w-56 md:w-64"
    >
      <Image
        src={logo}
        alt={name}
        width={160}
        height={64}
        className="h-10 w-auto object-contain sm:h-12"
        loading="lazy"
        unoptimized
      />
    </a>
  )
}
