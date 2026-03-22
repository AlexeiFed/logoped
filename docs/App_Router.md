/
├── app/
│   ├── layout.tsx       # Глобальные шрифты (Plus Jakarta Sans, Fredoka)
│   ├── page.tsx         # Главный лендинг (Анна Коржова)
│   └── globals.css      # Tailwind + кастомный CSS-шум
├── components/
│   ├── ui/              # Атомарные компоненты (кнопки, карточки)
│   ├── sections/        # Секции (Hero, Services, StackingCards)
│   └── gsap-wrapper.tsx # Клиентский компонент для инициализации GSAP
├── public/
│   ├── images/          # Фото Анны и логотип
│   └── fonts/           # Локальные шрифты, если не через Google Fonts
├── lib/
│   └── gsap.ts          # Регистрация плагинов (ScrollTrigger, SplitText)
└── next.config.ts