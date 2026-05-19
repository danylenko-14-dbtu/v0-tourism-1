import { type NextRequest, NextResponse } from "next/server";
import { translateAndSaveEN } from "@/lib/translate";

export const maxDuration = 60;

export async function POST(req: NextRequest) {
  const expectedSecret = process.env.REVALIDATE_SECRET;
  if (!expectedSecret) {
    console.error("[/api/translate] REVALIDATE_SECRET is not set");
    return NextResponse.json({ error: "Server misconfigured" }, { status: 500 });
  }

  try {
    const { documentId, slug, secret } = await req.json();

    if (secret !== expectedSecret) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (
      typeof documentId !== "string" ||
      documentId.trim() === "" ||
      typeof slug !== "string" ||
      slug.trim() === ""
    ) {
      return NextResponse.json({ error: "documentId and slug are required" }, { status: 400 });
    }

    const result = await translateAndSaveEN(documentId, slug);
    return NextResponse.json({ ok: true, ...result });
  } catch (err: any) {
    console.error("[/api/translate]", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204 });
}
