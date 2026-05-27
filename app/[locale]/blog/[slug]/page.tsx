import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Clock } from "lucide-react";
import { getPostBySlug, getRecentPostSlugs, asDisplayString } from "@/lib/blog";
import { getDictionary } from "@/lib/dictionaries";
import { urlFor, type PostBodyNode, type PostBodyBlock } from "@/lib/sanity";
import { PostAuthor } from "@/components/blog/PostAuthor";
import { PostSidebar } from "@/components/blog/PostSidebar";
import { PostBody } from "@/components/blog/PostBody";
import { MobileShareBar } from "@/components/blog/MobileShareBar";

interface Props {
  params: Promise<{ locale: string; slug: string }>;
}

export const revalidate = 3600;

const HERO_AUTHOR_ID = "post-hero-author";
const BANNER_ID = "post-hero-banner";

function normalizeLocale(locale: string): "uk" | "en" {
  return locale === "en" ? "en" : "uk";
}

function calculateReadingTime(body: PostBodyNode[] | undefined, locale: "uk" | "en") {
  const words = (body ?? []).reduce((sum, node) => {
    if (node._type !== "block") return sum;
    const block = node as PostBodyBlock;
    const text = block.children.map((c) => c.text ?? "").join(" ");
    const count = text.trim().split(/\s+/).filter(Boolean).length;
    return sum + count;
  }, 0);
  const minutes = Math.max(1, Math.round(words / 200));
  return locale === "uk" ? `${minutes} хв читання` : `${minutes} min read`;
}

export async function generateStaticParams() {
  const slugs = await getRecentPostSlugs(20);
  return slugs.flatMap((slug) => [
    { locale: "uk", slug },
    { locale: "en", slug },
  ]);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const normalizedLocale = normalizeLocale(locale);
  const post = await getPostBySlug(normalizedLocale, slug);
  if (!post) return {};

  const title = asDisplayString(post.title, normalizedLocale);
  const description = asDisplayString(post.excerpt, normalizedLocale);

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ?? process.env.SITE_URL ?? "http://localhost:3000";
  const postUrl = `${siteUrl}/${normalizedLocale}/blog/${slug}`;
  const ogImageUrl = new URL(`${siteUrl}/api/og`);
  ogImageUrl.searchParams.set("slug", slug);
  ogImageUrl.searchParams.set("locale", normalizedLocale);

  return {
    title,
    description,
    alternates: {
      canonical: postUrl,
    },
    openGraph: {
      title,
      description,
      url: postUrl,
      type: "article",
      images: [{ url: ogImageUrl.toString(), width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImageUrl.toString()],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { locale, slug } = await params;
  const normalizedLocale = normalizeLocale(locale);
  const post = await getPostBySlug(normalizedLocale, slug);
  const dictionary = await getDictionary(normalizedLocale);

  if (!post) notFound();

  const shareUrl = `${process.env.NEXT_PUBLIC_SITE_URL ?? ""}/${normalizedLocale}/blog/${slug}`;

  const imageUrl = post.mainImage
    ? urlFor(post.mainImage).width(1600).height(800).fit("crop").url()
    : "";

  const postForDisplay = {
    title: asDisplayString(post.title, normalizedLocale) ?? "",
    excerpt: asDisplayString(post.excerpt, normalizedLocale) ?? "",
    categoryLabel: asDisplayString(post.categories?.[0]?.title, normalizedLocale) ?? "",
    formattedDate: new Date(post.publishedAt).toLocaleDateString(
      normalizedLocale === "uk" ? "uk-UA" : "en-US",
      { year: "numeric", month: "long", day: "numeric" }
    ),
    readingTime: calculateReadingTime(post.body, normalizedLocale),
    imageUrl,
    imageAlt:
      asDisplayString(post.mainImage?.alt, normalizedLocale) ??
      asDisplayString(post.title, normalizedLocale) ??
      "",
    author: {
      name: asDisplayString(post.author?.name, normalizedLocale) ?? "",
      bio: asDisplayString(post.author?.bio, normalizedLocale),
      avatarUrl: post.author?.avatarUrl,
    },
    body: post.body ?? [],
  };

  return (
    <main className="bg-background">
      <article className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
        {/* ================== HERO (full content width) ================== */}
        <header className="max-w-4xl">
          {/* Category */}
          {postForDisplay.categoryLabel && (
            <span className="inline-flex items-center rounded-md bg-chart-3 px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-white">
              {postForDisplay.categoryLabel}
            </span>
          )}

          {/* Title */}
          <h1 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-foreground text-balance md:text-4xl lg:text-5xl">
            {postForDisplay.title}
          </h1>

          {/* Date + reading time */}
          <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
            <span>{postForDisplay.formattedDate}</span>
            <span aria-hidden className="text-border">
              |
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-4 w-4" aria-hidden />
              {postForDisplay.readingTime}
            </span>
          </div>
        </header>

        {/* Hero banner — spans the full content width */}
        <div
          id={BANNER_ID}
          className="relative mt-8 aspect-[16/8] w-full overflow-hidden rounded-md bg-muted lg:aspect-[16/7]"
        >
          {postForDisplay.imageUrl && (
            <Image
              src={postForDisplay.imageUrl}
              alt={postForDisplay.imageAlt}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 1100px"
              className="object-cover"
            />
          )}
        </div>

        {/* =================== Two-column grid below banner =================== */}
        <div className="mt-8 grid grid-cols-1 gap-x-12 gap-y-8 lg:grid-cols-[minmax(0,1fr)_240px]">
          {/* ===================== LEFT COLUMN ===================== */}
          <div className="min-w-0">
            {/* Author block under banner */}
            <div id={HERO_AUTHOR_ID} className="border-b border-border/60 pb-8">
              <PostAuthor author={postForDisplay.author} />
            </div>

            {/* Body */}
            <div className="pt-8">
              <PostBody blocks={postForDisplay.body} />
            </div>
          </div>

          {/* ============== RIGHT COLUMN (sticky sidebar — desktop only) ============== */}
          <PostSidebar
            author={postForDisplay.author}
            title={postForDisplay.title}
            formattedDate={postForDisplay.formattedDate}
            readingTime={postForDisplay.readingTime}
            shareUrl={shareUrl}
            shareTitle={postForDisplay.title}
            shareLabels={dictionary.blog.share}
            triggerAnchorId={BANNER_ID}
          />
        </div>
      </article>

      {/* Always-on sticky bottom share bar — mobile/tablet only */}
      <MobileShareBar
        url={shareUrl}
        title={postForDisplay.title}
        labels={dictionary.blog.share}
      />
    </main>
  );
}
