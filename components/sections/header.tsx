import { BrandLogo } from "@/components/brand-logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageSwitcher } from "@/components/language-switcher";
import { ScrollLink } from "@/components/scroll-link";
import { MobileMenu } from "@/components/mobile-menu";
import type { Locale } from "@/lib/i18n";
import type { Dictionary } from "@/lib/dictionaries";

interface HeaderProps {
  locale: Locale;
  dictionary: Dictionary;
}

export function Header({ locale, dictionary }: HeaderProps) {
  const navItems = [
    { href: "#professions", label: dictionary.nav.professions },
    { href: "#program-facts", label: dictionary.nav.program },
    { href: "#application", label: dictionary.nav.application },
    { href: "#contact", label: dictionary.nav.contact },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-md">
      <div className="relative mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <BrandLogo
          href={`/${locale}`}
          label={dictionary.brand.name}
          title={dictionary.brand.university}
          className="focus-visible-ring flex items-center gap-3 rounded-md"
          variant="split"
        />

        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <ScrollLink
              key={item.href}
              href={item.href}
              className="focus-visible-ring rounded-md px-2 py-1 text-[0.95rem] font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:bg-muted/50 focus-visible:text-foreground focus-visible:underline"
            >
              {item.label}
            </ScrollLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden sm:block">
            <LanguageSwitcher currentLocale={locale} />
          </div>
          <ThemeToggle />
          <MobileMenu navItems={navItems} locale={locale} />
        </div>
      </div>
    </header>
  );
}
