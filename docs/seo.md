Вставьте это в next.config.ts. Это обеспечит корректную работу с изображениями и быструю загрузку:

TypeScript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com', // Для качественных фонов
      },
    ],
  },
  // Оптимизация для продакшена на Timeweb
  compress: true,
  poweredByHeader: false,
};

export default nextConfig;