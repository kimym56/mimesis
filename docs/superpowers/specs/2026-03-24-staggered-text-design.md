# Staggered Text Design

## Goal

Replace the placeholder `creative-portfolio` entry with a new interactive `staggered-text` project that recreates Rauno Freiberg's staggered hover text motion using CSS transitions and a small React text-splitting component, while preserving the portfolio's existing layout and visual language.

## Current Context

- Project detail pages already support interactive left-pane demos via `src/projects/registry.ts` and `src/app/project/[id]/ProjectDetailClient.tsx`.
- Project metadata lives in `src/data/projects.ts`, with tests covering reference metadata and interactive project registration.
- Reference content currently supports iframe embeds and Threads preview cards, but it does not support X posts as a first-class preview card platform.
- Existing interactive projects use focused project-local components and CSS modules instead of generic animation utilities.

## Approved Behavior

- The home grid should show a new `Staggered Text` project in place of `creative-portfolio`.
- Opening the project detail route should keep the existing split-pane layout:
  - left pane: an interactive imitation of the staggered text motion,
  - right pane: a reference card linking to Rauno Freiberg's original X post.
- The imitation should match the original interaction model:
  - idle text at rest,
  - staggered per-letter 3D flip/reveal on hover,
  - touch interaction that animates on press and stays active while pressed,
  - keyboard focus/press support that mirrors the active state.
- The implementation should use CSS transitions for motion and a small React component only for text splitting and interaction state.
- Reduced-motion users should see a simplified, non-3D reveal that preserves readability and layout.

## Approach

- Add a new `staggered-text` interactive module under `src/projects/staggered-text/` and register it through the existing interactive project registry.
- Build the imitation as a compact, self-contained stage with a centered CTA wordmark using the same wording as the reference (`Get started`).
- Split the text into characters in React and expose a stable `--char-index` CSS variable per slot so CSS can drive staggered delays.
- Render layered glyphs inside each slot:
  - a resting glyph,
  - a revealed glyph,
  - a subtle trailing/echo layer to give the motion depth.
- Use CSS `perspective`, `transform`, `opacity`, `filter`, and staggered transition delays to create the stepped cascade without per-frame JS animation.
- Extend reference preview metadata so non-Threads platforms can render the same card component without attempting oEmbed behavior.

## Data Flow

- `src/data/projects.ts` defines the new project entry and points `interactiveDemo` to `staggered-text`.
- `src/projects/registry.ts` resolves that ID to the new interactive component.
- The project component manages a boolean active state from pointer and keyboard events and passes per-character CSS variables through inline styles.
- `ProjectReferenceContent` renders a generic preview card for the X reference based on new preview metadata, while preserving existing Threads oEmbed logic.

## Error Handling

- Spaces and repeated characters should remain stable in the staggered layout and not collapse the text geometry.
- Pointer cancellation and blur events should reliably clear the active state so the text does not get stuck.
- Reduced-motion mode should not rely on 3D transforms or delayed cascades that could feel uncomfortable.
- X references should use a preview card path only; no iframe embed should be attempted.

## Testing

- Add a failing component test for the staggered text project covering rendered characters and interactive active-state toggling.
- Update project data tests to assert that `staggered-text` replaces the placeholder project and carries X reference metadata.
- Update registry tests to assert that the `staggered-text` renderer is registered.
- Update reference content tests to assert that non-Threads preview metadata renders a generic preview card with the correct outbound label instead of an iframe.
