# Semantic Radius Scale Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a semantic radius token layer and migrate the first set of rounded controls and frame surfaces so the portfolio uses a consistent intent-based roundness scale.

**Architecture:** Keep the current primitive radius tokens as the numeric foundation in `tokens.css`, then add semantic aliases that express design intent. Migrate only the first obvious surfaces and controls in this pass, and lock the contract with a source-level Vitest file that reads the CSS modules directly and verifies semantic token usage.

**Tech Stack:** Next.js 16, React 19, TypeScript, CSS Modules, Vitest, ESLint.

---

## Chunk 1: Lock The Semantic Radius Contract

### Task 1: Add a failing regression test for the semantic radius scale

**Files:**
- Create: `src/styles/radiusScale.test.ts`

- [ ] **Step 1: Write the failing test**

```ts
it("defines semantic radius aliases and uses them in the first migration pass", () => {
  expect(tokensCss).toContain("--radius-soft: var(--radius-lg);");
  expect(readSelectorBlock(wiperCss, ".modeToggle")).toContain(
    "border-radius: var(--radius-soft);",
  );
  expect(readSelectorBlock(themeToggleCss, ".toggle")).toContain(
    "border-radius: var(--radius-pill);",
  );
});
```

Also assert:
- `--radius-subtle`, `--radius-prominent`, and `--radius-pill` exist in `tokens.css`
- the three top project toggles use `--radius-soft`
- standard project frame surfaces use `--radius-soft`
- intentional pill/circle controls use `--radius-pill`

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- src/styles/radiusScale.test.ts`
Expected: FAIL because the semantic aliases do not exist yet and the migrated selectors still use raw radius tokens.

## Chunk 2: Add Semantic Tokens And Migrate First-Pass Components

### Task 2: Add the semantic aliases in the design tokens

**Files:**
- Modify: `src/styles/tokens.css`

- [ ] **Step 1: Write the minimal implementation**

Add:

```css
--radius-subtle: var(--radius-md);
--radius-soft: var(--radius-lg);
--radius-prominent: var(--radius-xl);
--radius-pill: var(--radius-full);
```

- [ ] **Step 2: Run the radius test to verify the token assertions pass or move closer to green**

Run: `npm test -- src/styles/radiusScale.test.ts`
Expected: still FAIL until the component selectors are migrated.

### Task 3: Migrate the first-pass controls and surfaces to semantic radius tokens

**Files:**
- Modify: `src/projects/wiper-typography/WiperTypographyProject.module.css`
- Modify: `src/projects/page-curl/PageCurlProject.module.css`
- Modify: `src/projects/bw-circle/BwCircleProject.module.css`
- Modify: `src/app/project/[id]/ProjectDetail.module.css`
- Modify: `src/components/ThemeToggle.module.css`

- [ ] **Step 1: Write the minimal implementation**

Apply these intent-based mappings:
- top project mode toggles -> `var(--radius-soft)`
- standard frame surfaces -> `var(--radius-soft)`
- larger grouped/showcase surfaces -> `var(--radius-prominent)` where intentionally more rounded
- intentional pill/circle controls -> `var(--radius-pill)`

- [ ] **Step 2: Run the focused radius test to verify it passes**

Run: `npm test -- src/styles/radiusScale.test.ts`
Expected: PASS

## Chunk 3: Run Focused Verification

### Task 4: Verify the migration without changing behavior

**Files:**
- Create: `src/styles/radiusScale.test.ts`
- Modify: `src/styles/tokens.css`
- Modify: `src/projects/wiper-typography/WiperTypographyProject.module.css`
- Modify: `src/projects/page-curl/PageCurlProject.module.css`
- Modify: `src/projects/bw-circle/BwCircleProject.module.css`
- Modify: `src/app/project/[id]/ProjectDetail.module.css`
- Modify: `src/components/ThemeToggle.module.css`

- [ ] **Step 1: Run focused tests**

Run: `npm test -- src/styles/radiusScale.test.ts src/projects/wiper-typography/WiperTypographyProject.test.tsx src/projects/bw-circle/BwCircleProject.test.tsx`
Expected: PASS

- [ ] **Step 2: Run lint**

Run: `npm run lint`
Expected: PASS

- [ ] **Step 3: Run production build**

Run: `npm run build`
Expected: PASS
