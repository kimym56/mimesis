# Wiper Typography Driver View Texture Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the current per-mesh windshield projection in `3D Driver View` with a single filtered windshield texture and make the wipe autoplay sweep in both directions.

**Architecture:** Keep the Tesla scene, camera framing, and windshield layout math. Move the visual wipe content to an offscreen 2D canvas rendered into a `CanvasTexture`, then mount that texture on one windshield-aligned plane. Change driver-view autoplay to a ping-pong phase so both the procedural windshield layer and the Tesla wiper motion oscillate naturally.

**Tech Stack:** Next.js 16, React 19, TypeScript, React Three Fiber, Three.js, Vitest

---

## Chunk 1: Motion And Composition Regressions

### Task 1: Add the failing ping-pong phase regression

**Files:**
- Modify: `src/projects/wiper-typography/wiperDriverView.test.ts`

- [ ] **Step 1: Write the failing test**

Add an assertion that one full cycle reaches `1` mid-cycle and returns toward `0` before the next loop boundary.

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- src/projects/wiper-typography/wiperDriverView.test.ts`
Expected: FAIL because the current phase logic only ramps forward.

### Task 2: Add the failing driver-view texture composition regression

**Files:**
- Modify: `src/projects/wiper-typography/WiperTypographyScene3DGlyphWiring.test.tsx`

- [ ] **Step 3: Write the failing test**

Update the wiring test to require a `data-driver-view-part="windshield-overlay"` layer and assert that driver view no longer depends on projected extruded glyph meshes.

- [ ] **Step 4: Run test to verify it fails**

Run: `npm test -- src/projects/wiper-typography/WiperTypographyScene3DGlyphWiring.test.tsx`
Expected: FAIL because the current driver view still mounts projected glyph/bar meshes.

## Chunk 2: Shared Canvas Renderer

### Task 3: Extract shared 2D glyph/bar drawing

**Files:**
- Create: `src/projects/wiper-typography/wiperSceneRenderer.ts`
- Modify: `src/projects/wiper-typography/WiperTypographyCanvas2D.tsx`

- [ ] **Step 5: Write minimal implementation**

Move the existing glyph/bar canvas drawing into a shared helper and update the 2D canvas to call it without changing visible behavior.

- [ ] **Step 6: Run focused tests**

Run: `npm test -- src/projects/wiper-typography/WiperTypographyProject.test.tsx src/projects/wiper-typography/wiperSimulation.test.ts`
Expected: PASS.

## Chunk 3: Driver View Texture Layer

### Task 4: Implement ping-pong phase and windshield texture rendering

**Files:**
- Modify: `src/projects/wiper-typography/wiperDriverView.ts`
- Modify: `src/projects/wiper-typography/WiperTypographyDriverView3D.tsx`

- [ ] **Step 7: Write minimal implementation**

Implement ping-pong autoplay math, create the offscreen canvas texture, draw the shared scene into it each frame, and mount a single windshield overlay plane aligned to the existing Tesla windshield layout.

- [ ] **Step 8: Run targeted tests**

Run: `npm test -- src/projects/wiper-typography/wiperDriverView.test.ts src/projects/wiper-typography/WiperTypographyScene3DGlyphWiring.test.tsx src/projects/wiper-typography/WiperTypographyDriverView3D.test.tsx`
Expected: PASS.

## Chunk 4: Verification

### Task 5: Verify the full wiper slice and lint

**Files:**
- Verify only

- [ ] **Step 9: Run the full wiper suite**

Run: `npm test -- src/projects/wiper-typography`
Expected: PASS.

- [ ] **Step 10: Run lint on touched files**

Run: `npm run lint -- src/projects/wiper-typography/wiperDriverView.ts src/projects/wiper-typography/WiperTypographyDriverView3D.tsx src/projects/wiper-typography/WiperTypographyCanvas2D.tsx src/projects/wiper-typography/wiperSceneRenderer.ts src/projects/wiper-typography/WiperTypographyScene3DGlyphWiring.test.tsx src/projects/wiper-typography/wiperDriverView.test.ts`
Expected: PASS.
