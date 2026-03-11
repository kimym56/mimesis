"use client";

import { useEffect, useRef } from "react";
import type { InteractiveProjectProps } from "../types";
import {
  WIPER_MARGIN,
  computeLinePose,
  isPointerInsideActiveRange,
  mapPointerXToPhase,
} from "./wiperMath";
import styles from "./WiperTypographyProject.module.css";

const GLYPHS = "TYPOGRH".split("");
const GLYPH_SIZE = 50;
const GLYPH_TEXT_SIZE = 40;
const GLYPH_TEXT_OFFSET_Y = 15;
const LINE_WIDTH = 22;
const FRICTION = 0.93;
const GRAVITY = 0.1;
const INITIAL_VELOCITY = 1.4;
const COLLISION_PUSH = 0.4;
const BASE_PARTICLES_DESKTOP = 120;
const BASE_PARTICLES_TABLET = 80;
const BASE_PARTICLES_MOBILE = 50;
const AUTOPLAY_SPEED = 0.01;

const randomInt = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

interface WiperEntity {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  move(phase: number): void;
  draw(context: CanvasRenderingContext2D): void;
}

class WiperGlyph implements WiperEntity {
  x = 0;
  y = 0;
  vx = 0;
  vy = 0;
  radius: number;

  private rotate = 0;
  private text = GLYPHS[0];

  constructor(
    size: number,
    private friction: number,
    private gravity: number,
    private width: number,
    private height: number,
  ) {
    this.radius = size * 0.5;
    this.reset();
  }

  private reset() {
    this.x = randomInt(0, this.width);
    this.y = -30;
    this.vx = Math.random() * (INITIAL_VELOCITY * 2) - INITIAL_VELOCITY;
    this.vy = Math.random() * (INITIAL_VELOCITY * 2) - INITIAL_VELOCITY;
    this.rotate = 0;
    this.text = GLYPHS[randomInt(0, GLYPHS.length - 1)];
  }

  draw(context: CanvasRenderingContext2D) {
    this.rotate += 0.01;

    context.save();
    context.beginPath();
    context.translate(this.x, this.y);
    context.rotate(this.rotate * Math.PI);
    context.textAlign = "center";
    context.font = `bold ${GLYPH_TEXT_SIZE}px Helvetica`;
    context.fillStyle = "rgb(255, 255, 255)";
    context.fillText(this.text, 0, GLYPH_TEXT_OFFSET_Y);
    context.restore();
  }

  move() {
    this.vx *= this.friction;
    this.vy *= this.friction;
    this.vy += this.gravity;
    this.x += this.vx;
    this.y += this.vy;

    if (this.x - this.radius > this.width) {
      this.reset();
    } else if (this.x + this.radius < 0) {
      this.reset();
    }

    if (this.y - this.radius > this.height) {
      this.reset();
    }
  }
}

class WiperLine implements WiperEntity {
  x = 0;
  y = 0;
  vx = 0;
  vy = 0;
  rotation = 0;
  radius: number;

  private hh: number;
  private h: number;

  constructor(
    private index: number,
    private width: number,
    private stageWidth: number,
    private stageHeight: number,
  ) {
    this.radius = width * 0.5;
    this.h = width - 0.2 * index;
    this.hh = this.h * 0.5;
  }

  move(phase: number) {
    const pose = computeLinePose(
      this.index,
      phase,
      this.stageWidth,
      this.stageHeight,
      this.width,
    );
    this.x = pose.x;
    this.y = pose.y;
    this.rotation = phase;
  }

  draw(context: CanvasRenderingContext2D) {
    context.save();
    context.beginPath();
    context.fillStyle = "rgb(0, 0, 0)";
    context.translate(this.x, this.y);
    context.rotate(this.rotation * Math.PI);
    context.fillRect(-this.radius, -this.hh, this.width, this.h);
    context.restore();
  }
}

