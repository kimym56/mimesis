# Black & White Circle Tab Audio Sync Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Let bw-circle `Sync` mode react to real YouTube tab audio after the user clicks `Play` and grants current-tab capture permission.

**Architecture:** Keep YouTube as the playback transport, but layer in a client-side tab-capture pipeline. `BwCircleYouTubePanel` should initiate permission flow, `BwCircleProject` should own session capture state, and `BwCircleScene` should analyze the active `MediaStream` through Web Audio while preserving the existing predicted-playhead fallback.

**Tech Stack:** Next.js App Router, React 19 client components, TypeScript, CSS Modules, YouTube iframe API, Screen Capture API, Web Audio API, Vitest, ESLint.

---

## File Structure

- Create: `src/projects/bw-circle/bwCircleAudioSync.ts`
  Responsibility: pure types and cue-shaping helpers for analyser output.
- Create: `src/projects/bw-circle/bwCircleAudioSync.test.ts`
  Responsibility: unit tests for cue normalization and onset shaping.
- Modify: `src/projects/bw-circle/BwCircleProject.tsx`
  Responsibility: own audio-sync session state and pass it into the panel and scene.
- Modify: `src/projects/bw-circle/BwCircleScene.tsx`
  Responsibility: attach/detach Web Audio analysis for the active capture stream and drive motion from the live cue when available.
- Modify: `src/projects/bw-circle/BwCircleYouTubePanel.tsx`
  Responsibility: trigger `getDisplayMedia(...)` on `Play`, surface the inline permission copy, and report capture status upward.
- Modify: `src/projects/bw-circle/BwCircleProject.module.css`
  Responsibility: fit the permission message and any compact audio-sync status styling into the existing overlay.
- Modify: `src/projects/bw-circle/BwCircleProject.test.tsx`
  Responsibility: assert the Sync overlay shows the new permission copy rather than BPM / tap controls.
- Modify: `src/projects/bw-circle/BwCircleYouTubePanel.test.tsx`
  Responsibility: verify `Play` triggers permission flow, successful stream handoff, and denied-permission fallback.

## Chunk 1: Lock the audio cue model with pure tests

### Task 1: Add failing tests for normalized audio cue shaping

**Files:**
- Create: `src/projects/bw-circle/bwCircleAudioSync.test.ts`

- [ ] **Step 1: Write the failing tests for cue normalization**

Cover a helper such as:

```ts
createBwCircleAudioCue({
  energy: 0.42,
  bassEnergy: 0.65,
  previousEnergy: 0.25,
  shouldReduceMotion: false,
});
```

Expected behaviors:
- bounded normalized cue output
- stronger onset when energy rises sharply
- damped response under reduced motion
- deterministic output for identical inputs

- [ ] **Step 2: Run the focused audio cue test to verify it fails**

Run: `npm test -- src/projects/bw-circle/bwCircleAudioSync.test.ts`
Expected: FAIL because the helper file does not exist yet.

### Task 2: Implement the pure audio cue helper

**Files:**
- Create: `src/projects/bw-circle/bwCircleAudioSync.ts`
- Modify: `src/projects/bw-circle/bwCircleAudioSync.test.ts`

- [ ] **Step 1: Add minimal types for raw analyser input and shaped cue output**

Add shapes like:

```ts
export interface BwCircleAudioSample {
  energy: number;
  bassEnergy: number;
  previousEnergy: number;
  shouldReduceMotion: boolean;
}

export interface BwCircleAudioCue {
  energy: number;
  bassEnergy: number;
  onsetStrength: number;
}
```

- [ ] **Step 2: Implement bounded cue shaping**

Use simple clamping and onset math, for example:

```ts
const onsetStrength = clamp((energy - previousEnergy) * 3.5, 0, 1);
```

Then damp the amplitudes under reduced motion.

- [ ] **Step 3: Run the focused audio cue test to verify it passes**

Run: `npm test -- src/projects/bw-circle/bwCircleAudioSync.test.ts`
Expected: PASS.

- [ ] **Step 4: Commit**

```bash
git add src/projects/bw-circle/bwCircleAudioSync.ts src/projects/bw-circle/bwCircleAudioSync.test.ts
git commit -m "feat: add bw-circle audio cue helpers"
```

