# Staggered Text Top-Right Instruction Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a shared top-right helper label to the staggered text preview that changes copy between hover and button modes.

**Architecture:** Keep the instruction copy in `StaggeredTextProject.tsx`, where mode state already lives, and position the label from the shared CSS module so it stays aligned with the preview frame in both modes. Verify the behavior with the existing project-level component test before and after implementation.

**Tech Stack:** Next.js App Router, React 19, TypeScript, CSS Modules, Vitest + jsdom

---

## Chunk 1: Mode-Driven Instruction Label

### Task 1: Add the failing test

**Files:**
- Modify: `src/projects/staggered-text/StaggeredTextProject.test.tsx`

- [ ] **Step 1: Write the failing test assertions**

Add expectations that the default hover mode renders `Hover to preview`, and that toggling to button mode updates the same helper element to `Press to preview`.

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- src/projects/staggered-text/StaggeredTextProject.test.tsx`
Expected: FAIL because the instruction element does not exist yet.

### Task 2: Implement the helper label

**Files:**
- Modify: `src/projects/staggered-text/StaggeredTextProject.tsx`
- Modify: `src/projects/staggered-text/StaggeredTextProject.module.css`

- [ ] **Step 1: Render the shared instruction element**

Add a mode-to-copy mapping in `StaggeredTextProject.tsx` and render a helper element inside the preview frame.

- [ ] **Step 2: Add positioning and typography styles**

Create a muted, absolutely positioned top-right label in `StaggeredTextProject.module.css` and ensure the preview frame establishes the positioning context.

- [ ] **Step 3: Run the targeted test to verify it passes**

Run: `npm test -- src/projects/staggered-text/StaggeredTextProject.test.tsx`
Expected: PASS

- [ ] **Step 4: Run focused lint verification**

Run: `npm run lint -- src/projects/staggered-text/StaggeredTextProject.tsx src/projects/staggered-text/StaggeredTextProject.module.css src/projects/staggered-text/StaggeredTextProject.test.tsx`
Expected: PASS or a note if the repo lint script does not support file arguments.
