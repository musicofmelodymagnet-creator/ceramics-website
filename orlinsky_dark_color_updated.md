# ТЗ: Обновление цветовой системы — Orlinsky Ceramic Studio
**Для:** Claude Code  
**Проект:** https://musicofmelodymagnet-creator.github.io/ceramics-website/  
**Задача:** Заменить текущую светлую/смешанную палитру на тёмную элитную палитру бренда

---

## 1. Финальная цветовая палитра

Объявить в `:root` как CSS-переменные. Это единственный источник цветов — никаких хардкоженных HEX в коде.

```css
:root {
  /* === ФОНЫ — три слоя глубины === */
  --color-bg-base:        #1A1612;  /* Deep Bark    — самый тёмный, фон всей страницы */
  --color-bg-surface:     #2A2520;  /* Bark Black   — секции, хедер, футер, карточки */
  --color-bg-elevated:    #332D28;  /* Warm Shadow  — hover карточек, разделители, borders */

  /* === ТЕКСТ — иерархия читаемости === */
  --color-text-primary:   #F5F1E8;  /* Bone White   — заголовки, основной текст, навигация */
  --color-text-secondary: #C9B89A;  /* Aged Clay    — подзаголовки, подписи, muted текст */
  --color-text-muted:     #7A6E63;  /* тёмный Clay  — placeholder, disabled, мелкие подписи */

  /* === АКЦЕНТ — оранжевый, только точечно === */
  --color-accent:         #C8701F;  /* Ember Orange — логотип, CTA кнопки, hover ссылок */
  --color-accent-hover:   #E8833A;  /* Ember Light  — hover состояние акцентных элементов */
  --color-accent-pressed: #8C4B12;  /* Ember Deep   — active/pressed состояние кнопок */

  /* === ГРАНИЦЫ === */
  --color-border:         #332D28;  /* Warm Shadow  — все border, divider, линии */
  --color-border-accent:  rgba(200, 112, 31, 0.3); /* граница с оранжевым свечением */
}
```

---

## 2. Назначение цветов по блокам сайта

### `<body>` и общий фон страницы
```css
body {
  background-color: var(--color-bg-base);   /* #1A1612 */
  color: var(--color-text-primary);          /* #F5F1E8 */
}
```

---

### Header / Navigation
```css
header, nav {
  background-color: var(--color-bg-surface);  /* #2A2520 */
  border-bottom: 0.5px solid var(--color-border); /* #332D28 */
}

/* Логотип текст */
.logo-text {
  color: var(--color-text-primary);  /* #F5F1E8 */
  letter-spacing: 0.18em;
}

/* Иконка орла в логотипе */
.logo-icon, .logo svg {
  fill: var(--color-accent);  /* #C8701F */
}

/* Навигационные ссылки */
nav a {
  color: var(--color-text-secondary);  /* #C9B89A */
}
nav a:hover {
  color: var(--color-accent);  /* #C8701F */
}

/* Бургер-меню иконка */
.menu-icon {
  color: var(--color-text-primary);  /* #F5F1E8 */
}
```

---

### Hero секция (главный экран с видео/изображением)
```css
.hero {
  background-color: var(--color-bg-base);  /* #1A1612 */
}

/* Overlay поверх видео */
.hero-overlay {
  background: rgba(26, 22, 18, 0.55);  /* полупрозрачный Deep Bark */
}

/* Заголовок H1 */
.hero h1 {
  color: var(--color-text-primary);  /* #F5F1E8 */
}

/* Курсивные выделенные слова в заголовке */
.hero h1 em, .hero h1 i {
  color: var(--color-text-secondary);  /* #C9B89A — тёплый контраст */
}

/* Подзаголовок / дескрипшн */
.hero p, .hero .subtitle {
  color: var(--color-text-secondary);  /* #C9B89A */
}
```

---

### Gallery / Product Grid секция
```css
/* Фон секции */
.gallery-section, .collection-section {
  background-color: var(--color-bg-base);  /* #1A1612 */
}

/* Карточки */
.gallery-card, .product-card {
  background-color: var(--color-bg-surface);  /* #2A2520 */
  border: 0.5px solid var(--color-border);    /* #332D28 */
}
.gallery-card:hover {
  background-color: var(--color-bg-elevated);  /* #332D28 */
  border-color: var(--color-border-accent);    /* оранжевое свечение */
}

/* Подписи под фото */
.gallery-card .caption, .gallery-card .title {
  color: var(--color-text-secondary);  /* #C9B89A */
}
```

---

### About / The Craft секция
```css
.about-section, .craft-section {
  background-color: var(--color-bg-surface);  /* #2A2520 — чуть светлее для ритма */
}

.about-section h2, .craft-section h2 {
  color: var(--color-text-primary);  /* #F5F1E8 */
}

.about-section p, .craft-section p {
  color: var(--color-text-secondary);  /* #C9B89A */
}
```

---

