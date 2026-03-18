export interface TeslaDriverViewTuning {
  cameraOffsetX: number;
  cameraOffsetY: number;
  cameraOffsetZ: number;
  fov: number;
  glyphDepthOffset: number;
  glyphHeightScale: number;
  glyphWidthScale: number;
  glyphYBias: number;
  lookAtOffsetX: number;
  lookAtOffsetY: number;
  lookAtOffsetZ: number;
  windscreenCenterOffsetNormal: number;
  windscreenCenterOffsetX: number;
  windscreenCenterOffsetY: number;
  windscreenHeightScale: number;
  windscreenWidthScale: number;
}

export const TESLA_DRIVER_VIEW_FOV_RANGE = {
  min: 12,
  max: 140,
} as const;

export function clampTeslaDriverViewFov(value: number) {
  return Math.min(TESLA_DRIVER_VIEW_FOV_RANGE.max, Math.max(TESLA_DRIVER_VIEW_FOV_RANGE.min, value));
}

type TeslaDriverViewTuningKey = keyof TeslaDriverViewTuning;

interface TeslaDriverViewGuiControl {
  key: TeslaDriverViewTuningKey;
  label: string;
  max: number;
  min: number;
  step: number;
}

interface TeslaDriverViewGuiFolder {
  controls: TeslaDriverViewGuiControl[];
  title: string;
}

export const DEFAULT_TESLA_DRIVER_VIEW_TUNING: TeslaDriverViewTuning = {
  cameraOffsetX: 0.05,
  cameraOffsetY: 0.3,
  cameraOffsetZ: 0.18,
  fov: clampTeslaDriverViewFov(40),
  glyphDepthOffset: 0.01,
  glyphHeightScale: 0.74,
  glyphWidthScale: 0.78,
  glyphYBias: 0.4,
  lookAtOffsetX: -0.06,
  lookAtOffsetY: -0.01,
  lookAtOffsetZ: -0.05,
  windscreenCenterOffsetNormal: 0.014,
  windscreenCenterOffsetX: -0.11,
  windscreenCenterOffsetY: 0.02,
  windscreenHeightScale: 0.6,
  windscreenWidthScale: 0.62,
};

export const TESLA_DRIVER_VIEW_GUI_FOLDERS: TeslaDriverViewGuiFolder[] = [
  {
    title: "Camera",
    controls: [
      {
        key: "fov",
        label: "FOV",
        min: TESLA_DRIVER_VIEW_FOV_RANGE.min,
        max: TESLA_DRIVER_VIEW_FOV_RANGE.max,
        step: 1,
      },
      { key: "cameraOffsetX", label: "Offset X", min: -0.6, max: 0.6, step: 0.01 },
      { key: "cameraOffsetY", label: "Offset Y", min: -0.1, max: 0.9, step: 0.01 },
      { key: "cameraOffsetZ", label: "Offset Z", min: -0.2, max: 1.1, step: 0.01 },
      { key: "lookAtOffsetX", label: "Target X", min: -0.9, max: 0.9, step: 0.01 },
      { key: "lookAtOffsetY", label: "Target Y", min: -0.6, max: 0.6, step: 0.01 },
      { key: "lookAtOffsetZ", label: "Target Z", min: -0.6, max: 0.6, step: 0.01 },
    ],
  },
  {
    title: "Windshield",
    controls: [
      {
        key: "windscreenWidthScale",
        label: "Width",
        min: 0.15,
        max: 1.4,
        step: 0.01,
      },
      {
        key: "windscreenHeightScale",
        label: "Height",
        min: 0.15,
        max: 1.4,
        step: 0.01,
      },
      {
        key: "windscreenCenterOffsetX",
        label: "Center X",
        min: -0.6,
        max: 0.6,
        step: 0.01,
      },
      {
        key: "windscreenCenterOffsetY",
        label: "Center Y",
        min: -0.6,
        max: 0.6,
        step: 0.01,
      },
      {
        key: "windscreenCenterOffsetNormal",
        label: "Center Z",
        min: -0.3,
        max: 0.3,
        step: 0.002,
      },
    ],
  },
  {
    title: "Glyphs",
    controls: [
      {
        key: "glyphWidthScale",
        label: "Width",
        min: 0.1,
        max: 1.4,
        step: 0.01,
      },
      {
        key: "glyphHeightScale",
        label: "Height",
        min: 0.1,
        max: 1.4,
        step: 0.01,
      },
      {
        key: "glyphYBias",
        label: "Y Bias",
        min: -0.2,
        max: 1.2,
        step: 0.01,
      },
      {
        key: "glyphDepthOffset",
        label: "Depth",
        min: -0.12,
        max: 0.12,
        step: 0.002,
      },
    ],
  },
];
