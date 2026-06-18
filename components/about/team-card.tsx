"use client"

import Image from 'next/image';
import { useRef, useState } from 'react'

interface TeamCardProps {
  member: { name: string; role: string }
  index: number
}

export function TeamCard({ member, index }: TeamCardProps) {
  const [isActive, setIsActive] = useState(false)
  const isTouchRef = useRef(false)

  const handleTouch = () => {
    isTouchRef.current = true
  }

  const handleClick = () => {
    if (isTouchRef.current) {
      setIsActive((prev) => !prev)
      isTouchRef.current = false
    }
  }

  const photo = `/staff/staff-photo-${index + 1}.jpg`

  const spanClass =
    index === 0
      ? 'md:col-span-3 lg:col-span-4'
      : index === 1
        ? 'md:col-span-3 lg:col-span-2'
        : 'md:col-span-2 lg:col-span-2'

  const placeholderClass =
    index === 0 ? 'dark:bg-[#fbfbfb]' : 'bg-white dark:bg-white'

  const isOverlayVisible = isActive

  return (
    <div
      role='button'
      aria-pressed={isActive}
      tabIndex={0}
      onTouchStart={handleTouch}
      onClick={handleClick}
      onBlur={() => {
        isTouchRef.current = false
        setIsActive(false)
      }}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          setIsActive(prev => !prev)
        }
      }}
      className={`
        group relative flex h-[200px] lg:h-[220px] w-full max-w-[500px] mx-auto 
        items-center justify-center overflow-hidden rounded-2xl 
        border border-border/50 bg-muted/40 shadow-sm isolate cursor-default 
        outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
        transition-[transform,border-color,box-shadow] duration-500 ease-out 
        hover:-translate-y-1 hover:shadow-xl hover:border-border/80 
        focus-visible:-translate-y-1 focus-visible:shadow-xl focus-visible:border-border/80
        ${spanClass}
        ${isActive ? '-translate-y-1 shadow-xl border-border/80' : ''}
      `}
    >
      <Image
        src={photo}
        alt={member.name}
        width={200}
        height={200}
        className={`
          absolute top-0 left-1/2 -translate-x-1/2 h-full w-full max-w-[200px] 
          object-cover transform-gpu will-change-transform 
          transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] 
          group-hover:scale-105 group-focus-visible:scale-105
          ${isActive ? 'scale-105' : ''}
        `}
        loading="lazy"
      />

      <div
        className={`absolute inset-0 -z-10 flex h-full w-full items-center justify-center bg-muted/20 ${placeholderClass}`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="64"
          height="64"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-muted-foreground/30"
        >
          <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      </div>

      {/* Оверлей з градієнтом та інформацією */}
      <div
        className={`
          absolute inset-0 flex flex-col justify-end px-3 py-6 sm:px-6 text-left
          bg-gradient-to-t from-black/90 via-black/60 to-transparent
          transform-gpu will-change-[transform,opacity]
          transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
          ${isOverlayVisible 
            ? 'translate-y-0 opacity-100' 
            : 'translate-y-8 opacity-0 pointer-events-none'
          }
          group-hover:translate-y-0 group-hover:opacity-100 group-hover:pointer-events-auto
          group-focus-visible:translate-y-0 group-focus-visible:opacity-100 group-focus-visible:pointer-events-auto
        `}
      >
        <span className="block text-xl font-bold tracking-tight text-white">
          {member.name}
        </span>
        <span className="mt-1 block text-sm font-medium text-white/80">
          {member.role}
        </span>
      </div>
    </div>
  )
}
