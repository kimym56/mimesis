# Black & White Circle YouTube Sync Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a new `Black & White Circle` interactive project with a plain mimesis mode and a YouTube-link pseudo-sync mode that shares one scene engine.

**Architecture:** Keep the route shell generic, register a new interactive project through the existing registry, and isolate the feature in `src/projects/bw-circle/`. Build one reusable scene renderer plus pure simulation helpers so the sync logic is testable without relying on canvas snapshots.

**Tech Stack:** Next.js App Router, React 19 client components, TypeScript, CSS Modules, Canvas 2D, YouTube iframe embed, Vitest, ESLint.

---

## Chunk 1: Project wiring and pure helpers

### Task 1: Add project metadata and registry coverage

**Files:**
- Modify: `src/data/projects.ts`
- Modify: `src/data/projects.test.ts`
- Modify: `src/projects/registry.ts`

- [ ] **Step 1: Write a failing data-layer test for the new project entry**

Add a new `it(...)` in `src/data/projects.test.ts` that expects:
- a project with `id === "black-white-circle"`
- `interactive === true`
- `interactiveDemo === "bw-circle"`
- a YouTube `referenceEmbed`

Run: `npm test -- src/data/projects.test.ts`
Expected: FAIL because the new project metadata does not exist yet.

- [ ] **Step 2: Add the project entry and registry id**

Update `src/data/projects.ts` to add:

```ts
interactiveDemo?: "page-curl" | "wiper-typography" | "bw-circle";
```

Add a new `black-white-circle` project object with interactive metadata and a `referenceEmbed` pointing at the SABUM page.

Update `src/projects/registry.ts` to lazy-load:

```ts
const BwCircleProject = dynamic(() => import("./bw-circle/BwCircleProject"), {
  loading: () => null,
}) as InteractiveProjectComponent;
```

Then register `"bw-circle": BwCircleProject`.

- [ ] **Step 3: Re-run the focused data-layer test**

Run: `npm test -- src/data/projects.test.ts`
Expected: PASS.

### Task 2: Add failing tests for YouTube parsing and sync cue helpers

**Files:**
- Create: `src/projects/bw-circle/bwCircleYouTube.test.ts`
- Create: `src/projects/bw-circle/bwCircleSimulation.test.ts`
- Create: `src/projects/bw-circle/bwCircleYouTube.ts`
- Create: `src/projects/bw-circle/bwCircleSimulation.ts`

- [ ] **Step 1: Write a failing test for YouTube URL normalization**

Add tests covering:
- `https://www.youtube.com/watch?v=abc123XYZ09`
- `https://youtu.be/abc123XYZ09?t=30`
- invalid input returning `null`

Run: `npm test -- src/projects/bw-circle/bwCircleYouTube.test.ts`
Expected: FAIL because the helper file does not exist yet.

- [ ] **Step 2: Write a failing test for deterministic sync cue generation**

Add tests in `bwCircleSimulation.test.ts` for a helper like:

```ts
const cue = createSyncCue({
  currentTime: 12.5,
  isPlaying: true,
  baseCameraMode: "normal",
});
```

Assert stable outputs for:
- idle state when `isPlaying` is `false`
- active state returning bounded `rotationVelocity`, `pulseStrength`, `energy`, and `cameraMode`
- same input timestamp producing the same cue twice

Run: `npm test -- src/projects/bw-circle/bwCircleSimulation.test.ts`
Expected: FAIL because the helper file does not exist yet.

- [ ] **Step 3: Implement the minimal parsing helper**

In `bwCircleYouTube.ts`, add a parser that extracts a normalized `videoId` from `youtube.com/watch`, `youtube.com/embed`, and `youtu.be` URLs and returns `null` for unsupported inputs.

- [ ] **Step 4: Implement the minimal sync cue helper**

In `bwCircleSimulation.ts`, add:
- `export type BwCircleCameraMode = "normal" | "white" | "black";`
- `export interface BwCircleSyncCue { rotationVelocity: number; pulseStrength: number; energy: number; cameraMode: BwCircleCameraMode; }`
- `createSyncCue(...)` using deterministic trig-based curves derived from `currentTime`

