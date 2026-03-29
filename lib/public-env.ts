const DEFAULT_CONTACT_PHONE_NUMBER = '+380 50 827 1056'

const DEFAULT_PRICING_ANNUAL_PRICES = {
  bachelorFullTime: 21900,
  bachelorPartTime: 12000,
  masterFullTime: 26580,
  masterPartTime: 13500,
} as const

function readStringEnv(value: string | undefined, fallback: string) {
  return value?.trim() || fallback
}

function readNumberEnv(value: string | undefined, fallback: number) {
  const parsed = Number(value)
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback
}

function formatPhoneDisplay(value: string) {
  const normalized = value.trim().replace(/\s+/g, '')
  const digits = normalized.startsWith('+') ? normalized.slice(1) : normalized

  if (digits.startsWith('380') && digits.length === 12) {
    const local = digits.slice(3)
    return `+380 ${local.slice(0, 2)} ${local.slice(2, 5)} ${local.slice(5, 7)} ${local.slice(7)}`
  }

  return value.trim()
}

function formatPhoneTelHref(value: string) {
  const normalized = value.trim().replace(/[^\d+]/g, '')

  if (!normalized) {
    return ''
  }

  return normalized.startsWith('+') ? `tel:${normalized}` : `tel:+${normalized}`
}

const contactPhoneNumberRaw = readStringEnv(
  process.env.NEXT_PUBLIC_CONTACT_PHONE_NUMBER,
  DEFAULT_CONTACT_PHONE_NUMBER
)

export const publicEnv = {
  contactPhoneNumber: {
    display: formatPhoneDisplay(contactPhoneNumberRaw),
    telHref: formatPhoneTelHref(contactPhoneNumberRaw),
  },
  pricingAnnualPrices: {
    bachelorFullTime: readNumberEnv(
      process.env.NEXT_PUBLIC_PRICING_BACHELOR_FULL_TIME_ANNUAL_PRICE,
      DEFAULT_PRICING_ANNUAL_PRICES.bachelorFullTime
    ),
    bachelorPartTime: readNumberEnv(
      process.env.NEXT_PUBLIC_PRICING_BACHELOR_PART_TIME_ANNUAL_PRICE,
      DEFAULT_PRICING_ANNUAL_PRICES.bachelorPartTime
    ),
    masterFullTime: readNumberEnv(
      process.env.NEXT_PUBLIC_PRICING_MASTER_FULL_TIME_ANNUAL_PRICE,
      DEFAULT_PRICING_ANNUAL_PRICES.masterFullTime
    ),
    masterPartTime: readNumberEnv(
      process.env.NEXT_PUBLIC_PRICING_MASTER_PART_TIME_ANNUAL_PRICE,
      DEFAULT_PRICING_ANNUAL_PRICES.masterPartTime
    ),
  },
} as const
