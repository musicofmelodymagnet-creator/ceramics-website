# ORLINSKY — Site Structure & Content System

> Source: `uploads/TZ for the creation of a website about ceramics.xlsx` — the studio's site brief. Imported, parsed, and folded into the design system on 25 May 2026. This file is now the canonical reference for site IA, content, and tone. The look-and-feel comes from `README.md` + `colors_and_type.css`; this file says **what the site is**.

---

## 0. The thesis

ORLINSKY is **not a shop**. It is a curated room with very few objects in it. The site exists to do three things, in this order:

1. Make a person feel something quiet.
2. Show them, slowly, why this is worth what it costs.
3. Let them bring one piece home — without ever being sold to.

Every IA decision, every component, every line of copy serves this in that order. If something on the page is doing none of these three, we remove it.

> **Cardinal rule from the brief:** *"Everything that looks like an attempt to sell — cheapens. Everything that looks like confidence — sells."*

---

## 1. Information Architecture

### Menu (visible)

```
GALLERY        THE CRAFT      BESPOKE        OUR STORY      KIND WORDS      CLIENT CARE
```

- **Welcome / hero is NOT in the menu.** It lives on `/` and is reached by clicking the logo. This is intentional — the menu shows *intent*, not the homepage.
- **FAQ is folded into Client Care.** Never a top-level item. (FAQ as a standalone tab reads like a help desk; premium brands rarely have one.)

### Section order — psychological flow

| # | Section | What it does for the visitor |
|---|---|---|
| 1 | **Welcome** | Emotional entry. Atmosphere before information. *"I want this in my home."* |
| 2 | **Gallery** | Visual evidence. Curated, not catalogued. 3–5 pieces, no prices on the index. |
| 3 | **The Craft** | Rational justification for price. Hands, kiln, glaze, time. |
| 4 | **Bespoke** | The upsell, framed as authority. Custom commissions raise the brand. |
| 5 | **Our Story** | The person. Founder narrative, values, why. |
| 6 | **Kind Words** | Social proof. 3–5 deep video reviews, not star ratings. |
| 7 | **Client Care** | Reassurance. Shipping, returns, packaging, support. FAQ inside. |

Emotion → evidence → justification → upgrade → person → trust → safety. Each section answers the question the previous one raised in the visitor's mind.

---

## 2. Section playbooks

### 2.1 WELCOME (`/`)

**Purpose:** atmospheric, not informational. Set a tone, slow the visitor down.

**Anatomy:**

1. **Hero atmosphere** — logo top-center, then a looping 20–25 s 16:9 video of ceramic paintings in an old forest. Generous air around it. No play controls visible.
2. **Rotating headlines** below the video — large serif italic, max 6–8 words, change every few seconds:
   - "Memories matter more than achievements."
   - "People want to return to where it was warm."
3. **Sub-headline** below: *"Handcrafted ceramic paintings that return you to when happiness was simple — bringing that quiet feeling home."* (one line; max two)
4. **CTA:** `Explore the Collection` — text link with hairline underline, not a filled button.
5. **3–4 works preview** — curated images, no prices, short evocative names ("Sand Vessel", "Still Form"). No descriptions. Names + image only.
6. **Philosophy block** — 2 lines max:
   - *"At ORLINSKY, we create pieces that carry stillness into a space."*
   - *"Formed slowly by hand, each work is shaped with intention — not to fill a room, but to define it."*
7. **The Craft teaser** — 3 macro shots (glaze gloss, matte texture, frame edge) with three short lines:
   - *Each piece is shaped slowly by hand.*
   - *No repetition. No factory molds.*
   - *Only intention.*
8. **Closing statement** — one poetic sentence and a very quiet text-link `Enter the Collection`.

**Rules:**
- No "Buy Now". Anywhere.
- No prices on this page.
- Maximum 4–6 lines of body copy on the whole page — beyond that, the brand starts to *explain itself*, which kills luxury silence.

---

### 2.2 GALLERY (`/gallery`)

