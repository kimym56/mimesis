# Black & White Circle BPM Diagnostics Design

## Goal
Improve Sync-mode BPM debugging by narrowing the BPM detector's low-frequency input range and logging raw analyzer output so slower or less percussive tracks can be inspected directly in the browser console.

## Scope
- Keep the existing Sync overlay, YouTube input flow, and BPM badge UI unchanged.
- Continue using the captured tab audio path and `realtime-bpm-analyzer` for BPM detection.
- Lower the BPM bridge's low-pass cutoff so the detector focuses on a narrower bass band.
- Surface raw BPM analyzer payloads and published BPM values through structured console logs during runtime.

## Out Of Scope
- Redesigning the Sync UI or adding a visible debug panel.
- Replacing `realtime-bpm-analyzer` with a different tempo-detection strategy.
- Adding manual tempo entry, tap-tempo, or confidence UI in this change.

## Architecture
- Keep `src/projects/bw-circle/bwCircleRealtimeBpm.ts` as the single wrapper around `realtime-bpm-analyzer`.
- Extend the BPM bridge wrapper so it can report raw analyzer events upward for diagnostics while preserving the existing rounded BPM callback.
- In `BwCircleScene`, log analyzer event data and the final BPM value that gets published to project state so debugging stays at the scene boundary where playback state is already known.
- Avoid changing `BwCircleProject` or `BwCircleYouTubePanel` interfaces unless diagnostics require it; console instrumentation should stay internal to the scene and bridge flow.

## Data Flow
- Tab audio still enters `BwCircleScene` through the existing `MediaStreamAudioSourceNode`.
- The same source continues feeding the visual analyser branch.
- The BPM branch continues feeding the low-pass filter and `realtime-bpm-analyzer`, but with a lower cutoff frequency.
- The bridge emits two outputs:
  - the rounded top BPM candidate for the badge path
  - the raw analyzer payload for console diagnostics
- `BwCircleScene` logs the raw payload and logs when a BPM is actually published while playback is active.

## Error Handling
- If the analyzer emits no valid tempo candidates, keep the badge at `-- BPM` and log the empty candidate payload so detection failures are visible.
- If the analyzer fails to initialize, keep Sync visuals working and avoid crashing the scene.
- Reset the published BPM to `null` when playback or audio sync stops, as before.

## Testing
- Add bridge tests that verify raw analyzer payloads are exposed alongside rounded BPM callbacks.
- Keep the existing BPM bridge lifecycle assertions intact.
- Run focused bw-circle tests covering the bridge and scene/panel wiring after the implementation changes.
