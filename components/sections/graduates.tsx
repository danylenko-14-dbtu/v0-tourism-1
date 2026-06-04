"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  Building2,
  Briefcase,
  Globe2,
  Hotel,
  Landmark,
  Plane,
  type LucideIcon,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface Category {
  title: string;
  description: string;
}

interface GraduatesProps {
  dictionary: {
    graduatesWork: {
      title: string;
      subtitle: string;
      categories: Category[];
    };
  };
}

const icons = [Plane, Building2, Hotel, Globe2, Briefcase, Landmark];

export function Graduates({ dictionary }: GraduatesProps) {
  const { graduatesWork } = dictionary;
  const featuredIndex =
    graduatesWork.categories.length > 1 ? graduatesWork.categories.length - 2 : 0;
  const featuredCategory = graduatesWork.categories[featuredIndex];
  const sideCategories = graduatesWork.categories
    .map((category, index) => ({ category, index }))
    .filter((item) => item.index !== featuredIndex);
  const [visibleItems, setVisibleItems] = useState<Set<number>>(() => new Set());
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers = itemRefs.current.map((ref, index) => {
      if (!ref) return null;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleItems((prev) => {
              const nextState = new Set(prev);
              nextState.add(index);
              return nextState;
            });
            observer.disconnect();
          }
        },
        { threshold: 0.15, rootMargin: "0px 0px -30px 0px" }
      );

      observer.observe(ref);
      return observer;
    });

    return () => {
      observers.forEach((observer) => observer?.disconnect());
    };
  }, [graduatesWork.categories.length]);

  return (
    <section
      id="graduates"
      role="region"
      aria-labelledby="graduates-title"
      className="scroll-mt-16 border-t border-border/50 bg-muted/30"
    >
      <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <h2
            id="graduates-title"
            className="text-3xl font-bold tracking-tight text-heading sm:text-4xl"
          >
            {graduatesWork.title}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">{graduatesWork.subtitle}</p>
        </div>

        <div className="grid items-start gap-8 lg:grid-cols-2 lg:gap-10">
          <div className="space-y-4">
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-muted shadow-sm">
              <Image
                src="/graduate.png"
                alt={graduatesWork.title}
                fill
                sizes="(min-width: 1024px) 520px, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
            </div>

            {featuredCategory ? (
              <Accordion type="single" collapsible>
                <GraduateAccordionCard
                  category={featuredCategory}
                  icon={icons[featuredIndex % icons.length]}
                  index={featuredIndex}
                  visible={visibleItems.has(featuredIndex)}
                  refCallback={(el) => {
                    itemRefs.current[featuredIndex] = el;
                  }}
                />
              </Accordion>
            ) : null}
          </div>

          <Accordion type="single" defaultValue="graduate-0" collapsible className="grid gap-3">
            {sideCategories.map(({ category, index }) => {
              const Icon = icons[index % icons.length];

              return (
                <GraduateAccordionCard
                  key={category.title}
                  category={category}
                  icon={Icon}
                  index={index}
                  visible={visibleItems.has(index)}
                  refCallback={(el) => {
                    itemRefs.current[index] = el;
                  }}
                />
              );
            })}
          </Accordion>
        </div>
      </div>
    </section>
  );
}

interface GraduateAccordionCardProps {
  category: Category;
  icon: LucideIcon;
  index: number;
  visible: boolean;
  refCallback: (el: HTMLDivElement | null) => void;
}

function GraduateAccordionCard({
  category,
  icon: Icon,
  index,
  visible,
  refCallback,
}: GraduateAccordionCardProps) {
  return (
    <div
      ref={refCallback}
      className={`
        transition-all duration-500
        ${visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}
      `}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <AccordionItem
        value={`graduate-${index}`}
        className="
          group rounded-lg border-0 bg-background shadow-sm ring-1 ring-border/60
          transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:ring-primary/25
          data-[state=open]:ring-primary/30
        "
      >
        <AccordionTrigger className="focus-visible-ring items-center rounded-lg px-5 py-4 text-left hover:no-underline focus-visible:bg-muted/50 focus-visible:text-link-hover focus-visible:ring-0 sm:px-6 sm:py-4">
          <span className="flex min-w-0 items-center gap-4 sm:gap-5">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform duration-300 group-hover:scale-105">
              <Icon className="h-5 w-5" aria-hidden="true" />
            </span>

            <span className="min-w-0 text-base font-bold leading-snug text-heading sm:text-lg">
              {category.title}
            </span>
          </span>
        </AccordionTrigger>
        <AccordionContent className="px-5 pb-5 text-sm leading-relaxed text-muted-foreground sm:px-6">
          {category.description}
        </AccordionContent>
      </AccordionItem>
    </div>
  );
}
