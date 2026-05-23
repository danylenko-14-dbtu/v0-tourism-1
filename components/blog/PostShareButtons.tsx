"use client";

import { useState } from "react";
import { Check, Link2 } from "lucide-react";
import { FaFacebookF, FaXTwitter, FaLinkedinIn, FaThreads } from "react-icons/fa6";
import { cn } from "@/lib/utils";

interface PostShareButtonsProps {
  url: string;
  title: string;
  /**
   * "stacked"  — copy-link button on top, social row below (desktop sidebar)
   * "row"      — single horizontal row (mobile sticky bar / hero bottom)
   */
  variant?: "stacked" | "row";
  label?: string;
  className?: string;
}

const ICON_BTN =
  "inline-flex h-10 w-10 items-center justify-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";

export function PostShareButtons({
  url,
  title,
  variant = "stacked",
  label = "Share it!",
  className,
}: PostShareButtonsProps) {
  const [copied, setCopied] = useState(false);

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
          aria-label={copied ? "Скопійовано" : "Копіювати посилання"}
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
            aria-label={`Поділитись у ${name}`}
            className={cn(ICON_BTN, btnClass)}
          >
            <Icon className="h-4 w-4" />
          </a>
        ))}
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <p className="text-sm font-semibold text-foreground">{label}</p>

      <button
        type="button"
        onClick={handleCopy}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-medium transition-colors",
          "hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          copied && "border-emerald-500 text-emerald-600"
        )}
      >
        {copied ? (
          <>
            <Check className="h-4 w-4" />
            <span>Скопійовано</span>
          </>
        ) : (
          <>
            <Link2 className="h-4 w-4" />
            <span>Копіювати посилання</span>
          </>
        )}
      </button>

      <div className="flex items-center gap-2">
        {social.map(({ name, href, Icon, className: btnClass }) => (
          <a
            key={name}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Поділитись у ${name}`}
            className={cn(ICON_BTN, btnClass)}
          >
            <Icon className="h-4 w-4" />
          </a>
        ))}
      </div>
    </div>
  );
}

export default PostShareButtons;
