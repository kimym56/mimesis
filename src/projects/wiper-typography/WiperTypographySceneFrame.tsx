"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, type MutableRefObject, type ReactNode } from "react";
import type { InteractiveProjectProps } from "../types";
import { WIPER_BACKGROUND_COLOR } from "./wiperConfig";
import styles from "./WiperTypographyProject.module.css";
import { useWiperInteraction } from "./useWiperInteraction";

interface WiperSceneFrameModel {
  phaseRef: MutableRefObject<number>;
  sizeRef: MutableRefObject<{ width: number; height: number }>;
}

function PhaseDriver({ tick }: { tick: () => number }) {
  useFrame(() => {
    tick();
  });

  return null;
}

export default function WiperTypographySceneFrame({
  projectId,
  renderScene,
}: InteractiveProjectProps & {
  renderScene: (model: WiperSceneFrameModel) => ReactNode;
}) {
  const { containerRef, dragLayerRef, dragLayerProps, phaseRef, sizeRef, tick } =
    useWiperInteraction({ margin: 0 });

  return (
    <div
      className={styles.wrapper}
      data-project-id={projectId}
      ref={containerRef}
      role="img"
      aria-label="Interactive wiper typography simulation"
    >
      <Canvas
        camera={{ position: [0, 0, 6], fov: 40 }}
        dpr={[1, 2]}
        style={{ inset: 0, position: "absolute" }}
      >
        <color attach="background" args={[WIPER_BACKGROUND_COLOR]} />
        <ambientLight intensity={0.55} />
        <directionalLight intensity={1.05} position={[5, 6, 8]} />
        <PhaseDriver tick={tick} />
        <Suspense fallback={null}>
          {renderScene({ phaseRef, sizeRef })}
        </Suspense>
      </Canvas>
      <div className={styles.dragLayer} ref={dragLayerRef} {...dragLayerProps} />
    </div>
  );
}
