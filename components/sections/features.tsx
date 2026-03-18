import { Layers, Zap, Shield, Globe, BarChart3, Users } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import type { Dictionary } from '@/lib/dictionaries'

interface FeaturesProps {
  dictionary: Dictionary
}

const icons = [Layers, Zap, Shield, Globe, BarChart3, Users]

export function Features({ dictionary }: FeaturesProps) {
  return (
    <section id="features" className="scroll-mt-16 border-t border-border/50 bg-muted/30">
      <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {dictionary.features.title}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            {dictionary.features.subtitle}
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {dictionary.features.items.map((feature, index) => {
            const Icon = icons[index % icons.length]
            return (
              <Card
                key={index}
                className="group border-border/50 bg-background/50 transition-all duration-300 hover:border-border hover:shadow-md"
              >
                <CardHeader>
                  <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-xl bg-muted transition-colors group-hover:bg-foreground group-hover:text-background">
                    <Icon className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
