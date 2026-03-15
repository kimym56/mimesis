"use client";

import { useEffect, useRef } from "react";
import type { InteractiveProjectProps } from "../types";
import {
  WIPER_BACKGROUND_COLOR,
  WIPER_BAR_COLOR,
  WIPER_GLYPH_COLOR,
  WIPER_GLYPH_FONT_SIZE,
  WIPER_GLYPH_TEXT_OFFSET_Y,
} from "./wiperConfig";
import {
  createWiperSimulationState,
  detectWiperParticleCount,
  stepWiperSimulationState,
  type WiperBarState,
  type WiperGlyphState,
  type WiperSimulationState,
} from "./wiperSimulation";
import styles from "./WiperTypographyProject.module.css";
import { useWiperInteraction } from "./useWiperInteraction";

function drawGlyph(
  context: CanvasRenderingContext2D,
  glyph: WiperGlyphState
) {
  context.save();
  context.translate(glyph.x, glyph.y);
  context.rotate(glyph.rotation * Math.PI);
  context.textAlign = "center";
  context.font = `bold ${WIPER_GLYPH_FONT_SIZE}px Helvetica`;
  context.fillStyle = WIPER_GLYPH_COLOR;
  context.fillText(glyph.text, 0, WIPER_GLYPH_TEXT_OFFSET_Y);
  context.restore();
}

function drawBar(context: CanvasRenderingContext2D, bar: WiperBarState) {
  context.save();
  context.fillStyle = WIPER_BAR_COLOR;
  context.translate(bar.x, bar.y);
  context.rotate(bar.rotation);
  context.fillRect(-bar.radius, -bar.height * 0.5, bar.width, bar.height);
  context.restore();
}

export default function WiperTypographyCanvas2D({
  projectId,
}: InteractiveProjectProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { containerRef, dragLayerRef, dragLayerProps, phaseRef, sizeRef, tick } =
    useWiperInteraction({ interactionMode: "legacy-phase", margin: 0 });

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
    let scene: WiperSimulationState | null = null;

    const buildScene = () => {
      width = Math.max(1, sizeRef.current.width);
      height = Math.max(1, sizeRef.current.height);
      dpr = window.devicePixelRatio || 1;

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);

      scene = createWiperSimulationState({
        width,
        height,
        particleCount: detectWiperParticleCount(),
        phase: phaseRef.current,
      });
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
      if (scene === null) {
        buildScene();
      }

      if (scene === null) {
        frame = window.requestAnimationFrame(tickFrame);
        return;
      }

      stepWiperSimulationState(scene, phase);

      context.fillStyle = WIPER_BACKGROUND_COLOR;
      context.fillRect(0, 0, width, height);

      for (const glyph of scene.glyphs) {
        drawGlyph(context, glyph);
      }

      for (const bar of scene.bars) {
        drawBar(context, bar);
      }

      frame = window.requestAnimationFrame(tickFrame);
    };

    buildScene();
    frame = window.requestAnimationFrame(tickFrame);

    return () => {
      window.cancelAnimationFrame(frame);
    };
  }, [containerRef, phaseRef, sizeRef, tick]);

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
