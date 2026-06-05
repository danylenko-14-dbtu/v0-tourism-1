"use client"

import { useState } from "react"
import { Check, Phone } from "lucide-react"

interface ContactPhoneButtonProps {
  phone: string
  href: string
  label: string
  copyLabel: string
  copiedLabel: string
}

export function ContactPhoneButton({
  phone,
  href,
  label,
  copyLabel,
  copiedLabel,
}: ContactPhoneButtonProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(phone)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }

  return (
    <>
      <a
        href={href}
        className="focus-visible-ring inline-flex items-center gap-2 rounded-md border border-border/60 px-3 py-2 text-sm font-semibold text-heading transition-colors hover:border-primary/50 hover:text-link-hover sm:hidden"
      >
        <Phone className="h-4 w-4 shrink-0" aria-hidden="true" />
        <span className="sr-only">{label}</span>
        <span>{phone}</span>
      </a>

      <button
        type="button"
        onClick={handleCopy}
        aria-label={copied ? copiedLabel : `${copyLabel}: ${phone}`}
        title={copied ? copiedLabel : copyLabel}
        className="focus-visible-ring hidden items-center gap-2 rounded-md border border-border/60 px-3 py-2 text-sm font-semibold text-heading transition-colors hover:border-primary/50 hover:text-link-hover sm:inline-flex"
      >
        {copied ? (
          <Check className="h-4 w-4 shrink-0" aria-hidden="true" />
        ) : (
          <Phone className="h-4 w-4 shrink-0" aria-hidden="true" />
        )}
        <span>{copied ? copiedLabel : phone}</span>
      </button>
    </>
  )
}
