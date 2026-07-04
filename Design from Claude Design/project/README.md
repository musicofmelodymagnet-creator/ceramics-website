# ORLINSKY Ceramic — Design System

A design system for **ORLINSKY**, a premium handmade ceramic-painting studio whose work hangs in homes from New York to Vancouver. Every piece is a one-of-one artifact: hand-pressed with branches and leaves from a single five-hundred-year-old tree, fired, and finished with a wax seal.

> *We do not sell ceramics. We sell preserved childhood quiet — the memory of a tree, the silence of a room, the weight of a thing made slowly.*

## The brand in one line
**Object + memory + silence = art.** ORLINSKY lives in the *emotional luxury* category alongside Astier de Villatte, Faye Toogood and The Row. The aesthetic is quiet luxury, imperfect minimalism, wabi‑sabi — read it like a Terrence Malick film or a chapter of *The Life of Chuck*.

## Market
Premium interior art, United States & Canada. Buyers are collectors, designers, and people furnishing slowly.

## Sources used to build this system
- `uploads/LOGO.png` — primary brand mark (eagle / phoenix with spread wings + "CERAMIC STUDIO" wordmark). Recolored in-system to muted palette tones (see Iconography).
- Written brand brief (philosophy, palette, type, voice, do-not-do list). Embedded inline throughout this README.

No codebase or Figma file was provided; if you have either, drop it in and re-run the design-system skill — I'll fold the real components in.

---

## Index — what's in this folder

| Path | What it is |
|---|---|
| `README.md` | This file. Brand context + content fundamentals + visual foundations + iconography. |
| `SITE-STRUCTURE.md` | Site IA, section-by-section content & tone, premium pitfalls. Read before designing any page. |
| `SKILL.md` | Agent skill manifest — load this to design with ORLINSKY. |
| `colors_and_type.css` | All design tokens (CSS custom properties) + base element styles + core components. |
| `assets/` | Logos (original orange + bark / wax-seal / bone variants). |
| `fonts/README.md` | Font sources & substitution notes. |
| `preview/` | One small HTML card per token cluster — feeds the Design System review tab. |
| `moodboard.html` | A single-page brand world. Open this first. |

---

## CONTENT FUNDAMENTALS

### Voice
Cinematic. Slow. Poetic. Short sentences. Pauses. Negative space inside the writing the same way there is negative space inside the layout.

We never sound like a brand. We sound like a person describing a room they remember.

### Casing
- Headlines and body — **sentence case**, always. Never Title Case. Never ALL CAPS in body.
- The only place uppercase appears is in mono captions, labels, button text, and the wordmark — all set in JetBrains Mono with `letter-spacing: 0.15em`.
- Italic serif is reserved for **manifestos** — short, centered, breathing.

### Person
We write in **we** when the studio speaks ("we press each piece by hand"). We write in **you** when we invite the reader into the room ("you bring it home, and the room slows down").
Never "I". Never corporate "the customer".

### What we don't say
- No "Buy now". No "Add to cart" copy on its own — say *"Bring it home"*, *"Take it with you"*, *"Begin the ritual"*.
- No urgency. No discounts. No "limited time" language — every piece is already one-of-one, scarcity is implicit.
- No exclamation marks. No emoji. No emoji-substitutes (✨, →, •) outside of structural use.
- No adjectives stacked ("beautiful, stunning, unique" — choose one, or none).

### Tone examples

> **Yes** — *"A branch from a tree that watched five centuries pass. We pressed it once, into wet clay, and then we let the clay decide."*

> **Yes** — *"Bring it home. Hang it where the morning light arrives. Forget it is there. Remember, one evening, that it is."*

> **No** — *"Discover our stunning collection of handcrafted ceramic art pieces — perfect for any modern home!"*

> **No** — *"Get yours today before they're gone!"*

### Length
Headlines: 4–9 words. Manifestos: 1–3 short sentences. Product captions: name + year + medium, on one mono line. Body paragraphs: rarely more than 3 sentences before a break.

---

## VISUAL FOUNDATIONS

### Palette
Eight colors. They are bone, linen, clay, bark, oak, wax, moss, honey — every name describes a material you can hold. No greys. No pure white. No pure black. No neons. No pastels. No gradients ever.

- **Primary surfaces** — Bone White `#F5F1E8` (page), Raw Linen `#E8DFCE` (cards), Aged Clay `#C9B89A` (image mats), Bark Black `#2A2520` (text & dark surfaces).
- **Accents** — Smoked Oak `#6B5544` (secondary text), Wax Seal `#7A2E2A` (the one accent — CTAs, seals, important), Forest Moss `#4A5240` (botanical markers), Honey Light `#D4A574` (warm hover, highlights).

### Type
Three families. Two are workhorses; one carries the soul.

- **Cormorant Garamond** — serif soul. Light & regular weights only. Italic is the manifesto voice. Tracked tight (`-0.02em` at display sizes). Bundled locally in `fonts/`. *GT Sectra is the original preference if you have the license.*
- **Inter** — sans body. 400 / 500 (with italics). `line-height: 1.7`. Never goes bigger than 20px in normal use. The 18pt optical cut is bundled as `Inter`; a 24pt cut (`Inter Display`) is available for the rare hero use of sans.
- **JetBrains Mono** — caption voice. Uppercase, `letter-spacing: 0.15em`, 11px. This is how captions, labels, prices, dates, button text and metadata all speak. Regular + Medium bundled locally.

