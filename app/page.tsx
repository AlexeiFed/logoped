// Назначение файла: главная страница лендинга Анны Коржовой.
// Описание: собирает Hero и секцию услуг в единую стартовую страницу.
import { FooterCta } from "@/components/sections/FooterCta";
import { Hero } from "@/components/sections/Hero";
import { Navbar } from "@/components/sections/Navbar";
import { Philosophy } from "@/components/sections/Philosophy";
import { SectionServices } from "@/components/sections/SectionServices";
import { Testimonials } from "@/components/sections/Testimonials";

export default function HomePage() {
  return (
    <main className="relative isolate min-h-screen overflow-hidden">
      {/* Глобальный шум добавляет мягкую премиальную текстуру без перегруза интерфейса. */}
      <div className="noise-overlay" aria-hidden="true" />
      <Navbar />
      <Hero />
      <SectionServices />
      <Philosophy />
      <Testimonials />
      <FooterCta />
    </main>
  );
}
