# Project Grid Media Preview Design

## Goal
Upgrade the homepage project grid so cards can show continuous autoplay motion previews (video) instead of only static images, while preserving current layout and fallback behavior.

## Scope
- Extend project data to support optional preview media metadata.
- Render autoplay looping video previews in grid cards when available.
- Keep existing image rendering for projects without preview media.
- Preserve existing card animations, responsive layout, and navigation behavior.

## Architecture
- Keep homepage and grid composition unchanged (`page.tsx` -> `ProjectGrid`).
- Add media metadata to `Project` entries in `src/data/projects.ts`.
- Encapsulate grid preview rendering logic in `ProjectGrid` so card consumers remain unchanged.
- Reuse existing card styling and add a dedicated style hook for video media.

## Components
- `src/data/projects.ts`
  - Add a typed `previewMedia` field for optional card preview media.
  - Provide media source(s) and poster image for entries that should autoplay.
- `src/components/ProjectGrid.tsx`
  - Detect `project.previewMedia`.
  - Render `<video>` with `autoPlay`, `loop`, `muted`, `playsInline`, and `preload="metadata"`.
  - Render `<Image>` fallback when no video metadata exists.
  - Honor reduced-motion preference by rendering a non-animated poster/image.
- `src/components/ProjectGrid.module.css`
  - Add a `.media` class for shared object-fit/positioning across image/video.

## Data Model
- Add `previewMedia?: { type: "video"; poster: string; sources: { src: string; type: "video/mp4" | "video/webm" }[] }`.
- Continue using `imitationImage` as static fallback and poster baseline.

## Interaction Behavior
- Grid preview videos autoplay continuously in-card.
- Video remains muted and inline for browser autoplay compatibility.
- Card hover scaling remains unchanged.
- If media fails to load, poster/static fallback still preserves visual continuity.

## Error Handling & Accessibility
- Respect `prefers-reduced-motion` by avoiding autoplay rendering and showing static preview.
- Keep descriptive image/video `alt`/`aria-label` semantics through existing title context.
- Ensure keyboard navigation and focus-visible card styling are unchanged.

## Testing & Verification
- Type-check project data changes with existing TypeScript build.
- Run lint and test/build commands already used in the repo.
- Manually verify at least one card with video preview and one with image fallback across mobile/desktop widths.
