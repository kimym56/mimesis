"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { useReducedMotion } from "framer-motion";
import type {
  BwCircleAudioSyncState,
  BwCirclePlaybackState,
} from "./BwCircleProject";
import {
  createBwCircleAudioCue,
  measureBwCircleFrequencyLevels,
} from "./bwCircleAudioSync";
import {
  createBwCircleParticles,
  createMimesisCue,
  createMimesisLayout,
  createSyncMotionProfile,
  type BwCircleParticle,
} from "./bwCircleSimulation";
import styles from "./BwCircleProject.module.css";

const FRICTION = 0.995;
const SQUASH_RECOVERY = 0.15;

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function getAudioContextConstructor() {
  return (
    window.AudioContext ??
    ((window as Window & { webkitAudioContext?: typeof AudioContext })
      .webkitAudioContext as typeof AudioContext | undefined)
  );
}

interface BallState {
  color: string;
  scaleX: number;
  scaleY: number;
  squashAmount: number;
  vx: number;
  vy: number;
  x: number;
  y: number;
}

interface SceneState {
  leftBall: BallState;
  rightBall: BallState;
  leftParticles: BwCircleParticle[];
  rightParticles: BwCircleParticle[];
}

function createBall(
  x: number,
  vx: number,
  vy: number,
  color: string,
): BallState {
  return {
    x,
    y: 0,
    vx,
    vy,
    color,
    scaleX: 1,
    scaleY: 1,
    squashAmount: 0,
  };
}

function createSceneState(sceneWidth: number, viewportWidth: number): SceneState {
  const layout = createMimesisLayout(sceneWidth, viewportWidth);
  const seedBase = Math.max(1, Math.round(sceneWidth));
  const now = new Date();
  const boundaryAngle = createMimesisCue({
    secondsWithinMinute: now.getSeconds() + now.getMilliseconds() / 1000,
  }).angle;

  return {
    leftBall: createBall(
      -layout.circleRadius / 2,
      4 * layout.speedScale,
      -3 * layout.speedScale,
      "#000000",
    ),
    rightBall: createBall(
      layout.circleRadius / 2,
      -4 * layout.speedScale,
      3 * layout.speedScale,
      "#ffffff",
    ),
    leftParticles: createBwCircleParticles({
      boundaryAngle,
      circleRadius: layout.circleRadius,
      count: layout.particleCountPerSet,
      seed: seedBase * 17 + 1,
    }),
    rightParticles: createBwCircleParticles({
      boundaryAngle,
      circleRadius: layout.circleRadius,
      count: layout.particleCountPerSet,
      seed: seedBase * 17 + 2,
    }),
  };
}

function drawBall(
  context: CanvasRenderingContext2D,
  ball: BallState,
  ballRadius: number,
) {
  context.save();
  context.translate(ball.x, ball.y);
  context.rotate(Math.atan2(ball.vy, ball.vx));
  context.scale(ball.scaleY, ball.scaleX);
  context.beginPath();
  context.arc(0, 0, ballRadius, 0, Math.PI * 2);
  context.fillStyle = ball.color;
  context.fill();
  context.restore();
}

