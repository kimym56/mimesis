# Staggered Text Timing GUI Design

## Goal

Add a development-only `lil-gui` panel to the staggered-text project so the motion timing values can be tuned live without editing source constants.

## Current Context

- `src/projects/staggered-text/StaggeredTextProject.tsx` currently hardcodes the staggered-text timing values for both the WAAPI path and the CSS fallback path.
- `src/projects/wiper-typography/useTeslaDriverViewGui.ts` already establishes the local pattern for a development-only, dynamically imported `lil-gui` hook.
- The user wants real-time control while developing, but does not want the debug panel in production.

## Approved Behavior

- The staggered-text project exposes live controls for:
  - outgoing stagger step
  - incoming stagger step
  - handoff delay
  - outgoing duration
  - incoming duration
- The panel is only created when `process.env.NODE_ENV !== "production"`.
- The panel stays local to the staggered-text project and is closed by default.
- The same tuning state drives both:
  - WAAPI timing in `StaggeredTextProject.tsx`
  - CSS custom properties used by the CSS fallback path

## Approach

- Extract the timing defaults and GUI control ranges into a dedicated `staggeredTextTuning.ts` module.
- Add a `useStaggeredTextGui.ts` hook that mirrors the wiper typography pattern:
  - dynamic `lil-gui` import
  - dev-only instantiation
  - `startTransition` state updates
- Replace the fixed timing constants in `StaggeredTextProject.tsx` with local tuning state initialized from the shared defaults.
- Pass the timing values into inline CSS variables so the CSS transitions and delays stay synchronized with the WAAPI configuration.

## Error Handling

- Production builds must not instantiate or ship the debug GUI behavior.
- The live timing edits must not break reduced-motion behavior.
- CSS and WAAPI timing sources must remain synchronized to avoid mismatched motion depending on browser capabilities.

## Testing

- Add a tuning-metadata test to lock the default values and GUI ranges.
- Add a hook test to verify the `lil-gui` panel:
  - appears in development
  - does not appear in production
  - updates the live tuning state on control changes
- Update the staggered-text component test to assert the timing CSS variables and the WAAPI timing options come from the shared tuning defaults.
