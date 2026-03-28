import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import type { Dictionary } from '@/lib/dictionaries'
import { cn } from '@/lib/utils'

interface PricingProps {
  dictionary: Dictionary
}

export function Pricing({ dictionary }: PricingProps) {
  return (
    <section
      id="pricing"
      role="region"
      aria-labelledby="pricing-title"
      className="scroll-mt-16 border-t border-border/50 bg-muted/30"
    >
      <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 id="pricing-title" className="text-3xl font-bold tracking-tight sm:text-4xl">
            {dictionary.pricing.title}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            {dictionary.pricing.subtitle}
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {dictionary.pricing.plans.map((plan, index) => {
            const monthlyPrice = Math.round(plan.annualPrice / 12)
            return (
              <Card
                key={index}
                className={cn(
                  'relative flex flex-col transition-all duration-300',
                  'border-border/50 hover:border-border hover:shadow-md'
                )}
              >
                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-xl leading-tight">{plan.name}</CardTitle>
                  {plan.description && (
                    <CardDescription className="mt-2 text-xs font-medium text-muted-foreground">
                      {plan.description}
                    </CardDescription>
                  )}
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  <div className="mb-6">
                    <div className="text-center">
                      <span className="text-4xl font-bold">{plan.annualPrice.toLocaleString()}</span>
                      <span className="text-muted-foreground ml-1">
                        {dictionary.pricing.currency}
                        {dictionary.pricing.yearlyLabel}
                      </span>
                    </div>
                    <div className="text-center mt-2">
                      <span className="text-sm text-muted-foreground">
                        {monthlyPrice.toLocaleString()} {dictionary.pricing.monthlyLabel}
                      </span>
                    </div>
                  </div>
                  <ul className="space-y-2 flex-1">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="text-sm text-muted-foreground">
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
