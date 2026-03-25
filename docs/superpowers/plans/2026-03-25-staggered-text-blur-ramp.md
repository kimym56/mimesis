# Staggered Text Blur Ramp Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Strengthen the per-character blur fade so outgoing glyphs blur out more clearly and incoming glyphs clear from a stronger blur more slowly.

**Architecture:** Keep the current top-edge hinge and layered outgoing/incoming glyph structure. Only the glyph-level CSS changes: stronger blur values, explicit crisp-to-blur outgoing states, and a longer incoming filter transition so every staggered character visibly fades in through blur.

**Tech Stack:** React 19 client components, CSS Modules, Vitest

---

## Chunk 1: Lock The Blur Ramp With A Failing Regression

### Task 1: Add failing CSS expectations for the stronger blur handoff

**Files:**
- Modify: `src/styles/radiusScale.test.ts`

- [x] **Step 1: Write the failing CSS regression test**

Update `src/styles/radiusScale.test.ts` so it asserts:
- `.outgoingGlyph` explicitly starts with `filter: blur(0);`,
- `.incomingGlyph` starts with a stronger blur value than the current `4px`,
- the active `.outgoingGlyph` blur is stronger than the current `4px`,
- `.incomingGlyph` uses a longer `filter` transition duration to clear to `0`.

- [x] **Step 2: Run the test to verify it fails**

Run: `npm test -- src/styles/radiusScale.test.ts`

Expected: FAIL because the current CSS still uses the weaker `4px` blur setup and shared transition timing.

## Chunk 2: Strengthen The Per-Character Blur Handoff

### Task 2: Update the glyph blur and timing

**Files:**
- Modify: `src/projects/staggered-text/StaggeredTextProject.module.css`

- [x] **Step 3: Update outgoing and incoming blur values**

Adjust `src/projects/staggered-text/StaggeredTextProject.module.css` so:
- `.outgoingGlyph` explicitly starts crisp and blurs more strongly on active state,
- `.incomingGlyph` starts blurrier than before,
- `.incomingGlyph` uses a slower filter clear than the current shared timing.

- [x] **Step 4: Run the CSS test to verify it passes**

Run: `npm test -- src/styles/radiusScale.test.ts`

Expected: PASS

## Chunk 3: Verify The Finished Refinement

### Task 3: Run regression checks

**Files:**
- Verify: `src/projects/staggered-text/StaggeredTextProject.test.tsx`
- Verify: `src/styles/radiusScale.test.ts`
- Verify: `src/app/project/[id]/ProjectReferenceContent.test.tsx`
- Verify: `src/app/project/[id]/XPostReferenceEmbed.test.tsx`

- [x] **Step 5: Run targeted tests**

Run: `npm test -- src/projects/staggered-text/StaggeredTextProject.test.tsx src/styles/radiusScale.test.ts 'src/app/project/[id]/ProjectReferenceContent.test.tsx' 'src/app/project/[id]/XPostReferenceEmbed.test.tsx'`

Expected: PASS

- [x] **Step 6: Run lint**

Run: `npm run lint`

Expected: PASS

- [x] **Step 7: Run production build**

Run: `npm run build`

Expected: PASS

- [ ] **Step 8: Commit the implementation**

```bash
git add src/projects/staggered-text/StaggeredTextProject.module.css \
  src/styles/radiusScale.test.ts \
  docs/superpowers/plans/2026-03-25-staggered-text-blur-ramp.md
git commit -m "fix: strengthen staggered text blur ramp"
```
