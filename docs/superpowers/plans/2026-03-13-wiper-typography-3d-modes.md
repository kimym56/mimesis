# Wiper Typography 3D Modes Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Expand `wiper typography` into a four-mode interactive project with the existing `2D Canvas` renderer plus three faithful 3D variants that share one drag-driven phase model.

**Architecture:** Keep [`src/projects/wiper-typography/WiperTypographyProject.tsx`](/Users/yongminkim/Development/Portfolio/mimesis/src/projects/wiper-typography/WiperTypographyProject.tsx) as the shell with a mode toggle. Move reusable constants, geometry math, and phase stepping into shared modules, keep the 2D renderer isolated, and build three React Three Fiber scene modules on top of a shared 3D frame wrapper. Follow @superpowers/test-driven-development for new math/behavior and @vercel-react-best-practices when deciding whether to lazy-load heavy 3D modules.

**Tech Stack:** Next.js App Router, React 19 client components, TypeScript, Canvas 2D, React Three Fiber, Drei, Three.js, Vitest, JSDOM, ESLint.

**Spec:** [`docs/superpowers/specs/2026-03-13-wiper-typography-3d-design.md`](/Users/yongminkim/Development/Portfolio/mimesis/docs/superpowers/specs/2026-03-13-wiper-typography-3d-design.md)

---

## File Structure

- Create: [`src/projects/wiper-typography/wiperConfig.ts`](/Users/yongminkim/Development/Portfolio/mimesis/src/projects/wiper-typography/wiperConfig.ts)  
  Shared constants for colors, glyphs, line width, depth limits, autoplay speed, and particle budgets.
- Create: [`src/projects/wiper-typography/wiperPhase.ts`](/Users/yongminkim/Development/Portfolio/mimesis/src/projects/wiper-typography/wiperPhase.ts)  
  Pure autoplay/drag phase helpers so interaction behavior is testable without DOM APIs.
- Create: [`src/projects/wiper-typography/wiperPhase.test.ts`](/Users/yongminkim/Development/Portfolio/mimesis/src/projects/wiper-typography/wiperPhase.test.ts)  
  Unit coverage for idle autoplay, pointer chasing, and autoplay resync after pointer leave.
- Create: [`src/projects/wiper-typography/useWiperInteraction.ts`](/Users/yongminkim/Development/Portfolio/mimesis/src/projects/wiper-typography/useWiperInteraction.ts)  
  Thin React hook that wires ResizeObserver, pointer events, and refs around the tested helpers.
- Create: [`src/projects/wiper-typography/WiperTypographyCanvas2D.tsx`](/Users/yongminkim/Development/Portfolio/mimesis/src/projects/wiper-typography/WiperTypographyCanvas2D.tsx)  
  Extracted baseline 2D renderer.
- Create: [`src/projects/wiper-typography/WiperTypographyModeToggle.tsx`](/Users/yongminkim/Development/Portfolio/mimesis/src/projects/wiper-typography/WiperTypographyModeToggle.tsx)  
  Presentational toggle for the four renderer modes.
- Create: [`src/projects/wiper-typography/WiperTypographySceneFrame.tsx`](/Users/yongminkim/Development/Portfolio/mimesis/src/projects/wiper-typography/WiperTypographySceneFrame.tsx)  
  Shared React Three Fiber canvas frame, stage overlay, camera, and common lights.
- Create: [`src/projects/wiper-typography/WiperTypographySceneBars3D.tsx`](/Users/yongminkim/Development/Portfolio/mimesis/src/projects/wiper-typography/WiperTypographySceneBars3D.tsx)  
  Extruded wiper-blade variant.
- Create: [`src/projects/wiper-typography/WiperTypographySceneGlyphField3D.tsx`](/Users/yongminkim/Development/Portfolio/mimesis/src/projects/wiper-typography/WiperTypographySceneGlyphField3D.tsx)  
  Layered glyph-field variant.
- Create: [`src/projects/wiper-typography/WiperTypographySceneStage3D.tsx`](/Users/yongminkim/Development/Portfolio/mimesis/src/projects/wiper-typography/WiperTypographySceneStage3D.tsx)  
  Shallow perspective-stage variant.
