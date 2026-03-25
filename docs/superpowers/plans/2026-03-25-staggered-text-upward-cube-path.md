# Staggered Text Upward Cube Path Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the outgoing face visibly rise upward while rotating so the staggered-text motion reads like a cube face rolling onto the top plane.

**Architecture:** Keep the current timing, typography, and component markup unchanged. Adjust only the active outgoing transform path in the staggered-text CSS so the arm and front glyph gain clearer upward screen-space travel while maintaining the existing top-edge hinge and top-face exit direction.

**Tech Stack:** React 19 client component, CSS Modules, Vitest

---

## Chunk 1: Lock The Upward Path In Tests

### Task 1: Add failing CSS expectations for the outgoing climb

**Files:**
- Modify: `src/styles/radiusScale.test.ts`

- [ ] **Step 1: Write the failing CSS regression test**

Update `src/styles/radiusScale.test.ts` so it asserts:
- `.trigger[data-active="true"] .outgoingArm` uses a transform with a clearer upward travel component
- `.trigger[data-active="true"] .outgoingGlyph` also uses a more upward-biased translate path
- the top-hinge origin remains `50% 12%`

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test -- src/styles/radiusScale.test.ts`

Expected: FAIL because the current active transforms still keep too much of the motion in place.

## Chunk 2: Adjust The Active Outgoing Path

### Task 2: Update the outgoing face transform path

**Files:**
- Modify: `src/projects/staggered-text/StaggeredTextProject.module.css`

- [ ] **Step 3: Implement the upward path adjustment**

Adjust `src/projects/staggered-text/StaggeredTextProject.module.css` so:
- the active outgoing arm transform gains more visible upward translation in screen space
- the active outgoing glyph transform also shifts upward enough to reinforce the cube-roll illusion
- top-face direction remains intact
- timing, blur values, typography, and reduced-motion behavior remain unchanged

- [ ] **Step 4: Run the CSS test to verify it passes**

Run: `npm test -- src/styles/radiusScale.test.ts`

Expected: PASS

## Chunk 3: Verify The Finished Motion Correction

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
  docs/superpowers/plans/2026-03-25-staggered-text-upward-cube-path.md
git commit -m "fix: lift staggered text cube path"
```
