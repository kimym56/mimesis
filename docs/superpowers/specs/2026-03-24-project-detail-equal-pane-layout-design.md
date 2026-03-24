# Project Detail Equal Pane Layout Design

## Goal

Restore a true equal-width desktop split between the `My Mimesis` and `Original Reference` panes in the project detail layout, even when the reference pane contains intrinsically wide embedded content such as the official X post.

## Current Context

- `src/app/project/[id]/ProjectDetail.module.css` uses a flex row for `.splitLayout` on desktop and assigns `flex: 1` to each `.pane`.
- The new official X embed introduces content with a strong intrinsic width, which can trigger flexbox minimum-size behavior and make the right pane consume more than half of the available width.
- The visual issue is layout-level, not specific to the X embed component's logic.

## Approved Behavior

- On desktop widths, the left and right detail panes should remain the same ratio.
- Embedded content inside either pane must shrink within the pane instead of forcing that pane wider.
- Mobile stacked layout should remain unchanged.
- The fix should be shared at the project-detail layout layer rather than hardcoded only for `staggered-text`.

## Approach

- Keep the existing flex-based `splitLayout`.
- Update `.pane` so each pane uses a zero flex basis and can shrink below the intrinsic width of its children.
- Add `min-width: 0` so wide descendants cannot expand the pane beyond its intended half-width.
- Leave the X embed and other reference renderers unchanged unless verification shows a second issue after the layout fix.

## Error Handling

- The desktop fix must not introduce clipping or overflow regressions for the existing iframe, Threads, or image reference paths.
- The new flex rule should not affect the mobile column layout.

## Testing

- Add a CSS regression test that asserts the project detail pane rule includes a shrinkable flex basis and `min-width: 0`.
- Run the existing reference-related tests plus lint/build verification to ensure the shared layout change does not regress the project detail route.
