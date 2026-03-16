# Wiper Typography 3D View-Drag Interaction Design

## Goal
Change the `wiper typography` 3D modes so desktop pointer movement without dragging continues to drive the wipe bars, while active dragging changes the camera view angle instead.

## Relationship To Existing 3D Spec
- Keep the previously approved four-mode structure:
  - `2D Canvas`
  - `3D Wiper Bars`
  - `3D Glyph Field`
  - `3D Stage`
- Keep the shared simulation and visual identity from the prior 3D conversion work.
- This spec only changes the interaction contract for the three 3D modes.

## Approved Constraints
- Mouse move without drag should keep the current bar/wipe behavior.
- In 3D modes, active drag should freeze the current wipe phase and control the view angle instead.
- Drag should map both axes:
  - horizontal drag controls yaw
  - vertical drag controls pitch
- Releasing the drag should keep the final view angle rather than snapping back.
- Apply the new behavior to all three 3D modes:
  - `3D Wiper Bars`
  - `3D Glyph Field`
  - `3D Stage`
- Touch devices should keep the existing drag-to-wipe interaction because hover is unavailable.

## Interaction Model

### Desktop 3D Modes
- `pointer move` with no active drag:
  - updates `phase`
  - leaves camera view unchanged
- `pointer down`:
  - freezes the live `phase`
  - stores drag origin and current view angle origin
- `pointer move` while dragging:
  - does not change `phase`
  - updates normalized camera yaw and pitch from drag delta
- `pointer up` / `pointer cancel`:
  - preserves the last yaw and pitch
  - exits drag mode
- later hover movement:
  - resumes phase updates from the preserved view angle

### 2D Mode
- Keep the current interaction unchanged.
- Ignore all 3D view-angle state.

### Touch Devices
- Keep the current drag-to-wipe behavior across the project.
- Do not introduce a camera-angle drag mode on touch.

## Architecture
- Expand the shared interaction controller from a single `phase` output to a dual-channel model:
  - `phaseRef`
  - `viewRef`
- `viewRef` should provide a compact persistent camera model, for example:
  - `yaw`
  - `pitch`
  - `isDraggingView`
  - `inputMode` or equivalent desktop/touch distinction if needed for rendering behavior
- Keep the pointer decision logic in one shared controller so all three 3D modes inherit identical behavior.
- Do not let each 3D scene implement its own drag-vs-hover rules.

## Camera Behavior
- Apply the drag-driven view angle in the shared 3D frame, not inside each scene module.
- Treat the camera as a restrained tilt around a fixed composition target, not a free orbit camera.
- Clamp yaw and pitch aggressively so the piece still reads as the same graphic work.
- Preserve per-mode staging differences, but layer them underneath the shared drag view:
  - `3D Wiper Bars`: use drag angle to reveal slab thickness
  - `3D Glyph Field`: use drag angle to reveal glyph depth layers
  - `3D Stage`: merge the new drag angle with its existing stage framing so the camera does not fight itself

## File Boundaries
- `src/projects/wiper-typography/useWiperInteraction.ts`
  - owns the shared pointer state machine and outputs `phaseRef` plus `viewRef`
- `src/projects/wiper-typography/WiperTypographySceneFrame.tsx`
  - applies the shared drag-driven camera transform for all 3D modes
- `src/projects/wiper-typography/WiperTypographyCanvas2D.tsx`
  - keeps consuming only `phaseRef`
- `src/projects/wiper-typography/WiperTypographySceneBars3D.tsx`
  - inherits shared camera behavior without owning pointer logic
- `src/projects/wiper-typography/WiperTypographySceneGlyphField3D.tsx`
  - inherits shared camera behavior without owning pointer logic
- `src/projects/wiper-typography/WiperTypographySceneStage3D.tsx`
  - removes or reduces conflicting passive camera motion so drag angle remains primary
- `src/projects/wiper-typography/wiperConfig.ts`
  - may define clamp ranges and sensitivity constants for yaw/pitch
- `src/projects/wiper-typography/wiperMath.ts` or a focused helper module
  - may hold pure mapping/clamping helpers for drag-to-view math

## Data Flow
- Shared interaction layer computes:
  - current `phase`
  - current persistent `viewAngle`
  - whether the pointer is currently dragging the view
  - whether the current pointer path is touch or desktop
- 2D renderer consumes only `phase`.
- 3D frame consumes `phase` and `viewAngle`:
  - `phase` still drives bar simulation
  - `viewAngle` drives camera transform
- Scene modules keep consuming the shared simulation model and do not branch on pointer event details.

## Risks
- The desktop interaction may feel ambiguous if hover phase and drag view are not cleanly separated.
- Persistent view angle may make the composition feel stuck if the clamps are too wide or the defaults are poorly chosen.
- The stage mode may end up with double camera motion if the old passive bias is left too strong.
- Touch behavior could regress if the desktop split model leaks into the existing drag path.

## Mitigations
- Use a strict state machine so only one interaction channel is active at a time.
- Keep yaw/pitch limits narrow and tuned for readability rather than spectacle.
- Make the shared 3D frame the only place where camera motion is applied.
- Keep touch on the existing drag-to-wipe path and test it separately.

## Testing And Verification
- Add pure unit tests for the interaction behavior:
  - hover updates phase without changing view angle
  - desktop drag freezes phase and updates yaw/pitch
  - release preserves yaw/pitch
  - touch still drives phase instead of view angle
- Keep component tests for mode wiring so the 2D mode still ignores view state.
- Manually verify in browser:
  - desktop mouse move changes wipe only
  - desktop drag changes view only
  - release preserves the view angle
  - all three 3D modes share the same drag behavior
  - touch interaction still behaves like the current drag-to-wipe system
