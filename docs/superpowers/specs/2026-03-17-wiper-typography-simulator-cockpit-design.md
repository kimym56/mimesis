# Wiper Typography Simulator Cockpit Interior Design

## Goal
Refine `wiper typography` `3D Stage` so it matches the reference direction from:
- `kelvinkoko/autonomous-driving-playground`
- `playkuruma.web.app`

The scene must stay fully inside the car, showing only the driver-seat cockpit view through the windshield with active wipers and falling typography. It must not render the full Tesla vehicle or an exterior hero shot.

## Relationship To Existing Specs
- Keep the approved two-mode project structure:
  - `2D Canvas`
  - `3D Stage`
- Keep the approved Tesla-silhouette cockpit rebuild from [`docs/superpowers/specs/2026-03-16-wiper-typography-tesla-silhouette-design.md`](/Users/yongminkim/Development/Portfolio/mimesis/docs/superpowers/specs/2026-03-16-wiper-typography-tesla-silhouette-design.md).
- This spec supersedes the stage color/material direction:
  - move away from the current blue exterior field
  - move toward a neutral automotive simulator environment

## Verified Problem
- The current rebuild has the right interior anchors, but the scene still carries too much of the old blue `wiper typography` atmosphere.
- That makes it feel like a stylized artwork set inside a car rather than a convincing inside-the-cabin simulator view.
- The references are cleaner:
  - pale neutral outside
  - darker interior silhouette
  - subtle glass and screen light
  - no whole-car reveal

## Approved Direction
- Use a silhouette-first Tesla cockpit rebuild.
- Keep the camera fully inside the car.
- Use a neutral simulator gray outside the windshield.
- Let the cockpit geometry and wiper action carry the automotive read.
- Keep the typography thick and near the glass, but make it feel like it exists in the windshield view rather than in a theatrical blue environment.

## Approved Constraints
- No full-car render.
- No explicit exterior Tesla body visible through the windshield.
- No road scene, city scene, or decorative environment.
- Exterior beyond the glass should stay minimal and simulator-like:
  - pale gray
  - restrained
  - slightly technical, but not HUD-heavy
- Interior should remain premium and dark:
  - charcoal dash wing
  - low-gloss yoke
  - subtle center-display glow
  - restrained glass tint

## Reference Translation

### Borrow From References
- clean simulator exterior tone
- interior-only viewpoint
- Tesla-like cockpit proportions
- premium minimal materials
- calm windshield-centered framing

### Do Not Borrow
- whole vehicle shot
- third-person driving camera
- visible exterior body panels
- busy autonomous-driving overlays

## Visual Hierarchy

### Foreground
- yoke silhouette
- cowl
- wiper mounts and blades

### Midground
- dash wing
- center display
- windshield lower edge
- thick falling letters near the glass

### Upper Frame
- A-pillars
- panoramic roof header
- neutral glass reflections

### Beyond The Windshield
- pale simulator field only
- no whole-car read

## Materials And Color
- exterior simulator field: neutral light gray
- glass: slightly cool but mostly neutral
- dash/trim: dark charcoal
- display: dark surface with faint cool highlight
- typography: white, thick, premium
- wipers: dark and integrated into the cowl

## File Boundaries
- `src/projects/wiper-typography/WiperTypographyCockpitShell3D.tsx`
  - should own the simulator-field look, center display, yoke, pillars, roof header, and windshield plane
- `src/projects/wiper-typography/WiperTypographyCockpitWipers3D.tsx`
  - should keep the inside-only wiper base and mounts
- `src/projects/wiper-typography/WiperTypographySceneStage3D.tsx`
  - should keep orchestration only
- `src/projects/wiper-typography/wiperConfig.ts`
  - should own the neutral simulator palette and cockpit constants

## Testing And Verification
- Add a focused cockpit shell test or scene test that verifies the real shell exposes stable inside-cockpit anchors:
  - center display
  - yoke
  - simulator field
- Keep the stage glyph scale test.
- Keep the thicker glyph geometry test.
- Manually verify in browser:
  - the camera is clearly inside the car
  - the view does not reveal the whole Tesla
  - the exterior reads as a neutral simulator field
  - the cockpit silhouette remains strong and premium
