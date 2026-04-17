# Wiper Typography Pretext Particle Field Design

## Goal

Rebuild the `Pretext SVG` mode so it matches the sparse, individually falling glyph field of the `2D Canvas` mode while still using `@chenglou/pretext/rich-inline` to reroute characters around the moving wiper.

## Context

- `src/projects/wiper-typography/WiperTypographyCanvas2D.tsx` delegates to `wiperSimulation.ts` and `wiperSceneRenderer.ts`, which render a sparse particle field:
  - each glyph has its own `x`, `y`, `vx`, `vy`, and rotation
  - glyphs are white and fully opaque
  - spacing comes from particle distribution, not wrapped rows
- The current `Pretext SVG` implementation still carries remnants of a band-based row layout, so even separate characters can visually bunch into line-like clusters.
- The user wants the `Pretext SVG` mode to feel like the 2D canvas field:
  - no opacity differences
  - regular visual gaps
  - each character dropping independently
  - similar overall field shape
- `pretext` must still be the layout engine for rerouting around the blade.

## Approved Behavior

- The stage remains simple:
  - blue background
  - centered wiper arm and pivot
  - white fully opaque characters
- Characters are sparse, not paragraph-dense.
- Each visible glyph falls independently, like the 2D canvas version.
- Characters keep regular spacing across the field instead of collapsing into overlapping rows.
- The wiper still removes characters from its path through `pretext` layout, not masking.
- No trailing horizontal bar is drawn at the tip.
- The stage should not be cluttered by explanatory copy if it competes with the sparse field.

## Rendering Model

- Replace dense horizontal rain bands with a sparse slot field.
- Each slot owns:
  - one stable x anchor
  - one current y position
  - one current character from the repeated `WIPER TYPOGRAPHY` stream
  - one fall speed
- The slot field should approximate the 2D canvas silhouette:
  - even-ish horizontal spread
  - top-to-bottom spawn pattern
  - no opacity layering tricks
- `pretext` still prepares a character-by-character `RichInlineItem` stream and decides which characters survive in the currently allowed slots near the blade.
- SVG only paints the routed output.

## File Boundaries

- `src/projects/wiper-typography/WiperTypographyPretextSvg.tsx`
  - stage measurement
  - animation clock
  - sparse slot field creation
  - render-time mapping from routed fragments to per-character SVG nodes
- `src/projects/wiper-typography/wiperPretextRichInlineRain.ts`
  - cached repeated character stream
  - slot cursor seeding and advancement
  - routing helpers against allowed intervals
- `src/projects/wiper-typography/wiperPretextFragmentMotion.ts`
  - deterministic per-character fall offsets and speed variation for the SVG field
- `src/projects/wiper-typography/wiperPretextWiperGeometry.ts`
  - centered sweep geometry
  - blade polygon
  - interval carving
- `src/projects/wiper-typography/WiperTypographyProject.module.css`
  - stage paint styles only, with fully opaque text

## Motion Rules

- Every character has its own fall position.
- Characters do not share opacity ramps.
- Spacing should feel regular and sparse, similar to the 2D canvas particle field.
- Reduced motion keeps the same sparse field but lowers fall speed and sweep speed.

## Testing

- Add helper tests for:
  - deterministic per-character fall offsets
  - neighboring characters not sharing the same rendered `y`
  - regular sparse spacing assumptions in the renderer
- Keep existing tests for:
  - centered pivot
  - no visible tip bar
  - `pretext` routing helpers
  - shell mode toggle behavior

## Risks

- Too much `pretext` routing per frame can pull the field back toward row-shaped behavior.
- Too little routing around the blade can make the `pretext` contribution unreadable.

## Mitigations

- Keep the slot count moderate and the source repeat count short.
- Favor sparse, fixed x anchors and use `pretext` only where rerouting matters, rather than treating the whole stage like a paragraph.
