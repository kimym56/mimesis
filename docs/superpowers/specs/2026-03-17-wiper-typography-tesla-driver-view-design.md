# Wiper Typography Tesla Driver View Design

## Goal
Add a new `3D Driver View` mode to `wiper typography` that uses the actual Sketchfab Tesla Model 3 asset in-app while preserving the current `2D Canvas` mode as the default baseline.

## Approved Constraints
- Use the actual Sketchfab Tesla Model 3 asset in the app.
- Match the `iOS Page Curl` interaction pattern with a mode toggle, not a split-screen layout.
- Keep `2D Canvas` as the default mode.
- The `3D Driver View` mode is autoplay-only.
- Do not implement drag, mouse-look, orbit controls, or any other direct interaction in the 3D mode.
- The 3D composition should read as the driver seeing typography fall on the windshield while the wipers move.

## Asset Assumptions
- Source reference: `Tesla 2018 Model 3` on Sketchfab.
- Use a local optimized `glb` or `gltf` export derived from that asset rather than embedding Sketchfab in an iframe.
- Treat optimization as part of the feature because the source model is heavy for direct runtime use.
- Keep attribution/license handling aligned with the model's published Sketchfab terms.

## Architecture
- Keep `WiperTypographyProject.tsx` aligned with `PageCurlProject.tsx` by introducing a mode toggle with `2D Canvas` and `3D Driver View`.
- Preserve the current `WiperTypographyCanvas2D.tsx` implementation and its drag-driven behavior unchanged.
- Add a dedicated `WiperTypographyDriverView3D.tsx` renderer for the Tesla scene.
- Reuse the existing React Three Fiber scene infrastructure where it helps, but do not keep the old custom cockpit stage as a user-facing mode.
- Replace pointer-driven 3D scene state with a time-based autoplay loop that drives the wiper sweep and glyph fall.

## Scene Composition
- Position the camera at a fixed driver-eye viewpoint inside the Tesla cabin.
- Frame the scene tightly around the dashboard, windshield, and visible cabin surfaces rather than presenting the whole car.
- Render the falling typography on or just behind the windshield plane so the letters read as landing and moving across the glass.
- Keep the wiper motion synchronized with the wipe effect so the scene reads as one system instead of separate animations.
- Preserve the existing blue/black/white wiper-typography color language where possible so the 3D mode still feels like the same project.

## Runtime Flow
- Default to `2D Canvas` when the project loads.
- When the user switches to `3D Driver View`, mount the Three.js scene, load the Tesla asset, and start the autoplay loop.
- Keep the 3D camera fixed for the entire mode.
- Drive the 3D scene from elapsed time rather than `useWiperInteraction`.
- Continue to use a shared simulation/math layer where practical for glyph placement, wipe timing, and wiper phase mapping.

## Wiper Strategy
- Prefer animating separable wiper nodes from the Tesla model if the export exposes them cleanly.
- If the source model's wipers are not practical to animate, hide or ignore them and mount a procedural wiper rig aligned to the Tesla windshield instead.
- The implementation should choose the simpler path that yields stable motion and clear visual framing.

## File Boundaries
- `src/projects/wiper-typography/WiperTypographyProject.tsx`
  - Shell component with mode toggle and active renderer selection.
- `src/projects/wiper-typography/WiperTypographyCanvas2D.tsx`
  - Existing interactive 2D renderer, preserved as the default mode.
- `src/projects/wiper-typography/WiperTypographyDriverView3D.tsx`
  - Tesla driver-view renderer, autoplay clock, and scene composition.
- `src/projects/wiper-typography/WiperTypographyProject.module.css`
  - Shared shell styles for the mode toggle and renderer container.
- `src/projects/wiper-typography/WiperTypographyModeToggle.tsx`
  - Mode switcher for `2D Canvas` and `3D Driver View`.
- `src/projects/wiper-typography/*`
  - Shared simulation, math, and 3D helper files may be reused or simplified, but the deprecated custom `3D Stage` mode should not remain in the product UI.

## Fallbacks And Accessibility
- If the Tesla asset fails to load, show a lightweight in-pane fallback state for the 3D mode instead of breaking the project page.
- Keep `2D Canvas` fully available even if 3D fails.
- Respect reduced motion by slowing or minimizing autoplay motion in 3D.
- Preserve the existing accessible labeling pattern for the project container.

## Testing And Verification
- Add component tests for:
  - defaulting to `2D Canvas`
  - rendering the mode toggle labels
  - switching from `2D Canvas` to `3D Driver View`
  - mounting the 3D renderer when selected
  - showing fallback UI when the Tesla asset fails to load
- Keep or extend unit coverage for any reused autoplay, wiper phase, or glyph simulation helpers.
- Manually verify:
  - `2D Canvas` still behaves the same as before
  - `3D Driver View` uses a fixed driver perspective
  - the typography reads as falling on the windshield
  - the wipers animate continuously without user input
  - the scene remains performant after asset optimization on desktop and mobile-sized viewports

## Risks
- The Tesla asset may be too heavy for direct runtime use without aggressive optimization.
- Interior geometry may be incomplete or awkward for the exact driver-view framing needed.
- The model may not expose usable wiper nodes, forcing a hybrid procedural solution.
- The typography may look detached from the glass unless windshield placement and depth cues are tuned carefully.

## Mitigations
- Optimize the asset before integration and crop the camera tightly to the visible driver-view region.
- Treat procedural wipers as an acceptable fallback if the imported mesh is not animation-friendly.
- Reuse the existing simulation logic for timing and motion so the 3D mode inherits the established wipe rhythm.
- Keep the 2D mode as the stable fallback and visual regression baseline.
