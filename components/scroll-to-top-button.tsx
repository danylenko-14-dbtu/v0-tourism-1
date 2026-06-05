"use client"

import { useEffect, useState } from "react"
import { ArrowUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface ScrollToTopButtonProps {
  label: string
}

export function ScrollToTopButton({ label }: ScrollToTopButtonProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 600)
    }

    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <Button
      type="button"
      size="icon"
      variant="outline"
      aria-label={label}
      aria-hidden={!isVisible}
      disabled={!isVisible}
      tabIndex={isVisible ? 0 : -1}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={cn(
        "fixed right-4 z-40 h-10 w-10 rounded-full border-border/70 bg-background/90 text-heading shadow-md backdrop-blur transition-all hover:border-primary/50 hover:text-link-hover focus-visible:opacity-100",
        "bottom-20 md:bottom-20 lg:bottom-6",
        isVisible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-2 opacity-0",
      )}
    >
      <ArrowUp className="h-4 w-4" aria-hidden="true" />
    </Button>
  )
}
