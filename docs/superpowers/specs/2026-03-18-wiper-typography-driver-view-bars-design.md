# Wiper Typography Driver View Bars Design

**Goal:** Render the simulated wipe bars in `3D Driver View` so the windshield shows both the falling glyphs and the sweeping bars.

## Current State

`WiperTypographyDriverView3D` advances the shared `wiperSimulation` state and projects glyphs onto the Tesla windshield, but it never renders `simulation.bars`. The result is that driver view can show glyph motion and the Tesla wiper model, while the abstract wipe bars from the project itself are absent.

## Design

Project the existing `simulation.bars` onto the same windshield layout used for glyphs. Reuse the current `TeslaDriverViewLayout` projection math so bars and glyphs stay aligned with the same camera and tuning controls.

Add one lightweight mesh component for projected bars inside `WiperTypographyDriverView3D`:

- Each bar should be represented as a thin rectangular mesh.
- The mesh position should come from `projectTeslaDriverGlyphPosition`, using the bar center normalized against the shared simulation pixel size.
- The mesh orientation should use `createTeslaDriverGlyphQuaternion` so the bar lies flush with the windshield plane.
- The mesh scale should derive from the projected windshield dimensions and the bar's simulated `width` and `height`, preserving the existing 2D wipe proportions.

## Testing

Add a driver-view wiring regression that seeds `simulation.bars` with at least one bar and verifies that the 3D driver view mounts a projected bar mesh alongside the Tesla model and glyph meshes. Keep the test focused on render composition rather than exact Three.js transforms.
