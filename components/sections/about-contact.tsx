import { Mail, MapPin, Phone } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import type { Dictionary } from "@/lib/dictionaries"
import { publicEnv } from "@/lib/env"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { AboutContactMap } from "@/components/about/about-contact-map"
import { ContactPhoneButton } from "@/components/contact/contact-phone-button"

interface AboutContactProps {
  dictionary: Dictionary
}

const coordinates = {
  latitude: 50.00614662332014,
  longitude: 36.24544177116421,
} as const

export function AboutContact({ dictionary }: AboutContactProps) {
  const contact = dictionary.aboutPage.contact
  const phone = publicEnv.contactPhoneNumber

  return (
    <section
      id="about-contact"
      role="region"
      aria-labelledby="about-contact-title"
      className="scroll-mt-16 border-t border-border/50 bg-muted/30"
    >
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-24 sm:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(360px,0.9fr)] lg:px-8">
        <div>
          <h2
            id="about-contact-title"
            className="text-balance text-3xl font-bold tracking-tight text-heading sm:text-4xl"
          >
            {contact.title}
          </h2>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            {contact.subtitle}
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            <ContactInfoItem
              icon={MapPin}
              label={contact.addressLabel}
              value={dictionary.footer.address}
            />
            <ContactInfoItem
              icon={Mail}
              label={contact.departmentEmailLabel}
              value={contact.departmentEmail}
              href={`mailto:${contact.departmentEmail}`}
            />
          </div>

          <div className="mt-8 grid gap-4">
            <ContactPersonCard
              avatar={contact.admissions.avatar}
              label={contact.admissions.label}
              name={contact.admissions.name}
              detailLabel={contact.phoneLabel}
              detail={phone.display}
              detailHref={phone.telHref}
              icon={Phone}
              copyOnDesktop
              copyLabel={dictionary.contactDialog.copy}
              copiedLabel={dictionary.contactDialog.copied}
            />
            <ContactPersonCard
              avatar={contact.cooperation.avatar}
              label={contact.cooperation.label}
              name={contact.cooperation.name}
              detailLabel={contact.emailLabel}
              detail={contact.cooperation.email}
              detailHref={`mailto:${contact.cooperation.email}`}
              icon={Mail}
            />
            <ContactPersonCard
              avatar={contact.support.avatar}
              label={contact.support.label}
              name={contact.support.name}
              detailLabel={contact.emailLabel}
              detail={contact.support.email}
              detailHref={`mailto:${contact.support.email}`}
              icon={Mail}
            />
          </div>
        </div>

        <AboutContactMap
          latitude={coordinates.latitude}
          longitude={coordinates.longitude}
          markerLabel={contact.mapLabel}
        />
      </div>
    </section>
  )
}

interface ContactInfoItemProps {
  icon: LucideIcon
  label: string
  value: string
  href?: string
}

function ContactInfoItem({ icon: Icon, label, value, href }: ContactInfoItemProps) {
  const content = (
    <span className="mt-1 block text-base font-semibold leading-snug text-heading">
      {value}
    </span>
  )

  return (
    <div className="rounded-md border border-border/60 bg-background p-5 shadow-sm">
      <div className="flex items-start gap-3 lg:block">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-accent text-accent-foreground">
          <Icon className="h-5 w-5" aria-hidden="true" />
        </span>
        <div>
          <p className="text-sm leading-snug text-muted-foreground lg:mt-4">{label}</p>
          {href ? (
            <a
              href={href}
              className="focus-visible-ring rounded-sm transition-colors hover:text-link-hover lg:mt-1 lg:block lg:[overflow-wrap:anywhere]"
            >
              {content}
            </a>
          ) : (
            content
          )}
        </div>
      </div>
    </div>
  )
}

interface ContactPersonCardProps {
  avatar: string
  label: string
  name: string
  detailLabel: string
  detail: string
  detailHref: string
  icon: LucideIcon
  copyOnDesktop?: boolean
  copyLabel?: string
  copiedLabel?: string
}

function ContactPersonCard({
  avatar,
  label,
  name,
  detailLabel,
  detail,
  detailHref,
  icon: Icon,
  copyOnDesktop = false,
  copyLabel,
  copiedLabel,
}: ContactPersonCardProps) {
  return (
    <article className="rounded-md border border-border/60 bg-background p-5 shadow-sm">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 items-center gap-4">
          <Avatar className="h-14 w-14">
            <AvatarImage src={avatar} alt={name} className="object-cover object-[center_30%]" />
            <AvatarFallback>{getInitials(name)}</AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <p className="text-sm font-medium text-muted-foreground">{label}</p>
            <h3 className="text-lg font-semibold leading-snug text-heading">{name}</h3>
          </div>
        </div>

        {copyOnDesktop && copyLabel && copiedLabel ? (
          <ContactPhoneButton
            phone={detail}
            href={detailHref}
            label={detailLabel}
            copyLabel={copyLabel}
            copiedLabel={copiedLabel}
          />
        ) : (
          <a
            href={detailHref}
            className="focus-visible-ring inline-flex items-center gap-2 rounded-md border border-border/60 px-3 py-2 text-sm font-semibold text-heading transition-colors hover:border-primary/50 hover:text-link-hover"
          >
            <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
            <span className="sr-only">{detailLabel}</span>
            <span>{detail}</span>
          </a>
        )}
      </div>
    </article>
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
