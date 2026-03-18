# Wiper Typography Windshield-Aligned Glyphs Design

## Goal
Make the `3D Driver View` typography read as running down the windshield by projecting it onto a single flat plane derived from the actual windshield mesh orientation.

## Approved Constraints
- A single flat windshield-aligned plane is acceptable; full mesh-surface sampling is not required.
- The typography should stop reading as if it is passing through the windshield.
- Keep the current lil-gui workflow so the user can continue tuning the composition manually.
- Stay focused on the driver-view glyph projection/orientation path rather than rebuilding the Tesla scene.

## Architecture
- Use the Tesla windshield mesh only as a geometric reference to derive a flat plane in world space.
- Replace the current bounding-box approximation with a plane definition that carries center, width, height, horizontal axis, vertical axis, and inward-facing normal.
- Keep the current layout/tuning layer, but make it operate on this aligned plane instead of the current synthetic one.
- Orient each glyph mesh to the plane before applying the existing in-plane spin from the simulation.

## Windshield Plane Derivation
- Read the windshield mesh world transform and local bounds.
- Determine the two largest local extents as the in-plane axes and treat the smallest extent as thickness.
- Convert the chosen local axes into world-space horizontal/vertical axes and compute a consistent inward-facing normal.
- Use the world-space center of the windshield mesh as the base plane center before applying tuning offsets.

## Glyph Placement
- Project glyph centers onto the aligned plane using the same normalized simulation coordinates and safe-area insets.
- Preserve the existing width, height, center, Y-bias, and depth tuning controls, but apply them relative to the aligned plane.
- Continue treating glyph placement as a flat-plane projection problem, not a per-triangle surface problem.

## Glyph Orientation
- Build a stable plane quaternion from the derived horizontal/vertical/normal basis.
- Apply that base orientation to each glyph mesh so its face is parallel to the windshield-aligned plane.
- Preserve the existing glyph spin as an in-plane rotation layered on top of the plane alignment.

## File Boundaries
- `src/projects/wiper-typography/WiperTypographyDriverView3D.tsx`
  - Derive the aligned plane from the windshield mesh at runtime and apply plane-aligned mesh orientation.
- `src/projects/wiper-typography/wiperTeslaDriverLayout.ts`
  - Hold the pure plane/layout math and projection helpers.
- `src/projects/wiper-typography/wiperTeslaDriverLayout.test.ts`
  - Cover aligned-plane projection/orientation behavior.
- `src/projects/wiper-typography/WiperTypographyExtrudedGlyph3D.tsx`
  - Keep the glyph component compatible with plane-aligned orientation updates if needed.

## Testing And Verification
- Add layout tests proving the camera/glyph plane can be decoupled from the old bounding-box approximation.
- Add assertions that projected glyph points remain on the derived plane.
- Verify the glyph orientation path still works with the driver-view scene wiring.
- Run focused layout tests, driver-view wiring tests, lint, and a production build before claiming the fix is complete.

## Risks
- The windshield mesh local axes may not line up with intuitive horizontal/vertical assumptions.
- A mirrored or flipped basis could make glyph orientation appear backward.

## Mitigations
- Derive axes from mesh extents, then normalize their world-space direction using simple orientation rules and test coverage.
- Keep the plane math pure and unit tested so axis flips are caught before runtime.
