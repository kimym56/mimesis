# Staggered Text Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the placeholder portfolio entry with an interactive `staggered-text` project that recreates the Rauno-style staggered hover text motion and links back to the original X post through the existing project-detail layout.

**Architecture:** Add a new project-local interactive component under `src/projects/staggered-text/` that splits `Get started` into per-character slots and drives the motion entirely through CSS variables and transitions. Extend the project metadata and reference preview rendering so the new project can register as an interactive demo and render a generic X preview card without disturbing the current Threads-specific oEmbed path.

**Tech Stack:** Next.js App Router, React 19 client components, TypeScript, CSS Modules, Vitest with jsdom

---

## Chunk 1: Lock The Behavior With Tests

### Task 1: Add failing metadata and reference tests

**Files:**
- Modify: `src/data/projects.test.ts`
- Modify: `src/projects/registry.test.ts`
- Modify: `src/app/project/[id]/ProjectReferenceContent.test.tsx`
- Create: `src/projects/staggered-text/StaggeredTextProject.test.tsx`

- [ ] **Step 1: Write the failing metadata test**

Add a new test in `src/data/projects.test.ts` that asserts:
- the placeholder `creative-portfolio` project no longer exists,
- a `staggered-text` project exists,
- it is marked `interactive: true`,
- it uses `interactiveDemo: "staggered-text"`,
- its reference preview uses `platform: "x"` and points at `https://x.com/raunofreiberg/status/1826969932099104959`.

- [ ] **Step 2: Write the failing registry test**

Add a new test in `src/projects/registry.test.ts` that asserts `interactiveProjectRegistry["staggered-text"]` is defined.

- [ ] **Step 3: Write the failing reference preview test**

In `src/app/project/[id]/ProjectReferenceContent.test.tsx`, add a non-Threads project fixture with:
- `platform: "x"`,
- title text for the reference card,
- image path `/images/staggered-text-cover.svg`,
- outbound URL to the X post.

Assert that rendering `ProjectReferenceContent`:
- shows the preview title,
- shows `Open on X`,
- does not render an `<iframe>`,
- does not attempt a Threads oEmbed fetch.

- [ ] **Step 4: Write the failing interaction test**

Create `src/projects/staggered-text/StaggeredTextProject.test.tsx` and assert that:
- the rendered output includes the full `Get started` label,
- each non-space character is rendered into individual character slots,
- pointer press activates the demo state and pointer release clears it,
- keyboard focus/blur or key press toggles the same active state accessibly.

- [ ] **Step 5: Run the tests to verify they fail**

Run: `npm test -- src/data/projects.test.ts src/projects/registry.test.ts src/app/project/[id]/ProjectReferenceContent.test.tsx src/projects/staggered-text/StaggeredTextProject.test.tsx`

Expected: FAIL because the `staggered-text` project, renderer, generic X preview handling, and component do not exist yet.

## Chunk 2: Wire Project Data And Reference Rendering

### Task 2: Replace the placeholder project and generalize preview cards

**Files:**
- Modify: `src/data/projects.ts`
- Modify: `src/projects/registry.ts`
- Modify: `src/app/project/[id]/ProjectReferenceContent.tsx`
- Create: `public/images/staggered-text-cover.svg`

- [ ] **Step 6: Update the project metadata**

In `src/data/projects.ts`:
- extend `interactiveDemo` to include `"staggered-text"`,
- extend `ProjectReferencePreview["platform"]` to include `"x"`,
- replace the `creative-portfolio` object with a new `staggered-text` entry,
- set `title` to `Staggered Text`,
- set `description` to a concise description of the Rauno-inspired staggered hover lettering,
- set `originalImage` and `imitationImage` to `/images/staggered-text-cover.svg`,
- set `interactive: true`,
- set `interactiveDemo: "staggered-text"`,
- set `referencePreview` with the X URL, preview title, preview description, and the same local cover asset,
- set `referenceUser` to Rauno Freiberg and the same X URL.

- [ ] **Step 7: Register the new interactive renderer**

In `src/projects/registry.ts`:
- create a dynamic import for `./staggered-text/StaggeredTextProject`,
- add `"staggered-text"` to `interactiveProjectRegistry`.

- [ ] **Step 8: Generalize preview-card rendering for X**

