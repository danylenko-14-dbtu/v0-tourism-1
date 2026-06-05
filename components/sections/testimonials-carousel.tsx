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
  title: string
  subtitle: string
  items: TestimonialItem[]
}

export function TestimonialsCarousel({
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
    }, 10000)

    return () => window.clearInterval(interval)
  }, [api, isPaused, items.length])

  return (
    <section className="border-b border-border/50 bg-muted/30">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="mx-auto mb-8 max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-heading sm:text-4xl">
            {title}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
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
                  <p className="mb-6 mt-4 text-sm leading-7 text-muted-foreground">
                    {item.content}
                  </p>
                  <div className="mt-auto flex items-center gap-3 border-t border-border/50 pt-4">
                    <Avatar className="h-11 w-11">
                      <AvatarImage src={item.author.avatar} alt={item.author.name} className="object-cover object-[center_30%]" />
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
