# Wiper Typography Tesla Driver View Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a `3D Driver View` mode to the wiper typography project using the Tesla Model 3 Sketchfab asset while preserving the current `2D Canvas` mode as the default renderer.

**Architecture:** Reintroduce a small mode-toggle shell in `WiperTypographyProject.tsx`, keep the current 2D canvas unchanged, and add a new autoplay-only React Three Fiber driver-view renderer that loads a local optimized Tesla asset. Reuse the existing wiper simulation/math helpers where practical, but replace pointer-driven 3D behavior with a time-based loop and provide a graceful fallback when the asset cannot load.

**Tech Stack:** Next.js 16, React 19, TypeScript, CSS Modules, React Three Fiber, Drei, Vitest

---

## Chunk 1: Shell And Toggle

### Task 1: Restore the mode-toggle shell with tests first

**Files:**
- Create: `src/projects/wiper-typography/WiperTypographyModeToggle.tsx`
- Modify: `src/projects/wiper-typography/WiperTypographyProject.tsx`
- Modify: `src/projects/wiper-typography/WiperTypographyProject.module.css`
- Test: `src/projects/wiper-typography/WiperTypographyProject.test.tsx`

- [ ] **Step 1: Write the failing test for the two-mode shell**

```tsx
it("renders 2d canvas by default and switches to 3d driver view", () => {
  root.render(<WiperTypographyProject projectId="wiper-typography" />);

  expect(container.textContent).toContain("mock-2d-canvas");
  expect(container.textContent).toContain("2D Canvas");
  expect(container.textContent).toContain("3D Driver View");

  const button = container.querySelector('[data-mode="3d-driver"]');
  button?.dispatchEvent(new MouseEvent("click", { bubbles: true }));

  expect(container.textContent).toContain("mock-3d-driver-view");
});
```

- [ ] **Step 2: Run the project test to verify it fails**

Run: `npx vitest run src/projects/wiper-typography/WiperTypographyProject.test.tsx`

Expected: `FAIL` because the current project renders only `WiperTypographyCanvas2D` and has no `3D Driver View` toggle or renderer.

- [ ] **Step 3: Write the minimal shell implementation**

```tsx
const MODE_COMPONENTS = {
  "2d": WiperTypographyCanvas2D,
  "3d-driver": WiperTypographyDriverView3D,
} satisfies Record<WiperRenderMode, ComponentType<InteractiveProjectProps>>;

const [mode, setMode] = useState<WiperRenderMode>("2d");
const ActiveMode = MODE_COMPONENTS[mode];

return (
  <div className={styles.interactivePane}>
    <WiperTypographyModeToggle activeMode={mode} onChange={setMode} />
    <ActiveMode projectId={projectId} />
  </div>
);
```

- [ ] **Step 4: Add the toggle styles and focused toggle component**

```tsx
export type WiperRenderMode = "2d" | "3d-driver";

const MODE_OPTIONS = [
  { id: "2d", label: "2D Canvas" },
  { id: "3d-driver", label: "3D Driver View" },
];
```

- [ ] **Step 5: Run the test again to verify it passes**

Run: `npx vitest run src/projects/wiper-typography/WiperTypographyProject.test.tsx`

Expected: `PASS`

- [ ] **Step 6: Commit the shell checkpoint**

```bash
git add src/projects/wiper-typography/WiperTypographyModeToggle.tsx \
  src/projects/wiper-typography/WiperTypographyProject.tsx \
  src/projects/wiper-typography/WiperTypographyProject.module.css \
  src/projects/wiper-typography/WiperTypographyProject.test.tsx
git commit -m "feat: restore wiper mode toggle shell"
```

## Chunk 2: Autoplay Driver-View State

### Task 2: Add a dedicated autoplay model with unit coverage

**Files:**
- Create: `src/projects/wiper-typography/wiperDriverView.ts`
- Create: `src/projects/wiper-typography/wiperDriverView.test.ts`
- Modify: `src/projects/wiper-typography/WiperTypographyDriverView3D.tsx`

- [ ] **Step 1: Write the failing unit tests for autoplay phase behavior**

```ts
it("loops phase between 0 and 1 over time", () => {
  expect(computeDriverViewPhase(0, 4)).toBe(0);
  expect(computeDriverViewPhase(2, 4)).toBe(0.5);
  expect(computeDriverViewPhase(6, 4)).toBe(0.5);
});

it("reduces motion by lengthening the cycle", () => {
  expect(getDriverViewCycleDuration(false)).toBeLessThan(
    getDriverViewCycleDuration(true)
  );
});
```

