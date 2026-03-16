# iOS Curl Animation Tech Notes

## Overview

This project is an interactive recreation of the classic iOS-style page curl effect. In this codebase it is implemented as a dual-renderer experiment: the same interaction can run either as a `Canvas 2D` approximation or as a `Three.js` shader-driven deformation. The important architectural point is that the project is not "one renderer with a visual mode toggle." It is two separate implementations behind a shared project shell.

At the portfolio level, the project is registered in `src/data/projects.ts` with `id: "ios-curl-animation"` and `interactiveDemo: "page-curl"`. That metadata is what allows the dynamic project page to render the interactive implementation instead of a static side-by-side comparison.

## Tech Stack

- `Next.js 16` and `React 19` provide the page shell and component lifecycle.
- `TypeScript` is used for the interaction and geometry code.
- `Canvas 2D` powers the painterly version in `src/projects/page-curl/PageCurlEmbed.tsx`.
- `@react-three/fiber`, `@react-three/drei`, and `three` power the shader-based version in `src/projects/page-curl/PageCurlEmbed3D.tsx`.
- `CSS Modules` in `src/projects/page-curl/PageCurlProject.module.css` style the shared container, canvas area, and controls.

## File Map

### `src/projects/page-curl/PageCurlProject.tsx`

This is the small shell component that owns the mode toggle. It stores `mode` in React state and conditionally renders either `PageCurlEmbed` or `PageCurlEmbed3D`.

This file matters because it defines the project boundary:
- UI state for "2D Canvas" vs "3D Shader" lives here.
- Renderer-specific interaction state does not live here.
- The two implementations are isolated from each other and only share the surrounding pane styles.

### `src/projects/page-curl/PageCurlEmbed.tsx`

This is the 2D renderer. It uses a `<canvas>` element plus a set of geometry helpers to fake the curl with polygon clipping, reflection, gradients, and shadows.

### `src/projects/page-curl/PageCurlEmbed3D.tsx`

This is the 3D renderer. It builds a subdivided plane mesh, deforms the vertices in a custom shader, shades both faces of the sheet, and uses a custom depth material so the bent page can cast a believable shadow.

### `src/data/projects.ts`

This file connects the portfolio metadata to the renderer. The preview media, title, description, and `interactiveDemo: "page-curl"` flag are all defined here.

## Runtime Architecture

The runtime architecture splits into two layers:

1. The project shell decides which renderer to mount.
2. The mounted renderer owns its own interaction state, drawing pipeline, and controls.

Both renderers expose the same conceptual controls:
- peel distance
- peel angle
- back-face opacity

The difference is how those concepts are realized:
- the 2D version computes everything in page-local pixel space and paints the result manually
- the 3D version computes deformation in object space and lets the GPU handle lighting and rasterization

## Shared Interaction Model

Both versions treat the curl as a page being pulled inward from an edge. That means the interaction can be described by three values:

- `angle`: which side or corner the peel comes from
- `dist` or `peelDist`: how far the peel has progressed
- `opacity`: how visible the back-face image is compared with the paper-white fallback

In both implementations, the angle is intentionally smoothed instead of jumping immediately to a new value from the slider. That smoothing keeps the transition feeling less mechanical and also keeps the drag direction aligned with the currently visible curl instead of a discontinuous target.

## 2D Canvas Pipeline

### Surface Setup

`PageCurlEmbed.tsx` treats the canvas as a padded stage rather than drawing edge-to-edge. `PAD_RATIO` reserves space around the page so the reflected flap and shadows can extend beyond the rectangular page bounds without being clipped by the canvas edge.

The page image is loaded by fetching `/images/love-jones-cover.jpg`, converting it into an `ImageBitmap`, and drawing it into an `OffscreenCanvas` through `makeFrontFromImage`. That helper does two things:

- clips the page to a rounded rectangle using `roundRect`
- cover-fits the source image so the page surface is always fully filled

That `OffscreenCanvas` becomes the reusable front-face texture for all subsequent drawing.

### Geometry Primitives

The 2D implementation is built around a few small geometry helpers:

### `getOrigin(angleDeg, W, H)`

This function converts the chosen curl angle into:
- `origin`: the page-edge point where the peel starts
- `inward`: a unit vector pointing from the edge into the page
- `maxDist`: the maximum safe peel distance needed to sweep beyond the farthest corner

The key idea is that the function casts a ray from the page center toward the requested angle, finds where that ray hits the page boundary, then inverts the direction to get the inward pull vector.

### `clipPoly(poly, ox, oy, nx, ny)`

This is a half-plane polygon clipper. It cuts the rounded-rectangle page polygon against the fold line to produce:
- the flat page polygon
- the flap polygon

