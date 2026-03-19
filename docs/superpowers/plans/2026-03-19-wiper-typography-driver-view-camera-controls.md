# Wiper Typography Driver View Camera Controls Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add desktop drag-to-view and wheel-to-zoom controls to `wiper typography` `3D Driver View` while keeping the wiper sweep autoplay running and preserving existing touch behavior.

**Architecture:** Extend the existing shared interaction state instead of adding isolated scene-local listeners. Keep the pure drag and zoom mapping in the interaction helpers, then let `WiperTypographyDriverView3D.tsx` apply the resulting yaw, pitch, and `fov` adjustments on top of the tuned Tesla driver-view layout each frame.

**Tech Stack:** Next.js App Router, React 19 client components, TypeScript, React Three Fiber, Three.js, Framer Motion, Vitest, JSDOM, ESLint.

**Spec:** [`docs/superpowers/specs/2026-03-19-wiper-typography-driver-view-camera-controls-design.md`](/Users/yongminkim/Development/Portfolio/mimesis/docs/superpowers/specs/2026-03-19-wiper-typography-driver-view-camera-controls-design.md)

---

## File Structure

- Modify: [`src/projects/wiper-typography/wiperInteractionState.ts`](/Users/yongminkim/Development/Portfolio/mimesis/src/projects/wiper-typography/wiperInteractionState.ts)
  Add persistent zoom/FOV state and pure reducers for desktop drag and wheel zoom.
- Modify: [`src/projects/wiper-typography/wiperInteractionState.test.ts`](/Users/yongminkim/Development/Portfolio/mimesis/src/projects/wiper-typography/wiperInteractionState.test.ts)
  Cover persistent drag behavior, release behavior, zoom updates, and touch fallback.
- Modify: [`src/projects/wiper-typography/wiperView.ts`](/Users/yongminkim/Development/Portfolio/mimesis/src/projects/wiper-typography/wiperView.ts)
  Add any pure helpers needed for camera offset and wheel-to-FOV mapping.
- Modify: [`src/projects/wiper-typography/wiperView.test.ts`](/Users/yongminkim/Development/Portfolio/mimesis/src/projects/wiper-typography/wiperView.test.ts)
  Verify helper math for camera offsets and zoom mapping when added.
- Modify: [`src/projects/wiper-typography/useWiperInteraction.ts`](/Users/yongminkim/Development/Portfolio/mimesis/src/projects/wiper-typography/useWiperInteraction.ts)
  Wire pointer drag and wheel events into the shared interaction state and expose the new camera-control values.
- Modify: [`src/projects/wiper-typography/WiperTypographyDriverView3D.tsx`](/Users/yongminkim/Development/Portfolio/mimesis/src/projects/wiper-typography/WiperTypographyDriverView3D.tsx)
  Consume the interaction model and apply drag-based camera offsets plus wheel-driven `fov`.
- Modify: [`src/projects/wiper-typography/WiperTypographyDriverView3D.test.tsx`](/Users/yongminkim/Development/Portfolio/mimesis/src/projects/wiper-typography/WiperTypographyDriverView3D.test.tsx)
  Verify the driver view still renders and accepts the new interaction contract.

## Chunk 1: Pure Interaction Behavior

### Task 1: Add zoom/FOV state and pure reducers

**Files:**
- Modify: [`src/projects/wiper-typography/wiperInteractionState.ts`](/Users/yongminkim/Development/Portfolio/mimesis/src/projects/wiper-typography/wiperInteractionState.ts)
- Modify: [`src/projects/wiper-typography/wiperInteractionState.test.ts`](/Users/yongminkim/Development/Portfolio/mimesis/src/projects/wiper-typography/wiperInteractionState.test.ts)

- [ ] **Step 1: Write the failing test**

```ts
it("keeps autoplay phase free while desktop drag updates the view", () => {
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

  expect(dragged.pointerTargetPhase).toBeCloseTo(0.45);
  expect(dragged.view.yaw).not.toBe(0);
  expect(dragged.frozenPhase).toBeNull();
});

it("updates zoom through clamped fov changes", () => {
  const next = updateDesktopWheelZoom(createWiperInteractionState(), {
    deltaY: 240,
    fov: 36,
  });

  expect(next.fov).toBeGreaterThan(36);
  expect(next.fov).toBeLessThanOrEqual(DEFAULT_TESLA_DRIVER_VIEW_TUNING.fov + 20);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- src/projects/wiper-typography/wiperInteractionState.test.ts`
