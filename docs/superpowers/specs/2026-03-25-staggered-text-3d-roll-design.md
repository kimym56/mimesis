# Staggered Text 3D Roll Design

## Goal

Replace the current staggered-text overlay implementation with a true per-character 3D roll that matches the structure of Rauno Freiberg's original reference: each letter behaves like a small 3D form whose visible front face rotates upward while the previously hidden bottom face becomes visible.

## Current Context

- `src/projects/staggered-text/StaggeredTextProject.tsx` currently uses a persistent base text layer plus a separate overlay layer.
- `src/projects/staggered-text/StaggeredTextProject.module.css` currently produces a dark stage and staggered overlay pass, but it does not model the letters as two faces of the same rotating unit.
- The user clarified that the target effect is not a ghost sweep or a full text replacement. It is a 2D wordmark transformed through a per-character 3D roll where the incoming face is the letter that was hidden on the bottom face.

## Approved Behavior

- The current base-plus-overlay implementation should be removed.
- The imitation should use `Start Deploying` and render each non-space character as a true 3D two-face unit.
- At rest, only the front face is visible.
- On hover, press, or keyboard focus, each character should rotate upward in staggered timing so the bottom face becomes the visible face.
- The effect should remain contained inside a near-black typography canvas with minimal extra chrome.
- Reduced-motion mode should preserve the source copy and a lighter interaction response without the full 3D roll.

## Approach

- Rebuild the staggered-text component so each character slot renders:
  - a front face,
  - a bottom face,
  - an optional subtle shadow or glow layer only if needed to support depth.
- Use a 3D transform container per character with `transform-style: preserve-3d` and face transforms that position the front and bottom faces as adjacent surfaces of the same rotating form.
- Apply staggered delays through `--char-index` as before, but move the animation responsibility to the per-character 3D container instead of an overlay glyph.
- Keep the stage dark and minimal while reducing decorative gradients so the typography motion remains the focus.

## Error Handling

- The longer `Start Deploying` phrase must still fit within the stage across desktop and mobile widths.
- The 3D transform must remain aligned so the bottom face settles into the same baseline position as the front face.
- Spaces must remain stable and not create visible gaps or height jumps during the stagger.
- Reduced-motion mode should not hide the text or create doubled characters.

## Testing

- Update the staggered-text component test to assert the correct source copy and the presence of front and bottom faces for animated characters.
- Replace the previous overlay-layer expectation with a two-face character expectation.
- Add or update CSS regression assertions so the staggered-text implementation includes explicit 3D cube-style structure such as a `.cube` or equivalent selector with `transform-style: preserve-3d`.
- Run staggered-text tests plus lint/build verification after the reimplementation.
