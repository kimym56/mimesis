/** @vitest-environment jsdom */

import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import ThemeToggle from "./ThemeToggle";

let mockPathname = "/";
let mockQueryString = "";
(
  globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
).IS_REACT_ACT_ENVIRONMENT = true;

vi.mock("next/navigation", () => ({
  usePathname: () => mockPathname,
  useSearchParams: () => new URLSearchParams(mockQueryString),
}));

describe("ThemeToggle", () => {
  let container: HTMLDivElement;
  let root: Root | undefined;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
    localStorage.clear();
    mockPathname = "/";
    mockQueryString = "";

    Object.defineProperty(window, "innerWidth", {
      configurable: true,
      writable: true,
      value: 390,
    });

    Object.defineProperty(window, "scrollY", {
      configurable: true,
      writable: true,
      value: 0,
    });

    Object.defineProperty(window, "matchMedia", {
      configurable: true,
      writable: true,
      value: vi.fn().mockImplementation(() => ({
        matches: false,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      })),
    });
  });

  afterEach(() => {
    act(() => {
      root?.unmount();
    });
    container.remove();
  });

  function renderToggle() {
    root = createRoot(container);

    act(() => {
      root.render(<ThemeToggle />);
    });

    const button = container.querySelector("button");
    expect(button).not.toBeNull();

    return button as HTMLButtonElement;
  }

  function scrollTo(nextScrollY: number) {
    act(() => {
      window.scrollY = nextScrollY;
      window.dispatchEvent(new Event("scroll"));
    });
  }

  it("keeps the toggle visible on non-project routes", () => {
    const button = renderToggle();

    scrollTo(80);

    expect(button.dataset.mobileHidden).toBe("false");
  });

  it("hides on downward scroll and reappears on upward scroll for mobile project routes", () => {
    mockPathname = "/project/sample";

    const button = renderToggle();

    expect(button.dataset.mobileHidden).toBe("false");

    scrollTo(96);
    expect(button.dataset.mobileHidden).toBe("true");

    scrollTo(40);
    expect(button.dataset.mobileHidden).toBe("false");
  });

  it("does not render the toggle when any project query param is present", () => {
    mockPathname = "/project/any-project";
    mockQueryString = "mode=3d-driver";

    root = createRoot(container);

    act(() => {
      root?.render(<ThemeToggle />);
    });

    expect(container.querySelector("button")).toBeNull();
  });

  it("renders the toggle for non-3d-driver modes on project routes", () => {
    mockPathname = "/project/wiper-typography";
    mockQueryString = "";

    root = createRoot(container);

    act(() => {
      root?.render(<ThemeToggle />);
    });

    expect(container.querySelector("button")).not.toBeNull();
  });

  it("does not render the toggle when a non-mode query param is present", () => {
    mockPathname = "/project/wiper-typography";
    mockQueryString = "preview=immersive";

    root = createRoot(container);

    act(() => {
      root?.render(<ThemeToggle />);
    });

    expect(container.querySelector("button")).toBeNull();
  });
});
