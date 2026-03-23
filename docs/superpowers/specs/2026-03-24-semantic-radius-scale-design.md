# Semantic Radius Scale Design

## Goal
Introduce a broader reusable semantic radius scale so rounded UI across the portfolio follows one intent-based system instead of choosing raw size tokens ad hoc.

## Scope
- Keep the existing primitive radius tokens as the numeric foundation.
- Add semantic radius aliases for common design intents.
- Migrate a first pass of obvious components to the semantic scale:
  - top `My Mimesis` mode toggles in all three interactive projects
  - standard project/media frame surfaces
  - obvious pill/circle controls that should stay intentionally pill-shaped
- Update focused regression coverage to lock the semantic radius contract.

## Out Of Scope
- A full repo-wide radius migration in one pass.
- Refactoring interactive project components into shared React components.
- Changing spacing, typography, motion, or color tokens as part of this work.

## Radius Model

### Primitive Tokens
- Keep:
  - `--radius-sm`
  - `--radius-md`
  - `--radius-lg`
  - `--radius-xl`
  - `--radius-full`

### Semantic Tokens
- Add:
  - `--radius-subtle` -> `var(--radius-md)`
  - `--radius-soft` -> `var(--radius-lg)`
  - `--radius-prominent` -> `var(--radius-xl)`
  - `--radius-pill` -> `var(--radius-full)`

The semantic layer becomes the default authoring API for component CSS. Primitive tokens remain available as the base scale, but component styles should prefer intent-based names.

## Migration Rules
- Compact rounded controls, including the three top project mode toggles, should use `--radius-soft`.
- Standard framed surfaces, such as project media containers and comparable view shells, should use `--radius-soft`.
- Larger showcase shells or roomy grouped controls that should read more rounded may use `--radius-prominent`.
- True pill/circle shapes should use `--radius-pill` explicitly instead of raw `--radius-full`.

## First Migration Pass
- `src/styles/tokens.css`
  - add the semantic radius aliases
- `src/projects/wiper-typography/WiperTypographyProject.module.css`
  - migrate the mode toggle and project wrapper to semantic tokens
- `src/projects/page-curl/PageCurlProject.module.css`
  - migrate the top mode toggle to `--radius-soft`
  - migrate pill/circle controls to semantic aliases where they are intentionally pill-shaped
- `src/projects/bw-circle/BwCircleProject.module.css`
  - migrate the top mode toggle to `--radius-soft`
  - migrate the scene shell and obvious control radii to semantic tokens
  - migrate the camera button to `--radius-pill`
- `src/app/project/[id]/ProjectDetail.module.css`
  - migrate standard frame surfaces to `--radius-soft`
- `src/components/ThemeToggle.module.css`
  - migrate the circular toggle to `--radius-pill`

## Testing
- Add or replace the focused radius regression test with source-level assertions that:
  - semantic radius aliases exist in `tokens.css`
  - the three project mode toggles use `--radius-soft`
  - standard migrated surfaces use the expected semantic token
  - intentional pill/circle controls use `--radius-pill`
- Keep the relevant interactive project component tests green.
- Run focused tests, lint, and a production build after the migration.
