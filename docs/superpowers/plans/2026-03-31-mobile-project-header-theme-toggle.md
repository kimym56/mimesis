# Mobile Project Header And Theme Toggle Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Hide the fixed theme toggle on mobile while scrolling down within project detail pages, reveal it again on upward scroll, and replace the text back link with a compact back arrow before the `My Mimesis` label.

**Architecture:** Keep the scroll-direction logic inside the existing global `ThemeToggle` component, but scope the behavior to mobile project-detail routes via pathname and viewport checks. Update the project detail header markup and CSS so the first pane starts with an inline back arrow and `My Mimesis` label instead of a standalone `Back to Projects` link.

**Tech Stack:** Next.js App Router, React 19, TypeScript, CSS Modules, Vitest, Lucide React

---

## Chunk 1: Test And Implement Mobile Project Detail Controls

### Task 1: Add Failing Coverage

**Files:**
- Create: `src/components/ThemeToggle.test.tsx`
- Modify: `src/components/ProjectGrid.test.tsx` only if shared mocks are needed

- [ ] **Step 1: Write the failing test**

Add coverage for:
- `ThemeToggle` stays visible by default on non-project routes.
- `ThemeToggle` hides on mobile project routes after downward scroll and reappears on upward scroll.
- `ProjectDetailClient` renders an icon-only back link and no longer renders `Back to Projects` text.

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- ThemeToggle.test.tsx`
Expected: FAIL because the current component has no route-aware mobile scroll behavior.

### Task 2: Implement Theme Toggle Scroll Behavior

**Files:**
- Modify: `src/components/ThemeToggle.tsx`
- Modify: `src/components/ThemeToggle.module.css`

- [ ] **Step 3: Write minimal implementation**

Add:
- pathname-aware mobile gating for `/project/` routes
- scroll-direction tracking with passive listeners
- a hidden state class that only moves/fades the toggle out on mobile

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- ThemeToggle.test.tsx`
Expected: PASS

### Task 3: Update Project Detail Header

**Files:**
- Modify: `src/app/project/[id]/ProjectDetailClient.tsx`
- Modify: `src/app/project/[id]/ProjectDetail.module.css`

- [ ] **Step 5: Write the failing test**

Extend coverage to assert:
- the arrow back link is rendered before `My Mimesis`
- `Back to Projects` text is absent

- [ ] **Step 6: Run test to verify it fails**

Run: `npm test -- ProjectDetailClient.test.tsx`
Expected: FAIL until the header markup is updated.

- [ ] **Step 7: Write minimal implementation**

Replace the standalone text link with an inline icon-only arrow button in the first pane header and add layout styles for the compact header row.

- [ ] **Step 8: Run test to verify it passes**

Run: `npm test -- ProjectDetailClient.test.tsx`
Expected: PASS

### Task 4: Full Verification

**Files:**
- Modify: `src/styles/radiusScale.test.ts` only if CSS assertions are needed

- [ ] **Step 9: Run targeted regression checks**

Run: `npm test -- ThemeToggle.test.tsx ProjectDetailClient.test.tsx`
Expected: PASS

- [ ] **Step 10: Run lint**

Run: `npm run lint`
Expected: PASS
