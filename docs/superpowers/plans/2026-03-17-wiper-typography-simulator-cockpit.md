# Wiper Typography Simulator Cockpit Interior Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refine the Tesla-like cockpit stage into a cleaner inside-only simulator view with a neutral gray exterior field and stronger real-shell test coverage.

**Architecture:** Keep the cockpit shell / wiper assembly / stage orchestration split. Update the shell and config toward the reference-inspired simulator palette, then strengthen tests by verifying the real shell exposes cockpit anchors instead of relying only on virtual mocks.

**Tech Stack:** Next.js App Router, React 19 client components, TypeScript, React Three Fiber, Three.js, Vitest, JSDOM, ESLint.

**Spec:** [`docs/superpowers/specs/2026-03-17-wiper-typography-simulator-cockpit-design.md`](/Users/yongminkim/Development/Portfolio/mimesis/docs/superpowers/specs/2026-03-17-wiper-typography-simulator-cockpit-design.md)

---

## File Structure

- Create: [`src/projects/wiper-typography/WiperTypographyCockpitShell3D.test.tsx`](/Users/yongminkim/Development/Portfolio/mimesis/src/projects/wiper-typography/WiperTypographyCockpitShell3D.test.tsx)  
  Verifies the real shell renders the center display, yoke, and simulator field anchors.
- Modify: [`src/projects/wiper-typography/WiperTypographyCockpitShell3D.tsx`](/Users/yongminkim/Development/Portfolio/mimesis/src/projects/wiper-typography/WiperTypographyCockpitShell3D.tsx)  
  Add stable cockpit markers and update materials toward a neutral simulator look.
- Modify: [`src/projects/wiper-typography/WiperTypographyCockpitWipers3D.tsx`](/Users/yongminkim/Development/Portfolio/mimesis/src/projects/wiper-typography/WiperTypographyCockpitWipers3D.tsx)  
  Keep the cowl and wipers visually integrated with the neutral cockpit shell.
- Modify: [`src/projects/wiper-typography/wiperConfig.ts`](/Users/yongminkim/Development/Portfolio/mimesis/src/projects/wiper-typography/wiperConfig.ts)  
  Replace blue-biased stage exterior values with neutral simulator values.
- Modify: [`src/projects/wiper-typography/WiperTypographyScene3DGlyphWiring.test.tsx`](/Users/yongminkim/Development/Portfolio/mimesis/src/projects/wiper-typography/WiperTypographyScene3DGlyphWiring.test.tsx)  
  Keep stage-level anchor coverage while relying less on virtual shell assumptions.

## Chunk 1: Real Shell Test First

### Task 1: Add a failing test for the real cockpit shell anchors

**Files:**
- Create: [`src/projects/wiper-typography/WiperTypographyCockpitShell3D.test.tsx`](/Users/yongminkim/Development/Portfolio/mimesis/src/projects/wiper-typography/WiperTypographyCockpitShell3D.test.tsx)

- [ ] **Step 1: Write the failing test**

Render the real shell component and assert:
- `[data-cockpit-role="center-display"]`
- `[data-cockpit-role="yoke"]`
- `[data-cockpit-role="simulator-field"]`

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- src/projects/wiper-typography/WiperTypographyCockpitShell3D.test.tsx`  
Expected: `FAIL` because the real shell does not yet expose those stable markers.

## Chunk 2: Neutral Simulator Shell

### Task 2: Implement the inside-only simulator shell

**Files:**
- Modify: [`src/projects/wiper-typography/WiperTypographyCockpitShell3D.tsx`](/Users/yongminkim/Development/Portfolio/mimesis/src/projects/wiper-typography/WiperTypographyCockpitShell3D.tsx)
- Modify: [`src/projects/wiper-typography/wiperConfig.ts`](/Users/yongminkim/Development/Portfolio/mimesis/src/projects/wiper-typography/wiperConfig.ts)

- [ ] **Step 1: Add stable cockpit markers**

Add `data-cockpit-role` attributes to the real shell for:
- center display
- yoke
- simulator field

- [ ] **Step 2: Shift the palette**

Change the shell and config so the environment beyond the windshield is neutral light gray rather than blue, and reduce glass/display blue bias to subtle cool accents only.

- [ ] **Step 3: Run the shell test**

Run: `npm test -- src/projects/wiper-typography/WiperTypographyCockpitShell3D.test.tsx`  
Expected: `PASS`

## Chunk 3: Stage Integration Check

### Task 3: Keep the stage-level wiring green with the refined shell

**Files:**
- Modify: [`src/projects/wiper-typography/WiperTypographyScene3DGlyphWiring.test.tsx`](/Users/yongminkim/Development/Portfolio/mimesis/src/projects/wiper-typography/WiperTypographyScene3DGlyphWiring.test.tsx)
- Modify: [`src/projects/wiper-typography/WiperTypographyCockpitWipers3D.tsx`](/Users/yongminkim/Development/Portfolio/mimesis/src/projects/wiper-typography/WiperTypographyCockpitWipers3D.tsx)

- [ ] **Step 1: Adjust stage-level tests only if needed**

Keep the stage anchor, shell, and glyph-scale checks aligned with the real shell/wiper split.

- [ ] **Step 2: Run focused verification**

Run: `npm test -- src/projects/wiper-typography/WiperTypographyScene3DGlyphWiring.test.tsx src/projects/wiper-typography/WiperTypographyCockpitShell3D.test.tsx src/projects/wiper-typography/wiperGlyphGeometry.test.ts`  
Expected: `PASS`

## Chunk 4: Full Verification

### Task 4: Verify the refined simulator cockpit stage

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
