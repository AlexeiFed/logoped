// Назначение файла: корневой layout лендинга Анны Коржовой.
// Описание: подключает шрифты, глобальные стили и SEO-метаданные для всего приложения.
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Plus_Jakarta_Sans, Rubik, Urbanist } from "next/font/google";

import { CookieBanner } from "@/components/CookieBanner";

import "./globals.css";

// Абсолютный URL превью для OG/Telegram; на GitHub Pages задаётся NEXT_PUBLIC_SITE_URL в CI.
const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://annakorzhova.ru").replace(/\/$/, "");
const ogImageUrl = `${siteUrl}/images/og-hero.jpg`;

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const fredoka = Rubik({
  variable: "--font-fredoka",
  subsets: ["latin", "cyrillic"],
});

const urbanist = Urbanist({
  variable: "--font-urbanist",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Логопед в Хабаровске — Анна Коржова | Высшая категория",
  description:
    "Услуги логопеда с 20-летним стажем в Хабаровске. Логопедический массаж, запуск речи у детей от 1.5 лет, коррекция дикции у взрослых. Красный диплом ДВГГУ.",
  keywords: [
    "логопед Хабаровск", 
    "логопедический массаж Хабаровск", 
    "запуск речи", 
    "логопед для взрослых", 
    "исправление дикции", 
    "Анна Коржова логопед"
  ],
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Анна Коржова — Логопед высшей категории в Хабаровске",
    description:
      "Профессиональная помощь детям и взрослым. 20 лет опыта, уникальные методики и логомассаж для быстрого результата.",
    type: "website",
    url: siteUrl,
    locale: "ru_RU",
    siteName: "Логопедический кабинет Анны Коржовой",
    images: [
      {
        url: ogImageUrl,
        width: 1200, // Рекомендуемый размер для соцсетей
        height: 630,
        alt: "Анна Коржова — логопед высшей категории",
      },
    ],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={`${plusJakarta.variable} ${fredoka.variable} ${urbanist.variable} font-body`}>
        {children}
        <CookieBanner />
      </body>
    </html>
  );
}
