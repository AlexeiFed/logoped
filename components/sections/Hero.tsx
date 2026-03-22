// Назначение файла: Hero-секция для лендинга логопеда Анны Коржовой.
// Описание: показывает главный оффер, видео-эмблему бренда и вступительную GSAP-анимацию.
"use client";

import { useEffect, useRef } from "react";

import Link from "next/link";

import { withBasePath } from "@/lib/base-path";
import { gsap } from "@/lib/gsap";

import { designTokens } from "@/src/lib/design-tokens";

export function Hero() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const { brand, hero, palette } = designTokens;

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) {
      return;
    }

    const context = gsap.context(() => {
      // Плавное появление помогает задать ощущение «взвешенного» доверительного интерфейса.
      gsap.fromTo(
        section.querySelectorAll("[data-hero-reveal]"),
        {
          y: 28,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.12,
        },
      );
    }, sectionRef);

    return () => {
      context.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative flex min-h-[100dvh] items-center px-4 pb-12 pt-[9.5rem] sm:px-6 sm:pt-28 lg:px-8 lg:pt-24"
    >
      <div className="hero-wave" aria-hidden="true" />
      <div className="mx-auto grid w-full max-w-7xl gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div className="max-w-3xl">
          <div
            data-hero-reveal
            className="glass-panel inline-flex items-center gap-3 rounded-full border px-4 py-2 text-sm font-medium text-ink/72 shadow-soft"
            style={{ borderColor: `${palette.teal}26` }}
          >
            <span className="inline-flex size-2.5 rounded-full" style={{ backgroundColor: palette.teal }} />
            <span>{hero.eyebrow}</span>
          </div>

          <h1
            data-hero-reveal
            className="mt-6 font-accent text-[clamp(3rem,9vw,6.8rem)] leading-[0.92] tracking-[-0.06em] text-balance"
          >
            <span style={{ color: palette.yellowHeading }}>{hero.titleTop}</span>
            <br />
            <span style={{ color: palette.teal }}>{hero.titleBottom}</span>
          </h1>

          <p
            data-hero-reveal
            className="mt-6 max-w-2xl font-heading text-lg leading-8 text-ink/76 sm:text-xl"
          >
            <span className="font-semibold text-ink">{brand.name}</span>
            {` — ${brand.title}. ${brand.subtitle}`}
          </p>

          <div data-hero-reveal className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              prefetch={false}
              href="/#footer-cta"
              className="inline-flex items-center justify-center rounded-full px-6 py-3.5 font-semibold text-white shadow-soft transition-transform duration-300 hover:-translate-y-0.5"
              style={{ backgroundColor: palette.teal }}
            >
              {hero.ctaPrimary}
            </Link>
            <Link
              href="#services"
              className="inline-flex items-center justify-center rounded-full border border-white/70 px-6 py-3.5 font-semibold transition-opacity duration-300 hover:opacity-85"
              style={{ backgroundColor: `${palette.white}CC`, color: palette.teal, borderColor: `${palette.teal}24` }}
            >
              {hero.ctaSecondary}
            </Link>
          </div>

          <div data-hero-reveal className="mt-8 grid gap-3 sm:grid-cols-3">
            {hero.trustPoints.map((point) => (
              <div key={point} className="glass-panel rounded-[1.35rem] border border-white/70 p-4 shadow-soft">
                <p className="text-sm font-medium leading-6 text-ink/80">{point}</p>
              </div>
            ))}
          </div>
        </div>

        <div data-hero-reveal className="relative mx-auto w-full max-w-[35rem]">
          <div className="absolute -left-6 top-10 hidden size-24 rounded-full bg-yellow/60 blur-2xl md:block" aria-hidden="true" />
          <div className="absolute -right-2 bottom-16 hidden size-28 rounded-full bg-sky/30 blur-2xl md:block" aria-hidden="true" />

          <div className="relative overflow-hidden rounded-[2rem] border border-white/80 bg-white/70 p-5 shadow-warm teal-ring">
            <div className="absolute right-5 top-5 animate-bubble rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em]"
              style={{ backgroundColor: `${palette.white}9E`, color: palette.teal }}>
              {brand.schedule}
            </div>

            <div className="relative overflow-hidden rounded-[1.6rem] p-6" style={{ background: `linear-gradient(145deg, ${palette.yellow}36, ${palette.sky}1F)` }}>
              {/* Видео используется как живая эмблема бренда вместо статичного логотипа. */}
              <div className="hero-sun-orbit mx-auto">
                <video
                  className="hero-sun-video"
                  src={withBasePath("/video.mp4")}
                  autoPlay
                  loop
                  muted
                  playsInline
                  aria-label="Анимированная эмблема бренда"
                />
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <div className="rounded-[1.35rem] bg-white/85 p-4 shadow-soft">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em]" style={{ color: palette.sky }}>
                    Формат работы
                  </p>
                  <p className="mt-2 text-base font-semibold text-ink">Диагностика, индивидуальные занятия, поддержка семьи</p>
                </div>
                <div className="rounded-[1.35rem] p-4 text-white shadow-soft" style={{ backgroundColor: palette.teal }}>
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/60">Тон коммуникации</p>
                  <p className="mt-2 text-base font-semibold">Спокойно. Понятно. Без перегруза ребёнка.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
