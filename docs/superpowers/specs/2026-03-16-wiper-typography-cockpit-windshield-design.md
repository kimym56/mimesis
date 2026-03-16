# Wiper Typography Cockpit Windshield Design

## Goal
Transform the remaining `wiper typography` `3D Stage` mode so it no longer reads like a theater set and instead feels like watching thick typography fall onto the windshield from inside a modern Tesla-like cabin, with recognizable windshield wipers sweeping across the glass.

## Relationship To Existing Specs
- Keep the approved two-mode `wiper typography` structure:
  - `2D Canvas`
  - `3D Stage`
- Keep the approved desktop hover-vs-drag interaction split from the 3D view-drag work.
- Keep the shared simulation source for glyph motion and wipe phase.
- This spec changes the visual staging, scene props, and 3D glyph mass of the remaining `3D Stage` mode.

## Verified Problem
- The current `3D Stage` scene reads as a literal stage because it uses a floor plane and back wall.
- The moving bars still look like abstract boxes rather than windshield wipers.
- The extruded typography is still too thin to feel like heavy letters landing on glass.
- The result is spatial, but not specifically “inside a modern car looking through the windshield.”

## Approved Direction
- The scene should clearly read as a Tesla-like interior view.
- The moving bars should become recognizable windshield wipers.
- The falling typography should become physically thicker and feel closer to the windshield.
- The scene should stay premium, restrained, and graphic rather than becoming a literal car model.

## Approved Constraints
- Keep the current simulation and interaction model:
  - same falling glyph logic
  - same wipe phase input
  - same drag-driven camera view behavior
- Do not rewrite the motion system into hinge-accurate mechanical wipers.
- Achieve the car read through staging, mesh design, depth placement, materials, and framing.
- Keep the palette restrained:
  - dark interior
  - cool blue exterior light
  - subtle glass reflections
- Keep the `wiper typography` identity intact:
  - black sweep language
  - blue atmospheric field
  - white falling glyphs

## Visual Target

### Cabin Read
- The camera should feel seated slightly behind a low dashboard, looking outward through a windshield.
- Use a dark dashboard slab and restrained left/right frame hints to imply a modern EV cabin.
- Avoid decorative details like buttons, vents, or steering wheel props that would distract from the typography.
- The Tesla-like read should come from clean geometry, wide windshield framing, and minimal luxury surfaces.

### Windshield Read
- Add a subtle windshield glass layer between camera and exterior field.
- The glass should catch light softly through low-opacity reflections or tint rather than obvious transparency tricks.
- The windshield plane should feel broad and slightly premium, not like a flat stage wall.

### Wiper Read
- Replace the current box bars with recognizable wiper assemblies:
  - slim arm
  - longer blade
  - low mounting position
- Keep their sweep motion driven by the existing phase system so the scene remains faithful to the current behavior.
- The motion can stay stylized as long as the silhouette clearly reads as windshield wipers.

### Typography Read
- Increase 3D glyph thickness enough that the letters feel materially present.
- Push the falling glyph depth toward the windshield region so they read as landing on or just in front of the glass.
- Preserve the white front-face look, but use slightly cooler side faces so depth is visible when the camera angle shifts.

## Rendering Architecture
- Keep [`src/projects/wiper-typography/wiperSimulation.ts`](/Users/yongminkim/Development/Portfolio/mimesis/src/projects/wiper-typography/wiperSimulation.ts) as the source of glyph positions and wipe bar state.
- Reinterpret the `bar` simulation objects as wiper meshes inside [`src/projects/wiper-typography/WiperTypographySceneStage3D.tsx`](/Users/yongminkim/Development/Portfolio/mimesis/src/projects/wiper-typography/WiperTypographySceneStage3D.tsx).
- Keep the shared camera rig in [`src/projects/wiper-typography/WiperTypographySceneFrame.tsx`](/Users/yongminkim/Development/Portfolio/mimesis/src/projects/wiper-typography/WiperTypographySceneFrame.tsx), but bias the stage scene so it feels seated inside the cabin.
- Keep shared extruded glyph geometry in [`src/projects/wiper-typography/wiperGlyphGeometry.ts`](/Users/yongminkim/Development/Portfolio/mimesis/src/projects/wiper-typography/wiperGlyphGeometry.ts), while increasing extrusion depth and allowing the stage scene to scale glyphs more aggressively than the generic 3D baseline.

## Scene Composition

### Foreground
- low dashboard slab
- subtle windshield lower edge
- wiper mounts and wiper arms/blades sweeping across the foreground

### Midground
- windshield glass plane
- the thick falling glyph field, clustered in shallow bands near the glass

### Background
- cool blue atmospheric field beyond the windshield
- minimal cabin side framing to keep the image anchored as an interior view

## File Boundaries
- `src/projects/wiper-typography/WiperTypographySceneStage3D.tsx`
  - replace stage-floor composition with dashboard/windshield/cabin framing
  - replace box bars with wiper-shaped meshes
  - tighten glyph depth placement near the windshield
  - slightly increase stage glyph scale
- `src/projects/wiper-typography/wiperConfig.ts`
  - add constants for:
    - thicker glyph extrusion depth
    - stage glyph scale multiplier
    - cabin colors
    - windshield and dashboard layout measurements
- `src/projects/wiper-typography/wiperGlyphGeometry.ts`
  - continue owning cached glyph extrusion geometry
  - use updated extrusion thickness from config
- `src/projects/wiper-typography/wiperGlyphGeometry.test.ts`
  - verify thicker geometry depth
- `src/projects/wiper-typography/WiperTypographyScene3DGlyphWiring.test.tsx`
  - keep proving the stage scene renders shared extruded glyphs
  - verify the stage scene passes the thicker stage-specific scale

## Risks
- Over-literal cockpit props could make the piece look gimmicky or too much like a car render.
- If the wiper silhouettes are too chunky, they may overpower the typography.
- If glyph depth increases too much, the letters may stop feeling elegant and become heavy blocks.
- If the cabin framing is too faint, the scene may still read as a generic 3D composition.

## Mitigations
- Use only the minimum cabin geometry needed for recognition.
- Keep wiper arms slim and blades cleanly proportioned.
- Increase glyph thickness enough to read physically, but avoid bevels and decorative sculpting.
- Let the camera framing, dashboard horizon, and windshield glass do most of the “car” signaling.

## Testing And Verification
- Add or update automated coverage for:
  - thicker glyph geometry depth
  - stage-scene glyph scale passed to the shared extruded glyph component
- Keep simulation and interaction tests unchanged unless scene wiring requires targeted updates.
- Manually verify in browser:
  - the scene reads as a Tesla-like cabin view rather than a stage
  - the sweep reads as windshield wipers
  - the typography feels thicker and closer to the windshield
  - the overall result still reads as `wiper typography`, not a generic car demo
