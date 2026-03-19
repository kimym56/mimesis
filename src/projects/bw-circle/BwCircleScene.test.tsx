// @vitest-environment jsdom

import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import {
  afterAll,
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import BwCircleScene from "./BwCircleScene";

globalThis.IS_REACT_ACT_ENVIRONMENT = true;

vi.mock("framer-motion", () => ({
  useReducedMotion: () => false,
}));

describe("BwCircleScene audio sync", () => {
  let analyser: {
    connect: ReturnType<typeof vi.fn>;
    disconnect: ReturnType<typeof vi.fn>;
    fftSize: number;
    frequencyBinCount: number;
    getByteFrequencyData: ReturnType<typeof vi.fn>;
    smoothingTimeConstant: number;
  };
  let audioContextInstances: MockAudioContext[];
  let container: HTMLDivElement;
  let mediaSource: {
    connect: ReturnType<typeof vi.fn>;
    disconnect: ReturnType<typeof vi.fn>;
  };
  let originalAudioContext: typeof window.AudioContext | undefined;
  let originalCancelAnimationFrame: typeof window.cancelAnimationFrame;
  let originalGetContext: typeof HTMLCanvasElement.prototype.getContext;
  let originalRequestAnimationFrame: typeof window.requestAnimationFrame;
  let root: Root;

  class MockAudioContext {
    createAnalyser = vi.fn(() => analyser);
    createMediaStreamSource = vi.fn(() => mediaSource);
    resume = vi.fn(async () => undefined);
    close = vi.fn(async () => undefined);
  }

  beforeAll(() => {
    originalAudioContext = window.AudioContext;
    originalGetContext = HTMLCanvasElement.prototype.getContext;
    originalRequestAnimationFrame = window.requestAnimationFrame;
    originalCancelAnimationFrame = window.cancelAnimationFrame;

    HTMLCanvasElement.prototype.getContext = vi.fn(
      () =>
        ({
          arc: vi.fn(),
          beginPath: vi.fn(),
          clearRect: vi.fn(),
          clip: vi.fn(),
          fill: vi.fn(),
          fillRect: vi.fn(),
          restore: vi.fn(),
          rotate: vi.fn(),
          save: vi.fn(),
          scale: vi.fn(),
          setTransform: vi.fn(),
          stroke: vi.fn(),
          translate: vi.fn(),
        }) as unknown as CanvasRenderingContext2D,
    );
    window.requestAnimationFrame = vi.fn(() => 1);
    window.cancelAnimationFrame = vi.fn();
  });

  beforeEach(() => {
    analyser = {
      connect: vi.fn(),
      disconnect: vi.fn(),
      fftSize: 0,
      frequencyBinCount: 32,
      getByteFrequencyData: vi.fn((data: Uint8Array) => {
        data.fill(64);
      }),
      smoothingTimeConstant: 0,
    };
    mediaSource = {
      connect: vi.fn(),
      disconnect: vi.fn(),
    };
    audioContextInstances = [];
    Object.defineProperty(window, "AudioContext", {
      configurable: true,
      value: vi.fn(function MockWindowAudioContext() {
        const context = new MockAudioContext();
        audioContextInstances.push(context);
        return context;
      }),
    });
    container = document.createElement("div");
    document.body.appendChild(container);
    root = createRoot(container);
  });

  afterAll(() => {
    HTMLCanvasElement.prototype.getContext = originalGetContext;
    window.requestAnimationFrame = originalRequestAnimationFrame;
    window.cancelAnimationFrame = originalCancelAnimationFrame;
    Object.defineProperty(window, "AudioContext", {
      configurable: true,
      value: originalAudioContext,
    });
  });

  afterEach(() => {
    act(() => {
      root.unmount();
    });
    container.remove();
  });

  it("creates an analyser graph when sync mode receives an active capture stream", () => {
    const stream = {
      getTracks: () => [],
    } as unknown as MediaStream;

    act(() => {
      root.render(
        <BwCircleScene
          audioSync={{
            status: "active",
            stream,
          }}
          bpm={120}
          mode="sync"
          playback={{
            currentTime: 4,
            isPlaying: true,
            sampledAtMs: 1_000,
          }}
        />,
      );
    });

    expect(audioContextInstances).toHaveLength(1);
    expect(
      audioContextInstances[0]?.createMediaStreamSource,
    ).toHaveBeenCalledWith(stream);
    expect(audioContextInstances[0]?.createAnalyser).toHaveBeenCalledTimes(1);
    expect(mediaSource.connect).toHaveBeenCalledWith(analyser);
  });

  it("disconnects the previous analyser graph when audio sync becomes inactive", () => {
    const stream = {
      getTracks: () => [],
    } as unknown as MediaStream;

    act(() => {
      root.render(
        <BwCircleScene
          audioSync={{
            status: "active",
            stream,
          }}
          bpm={120}
          mode="sync"
          playback={{
            currentTime: 4,
            isPlaying: true,
            sampledAtMs: 1_000,
          }}
        />,
      );
    });

    act(() => {
      root.render(
        <BwCircleScene
          audioSync={{
            status: "idle",
            stream: null,
          }}
          bpm={120}
          mode="sync"
          playback={{
            currentTime: 4,
            isPlaying: false,
            sampledAtMs: 1_000,
          }}
        />,
      );
    });

    expect(mediaSource.disconnect).toHaveBeenCalledTimes(1);
    expect(analyser.disconnect).toHaveBeenCalledTimes(1);
  });
});
