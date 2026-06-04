import Link from "next/link";
import Image from "next/image";
import { buildImageUrl, type PostListItem } from "@/lib/sanity";

interface PostForDisplay {
  _id: string;
  title: string;
  href: string;
  mainImage?: PostListItem["mainImage"];
  categoryLabel?: string;
  formattedDate: string;
  excerpt?: string;
  authorName?: string;
}

interface BlogGridProps {
  posts: PostForDisplay[];
  locale: "uk" | "en";
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
};

function CategoryLabel({ label }: { label?: string }) {
  if (!label) return null;
  return <span className="text-sm font-medium text-chart-3 leading-none">{label}</span>;
}

function PostImage({
  mainImage,
  width,
  height,
  priority = false,
  className,
}: {
  mainImage?: PostListItem["mainImage"];
  width: number;
  height: number;
  priority?: boolean;
  className?: string;
}) {
  const src = buildImageUrl(mainImage, width, height);
  const lqip = mainImage?.metadata?.lqip;

  if (!src) {
    return <div className={`bg-muted ${className ?? ""}`} aria-hidden />;
  }

  return (
    <Image
      src={src}
      alt={typeof mainImage?.alt === "string" ? mainImage.alt : ""}
      fill
      sizes={`(max-width: 768px) 100vw, ${width}px`}
      priority={priority}
      placeholder={lqip ? "blur" : "empty"}
      blurDataURL={lqip}
      className={`object-cover ${className ?? ""}`}
    />
  );
}

/* ------------------------------ Hero card ------------------------------ */

function HeroCard({ post }: { post: PostForDisplay }) {
  return (
    <article className="group bg-muted/30">
      <Link
        href={post.href}
        className="grid grid-cols-1 md:grid-cols-2 focus-visible-ring rounded-sm"
      >
        <div className="relative aspect-[16/10] overflow-hidden md:aspect-auto md:min-h-[360px]">
          <PostImage
            mainImage={post.mainImage}
            width={900}
            height={562}
            priority={true}
            className="transition-transform duration-500 group-hover:scale-[1.02]"
          />
        </div>
        <div className="flex flex-col justify-between gap-8 p-6 md:p-10">
          <div className="flex flex-col gap-4">
            <CategoryLabel label={post.categoryLabel} />
            <h2 className="text-2xl font-semibold leading-tight tracking-tight text-heading text-balance md:text-3xl lg:text-4xl group-hover:underline underline-offset-4">
              {post.title}
            </h2>
            {post.excerpt && (
              <p className="text-base leading-relaxed text-muted-foreground text-pretty md:text-lg">
                {post.excerpt}
              </p>
            )}
          </div>
          <p className="text-sm text-muted-foreground">{post.formattedDate}</p>
        </div>
      </Link>
    </article>
  );
}

/* --------------------------- Horizontal card --------------------------- */
/* Used on desktop for posts[1] and posts[6] (col-span 2)                  */

function HorizontalCard({
  post,
}: {
  post: PostForDisplay;
}) {
  return (
    <article className="group h-full bg-muted/30">
      <Link href={post.href} className="grid h-full grid-cols-2 focus-visible-ring rounded-sm">
        <div className="relative overflow-hidden">
          <PostImage
            mainImage={post.mainImage}
            width={400}
            height={600}
            className="transition-transform duration-500 group-hover:scale-[1.02]"
          />
        </div>
        <div className="flex flex-col justify-between gap-6 p-5 md:p-6">
          <div className="flex flex-col gap-3">
            <CategoryLabel label={post.categoryLabel} />
            <h3 className="text-lg font-semibold leading-snug tracking-tight text-heading text-balance md:text-xl group-hover:underline underline-offset-4">
              {post.title}
            </h3>
          </div>
          <p className="text-sm text-muted-foreground">{post.formattedDate}</p>
        </div>
      </Link>
    </article>
  );
}

/* ---------------------------- Vertical card ---------------------------- */
/* Used on desktop for col-span 1 cards                                   */

