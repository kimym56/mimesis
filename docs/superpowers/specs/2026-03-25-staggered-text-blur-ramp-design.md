# Staggered Text Blur Ramp Design

## Goal

Strengthen the staggered-text handoff so every outgoing character visibly fades out through blur and every incoming character fades in from a blurrier starting state that clears more slowly.

## Current Context

- `src/projects/staggered-text/StaggeredTextProject.module.css` already has per-character stagger and separate outgoing/incoming glyph layers.
- The outgoing glyph currently blurs only to `4px` as it fades out.
- The incoming glyph currently starts at `blur(4px)` and clears to `0` on the same overall cadence as the rest of the motion, so the blur read is too subtle.
- The user wants the blur handoff to be more obvious on every character, especially the incoming `blur(...) -> 0` clear.

## Approved Behavior

- Keep the current top-edge hinge and incoming/outgoing structure.
- Increase the blur strength for both outgoing and incoming glyphs.
- Make the incoming glyph's blur clear more slowly than it does now.
- Preserve the existing stage, copy, stagger timing, and interaction model.

## Approach

- Leave the React component unchanged.
- Update the outgoing glyph so it explicitly starts crisp and fades out to a stronger blur value.
- Update the incoming glyph so it starts blurrier than before and uses a longer filter transition to clear to `0`.
- Keep the stagger delay per character, but separate glyph transition timings enough that the blur is legible instead of just implied.

## Error Handling

- Stronger blur must not make the text unreadable at rest.
- The longer incoming filter clear must not leave letters visibly fuzzy after the motion settles.
- Reduced-motion mode should keep the current simpler behavior.

## Testing

- Extend the CSS regression test to assert the stronger blur values and the slower incoming filter transition.
- Re-run the staggered-text tests, reference-pane tests, lint, and production build after the refinement.
