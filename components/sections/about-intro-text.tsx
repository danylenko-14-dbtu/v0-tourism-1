interface AboutIntroTextProps {
  eyebrow: string
  title: string
  paragraphs: string[]
}

export function AboutIntroText({ title, paragraphs }: AboutIntroTextProps) {
  const [lead, tablet, desktop] = paragraphs

  return (
    <section className="border-b border-border/50 bg-background">
      <div className="mx-auto grid max-w-[600px] gap-6 px-4 py-16 text-center sm:px-6 sm:py-20 lg:max-w-6xl lg:grid-cols-[0.75fr_1.25fr] lg:gap-12 lg:px-8 lg:py-24 lg:text-left">
        <div className="hidden max-w-2xl lg:mx-0 lg:block">
          <h2 className="text-3xl font-medium tracking-wide text-heading sm:text-4xl">
            {title}
          </h2>
        </div>

        <div className="mx-auto max-w-3xl space-y-4 text-sm leading-7 text-muted-foreground sm:text-base sm:leading-8 lg:mx-0">
          {lead ? <p>{lead}</p> : null}
          {tablet ? <p>{tablet}</p> : null}
          {desktop ? <p>{desktop}</p> : null}
        </div>
      </div>
    </section>
  )
}
