// Назначение файла: финальный CTA-футер лендинга Анны Коржовой.
// Описание: запись через MAX, телефон, ссылка на политику cookies.
import Link from "next/link";

import { PhoneIcon } from "@/components/icons/PhoneIcon";
import { withBasePath } from "@/lib/base-path";
import { designTokens } from "@/src/lib/design-tokens";

export function FooterCta() {
  const { brand, cookieConsent, footer, palette } = designTokens;

  return (
    <footer id="footer-cta" className="px-4 pb-12 pt-2 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl rounded-t-[3rem] bg-yellow px-6 py-10 text-ink shadow-warm sm:px-8 lg:px-10 lg:py-12">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div>
            <div className="inline-flex items-center gap-3 rounded-full bg-white/55 px-4 py-2 text-sm font-semibold text-ink/80">
              <span className="inline-flex size-2.5 rounded-full" style={{ backgroundColor: palette.sky }} />
              <span>{brand.schedule}</span>
            </div>
            <h2 className="mt-5 max-w-3xl font-accent text-[clamp(2.2rem,5vw,4.4rem)] leading-[0.96] tracking-[-0.02em]">
              {footer.title}
            </h2>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-ink/76">{footer.description}</p>
            <p className="mt-3 max-w-2xl font-medium leading-7 text-ink/88">{footer.bookingHint}</p>
          </div>

          <div className="grid gap-3 rounded-[2rem] bg-white/72 p-5 shadow-soft backdrop-blur-sm">
            <a
              href={footer.maxChatUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full px-6 py-3.5 text-base font-semibold text-white transition-transform duration-300 hover:-translate-y-0.5"
              style={{ backgroundColor: palette.teal }}
            >
              {footer.cta}
            </a>
            <a
              href={`tel:${footer.phoneTel}`}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-ink/10 bg-white/90 px-6 py-3.5 text-base font-semibold text-ink transition-opacity hover:opacity-90"
            >
              <span style={{ color: palette.teal }}>
                <PhoneIcon className="size-5 shrink-0" />
              </span>
              {footer.phoneDisplay}
            </a>

            {/* Рекомендация по графику — рядом с контактными кнопками */}
            <p
              className="text-center text-xs font-semibold uppercase tracking-[0.2em]"
              style={{ color: palette.teal }}
            >
              {designTokens.recommendedSchedule}
            </p>

            <div className="grid gap-2 border-t border-ink/10 pt-3 text-sm text-ink/80">
              {footer.contacts.map((contact) => (
                <p key={contact}>{contact}</p>
              ))}
              <p className="pt-1">
                <Link
                  href={withBasePath("/cookies")}
                  className="font-medium underline underline-offset-2 transition-opacity hover:opacity-80"
                  style={{ color: palette.sky }}
                >
                  {cookieConsent.linkLabel}
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
