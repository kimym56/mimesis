# Staggered Text 1100ms Cascade Design

## Goal

Tune the staggered-text timing so the full cascade from the first `S` to the final `g` completing its motion lands in exactly `1.1s`.

## Current Context

- `src/projects/staggered-text/StaggeredTextProject.tsx` renders `Start Deploying` as 14 animated letters.
- That means there are 13 stagger gaps between the first animated character and the last.
- The current CSS timing is slower than earlier iterations, but the user now wants a concrete end-to-end timing target rather than a general feel adjustment.
- There is already a local timing edit in `src/projects/staggered-text/StaggeredTextProject.module.css` changing `--stagger-step`; the exact target implementation should build on that file rather than reverting it.

## Approved Behavior

- The entire one-way cascade from the first `S` beginning to the final `g` finishing should take `1100ms`.
- Keep the current geometry, top-face exit direction, and stronger per-character blur handoff.
- Preserve the same dark stage, copy, and interaction model.

## Timing Model

- 14 animated letters produce 13 stagger gaps.
- The total target is:
  - `settleDuration + (13 × staggerStep) = 1100ms`
- Approved exact profile:
  - `staggerStep = 24ms`
  - `settleDuration = 788ms`
- Check:
  - `13 × 24 = 312`
  - `312 + 788 = 1100`

## Approach

- Leave the component markup unchanged.
- Update the CSS timing values so the arm movement, glyph movement, opacity, filter, and shadow all resolve within the `788ms` settle window.
- Keep the blur visible, but do not let any transform, opacity, or filter timing exceed the `788ms` window if the final `g` truly needs to be finished at `1.1s`.

## Error Handling

- The exact timing target must not break the staggered feel by collapsing all letters too close together.
- Blur should remain visible despite the tighter timing envelope.
- Reduced-motion mode should remain unchanged.

## Testing

- Update the CSS regression test to assert the `24ms` stagger step and the `788ms` timing profile.
- Re-run the staggered-text tests, reference-pane tests, lint, and production build after the refinement.
