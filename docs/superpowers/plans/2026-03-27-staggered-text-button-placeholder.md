# Staggered Text Button Placeholder Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make button mode start with an empty text input, show `Type Anything` as the input placeholder, and render `Type Anything` in the preview when the input is empty.

**Architecture:** Keep the existing button-mode data flow simple. Tighten the existing UI test to assert placeholder semantics, then initialize button text state as empty and let the preview component use `Type Anything` for both the input placeholder and the preview fallback.

**Tech Stack:** Next.js App Router, React 19, TypeScript, Vitest, jsdom

---

## Chunk 1: Button fallback alignment

### Task 1: Lock the expected fallback behavior in tests

**Files:**
- Modify: `src/projects/staggered-text/StaggeredTextProject.test.tsx`
- Test: `src/projects/staggered-text/StaggeredTextProject.test.tsx`

- [ ] **Step 1: Write the failing test**

Add assertions that button mode starts with an empty input, that the input placeholder is `Type Anything`, and that clearing the input keeps the preview fallback at `Type Anything`.

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- src/projects/staggered-text/StaggeredTextProject.test.tsx`
Expected: FAIL because button mode still seeds the input with `Type Anything` instead of leaving it empty.

- [ ] **Step 3: Write minimal implementation**

Update `src/projects/staggered-text/StaggeredTextProject.tsx` to initialize button text as empty and update `src/projects/staggered-text/StaggeredTextButtonPreview.tsx` to expose `placeholder="Type Anything"` while preserving the preview fallback.

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- src/projects/staggered-text/StaggeredTextProject.test.tsx`
Expected: PASS
