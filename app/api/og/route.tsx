import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";
import { getOgFont } from "@/lib/og/fonts";
import { getLogoDataUrl } from "@/lib/og/assets";
import { OgCard } from "@/lib/og/card";
import { asDisplayString, getPostBySlug } from "@/lib/blog";
import { urlFor } from "@/lib/sanity";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug") ?? "";
  const locale = searchParams.get("locale") === "en" ? "en" : "uk";

  const [fontData, logoDataUrl, post] = await Promise.all([
    getOgFont(),
    getLogoDataUrl(),
    slug ? getPostBySlug(locale, slug) : Promise.resolve(null),
  ]);

  // Build params from real post data - fallback to safe defaults if not found.
  const title =
    asDisplayString(post?.title, locale) ??
    (locale === "en" ? "Tourism Department Blog" : "Блог кафедри туризму");
  const excerpt = asDisplayString(post?.excerpt, locale) ?? "";
  const categoryLabel =
    asDisplayString(post?.categories?.[0]?.title, locale) ?? (locale === "en" ? "Blog" : "Блог");
  const authorName = asDisplayString(post?.author?.name, locale) ?? "";
  const avatarUrl = post?.author?.avatarUrl ?? "";
  const coverUrl = post?.mainImage
    ? urlFor(post.mainImage).width(570).height(630).fit("crop").url()
    : "";
  const date = post?.publishedAt ?? "";

  return new ImageResponse(
    <OgCard
      logoDataUrl={logoDataUrl}
      title={title}
      excerpt={excerpt}
      author={authorName}
      avatar={avatarUrl}
      cover={coverUrl}
      category={categoryLabel}
      date={date}
      locale={locale}
    />,
    {
      width: 1200,
      height: 630,
      fonts: [{ name: "Inter", data: fontData, weight: 700, style: "normal" }],
      headers: { "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400" },
    }
  );
}
