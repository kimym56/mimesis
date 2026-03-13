"use client";

import { Text } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef, type MutableRefObject } from "react";
import type * as THREE from "three";
import type { InteractiveProjectProps } from "../types";
import { WIPER_GLYPHS } from "./wiperConfig";
import WiperTypographySceneFrame from "./WiperTypographySceneFrame";
import {
  computeBarDepth,
  computeLineCount,
  computeLineDimensions,
  computeLinePose,
  computeStageCameraOffset,
} from "./wiperMath";

function StageScene({
  phaseRef,
}: {
  phaseRef: MutableRefObject<number>;
}) {
  const { viewport } = useThree();
  const barRefs = useRef<Array<THREE.Mesh | null>>([]);

  const stageWidth = viewport.width * 0.82;
  const stageHeight = viewport.height * 0.8;
  const lineWidth = Math.max(stageHeight * 0.034, 0.18);
  const lineCount = computeLineCount(stageHeight, lineWidth);

  const glyphRows = useMemo(() => {
    const rowText = Array.from({ length: 6 }, () => WIPER_GLYPHS.join("")).join(" ");
    const rows = 5;

    return Array.from({ length: rows }, (_, index) => ({
      key: index,
      positionY: stageHeight * 0.5 - ((index + 1) * stageHeight) / (rows + 1),
      text: rowText,
    }));
  }, [stageHeight]);

  useFrame((state) => {
    const phase = phaseRef.current;
    const cameraOffset = computeStageCameraOffset(phase);

    state.camera.position.x += (cameraOffset.x - state.camera.position.x) * 0.08;
    state.camera.position.y += (cameraOffset.y - state.camera.position.y) * 0.08;
    state.camera.lookAt(0, 0, -0.25);

    for (let index = 0; index < lineCount; index += 1) {
      const mesh = barRefs.current[index];
      if (!mesh) {
        continue;
      }

      const pose = computeLinePose(index, phase, stageWidth, stageHeight, lineWidth);
      const dimensions = computeLineDimensions(index, lineWidth);
      const depth = computeBarDepth(index);

      mesh.position.set(
        pose.x - stageWidth * 0.5,
        stageHeight * 0.5 - pose.y,
        depth * 0.5
      );
      mesh.rotation.set(0, 0, -pose.rotation);
      mesh.scale.set(dimensions.width, dimensions.height, depth);
    }
  });

  return (
    <>
      <mesh position={[0, -stageHeight * 0.58, -0.18]} receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[stageWidth * 1.25, stageHeight * 0.9]} />
        <meshStandardMaterial color="#0d4f7c" roughness={0.82} metalness={0.04} />
      </mesh>

      <mesh position={[0, 0, -1.05]} receiveShadow>
        <planeGeometry args={[stageWidth * 1.04, stageHeight * 0.94]} />
        <meshStandardMaterial color="#0f6299" roughness={0.86} metalness={0.02} />
      </mesh>

      <group position={[0, 0, -0.92]}>
        {glyphRows.map((row) => (
          <Text
            key={row.key}
            anchorX="center"
            anchorY="middle"
            color="#ffffff"
            fontSize={Math.max(stageHeight * 0.1, 0.3)}
            maxWidth={stageWidth * 0.88}
            position={[0, row.positionY - stageHeight * 0.5, 0]}
          >
            {row.text}
          </Text>
        ))}
      </group>

      {Array.from({ length: lineCount }, (_, index) => (
        <mesh
          key={index}
          castShadow
          receiveShadow
          ref={(node) => {
            barRefs.current[index] = node;
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
      projectId={projectId}
      renderScene={({ phaseRef }) => (
        <StageScene phaseRef={phaseRef} />
      )}
    />
  );
}
