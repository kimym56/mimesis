# Staggered Text Arm Pivot Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refine the current staggered-text motion so the outgoing glyph hinges upward to the cube's top-face position instead of rotating around its center.

**Architecture:** Replace the current rigid cube semantics with a layered per-character handoff: an outgoing arm wrapper carries the visible glyph upward while a separate incoming glyph rises from below. Keep the existing dark stage, stagger timing, and reduced-motion fallback, but change the animated structure and CSS geometry to match the selected softer arm-pivot behavior.

**Tech Stack:** React 19 client components, CSS Modules, Vitest

---

## Chunk 1: Lock The New Arm Structure With Tests

### Task 1: Add failing tests for the outgoing-arm model

**Files:**
- Modify: `src/projects/staggered-text/StaggeredTextProject.test.tsx`
- Modify: `src/styles/radiusScale.test.ts`

- [x] **Step 1: Write the failing component test**

Update `src/projects/staggered-text/StaggeredTextProject.test.tsx` so it asserts:
- the animated character count still matches the non-space letters in `Start Deploying`,
- each animated character renders an outgoing arm wrapper,
- each animated character renders an outgoing glyph and a separate incoming glyph,
- the current active-state interaction behavior still works.

- [x] **Step 2: Write the failing CSS regression test**

Update `src/styles/radiusScale.test.ts` so the staggered-text structural assertion checks for:
- a `.outgoingArm` selector,
- `transform-origin:` inside the `.outgoingArm` block,
- a bottom-biased origin value that documents the hinge behavior.

- [x] **Step 3: Run the tests to verify they fail**

Run: `npm test -- src/projects/staggered-text/StaggeredTextProject.test.tsx src/styles/radiusScale.test.ts`

Expected: FAIL because the component still renders the rigid cube structure and the CSS does not yet define the outgoing-arm hinge selector.

## Chunk 2: Replace The Motion Structure

### Task 2: Rebuild the character markup and motion CSS

**Files:**
- Modify: `src/projects/staggered-text/StaggeredTextProject.tsx`
- Modify: `src/projects/staggered-text/StaggeredTextProject.module.css`

- [x] **Step 4: Replace the component markup**

Refactor `src/projects/staggered-text/StaggeredTextProject.tsx` so each non-space character renders:
- an `outgoingArm` wrapper,
- an `outgoingGlyph` inside that arm,
- an independent `incomingGlyph`,
- the existing optional shadow layer.

Keep spaces lightweight and preserve the existing interaction state and `--char-index` stagger wiring.

- [x] **Step 5: Replace the CSS geometry**

Rewrite the staggered-text motion styles so:
- the outgoing arm uses a low hinge point and carries the outgoing glyph upward,
- the outgoing glyph fades and blurs to fully disappear at the top-face destination,
- the incoming glyph starts below with a mild `rotateX` tilt and settles into the front position,
- the chosen softer `B` motion profile is preserved,
- reduced-motion mode still presents a single readable line without doubled glyphs.

- [x] **Step 6: Run the targeted tests to verify they pass**

Run: `npm test -- src/projects/staggered-text/StaggeredTextProject.test.tsx src/styles/radiusScale.test.ts`

Expected: PASS

## Chunk 3: Verify The Refined Motion

### Task 3: Run regression checks

**Files:**
- Verify: `src/projects/staggered-text/StaggeredTextProject.test.tsx`
- Verify: `src/styles/radiusScale.test.ts`
- Verify: `src/app/project/[id]/ProjectReferenceContent.test.tsx`
- Verify: `src/app/project/[id]/XPostReferenceEmbed.test.tsx`

- [x] **Step 7: Run targeted tests**

Run: `npm test -- src/projects/staggered-text/StaggeredTextProject.test.tsx src/styles/radiusScale.test.ts 'src/app/project/[id]/ProjectReferenceContent.test.tsx' 'src/app/project/[id]/XPostReferenceEmbed.test.tsx'`

Expected: PASS

- [x] **Step 8: Run lint**

Run: `npm run lint`

Expected: PASS

- [x] **Step 9: Run production build**

Run: `npm run build`

Expected: PASS

- [ ] **Step 10: Commit the implementation**

```bash
git add src/projects/staggered-text/StaggeredTextProject.tsx \
  src/projects/staggered-text/StaggeredTextProject.module.css \
  src/projects/staggered-text/StaggeredTextProject.test.tsx \
  src/styles/radiusScale.test.ts \
  docs/superpowers/plans/2026-03-25-staggered-text-arm-pivot.md
git commit -m "fix: refine staggered text arm pivot motion"
```