- [ ] **Step 5: Re-run both focused tests**

Run: `npm test -- src/projects/bw-circle/bwCircleYouTube.test.ts src/projects/bw-circle/bwCircleSimulation.test.ts`
Expected: PASS.

---

## Chunk 2: UI shell, scene integration, and mode behavior

### Task 3: Build the interactive shell with test-first mode switching

**Files:**
- Create: `src/projects/bw-circle/BwCircleProject.test.tsx`
- Create: `src/projects/bw-circle/BwCircleProject.tsx`
- Create: `src/projects/bw-circle/BwCircleScene.tsx`
- Create: `src/projects/bw-circle/BwCircleYouTubePanel.tsx`
- Create: `src/projects/bw-circle/BwCircleProject.module.css`

- [ ] **Step 1: Write a failing component test for the mode shell**

Create a jsdom test that mocks `BwCircleScene` and asserts:
- the project renders `Mimesis` and `Sync` toggle buttons
- `Mimesis` mode is active by default
- switching to `Sync` reveals the link input and load button
- the mocked scene receives a different controller mode prop after switching

Run: `npm test -- src/projects/bw-circle/BwCircleProject.test.tsx`
Expected: FAIL because the component files do not exist yet.

- [ ] **Step 2: Implement the minimal shell to satisfy the test**

Build `BwCircleProject.tsx` with:
- local state for `mode: "mimesis" | "sync"`
- a two-button toggle matching the existing interactive project pattern
- a shared `BwCircleScene` child
- conditional rendering of `BwCircleYouTubePanel` in sync mode

- [ ] **Step 3: Add the YouTube panel behavior**

Implement `BwCircleYouTubePanel.tsx` with:
- controlled text input
- inline validation via `parseYouTubeVideoId`
- `Load` button that commits a normalized `videoId`
- embedded iframe only after a valid id is loaded

- [ ] **Step 4: Implement the scene wrapper**

Implement `BwCircleScene.tsx` to:
- own the canvas ref and resize handling
- run `requestAnimationFrame`
- choose between free-run motion and `createSyncCue(...)`
- expose camera-mode buttons for `normal`, `white`, and `black`
- keep rendering alive when sync mode has no loaded video

- [ ] **Step 5: Re-run the focused component test**

Run: `npm test -- src/projects/bw-circle/BwCircleProject.test.tsx`
Expected: PASS.

### Task 4: Add the canvas presentation and cleanup behavior

**Files:**
- Modify: `src/projects/bw-circle/BwCircleScene.tsx`
- Modify: `src/projects/bw-circle/BwCircleProject.module.css`

- [ ] **Step 1: Expand the scene from minimal shell into the full visual treatment**

Add:
- fullscreen-style pane layout inside the left project panel
- rotating split-circle composition
- two bouncing balls
- optional procedural bounce sounds gated behind user interaction
- reduced-motion handling

- [ ] **Step 2: Add cleanup-safe lifecycle management**

Ensure animation frames, polling intervals, resize listeners, and audio resources are cleaned up on unmount or mode changes.

- [ ] **Step 3: Re-run the project test and helper tests**

Run: `npm test -- src/projects/bw-circle/BwCircleProject.test.tsx src/projects/bw-circle/bwCircleYouTube.test.ts src/projects/bw-circle/bwCircleSimulation.test.ts`
Expected: PASS.

---

## Chunk 3: Final verification

### Task 5: Run repository verification

**Files:**
- Modify: `docs/superpowers/plans/2026-03-17-bw-circle-youtube-sync.md`

- [ ] **Step 1: Run the full test suite**

Run: `npm test`
Expected: PASS.

- [ ] **Step 2: Run lint**

Run: `npm run lint`
Expected: PASS.

- [ ] **Step 3: Run production build**

Run: `npm run build`
Expected: PASS.

- [ ] **Step 4: Review the changed files and summarize any residual risks**

Run: `git status --short`
Expected: only intended project files plus any pre-existing unrelated user changes.
