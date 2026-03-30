# Home Header Image Crop Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Shift the home header artwork upward slightly so more of the top of the image is visible.

**Architecture:** Keep the change isolated to the global home header image rule in `src/app/globals.css`. Because this is a presentation-only crop adjustment, verify it with a production build rather than introducing new tests.

**Tech Stack:** Next.js App Router, React 19, TypeScript, global CSS

---

## Chunk 1: Header Image Framing

### Task 1: Adjust the crop position

**Files:**
- Modify: `src/app/globals.css`

- [ ] **Step 1: Update the header image object position**

Change `.home-header-cover-image` from `object-position: center 45%;` to `object-position: center 38%;`.

- [ ] **Step 2: Run build verification**

Run: `npm run build`
Expected: PASS

- [ ] **Step 3: Record lint caveat**

Note that `npm run lint` is not a reliable verification command in the current repo state because it traverses generated nested `.next/dev` artifacts and fails outside the scope of this change.

- [ ] **Step 4: Execution constraint**

Execute this plan in the current session. The harness instructions for this session do not allow spawning subagents unless the user explicitly requests them, so local execution is required here.
