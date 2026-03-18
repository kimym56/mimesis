# Wiper Typography Driver View Framing Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Clamp the Tesla driver-view framing away from the current wide-angle extreme and keep projected glyphs inside the effective windshield bounds by default.

**Architecture:** Keep the current Tesla driver-view scene structure and fix the issue at the math and tuning boundaries instead of rebuilding the composition. Add a shared safe `FOV` range in the tuning layer, clamp runtime camera updates to that range, and inset glyph projection from the windshield edges based on the simulation field and glyph radius so the layout remains stable while lil-gui tuning still works.

**Tech Stack:** Next.js 16, React 19, TypeScript, React Three Fiber, Vitest, ESLint

---

## Chunk 1: Driver View Bounds

### Task 1: Add shared driver-view FOV bounds and a clamp helper

**Files:**
- Modify: `src/projects/wiper-typography/wiperTeslaDriverTuning.ts`
- Test: `src/projects/wiper-typography/wiperTeslaDriverLayout.test.ts`

- [ ] **Step 1: Write the failing tests**

Add focused coverage in `src/projects/wiper-typography/wiperTeslaDriverLayout.test.ts` for:

```ts
import { clampTeslaDriverViewFov } from "./wiperTeslaDriverTuning";

it("clamps driver view fov to the safe ceiling", () => {
  expect(clampTeslaDriverViewFov(999)).toBeLessThan(72);
});

it("clamps driver view fov to the safe floor", () => {
  expect(clampTeslaDriverViewFov(-1)).toBeGreaterThanOrEqual(24);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- src/projects/wiper-typography/wiperTeslaDriverLayout.test.ts`
Expected: FAIL because `clampTeslaDriverViewFov` does not exist yet.

- [ ] **Step 3: Write the minimal implementation**

In `src/projects/wiper-typography/wiperTeslaDriverTuning.ts`:

```ts
export const TESLA_DRIVER_VIEW_FOV_RANGE = {
  min: 24,
  max: 56,
} as const;

export function clampTeslaDriverViewFov(value: number) {
  return Math.min(TESLA_DRIVER_VIEW_FOV_RANGE.max, Math.max(TESLA_DRIVER_VIEW_FOV_RANGE.min, value));
}
```

Then update:
- `DEFAULT_TESLA_DRIVER_VIEW_TUNING.fov` to a value inside the range
- the GUI control for `FOV` to use `TESLA_DRIVER_VIEW_FOV_RANGE.min/max`

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- src/projects/wiper-typography/wiperTeslaDriverLayout.test.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/projects/wiper-typography/wiperTeslaDriverTuning.ts \
  src/projects/wiper-typography/wiperTeslaDriverLayout.test.ts
git commit -m "fix: clamp wiper driver view fov"
```

### Task 2: Apply the FOV clamp in the runtime camera update path

**Files:**
- Modify: `src/projects/wiper-typography/WiperTypographyDriverView3D.tsx`
- Test: `src/projects/wiper-typography/wiperTeslaDriverLayout.test.ts`

- [ ] **Step 1: Write the failing test**

Add pure coverage for the runtime-facing value path, either by:
- reusing `clampTeslaDriverViewFov` directly in the existing test file, or
- extracting a tiny helper from `WiperTypographyDriverView3D.tsx` if needed

Use an assertion like:

```ts
expect(clampTeslaDriverViewFov(80)).toBe(56);
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- src/projects/wiper-typography/wiperTeslaDriverLayout.test.ts`
Expected: FAIL until the runtime path uses the shared clamp.

- [ ] **Step 3: Write the minimal implementation**

In `src/projects/wiper-typography/WiperTypographyDriverView3D.tsx`:
- import `clampTeslaDriverViewFov`
- clamp `tuning.fov` before assigning it to `perspectiveCamera.fov`
- clamp the initial Canvas camera `fov` as well

Example target shape:

```ts
const clampedFov = clampTeslaDriverViewFov(tuning.fov);

