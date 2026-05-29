import { revalidatePath, revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { getCorsHeaders } from "@/lib/api-cors";
import { BLOG_POSTS_LIST_TAG, getBlogPostTag } from "@/lib/sanity";

export const dynamic = "force-dynamic";

function readSlug(value: unknown): string | undefined {
  if (typeof value === "string") return value;
  if (value && typeof value === "object") {
    const current = (value as { current?: unknown }).current;
    if (typeof current === "string") return current;
  }
  return undefined;
}

function readLocale(value: unknown): "uk" | "en" | undefined {
  return value === "uk" || value === "en" ? value : undefined;
}

export async function POST(req: NextRequest) {
  const corsHeaders = getCorsHeaders(req);
  const expectedSecret = process.env.REVALIDATE_SECRET;

  if (!expectedSecret) {
    console.error("[/api/revalidate] REVALIDATE_SECRET is not set");
    return NextResponse.json(
      { error: "Server misconfigured" },
      { status: 500, headers: corsHeaders }
    );
  }

  const receivedSecret = req.headers.get("x-sanity-webhook-secret");

  if (receivedSecret !== expectedSecret) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401, headers: corsHeaders });
  }

  const payload = await req.json().catch(() => null);
  const searchParams = req.nextUrl.searchParams;
  const slug = readSlug(payload?.slug) ?? readSlug(searchParams.get("slug"));
  const payloadLocale =
    readLocale(payload?.language ?? payload?.locale) ?? readLocale(searchParams.get("locale"));
  const postLocales = payloadLocale ? [payloadLocale] : (["uk", "en"] as const);
  const revalidated = [BLOG_POSTS_LIST_TAG, "/uk/blog", "/en/blog"];

  try {
    revalidateTag(BLOG_POSTS_LIST_TAG, "max");
    revalidatePath("/uk/blog");
    revalidatePath("/en/blog");

    if (slug) {
      for (const locale of postLocales) {
        const tag = getBlogPostTag(locale, slug);
        const path = `/${locale}/blog/${slug}`;
        revalidateTag(tag, "max");
        revalidatePath(path);
        revalidated.push(tag, path);
      }
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown revalidation error";
    console.error("[/api/revalidate]", message);
    return NextResponse.json(
      { ok: false, error: "Revalidation failed", message },
      { status: 500, headers: corsHeaders }
    );
  }

  return NextResponse.json(
    {
      ok: true,
      revalidated,
      revalidatedAt: new Date().toISOString(),
    },
    { headers: corsHeaders }
  );
}

export async function OPTIONS(req: NextRequest) {
  return new NextResponse(null, { status: 204, headers: getCorsHeaders(req) });
}
