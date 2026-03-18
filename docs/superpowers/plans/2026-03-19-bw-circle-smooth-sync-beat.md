# Black & White Circle Smooth Sync Beat Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Smooth the bw-circle `Sync` motion by predicting between YouTube time samples and add manual BPM / tap-tempo beat accents for the two main balls.

**Architecture:** Keep the hidden YouTube player as the playback source, but stop driving the scene directly from stepped `currentTime` snapshots. Instead, store richer playback samples in `BwCircleProject`, predict the playhead inside `BwCircleScene`, and derive beat-accent envelopes from a manual BPM layer implemented through `bwCircleSimulation.ts`.

**Tech Stack:** Next.js App Router, React 19 client components, TypeScript, CSS Modules, YouTube iframe API, `performance.now`, Vitest, ESLint.

---

## File Structure

- Modify: `src/projects/bw-circle/BwCircleProject.tsx`
  Responsibility: own richer playback sample state and session-scoped BPM state, then pass both into the scene and panel.
- Modify: `src/projects/bw-circle/BwCircleScene.tsx`
  Responsibility: predict the smooth playhead per frame and apply beat-accent motion to the large balls and particles.
- Modify: `src/projects/bw-circle/BwCircleYouTubePanel.tsx`
  Responsibility: emit timestamp samples with wall-clock metadata and render compact BPM / Tap controls.
- Modify: `src/projects/bw-circle/bwCircleSimulation.ts`
  Responsibility: expose pure helpers for predicted playhead math and beat-accent envelopes.
- Modify: `src/projects/bw-circle/BwCircleProject.module.css`
  Responsibility: fit BPM / Tap into the overlay without turning it into a bulky transport bar.
- Modify: `src/projects/bw-circle/BwCircleProject.test.tsx`
  Responsibility: verify the Sync overlay exposes the new compact tempo controls.
- Modify: `src/projects/bw-circle/BwCircleYouTubePanel.test.tsx`
  Responsibility: verify BPM input and tap-tempo UI behavior.
- Modify: `src/projects/bw-circle/bwCircleSimulation.test.ts`
  Responsibility: verify predicted playhead and beat-envelope helpers.

## Chunk 1: Lock the timing model with pure tests

### Task 1: Add failing tests for predicted playhead math

**Files:**
- Modify: `src/projects/bw-circle/bwCircleSimulation.test.ts`

- [ ] **Step 1: Write the failing tests for smooth playhead prediction**

Add tests for a new helper such as:

```ts
predictPlaybackTime({
  currentTime: 10,
  isPlaying: true,
  sampledAtMs: 1_000,
  nowMs: 1_120,
});
```

Expected behaviors:
- advances while playing
- does not advance while paused
- clamps negative elapsed time to zero

- [ ] **Step 2: Run the focused simulation test to verify it fails**

Run: `npm test -- src/projects/bw-circle/bwCircleSimulation.test.ts`
Expected: FAIL because `predictPlaybackTime` does not exist yet.

### Task 2: Add failing tests for beat-envelope helpers

**Files:**
- Modify: `src/projects/bw-circle/bwCircleSimulation.test.ts`

- [ ] **Step 1: Write the failing tests for beat accent shaping**

Add tests for a helper such as:

```ts
createBeatAccentCue({
  currentTime: 4,
  bpm: 120,
  isPlaying: true,
});
```

Cover:
- strong accent near beat onset
- low accent between beats
- idle output when playback is paused
- deterministic output for identical inputs

- [ ] **Step 2: Run the simulation test again to verify the new cases fail**

Run: `npm test -- src/projects/bw-circle/bwCircleSimulation.test.ts`
Expected: FAIL because the beat helper does not exist yet.

### Task 3: Implement the pure timing helpers

**Files:**
- Modify: `src/projects/bw-circle/bwCircleSimulation.ts`
- Modify: `src/projects/bw-circle/bwCircleSimulation.test.ts`

- [ ] **Step 1: Add minimal types for richer playback timing**

Add small pure-input shapes, for example:

```ts
export interface BwCirclePlaybackSample {
  currentTime: number;
  isPlaying: boolean;
  sampledAtMs: number;
}
```

- [ ] **Step 2: Implement `predictPlaybackTime`**

Use wall-clock extrapolation with a guarded elapsed delta:

```ts
const elapsedSeconds = Math.max(0, nowMs - sampledAtMs) / 1000;
return isPlaying ? currentTime + elapsedSeconds : currentTime;
```

- [ ] **Step 3: Implement a beat-envelope helper**

Add a deterministic helper based on BPM and predicted time:

```ts
const secondsPerBeat = 60 / bpm;
const phase = ((currentTime % secondsPerBeat) + secondsPerBeat) % secondsPerBeat;
const normalized = phase / secondsPerBeat;
const accent = Math.max(0, 1 - normalized / 0.18);
```

Return a richer cue if helpful:

```ts
{
  accentStrength,
  beatPhase,
}
```

- [ ] **Step 4: Run the simulation tests to verify they pass**

Run: `npm test -- src/projects/bw-circle/bwCircleSimulation.test.ts`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/projects/bw-circle/bwCircleSimulation.ts src/projects/bw-circle/bwCircleSimulation.test.ts
git commit -m "feat: add bw-circle sync timing helpers"
```

## Chunk 2: Add BPM / Tap controls to the Sync overlay

### Task 4: Extend the project shell state for richer playback and BPM

**Files:**
- Modify: `src/projects/bw-circle/BwCircleProject.tsx`

- [ ] **Step 1: Expand the playback state shape**

Replace the current playback interface with a richer version:

```ts
export interface BwCirclePlaybackState {
  currentTime: number;
  isPlaying: boolean;
  sampledAtMs: number;
}
```

Use `0` for the idle timestamp.

- [ ] **Step 2: Add session-scoped BPM state**

Add:

```ts
const [syncBpm, setSyncBpm] = useState(120);
```

Pass `syncBpm` into both scene and panel.

- [ ] **Step 3: Run TypeScript-aware tests to reveal downstream breakages**

Run: `npm test -- src/projects/bw-circle/BwCircleProject.test.tsx src/projects/bw-circle/BwCircleYouTubePanel.test.tsx`
Expected: FAIL or type errors because the panel and scene props are not updated yet.

### Task 5: Add failing UI tests for BPM and Tap controls

**Files:**
- Modify: `src/projects/bw-circle/BwCircleProject.test.tsx`
- Modify: `src/projects/bw-circle/BwCircleYouTubePanel.test.tsx`

- [ ] **Step 1: Update the project shell test to expect the compact tempo controls**

After switching to `Sync`, assert:

```tsx
expect(container.querySelector('input[type="number"]')).not.toBeNull();
expect(container.textContent).toContain("Tap");
```

- [ ] **Step 2: Add a panel test for BPM input**

Render the panel with:

```tsx
<BwCircleYouTubePanel bpm={120} onBpmChange={onBpmChange} ... />
```

Type a numeric value and expect:

```ts
expect(onBpmChange).toHaveBeenCalledWith(132);
```

- [ ] **Step 3: Add a panel test for tap tempo averaging**

Use fake timers or a mocked clock and click `Tap` multiple times. Expect the callback to receive a BPM derived from recent intervals rather than a hard-coded value.

- [ ] **Step 4: Run the focused panel/project tests to verify they fail**

Run: `npm test -- src/projects/bw-circle/BwCircleProject.test.tsx src/projects/bw-circle/BwCircleYouTubePanel.test.tsx`
Expected: FAIL because the controls and callbacks are not implemented yet.

### Task 6: Implement the compact BPM / Tap UI

**Files:**
- Modify: `src/projects/bw-circle/BwCircleYouTubePanel.tsx`
- Modify: `src/projects/bw-circle/BwCircleProject.module.css`
- Modify: `src/projects/bw-circle/BwCircleProject.tsx`

- [ ] **Step 1: Add BPM props to the panel**

Add:

```ts
bpm: number;
onBpmChange: (nextBpm: number) => void;
```

- [ ] **Step 2: Implement numeric BPM editing**

Clamp and normalize the input:

```ts
const nextBpm = clamp(Number(event.target.value) || bpm, 60, 200);
onBpmChange(nextBpm);
```

- [ ] **Step 3: Implement tap tempo**

Keep a short local history:

```ts
const tapTimesRef = useRef<number[]>([]);
```

On each tap:
- append `performance.now()`
- keep the last 4 taps
- average intervals
- convert to BPM
- call `onBpmChange(clampedBpm)`

- [ ] **Step 4: Fit the controls into the existing overlay**

Add compact styles for:
- BPM field width
- Tap button sizing
- responsive wrap without breaking the top-left pill layout

- [ ] **Step 5: Run the focused panel/project tests to verify they pass**

Run: `npm test -- src/projects/bw-circle/BwCircleProject.test.tsx src/projects/bw-circle/BwCircleYouTubePanel.test.tsx`
Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add src/projects/bw-circle/BwCircleProject.tsx src/projects/bw-circle/BwCircleYouTubePanel.tsx src/projects/bw-circle/BwCircleProject.module.css src/projects/bw-circle/BwCircleProject.test.tsx src/projects/bw-circle/BwCircleYouTubePanel.test.tsx
git commit -m "feat: add bw-circle sync bpm controls"
```

