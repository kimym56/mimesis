# Wiper Typography Pretext Rich Inline Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the `Pretext SVG` mode so `@chenglou/pretext/rich-inline` drives character-level rain and live rerouting around a centered wiper blade.

**Architecture:** Keep the existing project shell and mode toggle, but replace the current row-based `Pretext SVG` internals with a rich-inline rain helper and a centered wiper geometry helper. The renderer should only measure the stage, animate time, ask the helpers for routed glyph positions, and paint SVG.

**Tech Stack:** Next.js App Router, React 19, TypeScript, SVG, `@chenglou/pretext/rich-inline`, Vitest, JSDOM, ESLint.

**Spec:** `docs/superpowers/specs/2026-04-17-wiper-typography-pretext-rich-inline-design.md`

---

## File Structure

- Modify: `src/projects/wiper-typography/WiperTypographyPretextSvg.tsx`
- Modify: `src/projects/wiper-typography/WiperTypographyPretextSvg.test.tsx`
- Modify: `src/projects/wiper-typography/WiperTypographyProject.module.css`
- Modify: `src/projects/wiper-typography/WiperTypographyProject.test.tsx` only if the shell contract needs minor expectation changes
- Delete: `src/projects/wiper-typography/wiperPretextLaneLayout.ts`
- Delete: `src/projects/wiper-typography/wiperPretextLaneLayout.test.ts`
- Modify: `src/projects/wiper-typography/wiperPretextWiperGeometry.ts`
- Modify: `src/projects/wiper-typography/wiperPretextWiperGeometry.test.ts`
- Create: `src/projects/wiper-typography/wiperPretextRichInlineRain.ts`
- Create: `src/projects/wiper-typography/wiperPretextRichInlineRain.test.ts`

## Chunk 1: Rich Inline Helper

### Task 1: Drive the new rich-inline rain helper with failing tests first

**Files:**
- Create: `src/projects/wiper-typography/wiperPretextRichInlineRain.test.ts`
- Create: `src/projects/wiper-typography/wiperPretextRichInlineRain.ts`
- Delete: `src/projects/wiper-typography/wiperPretextLaneLayout.ts`
- Delete: `src/projects/wiper-typography/wiperPretextLaneLayout.test.ts`

- [ ] **Step 1: Write the failing tests for cached rich-inline preparation, split-slot routing, and cursor wrap**
- [ ] **Step 2: Run `npm test -- src/projects/wiper-typography/wiperPretextRichInlineRain.test.ts` and verify failure**
- [ ] **Step 3: Implement the minimal rich-inline helper using `prepareRichInline`, `layoutNextRichInlineLineRange`, and `materializeRichInlineLineRange`**
- [ ] **Step 4: Re-run the focused helper test and verify pass**

## Chunk 2: Centered Wiper Geometry

### Task 2: Rewrite the wiper geometry around the centered pivot with failing tests first

**Files:**
- Modify: `src/projects/wiper-typography/wiperPretextWiperGeometry.test.ts`
- Modify: `src/projects/wiper-typography/wiperPretextWiperGeometry.ts`

- [ ] **Step 1: Rewrite the failing geometry tests for a centered pivot and no trailing bar assumptions**
- [ ] **Step 2: Run `npm test -- src/projects/wiper-typography/wiperPretextWiperGeometry.test.ts` and verify failure**
- [ ] **Step 3: Implement the minimal centered sweep geometry, blade hull, and slot carving**
- [ ] **Step 4: Re-run the focused geometry test and verify pass**

## Chunk 3: Renderer Rebuild

### Task 3: Rebuild the renderer behavior with failing component tests first

**Files:**
- Modify: `src/projects/wiper-typography/WiperTypographyPretextSvg.test.tsx`
- Modify: `src/projects/wiper-typography/WiperTypographyPretextSvg.tsx`
- Modify: `src/projects/wiper-typography/WiperTypographyProject.module.css`

- [ ] **Step 1: Rewrite the component tests to expect character-level SVG text, the `Pretext Layout` cue, and centered wiper geometry**
- [ ] **Step 2: Run `npm test -- src/projects/wiper-typography/WiperTypographyPretextSvg.test.tsx` and verify failure**
- [ ] **Step 3: Rebuild the renderer from zero against the new helper boundaries**
- [ ] **Step 4: Re-run the focused component test and verify pass**

## Chunk 4: Verification

### Task 4: Run focused verification

**Files:**
- No new files beyond the rebuilt implementation set

- [ ] **Step 1: Run `npm test -- src/projects/wiper-typography/WiperTypographyProject.test.tsx src/projects/wiper-typography/WiperTypographyPretextSvg.test.tsx src/projects/wiper-typography/wiperPretextRichInlineRain.test.ts src/projects/wiper-typography/wiperPretextWiperGeometry.test.ts`**
- [ ] **Step 2: Run targeted ESLint on the touched wiper TypeScript files**
- [ ] **Step 3: Summarize any remaining repo-wide baseline failures separately from the feature verification**
