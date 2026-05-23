import Image from "next/image";
import { Clock } from "lucide-react";
import { MOCK_POST } from "@/mocks/mockPost";
import { PostAuthor } from "@/components/blog/PostAuthor";
import { PostShareButtons } from "@/components/blog/PostShareButtons";
import { PostSidebar } from "@/components/blog/PostSidebar";
import { PostBody } from "@/components/blog/PostBody";
import { MobileShareBar } from "@/components/blog/MobileShareBar";

export const metadata = {
  title: MOCK_POST.title,
  description: MOCK_POST.excerpt,
};

const SHARE_URL = "https://example.com/uk/blog/test-post";
const HERO_AUTHOR_ID = "post-hero-author";
const BANNER_ID = "post-hero-banner";

export default function TestPostPage() {
  const post = MOCK_POST;

  return (
    <main className="bg-background">
      <article className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
        {/* ================== HERO (full content width) ================== */}
        <header className="max-w-4xl">
          {/* Category */}
          <span className="inline-flex items-center rounded-md bg-chart-3 px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-white">
            {post.categoryLabel}
          </span>

          {/* Title */}
          <h1 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-foreground text-balance md:text-4xl lg:text-5xl">
            {post.title}
          </h1>

          {/* Date + reading time */}
          <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
            <span>{post.formattedDate}</span>
            <span aria-hidden className="text-border">|</span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-4 w-4" aria-hidden />
              {post.readingTime}
            </span>
          </div>
        </header>

        {/* Hero banner — spans the full content width */}
        <div
          id={BANNER_ID}
          className="relative mt-8 aspect-[16/8] w-full overflow-hidden rounded-md bg-muted lg:aspect-[16/7]"
        >
          <Image
            src={post.imageUrl}
            alt={post.imageAlt}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 1100px"
            className="object-cover"
          />
        </div>

        {/* =================== Two-column grid below banner =================== */}
        <div className="mt-8 grid grid-cols-1 gap-x-12 gap-y-8 lg:grid-cols-[minmax(0,1fr)_240px]">
          {/* ===================== LEFT COLUMN ===================== */}
          <div className="min-w-0">
            {/* Author block under banner */}
            <div
              id={HERO_AUTHOR_ID}
              className="flex items-center justify-between gap-6 border-b border-border/60 pb-8"
            >
              <PostAuthor author={post.author} />

              {/* Desktop-only: inline Share row right under the banner.
                  On scroll past the banner, it scrolls away and the sticky
                  sidebar takes over. On mobile/tablet the share is handled
                  by the sticky bottom bar. */}
              <div className="hidden flex-col items-end gap-2 lg:flex">
                <span className="text-sm font-semibold text-foreground">
                  Share it!
                </span>
                <PostShareButtons
                  url={SHARE_URL}
                  title={post.title}
                  variant="row"
                />
              </div>
            </div>

            {/* Body */}
            <div className="pt-8">
              <PostBody blocks={post.body as never} />
            </div>
          </div>

          {/* ============== RIGHT COLUMN (sticky sidebar — desktop only) ============== */}
          <PostSidebar
            author={post.author}
            shareUrl={SHARE_URL}
            shareTitle={post.title}
            triggerAnchorId={BANNER_ID}
          />
        </div>
      </article>

      {/* Sticky bottom share bar — mobile/tablet only */}
      <MobileShareBar
        url={SHARE_URL}
        title={post.title}
        triggerAnchorId={HERO_AUTHOR_ID}
      />
    </main>
  );
}
