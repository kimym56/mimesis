# Bw Circle Sync Performance Design

## Goal

Reduce Sync lag during same-tab audio capture without changing the Mimesis presentation or removing the BPM badge.

## Root Cause

The expensive path is the Sync scene itself during tab capture:

- The canvas renders at full device pixel ratio.
- The particle simulation updates and draws roughly 10,000 particles per frame at the default desktop layout.
- Same-tab capture forces the browser to composite and capture that heavy canvas continuously.

The BPM debug logs added during troubleshooting also no longer have value and should be removed.

## Chosen Approach

Apply a Sync-only performance profile when audio sync is active:

1. Cap the internal canvas pixel ratio to `1` while Sync capture is active.
2. Reduce Sync particle density substantially while keeping Mimesis unchanged.
3. Remove the temporary realtime BPM debug logging and listener overhead.

## Design Details

### Performance Profile

- Introduce a small pure performance-mode concept for the black-white-circle simulation helpers.
- Default mode preserves the current layout and particle density.
- Sync capture mode scales particle density down to a lower fixed multiplier and caps the canvas render ratio.

### Scene Integration

- The scene should treat `mode === "sync"` plus `audioSync.status === "active"` as the trigger for the lighter render profile.
- When that profile changes, the scene can recreate its particle field and canvas backing size to match the new load target.

### Logging Cleanup

- Remove the temporary BPM console debug path from the realtime BPM bridge and scene.
- Keep only the BPM publishing behavior needed by the badge.

## Testing

- Add pure tests for the Sync performance profile:
  - reduced particle density in Sync capture mode
  - capped render pixel ratio in Sync capture mode
- Update scene tests to assert the canvas uses the capped ratio during active Sync capture.
- Keep the existing BPM bridge tests focused on connection and BPM publishing behavior.
