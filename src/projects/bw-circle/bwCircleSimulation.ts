export type BwCircleCameraMode = "normal" | "white" | "black";

export interface BwCircleMimesisCue {
  angle: number;
  rotationVelocity: number;
}

export interface BwCircleMimesisLayout {
  isMobile: boolean;
  physicsScale: number;
  gravity: number;
  bounce: number;
  circleRadius: number;
  ballRadius: number;
  speedScale: number;
}

export interface BwCircleSyncCueInput {
  currentTime: number;
  isPlaying: boolean;
  baseCameraMode: BwCircleCameraMode;
}

export interface BwCircleSyncCue {
  rotationVelocity: number;
  pulseStrength: number;
  energy: number;
  cameraMode: BwCircleCameraMode;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

const CAMERA_SEQUENCE: BwCircleCameraMode[] = ["normal", "white", "black"];

export function createMimesisCue({
  secondsWithinMinute,
}: {
  secondsWithinMinute: number;
}): BwCircleMimesisCue {
  return {
    angle: (secondsWithinMinute / 60) * Math.PI * 2 - Math.PI / 2,
    rotationVelocity: (Math.PI * 2) / 60,
  };
}

export function createMimesisLayout(width: number): BwCircleMimesisLayout {
  const isMobile = width < 768;
  const physicsScale = clamp(width / 1440, 0.4, 1.2);
  const circleRadius = isMobile ? width * 0.336 : width * 0.175;
  const ballRadius = Math.max(6, circleRadius * 0.056);

  return {
    isMobile,
    physicsScale,
    gravity: (isMobile ? 0.25 : 0.4) * physicsScale,
    bounce: isMobile ? 0.8 : 0.85,
    circleRadius,
    ballRadius,
    speedScale: isMobile ? 0.6 : 1,
  };
}

export function createSyncCue({
  currentTime,
  isPlaying,
  baseCameraMode,
}: BwCircleSyncCueInput): BwCircleSyncCue {
  if (!isPlaying) {
    return {
      rotationVelocity: 0.0032,
      pulseStrength: 0,
      energy: 0.28,
      cameraMode: baseCameraMode,
    };
  }

  const phase = currentTime * 0.85;
  const pulseStrength = clamp((Math.sin(phase * 1.7) + 1) * 0.5, 0, 1);
  const energy = clamp(0.35 + (Math.sin(phase * 0.75) + 1) * 0.325, 0.35, 1);
  const rotationVelocity = clamp(
    0.0045 + pulseStrength * 0.0105 + energy * 0.0015,
    0.004,
    0.02,
  );
  const cameraIndex = Math.floor(currentTime / 7.5) % CAMERA_SEQUENCE.length;
  const cameraMode =
    pulseStrength > 0.72 ? CAMERA_SEQUENCE[cameraIndex] : baseCameraMode;

  return {
    rotationVelocity,
    pulseStrength,
    energy,
    cameraMode,
  };
}
