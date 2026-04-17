# Wiper Typography Pretext Rich Inline Design

## Goal

Rebuild the `Pretext SVG` mode for `wiper-typography` so the visible rain is made of independently rendered characters and the moving wiper changes the text layout by recomputing `pretext` rich-inline flow, not by masking after layout.

## Context

- `src/projects/wiper-typography/WiperTypographyProject.tsx` already exposes a third `Pretext SVG` mode in the shell.
- The current in-progress `Pretext SVG` renderer is based on row routing with `prepareWithSegments`, which still reads as line motion instead of character rain.
- The `@chenglou/pretext` README and demo models show that `rich-inline` is the intended path when the caller wants inline-sized fragments with stable source-item ownership:
  - `prepareRichInline`
  - `layoutNextRichInlineLineRange`
  - `materializeRichInlineLineRange`
- That API is the right fit here because each visible glyph should stay a distinct source item that can be rerouted around the blade.

## Approved Behavior

- The stage stays simple and flat:
  - blue background
  - white character rain
  - one centered car-wiper arm and blade
- The wiper pivot sits near the center-bottom of the frame.
- There is no trailing horizontal bar behind the blade.
- `WIPER TYPOGRAPHY` is still the source phrase, but each grapheme is emitted as its own rich-inline item so the rain reads as independent characters instead of solid words.
- The blade sweep changes the available text slots per visible band.
- Characters disappear from the blade path because `pretext` reroutes the flow, not because SVG hides them afterward.
- The stage should explicitly tell the viewer what is happening:
  - a small `Pretext Layout` label
  - a short caption like `Characters reflow around the blade in real time`

## Rendering Model

- The renderer treats the stage as many narrow horizontal bands.
- Each band owns:
  - a repeated character stream derived from `WIPER TYPOGRAPHY`
  - a band-specific cursor seed
  - a vertical speed multiplier
  - a current y position
- Each character in the repeated phrase is represented as its own `RichInlineItem`, so `materializeRichInlineLineRange()` returns fragments that still map back to one source character at a time.
- On each animation frame:
  - compute the current blade geometry
  - project the blade into blocked horizontal intervals for each visible band
  - carve the remaining slots
  - ask `pretext` to route the current character stream through those slots
  - paint the resulting fragments as individual SVG `<text>` nodes

## File Boundaries

- `src/projects/wiper-typography/WiperTypographyPretextSvg.tsx`
  - stage measurement
  - animation clock
  - band instancing
  - render-time mapping from routed glyph fragments to SVG
- `src/projects/wiper-typography/wiperPretextRichInlineRain.ts`
  - cached repeated rich-inline character stream
  - band cursor seeding and advancement
  - slot-driven routing with `layoutNextRichInlineLineRange`
  - materialized glyph positioning data for SVG
- `src/projects/wiper-typography/wiperPretextWiperGeometry.ts`
  - centered pivot sweep math
  - blade polygon generation
  - per-band obstacle projection
  - slot carving
- `src/projects/wiper-typography/WiperTypographyProject.module.css`
  - stage paint styles, text styling, and the small explanatory label/caption

## Motion Rules

- The rain comes from many band instances with staggered offsets and slightly different fall speeds.
- The visible units are individual characters, not whole words.
- The wiper is a single mechanical sweep driven by phase-based interpolation.
- Reduced motion keeps the same routing model, but lowers sweep speed and fall speed instead of switching to a different visual trick.

## Testing

- Add helper tests for:
  - centered wiper pivot geometry
  - slot carving around the blade interval
  - repeated rich-inline character preparation
  - routing split slots into per-character fragments
  - cursor advancement and wrap behavior
- Add component tests for:
  - rendering the explanatory `Pretext Layout` cue
  - painting SVG text nodes from routed character fragments
  - keeping the shell mode toggle behavior intact

## Risks

- Character-level materialization is heavier than line-level materialization.
- If the band density is too low, the result will still read as rows instead of rain.
- If the band density is too high, the frame budget may suffer.

## Mitigations

- Keep the visible band count bounded by stage height and a fixed line step.
- Cache the prepared rich-inline source per font/phrase pair.
- Keep geometry math pure and inexpensive so the hot path is dominated by pretext work only where necessary.
