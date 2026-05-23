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
        {/* Author appears above share once user scrolls past the banner */}
        <div
          className={`w-full transition-all duration-300 ${
            revealed
              ? "translate-y-0 opacity-100"
              : "pointer-events-none -translate-y-1 opacity-0"
          }`}
          aria-hidden={!revealed}
        >
          <PostAuthor author={author} size="sm" />
        </div>

        {/* Share is always visible — anchored to the right edge of its column,
            so it visually stays in place on the X axis as the page scrolls. */}
        <PostShareButtons
          url={shareUrl}
          title={shareTitle}
          variant="stacked"
          label="Share it!"
          align="end"
        />
      </div>
    </aside>
  );
}

export default PostSidebar;
