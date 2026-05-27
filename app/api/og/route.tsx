import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";
import { getOgFont } from "@/lib/og/fonts";
import { getLogoDataUrl } from "@/lib/og/assets";
import { parseOgParams } from "@/lib/og/params";
import { OgCard } from "@/lib/og/card";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  const [fontData, logoDataUrl] = await Promise.all([getOgFont(), getLogoDataUrl()]);
  const params = parseOgParams(new URL(req.url).searchParams);
  return new ImageResponse(<OgCard {...params} logoDataUrl={logoDataUrl} />, {
    width: 1200,
    height: 630,
    fonts: [{ name: "Inter", data: fontData, weight: 700, style: "normal" }],
    headers: { "Cache-Control": "public, immutable, max-age=31536000" },
  });
}
