# Staggered Text Top Face Correction Design

## Goal

Correct the current staggered-text arm-pivot refinement so the outgoing glyph exits onto the cube's top face instead of appearing to travel toward the bottom side.

## Current Context

- `src/projects/staggered-text/StaggeredTextProject.tsx` already uses the approved arm-based per-character structure.
- `src/projects/staggered-text/StaggeredTextProject.module.css` currently animates the outgoing path with a low hinge and a softer incoming handoff.
- User feedback after reviewing the new motion is that the outgoing glyph still travels to the wrong side of the cube.

## Root Cause

- The outgoing path currently combines:
  - `.trigger[data-active="true"] .outgoingArm { transform: rotateX(82deg) ... }`
  - `.trigger[data-active="true"] .outgoingGlyph { ... rotateX(-18deg) }`
- That sign combination makes the visible glyph leave through the lower plane, even though the hinge location itself is correct.
- The issue is directional, not structural: the arm model should stay, but the outgoing rotation and its companion glyph transform must be reoriented to the top plane.

## Approved Behavior

- Keep the softer `B` arm-pivot model and the existing incoming glyph behavior.
- Reorient only the outgoing side so the visible glyph hinges upward onto the top face.
- The outgoing glyph must still fully disappear at that top-face destination.
- The dark stage, `Start Deploying` copy, interaction model, and reduced-motion fallback remain unchanged.

## Approach

- Keep the current component markup unchanged.
- Adjust the active-state transforms for `.outgoingArm`, `.outgoingGlyph`, and the supporting shadow response so the outgoing motion reads as an upper-face exit.
- Preserve stagger timing and the existing incoming glyph arrival path.

## Error Handling

- The outgoing path must not reintroduce clipping inside the project pane.
- The sign flip must not make the outgoing glyph linger or visibly overshoot above the stage.
- Reduced-motion mode should remain unchanged.

## Testing

- Update the CSS regression test to assert the corrected active outgoing-arm transform direction.
- Re-run staggered-text tests, reference-pane tests, lint, and production build after the correction.
