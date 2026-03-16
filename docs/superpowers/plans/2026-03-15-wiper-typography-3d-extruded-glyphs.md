# Wiper Typography 3D Extruded Glyphs Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the flat falling `Text` glyphs in all three `wiper typography` 3D modes with faithful, thin, real extruded letter meshes while preserving the shared simulation, bar dominance, and existing desktop view-drag interaction.

**Architecture:** Keep [`src/projects/wiper-typography/wiperSimulation.ts`](/Users/yongminkim/Development/Portfolio/mimesis/src/projects/wiper-typography/wiperSimulation.ts) unchanged as the source of motion. Add one shared glyph-geometry cache plus one shared extruded-glyph mesh component, then swap the three 3D scenes from flat text refs to cached extruded mesh refs that update position, rotation, and geometry imperatively inside `useFrame`.

**Tech Stack:** Next.js App Router, React 19 client components, TypeScript, React Three Fiber, Three.js `ExtrudeGeometry`, JSON font import from `three/examples/fonts`, Vitest, JSDOM, ESLint.

**Spec:** [`docs/superpowers/specs/2026-03-15-wiper-typography-3d-extruded-glyphs-design.md`](/Users/yongminkim/Development/Portfolio/mimesis/docs/superpowers/specs/2026-03-15-wiper-typography-3d-extruded-glyphs-design.md)

---

## File Structure

- Create: [`src/projects/wiper-typography/wiperGlyphGeometry.ts`](/Users/yongminkim/Development/Portfolio/mimesis/src/projects/wiper-typography/wiperGlyphGeometry.ts)  
  Parse the shared font once, generate one centered extruded geometry per supported glyph, and cache/reuse those geometries.
- Create: [`src/projects/wiper-typography/wiperGlyphGeometry.test.ts`](/Users/yongminkim/Development/Portfolio/mimesis/src/projects/wiper-typography/wiperGlyphGeometry.test.ts)  
  Unit tests for cache reuse, supported glyph coverage, and centered extrusion bounds.
- Create: [`src/projects/wiper-typography/WiperTypographyExtrudedGlyph3D.tsx`](/Users/yongminkim/Development/Portfolio/mimesis/src/projects/wiper-typography/WiperTypographyExtrudedGlyph3D.tsx)  
  Shared thin wrapper that renders one extruded glyph mesh with stable front and side materials.
- Create: [`src/projects/wiper-typography/WiperTypographyScene3DGlyphWiring.test.tsx`](/Users/yongminkim/Development/Portfolio/mimesis/src/projects/wiper-typography/WiperTypographyScene3DGlyphWiring.test.tsx)  
  Component-level wiring test that proves all three 3D scenes render the shared extruded glyph component.
- Modify: [`src/projects/wiper-typography/wiperConfig.ts`](/Users/yongminkim/Development/Portfolio/mimesis/src/projects/wiper-typography/wiperConfig.ts)  
  Add extrusion depth and subtle side-face material constants.
- Modify: [`src/projects/wiper-typography/useWiperSceneSimulation3D.ts`](/Users/yongminkim/Development/Portfolio/mimesis/src/projects/wiper-typography/useWiperSceneSimulation3D.ts)  
  Replace the flat-text-specific `glyphFontSize` output with a geometry-friendly `glyphScale` output.
- Modify: [`src/projects/wiper-typography/WiperTypographySceneBars3D.tsx`](/Users/yongminkim/Development/Portfolio/mimesis/src/projects/wiper-typography/WiperTypographySceneBars3D.tsx)  
  Swap flat `Text` glyphs for shared extruded glyph meshes while keeping the shallow bars-first staging.
- Modify: [`src/projects/wiper-typography/WiperTypographySceneGlyphField3D.tsx`](/Users/yongminkim/Development/Portfolio/mimesis/src/projects/wiper-typography/WiperTypographySceneGlyphField3D.tsx)  
  Swap flat `Text` glyphs for shared extruded glyph meshes while keeping layered depth bands.
