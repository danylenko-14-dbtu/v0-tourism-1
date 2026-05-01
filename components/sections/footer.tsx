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
  const socialLinks = [
    {
      href: "https://www.facebook.com/groups/2391713780998700",
      label: "Facebook",
      icon: FaFacebook,
    },
    { href: "https://www.tiktok.com/@tourism_dbtu", label: "TikTok", icon: FaTiktok },
  ];

  return (
    <footer className="border-t border-border/50 bg-muted/30">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <BrandLogo
              title={dictionary.brand.university}
              href={`/${locale}`}
              label={dictionary.brand.name}
              className="focus-visible-ring flex items-center gap-3"
              textClassName="text-lg font-semibold leading-none"
            />
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              {dictionary.footer.description}
            </p>
          </div>

          {/* Study links */}
          <div>
            <h3 className="text-sm font-semibold">{dictionary.footer.links.study.title}</h3>
            <ul className="mt-4 space-y-3">
              {dictionary.footer.links.study.items.map((item, index) => {
                const external = isExternalHref(item.href);

                return (
                  <li key={index}>
                    <Link
                      href={item.href || "#"}
                      target={external ? "_blank" : undefined}
                      rel={external ? "noopener noreferrer" : undefined}
                      className="focus-visible-ring inline-flex rounded-md px-2 py-1 text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:text-foreground focus-visible:underline"
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
            <h3 className="text-sm font-semibold">{dictionary.footer.links.department.title}</h3>
            <ul className="mt-4 space-y-3">
              {dictionary.footer.links.department.items.map((item, index) => {
                const external = isExternalHref(item.href);

                return (
                  <li key={index}>
                    <Link
                      href={item.href || "#"}
                      target={external ? "_blank" : undefined}
                      rel={external ? "noopener noreferrer" : undefined}
                      className="focus-visible-ring inline-flex rounded-md px-2 py-1 text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:text-foreground focus-visible:underline"
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
            <h3 className="text-sm font-semibold">{dictionary.footer.links.legal.title}</h3>
            <ul className="mt-4 space-y-3">
              {dictionary.footer.links.legal.items.map((item, index) => {
                const external = isExternalHref(item.href);

                return (
                  <li key={index}>
                    <Link
                      href={item.href || "#"}
                      target={external ? "_blank" : undefined}
                      rel={external ? "noopener noreferrer" : undefined}
                      className="focus-visible-ring inline-flex rounded-md px-2 py-1 text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:text-foreground focus-visible:underline"
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="w-full flex flex-wrap items-center gap-2 justify-center mt-8 mb-8">
          {socialLinks.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.label}
                target="_blank"
                rel="noopener noreferrer"
                href={item.href}
                aria-label={item.label}
                className="focus-visible-ring inline-flex rounded-md px-2 py-1 text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:text-foreground focus-visible:underline"
              >
                <Icon className="h-5 w-5" />
              </Link>
            );
          })}
          <div className="text-sm text-muted-foreground">
            <MapPin className="inline" /> <span>{dictionary.footer.address}</span>
          </div>
        </div>

        <div className=" border-t border-border/50 pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            &copy; {currentYear} {dictionary.brand.department} {dictionary.footer.copyright}.
          </p>
        </div>
      </div>
    </footer>
  );
}
