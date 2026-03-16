"use client";

import { Text } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef, type MutableRefObject } from "react";
import type * as THREE from "three";
import WiperTypographySceneFrame from "./WiperTypographySceneFrame";
import type { InteractiveProjectProps } from "../types";
import { computeBarDepth } from "./wiperMath";
import {
  stepWiperSimulationState,
  type WiperGlyphState,
} from "./wiperSimulation";
import { useWiperSceneSimulation3D } from "./useWiperSceneSimulation3D";

type GlyphTextMesh = THREE.Object3D & {
  sync?: () => void;
  text?: string;
};

function BarsScene({
  phaseRef,
}: {
  phaseRef: MutableRefObject<number>;
}) {
  const barRefs = useRef<Array<THREE.Mesh | null>>([]);
  const glyphRefs = useRef<Array<GlyphTextMesh | null>>([]);
  const { glyphFontSize, projectX, projectY, scale, simulation } =
    useWiperSceneSimulation3D({
      widthRatio: 0.86,
      heightRatio: 0.86,
    });

  useFrame(() => {
    stepWiperSimulationState(simulation, phaseRef.current);

    for (const glyph of simulation.glyphs) {
      const mesh = glyphRefs.current[glyph.index];
      if (!mesh) {
        continue;
      }

      mesh.position.set(projectX(glyph.x), projectY(glyph.y), -0.68);
      mesh.rotation.set(0, 0, -glyph.rotation * Math.PI);

      if (mesh.text !== glyph.text) {
        mesh.text = glyph.text;
        mesh.sync?.();
      }
    }

    for (const bar of simulation.bars) {
      const mesh = barRefs.current[bar.index];
      if (!mesh) {
        continue;
      }

      const depth = computeBarDepth(bar.index);
      mesh.position.set(projectX(bar.x), projectY(bar.y), depth * 0.5);
      mesh.rotation.set(0, 0, -bar.rotation);
      mesh.scale.set(bar.width * scale, bar.height * scale, depth);
    }
  });

  return (
    <>
      {simulation.glyphs.map((glyph: WiperGlyphState) => (
        <Text
          key={glyph.index}
          anchorX="center"
          anchorY="middle"
          color="#ffffff"
          fontSize={glyphFontSize}
          position={[projectX(glyph.x), projectY(glyph.y), -0.68]}
          ref={(node) => {
            glyphRefs.current[glyph.index] = node as GlyphTextMesh | null;
          }}
        >
          {glyph.text}
        </Text>
      ))}

      {simulation.bars.map((bar) => (
        <mesh
          key={bar.index}
          castShadow
          receiveShadow
          ref={(node) => {
            barRefs.current[bar.index] = node;
          }}
        >
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="#111111" metalness={0.08} roughness={0.38} />
        </mesh>
      ))}
    </>
  );
}

export default function WiperTypographySceneBars3D({
  projectId,
}: InteractiveProjectProps) {
  return (
    <WiperTypographySceneFrame
      projectId={projectId}
      renderScene={({ phaseRef }) => <BarsScene phaseRef={phaseRef} />}
    />
  );
}