- Create: [`src/projects/wiper-typography/WiperTypographyProject.test.tsx`](/Users/yongminkim/Development/Portfolio/mimesis/src/projects/wiper-typography/WiperTypographyProject.test.tsx)  
  DOM-based toggle tests using mocked renderers.
- Modify: [`src/projects/wiper-typography/WiperTypographyProject.tsx`](/Users/yongminkim/Development/Portfolio/mimesis/src/projects/wiper-typography/WiperTypographyProject.tsx)
- Modify: [`src/projects/wiper-typography/WiperTypographyProject.module.css`](/Users/yongminkim/Development/Portfolio/mimesis/src/projects/wiper-typography/WiperTypographyProject.module.css)
- Modify: [`src/projects/wiper-typography/wiperMath.ts`](/Users/yongminkim/Development/Portfolio/mimesis/src/projects/wiper-typography/wiperMath.ts)
- Modify: [`src/projects/wiper-typography/wiperMath.test.ts`](/Users/yongminkim/Development/Portfolio/mimesis/src/projects/wiper-typography/wiperMath.test.ts)
- Modify: [`package.json`](/Users/yongminkim/Development/Portfolio/mimesis/package.json)
- Modify: [`package-lock.json`](/Users/yongminkim/Development/Portfolio/mimesis/package-lock.json)

## Chunk 1: Shared Motion Model

### Task 1: Add shared geometry/config math

**Files:**
- Create: [`src/projects/wiper-typography/wiperConfig.ts`](/Users/yongminkim/Development/Portfolio/mimesis/src/projects/wiper-typography/wiperConfig.ts)
- Modify: [`src/projects/wiper-typography/wiperMath.ts`](/Users/yongminkim/Development/Portfolio/mimesis/src/projects/wiper-typography/wiperMath.ts)
- Modify: [`src/projects/wiper-typography/wiperMath.test.ts`](/Users/yongminkim/Development/Portfolio/mimesis/src/projects/wiper-typography/wiperMath.test.ts)

- [ ] **Step 1: Write the failing test**

```ts
it("derives line counts and dimensions consistently for 2D and 3D scenes", () => {
  expect(computeLineCount(660, 22)).toBe(36);
  expect(computeLineDimensions(0, 22)).toEqual({ width: 22, height: 22 });
  expect(computeLineDimensions(5, 22).height).toBeCloseTo(21);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- src/projects/wiper-typography/wiperMath.test.ts`  
Expected: `FAIL` because `computeLineCount` / `computeLineDimensions` do not exist yet.

- [ ] **Step 3: Write minimal implementation**

```ts
export function computeLineCount(height: number, segmentWidth: number): number {
  return Math.floor((height / segmentWidth) * 1.2);
}

export function computeLineDimensions(index: number, width: number) {
  return { width, height: width - 0.2 * index };
}
```

Also move repeated constants like `LINE_WIDTH`, `AUTOPLAY_SPEED`, `POINTER_PHASE_MAX_DELTA`, and the glyph palette into [`src/projects/wiper-typography/wiperConfig.ts`](/Users/yongminkim/Development/Portfolio/mimesis/src/projects/wiper-typography/wiperConfig.ts).

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- src/projects/wiper-typography/wiperMath.test.ts`  
Expected: `PASS`

- [ ] **Step 5: Commit**

```bash
git add src/projects/wiper-typography/wiperConfig.ts \
  src/projects/wiper-typography/wiperMath.ts \
  src/projects/wiper-typography/wiperMath.test.ts
git commit -m "refactor: extract shared wiper geometry config"
```

### Task 2: Add pure phase stepping helpers

**Files:**
- Create: [`src/projects/wiper-typography/wiperPhase.ts`](/Users/yongminkim/Development/Portfolio/mimesis/src/projects/wiper-typography/wiperPhase.ts)
- Create: [`src/projects/wiper-typography/wiperPhase.test.ts`](/Users/yongminkim/Development/Portfolio/mimesis/src/projects/wiper-typography/wiperPhase.test.ts)

- [ ] **Step 1: Write the failing test**

```ts
it("resumes autoplay from the live phase after pointer leave", () => {
  expect(syncAutoplayAngle(0.5)).toBeCloseTo(Math.PI / 6);
});

