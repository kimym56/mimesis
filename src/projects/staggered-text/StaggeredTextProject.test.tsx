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
import StaggeredTextProject from "./StaggeredTextProject";

globalThis.IS_REACT_ACT_ENVIRONMENT = true;

vi.mock("framer-motion", () => ({
  useReducedMotion: () => false,
}));

describe("StaggeredTextProject", () => {
  let container: HTMLDivElement;
  let root: Root;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
    root = createRoot(container);
  });

  afterEach(() => {
    act(() => {
      root.unmount();
    });
    container.remove();
  });

  it("renders split characters and toggles active state for pointer and keyboard interaction", () => {
    act(() => {
      root.render(<StaggeredTextProject projectId="staggered-text" />);
    });

    const trigger = container.querySelector("button");

    expect(trigger).not.toBeNull();
    expect(trigger?.textContent?.replace(/\s+/g, " ").trim()).toBe("Start deploying");
    expect(container.querySelectorAll('[data-slot="character"]')).toHaveLength(14);
    expect(trigger?.getAttribute("data-active")).toBe("false");

    act(() => {
      trigger?.dispatchEvent(new Event("pointerdown", { bubbles: true }));
    });

    expect(trigger?.getAttribute("data-active")).toBe("true");

    act(() => {
      trigger?.dispatchEvent(new Event("pointerup", { bubbles: true }));
    });

    expect(trigger?.getAttribute("data-active")).toBe("false");

    act(() => {
      trigger?.focus();
    });

    expect(trigger?.getAttribute("data-active")).toBe("true");

    act(() => {
      trigger?.blur();
    });

    expect(trigger?.getAttribute("data-active")).toBe("false");
  });
});