function VerticalCard({ post }: { post: PostForDisplay }) {
  return (
    <article className="group h-full bg-muted/30">
      <Link href={post.href} className="flex h-full flex-col focus-visible-ring rounded-sm">
        <div className="relative aspect-[4/3] overflow-hidden">
          <PostImage
            mainImage={post.mainImage}
            width={400}
            height={300}
            className="transition-transform duration-500 group-hover:scale-[1.02]"
          />
        </div>
        <div className="flex flex-1 flex-col justify-between gap-6 p-5 md:p-6">
          <div className="flex flex-col gap-3">
            <CategoryLabel label={post.categoryLabel} />
            <h3 className="text-lg font-semibold leading-snug tracking-tight text-heading text-balance group-hover:underline underline-offset-4">
              {post.title}
            </h3>
          </div>
          <p className="text-sm text-muted-foreground">{post.formattedDate}</p>
        </div>
      </Link>
    </article>
  );
}

/* ----------------------- Tablet vertical card -------------------------- */
/* Image on top (height matches one mini-card), text below                */

function TabletVerticalCard({ post }: { post: PostForDisplay }) {
  return (
    <article className="group h-full bg-muted/30">
      <Link
        href={post.href}
        className="grid h-full grid-rows-2 focus-visible-ring rounded-sm"
      >
        <div className="relative overflow-hidden">
          <PostImage
            mainImage={post.mainImage}
            width={600}
            height={400}
            className="transition-transform duration-500 group-hover:scale-[1.02]"
          />
        </div>
        <div className="flex flex-col justify-between gap-4 p-5">
          <div className="flex flex-col gap-3">
            <CategoryLabel label={post.categoryLabel} />
            <h3 className="text-lg font-semibold leading-snug tracking-tight text-heading text-balance group-hover:underline underline-offset-4">
              {post.title}
            </h3>
          </div>
          <p className="text-sm text-muted-foreground">{post.formattedDate}</p>
        </div>
      </Link>
    </article>
  );
}

/* ------------------------ Tablet mini card ----------------------------- */
/* Small image left (1/3), text right (2/3)                              */

function TabletMiniCard({ post }: { post: PostForDisplay }) {
  return (
    <article className="group h-full bg-muted/30">
      <Link
        href={post.href}
        className="grid h-full grid-cols-3 focus-visible-ring rounded-sm"
      >
        <div className="relative col-span-1 overflow-hidden">
          <PostImage
            mainImage={post.mainImage}
            width={300}
            height={300}
            className="transition-transform duration-500 group-hover:scale-[1.02]"
          />
        </div>
        <div className="col-span-2 flex flex-col justify-between gap-3 p-4">
          <div className="flex flex-col gap-2">
            <CategoryLabel label={post.categoryLabel} />
            <h3 className="text-base font-semibold leading-snug tracking-tight text-heading text-balance group-hover:underline underline-offset-4">
              {post.title}
            </h3>
          </div>
          <p className="text-sm text-muted-foreground">{post.formattedDate}</p>
        </div>
      </Link>
    </article>
  );
}

/* -------------------- Mobile compact (horizontal small) ---------------- */

function MobileCompactCard({
  post,
}: {
  post: PostForDisplay;
}) {
  return (
    <article className="group bg-muted/30">
      <Link href={post.href} className="flex gap-4 p-3 focus-visible-ring rounded-sm">
        <div className="relative h-24 w-28 shrink-0 overflow-hidden">
          <PostImage
            mainImage={post.mainImage}
            width={112}
            height={96}
            className="transition-transform duration-500 group-hover:scale-[1.02]"
          />
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <CategoryLabel label={post.categoryLabel} />
          <h3 className="text-sm font-semibold leading-snug tracking-tight text-heading text-balance group-hover:underline underline-offset-4">
            {post.title}
          </h3>
          <p className="text-xs text-muted-foreground">{post.formattedDate}</p>
        </div>
      </Link>
    </article>
  );
}

/* -------------------- Mobile featured (vertical large) ----------------- */

function MobileFeaturedCard({
  post,
}: {
  post: PostForDisplay;
}) {
  return (
    <article className="group bg-muted/30">
      <Link href={post.href} className="flex flex-col focus-visible-ring rounded-sm">
        <div className="relative aspect-[16/10] overflow-hidden">
          <PostImage
            mainImage={post.mainImage}
            width={800}
            height={500}
            className="transition-transform duration-500 group-hover:scale-[1.02]"
          />
        </div>
        <div className="flex flex-col gap-3 p-5">
          <CategoryLabel label={post.categoryLabel} />
          <h3 className="text-xl font-semibold leading-tight tracking-tight text-heading text-balance group-hover:underline underline-offset-4">
            {post.title}
          </h3>
          <p className="text-sm text-muted-foreground">{post.formattedDate}</p>
        </div>
      </Link>
    </article>
  );
}

