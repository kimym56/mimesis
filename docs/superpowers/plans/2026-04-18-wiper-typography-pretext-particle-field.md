# Wiper Typography Pretext Particle Field Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the `Pretext SVG` mode so it visually matches the sparse 2D canvas glyph field while still using `@chenglou/pretext/rich-inline` to reroute characters around the centered wiper.

**Architecture:** Keep the current shell and wiper geometry, but replace the dense row-ish field with a sparse particle-shaped slot field. Use a small motion helper for deterministic per-character fall offsets, keep text fully opaque, and let `pretext` decide which routed characters remain valid around the blade.

**Tech Stack:** Next.js App Router, React 19, TypeScript, SVG, `@chenglou/pretext/rich-inline`, Vitest, JSDOM, ESLint.

**Spec:** `docs/superpowers/specs/2026-04-18-wiper-typography-pretext-particle-field-design.md`

---

## File Structure

- Modify: `src/projects/wiper-typography/WiperTypographyPretextSvg.tsx`
- Modify: `src/projects/wiper-typography/WiperTypographyPretextSvg.test.tsx`
- Modify: `src/projects/wiper-typography/WiperTypographyProject.module.css`
- Create: `src/projects/wiper-typography/wiperPretextFragmentMotion.ts`
- Create: `src/projects/wiper-typography/wiperPretextFragmentMotion.test.ts`
- Modify: `src/projects/wiper-typography/wiperPretextRichInlineRain.ts`
- Modify: `src/projects/wiper-typography/wiperPretextRichInlineRain.test.ts` only if helper contracts change
- Keep: `src/projects/wiper-typography/wiperPretextWiperGeometry.ts`

## Chunk 1: Sparse Character Motion

### Task 1: Drive per-character motion with failing tests first

**Files:**
- Create: `src/projects/wiper-typography/wiperPretextFragmentMotion.ts`
- Create: `src/projects/wiper-typography/wiperPretextFragmentMotion.test.ts`

- [ ] **Step 1: Write failing tests for deterministic neighboring offsets and reduced-motion drift**
- [ ] **Step 2: Run `npm test -- src/projects/wiper-typography/wiperPretextFragmentMotion.test.ts` and verify failure**
- [ ] **Step 3: Implement the minimal deterministic motion helper**
- [ ] **Step 4: Re-run the focused motion test and verify pass**

## Chunk 2: Renderer Alignment With 2D Canvas Shape

### Task 2: Rewrite the renderer tests around sparse particle-shaped output

**Files:**
- Modify: `src/projects/wiper-typography/WiperTypographyPretextSvg.test.tsx`
- Modify: `src/projects/wiper-typography/WiperTypographyPretextSvg.tsx`
- Modify: `src/projects/wiper-typography/WiperTypographyProject.module.css`

- [ ] **Step 1: Write failing component expectations for no opacity variation and per-character `y` separation**
- [ ] **Step 2: Run `npm test -- src/projects/wiper-typography/WiperTypographyPretextSvg.test.tsx` and verify failure**
- [ ] **Step 3: Implement the sparse slot field, reduce density, and keep the no-tip-bar wiper**
- [ ] **Step 4: Re-run the focused component test and verify pass**

## Chunk 3: Verification

### Task 3: Run focused verification

**Files:**
- No new files beyond the updated implementation set

- [ ] **Step 1: Run `npm test -- src/projects/wiper-typography/WiperTypographyProject.test.tsx src/projects/wiper-typography/WiperTypographyPretextSvg.test.tsx src/projects/wiper-typography/wiperPretextFragmentMotion.test.ts src/projects/wiper-typography/wiperPretextRichInlineRain.test.ts src/projects/wiper-typography/wiperPretextWiperGeometry.test.ts`**
- [ ] **Step 2: Run targeted ESLint on the touched wiper TypeScript files**
- [ ] **Step 3: Summarize any remaining repo-wide baseline failures separately from the feature verification**
