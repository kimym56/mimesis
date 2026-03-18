# Black & White Circle Faithful Canvas Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refine the black-white-circle project so the left pane is a closer 2D-canvas mimesis of the original with minimal UI and the right pane shows a Threads preview card instead of a broken iframe.

**Architecture:** Keep the project route generic, add structured preview metadata for non-embeddable references, and isolate reference rendering behind a dedicated component. In the feature folder, use one shared 2D canvas scene with distinct `mimesis` and `sync` motion profiles so the original-like mode and edited mode can diverge cleanly without duplicating the whole shell.

**Tech Stack:** Next.js App Router, React 19 client components, TypeScript, CSS Modules, Canvas 2D, Vitest, ESLint.

---

## Chunk 1: Reference rendering and project metadata

### Task 1: Add failing tests for non-embeddable reference preview data

**Files:**
- Modify: `src/data/projects.test.ts`
- Create: `src/app/project/[id]/ProjectReferenceContent.test.tsx`
- Create: `src/app/project/[id]/ProjectReferenceContent.tsx`

- [ ] **Step 1: Write the failing data-layer test**

Add a test in `src/data/projects.test.ts` asserting that `black-white-circle` has:
- no iframe-only reference expectation
- `referencePreview` metadata with `platform: "threads"`
- a Threads URL, preview image URL, and description text

Run: `npm test -- src/data/projects.test.ts`
Expected: FAIL because the metadata does not exist yet.

- [ ] **Step 2: Write the failing reference-render test**

Create `src/app/project/[id]/ProjectReferenceContent.test.tsx` to assert:
- preview-card rendering is used when a project has `referencePreview`
- no iframe is rendered in that case
- the Threads link remains clickable

Run: `npm test -- 'src/app/project/[id]/ProjectReferenceContent.test.tsx'`
Expected: FAIL because the component does not exist yet.

- [ ] **Step 3: Implement the minimal metadata and reference renderer**

Update `src/data/projects.ts` to add structured preview metadata to `Project` and populate the black-white-circle entry with the Threads post metadata.

Create `src/app/project/[id]/ProjectReferenceContent.tsx` so it renders:
- preview card when `referencePreview` exists
- iframe when `referenceEmbed` exists
- fallback image otherwise

- [ ] **Step 4: Wire the detail page to the new reference renderer**

Modify `src/app/project/[id]/ProjectDetailClient.tsx` to delegate right-pane rendering to `ProjectReferenceContent`.

- [ ] **Step 5: Re-run the focused tests**

Run: `npm test -- src/data/projects.test.ts 'src/app/project/[id]/ProjectReferenceContent.test.tsx'`
Expected: PASS.

---

## Chunk 2: Black-white-circle shell behavior

### Task 2: Lock the minimal UI contract with failing tests

**Files:**
- Modify: `src/projects/bw-circle/BwCircleProject.test.tsx`
- Modify: `src/projects/bw-circle/BwCircleProject.tsx`
- Modify: `src/projects/bw-circle/BwCircleScene.tsx`
- Modify: `src/projects/bw-circle/BwCircleProject.module.css`

- [ ] **Step 1: Write a failing component test for the minimal mimesis controls**

Update `BwCircleProject.test.tsx` so it asserts:
- `Mimesis` is still the default mode
- the scene shows only the single `N` control instead of `W` and `B`
- the descriptive status copy is not present in mimesis mode
- sync mode still reveals the YouTube link input

Run: `npm test -- src/projects/bw-circle/BwCircleProject.test.tsx`
Expected: FAIL because the current scene still renders the larger control/status UI.

- [ ] **Step 2: Implement the minimal shell changes**

Update the project and scene components so the canvas scene only exposes the single `N` control and removes the descriptive status card.

- [ ] **Step 3: Re-run the focused component test**

Run: `npm test -- src/projects/bw-circle/BwCircleProject.test.tsx`
Expected: PASS.

---

## Chunk 3: Faithful 2D canvas behavior

### Task 3: Refactor the scene into clearer motion profiles

**Files:**
- Create: `src/projects/bw-circle/bwCircleMimesis.ts`
- Modify: `src/projects/bw-circle/bwCircleSimulation.ts`
- Modify: `src/projects/bw-circle/bwCircleSimulation.test.ts`
- Modify: `src/projects/bw-circle/BwCircleScene.tsx`

- [ ] **Step 1: Write a failing helper test for the mimesis motion profile**

Add a test that expects a dedicated mimesis helper to produce original-style motion values:
- normal view only
- time-based rotation pacing
- stable opposing ball seeds

Run: `npm test -- src/projects/bw-circle/bwCircleSimulation.test.ts`
Expected: FAIL because the helper does not exist yet.

- [ ] **Step 2: Implement the minimal mimesis motion helper**

Create `bwCircleMimesis.ts` or extend `bwCircleSimulation.ts` with a pure helper that returns the original-style motion parameters from elapsed time.

- [ ] **Step 3: Apply the helper to the 2D canvas scene**

Refactor `BwCircleScene.tsx` so:
- `mimesis` mode uses the new faithful motion profile
- the background and circle drawing more closely match the original piece
- `sync` mode still layers pseudo-sync modulation on top of the same 2D base

- [ ] **Step 4: Re-run the helper and component tests**

Run: `npm test -- src/projects/bw-circle/bwCircleSimulation.test.ts src/projects/bw-circle/BwCircleProject.test.tsx`
Expected: PASS.

---

## Chunk 4: Final verification

### Task 4: Run verification and inspect repo state

**Files:**
- Modify: `docs/superpowers/plans/2026-03-17-bw-circle-faithful-canvas.md`

- [ ] **Step 1: Run the targeted black-white-circle and reference tests**

Run: `npm test -- src/data/projects.test.ts 'src/app/project/[id]/ProjectReferenceContent.test.tsx' src/projects/bw-circle/bwCircleSimulation.test.ts src/projects/bw-circle/BwCircleProject.test.tsx`
Expected: PASS.

- [ ] **Step 2: Run lint**

Run: `npm run lint`
Expected: PASS.

- [ ] **Step 3: Run build**

Run: `npm run build`
Expected: PASS.

- [ ] **Step 4: Run the full test suite and record unrelated failures if any remain**

Run: `npm test`
Expected: PASS, or if unrelated pre-existing failures remain, report them explicitly with file names.

- [ ] **Step 5: Review changed files**

Run: `git status --short`
Expected: intended black-white-circle/reference files plus any already-existing unrelated user changes.
