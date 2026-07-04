# ORLINSKY CERAMIC — DESIGN SYSTEM

Quiet luxury. Imperfect minimalism. A museum, not a shop.

---

## 1. CSS-переменные (`:root`)

```css
:root {
  /* ---------- COLOR — PRIMARY ---------- */
  --bone-white:   #F5F1E8;  /* primary canvas / page bg        */
  --raw-linen:    #E8DFCE;  /* surfaces, cards                 */
  --aged-clay:    #C9B89A;  /* image mats, borders, dividers   */
  --bark-black:   #2A2520;  /* primary text, dark surface      */

  /* ---------- COLOR — ACCENT ---------- */
  --smoked-oak:   #6B5544;  /* secondary text, captions        */
  --wax-seal:     #7A2E2A;  /* primary accent — CTA, seals     */
  --forest-moss:  #4A5240;  /* botanical / nature markers      */
  --honey-light:  #D4A574;  /* warm accent, hover, highlights  */

  /* ---------- COLOR — SEMANTIC ---------- */
  --bg:           var(--bone-white);
  --bg-surface:   var(--raw-linen);
  --bg-mat:       var(--aged-clay);
  --bg-inverse:   var(--bark-black);

  --fg:           var(--bark-black);
  --fg-muted:     var(--smoked-oak);
  --fg-soft:      #8A7A65;
  --fg-inverse:   var(--bone-white);

  --accent:       var(--wax-seal);
  --accent-warm:  var(--honey-light);
  --accent-nature:var(--forest-moss);
  --accent-hover: #5E2320;  /* deeper wax — primary btn hover  */

  --border:       var(--aged-clay);
  --border-dark:  var(--bark-black);
  --border-w:     0.5px;

  /* ---------- TYPE — FAMILIES ---------- */
  --font-serif:   'Cormorant Garamond', 'GT Sectra', 'EB Garamond', Georgia, serif;
  --font-sans:    'Inter', -apple-system, BlinkMacSystemFont, 'Helvetica Neue', sans-serif;
  --font-mono:    'JetBrains Mono', 'IBM Plex Mono', 'SF Mono', Menlo, monospace;

  /* ---------- TYPE — SCALE ---------- */
  --t-display:    96px;
  --t-h1:         64px;
  --t-h2:         36px;
  --t-h3:         20px;
  --t-body:       17px;
  --t-small:      14px;
  --t-caption:    11px;

  /* ---------- TYPE — WEIGHT ---------- */
  --w-light:      300;
  --w-regular:    400;
  --w-medium:     500;

  /* ---------- TYPE — LINE-HEIGHT ---------- */
  --lh-tight:     1.05;
  --lh-snug:      1.25;
  --lh-body:      1.7;
  --lh-caption:   1.4;

  /* ---------- TYPE — TRACKING ---------- */
  --tr-display:  -0.02em;
  --tr-serif:    -0.01em;
  --tr-body:      0;
  --tr-caption:   0.15em;
  --tr-button:    0.18em;

  /* ---------- SPACING ---------- */
  --s-1:   4px;
  --s-2:   8px;
  --s-3:  16px;
  --s-4:  24px;
  --s-5:  32px;
  --s-6:  48px;
  --s-7:  64px;
  --s-8:  80px;
  --s-9: 120px;
  --s-10:160px;

  /* ---------- RADII & SHADOWS ---------- */
  --radius:       0;
  --shadow:       none;

  /* ---------- MOTION ---------- */
  --ease:         cubic-bezier(0.4, 0.0, 0.2, 1);
  --dur-quick:    300ms;
  --dur-med:      600ms;
  --dur-slow:     800ms;
}
```

---

## 2. Типографика

**Шрифты**
- `--font-serif` — Cormorant Garamond. Все заголовки h1, h2, display, manifesto, имена работ, philosophy/dispatch-строки.
- `--font-sans` — Inter. Body, h3, sub-headline, формы, footer-ссылки.
- `--font-mono` — JetBrains Mono. Captions, buttons, лейблы, навигация, footer h4, util-полоса.

