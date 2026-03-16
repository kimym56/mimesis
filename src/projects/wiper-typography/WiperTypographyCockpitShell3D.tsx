"use client";

import {
  WIPER_STAGE_DASHBOARD_COLOR,
  WIPER_STAGE_EXTERIOR_COLOR,
  WIPER_STAGE_GLASS_COLOR,
  WIPER_STAGE_GLASS_OPACITY,
  WIPER_STAGE_HEADLINER_COLOR,
  WIPER_STAGE_SCREEN_FRAME_COLOR,
  WIPER_STAGE_SCREEN_GLOW_COLOR,
  WIPER_STAGE_SCREEN_SURFACE_COLOR,
  WIPER_STAGE_TRIM_COLOR,
  WIPER_STAGE_YOKE_COLOR,
} from "./wiperConfig";

interface WiperTypographyCockpitShell3DProps {
  worldHeight: number;
  worldWidth: number;
  windshieldY: number;
  windshieldZ: number;
}

export default function WiperTypographyCockpitShell3D({
  worldHeight,
  worldWidth,
  windshieldY,
  windshieldZ,
}: WiperTypographyCockpitShell3DProps) {
  const dashWingY = -worldHeight * 0.31;
  const dashWingZ = 0.22;
  const screenWidth = worldWidth * 0.26;
  const screenHeight = worldHeight * 0.17;
  const screenZ = dashWingZ + 0.16;
  const pillarWidth = worldWidth * 0.1;
  const pillarHeight = worldHeight * 1.22;
  const pillarOffsetX = worldWidth * 0.54;
  const yokeY = -worldHeight * 0.5;
  const yokeZ = 0.52;
  const yokeWidth = worldWidth * 0.26;
  const yokeGripHeight = worldHeight * 0.12;

  return (
    <>
      <mesh castShadow position={[0, dashWingY, dashWingZ]} receiveShadow>
        <boxGeometry args={[worldWidth * 1.24, worldHeight * 0.055, 0.22]} />
        <meshStandardMaterial
          color={WIPER_STAGE_DASHBOARD_COLOR}
          metalness={0.08}
          roughness={0.82}
        />
      </mesh>

      <mesh
        castShadow
        position={[0, dashWingY + worldHeight * 0.03, dashWingZ + 0.08]}
        receiveShadow
      >
        <boxGeometry args={[worldWidth * 0.44, worldHeight * 0.018, 0.14]} />
        <meshStandardMaterial color={WIPER_STAGE_TRIM_COLOR} metalness={0.14} roughness={0.62} />
      </mesh>

      <group position={[0, dashWingY + worldHeight * 0.075, screenZ]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[screenWidth, screenHeight, 0.045]} />
          <meshStandardMaterial
            color={WIPER_STAGE_SCREEN_FRAME_COLOR}
            metalness={0.18}
            roughness={0.48}
          />
        </mesh>
        <mesh position={[0, 0, 0.024]}>
          <planeGeometry args={[screenWidth * 0.9, screenHeight * 0.82]} />
          <meshStandardMaterial
            color={WIPER_STAGE_SCREEN_SURFACE_COLOR}
            emissive={WIPER_STAGE_SCREEN_GLOW_COLOR}
            emissiveIntensity={0.16}
            metalness={0.04}
            roughness={0.18}
          />
        </mesh>
      </group>

      <mesh
        position={[0, dashWingY + worldHeight * 0.075, screenZ - 0.02]}
        rotation={[-0.08, 0, 0]}
      >
        <planeGeometry args={[screenWidth * 1.04, screenHeight * 0.96]} />
        <meshBasicMaterial
          color={WIPER_STAGE_SCREEN_GLOW_COLOR}
          opacity={0.06}
          transparent
        />
      </mesh>

      <mesh
        position={[-pillarOffsetX, windshieldY + worldHeight * 0.02, 0.08]}
        receiveShadow
        rotation={[0, 0, 0.18]}
      >
        <boxGeometry args={[pillarWidth, pillarHeight, 0.24]} />
        <meshStandardMaterial color={WIPER_STAGE_TRIM_COLOR} metalness={0.14} roughness={0.76} />
      </mesh>

      <mesh
        position={[pillarOffsetX, windshieldY + worldHeight * 0.02, 0.08]}
        receiveShadow
        rotation={[0, 0, -0.18]}
      >
        <boxGeometry args={[pillarWidth, pillarHeight, 0.24]} />
        <meshStandardMaterial color={WIPER_STAGE_TRIM_COLOR} metalness={0.14} roughness={0.76} />
      </mesh>

      <mesh position={[0, worldHeight * 0.56, 0.12]} receiveShadow>
        <boxGeometry args={[worldWidth * 1.1, worldHeight * 0.085, 0.22]} />
        <meshStandardMaterial
          color={WIPER_STAGE_HEADLINER_COLOR}
          metalness={0.1}
          roughness={0.84}
        />
      </mesh>

      <mesh position={[0, windshieldY, -0.72]} receiveShadow>
        <planeGeometry args={[worldWidth * 1.2, worldHeight * 1.16]} />
        <meshStandardMaterial
          color={WIPER_STAGE_EXTERIOR_COLOR}
          metalness={0.04}
          roughness={0.9}
        />
      </mesh>

      <mesh position={[0, windshieldY, windshieldZ]} rotation={[-0.13, 0, 0]}>
        <planeGeometry args={[worldWidth * 1.15, worldHeight * 1.1]} />
        <meshPhysicalMaterial
          color={WIPER_STAGE_GLASS_COLOR}
          opacity={WIPER_STAGE_GLASS_OPACITY}
          roughness={0.14}
          transparent
          transmission={0.08}
        />
      </mesh>

      <mesh position={[0, windshieldY + worldHeight * 0.08, windshieldZ + 0.01]} rotation={[-0.13, 0, 0]}>
        <planeGeometry args={[worldWidth * 0.9, worldHeight * 0.3]} />
        <meshBasicMaterial
          color={WIPER_STAGE_GLASS_COLOR}
          opacity={0.05}
          transparent
        />
      </mesh>

      <group position={[0, yokeY, yokeZ]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[worldWidth * 0.1, worldHeight * 0.045, 0.09]} />
          <meshStandardMaterial color={WIPER_STAGE_YOKE_COLOR} metalness={0.16} roughness={0.54} />
        </mesh>
        <mesh castShadow position={[0, worldHeight * 0.05, 0]} receiveShadow rotation={[0, 0, Math.PI * 0.5]}>
          <cylinderGeometry args={[0.018, 0.018, yokeWidth, 18]} />
          <meshStandardMaterial color={WIPER_STAGE_YOKE_COLOR} metalness={0.16} roughness={0.54} />
        </mesh>
        <mesh castShadow position={[-yokeWidth * 0.28, 0.01, 0]} receiveShadow rotation={[0, 0, -0.38]}>
          <cylinderGeometry args={[0.018, 0.018, yokeGripHeight, 18]} />
          <meshStandardMaterial color={WIPER_STAGE_YOKE_COLOR} metalness={0.16} roughness={0.54} />
        </mesh>
        <mesh castShadow position={[yokeWidth * 0.28, 0.01, 0]} receiveShadow rotation={[0, 0, 0.38]}>
          <cylinderGeometry args={[0.018, 0.018, yokeGripHeight, 18]} />
          <meshStandardMaterial color={WIPER_STAGE_YOKE_COLOR} metalness={0.16} roughness={0.54} />
        </mesh>
      </group>
    </>
  );
}
