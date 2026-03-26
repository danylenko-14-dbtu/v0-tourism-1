"use client"

import { BookOpen, Briefcase, GraduationCap, FileCheck } from "lucide-react"
import { useEffect, useRef, useState } from "react"

interface Stage {
  title: string
  description: string
}

interface LearningProcessProps {
  dictionary: {
    learningProcess: {
      title: string
      subtitle: string
      stages: Stage[]
    }
  }
}

const icons = [BookOpen, Briefcase, GraduationCap, FileCheck]

export function LearningProcess({ dictionary }: LearningProcessProps) {
  const { learningProcess } = dictionary
  const [visibleStages, setVisibleStages] = useState<boolean[]>([])
  const stageRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    setVisibleStages(new Array(learningProcess.stages.length).fill(false))

    const observers = stageRefs.current.map((ref, index) => {
      if (!ref) return null

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleStages((prev) => {
              const newState = [...prev]
              newState[index] = true
              return newState
            })
            observer.disconnect()
          }
        },
        { threshold: 0.2, rootMargin: "0px 0px -50px 0px" }
      )

      observer.observe(ref)
      return observer
    })

    return () => {
      observers.forEach((observer) => observer?.disconnect())
    }
  }, [learningProcess.stages.length])

  return (
    <section
      id="learning-process"
      role="region"
      aria-labelledby="learning-process-title"
      className="py-16 md:py-24"
    >
      <div className="container mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 id="learning-process-title" className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-4">
            {learningProcess.title}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {learningProcess.subtitle}
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative max-w-5xl mx-auto">
          {/* Desktop Horizontal Timeline Line */}
          <div className="hidden md:block absolute top-16 left-0 right-0 h-0.5 bg-border" aria-hidden="true">
            <div 
              className="h-full bg-primary transition-all duration-1000 ease-out"
              style={{ 
                width: `${(visibleStages.filter(Boolean).length / learningProcess.stages.length) * 100}%` 
              }}
            />
          </div>

          {/* Mobile Vertical Timeline Line */}
          <div className="md:hidden absolute top-0 bottom-0 left-6 w-0.5 bg-border" aria-hidden="true">
            <div 
              className="w-full bg-primary transition-all duration-1000 ease-out"
              style={{ 
                height: `${(visibleStages.filter(Boolean).length / learningProcess.stages.length) * 100}%` 
              }}
            />
          </div>

          {/* Timeline Stages */}
          <div className="md:flex md:justify-between relative">
            {learningProcess.stages.map((stage, index) => {
              const Icon = icons[index] || BookOpen
              const isVisible = visibleStages[index]

              return (
                <div
                  key={index}
                  ref={(el) => { stageRefs.current[index] = el }}
                  className={`
                    relative flex md:flex-col md:items-center md:text-center
                    pl-14 md:pl-0 pb-10 md:pb-0
                    md:flex-1
                    transition-all duration-700 ease-out
                    ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 md:translate-y-0 md:translate-x-4"}
                  `}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  {/* Stage Number & Icon */}
                  <div className="absolute left-0 md:relative md:left-auto flex items-center justify-center">
                    <div 
                      className={`
                        w-12 h-12 rounded-full bg-background border-2 
                        flex items-center justify-center
                        transition-all duration-500
                        ${isVisible ? "border-primary shadow-md" : "border-border"}
                      `}
                    >
                      <Icon 
                        className={`w-5 h-5 transition-colors duration-500 ${isVisible ? "text-primary" : "text-muted-foreground"}`} 
                        aria-hidden="true"
                      />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="md:mt-6 md:px-2">
                    <span className="inline-block text-xs font-medium text-primary mb-1 md:mb-2">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      {stage.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed max-w-48">
                      {stage.description}
                    </p>
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
