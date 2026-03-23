# Bw Circle Sync Lag Fix Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remove the new Sync lag by stripping unused video capture work and disabling the realtime BPM debug traffic while keeping BPM display intact.

**Architecture:** Keep the current `realtime-bpm-analyzer` integration, but make the captured Sync stream audio-only before it reaches scene state and stop the temporary video tracks immediately after permission succeeds. Also switch the BPM bridge back to non-debug mode so the AudioWorklet no longer posts analysis/debug payloads to the main thread every chunk.

**Tech Stack:** React 19, Next.js 16, TypeScript, Vitest, Web Audio API, Screen Capture API

---

## Chunk 1: Capture Path

### Task 1: Keep only audio tracks after permission

**Files:**
- Modify: `src/projects/bw-circle/BwCircleYouTubePanel.tsx`
- Test: `src/projects/bw-circle/BwCircleYouTubePanel.test.tsx`

- [ ] **Step 1: Write the failing tests**
  - Add a test that expects video tracks from `getDisplayMedia()` to be stopped immediately and an audio-only `MediaStream` to be published through `onAudioSyncChange`.
  - Add a test that verifies the requested capture constraints avoid unnecessary video capture if supported by the current browser path.

- [ ] **Step 2: Run the tests to verify failure**
  - Run: `npm test -- src/projects/bw-circle/BwCircleYouTubePanel.test.tsx`
  - Expected: FAIL because the current code forwards the raw display stream and leaves any video track active.

- [ ] **Step 3: Write the minimal implementation**
  - Create an audio-only `MediaStream` from the captured audio tracks.
  - Stop all captured video tracks immediately after permission succeeds.
  - Preserve current denied/unsupported behavior.

- [ ] **Step 4: Run the tests to verify they pass**
  - Run: `npm test -- src/projects/bw-circle/BwCircleYouTubePanel.test.tsx`
  - Expected: PASS

## Chunk 2: BPM Bridge Overhead

### Task 2: Disable debug traffic in the realtime BPM branch

**Files:**
- Modify: `src/projects/bw-circle/bwCircleRealtimeBpm.ts`
- Test: `src/projects/bw-circle/bwCircleRealtimeBpm.test.ts`

- [ ] **Step 1: Write the failing test**
  - Update the bridge test so the analyzer is created with `debug: false`.

- [ ] **Step 2: Run the test to verify failure**
  - Run: `npm test -- src/projects/bw-circle/bwCircleRealtimeBpm.test.ts`
  - Expected: FAIL because the current bridge still enables debug mode.

- [ ] **Step 3: Write the minimal implementation**
  - Set the realtime analyzer options to disable debug message traffic.

- [ ] **Step 4: Run the test to verify it passes**
  - Run: `npm test -- src/projects/bw-circle/bwCircleRealtimeBpm.test.ts`
  - Expected: PASS

## Chunk 3: Verification

### Task 3: Re-run focused verification

**Files:**
- Test: `src/projects/bw-circle/BwCircleScene.test.tsx`
- Test: `src/projects/bw-circle/BwCircleProjectPlayback.test.tsx`

- [ ] **Step 1: Run focused project tests**
  - Run: `npm test -- src/projects/bw-circle/bwCircleRealtimeBpm.test.ts src/projects/bw-circle/BwCircleScene.test.tsx src/projects/bw-circle/BwCircleProjectPlayback.test.tsx src/projects/bw-circle/BwCircleYouTubePanel.test.tsx`
  - Expected: PASS

- [ ] **Step 2: Run lint**
  - Run: `npm run lint -- src/projects/bw-circle/bwCircleRealtimeBpm.ts src/projects/bw-circle/BwCircleYouTubePanel.tsx src/projects/bw-circle/bwCircleRealtimeBpm.test.ts src/projects/bw-circle/BwCircleYouTubePanel.test.tsx`
  - Expected: PASS

- [ ] **Step 3: Run build**
  - Run: `npm run build`
  - Expected: PASS with only the existing multiple-lockfile warning.
