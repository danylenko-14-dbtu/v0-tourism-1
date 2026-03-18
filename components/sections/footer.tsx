import Link from 'next/link'
import type { Dictionary } from '@/lib/dictionaries'

interface FooterProps {
  dictionary: Dictionary
}

export function Footer({ dictionary }: FooterProps) {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-border/50 bg-muted/30">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-foreground" />
              <span className="text-lg font-semibold">Logo</span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              {dictionary.footer.description}
            </p>
          </div>

          {/* Product links */}
          <div>
            <h3 className="text-sm font-semibold">
              {dictionary.footer.links.product.title}
            </h3>
            <ul className="mt-4 space-y-3">
              {dictionary.footer.links.product.items.map((item, index) => (
                <li key={index}>
                  <Link
                    href="#"
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company links */}
          <div>
            <h3 className="text-sm font-semibold">
              {dictionary.footer.links.company.title}
            </h3>
            <ul className="mt-4 space-y-3">
              {dictionary.footer.links.company.items.map((item, index) => (
                <li key={index}>
                  <Link
                    href="#"
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal links */}
          <div>
            <h3 className="text-sm font-semibold">
              {dictionary.footer.links.legal.title}
            </h3>
            <ul className="mt-4 space-y-3">
              {dictionary.footer.links.legal.items.map((item, index) => (
                <li key={index}>
                  <Link
                    href="#"
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-border/50 pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            &copy; {currentYear} Logo. {dictionary.footer.copyright}.
          </p>
        </div>
      </div>
    </footer>
  )
}
