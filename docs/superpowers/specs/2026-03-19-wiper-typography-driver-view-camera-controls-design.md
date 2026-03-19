# Wiper Typography Driver View Camera Controls Design

## Goal
Add direct desktop camera controls to the `wiper typography` `3D Driver View` so drag changes the viewpoint and wheel or trackpad scroll changes zoom, while the wiper animation keeps autoplaying.

## Approved Constraints
- Apply the new behavior only to `3D Driver View`.
- Desktop drag changes the camera view instead of changing wiper phase.
- Desktop wheel or trackpad scroll changes zoom.
- The wiper animation must keep autoplaying while drag and zoom happen.
- Keep touch on the current drag-to-phase path for now.
- Reuse the existing safe driver-view framing and FOV clamp ranges instead of introducing full orbit controls.

## Interaction Model

### Desktop
- `pointer drag`
  - starts a camera-view drag from the current yaw and pitch
  - updates yaw and pitch from pointer delta
  - keeps the final yaw and pitch after release
- `wheel` / `trackpad scroll`
  - updates zoom by changing camera `fov`
  - clamps `fov` through the existing driver-view clamp helper
  - should work without interrupting autoplay
- `hover`
  - no longer needs to drive phase in `3D Driver View`
  - should not reset camera state

### Touch
- Keep the existing drag-to-phase behavior unchanged.
- Do not add pinch-to-zoom or touch camera drag in this change.

## Architecture
- Extend the shared `useWiperInteraction` state so the driver view can consume:
  - persistent `yaw`
  - persistent `pitch`
  - persistent `zoom` or `fov`
  - drag state
- Keep the driver-view-specific camera application in `WiperTypographyDriverView3D.tsx`, because that scene already owns the Tesla layout camera and safe FOV rules.
- Keep the pure mapping logic in small helper/state modules so drag and wheel behavior are testable without React or Three.

## File Boundaries
- `src/projects/wiper-typography/useWiperInteraction.ts`
  - extend interaction outputs and event wiring to support desktop camera drag plus wheel zoom
- `src/projects/wiper-typography/wiperInteractionState.ts`
  - add pure state transitions for drag-view updates and zoom updates
- `src/projects/wiper-typography/wiperInteractionState.test.ts`
  - cover persistent drag state and zoom clamping behavior
- `src/projects/wiper-typography/wiperView.ts`
  - keep pure drag-to-view math and add any zoom helper needed
- `src/projects/wiper-typography/wiperView.test.ts`
  - cover the zoom helper if added there
- `src/projects/wiper-typography/WiperTypographyDriverView3D.tsx`
  - consume the shared interaction model and apply yaw, pitch, and `fov` to the Tesla driver-view camera
- `src/projects/wiper-typography/WiperTypographyDriverView3D.test.tsx`
  - verify the driver view mounts the interaction layer and keeps the driver-view experience intact

## Data Flow
- Interaction state owns current drag state, camera view angle, and zoom/FOV.
- `WiperTypographyDriverView3D.tsx` reads that interaction state each frame.
- The driver-view renderer combines:
  - Tesla layout camera position/look target
  - user drag yaw/pitch offsets
  - user zoom-derived `fov`
- Wiper autoplay remains time-driven and independent from pointer input.

## Risks
- Mixing scene-layout camera tuning with user-controlled offsets could break the approved framing if the offsets are too large.
- Wheel sensitivity could feel jumpy on trackpads if the delta mapping is too raw.
- Shared interaction changes could accidentally regress touch behavior used elsewhere.

## Mitigations
- Clamp drag yaw/pitch tightly and keep the offsets additive on top of the tuned driver-view camera.
- Normalize wheel deltas into a narrow `fov` adjustment step and pass every update through `clampTeslaDriverViewFov`.
- Keep touch-specific logic on the existing phase path and cover it with focused interaction-state tests.

## Testing And Verification
- Add or update pure unit tests for:
  - desktop drag updating persistent view angle
  - drag release preserving the final view
  - wheel zoom changing `fov` within the safe clamp range
  - touch drag still staying on the legacy phase path
- Add component-level coverage for the driver-view wiring where practical.
- Manually verify:
  - `3D Driver View` still autoplays the wipers
  - desktop drag moves the view
  - wheel or trackpad scroll changes zoom
  - zoom stays within a stable framing range
  - touch still behaves like the current drag-to-phase experience