## Chunk 3: Use the predicted playhead and beat accents in the scene

### Task 7: Apply predicted playback time in the render loop

**Files:**
- Modify: `src/projects/bw-circle/BwCircleScene.tsx`
- Modify: `src/projects/bw-circle/bwCircleSimulation.ts`

- [ ] **Step 1: Replace direct `playback.currentTime` reads with prediction**

Inside the render loop, derive:

```ts
const predictedCurrentTime = predictPlaybackTime({
  currentTime: playbackValue.currentTime,
  isPlaying: playbackValue.isPlaying,
  sampledAtMs: playbackValue.sampledAtMs,
  nowMs: performance.now(),
});
```

- [ ] **Step 2: Feed the predicted time into sync cue generation**

Replace:

```ts
createSyncCue({ currentTime: playbackValue.currentTime, ... })
```

with predicted time so the split angle advances continuously between YouTube polls.

- [ ] **Step 3: Run the focused tests to keep the scene contract stable**

Run: `npm test -- src/projects/bw-circle/BwCircleProject.test.tsx src/projects/bw-circle/bwCircleSimulation.test.ts`
Expected: PASS.

### Task 8: Add beat accents to the two main balls and particles

**Files:**
- Modify: `src/projects/bw-circle/BwCircleScene.tsx`
- Modify: `src/projects/bw-circle/bwCircleSimulation.ts`

- [ ] **Step 1: Derive beat accent strength each frame**

Use the pure helper:

```ts
const beatAccent = createBeatAccentCue({
  currentTime: predictedCurrentTime,
  bpm: syncBpm,
  isPlaying: playbackValue.isPlaying,
});
```

- [ ] **Step 2: Apply the accent to the large balls**

Add small, bounded boosts only near beat onset:

```ts
const beatKick = 1 + beatAccent.accentStrength * 0.18;
const beatSquash = beatAccent.accentStrength * 0.12;
```

Use these to increase velocity, squash, and rebound without replacing the existing physics.

- [ ] **Step 3: Apply a smaller accent to particles**

Lift particle motion modestly:

```ts
const particleAccent = 1 + beatAccent.accentStrength * 0.08;
```

Keep this secondary to the main-ball response.

- [ ] **Step 4: Respect reduced motion**

If reduced motion is enabled, keep the smoother prediction but damp the accent multipliers.

- [ ] **Step 5: Run the focused bw-circle test set**

Run: `npm test -- src/projects/bw-circle/BwCircleYouTubePanel.test.tsx src/projects/bw-circle/BwCircleProject.test.tsx src/projects/bw-circle/bwCircleYouTube.test.ts src/projects/bw-circle/bwCircleSimulation.test.ts`
Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add src/projects/bw-circle/BwCircleScene.tsx src/projects/bw-circle/bwCircleSimulation.ts src/projects/bw-circle/bwCircleSimulation.test.ts
git commit -m "feat: smooth bw-circle sync motion"
```

## Chunk 4: Verification

### Task 9: Final regression and build verification

**Files:**
- Modify: `docs/superpowers/plans/2026-03-19-bw-circle-smooth-sync-beat.md`

- [ ] **Step 1: Run the full focused bw-circle test set**

Run: `npm test -- src/projects/bw-circle/BwCircleYouTubePanel.test.tsx src/projects/bw-circle/BwCircleProject.test.tsx src/projects/bw-circle/bwCircleYouTube.test.ts src/projects/bw-circle/bwCircleSimulation.test.ts`
Expected: PASS.

- [ ] **Step 2: Run lint for changed files**

Run: `npm run lint -- src/projects/bw-circle/BwCircleProject.tsx src/projects/bw-circle/BwCircleScene.tsx src/projects/bw-circle/BwCircleYouTubePanel.tsx src/projects/bw-circle/BwCircleProject.module.css src/projects/bw-circle/BwCircleProject.test.tsx src/projects/bw-circle/BwCircleYouTubePanel.test.tsx src/projects/bw-circle/bwCircleSimulation.ts src/projects/bw-circle/bwCircleSimulation.test.ts`
Expected: PASS.

- [ ] **Step 3: Run a production build**

Run: `npm run build`
Expected: PASS.

- [ ] **Step 4: Commit**

```bash
git add docs/superpowers/plans/2026-03-19-bw-circle-smooth-sync-beat.md
git commit -m "docs: finalize bw-circle smooth sync beat plan"
```
