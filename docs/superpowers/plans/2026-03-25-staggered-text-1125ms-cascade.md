# Staggered Text 1125ms Cascade Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Retune the staggered-text motion so each character starts `70ms` after the previous one and the total first-start to last-stop cascade is `1125ms`.

**Architecture:** Keep the current 3D geometry, typography, and proportional layout intact. Replace the current split outgoing/incoming timing tracks in the staggered-text stylesheet with one shared `--stagger-step: 70ms`, shorten the motion stack so the longest per-letter transition resolves in `215ms`, and keep outgoing opacity slightly shorter than the full settle so the handoff remains readable without extending the total envelope.

**Tech Stack:** React 19 client component, CSS Modules, Vitest

---

## Chunk 1: Lock The 70ms / 215ms Timing Model In Tests

### Task 1: Add failing CSS expectations for the new cascade

**Files:**
- Modify: `src/styles/radiusScale.test.ts`

- [ ] **Step 1: Write the failing CSS regression test**

Update `src/styles/radiusScale.test.ts` so it asserts:
- `.slot` contains `--stagger-step: 70ms;`
- `.slot` no longer expects the split outgoing/incoming stagger variables
- `.outgoingArm` uses `transform 215ms`
- `.outgoingGlyph` uses `transform 215ms`, `opacity 190ms`, and `filter 215ms`
- `.incomingGlyph` uses `transform 215ms`, `opacity 215ms`, and `filter 215ms`
- `.outgoingArm`, `.outgoingGlyph`, `.incomingGlyph`, and `.shadow` all use `transition-delay: calc(var(--char-index) * var(--stagger-step));`

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test -- src/styles/radiusScale.test.ts`

Expected: FAIL because the stylesheet still uses split stagger variables and much longer durations.

## Chunk 2: Apply The 1125ms Timing Profile

### Task 2: Update the staggered-text CSS timing values

**Files:**
- Modify: `src/projects/staggered-text/StaggeredTextProject.module.css`

- [ ] **Step 3: Implement the shared timing profile**

Adjust `src/projects/staggered-text/StaggeredTextProject.module.css` so:
- `.slot` defines `--stagger-step: 70ms`
- `.outgoingArm`, `.outgoingGlyph`, `.incomingGlyph`, and `.shadow` all use the shared stagger delay
- `.outgoingArm` transition durations become `215ms`
- `.outgoingGlyph` uses `transform 215ms`, `opacity 190ms`, and `filter 215ms`
- `.incomingGlyph` uses `transform 215ms`, `opacity 215ms`, and `filter 215ms`
- `.shadow` timing also fits the `215ms` settle window

- [ ] **Step 4: Run the CSS test to verify it passes**

Run: `npm test -- src/styles/radiusScale.test.ts`

Expected: PASS

## Chunk 3: Verify The Finished Timing Retune

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
  docs/superpowers/plans/2026-03-25-staggered-text-1125ms-cascade.md
git commit -m "fix: retune staggered text to 1125ms cascade"
```
