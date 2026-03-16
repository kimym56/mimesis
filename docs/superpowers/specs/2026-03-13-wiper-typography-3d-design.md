# Wiper Typography 3D Modes Design

## Goal
Add a mode shell for `wiper typography` that preserves the current `2D Canvas` demo and introduces three permanent 3D reinterpretations of the same drag-driven wipe system.

## Approved Constraints
- Keep the current 2D canvas implementation as a baseline mode.
- Add three permanent 3D modes, not one temporary prototype.
- All three 3D modes must be genuine conversions of the existing 2D canvas behavior.
- All three 3D modes must share the same drag-driven phase interaction as the 2D version.
- Variants should differ by mixed spatial emphasis, but remain visually faithful to the current piece.

## Architecture
- Use a shell component for `wiper typography` similar to `page curl`, with a mode toggle that switches between one 2D renderer and three 3D renderers.
- Extract shared interaction and phase state out of the current `WiperTypographyProject.tsx` so the renderers consume one common control model.
- Keep 3D scenes as separate modules built on top of the shared interaction/math layer rather than a single config-only scene.
- Preserve the current project registry structure and keep routing/detail layout unchanged.

## Mode Lineup
- `2D Canvas`
  - Preserves the existing canvas implementation as the regression baseline.
- `3D Wiper Bars`
  - Converts the black sweep lines into shallow extruded blades with lighting and shadow.
  - Keeps the glyph field mostly behind the bars on a restrained rear plane.
- `3D Glyph Field`
  - Keeps the wipe mechanics faithful, but distributes glyphs across shallow depth bands.
  - Uses depth and lighting to make the typography field volumetric without changing the graphic identity.
- `3D Stage`
  - Places the same bars and glyph language into a shallow perspective stage.
  - Uses restrained camera offset and spatial falloff rather than dramatic camera motion.

## Shared Interaction And Data Flow
- Normalize all modes around the existing `phase: 0..1` model.
- Keep autoplay while idle and drag-to-scrub while active.
- Extract pointer-enter, pointer-move, pointer-leave, resize, and phase easing into a shared controller hook.
- Reuse one shared math layer for:
  - phase clamping
  - drag delta mapping
  - active-range checks
  - line pose generation
- Pass a compact scene model into each renderer:
  - viewport width and height
  - normalized phase
  - reduced-motion preference
  - shared constants for line count, spacing, and interaction margin

## File Boundaries
- `src/projects/wiper-typography/WiperTypographyProject.tsx`
  - Shell component with mode toggle and shared wrapper layout.
- `src/projects/wiper-typography/WiperTypographyCanvas2D.tsx`
  - The current 2D renderer extracted into its own focused component.
- `src/projects/wiper-typography/WiperTypographySceneBars3D.tsx`
  - 3D bars variant.
- `src/projects/wiper-typography/WiperTypographySceneGlyphField3D.tsx`
  - 3D glyph-field variant.
- `src/projects/wiper-typography/WiperTypographySceneStage3D.tsx`
  - 3D stage variant.
- `src/projects/wiper-typography/WiperTypographySceneFrame.tsx`
  - Shared React Three Fiber canvas wrapper, camera framing, and common scene plumbing if needed.
- `src/projects/wiper-typography/useWiperInteraction.ts`
  - Shared interaction controller hook.
- `src/projects/wiper-typography/wiperMath.ts`
  - Shared math helpers used by both 2D and 3D modes.
- `src/projects/wiper-typography/WiperTypographyProject.module.css`
  - Shared mode shell and renderer layout styling.

## Rendering Principles
- Keep the blue background, black sweep language, and white glyph palette from the current piece.
- Keep depth restrained so the work still reads as the same typography animation.
- Do not add free camera controls or cinematic orbit behavior.
- Favor shallow perspective, lighting contrast, and cast shadows over heavy scene complexity.
- Use batching or instancing where needed so glyph count stays practical on smaller devices.

## Error Handling And Accessibility
- If WebGL or 3D scene setup fails, keep the 2D mode available as a functional fallback.
- Respect reduced motion by reducing autoplay movement and suppressing extra depth/parallax animation.
- Keep all mode switches pointer-safe and touch-safe.
- Preserve the existing `role="img"` / descriptive labeling pattern for the project container.

## Testing And Verification
- Extend unit coverage around extracted shared interaction/math helpers.
- Add component tests for:
  - mode toggle rendering
  - default mode selection
  - switching between 2D and 3D modes
- Manually verify:
  - drag behavior matches across all four modes
  - autoplay resumes after pointer leave
  - resize behavior remains stable
  - reduced-motion behavior is respected
  - acceptable performance on desktop and mobile-sized viewports

## Risks
- Mobile performance may regress if each glyph becomes an individual mesh.
- Visual drift may occur if lighting or camera choices overpower the original 2D graphic feel.
- Behavior drift may occur if each 3D mode smooths or maps phase independently.

## Mitigations
- Keep one shared interaction controller and one shared pose math layer.
- Use shallow depth, restrained camera framing, and the current 2D mode as a comparison baseline.
- Prefer instancing or grouped geometry for repeated glyph elements in 3D scenes.
