import Image from "next/image";
import { Fragment } from "react";

/* ------------------------------- Types -------------------------------- */

interface Span {
  _type: "span";
  _key: string;
  text: string;
  marks?: string[];
}

interface BlockNode {
  _type: "block";
  _key: string;
  style?: string;
  listItem?: "bullet" | "number";
  markDefs?: unknown[];
  children: Span[];
}

interface ImageNode {
  _type: "image";
  _key: string;
  asset: { _type: "reference"; url?: string; _ref?: string };
  alt?: string;
}

type Node = BlockNode | ImageNode;

interface PostBodyProps {
  blocks: readonly Node[] | Node[];
}

/* ----------------------------- Renderers ------------------------------ */

function renderSpans(children: Span[]) {
  return children.map((span) => {
    if (span.marks?.includes("strong")) {
      return (
        <strong key={span._key} className="font-semibold text-foreground">
          {span.text}
        </strong>
      );
    }
    return <Fragment key={span._key}>{span.text}</Fragment>;
  });
}

function renderBlock(block: BlockNode) {
  const inner = renderSpans(block.children);

  switch (block.style) {
    case "h1":
      return (
        <h1
          key={block._key}
          className="mt-10 mb-4 scroll-mt-24 text-3xl font-bold tracking-tight text-foreground md:text-4xl"
        >
          {inner}
        </h1>
      );
    case "h2":
      return (
        <h2
          key={block._key}
          className="mt-12 mb-4 scroll-mt-24 text-2xl font-bold tracking-tight text-foreground md:text-3xl"
        >
          {inner}
        </h2>
      );
    case "h3":
      return (
        <h3
          key={block._key}
          className="mt-8 mb-3 scroll-mt-24 text-xl font-semibold tracking-tight text-foreground md:text-2xl"
        >
          {inner}
        </h3>
      );
    case "blockquote":
      return (
        <blockquote
          key={block._key}
          className="my-8 border-l-4 border-chart-3 bg-muted/40 px-6 py-4 text-lg italic text-foreground"
        >
          {inner}
        </blockquote>
      );
    case "normal":
    default:
      return (
        <p
          key={block._key}
          className="my-5 text-base leading-relaxed text-foreground/90 md:text-lg"
        >
          {inner}
        </p>
      );
  }
}

/* --------------------------- List grouping ---------------------------- */
/* Groups consecutive bullet items into a single <ul>                    */

function groupNodes(blocks: readonly Node[] | Node[]) {
  const out: Array<Node | { _type: "list"; _key: string; items: BlockNode[] }> = [];
  let buffer: BlockNode[] = [];

  const flush = () => {
    if (buffer.length > 0) {
      out.push({
        _type: "list",
        _key: `list-${buffer[0]._key}`,
        items: buffer,
      });
      buffer = [];
    }
  };

  for (const node of blocks) {
    if (node._type === "block" && (node as BlockNode).listItem === "bullet") {
      buffer.push(node as BlockNode);
    } else {
      flush();
      out.push(node);
    }
  }
  flush();
  return out;
}

/* -------------------------------- Body -------------------------------- */

export function PostBody({ blocks }: PostBodyProps) {
  const grouped = groupNodes(blocks);

  return (
    <div className="max-w-2xl">
      {grouped.map((node) => {
        if ("_type" in node && node._type === "list") {
          return (
            <ul
              key={node._key}
              className="my-5 list-disc space-y-2 pl-6 text-base leading-relaxed text-foreground/90 md:text-lg marker:text-chart-3"
            >
              {node.items.map((item) => (
                <li key={item._key}>{renderSpans(item.children)}</li>
              ))}
            </ul>
          );
        }

        if (node._type === "image") {
          const src = node.asset?.url;
          if (!src) return null;
          return (
            <figure key={node._key} className="my-10">
              <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg bg-muted">
                <Image
                  src={src}
                  alt={node.alt ?? ""}
                  fill
                  sizes="(max-width: 768px) 100vw, 768px"
                  className="object-cover"
                />
              </div>
              {node.alt && (
                <figcaption className="mt-3 text-center text-sm text-muted-foreground">
                  {node.alt}
                </figcaption>
              )}
            </figure>
          );
        }

        if (node._type === "block") {
          return renderBlock(node as BlockNode);
        }

        return null;
      })}
    </div>
  );
}

export default PostBody;
