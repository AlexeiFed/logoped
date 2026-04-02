// Назначение файла: CTA-секция «Интенсив 10 дней» — яркая лендинг-вставка после услуг.
// Описание: таймлайн «6 мес → 10 дней», 3 колонки «Почему работает», цитата, кнопка CTA,
// фотографии занятий, FOMO-счётчик и scroll-анимация появления элементов через GSAP.
"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

import { gsap, ScrollTrigger } from "@/lib/gsap";
import { designTokens } from "@/src/lib/design-tokens";

// Простые SVG-иконки для 3 колонок — избегаем внешних зависимостей.
function IconZap({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  );
}

function IconUnlock({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 9.9-1" />
    </svg>
  );
}

function IconTarget({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  );
}

const iconMap: Record<string, React.FC<{ className?: string }>> = {
  zap: IconZap,
  unlock: IconUnlock,
  target: IconTarget,
};

export function IntensiveCta() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const { intensiveCta, palette, footer } = designTokens;

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Уважаем reduced-motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      // Анимация появления карточек причин при скролле
      gsap.fromTo(
        section.querySelectorAll("[data-intensive-reveal]"),
        { opacity: 0, y: 32 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: {
            trigger: section,
            start: "top 78%",
            once: true,
          },
        },
      );

      // Таймлайн: стрелка пульсирует
      gsap.fromTo(
        section.querySelector("[data-timeline-arrow]"),
        { scaleX: 0.85, opacity: 0.5 },
        {
          scaleX: 1,
          opacity: 1,
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section.querySelector("[data-timeline-arrow]"),
            start: "top 85%",
            once: true,
          },
        },
      );
    }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="intensive"
      className="px-4 py-16 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        {/* Основной контейнер с градиентным фоном */}
        <div
          className="relative overflow-hidden rounded-[2.5rem] px-6 py-10 shadow-warm sm:px-10 lg:px-14 lg:py-14"
          style={{
            background: `linear-gradient(145deg, ${palette.teal} 0%, ${palette.sky} 52%, ${palette.teal}E6 100%)`,
          }}
        >
          {/* Фоновые декоративные круги */}
          <div
            className="pointer-events-none absolute -right-20 -top-20 size-72 rounded-full opacity-[0.08]"
            style={{ backgroundColor: palette.yellow }}
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute -bottom-16 -left-16 size-56 rounded-full opacity-[0.06]"
            style={{ backgroundColor: palette.white }}
            aria-hidden="true"
          />

          {/* Eyebrow */}
          <p
            data-intensive-reveal
            className="text-sm font-semibold uppercase tracking-[0.26em] text-white/68"
          >
            {intensiveCta.eyebrow}
          </p>

          {/* Заголовок H2 */}
          <h2
            data-intensive-reveal
            className="mt-4 max-w-4xl font-accent text-[clamp(2rem,4.4vw,3.8rem)] leading-[1.02] tracking-[-0.02em] text-white"
          >
            {intensiveCta.title}
          </h2>

          {/* Подзаголовок */}
          <p
            data-intensive-reveal
            className="mt-4 max-w-3xl text-lg leading-8 text-white/82"
          >
            {intensiveCta.subtitle}
          </p>

          {/* ===== Визуальный таймлайн ===== */}
          <div
            data-intensive-reveal
            className="mt-10 inline-flex flex-wrap items-center gap-4 rounded-[2rem] bg-white/12 px-6 py-5 backdrop-blur-sm sm:gap-6"
          >
            {/* До — тусклый */}
            <div className="text-center opacity-55">
              <div className="mx-auto flex size-14 items-center justify-center rounded-full border border-white/20 bg-white/10 text-2xl">
                🗓
              </div>
              <p className="mt-2 text-2xl font-bold text-white">
                {intensiveCta.timeline.before.label}
              </p>
              <p className="text-xs text-white/60">
                {intensiveCta.timeline.before.sub}
              </p>
            </div>

            {/* Стрелка */}
            <div data-timeline-arrow className="origin-left">
              <svg
                width="48"
                height="24"
                viewBox="0 0 48 24"
                fill="none"
                className="text-white"
              >
                <path
                  d="M0 12h42m0 0-8-7m8 7-8 7"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            {/* После — яркий */}
            <div className="text-center">
              <div
                className="mx-auto flex size-14 items-center justify-center rounded-full text-2xl shadow-soft"
                style={{ backgroundColor: palette.yellow }}
              >
                ⚡
              </div>
              <p className="mt-2 text-2xl font-bold text-white">
                {intensiveCta.timeline.after.label}
              </p>
              <p className="text-xs font-semibold text-white/90">
                {intensiveCta.timeline.after.sub}
              </p>
            </div>
          </div>

          {/* ===== Фотографии ===== */}
          <div
            data-intensive-reveal
            className="mt-10 grid gap-4 sm:grid-cols-2"
          >
            {intensiveCta.images.map((img) => (
              <div
                key={img.src}
                className="relative aspect-[4/3] overflow-hidden rounded-[2rem] border-2 border-white/15"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, 50vw"
                />
              </div>
            ))}
          </div>

          {/* ===== 3 колонки «Почему это работает?» ===== */}
          <p
            data-intensive-reveal
            className="mt-12 text-sm font-semibold uppercase tracking-[0.26em] text-white/68"
          >
            {intensiveCta.whyTitle}
          </p>

          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {intensiveCta.reasons.map((reason) => {
              const Icon = iconMap[reason.icon] ?? IconZap;
              return (
                <div
                  key={reason.heading}
                  data-intensive-reveal
                  className="rounded-[2rem] border border-white/12 bg-white/10 p-6 backdrop-blur-sm"
                >
                  <div
                    className="mb-4 inline-flex size-11 items-center justify-center rounded-full"
                    style={{ backgroundColor: `${palette.yellow}CC` }}
                  >
                    <Icon className="size-5 text-ink" />
                  </div>
                  <h3 className="text-lg font-bold text-white">
                    {reason.heading}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-white/78">
                    {reason.text}
                  </p>
                </div>
              );
            })}
          </div>

          {/* ===== Цитата ===== */}
          <blockquote
            data-intensive-reveal
            className="mt-10 rounded-[2rem] border-l-4 bg-white/10 px-6 py-5 backdrop-blur-sm"
            style={{ borderColor: palette.yellow }}
          >
            <p className="text-lg font-medium italic leading-8 text-white/92">
              {intensiveCta.quote}
            </p>
          </blockquote>

          {/* ===== Гарантия + CTA ===== */}
          <div data-intensive-reveal className="mt-10">
            <p className="mb-5 max-w-2xl text-base font-semibold leading-7 text-white/90">
              {intensiveCta.guarantee}
            </p>

            <a
              href={footer.maxChatUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full px-8 py-4 text-base font-bold text-ink transition-transform duration-300 hover:-translate-y-0.5 hover:shadow-lg"
              style={{ backgroundColor: palette.yellow }}
            >
              {intensiveCta.cta}
            </a>

            {/* FOMO — счётчик дефицита */}
            <p className="mt-4 text-xs tracking-wide text-white/50">
              {intensiveCta.scarcity}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
