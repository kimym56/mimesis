# Wiper Typography 3D View-Drag Interaction Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Update the three `wiper typography` 3D modes so desktop hover keeps driving the wipe bars, desktop drag controls persistent camera yaw/pitch, and touch devices keep the current drag-to-wipe behavior.

**Architecture:** Keep one shared interaction controller, but split its output into `phaseRef` and `viewRef`. Put all drag-to-camera behavior in a pure interaction state layer plus a shared camera rig in `WiperTypographySceneFrame`, so the 3D scenes inherit the same behavior automatically and the 2D renderer can stay on the legacy phase-only path.

**Tech Stack:** Next.js App Router, React 19 client components, TypeScript, React Three Fiber, Drei, Three.js, Vitest, JSDOM, ESLint.

**Spec:** [`docs/superpowers/specs/2026-03-15-wiper-typography-3d-view-drag-design.md`](/Users/yongminkim/Development/Portfolio/mimesis/docs/superpowers/specs/2026-03-15-wiper-typography-3d-view-drag-design.md)

---

## File Structure

- Create: [`src/projects/wiper-typography/wiperView.ts`](/Users/yongminkim/Development/Portfolio/mimesis/src/projects/wiper-typography/wiperView.ts)  
  Pure helpers for yaw/pitch clamping, drag delta mapping, and shared camera rig math.
- Create: [`src/projects/wiper-typography/wiperView.test.ts`](/Users/yongminkim/Development/Portfolio/mimesis/src/projects/wiper-typography/wiperView.test.ts)  
  Unit tests for view-angle mapping and camera rig output.
- Create: [`src/projects/wiper-typography/wiperInteractionState.ts`](/Users/yongminkim/Development/Portfolio/mimesis/src/projects/wiper-typography/wiperInteractionState.ts)  
  Pure reducer-style helpers for desktop hover-vs-drag behavior and touch fallback behavior.
- Create: [`src/projects/wiper-typography/wiperInteractionState.test.ts`](/Users/yongminkim/Development/Portfolio/mimesis/src/projects/wiper-typography/wiperInteractionState.test.ts)  
  Unit tests for desktop hover, desktop drag, release persistence, and touch legacy mode.
- Modify: [`src/projects/wiper-typography/wiperConfig.ts`](/Users/yongminkim/Development/Portfolio/mimesis/src/projects/wiper-typography/wiperConfig.ts)  
  Add yaw/pitch clamp and drag sensitivity constants.
- Modify: [`src/projects/wiper-typography/useWiperInteraction.ts`](/Users/yongminkim/Development/Portfolio/mimesis/src/projects/wiper-typography/useWiperInteraction.ts)  
  Wire pointer events to the pure state helpers and expose `viewRef` plus explicit interaction mode options.
- Create: [`src/projects/wiper-typography/WiperTypographyInteractionWiring.test.tsx`](/Users/yongminkim/Development/Portfolio/mimesis/src/projects/wiper-typography/WiperTypographyInteractionWiring.test.tsx)  
  Verifies that 2D uses the legacy phase-only hook mode and 3D frame uses the desktop split-view mode.
- Modify: [`src/projects/wiper-typography/WiperTypographySceneFrame.tsx`](/Users/yongminkim/Development/Portfolio/mimesis/src/projects/wiper-typography/WiperTypographySceneFrame.tsx)  
  Apply the shared camera rig from `viewRef` and optionally merge stage bias in one place.
- Modify: [`src/projects/wiper-typography/WiperTypographySceneStage3D.tsx`](/Users/yongminkim/Development/Portfolio/mimesis/src/projects/wiper-typography/WiperTypographySceneStage3D.tsx)  
  Remove direct camera mutation and hand stage-specific framing back to the shared frame.
- Modify: [`src/projects/wiper-typography/WiperTypographySceneBars3D.tsx`](/Users/yongminkim/Development/Portfolio/mimesis/src/projects/wiper-typography/WiperTypographySceneBars3D.tsx)  
  Consume the updated frame contract only.
- Modify: [`src/projects/wiper-typography/WiperTypographySceneGlyphField3D.tsx`](/Users/yongminkim/Development/Portfolio/mimesis/src/projects/wiper-typography/WiperTypographySceneGlyphField3D.tsx)  
  Consume the updated frame contract only.
