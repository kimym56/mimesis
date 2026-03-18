# Wiper Typography Remove 3D Stage Design

## Goal
Remove the live `3D Stage` mode from `wiper typography` so the project presents only the maintained `2D Canvas` experience.

## Approved Scope
- Remove the `3D Stage` mode from the user-facing project UI.
- Simplify the project shell so it renders the 2D canvas directly.
- Delete the now-unused mode toggle component and toggle-only styles.
- Update the project test so it verifies the single-mode runtime.
- Leave the existing stage scene files and stage-specific tests on disk as historical implementation work.

## Architecture
- Collapse `wiper typography` back to a single-mode project.
- Keep `WiperTypographyCanvas2D` as the only runtime renderer exposed by `WiperTypographyProject`.
- Remove mode state, mode mapping, and toggle rendering from the project shell.
- Do not change the underlying 2D interaction or simulation behavior.

## File Boundaries
- `src/projects/wiper-typography/WiperTypographyProject.tsx`
  - render `WiperTypographyCanvas2D` directly inside the existing pane wrapper.
- `src/projects/wiper-typography/WiperTypographyProject.test.tsx`
  - replace mode-switch assertions with a focused regression test for the 2D-only shell.
- `src/projects/wiper-typography/WiperTypographyProject.module.css`
  - remove selectors that exist only for the deleted mode toggle.
- `src/projects/wiper-typography/WiperTypographyModeToggle.tsx`
  - delete because no runtime path uses it after the shell simplification.

## Risks
- The project test may still mock or assert the removed stage path.
- Removing the toggle could leave dead CSS behind.
- Stage implementation files may appear unused but are intentionally retained.

## Mitigations
- Drive the shell change with a failing test first.
- Search for `WiperTypographyModeToggle` and `3d-stage` before deleting the toggle file.
- Keep the cleanup limited to the public runtime path and its direct test coverage.

## Testing And Verification
- Update `WiperTypographyProject.test.tsx` first and verify it fails against the current implementation.
- Run the focused project test after the shell cleanup.
- Run the full test suite and lint before claiming the change is complete.
