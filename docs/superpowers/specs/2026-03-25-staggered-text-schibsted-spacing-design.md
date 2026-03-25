# Staggered Text Schibsted Spacing Design

## Goal

Make the staggered-text wordmark visually closer to the reference by correcting both the typeface and the spacing rhythm.

## Current Context

- `src/projects/staggered-text/StaggeredTextProject.tsx` renders one animated slot per non-space character.
- `src/projects/staggered-text/StaggeredTextProject.module.css` currently uses the shared heading font and a fixed slot minimum width, which makes the wordmark feel too evenly spaced.
- The user provided a reference image where the text reads as a heavier grotesk with tighter, more natural character spacing.
- The motion behavior already matches the approved 3D cube-roll direction and timing closely enough, so this refinement should focus only on typography and layout.

## Approved Behavior

- Use `Schibsted Grotesk` from Google Fonts for the staggered-text demo only.
- Keep the rest of the portfolio typography unchanged.
- Preserve the existing dark stage, copy, interaction model, and 3D motion structure.
- Remove the artificial uniform spacing between letters so the wordmark reads with more natural proportional widths.
- Keep the explicit word break between `Start` and `Deploying`.

## Approach

- Add `Schibsted_Grotesk` in `src/app/layout.tsx` and expose it as a CSS custom property on the document body.
- Apply the new font only to the staggered-text wordmark in `src/projects/staggered-text/StaggeredTextProject.module.css`.
- Replace the current fixed-width slot sizing model with a proportional one:
  - each animated slot keeps the existing outgoing/incoming/shadow layers
  - each slot also contains a hidden sizing glyph that determines the slot's natural width
- Remove any extra per-letter gap from the wordmark container and retune the wordmark's weight, letter spacing, and optional manual space width to better match the reference image.

## Error Handling

- The new slot sizing must not break the current animation layering or cause the glyph faces to overlap.
- The wordmark still needs enough vertical room so motion is not clipped.
- The new font must not leak into other projects or global typography.
- Reduced-motion behavior must stay unchanged.

## Testing

- Add a regression that proves the layout imports and exposes `Schibsted_Grotesk`.
- Update staggered-text tests so they assert the hidden sizing glyph exists for each animated character.
- Update CSS regression coverage so the wordmark uses the `Schibsted Grotesk` variable and the slot no longer relies on the old fixed-width spacing model.
- Re-run the staggered-text tests, lint, and production build after the change.
