# Bw Circle Sync Preview Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the bw-circle Sync controls more compact, remove the `N` button, and show a small YouTube preview only after a valid video is loaded.

**Architecture:** Keep one YouTube iframe API player and move its mount host into a conditional preview frame owned by `BwCircleYouTubePanel`. Remove the separate scene-level camera toggle so the overlay manages both the top-left controls and the top-right preview.

**Tech Stack:** React 19, Next.js App Router client components, TypeScript, CSS Modules, Vitest with jsdom

---

## Chunk 1: Tests First

### Task 1: Update bw-circle behavior tests

**Files:**
- Modify: `src/projects/bw-circle/BwCircleProject.test.tsx`
- Modify: `src/projects/bw-circle/BwCircleYouTubePanel.test.tsx`

- [ ] **Step 1: Write the failing tests**

Add assertions that:
- `BwCircleProject` no longer renders an `N` button.
- `BwCircleYouTubePanel` does not render the YouTube player host before a valid video is loaded.
- `BwCircleYouTubePanel` does render the player host after a valid URL is committed.

- [ ] **Step 2: Run tests to verify they fail**

Run: `npm test -- src/projects/bw-circle/BwCircleProject.test.tsx src/projects/bw-circle/BwCircleYouTubePanel.test.tsx`
Expected: FAIL because the current scene still renders `N` and the panel still renders a host immediately.

## Chunk 2: Minimal Implementation

### Task 2: Refactor the sync overlay and preview host

**Files:**
- Modify: `src/projects/bw-circle/BwCircleYouTubePanel.tsx`
- Modify: `src/projects/bw-circle/BwCircleScene.tsx`
- Modify: `src/projects/bw-circle/BwCircleProject.module.css`

- [ ] **Step 3: Write the minimal implementation**

Change the sync overlay so:
- the root overlay can position both controls and preview,
- the input/play/BPM row uses a shorter control height,
- the YouTube player host only renders when `videoId` exists,
- the top-right `N` button is removed.

- [ ] **Step 4: Run tests to verify they pass**

Run: `npm test -- src/projects/bw-circle/BwCircleProject.test.tsx src/projects/bw-circle/BwCircleYouTubePanel.test.tsx`
Expected: PASS

## Chunk 3: Verification

### Task 3: Broader regression check

**Files:**
- Verify: `src/projects/bw-circle/BwCircleProject.test.tsx`
- Verify: `src/projects/bw-circle/BwCircleYouTubePanel.test.tsx`
- Verify: `src/styles/radiusScale.test.ts`

- [ ] **Step 5: Run targeted verification**

Run: `npm test -- src/styles/radiusScale.test.ts src/projects/bw-circle/BwCircleProject.test.tsx src/projects/bw-circle/BwCircleYouTubePanel.test.tsx`
Expected: PASS

- [ ] **Step 6: Run lint**

Run: `npm run lint`
Expected: PASS
