// The published package exports are broken, so we load the internal CJS entrypoint directly.
// eslint-disable-next-line @typescript-eslint/no-require-imports
const realtimeBpmAnalyzer = require(
  "../../../node_modules/realtime-bpm-analyzer/dist/dist/index.js",
) as {
  createRealtimeBpmAnalyzer: (
    audioContext: AudioContext,
    processorOptions?: {
      continuousAnalysis?: boolean;
      stabilizationTime?: number;
    },
  ) => Promise<{
    addEventListener: (event: string, listener: EventListener) => void;
    disconnect: () => void;
    node: AudioNode;
    removeEventListener: (event: string, listener: EventListener) => void;
    stop: () => void;
  }>;
  getBiquadFilter: (
    context: AudioContext | OfflineAudioContext,
    options?: {
      frequencyValue?: number;
      qualityValue?: number;
    },
  ) => BiquadFilterNode;
};

export const createRealtimeBpmAnalyzer =
  realtimeBpmAnalyzer.createRealtimeBpmAnalyzer;
export const getBiquadFilter = realtimeBpmAnalyzer.getBiquadFilter;
