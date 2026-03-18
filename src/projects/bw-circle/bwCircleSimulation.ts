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
  particleCountPerSet: number;
  speedScale: number;
}

export interface BwCircleParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
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

function createSeededRandom(seed: number) {
  let state = seed >>> 0 || 1;

  return () => {
    state = (state * 1664525 + 1013904223) >>> 0;
    return state / 4294967296;
  };
}

function sampleNormal(random: () => number) {
  let u = 0;

  while (u <= Number.EPSILON) {
    u = random();
  }

  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * random());
}

function sampleUniformDiscPoint({
  circleRadius,
  padding,
  random,
}: {
  circleRadius: number;
  padding: number;
  random: () => number;
}) {
  const angle = random() * Math.PI * 2;
  const distance = Math.sqrt(random()) * Math.max(circleRadius - padding, 0);

  return {
    x: Math.cos(angle) * distance,
    y: Math.sin(angle) * distance,
  };
}

function sampleBoundaryCenterBiasedPoint({
  boundaryAngle,
  circleRadius,
  padding,
  random,
}: {
  boundaryAngle: number;
  circleRadius: number;
  padding: number;
  random: () => number;
}) {
  const maxDistance = Math.max(circleRadius - padding, 0);
  const acrossSigma = maxDistance * 0.09;
  const alongSigma = maxDistance * 0.2;

  for (let attempt = 0; attempt < 12; attempt += 1) {
    const across = sampleNormal(random) * acrossSigma;
    const along = sampleNormal(random) * alongSigma;
    const x =
      -Math.sin(boundaryAngle) * across + Math.cos(boundaryAngle) * along;
    const y =
      Math.cos(boundaryAngle) * across + Math.sin(boundaryAngle) * along;

    if (Math.hypot(x, y) <= maxDistance) {
      return { x, y };
    }
  }

  return sampleUniformDiscPoint({ circleRadius, padding, random });
}

function getCircleRadius(width: number) {
  return (width < 768 ? 0.336 : 0.175) * width;
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

export function createMimesisLayout(
  sceneWidth: number,
  viewportWidth = sceneWidth,
): BwCircleMimesisLayout {
  const isMobile = sceneWidth < 768;
  const physicsScale = clamp(sceneWidth / 1440, 0.4, 1.2);
  const circleRadius = getCircleRadius(sceneWidth);
  const ballRadius = Math.max(6, circleRadius * 0.056);
  const referenceCircleRadius = getCircleRadius(viewportWidth);
  const particleDensityRatio =
    referenceCircleRadius > 0
      ? (circleRadius / referenceCircleRadius) ** 2
      : 1;
  const particleCountPerSet = Math.max(
    1,
    Math.round(5000 * particleDensityRatio),
  );

  return {
    isMobile,
    physicsScale,
    gravity: (isMobile ? 0.25 : 0.4) * physicsScale,
    bounce: isMobile ? 0.8 : 0.85,
    circleRadius,
    ballRadius,
    particleCountPerSet,
    speedScale: isMobile ? 0.6 : 1,
  };
}

export function createBwCircleParticles({
  boundaryAngle = 0,
  circleRadius,
  count,
  seed,
}: {
  boundaryAngle?: number;
  circleRadius: number;
  count: number;
  seed: number;
}): BwCircleParticle[] {
  const random = createSeededRandom(seed);
  const particles: BwCircleParticle[] = [];
  const biasedParticleCount = Math.round(count * 0.18);

  for (let index = 0; index < count; index += 1) {
    const radius = 1 + random() * 1.5;
    const position =
      index < biasedParticleCount
        ? sampleBoundaryCenterBiasedPoint({
            boundaryAngle,
            circleRadius,
            padding: radius + 2,
            random,
          })
        : sampleUniformDiscPoint({
            circleRadius,
            padding: radius + 2,
            random,
          });

    particles.push({
      x: position.x,
      y: position.y,
      vx: (random() - 0.5) * 0.8,
      vy: (random() - 0.5) * 0.8,
      radius,
    });
  }

  return particles;
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
