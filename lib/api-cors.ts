import { type NextRequest } from "next/server";

const DEFAULT_ALLOWED_ORIGINS = [
  "https://tourism-dbtu.sanity.studio",
  "http://localhost:3333",
  "http://127.0.0.1:3333",
];

function getAllowedOrigins() {
  const configuredOrigins = process.env.CORS_ALLOWED_ORIGINS?.split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);

  return configuredOrigins?.length ? configuredOrigins : DEFAULT_ALLOWED_ORIGINS;
}

export function getCorsHeaders(req: NextRequest) {
  const requestOrigin = req.headers.get("origin");
  const headers = new Headers({
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers":
      req.headers.get("access-control-request-headers") ?? "Content-Type, X-Sanity-Webhook-Secret",
    Vary: "Origin",
  });

  if (requestOrigin && getAllowedOrigins().includes(requestOrigin)) {
    headers.set("Access-Control-Allow-Origin", requestOrigin);
  }

  return headers;
}