**Index page:** initially one section — **Ceramic Paintings**. Future sections (only when work exists): Ceramic Brooches, Ceramic Vases. The word "Ceramic" may be dropped from category labels as the brand matures.

> Future categories from the brief, *for reference only — not built yet*: Wall Ceramic Art, Ceramic Jewelry, Sculptural Plates & Bowls, Limited Editions, Custom Commissions.

**Index composition (Ceramic Paintings):** vertical ribbon of works. Each entry = one large image + work name underneath. No prices on the index. Clicking opens the product page.

**Product page (`/gallery/<slug>`):** the rich screen. Built on the **Lot** product-card system (see `product-card-variants.html`).

**Image set per work** (slider order, brief specifies):
1. Main hero photo
2. The work, in an old forest (signature brand shot)
3. Alternate angle
4. The work hanging on a wall (in situ)
5. Macro detail
6. The work, held in hands (scale + tactility)
7. Back view (shows hanging hardware)
8. The work in its packaging

**Information blocks (in this order):**

1. **Title** — work name (e.g. *"Hope of life"*)
2. **Price** — e.g. `$ 140`
3. **Size selector** — three diameters: 7 / 9 / 11 inches. Mono caps. Inline label "Size".
4. **Size guide popover** — opens a single image showing all three sizes side-by-side, photographed next to a familiar object for scale (a phone), with each size dimensionally annotated.
5. **CTA** — `Add to Cart` (default). Brief notes consider testing `Buy it now` — flag for A/B.
6. **The story** *(2–4 sentences, serif italic — meaning, inspiration)*
   > *"This piece was inspired by quiet mornings and the feeling of returning to yourself. It captures a moment of stillness — soft, warm, and deeply personal. Every detail is meant to feel calm, timeless, and honest."*
7. **Craft** *(process, technique, what makes it one-of-one)*
   > *"Handcrafted from stoneware clay and finished with layered glazes. Each ceramic painting is shaped, fired, and refined by hand. No two pieces can ever be repeated."*
8. **Details** (mono caps, tabular)
   - Material: Stoneware ceramic
   - Finish: Gloss + matte glaze layers
   - Hanging: Ready to hang (back hardware included)
   - Weight: ~0.9–1.2 kg (size-dependent)
   - Care: Dust gently with a soft dry cloth
9. **Shipping & Returns** — short blurb + text link to Client Care
   > *"Carefully packaged for safe delivery. Shipping and return details can be found in Client Care."*
10. **Making-of video** — short edit of the firing/glazing process. Optional photo stills as fallback. The brief flags this as a significant lever for perceived value.

---

### 2.3 THE CRAFT (`/craft`)

**Purpose:** raise perceived value at a subconscious level. Justify the price *without ever justifying it.*

**Background:** use Raw Linen (`--bg-surface`) to set this section apart from the bone-white default — chapter-break feel.

**Structure (5 blocks, each one macro photo + 2 short lines):**

**Block 1 — Beginning**
- Photo 1: hands in clay, warm light
- Headline: *"True depth is often hidden in the quietest forms."*
- Sub: *"Layer by layer, each piece is shaped, fired and refined over 10 days."*

**Block 2 — The Process** (visual storytelling, four photos in sequence)
- Photo 2 — working by hand: *"Built by hand, each form develops its own natural character."*
- Photo 3 — surface and texture: *"Nothing is over-refined — the surface is allowed to remain authentic."*
- Photo 4 — kiln, fire: *"Inside the kiln, heat and time give each piece lasting durability. Fire completes what the hand begins."*
- Photo 5 — painting and glazing: *"The final surface balances softness, depth and quiet luminosity."*
- Photo 6 — final: *"Each work is personally checked before it becomes yours."*

**Block 3 — Philosophy of imperfection**
- Photo 7 — surface imperfections
- Lead: *"No piece is identical — each one develops its own quiet identity."*
- Sub: *"These subtle differences give every piece its own unmistakable character."*

