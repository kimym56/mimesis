# Wiper Typography Mode Cleanup Design

## Goal
Remove the deprecated `3D Wiper Bars` and `3D Glyph Field` modes from `wiper typography` so the project only presents the maintained `2D Canvas` and `3D Stage` experiences.

## Approved Scope
- Remove `3D Wiper Bars` from the live UI and code paths.
- Remove `3D Glyph Field` from the live UI and code paths.
- Delete the unused scene modules if nothing else depends on them.
- Update tests so they describe the reduced mode set.
- Update current-state docs so the repo no longer documents the removed modes as active behavior.
- Leave older dated specs and plans intact as historical records.

## Architecture
- Keep the existing `wiper typography` project shell and shared interaction model.
- Shrink the mode toggle contract from four modes to two:
  - `2D Canvas`
  - `3D Stage`
- Keep `WiperTypographySceneStage3D` as the only 3D scene implementation exposed by the project shell.
- Remove imports, types, and tests that exist only for the deleted scenes.

## File Boundaries
- `src/projects/wiper-typography/WiperTypographyModeToggle.tsx`
  - remove the two deprecated mode ids and labels.
- `src/projects/wiper-typography/WiperTypographyProject.tsx`
  - remove the deleted scene imports and mode map entries.
- `src/projects/wiper-typography/WiperTypographyProject.test.tsx`
  - assert the reduced mode list and verify switching to `3D Stage`.
- `src/projects/wiper-typography/WiperTypographyScene3DGlyphWiring.test.tsx`
  - focus on the remaining 3D scene wiring or be renamed later if that becomes worthwhile.
- `src/projects/wiper-typography/WiperTypographySceneBars3D.tsx`
  - delete.
- `src/projects/wiper-typography/WiperTypographySceneGlyphField3D.tsx`
  - delete.
- current-state docs under `docs/`
  - update any live-facing references to the removed modes.

## Risks
- Tests may still import the deleted scenes and fail after file removal.
- Docs may continue to describe four modes if current-state references are missed.
- The project shell type may still allow removed mode ids and leave dead code behind.

## Mitigations
- Change the mode type first through a failing test so stale ids are caught immediately.
- Search the repo for the removed ids and component names before deleting scene files.
- Run focused tests for the wiper project, then run the full suite and lint after cleanup.

## Testing And Verification
- Update the project-shell test first so it fails when old mode labels are still present.
- Update or replace the 3D wiring test so it only exercises the remaining `3D Stage` scene.
- Run focused wiper tests during the cleanup.
- Run `npm test` and `npm run lint` in the worktree before claiming completion.
