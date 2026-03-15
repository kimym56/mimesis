# Project Tech Docs Design

**Goal:** Add two deep technical reference documents that explain how the `iOS Page Curl` and `Wiper Typography` portfolio projects are implemented for future self-study as a design engineer.

## Scope

- Create `docs/projects/ios-curl-animation-tech.md` as a deep implementation walkthrough of the page curl project.
- Create `docs/projects/wiper-typography-tech.md` as a deep implementation walkthrough of the wiper typography project.
- Ground both documents in the current source code and file structure instead of describing aspirational behavior.
- Focus on architecture, rendering flow, state flow, math, interaction handling, and current limitations.

## Document Design

- Write one document per project rather than a combined comparison note.
  - `iOS Page Curl` has two rendering implementations that need room for a 2D pipeline section and a 3D shader pipeline section.
  - `Wiper Typography` is a separate simulation system with different terminology, data flow, and constraints.
- Organize each document from high-level to concrete:
  - project intent
  - tech stack
  - file map
  - runtime architecture
  - implementation walkthrough
  - interaction model
  - constraints and future improvements
- Keep the tone technical and explanatory rather than promotional.

## Source Files To Cover

- `src/data/projects.ts`
- `src/projects/page-curl/PageCurlProject.tsx`
- `src/projects/page-curl/PageCurlEmbed.tsx`
- `src/projects/page-curl/PageCurlEmbed3D.tsx`
- `src/projects/wiper-typography/WiperTypographyProject.tsx`
- `src/projects/wiper-typography/wiperMath.ts`
- `src/projects/wiper-typography/wiperMath.test.ts`

## Verification

- Confirm the new Markdown files are present in `docs/projects/`.
- Run repository verification commands after writing them to ensure the docs do not introduce unrelated issues.
