// Назначение файла: баннер согласия на cookies при первом визите.
// Описание: запись в localStorage, чтобы не показывать повторно; ссылка на страницу политики.
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { designTokens } from "@/src/lib/design-tokens";

export function CookieBanner() {
  const { cookieConsent, palette } = designTokens;
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      if (typeof window === "undefined") return;
      if (window.localStorage.getItem(cookieConsent.storageKey) === "1") return;
      setOpen(true);
    } catch {
      setOpen(true);
    }
  }, [cookieConsent.storageKey]);

  const accept = () => {
    try {
      window.localStorage.setItem(cookieConsent.storageKey, "1");
    } catch {
      /* ignore */
    }
    setOpen(false);
  };

  if (!open) {
    return null;
  }

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-[60] px-4 pb-4 pt-2 sm:px-6 lg:px-8"
      role="dialog"
      aria-label="Уведомление об использовании cookies"
    >
      <div
        className="mx-auto flex max-w-4xl flex-col gap-4 rounded-[1.5rem] border p-5 shadow-warm sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:p-6"
        style={{
          borderColor: `${palette.teal}33`,
          backgroundColor: `${palette.white}f2`,
          backdropFilter: "blur(12px)",
        }}
      >
        <p className="text-sm leading-relaxed text-ink/85">
          {cookieConsent.bannerLead}{" "}
          <span>(См. </span>
          <Link
            href="/cookies"
            className="font-semibold underline underline-offset-2 transition-opacity hover:opacity-80"
            style={{ color: palette.sky }}
          >
            {cookieConsent.linkLabel}
          </Link>
          ).
        </p>
        <button
          type="button"
          onClick={accept}
          className="shrink-0 rounded-full px-6 py-3 text-sm font-semibold text-white transition-transform duration-300 hover:-translate-y-0.5"
          style={{ backgroundColor: palette.teal }}
        >
          {cookieConsent.acceptLabel}
        </button>
      </div>
    </div>
  );
}
