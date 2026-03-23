# Bw Circle Sync Preview Design

## Goal

Tighten the Sync overlay controls in the `bw-circle` project and replace the unused top-right `N` camera button with a small visible YouTube embed preview that appears only after a valid video has been loaded.

## Current Context

- `src/projects/bw-circle/BwCircleYouTubePanel.tsx` owns the link input, Play/Stop button, BPM badge, and YouTube iframe API lifecycle.
- `src/projects/bw-circle/BwCircleScene.tsx` currently renders a separate top-right camera toggle with a single static `N` button.
- The YouTube player host is currently rendered off-screen with `.hiddenPlayerHost`, so the video can play without a visible preview.

## Approved Behavior

- The link input and Play/Stop button should be visually smaller by reducing their control height.
- The `N` button should be removed entirely.
- The same top-right area should show a small YouTube preview frame only after a valid video has been committed and loaded.
- Before a video is loaded, that top-right area should remain empty.

## Approach

- Keep a single YouTube player instance and reuse it for both playback and the visible preview.
- Expand the sync overlay container so it can own both the top-left controls and the top-right preview.
- Move the player host from the hidden off-screen container into a styled preview frame that is conditionally rendered when `videoId` exists.
- Preserve the existing playback flow, iframe API setup, error handling, and BPM badge updates.

## Data Flow

- Entering or playing a valid YouTube URL still resolves a `videoId` through `commitInputVideo`.
- Once `videoId` exists, the preview frame renders and provides the mount node for the iframe API player.
- Playback state continues to flow through `onPlaybackChange`; no second iframe or duplicate player state is introduced.

## Error Handling

- Invalid URLs still show the existing inline error message and should not create the preview.
- Embedded-player errors continue to surface through the existing YouTube error messaging.
- If no `videoId` is present, the preview host is not rendered and no player is created.

## Testing

- Update project-level tests to assert the `N` button is gone.
- Update panel tests to assert the preview host is absent before load and present after a valid video is committed.
- Keep existing playback tests passing with the visible preview host.
