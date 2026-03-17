# Black & White Circle YouTube Sync Design

## Goal
Add a new interactive portfolio project that recreates SABUM's `Black & White Circle` piece and includes a second mode where a pasted YouTube link drives a timeline-based pseudo-sync version of the animation.

## Scope
- Add a new interactive project entry to the portfolio grid and project detail route.
- Recreate the reference interaction as a canvas-based scene with monochrome yin-yang geometry, two bouncing balls, procedural bounce sound, and a three-state camera toggle.
- Add a second mode with a YouTube link input and embedded player.
- Derive animation cues from playback state and current playback time instead of real audio analysis.

## Architecture
- Keep the existing route and detail shell generic.
- Register a new interactive renderer through `src/projects/registry.ts`.
- Implement the feature under `src/projects/bw-circle/`.
- Share one canvas scene engine across both modes so rendering, physics, and camera logic live in one place.
- Drive the shared engine with separate controllers:
  - `free-run` for the plain mimesis mode
  - `youtube-sync` for the link-input mode

## Components
- `src/projects/bw-circle/BwCircleProject.tsx`
  - Top-level client component with the same mode-toggle pattern used by other interactive projects.
- `src/projects/bw-circle/BwCircleScene.tsx`
  - Canvas host that owns sizing, animation loop, and lifecycle cleanup.
- `src/projects/bw-circle/bwCircleSimulation.ts`
  - Pure helpers for physics state updates, camera state, and deterministic sync cues.
- `src/projects/bw-circle/bwCircleYouTube.ts`
  - YouTube URL parsing and normalization helpers.
- `src/projects/bw-circle/BwCircleYouTubePanel.tsx`
  - Link input, validation, load action, and embedded player shell for sync mode.
- `src/projects/bw-circle/BwCircleProject.module.css`
  - Localized layout, controls, and mode toggle styling.

## Interaction Design

### Mode A: Mimesis
- Render the black/white split circle scene full-bleed inside the project pane.
- Show a right-side camera toggle with `Normal`, `White`, and `Black` focus modes.
- Keep the animation self-running with procedural motion and bounce sound.

### Mode B: YouTube Sync
- Keep the same visual scene and camera controls.
- Add a compact control row for a YouTube link input and `Load` button.
- Accept common YouTube URL formats and normalize them to a video id before creating the player.
- When playback is active, map player time into deterministic animation cues:
  - rotation-speed shifts
  - zoom pulses
  - bounce-energy accents
  - camera emphasis changes
- If no valid link is loaded, keep the scene alive in an idle state.

## Data Flow
- The YouTube panel owns the raw input string, parsed video id, and inline validation state.
- A lightweight player adapter exposes `isPlaying`, `currentTime`, and `videoId` to the sync controller.
- The sync controller maps playback time into motion curves so the same timestamp always produces the same animation phrasing.
- The scene engine consumes controller output and remains unaware of whether cues came from free-run logic or sync logic.

## Error Handling And Accessibility
- Invalid YouTube links show inline validation without breaking the canvas scene.
- Player load failures and autoplay restrictions fall back to paused or idle sync behavior.
- Mode switches must tear down timers, polling, and audio resources cleanly.
- Respect `prefers-reduced-motion` by toning down nonessential motion accents.

## Testing And Verification
- Add unit tests for YouTube URL parsing and normalization.
- Add unit tests for deterministic sync cue generation from playback time.
- Add a component test for the new project shell to verify mode toggling and conditional sync controls.
- Add a data-layer test for the new project metadata and registry wiring.
- Verify with `npm test`, `npm run lint`, and `npm run build`.
