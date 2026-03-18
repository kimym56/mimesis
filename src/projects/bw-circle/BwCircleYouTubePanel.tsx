"use client";

import { useEffect, useRef, useState } from "react";
import type { BwCirclePlaybackState } from "./BwCircleProject";
import { parseYouTubeVideoId } from "./bwCircleYouTube";
import styles from "./BwCircleProject.module.css";

interface YouTubePlayerInstance {
  destroy: () => void;
  getCurrentTime: () => number;
  getPlayerState: () => number;
}

interface YouTubePlayerEvent {
  data: number;
}

interface YouTubePlayerOptions {
  events?: {
    onReady?: () => void;
    onStateChange?: (event: YouTubePlayerEvent) => void;
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

let youTubeApiPromise: Promise<void> | null = null;

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
  const playerHostRef = useRef<HTMLDivElement | null>(null);
  const playerRef = useRef<YouTubePlayerInstance | null>(null);
  const pollRef = useRef<number | null>(null);
  const playbackCallbackRef = useRef(onPlaybackChange);

  useEffect(() => {
    playbackCallbackRef.current = onPlaybackChange;
  }, [onPlaybackChange]);

  const handleLoad = () => {
    const nextVideoId = parseYouTubeVideoId(input);

    if (!nextVideoId) {
      setError("Enter a valid YouTube link.");
      onLoad(null);
      return;
    }

    setError(null);
    onLoad(nextVideoId);
  };

  useEffect(() => {
    if (!videoId) {
      playbackCallbackRef.current(IDLE_PLAYBACK_STATE);
      playerRef.current?.destroy();
      playerRef.current = null;

      if (pollRef.current) {
        window.clearInterval(pollRef.current);
        pollRef.current = null;
      }

      return;
    }

    let cancelled = false;

    const updatePlayback = () => {
      const player = playerRef.current;

      if (!player) {
        return;
      }

      playbackCallbackRef.current({
        currentTime: player.getCurrentTime() || 0,
        isPlaying: player.getPlayerState() === 1,
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
        width: "100%",
        height: "100%",
        playerVars: {
          playsinline: 1,
          rel: 0,
        },
        events: {
          onReady: updatePlayback,
          onStateChange: (event) => {
            if (event.data === 0) {
              playbackCallbackRef.current(IDLE_PLAYBACK_STATE);
              return;
            }

            updatePlayback();
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
          onChange={(event) => setInput(event.target.value)}
          placeholder="Paste a YouTube link"
          type="url"
          value={input}
        />
        <button
          className={styles.loadButton}
          onClick={handleLoad}
          type="button"
        >
          Load
        </button>
      </div>
      {error ? <p className={styles.errorText}>{error}</p> : null}
      {videoId ? (
        <div className={styles.playerFrame}>
          <div className={styles.playerHost} ref={playerHostRef} />
        </div>
      ) : null}
    </div>
  );
}
