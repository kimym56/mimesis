# Project Grid Media Preview Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add continuous autoplay mixed-media previews to homepage project grid cards while preserving image fallback behavior and current card layout.

**Architecture:** Extend `Project` metadata with optional preview media, then update `ProjectGrid` to conditionally render a video element when media metadata exists. Keep static image rendering as fallback and disable autoplay path for reduced-motion users.

**Tech Stack:** Next.js App Router, React client components, TypeScript, CSS Modules, Framer Motion.

---

## Chunk 1: Data model and rendering path

### Task 1: Extend project preview metadata types

**Files:**
- Modify: `src/data/projects.ts`

- [ ] Step 1: Add `ProjectPreviewMediaSource` type with `src` and MIME `type`.
- [ ] Step 2: Add `ProjectPreviewMedia` type with `type: "video"`, `poster`, and `sources`.
- [ ] Step 3: Add optional `previewMedia?: ProjectPreviewMedia` to `Project` interface.
- [ ] Step 4: Add `previewMedia` data for at least one interactive project card.

### Task 2: Update grid card renderer for mixed media

**Files:**
- Modify: `src/components/ProjectGrid.tsx`

- [ ] Step 1: Add a small render branch for `project.previewMedia`.
- [ ] Step 2: Render `<video>` with `autoPlay loop muted playsInline preload="metadata"` and `poster`.
- [ ] Step 3: Render `<source>` children from `previewMedia.sources`.
- [ ] Step 4: Preserve `next/image` rendering for projects without preview media.
- [ ] Step 5: Respect `useReducedMotion` by using static image path when reduced motion is preferred.

## Chunk 2: Styling and verification

### Task 3: Normalize media styling for image and video

**Files:**
- Modify: `src/components/ProjectGrid.module.css`

- [ ] Step 1: Introduce a shared `.media` rule for object fit and sizing.
- [ ] Step 2: Point image rendering to `.media` class.
- [ ] Step 3: Add video-specific hooks only if needed for display consistency.

### Task 4: Verify behavior and guard regressions

**Files:**
- Verify: `src/data/projects.ts`
- Verify: `src/components/ProjectGrid.tsx`
- Verify: `src/components/ProjectGrid.module.css`

- [ ] Step 1: Run repo lint command and resolve any violations.
- [ ] Step 2: Run build to validate TypeScript and Next.js integration.
- [ ] Step 3: Manually verify one autoplay video card and one image fallback card on homepage.
- [ ] Step 4: Confirm reduced-motion path remains non-animated.
