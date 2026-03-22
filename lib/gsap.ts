// Назначение файла: безопасная регистрация GSAP-плагинов на клиенте.
// Описание: экспортирует готовый экземпляр GSAP для использования в секциях.
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  // Регистрируем плагины только на клиенте, чтобы избежать SSR-ошибок.
  gsap.registerPlugin(ScrollTrigger);
}

export { gsap, ScrollTrigger };
