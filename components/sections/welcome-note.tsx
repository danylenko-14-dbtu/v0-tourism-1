import type { Dictionary } from "@/lib/dictionaries";

interface WelcomeNoteProps {
  dictionary: Dictionary;
}

/**
 * Static, responsive welcome message.
 * Shows progressively more text as the viewport grows:
 * short (mobile) → medium (tablet) → full (desktop).
 */
export function WelcomeNote({ dictionary }: WelcomeNoteProps) {
  const { welcomeNote } = dictionary;

  return (
    <section
      role="region"
      aria-labelledby="welcome-note-title"
      className="border-t border-border/50 bg-muted/30"
    >
      <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6 sm:py-20 lg:px-8">
        <span className="inline-block h-1 w-12 rounded-full bg-primary" aria-hidden="true" />
        <h2
          id="welcome-note-title"
          className="mt-6 text-2xl font-bold tracking-tight text-heading sm:text-3xl"
        >
          {welcomeNote.title}
        </h2>

        {/* Mobile */}
        <p className="mt-4 text-pretty text-base leading-relaxed text-muted-foreground sm:hidden">
          {welcomeNote.short}
        </p>
        {/* Tablet */}
        <p className="mt-4 hidden text-pretty text-lg leading-relaxed text-muted-foreground sm:block lg:hidden">
          {welcomeNote.medium}
        </p>
        {/* Desktop */}
        <p className="mt-4 hidden text-pretty text-lg leading-relaxed text-muted-foreground lg:block">
          {welcomeNote.full}
        </p>
      </div>
    </section>
  );
}
