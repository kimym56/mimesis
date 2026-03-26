# Staggered Text Timing GUI Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a development-only `lil-gui` panel for live staggered-text timing tuning while keeping production behavior unchanged.

**Architecture:** Move the staggered-text timing defaults and GUI metadata into a shared tuning module, expose a dev-only `useStaggeredTextGui` hook that updates local component state, and route that state into both the WAAPI timing options and CSS custom properties so the primary and fallback animation paths stay synchronized.

**Tech Stack:** React 19 client components, TypeScript, CSS Modules, `lil-gui`, Vitest

---

## Chunk 1: Lock The Tuning Surface With Failing Tests

### Task 1: Add regression coverage for tuning defaults and the dev-only GUI hook

**Files:**
- Create: `src/projects/staggered-text/staggeredTextTuning.test.ts`
- Create: `src/projects/staggered-text/useStaggeredTextGui.test.tsx`

- [ ] **Step 1: Write the failing tuning metadata test**

Assert that the shared defaults expose the approved staggered-text timing values and that every GUI control has a broad, explicit range for exploratory tuning.

- [ ] **Step 2: Write the failing GUI hook test**

Mirror the existing wiper `lil-gui` test pattern so the new hook is required to:
- create one panel in development,
- skip panel creation in production,
- update the live timing state when a control changes.

- [ ] **Step 3: Run the new tests to verify they fail**

Run: `npm test -- src/projects/staggered-text/staggeredTextTuning.test.ts src/projects/staggered-text/useStaggeredTextGui.test.tsx`

Expected: FAIL because the tuning module and hook do not exist yet.

## Chunk 2: Implement The Shared Timing Model And Dev-Only GUI

### Task 2: Add the tuning module and GUI hook

**Files:**
- Create: `src/projects/staggered-text/staggeredTextTuning.ts`
- Create: `src/projects/staggered-text/useStaggeredTextGui.ts`

- [ ] **Step 4: Implement the shared tuning defaults and GUI metadata**

Add a focused tuning module that defines the timing interface, default values, and folder/control metadata for the `lil-gui` panel.

- [ ] **Step 5: Implement the dev-only GUI hook**

Follow the existing dynamic-import `lil-gui` pattern from the wiper project, keep the panel closed by default, and use `startTransition` for non-urgent state updates.

- [ ] **Step 6: Run the new tests to verify the module and hook pass**

Run: `npm test -- src/projects/staggered-text/staggeredTextTuning.test.ts src/projects/staggered-text/useStaggeredTextGui.test.tsx`

Expected: PASS

## Chunk 3: Wire The Staggered Text Project To Live Tuning

### Task 3: Replace fixed timing constants with shared tuning state

**Files:**
- Modify: `src/projects/staggered-text/StaggeredTextProject.tsx`
- Modify: `src/projects/staggered-text/StaggeredTextProject.test.tsx`

- [ ] **Step 7: Update the component to use shared timing state**

Initialize local timing state from the shared defaults, attach the dev-only GUI hook, and feed the live values into both:
- WAAPI `delay`, `duration`, and `endDelay`
- CSS variables for the fallback path

- [ ] **Step 8: Update component tests for the shared timing model**

Assert the rendered character slots receive the timing CSS variables and that the WAAPI animation options still reflect the shared default tuning values.

- [ ] **Step 9: Run the staggered-text component tests**

Run: `npm test -- src/projects/staggered-text/StaggeredTextProject.test.tsx`

Expected: PASS

## Chunk 4: Verify The Finished Integration

### Task 4: Run regression checks

**Files:**
- Verify: `src/projects/staggered-text/staggeredTextTuning.test.ts`
- Verify: `src/projects/staggered-text/useStaggeredTextGui.test.tsx`
- Verify: `src/projects/staggered-text/StaggeredTextProject.test.tsx`

- [ ] **Step 10: Run targeted tests**

Run: `npm test -- src/projects/staggered-text/staggeredTextTuning.test.ts src/projects/staggered-text/useStaggeredTextGui.test.tsx src/projects/staggered-text/StaggeredTextProject.test.tsx`

Expected: PASS

- [ ] **Step 11: Run lint**

Run: `npm run lint`

Expected: PASS
