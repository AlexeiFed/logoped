// Назначение файла: секция философии и доверительных метрик лендинга.
// Описание: показывает подход Анны Коржовой и усиливает доверие через факты и принципы работы.
"use client";

import { useEffect, useRef } from "react";

import { gsap } from "@/lib/gsap";
import { designTokens } from "@/src/lib/design-tokens";

export function Philosophy() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const { philosophy } = designTokens;

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) {
      return;
    }

    // Reveal-анимация подчёркивает структурность блока и не мешает чтению длинного текста.
    const context = gsap.context(() => {
      gsap.fromTo(
        section.querySelectorAll("[data-philosophy-reveal]"),
        {
          opacity: 0,
          y: 24,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.1,
        },
      );
    }, section);

    return () => {
      context.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} id="philosophy" className="px-4 pb-24 pt-6 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-6 rounded-[2rem] px-6 py-8 text-white shadow-warm sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start lg:px-10 lg:py-10"
        style={{ background: "linear-gradient(135deg, rgba(40,110,223,0.96) 0%, rgba(57,62,228,0.92) 48%, rgba(84,146,255,0.9) 100%)" }}>
        <div>
          <p data-philosophy-reveal className="text-sm font-semibold uppercase tracking-[0.26em] text-white/68">
            {philosophy.eyebrow}
          </p>
          <h2
            data-philosophy-reveal
            className="mt-4 max-w-3xl font-accent text-[clamp(2.2rem,4.6vw,4.1rem)] leading-[0.96] tracking-[-0.02em]"
          >
            {philosophy.title}
          </h2>
          <p data-philosophy-reveal className="mt-5 max-w-2xl text-lg leading-8 text-white/82">
            {philosophy.description}
          </p>

          <div data-philosophy-reveal className="mt-8 grid gap-3">
            {philosophy.principles.map((principle) => (
              <div key={principle} className="rounded-[1.35rem] border border-white/12 bg-white/10 p-4 backdrop-blur-sm">
                <p className="text-base font-medium leading-7 text-white">{principle}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-4">
          {philosophy.stats.map((stat, index) => (
            <div
              key={stat.label}
              data-philosophy-reveal
              className={`rounded-[2rem] p-5 shadow-soft ${index === 0 ? "bg-yellow text-ink" : "bg-white text-ink"}`}
            >
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-current/60">{stat.label}</p>
              <p className="mt-3 text-5xl font-accent leading-none tracking-[-0.02em]">{stat.value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
