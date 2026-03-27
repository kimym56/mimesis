# Staggered Text Button Input UI Design

## Goal

Make the button-mode text input feel clearly editable without reading like a standard form control. The control should stay inside the black preview stage, remain label-free, and feel integrated with the stage rather than sitting on top of it as generic UI chrome.

## Current State

- `src/projects/staggered-text/StaggeredTextButtonPreview.tsx` overlays the text input directly on top of the stage.
- `src/projects/staggered-text/StaggeredTextProject.module.css` currently uses a light filled input surface, which separates from the stage but reads too much like a normal form field.
- The overlay layout and label-free markup are already correct, so this update should stay focused on reducing form-chrome and making the control feel editorial.

## Chosen Approach

Keep the input in the current top-left overlay position and restyle it as an editorial underline field:

- Keep the label removed.
- Remove the filled input box and replace it with a transparent surface.
- Use light text and muted placeholder text directly on the black stage.
- Use a thin bottom rule instead of a full border so the control feels integrated and less like standard app UI.
- Keep a restrained focus state that brightens the text and underline without adding a boxed glow.
- Preserve the existing preview-stage composition and motion behavior.

## Tradeoffs

- Pros: feels more premium and composition-driven, reduces generic form styling, and keeps the input visually subordinate to the main motion demo.
- Cons: affordance is subtler than a filled field, so text contrast and the underline treatment need to be precise.

## Validation

- Update the existing button-mode test to assert that the label remains absent and that the input uses an underline-style treatment instead of the filled background.
- Restyle the overlay field in `StaggeredTextProject.module.css` with transparent background, no full border, and a bottom rule without changing the trigger interaction model.
- Run the targeted staggered-text test file and lint after the UI update.
