import { revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { BLOG_POSTS_TAG } from "@/lib/sanity";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const expectedSecret = process.env.REVALIDATE_SECRET;

  if (!expectedSecret) {
    console.error("[/api/revalidate] REVALIDATE_SECRET is not set");
    return NextResponse.json({ error: "Server misconfigured" }, { status: 500 });
  }

  const receivedSecret = req.headers.get("x-sanity-webhook-secret");

  if (receivedSecret !== expectedSecret) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  revalidateTag(BLOG_POSTS_TAG, "max");

  return NextResponse.json({
    ok: true,
    revalidated: [BLOG_POSTS_TAG],
    revalidatedAt: new Date().toISOString(),
  });
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204 });
}
