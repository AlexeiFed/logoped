// Назначение файла: финальный CTA-футер лендинга Анны Коржовой.
// Описание: завершает страницу явным действием и контактным блоком для записи.
import Link from "next/link";

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
            <h2 className="mt-5 max-w-3xl font-accent text-[clamp(2.2rem,5vw,4.4rem)] leading-[0.96] tracking-[-0.05em]">
              {footer.title}
            </h2>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-ink/76">{footer.description}</p>
          </div>

          <div className="grid gap-4 rounded-[2rem] bg-white/72 p-5 shadow-soft backdrop-blur-sm">
            <Link
              href="#hero"
              className="inline-flex items-center justify-center rounded-full px-6 py-3.5 text-base font-semibold text-white transition-transform duration-300 hover:-translate-y-0.5"
              style={{ backgroundColor: palette.teal }}
            >
              {footer.cta}
            </Link>

            <div className="grid gap-2 text-sm text-ink/80">
              {footer.contacts.map((contact) => (
                <p key={contact}>{contact}</p>
              ))}
              <p className="pt-1">
                <Link
                  href="/cookies"
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
