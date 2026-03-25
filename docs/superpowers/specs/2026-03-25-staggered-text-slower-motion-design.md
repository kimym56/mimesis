# Staggered Text Slower Motion Design

## Goal

Slow down the staggered-text imitation so the full per-character movement reads less rushed while preserving the current top-face exit, stronger blur ramp, and staggered cadence.

## Current Context

- `src/projects/staggered-text/StaggeredTextProject.module.css` currently uses a relatively tight motion profile:
  - transform timing around `760ms`,
  - outgoing opacity around `720ms`,
  - incoming opacity around `780ms`,
  - incoming blur clear around `980ms`,
  - stagger step `28ms`.
- The blur handoff is now stronger, but the user still finds the total motion too fast.
- The user explicitly chose to slow the entire character movement, not only the blur.

## Approved Behavior

- Keep the current geometry, top-edge hinge, and per-character blur handoff.
- Slow the full character motion so the arm rotation, incoming rise, fade, and blur all breathe longer together.
- Slightly widen the stagger step so the overall cascade feels less rushed.
- Preserve the same dark stage, copy, and interaction model.

## Approach

- Leave the component markup unchanged.
- Increase the shared movement timing for outgoing arm rotation and incoming rise to roughly `980ms`.
- Lengthen outgoing/incoming opacity timings into the `920ms` to `1020ms` range.
- Lengthen the filter clear further than movement so the blur resolves slowly after the spatial motion settles.
- Increase the per-character stagger step into the mid-30ms range so the cascade spacing matches the slower motion.

## Error Handling

- The slower motion must not leave the glyphs looking stuck or laggy after hover/press settles.
- The wider stagger must not make the whole word feel too delayed on shorter interactions.
- Reduced-motion mode should remain unchanged.

## Testing

- Extend the CSS regression test to lock the slower transform, opacity, filter, and stagger timings.
- Re-run the staggered-text tests, reference-pane tests, lint, and production build after the timing refinement.