export default function WiperTypographyProject({
  projectId,
}: InteractiveProjectProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dragLayerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    const dragLayer = dragLayerRef.current;
    if (!container || !canvas || !dragLayer) {
      return;
    }

    const context = canvas.getContext("2d");
    if (!context) {
      return;
    }

    let frame = 0;
    let width = 1;
    let height = 1;
    let dpr = 1;

    let entities: WiperEntity[] = [];

    let phase = 0;
    let autoPhaseAngle = 0;
    let pointerOnCanvas = false;

    const updateDragOverlayBounds = () => {
      dragLayer.style.left = `${WIPER_MARGIN}px`;
      dragLayer.style.width = `${Math.max(0, width - WIPER_MARGIN * 2)}px`;
    };

    const buildScene = () => {
      entities = [];

      const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
      const isIpad =
        /iPad/.test(navigator.userAgent) ||
        (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
      const baseParticles = coarsePointer
        ? isIpad
          ? BASE_PARTICLES_TABLET
          : BASE_PARTICLES_MOBILE
        : BASE_PARTICLES_DESKTOP;

      const lineCount = Math.floor((height / LINE_WIDTH) * 1.2);

      for (let i = 0; i < baseParticles; i += 1) {
        entities.push(
          new WiperGlyph(GLYPH_SIZE, FRICTION, GRAVITY, width, height),
        );
      }

      for (let i = 0; i < lineCount; i += 1) {
        entities.push(new WiperLine(i, LINE_WIDTH, width, height));
      }
    };

    const resize = () => {
      const rect = container.getBoundingClientRect();
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      dpr = window.devicePixelRatio || 1;

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      context.setTransform(dpr, 0, 0, dpr, 0, 0);

      updateDragOverlayBounds();
      buildScene();
    };

    const getPointerX = (event: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      return event.clientX - rect.left;
    };

    const updatePhaseFromPointer = (event: PointerEvent) => {
      const pointerX = getPointerX(event);
      if (!isPointerInsideActiveRange(pointerX, width)) {
        pointerOnCanvas = false;
        return;
      }
      pointerOnCanvas = true;
      phase = mapPointerXToPhase(pointerX, width);
    };

    const syncAutoplayPhase = () => {
      const safePhase = Math.max(0, Math.min(1, phase));
      autoPhaseAngle = Math.asin(safePhase);
    };

    const onPointerEnter = (event: PointerEvent) => {
      updatePhaseFromPointer(event);
    };

    const onPointerLeave = () => {
      pointerOnCanvas = false;
      syncAutoplayPhase();
    };

    const onPointerCancel = () => {
      pointerOnCanvas = false;
      syncAutoplayPhase();
    };

    const tick = () => {
      if (!pointerOnCanvas) {
        autoPhaseAngle += AUTOPLAY_SPEED;
        phase = Math.abs(Math.sin(autoPhaseAngle));
      }

      context.fillStyle = "#1171b2";
      context.fillRect(0, 0, width, height);

      for (let i = 0; i < entities.length - 1; i += 1) {
        const current = entities[i];

        for (let j = i + 1; j < entities.length; j += 1) {
          const target = entities[j];
          const dx = target.x - current.x;
          const dy = target.y - current.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const radiusSum = current.radius + target.radius;

          if (distance >= radiusSum || distance === 0) {
            continue;
          }

          const angle = Math.atan2(dy, dx);
          const nextX = current.x + Math.cos(angle) * radiusSum;
          const nextY = current.y + Math.sin(angle) * radiusSum;
          const impulseX = COLLISION_PUSH * (nextX - target.x);
          const impulseY = COLLISION_PUSH * (nextY - target.y);

          current.vx -= impulseX;
          current.vy -= impulseY;
          target.vx += impulseX;
          target.vy += impulseY;
        }
      }

      for (let i = 0; i < entities.length; i += 1) {
        entities[i].draw(context);
        entities[i].move(phase);
      }

      frame = window.requestAnimationFrame(tick);
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);

    dragLayer.addEventListener("pointerenter", onPointerEnter);
    dragLayer.addEventListener("pointermove", updatePhaseFromPointer);
    dragLayer.addEventListener("pointerleave", onPointerLeave);
    dragLayer.addEventListener("pointercancel", onPointerCancel);

    resize();
    frame = window.requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      dragLayer.removeEventListener("pointerenter", onPointerEnter);
      dragLayer.removeEventListener("pointermove", updatePhaseFromPointer);
      dragLayer.removeEventListener("pointerleave", onPointerLeave);
      dragLayer.removeEventListener("pointercancel", onPointerCancel);
    };
  }, []);

  return (
    <div
      className={styles.wrapper}
      data-project-id={projectId}
      ref={containerRef}
      role="img"
      aria-label="Interactive wiper typography simulation"
    >
      <canvas className={styles.canvas} ref={canvasRef} />
      <div className={styles.dragLayer} ref={dragLayerRef} />
    </div>
  );
}
