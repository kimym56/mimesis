"use client";

import { usePathname, useSearchParams } from "next/navigation";
import {
  useEffect,
  useEffectEvent,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
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
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPathname = pathname ?? "";
  const currentSearchParams = searchParams?.toString() ?? "";
  const theme = useSyncExternalStore(
    subscribe,
    getThemeSnapshot,
    () => DEFAULT_THEME,
  );
  const isProjectQueryMode =
    currentPathname.startsWith("/project/") && currentSearchParams.length > 0;
  const previousScrollYRef = useRef(0);
  const [isMobileHidden, setIsMobileHidden] = useState(false);

  const syncMobileVisibility = useEffectEvent(() => {
    const isProjectDetailRoute = currentPathname.startsWith("/project/");
    const isMobileViewport = window.innerWidth < 1024;
    const currentScrollY = Math.max(window.scrollY, 0);

    if (!isProjectDetailRoute || !isMobileViewport) {
      previousScrollYRef.current = currentScrollY;
      setIsMobileHidden(false);
      return;
    }

    if (currentScrollY <= 8 || currentScrollY < previousScrollYRef.current) {
      setIsMobileHidden(false);
    } else if (currentScrollY > previousScrollYRef.current) {
      setIsMobileHidden(true);
    }

    previousScrollYRef.current = currentScrollY;
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  useEffect(() => {
    previousScrollYRef.current = Math.max(window.scrollY, 0);
    syncMobileVisibility();

    const handleScroll = () => {
      syncMobileVisibility();
    };
    const handleResize = () => {
      syncMobileVisibility();
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [currentPathname]);

  function toggle() {
    applyTheme(theme === "dark" ? "light" : "dark");
  }

  if (isProjectQueryMode) {
    return null;
  }

  const isDark = theme === "dark";
  const label = isDark ? "Switch to light mode" : "Switch to dark mode";

  return (
    <button
      onClick={toggle}
      className={`${styles.toggle} ${isMobileHidden ? styles.mobileHidden : ""}`.trim()}
      data-theme-toggle="true"
      data-mobile-hidden={String(isMobileHidden)}
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
