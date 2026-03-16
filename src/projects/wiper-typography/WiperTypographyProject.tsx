"use client";

import { useState, type ComponentType } from "react";
import type { InteractiveProjectProps } from "../types";
import WiperTypographyCanvas2D from "./WiperTypographyCanvas2D";
import WiperTypographyModeToggle, {
  type WiperRenderMode,
} from "./WiperTypographyModeToggle";
import WiperTypographySceneBars3D from "./WiperTypographySceneBars3D";
import WiperTypographySceneGlyphField3D from "./WiperTypographySceneGlyphField3D";
import WiperTypographySceneStage3D from "./WiperTypographySceneStage3D";
import styles from "./WiperTypographyProject.module.css";

const MODE_COMPONENTS: Record<
  WiperRenderMode,
  ComponentType<InteractiveProjectProps>
> = {
  "2d": WiperTypographyCanvas2D,
  "3d-bars": WiperTypographySceneBars3D,
  "3d-glyphs": WiperTypographySceneGlyphField3D,
  "3d-stage": WiperTypographySceneStage3D,
};

export default function WiperTypographyProject({
  projectId,
}: InteractiveProjectProps) {
  const [mode, setMode] = useState<WiperRenderMode>("2d");
  const ActiveMode = MODE_COMPONENTS[mode];

  return (
    <div className={styles.interactivePane} data-project-id={projectId}>
      <WiperTypographyModeToggle activeMode={mode} onChange={setMode} />
      <ActiveMode projectId={projectId} />
    </div>
  );
}