function updateParticles({
  angle,
  ball,
  circleRadius,
  isRightHalf,
  particleAccent,
  particles,
}: {
  angle: number;
  ball: BallState;
  circleRadius: number;
  isRightHalf: boolean;
  particleAccent: number;
  particles: BwCircleParticle[];
}) {
  const repelRadius = 60;
  const gravity = 0.004;
  const damping = 0.98;
  const minSpeed = 0.3;
  const resetSpeed = 0.5;
  const boundaryBounce = 0.8;

  for (const particle of particles) {
    const toBallX = particle.x - ball.x;
    const toBallY = particle.y - ball.y;
    const distanceToBall = Math.hypot(toBallX, toBallY);

    if (distanceToBall < repelRadius && distanceToBall > 0.0001) {
      const force = ((repelRadius - distanceToBall) / repelRadius) * 1.5;
      particle.vx += (toBallX / distanceToBall) * force;
      particle.vy += (toBallY / distanceToBall) * force;
    }

    particle.vy += gravity;
    particle.x += particle.vx;
    particle.y += particle.vy;
    particle.vx *= damping;
    particle.vy *= damping;

    const accentImpulse = (particleAccent - 1) * 0.35;

    if (accentImpulse > 0) {
      const speed = Math.hypot(particle.vx, particle.vy);

      if (speed > 0.0001) {
        particle.vx += (particle.vx / speed) * accentImpulse;
        particle.vy += (particle.vy / speed) * accentImpulse;
      } else {
        const accentAngle = Math.random() * Math.PI * 2;
        particle.vx += Math.cos(accentAngle) * accentImpulse;
        particle.vy += Math.sin(accentAngle) * accentImpulse;
      }
    }

    const speed = Math.hypot(particle.vx, particle.vy);
    if (speed < minSpeed) {
      const nextAngle = Math.random() * Math.PI * 2;
      particle.vx = Math.cos(nextAngle) * resetSpeed;
      particle.vy = Math.sin(nextAngle) * resetSpeed;
    }

    const distanceFromCenter = Math.hypot(particle.x, particle.y);
    const maxDistance = circleRadius - particle.radius;

    if (distanceFromCenter > maxDistance && distanceFromCenter > 0.0001) {
      const normalX = particle.x / distanceFromCenter;
      const normalY = particle.y / distanceFromCenter;
      const dotProduct = particle.vx * normalX + particle.vy * normalY;

      particle.x = normalX * maxDistance;
      particle.y = normalY * maxDistance;
      particle.vx -= 2 * dotProduct * normalX;
      particle.vy -= 2 * dotProduct * normalY;
    }

    const rotatedX =
      particle.x * Math.cos(-angle) - particle.y * Math.sin(-angle);
    const rotatedY =
      particle.x * Math.sin(-angle) + particle.y * Math.cos(-angle);
    const boundary = isRightHalf ? particle.radius : -particle.radius;
    const isOutside = isRightHalf ? rotatedX < boundary : rotatedX > boundary;

    if (isOutside) {
      const velocityX =
        particle.vx * Math.cos(-angle) - particle.vy * Math.sin(-angle);
      const velocityY =
        particle.vx * Math.sin(-angle) + particle.vy * Math.cos(-angle);
      const nextVelocityX = -velocityX * boundaryBounce;

      particle.vx =
        nextVelocityX * Math.cos(angle) - velocityY * Math.sin(angle);
      particle.vy =
        nextVelocityX * Math.sin(angle) + velocityY * Math.cos(angle);
      particle.x = boundary * Math.cos(angle) - rotatedY * Math.sin(angle);
      particle.y = boundary * Math.sin(angle) + rotatedY * Math.cos(angle);
    }
  }
}