## Chunk 2: Replace BPM / Tap UI with permission-driven audio sync

### Task 3: Add failing UI tests for the new Sync overlay contract

**Files:**
- Modify: `src/projects/bw-circle/BwCircleProject.test.tsx`
- Modify: `src/projects/bw-circle/BwCircleYouTubePanel.test.tsx`

- [ ] **Step 1: Update the project shell test to expect the permission message**

After switching to `Sync`, assert:

```tsx
expect(container.textContent).toContain(
  "Allow permission to use audio sync for this feature.",
);
```

And assert the BPM field and `Tap` button are gone.

- [ ] **Step 2: Add a panel test for `Play` initiating capture permission**

Mock `navigator.mediaDevices.getDisplayMedia` and assert that clicking `Play` with a valid URL calls it with audio enabled.

- [ ] **Step 3: Add a panel test for successful stream handoff**

Return a fake `MediaStream` from `getDisplayMedia` and expect the upward callback to receive an active status plus that stream.

- [ ] **Step 4: Add a panel test for denied permission**

Reject `getDisplayMedia` with `NotAllowedError` and expect:
- YouTube playback can still proceed or remain on fallback behavior
- the permission message remains visible
- no active stream is reported

- [ ] **Step 5: Run the focused panel/project tests to verify they fail**

Run: `npm test -- src/projects/bw-circle/BwCircleProject.test.tsx src/projects/bw-circle/BwCircleYouTubePanel.test.tsx`
Expected: FAIL because the panel still renders BPM / tap and has no capture flow.

### Task 4: Implement project-owned audio sync session state

**Files:**
- Modify: `src/projects/bw-circle/BwCircleProject.tsx`

- [ ] **Step 1: Add a small session state shape**

Add types like:

```ts
export type BwCircleAudioSyncStatus =
  | "idle"
  | "prompting"
  | "active"
  | "denied"
  | "unsupported";

export interface BwCircleAudioSyncState {
  status: BwCircleAudioSyncStatus;
  stream: MediaStream | null;
}
```

- [ ] **Step 2: Remove BPM state from the project shell**

Delete the `syncBpm` state and replace it with `audioSync`.

- [ ] **Step 3: Pass audio-sync props into the panel and scene**

Update both children so:
- the panel can initiate and report capture status
- the scene can analyze the active stream

- [ ] **Step 4: Run the focused project/panel tests to reveal downstream breakages**

Run: `npm test -- src/projects/bw-circle/BwCircleProject.test.tsx src/projects/bw-circle/BwCircleYouTubePanel.test.tsx`
Expected: FAIL or type errors because the panel and scene props are not updated yet.

### Task 5: Implement the permission-driven panel flow

**Files:**
- Modify: `src/projects/bw-circle/BwCircleYouTubePanel.tsx`
- Modify: `src/projects/bw-circle/BwCircleProject.module.css`

- [ ] **Step 1: Remove the BPM / Tap controls from the overlay**

Delete the manual tempo UI and replace it with the inline permission copy.

- [ ] **Step 2: Add capture-related props to the panel**

Add props like:

```ts
audioSyncStatus: BwCircleAudioSyncStatus;
onAudioSyncChange: (nextState: BwCircleAudioSyncState) => void;
```

- [ ] **Step 3: Trigger `getDisplayMedia(...)` from `Play` when capture is not active**

Use:

```ts
navigator.mediaDevices.getDisplayMedia({
  video: true,
  audio: true,
});
```

Set status to `prompting` before the call, then `active` or `denied` based on the result.

- [ ] **Step 4: Keep playback fallback behavior intact**

If capture is denied or unsupported, do not crash. Keep the hidden YouTube playback path working and leave the permission copy visible.

- [ ] **Step 5: Add minimal styling for the inline permission copy**

Keep the existing pill overlay compact. Do not introduce a large modal or a second transport row unless needed for small screens.

- [ ] **Step 6: Run the focused panel/project tests to verify they pass**

Run: `npm test -- src/projects/bw-circle/BwCircleProject.test.tsx src/projects/bw-circle/BwCircleYouTubePanel.test.tsx`
Expected: PASS.

- [ ] **Step 7: Commit**