if (perspectiveCamera.fov !== clampedFov) {
  perspectiveCamera.fov = clampedFov;
  perspectiveCamera.updateProjectionMatrix();
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- src/projects/wiper-typography/wiperTeslaDriverLayout.test.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/projects/wiper-typography/WiperTypographyDriverView3D.tsx \
  src/projects/wiper-typography/wiperTeslaDriverLayout.test.ts
git commit -m "fix: apply driver view fov bounds"
```

## Chunk 2: Windshield Safe Area

### Task 3: Add a glyph safe-area projection helper

**Files:**
- Modify: `src/projects/wiper-typography/wiperTeslaDriverLayout.ts`
- Modify: `src/projects/wiper-typography/wiperTeslaDriverLayout.test.ts`

- [ ] **Step 1: Write the failing tests**

Add edge-case assertions in `src/projects/wiper-typography/wiperTeslaDriverLayout.test.ts` that prove glyph centers stay inside the visible bounds:

```ts
const leftEdge = projectTeslaDriverGlyphPosition(layout, 0, 0.5);
const rightEdge = projectTeslaDriverGlyphPosition(layout, 1, 0.5);

expect(leftEdge[0]).toBeGreaterThan(layout.windscreenCenter[0] - layout.glyphVisibleWidth * 0.5);
expect(rightEdge[0]).toBeLessThan(layout.windscreenCenter[0] + layout.glyphVisibleWidth * 0.5);
```

Also add a top/bottom version so the vertical safe area is covered.

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- src/projects/wiper-typography/wiperTeslaDriverLayout.test.ts`
Expected: FAIL because the current projection maps extreme normalized values directly to the edge.

- [ ] **Step 3: Write the minimal implementation**

In `src/projects/wiper-typography/wiperTeslaDriverLayout.ts`:
- add a small helper that clamps normalized `x` and `y` into a safe inset
- derive the inset from the simulation field and glyph radius rather than a fixed world-space margin
- use the safe normalized values inside `projectTeslaDriverGlyphPosition`

Target shape:

```ts
function clampGlyphCoordinate(value: number, inset: number) {
  return Math.min(1 - inset, Math.max(inset, value));
}
```

Then compute inset ratios from the known simulation field and use them before:

```ts
const xOffset = (safeX - 0.5) * layout.glyphVisibleWidth;
const yOffset = (layout.glyphYBias - safeY) * layout.glyphVisibleHeight;
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- src/projects/wiper-typography/wiperTeslaDriverLayout.test.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/projects/wiper-typography/wiperTeslaDriverLayout.ts \
  src/projects/wiper-typography/wiperTeslaDriverLayout.test.ts
git commit -m "fix: keep wiper glyphs inside windshield"
```

### Task 4: Verify the integrated driver-view path and lint the touched files

**Files:**
- Modify: `src/projects/wiper-typography/WiperTypographyDriverView3D.tsx`
- Modify: `src/projects/wiper-typography/wiperTeslaDriverLayout.ts`
- Modify: `src/projects/wiper-typography/wiperTeslaDriverTuning.ts`
- Test: `src/projects/wiper-typography/wiperTeslaDriverLayout.test.ts`

- [ ] **Step 1: Run the focused unit tests**

Run: `npm test -- src/projects/wiper-typography/wiperTeslaDriverLayout.test.ts`
Expected: PASS

- [ ] **Step 2: Run lint on the touched driver-view files**

Run: `npm run lint -- src/projects/wiper-typography/WiperTypographyDriverView3D.tsx src/projects/wiper-typography/wiperTeslaDriverLayout.ts src/projects/wiper-typography/wiperTeslaDriverTuning.ts src/projects/wiper-typography/wiperTeslaDriverLayout.test.ts`
Expected: PASS

- [ ] **Step 3: Fix any issues discovered**

If either command fails, make the smallest change required and rerun the failed command until it passes.

- [ ] **Step 4: Commit the integrated fix**

```bash
git add src/projects/wiper-typography/WiperTypographyDriverView3D.tsx \
  src/projects/wiper-typography/wiperTeslaDriverLayout.ts \
  src/projects/wiper-typography/wiperTeslaDriverTuning.ts \
  src/projects/wiper-typography/wiperTeslaDriverLayout.test.ts
git commit -m "fix: tighten wiper driver view framing"
```
