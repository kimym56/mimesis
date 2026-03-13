"use client";

import { useEffect, useRef } from "react";
import type { InteractiveProjectProps } from "../types";
import {
  WIPER_BACKGROUND_COLOR,
  WIPER_BAR_COLOR,
  WIPER_GLYPH_COLOR,
  WIPER_GLYPHS,
  WIPER_LINE_WIDTH,
  WIPER_PARTICLE_BUDGET,
} from "./wiperConfig";
import {
  computeLineCount,
  computeLineDimensions,
  computeLinePose,
} from "./wiperMath";
import styles from "./WiperTypographyProject.module.css";
import { useWiperInteraction } from "./useWiperInteraction";

const GLYPH_SIZE = 50;
const GLYPH_TEXT_SIZE = 40;
const GLYPH_TEXT_OFFSET_Y = 15;
const FRICTION = 0.93;
const GRAVITY = 0.1;
const INITIAL_VELOCITY = 1.4;
const COLLISION_PUSH = 0.4;

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
  private text = WIPER_GLYPHS[0];

  constructor(
    size: number,
    private friction: number,
    private gravity: number,
    private width: number,
    private height: number
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
    this.text = WIPER_GLYPHS[randomInt(0, WIPER_GLYPHS.length - 1)];
  }

  draw(context: CanvasRenderingContext2D) {
    this.rotate += 0.01;

    context.save();
    context.translate(this.x, this.y);
    context.rotate(this.rotate * Math.PI);
    context.textAlign = "center";
    context.font = `bold ${GLYPH_TEXT_SIZE}px Helvetica`;
    context.fillStyle = WIPER_GLYPH_COLOR;
    context.fillText(this.text, 0, GLYPH_TEXT_OFFSET_Y);
    context.restore();
  }

  move() {
    this.vx *= this.friction;
    this.vy *= this.friction;
    this.vy += this.gravity;
    this.x += this.vx;
    this.y += this.vy;

    if (this.x - this.radius > this.width || this.x + this.radius < 0) {
      this.reset();
      return;
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

  private halfHeight: number;
  private height: number;

  constructor(
    private index: number,
    private width: number,
    private stageWidth: number,
    private stageHeight: number
  ) {
    const dimensions = computeLineDimensions(index, width);
    this.radius = dimensions.width * 0.5;
    this.height = dimensions.height;
    this.halfHeight = this.height * 0.5;
  }

  move(phase: number) {
    const pose = computeLinePose(
      this.index,
      phase,
      this.stageWidth,
      this.stageHeight,
      this.width
    );
    this.x = pose.x;
    this.y = pose.y;
    this.rotation = phase;
  }

  draw(context: CanvasRenderingContext2D) {
    context.save();
    context.fillStyle = WIPER_BAR_COLOR;
    context.translate(this.x, this.y);
    context.rotate(this.rotation * Math.PI);
    context.fillRect(-this.radius, -this.halfHeight, this.width, this.height);
    context.restore();
  }
}

export default function WiperTypographyCanvas2D({
  projectId,
}: InteractiveProjectProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { containerRef, dragLayerRef, dragLayerProps, sizeRef, tick } =
    useWiperInteraction({ margin: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) {
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

    const buildScene = () => {
      width = Math.max(1, sizeRef.current.width);
      height = Math.max(1, sizeRef.current.height);
      dpr = window.devicePixelRatio || 1;

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);

      entities = [];

      const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
      const isIpad =
        /iPad/.test(navigator.userAgent) ||
        (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
      const baseParticles = coarsePointer
        ? isIpad
          ? WIPER_PARTICLE_BUDGET.tablet
          : WIPER_PARTICLE_BUDGET.mobile
        : WIPER_PARTICLE_BUDGET.desktop;

      const lineCount = computeLineCount(height, WIPER_LINE_WIDTH);

      for (let index = 0; index < baseParticles; index += 1) {
        entities.push(new WiperGlyph(GLYPH_SIZE, FRICTION, GRAVITY, width, height));
      }

      for (let index = 0; index < lineCount; index += 1) {
        entities.push(new WiperLine(index, WIPER_LINE_WIDTH, width, height));
      }
    };

    const ensureStage = () => {
      const { width: nextWidth, height: nextHeight } = sizeRef.current;
      const nextDpr = window.devicePixelRatio || 1;
      if (nextWidth !== width || nextHeight !== height || nextDpr !== dpr) {
        buildScene();
      }
    };

    const tickFrame = () => {
      ensureStage();

      const phase = tick();

      context.fillStyle = WIPER_BACKGROUND_COLOR;
      context.fillRect(0, 0, width, height);

      for (let currentIndex = 0; currentIndex < entities.length - 1; currentIndex += 1) {
        const current = entities[currentIndex];

        for (
          let targetIndex = currentIndex + 1;
          targetIndex < entities.length;
          targetIndex += 1
        ) {
          const target = entities[targetIndex];
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

      for (const entity of entities) {
        entity.draw(context);
        entity.move(phase);
      }

      frame = window.requestAnimationFrame(tickFrame);
    };

    buildScene();
    frame = window.requestAnimationFrame(tickFrame);

    return () => {
      window.cancelAnimationFrame(frame);
    };
  }, [containerRef, sizeRef, tick]);

  return (
    <div
      className={styles.wrapper}
      data-project-id={projectId}
      ref={containerRef}
      role="img"
      aria-label="Interactive wiper typography simulation"
    >
      <canvas className={styles.canvas} ref={canvasRef} />
      <div className={styles.dragLayer} ref={dragLayerRef} {...dragLayerProps} />
    </div>
  );
}
