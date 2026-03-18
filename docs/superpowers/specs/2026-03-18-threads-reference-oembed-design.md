# Threads Reference OEmbed Design

## Goal
Replace the custom preview-only Threads reference path with the official Threads oEmbed render path for eligible posts, while keeping the existing preview card as a graceful fallback.

## Scope
- Keep the right-pane reference renderer generic for all projects.
- Add a Threads-specific embed path for projects that provide a Threads post URL.
- Preserve the current preview-card metadata so the UI still has a stable fallback if the embed response is unavailable.
- Avoid any iframe-based Threads rendering.

## Constraints
- Directly iframing a Threads post is not possible because the page responds with `x-frame-options: DENY`.
- The official Threads oEmbed endpoint for the current post returns public HTML that expects `https://www.threads.com/embed.js`.
- The embed should fail soft and leave the current preview card path intact.

## Architecture
- Extend the project reference metadata so a Threads reference can declare both:
  - `url` and fallback preview content
  - an `embed` mode indicating that the project should try official oEmbed first
- Keep `ProjectReferenceContent` as the right-pane switchboard.
- Add a dedicated Threads embed component that:
  - fetches oEmbed HTML for the post URL
  - injects the returned blockquote markup
  - loads the official Threads embed script
  - falls back to the existing preview card if the fetch fails or returns no HTML

## Rendering Model
- On first render, show the fallback preview card so the pane is never empty.
- Once oEmbed HTML arrives, replace the fallback card with the official Threads embed.
- Do not depend on the returned inline script tag from oEmbed; load the Threads embed script explicitly from the app so React rendering stays controlled.

## Error Handling And Accessibility
- If the oEmbed request fails, keep the preview card visible and do not surface a broken placeholder.
- Preserve the external `Open on Threads` link in the fallback card for keyboard and screen-reader access.
- Treat the embed as progressive enhancement, not the only content path.

## Testing And Verification
- Add tests for:
  - Threads references rendering the preview fallback by default in static markup
  - the client embed component requesting the expected oEmbed URL
  - fallback behavior when the oEmbed request fails
- Verify with focused tests plus lint for the touched files.
