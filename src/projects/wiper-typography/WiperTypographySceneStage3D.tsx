"use client";

import { useFrame } from "@react-three/fiber";
import { useRef, type MutableRefObject } from "react";
import type * as THREE from "three";
import type { InteractiveProjectProps } from "../types";
import WiperTypographyExtrudedGlyph3D from "./WiperTypographyExtrudedGlyph3D";
import WiperTypographySceneFrame from "./WiperTypographySceneFrame";
import { getWiperGlyphGeometry } from "./wiperGlyphGeometry";
import {
  WIPER_STAGE_DASHBOARD_COLOR,
  WIPER_STAGE_EXTERIOR_COLOR,
  WIPER_STAGE_GLYPH_DEPTH_OFFSET,
  WIPER_STAGE_GLYPH_DEPTH_SPREAD,
  WIPER_STAGE_GLYPH_SCALE_MULTIPLIER,
  WIPER_STAGE_GLASS_COLOR,
  WIPER_STAGE_GLASS_OPACITY,
  WIPER_STAGE_TRIM_COLOR,
  WIPER_STAGE_WIPER_ARM_COLOR,
  WIPER_STAGE_WIPER_BLADE_COLOR,
} from "./wiperConfig";
import {
  computeGlyphLayerDepth,
  computeStageCameraOffset,
} from "./wiperMath";
import {
  stepWiperSimulationState,
  type WiperGlyphState,
} from "./wiperSimulation";
import { useWiperSceneSimulation3D } from "./useWiperSceneSimulation3D";

type GlyphMesh = THREE.Mesh;
type WiperGroup = THREE.Group;

const STAGE_GLYPH_LAYER_COUNT = 3;

function getStageGlyphDepth(layerIndex: number) {
  return (
    computeGlyphLayerDepth(layerIndex, STAGE_GLYPH_LAYER_COUNT) *
      WIPER_STAGE_GLYPH_DEPTH_SPREAD +
    WIPER_STAGE_GLYPH_DEPTH_OFFSET
  );
}

function getCockpitWiperRotation(phase: number, side: "left" | "right") {
  const clampedPhase = Math.max(0, Math.min(1, phase));

  return side === "left"
    ? -1.04 + clampedPhase * 1.18
    : 0.98 - clampedPhase * 1.08;
}

function CockpitWiper({
  armLength,
  bladeLength,
  direction,
  groupRef,
  mount,
  rotationZ,
}: {
  armLength: number;
  bladeLength: number;
  direction: 1 | -1;
  groupRef: (node: WiperGroup | null) => void;
  mount: [number, number, number];
  rotationZ: number;
}) {
  const bladeThickness = Math.max(0.016, bladeLength * 0.05);
  const armThickness = bladeThickness * 0.45;
  const bladeOffsetX = direction * bladeLength * 0.22;
  const armOffsetX = direction * bladeThickness * 0.28;

  return (
    <group position={mount} ref={groupRef} rotation={[0, 0, rotationZ]}>
      <mesh castShadow position={[0, 0, 0.016]} receiveShadow>
        <boxGeometry args={[bladeThickness * 1.8, bladeThickness * 1.8, bladeThickness * 1.2]} />
        <meshStandardMaterial
          color={WIPER_STAGE_TRIM_COLOR}
          metalness={0.22}
          roughness={0.64}
        />
      </mesh>
      <mesh
        castShadow
        position={[armOffsetX, armLength * 0.52, 0.014]}
        receiveShadow
      >
        <boxGeometry args={[armThickness, armLength, armThickness * 0.9]} />
        <meshStandardMaterial
          color={WIPER_STAGE_WIPER_ARM_COLOR}
          metalness={0.16}
          roughness={0.52}
        />
      </mesh>
      <mesh
        castShadow
        position={[bladeOffsetX, armLength * 0.94, 0.02]}
        receiveShadow
      >
        <boxGeometry args={[bladeLength, bladeThickness, bladeThickness * 1.1]} />
        <meshStandardMaterial
          color={WIPER_STAGE_WIPER_BLADE_COLOR}
          metalness={0.08}
          roughness={0.38}
        />
      </mesh>
    </group>
  );
}

