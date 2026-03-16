"use client";

import styles from "./WiperTypographyProject.module.css";

export type WiperRenderMode = "2d" | "3d-bars" | "3d-glyphs" | "3d-stage";

interface WiperModeOption {
  id: WiperRenderMode;
  label: string;
}

const MODE_OPTIONS: WiperModeOption[] = [
  { id: "2d", label: "2D Canvas" },
  { id: "3d-bars", label: "3D Wiper Bars" },
  { id: "3d-glyphs", label: "3D Glyph Field" },
  { id: "3d-stage", label: "3D Stage" },
];

export default function WiperTypographyModeToggle({
  activeMode,
  onChange,
}: {
  activeMode: WiperRenderMode;
  onChange: (mode: WiperRenderMode) => void;
}) {
  return (
    <div className={styles.modeToggle}>
      {MODE_OPTIONS.map((option) => (
        <button
          key={option.id}
          className={`${styles.modeButton} ${
            activeMode === option.id ? styles.modeButtonActive : ""
          }`}
          data-mode={option.id}
          onClick={() => onChange(option.id)}
          type="button"
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
