import { describe, expect, it } from "vitest";
import {
  WIPER_MARGIN,
  clamp,
  computeLinePose,
  isPointerInsideActiveRange,
  mapPointerXToPhase,
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

  it("checks if pointer is inside interactive drag range", () => {
    expect(isPointerInsideActiveRange(WIPER_MARGIN, 1000)).toBe(true);
    expect(isPointerInsideActiveRange(999 - WIPER_MARGIN, 1000)).toBe(true);
    expect(isPointerInsideActiveRange(99, 1000)).toBe(false);
    expect(isPointerInsideActiveRange(901, 1000)).toBe(false);
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
});
