# Staggered Text Top Face Correction Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Correct the outgoing staggered-text motion so the visible glyph exits onto the cube's top face rather than the bottom side.

**Architecture:** Keep the current arm-pivot character structure and incoming glyph path. Only the outgoing active-state geometry changes: invert the outgoing arm direction, adjust the outgoing glyph's local tilt/offset to match that top-face exit, and align the supporting shadow response with the new direction.

**Tech Stack:** React 19 client components, CSS Modules, Vitest

---

## Chunk 1: Lock The Direction With A Failing Regression

### Task 1: Add failing CSS direction expectations

**Files:**
- Modify: `src/styles/radiusScale.test.ts`

- [ ] **Step 1: Write the failing CSS regression test**

Extend `src/styles/radiusScale.test.ts` so it asserts:
- the active `.outgoingArm` block contains a negative `rotateX(` value,
- the active `.outgoingGlyph` block contains a positive local `rotateX(` value that matches the top-face exit correction.

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test -- src/styles/radiusScale.test.ts`

Expected: FAIL because the current active outgoing transforms still point toward the lower plane.

## Chunk 2: Correct The Outgoing Geometry

### Task 2: Flip the active outgoing direction

**Files:**
- Modify: `src/projects/staggered-text/StaggeredTextProject.module.css`

- [ ] **Step 3: Update the active outgoing transforms**

Adjust `src/projects/staggered-text/StaggeredTextProject.module.css` so:
- `.trigger[data-active="true"] .outgoingArm` rotates toward the top face,
- `.trigger[data-active="true"] .outgoingGlyph` uses the matching local tilt/offset,
- the shadow treatment supports the upper-plane read.

- [ ] **Step 4: Run the CSS test to verify it passes**

Run: `npm test -- src/styles/radiusScale.test.ts`

Expected: PASS

## Chunk 3: Verify The Finished Correction

### Task 3: Run regression checks

**Files:**
- Verify: `src/projects/staggered-text/StaggeredTextProject.test.tsx`
- Verify: `src/styles/radiusScale.test.ts`
- Verify: `src/app/project/[id]/ProjectReferenceContent.test.tsx`
- Verify: `src/app/project/[id]/XPostReferenceEmbed.test.tsx`

- [ ] **Step 5: Run targeted tests**

Run: `npm test -- src/projects/staggered-text/StaggeredTextProject.test.tsx src/styles/radiusScale.test.ts 'src/app/project/[id]/ProjectReferenceContent.test.tsx' 'src/app/project/[id]/XPostReferenceEmbed.test.tsx'`

Expected: PASS

- [ ] **Step 6: Run lint**

Run: `npm run lint`

Expected: PASS

- [ ] **Step 7: Run production build**

Run: `npm run build`

Expected: PASS

- [ ] **Step 8: Commit the implementation**

```bash
git add src/projects/staggered-text/StaggeredTextProject.module.css \
  src/styles/radiusScale.test.ts \
  docs/superpowers/plans/2026-03-25-staggered-text-top-face-correction.md
git commit -m "fix: correct staggered text top face exit"
```
