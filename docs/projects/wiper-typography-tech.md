# Wiper Typography Tech Notes

## Overview

This project is a motion study built around a shared `phase` value that drives a set of black wiping blades through a field of falling typographic particles. The live portfolio project currently exposes two render modes behind one shell:

- `2D Canvas`
- `3D Stage`

Both modes inherit the same wipe language and simulation model, but render it through different surfaces.

At the portfolio level, the project is registered in `src/data/projects.ts` with `id: "wiper-typography"` and `interactiveDemo: "wiper-typography"`. That metadata is what causes the interactive demo to render on the project detail page.

## Tech Stack

- `Next.js 16` and `React 19` provide the page shell and lifecycle hooks.
- `TypeScript` is used for the shell, simulation, interaction, and geometry helpers.
- `Canvas 2D` renders the flat mode in `src/projects/wiper-typography/WiperTypographyCanvas2D.tsx`.
- `React Three Fiber` and `Three.js` render the staged 3D mode in `src/projects/wiper-typography/WiperTypographySceneStage3D.tsx`.
- `CSS Modules` in `src/projects/wiper-typography/WiperTypographyProject.module.css` define the shared shell and mode toggle.
- `Vitest` covers the extracted math, interaction, and scene wiring helpers.

## File Map

### `src/projects/wiper-typography/WiperTypographyProject.tsx`

This is the shell component for the project. It owns the mode state and swaps between the maintained `2D Canvas` and `3D Stage` renderers.

### `src/projects/wiper-typography/WiperTypographyCanvas2D.tsx`

This is the imperative canvas runtime for the flat version of the piece. It owns canvas sizing, frame updates, and drawing for the 2D renderer.

### `src/projects/wiper-typography/WiperTypographySceneStage3D.tsx`

This is the maintained 3D renderer. It stages the same bars and glyph language inside a shallow perspective scene and delegates shared camera and interaction behavior to `WiperTypographySceneFrame.tsx`.

### `src/projects/wiper-typography/wiperMath.ts`

This file holds the pure math utilities that are stable enough to test outside the canvas runtime:

- `clamp`
- `mapPointerXToPhase`
- `mapPointerDragToPhase`
- `stepPhaseToward`
- `isPointerInsideActiveRange`
- `computeLinePose`

### `src/projects/wiper-typography/wiperMath.test.ts`

This test file covers the helper layer, not the entire animation system. That is a deliberate boundary: the math can be deterministic and unit-tested, while the full canvas simulation remains imperative and frame-based.

## Runtime Architecture

The top-level React component is a shell around two renderer implementations. The important architectural decision is that React is not used as the animation engine for either renderer.

React is responsible for:
- mounting the shared project shell and mode toggle
- giving each renderer stable refs
- switching between the maintained 2D and 3D renderers

The imperative runtimes are responsible for:
- canvas sizing and device-pixel-ratio setup
- entity creation
- autoplay and pointer interaction
- drawing or updating scene objects on each animation frame

That split is the reason the project stays performant even though it animates many moving objects. There is no per-frame React re-render.

## Scene Model

The scene is made of objects that satisfy a tiny interface:

- `x`, `y`, `vx`, `vy`, `radius`
- `move(phase)`
- `draw(context)`

Two classes implement that interface:

### `WiperGlyph`

`WiperGlyph` is a falling text particle.

Its behavior:
- spawns at a random horizontal position above the visible frame
- receives a random initial velocity
- experiences friction and gravity each frame
- rotates slowly while drawing
- resets when it falls below the stage or moves completely off-screen

It draws one character selected from `GLYPHS = "TYPOGRH".split("")`. The glyph is rendered in white Helvetica against the blue background.

The key detail is that the glyph class does not react directly to `phase`. Its motion is mostly autonomous. It participates in the visual effect by colliding with other entities and by being visually intersected by the moving wipe structure.

### `WiperLine`

`WiperLine` represents one black rectangular blade in the wipe assembly.

Its behavior is deterministic:
- its pose is recomputed directly from `phase`
- it does not use friction or gravity
- its `rotation` field stores the same normalized phase value and is converted to radians during drawing

Multiple `WiperLine` instances are stacked by index, which creates the sweeping comb-like wipe structure.

## Phase As The Master Control Variable

The entire interaction model becomes easier to understand if `phase` is treated as the project's single source of truth.

`phase` always lives in the normalized range `[0, 1]`.

The component uses it in two modes:

- `pointerOnCanvas = false`: autoplay controls `phase`
- `pointerOnCanvas = true`: pointer dragging controls `phase`

Autoplay advances `autoPhaseAngle` by a fixed speed and then computes:

```ts
phase = Math.abs(Math.sin(autoPhaseAngle));
```

That choice creates a smooth back-and-forth oscillation without having to manually reverse direction at the endpoints.

## Math Layer

### `computeLinePose`

The most important helper is `computeLinePose(index, phase, width, height, segmentWidth)`.

It converts the normalized `phase` into a blade pose by computing:

- `theta = phase * Math.PI`
- `distance = -(segmentWidth - 2) * index`

Then it places each blade using:

- `x = cos(theta) * distance + width / 2`
- `y = sin(theta) * distance + height + segmentWidth`
- `rotation = theta`

This means the wipe is not driven by separate x and rotation systems. Both are derived from the same angle. That is why the structure feels mechanically linked: translation and rotation are coupled by construction.

One implementation detail is slightly inconsistent here: `computeLinePose` returns `rotation` in radians, but `WiperLine.move` currently stores the normalized `phase` and lets `draw` convert it to radians later. The visual result is the same because `draw` multiplies by `Math.PI`, but the helper's `rotation` field is not the value that the runtime actually uses.