function StageScene({
  phaseRef,
}: {
  phaseRef: MutableRefObject<number>;
}) {
  const glyphRefs = useRef<Array<GlyphMesh | null>>([]);
  const leftWiperRef = useRef<WiperGroup | null>(null);
  const rightWiperRef = useRef<WiperGroup | null>(null);
  const { glyphScale, projectX, projectY, simulation, worldHeight, worldWidth } =
    useWiperSceneSimulation3D({
      widthRatio: 0.82,
      heightRatio: 0.8,
    });
  const stageGlyphScale = glyphScale * WIPER_STAGE_GLYPH_SCALE_MULTIPLIER;
  const windshieldY = worldHeight * 0.02;
  const windshieldZ = 0.08;
  const leftWiperMount: [number, number, number] = [
    -worldWidth * 0.21,
    -worldHeight * 0.48,
    windshieldZ + 0.08,
  ];
  const rightWiperMount: [number, number, number] = [
    worldWidth * 0.2,
    -worldHeight * 0.49,
    windshieldZ + 0.08,
  ];
  const wiperArmLength = worldHeight * 0.24;
  const wiperBladeLength = worldWidth * 0.42;

  useFrame(() => {
    stepWiperSimulationState(simulation, phaseRef.current);

    for (const glyph of simulation.glyphs) {
      const mesh = glyphRefs.current[glyph.index];
      if (!mesh) {
        continue;
      }

      const layerIndex = glyph.index % STAGE_GLYPH_LAYER_COUNT;
      const depth = getStageGlyphDepth(layerIndex);
      const nextGeometry = getWiperGlyphGeometry(glyph.text);

      if (mesh.geometry !== nextGeometry) {
        mesh.geometry = nextGeometry;
      }

      mesh.position.set(projectX(glyph.x), projectY(glyph.y), depth);
      mesh.rotation.set(0, 0, -glyph.rotation * Math.PI);
      mesh.scale.set(stageGlyphScale, stageGlyphScale, stageGlyphScale);
    }

    if (leftWiperRef.current) {
      leftWiperRef.current.rotation.set(0, 0, getCockpitWiperRotation(phaseRef.current, "left"));
    }

    if (rightWiperRef.current) {
      rightWiperRef.current.rotation.set(
        0,
        0,
        getCockpitWiperRotation(phaseRef.current, "right")
      );
    }
  });

  return (
    <>
      <mesh
        castShadow
        position={[0, -worldHeight * 0.63, 0.44]}
        receiveShadow
      >
        <boxGeometry args={[worldWidth * 1.3, worldHeight * 0.22, 0.5]} />
        <meshStandardMaterial
          color={WIPER_STAGE_DASHBOARD_COLOR}
          metalness={0.08}
          roughness={0.84}
        />
      </mesh>

      <mesh
        position={[0, -worldHeight * 0.42, 0.22]}
        receiveShadow
        rotation={[-0.16, 0, 0]}
      >
        <boxGeometry args={[worldWidth * 1.1, worldHeight * 0.04, 0.1]} />
        <meshStandardMaterial color={WIPER_STAGE_TRIM_COLOR} metalness={0.16} roughness={0.68} />
      </mesh>

      <mesh
        position={[-worldWidth * 0.55, windshieldY, -0.02]}
        receiveShadow
        rotation={[0, 0, 0.14]}
      >
        <boxGeometry args={[worldWidth * 0.12, worldHeight * 1.15, 0.2]} />
        <meshStandardMaterial color={WIPER_STAGE_TRIM_COLOR} metalness={0.14} roughness={0.76} />
      </mesh>

      <mesh
        position={[worldWidth * 0.55, windshieldY, -0.02]}
        receiveShadow
        rotation={[0, 0, -0.14]}
      >
        <boxGeometry args={[worldWidth * 0.12, worldHeight * 1.15, 0.2]} />
        <meshStandardMaterial color={WIPER_STAGE_TRIM_COLOR} metalness={0.14} roughness={0.76} />
      </mesh>

      <mesh position={[0, worldHeight * 0.52, 0]} receiveShadow>
        <boxGeometry args={[worldWidth * 1.08, worldHeight * 0.08, 0.18]} />
        <meshStandardMaterial color={WIPER_STAGE_TRIM_COLOR} metalness={0.12} roughness={0.74} />
      </mesh>

      <mesh position={[0, windshieldY, -0.66]} receiveShadow>
        <planeGeometry args={[worldWidth * 1.18, worldHeight * 1.12]} />
        <meshStandardMaterial
          color={WIPER_STAGE_EXTERIOR_COLOR}
          metalness={0.04}
          roughness={0.88}
        />
      </mesh>

      <mesh position={[0, windshieldY, windshieldZ]} rotation={[-0.12, 0, 0]}>
        <planeGeometry args={[worldWidth * 1.14, worldHeight * 1.08]} />
        <meshStandardMaterial
          color={WIPER_STAGE_GLASS_COLOR}
          metalness={0.04}
          opacity={WIPER_STAGE_GLASS_OPACITY}
          roughness={0.22}
          transparent
        />
      </mesh>

      {simulation.glyphs.map((glyph: WiperGlyphState) => {
        const layerIndex = glyph.index % STAGE_GLYPH_LAYER_COUNT;
        const depth = getStageGlyphDepth(layerIndex);

        return (
          <WiperTypographyExtrudedGlyph3D
            glyph={glyph.text}
            key={glyph.index}
            position={[projectX(glyph.x), projectY(glyph.y), depth]}
            ref={(node) => {
              glyphRefs.current[glyph.index] = node;
            }}
            rotationZ={-glyph.rotation * Math.PI}
            scale={stageGlyphScale}
          />
        );
      })}

      <CockpitWiper
        armLength={wiperArmLength}
        bladeLength={wiperBladeLength}
        direction={1}
        groupRef={(node) => {
          leftWiperRef.current = node;
        }}
        mount={leftWiperMount}
        rotationZ={getCockpitWiperRotation(0.5, "left")}
      />

      <CockpitWiper
        armLength={wiperArmLength * 0.96}
        bladeLength={wiperBladeLength * 0.92}
        direction={-1}
        groupRef={(node) => {
          rightWiperRef.current = node;
        }}
        mount={rightWiperMount}
        rotationZ={getCockpitWiperRotation(0.5, "right")}
      />
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
          x: offset.x * 0.32,
          y: offset.y * 0.35 - 0.06,
        };
      }}
      projectId={projectId}
      renderScene={({ phaseRef }) => <StageScene phaseRef={phaseRef} />}
    />
  );
}