- [ ] **Step 2: Run the driver-view unit test to verify it fails**

Run: `npx vitest run src/projects/wiper-typography/wiperDriverView.test.ts`

Expected: `FAIL` because the helper does not exist yet.

- [ ] **Step 3: Implement the smallest autoplay helper**

```ts
export function getDriverViewCycleDuration(reducedMotion: boolean) {
  return reducedMotion ? 8 : 4.8;
}

export function computeDriverViewPhase(
  elapsedSeconds: number,
  cycleDuration: number
) {
  return ((elapsedSeconds % cycleDuration) + cycleDuration) % cycleDuration / cycleDuration;
}
```

- [ ] **Step 4: Run the helper test to verify it passes**

Run: `npx vitest run src/projects/wiper-typography/wiperDriverView.test.ts`

Expected: `PASS`

- [ ] **Step 5: Commit the autoplay helper checkpoint**

```bash
git add src/projects/wiper-typography/wiperDriverView.ts \
  src/projects/wiper-typography/wiperDriverView.test.ts
git commit -m "feat: add driver view autoplay timing"
```

## Chunk 3: Tesla Scene And Fallbacks

### Task 3: Build the 3D driver-view renderer around a local Tesla asset

**Files:**
- Create: `src/projects/wiper-typography/WiperTypographyDriverView3D.tsx`
- Create: `src/projects/wiper-typography/WiperTypographyTeslaModel.tsx`
- Create: `src/projects/wiper-typography/WiperTypographyDriverView3D.test.tsx`
- Modify: `src/projects/wiper-typography/WiperTypographySceneFrame.tsx`
- Modify: `src/projects/wiper-typography/useWiperSceneSimulation3D.ts`
- Asset: `public/models/tesla-model-3-driver-view.glb`

- [ ] **Step 1: Write the failing component tests for mount and fallback**

```tsx
it("renders the tesla driver view scene when selected", () => {
  root.render(<WiperTypographyDriverView3D projectId="wiper-typography" />);
  expect(container.textContent).toContain("mock-tesla-model");
});

it("shows a fallback message when the tesla asset fails to load", async () => {
  mockUseGLTF.mockImplementation(() => {
    throw new Error("asset failed");
  });

  root.render(<WiperTypographyDriverView3D projectId="wiper-typography" />);

  expect(container.textContent).toContain("3D driver view unavailable");
});
```

- [ ] **Step 2: Run the new driver-view component test to verify it fails**

Run: `npx vitest run src/projects/wiper-typography/WiperTypographyDriverView3D.test.tsx`

Expected: `FAIL` because the renderer and fallback do not exist yet.

- [ ] **Step 3: Implement the smallest driver-view renderer**

```tsx
return (
  <div className={styles.wrapper} role="img" aria-label="Tesla driver view wiper typography simulation">
    <Canvas camera={{ position: [0, 0.95, 0.25], fov: 42 }}>
      <Suspense fallback={null}>
        <DriverViewScene reducedMotion={reducedMotion} />
      </Suspense>
    </Canvas>
  </div>
);
```

- [ ] **Step 4: Load the local Tesla asset with a focused model component**

```tsx
const gltf = useGLTF("/models/tesla-model-3-driver-view.glb");

return (
  <primitive object={gltf.scene} position={[0, -0.98, -1.6]} scale={1.18} />
);
```

- [ ] **Step 5: Add guarded fallback handling instead of crashing the pane**

```tsx
try {
  return <WiperTypographyTeslaModel />;
} catch {
  return <Html center><div className={styles.placeholder3D}>3D driver view unavailable</div></Html>;
}
```

- [ ] **Step 6: Run the driver-view test to verify it passes**

Run: `npx vitest run src/projects/wiper-typography/WiperTypographyDriverView3D.test.tsx`

Expected: `PASS`

- [ ] **Step 7: Commit the scene bootstrap checkpoint**

```bash
git add src/projects/wiper-typography/WiperTypographyDriverView3D.tsx \
  src/projects/wiper-typography/WiperTypographyTeslaModel.tsx \
  src/projects/wiper-typography/WiperTypographyDriverView3D.test.tsx \
  src/projects/wiper-typography/WiperTypographySceneFrame.tsx \
  src/projects/wiper-typography/useWiperSceneSimulation3D.ts \
  public/models/tesla-model-3-driver-view.glb
git commit -m "feat: add tesla driver view scene"
```

