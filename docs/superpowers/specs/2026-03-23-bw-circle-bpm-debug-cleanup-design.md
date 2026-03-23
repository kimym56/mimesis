# Black & White Circle BPM Debug Cleanup Design

## Goal
Remove the temporary BPM console diagnostics and the bridge-side diagnostic callback plumbing while keeping the current unfiltered analyzer path and BPM publishing behavior unchanged.

## Scope
- Delete the Sync-scene console logging that was added for BPM debugging.
- Remove the optional diagnostic callback from the realtime BPM bridge.
- Update the existing bridge and scene tests to stop expecting debug-only behavior.

## Out Of Scope
- Changing the current unfiltered analyzer connection.
- Reintroducing the low-pass filter.
- Adding a persistent debug flag or alternative diagnostics UI.

## Architecture
- Keep `src/projects/bw-circle/BwCircleScene.tsx` focused on scene behavior and BPM publishing only.
- Keep `src/projects/bw-circle/bwCircleRealtimeBpm.ts` focused on wiring the analyzer and forwarding rounded BPM values.
- Remove the diagnostic-only interface surface so the bridge API returns to its smaller production shape.

## Testing
- Update the existing BPM bridge test to stop asserting diagnostic callback forwarding.
- Update the existing scene test to stop asserting console output or diagnostic callback registration.
- Re-run the focused bw-circle test set and lint the changed files.
