# Wiper Typography Windshield-Aligned Glyphs Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the `3D Driver View` typography run along a windshield-aligned plane instead of reading as if it is passing through the glass.

**Architecture:** Derive a single flat projection plane from the actual windshield mesh orientation and extents at runtime, then feed that basis into the existing driver-view layout math. Keep the current simulation and tuning model, but align glyph position and mesh orientation to the derived plane so the existing glyph spin becomes in-plane rotation rather than world-upright drift.

**Tech Stack:** Next.js 16, React 19, TypeScript, React Three Fiber, Three.js, Vitest, ESLint

---

## Chunk 1: Plane Math

### Task 1: Add failing tests for windshield-aligned plane behavior

**Files:**
- Modify: `src/projects/wiper-typography/wiperTeslaDriverLayout.test.ts`
- Test: `src/projects/wiper-typography/wiperTeslaDriverLayout.test.ts`

- [ ] **Step 1: Write the failing tests**

Add focused tests for:
- deriving a plane basis from explicit windshield axes/extents
- keeping projected glyph points on that plane
- exposing a stable plane orientation quaternion or equivalent basis for glyph alignment

Example target assertions:

```ts
expect(projectedOffsetAlongNormal).toBeCloseTo(layout.glyphDepthOffset, 5);
expect(layout.glyphPlaneQuaternion).toBeDefined();
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- src/projects/wiper-typography/wiperTeslaDriverLayout.test.ts`
Expected: FAIL because the layout does not yet expose aligned-plane basis/orientation data.

- [ ] **Step 3: Write the minimal implementation**

In `src/projects/wiper-typography/wiperTeslaDriverLayout.ts`:
- extend the layout input/model to support an explicit windshield-aligned plane basis
- add pure helpers for normalized projection onto that plane
- expose the basis/orientation data needed by runtime glyph alignment

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- src/projects/wiper-typography/wiperTeslaDriverLayout.test.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/projects/wiper-typography/wiperTeslaDriverLayout.ts \
  src/projects/wiper-typography/wiperTeslaDriverLayout.test.ts
git commit -m "feat: add windshield aligned glyph plane math"
```

### Task 2: Derive a flat windshield-aligned plane from the Tesla mesh

**Files:**
- Modify: `src/projects/wiper-typography/WiperTypographyDriverView3D.tsx`
- Modify: `src/projects/wiper-typography/wiperTeslaDriverLayout.test.ts`

- [ ] **Step 1: Write the failing test**

Add coverage for the runtime-facing plane derivation helper by asserting it:
- picks the in-plane axes from the largest extents
- produces a normal that faces the driver interior
- leaves the camera framing decoupled from the glyph field crop

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- src/projects/wiper-typography/wiperTeslaDriverLayout.test.ts`
Expected: FAIL because runtime plane derivation is not implemented yet.

- [ ] **Step 3: Write the minimal implementation**

In `src/projects/wiper-typography/WiperTypographyDriverView3D.tsx`:
- read the windshield mesh local bounds and world quaternion
- derive the plane basis and center from the actual mesh
- pass that aligned plane data into `createTeslaDriverViewLayout`

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- src/projects/wiper-typography/wiperTeslaDriverLayout.test.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/projects/wiper-typography/WiperTypographyDriverView3D.tsx \
  src/projects/wiper-typography/wiperTeslaDriverLayout.test.ts
git commit -m "feat: derive aligned windshield plane from tesla mesh"
```

## Chunk 2: Glyph Orientation

### Task 3: Align glyph meshes to the windshield plane

**Files:**
- Modify: `src/projects/wiper-typography/WiperTypographyDriverView3D.tsx`
- Modify: `src/projects/wiper-typography/WiperTypographyExtrudedGlyph3D.tsx`
- Test: `src/projects/wiper-typography/WiperTypographyScene3DGlyphWiring.test.tsx`

- [ ] **Step 1: Write the failing test**

Extend `src/projects/wiper-typography/WiperTypographyScene3DGlyphWiring.test.tsx` so it proves the glyph component is used in a way compatible with plane alignment, either through updated props or runtime orientation handling expectations.

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- src/projects/wiper-typography/WiperTypographyScene3DGlyphWiring.test.tsx`
Expected: FAIL until the driver-view glyph path applies plane alignment.

- [ ] **Step 3: Write the minimal implementation**

In `src/projects/wiper-typography/WiperTypographyDriverView3D.tsx`:
- apply the aligned-plane orientation to each glyph mesh in `useFrame`
- preserve the existing simulation spin as in-plane rotation layered on top

Only touch `src/projects/wiper-typography/WiperTypographyExtrudedGlyph3D.tsx` if a small prop/API adjustment is required for the new alignment path.

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- src/projects/wiper-typography/WiperTypographyScene3DGlyphWiring.test.tsx`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/projects/wiper-typography/WiperTypographyDriverView3D.tsx \
  src/projects/wiper-typography/WiperTypographyExtrudedGlyph3D.tsx \
  src/projects/wiper-typography/WiperTypographyScene3DGlyphWiring.test.tsx
git commit -m "fix: align wiper glyph meshes to windshield plane"
```

### Task 4: Verify the full driver-view glyph fix

**Files:**
- Modify: `src/projects/wiper-typography/WiperTypographyDriverView3D.tsx`
- Modify: `src/projects/wiper-typography/wiperTeslaDriverLayout.ts`
- Modify: `src/projects/wiper-typography/wiperTeslaDriverLayout.test.ts`
- Modify: `src/projects/wiper-typography/WiperTypographyScene3DGlyphWiring.test.tsx`

- [ ] **Step 1: Run focused tests**

Run: `npm test -- src/projects/wiper-typography/wiperTeslaDriverLayout.test.ts src/projects/wiper-typography/WiperTypographyScene3DGlyphWiring.test.tsx`
Expected: PASS

- [ ] **Step 2: Run lint on the touched files**

Run: `npm run lint -- src/projects/wiper-typography/WiperTypographyDriverView3D.tsx src/projects/wiper-typography/wiperTeslaDriverLayout.ts src/projects/wiper-typography/wiperTeslaDriverLayout.test.ts src/projects/wiper-typography/WiperTypographyScene3DGlyphWiring.test.tsx`
Expected: PASS

- [ ] **Step 3: Run a build**

Run: `npm run build`
Expected: PASS

- [ ] **Step 4: Commit the integrated fix**

```bash
git add src/projects/wiper-typography/WiperTypographyDriverView3D.tsx \
  src/projects/wiper-typography/wiperTeslaDriverLayout.ts \
  src/projects/wiper-typography/wiperTeslaDriverLayout.test.ts \
  src/projects/wiper-typography/WiperTypographyScene3DGlyphWiring.test.tsx
git commit -m "fix: make wiper glyphs run along windshield"
```