In `src/app/project/[id]/ProjectReferenceContent.tsx`:
- keep the current Threads oEmbed branch unchanged for `platform === "threads"` with `embed === "official"`,
- render the same preview card markup for all platforms,
- derive the outbound link label from `project.referencePreview.platform`,
- ensure non-Threads platforms return the fallback card directly and never request oEmbed.

- [ ] **Step 9: Add the static cover asset**

Create `public/images/staggered-text-cover.svg` as a lightweight SVG poster that matches the portfolio's soft, minimal direction:
- pale background,
- centered `Get started` wordmark,
- subtle depth cues that hint at the staggered layers without animating.

- [ ] **Step 10: Run the targeted tests**

Run: `npm test -- src/data/projects.test.ts src/projects/registry.test.ts src/app/project/[id]/ProjectReferenceContent.test.tsx`

Expected: PASS while `src/projects/staggered-text/StaggeredTextProject.test.tsx` still fails because the interactive component is not implemented yet.

## Chunk 3: Build The Interactive Demo

### Task 3: Implement the staggered text project component

**Files:**
- Create: `src/projects/staggered-text/StaggeredTextProject.tsx`
- Create: `src/projects/staggered-text/StaggeredTextProject.module.css`
- Verify: `src/projects/staggered-text/StaggeredTextProject.test.tsx`

- [ ] **Step 11: Write the minimal interactive component**

In `src/projects/staggered-text/StaggeredTextProject.tsx`:
- create a client component,
- define the display text as `Get started`,
- split the text into characters while preserving spaces,
- expose per-character CSS custom properties such as `--char-index`,
- manage a single active boolean with pointer and keyboard events,
- keep the root interactive element semantic, preferably a `button`,
- set an accessible label describing the interaction,
- add a reduced-motion branch using `useReducedMotion` so the component can suppress 3D motion.

- [ ] **Step 12: Implement the CSS-only motion system**

In `src/projects/staggered-text/StaggeredTextProject.module.css`:
- follow the existing project-local module pattern,
- create a centered stage that fits naturally inside the left detail pane,
- define character slots with fixed inline geometry so spaces and repeated letters remain stable,
- stack layered glyph spans inside each slot,
- use `perspective`, `transform`, `opacity`, `filter`, and staggered `transition-delay: calc(var(--char-index) * step)` to create the cascade,
- add active-state selectors using a root `[data-active="true"]`,
- add reduced-motion selectors that swap the 3D flip for a simple opacity/translate reveal,
- ensure the component remains readable and balanced on narrow mobile widths.

- [ ] **Step 13: Run the component test to verify it passes**

Run: `npm test -- src/projects/staggered-text/StaggeredTextProject.test.tsx`

Expected: PASS

## Chunk 4: Verify The Integrated Project

### Task 4: Run regression checks for the new project entry

**Files:**
- Verify: `src/data/projects.test.ts`
- Verify: `src/projects/registry.test.ts`
- Verify: `src/app/project/[id]/ProjectReferenceContent.test.tsx`
- Verify: `src/projects/staggered-text/StaggeredTextProject.test.tsx`

- [ ] **Step 14: Run the full targeted test set**

Run: `npm test -- src/data/projects.test.ts src/projects/registry.test.ts src/app/project/[id]/ProjectReferenceContent.test.tsx src/projects/staggered-text/StaggeredTextProject.test.tsx`

Expected: PASS

- [ ] **Step 15: Run lint**

Run: `npm run lint`

Expected: PASS

- [ ] **Step 16: Run a production build**

Run: `npm run build`

Expected: PASS

- [ ] **Step 17: Commit the implementation**

```bash
git add public/images/staggered-text-cover.svg \
  src/data/projects.ts \
  src/data/projects.test.ts \
  src/projects/registry.ts \
  src/projects/registry.test.ts \
  src/app/project/[id]/ProjectReferenceContent.tsx \
  src/app/project/[id]/ProjectReferenceContent.test.tsx \
  src/projects/staggered-text/StaggeredTextProject.tsx \
  src/projects/staggered-text/StaggeredTextProject.module.css \
  src/projects/staggered-text/StaggeredTextProject.test.tsx \
  docs/superpowers/plans/2026-03-24-staggered-text.md
git commit -m "feat: add staggered text project"
```
