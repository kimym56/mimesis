# Black & White Circle Sync Overlay Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Move the bw-circle SYNC controls onto the canvas as a top-left overlay, hide the YouTube embed, and replace the old load workflow with paused-on-commit plus `Play` / `Stop` controls.

**Architecture:** Keep `BwCircleProject` as the owner of committed `videoId` and normalized playback state. Keep `BwCircleYouTubePanel` as the YouTube controller, but render it as an overlay with a hidden iframe host while `BwCircleScene` supplies the visual container.

**Tech Stack:** Next.js App Router, React 19 client components, TypeScript, CSS Modules, YouTube iframe API, Vitest, ESLint.

---

## File Structure

- Modify: `src/projects/bw-circle/BwCircleProject.tsx`
  Responsibility: pass the sync overlay into the scene shell and preserve shared mode/playback state.
- Modify: `src/projects/bw-circle/BwCircleScene.tsx`
  Responsibility: render an overlay slot inside the scene shell without coupling canvas logic to YouTube state.
- Modify: `src/projects/bw-circle/BwCircleYouTubePanel.tsx`
  Responsibility: manage raw input, placeholder, hidden iframe API, paused URL commits, and `Play` / `Stop`.
- Modify: `src/projects/bw-circle/BwCircleProject.module.css`
  Responsibility: style the on-canvas overlay pill, hidden player host, and responsive layout.
- Modify: `src/projects/bw-circle/BwCircleProject.test.tsx`
  Responsibility: verify the sync UI surface changes from `Load` to the new overlay entry point.
- Modify: `src/projects/bw-circle/BwCircleYouTubePanel.test.tsx`
  Responsibility: verify hidden-player behavior, commit semantics, and play/stop controls.

## Chunk 1: Lock the new sync UI contract with tests

### Task 1: Update the project shell test for the new SYNC surface

**Files:**
- Modify: `src/projects/bw-circle/BwCircleProject.test.tsx`

- [ ] **Step 1: Write the failing test expectations for the new placeholder and button**

Add assertions after switching to `Sync`:

```tsx
expect(
  container.querySelector(
    'input[placeholder="https://youtu.be/97qr0BOdHkc?si=xgT_cD0WHCGQsn_C"]',
  ),
).not.toBeNull();
expect(
  [...container.querySelectorAll("button")].map((button) =>
    button.textContent?.trim(),
  ),
).toContain("Play");
expect(container.textContent).not.toContain("Load");
```

- [ ] **Step 2: Run the focused test to verify it fails**

Run: `npm test -- src/projects/bw-circle/BwCircleProject.test.tsx`
Expected: FAIL because the old placeholder and `Load` button are still rendered.

### Task 2: Add failing panel tests for paused commits and hidden playback controls

**Files:**
- Modify: `src/projects/bw-circle/BwCircleYouTubePanel.test.tsx`

- [ ] **Step 1: Add a failing test for valid URL commit on Enter**

Add a test that:
- renders the panel with `videoId={null}`
- types a valid YouTube URL into the input
- dispatches an `Enter` key event
- expects `onLoad` to be called with the normalized video id
- expects no visible `.playerFrame` element in the DOM

- [ ] **Step 2: Add a failing test for play/stop control flow**

Mock `window.YT.Player` with methods:

```ts
{
  destroy: vi.fn(),
  getCurrentTime: vi.fn(() => 12),
  getPlayerState: vi.fn(() => 1),
  playVideo: vi.fn(),
  stopVideo: vi.fn(),
  cueVideoById: vi.fn(),
}
```

Test that:
- a valid committed URL leaves playback paused
- clicking `Play` calls `playVideo`
- clicking `Stop` calls `stopVideo`

- [ ] **Step 3: Run the panel tests to verify they fail**

Run: `npm test -- src/projects/bw-circle/BwCircleYouTubePanel.test.tsx`
Expected: FAIL because enter-to-commit, hidden host rendering, and play/stop behavior do not exist yet.

