# Staggered Text Button Input UI Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the button-mode text input inside the staggered-text preview read as a simple, clearly editable editorial control on the black stage, without a label.

**Architecture:** Keep the existing overlay layout and button-stage behavior intact. Tighten the UI contract with a targeted test, then keep the label-free markup and adjust the CSS to replace the filled field with an underline-style treatment that feels integrated with the black stage.

**Tech Stack:** Next.js App Router, React 19, TypeScript, CSS Modules, Vitest, jsdom

---

## Chunk 1: Simple in-stage input polish

### Task 1: Lock the intended label-free underline field contract in tests

**Files:**
- Modify: `src/projects/staggered-text/StaggeredTextProject.test.tsx`
- Test: `src/projects/staggered-text/StaggeredTextProject.test.tsx`

- [ ] **Step 1: Write the failing test**

Add assertions that button mode does not render the old `Text` label, keeps the overlay field structure inside the implementation shell, and uses an underline-style treatment instead of the filled input background.

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- src/projects/staggered-text/StaggeredTextProject.test.tsx`
Expected: FAIL because the current input styling still uses the filled field treatment.

### Task 2: Keep the label removed and switch the field to an underline treatment

**Files:**
- Modify: `src/projects/staggered-text/StaggeredTextButtonPreview.tsx`
- Modify: `src/projects/staggered-text/StaggeredTextProject.module.css`
- Test: `src/projects/staggered-text/StaggeredTextProject.test.tsx`

- [ ] **Step 3: Write minimal implementation**

Keep the button preview markup label-free and leave the input in the existing overlay container. Restyle the overlay field with a transparent surface, light text, muted placeholder, no full border, and a thin bottom rule with a restrained focus state.

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- src/projects/staggered-text/StaggeredTextProject.test.tsx`
Expected: PASS

- [ ] **Step 5: Run broader verification**

Run: `npm run lint`
Expected: PASS