- Modify: [`src/projects/wiper-typography/WiperTypographyCanvas2D.tsx`](/Users/yongminkim/Development/Portfolio/mimesis/src/projects/wiper-typography/WiperTypographyCanvas2D.tsx)  
  Opt into the legacy phase-only interaction mode explicitly.

## Chunk 1: Pure View And Interaction State

### Task 1: Add pure view-angle math and camera rig helpers

**Files:**
- Create: [`src/projects/wiper-typography/wiperView.ts`](/Users/yongminkim/Development/Portfolio/mimesis/src/projects/wiper-typography/wiperView.ts)
- Create: [`src/projects/wiper-typography/wiperView.test.ts`](/Users/yongminkim/Development/Portfolio/mimesis/src/projects/wiper-typography/wiperView.test.ts)
- Modify: [`src/projects/wiper-typography/wiperConfig.ts`](/Users/yongminkim/Development/Portfolio/mimesis/src/projects/wiper-typography/wiperConfig.ts)

- [ ] **Step 1: Write the failing test**

```ts
it("maps desktop drag delta into clamped yaw and pitch", () => {
  const view = mapDragDeltaToViewAngle(
    { yaw: 0.1, pitch: -0.05 },
    { deltaX: 600, deltaY: -400, width: 1200, height: 800 }
  );

  expect(view.yaw).toBeLessThanOrEqual(WIPER_MAX_VIEW_YAW);
  expect(view.pitch).toBeGreaterThanOrEqual(-WIPER_MAX_VIEW_PITCH);
});

it("builds a restrained camera pose from view angle and stage bias", () => {
  const pose = computeWiperCameraPose({
    view: { yaw: 0.2, pitch: -0.1 },
    phaseBias: { x: 0.08, y: 0.02 },
    distance: 6,
  });

  expect(pose.position[2]).toBe(6);
  expect(Math.abs(pose.lookAt[0])).toBeGreaterThan(0);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- src/projects/wiper-typography/wiperView.test.ts`  
Expected: `FAIL` because `mapDragDeltaToViewAngle` and `computeWiperCameraPose` do not exist yet.

- [ ] **Step 3: Write minimal implementation**

```ts
export interface WiperViewAngle {
  yaw: number;
  pitch: number;
}

export function mapDragDeltaToViewAngle(
  origin: WiperViewAngle,
  input: { deltaX: number; deltaY: number; width: number; height: number }
): WiperViewAngle {
  const nextYaw =
    origin.yaw + (input.deltaX / Math.max(1, input.width)) * WIPER_VIEW_YAW_SENSITIVITY;
  const nextPitch =
    origin.pitch - (input.deltaY / Math.max(1, input.height)) * WIPER_VIEW_PITCH_SENSITIVITY;

  return {
    yaw: clamp(nextYaw, -WIPER_MAX_VIEW_YAW, WIPER_MAX_VIEW_YAW),
    pitch: clamp(nextPitch, -WIPER_MAX_VIEW_PITCH, WIPER_MAX_VIEW_PITCH),
  };
}
```

Add matching constants to [`src/projects/wiper-typography/wiperConfig.ts`](/Users/yongminkim/Development/Portfolio/mimesis/src/projects/wiper-typography/wiperConfig.ts):

```ts
export const WIPER_MAX_VIEW_YAW = 0.42;
export const WIPER_MAX_VIEW_PITCH = 0.26;
export const WIPER_VIEW_YAW_SENSITIVITY = 1.1;
export const WIPER_VIEW_PITCH_SENSITIVITY = 0.9;
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- src/projects/wiper-typography/wiperView.test.ts`  
Expected: `PASS`

- [ ] **Step 5: Commit**

```bash
git add src/projects/wiper-typography/wiperConfig.ts \
  src/projects/wiper-typography/wiperView.ts \
  src/projects/wiper-typography/wiperView.test.ts
git commit -m "feat: add wiper 3d view math"
```

### Task 2: Add a pure interaction state machine for desktop split mode and touch fallback

**Files:**
- Create: [`src/projects/wiper-typography/wiperInteractionState.ts`](/Users/yongminkim/Development/Portfolio/mimesis/src/projects/wiper-typography/wiperInteractionState.ts)
- Create: [`src/projects/wiper-typography/wiperInteractionState.test.ts`](/Users/yongminkim/Development/Portfolio/mimesis/src/projects/wiper-typography/wiperInteractionState.test.ts)

