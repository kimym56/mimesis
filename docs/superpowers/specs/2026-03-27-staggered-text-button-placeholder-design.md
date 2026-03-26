# Staggered Text Button Placeholder Design

## Goal

Align button-mode text behavior so the input starts empty, shows `Type Anything` as a placeholder, and the preview falls back to `Type Anything` whenever the input is empty.

## Current State

- `src/projects/staggered-text/StaggeredTextProject.tsx` previously initialized button-mode text state to a visible string instead of leaving the input empty.
- `src/projects/staggered-text/StaggeredTextButtonPreview.tsx` needs to distinguish between placeholder text in the input and fallback text in the animated preview.
- Existing tests cover empty-input fallback behavior, but they did not assert placeholder semantics.

## Chosen Approach

Use `Type Anything` as the shared placeholder/fallback label while keeping actual input state empty by default. The input should expose `placeholder="Type Anything"`, and the animated preview should render `Type Anything` whenever the trimmed input value is empty.

## Tradeoffs

- Pros: matches normal text-input behavior, keeps the preview readable before typing, and avoids seeding fake input content.
- Cons: requires updating both state initialization and the input element contract.

## Validation

- Add a failing test assertion that the input starts empty with a `Type Anything` placeholder.
- Add a failing test assertion that the preview still renders `Type Anything` when the input is empty.
- Update the button-mode state initialization and input placeholder, then rerun the targeted test file.
