# Staggered Text X Embed Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the `staggered-text` reference card with an official embedded X post while preserving the existing fallback card and keeping Threads embeds unchanged.

**Architecture:** Add a dedicated client embed component for the Rauno Freiberg X post and call it only from the `staggered-text` branch in `ProjectReferenceContent`. Keep the existing preview-card markup as fallback content so the pane still renders useful reference UI before hydration or when X widgets fail.

**Tech Stack:** Next.js App Router, React 19 client components, TypeScript, CSS Modules, Vitest with jsdom

---

## Chunk 1: Lock The Embed Behavior With Tests

### Task 1: Add failing tests for the hardcoded X embed path

**Files:**
- Modify: `src/app/project/[id]/ProjectReferenceContent.test.tsx`
- Create: `src/app/project/[id]/XPostReferenceEmbed.test.tsx`

- [ ] **Step 1: Write the failing routing test**

In `src/app/project/[id]/ProjectReferenceContent.test.tsx`, change the `staggered-text` assertion so it expects the X embed branch rather than the generic card-only branch. Assert that rendering `ProjectReferenceContent` for `staggered-text` includes the X post blockquote marker and still does not render an iframe.

- [ ] **Step 2: Write the failing embed component test**

Create `src/app/project/[id]/XPostReferenceEmbed.test.tsx` and assert that:
- the component renders the official X blockquote markup for the Rauno post,
- it injects `https://platform.twitter.com/widgets.js`,
- it only injects the script once across rerenders,
- fallback content remains visible when `window.twttr` is unavailable.

- [ ] **Step 3: Run tests to verify they fail**

Run: `npm test -- 'src/app/project/[id]/ProjectReferenceContent.test.tsx' 'src/app/project/[id]/XPostReferenceEmbed.test.tsx'`

Expected: FAIL because the X embed component and the `staggered-text` routing branch do not exist yet.

## Chunk 2: Implement The Dedicated X Embed

### Task 2: Add the client embed component and wire it into the reference pane

**Files:**
- Create: `src/app/project/[id]/XPostReferenceEmbed.tsx`
- Modify: `src/app/project/[id]/ProjectReferenceContent.tsx`

- [ ] **Step 4: Write the minimal X embed component**

In `src/app/project/[id]/XPostReferenceEmbed.tsx`:
- create a client component,
- accept `fallback` content and the target X URL,
- render the official blockquote markup for the Rauno Freiberg post,
- ensure `https://platform.twitter.com/widgets.js` is loaded at most once,
- call `window.twttr.widgets.load()` after mount when the script is ready,
- preserve the fallback card if the widget API never becomes available.

- [ ] **Step 5: Route only `staggered-text` through the X embed**

In `src/app/project/[id]/ProjectReferenceContent.tsx`:
- keep the existing preview-card helper,
- keep the Threads embed branch unchanged,
- add a new `project.id === "staggered-text"` branch that wraps the fallback card with the new X embed component,
- leave all other projects on the current behavior.

- [ ] **Step 6: Run the targeted tests to verify they pass**

Run: `npm test -- 'src/app/project/[id]/ProjectReferenceContent.test.tsx' 'src/app/project/[id]/XPostReferenceEmbed.test.tsx'`

Expected: PASS

## Chunk 3: Verify The Finished Change

### Task 3: Run regression checks

**Files:**
- Verify: `src/app/project/[id]/ProjectReferenceContent.test.tsx`
- Verify: `src/app/project/[id]/XPostReferenceEmbed.test.tsx`

- [ ] **Step 7: Run lint**

Run: `npm run lint`

Expected: PASS

- [ ] **Step 8: Run production build**

Run: `npm run build`

Expected: PASS

- [ ] **Step 9: Commit the implementation**

```bash
git add 'src/app/project/[id]/ProjectReferenceContent.tsx' \
  'src/app/project/[id]/ProjectReferenceContent.test.tsx' \
  'src/app/project/[id]/XPostReferenceEmbed.tsx' \
  'src/app/project/[id]/XPostReferenceEmbed.test.tsx' \
  docs/superpowers/plans/2026-03-24-staggered-text-x-embed.md
git commit -m "feat: embed staggered text x reference"
```
