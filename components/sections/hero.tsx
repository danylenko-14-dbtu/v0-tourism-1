import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { Dictionary } from '@/lib/dictionaries'

interface HeroProps {
  dictionary: Dictionary
}

export function Hero({ dictionary }: HeroProps) {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8 lg:py-40">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-6 inline-flex items-center rounded-full border border-border bg-muted/50 px-4 py-1.5 text-sm text-muted-foreground animate-in fade-in slide-in-from-bottom-4 duration-700">
            <span className="mr-2 h-1.5 w-1.5 rounded-full bg-green-500" />
            {dictionary.hero.badge}
          </div>
          
          <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150">
            {dictionary.hero.title}
          </h1>
          
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg text-muted-foreground sm:text-xl animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
            {dictionary.hero.subtitle}
          </p>
          
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row animate-in fade-in slide-in-from-bottom-4 duration-700 delay-500">
            <Button size="lg" className="group gap-2 rounded-full px-8">
              {dictionary.hero.cta}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button variant="outline" size="lg" className="rounded-full px-8">
              {dictionary.hero.ctaSecondary}
            </Button>
          </div>
        </div>
      </div>
      
      {/* Subtle background gradient */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-muted/50 blur-3xl" />
      </div>
    </section>
  )
}
