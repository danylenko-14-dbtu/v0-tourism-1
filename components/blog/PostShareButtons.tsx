"use client";

import { useState } from "react";
import { Check, Link2 } from "lucide-react";
import { FaFacebookF, FaXTwitter, FaLinkedinIn, FaThreads } from "react-icons/fa6";
import { cn } from "@/lib/utils";

interface PostShareButtonsProps {
  url: string;
  title: string;
  /**
   * "stacked"  — desktop sidebar. Copy-link button on top, social row below.
   *              Use `compact` to render copy as a round icon-only button on the
   *              same line as the social icons (initial sidebar state).
   * "row"      — single horizontal row (mobile sticky bar)
   */
  variant?: "stacked" | "row";
  labels?: Partial<PostShareButtonLabels>;
  /** Horizontal alignment for the stacked variant. */
  align?: "start" | "end";
  /**
   * Stacked + compact: copy is a round icon button placed on the same row as
   * the social icons (initial state). When false, copy spans full width and
   * the social row uses justify-between underneath (sticky/scrolled state).
   */
  compact?: boolean;
  className?: string;
}

export interface PostShareButtonLabels {
  shareLabel: string;
  copyLabel: string;
  copiedLabel: string;
  shareOnLabel: string;
  emailSubject: string;
  emailBody: string;
}

const DEFAULT_LABELS: PostShareButtonLabels = {
  shareLabel: "Share",
  copyLabel: "Copy link",
  copiedLabel: "Copied",
  shareOnLabel: "Share on {name}",
  emailSubject: "Check out this post",
  emailBody: "I thought you might find this post interesting: {url}",
};

const ICON_BTN =
  "inline-flex h-10 w-10 items-center justify-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";

export function PostShareButtons({
  url,
  title,
  variant = "stacked",
  labels,
  align = "start",
  compact = false,
  className,
}: PostShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const strings = { ...DEFAULT_LABELS, ...labels };
  const getShareOnLabel = (name: string) =>
    strings.shareOnLabel.replace("{name}", name);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // ignore
    }
  };

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const social = [
    {
      name: "Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      Icon: FaFacebookF,
      className: "bg-[#1877F2] text-white hover:bg-[#0f66d6]",
    },
    {
      name: "X",
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      Icon: FaXTwitter,
      className: "bg-foreground text-background hover:opacity-90",
    },
    {
      name: "LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      Icon: FaLinkedinIn,
      className: "bg-[#0A66C2] text-white hover:bg-[#0857a6]",
    },
    {
      name: "Threads",
      href: `https://www.threads.net/intent/post?text=${encodedTitle}%20${encodedUrl}`,
      Icon: FaThreads,
      className: "bg-foreground text-background hover:opacity-90",
    },
  ];

  if (variant === "row") {
    return (
      <div className={cn("flex items-center gap-2", className)}>
        <button
          type="button"
          onClick={handleCopy}
          aria-label={copied ? strings.copiedLabel : strings.copyLabel}
          title={copied ? strings.copiedLabel : strings.copyLabel}
          className={cn(
            ICON_BTN,
            copied
              ? "bg-emerald-500 text-white"
              : "bg-muted text-foreground hover:bg-muted/80"
          )}
        >
          {copied ? <Check className="h-4 w-4" /> : <Link2 className="h-4 w-4" />}
        </button>
        {social.map(({ name, href, Icon, className: btnClass }) => (
          <a
            key={name}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={getShareOnLabel(name)}
            title={getShareOnLabel(name)}
            className={cn(ICON_BTN, btnClass)}
          >
            <Icon className="h-4 w-4" />
          </a>
        ))}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex w-full flex-col gap-3",
        align === "end" ? "items-end" : "items-start",
        className
      )}
    >
      <p className="text-sm font-semibold text-foreground">{strings.shareLabel}</p>

      {compact ? (
        // Initial state: copy = round icon button, social icons inline next to it.
        // Total height ≈ author block, sits on the same Y axis as the author.
        <div className="flex w-full items-center justify-between">
          <button
            type="button"
            onClick={handleCopy}
            aria-label={copied ? strings.copiedLabel : strings.copyLabel}
            title={copied ? strings.copiedLabel : strings.copyLabel}
            className={cn(
              ICON_BTN,
              copied
                ? "bg-emerald-500 text-white"
                : "bg-muted text-foreground hover:bg-muted/80"
            )}
          >
            {copied ? (
              <Check className="h-4 w-4" />
            ) : (
              <Link2 className="h-4 w-4" />
            )}
          </button>
          {social.map(({ name, href, Icon, className: btnClass }) => (
            <a
              key={name}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={getShareOnLabel(name)}
              title={getShareOnLabel(name)}
              className={cn(ICON_BTN, btnClass)}
            >
              <Icon className="h-4 w-4" />
            </a>
          ))}
        </div>
      ) : (
        // Expanded state: copy spans full width, social row uses the same width
        // underneath with justify-between so icons sit evenly under the button.
        <div className="flex w-full flex-col gap-3">
          <button
            type="button"
            onClick={handleCopy}
            aria-label={copied ? strings.copiedLabel : strings.copyLabel}
            title={copied ? strings.copiedLabel : strings.copyLabel}
            className={cn(
              "inline-flex w-full items-center justify-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-medium transition-colors",
              "hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
              copied && "border-emerald-500 text-emerald-600"
            )}
          >
            {copied ? (
              <>
                <Check className="h-4 w-4" />
                <span>{strings.copiedLabel}</span>
              </>
            ) : (
              <>
                <Link2 className="h-4 w-4" />
                <span>{strings.copyLabel}</span>
              </>
            )}
          </button>

          <div className="flex w-full items-center justify-between">
            {social.map(({ name, href, Icon, className: btnClass }) => (
              <a
                key={name}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={getShareOnLabel(name)}
                title={getShareOnLabel(name)}
                className={cn(ICON_BTN, btnClass)}
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default PostShareButtons;
