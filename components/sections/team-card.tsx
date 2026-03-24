"use client"

import { useState } from 'react'

interface TeamCardProps {
  member: { name: string; role: string }
  index: number
}

export function TeamCard({ member, index }: TeamCardProps) {
  const [isActive, setIsActive] = useState(false)

  const photo = `/staff/staff-photo-${index + 1}.jpg`

  const spanClass =
    index === 0
      ? 'md:col-span-3 lg:col-span-4'
      : index === 1
        ? 'md:col-span-3 lg:col-span-2'
        : 'md:col-span-2 lg:col-span-2'

  const placeholderClass =
    index === 0 ? 'dark:bg-[#fbfbfb]' : 'bg-white dark:bg-white'

  return (
    <div
      tabIndex={0}
      onClick={() => setIsActive((prev) => !prev)}
      onBlur={() => setIsActive(false)}
      className={`
        group relative flex h-[200px] lg:h-[220px] w-full
        max-w-[500px] mx-auto items-center justify-center
        overflow-hidden rounded-2xl border border-border/50
        bg-muted/40 shadow-sm isolate cursor-pointer outline-none
        transition-all duration-500 ease-out
        hover:-translate-y-1 hover:shadow-xl hover:border-border/80
        ${spanClass}
        ${isActive ? '-translate-y-1 shadow-xl border-border/80' : ''}
      `}
    >
      <img
        src={photo}
        alt={member.name}
        className={`
          absolute left-1/2 -translate-x-[50%] inset-0
          h-full w-full object-cover max-w-[200px]
          transition-transform duration-700 ease-out
          group-hover:scale-105
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

      <div
        className={`
          absolute inset-0 flex flex-col justify-end p-6 text-left
          bg-gradient-to-t from-black/90 via-black/60 to-transparent
          transition-all duration-500 ease-out
          group-hover:translate-y-0 group-hover:opacity-100
          ${isActive ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}
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
