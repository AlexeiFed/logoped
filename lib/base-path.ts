// Назначение файла: префикс basePath для статического деплоя (GitHub Pages).
// Описание: NEXT_PUBLIC_BASE_PATH задаётся только в CI при output: export + basePath.
export function withBasePath(path: string): string {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  if (!path.startsWith("/")) {
    return `${base}/${path}`;
  }
  return `${base}${path}`;
}
