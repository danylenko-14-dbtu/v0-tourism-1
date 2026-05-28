import { revalidatePath, revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { getCorsHeaders } from "@/lib/api-cors";
import { BLOG_POSTS_TAG } from "@/lib/sanity";

export const dynamic = "force-dynamic";

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

  try {
    revalidateTag(BLOG_POSTS_TAG, "max");
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
      revalidated: [BLOG_POSTS_TAG, "/uk/blog", "/en/blog"],
      revalidatedAt: new Date().toISOString(),
    },
    { headers: corsHeaders }
  );
}

export async function OPTIONS(req: NextRequest) {
  return new NextResponse(null, { status: 204, headers: getCorsHeaders(req) });
}
