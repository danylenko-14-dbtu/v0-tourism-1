import Image from "next/image";
import type { Dictionary } from "@/lib/dictionaries";

interface AboutBannerProps {
  dictionary: Dictionary;
}

export function AboutBanner({ dictionary }: AboutBannerProps) {
  const { aboutBanner } = dictionary;

  return (
    <section
      aria-label={aboutBanner.title}
      className="relative isolate overflow-hidden border-b border-border/50 bg-background"
    >
      {/* Background image (z-0) */}
      <Image
        src="/btu-banner.webp"
        alt={aboutBanner.imageAlt}
        fill
        priority
        sizes="100vw"
        className="absolute inset-0 -z-10 object-cover object-right"
      />

      {/* Theme-adaptive readability overlay (z-0) */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-r from-background via-background/85 to-transparent sm:via-background/70 lg:via-background/40"
      />

      {/* Content (z-10) */}
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-36">
        <h1 className="max-w-xl text-balance text-2xl font-bold leading-tight tracking-tight text-heading drop-shadow-sm sm:max-w-2xl sm:text-3xl lg:text-4xl">
          {aboutBanner.title}
        </h1>
      </div>
    </section>
  );
}
