import type { Dictionary } from '@/lib/dictionaries'

interface AboutProps {
  dictionary: Dictionary
}

export function About({ dictionary }: AboutProps) {
  return (
    <section id="about" className="scroll-mt-16 border-t border-border/50 ">
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

          <div className="grid lg:col-span-3 grid-cols-2 md:grid-cols-6 gap-4 sm:gap-6">
            {dictionary.about.team.map((member, index) => {
              const photo = `/staff/staff-photo-${index + 1}.jpg`
              const spanClass = index === 0 
                ? 'md:col-span-3 lg:col-span-4' 
                : index === 1 
                ? 'md:col-span-3 lg:col-span-2' 
                : 'md:col-span-2 lg:col-span-2'

              const placeholderClass = index === 0 
                ? 'dark:bg-[#fbfbfb]' 
                : index === 1 
                ? 'bg-white dark:bg-white' 
                : 'bg-white dark:bg-white'


              return (
                <div
                  key={index}
                  className={`group relative flex h-[200px] lg:h-[220px] w-full max-w-[500px] mx-auto items-center justify-center overflow-hidden rounded-2xl border border-border/50 bg-muted/40 shadow-sm isolate transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-xl hover:border-border/80 ${spanClass}`}
                >
                  {/* Default State: Photo or Avatar Icon */}
                  <img 
                    src={photo} 
                    alt={member.name} 
                    className={`absolute left-1/2 -translate-x-[50%] inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 max-w-[200px]`}
                    loading="lazy"
                  />
                  
                  {/* Avatar Placeholder (as a base layer or if photo fails to load - though simplified for now as requested) */}
                  <div className={`absolute inset-0 -z-10 flex h-full w-full items-center justify-center bg-muted/20 ${placeholderClass}`}>
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
                  <div className="absolute inset-0 flex flex-col justify-end p-6 text-left translate-y-full opacity-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100">
                    <span className="block text-xl font-bold tracking-tight text-white">
                      {member.name}
                    </span>
                    <span className="mt-1 block text-sm font-medium text-white/80">
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
