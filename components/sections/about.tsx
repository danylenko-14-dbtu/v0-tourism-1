import type { Dictionary } from '@/lib/dictionaries'
import { TeamCard } from './team-card'

interface AboutProps {
  dictionary: Dictionary
}

export function About({ dictionary }: AboutProps) {
  return (
    <section
      id="about"
      role="region"
      aria-labelledby="about-title"
      className="scroll-mt-16 border-t border-border/50"
    >
      <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-5 lg:gap-16">
          <div className="flex flex-col items-center justify-center text-center lg:col-span-2 lg:items-start lg:text-left">
            <h2 id="about-title" className="text-3xl font-bold tracking-tight sm:text-4xl">
              {dictionary.about.title}
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground max-w-[500px] mx-auto lg:mx-0">
              {dictionary.about.description}
            </p>
          </div>

          <div className="grid lg:col-span-3 grid-cols-2 md:grid-cols-6 gap-4 sm:gap-6">
            {dictionary.about.team.map((member, index) => (
              <TeamCard key={index} member={member} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

