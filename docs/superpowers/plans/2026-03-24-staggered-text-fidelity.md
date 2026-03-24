# Staggered Text Fidelity Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Update the staggered-text demo to use Rauno's original `Start deploying` copy and fix the internal motion geometry so the animated text no longer clips inside the stage.

**Architecture:** Keep the change local to the `staggered-text` project by updating the component source string and reworking the CSS motion box within the existing stage. Lock the fix with an updated component test and a small CSS regression assertion for reserved motion space.

**Tech Stack:** React 19 client components, CSS Modules, Vitest

---

## Chunk 1: Lock The New Fidelity Requirements With Tests

### Task 1: Add failing text and motion-box tests

**Files:**
- Modify: `src/projects/staggered-text/StaggeredTextProject.test.tsx`
- Modify: `src/styles/radiusScale.test.ts`

- [ ] **Step 1: Write the failing component test**

Update `src/projects/staggered-text/StaggeredTextProject.test.tsx` so it asserts:
- the rendered text is `Start deploying`,
- the character-slot count matches the non-space letters in `Start deploying`,
- the existing active-state interaction behavior still works.

- [ ] **Step 2: Write the failing CSS regression test**

In `src/styles/radiusScale.test.ts`, add an assertion that the staggered-text wordmark block includes an explicit reserved motion height such as `min-height` or another deliberate motion-box rule that prevents clipping.

- [ ] **Step 3: Run the tests to verify they fail**

Run: `npm test -- src/projects/staggered-text/StaggeredTextProject.test.tsx src/styles/radiusScale.test.ts`

Expected: FAIL because the component still renders `Get started` and the CSS does not yet reserve motion space for the longer word.

## Chunk 2: Implement The Source-Faithful Motion Box

### Task 2: Update the component text and CSS geometry

**Files:**
- Modify: `src/projects/staggered-text/StaggeredTextProject.tsx`
- Modify: `src/projects/staggered-text/StaggeredTextProject.module.css`

- [ ] **Step 4: Update the component source text**

Change the display string in `src/projects/staggered-text/StaggeredTextProject.tsx` from `Get started` to `Start deploying` and keep the slot-generation logic intact.

- [ ] **Step 5: Rework the motion geometry**

In `src/projects/staggered-text/StaggeredTextProject.module.css`:
- reserve explicit vertical motion space for the wordmark,
- keep the stage visually full-size,
- adjust the active/inactive transform distances so the animation stays inside the stage,
- preserve reduced-motion behavior with the new copy.

- [ ] **Step 6: Run the targeted tests to verify they pass**

Run: `npm test -- src/projects/staggered-text/StaggeredTextProject.test.tsx src/styles/radiusScale.test.ts`

Expected: PASS

## Chunk 3: Verify The Finished Change

### Task 3: Run regression checks

**Files:**
- Verify: `src/projects/staggered-text/StaggeredTextProject.test.tsx`
- Verify: `src/styles/radiusScale.test.ts`

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
  docs/superpowers/plans/2026-03-24-staggered-text-fidelity.md
git commit -m "fix: align staggered text with source motion"
```
