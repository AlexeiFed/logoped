// Назначение файла: страница политики конфиденциальности.
// Описание: контент из design-tokens; оформление по паттерну cookies/page.tsx.
import type { Metadata } from "next";

import { Navbar } from "@/components/sections/Navbar";
import { withBasePath } from "@/lib/base-path";
import { designTokens } from "@/src/lib/design-tokens";

export const metadata: Metadata = {
  title: "Политика конфиденциальности — Анна Коржова",
  description:
    "Политика обработки и защиты персональных данных на сайте логопеда Анны Коржовой.",
};

export default function PrivacyPage() {
  const { palette, privacyPolicy } = designTokens;

  return (
    <main
      className="relative min-h-screen overflow-x-hidden"
      style={{ backgroundColor: palette.background }}
    >
      <div className="noise-overlay" aria-hidden="true" />
      <Navbar />
      <article className="mx-auto max-w-3xl px-4 pb-24 pt-28 sm:px-6 lg:px-8 lg:pt-32">
        <p
          className="text-sm font-semibold uppercase tracking-[0.26em]"
          style={{ color: palette.sky }}
        >
          Юридическая информация
        </p>
        <h1 className="mt-4 font-accent text-3xl font-bold tracking-tight text-ink sm:text-4xl">
          {privacyPolicy.title}
        </h1>
        <p className="mt-2 text-sm text-ink/60">
          Дата вступления в силу: {privacyPolicy.effectiveDate}
        </p>

        <div className="mt-10 space-y-8">
          {privacyPolicy.sections.map((section, index) => (
            <div key={`privacy-section-${index}`}>
              <h2 className="text-lg font-semibold text-ink">
                {section.heading}
              </h2>
              {/* whitespace-pre-line сохраняет \n в тексте токенов */}
              <p className="mt-2 whitespace-pre-line text-base leading-8 text-ink/88">
                {section.body}
              </p>
            </div>
          ))}
        </div>

        <p className="mt-12">
          <a
            href={withBasePath("/")}
            className="inline-flex items-center rounded-full px-5 py-2.5 text-sm font-semibold text-white transition-transform duration-300 hover:-translate-y-0.5"
            style={{ backgroundColor: palette.teal }}
          >
            На главную
          </a>
        </p>
      </article>
    </main>
  );
}
