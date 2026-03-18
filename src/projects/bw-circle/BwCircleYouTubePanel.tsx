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
  playVideo: () => void;
  stopVideo: () => void;
}

interface YouTubePlayerReadyEvent {
  target: YouTubePlayerInstance;
}

interface YouTubePlayerStateChangeEvent extends YouTubePlayerReadyEvent {
  data: number;
}

interface YouTubePlayerOptions {
  events?: {
    onReady?: (event: YouTubePlayerReadyEvent) => void;
    onStateChange?: (event: YouTubePlayerStateChangeEvent) => void;
  };
  height?: string;
  playerVars?: Record<string, number | string>;
  videoId: string;
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
};
const PLACEHOLDER_URL = "https://youtu.be/97qr0BOdHkc?si=xgT_cD0WHCGQsn_C";

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
  onLoad,
  onPlaybackChange,
  videoId,
}: {
  onLoad: (videoId: string | null) => void;
  onPlaybackChange: (playback: BwCirclePlaybackState) => void;
  videoId: string | null;
}) {
  const [input, setInput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const playerHostRef = useRef<HTMLDivElement | null>(null);
  const playerRef = useRef<YouTubePlayerInstance | null>(null);
  const pollRef = useRef<number | null>(null);
  const playbackCallbackRef = useRef(onPlaybackChange);
  const pendingPlayRef = useRef(false);

  useEffect(() => {
    playbackCallbackRef.current = onPlaybackChange;
  }, [onPlaybackChange]);

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

    const nextVideoId = commitInputVideo();

    if (!nextVideoId) {
      return;
    }

    pendingPlayRef.current = true;

    if (hasPlaybackControls(player) && nextVideoId === videoId) {
      player.playVideo();
      pendingPlayRef.current = false;
    }
  };

  useEffect(() => {
    if (!videoId) {
      playbackCallbackRef.current(IDLE_PLAYBACK_STATE);
      playerRef.current?.destroy();
      playerRef.current = null;
      pendingPlayRef.current = false;

      if (pollRef.current) {
        window.clearInterval(pollRef.current);
        pollRef.current = null;
      }

      return;
    }

    let cancelled = false;

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
      setIsPlaying(nextIsPlaying);

      playbackCallbackRef.current({
        currentTime: player.getCurrentTime() || 0,
        isPlaying: nextIsPlaying,
      });
    };

    ensureYouTubeIframeApi().then(() => {
      if (cancelled || !playerHostRef.current || !window.YT?.Player) {
        return;
      }

      playerRef.current?.destroy();
      playerHostRef.current.innerHTML = "";

      playerRef.current = new window.YT.Player(playerHostRef.current, {
        videoId,
        width: "1",
        height: "1",
        playerVars: {
          playsinline: 1,
          rel: 0,
        },
        events: {
          onReady: (event) => {
            const player = event.target;

            playerRef.current = player;

            if (hasPlaybackControls(player)) {
              player.cueVideoById(videoId);

              if (pendingPlayRef.current) {
                player.playVideo();
                pendingPlayRef.current = false;
              }
            }

            updatePlayback(event);
          },
          onStateChange: (event) => {
            if (event.data === 0) {
              setIsPlaying(false);
              pendingPlayRef.current = false;
              playbackCallbackRef.current(IDLE_PLAYBACK_STATE);
              return;
            }

            if (event.data === 1) {
              pendingPlayRef.current = false;
            }

            updatePlayback(event);
          },
        },
      });

      pollRef.current = window.setInterval(updatePlayback, 180);
    });

    return () => {
      cancelled = true;

      if (pollRef.current) {
        window.clearInterval(pollRef.current);
        pollRef.current = null;
      }

      playerRef.current?.destroy();
      playerRef.current = null;
      playbackCallbackRef.current(IDLE_PLAYBACK_STATE);
    };
  }, [videoId]);

  return (
    <div className={styles.syncPanel}>
      <div className={styles.inputRow}>
        <input
          className={styles.linkInput}
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
