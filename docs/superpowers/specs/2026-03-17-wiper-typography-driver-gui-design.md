# Wiper Typography Driver GUI Design

## Goal

Add a dev-only `lil-gui` tuning panel to the Tesla driver-view mode so camera and windshield text placement can be adjusted live in the browser without editing code for each iteration.

## Scope

- Only the `3D Driver View` mode in the wiper typography project
- Only in development builds
- Live control over the values that currently make driver-view tuning slow:
  - camera `fov`
  - camera offset from the Tesla steering anchor
  - windshield target offset
  - windshield framing scales
  - glyph placement scales and bias
- No drag interaction, save/load presets, URL persistence, or production UI

## Approach

The driver-view math will stop depending on hardcoded inline constants alone. Instead, it will read from a shared tuning object with stable defaults. The rendering code will use those values every frame, and a dev-only hook will create a `lil-gui` panel that edits the same tuning state live.

This keeps the runtime path simple:

1. Default tuning values are defined once in a dedicated module.
2. The driver-view layout helper receives those tuning values and derives camera/look-at/glyph placement from the Tesla anchors.
3. In development, a client-side hook dynamically loads `lil-gui`, mounts a collapsed panel, and updates the tuning state as controls move.
4. In production, the hook no-ops and no GUI is shown.

## File Boundaries

- `src/projects/wiper-typography/wiperTeslaDriverTuning.ts`
  - tuning type
  - default values
  - slider bounds metadata used by the GUI
- `src/projects/wiper-typography/useTeslaDriverViewGui.ts`
  - dev-only `lil-gui` lifecycle
  - wiring between GUI controls and React state
- `src/projects/wiper-typography/wiperTeslaDriverLayout.ts`
  - consumes tuning values instead of fixed camera/text constants
- `src/projects/wiper-typography/WiperTypographyDriverView3D.tsx`
  - owns tuning state
  - passes tuning into the layout path
  - enables the dev-only GUI hook
- tests
  - GUI hook behavior
  - existing driver-view regression coverage updated for the new tuning path

## UX

The panel should appear automatically in development when the 3D driver view mounts. It should be collapsed by default so it does not dominate the page, but it must be ready immediately for tuning work. Group controls into folders so the panel remains readable:

- `Camera`
- `Windshield`
- `Glyphs`

## Performance

- `lil-gui` should be loaded with a dynamic import inside a dev-only effect
- production should not show or initialize the panel
- tuning updates should use React state so the active scene updates immediately and predictably

## Testing

- verify that the dev-only hook creates a GUI in development and tears it down on unmount
- verify that production mode does not create the GUI
- verify that changing a registered control updates the tuning state
- keep existing driver-view render tests green
