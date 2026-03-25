# Staggered Text Schibsted Spacing Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the staggered-text demo use `Schibsted Grotesk` and natural proportional glyph spacing so the wordmark reads closer to the reference.

**Architecture:** Keep the current 3D roll interaction and timing model intact. Add a demo-specific Google font variable in the root layout, then update the staggered-text component so each animated slot includes a hidden sizing glyph that determines its natural width while the outgoing and incoming faces continue to animate in the same overlay structure.

**Tech Stack:** Next.js App Router, React 19, `next/font/google`, CSS Modules, Vitest

---

## Chunk 1: Lock The Typography And Slot Structure In Tests

### Task 1: Add failing regressions for the new font and proportional slot sizing

**Files:**
- Create: `src/app/layout.test.ts`
- Modify: `src/projects/staggered-text/StaggeredTextProject.test.tsx`
- Modify: `src/styles/radiusScale.test.ts`

- [ ] **Step 1: Write the failing tests**

Add assertions so that:
- `src/app/layout.test.ts` proves `src/app/layout.tsx` imports `Schibsted_Grotesk`, defines a `--font-schibsted-grotesk` variable, and adds that variable class to `<body>`
- `src/projects/staggered-text/StaggeredTextProject.test.tsx` expects one hidden sizing glyph per animated character using a dedicated `data-part`
- `src/styles/radiusScale.test.ts` expects the wordmark to use `font-family: var(--font-schibsted-grotesk), sans-serif;` and no longer expects the old fixed-width slot spacing model

- [ ] **Step 2: Run the tests to verify they fail**

Run: `npm test -- src/app/layout.test.ts src/projects/staggered-text/StaggeredTextProject.test.tsx src/styles/radiusScale.test.ts`

Expected: FAIL because the layout does not yet expose `Schibsted_Grotesk`, the component has no sizing glyph, and the CSS still uses the shared heading font and fixed slot width.

## Chunk 2: Wire The Font And Proportional Slot Layout

### Task 2: Implement the font import and markup/style changes

**Files:**
- Modify: `src/app/layout.tsx`
- Modify: `src/projects/staggered-text/StaggeredTextProject.tsx`
- Modify: `src/projects/staggered-text/StaggeredTextProject.module.css`

- [ ] **Step 3: Add the demo-specific font variable**

Update `src/app/layout.tsx` so it:
- imports `Schibsted_Grotesk` from `next/font/google`
- defines a font instance with `variable: "--font-schibsted-grotesk"`
- adds that font variable class to the `<body>` alongside the existing font variables

- [ ] **Step 4: Add proportional sizing markup**

Update `src/projects/staggered-text/StaggeredTextProject.tsx` so each animated slot renders:
- a hidden sizing glyph element with a dedicated `data-part`
- the existing outgoing arm / outgoing glyph
- the existing incoming glyph
- the existing shadow

- [ ] **Step 5: Retune the wordmark CSS**

Update `src/projects/staggered-text/StaggeredTextProject.module.css` so:
- `.wordmark` uses `var(--font-schibsted-grotesk), sans-serif`
- per-letter container gap is removed or reduced to zero
- slot width is driven by the hidden sizing glyph instead of the old fixed-width model
- the manual space width and weight/tracking are retuned to read closer to the reference
- the existing motion geometry, blur, timing, and reduced-motion rules stay intact

- [ ] **Step 6: Run the tests to verify they pass**

Run: `npm test -- src/app/layout.test.ts src/projects/staggered-text/StaggeredTextProject.test.tsx src/styles/radiusScale.test.ts`

Expected: PASS

## Chunk 3: Verify The Finished Typography Refinement

### Task 3: Run full verification

**Files:**
- Verify: `src/app/layout.test.ts`
- Verify: `src/projects/staggered-text/StaggeredTextProject.test.tsx`
- Verify: `src/styles/radiusScale.test.ts`
- Verify: `src/app/project/[id]/ProjectReferenceContent.test.tsx`
- Verify: `src/app/project/[id]/XPostReferenceEmbed.test.tsx`

- [ ] **Step 7: Run targeted tests**

Run: `npm test -- src/app/layout.test.ts src/projects/staggered-text/StaggeredTextProject.test.tsx src/styles/radiusScale.test.ts 'src/app/project/[id]/ProjectReferenceContent.test.tsx' 'src/app/project/[id]/XPostReferenceEmbed.test.tsx'`

Expected: PASS

- [ ] **Step 8: Run lint**

Run: `npm run lint`

Expected: PASS

- [ ] **Step 9: Run production build**

Run: `npm run build`

Expected: PASS

- [ ] **Step 10: Commit the implementation**

```bash
git add src/app/layout.tsx \
  src/app/layout.test.ts \
  src/projects/staggered-text/StaggeredTextProject.tsx \
  src/projects/staggered-text/StaggeredTextProject.test.tsx \
  src/projects/staggered-text/StaggeredTextProject.module.css \
  src/styles/radiusScale.test.ts \
  docs/superpowers/plans/2026-03-25-staggered-text-schibsted-spacing.md
git commit -m "fix: match staggered text wordmark typography"
```
