"use client"

import { useMemo, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export interface HomeBlogPost {
  _id: string
  title: string
  href: string
  imageUrl?: string
  blurDataURL?: string
  imageAlt?: string
  categoryLabel?: string
  formattedDate: string
  excerpt?: string
}

interface HomeBlogPostsProps {
  title: string
  subtitle: string
  allPostsLabel: string
  previousLabel: string
  nextLabel: string
  blogHref: string
  posts: HomeBlogPost[]
}

const POSTS_PER_PAGE = 4

export function HomeBlogPosts({
  title,
  subtitle,
  allPostsLabel,
  previousLabel,
  nextLabel,
  blogHref,
  posts,
}: HomeBlogPostsProps) {
  const [page, setPage] = useState(0)
  const pages = useMemo(() => chunkPosts(posts), [posts])
  const currentPosts = pages[page] ?? []

  if (posts.length === 0) {
    return null
  }

  const hasMultiplePages = pages.length > 1

  return (
    <section className="border-y border-border/50 bg-muted/30">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight text-heading sm:text-4xl">
              {title}
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              {subtitle}
            </p>
          </div>

          <div className="flex items-center gap-2">
            {hasMultiplePages ? (
              <>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  aria-label={previousLabel}
                  onClick={() => setPage((current) => Math.max(current - 1, 0))}
                  disabled={page === 0}
                  className="rounded-full"
                >
                  <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  aria-label={nextLabel}
                  onClick={() => setPage((current) => Math.min(current + 1, pages.length - 1))}
                  disabled={page === pages.length - 1}
                  className="rounded-full"
                >
                  <ChevronRight className="h-4 w-4" aria-hidden="true" />
                </Button>
              </>
            ) : null}
            <Button asChild variant="outline" className="rounded-full">
              <Link href={blogHref} className="gap-2">
                <span>{allPostsLabel}</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {currentPosts.map((post) => (
            <BlogPostCard key={post._id} post={post} />
          ))}
        </div>

        {hasMultiplePages ? (
          <div className="mt-6 flex justify-center gap-2" aria-hidden="true">
            {pages.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setPage(index)}
                className={cn(
                  "h-2.5 rounded-full transition-all",
                  index === page ? "w-8 bg-primary" : "w-2.5 bg-border hover:bg-muted-foreground/40",
                )}
                tabIndex={-1}
              />
            ))}
          </div>
        ) : null}
      </div>
    </section>
  )
}

function BlogPostCard({ post }: { post: HomeBlogPost }) {
  return (
    <article className="group h-full rounded-md border border-border/60 bg-background shadow-sm transition-[border-color,transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md">
      <Link href={post.href} className="focus-visible-ring flex h-full flex-col rounded-md">
        <div className="relative aspect-[4/3] overflow-hidden rounded-t-md bg-muted">
          {post.imageUrl ? (
            <Image
              src={post.imageUrl}
              alt={post.imageAlt ?? ""}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 280px"
              placeholder={post.blurDataURL ? "blur" : "empty"}
              blurDataURL={post.blurDataURL}
              className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
          ) : null}
        </div>
        <div className="flex flex-1 flex-col p-4">
          <div className="min-h-[132px]">
            {post.categoryLabel ? (
              <p className="text-sm font-medium leading-none text-primary">
                {post.categoryLabel}
              </p>
            ) : null}
            <h3 className="mt-3 line-clamp-3 text-lg font-semibold leading-snug text-heading group-hover:underline underline-offset-4">
              {post.title}
            </h3>
            {post.excerpt ? (
              <p className="mt-3 line-clamp-2 text-sm leading-6 text-muted-foreground">
                {post.excerpt}
              </p>
            ) : null}
          </div>
          <p className="mt-auto pt-5 text-sm text-muted-foreground">
            {post.formattedDate}
          </p>
        </div>
      </Link>
    </article>
  )
}

function chunkPosts(posts: HomeBlogPost[]) {
  const chunks: HomeBlogPost[][] = []

  for (let index = 0; index < posts.length; index += POSTS_PER_PAGE) {
    chunks.push(posts.slice(index, index + POSTS_PER_PAGE))
  }

  return chunks
}
