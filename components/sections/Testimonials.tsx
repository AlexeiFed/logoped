// Назначение файла: секция отзывов родителей для лендинга.
// Описание: masonry-сетка скриншотов из мессенджера (CSS columns).
// Впоследствии скриншоты будут загружаться через админ-дашборд.

import Image from "next/image";

import { withBasePath } from "@/lib/base-path";
import { designTokens } from "@/src/lib/design-tokens";

export function Testimonials() {
  const { testimonials, palette } = designTokens;

  return (
    <section id="testimonials" className="px-4 pb-24 pt-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Заголовок */}
        <div className="mb-10 max-w-3xl">
          <p
            className="text-sm font-semibold uppercase tracking-[0.26em]"
            style={{ color: palette.sky }}
          >
            {testimonials.eyebrow}
          </p>
          <h2 className="mt-4 font-accent text-[clamp(2.2rem,5vw,4.25rem)] leading-[0.96] tracking-[-0.02em] text-ink">
            {testimonials.title}
          </h2>
          <p className="mt-4 text-lg leading-8 text-ink/72">
            {testimonials.description}
          </p>
        </div>

        {/* Masonry-сетка: CSS columns для Pinterest-раскладки без JS */}
        <div className="columns-1 gap-4 sm:columns-2 sm:gap-5 lg:columns-3 xl:columns-4">
          {testimonials.items.map((item, index) => (
            <div
              key={`testimonial-${index}`}
              className="mb-4 break-inside-avoid sm:mb-5"
            >
              <div
                className="overflow-hidden rounded-[1.5rem] shadow-soft"
                style={{ backgroundColor: palette.white }}
              >
                {/* Скриншот отображается целиком: w-full h-auto */}
                <Image
                  src={withBasePath(item.src)}
                  alt={item.alt}
                  width={1080}
                  height={1080}
                  className="h-auto w-full"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                  {...(index < 2 && {
                    priority: true,
                    placeholder: "blur" as const,
                    blurDataURL: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==",
                  })}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
