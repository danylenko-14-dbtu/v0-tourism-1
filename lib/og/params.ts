const LIMITS = {
  title: 80,
  excerpt: 120,
  author: 60,
  avatar: 300,
  cover: 300,
  category: 40,
  date: 30,
} as const;

function truncate(str: string, max: number): string {
  const chars = [...str];
  return chars.length > max ? chars.slice(0, max).join("").trimEnd() + "…" : str;
}

function sanitizeUrl(raw: string): string {
  if (!raw.startsWith("http://") && !raw.startsWith("https://")) return "";
  return raw;
}

export interface OgParams {
  title: string;
  excerpt: string;
  author: string;
  avatar: string;
  cover: string;
  category: string;
  date: string;
  locale: string;
}

export function parseOgParams(searchParams: URLSearchParams): OgParams {
  const get = (key: string) => searchParams.get(key) ?? "";
  return {
    title: truncate(get("title") || "Блог кафедри туризму", LIMITS.title),
    excerpt: truncate(get("excerpt"), LIMITS.excerpt),
    author: truncate(get("author"), LIMITS.author),
    avatar: sanitizeUrl(truncate(get("avatar"), LIMITS.avatar)),
    cover: sanitizeUrl(truncate(get("cover"), LIMITS.cover)),
    category: truncate(get("category") || "Блог", LIMITS.category),
    date: truncate(get("date"), LIMITS.date),
    locale: get("locale") === "en" ? "en" : "uk",
  };
}

export function formatDate(isoDate: string, locale: string): string {
  if (!isoDate) return "";
  try {
    return new Intl.DateTimeFormat(locale === "uk" ? "uk-UA" : "en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(new Date(isoDate));
  } catch {
    return "";
  }
}
