# Staggered Text Mirrored Handoff 60ms Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Keep mirrored handoff timing in both directions while shortening the handoff gap to `60ms`.

**Architecture:** Reuse the current direction-specific delay ownership in the staggered-text CSS. Only the handoff variable and its regression expectation change from `80ms` to `60ms`.

**Tech Stack:** React 19 client component, CSS Modules, Vitest

---

## Chunk 1: Lock The 60ms Value In Tests

### Task 1: Update the mirrored handoff regression

**Files:**
- Modify: `src/styles/radiusScale.test.ts`

- [ ] **Step 1: Write the failing expectation**

Change the slot-level handoff expectation from `80ms` to `60ms`.

- [ ] **Step 2: Run the CSS test to verify it fails or reflects the mismatch**

Run: `npm test -- src/styles/radiusScale.test.ts`

Expected: The old `80ms` expectation no longer matches the approved value.

## Chunk 2: Verify The Adjusted Mirrored Handoff

### Task 2: Re-run verification

**Files:**
- Verify: `src/app/layout.test.ts`
- Verify: `src/projects/staggered-text/StaggeredTextProject.test.tsx`
- Verify: `src/styles/radiusScale.test.ts`
- Verify: `src/app/project/[id]/ProjectReferenceContent.test.tsx`
- Verify: `src/app/project/[id]/XPostReferenceEmbed.test.tsx`

- [ ] **Step 3: Run targeted tests**

Run: `npm test -- src/app/layout.test.ts src/projects/staggered-text/StaggeredTextProject.test.tsx src/styles/radiusScale.test.ts 'src/app/project/[id]/ProjectReferenceContent.test.tsx' 'src/app/project/[id]/XPostReferenceEmbed.test.tsx'`

Expected: PASS

- [ ] **Step 4: Run lint**

Run: `npm run lint`

Expected: PASS

- [ ] **Step 5: Run production build**

Run: `npm run build`

Expected: PASS
