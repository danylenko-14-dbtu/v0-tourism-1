import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { Dictionary } from '@/lib/dictionaries'

interface HeroProps {
  dictionary: Dictionary
}

export function Hero({ dictionary }: HeroProps) {
  return (
    <section aria-label="Hero" className="relative overflow-hidden bg-background min-h-[80vh] flex items-center">
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
            <Button size="lg" className="group gap-2 rounded-full px-8 shadow-lg shadow-primary/20">
              {dictionary.hero.cta}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button variant="outline" size="lg" className="rounded-full px-8 bg-background/50 backdrop-blur-sm border-border/50 hover:bg-background/80 text-foreground">
              {dictionary.hero.ctaSecondary}
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
