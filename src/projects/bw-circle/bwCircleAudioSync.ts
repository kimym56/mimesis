export interface BwCircleAudioSample {
  energy: number;
  bassEnergy: number;
  previousEnergy: number;
  shouldReduceMotion: boolean;
}

export interface BwCircleAudioCue {
  energy: number;
  bassEnergy: number;
  onsetStrength: number;
}

export interface BwCircleFrequencyLevels {
  energy: number;
  bassEnergy: number;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export function measureBwCircleFrequencyLevels(
  frequencyData: ArrayLike<number>,
): BwCircleFrequencyLevels {
  if (frequencyData.length === 0) {
    return {
      energy: 0,
      bassEnergy: 0,
    };
  }

  let total = 0;
  let bassTotal = 0;
  const bassBinCount = Math.max(1, Math.round(frequencyData.length * 0.3));

  for (let index = 0; index < frequencyData.length; index += 1) {
    const sample = clamp(frequencyData[index] / 255, 0, 1);

    total += sample;

    if (index < bassBinCount) {
      bassTotal += sample;
    }
  }

  return {
    energy: total / frequencyData.length,
    bassEnergy: bassTotal / bassBinCount,
  };
}

export function createBwCircleAudioCue({
  energy,
  bassEnergy,
  previousEnergy,
  shouldReduceMotion,
}: BwCircleAudioSample): BwCircleAudioCue {
  const motionScale = shouldReduceMotion ? 0.55 : 1;

  return {
    energy: clamp(energy, 0, 1) * motionScale,
    bassEnergy: clamp(bassEnergy, 0, 1) * motionScale,
    onsetStrength:
      clamp((clamp(energy, 0, 1) - clamp(previousEnergy, 0, 1)) * 3.5, 0, 1) *
      motionScale,
  };
}
