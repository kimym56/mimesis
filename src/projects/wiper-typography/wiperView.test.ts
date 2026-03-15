import { describe, expect, it } from "vitest";
import { WIPER_MAX_VIEW_PITCH, WIPER_MAX_VIEW_YAW } from "./wiperConfig";
import {
  computeWiperCameraPose,
  mapDragDeltaToViewAngle,
} from "./wiperView";

describe("wiperView", () => {
  it("maps desktop drag delta into clamped yaw and pitch", () => {
    const view = mapDragDeltaToViewAngle(
      { yaw: 0.1, pitch: -0.05 },
      { deltaX: 600, deltaY: -400, width: 1200, height: 800 }
    );

    expect(view.yaw).toBeLessThanOrEqual(WIPER_MAX_VIEW_YAW);
    expect(view.pitch).toBeGreaterThanOrEqual(-WIPER_MAX_VIEW_PITCH);
  });

  it("builds a restrained camera pose from view angle and stage bias", () => {
    const pose = computeWiperCameraPose({
      view: { yaw: 0.2, pitch: -0.1 },
      phaseBias: { x: 0.08, y: 0.02 },
      distance: 6,
    });

    expect(pose.position[2]).toBe(6);
    expect(Math.abs(pose.lookAt[0])).toBeGreaterThan(0);
  });

  it("keeps stage phase bias and drag angle in one shared camera pose", () => {
    const pose = computeWiperCameraPose({
      view: { yaw: 0.18, pitch: -0.08 },
      phaseBias: { x: 0.06, y: 0.01 },
      distance: 6,
    });

    expect(pose.position[0]).toBeGreaterThan(0);
    expect(pose.position[1]).toBeGreaterThan(0);
  });
});
