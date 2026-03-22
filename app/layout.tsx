// Назначение файла: корневой layout лендинга Анны Коржовой.
// Описание: подключает шрифты, глобальные стили и SEO-метаданные для всего приложения.
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Manrope, Nunito, Rubik } from "next/font/google";

import { CookieBanner } from "@/components/CookieBanner";

import "./globals.css";

// Абсолютный URL превью для OG/Telegram; на GitHub Pages задаётся NEXT_PUBLIC_SITE_URL в CI.
const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://annakorzhova.ru").replace(/\/$/, "");
const ogImageUrl = `${siteUrl}/images/og-hero.jpg`;

const dmSans = Manrope({
  variable: "--font-dm-sans",
  subsets: ["latin", "cyrillic"],
});

const fredoka = Rubik({
  variable: "--font-fredoka",
  subsets: ["latin", "cyrillic"],
});

const urbanist = Nunito({
  variable: "--font-urbanist",
  subsets: ["latin", "cyrillic"],
});

export const metadata: Metadata = {
  title: "Анна Коржова — логопед высшей категории",
  description:
    "Премиальный лендинг логопеда Анны Коржовой: диагностика речи, коррекция звуков и подготовка к школе.",
  metadataBase: new URL(`${siteUrl}/`),
  openGraph: {
    title: "Анна Коржова — логопед высшей категории",
    description:
      "Диагностика речи, коррекция звуков и подготовка к школе с тёплым и системным подходом.",
    type: "website",
    locale: "ru_RU",
    images: [{ url: ogImageUrl, width: 827, height: 1024, alt: "Карточка героя: формат работы и тон коммуникации" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Анна Коржова — логопед высшей категории",
    description:
      "Диагностика речи, коррекция звуков и подготовка к школе с тёплым и системным подходом.",
    images: [ogImageUrl],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={`${dmSans.variable} ${fredoka.variable} ${urbanist.variable} font-body`}>
        {children}
        <CookieBanner />
      </body>
    </html>
  );
}
