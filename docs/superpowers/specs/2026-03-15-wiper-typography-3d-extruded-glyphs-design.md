# Wiper Typography 3D Extruded Glyphs Design

## Goal
Replace the flat falling text in the three `wiper typography` 3D modes with real restrained extruded letter forms, while keeping the existing falling-glyph simulation, bar dominance, and shared 3D interaction model.

## Relationship To Existing Specs
- Keep the previously approved four-mode project structure:
  - `2D Canvas`
  - `3D Wiper Bars`
  - `3D Glyph Field`
  - `3D Stage`
- Keep the approved desktop hover-vs-drag interaction split from the view-drag spec.
- This spec only changes how the falling typography is rendered inside the three 3D modes.

## Verified Problem
- The current 3D scenes still render the falling letters as flat `Text` objects.
- That means the bars are volumetric but the typography itself is not, which breaks the intended 2D-to-3D conversion.
- The fix must make the dropping typography genuinely 3D without drifting away from the original `wiper typography` identity.

## Approved Constraints
- All three 3D modes must use real extruded 3D letters for the falling typography.
- The letters should stay visually faithful to the current white glyph look:
  - thin extrusion
  - restrained lighting
  - no heavy sculptural treatment
- Bars remain visually dominant and stay in front.
- Falling letters remain behind the bars.
- The shared falling simulation stays in place:
  - same glyph positions
  - same falling/reset behavior
  - same collisions
- Mode differences should still come from staging and depth composition, not from whether a mode gets “real” glyphs.

## Rendering Architecture
- Keep [`src/projects/wiper-typography/wiperSimulation.ts`](/Users/yongminkim/Development/Portfolio/mimesis/src/projects/wiper-typography/wiperSimulation.ts) as the source of glyph motion and bar behavior.
- Stop rendering falling glyphs as flat Drei `Text` meshes in the 3D scenes.
- Introduce one shared extruded-glyph renderer module that:
  - accepts the glyph character
  - positions it from simulation x/y/z
  - rotates it from the existing falling spin
  - applies restrained extrusion depth and white material
- Reuse that same renderer in:
  - `3D Wiper Bars`
  - `3D Glyph Field`
  - `3D Stage`

## Letter Form
- Front face should remain bright white and visually close to the current 2D glyphs.
- Side walls should be slightly darker or cooler so the depth is visible only when angle and light reveal it.
- Extrusion should stay thin.
- Avoid strong bevels or decorative edge treatment.
- The result should read as “the existing white glyphs now have thickness,” not “a new 3D type object.”

## Mode Behavior

### Shared Across All 3D Modes
- Same extruded letter system.
- Same shared glyph simulation.
- Same bar-over-letter layering rule.
- Same drag-based camera reveal behavior from the view-drag spec.

### Mode-Specific Staging
- `3D Wiper Bars`
  - use the shallowest glyph depth presence
  - letters mainly support the bars rather than dominate the frame
- `3D Glyph Field`
  - spread the same extruded letters more clearly through depth bands
  - this should become the strongest demonstration of the 3D typography
- `3D Stage`
  - place the same extruded letters into the stage composition
  - lighting and drag angle should make side faces visible without overpowering the bars

## File Boundaries
- `src/projects/wiper-typography/wiperSimulation.ts`
  - unchanged simulation source for glyph motion
- `src/projects/wiper-typography/wiperConfig.ts`
  - may hold extrusion depth/material constants for the 3D letters
- `src/projects/wiper-typography/wiperGlyphGeometry.ts` or equivalent focused module
  - owns cached extruded geometry per supported glyph
- `src/projects/wiper-typography/WiperTypographyExtrudedGlyph3D.tsx` or equivalent shared component
  - renders one falling extruded letter mesh from shared glyph state
- `src/projects/wiper-typography/WiperTypographySceneBars3D.tsx`
  - swaps flat text meshes for shared extruded glyph meshes
- `src/projects/wiper-typography/WiperTypographySceneGlyphField3D.tsx`
  - swaps flat text meshes for shared extruded glyph meshes
- `src/projects/wiper-typography/WiperTypographySceneStage3D.tsx`
  - swaps flat text meshes for shared extruded glyph meshes

## Performance Strategy
- Cache geometry by glyph character because the alphabet is only:
  - `T`
  - `Y`
  - `P`
  - `O`
  - `G`
  - `R`
  - `H`
- Do not regenerate geometry per falling glyph instance.
- Reuse shared materials where practical.
- Keep extrusion depth low and avoid unnecessary bevel complexity.

## Risks
- Real text extrusion can be heavier than the current flat text path.
- Font geometry may look too generic or too polished if the chosen extrusion settings are wrong.
- If lighting is too strong, the piece may stop reading like `wiper typography` and become a generic 3D text demo.
- If geometry caching is not handled well, performance may regress across the three scenes.

## Mitigations
- Cache one geometry per supported glyph.
- Keep side faces subtle and front faces dominant.
- Use the current bars and simulation as anchors so the piece still reads like the original work.
- Verify all three modes share the same extruded-letter system instead of diverging.

## Testing And Verification
- Add automated coverage for geometry caching/config where feasible.
- Keep existing simulation and interaction tests unchanged unless rendering integration requires updates.
- Manually verify in browser:
  - falling letters read as genuinely 3D in all three modes
  - bars still remain in front
  - the result still reads like `wiper typography`
  - `3D Glyph Field` and `3D Stage` reveal the extrusion more clearly, but `3D Wiper Bars` still uses the same real letters
