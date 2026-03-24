# Staggered Text Overlay Dark Stage Design

## Goal

Align the `staggered-text` imitation more closely with Rauno Freiberg's original by using a near-black stage and a persistent base text layer that remains visible while a staggered overlay animates across it.

## Current Context

- `src/projects/staggered-text/StaggeredTextProject.tsx` currently renders a single split-character layer that becomes transparent during the active animation.
- `src/projects/staggered-text/StaggeredTextProject.module.css` still uses a bright card treatment and a full flip-swap motion model.
- The user explicitly called out two fidelity gaps: the original uses a dark stage, and the original text remains visible after hover instead of disappearing during the flip.

## Approved Behavior

- The staggered-text stage should use a near-black visual treatment closer to the original source.
- The base `Start deploying` text should remain visible at rest and during hover.
- Hover/press should animate a second staggered overlay layer across the base text rather than replacing the base text.
- Existing pointer, touch, keyboard, and reduced-motion interaction behavior should remain intact.

## Approach

- Keep the change local to the `staggered-text` project component and CSS module.
- Update the component markup so each character slot supports both a persistent base glyph and an animated overlay glyph.
- Rework the CSS so the stage is dark, the base text is always readable, and the overlay glyphs animate in staggered timing above the base layer.
- Keep the existing motion box concept so the overlay remains contained inside the stage without clipping.

## Error Handling

- The overlay must not duplicate or obscure the base text so heavily that the base line disappears during hover.
- The longer source phrase must still fit in the stage across desktop and mobile widths.
- Reduced-motion mode should still keep the persistent base text visible while using a lighter overlay reveal.

## Testing

- Update the staggered-text component test to assert the presence of both base and overlay wordmark layers in addition to the correct source text and interaction state.
- Add a CSS regression assertion that the staggered-text trigger uses a dark stage treatment.
- Keep the existing motion-box regression assertion so the overlay remains contained.