### CTA кнопки (Explore Collection, Bespoke и т.д.)
```css
/* Основная кнопка — outlined стиль (элегантнее для люкса) */
.btn-primary {
  background: transparent;
  border: 0.5px solid var(--color-accent);  /* #C8701F */
  color: var(--color-accent);               /* #C8701F */
  letter-spacing: 0.12em;
}
.btn-primary:hover {
  background: var(--color-accent);       /* #C8701F — заполняется */
  color: var(--color-text-primary);      /* #F5F1E8 */
  border-color: var(--color-accent);
}
.btn-primary:active {
  background: var(--color-accent-pressed);  /* #8C4B12 */
}

/* Вторичная кнопка */
.btn-secondary {
  background: transparent;
  border: 0.5px solid var(--color-border);  /* #332D28 */
  color: var(--color-text-secondary);       /* #C9B89A */
}
.btn-secondary:hover {
  border-color: var(--color-text-secondary);
  color: var(--color-text-primary);
}
```

---

### Newsletter / Email subscribe секция
```css
.newsletter-section {
  background-color: var(--color-bg-surface);  /* #2A2520 */
  border-top: 0.5px solid var(--color-border);
  border-bottom: 0.5px solid var(--color-border);
}

.newsletter-section label,
.newsletter-section p {
  color: var(--color-text-secondary);  /* #C9B89A */
}

/* Input поле */
.newsletter-section input[type="email"] {
  background: var(--color-bg-elevated);  /* #332D28 */
  border: 0.5px solid var(--color-border);
  color: var(--color-text-primary);      /* #F5F1E8 */
}
.newsletter-section input::placeholder {
  color: var(--color-text-muted);  /* #7A6E63 */
}
.newsletter-section input:focus {
  border-color: var(--color-accent);  /* #C8701F */
  outline: none;
}

/* Кнопка Subscribe */
.newsletter-section button {
  /* Использовать стили .btn-primary выше */
}
```

---

### Footer
```css
footer {
  background-color: var(--color-bg-surface);  /* #2A2520 */
  border-top: 0.5px solid var(--color-border);
}

/* Логотип в футере */
footer .logo-icon, footer .logo svg {
  fill: var(--color-accent);  /* #C8701F */
}
footer .logo-text {
  color: var(--color-text-primary);
}
footer .logo-subtitle {
  color: var(--color-text-secondary);  /* #C9B89A */
  letter-spacing: 0.2em;
}

/* Заголовки групп (STUDIO / ELSEWHERE / LEGAL) */
footer .nav-group-title {
  color: var(--color-text-muted);  /* #7A6E63 — намеренно приглушён */
  letter-spacing: 0.14em;
  font-size: 10px;
}

/* Ссылки в футере */
footer a {
  color: var(--color-text-secondary);  /* #C9B89A */
}
footer a:hover {
  color: var(--color-accent);  /* #C8701F */
}

/* Copyright строка */
footer .copyright {
  color: var(--color-text-muted);  /* #7A6E63 */
  letter-spacing: 0.1em;
}
```

---

### Dividers / Разделители между секциями
```css
hr, .divider, .section-separator {
  border: none;
  border-top: 0.5px solid var(--color-border);  /* #332D28 */
}
```

---

### Scrollbar (опционально, для полного погружения)
```css
::-webkit-scrollbar {
  width: 4px;
}
::-webkit-scrollbar-track {
  background: var(--color-bg-base);     /* #1A1612 */
}
::-webkit-scrollbar-thumb {
  background: var(--color-bg-elevated); /* #332D28 */
}
::-webkit-scrollbar-thumb:hover {
  background: var(--color-accent);      /* #C8701F */
}
```

---

## 3. Что удалить / заменить

| Что сейчас | На что заменить |
|---|---|
| `#F5F0EB` или `#F5F1E8` как фон секций | `var(--color-bg-base)` или `var(--color-bg-surface)` |
| `background: white` или `background: #fff` | `var(--color-bg-surface)` |
| Любой светлый `beige`, `linen`, `cream` фон | удалить, заменить на тёмные слои |
| Тёмный текст на светлом фоне | `var(--color-text-primary)` на тёмном фоне |

---

## 4. Правило использования оранжевого

**Оранжевый `#C8701F` применять ТОЛЬКО для:**
- SVG логотипа (орёл и текст "ORLINSKY" в хедере и футере)
- border и color кнопок CTA (Explore, Bespoke, Subscribe)
- hover состояния навигационных ссылок
- focus состояния input полей
- hover на scrollbar

**Оранжевый НЕ использовать для:**
- фоновых блоков и секций
- основного текста и заголовков
- иконок и декоративных элементов не связанных с действием
- более чем 5% видимой площади экрана

---

## 5. Проверка после внедрения

- [ ] Весь белый/бежевый фон убран
- [ ] Три уровня тёмных фонов создают глубину при скролле
- [ ] Логотип-орёл оранжевый на тёмном фоне
- [ ] Кнопки CTA используют outlined оранжевый стиль
- [ ] Все тексты читаемы (contrast ratio минимум 4.5:1)
- [ ] Hover ссылок меняется на `#C8701F`
- [ ] Нет ни одного хардкоженного цвета — только CSS-переменные
