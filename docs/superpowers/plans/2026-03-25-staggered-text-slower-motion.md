# Staggered Text Slower Motion Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Slow the full staggered-text character motion so the movement, fade, blur, and stagger all feel less rushed.

**Architecture:** Keep the current top-edge hinge and stronger blur ramp. Only the CSS timings change: increase the movement durations for the outgoing arm and incoming rise, lengthen opacity and filter timings to match, and widen the stagger step so the cascade spacing supports the slower motion.

**Tech Stack:** React 19 client components, CSS Modules, Vitest

---

## Chunk 1: Lock The Slower Timing Profile With A Failing Regression

### Task 1: Add failing CSS expectations for the slower motion

**Files:**
- Modify: `src/styles/radiusScale.test.ts`

- [x] **Step 1: Write the failing CSS regression test**

Update `src/styles/radiusScale.test.ts` so it asserts:
- `.slot` uses the slower stagger step,
- `.outgoingArm` uses the slower transform transition duration,
- `.outgoingGlyph` uses slower transform/opacity/filter timings,
- `.incomingGlyph` uses slower transform/opacity/filter timings.

- [x] **Step 2: Run the test to verify it fails**

Run: `npm test -- src/styles/radiusScale.test.ts`

Expected: FAIL because the current CSS still uses the faster motion profile.

## Chunk 2: Slow The Motion

### Task 2: Update the CSS timing values

**Files:**
- Modify: `src/projects/staggered-text/StaggeredTextProject.module.css`

- [x] **Step 3: Increase the motion durations**

Adjust `src/projects/staggered-text/StaggeredTextProject.module.css` so:
- `--stagger-step` increases into the mid-30ms range,
- outgoing arm/incoming movement use the slower transform duration,
- outgoing/incoming opacity and filter durations are lengthened to match the slower cadence.

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
  docs/superpowers/plans/2026-03-25-staggered-text-slower-motion.md
git commit -m "fix: slow staggered text motion"
```
