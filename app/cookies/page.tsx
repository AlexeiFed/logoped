// Назначение файла: страница текста согласия на обработку cookies.
// Описание: контент из design-tokens; оформление в духе лендинга.
import type { Metadata } from "next";

import { Navbar } from "@/components/sections/Navbar";
import { withBasePath } from "@/lib/base-path";
import { designTokens } from "@/src/lib/design-tokens";

export const metadata: Metadata = {
  title: "Согласие на обработку файлов cookies — Анна Коржова",
  description: "Текст согласия на обработку файлов cookies и метрических данных на сайте.",
};

export default function CookiesPage() {
  const { cookieConsent, palette } = designTokens;

  return (
    <main className="relative min-h-screen overflow-x-hidden" style={{ backgroundColor: palette.background }}>
      <div className="noise-overlay" aria-hidden="true" />
      <Navbar />
      <article className="mx-auto max-w-3xl px-4 pb-24 pt-28 sm:px-6 lg:px-8 lg:pt-32">
        <p className="text-sm font-semibold uppercase tracking-[0.26em]" style={{ color: palette.sky }}>
          Юридическая информация
        </p>
        <h1 className="mt-4 font-accent text-3xl font-bold tracking-tight text-ink sm:text-4xl">
          {cookieConsent.policyTitle}
        </h1>
        <div className="mt-10 space-y-6 text-base leading-8 text-ink/88">
          {cookieConsent.policySections.map((block, index) => (
            <p key={`cookie-policy-${index}`}>
              <span className="font-semibold text-ink">{index + 1}.</span> {block}
            </p>
          ))}
          <p className="text-ink/88">{cookieConsent.policyFooter}</p>
        </div>
        <p className="mt-12">
          {/* Нативная навигация: в dev иногда ломается клиентский переход по Link (битый chunk *.js в .next). */}
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
