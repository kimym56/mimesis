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
    const slotSizers = container.querySelectorAll('[data-part="slot-sizer"]');
    const outgoingArms = container.querySelectorAll('[data-part="outgoing-arm"]');
    const outgoingGlyphs = container.querySelectorAll('[data-part="outgoing-glyph"]');
    const incomingGlyphs = container.querySelectorAll('[data-part="incoming-glyph"]');
    const outgoingText = Array.from(outgoingGlyphs)
      .map((glyph) => glyph.textContent)
      .join("");
    const incomingText = Array.from(incomingGlyphs)
      .map((glyph) => glyph.textContent)
      .join("");

    expect(trigger).not.toBeNull();
    expect(container.querySelectorAll('[data-slot="character"]')).toHaveLength(14);
    expect(slotSizers).toHaveLength(14);
    expect(outgoingArms).toHaveLength(14);
    expect(outgoingGlyphs).toHaveLength(14);
    expect(incomingGlyphs).toHaveLength(14);
    expect(outgoingText).toBe("StartDeploying");
    expect(incomingText).toBe("StartDeploying");
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