Expected: `FAIL` because the new drag and wheel zoom state does not exist yet.

- [ ] **Step 3: Write minimal implementation**

Add focused state to `WiperInteractionState`:

```ts
fov: number | null;
```

Add a pure wheel reducer:

```ts
export function updateDesktopWheelZoom(
  state: WiperInteractionState,
  input: { deltaY: number; fov: number }
): WiperInteractionState
```

Adjust desktop drag so it no longer freezes phase in the driver view path.

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- src/projects/wiper-typography/wiperInteractionState.test.ts`
Expected: `PASS`

## Chunk 2: Shared Hook Wiring

### Task 2: Expose wheel zoom and persistent camera state from the interaction hook

**Files:**
- Modify: [`src/projects/wiper-typography/useWiperInteraction.ts`](/Users/yongminkim/Development/Portfolio/mimesis/src/projects/wiper-typography/useWiperInteraction.ts)

- [ ] **Step 1: Write the failing test**

Add a focused hook wiring assertion in an existing interaction test or the driver-view test suite that expects the hook result to expose wheel handlers and current `fov`.

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- src/projects/wiper-typography/WiperTypographyDriverView3D.test.tsx`
Expected: `FAIL` because the hook contract is not yet wired for camera zoom.

- [ ] **Step 3: Write minimal implementation**

Expose:
- current `viewRef`
- current `fovRef` or equivalent
- `onWheel` in `dragLayerProps`

Keep touch behavior on the current phase path and keep autoplay independent from pointer input.

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- src/projects/wiper-typography/WiperTypographyDriverView3D.test.tsx`
Expected: `PASS`

## Chunk 3: Driver View Camera Application

### Task 3: Apply drag offsets and zoom in the Tesla driver view scene

**Files:**
- Modify: [`src/projects/wiper-typography/WiperTypographyDriverView3D.tsx`](/Users/yongminkim/Development/Portfolio/mimesis/src/projects/wiper-typography/WiperTypographyDriverView3D.tsx)
- Modify: [`src/projects/wiper-typography/WiperTypographyDriverView3D.test.tsx`](/Users/yongminkim/Development/Portfolio/mimesis/src/projects/wiper-typography/WiperTypographyDriverView3D.test.tsx)
- Modify: [`src/projects/wiper-typography/wiperView.ts`](/Users/yongminkim/Development/Portfolio/mimesis/src/projects/wiper-typography/wiperView.ts)
- Modify: [`src/projects/wiper-typography/wiperView.test.ts`](/Users/yongminkim/Development/Portfolio/mimesis/src/projects/wiper-typography/wiperView.test.ts)

- [ ] **Step 1: Write the failing test**

Add coverage that verifies:
- the driver view mounts the interaction layer
- drag/wheel handlers are attached to the overlay
- the scene still renders when the Tesla asset is available

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- src/projects/wiper-typography/WiperTypographyDriverView3D.test.tsx src/projects/wiper-typography/wiperView.test.ts`
Expected: `FAIL` because camera offset and zoom mapping are not implemented yet.

- [ ] **Step 3: Write minimal implementation**

Apply the user-controlled offsets additively:
- shift camera position/look target from the layout using clamped yaw/pitch
- update `PerspectiveCamera.fov` from the interaction state when available
- continue to clamp with `clampTeslaDriverViewFov`
- keep autoplay phase time-driven

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- src/projects/wiper-typography/WiperTypographyDriverView3D.test.tsx src/projects/wiper-typography/wiperView.test.ts`
Expected: `PASS`

- [ ] **Step 5: Run focused verification**

Run: `npm test -- src/projects/wiper-typography/wiperInteractionState.test.ts src/projects/wiper-typography/wiperView.test.ts src/projects/wiper-typography/WiperTypographyDriverView3D.test.tsx`
Expected: `PASS`

- [ ] **Step 6: Run lint**

Run: `npm run lint -- src/projects/wiper-typography/wiperInteractionState.ts src/projects/wiper-typography/useWiperInteraction.ts src/projects/wiper-typography/WiperTypographyDriverView3D.tsx`
Expected: `PASS`
