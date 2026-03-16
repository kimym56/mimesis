import {
  WIPER_MAX_VIEW_PITCH,
  WIPER_MAX_VIEW_YAW,
  WIPER_VIEW_PITCH_SENSITIVITY,
  WIPER_VIEW_YAW_SENSITIVITY,
} from "./wiperConfig";
import { clamp } from "./wiperMath";

export interface WiperViewAngle {
  yaw: number;
  pitch: number;
}

interface WiperCameraPoseInput {
  view: WiperViewAngle;
  phaseBias?: { x: number; y: number };
  distance: number;
}

export function mapDragDeltaToViewAngle(
  origin: WiperViewAngle,
  input: { deltaX: number; deltaY: number; width: number; height: number }
): WiperViewAngle {
  const nextYaw =
    origin.yaw +
    (input.deltaX / Math.max(1, input.width)) * WIPER_VIEW_YAW_SENSITIVITY;
  const nextPitch =
    origin.pitch -
    (input.deltaY / Math.max(1, input.height)) * WIPER_VIEW_PITCH_SENSITIVITY;

  return {
    yaw: clamp(nextYaw, -WIPER_MAX_VIEW_YAW, WIPER_MAX_VIEW_YAW),
    pitch: clamp(nextPitch, -WIPER_MAX_VIEW_PITCH, WIPER_MAX_VIEW_PITCH),
  };
}

export function computeWiperCameraPose({
  view,
  phaseBias = { x: 0, y: 0 },
  distance,
}: WiperCameraPoseInput) {
  return {
    position: [
      phaseBias.x + view.yaw * distance * 0.55,
      phaseBias.y - view.pitch * distance * 0.4,
      distance,
    ] as const,
    lookAt: [
      phaseBias.x + view.yaw * 0.45,
      phaseBias.y + view.pitch * 0.12,
      0,
    ] as const,
  };
}
