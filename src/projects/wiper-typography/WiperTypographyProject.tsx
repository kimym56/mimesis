"use client";

import {
  useEffect,
  useState,
  type ComponentType,
} from "react";
import type { InteractiveProjectProps } from "../types";
import WiperTypographyCanvas2D from "./WiperTypographyCanvas2D";
import WiperTypographyModeToggle, {
  type WiperRenderMode,
} from "./WiperTypographyModeToggle";
import styles from "./WiperTypographyProject.module.css";

export default function WiperTypographyProject({
  projectId,
}: InteractiveProjectProps) {
  const [mode, setMode] = useState<WiperRenderMode>("2d");
  const [driverView3D, setDriverView3D] =
    useState<ComponentType<InteractiveProjectProps> | null>(null);

  useEffect(() => {
    if (mode !== "3d-driver" || driverView3D) {
      return;
    }

    let cancelled = false;

    void import("./WiperTypographyDriverView3D").then(({ default: Component }) => {
      if (!cancelled) {
        setDriverView3D(() => Component);
      }
    });

    return () => {
      cancelled = true;
    };
  }, [driverView3D, mode]);

  const ActiveMode = mode === "2d" ? WiperTypographyCanvas2D : driverView3D;

  return (
    <div className={styles.interactivePane} data-project-id={projectId}>
      <WiperTypographyModeToggle activeMode={mode} onChange={setMode} />
      {ActiveMode ? <ActiveMode projectId={projectId} /> : null}
    </div>
  );
}
