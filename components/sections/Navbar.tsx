// Назначение файла: фиксированная навигация лендинга Анны Коржовой.
// Описание: показывает основные якоря страницы и morph-эффект навбара при скролле.
"use client";

import { useEffect, useState } from "react";

import Link from "next/link";

import { designTokens } from "@/src/lib/design-tokens";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { palette } = designTokens;

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
        className={`pointer-events-auto mx-auto flex max-w-6xl items-center justify-between gap-4 rounded-full border px-3 py-3 transition-all duration-300 sm:px-4 ${
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

        <Link
          prefetch={false}
          href="/#services"
          className="rounded-full px-5 py-2.5 text-sm font-semibold text-white shadow-soft transition-transform duration-300 hover:-translate-y-0.5"
          style={{ backgroundColor: palette.teal }}
        >
          Записаться на диагностику
        </Link>
      </nav>
    </div>
  );
}
