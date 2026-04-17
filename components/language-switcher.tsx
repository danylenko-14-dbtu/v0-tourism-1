"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, localeNames, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { getLocalizedPath } from "@/lib/navigation";

interface LanguageSwitcherProps {
  currentLocale: Locale;
}

export function LanguageSwitcher({ currentLocale }: LanguageSwitcherProps) {
  const pathname = usePathname();

  return (
    <div className="flex items-center gap-1 rounded-full border border-border bg-muted/50 p-1">
      {locales.map((locale) => (
        <Link
          key={locale}
          href={getLocalizedPath(pathname, locale)}
          className={cn(
            "focus-visible-ring rounded-full px-3 py-1 text-sm font-medium transition-all duration-200",
            locale === currentLocale
              ? "bg-background text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground focus-visible:bg-background focus-visible:text-foreground focus-visible:shadow-sm"
          )}
        >
          {localeNames[locale]}
        </Link>
      ))}
    </div>
  );
}
