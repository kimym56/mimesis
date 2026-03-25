# Staggered Text Mirrored Handoff Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make release use the same cube-roll handoff pattern in reverse, with an `80ms` gap between the visible face leaving and the returning face arriving.

**Architecture:** Keep the current cube geometry, transforms, and typography unchanged. Move the handoff timing to direction-specific CSS delays: base/inactive rules define the release path, active rules override delays for the forward path, and the slot-level handoff variable becomes `80ms`.

**Tech Stack:** React 19 client component, CSS Modules, Vitest

---

## Chunk 1: Lock The Mirrored 80ms Handoff In Tests

### Task 1: Add failing CSS expectations for direction-specific delays

**Files:**
- Modify: `src/styles/radiusScale.test.ts`

- [ ] **Step 1: Write the failing CSS regression test**

Update `src/styles/radiusScale.test.ts` so it asserts:
- `.slot` contains `--handoff-delay: 80ms;`
- base `.outgoingArm` and `.outgoingGlyph` delays include `+ var(--handoff-delay)` for release
- base `.incomingGlyph` delay is just `calc(var(--char-index) * var(--incoming-stagger-step));`
- active `.trigger[data-active="true"] .outgoingArm` and `.trigger[data-active="true"] .outgoingGlyph` delays use only the outgoing stagger
- active `.trigger[data-active="true"] .incomingGlyph` delay includes `+ var(--handoff-delay)` for forward motion

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test -- src/styles/radiusScale.test.ts`

Expected: FAIL because the stylesheet still uses a one-way incoming handoff delay and the old `160ms` value.

## Chunk 2: Implement The Mirrored Delay Rules

### Task 2: Update the staggered-text CSS timing ownership

**Files:**
- Modify: `src/projects/staggered-text/StaggeredTextProject.module.css`

- [ ] **Step 3: Implement mirrored 80ms delays**

Adjust `src/projects/staggered-text/StaggeredTextProject.module.css` so:
- `.slot` sets `--handoff-delay: 80ms`
- base/inactive `.outgoingArm` and `.outgoingGlyph` delays include the handoff delay
- base/inactive `.incomingGlyph` delay uses only the incoming stagger
- active `.outgoingArm` and `.outgoingGlyph` override delay back to the plain outgoing stagger
- active `.incomingGlyph` overrides delay to the incoming stagger plus handoff delay
- no transforms, durations, blur values, or typography rules change

- [ ] **Step 4: Run the CSS test to verify it passes**

Run: `npm test -- src/styles/radiusScale.test.ts`

Expected: PASS

## Chunk 3: Verify The Finished Release Motion

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
  docs/superpowers/plans/2026-03-25-staggered-text-mirrored-handoff.md
git commit -m "fix: mirror staggered text handoff timing"
```
