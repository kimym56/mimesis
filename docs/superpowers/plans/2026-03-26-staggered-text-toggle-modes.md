# Staggered Text Toggle Modes Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a toggle that switches the staggered-text demo between a hover-triggered stage and a button-triggered stage with live editable text.

**Architecture:** Keep `StaggeredTextProject.tsx` as a small mode container that owns toggle state, timing tuning state, and the button-mode input value. Move the actual preview implementations into two separate copied components, one for hover mode and one for button mode, so each variant owns its own slot generation, refs, and WAAPI lifecycle without shared motion helpers.

**Tech Stack:** Next.js App Router, React 19, TypeScript, CSS Modules, Vitest, WAAPI, Framer Motion reduced-motion hook

---

## Chunk 1: Lock the new behavior in tests

### Task 1: Replace the single-mode test coverage with toggle-mode expectations

**Files:**
- Modify: `src/projects/staggered-text/StaggeredTextProject.test.tsx`
- Test: `src/projects/staggered-text/StaggeredTextProject.test.tsx`

- [ ] **Step 1: Write the failing test for the mode toggle and hover-mode defaults**

```tsx
it("renders hover mode by default and switches implementations with the mode toggle", () => {
  act(() => {
    root.render(<StaggeredTextProject projectId="staggered-text" />);
  });

  expect(container.querySelector('[data-implementation="hover"]')).not.toBeNull();
  expect(container.querySelector('[data-implementation="button"]')).toBeNull();
  expect(container.querySelector('input[type="text"]')).toBeNull();

  const buttonToggle = container.querySelector('[data-mode-toggle="button"]');

  act(() => {
    buttonToggle?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });

  expect(container.querySelector('[data-implementation="hover"]')).toBeNull();
  expect(container.querySelector('[data-implementation="button"]')).not.toBeNull();
  expect(container.querySelector('input[type="text"]')).not.toBeNull();
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- src/projects/staggered-text/StaggeredTextProject.test.tsx`
Expected: FAIL because the current component has no mode toggle and no separate hover/button implementations.

- [ ] **Step 3: Add a failing hover-mode interaction test**

```tsx
it("activates the hover implementation on stage hover", () => {
  act(() => {
    root.render(<StaggeredTextProject projectId="staggered-text" />);
  });

  const stage = container.querySelector('[data-implementation="hover"]');

  expect(stage?.getAttribute("data-active")).toBe("false");

  act(() => {
    stage?.dispatchEvent(new Event("pointerenter", { bubbles: true }));
  });

  expect(stage?.getAttribute("data-active")).toBe("true");
});
```

- [ ] **Step 4: Run test to verify it fails**

Run: `npm test -- src/projects/staggered-text/StaggeredTextProject.test.tsx`
Expected: FAIL because hover mode is not implemented.

- [ ] **Step 5: Add a failing button-mode interaction and editable-text test**

```tsx
it("updates the button-mode text input and preserves the press interaction", () => {
  act(() => {
    root.render(<StaggeredTextProject projectId="staggered-text" />);
  });

  const buttonToggle = container.querySelector('[data-mode-toggle="button"]');

  act(() => {
    buttonToggle?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });

  const input = container.querySelector('input[type="text"]') as HTMLInputElement | null;
  const trigger = container.querySelector('[data-implementation="button"] button');

  act(() => {
    input!.value = "Hello Motion";
    input!.dispatchEvent(new Event("input", { bubbles: true }));
  });

  expect(trigger?.textContent?.replace(/\s+/g, " ").trim()).toContain("Hello Motion");

  act(() => {
    trigger?.dispatchEvent(new Event("pointerdown", { bubbles: true }));
  });

  expect(trigger?.getAttribute("data-active")).toBe("true");
});
```

- [ ] **Step 6: Run test to verify it fails**

Run: `npm test -- src/projects/staggered-text/StaggeredTextProject.test.tsx`
Expected: FAIL because the input and button-specific implementation do not exist yet.

- [ ] **Step 7: Commit**

```bash
git add src/projects/staggered-text/StaggeredTextProject.test.tsx
git commit -m "test: cover staggered text toggle modes"
```

## Chunk 2: Implement the new top-level mode container and separate previews

### Task 2: Split the project into a mode shell plus two copied implementations

**Files:**
- Modify: `src/projects/staggered-text/StaggeredTextProject.tsx`
- Create: `src/projects/staggered-text/StaggeredTextHoverPreview.tsx`
- Create: `src/projects/staggered-text/StaggeredTextButtonPreview.tsx`
- Test: `src/projects/staggered-text/StaggeredTextProject.test.tsx`

- [ ] **Step 1: Implement the top-level mode shell with mode toggle and button-mode text state**

```tsx
const [mode, setMode] = useState<"hover" | "button">("hover");
const [buttonText, setButtonText] = useState(DEFAULT_BUTTON_TEXT);

return (
  <div className={styles.projectShell}>
    <div className={styles.modeToggle}>
      <button data-mode-toggle="hover" ...>Hover</button>
      <button data-mode-toggle="button" ...>Button</button>
    </div>
    {mode === "hover" ? (
      <StaggeredTextHoverPreview tuning={tuning} />
    ) : (
      <StaggeredTextButtonPreview
        text={buttonText}
        onTextChange={setButtonText}
        tuning={tuning}
      />
    )}
  </div>
);
```

