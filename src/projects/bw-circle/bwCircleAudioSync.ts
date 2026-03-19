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

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
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
