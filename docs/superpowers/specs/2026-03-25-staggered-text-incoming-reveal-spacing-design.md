# Staggered Text Incoming Reveal Spacing Design

## Goal

Make the fade-in cadence between letters more distinct so characters do not appear almost simultaneously, while keeping the full one-way cascade from the first `S` starting to the final `g` finishing at about `1.1s`.

## Current Context

- `src/projects/staggered-text/StaggeredTextProject.tsx` renders `Start Deploying` as 14 animated letters.
- The current motion already matches the approved cube-roll geometry, top-face exit, blur handoff, and dark stage.
- The current timing profile uses a single `24ms` stagger delay for both the outgoing roll and the incoming reveal.
- Because the incoming layer starts on that same tight cadence, the fade-ins bunch together visually even though the whole cascade length is correct.

## Approved Behavior

- Keep the existing 3D cube-roll geometry and top-face exit unchanged.
- Keep the stronger per-character blur fade-out and blur fade-in unchanged in character.
- Make the incoming reveal cadence slightly wider so each character's fade-in reads as more separate from the next.
- Preserve the overall end-to-end timing target:
  - first `S` starts
  - final `g` finishes
  - total duration remains about `1100ms`

## Timing Model

- There are 14 animated letters, which means 13 stagger gaps.
- The outgoing roll track should remain on the current timing:
  - `outgoingStaggerStep = 24ms`
  - `outgoingSettleDuration = 788ms`
  - `13 × 24 + 788 = 1100`
- The incoming reveal track should widen slightly:
  - `incomingStaggerStep = 30ms`
  - `incomingSettleDuration = 710ms`
  - `13 × 30 + 710 = 1100`

## Approach

- Leave the component structure unchanged.
- Split the current single stagger value into separate outgoing and incoming timing tracks in `src/projects/staggered-text/StaggeredTextProject.module.css`.
- Keep `.outgoingArm`, `.outgoingGlyph`, and the shadow on the outgoing cadence.
- Move `.incomingGlyph` to the slightly wider incoming cadence and shorter settle window.
- Do not change reduced-motion behavior.

## Error Handling

- The wider incoming spacing must not break the sense that the text is one continuous word.
- The last character still needs to finish within the same `1.1s` envelope.
- The change should not reintroduce clipping, direction regressions, or bottom-face motion.

## Testing

- Update the CSS regression test to assert separate outgoing and incoming stagger values.
- Assert the incoming timing uses the shorter `710ms` settle duration while outgoing timing remains at `788ms`.
- Re-run the staggered-text tests, reference-pane tests, lint, and production build after the change.
