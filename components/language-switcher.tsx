"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { IoLanguageOutline } from "react-icons/io5";
import { locales, localeNames, type Locale } from "@/lib/i18n";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface LanguageSwitcherProps {
  currentLocale: Locale;
  variant?: "dropdown" | "segmented";
}

export function LanguageSwitcher({ currentLocale, variant = "dropdown" }: LanguageSwitcherProps) {
  const pathname = usePathname();

  const getLocalizedPath = (locale: Locale) => {
    const segments = pathname.split("/");
    segments[1] = locale;
    return segments.join("/");
  };

  if (variant === "segmented") {
    return (
      <div className="flex items-center gap-1 rounded-full border border-border bg-muted/50 p-1">
        {locales.map((locale) => (
          <Link
            key={locale}
            href={getLocalizedPath(locale)}
            className={cn(
              "focus-visible-ring rounded-full px-3 py-1 text-sm font-medium transition-all duration-200",
              locale === currentLocale
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-link-hover focus-visible:bg-background focus-visible:text-link-hover focus-visible:shadow-sm"
            )}
          >
            {localeNames[locale]}
          </Link>
        ))}
      </div>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="focus-visible-ring inline-flex h-9 items-center gap-0.5 rounded-md px-2 text-sm font-medium text-muted-foreground transition-colors hover:text-link-hover focus-visible:bg-muted/50 focus-visible:text-link-hover data-[state=open]:text-link-hover"
        aria-label="Change language"
      >
        <IoLanguageOutline className="h-5 w-5" aria-hidden="true" />
        <span>{currentLocale}</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-20">
        {locales.map((locale) => (
          <DropdownMenuItem key={locale} asChild>
            <Link
              href={getLocalizedPath(locale)}
              className="flex w-full items-center justify-between text-sm"
              aria-current={locale === currentLocale ? "page" : undefined}
            >
              {locale}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
