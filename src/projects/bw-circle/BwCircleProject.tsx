"use client";

import { useState } from "react";
import type { InteractiveProjectProps } from "../types";
import BwCircleScene from "./BwCircleScene";
import BwCircleYouTubePanel from "./BwCircleYouTubePanel";
import styles from "./BwCircleProject.module.css";

type BwCircleProjectMode = "mimesis" | "sync";

export interface BwCirclePlaybackState {
  currentTime: number;
  isPlaying: boolean;
  sampledAtMs: number;
}

export type BwCircleAudioSyncStatus =
  | "idle"
  | "prompting"
  | "active"
  | "denied"
  | "unsupported";

export interface BwCircleAudioSyncState {
  status: BwCircleAudioSyncStatus;
  stream: MediaStream | null;
}

const IDLE_PLAYBACK_STATE: BwCirclePlaybackState = {
  currentTime: 0,
  isPlaying: false,
  sampledAtMs: 0,
};

const IDLE_AUDIO_SYNC_STATE: BwCircleAudioSyncState = {
  status: "idle",
  stream: null,
};

export default function BwCircleProject({
  projectId,
}: InteractiveProjectProps) {
  const [mode, setMode] = useState<BwCircleProjectMode>("mimesis");
  const [videoId, setVideoId] = useState<string | null>(null);
  const [audioSync, setAudioSync] = useState<BwCircleAudioSyncState>(
    IDLE_AUDIO_SYNC_STATE,
  );
  const [playback, setPlayback] = useState<BwCirclePlaybackState>(
    IDLE_PLAYBACK_STATE,
  );
  const syncBpm = 120;

  const handleModeChange = (nextMode: BwCircleProjectMode) => {
    setMode(nextMode);

    if (nextMode === "mimesis") {
      setPlayback(IDLE_PLAYBACK_STATE);
    }
  };

  const handleVideoLoad = (nextVideoId: string | null) => {
    setVideoId(nextVideoId);
    setPlayback(IDLE_PLAYBACK_STATE);
  };

  return (
    <div className={styles.interactivePane} data-project-id={projectId}>
      <div className={styles.modeToggle}>
        <button
          className={`${styles.modeButton} ${mode === "mimesis" ? styles.modeButtonActive : ""}`}
          data-mode="mimesis"
          onClick={() => handleModeChange("mimesis")}
          type="button"
        >
          Mimesis
        </button>
        <button
          className={`${styles.modeButton} ${mode === "sync" ? styles.modeButtonActive : ""}`}
          data-mode="sync"
          onClick={() => handleModeChange("sync")}
          type="button"
        >
          Sync
        </button>
      </div>
      <BwCircleScene
        audioSync={audioSync}
        bpm={syncBpm}
        mode={mode}
        playback={playback}
        syncOverlay={
          mode === "sync" ? (
            <BwCircleYouTubePanel
              audioSyncStatus={audioSync.status}
              onAudioSyncChange={setAudioSync}
              onLoad={handleVideoLoad}
              onPlaybackChange={setPlayback}
              videoId={videoId}
            />
          ) : null
        }
      />
    </div>
  );
}