**Block 4 — Materials & quality** (5 bulleted attributes — exception to the no-list rule, but kept tight)
- Durable ceramic composition
- Multiple controlled kiln firings
- Hand-layered glaze and paint
- Stable wall mounting system
- Carefully quality-checked

**Block 5 — Emotional anchor**
- *"Created as a quiet return to the warmth we carry from childhood."*

**Rules:**
- No bulleted lists outside Block 4. Bullets cheapen craft sections.
- All photography here is macro / hand / process. Never product shots.

---

### 2.4 BESPOKE (`/bespoke`)

The custom-commissions section. *"Bespoke is the gold. It makes you a studio, not a shop, and it raises the average check automatically."*

**Currently a stub** in the brief — content to be developed. Frame:
- A short opening sentence acknowledging custom work.
- 1–3 examples of past commissions (if available).
- A discreet contact prompt — "Write to us" style, no form on the page.
- One related capability mentioned in FAQ: a personal inscription as a wax seal with a heartfelt message.

---

### 2.5 OUR STORY (`/our-story`)

**Purpose:** narrative of meaning, not biography. Premium buyers in the 30–60 demographic buy *people* once they trust the work.

**Composition:**
- Top: portrait photograph of Ruslan Orlinsky (founder).
- Below: a personal essay, set in serif italic for emotional voice, broken into short paragraphs with generous space between them.

**The essay** (English; Russian version also provided in the brief — keep both as language variants):

> *I often find myself thinking that a person is not just a story, but an entire world — filled with quiet and precious memories, especially from childhood.*
>
> *Summers that felt endless. The scent of rain — it felt different back then. A home where everything was calm. Familiar voices that still echo in memory. In those simple details lived that true kind of happiness.*
>
> *At some point, I realized I wanted to create works that help us return to that state. To that inner feeling when happiness was quiet and simple — like childhood memories.*
>
> *That is how our ceramic paintings came to life.*
>
> *Their compositions are intentionally simple. And within that simplicity lives that very feeling — distant, warm, almost forgotten. A feeling we sometimes wish to return to quietly.*
>
> *While creating each piece, traces of hands, movement, and time remain on its surface. Every firing adds depth — just as the years add depth to our memories. Sometimes I notice a small uneven mark and choose to leave it — as a reminder that memory, too, is never perfectly smooth.*
>
> *I believe the objects in our homes can hold a state of being. At times, they become a quiet reminder of when happiness had no conditions — when a warm evening and the embrace of loved ones were enough.*
>
> *If one of these works becomes a point of return for you — to yourself, to simplicity, to that familiar feeling of happiness — then it has found its home.*
>
> *— Ruslan Orlinsky*

**Layout:** single column, max 60ch line length, serif italic 17–18px, line-height 1.7, generous paragraph spacing. The signature appears as a small mono caps line at the bottom, OR as a handwritten scan if one exists.

---

### 2.6 KIND WORDS (`/kind-words`)

**Purpose:** social proof — but as gratitude from the studio, not as a "reviews" list.

**Opening copy** (from the studio, italic serif):

> *Behind every artwork are hours of handmade work, inspiration, and love for details.*
>
> *That is why your kind reviews touch us so deeply. Thank you for sharing your emotions and allowing our art to become part of your stories.*
>
> *For an artist, this means far more than simple words of appreciation.*

**Composition:**
- **Video testimonials** — vertical format, 3–5 deep ones.
- **Desktop:** horizontal row of video tiles, each in its own vertical frame.
- **Mobile:** stacked vertically.
- Below each video: a short emotional pull quote in serif italic + the customer's first name and city.
- Bonus when available: a photograph of the work in the customer's home.

**Rules:**
- No star ratings.
- No "verified buyer" badges.
- No "X out of Y customers". The presence of the video is the proof.

---

### 2.7 CLIENT CARE (`/client-care`)

**Purpose:** "I am safe" feeling. Reassurance, not a help desk.

