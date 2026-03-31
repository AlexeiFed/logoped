// Назначение файла: фиксированная навигация лендинга Анны Коржовой.
// Описание: показывает основные якоря страницы и morph-эффект навбара при скролле.
"use client";

import { useEffect, useState } from "react";

import Image from "next/image";
import Link from "next/link";

import { PhoneIcon } from "@/components/icons/PhoneIcon";
import { withBasePath } from "@/lib/base-path";
import { designTokens } from "@/src/lib/design-tokens";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  // На мобильной версии навбар появляется только после скролла вниз
  const [isMobileVisible, setIsMobileVisible] = useState(false);
  // Мобильный dropdown для кнопок связи
  const [contactOpen, setContactOpen] = useState(false);
  const { footer, hero, palette } = designTokens;

  useEffect(() => {
    // Меняем состояние навбара по скроллу, чтобы он сжимался и становился более glassmorphic.
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
      setIsMobileVisible(window.scrollY > 80);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`pointer-events-none fixed inset-x-0 top-4 z-40 px-4 transition-all duration-300 sm:px-6 sm:translate-y-0 sm:opacity-100 lg:px-8 ${
        isMobileVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0 sm:translate-y-0 sm:opacity-100"
      }`}
    >
      <nav
        className={`pointer-events-auto mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-x-2 gap-y-2 rounded-full border px-3 py-3 transition-all duration-300 sm:gap-4 sm:px-4 ${
          isScrolled
            ? "bg-background/70 shadow-soft backdrop-blur-xl"
            : "border-white/70 bg-white/65 backdrop-blur-md"
        }`}
        style={isScrolled ? { borderColor: `${palette.teal}26` } : undefined}
      >
        <Link prefetch={false} href="/#hero" className="flex items-center gap-2.5 rounded-full px-3 py-2 text-sm font-semibold text-ink">
          <Image
            src={withBasePath("/images/sun-emblem.png")}
            alt="Логотип Солнышко"
            width={28}
            height={28}
            sizes="28px"
            className="size-7 rounded-full"
            priority
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg=="
          />
          <span>{designTokens.brand.name}</span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {designTokens.navigation.map((item) => (
            <Link
              key={item.href}
              prefetch={false}
              href={item.href.startsWith("#") ? `/${item.href}` : item.href}
              className="rounded-full px-4 py-2 text-sm font-medium text-ink/72 transition-colors duration-200 hover:opacity-80"
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Десктоп (sm+): телефон + CTA видны всегда */}
        <div className="hidden flex-shrink-0 items-center gap-2 sm:flex">
          <a
            href={`tel:${footer.phoneTel}`}
            className="inline-flex items-center gap-1.5 rounded-full border border-ink/10 bg-white/50 px-3 py-2 text-ink transition-opacity hover:opacity-85"
            style={{ color: palette.teal }}
            aria-label={`Позвонить: ${footer.phoneDisplay}`}
          >
            <PhoneIcon className="size-5 shrink-0" />
            <span className="text-sm font-semibold">{footer.phoneDisplay}</span>
          </a>
          <Link
            prefetch={false}
            href="/#footer-cta"
            className="rounded-full px-5 py-2.5 text-sm font-semibold text-white shadow-soft transition-transform duration-300 hover:-translate-y-0.5"
            style={{ backgroundColor: palette.teal }}
          >
            {hero.ctaPrimary}
          </Link>
        </div>

        {/* Мобилка (< sm): одна кнопка → dropdown с телефоном и MAX */}
        <div className="relative sm:hidden">
          <button
            type="button"
            onClick={() => setContactOpen((prev) => !prev)}
            className="inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-xs font-semibold text-white shadow-soft transition-transform duration-300 hover:-translate-y-0.5"
            style={{ backgroundColor: palette.teal }}
            aria-expanded={contactOpen}
            aria-label="Связаться"
          >
           <PhoneIcon className="size-4 shrink-0" />
       {/*      <span>Связаться</span> */}
          </button>

          {contactOpen && (
            <div
              className="absolute right-0 top-full z-50 mt-2 flex min-w-[11rem] flex-col gap-2 rounded-2xl border p-2 shadow-soft backdrop-blur-xl"
              style={{
                borderColor: `${palette.teal}26`,
                backgroundColor: `${palette.background}f0`,
              }}
            >
              <a
                href={`tel:${footer.phoneTel}`}
                className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white/60 px-3 py-2.5 text-sm font-semibold transition-opacity hover:opacity-85"
                style={{ color: palette.teal }}
                onClick={() => setContactOpen(false)}
              >
                <PhoneIcon className="size-4 shrink-0" />
                {footer.phoneDisplay}
              </a>
              <Link
                prefetch={false}
                href="/#footer-cta"
                className="inline-flex items-center gap-2 rounded-full px-3 py-2.5 text-sm font-semibold text-white transition-transform duration-300 hover:-translate-y-0.5"
                style={{ backgroundColor: palette.teal }}
                onClick={() => setContactOpen(false)}
              >
                <Image
                  src={withBasePath("/images/max-messenger-sign-logo.png")}
                  alt="MAX"
                  width={18}
                  height={18}
                  className="size-[18px] rounded"
                />
                Написать в MAX
              </Link>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}
