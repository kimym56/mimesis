"use client";

import {
  startTransition,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import styles from "./ProjectDetail.module.css";

interface ThreadsOEmbedResponse {
  html?: string;
}

declare global {
  interface Window {
    instgrm?: {
      Embeds?: {
        process?: () => void;
      };
    };
  }
}

let threadsEmbedScriptPromise: Promise<void> | null = null;

function ensureThreadsEmbedScript() {
  if (window.instgrm?.Embeds?.process) {
    return Promise.resolve();
  }

  if (threadsEmbedScriptPromise) {
    return threadsEmbedScriptPromise;
  }

  threadsEmbedScriptPromise = new Promise<void>((resolve, reject) => {
    const existingScript = document.querySelector(
      'script[src="https://www.threads.com/embed.js"]',
    ) as HTMLScriptElement | null;

    const handleLoad = () => resolve();
    const handleError = () =>
      reject(new Error("Threads embed script failed to load."));

    if (existingScript) {
      existingScript.addEventListener("load", handleLoad, { once: true });
      existingScript.addEventListener("error", handleError, { once: true });
      return;
    }

    const script = document.createElement("script");
    script.src = "https://www.threads.com/embed.js";
    script.async = true;
    script.addEventListener("load", handleLoad, { once: true });
    script.addEventListener("error", handleError, { once: true });
    document.head.appendChild(script);
  }).catch((error) => {
    threadsEmbedScriptPromise = null;
    throw error;
  });

  return threadsEmbedScriptPromise;
}

function stripEmbedScriptTag(html: string) {
  return html.replace(/<script[\s\S]*?<\/script>/gi, "").trim();
}

export default function ThreadsReferenceEmbed({
  fallback,
  url,
}: {
  fallback: ReactNode;
  url: string;
}) {
  const [resolvedEmbed, setResolvedEmbed] = useState<{
    html: string | null;
    url: string | null;
  }>({
    html: null,
    url: null,
  });
  const oembedUrl = `https://graph.threads.net/oembed?url=${encodeURIComponent(url)}`;
  const html = resolvedEmbed.url === url ? resolvedEmbed.html : null;

  useEffect(() => {
    let cancelled = false;

    fetch(oembedUrl)
      .then(async (response) => {
        if (!response.ok) {
          return null;
        }

        const payload = (await response.json()) as ThreadsOEmbedResponse;
        return payload.html ? stripEmbedScriptTag(payload.html) : null;
      })
      .then((nextHtml) => {
        if (cancelled || !nextHtml) {
          return;
        }

        startTransition(() => {
          setResolvedEmbed({
            html: nextHtml,
            url,
          });
        });
      })
      .catch(() => {
        // Keep the fallback card visible when oEmbed is unavailable.
      });

    return () => {
      cancelled = true;
    };
  }, [oembedUrl, url]);

  useEffect(() => {
    if (!html) {
      return;
    }

    let cancelled = false;

    ensureThreadsEmbedScript()
      .then(() => {
        if (cancelled) {
          return;
        }

        window.instgrm?.Embeds?.process?.();
      })
      .catch(() => {
        // The fallback path already handled fetch failures; a script failure leaves
        // the lightweight blockquote visible instead of breaking the pane.
      });

    return () => {
      cancelled = true;
    };
  }, [html]);

  if (!html) {
    return fallback;
  }

  return (
    <div className={styles.threadsEmbedShell}>
      <div
        className={styles.threadsEmbedMarkup}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
