interface AboutIntroTextProps {
  eyebrow: string
  title: string
  paragraphs: string[]
}

export function AboutIntroText({ eyebrow, title, paragraphs }: AboutIntroTextProps) {
  const [lead, tablet, desktop] = paragraphs

  return (
    <section className="border-b border-border/50 bg-background">
      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-14 sm:px-6 sm:py-16 lg:grid-cols-[0.75fr_1.25fr] lg:gap-12 lg:px-8">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-primary">
            {eyebrow}
          </p>
          <h2 className="mt-3 text-2xl font-bold tracking-tight text-heading sm:text-3xl">
            {title}
          </h2>
        </div>

        <div className="max-w-3xl space-y-4 text-sm leading-7 text-muted-foreground sm:text-base sm:leading-8">
          {lead ? <p>{lead}</p> : null}
          {tablet ? <p className="hidden sm:block">{tablet}</p> : null}
          {desktop ? <p className="hidden lg:block">{desktop}</p> : null}
        </div>
      </div>
    </section>
  )
}
