# Black & White Circle Tab Audio Sync Design

## Goal
Let `Sync` mode react to the real music from a pasted YouTube URL by capturing current-tab audio after the user clicks `Play`, then analyzing that stream locally in the browser.

## Scope
- Keep the current hidden-YouTube `Sync` flow with URL input plus `Play` / `Stop`.
- Change `Play` so it also starts a browser permission flow for current-tab audio capture.
- Replace manual BPM / tap-tempo as the primary sync source when capture is active.
- Drive the two large balls and particle energy from live audio analysis while still using YouTube playback time as the transport clock.
- Preserve the current canvas scene, hidden-player architecture, and inline error handling.

## Out Of Scope
- Silent auto-capture without user permission.
- Backend media analysis or persistent beatmap caching.
- Recording, exporting, or uploading captured audio.
- Waveform inspectors, spectrum bars, or a large permissions modal.

## Constraint
The YouTube iframe API provides playback control and time, but not raw audio data. To follow the actual music in a normal browser page, the app must capture current-tab audio via an explicit user permission step.

## Architecture
- `BwCircleProject` remains the top-level owner of Sync state. It should add a small audio-sync session state shape with capture status, user-facing permission copy, and the active `MediaStream` when capture succeeds.
- `BwCircleYouTubePanel` continues to manage URL parsing, hidden iframe lifecycle, and playback commands, but `Play` now also becomes the trigger for `getDisplayMedia(...)`. The panel should surface the permission message inline when audio sync is unavailable or denied.
- `BwCircleScene` remains the frame renderer. It should continue using YouTube time for smooth transport, but when a captured audio stream is active it should create an `AudioContext`, attach an `AnalyserNode`, and derive live energy/onset cues each frame.
- A new pure helper module should normalize raw analyser data into stable cue values the scene can trust without frame-to-frame jitter.

## Interaction Design

### Sync Controls
- Keep the existing URL input and `Play` / `Stop` button.
- Remove manual BPM / tap controls from the primary path for this design.
- When the user clicks `Play` and audio sync is not active, immediately request tab capture permission.
- Show one short inline message whenever capture is not active:
  - `Allow permission to use audio sync for this feature.`
- If permission succeeds, hide the message and let visuals follow the live audio.
- If permission is denied, canceled, ends, or audio is unavailable, keep playback working but fall back to the current non-audio sync path and show the same message again.

### Playback Feel
- The circle rotation should still use predicted YouTube time so transport stays smooth even if analyser frames are noisy.
- Real audio should primarily affect:
  - ball kick intensity
  - squash/stretch amount
  - particle energy lift
- Audio response should feel strong on transients without degenerating into constant jitter during sustained loud sections.

## Data Flow
- `BwCircleYouTubePanel` loads and plays the hidden YouTube player.
- On the first `Play`, the panel calls `navigator.mediaDevices.getDisplayMedia(...)` and asks the user to include current-tab audio.
- On success, the panel passes the active `MediaStream` plus status back to `BwCircleProject`.
- `BwCircleProject` stores:
  - playback sample `{ currentTime, isPlaying, sampledAtMs }`
  - audio sync status
  - active `MediaStream | null`
- `BwCircleScene` attaches the stream to Web Audio, reads analyser buffers, and computes a normalized audio cue each frame.
- The scene combines:
  - predicted YouTube playhead for transport continuity
  - live audio cue for reactive motion

## Audio Analysis Model
- Use an `AnalyserNode` fed from `createMediaStreamSource(stream)`.
- Sample both time-domain and frequency-domain data each frame.
- Derive a compact cue with at least:
  - `energy`
  - `bassEnergy`
  - `onsetStrength`
- Apply smoothing and floor/ceiling clamps so quiet passages do not fully freeze the scene and loud passages do not blow it apart.
- Prefer deterministic pure helper functions for cue shaping so they can be unit tested without DOM or Web Audio dependencies.

## Error Handling And Accessibility
- If `getDisplayMedia` is unavailable, show the permission message and stay on non-audio sync.
- If the user denies permission, do not block YouTube playback.
- If the capture stream stops later, tear down the analyser cleanly and return to fallback sync.
- Keep `Play` keyboard-accessible and ensure the inline message remains readable at mobile sizes.
- Reduced-motion users should still get smoother transport, but with damped audio-driven amplitude.

## Testing
- Add pure unit tests for audio cue normalization helpers in a dedicated test file.
- Add panel tests for `Play` triggering permission flow, successful stream handoff, and denied permission handling.
- Update the project shell test so `Sync` mode expects the permission message instead of BPM / tap controls.
- Re-run the focused bw-circle test set, lint the changed files, and verify a production build.
