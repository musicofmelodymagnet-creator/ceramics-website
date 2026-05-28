# Fonts

All three brand typefaces are now bundled locally — no Google Fonts dependency.

## Bundled files

### Cormorant Garamond — serif soul
- `CormorantGaramond-Light.ttf` (300)
- `CormorantGaramond-LightItalic.ttf` (300 italic)
- `CormorantGaramond-Regular.ttf` (400)
- `CormorantGaramond-Italic.ttf` (400 italic)
- `CormorantGaramond-Medium.ttf` (500)
- `CormorantGaramond-MediumItalic.ttf` (500 italic)

> The brief mentioned GT Sectra as an alternative; GT Sectra is a paid Grilli Type face. Replace these files and update the `@font-face` rules in `colors_and_type.css` if you license it.

### Inter — humanist sans body
- `Inter_18pt-Regular.ttf` (400) — registered as `Inter`
- `Inter_18pt-Italic.ttf` (400 italic)
- `Inter_18pt-Medium.ttf` (500)
- `Inter_18pt-MediumItalic.ttf` (500 italic)
- `Inter_24pt-Regular.ttf` (400) — registered as `Inter Display` for very large text
- `Inter_24pt-Medium.ttf` (500) — registered as `Inter Display`

Inter ships as a variable family but here we use the optical-size static cuts: `Inter` (18pt) for body & UI; `Inter Display` (24pt) is available if you ever need Inter at a hero size — it's tuned for it.

### JetBrains Mono — caption / metadata voice
- `JetBrainsMono-Regular.ttf` (400)
- `JetBrainsMono-Medium.ttf` (500)

## Loading
All faces are declared in `colors_and_type.css` via `@font-face`. The CSS file references these TTFs by relative path (`fonts/…`), so any HTML that imports `colors_and_type.css` from a sibling directory will resolve them correctly.

## Weight discipline
The brand cap is 500. Do not request 600 / 700 / Bold — the files for those weights are intentionally not loaded.
