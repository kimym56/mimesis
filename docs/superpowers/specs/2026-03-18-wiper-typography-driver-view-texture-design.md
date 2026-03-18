# Wiper Typography Driver View Texture Design

## Goal
Fix `3D Driver View` so the windshield wipe motion sweeps in both directions and the tilted windshield content renders cleanly without jagged projected mesh edges.

## Approved Direction
- Replace the current per-glyph and per-bar 3D windshield projection with a single filtered windshield texture.
- Keep the Tesla cabin model and existing driver-view camera/tuning workflow.
- Make the autoplay phase oscillate back and forth, matching the 2D wipe rhythm instead of sweeping one way and snapping back.

## Root Causes
- `computeDriverViewPhase()` currently returns a sawtooth phase, so the driver-view wipe only progresses `0 -> 1` before resetting.
- `WiperTypographyDriverView3D.tsx` currently projects many individual meshes onto a tilted windshield plane, which makes the windshield content alias more aggressively than a single filtered texture.

## Design

### Motion
- Change driver-view autoplay from a sawtooth cycle to a ping-pong cycle.
- Keep the phase in the same `0..1` range so the existing wiper pose math and shared simulation state can continue to use it.
- Treat `cycleDuration` as one full back-and-forth loop.

### Windshield Rendering
- Render the shared 2D bars and glyphs into an offscreen canvas at a higher internal resolution than the viewport.
- Use that offscreen canvas as a `CanvasTexture` on a single plane aligned with the windshield layout.
- Position and orient the texture plane using the same Tesla windshield basis already derived by `wiperTeslaDriverLayout.ts`.
- Size the plane from `glyphVisibleWidth` and `glyphVisibleHeight`, and shift its center by the existing `glyphYBias` so the current tuning semantics still apply.

### Shared Drawing Path
- Extract the 2D glyph/bar drawing logic into a small shared canvas renderer so both `WiperTypographyCanvas2D.tsx` and driver-view texture rendering use the same visual source.
- Keep the offscreen texture transparent outside the glyphs and bars so the Tesla glass/cabin remain visible.

## File Boundaries
- `src/projects/wiper-typography/wiperDriverView.ts`
  - Hold ping-pong autoplay phase math.
- `src/projects/wiper-typography/WiperTypographyDriverView3D.tsx`
  - Replace projected bar/glyph meshes with a single windshield texture plane.
- `src/projects/wiper-typography/WiperTypographyCanvas2D.tsx`
  - Reuse the shared canvas renderer.
- `src/projects/wiper-typography/wiperSceneRenderer.ts`
  - New shared glyph/bar canvas drawing helper.
- `src/projects/wiper-typography/WiperTypographyScene3DGlyphWiring.test.tsx`
  - Verify the driver view renders a windshield overlay instead of per-glyph meshes.
- `src/projects/wiper-typography/wiperDriverView.test.ts`
  - Verify ping-pong phase behavior.

## Testing
- Add a phase regression proving the driver-view cycle goes forward and then backward instead of resetting.
- Update the driver-view wiring test so it requires a windshield overlay layer and no longer relies on projected glyph mesh composition.
- Run the targeted driver-view tests, then the full `wiper-typography` suite and lint on touched files.
