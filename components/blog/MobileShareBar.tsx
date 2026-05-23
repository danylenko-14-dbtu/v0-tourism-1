"use client";

import { useEffect, useState } from "react";
import { PostShareButtons } from "./PostShareButtons";

interface MobileShareBarProps {
  url: string;
  title: string;
  /** Show the bar only after the user has scrolled past this anchor element. */
  triggerAnchorId: string;
}

export function MobileShareBar({ url, title, triggerAnchorId }: MobileShareBarProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const target = document.getElementById(triggerAnchorId);
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isAbove = entry.boundingClientRect.bottom < 0;
        setVisible(!entry.isIntersecting && isAbove);
      },
      { threshold: 0 }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [triggerAnchorId]);

  return (
    <div
      className={`fixed bottom-0 left-0 z-40 w-full border-t border-border/60 bg-background/85 backdrop-blur-md shadow-[0_-4px_16px_rgba(0,0,0,0.06)] transition-transform duration-300 lg:hidden ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
      aria-hidden={!visible}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <span className="text-sm font-semibold text-foreground">Share it!</span>
        <PostShareButtons url={url} title={title} variant="row" />
      </div>
    </div>
  );
}

export default MobileShareBar;
