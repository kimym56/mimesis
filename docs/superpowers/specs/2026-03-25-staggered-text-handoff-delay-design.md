# Staggered Text Handoff Delay Design

## Goal

Add a visible per-character gap between the outgoing front face starting to roll away and the incoming bottom face starting to rise into view.

## Root Cause

- The current cube-roll geometry and upward path are already correct.
- The outgoing and incoming layers for each character still start too close together in time.
- Because the incoming face begins immediately on its normal stagger, the handoff reads as nearly simultaneous instead of having the slight pause visible in the reference.

## Approved Behavior

- Keep the current cube-roll geometry, upward outgoing path, typography, and proportional spacing.
- Add a fixed per-character handoff delay so the incoming bottom face starts about `160ms` after the outgoing front face starts.
- Keep the outgoing timing profile unchanged.
- Accept that the overall cascade finishes later, because the visible gap is intentional.

## Approach

- Leave the component markup unchanged.
- Add a new CSS variable such as `--handoff-delay: 160ms` on `.slot`.
- Keep `.outgoingArm`, `.outgoingGlyph`, and `.shadow` on their current delay tracks.
- Change only `.incomingGlyph` so its transition delay becomes:
  - `calc(var(--char-index) * var(--incoming-stagger-step) + var(--handoff-delay))`

## Error Handling

- The fix must not disturb the current top-face exit direction.
- The handoff delay must not affect reduced-motion mode behavior.
- The delay should be fixed per character, not multiplied by character index beyond the existing stagger math.

## Testing

- Update the CSS regression to assert `--handoff-delay: 160ms;` on `.slot`.
- Assert that `.incomingGlyph` uses the combined stagger-plus-handoff delay formula.
- Re-run the staggered-text tests, reference-pane tests, lint, and production build after the change.