## Pointer Mapping Helpers

The helper layer also defines how pointer input maps onto `phase`.

### `mapPointerDragToPhase`

This function takes:
- the current pointer x position
- the pointer x position at drag start
- the phase at drag start
- the width of the active area
- an optional margin

It converts the horizontal drag distance into a phase delta and clamps the result back into `[0, 1]`.

### `stepPhaseToward`

This limits how much the current phase can move toward the pointer target in a single frame. In the runtime, this is used with `POINTER_PHASE_MAX_DELTA` so the wipe catches up smoothly instead of snapping instantly to the pointer.

### Active-Range Handling

The helper file defines a default `WIPER_MARGIN = 100`, but the runtime passes `INTERACTION_MARGIN = 0`. That means this specific project lets the drag interaction use the full width of the stage even though the math helpers were written to support a narrower active range.

That detail is easy to miss when reading only the helper file. The real interaction area is determined by the runtime call sites, not by the default constant alone.

## Animation Loop

Inside the component's `useEffect`, the `tick` function performs the full frame update:

1. update `phase` from pointer control or autoplay
2. clear the canvas with a blue background
3. run pairwise collision checks across the entity list
4. draw each entity
5. move each entity
6. schedule the next frame with `requestAnimationFrame`

This ordering is intentional:
- collisions operate on the current positions
- drawing shows the current frame
- movement advances entities for the next frame

It is a simple pattern, but it keeps the simulation predictable.

## Collision Model

Collisions are handled with a nested loop over all entity pairs. For each pair:

- compute `dx`, `dy`, and Euclidean distance
- compare that distance against the sum of radii
- if the circles overlap, compute an angle and an impulse target point
- push the two entities apart by adjusting their velocities

This is an `O(n^2)` pass, which is acceptable here because the total entity count is moderate and the project is a visual study rather than a large-scale physics system.

The collision model is also intentionally soft:
- there is no exact conservation of momentum
- there is no spatial partitioning
- there are no contact manifolds or solver iterations

`COLLISION_PUSH` simply injects velocity impulses that keep the particles and blades from visually collapsing into each other.

## Resize And Device Adaptation

`buildScene` adapts the simulation to input type and device class.

The component checks:
- `window.matchMedia("(pointer: coarse)")`
- whether the device looks like an iPad

That information controls the particle budget:
- desktop: `120`
- tablet: `80`
- mobile: `50`

Line count is derived from the current stage height using:

```ts
Math.floor((height / LINE_WIDTH) * 1.2)
```

So the wipe structure scales with the viewport rather than using a fixed hardcoded number of blades.

The `resize` function also handles device pixel ratio by resizing the backing canvas and then calling:

```ts
context.setTransform(dpr, 0, 0, dpr, 0, 0);
```

That keeps drawing code in logical CSS pixels while still rendering sharply on high-density displays.

## Pointer Architecture

The project uses an invisible drag layer rather than listening on the canvas directly. The component renders:

- the visible `<canvas>`
- an overlaid `<div>` referenced as `dragLayerRef`

That layer receives pointer events:
- `pointerenter`
- `pointermove`
- `pointerleave`
- `pointercancel`

This is a practical choice. It keeps interaction hit-testing simple and decouples pointer handling from canvas drawing logic.

The pointer flow works like this:

1. entering the layer enables pointer control and syncs the target phase
2. the first move primes the drag origin
3. later moves call `mapPointerDragToPhase`
4. leaving or canceling returns control to autoplay and resyncs the autoplay angle from the current phase

The resync step matters. Without it, autoplay would restart from an unrelated oscillation phase and cause a visible jump.

## Why React State Is Absent From The Hot Path

Nothing in the per-frame simulation is stored in React state:

- `phase`
- `autoPhaseAngle`
- `pointerOnCanvas`
- entity arrays
- canvas dimensions
- frame id

All of those values live inside the effect closure. That keeps the project aligned with the actual rendering model, which is imperative and frame-based.

If React state were used here, every frame would risk unnecessary reconciliation work and the code would become harder to reason about because the simulation clock and the React render clock would interfere with each other.

## Testing Boundary

The extracted math helpers are the project's main testable seam.

That seam exists for good reasons:
- the helpers are deterministic
- they capture the part of the behavior that is easiest to regress silently
- they can be validated without emulating a canvas or animation loop

The untested portion is the full visual simulation and interaction choreography. That is acceptable for this kind of portfolio experiment, but it also means visual regressions still need manual inspection.

## Practical Notes

Some implementation details are worth remembering:

- `mapPointerXToPhase` exists in the helper layer but is not currently used by the runtime. The component uses drag deltas rather than absolute pointer position.
- `INTERACTION_MARGIN` is set to `0`, even though the helper layer supports margins.
- `WiperLine.move` stores `rotation = phase`, and `draw` multiplies by `Math.PI`. That keeps the runtime normalized until the final draw step.
- The glyph system uses Helvetica directly in canvas text rather than coordinating with the app's `next/font` configuration.

## Limits And Next Steps

Current limitations:

- collisions are quadratic and intentionally approximate
- the simulation is visually tuned rather than physically accurate
- canvas text rendering gives limited control compared with vector or shader text
- the color palette and glyph set are hardcoded inside the component

If this project is revisited, the most useful improvements would be:

1. extract configuration for colors, glyph set, particle counts, and typography
2. separate scene construction from runtime update logic if the file starts growing further
3. add a small visual regression workflow or captured reference frames, because the most fragile parts of this project are perceptual rather than purely mathematical
