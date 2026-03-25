# Staggered Text Mirrored Handoff Design

## Goal

Make release use the same cube-roll handoff pattern in reverse, so the currently visible front face drops toward the bottom side first and the returning face follows after a short gap.

## Root Cause

- The current handoff delay is only applied to the incoming face in the active direction.
- CSS reuses those same delay formulas when the button returns to the inactive state.
- That means release is not a mirrored handoff: the visible face does not leave first and the returning face does not wait in the opposite direction.

## Approved Behavior

- Use an `80ms` handoff gap instead of the previous `160ms`.
- On press start:
  - outgoing front face starts immediately
  - incoming bottom face starts `80ms` later
- On press end:
  - current front face starts dropping immediately
  - returning face waits `80ms` before coming back
- Keep the current cube geometry, upward outgoing path, typography, and spacing unchanged.

## Approach

- Leave the component markup unchanged.
- Keep one slot-level variable: `--handoff-delay: 80ms`.
- Use direction-specific CSS transition delays:
  - base/inactive rules define the release timing
  - active rules override delays for the forward timing
- Apply the mirrored timing only to the outgoing and incoming text faces; shadow timing can stay on the simpler current path unless it needs later polish.

## Error Handling

- The fix must not break the current top-face exit direction.
- The incoming face still needs to rise from the bottom on activation.
- Reduced-motion behavior must remain unchanged.

## Testing

- Update the CSS regression to assert `--handoff-delay: 80ms;`.
- Assert that inactive/base delays make the returning face wait on release.
- Assert that active delays still make the incoming face wait on activation.
- Re-run the staggered-text tests, reference-pane tests, lint, and production build after the change.
