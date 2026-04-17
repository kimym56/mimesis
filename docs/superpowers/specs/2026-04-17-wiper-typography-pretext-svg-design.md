# Wiper Typography Pretext SVG Design

## Goal

Add a third `wiper typography` implementation beside `2D Canvas` and `3D Driver View` that uses `@chenglou/pretext` to lay out repeated `WIPER TYPOGRAPHY` text and renders a simple autoplay-only DOM/SVG windshield study.

## Current Context

- `src/projects/wiper-typography/WiperTypographyProject.tsx` currently supports two modes:
  - `2D Canvas`
  - `3D Driver View`
- `src/projects/wiper-typography/WiperTypographyModeToggle.tsx` defines the public mode contract and labels.
- `src/projects/wiper-typography/WiperTypographyProject.module.css` provides the shared interactive pane, mode toggle, and stage shell styles.
- `src/app/project/[id]/ProjectDetailClient.tsx` tracks the active render mode so the project detail page can adjust supporting reference copy for `wiper typography`.
- The repository does not currently use `@chenglou/pretext`, so this feature must introduce the dependency and establish the first local usage pattern.

## Approved Behavior

- Add a third toggle option ordered as:
  - `2D Canvas`
  - `3D Driver View`
  - `Pretext SVG`
- Keep `2D Canvas` as the default mode.
- The new mode should be visually simple:
  - solid blue stage
  - white repeated `WIPER TYPOGRAPHY` lines
  - no cabin framing or dashboard hints
  - one black wiper rig sweeping across the composition
- The text should read as wrapped lines that drop downward like rain.
- The wiper should read as a car-wiper sweep rather than a generic horizontal wipe.
- The new mode should be autoplay-only:
  - no drag interaction
  - no pointer-driven phase
  - reduced motion should slow the rain and soften the sweep cadence

## Approach

- Keep `WiperTypographyProject.tsx` as the mode container and add a third renderer entry for `Pretext SVG`.
- Implement the new mode in a dedicated `WiperTypographyPretextSvg.tsx` component that owns:
  - stage measurement
  - `pretext`-driven line layout
  - autoplay timing
  - SVG rendering
- Extract pure helpers so layout and motion remain testable outside the component:
  - `wiperPretextLayout.ts`
  - `wiperPretextMotion.ts`
- Recompute `pretext` line layout only when width changes.
- Keep per-frame work limited to arithmetic over cached line data and sweep state so the mode does not rebuild the paragraph every animation frame.

## Scene Composition

- Render the stage as a flat 2D SVG composition inside the existing project wrapper.
- Use `@chenglou/pretext` to generate wrapped lines from repeated `WIPER TYPOGRAPHY` content sized to the live stage width.
- Render the rows as SVG `<text>` elements with stable baselines and a shared downward translation offset.
- Duplicate the laid-out rows vertically so the rain can loop continuously without obvious seams.
- Render the wiper as a simplified SVG rig:
  - one pivot near the lower-left portion of the frame
  - one arm
  - one blade
- Sweep the blade on an arc across the lower half of the stage so the motion reads as automotive.

## Runtime Flow

- On mount, measure the stage width and height.
- Prepare repeated `WIPER TYPOGRAPHY` content with `prepareWithSegments()` and derive wrapped rows for the current stage width.
- Cache the prepared text handle so resize work can reuse `pretext` efficiently.
- Start an autoplay loop with `requestAnimationFrame`.
- Each frame updates:
  - downward rain offset
  - wiper sweep phase
  - temporary wipe-band intensity trailing the blade
- On resize:
  - recompute layout from cached prepared text
  - preserve the animation loop
  - keep motion continuous

## Wipe Effect

- The effect should not simulate actual particle displacement.
- Instead, the sweeping blade carries a moving clear band through the text field.
- That band briefly reduces text opacity and blur around the most recent blade path, then allows the rain field to visually refill.
- The band should be strongest close to the blade and fade behind it so the scene reads as a wipe instead of a hard eraser.

## Fallbacks And Accessibility

- If `@chenglou/pretext` is unavailable or throws during layout, fall back to a lightweight wrapped-text SVG layout so the mode still renders.
- Keep the wrapper `role="img"` and use an accessible label describing the simulation.
- Preserve the existing project shell so the toggle and stage work the same way as the other modes.
- Reduced-motion users should still see the concept, but with slower offsets and less aggressive wipe-band churn.

## File Boundaries

- `src/projects/wiper-typography/WiperTypographyProject.tsx`
  - extend the mode state and renderer loading
- `src/projects/wiper-typography/WiperTypographyModeToggle.tsx`
  - add the `Pretext SVG` mode label and id
- `src/projects/wiper-typography/WiperTypographyPretextSvg.tsx`
  - new renderer component for the SVG stage
- `src/projects/wiper-typography/wiperPretextLayout.ts`
  - `pretext` preparation, row generation, and fallback wrapping helpers
- `src/projects/wiper-typography/wiperPretextMotion.ts`
  - pure timing, sweep geometry, and wipe-band helpers
- `src/projects/wiper-typography/WiperTypographyProject.module.css`
  - shared stage styles for the new SVG renderer if needed
- tests in `src/projects/wiper-typography/*`
  - cover the new mode contract, pure helpers, and component rendering path

## Testing

- Add a component test that the toggle shows `Pretext SVG`.
- Add a component test that selecting `Pretext SVG` mounts the new renderer without breaking `2D Canvas` or `3D Driver View`.
- Add unit tests for the new layout helper:
  - rows materialize from repeated `WIPER TYPOGRAPHY`
  - fallback wrapping works when `pretext` is unavailable
- Add unit tests for the motion helper:
  - sweep positions stay bounded
  - rain offset loops cleanly
  - wipe-band intensity fades predictably
- Manually verify:
  - the new mode renders in the project detail page
  - the text loops smoothly on resize
  - the sweep reads as a car wiper
  - reduced motion slows the effect without freezing the scene

## Risks

- `pretext` may require explicit browser-safe import handling inside the Next.js client environment.
- SVG masking or filter work can become visually heavy if overbuilt.
- A wipe effect that is too literal or too soft will make the motion hard to read.

## Mitigations

- Keep the integration narrow and client-only in the new renderer path.
- Prefer simple SVG primitives and lightweight opacity treatment over expensive filters.
- Start with one clear band and one blade, then tune geometry rather than adding extra visual machinery.