```bash
git add src/projects/bw-circle/BwCircleProject.tsx src/projects/bw-circle/BwCircleYouTubePanel.tsx src/projects/bw-circle/BwCircleProject.module.css src/projects/bw-circle/BwCircleProject.test.tsx src/projects/bw-circle/BwCircleYouTubePanel.test.tsx
git commit -m "feat: add bw-circle audio sync permission flow"
```

## Chunk 3: Analyze captured audio inside the scene

### Task 6: Wire the scene to a live `MediaStream`

**Files:**
- Modify: `src/projects/bw-circle/BwCircleScene.tsx`
- Modify: `src/projects/bw-circle/bwCircleAudioSync.ts`
- Modify: `src/projects/bw-circle/bwCircleAudioSync.test.ts`

- [ ] **Step 1: Extend the pure helper tests if needed**

If the scene needs extra cue fields such as smoothed energy or bass-weighted lift, add failing tests first in `bwCircleAudioSync.test.ts`.

- [ ] **Step 2: Add scene props for audio sync state**

Update `BwCircleScene` so it receives:

```ts
audioSync: BwCircleAudioSyncState;
```

- [ ] **Step 3: Set up Web Audio refs for the active stream**

Add refs for:
- `AudioContext`
- `MediaStreamAudioSourceNode`
- `AnalyserNode`
- `Uint8Array` / `Float32Array` buffers
- previous-frame energy

- [ ] **Step 4: Initialize and tear down analysis when the stream changes**

When `audioSync.stream` becomes active:
- create/resume `AudioContext`
- connect the stream source to an `AnalyserNode`
- allocate reusable buffers

When the stream ends or status leaves `active`:
- disconnect nodes
- clear buffers
- fall back to non-audio sync

- [ ] **Step 5: Read analyser data in the render loop**

Each frame:
- sample frequency/time-domain data
- derive raw energy metrics
- shape them through `createBwCircleAudioCue(...)`
- use the cue to drive:
  - ball kick
  - squash/stretch
  - particle lift

Keep predicted YouTube time for rotation continuity.

- [ ] **Step 6: Respect reduced motion**

Under reduced motion:
- keep the audio transport active
- damp cue amplitudes before applying them to scene physics

- [ ] **Step 7: Run the focused bw-circle test set**

Run: `npm test -- src/projects/bw-circle/BwCircleYouTubePanel.test.tsx src/projects/bw-circle/BwCircleProject.test.tsx src/projects/bw-circle/bwCircleAudioSync.test.ts src/projects/bw-circle/bwCircleYouTube.test.ts`
Expected: PASS.

- [ ] **Step 8: Commit**

```bash
git add src/projects/bw-circle/BwCircleScene.tsx src/projects/bw-circle/bwCircleAudioSync.ts src/projects/bw-circle/bwCircleAudioSync.test.ts
git commit -m "feat: add bw-circle tab audio analysis"
```

## Chunk 4: Final verification

### Task 7: Re-run focused verification and build

**Files:**
- Modify: `docs/superpowers/plans/2026-03-19-bw-circle-tab-audio-sync.md`

- [ ] **Step 1: Run the full focused bw-circle test set**

Run: `npm test -- src/projects/bw-circle/BwCircleYouTubePanel.test.tsx src/projects/bw-circle/BwCircleProject.test.tsx src/projects/bw-circle/bwCircleAudioSync.test.ts src/projects/bw-circle/bwCircleYouTube.test.ts src/projects/bw-circle/bwCircleSimulation.test.ts`
Expected: PASS.

- [ ] **Step 2: Run lint for changed files**

Run: `npm run lint -- src/projects/bw-circle/BwCircleProject.tsx src/projects/bw-circle/BwCircleScene.tsx src/projects/bw-circle/BwCircleYouTubePanel.tsx src/projects/bw-circle/BwCircleProject.module.css src/projects/bw-circle/BwCircleProject.test.tsx src/projects/bw-circle/BwCircleYouTubePanel.test.tsx src/projects/bw-circle/bwCircleAudioSync.ts src/projects/bw-circle/bwCircleAudioSync.test.ts`
Expected: PASS.

- [ ] **Step 3: Run a production build**

Run: `npm run build`
Expected: PASS.
