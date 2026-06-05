import { notFound } from "next/navigation";
import { getDictionary } from "@/lib/dictionaries";
import { locales, type Locale } from "@/lib/i18n";
import { asDisplayString, getAllPosts } from "@/lib/blog";
import { buildImageUrl } from "@/lib/sanity";
import { Hero } from "@/components/sections/hero";
import { Professions } from "@/components/sections/professions";
import { LearningProcess } from "@/components/sections/learning-process";
import { Graduates } from "@/components/sections/graduates";
import { HowToApply } from "@/components/sections/how-to-apply";
import { TestimonialsCarousel } from "@/components/sections/testimonials-carousel";
import { HomeBlogPosts } from "@/components/sections/home-blog-posts";
import { CTA } from "@/components/sections/cta";

const HOME_BLOG_POSTS_LIMIT = 8;

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params;

  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  const typedLocale = locale as Locale;
  const dictionary = await getDictionary(typedLocale);
  const posts = await getHomeBlogPosts(typedLocale);
  const blogPosts = posts.flatMap((post) => {
    const slug = post.slug?.current;
    if (!slug) return [];

    return {
      _id: post._id,
      title: asDisplayString(post.title, typedLocale) ?? "",
      href: `/${typedLocale}/blog/${slug}`,
      imageUrl: buildImageUrl(post.mainImage, 560, 420),
      blurDataURL: post.mainImage?.metadata?.lqip,
      imageAlt: asDisplayString(post.mainImage?.alt, typedLocale),
      categoryLabel: asDisplayString(post.categories?.[0]?.title, typedLocale),
      formattedDate: new Date(post.publishedAt).toLocaleDateString(
        typedLocale === "uk" ? "uk-UA" : "en-US",
        { year: "numeric", month: "long", day: "numeric" }
      ),
      excerpt: asDisplayString(post.excerpt, typedLocale) ?? "",
    };
  });

  return (
    <main className="flex-1">
      <Hero dictionary={dictionary} locale={typedLocale} />
      <Professions dictionary={dictionary} />
      <LearningProcess dictionary={dictionary} />
      <Graduates dictionary={dictionary} />
      <TestimonialsCarousel
        title={dictionary.aboutPage.studentComments.title}
        subtitle={dictionary.aboutPage.studentComments.subtitle}
        items={dictionary.aboutPage.studentComments.items}
        variant="plain"
      />
      <HomeBlogPosts
        title={dictionary.homeBlog.title}
        subtitle={dictionary.homeBlog.subtitle}
        allPostsLabel={dictionary.homeBlog.allPostsLabel}
        previousLabel={dictionary.homeBlog.previousLabel}
        nextLabel={dictionary.homeBlog.nextLabel}
        blogHref={`/${typedLocale}/blog`}
        posts={blogPosts}
      />
      <CTA dictionary={dictionary} locale={typedLocale} />
    </main>
  );
}

async function getHomeBlogPosts(locale: Locale) {
  try {
    return await getAllPosts(locale, { limit: HOME_BLOG_POSTS_LIMIT });
  } catch (error) {
    console.warn(`Failed to load home blog posts for ${locale}; skipping home blog section.`);
    return [];
  }
}