**Размеры и стили**
| Роль        | Family | Size           | Weight | Line-height | Letter-spacing |
|-------------|--------|----------------|--------|-------------|----------------|
| `.display`  | serif  | 96px           | 300    | 1.05        | -0.02em        |
| `h1`        | serif  | 64px           | 400    | 1.25        | -0.02em        |
| `h1.hero`   | serif italic | clamp(36px, 5.4vw, 72px) | 500 | 1.15 | -0.015em |
| `h2`        | serif  | 36px           | 400    | 1.25        | -0.01em        |
| `.manifesto`| serif italic | 36px     | 300    | 1.35        | -0.01em        |
| `h3`        | sans   | 20px           | 500    | 1.4         | 0              |
| `p / body`  | sans   | 17px           | 400    | 1.7         | 0              |
| `.small`    | sans   | 14px           | 400    | 1.6         | 0              |
| `.caption`  | mono   | 11px UPPERCASE | 400    | 1.4         | 0.15em         |
| `.btn`      | mono   | 11px UPPERCASE | 400    | 1           | 0.18em         |
| `nav` ссылки| mono   | 11px UPPERCASE | 400    | 1           | 0.22em         |
| `util` строка | mono | 10px UPPERCASE | 400    | 1           | 0.22em         |
| wordmark    | serif  | 18px UPPERCASE | 500    | 1           | 0.38em         |

**Правила**
- Вес никогда не выше 500.
- Заголовки serif — отрицательный трекинг; всё mono — uppercase + положительный трекинг.
- Body: `text-wrap: pretty`, `max-width: 62ch`.

---

## 3. Цветовая логика

- `--bone-white` #F5F1E8 — основной фон страниц и hero, текст на тёмных секциях.
- `--raw-linen` #E8DFCE — фон "глав" (philosophy), карточек, поверхностей.
- `--aged-clay` #C9B89A — фон под изображениями (mat), все hairline-разделители и бордеры.
- `--bark-black` #2A2520 — основной текст, тёмные секции (top-frame, footer), бордеры инпутов.
- `--smoked-oak` #6B5544 — вторичный текст, captions, sub-headline, sub под wordmark.
- `--fg-soft` #8A7A65 — третичный текст, placeholders.
- `--wax-seal` #7A2E2A — единственный CTA-цвет: primary-кнопка, hover ссылок, focus инпутов, акцент `<em>` в headline.
- `--accent-hover` #5E2320 — hover для primary-кнопки.
- `--honey-light` #D4A574 — тёплый highlight, glow вспышек логотипа, hover-подсветка.
- `--forest-moss` #4A5240 — botanical/природные метки, редкий маркер.

---

## 4. Spacing-система

| Token  | Value | Применение |
|--------|-------|------------|
| `--s-1` | 4px   | микро-зазоры, иконки |
| `--s-2` | 8px   | label ↔ input, inline-пары |
| `--s-3` | 16px  | внутри компонентов, gap чипов |
| `--s-4` | 24px  | внутренний padding карточки, mobile-edge |
| `--s-5` | 32px  | gap внутри секций, padding кнопок (16×32) |
| `--s-6` | 48px  | padding карточек, gap между блоками |
| `--s-7` | 64px  | разделители, hero padding-x |
| `--s-8` | 80px  | минимум вертикального padding секции |
| `--s-9` | 120px | щедрый padding секции |
| `--s-10`| 160px | hero / разрыв главы |

Горизонтальный page-padding: 56px desktop, 24px ≤ 900px.

---

## 5. Брейкпоинты

- **Mobile:**   `≤ 900px` — единственная media-query в проекте. Сетки сворачиваются: preview 3→2 колонки, footer 4→1, nav в столбец, page-padding 24px.
- **Tablet:**   `901px – 1199px` — desktop-сетка, без изменений.
- **Desktop:**  `≥ 1200px` — полный desktop-layout, max-width контейнеров 1320px (preview) и 1200px (hero video).

---

## 6. Анимации

