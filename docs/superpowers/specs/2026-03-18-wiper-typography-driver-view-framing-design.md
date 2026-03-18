# Wiper Typography Driver View Framing Design

## Goal
Tighten the `3D Driver View` framing so it reads less like a wide-angle action camera and keeps the falling typography inside the visible windshield area by default.

## Approved Constraints
- Fix the driver-view `FOV` ceiling first so extreme values cannot push the scene into a distorted wide-angle look.
- Keep the existing lil-gui tuning workflow for final polish instead of replacing it with automatic camera logic.
- Prevent glyphs from spilling over the effective windshield edges even when the simulation places them at the extremes of the 2D field.
- Keep the change narrow to the current `3D Driver View` implementation rather than rebuilding the Tesla scene composition.

## Architecture
- Keep the current Tesla driver-view scene, simulation loop, and tuning GUI structure.
- Add a shared driver-view `FOV` range in the tuning layer so the default value, GUI controls, and runtime camera clamp all agree on the same safe bounds.
- Add a projection safe area in the Tesla driver-view layout math so normalized glyph positions are inset from the windshield edges before they become world-space positions.
- Do not add new user-facing controls for the safe area. The goal is to harden the current system, not expand the tuning surface.

## Camera Framing
- Reduce the maximum allowed `FOV` from the current wide-angle ceiling to a tighter driver-eye range.
- Clamp the camera `fov` at runtime in the Three.js scene so stale tuning state or manual edits cannot bypass the new limit.
- Keep the current `cameraOffset*` and `lookAtOffset*` controls available for manual refinement after the hard clamp is in place.

## Glyph Placement
- Treat glyph placement as a center-point projection problem rather than a mesh-size problem.
- Inset the normalized glyph coordinates before projection so the leftmost, rightmost, topmost, and bottommost glyph centers remain inside the effective windshield bounds.
- Derive the inset from the simulated field dimensions and glyph radius so the margin tracks the existing simulation rather than relying on a magic constant in world space.
- Preserve the current width, height, depth, and Y-bias tuning controls so the user can still fine-tune the composition with lil-gui.

## File Boundaries
- `src/projects/wiper-typography/wiperTeslaDriverTuning.ts`
  - Define the safe `FOV` range and keep the GUI slider aligned with it.
- `src/projects/wiper-typography/WiperTypographyDriverView3D.tsx`
  - Apply the runtime `FOV` clamp before updating the camera projection.
- `src/projects/wiper-typography/wiperTeslaDriverLayout.ts`
  - Add the glyph projection safe area and keep the layout API focused on driver-view geometry.
- `src/projects/wiper-typography/wiperTeslaDriverLayout.test.ts`
  - Extend layout coverage for edge-safe glyph projection.

## Testing And Verification
- Add a pure test that proves the driver-view `FOV` is clamped to the new ceiling.
- Extend the layout tests to assert that extreme normalized glyph positions remain inside the visible windshield area.
- Run the focused driver-view unit tests and `npm run lint` for the touched files before claiming the fix is complete.

## Risks
- Over-tightening the `FOV` may make the dashboard framing feel too cropped before manual tuning.
- A safe area that is too aggressive could shrink the visible glyph field more than necessary.

## Mitigations
- Keep the `FOV` clamp conservative enough to preserve tuning room while removing the broken extremes.
- Base the glyph inset on simulation dimensions and glyph radius so the margin remains proportional to the current particle system.
