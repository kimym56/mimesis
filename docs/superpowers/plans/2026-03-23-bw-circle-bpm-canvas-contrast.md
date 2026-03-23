# Bw Circle BPM Canvas Contrast Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the Sync BPM label switch between light and dark text by sampling the actual canvas pixels behind the label in real time.

**Architecture:** Add a small bw-circle contrast helper to convert sampled canvas pixels into a stable light/dark tone, then wire `BwCircleYouTubePanel` to measure the BPM label, sample the nearest scene canvas on an interval, and apply a tone-specific class. Keep the BPM label as DOM text and remove the blend-mode-only approach.

**Tech Stack:** React 19, Next.js 16, TypeScript, CSS Modules, Vitest, Canvas 2D API

---

## Chunk 1: Contrast Sampling Logic

### Task 1: Lock contrast behavior with failing tests

**Files:**
- Modify: `src/projects/bw-circle/BwCircleYouTubePanel.test.tsx`
- Create: `src/projects/bw-circle/bwCircleCanvasContrast.test.ts`

- [ ] **Step 1: Write a failing panel test for live BPM tone switching from dark sampled pixels to light sampled pixels**
- [ ] **Step 2: Write failing pure tests for luminance and hysteresis behavior**
- [ ] **Step 3: Run `npm test -- src/projects/bw-circle/BwCircleYouTubePanel.test.tsx src/projects/bw-circle/bwCircleCanvasContrast.test.ts` and confirm failure**

### Task 2: Implement sampled canvas contrast

**Files:**
- Create: `src/projects/bw-circle/bwCircleCanvasContrast.ts`
- Modify: `src/projects/bw-circle/BwCircleYouTubePanel.tsx`
- Modify: `src/projects/bw-circle/BwCircleProject.module.css`

- [ ] **Step 1: Add a pure helper that maps sampled canvas pixels to a stable light/dark BPM tone**
- [ ] **Step 2: Add BPM span measurement and nearest-canvas lookup in the panel**
- [ ] **Step 3: Sample the canvas on an interval and update label tone state**
- [ ] **Step 4: Replace blend-mode styling with explicit tone classes**
- [ ] **Step 5: Re-run `npm test -- src/projects/bw-circle/BwCircleYouTubePanel.test.tsx src/projects/bw-circle/bwCircleCanvasContrast.test.ts` and confirm pass**

## Chunk 2: Verification

### Task 3: Focused verification

**Files:**
- Test: `src/projects/bw-circle/BwCircleProjectPlayback.test.tsx`
- Test: `src/projects/bw-circle/BwCircleProject.test.tsx`

- [ ] **Step 1: Run `npm test -- src/projects/bw-circle/BwCircleYouTubePanel.test.tsx src/projects/bw-circle/bwCircleCanvasContrast.test.ts src/projects/bw-circle/BwCircleProjectPlayback.test.tsx src/projects/bw-circle/BwCircleProject.test.tsx`**
- [ ] **Step 2: Run `npm run lint`**
- [ ] **Step 3: Run `npm run build`**
