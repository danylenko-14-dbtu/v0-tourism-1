import type { Dictionary } from '@/lib/dictionaries'
import { PartnerLogo } from '@/components/sections/partner-logo'

interface PartnersProps {
  dictionary: Dictionary
}

interface Partner {
  id: string
  name: string
  url: string
  logo: string
}

const partners: Partner[] = [
  { id: 'partner-1', name: 'Partner 1', url: 'https://example.com', logo: '/logos/partner-1.svg' },
  { id: 'partner-2', name: 'Partner 2', url: 'https://example.com', logo: '/logos/partner-2.svg' },
  { id: 'partner-3', name: 'Partner 3', url: 'https://example.com', logo: '/logos/partner-3.svg' },
  { id: 'partner-4', name: 'Partner 4', url: 'https://example.com', logo: '/logos/partner-4.svg' },
  { id: 'partner-5', name: 'Partner 5', url: 'https://example.com', logo: '/logos/partner-5.svg' },
  { id: 'partner-6', name: 'Partner 6', url: 'https://example.com', logo: '/logos/partner-6.svg' },
  { id: 'partner-7', name: 'Partner 7', url: 'https://example.com', logo: '/logos/partner-7.svg' },
  { id: 'partner-8', name: 'Partner 8', url: 'https://example.com', logo: '/logos/partner-8.svg' },
]

// Spacing is owned by each item's right padding (NOT a flex gap on the parent),
// so the total track width is exactly N * (itemWidth + itemPadding). That makes
// translateX(-50%) land the second group's first item perfectly on top of the
// first group's first item — no seam, no half-gap drift.
const itemSpacing = 'pr-8 sm:pr-16 md:pr-24'

export function Partners({ dictionary }: PartnersProps) {
  return (
    <section
      id="partners"
      role="region"
      aria-labelledby="partners-title"
      className="scroll-mt-16 border-t border-border/50"
    >
      <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2
            id="partners-title"
            className="text-balance text-3xl font-bold tracking-tight sm:text-4xl"
          >
            {dictionary.partners.title}
          </h2>
        </div>

        <div
          className="partners-marquee-mask mt-16 overflow-hidden"
          aria-label={dictionary.partners.ariaLabel}
          role="group"
        >
          <ul className="partners-marquee-track flex items-center">
            {/* Group 1 — visible to assistive tech */}
            {partners.map((partner) => (
              <li key={partner.id} className={`flex items-center ${itemSpacing}`}>
                <PartnerLogo name={partner.name} url={partner.url} logo={partner.logo} />
              </li>
            ))}
            {/* Group 2 — identical duplicate, hidden from assistive tech */}
            {partners.map((partner) => (
              <li
                key={`dup-${partner.id}`}
                aria-hidden="true"
                className={`flex items-center ${itemSpacing}`}
              >
                <PartnerLogo name={partner.name} url={partner.url} logo={partner.logo} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
