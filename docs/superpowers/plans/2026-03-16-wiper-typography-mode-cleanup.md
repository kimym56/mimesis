# Wiper Typography Mode Cleanup Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remove the deprecated `3D Wiper Bars` and `3D Glyph Field` modes from `wiper typography`, delete their unused scene modules, and align tests and current-state docs with the reduced mode set.

**Architecture:** Keep the existing `wiper typography` project shell, but reduce its mode contract to `2d` and `3d-stage`. Delete the two unreferenced scene modules after tests are updated to prevent stale imports, and keep historical dated specs/plans unchanged so only current-state materials reflect the new product surface.

**Tech Stack:** Next.js App Router, React 19, TypeScript, React Three Fiber, Three.js, Vitest, JSDOM, ESLint.

**Spec:** [`docs/superpowers/specs/2026-03-16-wiper-typography-mode-cleanup-design.md`](/Users/yongminkim/Development/Portfolio/mimesis/.worktrees/remove-wiper-3d-modes/docs/superpowers/specs/2026-03-16-wiper-typography-mode-cleanup-design.md)

---

## File Structure

- Modify: [`src/projects/wiper-typography/WiperTypographyModeToggle.tsx`](/Users/yongminkim/Development/Portfolio/mimesis/.worktrees/remove-wiper-3d-modes/src/projects/wiper-typography/WiperTypographyModeToggle.tsx)  
  Remove the deprecated mode ids from the toggle contract and rendered buttons.
- Modify: [`src/projects/wiper-typography/WiperTypographyProject.tsx`](/Users/yongminkim/Development/Portfolio/mimesis/.worktrees/remove-wiper-3d-modes/src/projects/wiper-typography/WiperTypographyProject.tsx)  
  Remove dead scene imports and shrink the mode map.
- Modify: [`src/projects/wiper-typography/WiperTypographyProject.test.tsx`](/Users/yongminkim/Development/Portfolio/mimesis/.worktrees/remove-wiper-3d-modes/src/projects/wiper-typography/WiperTypographyProject.test.tsx)  
  Drive the mode-contract change with a failing test.
- Modify: [`src/projects/wiper-typography/WiperTypographyScene3DGlyphWiring.test.tsx`](/Users/yongminkim/Development/Portfolio/mimesis/.worktrees/remove-wiper-3d-modes/src/projects/wiper-typography/WiperTypographyScene3DGlyphWiring.test.tsx)  
  Keep coverage on the remaining stage scene and shared extruded glyph usage.
- Delete: [`src/projects/wiper-typography/WiperTypographySceneBars3D.tsx`](/Users/yongminkim/Development/Portfolio/mimesis/.worktrees/remove-wiper-3d-modes/src/projects/wiper-typography/WiperTypographySceneBars3D.tsx)
- Delete: [`src/projects/wiper-typography/WiperTypographySceneGlyphField3D.tsx`](/Users/yongminkim/Development/Portfolio/mimesis/.worktrees/remove-wiper-3d-modes/src/projects/wiper-typography/WiperTypographySceneGlyphField3D.tsx)
- Modify: current-state docs discovered during search  
  Remove descriptions that imply all four modes still exist.

## Chunk 1: Mode Contract And Tests

### Task 1: Reduce the public mode contract with a failing test first

**Files:**
- Modify: [`src/projects/wiper-typography/WiperTypographyProject.test.tsx`](/Users/yongminkim/Development/Portfolio/mimesis/.worktrees/remove-wiper-3d-modes/src/projects/wiper-typography/WiperTypographyProject.test.tsx)
- Modify: [`src/projects/wiper-typography/WiperTypographyModeToggle.tsx`](/Users/yongminkim/Development/Portfolio/mimesis/.worktrees/remove-wiper-3d-modes/src/projects/wiper-typography/WiperTypographyModeToggle.tsx)
- Modify: [`src/projects/wiper-typography/WiperTypographyProject.tsx`](/Users/yongminkim/Development/Portfolio/mimesis/.worktrees/remove-wiper-3d-modes/src/projects/wiper-typography/WiperTypographyProject.tsx)

- [ ] **Step 1: Write the failing test**

```tsx
it("renders only the supported wiper modes and switches to 3d stage", () => {
  root.render(<WiperTypographyProject projectId="wiper-typography" />);

  expect(container.textContent).toContain("2D Canvas");
  expect(container.textContent).toContain("3D Stage");
  expect(container.textContent).not.toContain("3D Wiper Bars");
  expect(container.textContent).not.toContain("3D Glyph Field");
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- src/projects/wiper-typography/WiperTypographyProject.test.tsx`  
Expected: `FAIL` because the old mode labels are still rendered.

- [ ] **Step 3: Write minimal implementation**

Remove:
- the `3d-bars` and `3d-glyphs` members from `WiperRenderMode`
- their entries from `MODE_OPTIONS`
- their imports and entries from `MODE_COMPONENTS`

Keep the default mode at `2d`.

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- src/projects/wiper-typography/WiperTypographyProject.test.tsx`  
Expected: `PASS`

## Chunk 2: Delete Removed Scenes And Repair Wiring

### Task 2: Update remaining 3D wiring coverage, then delete the obsolete scenes

**Files:**
- Modify: [`src/projects/wiper-typography/WiperTypographyScene3DGlyphWiring.test.tsx`](/Users/yongminkim/Development/Portfolio/mimesis/.worktrees/remove-wiper-3d-modes/src/projects/wiper-typography/WiperTypographyScene3DGlyphWiring.test.tsx)
- Delete: [`src/projects/wiper-typography/WiperTypographySceneBars3D.tsx`](/Users/yongminkim/Development/Portfolio/mimesis/.worktrees/remove-wiper-3d-modes/src/projects/wiper-typography/WiperTypographySceneBars3D.tsx)
- Delete: [`src/projects/wiper-typography/WiperTypographySceneGlyphField3D.tsx`](/Users/yongminkim/Development/Portfolio/mimesis/.worktrees/remove-wiper-3d-modes/src/projects/wiper-typography/WiperTypographySceneGlyphField3D.tsx)

- [ ] **Step 1: Write the failing test**

```tsx
it("renders the shared extruded glyph component in the remaining 3d stage mode", () => {
  root.render(<WiperTypographySceneStage3D projectId="wiper-typography" />);
  expect(mockedExtrudedGlyph).toHaveBeenCalled();
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- src/projects/wiper-typography/WiperTypographyScene3DGlyphWiring.test.tsx`  
Expected: `FAIL` until the test stops importing deleted scenes and only targets `WiperTypographySceneStage3D`.

- [ ] **Step 3: Write minimal implementation**

Update the wiring test so it only imports the remaining scene and verifies its scale prop, then delete the obsolete scene files.

- [ ] **Step 4: Run focused verification**

Run: `npm test -- src/projects/wiper-typography/WiperTypographyProject.test.tsx src/projects/wiper-typography/WiperTypographyScene3DGlyphWiring.test.tsx`  
Expected: `PASS`

## Chunk 3: Current-State Docs And Final Verification

### Task 3: Align current-state docs and verify the branch

**Files:**
- Modify: docs found by `rg` that describe the current active mode set

- [ ] **Step 1: Update docs**

Remove or rewrite any current-state wording that still implies the two deleted modes are active. Leave dated historical specs/plans unchanged.

- [ ] **Step 2: Run full verification**

Run: `npm test`  
Expected: `PASS`

Run: `npm run lint`  
Expected: `PASS`
