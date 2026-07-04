---
name: orlinsky-design
description: Use this skill to generate well-branded interfaces and assets for ORLINSKY Ceramic Studio — a premium handmade ceramic-painting brand in the quiet-luxury / wabi-sabi / Astier de Villatte tradition. Use for production code, prototypes, slides, marketing pages, certificates, packaging concepts, or any visual artifact representing the brand.
user-invocable: true
---

# ORLINSKY Ceramic — design skill

Read `README.md` first. It contains the brand voice, content fundamentals, visual foundations, and iconography rules.

Then explore:
- `colors_and_type.css` — all design tokens. Always import this into HTML artifacts and use the CSS custom properties (e.g. `var(--wax-seal)`, `var(--font-serif)`) rather than hard-coded values.
- `assets/` — logos in four colorways (original orange, bark black, wax seal, bone white). Copy the appropriate variant for your background.
- `fonts/README.md` — font substitution notes.
- `preview/` — small specimen cards for every token cluster. Use these as quick reference when in doubt.
- `moodboard.html` — the system applied. Look at this before designing anything.

## When designing
- Use the muted palette. Never invent new colors. Never use gradients, pure white, pure black, neon, or pastel.
- Type weights never exceed 500. Cormorant Garamond for serif. Inter for body. JetBrains Mono for captions/labels/buttons.
- `border-radius: 0` always. `box-shadow: none` always. Borders are 0.5px hairlines in Aged Clay.
- Section padding starts at 80px. Generous is 120px. Hero is 160px.
- Body copy is left-aligned. Manifestos are centered italic serif.
- Voice: cinematic, slow, poetic. Short sentences. No "buy now" — say "bring it home". No emoji. No exclamation marks. Sentence case.
- Only animation: fade-in 600–800ms. No bounce, no slide, no scale.
- Images at full-bleed where possible. Captions are tiny mono-uppercase under the image.

## Output formats
- **Visual artifacts** (slides, mocks, throwaway prototypes, certificates): create static HTML files, copy the appropriate logo variant from `assets/`, link `colors_and_type.css`, and use the existing component classes.
- **Production code**: copy the tokens and component patterns; read the README to internalize the rules.

## When the user invokes this skill without guidance
Ask what they want to build. Then ask: what surface (web page, slide, certificate, packaging, instagram post)? What moment in the customer journey (first encounter, certificate of authenticity, post-purchase ritual)? What one piece of work is at the centre? Then design as an expert in the ORLINSKY voice.
