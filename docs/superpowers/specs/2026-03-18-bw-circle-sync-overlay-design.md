# Black & White Circle Sync Overlay Design

## Goal
Replace the current SYNC panel with a compact control pill rendered on top of the canvas while keeping the YouTube player hidden. The scene should sync against a real YouTube timeline, but no embedded video UI should be visible.

## Scope
- Move the SYNC controls onto the canvas as a top-left overlay.
- Use the provided YouTube URL as the input placeholder, while still allowing any valid YouTube link.
- Load valid links into a hidden YouTube iframe and keep them paused until the user presses `Play`.
- Replace the old `Load` flow with a simple `Play` / `Stop` button.
- Keep the existing scene sync behavior and camera controls.

## Architecture
- `BwCircleProject` continues to own `mode`, committed `videoId`, and normalized playback state.
- `BwCircleScene` remains the renderer, but becomes the visual container for the overlay so sync controls sit inside the scene shell rather than above it.
- `BwCircleYouTubePanel` remains the sync controller. It owns raw URL input, validation, hidden iframe lifecycle, and player commands.
- The scene continues to consume only `{ currentTime, isPlaying }` and stays unaware of YouTube internals.

## Interaction Design

### Overlay Layout
- Render a compact glass-style pill in the top-left corner of the scene shell.
- Desktop layout uses one row: URL input plus adjacent button.
- Mobile layout may wrap into two rows while staying anchored top-left.
- Camera controls stay in their current position and should not merge with the sync overlay.

### Input And Loading
- Input placeholder: `https://youtu.be/97qr0BOdHkc?si=xgT_cD0WHCGQsn_C`
- The raw input stays editable and does not immediately replace the active track.
- A valid URL is committed when the user presses `Enter` in the input or the input loses focus.
- Committing a valid URL updates the hidden player to the new video and keeps playback paused.
- Invalid URLs show a short inline error below the pill.

### Playback Controls
- The button label is `Play` while idle or paused.
- Pressing `Play` ensures the current valid URL is committed, then starts the hidden YouTube player.
- While playback is active, the button label changes to `Stop`.
- Pressing `Stop` stops the hidden player and returns the sync state to idle.
- No visible YouTube embed or poster frame is rendered at any point.

## Data Flow
- `BwCircleYouTubePanel` parses raw input with `parseYouTubeVideoId`.
- On valid commit, the panel calls `onLoad(videoId)` and rebinds the hidden player to that video.
- Hidden player readiness and state changes are normalized into `BwCirclePlaybackState`.
- `BwCircleProject` passes normalized playback into `BwCircleScene`, which continues to derive motion through `createSyncCue`.

## Error Handling And Accessibility
- Invalid URLs do not clear the current committed video unless explicitly replaced with a new valid URL.
- Hidden-player startup should tolerate iframe API timing issues and autoplay restrictions.
- The input and button remain keyboard-accessible.
- The hidden player host should stay mounted off-screen or visually hidden without affecting layout.

## Testing
- Update the sync shell test to expect the placeholder URL and `Play` button instead of the old `Load` flow.
- Add panel tests covering:
  - valid URL commit on `Enter`
  - play action loading paused state first, then starting playback
  - stop action returning the scene to idle playback
  - no visible player frame in the rendered UI
- Re-run focused bw-circle tests, lint for changed files, and production build verification.
