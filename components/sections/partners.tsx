import type { Dictionary } from "@/lib/dictionaries";
import { PartnerLogo } from "@/components/sections/partner-logo";
import styles from "@/styles/marquee.module.css";

interface PartnersProps {
  dictionary: Dictionary;
}

interface Partner {
  id: string;
  logo: string;
}

const partners: Partner[] = [
  { id: "partner-1", logo: "/logos/partner-1.png" },
  { id: "partner-2", logo: "/logos/partner-2.png" },
  { id: "partner-3", logo: "/logos/partner-3.png" },
  { id: "partner-4", logo: "/logos/partner-4.jpg" },
  { id: "partner-5", logo: "/logos/partner-5.png" },
  { id: "partner-6", logo: "/logos/partner-6.png" },
  { id: "partner-7", logo: "/logos/partner-7.jpg" },
  { id: "partner-8", logo: "/logos/partner-8.svg" },
];

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
          className={`${styles.logosTicker} ${styles.marqueeMask} mt-16`}
          aria-label={dictionary.partners.ariaLabel}
          role="group"
        >
          <ul>
            {partners.map((partner, index) => (
              <li key={partner.id}>
                <PartnerLogo name={dictionary.partners.names[index]} logo={partner.logo} />
              </li>
            ))}
          </ul>

          <ul aria-hidden="true">
            {partners.map((partner, index) => (
              <li key={`dup-${partner.id}`}>
                <PartnerLogo name={dictionary.partners.names[index]} logo={partner.logo} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
