# Wiper Typography Driver View GUI Range Design

## Goal

Expand every `lil-gui` control in the 3D driver view so exploratory tuning can reach turnaround and extreme inspection angles without changing the approved default preset.

## Design

- Keep the existing `Camera`, `Windshield`, and `Glyphs` folders and control list unchanged.
- Widen the min/max range for every control in `TESLA_DRIVER_VIEW_GUI_FOLDERS`.
- Widen `TESLA_DRIVER_VIEW_FOV_RANGE` so the `FOV` slider and runtime clamp stay aligned.
- Keep all default values and slider step sizes unchanged.

## Constraints

- This is a tuning-only change. It must not alter the default driver-view framing unless the user moves a slider.
- The widened ranges should cover aggressive exploration, including moving the camera and look target far enough to inspect turnaround views.
- Tests should verify the broader ranges exist so future tightening is intentional.