- Modify: [`src/projects/wiper-typography/WiperTypographySceneStage3D.tsx`](/Users/yongminkim/Development/Portfolio/mimesis/src/projects/wiper-typography/WiperTypographySceneStage3D.tsx)  
  Swap flat `Text` glyphs for shared extruded glyph meshes while keeping the stage floor/backdrop composition.

## Chunk 1: Shared Extruded Glyph Geometry

### Task 1: Add cached extruded glyph geometry and constants

**Files:**
- Create: [`src/projects/wiper-typography/wiperGlyphGeometry.ts`](/Users/yongminkim/Development/Portfolio/mimesis/src/projects/wiper-typography/wiperGlyphGeometry.ts)
- Create: [`src/projects/wiper-typography/wiperGlyphGeometry.test.ts`](/Users/yongminkim/Development/Portfolio/mimesis/src/projects/wiper-typography/wiperGlyphGeometry.test.ts)
- Modify: [`src/projects/wiper-typography/wiperConfig.ts`](/Users/yongminkim/Development/Portfolio/mimesis/src/projects/wiper-typography/wiperConfig.ts)

- [ ] **Step 1: Write the failing test**

```ts
import { Box3, Vector3 } from "three";
import { describe, expect, it } from "vitest";
import {
  getWiperGlyphGeometry,
  getWiperSupportedGlyphs,
} from "./wiperGlyphGeometry";
import { WIPER_GLYPHS } from "./wiperConfig";

describe("wiperGlyphGeometry", () => {
  it("returns the same cached geometry instance for repeated glyph requests", () => {
    const first = getWiperGlyphGeometry("T");
    const second = getWiperGlyphGeometry("T");

    expect(second).toBe(first);
  });

  it("builds one geometry for every supported wiper glyph", () => {
    expect(getWiperSupportedGlyphs()).toEqual(WIPER_GLYPHS);
    expect(() => getWiperGlyphGeometry("X")).toThrow(/Unsupported wiper glyph/);
  });

  it("centers the extruded geometry around the local origin", () => {
    const bounds = new Box3().setFromBufferAttribute(
      getWiperGlyphGeometry("O").attributes.position
    );
    const center = new Vector3();
    bounds.getCenter(center);

    expect(Math.abs(center.x)).toBeLessThan(0.001);
    expect(Math.abs(center.y)).toBeLessThan(0.001);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- src/projects/wiper-typography/wiperGlyphGeometry.test.ts`  
Expected: `FAIL` because the glyph-geometry module and new constants do not exist yet.

- [ ] **Step 3: Write minimal implementation**

Create [`src/projects/wiper-typography/wiperGlyphGeometry.ts`](/Users/yongminkim/Development/Portfolio/mimesis/src/projects/wiper-typography/wiperGlyphGeometry.ts) with a single cache keyed by glyph character:

```ts
import helvetikerRegular from "three/examples/fonts/helvetiker_regular.typeface.json";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { ExtrudeGeometry, Vector3 } from "three";
import {
  WIPER_GLYPHS,
  WIPER_GLYPH_FONT_SIZE,
  WIPER_3D_GLYPH_EXTRUSION_DEPTH,
} from "./wiperConfig";

const font = new FontLoader().parse(helvetikerRegular);
const glyphGeometryCache = new Map<string, ExtrudeGeometry>();

export function getWiperSupportedGlyphs() {
  return WIPER_GLYPHS;
}

export function getWiperGlyphGeometry(glyph: string) {
  const cached = glyphGeometryCache.get(glyph);
  if (cached) {
    return cached;
  }

  if (!WIPER_GLYPHS.includes(glyph)) {
    throw new Error(`Unsupported wiper glyph: ${glyph}`);
  }

  const shapes = font.generateShapes(glyph, WIPER_GLYPH_FONT_SIZE);
  const geometry = new ExtrudeGeometry(shapes, {
    depth: WIPER_3D_GLYPH_EXTRUSION_DEPTH,
    bevelEnabled: false,
    curveSegments: 6,
  });

  geometry.computeBoundingBox();
  const center = geometry.boundingBox?.getCenter(new Vector3()) ?? new Vector3();
  geometry.translate(-center.x, -center.y, -center.z);

  glyphGeometryCache.set(glyph, geometry);
  return geometry;
}
```

