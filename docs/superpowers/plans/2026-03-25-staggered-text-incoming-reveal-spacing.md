# Staggered Text Incoming Reveal Spacing Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the fade-in cadence between staggered-text characters read more distinctly while keeping the full `S`-to-`g` motion within about `1.1s`.

**Architecture:** Keep the current 3D cube-roll structure and active transforms unchanged. Split the single stagger timing into separate outgoing and incoming CSS tracks so the outgoing roll stays at `24ms` / `788ms`, while the incoming reveal widens to `30ms` and settles in `710ms`, preserving the same total cascade length.

**Tech Stack:** React 19 client components, CSS Modules, Vitest

---

## Chunk 1: Lock The Split Timing Model In Tests

### Task 1: Add failing CSS expectations for separate outgoing and incoming tracks

**Files:**
- Modify: `src/styles/radiusScale.test.ts`

- [ ] **Step 1: Write the failing CSS regression test**

Update `src/styles/radiusScale.test.ts` so it asserts:
- `.slot` contains `--outgoing-stagger-step: 24ms;`
- `.slot` contains `--incoming-stagger-step: 30ms;`
- `.outgoingArm` still uses `transform 788ms`
- `.outgoingGlyph` still uses `transform 788ms`, `opacity 720ms`, and `filter 788ms`
- `.incomingGlyph` now uses `transform 710ms`, `opacity 710ms`, and `filter 710ms`
- `.incomingGlyph` uses `transition-delay: calc(var(--char-index) * var(--incoming-stagger-step));`

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test -- src/styles/radiusScale.test.ts`

Expected: FAIL because the CSS still uses the single `24ms` stagger and `788ms` incoming timings.

## Chunk 2: Split The Reveal Timing In CSS

### Task 2: Update staggered-text timing values

**Files:**
- Modify: `src/projects/staggered-text/StaggeredTextProject.module.css`

- [ ] **Step 3: Implement the split stagger timing**

Adjust `src/projects/staggered-text/StaggeredTextProject.module.css` so:
- `.slot` defines `--outgoing-stagger-step: 24ms;`
- `.slot` defines `--incoming-stagger-step: 30ms;`
- `.outgoingArm`, `.outgoingGlyph`, and `.shadow` keep using the outgoing stagger delay
- `.incomingGlyph` uses the incoming stagger delay
- `.incomingGlyph` transition durations become `710ms` for transform, opacity, and filter
- no geometry, blur values, or active-state transforms change

- [ ] **Step 4: Run the CSS test to verify it passes**

Run: `npm test -- src/styles/radiusScale.test.ts`

Expected: PASS

## Chunk 3: Verify The Finished Motion Refinement

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
  docs/superpowers/plans/2026-03-25-staggered-text-incoming-reveal-spacing.md
git commit -m "fix: widen staggered text incoming reveal spacing"
```
