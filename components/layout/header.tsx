import { BrandLogo } from "@/components/brand-logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageSwitcher } from "@/components/language-switcher";
import { HeaderContactButton } from "@/components/header-contact-button";
import { HeaderNav, type HeaderNavItem } from "@/components/header-nav";
import { MobileMenu } from "@/components/mobile-menu";
import type { Locale } from "@/lib/i18n";
import type { Dictionary } from "@/lib/dictionaries";

interface HeaderProps {
  locale: Locale;
  dictionary: Dictionary;
}

export function Header({ locale, dictionary }: HeaderProps) {
  const isEnglish = locale === "en";
  const localeRoot = `/${locale}`;
  const navItems: HeaderNavItem[] = [
    { href: localeRoot, label: isEnglish ? "Home" : "Головна", exact: true },
    { href: `${localeRoot}/about-us`, label: isEnglish ? "About Us" : "Про нас" },
    { href: `${localeRoot}/program`, label: isEnglish ? "Program" : "Програма" },
    { href: `${localeRoot}/blog`, label: isEnglish ? "Blog" : "Блог" },
    { href: `${localeRoot}/contacts`, label: dictionary.nav.contact },
  ];
  const contactLabel = dictionary.nav.contactButtonShort;
  const mobileContactLabel = dictionary.nav.contactButton;

  return (
    <>
      <header className="fixed inset-x-0 bottom-0 top-auto z-50 w-full border-t border-border/50 bg-background/90 backdrop-blur-md md:sticky md:bottom-auto md:top-0 md:border-b md:border-t-0 md:bg-background/80">
        <div className="relative mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <BrandLogo
            href={`/${locale}`}
            label={dictionary.brand.name}
            title={dictionary.brand.university}
            className="focus-visible-ring flex items-center gap-3 rounded-md"
            variant="split"
          />

          <HeaderNav items={navItems} className="hidden lg:flex" />

          <div className="flex items-center gap-3 md:gap-6">
            <div className="hidden md:block">
              <HeaderContactButton label={contactLabel} tabletLabel={mobileContactLabel} />
            </div>
            <div className="hidden items-center gap-3 md:flex">
              <LanguageSwitcher currentLocale={locale} />
              <ThemeToggle />
            </div>
            <MobileMenu navItems={navItems} locale={locale} contactLabel={mobileContactLabel} />
          </div>
        </div>
      </header>

      <div className="fixed inset-x-0 bottom-0 z-40 hidden border-t border-border/50 bg-background/95 backdrop-blur-md md:block lg:hidden">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-center overflow-x-auto px-4 sm:px-6">
          <HeaderNav items={navItems} className="flex" />
        </div>
      </div>
    </>
  );
}