/* -------------------------------- Grid -------------------------------- */

export function BlogGrid({ posts, locale }: BlogGridProps) {
  if (posts.length === 0) {
    const empty = EMPTY_COPY[locale];
    return (
      <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-border/50 bg-muted/30 px-6 py-20 text-center">
          <h2 className="text-2xl font-semibold tracking-tight text-heading">{empty.title}</h2>
          <p className="max-w-md text-base text-muted-foreground">{empty.description}</p>
        </div>
      </div>
    );
  }

  const hero = posts[0];
  const row2Wide = posts[1];
  const row2Small = posts.slice(2, 4); // posts[2], posts[3]
  const row3Small = posts.slice(4, 6); // posts[4], posts[5]
  const row3Wide = posts[6];
  const rest = posts.slice(7);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
      {/* Mobile layout (< md) */}
      <div className="flex flex-col gap-6 md:hidden">
        {posts.map((post, index) => {
          if (index < 2) {
            return <MobileFeaturedCard key={post._id} post={post} />;
          }
          return <MobileCompactCard key={post._id} post={post} />;
        })}
      </div>

      {/* Tablet layout (md → lg) */}
      <div className="hidden md:flex md:flex-col md:gap-6 lg:hidden">
        {/* Row 1: Hero (full width, internal 2/2 split) */}
        <HeroCard post={hero} />

        {/* Block 1: vertical-left + 2 mini-right */}
        {(row2Wide || row2Small.length > 0) && (
          <div className="grid grid-cols-2 grid-rows-2 gap-6">
            {row2Wide && (
              <div className="row-span-2 col-start-1 row-start-1">
                <TabletVerticalCard post={row2Wide} />
              </div>
            )}
            {row2Small[0] && (
              <div className="col-start-2 row-start-1">
                <TabletMiniCard post={row2Small[0]} />
              </div>
            )}
            {row2Small[1] && (
              <div className="col-start-2 row-start-2">
                <TabletMiniCard post={row2Small[1]} />
              </div>
            )}
          </div>
        )}

        {/* Block 2 (mirrored): 2 mini-left + vertical-right */}
        {(row3Wide || row3Small.length > 0) && (
          <div className="grid grid-cols-2 grid-rows-2 gap-6">
            {row3Small[0] && (
              <div className="col-start-1 row-start-1">
                <TabletMiniCard post={row3Small[0]} />
              </div>
            )}
            {row3Small[1] && (
              <div className="col-start-1 row-start-2">
                <TabletMiniCard post={row3Small[1]} />
              </div>
            )}
            {row3Wide && (
              <div className="row-span-2 col-start-2 row-start-1">
                <TabletVerticalCard post={row3Wide} />
              </div>
            )}
          </div>
        )}

        {/* Rest: simple 2-column grid */}
        {rest.length > 0 && (
          <div className="grid grid-cols-2 gap-6">
            {rest.map((post) => (
              <div key={post._id}>
                <TabletMiniCard post={post} />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Desktop layout (lg+) */}
      <div className="hidden lg:flex lg:flex-col lg:gap-6">
        {/* Row 1: Hero (full width, internal 2/2 split) */}
        <HeroCard post={hero} />

        {/* Row 2: wide-left (2) + small (1) + small (1) */}
        {(row2Wide || row2Small.length > 0) && (
          <div className="grid grid-cols-4 gap-6">
            {row2Wide && (
              <div className="col-span-2">
                <HorizontalCard post={row2Wide} />
              </div>
            )}
            {row2Small.map((post) => (
              <div key={post._id} className="col-span-1">
                <VerticalCard post={post} />
              </div>
            ))}
          </div>
        )}

        {/* Row 3: small (1) + small (1) + wide-right (2) */}
        {(row3Wide || row3Small.length > 0) && (
          <div className="grid grid-cols-4 gap-6">
            {row3Small.map((post) => (
              <div key={post._id} className="col-span-1">
                <VerticalCard post={post} />
              </div>
            ))}
            {row3Wide && (
              <div className="col-span-2">
                <HorizontalCard post={row3Wide} />
              </div>
            )}
          </div>
        )}

        {/* Row 4+: even 4-column grid */}
        {rest.length > 0 && (
          <div className="grid grid-cols-4 gap-6">
            {rest.map((post) => (
              <div key={post._id} className="col-span-1">
                <VerticalCard post={post} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default BlogGrid;
