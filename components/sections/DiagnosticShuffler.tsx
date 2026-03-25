// Назначение файла: GSAP-компонент Diagnostic Shuffler для карточки диагностики.
// Описание: циклически переключает речевые запросы с пружинной анимацией и аккуратным темпом.
"use client";

import { useEffect, useRef, useState } from "react";

import { gsap } from "@/lib/gsap";
import { designTokens } from "@/src/lib/design-tokens";

export function DiagnosticShuffler() {
  const labels = designTokens.diagnosticsFeed;
  const { palette } = designTokens;
  const itemRef = useRef<HTMLDivElement | null>(null);
  const activeIndexRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const element = itemRef.current;

    if (!element) {
      return;
    }

    // Уважаем reduced motion и просто переключаем значение без интенсивной анимации.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const reducedInterval = window.setInterval(() => {
        setActiveIndex((currentIndex) => {
          const nextIndex = (currentIndex + 1) % labels.length;

          activeIndexRef.current = nextIndex;
          return nextIndex;
        });
      }, 2200);

      return () => {
        window.clearInterval(reducedInterval);
      };
    }

    const context = gsap.context(() => {}, itemRef);
    const interval = window.setInterval(() => {
      const nextIndex = (activeIndexRef.current + 1) % labels.length;
      const timeline = gsap.timeline({ defaults: { overwrite: "auto" } });

      timeline
        .to(element, {
          y: -18,
          opacity: 0,
          scale: 0.94,
          filter: "blur(4px)",
          duration: 0.22,
          ease: "power2.in",
        })
        .add(() => {
          activeIndexRef.current = nextIndex;
          setActiveIndex(nextIndex);
        })
        .fromTo(
          element,
          {
            y: 22,
            opacity: 0,
            scale: 0.88,
            filter: "blur(8px)",
            rotateX: -16,
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            filter: "blur(0px)",
            rotateX: 0,
            duration: 0.82,
            ease: "elastic.out(1, 0.65)",
          },
        );
    }, 2200);

    return () => {
      window.clearInterval(interval);
      context.revert();
    };
  }, [labels.length]);

  return (
    <div className="rounded-[1.35rem] bg-white/90 p-5 shadow-soft" style={{ border: `1px solid ${palette.teal}26` }}>
      {/* Верхний лейбл помогает визуально считывать блок как активный диагностический модуль. */}
      <div className="mb-4 flex items-center justify-between gap-3 text-xs font-semibold uppercase tracking-[0.24em]" style={{ color: palette.sky }}>
        <span>Диагностический модуль</span>
        <span className="rounded-full bg-yellow/60 px-3 py-1 text-[10px] text-ink">Анимация</span>
      </div>

      <div className="grid gap-4 md:grid-cols-[1fr_1.1fr] lg:grid-cols-[1.05fr_1.15fr]">
        <div className="flex min-w-0 flex-col gap-3 rounded-[1.15rem] bg-background py-4 pl-2 pr-3 pt-3 service-card-grid sm:pl-2.5 sm:pr-4 md:gap-3.5 md:pl-2 md:pr-3">
          <p className="max-w-none self-start text-left text-sm leading-relaxed text-ink/72 md:leading-6">
            Быстрая первичная оценка. Углубленная дифференциальная диагностика. План коррекции (цель, задачи, воплощение, сроки). 
          </p>
          {/* Имитация панели диагностики поддерживает ощущение экспертного интерфейса. */}
          <div className="grid h-[50px] grid-cols-6 gap-2 overflow-hidden">
            {Array.from({ length: 18 }).map((_, index) => (
              <div
                key={`chart-line-${index}`}
                className="h-2 rounded-full"
                style={{
                  backgroundColor: `${palette.teal}14`,
                  opacity: index % 3 === 0 ? 1 : 0.5,
                  gridColumn: `span ${index % 4 === 0 ? 4 : 2} / span ${index % 4 === 0 ? 4 : 2}`,
                }}
              />
            ))}
          </div>
        </div>

        <div
          className="min-w-0 rounded-[1.15rem] px-3 py-5 text-white shadow-warm md:flex md:h-[480px] md:min-h-[480px] md:max-h-[480px] md:flex-col"
          style={{ backgroundColor: palette.teal }}
        >
          <p className="mb-2 shrink-0 text-xs font-semibold uppercase tracking-[0.24em] text-white/70">Сейчас в фокусе</p>
          {/* items-start + достаточная высота карточки: иначе overflow-hidden режет многострочный заголовок при items-center */}
          <div className="relative flex min-h-16 items-start overflow-hidden rounded-2xl bg-white/12 px-3 py-2.5 [perspective:800px] md:min-h-0 md:flex-1 md:py-3">
            <div
              ref={itemRef}
              className="max-w-full text-[clamp(0.95rem,1.25vw,1.12rem)] font-bold leading-tight tracking-tight text-white break-words md:leading-snug"
            >
              {labels[activeIndex]}
            </div>
          </div>
          <div className="mt-3 flex flex-wrap gap-1.5 text-[10px] leading-4 text-white/75 md:shrink-0">
            {labels.map((label) => (
              <span
                key={label}
                className={`rounded-full px-2.5 py-1 transition-colors ${
                  label === labels[activeIndex] ? "bg-yellow text-ink" : "bg-white/12"
                }`}
              >
                {label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