Without this function, the canvas renderer would have no clean way to separate the still-flat part of the page from the part that has folded over.

### `reflectPt(p, lx, ly, ldx, ldy)`

This mirrors a point across the fold line. The curl effect in the 2D renderer is not a true surface simulation. Instead, it takes the flap polygon and reflects it across the fold line so the peeled portion appears on the other side.

### `tracePoly(ctx, pts)`

This is the low-level path helper that turns polygon point arrays into canvas paths for clipping and filling.

### Page Construction

Inside `draw(...)`, the page is approximated as a rounded rectangle polygon. The corners are not represented analytically; instead, the function samples several points per quarter-circle and builds a polygonal loop. That is a pragmatic choice:

- it keeps clipping logic simple because everything is polygon-based
- it avoids writing special-case math for rounded-corner intersections
- it is visually good enough for this soft, portfolio-style recreation

### Fold-Line Derivation

The page peel is represented by an edge `origin` and a `tip` point displaced inward by `dist`.

From those two points, the renderer derives:
- the midpoint `m`, which lies on the fold
- the fold direction, perpendicular to the origin-to-tip vector
- the away normal, aligned with the pull direction

That information is enough to split the page into two regions:
- `flatPoly`: the part still facing the viewer
- `flapPoly`: the part that has been peeled

This is the core abstraction of the 2D version. After the split, the rest of the rendering is layered image compositing.

### Paint Order

The 2D `draw(...)` function is best understood as a deterministic paint stack:

1. Draw the flat front face clipped to `flatPoly`.
2. Reflect `flapPoly` across the fold to get `reflectedFlap`.
3. Cast shadow from the reflected flap onto the flat face.
4. Draw the reflected flap image.
5. Add cylindrical shading and specular response on the back face.
6. Add a curved highlight band around the fold.

Each layer exists because the reflection alone looks too flat.

### Flat Face

The flat region is clipped and then filled with the pre-rendered front surface. If the image surface is unavailable, the code falls back to a white fill so the canvas never goes transparent.

### Cast Shadow

The shadow is a combination of two effects:
- a blurred drop shadow using the canvas shadow API
- a linear ambient-occlusion gradient near the crease

This is a good example of the project's visual strategy. It does not simulate physically correct self-shadowing. It stacks a few targeted illusions that read correctly to the eye.

### Reflected Flap

The reflected flap uses a reflection transform applied to the canvas context. The front image is drawn into the reflected coordinate system with `globalAlpha = backOpacity`, so the back face can blend between plain paper and the mirrored cover image.

This is why the control is labeled as opacity, not texture visibility or material blend. It literally controls the alpha of the reflected image on the back side.

### Back-Face Shading

After the reflected image is drawn, additional gradients are painted on top. These gradients do most of the work of selling the flap as a curved surface:

- darker values near the fold imply depth
- a brighter specular band near the crease implies a glossy highlight
- values taper off toward the tip to avoid turning the flap into a uniformly dark slab

### Fold Band

The last layer narrows or widens according to pull distance, creating a faux conical bend. This is a visual cheat: the page is still represented as a reflected polygon, but the highlight band helps imply that the curl radius changes along the fold.

### State And Pointer Handling

The 2D renderer deliberately avoids React state for high-frequency drag updates. The hot interaction path uses refs:

- `distRef`
- `angleRef`
- `targetAngleRef`
- `opacityRef`
- `dragging`
- `downClientRef`
- `distAtDownRef`

React state is only used for the slider UI values that need to re-render the controls.

`onDown` stores the starting pointer position and the peel distance at drag start. `onMove` then:

1. reads the current page angle
2. derives the inward direction from `getOrigin`
3. converts the screen-space drag delta into canvas-space delta
4. projects that drag onto the inward vector
5. adds the projected value to the starting peel distance
6. clamps it between `0` and `maxDist`

The important detail is step 4. The user can move diagonally, but only the component of that motion aligned with the current inward peel direction changes the curl amount.

### Resize And Rendering Lifecycle

`buildSurfaces` recalculates the canvas size using device pixel ratio, rebuilds the padded page dimensions, and regenerates the `OffscreenCanvas` front surface when the cover image is available.

A `ResizeObserver` watches the canvas element so the drawing can be rebuilt whenever the layout changes. Rendering itself is demand-driven rather than continuously animated:

- drag updates request animation frames
- angle smoothing schedules repeated frames until the target is reached
- opacity changes trigger a redraw

That keeps the 2D version relatively cheap when idle.

## 3D Shader Pipeline

### Scene Structure

`PageCurlEmbed3D.tsx` wraps the demo in a `Canvas` from `@react-three/fiber`. The visible page is a mesh with:

