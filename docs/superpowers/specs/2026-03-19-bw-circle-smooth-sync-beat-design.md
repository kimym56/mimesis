# Black & White Circle Smooth Sync Beat Design

## Goal
Remove the visible stepping in `Sync` mode by predicting motion between YouTube time samples, and add a lightweight manual beat layer so the two large balls can accent to the music more intentionally.

## Scope
- Keep the current hidden-YouTube `Sync` workflow with URL input plus `Play` / `Stop`.
- Smooth the scene by deriving a predicted playhead between coarse YouTube timestamp samples.
- Add a compact `BPM` input and `Tap` button to the Sync overlay.
- Use the manual beat clock only for accents on the two main balls and a modest particle energy lift.
- Preserve the current canvas scene, camera control surface, and hidden-player architecture.

## Out Of Scope
- Real audio analysis from arbitrary YouTube embeds.
- Waveform visualizations, spectrum bars, or BPM persistence beyond the current page session.
- Replacing the hidden YouTube player with a custom media pipeline.

## Constraint
The YouTube iframe API does not expose usable audio data for arbitrary pasted links, so “follow the music” must be implemented as a manual beat-lock layer rather than true signal analysis.

## Architecture
- `BwCircleProject` remains the top-level owner of sync state. It should expand the normalized playback payload to include the last sampled timestamp metadata and own the current manual BPM value so tempo survives panel remounts.
- `BwCircleYouTubePanel` continues to manage URL parsing, hidden iframe lifecycle, and playback commands, but it now also exposes richer playback samples and a compact tempo control surface.
- `BwCircleScene` remains the frame-by-frame renderer. It should stop trusting stepped `currentTime` directly and instead predict a smooth playhead from the last sampled time plus elapsed wall-clock time while playback is active.
- `bwCircleSimulation.ts` should own the pure timing helpers: predicted playhead math, beat-envelope helpers, and sync cue shaping for ball accents.

## Interaction Design

### Sync Controls
- Keep the existing URL field and `Play` / `Stop` button.
- Add a compact numeric `BPM` field beside the transport controls.
- Add a small `Tap` button beside the BPM field.
- Default BPM: `120`.
- Clamp BPM to a practical range, for example `60` to `200`.
- Tapping 2-4 times updates BPM from the recent intervals.
- BPM survives mode switches while the page stays open, but does not need URL persistence or saved project state.

### Playback Feel
- The split-circle rotation and other timeline-driven sync motion should follow the predicted playhead continuously instead of jumping every poll.
- The two large balls should receive beat accents only, not constant BPM-driven steering.
- Each beat accent should briefly increase impulse, squash/stretch, and local particle energy.
- Between beats, the scene should fall back to the current baseline physics so the motion still feels like the original piece rather than a metronome demo.

## Data Flow
- `BwCircleYouTubePanel` samples the player with `{ currentTime, isPlaying, sampledAtMs }` whenever it receives state changes and during background polling.
- `BwCircleProject` stores the latest normalized playback sample and the current `syncBpm`.
- `BwCircleScene` uses `performance.now()` and the latest sample to derive:
  - `predictedCurrentTime`
  - beat phase from `predictedCurrentTime` and `syncBpm`
  - accent envelope strength for the current frame
- `createSyncCue` should consume the predicted playhead, playing state, and BPM-derived accent strength rather than only the raw stepped timestamp.

## Motion Rules

### Smooth Timeline Motion
- While playing, predicted time should advance continuously from the last sampled value.
- While paused or stopped, predicted time should freeze at the last sampled value or reset to idle as appropriate.
- When a fresh YouTube sample arrives, the predicted playhead should re-anchor to that sample instead of drifting indefinitely.

### Beat Accents
- Beat phase should be deterministic from `predictedCurrentTime` and `syncBpm`.
- The accent should be strongest near beat onset and decay quickly within the beat window.
- The two large balls should receive the strongest response:
  - brief velocity kick
  - stronger squash/stretch spike
  - slightly higher rebound energy
- Particles may receive a smaller transient lift so the scene feels cohesive, but the beat system should not dominate the composition.

## Error Handling And Accessibility
- Invalid YouTube URLs and YouTube playback errors should continue to surface inline in the overlay.
- Tempo edits should tolerate partial numeric entry without breaking the current value.
- `Tap` must remain keyboard-accessible.
- Reduced-motion users should still get smoother prediction but with lower accent amplitude.

## Testing
- Add pure unit tests for predicted playhead behavior and beat-envelope outputs in `src/projects/bw-circle/bwCircleSimulation.test.ts`.
- Add panel tests for BPM input and tap-tempo behavior in `src/projects/bw-circle/BwCircleYouTubePanel.test.tsx`.
- Update the project shell test so `Sync` mode expects the BPM and `Tap` controls in addition to the existing overlay.
- Re-run the focused bw-circle test set, lint the changed files, and verify a production build.
