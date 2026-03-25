import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { EnrollButton } from '@/components/sections/enroll-button'
import type { Dictionary } from '@/lib/dictionaries'

interface HeroProps {
  dictionary: Dictionary
}

export function Hero({ dictionary }: HeroProps) {
  return (
    <section
      aria-label="Hero"
      tabIndex={0}
      className="relative min-h-[80vh] flex items-center overflow-hidden bg-background outline-none transition-shadow focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring/80 focus-visible:ring-2 focus-visible:ring-ring/30"
    >
      {/* Video Background Layer (z-0) */}
      <video
        poster="/hero-poster.webp"
        src="/hero-video.mp4"
        autoPlay
        preload='auto'
        loop
        muted
        playsInline
        disablePictureInPicture
        aria-hidden="true"
        tabIndex={-1}
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      {/* Dynamic Visual Overlay Layer (z-10) */}
      <div className="absolute inset-0 z-10 bg-white/40 dark:bg-black/60 backdrop-blur-[5px]" />

      {/* Content Preservation Layer (z-20) */}
      <div className="relative z-20 mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8 lg:py-40">
        <div className="mx-auto max-w-3xl text-center">
          
          <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl text-foreground animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150 [text-shadow:_0_1px_3px_rgb(0_0_0_/_0.2)]">
            {dictionary.hero.title}
          </h1>
          
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg text-foreground/80 sm:text-xl animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300 [text-shadow:_0_1px_3px_rgb(0_0_0_/_0.2)]">
            {dictionary.hero.subtitle}
          </p>
          
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row animate-in fade-in slide-in-from-bottom-4 duration-700 delay-500">
            <EnrollButton label={dictionary.hero.cta} />
            <Button
              variant="outline"
              size="lg"
              className="rounded-full border-border/50 bg-background/50 px-8 text-foreground backdrop-blur-sm hover:bg-background/80"
            >
              {dictionary.hero.ctaSecondary}
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
