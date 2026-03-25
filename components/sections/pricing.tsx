import { Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import type { Dictionary } from '@/lib/dictionaries'
import { cn } from '@/lib/utils'

interface PricingProps {
  dictionary: Dictionary
}

export function Pricing({ dictionary }: PricingProps) {
  return (
    <section
      id="pricing"
      tabIndex={0}
      role="region"
      aria-labelledby="pricing-title"
      className="scroll-mt-16 border-t border-border/50 bg-muted/30 outline-none transition-shadow focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring/80 focus-visible:ring-2 focus-visible:ring-ring/30"
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

        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {dictionary.pricing.plans.map((plan, index) => {
            const isPopular = 'popular' in plan && plan.popular
            return (
              <Card
                key={index}
                className={cn(
                  'relative flex flex-col transition-all duration-300',
                  isPopular
                    ? 'border-foreground shadow-lg scale-[1.02]'
                    : 'border-border/50 hover:border-border hover:shadow-md'
                )}
              >
                {isPopular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-foreground px-4 py-1 text-xs font-medium text-background">
                    Popular
                  </div>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-xl">{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <div className="mb-6 text-center">
                    <span className="text-5xl font-bold">${plan.price}</span>
                    <span className="text-muted-foreground">{plan.period}</span>
                  </div>
                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-3">
                        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-muted">
                          <Check className="h-3 w-3" />
                        </div>
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    className="w-full rounded-full"
                    variant={isPopular ? 'default' : 'outline'}
                  >
                    {plan.cta}
                  </Button>
                </CardFooter>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
