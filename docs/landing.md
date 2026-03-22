Project Brief: Anna Korzhova Logoped Landing Page
Role: Senior Creative Technologist & Lead Frontend Engineer
Objective: Architect a high-fidelity, interactive, "Trust-Builder" landing page that feels premium but accessible, professional yet deeply caring.
Aesthetic Identity: "Cheerful Professionalism" / "Organic Academic" — a bridge between a playful, secure child-friendly environment and highly accredited academic expertise. The design must feel clean, modern, but extremely warm.

1. CORE DESIGN SYSTEM (STRICT)
Palette (Extracted from Logo & Preferences)
Element	Color	Hex	Notes
Primary	Sunny Yellow	#F8D849	The core "Vibe" color. Warm, positive, energetic.
Accent 1	Calm Teal	#45A9B1	From the logo text. Represents calm, clarity, and communication.
Accent 2	Sky Blue	#86C5D8	Lighter teal/blue from the speech bubble. Adds softness.
Background	Warm Off-White	#FEFDF8	To maintain the yellow warmth without being aggressive.
Text/Dark	Soft Charcoal	#2B2B2B	For readability, less harsh than pure black.
Typography
Headings: DMSans (Primary, slightly rounded, modern, friendly) & Fredoka One (Accent, only for titles/numbers needing maximum friendliness). Tight tracking.

Drama/Emphasis: Use DMSans Italic for subtle shifts in professional tone.

Body & Clinical Data: Urbanist (Clean, clear, modern sans-serif).

Visual Texture
Global Overlay: Implement a extremely subtle grain overlay (SVG noise, 0.03 opacity) to soften digital edges.

Border Radius: Systemic use of rounded-[1.5rem] for main containers and rounded-full for active elements (buttons, avatars), mimicking speech bubbles and playful shapes.

2. COMPONENT ARCHITECTURE & BEHAVIOR
A. NAVBAR (The Connection Hub)
Structure: Fixed, slightly glassmorphic pill-shaped container, centered at the top.

Morphing Logic:

Top: Semi-transparent, soft-charcoal text.

Scroll: Transition to #FEFDF8/70 glassmorphic blur, teal border, and a slightly reduced size.

Key CTA: A prominent "Записаться на диагностику" button, always visible.

B. HERO SECTION (Communication is Connection)
Visuals: 100dvh height. Background: Warm Off-White fading into a subtle Teal/Sky Blue gradient pattern resembling rising speech waves.

Layout: Content centered. A large, high-resolution portrait of Anna Korzhova, looking confident and smiling, with a graphic interpretation of the logo’s speech bubble gently interacting with her.

Typography: Large Fredoka One headline: "Красивая речь" (Yellow) / "Начинается здесь." (Teal). Below, DMSans: "Анна Коржова — Учитель-логопед высшей категории."

Animation: GSAP staggered fade-up. A very subtle, slow CSS pulse on the speech bubble element.

C. SERVICES (The Specialist Dashboard)
Layout: A three-column grid, styled as premium cards with subtle shadow depth (shadow-warm).

Card 1 (Diagnostics): "Диагностика речи." Visual: Automated SVG drawing of a stylized diagnostic chart. Data Feed: Live typing feed cycling common challenges (e.g., "Дислалия...", "ТНР...").

Card 2 (Correction): "Коррекция звуков." Visual: Three overlapping white cards, vertical cycle using unshift(pop()) logic. Spring-bounce transition cubic-bezier(0.34, 1.56, 0.64, 1). Each card shows a different "Before/After" phonetic sound result.

Card 3 (Preparation): "Подготовка к школе." Visual: Automated SVG cursor that simulates interacting with a mock calendar/alphabet grid (Mock Cursor Protocol Scheduler), demonstrating engagement.

D. PHILOSOPHY & CREDENTIALS (The "Trust-Anchor")
Visuals: Teal background, parallax soft-geometric texture.

Interaction: GSAP SplitText reveal.

Left: Static text about the importance of early intervention and communication.

Right: A dynamically cycling counter of "Часов практики", "Успешных кейсов", "Лет опыта."

E. METHODOLOGY (Sticky Stacking Archive)
Interaction: 3 full-screen cards using GSAP ScrollTrigger.

Stacking effect: Active card scales the previous card to 0.92, adds 15px blur, and 0.6 opacity.

Artifacts:

Card 1 (Game Methods): Rotating 3D representation of a playful learning block.

Card 2 (Individual Plan): A scanning laser-grid that reveals a personalized developmental roadmap.

Card 3 (Family Approach): A pulsing heart waveform connecting icons of a parent and a child.

F. REVIEWS & FOOTER
Reviews: A prominent, automated slider (GSAP ScrollTrigger), designed to look like text messages with soft charcoal text on a warm cream background, featuring real, verified parental feedback.

Footer: Sunny Yellow background, rounded-t-[3rem]. A bold, final CTA to book the consultation. Include a visible "На связи: Пн-Сб, 9-19" status indicator.

3. TECHNICAL REQUIREMENTS
Stack: Next.js 15 (App Router), React 19, Tailwind CSS, GSAP 3 (ScrollTrigger).

Rendering Strategy: Используйте Static Site Generation (SSG) для основного лендинга и Server Components для максимальной производительности.

SEO Suite: Настройка файла robots.txt и генерация sitemap.xml через встроенные функции Next.js.

Hosting: Размещение на Timeweb.Cloud, где у вас уже есть оплаченный сервер и опыт настройки.

Lifecycle: Use gsap.context() inside useEffect for memory management.

Code Quality: Use real Unsplash images where appropriate for context, but prioritize the professional portrait provided (or similar high-quality asset). The UI must feel like functional, trustworthy medical/pedagogical software.

Execution Directive: Do not build a website; build a digital instrument of trust. Every scroll must feel intentional and weighted. Eradicate all generic AI patterns. This site must scream "Expert" and "Caring" simultaneously.