- [ ] **Step 2: Copy the current implementation into `StaggeredTextHoverPreview.tsx` and adapt the activation model**

```tsx
const [isHovered, setIsHovered] = useState(false);
const isActive = isHovered;

<div
  data-implementation="hover"
  data-active={isActive}
  onPointerEnter={() => setIsHovered(true)}
  onPointerLeave={() => setIsHovered(false)}
>
  {/* copied staggered text markup */}
</div>
```

- [ ] **Step 3: Copy the current implementation into `StaggeredTextButtonPreview.tsx`, keep press/drag behavior, and add editable text**

```tsx
const displayText = text.trim() || DEFAULT_BUTTON_TEXT;
const characterSlots = createCharacterSlots(displayText);

return (
  <div data-implementation="button">
    <label>
      <span>Text</span>
      <input
        type="text"
        value={text}
        onChange={(event) => onTextChange(event.target.value)}
      />
    </label>
    <button
      data-active={isActive}
      onPointerDown={() => setIsPressed(true)}
      onPointerUp={() => setIsPressed(false)}
      onPointerCancel={() => setIsPressed(false)}
    >
      {/* copied staggered text markup using characterSlots */}
    </button>
  </div>
);
```

- [ ] **Step 4: Run the focused test file and make it pass**

Run: `npm test -- src/projects/staggered-text/StaggeredTextProject.test.tsx`
Expected: PASS for the new toggle, hover, input, and interaction assertions.

- [ ] **Step 5: Commit**

```bash
git add src/projects/staggered-text/StaggeredTextProject.tsx src/projects/staggered-text/StaggeredTextHoverPreview.tsx src/projects/staggered-text/StaggeredTextButtonPreview.tsx src/projects/staggered-text/StaggeredTextProject.test.tsx
git commit -m "feat: add staggered text toggle preview modes"
```

## Chunk 3: Update styling and preserve motion behavior details

### Task 3: Add toggle/input styling and keep both WAAPI paths working

**Files:**
- Modify: `src/projects/staggered-text/StaggeredTextProject.module.css`
- Modify: `src/projects/staggered-text/StaggeredTextProject.test.tsx`
- Test: `src/projects/staggered-text/StaggeredTextProject.test.tsx`

- [ ] **Step 1: Add styles for the new shell, mode toggle, and input row**

```css
.projectShell { ... }
.controls { ... }
.modeToggle { ... }
.modeToggleButton[data-selected="true"] { ... }
.textInputRow { ... }
.textInput { ... }
```

- [ ] **Step 2: Preserve the existing stage/button visual language in both copied implementations**

```css
.hoverStage { ... }
.buttonPanel { ... }
.trigger { ... }
```

- [ ] **Step 3: Extend WAAPI assertions so the active implementation still exposes the expected motion driver**

```tsx
expect(container.querySelector('[data-implementation="hover"]')?.getAttribute("data-motion-driver")).toBe("waapi");
```

- [ ] **Step 4: Run the focused test file and lint the touched files**

Run: `npm test -- src/projects/staggered-text/StaggeredTextProject.test.tsx`
Expected: PASS

Run: `npm run lint -- src/projects/staggered-text/StaggeredTextProject.tsx src/projects/staggered-text/StaggeredTextHoverPreview.tsx src/projects/staggered-text/StaggeredTextButtonPreview.tsx src/projects/staggered-text/StaggeredTextProject.module.css src/projects/staggered-text/StaggeredTextProject.test.tsx`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/projects/staggered-text/StaggeredTextProject.module.css src/projects/staggered-text/StaggeredTextProject.test.tsx src/projects/staggered-text/StaggeredTextProject.tsx src/projects/staggered-text/StaggeredTextHoverPreview.tsx src/projects/staggered-text/StaggeredTextButtonPreview.tsx
git commit -m "style: polish staggered text toggle controls"
```

## Chunk 4: Final verification

### Task 4: Run the project-level checks before handoff

**Files:**
- Modify: none
- Test: `src/projects/staggered-text/StaggeredTextProject.test.tsx`

- [ ] **Step 1: Run the focused staggered-text tests**

Run: `npm test -- src/projects/staggered-text/StaggeredTextProject.test.tsx`
Expected: PASS

- [ ] **Step 2: Run the full test suite if the focused changes are green**

Run: `npm test`
Expected: PASS

- [ ] **Step 3: Run lint**

Run: `npm run lint`
Expected: PASS

- [ ] **Step 4: Commit any final cleanup if needed**

```bash
git add src/projects/staggered-text/StaggeredTextProject.tsx src/projects/staggered-text/StaggeredTextHoverPreview.tsx src/projects/staggered-text/StaggeredTextButtonPreview.tsx src/projects/staggered-text/StaggeredTextProject.module.css src/projects/staggered-text/StaggeredTextProject.test.tsx
git commit -m "chore: finalize staggered text toggle modes"
```
