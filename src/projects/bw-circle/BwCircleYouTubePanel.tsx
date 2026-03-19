"use client";

import { useEffect, useRef, useState } from "react";
import type { BwCirclePlaybackState } from "./BwCircleProject";
import { parseYouTubeVideoId } from "./bwCircleYouTube";
import styles from "./BwCircleProject.module.css";

interface YouTubePlayerInstance {
  cueVideoById: (videoId: string) => void;
  destroy: () => void;
  getCurrentTime: () => number;
  getPlayerState: () => number;
  loadVideoById: (videoId: string) => void;
  playVideo: () => void;
  stopVideo: () => void;
}

interface YouTubePlayerReadyEvent {
  target: YouTubePlayerInstance;
}

interface YouTubePlayerStateChangeEvent extends YouTubePlayerReadyEvent {
  data: number;
}

interface YouTubePlayerErrorEvent extends YouTubePlayerReadyEvent {
  data: number;
}

interface YouTubePlayerOptions {
  events?: {
    onError?: (event: YouTubePlayerErrorEvent) => void;
    onReady?: (event: YouTubePlayerReadyEvent) => void;
    onStateChange?: (event: YouTubePlayerStateChangeEvent) => void;
  };
  height?: string;
  playerVars?: Record<string, number | string>;
  videoId?: string;
  width?: string;
}

interface YouTubeNamespace {
  Player: new (
    element: HTMLElement,
    options: YouTubePlayerOptions,
  ) => YouTubePlayerInstance;
}

declare global {
  interface Window {
    YT?: YouTubeNamespace;
    onYouTubeIframeAPIReady?: () => void;
  }
}

const IDLE_PLAYBACK_STATE: BwCirclePlaybackState = {
  currentTime: 0,
  isPlaying: false,
  sampledAtMs: 0,
};
const DEFAULT_BPM = 120;
const MIN_BPM = 48;
const PLACEHOLDER_URL = "https://youtu.be/97qr0BOdHkc?si=xgT_cD0WHCGQsn_C";
const MAX_BPM = 220;
const TAP_HISTORY_LIMIT = 4;
const TAP_RESET_WINDOW_MS = 2_000;

let youTubeApiPromise: Promise<void> | null = null;

function hasQueryablePlaybackState(
  player: YouTubePlayerInstance | null,
): player is YouTubePlayerInstance {
  return (
    typeof player?.getCurrentTime === "function" &&
    typeof player.getPlayerState === "function"
  );
}

function hasPlaybackControls(
  player: YouTubePlayerInstance | null,
): player is YouTubePlayerInstance {
  return (
    hasQueryablePlaybackState(player) &&
    typeof player.cueVideoById === "function" &&
    typeof player.playVideo === "function" &&
    typeof player.stopVideo === "function"
  );
}

function getYouTubeErrorMessage(code: number) {
  switch (code) {
    case 2:
      return "This YouTube link is invalid.";
    case 100:
      return "This video is unavailable.";
    case 101:
    case 150:
      return "This video can't be played in an embedded player.";
    default:
      return "This video can't be played right now.";
  }
}

function clampBpm(value: number) {
  return Math.min(MAX_BPM, Math.max(MIN_BPM, Math.round(value)));
}

function deriveTappedBpm(tapTimesMs: number[]) {
  if (tapTimesMs.length < 2) {
    return null;
  }

  const intervals = tapTimesMs
    .slice(1)
    .map((tapTimeMs, index) => tapTimeMs - tapTimesMs[index])
    .filter((intervalMs) => intervalMs > 0);

  if (intervals.length === 0) {
    return null;
  }

  const averageIntervalMs =
    intervals.reduce((sum, intervalMs) => sum + intervalMs, 0) / intervals.length;

  if (averageIntervalMs <= 0) {
    return null;
  }

  return clampBpm(60_000 / averageIntervalMs);
}

function ensureYouTubeIframeApi() {
  if (window.YT?.Player) {
    return Promise.resolve();
  }

  if (youTubeApiPromise) {
    return youTubeApiPromise;
  }

  youTubeApiPromise = new Promise((resolve) => {
    const previousReady = window.onYouTubeIframeAPIReady;

    window.onYouTubeIframeAPIReady = () => {
      previousReady?.();
      resolve();
    };

    const existingScript = document.querySelector(
      'script[src="https://www.youtube.com/iframe_api"]',
    );

    if (existingScript) {
      return;
    }

    const script = document.createElement("script");
    script.src = "https://www.youtube.com/iframe_api";
    script.async = true;
    document.head.appendChild(script);
  });

  return youTubeApiPromise;
}