Add the new constants to [`src/projects/wiper-typography/wiperConfig.ts`](/Users/yongminkim/Development/Portfolio/mimesis/src/projects/wiper-typography/wiperConfig.ts):

```ts
export const WIPER_3D_GLYPH_EXTRUSION_DEPTH = 10;
export const WIPER_3D_GLYPH_SIDE_COLOR = "#dde7ef";
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- src/projects/wiper-typography/wiperGlyphGeometry.test.ts`  
Expected: `PASS`

- [ ] **Step 5: Commit**

```bash
git add src/projects/wiper-typography/wiperConfig.ts \
  src/projects/wiper-typography/wiperGlyphGeometry.ts \
  src/projects/wiper-typography/wiperGlyphGeometry.test.ts
git commit -m "feat: add cached wiper glyph extrusion geometry"
```

## Chunk 2: Scene Integration

### Task 3: Replace flat `Text` glyphs in all three 3D scenes with the shared extruded glyph mesh

**Files:**
- Create: [`src/projects/wiper-typography/WiperTypographyScene3DGlyphWiring.test.tsx`](/Users/yongminkim/Development/Portfolio/mimesis/src/projects/wiper-typography/WiperTypographyScene3DGlyphWiring.test.tsx)
- Create: [`src/projects/wiper-typography/WiperTypographyExtrudedGlyph3D.tsx`](/Users/yongminkim/Development/Portfolio/mimesis/src/projects/wiper-typography/WiperTypographyExtrudedGlyph3D.tsx)
- Modify: [`src/projects/wiper-typography/useWiperSceneSimulation3D.ts`](/Users/yongminkim/Development/Portfolio/mimesis/src/projects/wiper-typography/useWiperSceneSimulation3D.ts)
- Modify: [`src/projects/wiper-typography/WiperTypographySceneBars3D.tsx`](/Users/yongminkim/Development/Portfolio/mimesis/src/projects/wiper-typography/WiperTypographySceneBars3D.tsx)
- Modify: [`src/projects/wiper-typography/WiperTypographySceneGlyphField3D.tsx`](/Users/yongminkim/Development/Portfolio/mimesis/src/projects/wiper-typography/WiperTypographySceneGlyphField3D.tsx)
- Modify: [`src/projects/wiper-typography/WiperTypographySceneStage3D.tsx`](/Users/yongminkim/Development/Portfolio/mimesis/src/projects/wiper-typography/WiperTypographySceneStage3D.tsx)

- [ ] **Step 1: Write the failing test**

Create [`src/projects/wiper-typography/WiperTypographyScene3DGlyphWiring.test.tsx`](/Users/yongminkim/Development/Portfolio/mimesis/src/projects/wiper-typography/WiperTypographyScene3DGlyphWiring.test.tsx) with scene-level mocks:

```tsx
// @vitest-environment jsdom

import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import WiperTypographySceneBars3D from "./WiperTypographySceneBars3D";
import WiperTypographySceneGlyphField3D from "./WiperTypographySceneGlyphField3D";
import WiperTypographySceneStage3D from "./WiperTypographySceneStage3D";

let container: HTMLDivElement;
let root: Root;

const { mockedExtrudedGlyph } = vi.hoisted(() => ({
  mockedExtrudedGlyph: vi.fn(() => <div data-testid="extruded-glyph" />),
}));

vi.mock("./WiperTypographyExtrudedGlyph3D", () => ({
  default: mockedExtrudedGlyph,
}));

vi.mock("./WiperTypographySceneFrame", () => ({
  default: ({ renderScene }: { renderScene: ({ phaseRef }: { phaseRef: { current: number } }) => React.ReactNode }) => (
    <div>{renderScene({ phaseRef: { current: 0 } })}</div>
  ),
}));

vi.mock("@react-three/fiber", () => ({
  useFrame: () => undefined,
  useThree: () => ({
    size: { width: 100, height: 100 },
    viewport: { width: 10, height: 10 },
  }),
}));

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
  root = createRoot(container);
});

afterEach(() => {
  act(() => {
    root.unmount();
  });
  container.remove();
});

it("renders the shared extruded glyph component in all three 3d modes", () => {
  act(() => {
    root.render(
      <>
        <WiperTypographySceneBars3D projectId="wiper-typography" />
        <WiperTypographySceneGlyphField3D projectId="wiper-typography" />
        <WiperTypographySceneStage3D projectId="wiper-typography" />
      </>
    );
  });

  expect(mockedExtrudedGlyph).toHaveBeenCalled();
});

it("passes geometry scale into the shared extruded glyph renderer", () => {
  act(() => {
    root.render(<WiperTypographySceneBars3D projectId="wiper-typography" />);
  });

  expect(mockedExtrudedGlyph).toHaveBeenCalledWith(
    expect.objectContaining({
      scale: expect.any(Number),
    }),
    expect.anything()
  );
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- src/projects/wiper-typography/WiperTypographyScene3DGlyphWiring.test.tsx`  
Expected: `FAIL` because the three scenes still import flat `Text` and do not yet render the shared extruded glyph component with a geometry `scale` prop.

