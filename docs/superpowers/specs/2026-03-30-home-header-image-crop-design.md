# Home Header Image Crop Design

## Goal

Reveal slightly more of the top portion of the home header artwork without changing the header's height, overlay treatment, or overall visual balance.

## Approved Direction

Move the home header image crop upward by changing its `object-position` from `center 45%` to `center 38%`.

## UI Behavior

- Keep the current header height and spacing.
- Keep the current overlay gradient and image opacity.
- Only adjust the vertical framing of the existing `mimesis.svg` artwork.

## Implementation Notes

- Update the `.home-header-cover-image` rule in `src/app/globals.css`.
- Leave all other home header styles unchanged so the change stays isolated to framing.

## Testing

- Run a production build to confirm the stylesheet change compiles cleanly.
- Note that the repository lint command currently reports errors from generated nested `.next/dev` artifacts, so build verification is the reliable check for this change.