export default function BwCircleYouTubePanel({
  bpm = DEFAULT_BPM,
  onBpmChange = () => {},
  onLoad,
  onPlaybackChange,
  videoId,
}: {
  bpm?: number;
  onBpmChange?: (bpm: number) => void;
  onLoad: (videoId: string | null) => void;
  onPlaybackChange: (playback: BwCirclePlaybackState) => void;
  videoId: string | null;
}) {
  const [input, setInput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const playerHostRef = useRef<HTMLDivElement | null>(null);
  const playerMountNodeRef = useRef<HTMLDivElement | null>(null);
  const playerRef = useRef<YouTubePlayerInstance | null>(null);
  const playerReadyRef = useRef(false);
  const pollRef = useRef<number | null>(null);
  const playbackCallbackRef = useRef(onPlaybackChange);
  const latestVideoIdRef = useRef(videoId);
  const pendingPlayRef = useRef(false);
  const playerCreationInFlightRef = useRef(false);
  const skipCueVideoIdRef = useRef<string | null>(null);
  const tapTimesRef = useRef<number[]>([]);

  useEffect(() => {
    playbackCallbackRef.current = onPlaybackChange;
  }, [onPlaybackChange]);

  useEffect(() => {
    latestVideoIdRef.current = videoId;
  }, [videoId]);

  const commitInputVideo = (candidateInput = input) => {
    const trimmedInput = candidateInput.trim();

    if (!trimmedInput) {
      return videoId;
    }

    const nextVideoId = parseYouTubeVideoId(trimmedInput);

    if (!nextVideoId) {
      setError("Enter a valid YouTube link.");
      return null;
    }

    if (nextVideoId !== videoId) {
      setIsPlaying(false);
      onLoad(nextVideoId);
    }

    setError(null);
    return nextVideoId;
  };

  const handlePlaybackToggle = () => {
    const player = playerRef.current;

    if (isPlaying) {
      pendingPlayRef.current = false;

      if (hasPlaybackControls(player)) {
        player.stopVideo();
      }

      setIsPlaying(false);
      playbackCallbackRef.current(IDLE_PLAYBACK_STATE);
      return;
    }

    const nextVideoId = commitInputVideo(inputRef.current?.value ?? input);

    if (!nextVideoId) {
      return;
    }

    pendingPlayRef.current = true;

    if (hasPlaybackControls(player) && playerReadyRef.current) {
      if (nextVideoId !== videoId) {
        skipCueVideoIdRef.current = nextVideoId;
        player.loadVideoById(nextVideoId);
        pendingPlayRef.current = false;
        return;
      }

      player.playVideo();
      pendingPlayRef.current = false;
      return;
    }
  };

  const handleBpmInputChange = (nextValue: string) => {
    const parsedValue = Number(nextValue);

    if (!Number.isFinite(parsedValue)) {
      return;
    }

    onBpmChange(clampBpm(parsedValue));
  };

  const handleTapTempo = () => {
    const nowMs = performance.now();
    const lastTapMs = tapTimesRef.current.at(-1) ?? null;
    const nextTapTimesMs =
      lastTapMs !== null && nowMs - lastTapMs > TAP_RESET_WINDOW_MS
        ? [nowMs]
        : [...tapTimesRef.current, nowMs].slice(-TAP_HISTORY_LIMIT);

    tapTimesRef.current = nextTapTimesMs;

    const nextBpm = deriveTappedBpm(nextTapTimesMs);

    if (nextBpm !== null) {
      onBpmChange(nextBpm);
    }
  };

  useEffect(() => {
    const player = playerRef.current;

    if (!videoId || !hasPlaybackControls(player) || !playerReadyRef.current) {
      return;
    }

    if (skipCueVideoIdRef.current === videoId) {
      skipCueVideoIdRef.current = null;
      return;
    }

    player.cueVideoById(videoId);
    playbackCallbackRef.current(IDLE_PLAYBACK_STATE);
  }, [videoId]);

  useEffect(() => {
    if (!videoId || !playerHostRef.current) {
      return;
    }

    if (playerRef.current || playerCreationInFlightRef.current) {
      return;
    }

    let cancelled = false;
    playerCreationInFlightRef.current = true;

    const stopPolling = () => {
      if (pollRef.current) {
        window.clearInterval(pollRef.current);
        pollRef.current = null;
      }
    };

    const startPolling = () => {
      if (pollRef.current) {
        return;
      }

      pollRef.current = window.setInterval(updatePlayback, 180);
    };

    const updatePlayback = (
      event?: YouTubePlayerReadyEvent | YouTubePlayerStateChangeEvent,
    ) => {
      const player = event?.target ?? playerRef.current;

      if (!hasQueryablePlaybackState(player)) {
        return;
      }

      playerRef.current = player;
      const nextIsPlaying =
        event && "data" in event ? event.data === 1 : player.getPlayerState() === 1;
      const sampledAtMs = performance.now();
      setIsPlaying(nextIsPlaying);

      playbackCallbackRef.current({
        currentTime: player.getCurrentTime() || 0,
        isPlaying: nextIsPlaying,
        sampledAtMs,
      });
    };

    ensureYouTubeIframeApi().then(() => {
      if (cancelled || !playerHostRef.current || !window.YT?.Player) {
        playerCreationInFlightRef.current = false;
        return;
      }

      playerRef.current?.destroy();
      playerHostRef.current.replaceChildren();
      playerMountNodeRef.current = document.createElement("div");
      playerHostRef.current.appendChild(playerMountNodeRef.current);

      playerRef.current = new window.YT.Player(playerMountNodeRef.current, {
        width: "200",
        height: "200",
        playerVars: {
          origin: window.location.origin,
          playsinline: 1,
          rel: 0,
        },
        ...(latestVideoIdRef.current ? { videoId: latestVideoIdRef.current } : {}),
        events: {
          onReady: (event) => {
            const player = event.target;

            playerRef.current = player;
            playerReadyRef.current = true;

            if (hasPlaybackControls(player)) {
              if (pendingPlayRef.current && latestVideoIdRef.current) {
                skipCueVideoIdRef.current = latestVideoIdRef.current;
                player.loadVideoById(latestVideoIdRef.current);
                pendingPlayRef.current = false;
              } else if (latestVideoIdRef.current) {
                player.cueVideoById(latestVideoIdRef.current);
              }
            }

            updatePlayback(event);

            if (player.getPlayerState() === 1) {
              startPolling();
            }
          },
          onError: (event) => {
            stopPolling();
            setError(getYouTubeErrorMessage(event.data));
            setIsPlaying(false);
            pendingPlayRef.current = false;
            playbackCallbackRef.current(IDLE_PLAYBACK_STATE);
          },
          onStateChange: (event) => {
            if (event.data === 0) {
              stopPolling();
              setIsPlaying(false);
              pendingPlayRef.current = false;
              playbackCallbackRef.current(IDLE_PLAYBACK_STATE);
              return;
            }

            if (event.data === 1) {
              setError(null);
              startPolling();
              pendingPlayRef.current = false;
            }

            updatePlayback(event);
          },
        },
      });

      playerCreationInFlightRef.current = false;

    });

    return () => {
      cancelled = true;
      playerCreationInFlightRef.current = false;
    };
  }, [videoId]);

  useEffect(() => {
    const playerHost = playerHostRef.current;

    return () => {
      if (pollRef.current) {
        window.clearInterval(pollRef.current);
        pollRef.current = null;
      }

      playerReadyRef.current = false;
      playerCreationInFlightRef.current = false;
      playerRef.current?.destroy();
      playerRef.current = null;
      playerMountNodeRef.current = null;
      playerHost?.replaceChildren();
      pendingPlayRef.current = false;
      playbackCallbackRef.current(IDLE_PLAYBACK_STATE);
    };
  }, []);

  return (
    <div className={styles.syncPanel}>
      <div className={styles.inputRow}>
        <input
          className={styles.linkInput}
          ref={inputRef}
          onBlur={(event) => {
            commitInputVideo(event.currentTarget.value);
          }}
          onChange={(event) => setInput(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              commitInputVideo(event.currentTarget.value);
            }
          }}
          placeholder={PLACEHOLDER_URL}
          type="url"
          value={input}
        />
        <input
          aria-label="BPM"
          className={styles.bpmInput}
          inputMode="numeric"
          max={MAX_BPM}
          min={MIN_BPM}
          onInput={(event) => {
            handleBpmInputChange(event.currentTarget.value);
          }}
          onChange={(event) => {
            handleBpmInputChange(event.currentTarget.value);
          }}
          step={1}
          type="number"
          value={bpm}
        />
        <button
          className={styles.tapButton}
          onClick={handleTapTempo}
          type="button"
        >
          Tap
        </button>
        <button
          className={styles.playbackButton}
          onClick={handlePlaybackToggle}
          type="button"
        >
          {isPlaying ? "Stop" : "Play"}
        </button>
      </div>
      {error ? <p className={styles.errorText}>{error}</p> : null}
      <div
        aria-hidden="true"
        className={styles.hiddenPlayerHost}
        data-youtube-player-host="true"
        ref={playerHostRef}
      />
    </div>
  );
}
