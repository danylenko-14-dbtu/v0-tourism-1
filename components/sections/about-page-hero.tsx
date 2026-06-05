import Image from "next/image";
import { EnrollButton } from "@/components/sections/enroll-button";

interface AboutPageHeroProps {
  title: string;
  ctaLabel: string;
}

export function AboutPageHero({ title, ctaLabel }: AboutPageHeroProps) {
  return (
    <section
      aria-labelledby="about-page-title"
      className="relative mt-14 isolate overflow-hidden bg-background"
    >
      <div className="absolute inset-0 -z-10">
        <Image
          src="/btu-banner.webp"
          alt=""
          fill
          priority
          quality={100}
          unoptimized
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r dark:from-background dark:via-background/85 dark:to-background/20" />
      </div>

      <div className="mx-auto flex min-h-[320px] max-w-6xl items-center px-4 py-16 sm:min-h-[360px] sm:px-6 lg:h-[400px] lg:min-h-0 lg:px-8">
        <div className="mx-auto max-w-2xl text-center sm:mx-0 sm:w-[70%] sm:text-left lg:w-1/2 lg:max-w-none lg:pr-10">
          <h1
            id="about-page-title"
            className="text-balance text-3xl font-semibold leading-tight tracking-wide text-heading sm:text-4xl lg:text-4xl lg:font-medium"
          >
            {title}
          </h1>
          <div className="mt-8 flex justify-center sm:justify-start">
            <EnrollButton
              label={ctaLabel}
              className="bg-footer text-footer-foreground shadow-footer/20 hover:bg-footer/90 focus-visible:bg-footer/90 dark:bg-primary dark:text-primary-foreground dark:shadow-primary/20 dark:hover:bg-primary/90 dark:focus-visible:bg-primary/90"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
