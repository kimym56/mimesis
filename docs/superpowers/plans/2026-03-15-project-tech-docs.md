# Project Tech Docs Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add two deep technical reference documents that explain how the `iOS Page Curl` and `Wiper Typography` projects are implemented.

**Architecture:** Keep the work entirely in documentation. Use the existing project source as the ground truth, then write one focused Markdown document per project under `docs/projects/` so each doc can describe its own file map, rendering model, state flow, math, interaction handling, and current limitations without mixing concepts across projects.

**Tech Stack:** Markdown, Next.js 16, React 19, TypeScript, Canvas 2D, React Three Fiber, Three.js, ESLint

---

## Chunk 1: Documentation Structure

### Task 1: Capture the approved documentation shape

**Files:**
- Create: `docs/superpowers/specs/2026-03-15-project-tech-docs-design.md`
- Create: `docs/superpowers/plans/2026-03-15-project-tech-docs.md`

- [ ] **Step 1: Write the design spec**

```md
# Project Tech Docs Design

**Goal:** Add two deep technical reference documents...
```

- [ ] **Step 2: Write the implementation plan**

```md
# Project Tech Docs Implementation Plan

**Goal:** Add two deep technical reference documents...
```

### Task 2: Create the destination directory and section structure

**Files:**
- Create: `docs/projects/ios-curl-animation-tech.md`
- Create: `docs/projects/wiper-typography-tech.md`

- [ ] **Step 3: Draft the shared section structure**

```md
## Overview
## Tech Stack
## File Map
## Runtime Architecture
## Implementation Walkthrough
## Interaction Model
## Limitations And Next Steps
```

## Chunk 2: iOS Page Curl Doc

### Task 3: Write the page curl implementation walkthrough

**Files:**
- Create: `docs/projects/ios-curl-animation-tech.md`

- [ ] **Step 4: Document the project shell and mode toggle**

```md
- Explain how `PageCurlProject.tsx` switches between `PageCurlEmbed` and `PageCurlEmbed3D`.
- Explain how `src/data/projects.ts` routes the portfolio entry to the interactive demo.
```

- [ ] **Step 5: Document the 2D canvas pipeline**

```md
- Explain `getOrigin`, `clipPoly`, `reflectPt`, `tracePoly`, and `draw`.
- Explain how drag distance is projected onto the inward vector and clamped with `maxDist`.
```

- [ ] **Step 6: Document the 3D shader pipeline**

```md
- Explain the plane subdivision, shader uniforms, vertex deformation, fragment shading, and custom depth material.
- Explain how pointer movement is converted into world-space peel distance.
```

## Chunk 3: Wiper Typography Doc

### Task 4: Write the wiper typography implementation walkthrough

**Files:**
- Create: `docs/projects/wiper-typography-tech.md`

- [ ] **Step 7: Document the scene model**

```md
- Explain `WiperGlyph` and `WiperLine` as separate entity types sharing a lightweight runtime interface.
- Explain how the scene is rebuilt on resize and device changes.
```

- [ ] **Step 8: Document the math and interaction flow**

```md
- Explain `phase`, autoplay, pointer takeover, and the helper functions in `wiperMath.ts`.
- Explain collision handling and why the hot path stays outside React state.
```

## Chunk 4: Verification

### Task 5: Verify the documentation change

**Files:**
- Create: `docs/projects/ios-curl-animation-tech.md`
- Create: `docs/projects/wiper-typography-tech.md`

- [ ] **Step 9: Run a repository sanity check**

Run: `npm run lint`
Expected: PASS

- [ ] **Step 10: Check for malformed patch output**

Run: `git diff --check`
Expected: PASS with no whitespace or merge-marker errors
