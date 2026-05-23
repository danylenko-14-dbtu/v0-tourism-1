import Image from "next/image";
import { cn } from "@/lib/utils";

export interface PostAuthorData {
  name: string;
  role?: string;
  avatarUrl?: string;
}

interface PostAuthorProps {
  author: PostAuthorData;
  size?: "md" | "sm";
  className?: string;
}

export function PostAuthor({ author, size = "md", className }: PostAuthorProps) {
  const dim = size === "sm" ? 40 : 48;

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div
        className="relative shrink-0 overflow-hidden rounded-full bg-muted"
        style={{ width: dim, height: dim }}
      >
        {author.avatarUrl ? (
          <Image
            src={author.avatarUrl}
            alt={author.name}
            fill
            sizes={`${dim}px`}
            className="object-cover"
          />
        ) : null}
      </div>
      <div className="min-w-0 flex flex-col">
        <span
          className={cn(
            "font-semibold text-foreground leading-tight",
            size === "sm" ? "text-sm" : "text-base"
          )}
        >
          {author.name}
        </span>
        {author.role && (
          <span
            className={cn(
              "text-muted-foreground leading-snug",
              size === "sm" ? "text-xs" : "text-sm"
            )}
          >
            {author.role}
          </span>
        )}
      </div>
    </div>
  );
}

export default PostAuthor;
