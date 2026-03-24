"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import styles from "./ProjectDetail.module.css";

declare global {
  interface Window {
    twttr?: {
      widgets?: {
        load?: (element?: Element | null) => void;
      };
    };
  }
}

const X_WIDGETS_SCRIPT_SRC = "https://platform.twitter.com/widgets.js";

let xEmbedScriptPromise: Promise<void> | null = null;

function ensureXEmbedScript() {
  if (window.twttr?.widgets?.load) {
    return Promise.resolve();
  }

  const existingScript = document.querySelector(
    `script[src="${X_WIDGETS_SCRIPT_SRC}"]`,
  ) as HTMLScriptElement | null;

  if (xEmbedScriptPromise && existingScript) {
    return xEmbedScriptPromise;
  }

  if (xEmbedScriptPromise && !existingScript) {
    xEmbedScriptPromise = null;
  }

  xEmbedScriptPromise = new Promise<void>((resolve, reject) => {
    const script = existingScript ?? document.createElement("script");

    const handleLoad = () => {
      script.dataset.loaded = "true";
      resolve();
    };

    const handleError = () =>
      reject(new Error("X widget script failed to load."));

    if (script.dataset.loaded === "true") {
      resolve();
      return;
    }

    script.addEventListener("load", handleLoad, { once: true });
    script.addEventListener("error", handleError, { once: true });

    if (!existingScript) {
      script.src = X_WIDGETS_SCRIPT_SRC;
      script.async = true;
      script.charset = "utf-8";
      document.head.appendChild(script);
    }
  }).catch((error) => {
    xEmbedScriptPromise = null;
    throw error;
  });

  return xEmbedScriptPromise;
}

export default function XPostReferenceEmbed({
  fallback,
}: {
  fallback: ReactNode;
}) {
  const embedRef = useRef<HTMLDivElement>(null);
  const [scriptFailed, setScriptFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;

    ensureXEmbedScript()
      .then(() => {
        if (cancelled) {
          return;
        }

        if (!window.twttr?.widgets?.load) {
          setScriptFailed(true);
          return;
        }

        window.twttr.widgets.load?.(embedRef.current);
      })
      .catch(() => {
        if (!cancelled) {
          setScriptFailed(true);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  if (scriptFailed) {
    return fallback;
  }

  return (
    <div className={styles.threadsEmbedShell}>
      <div ref={embedRef} className={styles.threadsEmbedMarkup}>
        <blockquote className="twitter-tweet">
          <p lang="en" dir="ltr">
            Staggered text hover effect{" "}
            <a href="https://t.co/vpKBaD5sa6">pic.twitter.com/vpKBaD5sa6</a>
          </p>
          &mdash; rauno (@raunofreiberg){" "}
          <a href="https://twitter.com/raunofreiberg/status/1826969932099104959?ref_src=twsrc%5Etfw">
            August 23, 2024
          </a>
        </blockquote>
      </div>
    </div>
  );
}
