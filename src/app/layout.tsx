import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ReactQueryProvider from "@/lib/providers/query";
import { ThemeProvider } from "@/lib/providers/theme";
import { GSAPProvider } from "@/lib/providers/gsap";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Natali Brows | Бровіст Ужгород",
  description:
    "Професійний бровіст в Ужгороді. Корекція, фарбування, ламінування та архітектура брів. Запишіться на процедуру онлайн.",
  keywords: [
    "бровіст",
    "брови",
    "корекція брів",
    "ламінування брів",
    "Ужгород",
    "архітектура брів",
  ],
  authors: [{ name: "Natali" }],
  openGraph: {
    title: "Natali Brows | Бровіст Ужгород",
    description:
      "Професійний бровіст в Ужгороді. Корекція, фарбування, ламінування та архітектура брів.",
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
    <html
      lang="en"
      suppressHydrationWarning
      className="min-h-[100%] flex flex-col"
    >
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased grow-1 flex flex-col bg-neutral-50`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          disableTransitionOnChange
        >
          <GSAPProvider>
            <ReactQueryProvider>
              {children}
              <Toaster />
            </ReactQueryProvider>
          </GSAPProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