**Composition (sub-sections):**
- **Contact** — email + Instagram. No web form on this page; the email itself is the gesture.
- **Shipping** — short paragraph + delivery times.
- **Returns** — return policy in plain language.
- **Packaging** — how the work is packed (this is part of the brand).
- **Support** — short reassurance paragraph.
- **FAQ** — embedded below Client Care content; collapsible accordion of questions. Eleven questions are pre-written in the brief — keep them all (see `/faq` data below).

**Tone:** every paragraph carries the brand's voice. *Не "напишите нам" а через тон бренда.* Never "contact us" as a CTA — always something like *"If anything is unclear, write to us at hello@orlinsky.studio."*

---

### 2.8 FAQ (inside Client Care)

Render as a quiet collapsible accordion, hairline-separated. Mono-caps question labels, serif italic answers.

| # | Question | Answer (English) |
|---|---|---|
| 1 | What is the idea behind your paintings? | I'm inspired by the idea that every person carries an entire world within them — a world of quiet, meaningful memories. The simple moments of childhood, when happiness felt natural and unconditional. Through my ceramic paintings, I try to reflect that very state — a sense of calm, simplicity, and the gentle feeling of returning to yourself. |
| 2 | How are the ceramic paintings made? | Each piece is handcrafted from durable ceramic, kiln-fired, and finished with artistic glazes. Thanks to the handmade process and firing, every artwork is truly one of a kind and beautifully unique. |
| 3 | Which countries do you ship to? | Our studio is based in Canada, and we ship worldwide in partnership with trusted carriers. |
| 4 | What are the processing and delivery times? | Orders require up to 2 business days for preparation, followed by shipping time. Exact delivery estimates will be shown at checkout after you enter your shipping address. |
| 5 | How do you package the artwork for safe delivery? | Each artwork is packaged like a fragile art object, with protective layers, sturdy materials, and reinforced corners. Our goal is for your piece to arrive in perfect condition. |
| 6 | What should I do if my artwork arrives damaged? | If this ever happens, please contact us right away. We will resolve the matter as quickly as possible. |
| 7 | Can I request a return or exchange? | Yes, returns are possible. However, as each piece is fragile and unique, return conditions may vary. Full details can be found in the Client Care / Shipping & Returns section. |
| 8 | Is the artwork ready to hang? | Yes, mounting hardware is installed on the back, so you can hang the piece as soon as it arrives. |
| 9 | Can I add a personal inscription? | Yes, this option is available. We can add a personal inscription in the form of a wax seal with your heartfelt message — a beautiful and truly unique touch. Details can be found in the Bespoke section. |
| 10 | Will the artwork look exactly like the photos? | You will receive the exact piece shown on the product page. As each artwork is handmade, slight natural variations may occur — these are part of its individuality and charm. |
| 11 | How should I care for a ceramic artwork? | Care is simple: gently wipe with a soft, dry cloth. Do not use abrasives or wash under water. |
| 12 | Can it be displayed in a bathroom or kitchen? | Yes, ceramic and glaze handle humidity well. However, please avoid direct contact with water and strong impact, as with any fragile art object. |
| 13 | How can I contact you if I have a question? | You can contact us via the email listed in the Client Care section. We'll be happy to assist you. |

---

### 2.9 FOOTER

Minimalist. From the brief: *"Без перегруза."*

**Columns:**
- **Brand**: ORLINSKY lockup (canonical A2) + *"Handcrafted Ceramic Art"* tagline below.
- **Navigation**: Contact · Client Care · Shipping & Returns · Bespoke Inquiries
- **Social**: Instagram
- **Legal**: Privacy Policy · Terms of Service · Copyright line

Compose on the dark frame (Bark Black) — matches the approved header treatment so the page is bracketed by the brand.

---

## 3. Premium pitfalls — do not commit these

From the brief's "Фишки по сайту" sheet — distilled. **Read this list before writing any copy or designing any screen.**