function updateBall({
  angle,
  ball,
  ballRadius,
  beatKick,
  beatSquash,
  bounce,
  circleRadius,
  gravity,
  isLeftSide,
  speedBoost,
}: {
  angle: number;
  ball: BallState;
  ballRadius: number;
  beatKick: number;
  beatSquash: number;
  bounce: number;
  circleRadius: number;
  gravity: number;
  isLeftSide: boolean;
  speedBoost: number;
}) {
  const beatImpulse = (beatKick - 1) * (circleRadius < 180 ? 0.9 : 1.2);

  if (beatImpulse > 0) {
    const speed = Math.hypot(ball.vx, ball.vy);

    if (speed > 0.0001) {
      ball.vx += (ball.vx / speed) * beatImpulse;
      ball.vy += (ball.vy / speed) * beatImpulse * 0.9;
    } else {
      ball.vx += (isLeftSide ? 1 : -1) * beatImpulse;
      ball.vy -= beatImpulse * 0.6;
    }

    ball.squashAmount = Math.max(ball.squashAmount, beatSquash);
  }

  ball.vy += gravity;
  ball.vx *= FRICTION;
  ball.vy *= FRICTION;
  ball.x += ball.vx;
  ball.y += ball.vy;

  const distance = Math.hypot(ball.x, ball.y);
  const maxDistance = circleRadius - ballRadius;

  if (distance > maxDistance) {
    const normalX = ball.x / distance;
    const normalY = ball.y / distance;
    const dotProduct = ball.vx * normalX + ball.vy * normalY;

    ball.x = normalX * maxDistance;
    ball.y = normalY * maxDistance;
    ball.vx -= 2 * dotProduct * normalX;
    ball.vy -= 2 * dotProduct * normalY;
    ball.vx *= bounce;
    ball.vy *= bounce;

    const collisionSpeed = Math.hypot(ball.vx, ball.vy);
    const speedThreshold = maxDistance < 180 ? 6 : 10;
    const boostAmount = (maxDistance < 180 ? 1.5 : 1.8) * speedBoost;

    if (collisionSpeed < speedThreshold) {
      ball.vx *= boostAmount;
      ball.vy *= boostAmount;
    }

    ball.squashAmount = Math.min(Math.abs(dotProduct) * 0.04, 0.35);
  }

  const rotatedX = ball.x * Math.cos(-angle) - ball.y * Math.sin(-angle);
  const rotatedY = ball.x * Math.sin(-angle) + ball.y * Math.cos(-angle);

  if (isLeftSide) {
    if (rotatedX > -ballRadius) {
      const reflectedX = -ballRadius;
      const velocityX = ball.vx * Math.cos(-angle) - ball.vy * Math.sin(-angle);
      const velocityY = ball.vx * Math.sin(-angle) + ball.vy * Math.cos(-angle);
      const nextVelocityX = -velocityX * bounce;

      ball.vx = nextVelocityX * Math.cos(angle) - velocityY * Math.sin(angle);
      ball.vy = nextVelocityX * Math.sin(angle) + velocityY * Math.cos(angle);
      ball.x = reflectedX * Math.cos(angle) - rotatedY * Math.sin(angle);
      ball.y = reflectedX * Math.sin(angle) + rotatedY * Math.cos(angle);
    }
  } else if (rotatedX < ballRadius) {
    const reflectedX = ballRadius;
    const velocityX = ball.vx * Math.cos(-angle) - ball.vy * Math.sin(-angle);
    const velocityY = ball.vx * Math.sin(-angle) + ball.vy * Math.cos(-angle);
    const nextVelocityX = -velocityX * bounce;

    ball.vx = nextVelocityX * Math.cos(angle) - velocityY * Math.sin(angle);
    ball.vy = nextVelocityX * Math.sin(angle) + velocityY * Math.cos(angle);
    ball.x = reflectedX * Math.cos(angle) - rotatedY * Math.sin(angle);
    ball.y = reflectedX * Math.sin(angle) + rotatedY * Math.cos(angle);
  }

  ball.squashAmount *= 1 - SQUASH_RECOVERY;

  const speed = Math.hypot(ball.vx, ball.vy);
  const stretchAmount = Math.min(speed * 0.01, 0.2);

  if (ball.squashAmount > stretchAmount) {
    ball.scaleX = 1 + ball.squashAmount;
    ball.scaleY = 1 - ball.squashAmount * 0.5;
  } else {
    ball.scaleX = 1 - stretchAmount * 0.3;
    ball.scaleY = 1 + stretchAmount * 0.5;
  }
}

