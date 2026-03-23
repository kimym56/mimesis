# Bw Circle Sync Control Polish Design

## Goal

Refine the black-white-circle Sync controls so the row matches the portfolio's corner-radius system, places BPM beside Play, and keeps BPM readable against the rotating scene background.

## Chosen Approach

Update the existing Sync overlay instead of introducing a new component pattern:

1. Keep a single horizontal control row.
2. Reorder controls to `link | play | bpm`.
3. Remove BPM chrome so it reads as status text rather than a badge.
4. Replace pill radii on the link input and play button with `var(--radius-xl)`.
5. Make BPM foreground contrast adaptive to the scene behind it.

## Design Details

### Layout

- The row remains inside `BwCircleYouTubePanel`.
- BPM should sit immediately to the right of the Play/Stop button.
- Existing wrap behavior on narrower widths should stay intact so the row still degrades cleanly on mobile.

### Visual Treatment

- The BPM label should have no background and no border.
- The link field and play button should use `var(--radius-xl)` to align with the scene shell system radius.
- Keep the existing black/white control styling introduced in the current overlay pass.

### Adaptive BPM Contrast

- The BPM text should no longer use a fixed black foreground.
- Use a CSS blend-based treatment so the label inverts against light or dark content behind it.
- The solution should stay lightweight and CSS-driven; no canvas sampling or JS color analysis is needed.

## Testing

- Add/adjust panel tests to lock in the new row order.
- Keep targeted playback/project tests green after the markup change.
- Run focused bw-circle tests plus lint and build verification after implementation.
