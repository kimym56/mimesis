# Staggered Text Toggle Modes Design

## Goal

Add a mode toggle to the staggered-text project so the same stage can switch between two separate implementations:

- a hover-triggered preview that uses the current default text and activates on stage hover
- a button-triggered preview that keeps the current press-and-drag interaction and adds a text input for live copy changes

## Current Context

- `src/projects/staggered-text/StaggeredTextProject.tsx` currently contains a single implementation with button-driven activation, shared timing state, and WAAPI/CSS fallback logic.
- `src/projects/staggered-text/StaggeredTextProject.module.css` styles the current stage, button shell, and layered glyph animation.
- `src/projects/staggered-text/useStaggeredTextGui.ts` already provides development-only live timing controls, and the same tuning state should continue to drive the active implementation.

## Approved Behavior

- The project should show a compact toggle with two options: `Hover` and `Button`.
- Only one implementation should render in the stage at a time.
- The two implementations should not share renderer or motion helpers; the new mode should be created by copying the current implementation and adapting it separately.
- Hover mode:
  - uses the default text only
  - has no input field
  - activates the motion when the user hovers the stage
  - reverses when the pointer leaves
- Button mode:
  - keeps the current button interaction model
  - remains active while the pointer is pressed and dragged
  - adds an input field that updates the rendered text live
  - falls back to a default display string when the input is empty
- Reduced-motion behavior should remain readable and stable in both modes.

## Approach

- Keep `StaggeredTextProject.tsx` as the top-level mode container with:
  - toggle state for `hover` vs `button`
  - the existing timing tuning state
  - the live text value for button mode
- Split the current implementation into two separate project-local components:
  - one copied hover implementation
  - one copied button implementation
- Let each implementation own its own:
  - character slot generation
  - element refs
  - WAAPI setup and cleanup
  - activation state wiring
  - layered glyph markup
- Update the CSS module to support:
  - the new mode toggle shell
  - the button-mode text input
  - any wrapper differences between hover and button variants

## Data Flow

- `StaggeredTextProject.tsx` stores:
  - selected mode
  - tuning values
  - editable text for button mode
- The selected implementation receives the current tuning values.
- Hover mode derives character slots from the fixed default text inside its own file.
- Button mode derives character slots from the live input value, with a fallback string when empty.
- Mode switching remounts the selected implementation so each copied animation setup can initialize and clean up independently.

## Error Handling

- Spaces and repeated characters must keep stable slot sizing and index-based IDs in both implementations.
- Unmounting a mode must cancel any WAAPI animations created by that mode.
- Pointer cancel, pointer up, blur, and related interaction exits must clear the active state in button mode so the animation cannot get stuck.
- Hover mode should rely on stage hover entry/exit and not leave the motion active after the pointer exits.
- Empty button-mode input should not collapse the stage; it should render the fallback text instead.

## Testing

- Add a component test for the mode toggle so only one implementation is visible at a time.
- Add hover-mode coverage verifying stage hover toggles the active state.
- Add button-mode coverage verifying pointer down/up toggles the active state and drag-style interaction stays active while pressed.
- Add button-mode coverage verifying the input updates the displayed text and empty input falls back to the default string.
- Preserve WAAPI coverage so the active implementation still creates the expected reversible animations when `Element.animate` is available.
