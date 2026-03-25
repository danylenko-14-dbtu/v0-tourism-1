"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

interface Fact {
  label: string
  value: string
}

interface ProgramFactsProps {
  dictionary: {
    programFacts: {
      title: string
      subtitle: string
      tabs: {
        bachelor: string
        master: string
      }
      programs: {
        bachelor: Fact[]
        master: Fact[]
      }
    }
  }
}

export function ProgramFacts({ dictionary }: ProgramFactsProps) {
  const { programFacts } = dictionary
  const [isVisible, setIsVisible] = useState(false)
  const [activeTab, setActiveTab] = useState<"bachelor" | "master">("bachelor")
  const [isTransitioning, setIsTransitioning] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const handleTabChange = (tab: "bachelor" | "master") => {
    if (tab === activeTab) return
    setIsTransitioning(true)
    setTimeout(() => {
      setActiveTab(tab)
      setIsTransitioning(false)
    }, 200)
  }

  if (!programFacts?.programs) {
    return null
  }

  const currentFacts = programFacts.programs[activeTab]

  return (
    <section
      id="program-facts"
      ref={sectionRef}
      tabIndex={0}
      role="region"
      aria-labelledby="program-facts-title"
      className="scroll-mt-16 border-t border-border/50 bg-background py-32 outline-none transition-shadow focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring/80 focus-visible:ring-2 focus-visible:ring-ring/30"
    >
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div 
          className={cn(
            "mb-16 text-center transition-all duration-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <h2 id="program-facts-title" className="text-3xl font-bold tracking-tight sm:text-4xl text-foreground">
            {programFacts.title}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground mx-auto max-w-2xl">
            {programFacts.subtitle}
          </p>
        </div>

        {/* Tab Switcher */}
        <div 
          className={cn(
            "mb-16 flex justify-center transition-all duration-700 delay-100",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <div className="inline-flex rounded-full bg-muted/50 p-1.5 backdrop-blur-sm border border-border/50">
            {(["bachelor", "master"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => handleTabChange(tab)}
                className={cn(
                  "relative rounded-full px-8 py-2.5 text-sm font-medium transition-all duration-300 outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring/80 focus-visible:ring-2 focus-visible:ring-ring/30",
                  activeTab === tab 
                    ? "bg-background text-foreground shadow-sm ring-1 ring-border/50" 
                    : "text-muted-foreground hover:bg-muted/50 hover:text-foreground focus-visible:bg-muted/50 focus-visible:text-foreground"
                )}
                aria-selected={activeTab === tab}
                role="tab"
                type="button"
              >
                {programFacts.tabs[tab]}
              </button>
            ))}
          </div>
        </div>
        
        {/* Content Grid */}
        <div 
          role="tabpanel"
          className={cn(
            "grid gap-x-12 gap-y-12 sm:grid-cols-2 lg:gap-x-16 lg:gap-y-16 transition-opacity duration-300 ease-in-out",
            isTransitioning ? "opacity-0" : "opacity-100",
            isVisible ? "translate-y-0" : "translate-y-8 opacity-0"
          )}
          style={{ transitionDelay: isVisible ? "200ms" : "0ms" }}
        >
          {currentFacts.map((fact, index) => (
            <div 
              key={`${activeTab}-${index}`}
              className="group flex flex-col justify-start border-b border-border/40 pb-5 transition-colors hover:border-border/80"
            >
              <div className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                {fact.value}
              </div>
              <div className="mt-2 text-sm font-medium uppercase tracking-wider text-muted-foreground">
                {fact.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
