import {
  DEFAULT_TESLA_DRIVER_VIEW_TUNING,
  type TeslaDriverViewTuning,
} from "./wiperTeslaDriverTuning";

type Vec3 = [number, number, number];

export interface TeslaDriverViewLayoutInput {
  steeringPosition: Vec3;
  windscreenCenter: Vec3;
  windscreenSize: Vec3;
}

export interface TeslaDriverViewLayout {
  cameraPosition: Vec3;
  glyphDepthOffset: number;
  glyphVisibleHeight: number;
  glyphVisibleWidth: number;
  glyphYBias: number;
  horizontalAxis: Vec3;
  lookAt: Vec3;
  normalAxis: Vec3;
  verticalAxis: Vec3;
  windscreenCenter: Vec3;
  windscreenHeight: number;
  windscreenWidth: number;
}

function normalize([x, y, z]: Vec3): Vec3 {
  const length = Math.hypot(x, y, z) || 1;
  return [x / length, y / length, z / length];
}

function add([ax, ay, az]: Vec3, [bx, by, bz]: Vec3): Vec3 {
  return [ax + bx, ay + by, az + bz];
}

function scale([x, y, z]: Vec3, scalar: number): Vec3 {
  return [x * scalar, y * scalar, z * scalar];
}

function cross([ax, ay, az]: Vec3, [bx, by, bz]: Vec3): Vec3 {
  return [ay * bz - az * by, az * bx - ax * bz, ax * by - ay * bx];
}

export function createTeslaDriverViewLayout({
  steeringPosition,
  windscreenCenter,
  windscreenSize,
}: TeslaDriverViewLayoutInput,
  tuning: TeslaDriverViewTuning = DEFAULT_TESLA_DRIVER_VIEW_TUNING
): TeslaDriverViewLayout {
  const horizontalAxis: Vec3 = [1, 0, 0];
  const verticalAxis = normalize([
    0,
    Math.max(windscreenSize[1], 0.001),
    -Math.max(windscreenSize[2] * 0.92, windscreenSize[1] * 0.4),
  ]);
  const initialNormalAxis = normalize(cross(horizontalAxis, verticalAxis));
  const normalAxis =
    initialNormalAxis[2] >= 0
      ? initialNormalAxis
      : scale(initialNormalAxis, -1);
  const windscreenWidth = windscreenSize[0] * tuning.windscreenWidthScale;
  const windscreenHeight =
    Math.hypot(windscreenSize[1], windscreenSize[2]) * tuning.windscreenHeightScale;
  const adjustedWindscreenCenter = add(
    windscreenCenter,
    add(
      scale(horizontalAxis, windscreenWidth * tuning.windscreenCenterOffsetX),
      add(
        scale(verticalAxis, windscreenHeight * tuning.windscreenCenterOffsetY),
        scale(normalAxis, tuning.windscreenCenterOffsetNormal)
      )
    )
  );

  return {
    cameraPosition: add(steeringPosition, [
      tuning.cameraOffsetX,
      tuning.cameraOffsetY,
      tuning.cameraOffsetZ,
    ]),
    glyphDepthOffset: tuning.glyphDepthOffset,
    glyphVisibleHeight: windscreenHeight * tuning.glyphHeightScale,
    glyphVisibleWidth: windscreenWidth * tuning.glyphWidthScale,
    glyphYBias: tuning.glyphYBias,
    horizontalAxis,
    lookAt: add(
      adjustedWindscreenCenter,
      add(
        scale(horizontalAxis, windscreenWidth * tuning.lookAtOffsetX),
        add(
          scale(verticalAxis, windscreenHeight * tuning.lookAtOffsetY),
          scale(normalAxis, tuning.lookAtOffsetZ)
        )
      )
    ),
    normalAxis,
    verticalAxis,
    windscreenCenter: adjustedWindscreenCenter,
    windscreenHeight,
    windscreenWidth,
  };
}

export function projectTeslaDriverGlyphPosition(
  layout: TeslaDriverViewLayout,
  normalizedX: number,
  normalizedY: number
): Vec3 {
  const xOffset = (normalizedX - 0.5) * layout.glyphVisibleWidth;
  const yOffset = (layout.glyphYBias - normalizedY) * layout.glyphVisibleHeight;

  return add(
    layout.windscreenCenter,
    add(
      scale(layout.horizontalAxis, xOffset),
      add(
        scale(layout.verticalAxis, yOffset),
        scale(layout.normalAxis, layout.glyphDepthOffset)
      )
    )
  );
}

export function getTeslaDriverWiperRotation(phase: number) {
  const clampedPhase = Math.max(0, Math.min(1, phase));
  return 0.82 + clampedPhase * 0.48;
}