- [ ] **Step 3: Write minimal implementation**

First, update [`src/projects/wiper-typography/useWiperSceneSimulation3D.ts`](/Users/yongminkim/Development/Portfolio/mimesis/src/projects/wiper-typography/useWiperSceneSimulation3D.ts) to return geometry-friendly scale instead of text size:

```ts
export interface WiperSceneSimulation3DModel {
  simulation: WiperSimulationState;
  scale: number;
  glyphScale: number;
  worldWidth: number;
  worldHeight: number;
  pixelWidth: number;
  pixelHeight: number;
  projectX: (value: number) => number;
  projectY: (value: number) => number;
}

return {
  simulation,
  scale,
  glyphScale: scale,
  worldWidth: pixelWidth * scale,
  worldHeight: pixelHeight * scale,
  // ...
};
```

Then create [`src/projects/wiper-typography/WiperTypographyExtrudedGlyph3D.tsx`](/Users/yongminkim/Development/Portfolio/mimesis/src/projects/wiper-typography/WiperTypographyExtrudedGlyph3D.tsx) as the shared mesh wrapper:

```tsx
"use client";

import { forwardRef } from "react";
import { MeshStandardMaterial } from "three";
import {
  WIPER_GLYPH_COLOR,
  WIPER_3D_GLYPH_SIDE_COLOR,
} from "./wiperConfig";
import { getWiperGlyphGeometry } from "./wiperGlyphGeometry";

const glyphMaterials = [
  new MeshStandardMaterial({ color: WIPER_GLYPH_COLOR, metalness: 0.02, roughness: 0.76 }),
  new MeshStandardMaterial({ color: WIPER_3D_GLYPH_SIDE_COLOR, metalness: 0.02, roughness: 0.82 }),
];

const WiperTypographyExtrudedGlyph3D = forwardRef(function WiperTypographyExtrudedGlyph3D(
  {
    glyph,
    scale,
    position,
    rotationZ,
  }: {
    glyph: string;
    scale: number;
    position: [number, number, number];
    rotationZ: number;
  },
  ref
) {
  return (
    <mesh
      castShadow
      receiveShadow
      geometry={getWiperGlyphGeometry(glyph)}
      material={glyphMaterials}
      position={position}
      ref={ref}
      rotation={[0, 0, rotationZ]}
      scale={[scale, scale, scale]}
    />
  );
});

export default WiperTypographyExtrudedGlyph3D;
```

For each scene:

1. Remove `Text` imports and `sync()`-based text mesh handling.
2. Change glyph refs from text objects to mesh refs:

```ts
type GlyphMesh = THREE.Mesh & {
  userData: { glyphText?: string };
};
```

3. Render the shared glyph component instead of flat text:

```tsx
<WiperTypographyExtrudedGlyph3D
  glyph={glyph.text}
  key={glyph.index}
  position={[projectX(glyph.x), projectY(glyph.y), depth]}
  ref={(node) => {
    glyphRefs.current[glyph.index] = node as GlyphMesh | null;
  }}
  rotationZ={-glyph.rotation * Math.PI}
  scale={glyphScale}
/>
```

