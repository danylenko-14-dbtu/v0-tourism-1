"use client";

import { useEffect, useState } from "react";
import { Clock } from "lucide-react";
import { PostAuthor, type PostAuthorData } from "./PostAuthor";
import {
  PostShareButtons,
  type PostShareButtonLabels,
} from "./PostShareButtons";

interface PostSidebarProps {
  author: PostAuthorData;
  title: string;
  formattedDate: string;
  readingTime: string;
  shareUrl: string;
  shareTitle: string;
  shareLabels?: Partial<PostShareButtonLabels>;
  /** When this anchor scrolls out of viewport (above), the author appears above Share. */
  triggerAnchorId: string;
}

export function PostSidebar({
  author,
  title,
  formattedDate,
  readingTime,
  shareUrl,
  shareTitle,
  shareLabels,
  triggerAnchorId,
}: PostSidebarProps) {
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const target = document.getElementById(triggerAnchorId);
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isAbove = entry.boundingClientRect.bottom < 0;
        setRevealed(!entry.isIntersecting && isAbove);
      },
      { threshold: 0 }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [triggerAnchorId]);

  return (
    <aside className="hidden lg:block">
      {/* top-20 = sticky header (h-16) + 16px breathing room.
          No `gap` on the flex container — when the author block is collapsed
          (grid-rows: 0fr) flex-gap would still leave a visible space and push
          the share block down. Instead, the spacing lives inside the author
          wrapper itself (pb-6) so it collapses together with the content. */}
      <div className="sticky top-20 flex flex-col items-end">
        {/* Author appears above Share once the user scrolls past the banner.
            CSS grid-rows trick: 0fr → 1fr animates height smoothly, and
            because padding lives inside the collapsing track the whole block
            (content + spacing) takes zero space in the initial state. */}
        <div
          className={`grid w-full transition-[grid-template-rows,opacity] duration-300 ease-out ${
            revealed
              ? "grid-rows-[1fr] opacity-100"
              : "grid-rows-[0fr] opacity-0"
          }`}
          aria-hidden={!revealed}
        >
          <div className="overflow-hidden">
            <div className="pb-6">
              <div className="space-y-4 border-b border-border/60 pb-5">
                <div className="space-y-2">
                  <h2 className="text-pretty text-base font-semibold leading-snug text-foreground">
                    {title}
                  </h2>
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted-foreground">
                    <span>{formattedDate}</span>
                    <span aria-hidden className="text-border">
                      |
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" aria-hidden />
                      {readingTime}
                    </span>
                  </div>
                </div>
                <PostAuthor author={author} size="sm" />
              </div>
            </div>
          </div>
        </div>

        {/* Share is always visible — anchored to the right edge of its column.
            Compact (initial): copy is round, social icons inline next to it →
            same height as author block on the left.
            Expanded (after scroll): copy is full-width pill, social icons sit
            evenly under it (justify-between) at matching width. */}
        <PostShareButtons
          url={shareUrl}
          title={shareTitle}
          variant="stacked"
          labels={shareLabels}
          align="end"
          compact={!revealed}
        />
      </div>
    </aside>
  );
}

export default PostSidebar;
