# Staggered Text Mirrored Handoff 60ms Design

## Goal

Keep the mirrored release handoff, but shorten the per-character gap from `80ms` to `60ms`.

## Approved Behavior

- Activation remains mirrored with release.
- The currently visible face moves first.
- The returning face waits `60ms` before following.
- Geometry, typography, blur, and proportional spacing stay unchanged.

## Approach

- Keep the direction-specific delay ownership already chosen:
  - inactive/base rules define release timing
  - active rules define forward timing
- Set `--handoff-delay: 60ms`
- Update the CSS regression to assert the `60ms` value instead of `80ms`

## Testing

- Re-run the staggered-text tests, lint, and production build after the timing update.
