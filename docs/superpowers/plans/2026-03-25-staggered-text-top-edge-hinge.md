# Staggered Text Top Edge Hinge Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Move the staggered-text outgoing hinge to the top edge so the disappearing glyph exits onto the upper face instead of below the baseline.

**Architecture:** Keep the current arm-based outgoing/incoming structure. Only the motion geometry changes: relocate the outgoing arm hinge to the top edge, retune the outgoing active transforms, and align the supporting blur/shadow response with the new upper-plane exit.

**Tech Stack:** React 19 client components, CSS Modules, Vitest

---

## Chunk 1: Lock The Top-Edge Hinge With A Failing Regression

### Task 1: Update the CSS regression expectations

**Files:**
- Modify: `src/styles/radiusScale.test.ts`

- [x] **Step 1: Write the failing CSS regression test**

Update `src/styles/radiusScale.test.ts` so it asserts:
- `.outgoingArm` uses a top-edge-biased `transform-origin`,
- the active `.outgoingArm` and `.outgoingGlyph` blocks contain the corrected top-face exit transforms.

- [x] **Step 2: Run the test to verify it fails**

Run: `npm test -- src/styles/radiusScale.test.ts`

Expected: FAIL because the current CSS still uses the low hinge geometry.

## Chunk 2: Move The Hinge And Retune The Exit Path

### Task 2: Correct the outgoing geometry

**Files:**
- Modify: `src/projects/staggered-text/StaggeredTextProject.module.css`

- [x] **Step 3: Update the outgoing hinge and active transforms**

Adjust `src/projects/staggered-text/StaggeredTextProject.module.css` so:
- `.outgoingArm` uses the top-edge hinge value,
- the active `.outgoingArm` and `.outgoingGlyph` transforms match the upper-face exit,
- the supporting blur/shadow response no longer implies a lower-plane exit.

- [x] **Step 4: Run the CSS test to verify it passes**

Run: `npm test -- src/styles/radiusScale.test.ts`

Expected: PASS

## Chunk 3: Verify The Finished Correction

### Task 3: Run regression checks

**Files:**
- Verify: `src/projects/staggered-text/StaggeredTextProject.test.tsx`
- Verify: `src/styles/radiusScale.test.ts`
- Verify: `src/app/project/[id]/ProjectReferenceContent.test.tsx`
- Verify: `src/app/project/[id]/XPostReferenceEmbed.test.tsx`

- [x] **Step 5: Run targeted tests**

Run: `npm test -- src/projects/staggered-text/StaggeredTextProject.test.tsx src/styles/radiusScale.test.ts 'src/app/project/[id]/ProjectReferenceContent.test.tsx' 'src/app/project/[id]/XPostReferenceEmbed.test.tsx'`

Expected: PASS

- [x] **Step 6: Run lint**

Run: `npm run lint`

Expected: PASS

- [x] **Step 7: Run production build**

Run: `npm run build`

Expected: PASS

- [ ] **Step 8: Commit the implementation**

```bash
git add src/projects/staggered-text/StaggeredTextProject.module.css \
  src/styles/radiusScale.test.ts \
  docs/superpowers/plans/2026-03-25-staggered-text-top-edge-hinge.md
git commit -m "fix: move staggered text exit to top face"
```
