// @vitest-environment jsdom

import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import BwCircleYouTubePanel from "./BwCircleYouTubePanel";

globalThis.IS_REACT_ACT_ENVIRONMENT = true;

interface MockPlayerInstance {
  cueVideoById: (videoId: string) => void;
  destroy: () => void;
  getCurrentTime: () => number;
  getPlayerState: () => number;
  playVideo: () => void;
  stopVideo: () => void;
}

declare global {
  interface Window {
    YT?: {
      Player: new (
        element: HTMLElement,
        options: {
          events?: {
            onReady?: (event: { target: MockPlayerInstance }) => void;
            onStateChange?: (event: {
              data: number;
              target: MockPlayerInstance;
            }) => void;
          };
          videoId: string;
        },
      ) => Partial<MockPlayerInstance>;
    };
  }
}

describe("BwCircleYouTubePanel", () => {
  let container: HTMLDivElement;
  let root: Root;

  function createMockPlayer(playerState = 1) {
    return {
      cueVideoById: vi.fn(),
      destroy: vi.fn(),
      getCurrentTime: vi.fn(() => 42),
      getPlayerState: vi.fn(() => playerState),
      playVideo: vi.fn(),
      stopVideo: vi.fn(),
    } satisfies MockPlayerInstance;
  }

  beforeEach(() => {
    vi.useFakeTimers();
    container = document.createElement("div");
    document.body.appendChild(container);
    root = createRoot(container);
  });

  afterEach(() => {
    act(() => {
      root.unmount();
    });
    container.remove();
    delete window.YT;
    delete window.onYouTubeIframeAPIReady;
    vi.useRealTimers();
  });

  it("uses the ready event target when the constructor return value is not yet queryable", async () => {
    const onPlaybackChange = vi.fn();
    const readyPlayer = createMockPlayer();

    const MockPlayer = vi.fn(function MockPlayer(
      _element: HTMLElement,
      options: {
        events?: {
          onReady?: (event: { target: MockPlayerInstance }) => void;
          onStateChange?: (event: {
            data: number;
            target: MockPlayerInstance;
          }) => void;
        };
        videoId: string;
      },
    ) {
      window.setTimeout(() => {
        options.events?.onReady?.({ target: readyPlayer });
      }, 0);

      return {
        destroy: vi.fn(),
      };
    });

    window.YT = {
      Player: MockPlayer as unknown as Window["YT"]["Player"],
    };

    await act(async () => {
      root.render(
        <BwCircleYouTubePanel
          onLoad={vi.fn()}
          onPlaybackChange={onPlaybackChange}
          videoId="abc123XYZ09"
        />,
      );
      await Promise.resolve();
    });

    expect(() => {
      act(() => {
        vi.advanceTimersByTime(1);
      });
    }).not.toThrow();

    expect(onPlaybackChange).toHaveBeenLastCalledWith({
      currentTime: 42,
      isPlaying: true,
    });
  });

  it("commits a valid url on Enter and renders only a hidden player host", async () => {
    const onLoad = vi.fn();

    await act(async () => {
      root.render(
        <BwCircleYouTubePanel
          onLoad={onLoad}
          onPlaybackChange={vi.fn()}
          videoId={null}
        />,
      );
    });

    const input = container.querySelector("input");

    expect(input).not.toBeNull();

    act(() => {
      input?.dispatchEvent(new Event("focus", { bubbles: true }));
      input?.dispatchEvent(new InputEvent("input", { bubbles: true }));
    });

    act(() => {
      if (input instanceof HTMLInputElement) {
        input.value = "https://youtu.be/97qr0BOdHkc?si=xgT_cD0WHCGQsn_C";
      }
      input?.dispatchEvent(new Event("input", { bubbles: true }));
      input?.dispatchEvent(
        new KeyboardEvent("keydown", { bubbles: true, key: "Enter" }),
      );
    });

    expect(onLoad).toHaveBeenCalledWith("97qr0BOdHkc");
    expect(container.querySelector('[data-youtube-player-host="true"]')).not.toBeNull();
    expect(container.textContent).not.toContain("Load");
  });

  it("plays and stops the hidden player from the single control button", async () => {
    const onPlaybackChange = vi.fn();
    const readyPlayer = createMockPlayer(2);
    let onStateChange:
      | ((event: { data: number; target: MockPlayerInstance }) => void)
      | undefined;

    const MockPlayer = vi.fn(function MockPlayer(
      _element: HTMLElement,
      options: {
        events?: {
          onReady?: (event: { target: MockPlayerInstance }) => void;
          onStateChange?: (event: {
            data: number;
            target: MockPlayerInstance;
          }) => void;
        };
        videoId: string;
      },
    ) {
      onStateChange = options.events?.onStateChange;

      window.setTimeout(() => {
        options.events?.onReady?.({ target: readyPlayer });
      }, 0);

      return readyPlayer;
    });

    window.YT = {
      Player: MockPlayer as unknown as Window["YT"]["Player"],
    };

    await act(async () => {
      root.render(
        <BwCircleYouTubePanel
          onLoad={vi.fn()}
          onPlaybackChange={onPlaybackChange}
          videoId="97qr0BOdHkc"
        />,
      );
      await Promise.resolve();
    });

    act(() => {
      vi.advanceTimersByTime(1);
    });

    const button = [...container.querySelectorAll("button")].find(
      (candidate) => candidate.textContent?.trim() === "Play",
    );

    expect(button).not.toBeUndefined();

    act(() => {
      button?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    expect(readyPlayer.playVideo).toHaveBeenCalledTimes(1);

    act(() => {
      onStateChange?.({ data: 1, target: readyPlayer });
    });

    expect(container.textContent).toContain("Stop");

    const stopButton = [...container.querySelectorAll("button")].find(
      (candidate) => candidate.textContent?.trim() === "Stop",
    );

    act(() => {
      stopButton?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    expect(readyPlayer.stopVideo).toHaveBeenCalledTimes(1);
  });
});
