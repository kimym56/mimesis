import { describe, expect, it } from "vitest";
import {
  DEFAULT_TESLA_DRIVER_VIEW_TUNING,
  TESLA_DRIVER_VIEW_FOV_RANGE,
  TESLA_DRIVER_VIEW_GUI_FOLDERS,
} from "./wiperTeslaDriverTuning";

function getControlRange(key: string) {
  for (const folder of TESLA_DRIVER_VIEW_GUI_FOLDERS) {
    const control = folder.controls.find((item) => item.key === key);
    if (control) {
      return control;
    }
  }

  throw new Error(`Missing lil-gui control for ${key}`);
}

describe("wiperTeslaDriverTuning", () => {
  it("uses the approved driver-view preset as the default tuning", () => {
    expect(DEFAULT_TESLA_DRIVER_VIEW_TUNING.fov).toBe(64);
    expect(DEFAULT_TESLA_DRIVER_VIEW_TUNING.cameraOffsetX).toBeCloseTo(0.19, 2);
    expect(DEFAULT_TESLA_DRIVER_VIEW_TUNING.cameraOffsetY).toBeCloseTo(0.26, 2);
    expect(DEFAULT_TESLA_DRIVER_VIEW_TUNING.cameraOffsetZ).toBeCloseTo(0.57, 2);
    expect(DEFAULT_TESLA_DRIVER_VIEW_TUNING.lookAtOffsetX).toBeCloseTo(0.12, 2);
    expect(DEFAULT_TESLA_DRIVER_VIEW_TUNING.lookAtOffsetY).toBeCloseTo(-0.0599, 4);
    expect(DEFAULT_TESLA_DRIVER_VIEW_TUNING.lookAtOffsetZ).toBeCloseTo(0.03, 2);
    expect(DEFAULT_TESLA_DRIVER_VIEW_TUNING.windscreenWidthScale).toBeCloseTo(0.72, 2);
    expect(DEFAULT_TESLA_DRIVER_VIEW_TUNING.windscreenHeightScale).toBeCloseTo(0.68, 2);
    expect(DEFAULT_TESLA_DRIVER_VIEW_TUNING.windscreenCenterOffsetX).toBeCloseTo(-0.0599, 4);
    expect(DEFAULT_TESLA_DRIVER_VIEW_TUNING.windscreenCenterOffsetY).toBe(0);
    expect(DEFAULT_TESLA_DRIVER_VIEW_TUNING.windscreenCenterOffsetNormal).toBe(0);
    expect(DEFAULT_TESLA_DRIVER_VIEW_TUNING.glyphWidthScale).toBeCloseTo(1.37, 2);
    expect(DEFAULT_TESLA_DRIVER_VIEW_TUNING.glyphHeightScale).toBeCloseTo(0.82, 2);
    expect(DEFAULT_TESLA_DRIVER_VIEW_TUNING.glyphYBias).toBeCloseTo(0.53, 2);
    expect(DEFAULT_TESLA_DRIVER_VIEW_TUNING.glyphDepthOffset).toBeCloseTo(0.004, 3);
  });

  it("keeps lil-gui ranges broad enough for exploratory driver-view tuning", () => {
    expect(TESLA_DRIVER_VIEW_FOV_RANGE.max).toBeGreaterThan(96);
    expect(getControlRange("cameraOffsetZ").max).toBeGreaterThan(0.45);
    expect(getControlRange("cameraOffsetZ").min).toBeLessThan(0.05);
    expect(getControlRange("lookAtOffsetX").min).toBeLessThan(-0.4);
    expect(getControlRange("lookAtOffsetY").max).toBeGreaterThan(0.15);
    expect(getControlRange("windscreenWidthScale").max).toBeGreaterThan(0.9);
    expect(getControlRange("windscreenCenterOffsetNormal").min).toBeLessThan(-0.08);
    expect(getControlRange("glyphWidthScale").max).toBeGreaterThan(1);
    expect(getControlRange("glyphDepthOffset").min).toBeLessThan(-0.03);
  });
});
