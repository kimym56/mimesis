# Staggered Text Handoff Delay Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a visible `160ms` gap between each character's outgoing front-face roll starting and its incoming bottom-face rise starting.

**Architecture:** Keep the current cube-roll timing, geometry, and typography intact. Add one fixed handoff delay variable on `.slot`, and apply it only to `.incomingGlyph` by extending its transition-delay formula with `+ var(--handoff-delay)`. Outgoing layers and shadow remain unchanged.

**Tech Stack:** React 19 client component, CSS Modules, Vitest

---

## Chunk 1: Lock The 160ms Handoff Gap In Tests

### Task 1: Add failing CSS expectations for the incoming delay offset

**Files:**
- Modify: `src/styles/radiusScale.test.ts`

- [ ] **Step 1: Write the failing CSS regression test**

Update `src/styles/radiusScale.test.ts` so it asserts:
- `.slot` contains `--handoff-delay: 160ms;`
- `.incomingGlyph` contains `transition-delay: calc(var(--char-index) * var(--incoming-stagger-step) + var(--handoff-delay));`
- outgoing and shadow delay expectations remain unchanged

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test -- src/styles/radiusScale.test.ts`

Expected: FAIL because the stylesheet still starts the incoming face without the extra handoff delay.

## Chunk 2: Apply The Incoming Handoff Delay

### Task 2: Update the staggered-text CSS delay formula

**Files:**
- Modify: `src/projects/staggered-text/StaggeredTextProject.module.css`

- [ ] **Step 3: Implement the incoming handoff delay**

Adjust `src/projects/staggered-text/StaggeredTextProject.module.css` so:
- `.slot` defines `--handoff-delay: 160ms`
- `.incomingGlyph` transition-delay becomes `calc(var(--char-index) * var(--incoming-stagger-step) + var(--handoff-delay))`
- no outgoing, shadow, geometry, blur, or typography rules change

- [ ] **Step 4: Run the CSS test to verify it passes**

Run: `npm test -- src/styles/radiusScale.test.ts`

Expected: PASS

## Chunk 3: Verify The Finished Handoff Refinement

### Task 3: Run full verification

**Files:**
- Verify: `src/app/layout.test.ts`
- Verify: `src/projects/staggered-text/StaggeredTextProject.test.tsx`
- Verify: `src/styles/radiusScale.test.ts`
- Verify: `src/app/project/[id]/ProjectReferenceContent.test.tsx`
- Verify: `src/app/project/[id]/XPostReferenceEmbed.test.tsx`

- [ ] **Step 5: Run targeted tests**

Run: `npm test -- src/app/layout.test.ts src/projects/staggered-text/StaggeredTextProject.test.tsx src/styles/radiusScale.test.ts 'src/app/project/[id]/ProjectReferenceContent.test.tsx' 'src/app/project/[id]/XPostReferenceEmbed.test.tsx'`

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
  docs/superpowers/plans/2026-03-25-staggered-text-handoff-delay.md
git commit -m "fix: delay staggered text incoming handoff"
```
