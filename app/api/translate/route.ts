import { type NextRequest, NextResponse } from "next/server";
import { translateAndSaveEN } from "@/lib/translate";

// 60 seconds — enough buffer for fetch + OpenAI + save
export const maxDuration = 60;

export async function OPTIONS() {
  return new NextResponse(null, { status: 204 });
}

export async function POST(req: NextRequest) {
  try {
    const { documentId, slug, secret } = await req.json();

    // Secret check
    if (secret !== process.env.REVALIDATE_SECRET) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Basic validation
    if (!documentId || !slug) {
      return NextResponse.json({ error: "documentId and slug are required" }, { status: 400 });
    }

    const result = await translateAndSaveEN(documentId, slug);

    return NextResponse.json({ ok: true, ...result });
  } catch (err: any) {
    console.error("[/api/translate]", err);
    return NextResponse.json({ error: err.message ?? "Internal error" }, { status: 500 });
  }
}
