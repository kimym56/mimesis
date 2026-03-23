# Black & White Circle BPM Debug Cleanup Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remove temporary BPM console diagnostics and bridge diagnostic plumbing without changing the current analyzer behavior.

**Architecture:** Keep the bridge responsible only for rounded BPM publishing and lifecycle cleanup. Keep the scene responsible only for creating the bridge and publishing BPM to project state, with no debug logging side channel.

**Tech Stack:** React 19, TypeScript, Web Audio API, Vitest, ESLint.

---

## Chunk 1: Remove Debug Expectations

### Task 1: Update tests to remove debug-only assertions

**Files:**
- Modify: `src/projects/bw-circle/BwCircleScene.test.tsx`
- Modify: `src/projects/bw-circle/bwCircleRealtimeBpm.test.ts`

- [ ] **Step 1: Write the failing test changes**

Remove:
- `console.info` spying and assertions in `BwCircleScene.test.tsx`
- `onDiagnosticEvent` callback assertions in `bwCircleRealtimeBpm.test.ts`

- [ ] **Step 2: Run tests to verify they fail**

Run: `npm test -- src/projects/bw-circle/BwCircleScene.test.tsx src/projects/bw-circle/bwCircleRealtimeBpm.test.ts`
Expected: FAIL because the runtime still includes the debug-only behavior being removed from the test contract.

- [ ] **Step 3: Write minimal implementation**

Remove:
- `logBwCircleBpmDiagnostic` and related `console.info` usage from `BwCircleScene.tsx`
- `BwCircleRealtimeBpmDiagnosticEvent` and `onDiagnosticEvent` handling from `bwCircleRealtimeBpm.ts`

- [ ] **Step 4: Run tests to verify they pass**

Run: `npm test -- src/projects/bw-circle/BwCircleScene.test.tsx src/projects/bw-circle/bwCircleRealtimeBpm.test.ts`
Expected: PASS

## Chunk 2: Regression Verification

### Task 2: Verify focused bw-circle behavior

**Files:**
- Modify: `src/projects/bw-circle/BwCircleScene.tsx`
- Modify: `src/projects/bw-circle/BwCircleScene.test.tsx`
- Modify: `src/projects/bw-circle/bwCircleRealtimeBpm.ts`
- Modify: `src/projects/bw-circle/bwCircleRealtimeBpm.test.ts`

- [ ] **Step 1: Run focused tests**

Run: `npm test -- src/projects/bw-circle/bwCircleRealtimeBpm.test.ts src/projects/bw-circle/BwCircleScene.test.tsx src/projects/bw-circle/BwCircleProjectPlayback.test.tsx src/projects/bw-circle/BwCircleYouTubePanel.test.tsx`
Expected: PASS

- [ ] **Step 2: Run lint**

Run: `npm run lint -- src/projects/bw-circle/bwCircleRealtimeBpm.ts src/projects/bw-circle/bwCircleRealtimeBpm.test.ts src/projects/bw-circle/BwCircleScene.tsx src/projects/bw-circle/BwCircleScene.test.tsx`
Expected: PASS
