// Назначение файла: конфигурация Next.js для лендинга логопеда Анны Коржовой.
// Описание: оптимизации изображений; при GITHUB_PAGES=true — статический экспорт для GitHub Pages.
import type { NextConfig } from "next";

const isGithubPages = process.env.GITHUB_PAGES === "true";

const nextConfig: NextConfig = {
  ...(isGithubPages && {
    output: "export" as const,
    basePath: "/logoped",
    trailingSlash: true,
  }),
  images: {
    ...(isGithubPages
      ? { unoptimized: true }
      : { formats: ["image/avif", "image/webp"] as const }),
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  compress: true,
  poweredByHeader: false,
};

export default nextConfig;