## Chunk 2: Implement the on-canvas overlay and hidden player behavior

### Task 3: Render the sync overlay inside the scene shell

**Files:**
- Modify: `src/projects/bw-circle/BwCircleProject.tsx`
- Modify: `src/projects/bw-circle/BwCircleScene.tsx`

- [ ] **Step 1: Add a scene overlay slot**

Update `BwCircleScene` props to accept optional overlay content:

```tsx
syncOverlay?: ReactNode;
```

Render it inside the scene shell before the camera controls.

- [ ] **Step 2: Pass the panel through the scene in sync mode**

In `BwCircleProject.tsx`, stop rendering `BwCircleYouTubePanel` above the scene. Instead:

```tsx
<BwCircleScene
  mode={mode}
  playback={playback}
  syncOverlay={
    mode === "sync" ? (
      <BwCircleYouTubePanel ... />
    ) : null
  }
/>
```

- [ ] **Step 3: Run the project shell test to verify it passes**

Run: `npm test -- src/projects/bw-circle/BwCircleProject.test.tsx`
Expected: PASS.

### Task 4: Replace the old load/embed UI with paused commits and play/stop

**Files:**
- Modify: `src/projects/bw-circle/BwCircleYouTubePanel.tsx`
- Modify: `src/projects/bw-circle/BwCircleProject.module.css`

- [ ] **Step 1: Extend the player typing for command methods**

Add to `YouTubePlayerInstance`:

```ts
cueVideoById: (videoId: string) => void;
playVideo: () => void;
stopVideo: () => void;
```

- [ ] **Step 2: Add local committed-id and button-label behavior**

Track:
- raw `input`
- latest committed valid `videoId`
- whether the current player is ready

Keep the button label derived from `playback.isPlaying ? "Stop" : "Play"`.

- [ ] **Step 3: Commit valid URLs on Enter or blur**

Implement a shared commit helper:

```ts
function commitInputVideo(): string | null
```

It should:
- parse the current input
- show inline error for invalid values
- call `onLoad(normalizedId)` only when valid
- leave playback paused after commit

- [ ] **Step 4: Keep the iframe hidden and cue instead of visibly embedding**

Replace the visible player frame with a hidden host node styled off-screen or visually hidden.
When the player is ready or when the committed video changes, cue the video instead of autoplaying it.

- [ ] **Step 5: Implement Play/Stop behavior**

Button logic:
- if currently playing, call `stopVideo()` and emit idle playback
- if not playing, first commit the current input if needed
- then call `playVideo()` on the ready player

- [ ] **Step 6: Style the overlay pill**

Add CSS for:
- absolute top-left overlay placement
- translucent rounded pill
- inline input/button layout
- mobile wrap behavior
- hidden host element
- inline error positioning below the pill

- [ ] **Step 7: Run the focused panel tests to verify they pass**

Run: `npm test -- src/projects/bw-circle/BwCircleYouTubePanel.test.tsx`
Expected: PASS.

## Chunk 3: Verification

### Task 5: Run focused regression checks

**Files:**
- Modify: `docs/superpowers/plans/2026-03-18-bw-circle-sync-overlay.md`

- [ ] **Step 1: Run the bw-circle focused test set**

Run: `npm test -- src/projects/bw-circle/BwCircleYouTubePanel.test.tsx src/projects/bw-circle/BwCircleProject.test.tsx src/projects/bw-circle/bwCircleYouTube.test.ts src/projects/bw-circle/bwCircleSimulation.test.ts`
Expected: PASS.

- [ ] **Step 2: Run lint for changed files**

Run: `npm run lint -- src/projects/bw-circle/BwCircleProject.tsx src/projects/bw-circle/BwCircleScene.tsx src/projects/bw-circle/BwCircleYouTubePanel.tsx src/projects/bw-circle/BwCircleProject.test.tsx src/projects/bw-circle/BwCircleYouTubePanel.test.tsx`
Expected: PASS.

- [ ] **Step 3: Run production build**

Run: `npm run build`
Expected: PASS.
