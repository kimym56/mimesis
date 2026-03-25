# Staggered Text Top Edge Hinge Design

## Goal

Correct the staggered-text exit motion so the outgoing glyph clearly travels onto the cube's upper face instead of reading as if it drops below the baseline.

## Current Context

- `src/projects/staggered-text/StaggeredTextProject.tsx` already uses the approved outgoing-arm plus incoming-glyph structure.
- `src/projects/staggered-text/StaggeredTextProject.module.css` currently keeps the outgoing arm anchored near the lower portion of the slot.
- A throwaway comparison probe showed that simply flipping the outgoing rotation sign is not enough. With the hinge still low, the outgoing glyph continues to read below the baseline.

## Root Cause

- The current outgoing arm uses a low hinge (`transform-origin: 50% 88%`).
- That hinge location makes the outgoing glyph swing through the lower half of the slot even when the active transform signs are changed.
- A top-edge hinge probe produced the correct visual result: the outgoing glyph moved to the upper plane where the user expects the cube's top face to be.

## Approved Behavior

- Keep the current arm-based structure and the softer incoming motion.
- Move the outgoing hinge to the top edge of the character slot.
- Retune the outgoing arm and outgoing glyph active transforms so the visible glyph disappears on the upper plane.
- Preserve the dark stage, `Start Deploying` copy, stagger timing, press/hover behavior, and reduced-motion fallback.

## Approach

- Leave the component markup unchanged.
- Update `.outgoingArm` to use a top-edge-biased `transform-origin`.
- Adjust the active transforms for `.outgoingArm`, `.outgoingGlyph`, and the supporting blur/shadow response so the motion reads as an upper-face exit.
- Keep the incoming glyph path unchanged unless it needs a minor offset adjustment for alignment.

## Error Handling

- The new top hinge must not clip at the top of the motion box.
- The outgoing glyph must still fully disappear and not linger above the wordmark.
- The change should not widen the stage or break the current split-pane fit.

## Testing

- Update the CSS regression test to assert the top-edge hinge value and the corrected active outgoing transforms.
- Re-run the staggered-text tests, reference-pane tests, lint, and production build after the correction.
