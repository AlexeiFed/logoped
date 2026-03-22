Добавим тот самый CSS Noise, который создаст эффект «High-End» текстуры:
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --background: #FEFDF8;
  --primary-yellow: #F8D849;
  --accent-teal: #45A9B1;
}

body {
  background-color: var(--background);
  color: #2B2B2B;
  overflow-x: hidden;
}

/* Глобальный оверлей с шумом */
.noise-overlay {
  position: fixed;
  inset: 0;
  z-index: 9999;
  pointer-events: none;
  opacity: 0.03;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
}