# Wiper Typography Project Design

## Goal
Add a second interactive project called `wiper typography` with a visual style similar to the FFF reference and an additional mouse-controlled wiper interaction.

## Scope
- Replace the current placeholder `editorial-blog` project entry with `wiper-typography`.
- Refactor interactive project implementations into dedicated feature folders.
- Add a new interactive renderer for wiper typography using canvas.
- Keep existing page-curl behavior intact.

## Architecture
- Keep `src/app/project/[id]/page.tsx` as a route-level loader only.
- Keep `ProjectDetailClient` as layout + metadata shell.
- Resolve interactive content through a project renderer registry keyed by `interactiveDemo`.
- Move heavy interactive implementations into `src/projects/<feature>/` folders.

## Components
- `src/projects/registry.ts`
  - Provides a typed static map from `interactiveDemo` to renderer component.
  - Uses `next/dynamic` to lazy-load interactive demos.
- `src/projects/page-curl/*`
  - Hosts existing page curl components and local styles.
- `src/projects/wiper-typography/WiperTypographyProject.tsx`
  - Canvas-based typography scene.
  - Mouse-driven wiper rectangle that reveals/affects glyph layer.

## Data Model
- Extend `Project` type with `interactiveDemo?: "page-curl" | "wiper-typography"`.
- Set:
  - `ios-curl-animation` -> `interactiveDemo: "page-curl"`
  - `wiper-typography` -> `interactiveDemo: "wiper-typography"`

## Interaction Behavior (Wiper)
- Typography is rendered as repeated rows in high-contrast monochrome.
- A movable vertical wiper band follows mouse/touch x-position.
- Inside the band:
  - text layer inverts/brights,
  - optional shear/noise offset adds mechanical wipe feel.
- On pointer leave, band eases back to center.

## Error Handling & Accessibility
- If interactive renderer is missing, fallback to static image panel.
- Respect `prefers-reduced-motion`: reduce animation interpolation speed and disable extra jitter.
- Keep interaction pointer-safe on desktop + touch.

## Testing & Verification
- Add unit tests for wiper math utilities (clamp and easing target interpolation).
- Run lint and build as integration checks.
