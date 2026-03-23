import type { Dictionary } from '@/lib/dictionaries'

interface AboutProps {
  dictionary: Dictionary
}

export function About({ dictionary }: AboutProps) {
  return (
    <section id="about" className="scroll-mt-16 border-t border-border/50 bg-muted/30">
      <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-5 lg:gap-16">
          <div className="flex flex-col items-center justify-center text-center lg:col-span-2 lg:items-start lg:text-left">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              {dictionary.about.title}
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground max-w-[500px] mx-auto lg:mx-0">
              {dictionary.about.description}
            </p>
          </div>

          <div className="grid lg:col-span-3 grid-cols-1 md:grid-cols-6 gap-6">
            {dictionary.about.team.map((member, index) => {
              const photo = `/staff/staff-photo-${index + 1}.jpg`
              const spanClass = index === 0 
                ? 'md:col-span-3 lg:col-span-4' 
                : index === 1 
                ? 'md:col-span-3 lg:col-span-2' 
                : 'md:col-span-2 lg:col-span-2'

              return (
                <div
                  key={index}
                  className={`group relative flex h-[16rem] lg:h-[200px] w-full max-w-[500px] mx-auto items-center justify-center overflow-hidden rounded-2xl border border-border/50 bg-muted/40 shadow-sm transition-all duration-500 ease-out hover:-translate-y-2 hover:scale-[1.03] hover:shadow-lg hover:border-border/80 ${spanClass}`}
                >
                  {/* Default State: Photo or Avatar Icon */}
                  <img 
                    src={photo} 
                    alt={member.name} 
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  
                  {/* Avatar Placeholder (as a base layer or if photo fails to load - though simplified for now as requested) */}
                  <div className="absolute inset-0 -z-10 flex h-full w-full items-center justify-center bg-muted/20">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="64"
                      height="64"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-muted-foreground/30"
                    >
                      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  </div>

                  {/* Glassmorphism Overlay Animating from Bottom */}
                  <div className="absolute inset-0 flex flex-col justify-end p-6 text-left translate-y-full opacity-0 backdrop-blur-md bg-gradient-to-t from-background/95 via-background/60 to-background/10 transition-all duration-500 ease-in-out group-hover:translate-y-0 group-hover:opacity-100">
                    <span className="block text-xl font-bold tracking-tight text-foreground">
                      {member.name}
                    </span>
                    <span className="mt-1 block text-sm font-medium text-foreground/80">
                      {member.role}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
