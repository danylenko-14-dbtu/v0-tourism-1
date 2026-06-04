"use client"

import { useEffect, useState } from "react"
import { Quote } from "lucide-react"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

export interface TestimonialItem {
  author: {
    name: string
    role: string
    avatar: string
  }
  content: string
}

interface TestimonialsCarouselProps {
  eyebrow: string
  title: string
  subtitle: string
  items: TestimonialItem[]
}

export function TestimonialsCarousel({
  eyebrow,
  title,
  subtitle,
  items,
}: TestimonialsCarouselProps) {
  const [api, setApi] = useState<CarouselApi>()
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    if (!api || isPaused || items.length < 2) return

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReducedMotion) return

    const interval = window.setInterval(() => {
      if (api.canScrollNext()) {
        api.scrollNext()
      } else {
        api.scrollTo(0)
      }
    }, 6500)

    return () => window.clearInterval(interval)
  }, [api, isPaused, items.length])

  return (
    <section className="border-b border-border/50 bg-muted/30">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        <div className="mb-8 max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-primary">
            {eyebrow}
          </p>
          <h2 className="mt-3 text-2xl font-bold tracking-tight text-heading sm:text-3xl">
            {title}
          </h2>
          <p className="mt-4 text-sm leading-7 text-muted-foreground sm:text-base">
            {subtitle}
          </p>
        </div>

        <Carousel
          opts={{ align: "start", loop: items.length > 3 }}
          setApi={setApi}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocusCapture={() => setIsPaused(true)}
          onBlurCapture={() => setIsPaused(false)}
          className="px-0 sm:px-10"
        >
          <CarouselContent>
            {items.map((item) => (
              <CarouselItem key={item.author.name} className="md:basis-1/2 lg:basis-1/3">
                <article className="flex h-full flex-col rounded-md border border-border/60 bg-background p-5 shadow-sm">
                  <Quote className="h-5 w-5 text-primary" aria-hidden="true" />
                  <p className="mt-4 text-sm leading-7 text-muted-foreground">
                    {item.content}
                  </p>
                  <div className="mt-6 flex items-center gap-3 border-t border-border/50 pt-4">
                    <Avatar className="h-11 w-11">
                      <AvatarImage src={item.author.avatar} alt={item.author.name} />
                      <AvatarFallback>{getInitials(item.author.name)}</AvatarFallback>
                    </Avatar>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-heading">
                        {item.author.name}
                      </p>
                      <p className="truncate text-xs text-muted-foreground">
                        {item.author.role}
                      </p>
                    </div>
                  </div>
                </article>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-0 hidden sm:inline-flex" />
          <CarouselNext className="right-0 hidden sm:inline-flex" />
        </Carousel>
      </div>
    </section>
  )
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()
}
