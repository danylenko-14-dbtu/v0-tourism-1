"use client"

import { useState, useRef, useEffect } from 'react'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { Dictionary } from '@/lib/dictionaries'
import { cn } from '@/lib/utils'

interface HeroProps {
  dictionary: Dictionary
}

export function Hero({ dictionary }: HeroProps) {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (videoRef.current && videoRef.current.readyState >= 2) {
      setIsVideoLoaded(true)
    }
  }, [])

  return (
    <section className="relative overflow-hidden bg-background">
      {/* Video Background Layer (z-0) */}
      <video
        ref={videoRef}
        src="/hero-video.mp4"
        autoPlay
        loop
        muted
        playsInline
        disablePictureInPicture
        onLoadedData={() => setIsVideoLoaded(true)}
        className={cn(
          "absolute inset-0 w-full h-full object-cover z-0 transition-opacity duration-1000",
          isVideoLoaded ? "opacity-100" : "opacity-0"
        )}
      />

      {/* Dynamic Visual Overlay Layer (z-10) */}
      <div className="absolute inset-0 z-10 bg-white/40 dark:bg-black/60 backdrop-blur-[5px]" />

      {/* Content Preservation Layer (z-20) */}
      <div className="relative z-20 mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8 lg:py-40">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-6 inline-flex items-center rounded-full border border-border/50 bg-background/50 backdrop-blur-sm px-4 py-1.5 text-sm text-foreground animate-in fade-in slide-in-from-bottom-4 duration-700">
            <span className="mr-2 h-1.5 w-1.5 rounded-full bg-green-500" />
            {dictionary.hero.badge}
          </div>
          
          <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl text-foreground animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150">
            {dictionary.hero.title}
          </h1>
          
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg text-foreground/80 sm:text-xl animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
            {dictionary.hero.subtitle}
          </p>
          
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row animate-in fade-in slide-in-from-bottom-4 duration-700 delay-500">
            <Button size="lg" className="group gap-2 rounded-full px-8 shadow-lg shadow-primary/20">
              {dictionary.hero.cta}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button variant="outline" size="lg" className="rounded-full px-8 bg-background/50 backdrop-blur-sm border-border/50 hover:bg-background/80 text-foreground">
              {dictionary.hero.ctaSecondary}
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
