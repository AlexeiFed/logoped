// Назначение файла: секция услуг лендинга Анны Коржовой.
// Описание: показывает диагностику, коррекцию звуков и подготовку к школе в формате премиальных карточек.
"use client";

import { useEffect, useMemo, useState } from "react";

import { DiagnosticShuffler } from "@/components/sections/DiagnosticShuffler";
import { designTokens } from "@/src/lib/design-tokens";

export function SectionServices() {
  const [cases, setCases] = useState(() => [...designTokens.correctionCases]);
  const palette = designTokens.palette;

  useEffect(() => {
    // Вертикальная ротация карточек повторяет логику из ТЗ: unshift(pop()).
    const interval = window.setInterval(() => {
      setCases((previousCases) => {
        const nextCases = [...previousCases];
        const lastCase = nextCases.pop();

        if (!lastCase) {
          return previousCases;
        }

        nextCases.unshift(lastCase);
        return nextCases;
      });
    }, 2600);

    return () => {
      window.clearInterval(interval);
    };
  }, []);

  const correctionCards = useMemo(
    () =>
      cases.map((item, index) => {
        const positions = [
          {
            translateY: 0,
            scale: 1,
            opacity: 1,
            zIndex: 30,
          },
          {
            translateY: 18,
            scale: 0.95,
            opacity: 0.82,
            zIndex: 20,
          },
          {
            translateY: 36,
            scale: 0.9,
            opacity: 0.64,
            zIndex: 10,
          },
        ] as const;

        const position = positions[index] ?? positions[2];

        return {
          ...item,
          position,
        };
      }),
    [cases],
  );

  return (
    <section id="services" className="px-4 pb-24 pt-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.26em]" style={{ color: palette.sky }}>
            Услуги
          </p>
          <h2 className="mt-4 font-accent text-[clamp(2.3rem,5vw,4.25rem)] leading-[0.96] tracking-[-0.05em] text-ink">
            Специалистический дашборд услуг
          </h2>
          <p className="mt-4 text-lg leading-8 text-ink/72">
            Три базовых направления, собранные как понятная система: сначала точная диагностика, затем коррекция и мягкая подготовка к школе.
          </p>
        </div>

        <div className="grid gap-6 xl:grid-cols-3">
          <article className="rounded-[1.9rem] border border-white/80 bg-white/82 p-5 shadow-warm backdrop-blur">
            <div className="mb-5 flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em]" style={{ color: palette.sky }}>
                  01
                </p>
                <h3 className="mt-2 text-2xl font-bold tracking-tight text-ink">Диагностика речи</h3>
              </div>
              <div
                className="rounded-full px-3 py-2 text-xs font-semibold text-ink"
                style={{ backgroundColor: `${palette.yellow}88` }}
              >
                Точка входа
              </div>
            </div>
            <DiagnosticShuffler />
          </article>

          <article className="rounded-[1.9rem] border border-white/80 bg-white/82 p-5 shadow-warm backdrop-blur">
            <div className="mb-5 flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em]" style={{ color: palette.sky }}>
                  02
                </p>
                <h3 className="mt-2 text-2xl font-bold tracking-tight text-ink">Коррекция звуков</h3>
              </div>
              <div
                className="rounded-full px-3 py-2 text-xs font-semibold text-white"
                style={{ backgroundColor: palette.teal }}
              >
                До / После
              </div>
            </div>

            <div className="relative h-[21rem] overflow-hidden rounded-[1.6rem] p-5" style={{ background: `linear-gradient(180deg, ${palette.sky}1F, ${palette.yellow}26)` }}>
              {/* Карточки наслаиваются и переставляются с spring-подобной кривой перехода. */}
              {correctionCards.map((item) => (
                <div
                  key={item.label}
                  className="absolute left-5 right-5 rounded-[1.45rem] border border-white/90 bg-white p-5 shadow-soft transition-all duration-700"
                  style={{
                    transform: `translateY(${item.position.translateY}px) scale(${item.position.scale})`,
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
                      <p className="mt-2 text-3xl font-bold tracking-tight text-ink/70">{item.before}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: palette.teal }}>
                        После
                      </p>
                      <p className="mt-2 text-3xl font-bold tracking-tight" style={{ color: palette.teal }}>
                        {item.after}
                      </p>
                    </div>
                  </div>
                  <p className="mt-5 text-sm leading-6 text-ink/72">
                    Постепенно фиксируем правильную артикуляцию и переносим результат в спонтанную речь.
                  </p>
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-[1.9rem] border border-white/80 bg-white/82 p-5 shadow-warm backdrop-blur">
            <div className="mb-5 flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em]" style={{ color: palette.sky }}>
                  03
                </p>
                <h3 className="mt-2 text-2xl font-bold tracking-tight text-ink">Подготовка к школе</h3>
              </div>
              <div className="rounded-full px-3 py-2 text-xs font-semibold text-white" style={{ backgroundColor: palette.teal }}>
                Вовлечение
              </div>
            </div>

            <div
              className="relative overflow-hidden rounded-[1.6rem] bg-background p-5 service-card-grid"
              style={{ border: `1px solid ${palette.teal}1A` }}
            >
              <div className="grid grid-cols-4 gap-3">
                {designTokens.preparationGrid.map((item, index) => (
                  <div
                    key={`${item}-${index}`}
                    className="flex aspect-square items-center justify-center rounded-2xl border text-lg font-bold"
                    style={
                      index % 5 === 0
                        ? {
                            borderColor: "transparent",
                            backgroundColor: palette.teal,
                            color: palette.white,
                          }
                        : {
                            borderColor: `${palette.teal}1A`,
                            backgroundColor: palette.white,
                            color: palette.ink,
                          }
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

            <div className="mt-5 rounded-[1.35rem] px-4 py-4 text-white" style={{ backgroundColor: palette.teal }}>
              <p className="text-sm leading-6 text-white/84">
                Развиваем слух, внимание, понимание инструкции и базу для уверенного старта в школе — без жёсткого давления.
              </p>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
