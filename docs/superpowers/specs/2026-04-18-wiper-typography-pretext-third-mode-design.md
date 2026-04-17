# Wiper Typography Pretext Third Mode Design

## Goal

Add a third `wiper typography` renderer beside `2D Canvas` and `3D Driver View` that recreates the existing single-glyph field in SVG, but uses `@chenglou/pretext` to produce a typography-first reflow effect around the sweeping wiper.

## Context

- `src/projects/wiper-typography/WiperTypographyProject.tsx` currently exposes two modes:
  - `2D Canvas`
  - `3D Driver View`
- `src/projects/wiper-typography/WiperTypographyCanvas2D.tsx` is the visual reference for the new mode:
  - flat blue background
  - white single-glyph field sourced from `WIPER_GLYPHS`
  - segmented black sweep geometry
  - cursor and touch interaction layered with autoplay timing
- The user wants the new mode to remain visually close to the current canvas composition instead of turning into a dense paragraph layout.
- The interaction around the blade should still be typography-first:
  - the sweep should read like a Pretext reflow example
  - the field should not behave like a post-layout mask or simple hide/show effect
- Relevant Pretext references confirm the intended API direction:
  - `prepareWithSegments()` and manual line layout for variable-width lines
  - `@chenglou/pretext/rich-inline` for stable inline-fragment ownership
  - obstacle-driven demos such as `Editorial Engine` and `Rich Inline Text`

## Approved Behavior

- Add a third toggle mode and keep `2D Canvas` as the default renderer.
- The new mode should preserve the current canvas art direction:
  - blue stage
  - white single glyphs from the same source pool
  - segmented black sweep geometry that stays close to the current canvas wiper
- The visible field should remain sparse and particle-like instead of forming dense text rows.
- The blade interaction should be a typography-first reflow effect:
  - the field should look like the current 2D canvas mode overall
  - near the blade, glyphs should visibly reroute in a Pretext-like way
  - the reroute should be local to the active blade corridor rather than affecting the whole stage
- Desktop interaction:
  - autoplay runs while idle
  - moving the cursor over the stage pauses autoplay and directly controls sweep position
  - leaving the stage resumes autoplay smoothly from the current phase
- Touch interaction:
  - dragging should scrub the sweep directly, matching the current interactive modes
- Reduced motion:
  - keep the same composition and interaction model
  - lower sweep speed and field motion instead of removing the effect

## Recommended Approach

Use a hybrid slot-field renderer.

- Keep the field model and overall motion language close to `WiperTypographyCanvas2D`.
- Render the scene in SVG rather than canvas.
- Hand only the active blade corridor to Pretext so the blade interaction becomes a local reroute instead of a global paragraph reflow.
- Keep the rest of the field on stable sparse anchors so the new mode still reads as a sibling of the current canvas version.

This approach is the best fit for the approved direction because it preserves the current composition while making the sweep behavior recognizably Pretext-driven.

## Rendering Model

- The stage is a flat SVG composition rendered inside the existing project shell.
- The glyph field is generated from the same `WIPER_GLYPHS` pool as the canvas renderer.
- Each visible glyph instance owns:
  - a stable sparse anchor
  - a current y position
  - a motion seed
  - a current glyph
- Outside the active blade corridor, glyphs follow the current canvas mood:
  - sparse distribution
  - steady downward motion
  - slight independent drift
- Inside and just around the blade corridor, the renderer uses Pretext to reroute the local glyph stream through the remaining available width so the sweep creates a readable carve-through moment.
- The reroute should be visible enough to feel intentional, but narrow enough that the full stage never reads like a paragraph demo.

## Interaction Model

- Reuse the existing interaction expectations from `useWiperInteraction` instead of inventing a new input contract.
- Desktop:
  - idle autoplay advances the sweep
  - pointer entry pauses autoplay
  - pointer move maps directly to the sweep phase
  - pointer leave resumes autoplay from the current phase without snapping
- Touch:
  - touch drag primes and scrubs the sweep directly
  - autoplay resumes when touch interaction ends
- Reduced motion:
  - slower autoplay cadence
  - lower field drift and fall speed
  - no separate fallback visual mode