**Тайминги (глобально)**
- `--ease`: `cubic-bezier(0.4, 0.0, 0.2, 1)` — единственная кривая.
- `--dur-quick`: 300ms — hover, focus, изменения цвета/бордера.
- `--dur-med`:   600ms — fade-in секций, image-hover.
- `--dur-slow`:  800ms — entrance, breathe-переходы.

**Hero headline rotation**
- Cross-fade двух заголовков, 5400ms интервал, opacity transition 1200ms.

**Hero video breathe**
- `hero-breathe` 18s ease-in-out infinite. Scale 1 → 1.04 → 1; opacity 0.78 → 0.88 → 0.78.

**Preview cards**
- Card breathe: `card-breathe` 14s ease-in-out infinite, scale 1 → 1.05 → 1. Stagger 6 шт. через negative delays: 0, -2.3s, -4.6s, -6.9s, -9.2s, -11.5s.
- Stagger entry: opacity 0 → 1, 1400ms, шаг 380ms между карточками.
- Hover label: цвет → `--wax-seal`, letter-spacing 0 → 0.06em, появление двух 24px хэирлайнов (700ms, без delay). Idle-возврат с delay 1500ms.

**Logo neon-flicker (главная анимация бренда)**
- Keyframes `neon-flicker`, **16s linear infinite**, `filter: drop-shadow(...)`.
- 4 вспышки с нерегулярными паузами и длительностями:
  - **Flash 1** — soft single, peak 7%, decay до 22%. Attack ~0.5s, decay ~2.4s. Brightness 0.5/0.25.
  - **Flash 2** — lightning, 3 strikes: 32.5% / 36% / 39.5% (peak), decay до 54%. Peak brightness 0.7/0.4/0.2 + warm honey aura.
  - **Flash 3** — faintest breath, peak 59%, decay до 67%. Brightness 0.32.
  - **Flash 4** — warm lightning, 2 strikes: 78.5% / 82% (peak), warm decay до 97%. Brightness 0.5/0.3/0.16, honey-light dominant.
- Принципы: attack ≈ 1×, decay ≈ 4× attack; никакого ритма; brightness/size/hue варьируются на каждой вспышке; межвспышечные паузы 8% / 3% / 9%.
- Цвета свечения: `rgba(255,250,240, α)` (холодный белый) + `rgba(212,165,116, α)` (honey-light).

**Scroll fade-in**
- Все `<section>` и `<footer>`: opacity 0 → 1, 800ms, IntersectionObserver threshold 0.05.

**Универсальные правила движения**
- Никаких bounce, никаких spring. Только `--ease`.
- Никаких rounded corners (`--radius: 0`), никаких shadow для глубины — depth = air + contrast.
- Image hover — лёгкое затемнение до opacity 0.85–0.88, 600ms.

---

## 7. Tone of voice

Тихая, замедленная, литературная речь. Пишем так, будто это запись из дневника куратора, а не магазин. Короткие фразы, без капса, без восклицаний, без эмодзи.

- **Заголовки** — поэтичные, italic serif, в формате наблюдения, не обещания. Часто с эмфазом одного слова цветом wax-seal: *"Memories matter more than achievements"*, *"People want to return to where it was warm"*.
- **Подзаголовки и описания** — одно длинное дыхание, без точек посередине, с em-тире. Пример: *"Handcrafted ceramic paintings that return you to when happiness was simple — bringing that quiet feeling home"*.
- **Манифесто / philosophy** — 3–4 строки, balance-wrap, тон утверждения через отрицание: *"not to fill a room, but to define it"*.
- **Микрокопия (кнопки, nav, captions)** — mono uppercase, существительные, без глаголов действия: *"Gallery"*, *"The Craft"*, *"Bespoke"*, *"Kind Words"*, *"Client Care"*, *"Explore the Collection"*. CTA как приглашение, не команда.
- **Lexicon** — "studio", "dispatch", "kind words", "client care", "bespoke", "the craft", "a quiet letter". Избегать: "shop", "buy now", "discover", "premium", "luxury".
