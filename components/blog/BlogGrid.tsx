import Link from "next/link"

interface PostForDisplay {
  _id: string
  title: string
  href: string
  imageUrl?: string
  imageAlt?: string
  categoryLabel?: string
  formattedDate: string
  excerpt?: string
  authorName?: string
  autoTranslated?: boolean
}

interface BlogGridProps {
  posts: PostForDisplay[]
  locale: "uk" | "en"
}

const EMPTY_COPY: Record<BlogGridProps["locale"], { title: string; description: string }> = {
  uk: {
    title: "Поки що немає публікацій",
    description: "Зазирніть пізніше — нові матеріали з'являться скоро.",
  },
  en: {
    title: "No posts yet",
    description: "Check back soon — new articles are on the way.",
  },
}

const AUTO_TRANSLATED_LABEL: Record<BlogGridProps["locale"], string> = {
  uk: "Автопереклад",
  en: "Auto-translated",
}

function CategoryLabel({ label }: { label?: string }) {
  if (!label) return null
  return (
    <span className="text-sm font-medium text-chart-3 leading-none">
      {label}
    </span>
  )
}

function AutoTranslatedNote({
  autoTranslated,
  locale,
}: {
  autoTranslated?: boolean
  locale: BlogGridProps["locale"]
}) {
  if (!autoTranslated || locale !== "en") return null
  return (
    <span className="mt-2 block text-xs italic text-muted-foreground">
      {AUTO_TRANSLATED_LABEL[locale]}
    </span>
  )
}

function PostImage({
  src,
  alt,
  className,
}: {
  src?: string
  alt?: string
  className?: string
}) {
  if (!src) {
    return (
      <div
        className={`bg-muted ${className ?? ""}`}
        aria-hidden="true"
      />
    )
  }
  return (
    <img
      src={src || "/placeholder.svg"}
      alt={alt ?? ""}
      loading="lazy"
      className={`h-full w-full object-cover ${className ?? ""}`}
    />
  )
}

/* ------------------------------ Hero card ------------------------------ */

function HeroCard({
  post,
  locale,
}: {
  post: PostForDisplay
  locale: BlogGridProps["locale"]
}) {
  return (
    <article className="group bg-muted/30">
      <Link
        href={post.href}
        className="grid grid-cols-1 md:grid-cols-2 focus-visible-ring rounded-sm"
      >
        <div className="relative aspect-[16/10] overflow-hidden md:aspect-auto md:min-h-[360px]">
          <PostImage
            src={post.imageUrl}
            alt={post.imageAlt ?? post.title}
            className="transition-transform duration-500 group-hover:scale-[1.02]"
          />
        </div>
        <div className="flex flex-col justify-between gap-8 p-6 md:p-10">
          <div className="flex flex-col gap-4">
            <CategoryLabel label={post.categoryLabel} />
            <h2 className="text-2xl font-semibold leading-tight tracking-tight text-foreground text-balance md:text-3xl lg:text-4xl group-hover:underline underline-offset-4">
              {post.title}
            </h2>
            {post.excerpt && (
              <p className="text-base leading-relaxed text-muted-foreground text-pretty md:text-lg">
                {post.excerpt}
              </p>
            )}
            <AutoTranslatedNote autoTranslated={post.autoTranslated} locale={locale} />
          </div>
          <p className="text-sm text-muted-foreground">{post.formattedDate}</p>
        </div>
      </Link>
    </article>
  )
}

/* --------------------------- Horizontal card --------------------------- */
/* Used on desktop for posts[1] and posts[6] (col-span 2)                  */

function HorizontalCard({
  post,
  locale,
}: {
  post: PostForDisplay
  locale: BlogGridProps["locale"]
}) {
  return (
    <article className="group h-full bg-muted/30">
      <Link
        href={post.href}
        className="grid h-full grid-cols-2 focus-visible-ring rounded-sm"
      >
        <div className="relative overflow-hidden">
          <PostImage
            src={post.imageUrl}
            alt={post.imageAlt ?? post.title}
            className="transition-transform duration-500 group-hover:scale-[1.02]"
          />
        </div>
        <div className="flex flex-col justify-between gap-6 p-5 md:p-6">
          <div className="flex flex-col gap-3">
            <CategoryLabel label={post.categoryLabel} />
            <h3 className="text-lg font-semibold leading-snug tracking-tight text-foreground text-balance md:text-xl group-hover:underline underline-offset-4">
              {post.title}
            </h3>
            <AutoTranslatedNote autoTranslated={post.autoTranslated} locale={locale} />
          </div>
          <p className="text-sm text-muted-foreground">{post.formattedDate}</p>
        </div>
      </Link>
    </article>
  )
}

/* ---------------------------- Vertical card ---------------------------- */
/* Used on desktop for col-span 1 cards                                   */

