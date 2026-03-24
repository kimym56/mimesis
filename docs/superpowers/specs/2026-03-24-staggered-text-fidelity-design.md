# Staggered Text Fidelity Design

## Goal

Bring the `staggered-text` imitation closer to Rauno Freiberg's original source by using the original `Start deploying` copy and redesigning the internal motion box so the staggered flip does not get clipped inside the stage.

## Current Context

- `src/projects/staggered-text/StaggeredTextProject.tsx` currently hardcodes `Get started`, which matches the Framer recreation rather than Rauno's original source.
- `src/projects/staggered-text/StaggeredTextProject.module.css` animates letters upward inside a stage with `overflow: hidden`, causing the active-state motion to get cut off.
- The user wants fidelity to the original source rather than the secondary Framer recreation.

## Approved Behavior

- The imitation text should use `Start deploying`.
- The staggered motion should remain contained in the existing card-like stage without clipping the active animation.
- The fix should preserve the strong stage presence instead of shrinking the demo down to avoid overflow.
- Pointer, touch, keyboard, and reduced-motion behavior should remain intact.

## Approach

- Update the display string and derived character-slot data to use `Start deploying`.
- Redesign the text geometry so the stage includes an internal motion box with reserved headroom and footroom.
- Reduce the transform amplitude slightly and position the front/back glyph layers around a stable baseline so the animation stays within the visible stage.
- Keep the stage container and overall layout intact; fix the problem within the staggered-text component rather than changing the project-detail shell.

## Error Handling

- The longer source text must still fit on smaller widths without collapsing or clipping.
- Space characters must continue to preserve stable spacing across the longer phrase.
- Reduced-motion mode should still reveal the correct source text without hidden or overlapping layers.

## Testing

- Update the staggered-text component test to assert the rendered text is `Start deploying` and that the non-space character count matches the new source string.
- Add a small CSS regression test that asserts the staggered-text wordmark includes an explicit motion box or equivalent vertical space reservation for the animation.
- Run staggered-text tests plus lint/build verification after the geometry change.
