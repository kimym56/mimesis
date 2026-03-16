# Wiper Typography Cockpit Windshield Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rework the remaining `wiper typography` `3D Stage` mode so it reads as a Tesla-like windshield interior with recognizable wipers and materially thicker falling typography.

**Architecture:** Keep the existing simulation, interaction, and shared 3D camera model intact. Concentrate the change in the stage scene by replacing the stage set with dashboard/windshield framing, re-skinning the bar meshes as wiper assemblies, and increasing the glyph extrusion depth plus stage-specific glyph scale so the letters feel heavier and closer to the glass.

**Tech Stack:** Next.js App Router, React 19 client components, TypeScript, React Three Fiber, Three.js, Vitest, JSDOM, ESLint.

**Spec:** [`docs/superpowers/specs/2026-03-16-wiper-typography-cockpit-windshield-design.md`](/Users/yongminkim/Development/Portfolio/mimesis/docs/superpowers/specs/2026-03-16-wiper-typography-cockpit-windshield-design.md)

---

## File Structure

- Modify: [`src/projects/wiper-typography/wiperConfig.ts`](/Users/yongminkim/Development/Portfolio/mimesis/src/projects/wiper-typography/wiperConfig.ts)  
  Add cockpit-stage constants for glyph thickness, stage glyph scale, and cabin colors/layout.
- Modify: [`src/projects/wiper-typography/wiperGlyphGeometry.ts`](/Users/yongminkim/Development/Portfolio/mimesis/src/projects/wiper-typography/wiperGlyphGeometry.ts)  
  Use the updated glyph extrusion depth constant.
- Modify: [`src/projects/wiper-typography/wiperGlyphGeometry.test.ts`](/Users/yongminkim/Development/Portfolio/mimesis/src/projects/wiper-typography/wiperGlyphGeometry.test.ts)  
  Add an assertion for the new thicker depth.
- Modify: [`src/projects/wiper-typography/WiperTypographySceneStage3D.tsx`](/Users/yongminkim/Development/Portfolio/mimesis/src/projects/wiper-typography/WiperTypographySceneStage3D.tsx)  
  Replace the current stage-floor composition with cockpit-style geometry, wiper meshes, and tighter windshield-oriented glyph depth placement.
- Modify: [`src/projects/wiper-typography/WiperTypographyScene3DGlyphWiring.test.tsx`](/Users/yongminkim/Development/Portfolio/mimesis/src/projects/wiper-typography/WiperTypographyScene3DGlyphWiring.test.tsx)  
  Verify the stage scene still renders the shared extruded glyph component and now passes a stage-specific thicker scale.

## Chunk 1: Geometry And Config

### Task 1: Increase glyph thickness through config and geometry tests

**Files:**
- Modify: [`src/projects/wiper-typography/wiperConfig.ts`](/Users/yongminkim/Development/Portfolio/mimesis/src/projects/wiper-typography/wiperConfig.ts)
- Modify: [`src/projects/wiper-typography/wiperGlyphGeometry.test.ts`](/Users/yongminkim/Development/Portfolio/mimesis/src/projects/wiper-typography/wiperGlyphGeometry.test.ts)
- Modify: [`src/projects/wiper-typography/wiperGlyphGeometry.ts`](/Users/yongminkim/Development/Portfolio/mimesis/src/projects/wiper-typography/wiperGlyphGeometry.ts)

- [ ] **Step 1: Write the failing test**

```ts
it("extrudes supported glyphs with the approved thicker depth", () => {
  const bounds = new Box3().setFromBufferAttribute(
    getWiperGlyphGeometry("T").attributes.position
  );

  expect(bounds.max.z - bounds.min.z).toBeCloseTo(WIPER_3D_GLYPH_EXTRUSION_DEPTH, 1);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- src/projects/wiper-typography/wiperGlyphGeometry.test.ts`  
Expected: `FAIL` because the configured extrusion depth is still too thin or not yet asserted.

- [ ] **Step 3: Write minimal implementation**

