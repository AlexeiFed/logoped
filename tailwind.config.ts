// Назначение файла: Tailwind-конфигурация дизайн-системы лендинга.
// Описание: расширяет тему палитрой, тенями и шрифтами проекта.
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#FEFDF8",
        yellow: "#FFD413",
        teal: "#393EE4",
        sky: "#286EDF",
        ink: "#2B2B2B",
      },
      boxShadow: {
        warm: "0 24px 60px rgba(40, 110, 223, 0.18)",
        soft: "0 18px 40px rgba(43, 43, 43, 0.08)",
      },
      borderRadius: {
        section: "1.5rem",
        hero: "2rem",
      },
      fontFamily: {
        heading: ["var(--font-dm-sans)", "sans-serif"],
        accent: ["var(--font-fredoka)", "sans-serif"],
        body: ["var(--font-urbanist)", "sans-serif"],
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        pulseBubble: {
          "0%, 100%": { transform: "scale(1)", opacity: "0.65" },
          "50%": { transform: "scale(1.04)", opacity: "0.9" },
        },
        cursorDrift: {
          "0%": { transform: "translate(0, 0)" },
          "25%": { transform: "translate(54px, 18px)" },
          "50%": { transform: "translate(112px, 8px)" },
          "75%": { transform: "translate(82px, 62px)" },
          "100%": { transform: "translate(0, 0)" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        bubble: "pulseBubble 8s ease-in-out infinite",
        cursor: "cursorDrift 7s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
