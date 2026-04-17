# Wiper Typography Pretext SVG Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a third `Pretext SVG` mode to `wiper typography` that lays out repeated `WIPER TYPOGRAPHY` lines with `@chenglou/pretext` and animates a simple SVG rain-and-wiper composition beside the existing `2D Canvas` and `3D Driver View` modes.

**Architecture:** Extend the current mode shell rather than replacing any existing renderer. Keep `pretext` work in a dedicated layout helper that only reruns on width changes, keep autoplay math in a separate pure helper module, and let a new client component render the SVG stage with a light fallback path if `pretext` layout fails.

**Tech Stack:** Next.js App Router, React 19, TypeScript, SVG, `@chenglou/pretext`, Vitest, JSDOM, ESLint.

**Spec:** `docs/superpowers/specs/2026-04-17-wiper-typography-pretext-svg-design.md`

---

## File Structure

- Modify: `package.json`
  Add the `@chenglou/pretext` dependency.
- Modify: `package-lock.json`
  Capture the dependency resolution.
- Modify: `src/projects/wiper-typography/WiperTypographyModeToggle.tsx`
  Extend the public mode contract and rendered labels.
- Modify: `src/projects/wiper-typography/WiperTypographyProject.tsx`
  Add the `Pretext SVG` renderer path and initial-mode support.
- Modify: `src/projects/wiper-typography/WiperTypographyProject.module.css`
  Add any stage classes the SVG renderer needs while preserving the existing shell.
- Create: `src/projects/wiper-typography/WiperTypographyPretextSvg.tsx`
  Render the new client-side SVG scene and fallback layout path.
- Create: `src/projects/wiper-typography/wiperPretextLayout.ts`
  Hold the `pretext` preparation and line materialization helpers.
- Create: `src/projects/wiper-typography/wiperPretextLayout.test.ts`
  Drive the layout helper with failing tests first.
- Create: `src/projects/wiper-typography/wiperPretextMotion.ts`
  Hold sweep geometry, wipe-band, and looping rain helpers.
- Create: `src/projects/wiper-typography/wiperPretextMotion.test.ts`
  Drive the motion helper with failing tests first.
- Modify: `src/projects/wiper-typography/WiperTypographyProject.test.tsx`
  Add the third-mode contract and switching coverage.
- Create: `src/projects/wiper-typography/WiperTypographyPretextSvg.test.tsx`
  Cover the new renderer mount and fallback behavior.
- Modify: current-state docs only if feature-facing wording needs update after implementation

## Chunk 1: Mode Contract And Dependency

### Task 1: Add the third mode contract with a failing test first

**Files:**
- Modify: `src/projects/wiper-typography/WiperTypographyProject.test.tsx`
- Modify: `src/projects/wiper-typography/WiperTypographyModeToggle.tsx`
- Modify: `src/projects/wiper-typography/WiperTypographyProject.tsx`

- [ ] **Step 1: Write the failing test**

```tsx
it("renders the pretext svg option and mounts it when selected", async () => {
  root.render(<WiperTypographyProject projectId="wiper-typography" />);

  expect(container.textContent).toContain("2D Canvas");
  expect(container.textContent).toContain("3D Driver View");
  expect(container.textContent).toContain("Pretext SVG");
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- src/projects/wiper-typography/WiperTypographyProject.test.tsx`
Expected: `FAIL` because the toggle does not yet expose `Pretext SVG`.

- [ ] **Step 3: Write minimal implementation**

Extend:
- the `WiperRenderMode` union with `pretext-svg`
- the mode options list with `Pretext SVG`
- the project renderer selection so the new mode can mount a dedicated component

Keep:
- `2D Canvas` as default
- lazy loading for the non-default modes

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- src/projects/wiper-typography/WiperTypographyProject.test.tsx`
Expected: `PASS`

### Task 2: Add the `pretext` dependency

**Files:**
- Modify: `package.json`
- Modify: `package-lock.json`

- [ ] **Step 1: Install the dependency**

Run: `npm install @chenglou/pretext`
Expected: `package.json` and `package-lock.json` update without removing unrelated packages.

- [ ] **Step 2: Verify the dependency is present**

Run: `npm ls @chenglou/pretext`
Expected: one installed dependency tree rooted at the project.

## Chunk 2: Pure Layout And Motion Helpers

### Task 3: Build the layout helper by TDD

**Files:**
- Create: `src/projects/wiper-typography/wiperPretextLayout.test.ts`
- Create: `src/projects/wiper-typography/wiperPretextLayout.ts`

- [ ] **Step 1: Write the failing tests**

```ts
it("materializes wrapped rows from repeated WIPER TYPOGRAPHY content", () => {
  const result = createPretextRows({ width: 320, lineHeight: 28 });
  expect(result.lines.length).toBeGreaterThan(1);
  expect(result.lines.join(" ")).toContain("WIPER TYPOGRAPHY");
});

