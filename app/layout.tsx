import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { serverEnv } from "@/lib/env";
import { ThemeProvider } from "@/components/theme-provider";
import { Analytics } from "@vercel/analytics/next";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";

const _geist = Geist({
  subsets: ["latin", "latin-ext"],
  variable: "--font-geist-sans",
});
const _geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

const { siteUrl, robotsAllowIndex } = serverEnv;

export const metadata: Metadata = {
  title: {
    default: "Tourism and Recreation",
    template: "%s | Tourism and Recreation",
  },
  description:
    "Вступай на спеціальність Туризм та рекреація в Державний біотехнологічний університет. " +
    "Бакалавр і магістр — очна та заочна форми. Офіційний диплом державного зразка. Бюджетне фінансування і контрактна форма!",

  metadataBase: new URL(siteUrl),

  robots: {
    index: robotsAllowIndex,
    follow: true,
  },

  verification: {
    google: "B3FLAIq7ObS7cx74Mudlj4bRp2_hupFBXu8UFxMSnRQ",
  },

  icons: {
    icon: [
      {
        url: "/svg-favicon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk" suppressHydrationWarning data-scroll-behavior="smooth">
      <body
        className={`${_geist.variable} ${_geistMono.variable} font-sans antialiased`}
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        <Analytics />
        <GoogleAnalytics gaId="G-H45NJ3NRR6" />
      </body>
    </html>
  );
}
