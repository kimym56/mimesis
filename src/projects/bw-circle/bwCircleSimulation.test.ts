import { describe, expect, it } from "vitest";
import {
  createMimesisCue,
  createMimesisLayout,
  createSyncCue,
} from "./bwCircleSimulation";

describe("createSyncCue", () => {
  it("returns an idle cue when playback is paused", () => {
    expect(
      createSyncCue({
        currentTime: 12.5,
        isPlaying: false,
        baseCameraMode: "normal",
      }),
    ).toEqual({
      rotationVelocity: 0.0032,
      pulseStrength: 0,
      energy: 0.28,
      cameraMode: "normal",
    });
  });

  it("returns bounded active motion values when playback is running", () => {
    const cue = createSyncCue({
      currentTime: 12.5,
      isPlaying: true,
      baseCameraMode: "normal",
    });

    expect(cue.rotationVelocity).toBeGreaterThan(0.004);
    expect(cue.rotationVelocity).toBeLessThan(0.02);
    expect(cue.pulseStrength).toBeGreaterThanOrEqual(0);
    expect(cue.pulseStrength).toBeLessThanOrEqual(1);
    expect(cue.energy).toBeGreaterThanOrEqual(0.35);
    expect(cue.energy).toBeLessThanOrEqual(1);
    expect(["normal", "white", "black"]).toContain(cue.cameraMode);
  });

  it("is deterministic for the same timestamp", () => {
    const a = createSyncCue({
      currentTime: 48.125,
      isPlaying: true,
      baseCameraMode: "white",
    });
    const b = createSyncCue({
      currentTime: 48.125,
      isPlaying: true,
      baseCameraMode: "white",
    });

    expect(a).toEqual(b);
  });
});

describe("createMimesisCue", () => {
  it("matches the original one-minute rotation cadence", () => {
    expect(createMimesisCue({ secondsWithinMinute: 0 }).angle).toBeCloseTo(
      -Math.PI / 2,
    );
    expect(createMimesisCue({ secondsWithinMinute: 15 }).angle).toBeCloseTo(0);
    expect(createMimesisCue({ secondsWithinMinute: 0 }).rotationVelocity).toBeCloseTo(
      (Math.PI * 2) / 60,
    );
  });
});

describe("createMimesisLayout", () => {
  it("matches the original desktop sizing and physics defaults", () => {
    const layout = createMimesisLayout(1440);

    expect(layout.isMobile).toBe(false);
    expect(layout.physicsScale).toBe(1);
    expect(layout.gravity).toBeCloseTo(0.4);
    expect(layout.bounce).toBeCloseTo(0.85);
    expect(layout.circleRadius).toBeCloseTo(252);
    expect(layout.ballRadius).toBeCloseTo(14.112);
    expect(layout.speedScale).toBe(1);
  });

  it("matches the original mobile sizing and scaled physics", () => {
    const layout = createMimesisLayout(375);

    expect(layout.isMobile).toBe(true);
    expect(layout.physicsScale).toBeCloseTo(0.4);
    expect(layout.gravity).toBeCloseTo(0.1);
    expect(layout.bounce).toBeCloseTo(0.8);
    expect(layout.circleRadius).toBeCloseTo(126);
    expect(layout.ballRadius).toBeCloseTo(7.056);
    expect(layout.speedScale).toBeCloseTo(0.6);
  });
});
