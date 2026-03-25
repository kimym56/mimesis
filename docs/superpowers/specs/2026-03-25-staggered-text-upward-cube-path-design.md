# Staggered Text Upward Cube Path Design

## Goal

Make the outgoing face visibly climb upward in screen space while rotating so the motion reads like the front face of a cube rolling onto the top face.

## Root Cause

- The current staggered-text motion already uses the correct top-edge hinge and top-face rotation direction.
- The remaining mismatch is in the active transform path: the outgoing face mostly rotates in place instead of also lifting upward enough on screen.
- That makes the effect read like a front-face swap rather than a cube face rolling up.

## Approved Behavior

- Keep the current cube timing profile, dark stage, typography, and proportional spacing.
- Keep the outgoing face exiting toward the top face, not the bottom face.
- Add a clearer upward travel component so the front face visibly rises while rotating.
- Keep the incoming face and blur handoff behavior intact unless a tiny matching adjustment is needed for cohesion.

## Approach

- Leave the component markup unchanged.
- Adjust only the active outgoing transform path in `src/projects/staggered-text/StaggeredTextProject.module.css`.
- Change the transform order and translation values so the outgoing arm and outgoing glyph gain visible upward movement in screen space while preserving the same top-face rotation direction.
- Keep the top-edge hinge at `50% 12%`.

## Error Handling

- The outgoing path must not fall back toward the bottom side again.
- The face must not clip out of the motion box.
- Reduced-motion behavior must stay unchanged.
- The change should not disturb the current typography work.

## Testing

- Update the CSS regression to assert the new active outgoing transform path.
- Re-run the staggered-text tests, reference-pane tests, lint, and production build after the adjustment.
