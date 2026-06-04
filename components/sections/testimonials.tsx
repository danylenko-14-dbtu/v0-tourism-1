"use client";

import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { TestimonialCard } from "@/components/testimonial-card";
import type { Dictionary } from "@/lib/dictionaries";

interface TestimonialsProps {
  dictionary: Dictionary;
}

export function Testimonials({ dictionary }: TestimonialsProps) {
  const { testimonials } = dictionary;

  const autoplay = React.useRef(
    Autoplay({ delay: 4500, stopOnInteraction: false, stopOnMouseEnter: true })
  );

  return (
    <section
      role="region"
      aria-labelledby="testimonials-title"
      className="border-t border-border/50"
    >
      <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <h2
            id="testimonials-title"
            className="text-3xl font-bold tracking-tight text-heading sm:text-4xl"
          >
            {testimonials.title}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">{testimonials.subtitle}</p>
        </div>

        <Carousel
          opts={{ loop: true, align: "start" }}
          plugins={[autoplay.current]}
          className="w-full"
        >
          <CarouselContent className="py-1">
            {testimonials.items.map((item, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <TestimonialCard
                  author={{ name: item.name, role: item.role, avatarUrl: item.avatar }}
                  content={item.content}
                />
              </CarouselItem>
            ))}
          </CarouselContent>

          <div className="mt-8 flex items-center justify-center gap-3">
            <CarouselPrevious className="static size-9 translate-x-0 translate-y-0" />
            <CarouselNext className="static size-9 translate-x-0 translate-y-0" />
          </div>
        </Carousel>
      </div>
    </section>
  );
}
