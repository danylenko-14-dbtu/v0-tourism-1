import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

import { serverEnv } from "@/lib/env";

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
    <>
      {children}
      <Analytics />
    </>
  );
}