4. During `useFrame`, keep the existing imperative transform updates, but swap geometry when the glyph character changes after a reset:

```ts
const nextGeometry = getWiperGlyphGeometry(glyph.text);
if (mesh.geometry !== nextGeometry) {
  mesh.geometry = nextGeometry;
  mesh.userData.glyphText = glyph.text;
}

mesh.position.set(projectX(glyph.x), projectY(glyph.y), depth);
mesh.rotation.set(0, 0, -glyph.rotation * Math.PI);
mesh.scale.set(glyphScale, glyphScale, glyphScale);
```

Keep the existing per-mode depth math unchanged:
- Bars: `z = -0.68`
- Glyph Field: layered `computeGlyphLayerDepth(...)*0.42 - 0.5`
- Stage: layered `computeGlyphLayerDepth(...)*0.16 - 0.9`

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- src/projects/wiper-typography/WiperTypographyScene3DGlyphWiring.test.tsx`  
Expected: `PASS`

- [ ] **Step 5: Run focused verification**

Run: `npm test -- src/projects/wiper-typography/wiperGlyphGeometry.test.ts src/projects/wiper-typography/WiperTypographyScene3DGlyphWiring.test.tsx`  
Expected: `PASS`

- [ ] **Step 6: Commit**

```bash
git add src/projects/wiper-typography/WiperTypographyExtrudedGlyph3D.tsx \
  src/projects/wiper-typography/useWiperSceneSimulation3D.ts \
  src/projects/wiper-typography/WiperTypographySceneBars3D.tsx \
  src/projects/wiper-typography/WiperTypographySceneGlyphField3D.tsx \
  src/projects/wiper-typography/WiperTypographySceneStage3D.tsx \
  src/projects/wiper-typography/WiperTypographyScene3DGlyphWiring.test.tsx
git commit -m "feat: render extruded glyphs in wiper 3d scenes"
```

## Chunk 3: Verification And Cleanup

### Task 5: Run full targeted verification and record manual checks

**Files:**
- Modify: [`src/projects/wiper-typography/WiperTypographySceneBars3D.tsx`](/Users/yongminkim/Development/Portfolio/mimesis/src/projects/wiper-typography/WiperTypographySceneBars3D.tsx)
- Modify: [`src/projects/wiper-typography/WiperTypographySceneGlyphField3D.tsx`](/Users/yongminkim/Development/Portfolio/mimesis/src/projects/wiper-typography/WiperTypographySceneGlyphField3D.tsx)
- Modify: [`src/projects/wiper-typography/WiperTypographySceneStage3D.tsx`](/Users/yongminkim/Development/Portfolio/mimesis/src/projects/wiper-typography/WiperTypographySceneStage3D.tsx)

- [ ] **Step 1: Run the wiper test suite**

Run: `npm test -- src/projects/wiper-typography`  
Expected: `PASS`

- [ ] **Step 2: Run focused lint**

Run: `npm run lint -- src/projects/wiper-typography`  
Expected: `PASS`

- [ ] **Step 3: Run the production build**

Run: `npm run build`  
Expected: `PASS` with only the existing workspace-root warning, if it still appears.

- [ ] **Step 4: Perform manual browser verification**

Open: `http://localhost:3000/project/wiper-typography`

Check all four modes:
- `2D Canvas` still matches the baseline behavior.
- `3D Wiper Bars` now shows real falling letter thickness, but bars remain dominant.
- `3D Glyph Field` makes the extruded letter side faces visible during view drag.
- `3D Stage` shows the same extruded letters within the stage composition.

Check interaction:
- Mouse move without drag still drives the wipe bars.
- Drag in 3D modes changes the view angle and makes glyph side faces readable.
- On release, the view angle stays where it was left.

- [ ] **Step 5: Commit final adjustments**

```bash
git add src/projects/wiper-typography
git commit -m "test: verify wiper extruded glyph rendering"
```
