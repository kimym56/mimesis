# Wiper Typography Tesla Silhouette Cockpit Design

## Goal
Replace the current generic cockpit treatment in `wiper typography` `3D Stage` with a high-quality Tesla-like driver cockpit silhouette that clearly reads as:
- seated driver POV
- floating center display
- panoramic windshield/roof architecture
- yoke or steering silhouette
- recognizable windshield wipers sweeping across the glass

The result should feel premium and unmistakably Tesla-inspired, while still preserving the `wiper typography` language of thick white letters falling toward the windshield.

## Relationship To Existing Specs
- Keep the approved two-mode project structure:
  - `2D Canvas`
  - `3D Stage`
- Keep the approved hover-vs-drag 3D interaction split and shared camera rig.
- Keep the approved thicker 3D glyph direction from the earlier cockpit-windshield work.
- This spec supersedes the visual composition in [`docs/superpowers/specs/2026-03-16-wiper-typography-cockpit-windshield-design.md`](/Users/yongminkim/Development/Portfolio/mimesis/docs/superpowers/specs/2026-03-16-wiper-typography-cockpit-windshield-design.md) because that version still reads as a generic car interior rather than a Tesla-quality cockpit.

## Verified Problem
- The current `3D Stage` scene uses boxy placeholder cabin geometry.
- It implies “car” but not “Tesla.”
- The dashboard, pillars, and windshield opening lack a strong silhouette.
- The display, steering/yoke presence, and roof framing are either missing or too weak.
- Because the scene relies on generic primitives without a clear cockpit hierarchy, the result feels cheap rather than premium.

## Approved Direction
- Rebuild the scene around a strong Tesla cockpit silhouette rather than incremental prop additions.
- Use a small set of unmistakable anchors:
  - long floating dash wing
  - center-mounted landscape display
  - cropped yoke/steering silhouette
  - panoramic windshield opening and roof header
  - integrated wiper cowl and more believable wiper mount area
- Let the silhouette and proportions carry the brand read, not a large number of decorative details.

## Approved Constraints
- Keep the existing shared glyph simulation and 3D interaction model.
- Do not turn this into a full automotive model or a highly detailed product render.
- Keep the typography and wipers as the active focal elements.
- The Tesla-like read should come from:
  - profile
  - layout
  - negative space
  - material contrast
  - display/yoke placement
- The scene must still feel like `wiper typography`, not a generic car configurator shot.

## Visual Hierarchy

### Foreground
- yoke or steering silhouette cropped low in frame
- wiper cowl at the base of the windshield
- integrated wiper mounts and arms

### Midground
- long, thin dash wing stretching nearly full width
- floating center display anchored off the dash
- windshield lower edge and glass plane
- thick falling letters close to the glass

### Upper Cabin
- clear A-pillars
- panoramic roof header
- generous windshield opening with a premium glass-heavy feel

### Background
- restrained blue exterior field beyond the windshield
- no extra scenery or literal road environment

## Rendering Architecture
- Keep [`src/projects/wiper-typography/WiperTypographySceneStage3D.tsx`](/Users/yongminkim/Development/Portfolio/mimesis/src/projects/wiper-typography/WiperTypographySceneStage3D.tsx) as the scene orchestrator only:
  - shared simulation stepping
  - glyph ref updates
  - stage-specific scale/depth
  - camera bias
- Move the Tesla-cockpit silhouette into a focused shell component, for example:
  - `WiperTypographyCockpitShell3D.tsx`
- Move the windshield wiper assembly into a focused component, for example:
  - `WiperTypographyCockpitWipers3D.tsx`
- Keep [`src/projects/wiper-typography/wiperConfig.ts`](/Users/yongminkim/Development/Portfolio/mimesis/src/projects/wiper-typography/wiperConfig.ts) as the source of cockpit proportions, colors, and glyph depth constants.

## Cockpit Shell Requirements

### Dashboard
- Replace the blocky dashboard with a thinner, wider dash wing.
- The dash should feel like one clean horizontal gesture across the cabin.
- It should not feel bulky or truck-like.

### Center Display
- Add a clearly visible floating landscape display.
- The display should be proportioned like a Tesla center screen:
  - wide
  - thin
  - slightly elevated above the dash wing
- It should glow subtly, not dominate the scene.

### Steering/Yoke
- Add a low foreground silhouette that reads as a Tesla-style steering yoke or minimal steering shape.
- This silhouette should be cropped so it anchors the viewer inside the car without distracting from the windshield action.

### Windshield / Roof Architecture
- Build a stronger windshield opening with defined A-pillars and a panoramic roof header.
- The opening should feel wider and more premium than the current generic frame.
- The upper framing should help the view read as a glass-heavy EV cabin.

## Wiper Requirements
- Keep the recognizable wiper assemblies, but integrate them into a more believable lower windshield base.
- Wipers should feel mounted to the cowl rather than floating in the scene.
- The sweep can remain stylized and phase-driven as long as the silhouette is convincing.

## Typography Requirements
- Keep the thicker glyph geometry already approved.
- Adjust glyph depth bands so the letters sit near the windshield and interact visually with the improved cockpit silhouette.
- The typography should remain readable and premium, not blocky or cartoonish.

## File Boundaries
- `src/projects/wiper-typography/WiperTypographySceneStage3D.tsx`
  - orchestrates the scene, glyph updates, and shell/wiper assembly order
- `src/projects/wiper-typography/WiperTypographyCockpitShell3D.tsx`
  - owns dash wing, center display, yoke silhouette, A-pillars, roof header, windshield plane
- `src/projects/wiper-typography/WiperTypographyCockpitWipers3D.tsx`
  - owns wiper geometry and mount structure
- `src/projects/wiper-typography/wiperConfig.ts`
  - owns cockpit proportions, colors, and stage glyph layout constants
- `src/projects/wiper-typography/WiperTypographyScene3DGlyphWiring.test.tsx`
  - verifies stage scene still renders the shared extruded glyphs
  - verifies the stage scene includes the key cockpit anchors via stable scene markers

## Testing And Verification
- Add one stage-level test that asserts the scene renders the Tesla silhouette anchors:
  - center display
  - yoke/steering silhouette
- Keep the existing stage-specific glyph scale assertion.
- Keep the thicker glyph geometry test.
- Manually verify in browser:
  - the scene clearly reads as a Tesla-like cockpit
  - the dash/display/yoke architecture is immediately legible
  - the wipers still read well against the windshield
  - the typography remains the hero despite the stronger cabin silhouette
