# Bw Circle Sync Performance Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reduce Sync lag by lowering render cost during active audio capture and removing temporary BPM debug overhead.

**Architecture:** Add a Sync-only performance mode to the black-white-circle simulation helpers so particle density and canvas backing resolution are reduced only while Sync capture is active. Simplify the realtime BPM bridge and scene by removing the temporary debug logging/listener path.

**Tech Stack:** React 19, Next.js 16, TypeScript, Vitest, Web Audio API, Canvas 2D

---

## Chunk 1: Pure Performance Profile

### Task 1: Define Sync-only render cost reductions

**Files:**
- Modify: `src/projects/bw-circle/bwCircleSimulation.ts`
- Test: `src/projects/bw-circle/bwCircleSimulation.test.ts`

- [ ] **Step 1: Write failing tests**
- [ ] **Step 2: Run `npm test -- src/projects/bw-circle/bwCircleSimulation.test.ts` and confirm failure**
- [ ] **Step 3: Add a pure Sync performance mode for particle density and render pixel ratio**
- [ ] **Step 4: Re-run `npm test -- src/projects/bw-circle/bwCircleSimulation.test.ts` and confirm pass**

## Chunk 2: Scene Wiring

### Task 2: Apply the lighter profile only during active Sync capture

**Files:**
- Modify: `src/projects/bw-circle/BwCircleScene.tsx`
- Test: `src/projects/bw-circle/BwCircleScene.test.tsx`

- [ ] **Step 1: Write failing test for capped canvas ratio during active Sync capture**
- [ ] **Step 2: Run `npm test -- src/projects/bw-circle/BwCircleScene.test.tsx` and confirm failure**
- [ ] **Step 3: Recreate scene state/backing resolution when the Sync performance profile changes**
- [ ] **Step 4: Re-run `npm test -- src/projects/bw-circle/BwCircleScene.test.tsx` and confirm pass**

## Chunk 3: Remove Debug Path

### Task 3: Strip temporary BPM debug logging

**Files:**
- Modify: `src/projects/bw-circle/bwCircleRealtimeBpm.ts`
- Modify: `src/projects/bw-circle/BwCircleScene.tsx`
- Test: `src/projects/bw-circle/bwCircleRealtimeBpm.test.ts`

- [ ] **Step 1: Write failing test updates for the simplified BPM bridge**
- [ ] **Step 2: Run `npm test -- src/projects/bw-circle/bwCircleRealtimeBpm.test.ts` and confirm failure**
- [ ] **Step 3: Remove debug listeners/logging while preserving BPM publishing**
- [ ] **Step 4: Re-run `npm test -- src/projects/bw-circle/bwCircleRealtimeBpm.test.ts` and confirm pass**

## Chunk 4: Verification

### Task 4: Focused verification

**Files:**
- Test: `src/projects/bw-circle/BwCircleProjectPlayback.test.tsx`
- Test: `src/projects/bw-circle/BwCircleYouTubePanel.test.tsx`

- [ ] **Step 1: Run `npm test -- src/projects/bw-circle/bwCircleSimulation.test.ts src/projects/bw-circle/bwCircleRealtimeBpm.test.ts src/projects/bw-circle/BwCircleScene.test.tsx src/projects/bw-circle/BwCircleProjectPlayback.test.tsx src/projects/bw-circle/BwCircleYouTubePanel.test.tsx`**
- [ ] **Step 2: Run `npm run lint -- src/projects/bw-circle/bwCircleSimulation.ts src/projects/bw-circle/BwCircleScene.tsx src/projects/bw-circle/bwCircleRealtimeBpm.ts src/projects/bw-circle/bwCircleSimulation.test.ts src/projects/bw-circle/BwCircleScene.test.tsx src/projects/bw-circle/bwCircleRealtimeBpm.test.ts`**
- [ ] **Step 3: Run `npm run build`**
