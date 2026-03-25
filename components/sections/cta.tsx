import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { Dictionary } from '@/lib/dictionaries'

interface CTAProps {
  dictionary: Dictionary
}

export function CTA({ dictionary }: CTAProps) {
  return (
    <section
      id="contact"
      tabIndex={0}
      role="region"
      aria-labelledby="contact-title"
      className="scroll-mt-16 outline-none transition-shadow focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring/80 focus-visible:ring-2 focus-visible:ring-ring/30"
    >
      <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-foreground px-8 py-16 text-center text-background sm:px-16 sm:py-24">
          <h2 id="contact-title" className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">
            {dictionary.cta.title}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-pretty text-lg opacity-80">
            {dictionary.cta.subtitle}
          </p>
          <div className="mt-10">
            <Button
              size="lg"
              variant="secondary"
              className="group gap-2 rounded-full px-8"
            >
              {dictionary.cta.button}
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-focus-visible:translate-x-1" />
            </Button>
          </div>
          
          {/* Decorative elements */}
          <div className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-background/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-background/10 blur-3xl" />
        </div>
      </div>
    </section>
  )
}
