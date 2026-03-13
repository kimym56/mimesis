"use client";

import WiperTypographySceneFrame from "./WiperTypographySceneFrame";
import type { InteractiveProjectProps } from "../types";

export default function WiperTypographySceneBars3D({
  projectId,
}: InteractiveProjectProps) {
  return (
    <WiperTypographySceneFrame
      projectId={projectId}
      renderScene={() => (
        <mesh>
          <boxGeometry args={[2.4, 0.32, 0.18]} />
          <meshStandardMaterial color="#111111" />
        </mesh>
      )}
    />
  );
}
