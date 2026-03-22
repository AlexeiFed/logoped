// Назначение файла: конфигурация Next.js для лендинга логопеда Анны Коржовой.
// Описание: включает оптимизации загрузки и настройки изображений для продакшена.
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
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
