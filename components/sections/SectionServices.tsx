// Назначение файла: секция направлений профессиональной помощи лендинга Анны Коржовой.
// Описание: диагностика, коррекция, подготовка к школе, логопедический массаж +
// переключатель аудитории [Для детей] / [Для взрослых] с GSAP cross-fade,
// бейджи диагнозов и SVG wave pulse для массажной карточки.
"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { DiagnosticShuffler } from "@/components/sections/DiagnosticShuffler";
import { gsap } from "@/lib/gsap";
import { designTokens } from "@/src/lib/design-tokens";

export function SectionServices() {
  const [cases, setCases] = useState(() => [...designTokens.correctionCases]);
  const [ladderLayout, setLadderLayout] = useState(false);
  const [audience, setAudience] = useState<"kids" | "adults">("kids");
  const palette = designTokens.palette;
  const { audienceToggle } = designTokens;

  // Refs для GSAP cross-fade описания аудитории
  const audienceTextRef = useRef<HTMLParagraphElement | null>(null);
  // Ref для SVG wave анимации в massage card
  const waveRef = useRef<SVGSVGElement | null>(null);

  // --- Responsive layout ---
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1279px)");
    const sync = () => {
      setLadderLayout(mq.matches);
    };
    sync();
    mq.addEventListener("change", sync);
    return () => {
      mq.removeEventListener("change", sync);
    };
  }, []);

  // --- Вертикальная ротация карточек коррекции ---
  useEffect(() => {
    const interval = window.setInterval(() => {
      setCases((previousCases) => {
        const nextCases = [...previousCases];
        const lastCase = nextCases.pop();
        if (!lastCase) return previousCases;
        nextCases.unshift(lastCase);
        return nextCases;
      });
    }, 2600);
    return () => {
      window.clearInterval(interval);
    };
  }, []);

  // --- SVG wave pulse GSAP анимация для massage card ---
  useEffect(() => {
    const svg = waveRef.current;
    if (!svg) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const paths = svg.querySelectorAll("path");
    const ctx = gsap.context(() => {
      paths.forEach((path, i) => {
        gsap.to(path, {
          attr: { d: i === 0
            ? "M0,64 C120,20 240,100 360,50 C480,0 600,80 720,64 L720,128 L0,128 Z"
            : "M0,80 C100,40 220,110 340,60 C460,10 580,90 720,80 L720,128 L0,128 Z"
          },
          duration: 3 + i * 0.8,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });
      });
    }, svg);
    return () => { ctx.revert(); };
  }, []);

  // --- GSAP cross-fade при смене аудитории ---
  const handleAudienceSwitch = useCallback(
    (next: "kids" | "adults") => {
      if (next === audience) return;
      const el = audienceTextRef.current;
      if (!el) {
        setAudience(next);
        return;
      }
      // Уважаем reduced motion
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        setAudience(next);
        return;
      }
      gsap.to(el, {
        opacity: 0,
        y: -8,
        duration: 0.22,
        ease: "power2.in",
        onComplete: () => {
          setAudience(next);
          gsap.fromTo(el, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" });
        },
      });
    },
    [audience],
  );

  const correctionCards = useMemo(
    () =>
      cases.map((item, index) => {
        const positions = ladderLayout
          ? ([
              { translateX: 0, translateY: 0, scale: 1, opacity: 1, zIndex: 30 },
              { translateX: 8, translateY: 16, scale: 0.97, opacity: 0.88, zIndex: 20 },
              { translateX: 16, translateY: 32, scale: 0.93, opacity: 0.74, zIndex: 10 },
            ] as const)
          : ([
              { translateX: 0, translateY: 0, scale: 1, opacity: 1, zIndex: 30 },
              { translateX: 0, translateY: 18, scale: 0.95, opacity: 0.82, zIndex: 20 },
              { translateX: 0, translateY: 36, scale: 0.9, opacity: 0.64, zIndex: 10 },
            ] as const);
        const position = positions[index] ?? positions[2];
        return { ...item, position };
      }),
    [cases, ladderLayout],
  );

  return (
    <section id="services" className="px-4 pb-24 pt-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Заголовок секции + чипы «Кому я помогаю» */}
        <div className="mb-10 max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.26em]" style={{ color: palette.sky }}>
            {designTokens.services.eyebrow}
          </p>
          <h2 className="mt-4 font-accent text-[clamp(2.3rem,5vw,4.25rem)] leading-[0.96] tracking-[-0.02em] text-ink">
            {designTokens.services.title}
          </h2>
          <p className="mt-4 text-lg leading-8 text-ink/72">
            {designTokens.services.subtitle}
          </p>

          {/* Переключатель аудитории [Для детей] | [Для взрослых] */}
          <div className="mt-6 inline-flex items-center gap-1 rounded-full border p-1" style={{ borderColor: `${palette.teal}20`, backgroundColor: `${palette.white}CC` }}>
            {(["kids", "adults"] as const).map((key) => (
              <button
                key={key}
                type="button"
                onClick={() => handleAudienceSwitch(key)}
                className={`rounded-full px-5 py-2 text-sm font-semibold transition-all duration-300 ${
                  audience === key
                    ? "text-white shadow-soft"
                    : "text-ink/60 hover:text-ink/90"
                }`}
                style={audience === key ? { backgroundColor: palette.teal } : undefined}
              >
                {audienceToggle[key].label}
              </button>
            ))}
          </div>

          {/* Описание фокуса для выбранной аудитории — анимируется через GSAP */}
          <p ref={audienceTextRef} className="mt-4 text-sm leading-6 text-ink/72">
            {audienceToggle[audience].servicesFocus}
          </p>

          {/* Чипы целевой аудитории */}
          <div className="mt-5">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em]" style={{ color: palette.teal }}>
              Кому я помогаю
            </p>
            <div className="flex flex-wrap gap-2">
              {designTokens.targetAudience.map((aud) => (
                <span
                  key={aud}
                  className="inline-flex rounded-full border px-4 py-2 text-sm font-medium text-ink/80"
                  style={{ borderColor: `${palette.teal}26`, backgroundColor: `${palette.white}CC` }}
                >
                  {aud}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-3">
          {/* 01 — Диагностика речи */}
          <article className="rounded-[2rem] border border-white/80 bg-white/82 p-5 shadow-warm backdrop-blur">
            <div className="mb-5 flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em]" style={{ color: palette.sky }}>
                  01
                </p>
                <h3 className="mt-2 text-2xl font-bold tracking-[-0.02em] text-ink">Диагностика речи</h3>
              </div>
              <div
                className="rounded-full px-3 py-2 text-xs font-semibold text-ink"
                style={{ backgroundColor: `${palette.yellow}88` }}
              >
                Точка входа
              </div>
            </div>
            <p className="mb-4 text-sm leading-6 text-ink/72">
              {designTokens.diagnosticsDescription}
            </p>
            <DiagnosticShuffler />
          </article>

          {/* 02 — Коррекция звуков */}
          <article className="rounded-[2rem] border border-white/80 bg-white/82 p-5 shadow-warm backdrop-blur">
            <div className="mb-5 flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em]" style={{ color: palette.sky }}>
                  02
                </p>
                <h3 className="mt-2 text-2xl font-bold tracking-[-0.02em] text-ink">Коррекция звуков</h3>
              </div>
              <div
                className="rounded-full px-3 py-2 text-xs font-semibold text-white"
                style={{ backgroundColor: palette.teal }}
              >
                До / После
              </div>
            </div>

            <div
              className="relative isolate h-[31rem] overflow-hidden rounded-[2rem] p-5 xl:h-[22rem]"
              style={{ background: `linear-gradient(180deg, ${palette.sky}1F, ${palette.yellow}26)` }}
            >
              {correctionCards.map((item) => (
                <div
                  key={item.label}
                  className="absolute left-5 right-5 rounded-[2rem] border border-white/90 bg-white p-5 shadow-soft transition-all duration-700"
                  style={{
                    transform: `translate(${item.position.translateX}px, ${item.position.translateY}px) scale(${item.position.scale})`,
                    opacity: item.position.opacity,
                    zIndex: item.position.zIndex,
                    transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)",
                  }}
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.24em]" style={{ color: palette.sky }}>
                    {item.label}
                  </p>
                  <div className="mt-5 grid gap-4 rounded-[1.2rem] bg-background p-4 sm:grid-cols-2">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ink/45">До</p>
                      <p className="mt-2 text-3xl font-bold tracking-[-0.02em] text-ink/70">{item.before}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: palette.teal }}>
                        После
                      </p>
                      <p className="mt-2 text-3xl font-bold tracking-[-0.02em]" style={{ color: palette.teal }}>
                        {item.after}
                      </p>
                    </div>
                  </div>
                  <p className="mt-5 text-sm leading-6 text-ink/72">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </article>

          {/* 03 — Подготовка к школе */}
          <article className="rounded-[2rem] border border-white/80 bg-white/82 p-5 shadow-warm backdrop-blur">
            <div className="mb-5 flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em]" style={{ color: palette.sky }}>
                  03
                </p>
                <h3 className="mt-2 text-2xl font-bold tracking-[-0.02em] text-ink">Подготовка к школе</h3>
              </div>
              <div className="rounded-full px-3 py-2 text-xs font-semibold text-white" style={{ backgroundColor: palette.teal }}>
                Вовлечение
              </div>
            </div>

            <div
              className="relative overflow-hidden rounded-[2rem] bg-background p-5 service-card-grid"
              style={{ border: `1px solid ${palette.teal}1A` }}
            >
              <div className="grid grid-cols-4 gap-3">
                {designTokens.preparationGrid.map((item, index) => (
                  <div
                    key={`${item}-${index}`}
                    className="flex aspect-square items-center justify-center rounded-2xl border text-lg font-bold"
                    style={
                      index % 5 === 0
                        ? { borderColor: "transparent", backgroundColor: palette.teal, color: palette.white }
                        : { borderColor: `${palette.teal}1A`, backgroundColor: palette.white, color: palette.ink }
                    }
                  >
                    {item}
                  </div>
                ))}
              </div>

              {/* Плавающий курсор показывает игровое взаимодействие с учебным материалом. */}
              <div className="pointer-events-none absolute left-5 top-5 animate-cursor">
                <div className="flex size-11 items-center justify-center rounded-full border border-white/80 bg-yellow shadow-soft">
                  <span className="text-lg">✦</span>
                </div>
              </div>
            </div>

            <div className="mt-5 rounded-[2rem] px-4 py-4 text-white" style={{ backgroundColor: palette.teal }}>
              <p className="text-sm leading-6 text-white/84">
                Развиваем слух, внимание, понимание инструкции и базу для уверенного старта в школе — без жёсткого давления.
              </p>
            </div>
          </article>

          {/* 04 — Логопедический массаж: premium-карточка на всю ширину грида с SVG wave */}
          <article className="relative overflow-hidden rounded-[2rem] border border-white/80 bg-white/82 p-5 shadow-warm backdrop-blur xl:col-span-3">
            {/* Фоновая SVG wave-анимация */}
            <svg
              ref={waveRef}
              className="pointer-events-none absolute inset-x-0 bottom-0 h-32 w-full opacity-[0.07]"
              viewBox="0 0 720 128"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path
                d="M0,64 C160,32 320,96 480,64 C640,32 720,80 720,64 L720,128 L0,128 Z"
                fill={palette.teal}
              />
              <path
                d="M0,80 C140,48 280,112 420,72 C560,32 660,88 720,80 L720,128 L0,128 Z"
                fill={palette.sky}
              />
            </svg>

            <div className="relative z-10">
              <div className="mb-5 flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.24em]" style={{ color: palette.sky }}>
                    04
                  </p>
                  <h3 className="mt-2 text-2xl font-bold tracking-[-0.02em] text-ink">
                    {designTokens.massageCard.title}
                  </h3>
                </div>
                <div
                  className="rounded-full px-3 py-2 text-xs font-semibold text-white"
                  style={{ backgroundColor: palette.teal }}
                >
                  Premium
                </div>
              </div>

              {/* Описание методики */}
              <p className="mb-5 max-w-3xl text-base leading-7 text-ink/76">
                {designTokens.massageCard.description}
              </p>

              <div
                className="grid gap-4 rounded-[2rem] p-5 sm:grid-cols-2"
                style={{ background: `linear-gradient(135deg, ${palette.sky}1F, ${palette.yellow}26)` }}
              >
                {designTokens.massageBenefits.map((benefit, index) => (
                  <div
                    key={benefit}
                    className="flex items-baseline gap-3 rounded-[2rem] border border-white/90 bg-white p-5 shadow-soft"
                  >
                    <span
                      className="shrink-0 text-xs font-semibold uppercase tracking-[0.24em]"
                      style={{ color: palette.teal }}
                    >
                      0{index + 1}
                    </span>
                    <span className="text-sm font-medium leading-6 text-ink/82">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
