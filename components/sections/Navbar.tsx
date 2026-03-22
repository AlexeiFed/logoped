// Назначение файла: фиксированная навигация лендинга Анны Коржовой.
// Описание: показывает основные якоря страницы и morph-эффект навбара при скролле.
"use client";

import { useEffect, useState } from "react";

import Link from "next/link";

import { PhoneIcon } from "@/components/icons/PhoneIcon";
import { designTokens } from "@/src/lib/design-tokens";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { footer, hero, palette } = designTokens;

  useEffect(() => {
    // Меняем состояние навбара по скроллу, чтобы он сжимался и становился более glassmorphic.
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-x-0 top-4 z-40 px-4 sm:px-6 lg:px-8">
      <nav
        className={`pointer-events-auto mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-2 gap-y-2 rounded-full border px-3 py-3 transition-all duration-300 sm:gap-4 sm:px-4 ${
          isScrolled
            ? "bg-background/70 shadow-soft backdrop-blur-xl"
            : "border-white/70 bg-white/65 backdrop-blur-md"
        }`}
        style={isScrolled ? { borderColor: `${palette.teal}26` } : undefined}
      >
        <Link prefetch={false} href="/#hero" className="flex items-center gap-3 rounded-full px-3 py-2 text-sm font-semibold text-ink">
          <span className="inline-flex size-2.5 rounded-full" style={{ backgroundColor: palette.teal }} />
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

        <div className="flex flex-shrink-0 items-center gap-1.5 sm:gap-2">
          <a
            href={`tel:${footer.phoneTel}`}
            className="inline-flex items-center gap-1.5 rounded-full border border-ink/10 bg-white/50 px-2.5 py-2 text-ink transition-opacity hover:opacity-85 sm:px-3"
            style={{ color: palette.teal }}
            aria-label={`Позвонить: ${footer.phoneDisplay}`}
          >
            <PhoneIcon className="size-[1.15rem] shrink-0 sm:size-5" />
            <span className="hidden text-xs font-semibold sm:inline sm:text-sm">{footer.phoneDisplay}</span>
          </a>
          <Link
            prefetch={false}
            href="/#footer-cta"
            className="rounded-full px-3 py-2 text-xs font-semibold text-white shadow-soft transition-transform duration-300 hover:-translate-y-0.5 sm:px-5 sm:py-2.5 sm:text-sm"
            style={{ backgroundColor: palette.teal }}
          >
            {hero.ctaPrimary}
          </Link>
        </div>
      </nav>
    </div>
  );
}