- [ ] **Step 1: Write the failing test**

```ts
it("updates phase on desktop hover without changing view", () => {
  const state = createWiperInteractionState();
  const next = handleDesktopHoverMove(state, { pointerX: 700, width: 1000, margin: 0 });

  expect(next.pointerTargetPhase).toBeCloseTo(0.7);
  expect(next.view.yaw).toBe(0);
});

it("freezes phase and updates view during desktop drag", () => {
  const pressed = beginDesktopViewDrag(createWiperInteractionState(), {
    pointerX: 300,
    pointerY: 200,
    phase: 0.45,
  });
  const dragged = updateDesktopViewDrag(pressed, {
    pointerX: 650,
    pointerY: 120,
    width: 1000,
    height: 600,
  });

  expect(dragged.frozenPhase).toBeCloseTo(0.45);
  expect(dragged.pointerTargetPhase).toBeCloseTo(0.45);
  expect(dragged.view.yaw).not.toBe(0);
});

it("keeps the view angle after desktop drag release", () => {
  const released = endDesktopViewDrag({
    ...createWiperInteractionState(),
    isDraggingView: true,
    view: { yaw: 0.2, pitch: -0.1 },
  });

  expect(released.isDraggingView).toBe(false);
  expect(released.view).toEqual({ yaw: 0.2, pitch: -0.1 });
});

it("keeps touch pointer moves on the legacy drag-to-phase path", () => {
  const primed = primeTouchPhaseDrag(createWiperInteractionState(), {
    pointerX: 200,
    phase: 0.25,
  });
  const next = updateTouchPhaseDrag(primed, {
    pointerX: 500,
    width: 1000,
    margin: 0,
  });

  expect(next.pointerTargetPhase).toBeGreaterThan(0.25);
  expect(next.view).toEqual({ yaw: 0, pitch: 0 });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- src/projects/wiper-typography/wiperInteractionState.test.ts`  
Expected: `FAIL` because the state helpers do not exist yet.

- [ ] **Step 3: Write minimal implementation**

Create an explicit state type:

```ts
export interface WiperInteractionState {
  pointerTargetPhase: number;
  frozenPhase: number | null;
  isDraggingView: boolean;
  dragStartX: number;
  dragStartY: number;
  dragStartView: WiperViewAngle;
  view: WiperViewAngle;
}
```

Keep the functions small and single-purpose:
- `createWiperInteractionState`
- `handleDesktopHoverMove`
- `beginDesktopViewDrag`
- `updateDesktopViewDrag`
- `endDesktopViewDrag`
- `primeTouchPhaseDrag`
- `updateTouchPhaseDrag`

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- src/projects/wiper-typography/wiperInteractionState.test.ts`  
Expected: `PASS`

- [ ] **Step 5: Run focused verification**

Run: `npm test -- src/projects/wiper-typography/wiperView.test.ts src/projects/wiper-typography/wiperInteractionState.test.ts`  
Expected: `PASS`

- [ ] **Step 6: Commit**

```bash
git add src/projects/wiper-typography/wiperInteractionState.ts \
  src/projects/wiper-typography/wiperInteractionState.test.ts
git commit -m "feat: add split desktop wiper interaction state"
```

## Chunk 2: Hook And Frame Wiring

### Task 3: Refactor the shared interaction hook to expose `viewRef`

**Files:**
- Modify: [`src/projects/wiper-typography/useWiperInteraction.ts`](/Users/yongminkim/Development/Portfolio/mimesis/src/projects/wiper-typography/useWiperInteraction.ts)

- [ ] **Step 1: Write the failing test**

Create a thin hook-harness assertion in a new or existing test file:

```ts
it("keeps phase fixed while desktop view drag is active", () => {
  const state = createWiperInteractionState();
  const pressed = beginDesktopViewDrag(state, { pointerX: 400, pointerY: 300, phase: 0.5 });
  const dragged = updateDesktopViewDrag(pressed, {
    pointerX: 800,
    pointerY: 100,
    width: 1200,
    height: 800,
  });

  expect(dragged.pointerTargetPhase).toBeCloseTo(0.5);
});
```

Use the same test file if that keeps the assertion near the state logic; do not create a hook-only test until the pure state tests are insufficient.

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- src/projects/wiper-typography/wiperInteractionState.test.ts`  
Expected: `FAIL` until the hook-facing state is complete enough to support the new contract.