it("falls back to simple wrapping when pretext is unavailable", () => {
  const result = fallbackWrapRepeatedText("WIPER TYPOGRAPHY", 160);
  expect(result.lines.length).toBeGreaterThan(1);
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npm test -- src/projects/wiper-typography/wiperPretextLayout.test.ts`
Expected: `FAIL` because the helper module does not exist yet.

- [ ] **Step 3: Write minimal implementation**

Implement:
- a repeated source-text generator
- a cached `prepareWithSegments()` path
- a `layoutWithLines()` materialization path
- a deterministic fallback wrapper for failure cases

- [ ] **Step 4: Run tests to verify they pass**

Run: `npm test -- src/projects/wiper-typography/wiperPretextLayout.test.ts`
Expected: `PASS`

### Task 4: Build the motion helper by TDD

**Files:**
- Create: `src/projects/wiper-typography/wiperPretextMotion.test.ts`
- Create: `src/projects/wiper-typography/wiperPretextMotion.ts`

- [ ] **Step 1: Write the failing tests**

```ts
it("loops the rain offset within the content height", () => {
  expect(computeLoopOffset({ elapsedMs: 4200, speed: 0.08, contentHeight: 600 }))
    .toBeGreaterThanOrEqual(0);
});

it("keeps the wiper blade endpoints inside the stage bounds", () => {
  const sweep = computeWiperSweep({ phase: 0.5, width: 640, height: 420 });
  expect(sweep.tip.x).toBeLessThanOrEqual(640);
  expect(sweep.tip.y).toBeLessThanOrEqual(420);
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npm test -- src/projects/wiper-typography/wiperPretextMotion.test.ts`
Expected: `FAIL` because the helper module does not exist yet.

- [ ] **Step 3: Write minimal implementation**

Implement:
- looping rain offset math
- oscillating phase helpers
- wiper arm/blade geometry
- a wipe-band intensity helper that fades with distance from the blade path

- [ ] **Step 4: Run tests to verify they pass**

Run: `npm test -- src/projects/wiper-typography/wiperPretextMotion.test.ts`
Expected: `PASS`

## Chunk 3: SVG Renderer And Verification

### Task 5: Add the renderer component with focused component tests first

**Files:**
- Create: `src/projects/wiper-typography/WiperTypographyPretextSvg.test.tsx`
- Create: `src/projects/wiper-typography/WiperTypographyPretextSvg.tsx`
- Modify: `src/projects/wiper-typography/WiperTypographyProject.module.css`

- [ ] **Step 1: Write the failing tests**

```tsx
it("renders a pretext svg stage with accessible labeling", () => {
  root.render(<WiperTypographyPretextSvg projectId="wiper-typography" />);
  expect(container.querySelector("svg")).not.toBeNull();
  expect(container.textContent).toContain("WIPER TYPOGRAPHY");
});

it("falls back to simple wrapping when pretext layout throws", () => {
  mockedCreatePretextRows.mockImplementation(() => {
    throw new Error("layout failed");
  });
  root.render(<WiperTypographyPretextSvg projectId="wiper-typography" />);
  expect(container.querySelector("svg")).not.toBeNull();
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npm test -- src/projects/wiper-typography/WiperTypographyPretextSvg.test.tsx`
Expected: `FAIL` because the renderer does not exist yet.

- [ ] **Step 3: Write minimal implementation**

Implement:
- client-only stage measurement
- width-driven layout recomputation
- `requestAnimationFrame` autoplay
- SVG text rows
- a single SVG wiper rig
- fallback wrapping on layout failure

- [ ] **Step 4: Run focused verification**

Run: `npm test -- src/projects/wiper-typography/WiperTypographyPretextSvg.test.tsx src/projects/wiper-typography/WiperTypographyProject.test.tsx`
Expected: `PASS`

### Task 6: Run end-to-end verification for the feature branch

**Files:**
- Modify: any current-state docs that need final wording updates after implementation

- [ ] **Step 1: Run focused wiper tests**

Run: `npm test -- src/projects/wiper-typography/WiperTypographyProject.test.tsx src/projects/wiper-typography/WiperTypographyPretextSvg.test.tsx src/projects/wiper-typography/wiperPretextLayout.test.ts src/projects/wiper-typography/wiperPretextMotion.test.ts`
Expected: `PASS`

- [ ] **Step 2: Run the full test suite**

Run: `npm test`
Expected: `PASS`

- [ ] **Step 3: Run lint**

Run: `npm run lint`
Expected: `PASS`

- [ ] **Step 4: Manual browser check**

Run: `npm run dev`
Check:
- select `Pretext SVG`
- verify the text loops downward
- verify the blade sweep reads as a car wiper
- verify reduced-motion users see a slower version rather than a broken stage
