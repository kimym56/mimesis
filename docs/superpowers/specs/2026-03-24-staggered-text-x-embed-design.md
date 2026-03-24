# Staggered Text X Embed Design

## Goal

Replace the `staggered-text` reference pane's outbound X preview card with an official embedded X post while keeping the existing fallback card available if the widget fails to load.

## Current Context

- `src/app/project/[id]/ProjectReferenceContent.tsx` currently renders preview cards for `referencePreview` metadata and only has an official embed path for Threads posts.
- The `staggered-text` project already stores X reference metadata in `src/data/projects.ts`, and the preview card currently links out to the original post.
- The user provided the official X embed markup for the target post, including the required `platform.twitter.com/widgets.js` script.

## Approved Behavior

- The `staggered-text` project should use the official embedded X post in the right-hand reference pane instead of the link-only preview card.
- This behavior should be hardcoded only for the `staggered-text` project; no generic X embed platform abstraction is needed.
- If the X widget cannot load or hydrate, the existing preview card should remain visible as a graceful fallback.
- Existing Threads embed behavior must remain unchanged.

## Approach

- Add a dedicated client component for the `staggered-text` X embed under `src/app/project/[id]/`.
- Render the official blockquote markup for Rauno Freiberg's post directly in that component and load `https://platform.twitter.com/widgets.js` once.
- After mount, call `window.twttr.widgets.load()` against the embed container so the blockquote hydrates into the X post UI.
- Update `ProjectReferenceContent` to route only `project.id === "staggered-text"` to the new embed component while leaving all other preview-card and Threads logic intact.

## Data Flow

- `ProjectReferenceContent` still builds the existing preview card as fallback content from `project.referencePreview`.
- When the current project is `staggered-text`, it renders the dedicated X embed wrapper and passes the fallback card into it.
- The client embed component injects the X blockquote, ensures `widgets.js` is present, and invokes X's widget loader after the markup is mounted.
- If script loading fails, the component keeps the fallback card visible instead of breaking the reference pane.

## Error Handling

- Script loading must be idempotent so repeated renders do not inject duplicate `widgets.js` tags.
- The embed component should tolerate X widget initialization failure and preserve the fallback card.
- The fallback path should remain server-renderable so the pane still has meaningful content before hydration or under blocked third-party scripts.

## Testing

- Update reference content tests to assert that `staggered-text` uses the X embed branch rather than the generic card-only branch.
- Add a dedicated embed component test that verifies the official script is injected once and that fallback content remains when the widget API is unavailable.
- Keep the existing Threads reference tests passing to confirm no regression in the current official embed path.
