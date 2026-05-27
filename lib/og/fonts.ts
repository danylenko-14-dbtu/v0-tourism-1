import { readFile } from "fs/promises";
import path from "path";

let cache: ArrayBuffer | null = null;

export async function getOgFont(): Promise<ArrayBuffer> {
  if (cache) return cache;
  const buffer = await readFile(path.join(process.cwd(), "public", "fonts", "Inter-Bold.ttf"));
  cache = buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength);
  return cache;
}
