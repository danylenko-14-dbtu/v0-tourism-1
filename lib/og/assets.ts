import { readFile } from "fs/promises";
import path from "path";

let cache: string | null = null;

export async function getLogoDataUrl(): Promise<string> {
  if (cache) return cache;
  try {
    const LOGO_FILENAME = "dbtu-logo.png";
    const buffer = await readFile(path.join(process.cwd(), "public", LOGO_FILENAME));
    const ext = LOGO_FILENAME.split(".").pop()?.toLowerCase() ?? "png";
    const mime = ext === "svg" ? "image/svg+xml" : `image/${ext}`;
    cache = `data:${mime};base64,${buffer.toString("base64")}`;
  } catch {
    cache = "";
  }
  return cache;
}
