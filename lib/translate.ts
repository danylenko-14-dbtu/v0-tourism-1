import { createClient } from "@sanity/client";
import OpenAI from "openai";

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

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

type TextEntry = {
  blockIdx: number;
  childIdx: number | null;
  field: "span" | "imageAlt";
  text: string;
};

type SanitySpan = {
  _type?: string;
  text?: string;
};

type SanityBlock = {
  _type?: string;
  children?: SanitySpan[];
  alt?: string;
  [key: string]: unknown;
};

type TranslationResult = {
  title: string;
  excerpt: string;
  mainImageAlt: string;
  texts: Array<{ id: number; translated: string }>;
};

function extractTexts(blocks: SanityBlock[]): TextEntry[] {
  const entries: TextEntry[] = [];

  blocks?.forEach((block, blockIdx) => {
    if (block._type === "block" && block.children) {
      block.children.forEach((child, childIdx) => {
        if (child._type === "span" && child.text?.trim()) {
          entries.push({ blockIdx, childIdx, field: "span", text: child.text });
        }
      });
    }
    if (block._type === "image" && block.alt?.trim()) {
      entries.push({ blockIdx, childIdx: null, field: "imageAlt", text: block.alt });
    }
  });

  return entries;
}

function applyTranslations(
  blocks: SanityBlock[],
  entries: TextEntry[],
  translated: Map<number, string>
): SanityBlock[] {
  const result = structuredClone(blocks);

  entries.forEach((entry, i) => {
    const text = translated.get(i);
    if (!text) return;
    if (entry.field === "span") {
      const childIdx = entry.childIdx;
      if (childIdx === null) return;
      const child = result[entry.blockIdx]?.children?.[childIdx];
      if (child) {
        child.text = text;
      }
    }
    if (entry.field === "imageAlt") {
      const block = result[entry.blockIdx];
      if (block) {
        block.alt = text;
      }
    }
  });

  return result;
}

async function callOpenAI(
  title: string,
  excerpt: string,
  mainImageAlt: string,
  blocks: SanityBlock[]
) {
  const entries = extractTexts(blocks);

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    response_format: {
      type: "json_schema",
      json_schema: {
        name: "translation",
        strict: true,
        schema: {
          type: "object",
          properties: {
            title: { type: "string" },
            excerpt: { type: "string" },
            mainImageAlt: { type: "string" },
            texts: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  id: { type: "number" },
                  translated: { type: "string" },
                },
                required: ["id", "translated"],
                additionalProperties: false,
              },
            },
          },
          required: ["title", "excerpt", "mainImageAlt", "texts"],
          additionalProperties: false,
        },
      },
    },
    messages: [
      {
        role: "system",
        content:
          "You are a professional translator specializing in tourism and education. " +
          "Translate all text fields from Ukrainian to English. " +
          "Preserve the tone and style of the original. " +
          "Return valid JSON matching the provided schema exactly.",
      },
      {
        role: "user",
        content: JSON.stringify({
          title,
          excerpt: excerpt ?? "",
          mainImageAlt: mainImageAlt ?? "",
          texts: entries.map((e, i) => ({ id: i, text: e.text })),
        }),
      },
    ],
  });

  const raw = response.choices[0].message.content;

  if (!raw) {
    throw new Error("OpenAI returned empty response");
  }

  let result: TranslationResult;
  try {
    result = JSON.parse(raw);
  } catch {
    throw new Error("OpenAI returned malformed JSON");
  }

  if (!Array.isArray(result.texts)) {
    throw new Error("OpenAI response missing texts array");
  }

  const translatedMap = new Map(result.texts.map((t) => [t.id, t.translated]));
  const translatedBlocks = applyTranslations(blocks, entries, translatedMap);

  return {
    title: result.title as string,
    excerpt: result.excerpt as string,
    mainImageAlt: result.mainImageAlt as string,
    blocks: translatedBlocks,
  };
}

export async function translateAndSaveEN(documentId: string, slug: string) {
  const post = await sanity.fetch(
    `*[_id == $id && language == "uk"][0] {
      _id, title, slug, excerpt, body, mainImage, categories, author, publishedAt
    }`,
    { id: documentId }
  );

  if (!post) throw new Error(`Post not found: ${documentId}`);

  const { title, excerpt, mainImageAlt, blocks } = await callOpenAI(
    post.title,
    post.excerpt ?? "",
    post.mainImage?.alt ?? "",
    post.body ?? []
  );

  const enDraftId = `drafts.${post._id}-en`;

  await sanity.createOrReplace({
    _id: enDraftId,
    _type: "post",
    language: "en",
    title,
    excerpt,
    slug: { _type: "slug", current: slug },
    body: blocks,
    mainImage: post.mainImage ? { ...post.mainImage, alt: mainImageAlt } : undefined,
    categories: post.categories,
    author: post.author,
    publishedAt: post.publishedAt,
    autoTranslated: true,
  });

  return { title, slug };
}
