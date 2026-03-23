import {
  createRealtimeBpmAnalyzer,
  getBiquadFilter,
} from "./bwCircleRealtimeBpmVendor";

interface BwCircleTempoCandidate {
  tempo: number;
}

interface BwCircleTempoCandidates {
  bpm: readonly BwCircleTempoCandidate[];
}

interface BwCircleRealtimeBpmAnalyzerLike extends EventTarget {
  connect: (destinationNode: AudioNode) => void;
  disconnect: () => void;
  node: AudioNode;
  stop: () => void;
}

export interface BwCircleRealtimeBpmBridge {
  disconnect: () => void;
}

export interface BwCircleRealtimeBpmBridgeInput {
  audioContext: AudioContext;
  onBpm: (bpm: number) => void;
  sourceNode: AudioNode;
}

const BPM_ANALYZER_OPTIONS = {
  continuousAnalysis: true,
  debug: false,
  stabilizationTime: 8_000,
} as const;

const LOWPASS_FILTER_OPTIONS = {
  frequencyValue: 200,
  qualityValue: 1,
} as const;
const BPM_INPUT_GAIN_VALUE = 6;

function readBwCircleRealtimeTempo(candidates: BwCircleTempoCandidates | null) {
  const tempo = candidates?.bpm[0]?.tempo;

  return typeof tempo === "number" ? Math.round(tempo) : null;
}

export async function createBwCircleRealtimeBpmBridge({
  audioContext,
  onBpm,
  sourceNode,
}: BwCircleRealtimeBpmBridgeInput): Promise<BwCircleRealtimeBpmBridge> {
  const analyzer = (await createRealtimeBpmAnalyzer(
    audioContext,
    BPM_ANALYZER_OPTIONS,
  )) as BwCircleRealtimeBpmAnalyzerLike;
  const filterNode = getBiquadFilter(audioContext, LOWPASS_FILTER_OPTIONS);
  const signalGainNode = audioContext.createGain();
  const mutedSinkNode = audioContext.createGain();

  signalGainNode.gain.value = BPM_INPUT_GAIN_VALUE;
  mutedSinkNode.gain.value = 0;

  const handleTempoEvent = (event: Event) => {
    const bpm = readBwCircleRealtimeTempo(
      (event as CustomEvent<BwCircleTempoCandidates>).detail,
    );

    if (bpm !== null) {
      onBpm(bpm);
    }
  };

  analyzer.addEventListener("bpm", handleTempoEvent);
  analyzer.addEventListener("bpmStable", handleTempoEvent);
  sourceNode.connect(signalGainNode);
  signalGainNode.connect(filterNode);
  filterNode.connect(analyzer.node);
  analyzer.connect(mutedSinkNode);
  mutedSinkNode.connect(audioContext.destination);

  return {
    disconnect() {
      analyzer.removeEventListener("bpm", handleTempoEvent);
      analyzer.removeEventListener("bpmStable", handleTempoEvent);
      analyzer.stop();
      analyzer.disconnect();

      try {
        sourceNode.disconnect(signalGainNode);
      } catch {}

      try {
        signalGainNode.disconnect();
      } catch {}

      try {
        filterNode.disconnect();
      } catch {}

      try {
        mutedSinkNode.disconnect();
      } catch {}
    },
  };
}
