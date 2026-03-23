# Black & White Circle Realtime BPM Analyzer Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the custom bw-circle Sync BPM estimator with `realtime-bpm-analyzer` while preserving the existing motion-reactive audio path and BPM badge UI.

**Architecture:** Keep `BwCircleScene` as the single owner of the live tab-audio graph. Continue feeding the current visual analyser for motion, add a small wrapper around `realtime-bpm-analyzer` for BPM detection, and publish library BPM events upward through the existing project and panel state flow.

**Tech Stack:** Next.js App Router, React 19, TypeScript, Web Audio API, realtime-bpm-analyzer, Vitest, ESLint.

---

## File Structure

- Modify: `package.json`
  Responsibility: declare the realtime BPM dependency.
- Modify: `package-lock.json`
  Responsibility: lock the installed dependency graph.
- Create: `src/projects/bw-circle/bwCircleRealtimeBpm.ts`
  Responsibility: wrap `realtime-bpm-analyzer` setup, event subscription, and cleanup behind a bw-circle-specific interface.
- Create: `src/projects/bw-circle/bwCircleRealtimeBpm.test.ts`
  Responsibility: lock the wrapper contract with focused unit tests.
- Modify: `src/projects/bw-circle/BwCircleScene.tsx`
  Responsibility: connect the captured stream into the BPM wrapper, publish BPM updates, and clean up the analyzer branch.
- Modify: `src/projects/bw-circle/BwCircleScene.test.tsx`
  Responsibility: verify the scene tolerates analyzer lifecycle and publishes BPM safely.
- Modify: `src/projects/bw-circle/BwCircleProjectPlayback.test.tsx`
  Responsibility: verify scene-published BPM still reaches the panel.
- Modify: `src/projects/bw-circle/BwCircleYouTubePanel.test.tsx`
  Responsibility: preserve the BPM badge UI contract.
- Modify: `src/projects/bw-circle/bwCircleAudioSync.ts`
  Responsibility: remove or isolate obsolete custom BPM-estimation code while preserving motion cue helpers.

## Chunk 1: Lock the new BPM integration contract with tests

### Task 1: Add failing wrapper tests

**Files:**
- Create: `src/projects/bw-circle/bwCircleRealtimeBpm.test.ts`

- [ ] **Step 1: Write the failing tests**

Cover:
- creating the wrapper wires a source branch into the analyzer node
- incoming BPM events publish a rounded single BPM value
- cleanup removes listeners and disconnects the branch safely

- [ ] **Step 2: Run the focused test to verify it fails**

Run: `npm test -- src/projects/bw-circle/bwCircleRealtimeBpm.test.ts`
Expected: FAIL because the wrapper does not exist yet.

### Task 2: Add or adjust failing scene integration tests

**Files:**
- Modify: `src/projects/bw-circle/BwCircleScene.test.tsx`

- [ ] **Step 1: Write the failing test**

Assert:
- Sync scene initialization does not throw when the BPM wrapper exists
- scene BPM publication uses the wrapper callback rather than the removed custom estimator path

- [ ] **Step 2: Run the focused scene test to verify it fails**

Run: `npm test -- src/projects/bw-circle/BwCircleScene.test.tsx`
Expected: FAIL because the new BPM wrapper is not wired yet.

## Chunk 2: Implement the realtime BPM wrapper and scene wiring

### Task 3: Install and wrap `realtime-bpm-analyzer`

**Files:**
- Modify: `package.json`
- Modify: `package-lock.json`
- Create: `src/projects/bw-circle/bwCircleRealtimeBpm.ts`
- Create: `src/projects/bw-circle/bwCircleRealtimeBpm.test.ts`

- [ ] **Step 1: Add the dependency**

Install `realtime-bpm-analyzer` and inspect its exported types and runtime API.

- [ ] **Step 2: Implement the minimal wrapper**

Expose:
- setup against an `AudioContext`
- a connectable node branch for BPM analysis
- a BPM callback subscription
- deterministic cleanup

- [ ] **Step 3: Run the focused wrapper test to verify it passes**

Run: `npm test -- src/projects/bw-circle/bwCircleRealtimeBpm.test.ts`
Expected: PASS.

### Task 4: Replace scene BPM estimation with the wrapper

**Files:**
- Modify: `src/projects/bw-circle/BwCircleScene.tsx`
- Modify: `src/projects/bw-circle/BwCircleScene.test.tsx`
- Modify: `src/projects/bw-circle/BwCircleProjectPlayback.test.tsx`
- Modify: `src/projects/bw-circle/BwCircleYouTubePanel.test.tsx`

- [ ] **Step 1: Create the BPM analyzer branch in the scene**

Build a low-pass-filtered branch from the captured media source into the wrapper while keeping the existing visual analyser branch.

- [ ] **Step 2: Publish BPM from wrapper events**

Round, dedupe, and reset BPM updates through `onEstimatedBpmChange`.

- [ ] **Step 3: Clean up lifecycle**

Tear down listeners, filter nodes, and wrapper instances when Sync stops or the scene unmounts.

- [ ] **Step 4: Run the focused scene and project tests**

Run: `npm test -- src/projects/bw-circle/BwCircleScene.test.tsx src/projects/bw-circle/BwCircleProjectPlayback.test.tsx src/projects/bw-circle/BwCircleYouTubePanel.test.tsx`
Expected: PASS.

## Chunk 3: Remove obsolete custom tempo-estimation display code and verify

### Task 5: Simplify the old custom tempo path

**Files:**
- Modify: `src/projects/bw-circle/bwCircleAudioSync.ts`

- [ ] **Step 1: Remove or isolate BPM-estimation helpers no longer used by the UI**

Keep the motion cue helpers intact and delete only the obsolete badge-estimation path.

- [ ] **Step 2: Run focused audio sync tests**

Run: `npm test -- src/projects/bw-circle/bwCircleAudioSync.test.ts`
Expected: PASS after updating or removing obsolete estimator assertions.

### Task 6: Final verification

**Files:**
- Modify: `docs/superpowers/plans/2026-03-20-bw-circle-realtime-bpm.md`

- [ ] **Step 1: Run the focused bw-circle tests**

Run: `npm test -- src/projects/bw-circle/bwCircleRealtimeBpm.test.ts src/projects/bw-circle/BwCircleScene.test.tsx src/projects/bw-circle/BwCircleProjectPlayback.test.tsx src/projects/bw-circle/BwCircleYouTubePanel.test.tsx src/projects/bw-circle/bwCircleAudioSync.test.ts`
Expected: PASS.

- [ ] **Step 2: Run lint for changed files**

Run: `npm run lint -- src/projects/bw-circle/bwCircleRealtimeBpm.ts src/projects/bw-circle/bwCircleRealtimeBpm.test.ts src/projects/bw-circle/BwCircleScene.tsx src/projects/bw-circle/BwCircleScene.test.tsx src/projects/bw-circle/bwCircleAudioSync.ts`
Expected: PASS.

- [ ] **Step 3: Run a production build**

Run: `npm run build`
Expected: PASS.
