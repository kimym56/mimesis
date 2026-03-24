# Project Detail Equal Pane Layout Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Keep the project detail desktop split at an equal ratio by making each pane shrink correctly when it contains intrinsically wide embedded content.

**Architecture:** Apply the fix at the shared project-detail layout layer by making `.pane` use a zero flex basis and `min-width: 0`. Lock the behavior with a CSS regression test so future embed changes cannot silently reintroduce uneven pane widths.

**Tech Stack:** CSS Modules, Vitest, Next.js App Router

---

## Chunk 1: Lock The Layout Rule With A Test

### Task 1: Add a failing CSS regression test

**Files:**
- Modify: `src/styles/radiusScale.test.ts`

- [ ] **Step 1: Write the failing layout test**

Add a test that reads the `.pane` block from `src/app/project/[id]/ProjectDetail.module.css` and asserts it contains:
- `flex: 1 1 0;`
- `min-width: 0;`

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test -- src/styles/radiusScale.test.ts`

Expected: FAIL because `.pane` currently uses `flex: 1;` and does not declare `min-width: 0` for shrink control.

## Chunk 2: Implement The Shared Layout Fix

### Task 2: Update the project detail pane CSS

**Files:**
- Modify: `src/app/project/[id]/ProjectDetail.module.css`

- [ ] **Step 3: Write the minimal CSS implementation**

Update `.pane` so it uses:
- `flex: 1 1 0;`
- `min-width: 0;`

Keep the rest of the project detail layout unchanged.

- [ ] **Step 4: Run the test to verify it passes**

Run: `npm test -- src/styles/radiusScale.test.ts`

Expected: PASS

## Chunk 3: Verify The Finished Change

### Task 3: Run regression checks

**Files:**
- Verify: `src/styles/radiusScale.test.ts`
- Verify: `src/app/project/[id]/ProjectReferenceContent.test.tsx`
- Verify: `src/app/project/[id]/XPostReferenceEmbed.test.tsx`

- [ ] **Step 5: Run targeted tests**

Run: `npm test -- src/styles/radiusScale.test.ts 'src/app/project/[id]/ProjectReferenceContent.test.tsx' 'src/app/project/[id]/XPostReferenceEmbed.test.tsx'`

Expected: PASS

- [ ] **Step 6: Run lint**

Run: `npm run lint`

Expected: PASS

- [ ] **Step 7: Run production build**

Run: `npm run build`

Expected: PASS

- [ ] **Step 8: Commit the implementation**

```bash
git add src/styles/radiusScale.test.ts \
  'src/app/project/[id]/ProjectDetail.module.css' \
  docs/superpowers/plans/2026-03-24-project-detail-equal-pane-layout.md
git commit -m "fix: keep project detail panes evenly split"
```
