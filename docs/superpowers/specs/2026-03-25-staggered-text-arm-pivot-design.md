# Staggered Text Arm Pivot Design

## Goal

Refine the current staggered-text 3D roll so the outgoing letter no longer appears to rotate around its center. Instead, it should hinge upward toward the cube's top-face position, disappear there, and hand off to the incoming letter in a way that more closely matches Rauno Freiberg's original motion.

## Current Context

- `src/projects/staggered-text/StaggeredTextProject.tsx` already renders each non-space character as a per-letter animated unit with staggered timing.
- `src/projects/staggered-text/StaggeredTextProject.module.css` currently treats that unit as a tighter rigid cube roll.
- The user reviewed comparison probes based on the Framer transcript and selected the softer arm-driven model as the closer direction.
- The remaining gap is specifically the outgoing glyph path: it should travel to the cube's upper face position rather than rotating around the center of the slot.

## Approved Behavior

- Keep the preferred softer `B` motion family from the comparison probes.
- The outgoing visible glyph should be carried upward by a separate arm wrapper with a low hinge point.
- The outgoing glyph should fully disappear by the time it reaches the top-face destination.
- The incoming glyph should remain a separate layer that rises from below with a mild 3D tilt and settles into the front-facing position.
- The dark stage, `Start Deploying` copy, split-pane layout, press-and-hold interaction, and reduced-motion fallback should remain intact.

## Approach

- Replace the rigid two-face cube markup with a layered structure per animated character:
  - an `outgoingArm` wrapper,
  - an `outgoingGlyph` rendered inside that arm,
  - an `incomingGlyph` rendered independently,
  - the existing optional shadow/depth support.
- Animate the `outgoingArm` with a bottom-biased `transform-origin` so its rotation path moves the outgoing glyph onto the implied top plane.
- Keep the incoming glyph independent so it can rise from below with opacity, blur, and `rotateX` adjustments that are not mechanically locked to the outgoing arm.
- Preserve the current stagger setup through `--char-index`, but move the semantics away from a rigid cube and toward an arm-plus-arrival handoff.

## Error Handling

- The outgoing arm must not reintroduce clipping inside the left project pane.
- The new hinge position must still align letters cleanly across mixed glyph widths in `Start Deploying`.
- The outgoing layer must disappear completely at the top-face destination so there is no lingering ghost on hover or press.
- Reduced-motion mode should continue to avoid doubled text and remain readable.

## Testing

- Update the component test to assert the new per-character arm/glyph structure instead of the previous cube face structure.
- Update the CSS regression test to lock the presence of the outgoing arm selector and its bottom-biased transform-origin.
- Re-run the staggered-text tests, reference-pane tests, lint, and production build after the refinement.
