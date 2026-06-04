import { Quote } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface TestimonialAuthor {
  name: string;
  role?: string;
  avatarUrl?: string;
}

interface TestimonialCardProps {
  author: TestimonialAuthor;
  content: string;
  className?: string;
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

/**
 * Reusable testimonial/comment card.
 * Accepts an author object (name, optional role and avatar) and the comment content.
 * Used for both teacher testimonials (about page) and student testimonials (home page).
 */
export function TestimonialCard({ author, content, className }: TestimonialCardProps) {
  return (
    <Card
      className={cn(
        "flex h-full flex-col border-border/50 bg-background/50 shadow-sm transition-all duration-300 hover:border-border hover:shadow-md",
        className
      )}
    >
      <CardContent className="flex h-full flex-col gap-4 p-6">
        <Quote className="h-8 w-8 shrink-0 text-primary/30" aria-hidden="true" />

        <blockquote className="flex-1 text-pretty text-base leading-relaxed text-foreground/90">
          {content}
        </blockquote>

        <figcaption className="mt-2 flex items-center gap-3 border-t border-border/50 pt-4">
          <Avatar className="size-11">
            {author.avatarUrl ? (
              <AvatarImage src={author.avatarUrl} alt={author.name} className="object-cover" />
            ) : null}
            <AvatarFallback className="text-sm font-semibold text-muted-foreground">
              {getInitials(author.name)}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <span className="block truncate font-semibold leading-tight text-heading">
              {author.name}
            </span>
            {author.role ? (
              <span className="block truncate text-sm text-muted-foreground">{author.role}</span>
            ) : null}
          </div>
        </figcaption>
      </CardContent>
    </Card>
  );
}
