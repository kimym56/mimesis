# Wiper Typography Driver View GUI Range Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Expand every 3D driver-view `lil-gui` slider range without changing the approved default tuning preset.

**Architecture:** Keep the current driver-view tuning structure intact and widen the numeric envelopes in one place, `wiperTeslaDriverTuning.ts`. Cover the new exploratory space with tests in `wiperTeslaDriverTuning.test.ts` so the GUI ranges and FOV clamp cannot silently regress.

**Tech Stack:** TypeScript, Vitest, lil-gui

---

## Chunk 1: Driver View GUI Ranges

### Task 1: Document the broader control envelope in tests

**Files:**
- Modify: `src/projects/wiper-typography/wiperTeslaDriverTuning.test.ts`
- Test: `src/projects/wiper-typography/wiperTeslaDriverTuning.test.ts`

- [ ] **Step 1: Write the failing test**

Add assertions that every `Camera`, `Windshield`, and `Glyphs` control exposes a substantially broader range than the current defaults, plus a wider `TESLA_DRIVER_VIEW_FOV_RANGE`.

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- src/projects/wiper-typography/wiperTeslaDriverTuning.test.ts`
Expected: FAIL because the existing lil-gui ranges are still too narrow.

- [ ] **Step 3: Write minimal implementation**

Expand the min/max values in `TESLA_DRIVER_VIEW_GUI_FOLDERS` and `TESLA_DRIVER_VIEW_FOV_RANGE` in `src/projects/wiper-typography/wiperTeslaDriverTuning.ts`, keeping defaults and step sizes unchanged.

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- src/projects/wiper-typography/wiperTeslaDriverTuning.test.ts`
Expected: PASS

- [ ] **Step 5: Verify lint**

Run: `npm run lint -- src/projects/wiper-typography/wiperTeslaDriverTuning.ts src/projects/wiper-typography/wiperTeslaDriverTuning.test.ts`
Expected: PASS
