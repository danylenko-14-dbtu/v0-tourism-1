import Link from "next/link";
import { FaFacebook, FaTiktok } from "react-icons/fa6";
import { BrandLogo } from "@/components/brand-logo";
import type { Locale } from "@/lib/i18n";
import type { Dictionary } from "@/lib/dictionaries";
import { MapPin } from "lucide-react";

interface FooterProps {
  dictionary: Dictionary;
  locale: Locale;
}

function isExternalHref(href?: string) {
  if (!href) return false;
  if (href.startsWith("#") || href.startsWith("/")) return false;
  return href.startsWith("http") || href.startsWith("//");
}

export function Footer({ dictionary, locale }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const localizeHref = (href?: string) => {
    if (href === "/blog") return `/${locale}/blog`;
    return href || "#";
  };
  const socialLinks = [
    {
      href: "https://www.facebook.com/groups/2391713780998700",
      label: "Facebook",
      icon: FaFacebook,
    },
    { href: "https://www.tiktok.com/@tourism_dbtu", label: "TikTok", icon: FaTiktok },
  ];

  return (
    <footer className="border-t border-primary/70">
      <div className="bg-primary text-footer-foreground">
        <div className="mx-auto max-w-6xl px-4 pt-16 pb-6 sm:px-6 lg:px-8">
          <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
            {/* Brand */}
            <div className="lg:col-span-1">
              <BrandLogo
                title={dictionary.brand.university}
                href={`/${locale}`}
                label={dictionary.brand.name}
                className="focus-visible-ring-inverted flex items-center gap-3"
                textClassName="text-lg font-semibold leading-none text-footer-foreground"
              />
              <p className="mt-4 text-sm leading-relaxed text-footer-foreground/90">
                {dictionary.footer.description}
              </p>
            </div>

            {/* Study links */}
            <div>
              <h3 className="!text-footer-foreground text-sm font-semibold">
                {dictionary.footer.links.study.title}
              </h3>
              <ul className="mt-4 space-y-3">
                {dictionary.footer.links.study.items.map((item, index) => {
                  const external = isExternalHref(item.href);

                  return (
                    <li key={index}>
                      <Link
                        href={localizeHref(item.href)}
                        target={external ? "_blank" : undefined}
                        rel={external ? "noopener noreferrer" : undefined}
                        className="focus-visible-ring-inverted inline-flex rounded-md px-2 py-1 text-sm text-footer-foreground/90 transition-colors hover:text-footer-link-hover focus-visible:text-footer-link-hover focus-visible:underline"
                      >
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Department links */}
            <div>
              <h3 className="!text-footer-foreground text-sm font-semibold">
                {dictionary.footer.links.department.title}
              </h3>
              <ul className="mt-4 space-y-3">
                {dictionary.footer.links.department.items.map((item, index) => {
                  const external = isExternalHref(item.href);

                  return (
                    <li key={index}>
                      <Link
                        href={localizeHref(item.href)}
                        target={external ? "_blank" : undefined}
                        rel={external ? "noopener noreferrer" : undefined}
                        className="focus-visible-ring-inverted inline-flex rounded-md px-2 py-1 text-sm text-footer-foreground/90 transition-colors hover:text-footer-link-hover focus-visible:text-footer-link-hover focus-visible:underline"
                      >
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Legal links */}
            <div>
              <h3 className="!text-footer-foreground text-sm font-semibold">
                {dictionary.footer.links.legal.title}
              </h3>
              <ul className="mt-4 space-y-3">
                {dictionary.footer.links.legal.items.map((item, index) => {
                  const external = isExternalHref(item.href);

                  return (
                    <li key={index}>
                      <Link
                        href={localizeHref(item.href)}
                        target={external ? "_blank" : undefined}
                        rel={external ? "noopener noreferrer" : undefined}
                        className="focus-visible-ring-inverted inline-flex rounded-md px-2 py-1 text-sm text-footer-foreground/90 transition-colors hover:text-footer-link-hover focus-visible:text-footer-link-hover focus-visible:underline"
                      >
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          <div className="w-full flex flex-wrap items-center gap-2 justify-center mt-8">
            {socialLinks.map((item) => {
              const Icon = item.icon;

              return (
                <Link
                  key={item.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  href={item.href}
                  aria-label={item.label}
                  className="focus-visible-ring-inverted inline-flex rounded-md px-2 py-1 text-sm text-footer-foreground/90 transition-colors hover:text-footer-link-hover focus-visible:text-footer-link-hover focus-visible:underline"
                >
                  <Icon className="h-5 w-5" />
                </Link>
              );
            })}
            <div className="text-sm text-footer-foreground/90">
              <MapPin className="inline" /> <span>{dictionary.footer.address}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-footer text-footer-foreground">
        <div className="mx-auto max-w-6xl px-4 pt-6 pb-16 text-center sm:px-6 lg:px-8">
          <p className="text-sm text-footer-foreground/90">
            &copy; {currentYear} {dictionary.brand.department} {dictionary.footer.copyright}.
          </p>
        </div>
      </div>
    </footer>
  );
}