function VerticalCard({
  post,
  locale,
}: {
  post: PostForDisplay
  locale: BlogGridProps["locale"]
}) {
  return (
    <article className="group h-full bg-muted/30">
      <Link
        href={post.href}
        className="flex h-full flex-col focus-visible-ring rounded-sm"
      >
        <div className="relative aspect-[4/3] overflow-hidden">
          <PostImage
            src={post.imageUrl}
            alt={post.imageAlt ?? post.title}
            className="transition-transform duration-500 group-hover:scale-[1.02]"
          />
        </div>
        <div className="flex flex-1 flex-col justify-between gap-6 p-5 md:p-6">
          <div className="flex flex-col gap-3">
            <CategoryLabel label={post.categoryLabel} />
            <h3 className="text-lg font-semibold leading-snug tracking-tight text-foreground text-balance group-hover:underline underline-offset-4">
              {post.title}
            </h3>
            <AutoTranslatedNote autoTranslated={post.autoTranslated} locale={locale} />
          </div>
          <p className="text-sm text-muted-foreground">{post.formattedDate}</p>
        </div>
      </Link>
    </article>
  )
}

/* -------------------- Mobile compact (horizontal small) ---------------- */

function MobileCompactCard({
  post,
  locale,
}: {
  post: PostForDisplay
  locale: BlogGridProps["locale"]
}) {
  return (
    <article className="group bg-muted/30">
      <Link
        href={post.href}
        className="flex gap-4 p-3 focus-visible-ring rounded-sm"
      >
        <div className="relative h-24 w-28 shrink-0 overflow-hidden">
          <PostImage
            src={post.imageUrl}
            alt={post.imageAlt ?? post.title}
            className="transition-transform duration-500 group-hover:scale-[1.02]"
          />
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <CategoryLabel label={post.categoryLabel} />
          <h3 className="text-sm font-semibold leading-snug tracking-tight text-foreground text-balance group-hover:underline underline-offset-4">
            {post.title}
          </h3>
          <p className="text-xs text-muted-foreground">{post.formattedDate}</p>
          <AutoTranslatedNote autoTranslated={post.autoTranslated} locale={locale} />
        </div>
      </Link>
    </article>
  )
}

/* -------------------- Mobile featured (vertical large) ----------------- */

function MobileFeaturedCard({
  post,
  locale,
}: {
  post: PostForDisplay
  locale: BlogGridProps["locale"]
}) {
  return (
    <article className="group bg-muted/30">
      <Link
        href={post.href}
        className="flex flex-col focus-visible-ring rounded-sm"
      >
        <div className="relative aspect-[16/10] overflow-hidden">
          <PostImage
            src={post.imageUrl}
            alt={post.imageAlt ?? post.title}
            className="transition-transform duration-500 group-hover:scale-[1.02]"
          />
        </div>
        <div className="flex flex-col gap-3 p-5">
          <CategoryLabel label={post.categoryLabel} />
          <h3 className="text-xl font-semibold leading-tight tracking-tight text-foreground text-balance group-hover:underline underline-offset-4">
            {post.title}
          </h3>
          <AutoTranslatedNote autoTranslated={post.autoTranslated} locale={locale} />
          <p className="text-sm text-muted-foreground">{post.formattedDate}</p>
        </div>
      </Link>
    </article>
  )
}

/* -------------------------------- Grid -------------------------------- */

export function BlogGrid({ posts, locale }: BlogGridProps) {
  if (posts.length === 0) {
    const empty = EMPTY_COPY[locale]
    return (
      <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-border/50 bg-muted/30 px-6 py-20 text-center">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">
            {empty.title}
          </h2>
          <p className="max-w-md text-base text-muted-foreground">
            {empty.description}
          </p>
        </div>
      </div>
    )
  }

  const hero = posts[0]
  const row2Wide = posts[1]
  const row2Small = posts.slice(2, 4) // posts[2], posts[3]
  const row3Small = posts.slice(4, 6) // posts[4], posts[5]
  const row3Wide = posts[6]
  const rest = posts.slice(7)

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
      {/* Mobile layout */}
      <div className="flex flex-col gap-6 md:hidden">
        {posts.map((post, index) => {
          if (index < 2) {
            return <MobileFeaturedCard key={post._id} post={post} locale={locale} />
          }
          return <MobileCompactCard key={post._id} post={post} locale={locale} />
        })}
      </div>

      {/* Desktop layout */}
      <div className="hidden md:flex md:flex-col md:gap-6">
        {/* Row 1: Hero (full width, internal 2/2 split) */}
        <HeroCard post={hero} locale={locale} />

        {/* Row 2: wide-left (2) + small (1) + small (1) */}
        {(row2Wide || row2Small.length > 0) && (
          <div className="grid grid-cols-4 gap-6">
            {row2Wide && (
              <div className="col-span-2">
                <HorizontalCard post={row2Wide} locale={locale} />
              </div>
            )}
            {row2Small.map((post) => (
              <div key={post._id} className="col-span-1">
                <VerticalCard post={post} locale={locale} />
              </div>
            ))}
          </div>
        )}

        {/* Row 3: small (1) + small (1) + wide-right (2) */}
        {(row3Wide || row3Small.length > 0) && (
          <div className="grid grid-cols-4 gap-6">
            {row3Small.map((post) => (
              <div key={post._id} className="col-span-1">
                <VerticalCard post={post} locale={locale} />
              </div>
            ))}
            {row3Wide && (
              <div className="col-span-2">
                <HorizontalCard post={row3Wide} locale={locale} />
              </div>
            )}
          </div>
        )}

        {/* Row 4+: even 4-column grid */}
        {rest.length > 0 && (
          <div className="grid grid-cols-4 gap-6">
            {rest.map((post) => (
              <div key={post._id} className="col-span-1">
                <VerticalCard post={post} locale={locale} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default BlogGrid