**Weight ceiling:** never above 500. Bold is a foreign language.

### Layout
- Section padding: minimum **80px**, generous **120px**, hero/chapter break **160px**. Whitespace is not empty — it is the design.
- Asymmetric grids. A 12-column underlying grid, but columns are rarely filled — text sits in 4 of them, image in 5, the rest is air.
- **Body text is left-aligned**, always. It reads like a book.
- **Manifestos and emotional pull-quotes are centered**, italic serif, with massive vertical breathing room.
- **Images are priority #1** — full-bleed where possible. Captions live small underneath in mono caps, never dominate.
- Long-form pages are vertical scrolls of generously spaced moments, not packed grids.

### Backgrounds
- Default: **Bone White**.
- Sectional shift: alternate **Raw Linen** for a single section to mark a chapter break — never gradients.
- Occasionally: **Bark Black** for an inverted hero — sparingly, when one image needs museum lighting.
- Decorative: extremely faint pressed-branch / leaf textures at `opacity: 0.15`. Never repeating patterns. Never stock textures.
- **Never:** gradients, blur, glass effects, neumorphism.

### Borders & dividers
- All borders: **0.5px solid Aged Clay** (`#C9B89A`). Hairline. Visible only in stillness.
- Dividers are full-width hairlines with generous vertical margin (48–80px).
- Cards have a border, not a shadow.

### Shadows & depth
- **Zero box-shadow.** Anywhere. Ever.
- Depth comes from: surface color contrast (Bone vs Linen vs Clay) + space + hairline borders.

### Corners
- `border-radius: 0` everywhere. This is museum geometry. No exceptions.

### Motion
- **Only fade-in.** 600–800ms, `cubic-bezier(0.4, 0, 0.2, 1)`. Things appear; they do not arrive.
- No bounce, no slide, no scale-up, no parallax, no auto-rotate.

### Hover & press
- **Images on hover:** opacity drops to `0.85` and the caption emerges underneath. Slow (600ms).
- **Text links:** the underline appears on hover. No color change.
- **Primary button hover:** Wax Seal darkens to `#5E2320`. No movement.
- **Secondary button hover:** inverts — black fill, bone text.
- **Press state:** opacity 0.6 momentarily. No transform-scale, no shadow change.

### Imagery
- Warm, natural, slightly desaturated. Soft daylight. Long shadows from afternoon sun.
- Visible grain is welcome — film texture, not Lightroom presets.
- **No stock photography. Ever.** Only studio work, materials, the tree, the seal, hands.
- Color story leans warm — terracotta, oak, raw clay, honey light, deep oxblood, mossy green outdoors.

### Transparency & blur
- Transparency: only at `0.15` for decorative branch textures, or `0.85` on image hover.
- Blur: never. The brand believes in focus.

### Fixed elements
- Header is **not** fixed. It sits at the top and scrolls away — the work is the priority.
- A small wax-seal mark may reappear in the bottom-right corner of long pages as a return-to-top, only after 200vh of scroll.

---

## ICONOGRAPHY

The brand has almost no iconography. This is intentional — icons are a vernacular for software, and ORLINSKY is not software.

Where a mark is needed, we have **two glyphs**:

1. **The wordmark** — the eagle/phoenix logo (`assets/logo-*.png`). The original (`logo-original.png`) is rendered in a warm orange — when used inside the muted system we recolor it to one of:
   - `logo-bark.png` — Bark Black, default for light surfaces.
   - `logo-waxseal.png` — Wax Seal, for ceremonial uses (certificates, seal marks).
   - `logo-bone.png` — Bone White, for dark inverted heroes.
2. **The wax seal** — a small filled circle in Wax Seal red, used as: favorite marker, certificate stamp, corner mark on featured blocks, return-to-top button. Rendered in pure CSS — no asset file needed. ~16–24px.

### When more icons are unavoidable (e.g. shop UI: cart, account, search)
Use **Lucide** via CDN at `stroke-width: 1`, `width/height: 18px`, color `currentColor` (inherits Bark Black). Lucide's hairline minimalism is the closest match to our hairline visual language.

```html
<script src="https://unpkg.com/lucide@latest/dist/umd/lucide.min.js"></script>
```

> **Flagged substitution:** there is no in-house ORLINSKY icon set. If/when the studio commissions one, drop the SVG files into `assets/icons/` and remove the Lucide CDN dependency.

### Never used
- Emoji.
- Unicode dingbats (★, ✓, →) as icons. Arrows in body copy as the literal character `→` are permitted only in a `.btn--ghost` element.
- Material Icons / Font Awesome / any "filled" icon family. These read as software UI; we are not that.
- Flat illustrations.
- Brand mascots of any kind.

---

## How an agent should use this system

Load `SKILL.md`. Then:

1. Pull tokens from `colors_and_type.css` — never invent colors or sizes.
2. Use the components defined there (`.btn--primary`, `.card`, `.caption`, etc.) before writing new CSS.
3. When in doubt, **remove something**. Add more air. Drop a weight. Decrease the font size of metadata. Centre a manifesto.
4. Read the moodboard (`moodboard.html`) before designing — it's the system in motion.

---

*A piece you live with for thirty years should not look like a piece you scroll past.*
