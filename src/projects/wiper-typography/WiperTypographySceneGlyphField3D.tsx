"use client";

import type { InteractiveProjectProps } from "../types";
import styles from "./WiperTypographyProject.module.css";

export default function WiperTypographySceneGlyphField3D({
  projectId,
}: InteractiveProjectProps) {
  return (
    <div
      className={`${styles.wrapper} ${styles.placeholder3D}`}
      data-project-id={projectId}
    >
      <strong className={styles.placeholderTitle}>3D Glyph Field</strong>
      <span className={styles.placeholderBody}>Scene implementation pending.</span>
    </div>
  );
}
