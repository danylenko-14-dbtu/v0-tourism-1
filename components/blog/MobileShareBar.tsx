import { PostShareButtons } from "./PostShareButtons";

interface MobileShareBarProps {
  url: string;
  title: string;
}

/**
 * Mobile/tablet sticky share bar. Always pinned to the bottom of the viewport
 * on screens below `lg`, so users can share a post from anywhere on the page —
 * including before they start scrolling.
 */
export function MobileShareBar({ url, title }: MobileShareBarProps) {
  return (
    <div
      className="fixed bottom-0 left-0 z-40 w-full border-t border-border/60 bg-background/85 backdrop-blur-md shadow-[0_-4px_16px_rgba(0,0,0,0.06)] lg:hidden"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <span className="text-sm font-semibold text-foreground">Share it!</span>
        <PostShareButtons url={url} title={title} variant="row" />
      </div>
    </div>
  );
}

export default MobileShareBar;
