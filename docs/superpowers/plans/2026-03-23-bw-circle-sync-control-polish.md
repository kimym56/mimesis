# Bw Circle Sync Control Polish Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reorder the Sync control row to place BPM beside Play, remove BPM chrome, align control radii with `var(--radius-xl)`, and keep BPM readable against the scene.

**Architecture:** Keep the existing `BwCircleYouTubePanel` structure and make a small JSX reorder plus CSS updates in the shared bw-circle module stylesheet. Use tests first to lock row order and BPM presentation before changing production code.

**Tech Stack:** React 19, Next.js 16, TypeScript, CSS Modules, Vitest

---

## Chunk 1: Panel Markup And Styling

### Task 1: Lock the Sync row order in tests

**Files:**
- Modify: `src/projects/bw-circle/BwCircleYouTubePanel.test.tsx`

- [ ] **Step 1: Write failing test for the rendered row order**
- [ ] **Step 2: Run `npm test -- src/projects/bw-circle/BwCircleYouTubePanel.test.tsx` and confirm failure**
- [ ] **Step 3: Keep the test focused on `link | play | bpm` ordering**
- [ ] **Step 4: Re-run `npm test -- src/projects/bw-circle/BwCircleYouTubePanel.test.tsx` after implementation and confirm pass**

### Task 2: Reorder the row and simplify BPM chrome

**Files:**
- Modify: `src/projects/bw-circle/BwCircleYouTubePanel.tsx`
- Modify: `src/projects/bw-circle/BwCircleProject.module.css`

- [ ] **Step 1: Move BPM markup to the right of Play/Stop**
- [ ] **Step 2: Remove BPM border/background styling**
- [ ] **Step 3: Change link and play radii to `var(--radius-xl)`**
- [ ] **Step 4: Add CSS-based adaptive BPM contrast treatment**

## Chunk 2: Verification

### Task 3: Focused verification

**Files:**
- Test: `src/projects/bw-circle/BwCircleYouTubePanel.test.tsx`
- Test: `src/projects/bw-circle/BwCircleProjectPlayback.test.tsx`
- Test: `src/projects/bw-circle/BwCircleProject.test.tsx`

- [ ] **Step 1: Run `npm test -- src/projects/bw-circle/BwCircleYouTubePanel.test.tsx src/projects/bw-circle/BwCircleProjectPlayback.test.tsx src/projects/bw-circle/BwCircleProject.test.tsx`**
- [ ] **Step 2: Run `npm run lint`**
- [ ] **Step 3: Run `npm run build`**
