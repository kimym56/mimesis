import { describe, expect, it } from "vitest";
import {
  WIPER_MARGIN,
  clamp,
  computeLinePose,
  isPointerInsideActiveRange,
  mapPointerDragToPhase,
  mapPointerXToPhase,
  stepPhaseToward,
} from "./wiperMath";

describe("wiperMath", () => {
  it("clamps values to inclusive bounds", () => {
    expect(clamp(-10, 0, 100)).toBe(0);
    expect(clamp(20, 0, 100)).toBe(20);
    expect(clamp(999, 0, 100)).toBe(100);
  });

  it("maps pointer x into a 0..1 phase within wiper margins", () => {
    expect(mapPointerXToPhase(100, 1000)).toBe(0);
    expect(mapPointerXToPhase(500, 1000)).toBe(0.5);
    expect(mapPointerXToPhase(900, 1000)).toBe(1);
    expect(mapPointerXToPhase(-200, 1000)).toBe(0);
    expect(mapPointerXToPhase(5000, 1000)).toBe(1);
  });

  it("maps pointer drag delta to phase without re-initializing at entry", () => {
    expect(mapPointerDragToPhase(400, 400, 0.75, 1000)).toBeCloseTo(0.75);
    expect(mapPointerDragToPhase(500, 400, 0.75, 1000)).toBeCloseTo(0.875);
    expect(mapPointerDragToPhase(200, 400, 0.75, 1000)).toBeCloseTo(0.5);
  });

  it("maps pointer drag delta across full canvas when margin is zero", () => {
    expect(mapPointerDragToPhase(500, 400, 0.75, 1000, 0)).toBeCloseTo(0.85);
  });

  it("clamps pointer drag mapping to normalized bounds", () => {
    expect(mapPointerDragToPhase(1000, 400, 0.95, 1000)).toBe(1);
    expect(mapPointerDragToPhase(-500, 400, 0.1, 1000)).toBe(0);
    expect(mapPointerDragToPhase(100, 400, 2, 150)).toBe(1);
  });

  it("checks if pointer is inside interactive drag range", () => {
    expect(isPointerInsideActiveRange(WIPER_MARGIN, 1000)).toBe(true);
    expect(isPointerInsideActiveRange(999 - WIPER_MARGIN, 1000)).toBe(true);
    expect(isPointerInsideActiveRange(99, 1000)).toBe(false);
    expect(isPointerInsideActiveRange(901, 1000)).toBe(false);
  });

  it("treats the entire canvas as active range when margin is zero", () => {
    expect(isPointerInsideActiveRange(0, 1000, 0)).toBe(true);
    expect(isPointerInsideActiveRange(1000, 1000, 0)).toBe(true);
    expect(isPointerInsideActiveRange(-1, 1000, 0)).toBe(false);
    expect(isPointerInsideActiveRange(1001, 1000, 0)).toBe(false);
  });

  it("computes radial line pose from phase", () => {
    const top = computeLinePose(3, 0, 1000, 600, 22);
    expect(Math.round(top.x)).toBe(440);
    expect(Math.round(top.y)).toBe(622);
    expect(top.rotation).toBe(0);

    const bottom = computeLinePose(3, 1, 1000, 600, 22);
    expect(Math.round(bottom.x)).toBe(560);
    expect(Math.round(bottom.y)).toBe(622);
    expect(bottom.rotation).toBe(Math.PI);
  });

  it("moves phase toward target with capped delta", () => {
    expect(stepPhaseToward(0, 1, 0.01)).toBeCloseTo(0.01);
    expect(stepPhaseToward(0.5, 0.6, 0.2)).toBeCloseTo(0.6);
    expect(stepPhaseToward(0.8, 0.2, 0.05)).toBeCloseTo(0.75);
  });

  it("keeps phase in the normalized 0..1 range", () => {
    expect(stepPhaseToward(-0.3, 0.3, 0.2)).toBeCloseTo(0.2);
    expect(stepPhaseToward(0.9, 2, 0.3)).toBeCloseTo(1);
  });
});
