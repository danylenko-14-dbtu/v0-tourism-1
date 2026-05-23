"use client";

import { useEffect, useState } from "react";
import { PostAuthor, type PostAuthorData } from "./PostAuthor";
import { PostShareButtons } from "./PostShareButtons";

interface PostSidebarProps {
  author: PostAuthorData;
  shareUrl: string;
  shareTitle: string;
  /** When this anchor scrolls out of viewport (above), the sticky sidebar reveals. */
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
      <div className="sticky top-8">
        <div
          className={`flex flex-col gap-5 transition-opacity duration-300 ${
            revealed ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
          aria-hidden={!revealed}
        >
          <PostAuthor author={author} size="sm" />
          <PostShareButtons
            url={shareUrl}
            title={shareTitle}
            variant="stacked"
            label="Share it!"
          />
        </div>
      </div>
    </aside>
  );
}

export default PostSidebar;
