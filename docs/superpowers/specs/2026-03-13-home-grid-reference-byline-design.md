# Home Grid Reference Byline Design

**Goal:** Show original author attribution on home page project cards without changing the existing media or description layout.

## Scope

- Add a muted `@name` attribution directly beside the project title in the home grid.
- Render the byline only when `project.referenceUser` exists.
- Keep the project title typography unchanged and render the author with separate, smaller metadata styling.
- Keep the current image or video preview behavior unchanged.

## Component Design

- `src/components/ProjectGrid.tsx`
  - Replace the stacked title/byline block with a small row containing the title and optional `@name`.
  - Render the author name as plain text because the full card is already a single link.
- `src/components/ProjectGrid.module.css`
  - Add a title row layout that preserves separate title and author typography and wraps cleanly on narrow cards.

## Testing

- Add a `ProjectGrid` rendering test that verifies:
  - a project with `referenceUser` shows `@<name>` beside the title
  - a project without `referenceUser` omits the author text

## Error Handling

- No fallback string for missing authors.
- No layout changes for cards that do not include attribution metadata.
