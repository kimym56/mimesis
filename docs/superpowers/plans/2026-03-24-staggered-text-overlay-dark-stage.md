# Staggered Text Overlay Dark Stage Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the staggered-text demo closer to Rauno's original by switching to a dark stage and keeping a persistent base text line visible while a staggered overlay animates on hover or press.

**Architecture:** Keep the work local to the `staggered-text` component by restructuring each character slot to support a base glyph and an overlay glyph. Update the CSS module to provide the dark stage treatment and overlay motion while preserving the existing interaction state and motion-box containment.

**Tech Stack:** React 19 client components, CSS Modules, Vitest

---

## Chunk 1: Lock The Overlay Model With Tests

### Task 1: Add failing tests for base/overlay layers and dark stage styling

**Files:**
- Modify: `src/projects/staggered-text/StaggeredTextProject.test.tsx`
- Modify: `src/styles/radiusScale.test.ts`

- [ ] **Step 1: Write the failing component test**

Update `src/projects/staggered-text/StaggeredTextProject.test.tsx` so it asserts:
- the base layer renders `Start deploying`,
- the overlay layer exists separately,
- the character-slot count for animated overlay glyphs still matches the non-space letters,
- the existing active-state interaction behavior still works.

- [ ] **Step 2: Write the failing CSS regression test**

In `src/styles/radiusScale.test.ts`, add an assertion that the staggered-text `.trigger` block includes a dark stage rule such as `background-color: #05070a;`.

- [ ] **Step 3: Run the tests to verify they fail**

Run: `npm test -- src/projects/staggered-text/StaggeredTextProject.test.tsx src/styles/radiusScale.test.ts`

Expected: FAIL because the component still exposes only one visible text layer and the stage is still light.

## Chunk 2: Implement The Persistent Base Plus Overlay

### Task 2: Update staggered-text markup and styling

**Files:**
- Modify: `src/projects/staggered-text/StaggeredTextProject.tsx`
- Modify: `src/projects/staggered-text/StaggeredTextProject.module.css`

- [ ] **Step 4: Update the component markup**

Refactor `src/projects/staggered-text/StaggeredTextProject.tsx` so:
- the component renders a persistent base wordmark,
- the animated overlay layer is separate from the base layer,
- the slot structure still exposes per-character stagger indices for the overlay.

- [ ] **Step 5: Rework the CSS stage and overlay animation**

In `src/projects/staggered-text/StaggeredTextProject.module.css`:
- change the stage to a near-black treatment,
- keep the base text visible at rest and during hover,
- animate only the overlay layer in staggered timing,
- preserve the reserved motion box and reduced-motion behavior.

- [ ] **Step 6: Run the targeted tests to verify they pass**

Run: `npm test -- src/projects/staggered-text/StaggeredTextProject.test.tsx src/styles/radiusScale.test.ts`

Expected: PASS

## Chunk 3: Verify The Finished Change

### Task 3: Run regression checks

**Files:**
- Verify: `src/projects/staggered-text/StaggeredTextProject.test.tsx`
- Verify: `src/styles/radiusScale.test.ts`
- Verify: `src/app/project/[id]/ProjectReferenceContent.test.tsx`
- Verify: `src/app/project/[id]/XPostReferenceEmbed.test.tsx`

- [ ] **Step 7: Run targeted tests**

Run: `npm test -- src/projects/staggered-text/StaggeredTextProject.test.tsx src/styles/radiusScale.test.ts 'src/app/project/[id]/ProjectReferenceContent.test.tsx' 'src/app/project/[id]/XPostReferenceEmbed.test.tsx'`

Expected: PASS

- [ ] **Step 8: Run lint**

Run: `npm run lint`

Expected: PASS

- [ ] **Step 9: Run production build**

Run: `npm run build`

Expected: PASS

- [ ] **Step 10: Commit the implementation**

```bash
git add src/projects/staggered-text/StaggeredTextProject.tsx \
  src/projects/staggered-text/StaggeredTextProject.module.css \
  src/projects/staggered-text/StaggeredTextProject.test.tsx \
  src/styles/radiusScale.test.ts \
  docs/superpowers/plans/2026-03-24-staggered-text-overlay-dark-stage.md
git commit -m "fix: match staggered text dark overlay style"
```
