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
  computeGlyphLayerDepth,
  computeLineCount,
  computeLineDimensions,
  computeLinePose,
} from "./wiperMath";

function GlyphFieldScene({
  phaseRef,
}: {
  phaseRef: MutableRefObject<number>;
}) {
  const { viewport } = useThree();
  const barRefs = useRef<Array<THREE.Mesh | null>>([]);

  const stageWidth = viewport.width * 0.86;
  const stageHeight = viewport.height * 0.86;
  const lineWidth = Math.max(stageHeight * 0.035, 0.18);
  const lineCount = computeLineCount(stageHeight, lineWidth);

  const glyphLayers = useMemo(() => {
    const layerCount = 4;
    const rowCount = 4;
    const rowText = Array.from({ length: 5 }, () => WIPER_GLYPHS.join("")).join(" ");

    return Array.from({ length: layerCount }, (_, layerIndex) => ({
      key: layerIndex,
      z: computeGlyphLayerDepth(layerIndex, layerCount) * 0.35 - 0.55,
      rows: Array.from({ length: rowCount }, (_, rowIndex) => ({
        key: `${layerIndex}-${rowIndex}`,
        positionY:
          stageHeight * 0.5 - ((rowIndex + 1) * stageHeight) / (rowCount + 1),
        text: rowText,
      })),
    }));
  }, [stageHeight]);

  useFrame(() => {
    const phase = phaseRef.current;

    for (let index = 0; index < lineCount; index += 1) {
      const mesh = barRefs.current[index];
      if (!mesh) {
        continue;
      }

      const pose = computeLinePose(index, phase, stageWidth, stageHeight, lineWidth);
      const dimensions = computeLineDimensions(index, lineWidth);
      const depth = computeBarDepth(index) * 0.9;

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
      {glyphLayers.map((layer) => (
        <group key={layer.key} position={[0, 0, layer.z]}>
          {layer.rows.map((row) => (
            <Text
              key={row.key}
              anchorX="center"
              anchorY="middle"
              color="#ffffff"
              fontSize={Math.max(stageHeight * 0.095, 0.28)}
              maxWidth={stageWidth * 0.88}
              position={[0, row.positionY - stageHeight * 0.5, 0]}
            >
              {row.text}
            </Text>
          ))}
        </group>
      ))}

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

export default function WiperTypographySceneGlyphField3D({
  projectId,
}: InteractiveProjectProps) {
  return (
    <WiperTypographySceneFrame
      projectId={projectId}
      renderScene={({ phaseRef }) => (
        <GlyphFieldScene phaseRef={phaseRef} />
      )}
    />
  );
}
