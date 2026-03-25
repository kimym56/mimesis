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
    const frontFaces = container.querySelectorAll('[data-face="front"]');
    const bottomFaces = container.querySelectorAll('[data-face="bottom"]');
    const frontText = Array.from(frontFaces)
      .map((face) => face.textContent)
      .join("");
    const bottomText = Array.from(bottomFaces)
      .map((face) => face.textContent)
      .join("");

    expect(trigger).not.toBeNull();
    expect(container.querySelectorAll('[data-slot="character"]')).toHaveLength(14);
    expect(frontFaces).toHaveLength(14);
    expect(bottomFaces).toHaveLength(14);
    expect(frontText).toBe("StartDeploying");
    expect(bottomText).toBe("StartDeploying");
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
