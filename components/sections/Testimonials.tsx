// Назначение файла: секция отзывов родителей для лендинга.
// Описание: горизонтальная карусель скриншотов из мессенджера с drag-скроллом.
// Впоследствии скриншоты будут загружаться через админ-дашборд.
"use client";

import { useCallback, useEffect, useRef } from "react";

import Image from "next/image";

import { designTokens } from "@/src/lib/design-tokens";

export function Testimonials() {
  const { testimonials, palette } = designTokens;
  const trackRef = useRef<HTMLDivElement | null>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  // Drag-скролл для удобной навигации на десктопе
  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    const track = trackRef.current;
    if (!track) return;
    isDragging.current = true;
    startX.current = e.clientX - track.offsetLeft;
    scrollLeft.current = track.scrollLeft;
    track.style.cursor = "grabbing";
    track.setPointerCapture(e.pointerId);
  }, []);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging.current || !trackRef.current) return;
    e.preventDefault();
    const x = e.clientX - trackRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5;
    trackRef.current.scrollLeft = scrollLeft.current - walk;
  }, []);

  const handlePointerUp = useCallback(() => {
    isDragging.current = false;
    if (trackRef.current) {
      trackRef.current.style.cursor = "grab";
    }
  }, []);

  // Автопрокрутка с паузой при hover/touch
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let paused = false;
    const pause = () => { paused = true; };
    const resume = () => { paused = false; };

    track.addEventListener("pointerenter", pause);
    track.addEventListener("pointerleave", resume);

    const interval = window.setInterval(() => {
      if (paused || isDragging.current) return;
      const maxScroll = track.scrollWidth - track.clientWidth;
      if (track.scrollLeft >= maxScroll - 2) {
        track.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        track.scrollBy({ left: 320, behavior: "smooth" });
      }
    }, 3500);

    return () => {
      window.clearInterval(interval);
      track.removeEventListener("pointerenter", pause);
      track.removeEventListener("pointerleave", resume);
    };
  }, []);

  return (
    <section id="testimonials" className="pb-24 pt-6">
      {/* Заголовок остаётся в колонке max-w-7xl */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 max-w-3xl">
          <p
            className="text-sm font-semibold uppercase tracking-[0.26em]"
            style={{ color: palette.sky }}
          >
            {testimonials.eyebrow}
          </p>
          <h2 className="mt-4 font-accent text-[clamp(2.2rem,5vw,4.25rem)] leading-[0.96] tracking-[-0.05em] text-ink">
            {testimonials.title}
          </h2>
          <p className="mt-4 text-lg leading-8 text-ink/72">
            {testimonials.description}
          </p>
        </div>
      </div>

      {/* Карусель на всю ширину вьюпорта — иначе внутри max-w-7xl по бокам остаётся кремовый фон страницы */}
      <div className="mt-8" style={{ backgroundColor: palette.background }}>
        <div
          ref={trackRef}
          className="scrollbar-hide flex cursor-grab gap-5 overflow-x-auto px-4"
          style={{ scrollSnapType: "x mandatory" }}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
        >
          {testimonials.items.map((item, index) => (
            <div
              key={`testimonial-${index}`}
              className="flex-none"
              style={{ scrollSnapAlign: "start" }}
            >
              <div
                className="relative h-[28rem] w-[18rem] overflow-hidden rounded-[1.6rem] shadow-soft sm:h-[32rem] sm:w-[20rem]"
                style={{ backgroundColor: palette.background }}
              >
                {/* Скриншот: в исходнике снизу часто чёрная полоса (системная зона) — origin-top + scale обрезаем низ */}
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="origin-top scale-[1.08] object-cover object-left object-top sm:scale-[1.06]"
                  sizes="(max-width: 640px) 18rem, 20rem"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
