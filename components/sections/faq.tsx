import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import type { Dictionary } from "@/lib/dictionaries";

interface FAQProps {
  dictionary: Dictionary;
}

export function FAQ({ dictionary }: FAQProps) {
  return (
    <section className="border-b border-border/50 bg-muted/30 py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h1 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            {dictionary.faq.title}
          </h1>
          <p className="mt-4 text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
            {dictionary.faq.subtitle}
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full space-y-3">
          {dictionary.faq.items.map((item, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="border border-border/50 rounded-lg px-6 data-[state=open]:bg-muted/50 last:border-b"
            >
              <AccordionTrigger className="py-4 text-left font-semibold hover:no-underline">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-base leading-relaxed text-muted-foreground">
                {item.answer.split("\n").map((line, i) => {
                  const parts = line.split(/(https?:\/\/[^\s]+)/g);

                  return (
                    <div key={i} className="mb-3 last:mb-0">
                      {parts.map((part, idx) =>
                        /^https?:\/\/[^\s]+$/.test(part) ? (
                          <a
                            key={idx}
                            href={part}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`${part} (opens in new tab)`}
                            className="inline break-all text-blue-600 hover:underline dark:text-blue-400"
                          >
                            {part}
                          </a>
                        ) : (
                          <span key={idx}>{part}</span>
                        )
                      )}
                    </div>
                  );
                })}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