it("steps toward the pointer target with a capped delta", () => {
  expect(stepInteractivePhase(0.2, 0.8, 0.05)).toBeCloseTo(0.25);
});

it("advances idle autoplay with absolute sine motion", () => {
  const next = stepIdlePhase(0, 0.01);
  expect(next.phase).toBeGreaterThan(0);
  expect(next.phase).toBeLessThanOrEqual(1);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- src/projects/wiper-typography/wiperPhase.test.ts`  
Expected: `FAIL` because the phase helpers do not exist yet.

- [ ] **Step 3: Write minimal implementation**

```ts
export function syncAutoplayAngle(phase: number) {
  return Math.asin(clamp(phase, 0, 1));
}

export function stepInteractivePhase(current: number, target: number, maxDelta: number) {
  return stepPhaseToward(current, target, maxDelta);
}

export function stepIdlePhase(autoPhaseAngle: number, speed: number) {
  const nextAngle = autoPhaseAngle + speed;
  return { autoPhaseAngle: nextAngle, phase: Math.abs(Math.sin(nextAngle)) };
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- src/projects/wiper-typography/wiperPhase.test.ts`  
Expected: `PASS`

- [ ] **Step 5: Write the hook as a thin adapter**

Create [`src/projects/wiper-typography/useWiperInteraction.ts`](/Users/yongminkim/Development/Portfolio/mimesis/src/projects/wiper-typography/useWiperInteraction.ts) around the tested helpers. Keep the hook thin: refs, ResizeObserver, pointer bookkeeping, and no extra behavior that is not already covered by `wiperMath` / `wiperPhase`.

```ts
export interface WiperInteractionModel {
  containerRef: RefObject<HTMLDivElement | null>;
  dragLayerRef: RefObject<HTMLDivElement | null>;
  phaseRef: MutableRefObject<number>;
  sizeRef: MutableRefObject<{ width: number; height: number }>;
  reducedMotion: boolean;
}
```

- [ ] **Step 6: Run focused verification**

Run: `npm test -- src/projects/wiper-typography/wiperMath.test.ts src/projects/wiper-typography/wiperPhase.test.ts`  
Expected: `PASS`

Run: `npm run lint -- src/projects/wiper-typography/useWiperInteraction.ts src/projects/wiper-typography/wiperPhase.ts src/projects/wiper-typography/wiperMath.ts`  
Expected: no lint errors

- [ ] **Step 7: Commit**

```bash
git add src/projects/wiper-typography/wiperPhase.ts \
  src/projects/wiper-typography/wiperPhase.test.ts \
  src/projects/wiper-typography/useWiperInteraction.ts
git commit -m "feat: add shared wiper phase controller"
```

## Chunk 2: Shell And 2D Baseline

### Task 3: Add mode-toggle test coverage and shell component

**Files:**
- Modify: [`package.json`](/Users/yongminkim/Development/Portfolio/mimesis/package.json)
- Modify: [`package-lock.json`](/Users/yongminkim/Development/Portfolio/mimesis/package-lock.json)
- Create: [`src/projects/wiper-typography/WiperTypographyModeToggle.tsx`](/Users/yongminkim/Development/Portfolio/mimesis/src/projects/wiper-typography/WiperTypographyModeToggle.tsx)
- Create: [`src/projects/wiper-typography/WiperTypographyProject.test.tsx`](/Users/yongminkim/Development/Portfolio/mimesis/src/projects/wiper-typography/WiperTypographyProject.test.tsx)
- Modify: [`src/projects/wiper-typography/WiperTypographyProject.tsx`](/Users/yongminkim/Development/Portfolio/mimesis/src/projects/wiper-typography/WiperTypographyProject.tsx)
- Modify: [`src/projects/wiper-typography/WiperTypographyProject.module.css`](/Users/yongminkim/Development/Portfolio/mimesis/src/projects/wiper-typography/WiperTypographyProject.module.css)

- [ ] **Step 1: Add DOM test support**

Run: `npm install --save-dev jsdom`  
Expected: `package.json` and `package-lock.json` include `jsdom`

- [ ] **Step 2: Write the failing test**

```tsx
// @vitest-environment jsdom
it("renders four mode buttons and switches to a selected 3D mode", async () => {
  renderProject();
  expect(document.body.textContent).toContain("2D Canvas");
  expect(document.body.textContent).toContain("3D Wiper Bars");

  clickMode("3d-bars");
  expect(document.body.textContent).toContain("mock-3d-bars");
});
```

Mock [`src/projects/wiper-typography/WiperTypographyCanvas2D.tsx`](/Users/yongminkim/Development/Portfolio/mimesis/src/projects/wiper-typography/WiperTypographyCanvas2D.tsx) and the 3D scene modules so the test only exercises shell state and toggle wiring.

- [ ] **Step 3: Run test to verify it fails**

Run: `npm test -- src/projects/wiper-typography/WiperTypographyProject.test.tsx`  
Expected: `FAIL` because the shell still renders a single canvas implementation.

- [ ] **Step 4: Write minimal implementation**

Create a presentational toggle component with stable `data-mode` attributes and update [`src/projects/wiper-typography/WiperTypographyProject.tsx`](/Users/yongminkim/Development/Portfolio/mimesis/src/projects/wiper-typography/WiperTypographyProject.tsx) to hold:

```ts
type WiperRenderMode = "2d" | "3d-bars" | "3d-glyphs" | "3d-stage";
const [mode, setMode] = useState<WiperRenderMode>("2d");
```

Mirror the pill-button styling pattern from [`src/projects/page-curl/PageCurlProject.module.css`](/Users/yongminkim/Development/Portfolio/mimesis/src/projects/page-curl/PageCurlProject.module.css) and keep the existing container `aria-label`.

- [ ] **Step 5: Run test to verify it passes**

Run: `npm test -- src/projects/wiper-typography/WiperTypographyProject.test.tsx`  
Expected: `PASS`

- [ ] **Step 6: Commit**

```bash
git add package.json package-lock.json \
  src/projects/wiper-typography/WiperTypographyModeToggle.tsx \
  src/projects/wiper-typography/WiperTypographyProject.tsx \
  src/projects/wiper-typography/WiperTypographyProject.module.css \
  src/projects/wiper-typography/WiperTypographyProject.test.tsx
git commit -m "feat: add wiper typography mode shell"
```

### Task 4: Extract the current 2D renderer onto the shared interaction core

**Files:**
- Create: [`src/projects/wiper-typography/WiperTypographyCanvas2D.tsx`](/Users/yongminkim/Development/Portfolio/mimesis/src/projects/wiper-typography/WiperTypographyCanvas2D.tsx)
- Modify: [`src/projects/wiper-typography/WiperTypographyProject.tsx`](/Users/yongminkim/Development/Portfolio/mimesis/src/projects/wiper-typography/WiperTypographyProject.tsx)
- Modify: [`src/projects/wiper-typography/WiperTypographyProject.module.css`](/Users/yongminkim/Development/Portfolio/mimesis/src/projects/wiper-typography/WiperTypographyProject.module.css)

- [ ] **Step 1: Write the failing test**

Extend [`src/projects/wiper-typography/WiperTypographyProject.test.tsx`](/Users/yongminkim/Development/Portfolio/mimesis/src/projects/wiper-typography/WiperTypographyProject.test.tsx) so the default render must show the extracted 2D component marker:

```tsx
expect(document.body.textContent).toContain("mock-2d-canvas");
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- src/projects/wiper-typography/WiperTypographyProject.test.tsx`  
Expected: `FAIL` because the extracted component does not exist yet.

- [ ] **Step 3: Write minimal implementation**

Move the current canvas scene, glyph entities, collision loop, and draw loop into [`src/projects/wiper-typography/WiperTypographyCanvas2D.tsx`](/Users/yongminkim/Development/Portfolio/mimesis/src/projects/wiper-typography/WiperTypographyCanvas2D.tsx), then replace the inline implementation in [`src/projects/wiper-typography/WiperTypographyProject.tsx`](/Users/yongminkim/Development/Portfolio/mimesis/src/projects/wiper-typography/WiperTypographyProject.tsx) with the extracted component.

Use [`src/projects/wiper-typography/useWiperInteraction.ts`](/Users/yongminkim/Development/Portfolio/mimesis/src/projects/wiper-typography/useWiperInteraction.ts) as the single source for:
- stage size
- phase refs
- pointer enter/move/leave behavior
- reduced-motion preference

- [ ] **Step 4: Run tests to verify they pass**

Run: `npm test -- src/projects/wiper-typography/wiperMath.test.ts src/projects/wiper-typography/wiperPhase.test.ts src/projects/wiper-typography/WiperTypographyProject.test.tsx`  
Expected: `PASS`

- [ ] **Step 5: Commit**

```bash
git add src/projects/wiper-typography/WiperTypographyCanvas2D.tsx \
  src/projects/wiper-typography/WiperTypographyProject.tsx \
  src/projects/wiper-typography/WiperTypographyProject.module.css
git commit -m "refactor: extract 2d wiper typography renderer"
```

## Chunk 3: 3D Infrastructure And First Variant

### Task 5: Build the shared 3D scene frame

**Files:**
- Create: [`src/projects/wiper-typography/WiperTypographySceneFrame.tsx`](/Users/yongminkim/Development/Portfolio/mimesis/src/projects/wiper-typography/WiperTypographySceneFrame.tsx)
- Modify: [`src/projects/wiper-typography/WiperTypographyProject.tsx`](/Users/yongminkim/Development/Portfolio/mimesis/src/projects/wiper-typography/WiperTypographyProject.tsx)
- Modify: [`src/projects/wiper-typography/WiperTypographyProject.module.css`](/Users/yongminkim/Development/Portfolio/mimesis/src/projects/wiper-typography/WiperTypographyProject.module.css)

- [ ] **Step 1: Write the failing test**

Extend [`src/projects/wiper-typography/WiperTypographyProject.test.tsx`](/Users/yongminkim/Development/Portfolio/mimesis/src/projects/wiper-typography/WiperTypographyProject.test.tsx):

```tsx
clickMode("3d-bars");
expect(document.body.textContent).toContain("mock-scene-frame");
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- src/projects/wiper-typography/WiperTypographyProject.test.tsx`  
Expected: `FAIL`

- [ ] **Step 3: Write minimal implementation**

Create a shared frame component that owns:
- a `Canvas` with restrained camera defaults
- ambient + directional light
- blue stage background
- a pointer overlay / wrapper that uses the shared interaction hook
- a `children` render prop or scene component slot that receives the live phase/model refs

Keep the frame generic so the three 3D scenes only define geometry and materials.

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- src/projects/wiper-typography/WiperTypographyProject.test.tsx`  
Expected: `PASS`

- [ ] **Step 5: Commit**

```bash
git add src/projects/wiper-typography/WiperTypographySceneFrame.tsx \
  src/projects/wiper-typography/WiperTypographyProject.tsx \
  src/projects/wiper-typography/WiperTypographyProject.module.css \
  src/projects/wiper-typography/WiperTypographyProject.test.tsx
git commit -m "feat: add shared 3d wiper scene frame"
```

### Task 6: Implement `3D Wiper Bars`

**Files:**
- Create: [`src/projects/wiper-typography/WiperTypographySceneBars3D.tsx`](/Users/yongminkim/Development/Portfolio/mimesis/src/projects/wiper-typography/WiperTypographySceneBars3D.tsx)
- Modify: [`src/projects/wiper-typography/WiperTypographyProject.tsx`](/Users/yongminkim/Development/Portfolio/mimesis/src/projects/wiper-typography/WiperTypographyProject.tsx)
- Modify: [`src/projects/wiper-typography/wiperMath.ts`](/Users/yongminkim/Development/Portfolio/mimesis/src/projects/wiper-typography/wiperMath.ts)
- Modify: [`src/projects/wiper-typography/wiperMath.test.ts`](/Users/yongminkim/Development/Portfolio/mimesis/src/projects/wiper-typography/wiperMath.test.ts)

- [ ] **Step 1: Write the failing test**

If the scene needs a new helper for bar depth or z-stagger, add it to [`src/projects/wiper-typography/wiperMath.test.ts`](/Users/yongminkim/Development/Portfolio/mimesis/src/projects/wiper-typography/wiperMath.test.ts):

```ts
it("derives shallow bar depth without exceeding the stage cap", () => {
  expect(computeBarDepth(0)).toBeGreaterThan(0);
  expect(computeBarDepth(80)).toBeLessThanOrEqual(MAX_BAR_DEPTH);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- src/projects/wiper-typography/wiperMath.test.ts`  
Expected: `FAIL` if a new helper is introduced

- [ ] **Step 3: Write minimal implementation**

Create the first 3D scene using:
- extruded box meshes for the black sweep bars
- shared `computeLinePose` geometry for x/y placement
- a flat rear glyph layer so the scene remains closest to the original 2D piece
- restrained shadows and depth values from [`src/projects/wiper-typography/wiperConfig.ts`](/Users/yongminkim/Development/Portfolio/mimesis/src/projects/wiper-typography/wiperConfig.ts)

- [ ] **Step 4: Run tests to verify they pass**

Run: `npm test -- src/projects/wiper-typography/wiperMath.test.ts src/projects/wiper-typography/WiperTypographyProject.test.tsx`  
Expected: `PASS`

- [ ] **Step 5: Commit**

```bash
git add src/projects/wiper-typography/WiperTypographySceneBars3D.tsx \
  src/projects/wiper-typography/WiperTypographyProject.tsx \
  src/projects/wiper-typography/wiperMath.ts \
  src/projects/wiper-typography/wiperMath.test.ts
git commit -m "feat: add 3d wiper bars scene"
```

## Chunk 4: Remaining Variants And Verification

### Task 7: Implement `3D Glyph Field`

**Files:**
- Create: [`src/projects/wiper-typography/WiperTypographySceneGlyphField3D.tsx`](/Users/yongminkim/Development/Portfolio/mimesis/src/projects/wiper-typography/WiperTypographySceneGlyphField3D.tsx)
- Modify: [`src/projects/wiper-typography/WiperTypographyProject.tsx`](/Users/yongminkim/Development/Portfolio/mimesis/src/projects/wiper-typography/WiperTypographyProject.tsx)
- Modify: [`src/projects/wiper-typography/wiperMath.ts`](/Users/yongminkim/Development/Portfolio/mimesis/src/projects/wiper-typography/wiperMath.ts)
- Modify: [`src/projects/wiper-typography/wiperMath.test.ts`](/Users/yongminkim/Development/Portfolio/mimesis/src/projects/wiper-typography/wiperMath.test.ts)

- [ ] **Step 1: Write the failing test**

```ts
it("assigns glyph layers within the shallow field depth budget", () => {
  expect(computeGlyphLayerDepth(0, 4)).toBeLessThan(0);
  expect(Math.abs(computeGlyphLayerDepth(3, 4))).toBeLessThanOrEqual(MAX_GLYPH_FIELD_DEPTH);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- src/projects/wiper-typography/wiperMath.test.ts`  
Expected: `FAIL` if the helper is newly added

- [ ] **Step 3: Write minimal implementation**

Build the second scene as a faithful variant:
- retain the same sweep bars and phase mapping
- distribute white glyphs across a few shallow z-bands
- use grouped or instanced geometry if plain meshes become too heavy
- keep camera movement fixed; only the typography field gains depth

- [ ] **Step 4: Run tests to verify they pass**

Run: `npm test -- src/projects/wiper-typography/wiperMath.test.ts src/projects/wiper-typography/WiperTypographyProject.test.tsx`  
Expected: `PASS`

- [ ] **Step 5: Commit**

```bash
git add src/projects/wiper-typography/WiperTypographySceneGlyphField3D.tsx \
  src/projects/wiper-typography/WiperTypographyProject.tsx \
  src/projects/wiper-typography/wiperMath.ts \
  src/projects/wiper-typography/wiperMath.test.ts
git commit -m "feat: add 3d glyph field wiper scene"
```

### Task 8: Implement `3D Stage`

**Files:**
- Create: [`src/projects/wiper-typography/WiperTypographySceneStage3D.tsx`](/Users/yongminkim/Development/Portfolio/mimesis/src/projects/wiper-typography/WiperTypographySceneStage3D.tsx)
- Modify: [`src/projects/wiper-typography/WiperTypographyProject.tsx`](/Users/yongminkim/Development/Portfolio/mimesis/src/projects/wiper-typography/WiperTypographyProject.tsx)
- Modify: [`src/projects/wiper-typography/wiperMath.ts`](/Users/yongminkim/Development/Portfolio/mimesis/src/projects/wiper-typography/wiperMath.ts)
- Modify: [`src/projects/wiper-typography/wiperMath.test.ts`](/Users/yongminkim/Development/Portfolio/mimesis/src/projects/wiper-typography/wiperMath.test.ts)

- [ ] **Step 1: Write the failing test**

```ts
it("keeps the stage camera offset inside the approved shallow range", () => {
  const offset = computeStageCameraOffset(0.75);
  expect(Math.abs(offset.x)).toBeLessThanOrEqual(MAX_STAGE_CAMERA_OFFSET);
  expect(Math.abs(offset.y)).toBeLessThanOrEqual(MAX_STAGE_CAMERA_OFFSET);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- src/projects/wiper-typography/wiperMath.test.ts`  
Expected: `FAIL` if the helper is newly added

- [ ] **Step 3: Write minimal implementation**

Build the third scene as a restrained perspective staging of the same artwork:
- keep the black sweep bars and white glyph palette
- add a shallow perspective box / floor relationship
- use subtle camera offset or shadow falloff, not free orbit or dramatic parallax
- keep the overall composition immediately recognizable as `wiper typography`

- [ ] **Step 4: Run tests to verify they pass**

Run: `npm test -- src/projects/wiper-typography/wiperMath.test.ts src/projects/wiper-typography/WiperTypographyProject.test.tsx`  
Expected: `PASS`

- [ ] **Step 5: Commit**

```bash
git add src/projects/wiper-typography/WiperTypographySceneStage3D.tsx \
  src/projects/wiper-typography/WiperTypographyProject.tsx \
  src/projects/wiper-typography/wiperMath.ts \
  src/projects/wiper-typography/wiperMath.test.ts
git commit -m "feat: add 3d stage wiper scene"
```

### Task 9: Verification And Cleanup

**Files:**
- Modify: whichever wiper files need follow-up fixes from verification feedback

- [ ] **Step 1: Run the focused automated suite**

Run:

```bash
npm test -- \
  src/projects/wiper-typography/wiperMath.test.ts \
  src/projects/wiper-typography/wiperPhase.test.ts \
  src/projects/wiper-typography/WiperTypographyProject.test.tsx
```

Expected: all targeted tests `PASS`

- [ ] **Step 2: Run repo-level static verification**

Run: `npm run lint -- src/projects/wiper-typography`  
Expected: no lint errors

Run: `npm run build`  
Expected: successful Next.js production build

- [ ] **Step 3: Perform manual feature verification**

Check each of the four modes in the project detail page:
- drag changes phase smoothly
- autoplay resumes after pointer leave
- reduced-motion behavior is acceptable
- resize remains stable
- the 3D modes stay visually faithful and do not tank frame rate on a narrow/mobile viewport

- [ ] **Step 4: Fix any issues and re-run verification**

Repeat the relevant commands from Steps 1-3 until clean, following @superpowers/verification-before-completion before claiming success.

- [ ] **Step 5: Commit the final verified implementation**

```bash
git add src/projects/wiper-typography package.json package-lock.json
git commit -m "feat: add 3d modes for wiper typography"
```