export default function BwCircleScene({
  audioSync,
  bpm,
  mode,
  playback,
  syncOverlay,
}: {
  audioSync: BwCircleAudioSyncState;
  bpm: number;
  mode: "mimesis" | "sync";
  playback: BwCirclePlaybackState;
  syncOverlay?: ReactNode;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const bpmRef = useRef(bpm);
  const playbackRef = useRef(playback);
  const modeRef = useRef(mode);
  const shouldReduceMotion = useReducedMotion() ?? false;
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const audioSyncRef = useRef(audioSync);
  const frequencyDataRef = useRef<Uint8Array<ArrayBuffer> | null>(null);
  const mediaSourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const previousAudioEnergyRef = useRef(0);

  useEffect(() => {
    playbackRef.current = playback;
  }, [playback]);

  useEffect(() => {
    bpmRef.current = bpm;
  }, [bpm]);

  useEffect(() => {
    modeRef.current = mode;
  }, [mode]);

  useEffect(() => {
    audioSyncRef.current = audioSync;
  }, [audioSync]);

  useEffect(() => {
    const disconnectAudioGraph = () => {
      mediaSourceRef.current?.disconnect();
      analyserRef.current?.disconnect();
      mediaSourceRef.current = null;
      analyserRef.current = null;
      frequencyDataRef.current = null;
      previousAudioEnergyRef.current = 0;
    };

    if (mode !== "sync" || audioSync.status !== "active" || !audioSync.stream) {
      disconnectAudioGraph();
      return;
    }

    const AudioContextConstructor = getAudioContextConstructor();

    if (!AudioContextConstructor) {
      disconnectAudioGraph();
      return;
    }

    if (!audioContextRef.current) {
      audioContextRef.current = new AudioContextConstructor();
    }

    const audioContext = audioContextRef.current;
    const mediaSource = audioContext.createMediaStreamSource(audioSync.stream);
    const analyser = audioContext.createAnalyser();

    analyser.fftSize = 1024;
    analyser.smoothingTimeConstant = shouldReduceMotion ? 0.84 : 0.72;
    mediaSource.connect(analyser);

    mediaSourceRef.current = mediaSource;
    analyserRef.current = analyser;
    frequencyDataRef.current = new Uint8Array(analyser.frequencyBinCount);
    previousAudioEnergyRef.current = 0;

    void audioContext.resume?.();

    return () => {
      disconnectAudioGraph();
    };
  }, [audioSync.status, audioSync.stream, mode, shouldReduceMotion]);

  useEffect(() => {
    return () => {
      mediaSourceRef.current?.disconnect();
      analyserRef.current?.disconnect();
      mediaSourceRef.current = null;
      analyserRef.current = null;
      frequencyDataRef.current = null;
      previousAudioEnergyRef.current = 0;

      const audioContext = audioContextRef.current;
      audioContextRef.current = null;

      void audioContext?.close?.();
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) {
      return;
    }

    const context = canvas.getContext("2d");

    if (!context) {
      return;
    }

    let width = 0;
    let height = 0;
    let animationFrame = 0;
    let sceneState = createSceneState(1440, 1440);

    const resize = () => {
      const parent = canvas.parentElement;

      if (!parent) {
        return;
      }

      const bounds = parent.getBoundingClientRect();
      const ratio = window.devicePixelRatio || 1;
      width = bounds.width;
      height = bounds.height;
      canvas.width = Math.max(1, Math.round(bounds.width * ratio));
      canvas.height = Math.max(1, Math.round(bounds.height * ratio));
      canvas.style.width = `${bounds.width}px`;
      canvas.style.height = `${bounds.height}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      sceneState = createSceneState(bounds.width, window.innerWidth);
    };

    const render = () => {
      const layout = createMimesisLayout(width || window.innerWidth, window.innerWidth);
      const ballRadius = layout.ballRadius;
      const now = new Date();
      const secondsWithinMinute =
        now.getSeconds() + now.getMilliseconds() / 1000;
      const mimesisCue = createMimesisCue({ secondsWithinMinute });
      const playbackValue = playbackRef.current;
      const modeValue = modeRef.current;
      const analyser = analyserRef.current;
      const frequencyData = frequencyDataRef.current;
      const syncMotion =
        modeValue === "sync"
          ? createSyncMotionProfile({
              currentTime: playbackValue.currentTime,
              isPlaying: playbackValue.isPlaying,
              sampledAtMs: playbackValue.sampledAtMs,
              nowMs: performance.now(),
              bpm: bpmRef.current,
              baseCameraMode: "normal",
              shouldReduceMotion,
            })
          : null;
      const syncCue = syncMotion?.syncCue ?? null;
      const audioCue =
        modeValue === "sync" &&
        playbackValue.isPlaying &&
        analyser &&
        frequencyData &&
        audioSyncRef.current.status === "active"
          ? (() => {
              analyser.getByteFrequencyData(frequencyData);

              const levels = measureBwCircleFrequencyLevels(frequencyData);
              const nextCue = createBwCircleAudioCue({
                energy: levels.energy,
                bassEnergy: levels.bassEnergy,
                previousEnergy: previousAudioEnergyRef.current,
                shouldReduceMotion,
              });

              previousAudioEnergyRef.current = levels.energy;

              return nextCue;
            })()
          : null;
      const syncEnergy =
        audioCue !== null
          ? clamp(audioCue.energy * 0.68 + audioCue.bassEnergy * 0.32, 0, 1)
          : (syncCue?.energy ?? 0.28);
      const syncPulse =
        audioCue !== null
          ? clamp(audioCue.onsetStrength * 0.72 + audioCue.bassEnergy * 0.28, 0, 1)
          : (syncCue?.pulseStrength ?? 0);
      const syncSeconds =
        (((syncMotion?.predictedCurrentTime ?? playbackValue.currentTime) % 60) + 60) %
        60;
      const syncAngle =
        createMimesisCue({ secondsWithinMinute: syncSeconds }).angle +
        (modeValue === "sync" ? (syncPulse - 0.5) * 0.1 : 0);
      const angle =
        modeValue === "sync" && playbackValue.isPlaying ? syncAngle : mimesisCue.angle;
      const gravity =
        layout.gravity *
        (modeValue === "sync" && playbackValue.isPlaying
          ? shouldReduceMotion
            ? 1
            : 0.9 + syncEnergy * 0.25
          : 1);
      const bounce =
        layout.bounce +
        (modeValue === "sync" && playbackValue.isPlaying && !shouldReduceMotion
          ? (syncEnergy - 0.35) * 0.05
          : 0);
      const speedBoost =
        modeValue === "sync" && playbackValue.isPlaying && !shouldReduceMotion
          ? 0.92 + syncEnergy * 0.16
          : 1;
      const ballKick =
        modeValue === "sync"
          ? audioCue
            ? 1 +
              audioCue.bassEnergy * (shouldReduceMotion ? 0.12 : 0.24) +
              audioCue.onsetStrength * (shouldReduceMotion ? 0.08 : 0.18)
            : (syncMotion?.ballKick ?? 1)
          : 1;
      const ballSquash =
        modeValue === "sync"
          ? audioCue
            ? audioCue.bassEnergy * (shouldReduceMotion ? 0.03 : 0.05) +
              audioCue.onsetStrength * (shouldReduceMotion ? 0.05 : 0.13)
            : (syncMotion?.ballSquash ?? 0)
          : 0;
      const particleAccent =
        modeValue === "sync"
          ? audioCue
            ? 1 +
              audioCue.energy * (shouldReduceMotion ? 0.02 : 0.05) +
              audioCue.onsetStrength * (shouldReduceMotion ? 0.04 : 0.1)
            : (syncMotion?.particleAccent ?? 1)
          : 1;
      const diagonal = Math.hypot(width, height);

      updateBall({
        angle,
        ball: sceneState.leftBall,
        ballRadius,
        beatKick: ballKick,
        beatSquash: ballSquash,
        bounce,
        circleRadius: layout.circleRadius,
        gravity,
        isLeftSide: true,
        speedBoost,
      });
      updateBall({
        angle,
        ball: sceneState.rightBall,
        ballRadius,
        beatKick: ballKick,
        beatSquash: ballSquash,
        bounce,
        circleRadius: layout.circleRadius,
        gravity,
        isLeftSide: false,
        speedBoost,
      });
      updateParticles({
        angle,
        ball: sceneState.leftBall,
        circleRadius: layout.circleRadius,
        isRightHalf: false,
        particleAccent,
        particles: sceneState.leftParticles,
      });
      updateParticles({
        angle,
        ball: sceneState.rightBall,
        circleRadius: layout.circleRadius,
        isRightHalf: true,
        particleAccent,
        particles: sceneState.rightParticles,
      });

      context.clearRect(0, 0, width, height);

      context.save();
      context.translate(width / 2, height / 2);
      context.rotate(angle);
      context.fillStyle = "#000000";
      context.fillRect(-diagonal, -diagonal, diagonal, diagonal * 2);
      context.fillStyle = "#ffffff";
      context.fillRect(0, -diagonal, diagonal, diagonal * 2);
      context.restore();

      context.save();
      context.translate(width / 2, height / 2);
      context.beginPath();
      context.arc(0, 0, layout.circleRadius, 0, Math.PI * 2);
      context.clip();
      context.rotate(angle);
      context.fillStyle = "#ffffff";
      context.fillRect(-diagonal, -diagonal, diagonal, diagonal * 2);
      context.fillStyle = "#000000";
      context.fillRect(0, -diagonal, diagonal, diagonal * 2);
      context.restore();

      context.save();
      context.translate(width / 2, height / 2);
      context.beginPath();
      context.arc(0, 0, layout.circleRadius, 0, Math.PI * 2);
      context.clip();
      context.beginPath();
      context.fillStyle = "#ffffff";
      for (const particle of sceneState.rightParticles) {
        context.moveTo(particle.x + particle.radius, particle.y);
        context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      }
      context.fill();
      context.beginPath();
      context.fillStyle = "#000000";
      for (const particle of sceneState.leftParticles) {
        context.moveTo(particle.x + particle.radius, particle.y);
        context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      }
      context.fill();
      drawBall(context, sceneState.leftBall, ballRadius);
      drawBall(context, sceneState.rightBall, ballRadius);
      context.restore();

      animationFrame = window.requestAnimationFrame(render);
    };

    resize();
    window.addEventListener("resize", resize);
    animationFrame = window.requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", resize);
      window.cancelAnimationFrame(animationFrame);
    };
  }, [shouldReduceMotion]);

  return (
    <div className={styles.sceneShell} data-scene-mode={mode}>
      {syncOverlay ? syncOverlay : null}
      <div className={styles.cameraToggle}>
        <button
          className={`${styles.cameraButton} ${styles.cameraButtonActive}`}
          type="button"
        >
          N
        </button>
      </div>
      <canvas
        aria-label="Black and white circle canvas"
        className={styles.canvas}
        ref={canvasRef}
      />
    </div>
  );
}
