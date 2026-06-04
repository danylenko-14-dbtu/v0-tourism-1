import Image from "next/image"

interface AboutPageHeroProps {
  title: string
}

export function AboutPageHero({ title }: AboutPageHeroProps) {
  return (
    <section
      aria-labelledby="about-page-title"
      className="relative isolate overflow-hidden border-b border-border/50 bg-background"
    >
      <div className="absolute inset-0 -z-10">
        <Image
          src="/btu-banner.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 to-background/10 dark:from-background dark:via-background/85 dark:to-background/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent md:hidden" />
      </div>

      <div className="mx-auto flex min-h-[360px] max-w-6xl items-center px-4 py-20 sm:min-h-[430px] sm:px-6 lg:min-h-[460px] lg:px-8">
        <div className="max-w-2xl">
          <h1
            id="about-page-title"
            className="text-balance text-3xl font-bold leading-tight tracking-tight text-heading sm:text-4xl lg:text-5xl"
          >
            {title}
          </h1>
        </div>
      </div>
    </section>
  )
}
