import { BlogGrid } from "@/components/blog/BlogGrid"

const MOCK_POSTS = [
  {
    _id: "1",
    title: "Як подорожі змінюють світогляд: довіра, співпраця та технології",
    href: "/blog/how-travel-changes-worldview",
    imageUrl:
      "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Дівчина з собакою на природі біля автомобіля",
    categoryLabel: "Блог",
    formattedDate: "15 травня 2026",
    excerpt:
      "Дізнайтеся, як сучасні екосистеми, відкриті технології та довіра формують новий досвід мандрівників у 2026 році.",
  },
  {
    _id: "2",
    title: "Гіперперсоналізовані подорожі: як ШІ створює унікальні маршрути",
    href: "/blog/ai-personalized-trips",
    imageUrl:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Мандрівник на скелі дивиться на гори у сутінках",
    categoryLabel: "Блог",
    formattedDate: "6 травня 2026",
  },
  {
    _id: "3",
    title: "Як масштабувати ШІ з довірою та відповідальністю?",
    href: "/blog/scale-ai-with-integrity",
    imageUrl:
      "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Людина з ноутбуком у синьому неоновому світлі",
    categoryLabel: "Блог",
    formattedDate: "21 квітня 2026",
  },
  {
    _id: "4",
    title: "Інновації для мандрівників: як змінюються партнерства авіакомпаній",
    href: "/blog/retailer-supplier-airlines",
    imageUrl:
      "https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Вид знизу на хмарочоси та літак у небі",
    categoryLabel: "Блог",
    formattedDate: "16 квітня 2026",
  },
  {
    _id: "5",
    title: "Як національний оператор аеропортів пришвидшує інновації",
    href: "/blog/airport-operator-innovation",
    imageUrl:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Команда під час робочої зустрічі біля скляної стіни зі стікерами",
    categoryLabel: "Блог",
    formattedDate: "9 квітня 2026",
  },
  {
    _id: "6",
    title: "Як спільнота допомагає працівникам у складні життєві моменти",
    href: "/blog/fenix-community-support",
    imageUrl:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Група колег, які сидять разом на сходах офісу",
    categoryLabel: "Блог",
    formattedDate: "7 квітня 2026",
  },
  {
    _id: "7",
    title: "Нові технології пришвидшують цифрову трансформацію в корпоративних подорожах",
    href: "/blog/digital-transformation-corporate-travel",
    imageUrl:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Молодий чоловік із ноутбуком усміхається на фоні офісу",
    categoryLabel: "Блог",
    formattedDate: "31 березня 2026",
  },
]

export default async function BlogPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const normalizedLocale: "uk" | "en" = locale === "en" ? "en" : "uk"

  return (
    <main className="bg-background">
      <BlogGrid posts={MOCK_POSTS} locale={normalizedLocale} />
    </main>
  )
}
