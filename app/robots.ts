// Назначение файла: генерация robots.txt для лендинга.
// Описание: открывает индексирование публичных страниц и указывает на sitemap.
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://annakorzhova.ru/sitemap.xml",
  };
}