Increase the extrusion constant in [`src/projects/wiper-typography/wiperConfig.ts`](/Users/yongminkim/Development/Portfolio/mimesis/src/projects/wiper-typography/wiperConfig.ts), keep [`src/projects/wiper-typography/wiperGlyphGeometry.ts`](/Users/yongminkim/Development/Portfolio/mimesis/src/projects/wiper-typography/wiperGlyphGeometry.ts) reading from that constant, and avoid adding bevel complexity.

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- src/projects/wiper-typography/wiperGlyphGeometry.test.ts`  
Expected: `PASS`

## Chunk 2: Stage Wiring

### Task 2: Drive the stage-specific glyph scale change with a failing component test

**Files:**
- Modify: [`src/projects/wiper-typography/WiperTypographyScene3DGlyphWiring.test.tsx`](/Users/yongminkim/Development/Portfolio/mimesis/src/projects/wiper-typography/WiperTypographyScene3DGlyphWiring.test.tsx)
- Modify: [`src/projects/wiper-typography/WiperTypographySceneStage3D.tsx`](/Users/yongminkim/Development/Portfolio/mimesis/src/projects/wiper-typography/WiperTypographySceneStage3D.tsx)
- Modify: [`src/projects/wiper-typography/wiperConfig.ts`](/Users/yongminkim/Development/Portfolio/mimesis/src/projects/wiper-typography/wiperConfig.ts)

- [ ] **Step 1: Write the failing test**

Add a new assertion to [`src/projects/wiper-typography/WiperTypographyScene3DGlyphWiring.test.tsx`](/Users/yongminkim/Development/Portfolio/mimesis/src/projects/wiper-typography/WiperTypographyScene3DGlyphWiring.test.tsx):

```tsx
it("applies the stage-specific glyph scale multiplier", () => {
  act(() => {
    root.render(<WiperTypographySceneStage3D projectId="wiper-typography" />);
  });

  const firstCall = mockedExtrudedGlyph.mock.calls[0]?.[0] as { scale?: number } | undefined;
  expect(firstCall?.scale).toBeCloseTo(0.33 * WIPER_STAGE_GLYPH_SCALE_MULTIPLIER);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- src/projects/wiper-typography/WiperTypographyScene3DGlyphWiring.test.tsx`  
Expected: `FAIL` because the stage scene still passes the unmodified shared scale.

- [ ] **Step 3: Write minimal implementation**

Add `WIPER_STAGE_GLYPH_SCALE_MULTIPLIER` in [`src/projects/wiper-typography/wiperConfig.ts`](/Users/yongminkim/Development/Portfolio/mimesis/src/projects/wiper-typography/wiperConfig.ts) and multiply the stage scene’s glyph scale by that constant before rendering/updating the extruded glyph meshes.

- [ ] **Step 4: Run focused verification**

Run: `npm test -- src/projects/wiper-typography/WiperTypographyScene3DGlyphWiring.test.tsx src/projects/wiper-typography/wiperGlyphGeometry.test.ts`  
Expected: `PASS`

## Chunk 3: Cockpit Scene Composition

### Task 3: Rebuild the stage scene as a windshield interior without changing the simulation model

**Files:**
- Modify: [`src/projects/wiper-typography/WiperTypographySceneStage3D.tsx`](/Users/yongminkim/Development/Portfolio/mimesis/src/projects/wiper-typography/WiperTypographySceneStage3D.tsx)
- Modify: [`src/projects/wiper-typography/wiperConfig.ts`](/Users/yongminkim/Development/Portfolio/mimesis/src/projects/wiper-typography/wiperConfig.ts)

- [ ] **Step 1: Implement the new composition**

Inside [`src/projects/wiper-typography/WiperTypographySceneStage3D.tsx`](/Users/yongminkim/Development/Portfolio/mimesis/src/projects/wiper-typography/WiperTypographySceneStage3D.tsx):
- remove the stage floor and back-wall planes
- add a low dashboard slab, subtle left/right cabin framing, and a windshield glass layer
- reinterpret each simulated bar as a mounted wiper assembly using grouped meshes instead of a single box
- tighten glyph depth bands so they sit near the windshield
- keep using the existing bar position and rotation data to drive the wiper sweep

- [ ] **Step 2: Add only the needed config**

In [`src/projects/wiper-typography/wiperConfig.ts`](/Users/yongminkim/Development/Portfolio/mimesis/src/projects/wiper-typography/wiperConfig.ts), add only the stage-specific constants required by the new cockpit scene:
- cabin colors
- windshield tint or highlight values
- dashboard placement dimensions
- wiper arm/blade proportions

- [ ] **Step 3: Run focused tests**

Run: `npm test -- src/projects/wiper-typography/WiperTypographyScene3DGlyphWiring.test.tsx src/projects/wiper-typography/wiperGlyphGeometry.test.ts`  
Expected: `PASS`

## Chunk 4: Full Verification

### Task 4: Verify the repository after the cockpit-stage refactor

**Files:**
- No new files beyond the ones above

- [ ] **Step 1: Run the full test suite**

Run: `npm test`  
Expected: `PASS`

- [ ] **Step 2: Run lint**

Run: `npm run lint`  
Expected: `PASS`

- [ ] **Step 3: Commit**

```bash
git add docs/superpowers/specs/2026-03-16-wiper-typography-cockpit-windshield-design.md \
  docs/superpowers/plans/2026-03-16-wiper-typography-cockpit-windshield.md \
  src/projects/wiper-typography/wiperConfig.ts \
  src/projects/wiper-typography/wiperGlyphGeometry.ts \
  src/projects/wiper-typography/wiperGlyphGeometry.test.ts \
  src/projects/wiper-typography/WiperTypographySceneStage3D.tsx \
  src/projects/wiper-typography/WiperTypographyScene3DGlyphWiring.test.tsx
git commit -m "feat: turn wiper stage into cockpit windshield scene"
```
