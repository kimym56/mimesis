export function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

export const WIPER_MARGIN = 100;

export function mapPointerXToPhase(
  pointerX: number,
  width: number,
  margin = WIPER_MARGIN
): number {
  const usableWidth = width - margin * 2;
  if (usableWidth <= 0) {
    return 0;
  }

  const clampedX = clamp(pointerX, margin, width - margin);
  return (clampedX - margin) / usableWidth;
}

export function isPointerInsideActiveRange(
  pointerX: number,
  width: number,
  margin = WIPER_MARGIN
): boolean {
  return pointerX >= margin && pointerX <= width - margin;
}

export function computeLinePose(
  index: number,
  phase: number,
  width: number,
  height: number,
  segmentWidth: number
): { x: number; y: number; rotation: number } {
  const theta = phase * Math.PI;
  const distance = -(segmentWidth - 2) * index;

  return {
    x: Math.cos(theta) * distance + width / 2,
    y: Math.sin(theta) * distance + height + segmentWidth,
    rotation: theta,
  };
}
