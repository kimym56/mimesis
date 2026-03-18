# Black & White Circle Particle Distribution Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Keep the approved first-frame particle distribution, but scale the particle budget by visible circle-area ratio and make the desktop/mobile layout logic depend on viewport size instead of the split-pane width.

**Architecture:** Preserve the current hybrid particle generator and runtime motion loop, but move the layout helper to a viewport-aware API so the scene can match SABUM's desktop/mobile geometry even inside a constrained pane. Use that geometry to derive `particleCountPerSet` from the ratio between the local circle area and SABUM's full-page circle area at the same viewport width.

**Tech Stack:** Next.js App Router, React 19 client components, TypeScript, Canvas 2D, Vitest, ESLint.

---

## Chunk 1: Simulation contract

### Task 1: Lock the viewport-aware density math with failing tests

**Files:**
- Modify: `src/projects/bw-circle/bwCircleSimulation.test.ts`
- Modify: `src/projects/bw-circle/bwCircleSimulation.ts`
- Modify: `src/projects/bw-circle/BwCircleScene.tsx`

- [ ] **Step 1: Replace the fixed-budget assertions with viewport-aware expectations**

Update `src/projects/bw-circle/bwCircleSimulation.test.ts` so `createMimesisLayout()` asserts:
- SABUM full-page desktop geometry at viewport width `1440` and scene width `1440`
  still uses `5000` particles per swarm
- the mimesis split-pane desktop geometry at viewport width `1440` and scene width `544`
  stays in desktop mode, uses the smaller split-pane circle radius, and derives a
  particle budget near the expected circle-area ratio
- mobile width `375` still uses the full original density because the scene width and
  viewport width match

Run: `npm test -- src/projects/bw-circle/bwCircleSimulation.test.ts`
Expected: FAIL because the helper still uses scene width for breakpoint logic and a fixed particle budget.

- [ ] **Step 2: Keep the current spawn-shape regression**

Keep the existing particle-generator regression for:
- deterministic output
- full-disc coverage
- subtle divider-center bias
- in-bounds particles

Run: `npm test -- src/projects/bw-circle/bwCircleSimulation.test.ts`
Expected: FAIL only because of the new layout assertions.

- [ ] **Step 3: Implement the minimal helper changes**

Update `src/projects/bw-circle/bwCircleSimulation.ts` to:
- accept both `sceneWidth` and `viewportWidth`
- compute `isMobile` from viewport width
- compute the local circle radius from scene width
- compute the reference SABUM circle radius from viewport width
- derive `particleCountPerSet` from the circle-area ratio, clamped and rounded to a stable integer budget

- [ ] **Step 4: Re-run the focused simulation tests**

Run: `npm test -- src/projects/bw-circle/bwCircleSimulation.test.ts`
Expected: PASS.

---

## Chunk 2: Scene integration

### Task 2: Apply the updated layout contract to the canvas scene

**Files:**
- Modify: `src/projects/bw-circle/BwCircleScene.tsx`
- Modify: `src/projects/bw-circle/bwCircleSimulation.ts`

- [ ] **Step 1: Pass viewport width into the layout helper**

Refactor `BwCircleScene.tsx` so scene creation and per-frame layout calls use:
- `sceneWidth`: the canvas parent width
- `viewportWidth`: `window.innerWidth`

- [ ] **Step 2: Preserve the current particle spawning and runtime motion rules**

Keep the hybrid sampler, particle render batching, and runtime particle loop unchanged unless required by the new layout contract.

- [ ] **Step 3: Keep rendering batched and color-mapped**

Render the two swarms as batched fills inside the clipped circle, preserving the visual mapping:
- white dots rendered in the black half
- black dots rendered in the white half

- [ ] **Step 4: Re-run the focused black-white-circle tests**

Run: `npm test -- src/projects/bw-circle/bwCircleSimulation.test.ts src/projects/bw-circle/BwCircleProject.test.tsx`
Expected: PASS.

---

## Chunk 3: Verification

### Task 3: Confirm the updated first-frame spawn is clean

**Files:**
- Modify: `docs/superpowers/plans/2026-03-18-bw-circle-particle-distribution.md`

- [ ] **Step 1: Run targeted lint for touched files**

Run: `npm run lint -- src/projects/bw-circle/BwCircleScene.tsx src/projects/bw-circle/bwCircleSimulation.ts src/projects/bw-circle/bwCircleSimulation.test.ts`
Expected: PASS.

- [ ] **Step 2: Run a production build**

Run: `npm run build`
Expected: PASS.

- [ ] **Step 3: Review the worktree**

Run: `git status --short`
Expected: only the intended `bw-circle` docs/code/test changes plus any unrelated user work already present.
