"use client";

import { useEffect, useSyncExternalStore } from "react";
import styles from "./ThemeToggle.module.css";

type Theme = "light" | "dark";
const DEFAULT_THEME: Theme = "light";
const THEME_EVENT = "themechange";

function getSystemTheme(): Theme {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function getStoredTheme(): Theme | null {
  try {
    const stored = localStorage.getItem("theme");
    if (stored === "light" || stored === "dark") return stored;
  } catch {
    // ignore
  }
  return null;
}

function getThemeSnapshot(): Theme {
  if (typeof window === "undefined") return DEFAULT_THEME;
  return getStoredTheme() ?? getSystemTheme();
}

function subscribe(onStoreChange: () => void) {
  if (typeof window === "undefined") return () => {};

  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
  const handleMediaChange = () => {
    if (!getStoredTheme()) onStoreChange();
  };

  window.addEventListener(THEME_EVENT, onStoreChange);
  window.addEventListener("storage", onStoreChange);
  mediaQuery.addEventListener("change", handleMediaChange);

  return () => {
    window.removeEventListener(THEME_EVENT, onStoreChange);
    window.removeEventListener("storage", onStoreChange);
    mediaQuery.removeEventListener("change", handleMediaChange);
  };
}

function applyTheme(theme: Theme) {
  document.documentElement.setAttribute("data-theme", theme);
  try {
    localStorage.setItem("theme", theme);
  } catch {
    // ignore
  }
  window.dispatchEvent(new Event(THEME_EVENT));
}

export default function ThemeToggle() {
  const theme = useSyncExternalStore(
    subscribe,
    getThemeSnapshot,
    () => DEFAULT_THEME,
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  function toggle() {
    applyTheme(theme === "dark" ? "light" : "dark");
  }

  const isDark = theme === "dark";
  const label = isDark ? "Switch to light mode" : "Switch to dark mode";

  return (
    <button
      onClick={toggle}
      className={styles.toggle}
      aria-label={label}
      title={label}
    >
      {isDark ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
        </svg>
      )}
    </button>
  );
}
