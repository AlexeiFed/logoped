// Назначение файла: генерация sitemap.xml для лендинга.
// Описание: описывает базовые URL проекта для SEO и индексации.
import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://annakorzhova.ru";

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
