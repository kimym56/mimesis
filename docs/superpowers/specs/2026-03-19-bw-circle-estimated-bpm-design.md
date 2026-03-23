# Black & White Circle Estimated BPM Design

## Goal
Show an estimated BPM next to the Sync URL input so the user can see the detected tempo from the captured tab audio.

## Scope
- Keep the existing URL input plus `Play` / `Stop` sync overlay.
- Estimate tempo from the live captured audio that already drives Sync motion.
- Render a compact read-only BPM badge in the same row as the URL input.
- Show a placeholder when there is not enough audio evidence yet.

## Out Of Scope
- Manual BPM editing.
- YouTube metadata scraping or external BPM APIs.
- Exact DJ-grade beat detection.
- Additional visualizers such as waveform or spectrum panels.

## Architecture
- `bwCircleAudioSync.ts` should grow a small pure tempo-estimation helper that consumes onset-shaped audio cues and recent onset timestamps, then returns a stable BPM estimate.
- `BwCircleScene` should own the per-frame estimator state because it already sees the analyser data. It should publish rounded BPM updates upward only when the displayed value changes.
- `BwCircleProject` should store the current estimated BPM in state and pass it into `BwCircleYouTubePanel`.
- `BwCircleYouTubePanel` should render a compact BPM pill next to the input and keep the existing mobile wrap behavior.

## Tempo Estimation Model
- Reuse `createBwCircleAudioCue(...)` output, especially `onsetStrength`, instead of adding a separate signal path.
- Accept an onset only when it clears a threshold and falls outside a short cooldown window so one beat does not register across multiple frames.
- Keep a short rolling window of valid beat intervals and use the median interval to avoid outlier spikes.
- Convert the median interval into BPM, clamp it to a practical display range, and smooth it before exposing it to the UI.
- Require several valid intervals before showing a BPM so the badge does not flash noisy guesses.

## Interaction Design
- Show `-- BPM` before the estimator has enough confidence.
- Once available, show a rounded label like `128 BPM`.
- Keep the badge visually subordinate to the input and playback button.
- Reset the estimate when playback stops, Sync is left, or audio capture becomes inactive.

## Testing
- Add pure unit tests for the tempo estimator helper.
- Add a panel test for placeholder vs estimated BPM rendering.
- Add a project wiring test that confirms scene-published BPM updates reach the panel.
- Re-run focused bw-circle tests, lint changed files, and verify a production build.
