// Назначение файла: canvas-рендер солнца для Hero вместо прямого отображения mp4.
// Описание: отрисовывает кадры видео в canvas и вырезает серо-белый шахматный фон, чтобы в окружности оставалось только солнце.
"use client";

import { useEffect, useRef } from "react";

type SunVideoCanvasProps = {
  className?: string;
  src: string;
};

export function SunVideoCanvas({ className, src }: SunVideoCanvasProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (!video || !canvas) {
      return;
    }

    const context = canvas.getContext("2d", { willReadFrequently: true });

    if (!context) {
      return;
    }

    const bufferCanvas = document.createElement("canvas");
    const bufferContext = bufferCanvas.getContext("2d", { willReadFrequently: true });

    if (!bufferContext) {
      return;
    }

    context.imageSmoothingEnabled = true;
    bufferContext.imageSmoothingEnabled = true;

    let animationFrameId = 0;
    let isMounted = true;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Удаляем светло-серые и белесые пиксели, которые дают шахматный фон в исходном mp4.
    const processFrame = () => {
      if (!isMounted || !video.videoWidth || !video.videoHeight) {
        return;
      }

      if (bufferCanvas.width !== video.videoWidth || bufferCanvas.height !== video.videoHeight) {
        bufferCanvas.width = video.videoWidth;
        bufferCanvas.height = video.videoHeight;
      }

      bufferContext.clearRect(0, 0, bufferCanvas.width, bufferCanvas.height);
      bufferContext.drawImage(video, 0, 0, bufferCanvas.width, bufferCanvas.height);

      const imageData = bufferContext.getImageData(0, 0, bufferCanvas.width, bufferCanvas.height);
      const { data } = imageData;
      let minX = bufferCanvas.width;
      let minY = bufferCanvas.height;
      let maxX = -1;
      let maxY = -1;

      for (let index = 0; index < data.length; index += 4) {
        const red = data[index];
        const green = data[index + 1];
        const blue = data[index + 2];
        const alpha = data[index + 3];

        const maxChannel = Math.max(red, green, blue);
        const minChannel = Math.min(red, green, blue);
        const delta = maxChannel - minChannel;
        const brightness = (red + green + blue) / 3;
        const isWarmCore = red > 138 && green > 105 && blue < 165 && red - blue > 34 && green - blue > 12;
        const isWarmEdge = red > 112 && green > 82 && blue < 145 && red - blue > 24 && green - blue > 8;
        const isDarkOutline = brightness < 156 && delta > 18;
        const isNeutralLight = delta < 24 && brightness > 150;
        const isNeutralMid = delta < 14 && brightness > 118;

        if (isWarmCore || isWarmEdge || isDarkOutline) {
          continue;
        }

        if (isNeutralLight) {
          data[index + 3] = 0;
          continue;
        }

        if (isNeutralMid) {
          data[index + 3] = Math.min(alpha, 12);
        }

        if (data[index + 3] > 24) {
          const pixelIndex = index / 4;
          const x = pixelIndex % bufferCanvas.width;
          const y = Math.floor(pixelIndex / bufferCanvas.width);

          if (x < minX) {
            minX = x;
          }

          if (y < minY) {
            minY = y;
          }

          if (x > maxX) {
            maxX = x;
          }

          if (y > maxY) {
            maxY = y;
          }
        }
      }

      bufferContext.putImageData(imageData, 0, 0);

      const hasBounds = maxX >= 0 && maxY >= 0;
      const boundsWidth = hasBounds ? maxX - minX + 1 : bufferCanvas.width;
      const boundsHeight = hasBounds ? maxY - minY + 1 : bufferCanvas.height;
      const padding = hasBounds ? 18 : 0;
      const sourceSize = Math.min(
        Math.max(boundsWidth, boundsHeight) + padding * 2,
        Math.min(bufferCanvas.width, bufferCanvas.height),
      );
      const sourceX = hasBounds
        ? Math.max(0, Math.min(bufferCanvas.width - sourceSize, Math.floor(minX - (sourceSize - boundsWidth) / 2)))
        : 0;
      const sourceY = hasBounds
        ? Math.max(0, Math.min(bufferCanvas.height - sourceSize, Math.floor(minY - (sourceSize - boundsHeight) / 2)))
        : 0;

      if (canvas.width !== sourceSize || canvas.height !== sourceSize) {
        canvas.width = sourceSize;
        canvas.height = sourceSize;
      }

      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(bufferCanvas, sourceX, sourceY, sourceSize, sourceSize, 0, 0, canvas.width, canvas.height);
    };

    const renderLoop = () => {
      processFrame();
      animationFrameId = window.requestAnimationFrame(renderLoop);
    };

    const handleLoadedData = async () => {
      try {
        video.currentTime = 0;
        processFrame();

        if (prefersReducedMotion) {
          video.pause();
          return;
        }

        await video.play();
        renderLoop();
      } catch {
        processFrame();
      }
    };

    const handlePlay = () => {
      if (!prefersReducedMotion) {
        window.cancelAnimationFrame(animationFrameId);
        renderLoop();
      }
    };

    const handlePause = () => {
      window.cancelAnimationFrame(animationFrameId);
      processFrame();
    };

    video.addEventListener("loadeddata", handleLoadedData);
    video.addEventListener("play", handlePlay);
    video.addEventListener("pause", handlePause);
    video.load();

    return () => {
      isMounted = false;
      window.cancelAnimationFrame(animationFrameId);
      video.pause();
      video.removeEventListener("loadeddata", handleLoadedData);
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("pause", handlePause);
    };
  }, [src]);

  return (
    <>
      <video ref={videoRef} className="sr-only" loop muted playsInline preload="auto" aria-hidden="true">
        <source src={src} type="video/mp4" />
      </video>
      <canvas ref={canvasRef} className={className} aria-label="Анимированная эмблема солнца" role="img" />
    </>
  );
}
