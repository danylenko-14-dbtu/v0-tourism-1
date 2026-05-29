import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import sharp from "sharp";
import { getOgFont } from "@/lib/og/fonts";
import { getLogoDataUrl } from "@/lib/og/assets";
import { OgCard } from "@/lib/og/card";
import { asDisplayString, getPostBySlug } from "@/lib/blog";
import { urlFor } from "@/lib/sanity";

export const runtime = "nodejs";

const CACHE_CONTROL = "public, max-age=3600, stale-while-revalidate=86400";
const MAX_WHATSAPP_IMAGE_BYTES = 600 * 1024;
const JPEG_QUALITIES = [82, 76, 70, 64, 58, 52, 46, 40] as const;

async function toJpegResponse(imageResponse: ImageResponse) {
  const pngBuffer = Buffer.from(await imageResponse.arrayBuffer());
  let bestJpeg: Buffer | undefined;
  let bestQuality: number = JPEG_QUALITIES[0];

  try {
    for (const quality of JPEG_QUALITIES) {
      const jpeg = await sharp(pngBuffer)
        .jpeg({ quality, mozjpeg: true, progressive: true })
        .toBuffer();
      bestJpeg = jpeg;
      bestQuality = quality;

      if (jpeg.byteLength <= MAX_WHATSAPP_IMAGE_BYTES) break;
    }
  } catch {
    return new NextResponse(new Uint8Array(pngBuffer), {
      headers: {
        "Cache-Control": CACHE_CONTROL,
        "Content-Type": "image/png",
        "Content-Length": String(pngBuffer.byteLength),
      },
    });
  }

  if (!bestJpeg) {
    return imageResponse;
  }

  return new NextResponse(new Uint8Array(bestJpeg), {
    headers: {
      "Cache-Control": CACHE_CONTROL,
      "Content-Type": "image/jpeg",
      "Content-Length": String(bestJpeg.byteLength),
      "X-OG-Image-Quality": String(bestQuality),
    },
  });
}

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
    ? urlFor(post.mainImage).width(570).height(630).fit("crop").format("jpg").quality(75).url()
    : "";
  const date = post?.publishedAt ?? "";

  const imageResponse = new ImageResponse(
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
      headers: { "Cache-Control": CACHE_CONTROL },
    }
  );

  return toJpegResponse(imageResponse);
}