## Chunk 4: Windshield Typography And Wipers

### Task 4: Place the glyph simulation on the windshield and wire the wiper sweep

**Files:**
- Modify: `src/projects/wiper-typography/WiperTypographyDriverView3D.tsx`
- Modify: `src/projects/wiper-typography/WiperTypographyCockpitWipers3D.tsx`
- Modify: `src/projects/wiper-typography/WiperTypographyExtrudedGlyph3D.tsx`
- Modify: `src/projects/wiper-typography/wiperSimulation.ts`
- Test: `src/projects/wiper-typography/WiperTypographyScene3DGlyphWiring.test.tsx`

- [ ] **Step 1: Write or update the failing glyph/wiper wiring test**

```tsx
it("updates glyph positions from autoplay phase without drag input", () => {
  render(<WiperTypographyDriverView3D projectId="wiper-typography" />);
  expect(stepWiperSimulationState).toHaveBeenCalled();
  expect(mockDragLayer).toBeUndefined();
});
```

- [ ] **Step 2: Run the 3D glyph wiring test to verify it fails for the right reason**

Run: `npx vitest run src/projects/wiper-typography/WiperTypographyScene3DGlyphWiring.test.tsx`

Expected: `FAIL` because the new driver-view renderer does not yet update the scene from autoplay timing.

- [ ] **Step 3: Drive the simulation from elapsed time and place glyphs near the windshield**

```tsx
useFrame((state) => {
  const phase = computeDriverViewPhase(
    state.clock.getElapsedTime(),
    getDriverViewCycleDuration(reducedMotion)
  );

  stepWiperSimulationState(simulation, phase);

  for (const glyph of simulation.glyphs) {
    mesh.position.set(projectX(glyph.x), projectY(glyph.y) + windshieldYOffset, windshieldZ);
  }
});
```

- [ ] **Step 4: Reuse or adapt the procedural wiper rig for the Tesla windshield**

```tsx
<WiperTypographyCockpitWipers3D
  phaseRef={phaseRef}
  windshieldZ={windshieldZ}
  worldHeight={worldHeight}
  worldWidth={worldWidth}
/>
```

- [ ] **Step 5: Run the wiring tests again to verify they pass**

Run: `npx vitest run src/projects/wiper-typography/WiperTypographyScene3DGlyphWiring.test.tsx`

Expected: `PASS`

- [ ] **Step 6: Commit the animation checkpoint**

```bash
git add src/projects/wiper-typography/WiperTypographyDriverView3D.tsx \
  src/projects/wiper-typography/WiperTypographyCockpitWipers3D.tsx \
  src/projects/wiper-typography/WiperTypographyExtrudedGlyph3D.tsx \
  src/projects/wiper-typography/wiperSimulation.ts \
  src/projects/wiper-typography/WiperTypographyScene3DGlyphWiring.test.tsx
git commit -m "feat: animate tesla windshield typography"
```

## Chunk 5: Verification

### Task 5: Run targeted verification and whole-project safety checks

**Files:**
- Modify as needed: any files touched by failed checks

- [ ] **Step 1: Run the focused wiper test suite**

Run:

```bash
npx vitest run \
  src/projects/wiper-typography/WiperTypographyProject.test.tsx \
  src/projects/wiper-typography/WiperTypographyDriverView3D.test.tsx \
  src/projects/wiper-typography/WiperTypographyScene3DGlyphWiring.test.tsx \
  src/projects/wiper-typography/wiperDriverView.test.ts
```

Expected: all tests `PASS`

- [ ] **Step 2: Run lint**

Run: `npm run lint`

Expected: exits `0`

- [ ] **Step 3: Run a production build**

Run: `npm run build`

Expected: exits `0`

- [ ] **Step 4: Do a manual smoke check in the browser**

Run: `npm run dev`

Verify:
- `2D Canvas` remains the default mode
- `3D Driver View` switches cleanly
- the Tesla cabin loads from the local asset
- the camera stays fixed
- glyphs read as falling on the windshield
- wipers animate without drag or mouse interaction

- [ ] **Step 5: Commit the finished feature**

```bash
git add src/projects/wiper-typography \
  docs/superpowers/plans/2026-03-17-wiper-typography-tesla-driver-view.md \
  public/models/tesla-model-3-driver-view.glb
git commit -m "feat: add tesla driver view to wiper typography"
```