## Architecture

- `WiperTypographyProject.tsx` remains the mode container and lazy-loads the third renderer.
- `WiperTypographyModeToggle.tsx` extends the public render-mode contract.
- `WiperTypographyPretextSvg.tsx` owns:
  - stage measurement
  - interaction wiring
  - animation clock
  - SVG painting
- Pure helpers own the hot-path logic so the renderer stays thin and testable.

## File Boundaries

- `src/projects/wiper-typography/WiperTypographyProject.tsx`
  - add the third renderer path and initial-mode support
- `src/projects/wiper-typography/WiperTypographyModeToggle.tsx`
  - extend the mode union and labels with the new Pretext mode
- `src/projects/wiper-typography/WiperTypographyPretextSvg.tsx`
  - new client renderer for the SVG stage
  - measure stage size
  - consume interaction state
  - map routed glyph positions into SVG `<text>` nodes
- `src/projects/wiper-typography/wiperPretextField.ts`
  - sparse glyph-slot generation
  - deterministic seeds and glyph assignment
  - prepared Pretext handle caching for the local source stream
- `src/projects/wiper-typography/wiperPretextLayout.ts`
  - convert blade geometry into blocked intervals
  - drive Pretext manual layout for the local reroute corridor
  - materialize routed glyph positions for SVG painting
- `src/projects/wiper-typography/wiperPretextMotion.ts`
  - autoplay timing
  - pointer pause/resume handoff
  - deterministic per-glyph drift and fall offsets
- `src/projects/wiper-typography/wiperPretextGeometry.ts`
  - segmented sweep geometry aligned with the current canvas mode
  - corridor projection helpers used by the reroute step
- `src/projects/wiper-typography/WiperTypographyProject.module.css`
  - any shared stage styles needed by the new SVG renderer
- `src/projects/wiper-typography/*test*`
  - tests for the new mode contract, helper behavior, and component rendering path

## Runtime Flow

1. Measure the stage from the shared wrapper.
2. Build or reuse the sparse glyph field for the current size.
3. Prepare and cache the local Pretext source stream for the reroute corridor.
4. Start the animation loop.
5. On each frame:
   - read the current interaction phase
   - compute the segmented blade geometry
   - advance the sparse glyph field motion
   - project the active corridor around the blade
   - ask Pretext to reroute the local glyph stream through the remaining intervals
   - paint the final SVG text nodes and segmented sweep geometry
6. On resize:
   - rebuild stage-dependent geometry and slot placement
   - keep interaction and animation continuity intact

## Testing

- Mode shell tests:
  - the toggle shows the third Pretext mode
  - selecting the new mode mounts the SVG renderer without breaking existing modes
- Helper tests:
  - sparse field generation stays single-glyph and deterministic
  - motion helpers keep neighboring glyphs from collapsing into row-like motion
  - segmented sweep geometry stays aligned with the current canvas structure
  - the reroute step only affects the local blade corridor
  - autoplay pause/resume logic behaves correctly for pointer entry and exit
- Component tests:
  - the SVG renderer paints glyph nodes from the sparse field
  - pointer interaction pauses autoplay and updates phase
  - touch dragging scrubs the sweep
  - reduced motion lowers motion intensity without changing the composition
- Manual verification:
  - compare the new mode beside `2D Canvas`
  - confirm the field still reads as sparse glyph rain
  - confirm the blade interaction reads as Pretext reroute rather than masking
  - confirm resize continuity and responsive behavior

## Risks

- If too much of the stage is handed to Pretext each frame, the result will drift toward rows and away from the approved canvas feel.
- If too little reroute is visible near the blade, the new mode will feel like masking instead of typography-first reflow.
- Pointer and autoplay handoff can feel jumpy if the phase resumption is not continuous.
- SVG text node counts can get expensive if the sparse field is not bounded carefully.

## Mitigations

- Keep the reroute corridor narrow and local to the blade.
- Reuse the existing interaction model rather than creating a new one.
- Bound the sparse field count using the same performance mindset as the canvas mode.
- Cache prepared Pretext handles and keep frame work limited to geometry, motion, and local reroute arithmetic.
