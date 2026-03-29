import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { EnrollButton } from '@/components/sections/enroll-button'
import type { Dictionary } from '@/lib/dictionaries'

interface CTAProps {
  dictionary: Dictionary
}

export function CTA({ dictionary }: CTAProps) {
  return (
    <section
      id="contact"
      role="region"
      aria-labelledby="contact-title"
      className="scroll-mt-16"
    >
      <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-foreground px-8 py-16 text-center text-background sm:px-16 sm:py-24">
          <h2 id="contact-title" className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">
            {dictionary.cta.title}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-pretty text-lg opacity-80">
            {dictionary.cta.subtitle}
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <EnrollButton
              label={dictionary.cta.buttonPrimary}
              className="focus-visible-ring-inverted bg-secondary text-secondary-foreground shadow-none hover:bg-secondary/80 focus-visible:bg-secondary/80"
            />
            <Button
              size="lg"
              variant="outline"
              className="focus-visible-ring-inverted rounded-full border-background/40 bg-transparent px-8 text-background hover:bg-background/10 hover:text-background"
              asChild
            >
              <Link href="/faq">{dictionary.cta.buttonSecondary}</Link>
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
