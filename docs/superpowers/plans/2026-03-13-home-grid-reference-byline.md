# Home Grid Reference Byline Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add an optional inline `@name` attribution beside each project title in the home page grid.

**Architecture:** Keep the change inside the existing home grid component. Update the existing rendering test for the card metadata and implement the smallest UI and CSS update needed to show optional plain-text attribution inline with the title when project metadata includes a reference user. The author text should remain plain text because each project card is already wrapped by a single link.

**Tech Stack:** Next.js 16, React 19, TypeScript, Vitest, CSS Modules

---

## Chunk 1: Home Grid Attribution

### Task 1: Update the grid rendering test

**Files:**
- Modify: `src/components/ProjectGrid.test.tsx`
- Test: `src/components/ProjectGrid.test.tsx`

- [ ] **Step 1: Write the failing test**

```tsx
it("renders inline author metadata only for projects with reference users", () => {
  // Render ProjectGrid with one project that has referenceUser
  // and one project that does not.
  // Expect the markup to include "@Jongmin Kim"
  // and omit the old "Reference by" copy.
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- src/components/ProjectGrid.test.tsx`
Expected: FAIL because the card still renders the old stacked byline copy.

### Task 2: Implement the inline title row

**Files:**
- Modify: `src/components/ProjectGrid.tsx`
- Modify: `src/components/ProjectGrid.module.css`
- Test: `src/components/ProjectGrid.test.tsx`

- [ ] **Step 3: Write minimal implementation**

```tsx
<div className={styles.titleRow}>
  <h3 className={styles.title}>{project.title}</h3>
  {project.referenceUser && (
    <p className={styles.referenceByline}>@{project.referenceUser.name}</p>
  )}
</div>
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- src/components/ProjectGrid.test.tsx`
Expected: PASS

- [ ] **Step 5: Run broader verification**

Run: `npm test`
Expected: PASS with no regressions
