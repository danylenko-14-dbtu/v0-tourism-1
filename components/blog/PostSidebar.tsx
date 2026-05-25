"use client";

import { useEffect, useState } from "react";
import { PostAuthor, type PostAuthorData } from "./PostAuthor";
import { PostShareButtons } from "./PostShareButtons";

interface PostSidebarProps {
  author: PostAuthorData;
  shareUrl: string;
  shareTitle: string;
  /** When this anchor scrolls out of viewport (above), the author appears above Share. */
  triggerAnchorId: string;
}

export function PostSidebar({
  author,
  shareUrl,
  shareTitle,
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
      {/* top-20 = sticky header (h-16) + 16px breathing room */}
      <div className="sticky top-20 flex flex-col items-end gap-6">
        {/* Author appears above Share once the user scrolls past the banner.
            Uses a CSS grid row trick so the empty state takes no space and
            the reveal animates smoothly without layout jumps. */}
        <div
          className={`grid w-full transition-[grid-template-rows,opacity] duration-300 ease-out ${
            revealed
              ? "grid-rows-[1fr] opacity-100"
              : "grid-rows-[0fr] opacity-0"
          }`}
          aria-hidden={!revealed}
        >
          <div className="overflow-hidden">
            <PostAuthor author={author} size="sm" />
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
          label="Share it!"
          align="end"
          compact={!revealed}
        />
      </div>
    </aside>
  );
}

export default PostSidebar;
