// Назначение файла: API-роут для отдачи брендового видео из локальной папки assets.
// Описание: стримит mp4 с поддержкой Range-запросов для стабильного воспроизведения в <video>.
import { createReadStream, promises as fs } from "node:fs";
import path from "node:path";
import { Readable } from "node:stream";

const videoPath = path.join(process.cwd(), "assets", "video.mp4");
const contentType = "video/mp4";

export async function GET(request: Request) {
  try {
    const stats = await fs.stat(videoPath);
    const range = request.headers.get("range");

    if (!range) {
      const stream = createReadStream(videoPath);

      return new Response(Readable.toWeb(stream) as ReadableStream, {
        headers: {
          "Accept-Ranges": "bytes",
          "Cache-Control": "public, max-age=31536000, immutable",
          "Content-Length": String(stats.size),
          "Content-Type": contentType,
        },
      });
    }

    const matches = /bytes=(\d+)-(\d+)?/.exec(range);

    if (!matches) {
      return new Response("Invalid range header", { status: 416 });
    }

    const start = Number(matches[1]);
    const end = matches[2] ? Number(matches[2]) : stats.size - 1;

    if (Number.isNaN(start) || Number.isNaN(end) || start >= stats.size || end >= stats.size || start > end) {
      return new Response("Requested range not satisfiable", {
        status: 416,
        headers: {
          "Content-Range": `bytes */${stats.size}`,
        },
      });
    }

    const chunkSize = end - start + 1;
    const stream = createReadStream(videoPath, { start, end });

    return new Response(Readable.toWeb(stream) as ReadableStream, {
      status: 206,
      headers: {
        "Accept-Ranges": "bytes",
        "Cache-Control": "public, max-age=31536000, immutable",
        "Content-Length": String(chunkSize),
        "Content-Range": `bytes ${start}-${end}/${stats.size}`,
        "Content-Type": contentType,
      },
    });
  } catch {
    // Не раскрываем внутренние детали и отдаём нейтральную ошибку, если файла нет.
    return new Response("Brand video not found", { status: 404 });
  }
}
