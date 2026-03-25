# Staggered Text 1100ms Cascade Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Tune the staggered-text motion so the first `S` starting and the final `g` finishing are exactly `1100ms` apart.

**Architecture:** Keep the current staggered-text structure, top-face exit, and blur handoff. Only the CSS timing values change: set the stagger step to `24ms`, compress the transform/opacity/filter timings to fit a `788ms` settle window, and keep all visible motion inside that exact end-to-end budget.

**Tech Stack:** React 19 client components, CSS Modules, Vitest

---

## Chunk 1: Lock The Exact Timing Math With A Failing Regression

### Task 1: Add failing CSS expectations for the 1100ms cascade

**Files:**
- Modify: `src/styles/radiusScale.test.ts`

- [ ] **Step 1: Write the failing CSS regression test**

Update `src/styles/radiusScale.test.ts` so it asserts:
- `.slot` uses `--stagger-step: 24ms;`,
- `.outgoingArm` uses `transform 788ms`,
- `.outgoingGlyph` uses `transform 788ms`, `opacity 720ms`, and `filter 788ms`,
- `.incomingGlyph` uses `transform 788ms`, `opacity 788ms`, and `filter 788ms`.

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test -- src/styles/radiusScale.test.ts`

Expected: FAIL because the current CSS still uses a slower, longer timing profile.

## Chunk 2: Apply The Exact 1100ms Profile

### Task 2: Update the CSS timing values

**Files:**
- Modify: `src/projects/staggered-text/StaggeredTextProject.module.css`

- [ ] **Step 3: Replace the timing values with the 1100ms profile**

Adjust `src/projects/staggered-text/StaggeredTextProject.module.css` so:
- `--stagger-step` becomes `24ms`,
- all outgoing/incoming transform timings become `788ms`,
- outgoing opacity becomes `720ms`,
- incoming opacity becomes `788ms`,
- outgoing and incoming filter timings become `788ms`,
- shadow timing also fits the same settle window.

- [ ] **Step 4: Run the CSS test to verify it passes**

Run: `npm test -- src/styles/radiusScale.test.ts`

Expected: PASS

## Chunk 3: Verify The Finished Timing Refinement

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
  docs/superpowers/plans/2026-03-25-staggered-text-1100ms-cascade.md
git commit -m "fix: tune staggered text to 1100ms cascade"
```
