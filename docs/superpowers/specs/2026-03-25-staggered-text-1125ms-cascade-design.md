# Staggered Text 1125ms Cascade Design

## Goal

Retune the staggered-text motion so each character starts noticeably later than the previous one while the full cascade from the first `S` starting to the final `g` finishing lands at `1125ms`.

## Current Context

- `src/projects/staggered-text/StaggeredTextProject.tsx` renders `Start Deploying` as 14 animated letters, which means there are 13 stagger gaps from the first letter to the last.
- The current implementation uses separate outgoing and incoming stagger tracks at `24ms` and `30ms`, with much longer per-letter settle durations.
- The user wants the per-letter start offset widened substantially to match a measured reference timing, not just a subjective feel adjustment.

## Approved Behavior

- Each character's effect start should be separated by about `70ms`.
- The total time from the first `S` starting to the last `g` finishing should be `1125ms`.
- Keep the existing cube-roll geometry, top-face exit, blur handoff, font choice, and proportional spacing unchanged.
- Keep the touch/press interaction model and reduced-motion behavior unchanged.

## Timing Model

- Animated letters: `14`
- Stagger gaps: `13`
- Approved shared stagger step: `70ms`
- Approved settle window: `215ms`

Math:

- `13 × 70 = 910`
- `910 + 215 = 1125`

This lands inside the requested timing window:

- target total range: `1116.667ms` to `1133.333ms`
- approved total: `1125ms`

## Approach

- Replace the split outgoing/incoming stagger model with one shared `--stagger-step`.
- Apply the same `70ms` delay cadence to the outgoing arm, outgoing glyph, incoming glyph, and shadow.
- Compress the visible motion so the longest per-letter transition resolves in `215ms`.
- Keep outgoing opacity slightly shorter than the full settle so the handoff remains readable without extending the total envelope.

## Error Handling

- The motion must still read as a 3D roll, not a flat swap.
- The faster per-letter settle must not remove the blur handoff entirely.
- The new timing must not break reduced-motion mode or the current typography refinements.

## Testing

- Update the CSS regression to assert the shared `70ms` stagger step.
- Assert the outgoing and incoming timing values fit the `215ms` settle window.
- Re-run the staggered-text tests, reference-pane tests, lint, and production build after the retune.
