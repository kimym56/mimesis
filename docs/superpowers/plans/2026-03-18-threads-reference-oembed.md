# Threads Reference OEmbed Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Render the official Threads embed for the black-white-circle reference while keeping the current preview card as a fallback.

**Architecture:** Keep `ProjectReferenceContent` as the reference switchboard, add a small client-only Threads embed enhancer that fetches oEmbed HTML and loads the official embed script, and preserve the current preview card as the default/fallback UI. The project data remains the source of truth for the Threads URL and fallback metadata.

**Tech Stack:** Next.js 16, React 19, TypeScript, CSS Modules, Vitest

---

## Chunk 1: Data Model And Tests

### Task 1: Add failing tests for Threads embed metadata and fallback behavior

**Files:**
- Modify: `src/data/projects.test.ts`
- Modify: `src/app/project/[id]/ProjectReferenceContent.test.tsx`

- [ ] **Step 1: Write the failing data-layer assertion**

Add an assertion that the `black-white-circle` project exposes enough Threads metadata to request an official embed.

- [ ] **Step 2: Run the focused test to verify it fails**

Run: `npm test -- src/data/projects.test.ts`
Expected: FAIL because the embed metadata is not present yet.

- [ ] **Step 3: Add the failing reference-render assertions**

Add tests that:
- static render still includes the fallback Threads card copy
- the client embed component requests the expected `graph.threads.net/oembed` URL
- a failed fetch leaves the fallback card visible

- [ ] **Step 4: Run the focused reference test to verify it fails**

Run: `npm test -- 'src/app/project/[id]/ProjectReferenceContent.test.tsx'`
Expected: FAIL because no Threads embed component exists yet.

- [ ] **Step 5: Commit**

```bash
git add src/data/projects.test.ts 'src/app/project/[id]/ProjectReferenceContent.test.tsx'
git commit -m "test: cover threads oembed fallback"
```

## Chunk 2: Threads Embed Implementation

### Task 2: Add the official Threads embed component

**Files:**
- Create: `src/app/project/[id]/ThreadsReferenceEmbed.tsx`
- Modify: `src/app/project/[id]/ProjectReferenceContent.tsx`
- Modify: `src/data/projects.ts`

- [ ] **Step 1: Write the minimal component contract**

Create a small client component that accepts:

```ts
type ThreadsReferenceEmbedProps = {
  url: string;
  fallback: React.ReactNode;
};
```

- [ ] **Step 2: Implement the oEmbed fetch path**

Fetch:

```ts
const oembedUrl = `https://graph.threads.net/oembed?url=${encodeURIComponent(url)}`;
```

Store `html` when present; otherwise keep fallback rendering.

- [ ] **Step 3: Load the official Threads embed script explicitly**

Append or ensure a single `https://www.threads.com/embed.js` script load from the client component after the oEmbed blockquote is mounted.

- [ ] **Step 4: Wire the reference renderer**

Use the Threads embed component only when:
- `project.referencePreview?.platform === "threads"`
- the project has opted into Threads embedding

Otherwise keep the existing preview/iframe/image fallbacks unchanged.

- [ ] **Step 5: Run focused tests to verify they pass**

Run:
- `npm test -- src/data/projects.test.ts`
- `npm test -- 'src/app/project/[id]/ProjectReferenceContent.test.tsx'`

- [ ] **Step 6: Commit**

```bash
git add src/data/projects.ts 'src/app/project/[id]/ProjectReferenceContent.tsx' 'src/app/project/[id]/ThreadsReferenceEmbed.tsx' src/data/projects.test.ts 'src/app/project/[id]/ProjectReferenceContent.test.tsx'
git commit -m "feat: add threads reference oembed"
```

## Chunk 3: Verification

### Task 3: Validate the touched paths

**Files:**
- Verify only

- [ ] **Step 1: Run the focused suite**

Run:
- `npm test -- src/data/projects.test.ts 'src/app/project/[id]/ProjectReferenceContent.test.tsx'`

Expected: PASS.

- [ ] **Step 2: Run lint**

Run: `npm run lint`
Expected: PASS or only unrelated pre-existing failures.

- [ ] **Step 3: Summarize residual risk**

Note that actual Threads rendering depends on Meta’s live embed script and oEmbed response format, so the fallback card remains the safety net even if tests pass.
