# Bw Circle Particle Spread Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Slightly loosen the center-biased particle cluster inside the black-and-white circle without changing the overall particle system model.

**Architecture:** Keep the existing deterministic two-part sampling approach in `bwCircleSimulation.ts`: a mostly uniform disc plus a smaller center-line-biased subset. Adjust only the biased subset ratio and spread constants, then lock the behavior with a test that checks for a still-visible but lighter central cluster.

**Tech Stack:** TypeScript, Vitest, Next.js project test tooling

---

## Chunk 1: Tune particle spread

### Task 1: Add a failing regression test for the looser cluster

**Files:**
- Modify: `src/projects/bw-circle/bwCircleSimulation.test.ts`
- Test: `src/projects/bw-circle/bwCircleSimulation.test.ts`

- [ ] **Step 1: Write the failing test**

Add assertions around `createBwCircleParticles()` that keep determinism and boundary coverage, but tighten the acceptable center-band count so the current implementation fails and the looser distribution passes.

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- src/projects/bw-circle/bwCircleSimulation.test.ts`
Expected: FAIL in the new center-band-density assertion.

- [ ] **Step 3: Write minimal implementation**

Adjust the biased subset percentage and Gaussian spread constants in `src/projects/bw-circle/bwCircleSimulation.ts` to match the approved "slight loosen" option while preserving seeded determinism and in-bounds placement.

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- src/projects/bw-circle/bwCircleSimulation.test.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/projects/bw-circle/bwCircleSimulation.ts src/projects/bw-circle/bwCircleSimulation.test.ts docs/superpowers/specs/2026-03-23-bw-circle-particle-spread-design.md docs/superpowers/plans/2026-03-23-bw-circle-particle-spread.md
git commit -m "fix: loosen bw-circle particle spread"
```

### Task 2: Verify no rendering regressions in the scene tests

**Files:**
- Test: `src/projects/bw-circle/BwCircleScene.test.tsx`

- [ ] **Step 1: Run the related scene test**

Run: `npm test -- src/projects/bw-circle/BwCircleScene.test.tsx`
Expected: PASS

- [ ] **Step 2: Commit**

```bash
git add src/projects/bw-circle/bwCircleSimulation.ts src/projects/bw-circle/bwCircleSimulation.test.ts docs/superpowers/specs/2026-03-23-bw-circle-particle-spread-design.md docs/superpowers/plans/2026-03-23-bw-circle-particle-spread.md
git commit -m "test: verify bw-circle particle spread tuning"
```
