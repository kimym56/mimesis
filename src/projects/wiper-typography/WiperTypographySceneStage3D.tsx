"use client";

import { useFrame } from "@react-three/fiber";
import { useRef, type MutableRefObject } from "react";
import type * as THREE from "three";
import type { InteractiveProjectProps } from "../types";
import WiperTypographyExtrudedGlyph3D from "./WiperTypographyExtrudedGlyph3D";
import WiperTypographySceneFrame from "./WiperTypographySceneFrame";
import { getWiperGlyphGeometry } from "./wiperGlyphGeometry";
import {
  computeBarDepth,
  computeGlyphLayerDepth,
  computeStageCameraOffset,
} from "./wiperMath";
import {
  stepWiperSimulationState,
  type WiperGlyphState,
} from "./wiperSimulation";
import { useWiperSceneSimulation3D } from "./useWiperSceneSimulation3D";

type GlyphMesh = THREE.Mesh;

const STAGE_GLYPH_LAYER_COUNT = 3;

function StageScene({
  phaseRef,
}: {
  phaseRef: MutableRefObject<number>;
}) {
  const barRefs = useRef<Array<THREE.Mesh | null>>([]);
  const glyphRefs = useRef<Array<GlyphMesh | null>>([]);
  const { glyphScale, projectX, projectY, scale, simulation, worldHeight, worldWidth } =
    useWiperSceneSimulation3D({
      widthRatio: 0.82,
      heightRatio: 0.8,
    });

  useFrame(() => {
    stepWiperSimulationState(simulation, phaseRef.current);

    for (const glyph of simulation.glyphs) {
      const mesh = glyphRefs.current[glyph.index];
      if (!mesh) {
        continue;
      }

      const layerIndex = glyph.index % STAGE_GLYPH_LAYER_COUNT;
      const depth = computeGlyphLayerDepth(layerIndex, STAGE_GLYPH_LAYER_COUNT) * 0.16 - 0.9;
      const nextGeometry = getWiperGlyphGeometry(glyph.text);

      if (mesh.geometry !== nextGeometry) {
        mesh.geometry = nextGeometry;
      }

      mesh.position.set(projectX(glyph.x), projectY(glyph.y), depth);
      mesh.rotation.set(0, 0, -glyph.rotation * Math.PI);
      mesh.scale.set(glyphScale, glyphScale, glyphScale);
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
      <mesh
        position={[0, -worldHeight * 0.58, -0.18]}
        receiveShadow
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <planeGeometry args={[worldWidth * 1.25, worldHeight * 0.9]} />
        <meshStandardMaterial color="#0d4f7c" roughness={0.82} metalness={0.04} />
      </mesh>

      <mesh position={[0, 0, -1.05]} receiveShadow>
        <planeGeometry args={[worldWidth * 1.04, worldHeight * 0.94]} />
        <meshStandardMaterial color="#0f6299" roughness={0.86} metalness={0.02} />
      </mesh>

      {simulation.glyphs.map((glyph: WiperGlyphState) => {
        const layerIndex = glyph.index % STAGE_GLYPH_LAYER_COUNT;
        const depth = computeGlyphLayerDepth(layerIndex, STAGE_GLYPH_LAYER_COUNT) * 0.16 - 0.9;

        return (
          <WiperTypographyExtrudedGlyph3D
            glyph={glyph.text}
            key={glyph.index}
            position={[projectX(glyph.x), projectY(glyph.y), depth]}
            ref={(node) => {
              glyphRefs.current[glyph.index] = node;
            }}
            rotationZ={-glyph.rotation * Math.PI}
            scale={glyphScale}
          />
        );
      })}

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

export default function WiperTypographySceneStage3D({
  projectId,
}: InteractiveProjectProps) {
  return (
    <WiperTypographySceneFrame
      cameraBias={(phase) => {
        const offset = computeStageCameraOffset(phase);
        return {
          x: offset.x * 0.45,
          y: offset.y * 0.55,
        };
      }}
      projectId={projectId}
      renderScene={({ phaseRef }) => <StageScene phaseRef={phaseRef} />}
    />
  );
}
