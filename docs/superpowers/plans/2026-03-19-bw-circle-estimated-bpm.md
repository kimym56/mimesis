# Black & White Circle Estimated BPM Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Show a stable estimated BPM next to the bw-circle Sync URL input based on the captured tab audio.

**Architecture:** Keep tempo detection inside the existing scene audio-analysis loop. Add a pure estimator in `bwCircleAudioSync.ts`, publish rounded BPM updates from `BwCircleScene`, store them in `BwCircleProject`, and render them as a compact badge in `BwCircleYouTubePanel`.

**Tech Stack:** Next.js App Router, React 19, TypeScript, CSS Modules, Web Audio API, Vitest, ESLint.

---

## File Structure

- Modify: `src/projects/bw-circle/bwCircleAudioSync.ts`
  Responsibility: add pure tempo-estimation state and update helpers.
- Modify: `src/projects/bw-circle/bwCircleAudioSync.test.ts`
  Responsibility: lock the estimator behavior with focused unit tests.
- Modify: `src/projects/bw-circle/BwCircleScene.tsx`
  Responsibility: hold estimator refs in the render loop and publish rounded BPM updates upward.
- Modify: `src/projects/bw-circle/BwCircleProject.tsx`
  Responsibility: own the estimated BPM state and pass it between scene and panel.
- Modify: `src/projects/bw-circle/BwCircleYouTubePanel.tsx`
  Responsibility: render the BPM badge beside the input.
- Modify: `src/projects/bw-circle/BwCircleYouTubePanel.test.tsx`
  Responsibility: verify placeholder and estimated BPM rendering.
- Modify: `src/projects/bw-circle/BwCircleProjectPlayback.test.tsx`
  Responsibility: verify scene-published BPM updates reach the panel.
- Modify: `src/projects/bw-circle/BwCircleProject.module.css`
  Responsibility: style the compact BPM badge within the existing overlay row.

## Chunk 1: Lock the estimator and UI contract with tests

### Task 1: Add failing pure tempo-estimator tests

**Files:**
- Modify: `src/projects/bw-circle/bwCircleAudioSync.test.ts`

- [ ] **Step 1: Write the failing tests**

Cover:
- placeholder state before enough valid onsets
- stable `120 BPM` output after repeated half-second onsets
- cooldown/interval filtering so repeated same-beat frames do not overcount

- [ ] **Step 2: Run the focused test to verify it fails**

Run: `npm test -- src/projects/bw-circle/bwCircleAudioSync.test.ts`
Expected: FAIL because the tempo helper does not exist yet.

### Task 2: Add failing panel and project wiring tests

**Files:**
- Modify: `src/projects/bw-circle/BwCircleYouTubePanel.test.tsx`
- Modify: `src/projects/bw-circle/BwCircleProjectPlayback.test.tsx`

- [ ] **Step 1: Write the failing panel render test**

Assert:
- `estimatedBpm={null}` shows `-- BPM`
- `estimatedBpm={128}` shows `128 BPM`

- [ ] **Step 2: Write the failing project wiring test**

Mock the scene and panel, invoke `onEstimatedBpmChange(128)` from the scene side, and expect the panel to receive `estimatedBpm: 128`.

- [ ] **Step 3: Run the focused tests to verify they fail**

Run: `npm test -- src/projects/bw-circle/BwCircleYouTubePanel.test.tsx src/projects/bw-circle/BwCircleProjectPlayback.test.tsx`
Expected: FAIL because the new prop and callback are not wired yet.

## Chunk 2: Implement tempo estimation and overlay wiring

### Task 3: Implement the pure tempo-estimation helper

**Files:**
- Modify: `src/projects/bw-circle/bwCircleAudioSync.ts`
- Modify: `src/projects/bw-circle/bwCircleAudioSync.test.ts`

- [ ] **Step 1: Add a small estimator state shape**

Add types for:
- last accepted onset timestamp
- rolling interval list
- current BPM estimate

- [ ] **Step 2: Implement minimal onset-driven tempo estimation**

Use:
- onset threshold
- cooldown window
- bounded valid interval range
- median interval to BPM conversion
- smoothed rounded BPM output after enough evidence

- [ ] **Step 3: Run the focused test to verify it passes**

Run: `npm test -- src/projects/bw-circle/bwCircleAudioSync.test.ts`
Expected: PASS.

### Task 4: Wire the estimate through project, scene, and panel

**Files:**
- Modify: `src/projects/bw-circle/BwCircleScene.tsx`
- Modify: `src/projects/bw-circle/BwCircleProject.tsx`
- Modify: `src/projects/bw-circle/BwCircleYouTubePanel.tsx`
- Modify: `src/projects/bw-circle/BwCircleProject.module.css`
- Modify: `src/projects/bw-circle/BwCircleYouTubePanel.test.tsx`
- Modify: `src/projects/bw-circle/BwCircleProjectPlayback.test.tsx`

- [ ] **Step 1: Add the scene callback and project-owned BPM state**

Store `estimatedBpm: number | null` in `BwCircleProject` and pass:
- `onEstimatedBpmChange` into `BwCircleScene`
- `estimatedBpm` into `BwCircleYouTubePanel`

- [ ] **Step 2: Publish rounded BPM updates from the scene**

Reset when playback or audio sync is inactive. Emit upward only when the displayed value changes.

- [ ] **Step 3: Render the compact BPM badge in the panel**

Show:
- `-- BPM` before a confident estimate
- `${estimatedBpm} BPM` when available

- [ ] **Step 4: Add compact overlay styling**

Keep the existing single-row pill on desktop and preserve wrapping on mobile.

- [ ] **Step 5: Run the focused UI tests to verify they pass**

Run: `npm test -- src/projects/bw-circle/BwCircleYouTubePanel.test.tsx src/projects/bw-circle/BwCircleProjectPlayback.test.tsx`
Expected: PASS.

## Chunk 3: Final verification

### Task 5: Re-run focused verification and build

**Files:**
- Modify: `docs/superpowers/plans/2026-03-19-bw-circle-estimated-bpm.md`

- [ ] **Step 1: Run the focused bw-circle tests**

Run: `npm test -- src/projects/bw-circle/bwCircleAudioSync.test.ts src/projects/bw-circle/BwCircleYouTubePanel.test.tsx src/projects/bw-circle/BwCircleProjectPlayback.test.tsx src/projects/bw-circle/BwCircleScene.test.tsx`
Expected: PASS.

- [ ] **Step 2: Run lint for changed files**

Run: `npm run lint -- src/projects/bw-circle/bwCircleAudioSync.ts src/projects/bw-circle/bwCircleAudioSync.test.ts src/projects/bw-circle/BwCircleScene.tsx src/projects/bw-circle/BwCircleProject.tsx src/projects/bw-circle/BwCircleYouTubePanel.tsx src/projects/bw-circle/BwCircleYouTubePanel.test.tsx src/projects/bw-circle/BwCircleProjectPlayback.test.tsx src/projects/bw-circle/BwCircleProject.module.css`
Expected: PASS.

- [ ] **Step 3: Run a production build**

Run: `npm run build`
Expected: PASS.
