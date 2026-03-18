import { describe, expect, it } from "vitest";
import {
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
