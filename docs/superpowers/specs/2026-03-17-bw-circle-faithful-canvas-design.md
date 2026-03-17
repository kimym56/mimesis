# Black & White Circle Faithful Canvas Design

## Goal
Refine the `Black & White Circle` project so the `Mimesis` mode matches the original SABUM piece more closely in React 2D canvas, with minimal UI, and replace the broken reference iframe with a rich Threads preview card.

## Scope
- Keep the project in the existing portfolio grid and interactive project registry.
- Rework the left-pane `Mimesis` mode into a closer 2D canvas recreation of the original piece.
- Keep the `Sync` mode as the edited version with a YouTube link input, but reuse the same 2D canvas foundation.
- Remove descriptive overlay text from the left pane.
- Reduce the camera UI to a single `N` button.
- Replace the right-pane iframe reference for this project with a non-iframe Threads preview card.

## Constraints
- The Threads post cannot be embedded in an iframe because the response sends `x-frame-options: DENY`.
- The mimesis implementation must stay in React with Canvas 2D rather than a raw external embed or a 3D scene.

## Architecture
- Keep `src/app/project/[id]/page.tsx` and the route shell generic.
- Extend the project data model so references can be either:
  - embeddable iframe sources, or
  - rich preview cards with image, title, description, and external URL.
- Split the right-pane rendering into a dedicated reference renderer so embeddable and non-embeddable sources are handled cleanly.
- Refactor the black-white-circle feature so one shared 2D canvas renderer supports two motion profiles:
  - `mimesis` for the closer original-style behavior
  - `sync` for the YouTube-driven edited behavior

## Left Pane Interaction

### Mimesis Mode
- Render a full scene on a 2D canvas.
- Keep only a single `N` control visible.
- Do not show any descriptive text overlay.
- Match the original piece more closely:
  - centered split circle
  - time-based full rotation pacing
  - two contrasting inner balls
  - simplified normal-view framing
  - softer original-style motion instead of an overtly stylized reinterpretation

### Sync Mode
- Keep the same 2D visual language as the mimesis mode.
- Preserve the YouTube link input and timeline-driven pseudo-sync behavior.
- Keep the UI minimal and consistent with the mimesis presentation.

## Right Pane Interaction
- Replace the iframe for `black-white-circle` with a Threads preview card.
- Show:
  - the post image
  - the post title / author label
  - a short description excerpt
  - an `Open on Threads` link
- Keep iframe rendering for other projects that already use embeddable sources.

## Data Flow
- Add structured `referencePreview` metadata to the `Project` type for non-embeddable references.
- The project detail renderer should prefer `referencePreview` when present, otherwise fall back to `referenceEmbed`, then finally to the static image.
- The black-white-circle canvas module should separate:
  - draw primitives and scene sizing
  - `mimesis` motion rules
  - `sync` motion rules

## Error Handling And Accessibility
- Threads references should never render as broken iframes.
- If preview metadata is missing, the detail page should fall back to the project’s static reference image.
- Mode switches must clean up animation frames, timers, and audio resources.
- The single `N` button should remain keyboard accessible.

## Testing And Verification
- Add a failing data-layer test for the new Threads preview metadata.
- Add a component test for the project detail reference renderer that prefers preview cards over iframes.
- Add or update black-white-circle tests so `Mimesis` mode stays minimal and `Sync` mode still shows the YouTube link input.
- Keep scene behavior testable through pure helpers rather than canvas snapshots.
- Verify with:
  - `npm test`
  - `npm run lint`
  - `npm run build`
