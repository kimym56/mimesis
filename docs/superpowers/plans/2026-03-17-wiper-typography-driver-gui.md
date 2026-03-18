# Wiper Typography Driver GUI Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a dev-only `lil-gui` panel that live-tunes the Tesla driver-view camera and glyph placement in the wiper typography project.

**Architecture:** Extract the driver-view constants into a shared tuning module, route the layout math through that tuning object, and mount a dev-only `lil-gui` hook that edits the same state live. Keep production behavior identical except for the absence of the debug panel.

**Tech Stack:** React 19, Next.js 16, TypeScript, `@react-three/fiber`, `lil-gui`, Vitest

---

## Chunk 1: Tuning Model And GUI Hook

### Task 1: Add failing GUI hook tests

**Files:**
- Create: `src/projects/wiper-typography/useTeslaDriverViewGui.test.tsx`
- Test: `src/projects/wiper-typography/useTeslaDriverViewGui.test.tsx`

- [ ] **Step 1: Write the failing test**
- [ ] **Step 2: Run test to verify it fails**
  Run: `npx vitest run src/projects/wiper-typography/useTeslaDriverViewGui.test.tsx`
- [ ] **Step 3: Add the tuning model and GUI hook**
- [ ] **Step 4: Run test to verify it passes**
  Run: `npx vitest run src/projects/wiper-typography/useTeslaDriverViewGui.test.tsx`

### Task 2: Add the shared tuning definitions

**Files:**
- Create: `src/projects/wiper-typography/wiperTeslaDriverTuning.ts`
- Modify: `src/projects/wiper-typography/useTeslaDriverViewGui.ts`

- [ ] **Step 1: Define the tuning type and defaults**
- [ ] **Step 2: Define slider metadata for camera, windshield, and glyph folders**
- [ ] **Step 3: Keep the GUI hook bound to that metadata**
- [ ] **Step 4: Re-run the GUI hook tests**

## Chunk 2: Driver View Integration

### Task 3: Add failing driver-view integration coverage

**Files:**
- Modify: `src/projects/wiper-typography/WiperTypographyDriverView3D.test.tsx`
- Modify: `src/projects/wiper-typography/wiperTeslaDriverLayout.test.ts`

- [ ] **Step 1: Write a failing test for driver-view tuning state wiring**
- [ ] **Step 2: Run the focused tests to verify the new failure**
  Run: `npx vitest run src/projects/wiper-typography/WiperTypographyDriverView3D.test.tsx src/projects/wiper-typography/wiperTeslaDriverLayout.test.ts`
- [ ] **Step 3: Update the layout to consume tuning values**
- [ ] **Step 4: Update the driver-view component to own tuning state and enable the GUI hook**
- [ ] **Step 5: Re-run the focused tests**

### Task 4: Install `lil-gui` and keep production clean

**Files:**
- Modify: `package.json`
- Modify: `package-lock.json`
- Modify: `src/projects/wiper-typography/useTeslaDriverViewGui.ts`

- [ ] **Step 1: Add `lil-gui` to the project**
- [ ] **Step 2: Load it only from a development-only effect**
- [ ] **Step 3: Confirm the production branch still no-ops**

## Chunk 3: Verification

### Task 5: Run repository verification

**Files:**
- Verify only

- [ ] **Step 1: Run tests**
  Run: `npm test`
- [ ] **Step 2: Run lint**
  Run: `npm run lint`
- [ ] **Step 3: Run build**
  Run: `npm run build`
- [ ] **Step 4: Summarize the exact tuning entry points for the user**
