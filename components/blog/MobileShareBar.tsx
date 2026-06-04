import {
  PostShareButtons,
  type PostShareButtonLabels,
} from "./PostShareButtons";

interface MobileShareBarProps {
  url: string;
  title: string;
  labels?: Partial<PostShareButtonLabels>;
}

/**
 * Mobile/tablet sticky share bar. Pinned to the top on screens below `lg`,
 * so it does not compete with the mobile bottom header.
 */
export function MobileShareBar({ url, title, labels }: MobileShareBarProps) {
  return (
    <div
      className="fixed left-0 top-0 z-40 w-full border-b border-border/60 bg-background/85 backdrop-blur-md shadow-[0_4px_16px_rgba(0,0,0,0.06)] lg:hidden"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <span className="text-sm font-semibold text-foreground">
          {labels?.shareLabel ?? "Share"}
        </span>
        <PostShareButtons url={url} title={title} variant="row" labels={labels} />
      </div>
    </div>
  );
}

export default MobileShareBar;
