import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const _geist = Geist({
  subsets: ["latin", "latin-ext"],
  variable: "--font-geist-sans",
});
const _geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: {
    default: "Tourism and Recreation",
    template: "%s | Tourism and Recreation",
  },
  description:
    "Вступай на спеціальність Туризм і рекреація в Державний біотехнологічний університет. " +
    "Бакалавр і магістр — очна та заочна форми. Офіційний диплом державного зразка. Бюджетне фінансування і контрактна форма!",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/logo-dark.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/logo-light.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/logo-light.png",
        type: "image/svg+xml",
      },
    ],
    apple: "/logo-light.png",
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
