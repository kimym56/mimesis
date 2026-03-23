# Black & White Circle BPM Diagnostics Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Narrow the bw-circle BPM detector input range and add console diagnostics so Sync-mode tempo detection can be inspected directly when tracks fail to show a BPM.

**Architecture:** Keep the BPM integration centered in `bwCircleRealtimeBpm.ts`, which will continue owning the `realtime-bpm-analyzer` wrapper and now also forward raw event payloads for diagnostics. `BwCircleScene.tsx` will remain the place that decides whether BPM should be published, and it will log both raw analyzer events and the BPM values that actually reach the UI path.

**Tech Stack:** Next.js App Router, React 19, TypeScript, Web Audio API, `realtime-bpm-analyzer`, Vitest.

---

## Chunk 1: Bridge Diagnostics

### Task 1: Add failing tests for raw BPM event diagnostics

**Files:**
- Modify: `src/projects/bw-circle/bwCircleRealtimeBpm.test.ts`
- Modify: `src/projects/bw-circle/bwCircleRealtimeBpm.ts`

- [ ] **Step 1: Write the failing test**

```ts
it("forwards raw bpm event payloads to diagnostics callbacks", async () => {
  const onRawEvent = vi.fn();

  await createBwCircleRealtimeBpmBridge({
    audioContext,
    onBpm,
    onDiagnosticEvent: onRawEvent,
    sourceNode,
  });

  analyzer.dispatchEvent(
    new CustomEvent("bpm", {
      detail: {
        bpm: [{ confidence: 0.7, count: 12, tempo: 92.4 }],
        threshold: 0.35,
      },
    }),
  );

  expect(onRawEvent).toHaveBeenCalledWith({
    bpm: [{ confidence: 0.7, count: 12, tempo: 92.4 }],
    eventType: "bpm",
    threshold: 0.35,
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- src/projects/bw-circle/bwCircleRealtimeBpm.test.ts`
Expected: FAIL because `onDiagnosticEvent` is not supported yet.

- [ ] **Step 3: Write minimal implementation**

```ts
export interface BwCircleRealtimeBpmDiagnosticEvent {
  bpm: readonly BwCircleTempoCandidate[];
  eventType: "bpm" | "bpmStable";
  threshold?: number;
}
```

Add an optional `onDiagnosticEvent` callback to the bridge input and invoke it from the shared analyzer event handler before rounding the top tempo.

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- src/projects/bw-circle/bwCircleRealtimeBpm.test.ts`
Expected: PASS

## Chunk 2: Tuning And Scene Logging

### Task 2: Lower the BPM bridge low-pass cutoff

**Files:**
- Modify: `src/projects/bw-circle/bwCircleRealtimeBpm.ts`
- Test: `src/projects/bw-circle/bwCircleRealtimeBpm.test.ts`

- [ ] **Step 1: Write the failing test**

Update the bridge setup assertion so the filter frequency expectation matches the new lower cutoff value.

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- src/projects/bw-circle/bwCircleRealtimeBpm.test.ts`
Expected: FAIL because the bridge still requests the old cutoff frequency.

- [ ] **Step 3: Write minimal implementation**

Lower the `LOWPASS_FILTER_OPTIONS.frequencyValue` constant in `bwCircleRealtimeBpm.ts` to the approved narrower range.

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- src/projects/bw-circle/bwCircleRealtimeBpm.test.ts`
Expected: PASS

### Task 3: Log raw analyzer output and published BPM from the scene

**Files:**
- Modify: `src/projects/bw-circle/BwCircleScene.tsx`
- Modify: `src/projects/bw-circle/BwCircleScene.test.tsx`

- [ ] **Step 1: Write the failing test**

Add a focused scene test that spies on `console.info` or `console.debug`, simulates a BPM diagnostic event, and expects a structured log when Sync playback is active.

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- src/projects/bw-circle/BwCircleScene.test.tsx`
Expected: FAIL because the scene does not log BPM diagnostics yet.

- [ ] **Step 3: Write minimal implementation**

Log:
- raw analyzer events received from the bridge
- the BPM value that passes the playback/active-sync guard and gets published

Keep logs structured and scoped under a consistent prefix such as `[bw-circle][bpm]`.

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- src/projects/bw-circle/BwCircleScene.test.tsx`
Expected: PASS

### Task 4: Run focused regression checks

**Files:**
- Modify: `src/projects/bw-circle/bwCircleRealtimeBpm.ts`
- Modify: `src/projects/bw-circle/bwCircleRealtimeBpm.test.ts`
- Modify: `src/projects/bw-circle/BwCircleScene.tsx`
- Modify: `src/projects/bw-circle/BwCircleScene.test.tsx`

- [ ] **Step 1: Run focused tests**

Run: `npm test -- src/projects/bw-circle/bwCircleRealtimeBpm.test.ts src/projects/bw-circle/BwCircleScene.test.tsx src/projects/bw-circle/BwCircleProjectPlayback.test.tsx src/projects/bw-circle/BwCircleYouTubePanel.test.tsx`
Expected: PASS

- [ ] **Step 2: Run lint on changed files**

Run: `npm run lint -- src/projects/bw-circle/bwCircleRealtimeBpm.ts src/projects/bw-circle/bwCircleRealtimeBpm.test.ts src/projects/bw-circle/BwCircleScene.tsx src/projects/bw-circle/BwCircleScene.test.tsx`
Expected: PASS
