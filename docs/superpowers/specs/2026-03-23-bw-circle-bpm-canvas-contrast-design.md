# Bw Circle BPM Canvas Contrast Design

## Goal

Make the Sync BPM label change text color in real time based on the actual canvas pixels directly behind the label.

## Root Cause

The current BPM label is a DOM element styled with a blend mode. That affects compositing, but it does not inspect the black-and-white circle canvas content behind the label. As a result, the label can still become hard to read when the background under the BPM area rotates into a light state.

## Chosen Approach

Keep BPM as a DOM label and drive its tone from canvas sampling:

1. Find the scene canvas behind the BPM label.
2. Read the BPM label bounds in viewport coordinates.
3. Sample a small grid of canvas pixels under that bounds rectangle.
4. Compute average luminance from those sampled pixels.
5. Switch the BPM label between light and dark text based on luminance with hysteresis to avoid flicker.

## Design Details

### DOM Structure

- Keep the BPM label in `BwCircleYouTubePanel`.
- Add a ref on the BPM span so the panel can measure its live screen position.
- The panel should look up the nearest scene shell and query the canvas from there, rather than threading canvas refs through props.

### Sampling Model

- Sample only a sparse grid under the BPM label instead of reading a large block of pixels.
- Convert viewport coordinates to canvas pixel coordinates using the rendered canvas bounds and backing resolution.
- Guard against missing canvas context, zero-sized bounds, and out-of-range reads.

### Contrast Decision

- Use a luminance threshold to decide between dark text on light backgrounds and light text on dark backgrounds.
- Add a small hysteresis band so the label does not rapidly toggle near middle-gray transitions.
- If sampling fails, fall back to a safe default label tone rather than leaving the value undefined.

## Testing

- Add a panel test that mounts the BPM label alongside a mocked canvas and verifies the label tone flips when sampled pixels change from dark to light.
- Add a pure helper test for the luminance and hysteresis logic if the implementation is split into a dedicated utility.
- Re-run the focused bw-circle panel/project tests plus lint and build verification.
