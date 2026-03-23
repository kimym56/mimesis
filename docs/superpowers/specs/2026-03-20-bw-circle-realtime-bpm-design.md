# Black & White Circle Realtime BPM Analyzer Design

## Goal
Replace the custom Sync BPM estimator with `realtime-bpm-analyzer` so the displayed BPM comes from a purpose-built real-time tempo detector while the existing particle-reactive motion stays unchanged.

## Scope
- Keep the current Sync overlay, YouTube input, and BPM badge UI.
- Continue using the current analyser-derived cue path for ball and particle motion.
- Feed the captured tab audio into `realtime-bpm-analyzer` only for BPM detection.
- Publish stable BPM updates from the scene into the existing project and panel wiring.

## Out Of Scope
- Reworking the sync animation model around the external library.
- Showing beat confidence, tempo history, or multiple tempo candidates.
- Adding offline file analysis or YouTube metadata tempo lookup.

## Architecture
- Add `realtime-bpm-analyzer` as a dependency and wrap it in a small bw-circle helper so the scene does not own library-specific event details.
- In `BwCircleScene`, create one analyzer instance per active Sync audio graph and connect the existing `MediaStreamAudioSourceNode` into both the visual analyser and a low-pass-filtered BPM branch.
- Publish the library's stable tempo updates through the existing `onEstimatedBpmChange` callback so `BwCircleProject` and `BwCircleYouTubePanel` remain unchanged at their interface boundary.
- Remove or isolate the old custom tempo-estimation logic from the BPM display path, but keep any cue and motion helpers still used by the particle system.

## Data Flow
- `getDisplayMedia()` provides a tab audio stream.
- `BwCircleScene` creates a `MediaStreamAudioSourceNode`.
- The source continues to feed the current frequency analyser for visual motion.
- A second branch feeds a low-pass filter and then `realtime-bpm-analyzer`.
- The analyzer emits BPM events; the scene rounds and publishes them upward.
- `BwCircleProject` stores the latest `estimatedBpm`.
- `BwCircleYouTubePanel` renders `-- BPM` or `${estimatedBpm} BPM`.

## Error Handling
- If the library fails to initialize, keep the badge at `-- BPM` and leave Sync visuals working.
- Reset BPM to `null` when Sync stops, playback stops, capture is lost, or the scene unmounts.
- Ensure cleanup disconnects the BPM branch and removes listeners so repeated Sync sessions do not leak analyzers.

## Testing
- Add focused tests for the new BPM analyzer wrapper behavior and scene publishing path.
- Keep panel and project wiring tests to confirm the existing badge contract still holds.
- Re-run focused bw-circle tests, lint changed files, and run a production build.
