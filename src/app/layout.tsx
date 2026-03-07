import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BrowArt | Бровіст Київ - Natali",
  description:
    "Професійний бровіст у Києві. Корекція, фарбування, ламінування та архітектура брів. Запишіться на процедуру онлайн.",
  keywords: [
    "бровіст",
    "брови",
    "корекція брів",
    "ламінування брів",
    "Київ",
    "архітектура брів",
  ],
  authors: [{ name: "Natali" }],
  openGraph: {
    title: "BrowArt | Бровіст Київ",
    description:
      "Професійний бровіст у Києві. Корекція, фарбування, ламінування та архітектура брів.",
    type: "website",
    locale: "uk_UA",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
