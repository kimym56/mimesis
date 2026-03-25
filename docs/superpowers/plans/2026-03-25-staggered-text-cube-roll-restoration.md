# Staggered Text Cube Roll Restoration Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restore the earlier visible cube-roll motion while keeping the newer typography and proportional spacing improvements.

**Architecture:** Leave the current component markup and typography alone. Revert only the staggered-text motion timing in the CSS back to the last known good cube-roll profile from `a7cf3e2`: split outgoing/incoming stagger tracks, longer outgoing and incoming settle windows, and the original shadow timing. Keep the current font, slot sizing, and top-face geometry.

**Tech Stack:** React 19 client component, CSS Modules, Vitest

---

## Chunk 1: Lock The Restored Cube-Roll Timing In Tests

### Task 1: Add failing CSS expectations for the earlier timing profile

**Files:**
- Modify: `src/styles/radiusScale.test.ts`

- [ ] **Step 1: Write the failing CSS regression test**

Update `src/styles/radiusScale.test.ts` so it asserts:
- `.slot` contains `--outgoing-stagger-step: 24ms;`
- `.slot` contains `--incoming-stagger-step: 30ms;`
- `.slot` no longer expects the shared `--stagger-step: 70ms;`
- `.outgoingArm` uses `transform 788ms`
- `.outgoingGlyph` uses `transform 788ms`, `opacity 720ms`, and `filter 788ms`
- `.incomingGlyph` uses `transform 710ms`, `opacity 710ms`, and `filter 710ms`
- `.shadow` uses `opacity 788ms`, `transform 788ms`, and `filter 788ms`
- delays again use the split outgoing/incoming stagger variables

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test -- src/styles/radiusScale.test.ts`

Expected: FAIL because the stylesheet still uses the compressed `70ms / 215ms` timing profile.

## Chunk 2: Restore The Earlier Cube-Roll Timing

### Task 2: Revert the timing profile in the staggered-text CSS

**Files:**
- Modify: `src/projects/staggered-text/StaggeredTextProject.module.css`

- [ ] **Step 3: Restore the last known good motion timing**

Adjust `src/projects/staggered-text/StaggeredTextProject.module.css` so:
- `.slot` again defines `--outgoing-stagger-step: 24ms;`
- `.slot` again defines `--incoming-stagger-step: 30ms;`
- `.outgoingArm` uses `788ms`
- `.outgoingGlyph` uses `788ms / 720ms / 788ms`
- `.incomingGlyph` uses `710ms / 710ms / 710ms`
- `.shadow` uses `788ms / 788ms / 788ms`
- delays again point to the correct outgoing or incoming stagger variable
- typography, spacing, transforms, and reduced-motion rules stay unchanged

- [ ] **Step 4: Run the CSS test to verify it passes**

Run: `npm test -- src/styles/radiusScale.test.ts`

Expected: PASS

## Chunk 3: Verify The Restored Motion

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
  docs/superpowers/plans/2026-03-25-staggered-text-cube-roll-restoration.md
git commit -m "fix: restore staggered text cube roll motion"
```
