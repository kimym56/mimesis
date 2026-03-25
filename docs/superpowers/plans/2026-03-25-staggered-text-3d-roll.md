# Staggered Text 3D Roll Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the current staggered-text overlay model with a true two-face per-character 3D roll that matches the structure of Rauno's reference more closely.

**Architecture:** Remove the current base-plus-overlay implementation and rebuild each animated character slot around a dedicated 3D transform container with a front face and a bottom face. Keep the dark typography canvas, but simplify the stage so the motion is driven by the two-face roll instead of a separate overlay pass.

**Tech Stack:** React 19 client components, CSS Modules, Vitest

---

## Chunk 1: Lock The New 3D Structure With Tests

### Task 1: Add failing tests for two-face character units

**Files:**
- Modify: `src/projects/staggered-text/StaggeredTextProject.test.tsx`
- Modify: `src/styles/radiusScale.test.ts`

- [x] **Step 1: Write the failing component test**

Update `src/projects/staggered-text/StaggeredTextProject.test.tsx` so it asserts:
- the rendered text is `Start Deploying`,
- the current overlay-layer expectation is removed,
- each animated character slot contains a front face and a bottom face,
- the animated-character count still matches the non-space letters,
- the existing active-state interaction behavior still works.

- [x] **Step 2: Write the failing CSS regression test**

In `src/styles/radiusScale.test.ts`, replace the previous staggered-text structural assertion with a 3D roll assertion that checks for:
- a `.cube` selector containing `transform-style: preserve-3d;`,
- a `.faceBottom` selector containing `rotateX(`.

- [x] **Step 3: Run the tests to verify they fail**

Run: `npm test -- src/projects/staggered-text/StaggeredTextProject.test.tsx src/styles/radiusScale.test.ts`

Expected: FAIL because the component still renders the old overlay structure and the CSS does not yet define the new cube/face selectors.

## Chunk 2: Replace The Component From Zero

### Task 2: Rebuild the staggered-text markup and CSS

**Files:**
- Modify: `src/projects/staggered-text/StaggeredTextProject.tsx`
- Modify: `src/projects/staggered-text/StaggeredTextProject.module.css`

- [x] **Step 4: Replace the component markup**

Refactor `src/projects/staggered-text/StaggeredTextProject.tsx` so:
- the old base layer and overlay layer are removed,
- each non-space character renders a slot with a 3D cube container,
- the cube contains a front face and a bottom face for the same character,
- spaces remain lightweight spacing elements,
- the existing interaction state and `--char-index` stagger setup remain intact.

- [x] **Step 5: Replace the CSS effect**

Rewrite `src/projects/staggered-text/StaggeredTextProject.module.css` so:
- the stage remains near-black with minimal chrome,
- each character slot reserves enough height for a 3D roll,
- the cube uses real 3D transforms,
- the front face is visible at rest,
- the bottom face rolls into place on active state,
- reduced-motion mode uses a simpler non-3D response without doubled text.

- [x] **Step 6: Run the targeted tests to verify they pass**

Run: `npm test -- src/projects/staggered-text/StaggeredTextProject.test.tsx src/styles/radiusScale.test.ts`

Expected: PASS

## Chunk 3: Verify The Finished Reimplementation

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
  docs/superpowers/plans/2026-03-25-staggered-text-3d-roll.md
git commit -m "fix: reimplement staggered text as 3d roll"
```
