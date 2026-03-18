# Wiper Typography Remove 3D Stage Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remove the live `3D Stage` mode from `wiper typography` while preserving the existing 2D canvas behavior.

**Architecture:** Simplify `WiperTypographyProject` into a single-renderer shell that always mounts `WiperTypographyCanvas2D`. Delete the unused mode toggle component and its CSS selectors, and tighten the project test so it asserts the 2D-only runtime contract.

**Tech Stack:** Next.js App Router, React 19, TypeScript, CSS Modules, Vitest, JSDOM.

**Spec:** [`docs/superpowers/specs/2026-03-17-wiper-typography-remove-3d-stage-design.md`](/Users/yongminkim/Development/Portfolio/mimesis/docs/superpowers/specs/2026-03-17-wiper-typography-remove-3d-stage-design.md)

---

## File Structure

- Modify: [`src/projects/wiper-typography/WiperTypographyProject.test.tsx`](/Users/yongminkim/Development/Portfolio/mimesis/src/projects/wiper-typography/WiperTypographyProject.test.tsx)
  Drive the shell cleanup with a failing regression test.
- Modify: [`src/projects/wiper-typography/WiperTypographyProject.tsx`](/Users/yongminkim/Development/Portfolio/mimesis/src/projects/wiper-typography/WiperTypographyProject.tsx)
  Remove mode state and render the 2D canvas directly.
- Modify: [`src/projects/wiper-typography/WiperTypographyProject.module.css`](/Users/yongminkim/Development/Portfolio/mimesis/src/projects/wiper-typography/WiperTypographyProject.module.css)
  Remove toggle-only selectors that become dead after the shell cleanup.
- Delete: [`src/projects/wiper-typography/WiperTypographyModeToggle.tsx`](/Users/yongminkim/Development/Portfolio/mimesis/src/projects/wiper-typography/WiperTypographyModeToggle.tsx)
  Remove the unused mode toggle component.

## Chunk 1: Project Shell Cleanup

### Task 1: Replace the old mode-switch test with a 2D-only failing test

**Files:**
- Modify: [`src/projects/wiper-typography/WiperTypographyProject.test.tsx`](/Users/yongminkim/Development/Portfolio/mimesis/src/projects/wiper-typography/WiperTypographyProject.test.tsx)

- [ ] **Step 1: Write the failing test**

```tsx
it("renders only the 2d canvas runtime", () => {
  root.render(<WiperTypographyProject projectId="wiper-typography" />);

  expect(container.textContent).toContain("mock-2d-canvas");
  expect(container.textContent).not.toContain("3D Stage");
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- src/projects/wiper-typography/WiperTypographyProject.test.tsx`  
Expected: `FAIL` because the current shell still renders the mode toggle and stage path.

- [ ] **Step 3: Write minimal implementation**

Update `WiperTypographyProject.tsx` to render `WiperTypographyCanvas2D` directly inside `interactivePane`, then delete `WiperTypographyModeToggle.tsx`.

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- src/projects/wiper-typography/WiperTypographyProject.test.tsx`  
Expected: `PASS`

### Task 2: Remove dead toggle styles and run final verification

**Files:**
- Modify: [`src/projects/wiper-typography/WiperTypographyProject.module.css`](/Users/yongminkim/Development/Portfolio/mimesis/src/projects/wiper-typography/WiperTypographyProject.module.css)

- [ ] **Step 1: Remove dead CSS**

Delete `.modeToggle`, `.modeButton`, and `.modeButtonActive` selectors because the runtime no longer renders them.

- [ ] **Step 2: Run focused verification**

Run: `npm test -- src/projects/wiper-typography/WiperTypographyProject.test.tsx`  
Expected: `PASS`

- [ ] **Step 3: Run full verification**

Run: `npm test`  
Expected: `PASS`

Run: `npm run lint`  
Expected: `PASS`
