import { describe, expect, it } from "vitest";
import {
  createBwCircleAudioCue,
  measureBwCircleFrequencyLevels,
} from "./bwCircleAudioSync";

describe("measureBwCircleFrequencyLevels", () => {
  it("derives bounded overall and bass-weighted energy from analyser bins", () => {
    const levels = measureBwCircleFrequencyLevels(
      Uint8Array.from([255, 192, 96, 32, 0]),
    );

    expect(levels.energy).toBeCloseTo(0.451, 3);
    expect(levels.bassEnergy).toBeCloseTo(0.8765, 3);
    expect(levels.bassEnergy).toBeGreaterThan(levels.energy);
  });

  it("returns zeroed levels for an empty analyser frame", () => {
    expect(measureBwCircleFrequencyLevels(new Uint8Array())).toEqual({
      energy: 0,
      bassEnergy: 0,
    });
  });
});

describe("createBwCircleAudioCue", () => {
  it("returns bounded cue values", () => {
    const cue = createBwCircleAudioCue({
      energy: 1.4,
      bassEnergy: -0.3,
      previousEnergy: 0.2,
      shouldReduceMotion: false,
    });

    expect(cue.energy).toBeGreaterThanOrEqual(0);
    expect(cue.energy).toBeLessThanOrEqual(1);
    expect(cue.bassEnergy).toBeGreaterThanOrEqual(0);
    expect(cue.bassEnergy).toBeLessThanOrEqual(1);
    expect(cue.onsetStrength).toBeGreaterThanOrEqual(0);
    expect(cue.onsetStrength).toBeLessThanOrEqual(1);
  });

  it("raises onset strength when energy jumps sharply", () => {
    const cue = createBwCircleAudioCue({
      energy: 0.62,
      bassEnergy: 0.58,
      previousEnergy: 0.14,
      shouldReduceMotion: false,
    });

    expect(cue.onsetStrength).toBeGreaterThan(0.9);
  });

  it("damps cue amplitudes under reduced motion", () => {
    const fullMotion = createBwCircleAudioCue({
      energy: 0.62,
      bassEnergy: 0.58,
      previousEnergy: 0.14,
      shouldReduceMotion: false,
    });
    const reducedMotion = createBwCircleAudioCue({
      energy: 0.62,
      bassEnergy: 0.58,
      previousEnergy: 0.14,
      shouldReduceMotion: true,
    });

    expect(reducedMotion.energy).toBeLessThan(fullMotion.energy);
    expect(reducedMotion.bassEnergy).toBeLessThan(fullMotion.bassEnergy);
    expect(reducedMotion.onsetStrength).toBeLessThan(fullMotion.onsetStrength);
  });

  it("is deterministic for identical input", () => {
    expect(
      createBwCircleAudioCue({
        energy: 0.42,
        bassEnergy: 0.65,
        previousEnergy: 0.25,
        shouldReduceMotion: false,
      }),
    ).toEqual(
      createBwCircleAudioCue({
        energy: 0.42,
        bassEnergy: 0.65,
        previousEnergy: 0.25,
        shouldReduceMotion: false,
      }),
    );
  });
});