- `planeGeometry args={[size.w, size.h, 512, 512]}`
- a custom `shaderMaterial`
- a custom depth material attached as `customDepthMaterial`

The high subdivision count is essential. The page curl is a vertex deformation problem, so the plane needs enough segments to bend smoothly.

The scene also includes:
- an ambient light
- a shadow-casting directional light
- a receiving plane behind the page using `shadowMaterial`

### Why The 3D Version Exists

The 3D version solves a different problem than the 2D one. The 2D version is a carefully painted illusion. The 3D version gives the page real geometry:

- the sheet physically lifts in `z`
- front and back faces can be shaded differently
- the curled form can cast a shadow into the scene

That makes it more expensive and more complex, but it also makes the result feel structurally consistent from more viewing angles.

### Vertex Deformation

The main deformation logic lives in the GLSL `deformChunk`. Conceptually, the shader measures how far each vertex is from the fold in the inward direction and then decides which of three regimes it belongs to:

1. flat region ahead of the curl
2. curved region wrapping around a bend radius `R`
3. fully turned region after the half-rotation

`uPeelDist`, `uOrigin`, `uInward`, and `uSize` are the key uniforms. The shader computes:

- the dot-product distance from the origin along the inward axis
- the fold position at `uPeelDist / 2.0`
- a curved path around a bend radius proportional to the page size
- a rotated normal using Rodrigues' rotation formula

That last piece matters because once the vertices bend, the normals also need to bend or the lighting will look wrong.

### Fragment Shading

The fragment shader uses a single texture, but it shades front and back faces differently.

Key details:
- `gl_FrontFacing` determines whether the fragment belongs to the front or back side
- the back side flips `uv.x` so the image mirrors correctly
- `getCoverUv` performs a cover-fit remap so texture aspect ratio matches the page aspect ratio
- a rounded-rectangle signed-distance test discards fragments outside the softened page boundary

Lighting is a simple handcrafted model:
- ambient term
- diffuse term from a fixed light direction
- specular term, sharper on the back face than the front face

The back face then blends between a paper-white base and the textured image using `uOpacity`.

### Depth And Shadows

If the custom surface deformation were only applied to the visible material, the page shadow would be wrong because the depth pass would still think the page was flat.

That is why the file defines `shadowDeformChunk` and builds a separate custom depth material. The depth material applies a compatible deformation before shadow rendering, and its fragment shader also performs the rounded-rectangle discard so the shadow shape matches the visible page edges.

This is one of the more important technical decisions in the project. It is the difference between "a bent-looking page with a flat shadow" and "a bent page that participates in the scene consistently."

### Uniform And Animation Flow

`PageComponent` stores uniforms in React state once and then mutates them over time through refs and `useFrame`. The update loop does three things every frame:

1. ease `uPeelDist` toward the latest React state `peelDist`
2. ease the target angle toward the slider value using shortest-path circular interpolation
3. recompute `uOrigin` and `uInward` from the live angle

The file also writes the current animated angle into `liveAngleRadRef`. That value is reused by pointer handling outside the canvas scene so drag direction matches the already-smoothed curl orientation.

### Pointer Mapping In 3D

The 3D drag interaction does not perform a full raycast onto the page surface. Instead, it uses a pragmatic approximation:

- read the current animated angle
- derive the inward vector in pointer space
- compute pointer delta in screen pixels
- scale that motion into a world-space peel distance using the diagonal of the rendered container

This is intentionally simpler than a full physically accurate interaction model. It keeps the drag feeling close to the 2D version without turning the project into a full 3D picking system.

`maxDistRef` is derived from the page diagonal in scene units. The drag result is clamped, and the page does not snap back on pointer release. That mirrors the 2D implementation.

### Practical Notes

There are a few implementation details worth remembering if this project is revisited:

- The cover image is currently hardcoded as `/images/love-jones-cover.jpg` in both implementations rather than being injected from project data.
- The 3D file overrides `console.warn` to suppress recurring Three.js and related warnings. That keeps the console quieter, but it also globally changes warning behavior for the page.
- The 2D and 3D versions intentionally do not share a math core. They share concepts, not implementation.

## Limits And Next Steps

Current limitations:

- The 2D renderer is visually convincing but not physically correct. It relies on reflection and layered gradients instead of real surface geometry.
- The 3D renderer uses a simplified bend model and a coarse pointer-to-world mapping rather than direct page picking.
- The hardcoded image source makes the renderer less reusable than it could be.
- The two implementations duplicate some conceptual controls and could drift over time.

If this project is revisited, the most useful next steps would be:

1. move the cover image and related material inputs into project props
2. extract shared terminology and control models between the 2D and 3D versions
3. decide whether the goal is visual fidelity, code clarity, or a reusable page-curl component, because each of those goals would push the implementation in a different direction