| Pitfall | Why it cheapens | Correct move |
|---|---|---|
| **Too many words** | A brand that over-explains is a brand that doubts itself. | Short phrases. Silence = confidence. |
| **Shouting CTAs** ("BUY NOW", "ORDER TODAY", "LIMITED TIME") | Pressure reads as mass-market. | `Explore`, `View`, `Discover`, `Bring it home`. |
| **Too many products on the homepage** | Abundance feels cheap; scarcity feels valuable. | 3–5 pieces presented as a gallery, not a grid. |
| **Sales, discounts, badges** ("SALE", "-10%", "BESTSELLER") | Discounts say "we need to sell this". | Limit by quantity (1 of 1), never by price. |
| **Stock photography** | Polished stock = fake. | Real light, real texture, real imperfection. Studio shots only. |
| **Icons & infographics** ("quality / delivery / guarantee" rows) | Iconography = corporate presentation. | Text + space. |
| **Too many colors and fonts** | Looks nervous, looks cheap. | 1–2 colors, 1–2 fonts. (We use the 8-color palette as a *system*, not a *paint set* — most pages use 3 of them.) |
| **Showing price too early** | Price before value scares the visitor away. | Story → craft → value → price. Price never on the homepage. |
| **"We're the best"** ("Top quality", "Best handmade ceramics") | Top brands don't announce, they demonstrate. | Facts. Silence. Confidence. |

---

## 4. Color note — alternative palette in the brief

The brief proposes an alternative palette called **"Organic Sanctuary"**:

| Role | Hex | Name (brief) |
|---|---|---|
| Background (60%) | `#F9F7F2` | Warm Alabaster |
| Secondary bg (30%) | `#EAE7E1` | Gallery Bone |
| Text | `#2C2C2C` | Soft Charcoal |
| Accent (3%) | `#A69689` | Deep Taupe |

**Decision:** keep the **already-approved 8-color palette** from `colors_and_type.css` (Bone White, Raw Linen, Aged Clay, Bark Black, Smoked Oak, Wax Seal, Forest Moss, Honey Light). The approved palette is *more confident* — it has a real accent (Wax Seal) and a botanical marker (Forest Moss), where Organic Sanctuary is one-note muted. Both palettes share the same philosophy; ours is the richer version. If the studio later wants a softer pass, we can produce a "Sanctuary" theme variant — flag this as a possible Tweak.

---

## 5. Tone & voice — quick reference for any new page

- **Person:** "we" when the studio speaks; "you" when inviting the visitor.
- **Sentence length:** short. Pauses live between sentences.
- **Casing:** sentence case in everything except mono caps captions, labels, buttons.
- **Italic serif:** reserved for emotional manifestos and product story copy.
- **Mono caps:** captions, dates, labels, sizes, prices, button text.
- **Forbidden:** "Buy now", urgency words, exclamation marks, emoji, "limited time", "top", "best", "ultimate", "amazing".
- **Preferred verbs:** *bring it home, take it with you, begin the ritual, enter, return, hang where the morning light arrives.*

---

## 6. Components needed (build queue)

Now that the IA is set, the UI kit can be built section-by-section. Suggested order:

1. **Site header (canonical A2 on bark)** — done in moodboard.
2. **Footer (bark)** — done in moodboard.
3. **Product card — Lot** — done (`product-card-variants.html`).
4. **Welcome / homepage** — hero, rotating headlines, philosophy block, craft teaser.
5. **Gallery index** — vertical ribbon of works.
6. **Product page** — built from Lot card system + image slider + size selector + size-guide popover + the story / craft / details / shipping accordions.
7. **The Craft** — long-scroll editorial.
8. **Our Story** — long-form essay layout.
9. **Kind Words** — video testimonial grid (desktop) / stack (mobile).
10. **Client Care + FAQ** — accordion + contact block.
11. **Bespoke** — stub page, awaiting content.

Build each as a static HTML page in `ui_kits/website/` so it can be reviewed in isolation.

---

*Last folded into the system: 25 May 2026, from the brief uploaded as `TZ for the creation of a website about ceramics.xlsx`.*
