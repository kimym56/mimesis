# Staggered Text Top-Right Instruction Design

## Goal

Add a lightweight instruction label at the top-right of the staggered text preview so both interaction modes communicate how to trigger the animation without adding visual noise.

## Approved Direction

Use a shared label anchored inside the preview frame. The text changes with the active mode:

- Hover mode: `Hover to preview`
- Button mode: `Press to preview`

## UI Behavior

- The label remains in the same top-right position for both modes.
- It is presentational only and does not affect interaction.
- It should feel like muted helper copy rather than a badge or status chip.

## Implementation Notes

- Render the instruction from `StaggeredTextProject.tsx` so the mode switch controls both the preview and the helper copy.
- Style it in `StaggeredTextProject.module.css` using absolute positioning inside the preview frame.
- Preserve current preview layout and animation behavior.

## Testing

- Extend the existing staggered text project test to assert the default hover label and the button label after switching modes.
