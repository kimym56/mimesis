# Wiper Typography Tesla Silhouette Cockpit Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the current generic 3D cockpit stage with a stronger Tesla-like silhouette built from a dash wing, center display, yoke/steering foreground, panoramic windshield architecture, and integrated wiper base.

**Architecture:** Keep the existing simulation, glyph geometry, and camera rig intact. Split the visual scene into a cockpit shell component and a wiper assembly component so the stage scene can focus on glyph motion and scene composition instead of carrying all of the cabin geometry inline.

**Tech Stack:** Next.js App Router, React 19 client components, TypeScript, React Three Fiber, Three.js, Vitest, JSDOM, ESLint.

**Spec:** [`docs/superpowers/specs/2026-03-16-wiper-typography-tesla-silhouette-design.md`](/Users/yongminkim/Development/Portfolio/mimesis/docs/superpowers/specs/2026-03-16-wiper-typography-tesla-silhouette-design.md)

---

## File Structure

- Create: [`src/projects/wiper-typography/WiperTypographyCockpitShell3D.tsx`](/Users/yongminkim/Development/Portfolio/mimesis/src/projects/wiper-typography/WiperTypographyCockpitShell3D.tsx)  
  Encapsulate the Tesla cockpit silhouette: dash wing, display, yoke, A-pillars, roof header, and windshield plane.
- Create: [`src/projects/wiper-typography/WiperTypographyCockpitWipers3D.tsx`](/Users/yongminkim/Development/Portfolio/mimesis/src/projects/wiper-typography/WiperTypographyCockpitWipers3D.tsx)  
  Encapsulate the mounted wiper assemblies and stable scene markers for testability.
- Modify: [`src/projects/wiper-typography/WiperTypographySceneStage3D.tsx`](/Users/yongminkim/Development/Portfolio/mimesis/src/projects/wiper-typography/WiperTypographySceneStage3D.tsx)  
  Reduce it to orchestration and use the new shell/wiper components.
- Modify: [`src/projects/wiper-typography/wiperConfig.ts`](/Users/yongminkim/Development/Portfolio/mimesis/src/projects/wiper-typography/wiperConfig.ts)  
  Add the cockpit silhouette proportions and colors needed by the new shell.
- Modify: [`src/projects/wiper-typography/WiperTypographyScene3DGlyphWiring.test.tsx`](/Users/yongminkim/Development/Portfolio/mimesis/src/projects/wiper-typography/WiperTypographyScene3DGlyphWiring.test.tsx)  
  Add a failing test for the center display and yoke anchors.

## Chunk 1: Lock The Tesla Anchors With A Failing Test

### Task 1: Require the stage scene to expose the cockpit anchors

**Files:**
- Modify: [`src/projects/wiper-typography/WiperTypographyScene3DGlyphWiring.test.tsx`](/Users/yongminkim/Development/Portfolio/mimesis/src/projects/wiper-typography/WiperTypographyScene3DGlyphWiring.test.tsx)

- [ ] **Step 1: Write the failing test**

Add a test that renders [`src/projects/wiper-typography/WiperTypographySceneStage3D.tsx`](/Users/yongminkim/Development/Portfolio/mimesis/src/projects/wiper-typography/WiperTypographySceneStage3D.tsx) and asserts the scene contains stable cockpit markers, for example:

```tsx
expect(container.querySelector('[data-cockpit-role="center-display"]')).not.toBeNull();
expect(container.querySelector('[data-cockpit-role="yoke"]')).not.toBeNull();
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- src/projects/wiper-typography/WiperTypographyScene3DGlyphWiring.test.tsx`  
Expected: `FAIL` because the current scene does not expose those Tesla silhouette anchors.

## Chunk 2: Rebuild The Cockpit Shell

### Task 2: Extract a dedicated Tesla cockpit shell component

**Files:**
- Create: [`src/projects/wiper-typography/WiperTypographyCockpitShell3D.tsx`](/Users/yongminkim/Development/Portfolio/mimesis/src/projects/wiper-typography/WiperTypographyCockpitShell3D.tsx)
- Modify: [`src/projects/wiper-typography/wiperConfig.ts`](/Users/yongminkim/Development/Portfolio/mimesis/src/projects/wiper-typography/wiperConfig.ts)
- Modify: [`src/projects/wiper-typography/WiperTypographySceneStage3D.tsx`](/Users/yongminkim/Development/Portfolio/mimesis/src/projects/wiper-typography/WiperTypographySceneStage3D.tsx)

- [ ] **Step 1: Write minimal shell implementation**

Create a shell component that renders:
- a long dash wing
- a floating center display with `data-cockpit-role="center-display"`
- a low yoke/steering silhouette with `data-cockpit-role="yoke"`
- stronger A-pillars
- panoramic roof header
- windshield glass plane

- [ ] **Step 2: Refactor the stage scene to use the shell**

Keep glyph positioning and stage-specific scale in [`src/projects/wiper-typography/WiperTypographySceneStage3D.tsx`](/Users/yongminkim/Development/Portfolio/mimesis/src/projects/wiper-typography/WiperTypographySceneStage3D.tsx), but remove the inline generic box-based cabin geometry and render the new shell instead.

- [ ] **Step 3: Run the focused test**

Run: `npm test -- src/projects/wiper-typography/WiperTypographyScene3DGlyphWiring.test.tsx`  
Expected: `PASS`

## Chunk 3: Extract The Wiper Base

### Task 3: Move the wiper assemblies into a dedicated component

**Files:**
- Create: [`src/projects/wiper-typography/WiperTypographyCockpitWipers3D.tsx`](/Users/yongminkim/Development/Portfolio/mimesis/src/projects/wiper-typography/WiperTypographyCockpitWipers3D.tsx)
- Modify: [`src/projects/wiper-typography/WiperTypographySceneStage3D.tsx`](/Users/yongminkim/Development/Portfolio/mimesis/src/projects/wiper-typography/WiperTypographySceneStage3D.tsx)

- [ ] **Step 1: Extract the wiper assembly**

Move the current wiper geometry and mount logic into a focused component that accepts the needed mount positions, lengths, and live phase-derived angles.

- [ ] **Step 2: Integrate it under the shell**

Place the wiper base so it sits naturally against the lower windshield/cowl area created by the new shell.

- [ ] **Step 3: Run focused verification**

Run: `npm test -- src/projects/wiper-typography/WiperTypographyScene3DGlyphWiring.test.tsx src/projects/wiper-typography/wiperGlyphGeometry.test.ts`  
Expected: `PASS`

## Chunk 4: Full Verification

### Task 4: Verify the Tesla silhouette rebuild

**Files:**
- All modified files above

- [ ] **Step 1: Run the full test suite**

Run: `npm test`  
Expected: `PASS`

- [ ] **Step 2: Run lint**

Run: `npm run lint`  
Expected: `PASS`

- [ ] **Step 3: Run production build**

Run: `npm run build`  
Expected: `PASS`
