"use client"

import { useEffect, useRef, useState } from "react"
import { 
  Plane, 
  Building2, 
  Hotel, 
  Globe2, 
  Briefcase, 
  Landmark 
} from "lucide-react"

interface Category {
  title: string
  description: string
}

interface GraduatesWorkProps {
  dictionary: {
    graduatesWork: {
      title: string
      subtitle: string
      categories: Category[]
    }
  }
}

const icons = [Plane, Building2, Hotel, Globe2, Briefcase, Landmark]

export function GraduatesWork({ dictionary }: GraduatesWorkProps) {
  const { graduatesWork } = dictionary
  const [visibleItems, setVisibleItems] = useState<boolean[]>([])
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    setVisibleItems(new Array(graduatesWork.categories.length).fill(false))

    const observers = itemRefs.current.map((ref, index) => {
      if (!ref) return null

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleItems((prev) => {
              const newState = [...prev]
              newState[index] = true
              return newState
            })
            observer.disconnect()
          }
        },
        { threshold: 0.15, rootMargin: "0px 0px -30px 0px" }
      )

      observer.observe(ref)
      return observer
    })

    return () => {
      observers.forEach((observer) => observer?.disconnect())
    }
  }, [graduatesWork.categories.length])

  return (
    <section id="graduates" className="scroll-mt-16 border-t border-border/50 bg-muted/30">
      <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {graduatesWork.title}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            {graduatesWork.subtitle}
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {graduatesWork.categories.map((category, index) => {
            const Icon = icons[index % icons.length]
            const isVisible = visibleItems[index]

            return (
              <div
                key={index}
                ref={(el) => { itemRefs.current[index] = el }}
                className={`
                  group relative flex items-start gap-4 rounded-xl border border-border/50 
                  bg-background/50 p-6 transition-all duration-500
                  hover:border-border hover:shadow-sm
                  ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
                `}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {/* Icon */}
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-muted transition-colors group-hover:bg-foreground group-hover:text-background">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>

                {/* Content */}
                <div className="min-w-0">
                  <h3 className="font-semibold text-foreground leading-tight">
                    {category.title}
                  </h3>
                  <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">
                    {category.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
