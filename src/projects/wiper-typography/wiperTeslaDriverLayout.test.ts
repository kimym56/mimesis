import { describe, expect, it } from "vitest";
import {
  createTeslaDriverViewLayout,
  getTeslaDriverWiperRotation,
  projectTeslaDriverGlyphPosition,
} from "./wiperTeslaDriverLayout";
import { DEFAULT_TESLA_DRIVER_VIEW_TUNING } from "./wiperTeslaDriverTuning";

describe("wiperTeslaDriverLayout", () => {
  it("positions the camera near the steering anchor and aims mostly forward through the windshield", () => {
    const layout = createTeslaDriverViewLayout({
      steeringPosition: [-0.47, 0.176, -0.608],
      windscreenCenter: [0, 0.573, -0.729],
      windscreenSize: [1.48, 0.62, 0.84],
    });

    expect(layout.cameraPosition[0]).toBeGreaterThan(-0.46);
    expect(layout.cameraPosition[1]).toBeGreaterThan(0.35);
    expect(layout.cameraPosition[2]).toBeGreaterThan(-0.5);
    expect(layout.lookAt[0]).toBeLessThan(0);
    expect(layout.lookAt[0] - layout.cameraPosition[0]).toBeLessThan(0.3);
    expect(layout.lookAt[2]).toBeLessThan(layout.windscreenCenter[2]);
    expect(layout.lookAt[2]).toBeGreaterThan(layout.windscreenCenter[2] - 0.2);
  });

  it("projects glyphs onto a windshield plane that rises and deepens toward the top", () => {
    const layout = createTeslaDriverViewLayout({
      steeringPosition: [-0.47, 0.176, -0.608],
      windscreenCenter: [0, 0.573, -0.729],
      windscreenSize: [1.48, 0.62, 0.84],
    });

    const bottomPoint = projectTeslaDriverGlyphPosition(layout, 0.5, 0.85);
    const topPoint = projectTeslaDriverGlyphPosition(layout, 0.5, 0.15);

    expect(topPoint[1]).toBeGreaterThan(bottomPoint[1]);
    expect(topPoint[2]).toBeLessThan(bottomPoint[2]);
  });

  it("applies custom tuning values to the camera offset and glyph placement", () => {
    const layout = createTeslaDriverViewLayout(
      {
        steeringPosition: [-0.47, 0.176, -0.608],
        windscreenCenter: [0, 0.573, -0.729],
        windscreenSize: [1.48, 0.62, 0.84],
      },
      {
        ...DEFAULT_TESLA_DRIVER_VIEW_TUNING,
        cameraOffsetZ: 0.32,
        glyphYBias: 0.28,
      }
    );

    const glyphPoint = projectTeslaDriverGlyphPosition(layout, 0.5, 0.2);

    expect(layout.cameraPosition[2]).toBeCloseTo(-0.288, 2);
    expect(glyphPoint[1]).toBeGreaterThan(layout.windscreenCenter[1]);
  });

  it("keeps the wiper sweep around the windshield base instead of spinning freely", () => {
    expect(getTeslaDriverWiperRotation(0)).toBeCloseTo(0.82, 2);
    expect(getTeslaDriverWiperRotation(0.5)).toBeCloseTo(1.06, 2);
  });
});
