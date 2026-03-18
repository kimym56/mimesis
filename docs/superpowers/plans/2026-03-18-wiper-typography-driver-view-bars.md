# Wiper Typography Driver View Bars Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Render the shared wipe bars in `3D Driver View` so the driver-view windshield shows the same abstract bar layer as the 2D simulation.

**Architecture:** Keep `WiperTypographyDriverView3D` as the single owner of Tesla windshield projection. Add projected bar meshes next to the existing projected glyph meshes, driven by the same `useWiperSceneSimulation3D` state and `TeslaDriverViewLayout` math. Verify the behavior with a scene-composition regression before implementation.

**Tech Stack:** Next.js 16, React 19, TypeScript, React Three Fiber, Three.js, Vitest

---

## Chunk 1: Driver View Render Path

### Task 1: Add the failing composition regression

**Files:**
- Modify: `src/projects/wiper-typography/WiperTypographyScene3DGlyphWiring.test.tsx`

- [ ] **Step 1: Write the failing test**

Update the mocked `useWiperSceneSimulation3D` return value so `simulation.bars` includes one bar, then assert that driver view renders a projected bar marker in addition to the Tesla model and glyph mesh.

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- src/projects/wiper-typography/WiperTypographyScene3DGlyphWiring.test.tsx`
Expected: FAIL because driver view does not render any projected bar mesh yet.

### Task 2: Implement projected driver-view bars

**Files:**
- Modify: `src/projects/wiper-typography/WiperTypographyDriverView3D.tsx`

- [ ] **Step 3: Write minimal implementation**

Add projected bar meshes to the driver-view field:

- Create refs for bar meshes.
- Mount one rectangular mesh per `simulation.bars` entry.
- In `useFrame`, project each bar center onto the windshield plane, orient it with the windshield quaternion, and scale it from simulated bar width/height to projected world units.

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- src/projects/wiper-typography/WiperTypographyScene3DGlyphWiring.test.tsx`
Expected: PASS.

## Chunk 2: Verification

### Task 3: Verify driver-view and wiper regressions

**Files:**
- Verify only

- [ ] **Step 5: Run focused driver-view tests**

Run: `npm test -- src/projects/wiper-typography/WiperTypographyScene3DGlyphWiring.test.tsx src/projects/wiper-typography/WiperTypographyDriverView3D.test.tsx src/projects/wiper-typography/wiperTeslaDriverLayout.test.ts`
Expected: PASS.

- [ ] **Step 6: Run the full wiper suite**

Run: `npm test -- src/projects/wiper-typography`
Expected: PASS.

- [ ] **Step 7: Run lint on touched files**

Run: `npm run lint -- src/projects/wiper-typography/WiperTypographyDriverView3D.tsx src/projects/wiper-typography/WiperTypographyScene3DGlyphWiring.test.tsx`
Expected: PASS.
