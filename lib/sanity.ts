import { createClient } from "@sanity/client";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const token = process.env.SANITY_API_TOKEN;

if (!projectId) throw new Error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID");
if (!token) throw new Error("Missing SANITY_API_TOKEN");

export const sanity = createClient({
  projectId,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  apiVersion: "2026-05-02",
  token,
  useCdn: false,
});
