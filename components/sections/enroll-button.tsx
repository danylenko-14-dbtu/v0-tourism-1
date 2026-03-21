"use client"

import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface EnrollButtonProps {
  label: string
  className?: string
  size?: "default" | "sm" | "lg" | "icon"
}

export function EnrollButton({ label, className, size = "lg" }: EnrollButtonProps) {
  const handleClick = () => {
    // Future modal logic will go here
    console.log("Enroll button clicked")
  }

  return (
    <Button 
      size={size} 
      className={cn("group gap-2 rounded-full px-8 shadow-lg shadow-primary/20", className)}
      onClick={handleClick}
    >
      {label}
      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
    </Button>
  )
}
