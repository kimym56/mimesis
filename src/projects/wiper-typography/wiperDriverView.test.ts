import { describe, expect, it } from "vitest";
import {
  computeDriverViewPhase,
  getDriverViewCycleDuration,
} from "./wiperDriverView";

describe("wiperDriverView", () => {
  it("loops phase between 0 and 1 over time", () => {
    expect(computeDriverViewPhase(0, 4)).toBe(0);
    expect(computeDriverViewPhase(2, 4)).toBe(0.5);
    expect(computeDriverViewPhase(6, 4)).toBe(0.5);
  });

  it("reduces motion by lengthening the cycle", () => {
    expect(getDriverViewCycleDuration(false)).toBeLessThan(
      getDriverViewCycleDuration(true)
    );
  });
});