- [ ] **Step 3: Write minimal implementation**

Update the hook contract:

```ts
export interface WiperViewRefValue {
  yaw: number;
  pitch: number;
  isDraggingView: boolean;
}

interface UseWiperInteractionOptions {
  margin?: number;
  interactionMode?: "legacy-phase" | "desktop-view-drag";
}
```

Add `viewRef` to the return model, then:
- keep `interactionMode: "legacy-phase"` as the default for 2D
- in `"desktop-view-drag"` mode:
  - hover updates `pointerTargetPhase`
  - desktop `pointerdown` starts a view drag
  - desktop drag updates `viewRef`
  - touch still uses phase dragging

Add the needed event handlers:
- `onPointerDown`
- `onPointerUp`
- `onPointerCancel`

and keep `onPointerMove` branching by `event.pointerType`.

- [ ] **Step 4: Run focused verification**

Run: `npm test -- src/projects/wiper-typography/wiperInteractionState.test.ts src/projects/wiper-typography/wiperPhase.test.ts`  
Expected: `PASS`

Run: `npm run lint -- src/projects/wiper-typography/useWiperInteraction.ts src/projects/wiper-typography/wiperInteractionState.ts src/projects/wiper-typography/wiperView.ts`  
Expected: no lint errors

- [ ] **Step 5: Commit**

```bash
git add src/projects/wiper-typography/useWiperInteraction.ts
git commit -m "feat: expose wiper 3d view state"
```

### Task 4: Move all 3D camera motion into the shared frame

**Files:**
- Modify: [`src/projects/wiper-typography/WiperTypographySceneFrame.tsx`](/Users/yongminkim/Development/Portfolio/mimesis/src/projects/wiper-typography/WiperTypographySceneFrame.tsx)
- Modify: [`src/projects/wiper-typography/WiperTypographySceneStage3D.tsx`](/Users/yongminkim/Development/Portfolio/mimesis/src/projects/wiper-typography/WiperTypographySceneStage3D.tsx)
- Modify: [`src/projects/wiper-typography/WiperTypographySceneBars3D.tsx`](/Users/yongminkim/Development/Portfolio/mimesis/src/projects/wiper-typography/WiperTypographySceneBars3D.tsx)
- Modify: [`src/projects/wiper-typography/WiperTypographySceneGlyphField3D.tsx`](/Users/yongminkim/Development/Portfolio/mimesis/src/projects/wiper-typography/WiperTypographySceneGlyphField3D.tsx)

- [ ] **Step 1: Write the failing test**

Add a pure camera-rig assertion in [`src/projects/wiper-typography/wiperView.test.ts`](/Users/yongminkim/Development/Portfolio/mimesis/src/projects/wiper-typography/wiperView.test.ts):

```ts
it("keeps stage phase bias and drag angle in one shared camera pose", () => {
  const pose = computeWiperCameraPose({
    view: { yaw: 0.18, pitch: -0.08 },
    phaseBias: { x: 0.06, y: 0.01 },
    distance: 6,
  });

  expect(pose.position[0]).toBeGreaterThan(0);
  expect(pose.position[1]).toBeGreaterThan(0);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- src/projects/wiper-typography/wiperView.test.ts`  
Expected: `FAIL` until the camera pose composition is implemented.

- [ ] **Step 3: Write minimal implementation**

In [`src/projects/wiper-typography/WiperTypographySceneFrame.tsx`](/Users/yongminkim/Development/Portfolio/mimesis/src/projects/wiper-typography/WiperTypographySceneFrame.tsx):
- call `useWiperInteraction({ margin: 0, interactionMode: "desktop-view-drag" })`
- expose `viewRef` to a new internal `CameraRig` component
- apply camera position/look-at from `computeWiperCameraPose(...)`

Add a frame prop for stage bias, for example:

```ts
cameraBias?: (phase: number) => { x: number; y: number };
```

Then:
- `3D Wiper Bars` and `3D Glyph Field` use the default zero bias
- `3D Stage` passes a phase bias function and removes its direct `state.camera` mutation block

- [ ] **Step 4: Run focused verification**

