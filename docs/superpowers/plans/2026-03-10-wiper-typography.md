# Wiper Typography Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add `wiper typography` as the second interactive project and refactor project-specific interactive logic into isolated feature folders.

**Architecture:** Route and detail shell stay generic. Interactive implementations move into `src/projects/<feature>` and are resolved through a registry keyed by `interactiveDemo` with lazy-loaded components.

**Tech Stack:** Next.js App Router, React client components, TypeScript, Canvas 2D, ESLint.

---

### Task 1: Create project renderer boundaries

**Files:**
- Create: `src/projects/registry.ts`
- Create: `src/projects/types.ts`
- Modify: `src/app/project/[id]/ProjectDetailClient.tsx`

- [ ] Step 1: Add typed interactive renderer contract.
- [ ] Step 2: Add dynamic renderer registry keyed by `interactiveDemo`.
- [ ] Step 3: Update `ProjectDetailClient` to render registry-selected component.
- [ ] Step 4: Keep static fallback when renderer is absent.

### Task 2: Move page curl implementation into dedicated folder

**Files:**
- Create: `src/projects/page-curl/PageCurlProject.tsx`
- Create: `src/projects/page-curl/PageCurlEmbed.tsx`
- Create: `src/projects/page-curl/PageCurlEmbed3D.tsx`
- Create: `src/projects/page-curl/PageCurlProject.module.css`
- Modify: `src/app/project/[id]/ProjectDetail.module.css`

- [ ] Step 1: Move page-curl files and localize style imports.
- [ ] Step 2: Extract the mode toggle UI into `PageCurlProject`.
- [ ] Step 3: Remove unused page-curl-only styles from detail stylesheet.

### Task 3: Implement wiper typography feature

**Files:**
- Create: `src/projects/wiper-typography/WiperTypographyProject.tsx`
- Create: `src/projects/wiper-typography/WiperTypographyProject.module.css`
- Create: `src/projects/wiper-typography/wiperMath.ts`
- Create: `src/projects/wiper-typography/wiperMath.test.ts`

- [ ] Step 1: Write failing tests for math helpers.
- [ ] Step 2: Implement helpers minimally to pass tests.
- [ ] Step 3: Build canvas renderer with pointer-controlled wiper.
- [ ] Step 4: Add responsive sizing and reduced-motion behavior.

### Task 4: Wire project data

**Files:**
- Modify: `src/data/projects.ts`

- [ ] Step 1: Add `interactiveDemo` field to type.
- [ ] Step 2: Replace `editorial-blog` entry with `wiper-typography` metadata.
- [ ] Step 3: Set `referenceEmbed` to provided YouTube URL.

### Task 5: Verify and clean up

**Files:**
- Modify: `package.json`

- [ ] Step 1: Add test script/harness for the new unit test.
- [ ] Step 2: Run tests, lint, and build.
- [ ] Step 3: Fix issues and ensure no route regressions.
