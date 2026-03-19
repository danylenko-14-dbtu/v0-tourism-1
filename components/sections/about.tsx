import type { Dictionary } from '@/lib/dictionaries'

interface AboutProps {
  dictionary: Dictionary
}

export function About({ dictionary }: AboutProps) {
  return (
    <section id="about" className="scroll-mt-16 border-t border-border/50 bg-muted/30">
      <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col justify-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              {dictionary.about.title}
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              {dictionary.about.description}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {dictionary.about.stats.map((stat, index) => (
              <div
                key={index}
                className="flex flex-col items-center justify-center rounded-2xl border border-border/50 bg-muted/30 p-8 text-center transition-colors hover:border-border"
              >
                <span className="text-4xl font-bold tracking-tight">
                  {stat.value}
                </span>
                <span className="mt-2 text-sm text-muted-foreground">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
