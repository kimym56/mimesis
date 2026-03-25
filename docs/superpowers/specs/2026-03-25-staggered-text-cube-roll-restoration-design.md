# Staggered Text Cube Roll Restoration Design

## Goal

Restore the visible cube-roll motion so the front face clearly rotates upward onto the cube's top face again.

## Root Cause

- The current cube geometry is still correct: the outgoing arm hinges from the top edge and exits toward the top plane.
- The regression came from the timing retune in `5c4b95e`, which compressed the outgoing and incoming motion windows down to `215ms`.
- That shortened settle window made the rotation too fast to read as a front-face-to-top-face roll, even though the transform directions themselves did not change.
- The last known good motion profile was the pre-retune version from `a7cf3e2`, where the outgoing layers used `788ms` and the incoming layer used `710ms`.

## Approved Behavior

- Restore the earlier cube-roll feel as the top priority.
- Preserve the current `Schibsted Grotesk` wordmark and proportional character spacing.
- Preserve the current dark stage, top-face exit geometry, blur handoff, and interaction model.
- De-prioritize the exact `1125ms` total cascade target if needed to preserve motion fidelity.

## Approach

- Revert the staggered-text CSS timing profile to the earlier motion configuration that already produced the correct cube-roll illusion:
  - `.slot` uses split timing tracks again
  - outgoing track uses `24ms` stagger
  - incoming track uses `30ms` stagger
  - outgoing arm/glyph/shadow use `788ms`
  - incoming glyph uses `710ms`
- Leave the typography changes from `a7cf3e2` in place:
  - `Schibsted Grotesk`
  - proportional slot sizing
  - tightened natural spacing

## Error Handling

- The fix must not revert the typography improvement.
- The top-face exit direction must stay intact.
- Reduced-motion behavior must remain unchanged.
- No markup changes should be needed, because the regression is timing-only.

## Testing

- Restore the CSS regression expectations to the earlier split outgoing/incoming timing profile.
- Keep the current typography regression coverage.
- Re-run the staggered-text tests, reference-pane tests, lint, and production build after the restoration.