Run: `npm test -- src/projects/wiper-typography/wiperView.test.ts src/projects/wiper-typography/WiperTypographyProject.test.tsx`  
Expected: `PASS`

Run: `npm run lint -- src/projects/wiper-typography/WiperTypographySceneFrame.tsx src/projects/wiper-typography/WiperTypographySceneStage3D.tsx src/projects/wiper-typography/WiperTypographySceneBars3D.tsx src/projects/wiper-typography/WiperTypographySceneGlyphField3D.tsx`  
Expected: no lint errors

- [ ] **Step 5: Commit**

```bash
git add src/projects/wiper-typography/WiperTypographySceneFrame.tsx \
  src/projects/wiper-typography/WiperTypographySceneStage3D.tsx \
  src/projects/wiper-typography/WiperTypographySceneBars3D.tsx \
  src/projects/wiper-typography/WiperTypographySceneGlyphField3D.tsx
git commit -m "feat: add shared drag camera rig for wiper 3d scenes"
```

## Chunk 3: Mode Wiring, Verification, And Handoff

### Task 5: Make the 2D/3D interaction split explicit and test the wiring

**Files:**
- Modify: [`src/projects/wiper-typography/WiperTypographyCanvas2D.tsx`](/Users/yongminkim/Development/Portfolio/mimesis/src/projects/wiper-typography/WiperTypographyCanvas2D.tsx)
- Create: [`src/projects/wiper-typography/WiperTypographyInteractionWiring.test.tsx`](/Users/yongminkim/Development/Portfolio/mimesis/src/projects/wiper-typography/WiperTypographyInteractionWiring.test.tsx)

- [ ] **Step 1: Write the failing test**

```tsx
it("uses legacy phase interaction for 2d and desktop split interaction for 3d", () => {
  expect(mockedUseWiperInteraction).toHaveBeenNthCalledWith(
    1,
    expect.objectContaining({ interactionMode: "legacy-phase" })
  );
  expect(mockedUseWiperInteraction).toHaveBeenNthCalledWith(
    2,
    expect.objectContaining({ interactionMode: "desktop-view-drag" })
  );
});
```

Mock `useWiperInteraction`, render [`src/projects/wiper-typography/WiperTypographyCanvas2D.tsx`](/Users/yongminkim/Development/Portfolio/mimesis/src/projects/wiper-typography/WiperTypographyCanvas2D.tsx), then render a minimal [`src/projects/wiper-typography/WiperTypographySceneFrame.tsx`](/Users/yongminkim/Development/Portfolio/mimesis/src/projects/wiper-typography/WiperTypographySceneFrame.tsx) shell.

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- src/projects/wiper-typography/WiperTypographyInteractionWiring.test.tsx`  
Expected: `FAIL` because the explicit interaction modes are not wired yet.

- [ ] **Step 3: Write minimal implementation**

In [`src/projects/wiper-typography/WiperTypographyCanvas2D.tsx`](/Users/yongminkim/Development/Portfolio/mimesis/src/projects/wiper-typography/WiperTypographyCanvas2D.tsx):

```ts
const interaction = useWiperInteraction({
  margin: 0,
  interactionMode: "legacy-phase",
});
```

In [`src/projects/wiper-typography/WiperTypographySceneFrame.tsx`](/Users/yongminkim/Development/Portfolio/mimesis/src/projects/wiper-typography/WiperTypographySceneFrame.tsx):

```ts
const interaction = useWiperInteraction({
  margin: 0,
  interactionMode: "desktop-view-drag",
});
```

- [ ] **Step 4: Run full verification**

Run: `npm test`  
Expected: all tests pass

Run: `npm run lint -- src/projects/wiper-typography`  
Expected: no lint errors

Run: `npm run build`  
Expected: successful production build

- [ ] **Step 5: Manual verification**

Verify in browser:
- desktop hover in all 3D modes still moves the wipe only
- desktop drag in all 3D modes changes view angle only
- releasing drag preserves the final view angle
- touch drag still changes wipe phase instead of view angle
- 2D mode behaves exactly as before

- [ ] **Step 6: Commit**

```bash
git add src/projects/wiper-typography/WiperTypographyCanvas2D.tsx \
  src/projects/wiper-typography/WiperTypographyInteractionWiring.test.tsx
git commit -m "feat: split wiper 2d and 3d interaction modes"
```
