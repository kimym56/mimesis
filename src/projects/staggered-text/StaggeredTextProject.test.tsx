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
import { DEFAULT_STAGGERED_TEXT_TUNING } from "./staggeredTextTuning";

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
    expect(trigger?.style.getPropertyValue("--outgoing-stagger-step")).toBe(
      `${DEFAULT_STAGGERED_TEXT_TUNING.outgoingStaggerStepMs}ms`,
    );
    expect(trigger?.style.getPropertyValue("--incoming-stagger-step")).toBe(
      `${DEFAULT_STAGGERED_TEXT_TUNING.incomingStaggerStepMs}ms`,
    );
    expect(trigger?.style.getPropertyValue("--handoff-delay")).toBe(
      `${DEFAULT_STAGGERED_TEXT_TUNING.handoffDelayMs}ms`,
    );
    expect(trigger?.style.getPropertyValue("--outgoing-duration")).toBe(
      `${DEFAULT_STAGGERED_TEXT_TUNING.outgoingDurationMs}ms`,
    );
    expect(trigger?.style.getPropertyValue("--incoming-duration")).toBe(
      `${DEFAULT_STAGGERED_TEXT_TUNING.incomingDurationMs}ms`,
    );

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

  it("assigns reverse stagger positions so the release cascade can unwind from the last character", () => {
    act(() => {
      root.render(<StaggeredTextProject projectId="staggered-text" />);
    });

    const slots = Array.from(
      container.querySelectorAll<HTMLElement>('[data-slot="character"]'),
    );
    const forwardIndices = slots.map((slot) => slot.style.getPropertyValue("--char-index"));
    const reverseIndices = slots.map((slot) =>
      slot.style.getPropertyValue("--char-reverse-index"),
    );

    expect(forwardIndices).toEqual([
      "0",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "11",
      "12",
      "13",
    ]);
    expect(reverseIndices).toEqual([
      "13",
      "12",
      "11",
      "10",
      "9",
      "8",
      "7",
      "6",
      "5",
      "4",
      "3",
      "2",
      "1",
      "0",
    ]);
  });

  it("creates reversible web animations with end delays for the rollback cascade", () => {
    const originalAnimate = Element.prototype.animate;
    const animateMock = vi.fn(() => ({
      cancel: vi.fn(),
      currentTime: 0,
      pause: vi.fn(),
      play: vi.fn(),
      playbackRate: 1,
    }));

    Object.defineProperty(Element.prototype, "animate", {
      configurable: true,
      value: animateMock,
    });

    try {
      act(() => {
        root.render(<StaggeredTextProject projectId="staggered-text" />);
      });

      const trigger = container.querySelector("button");

      expect(trigger?.getAttribute("data-motion-driver")).toBe("waapi");
      expect(animateMock).toHaveBeenCalled();
      expect(animateMock.mock.calls[0]?.[1]).toMatchObject({
        delay: 0,
        duration: DEFAULT_STAGGERED_TEXT_TUNING.outgoingDurationMs,
        endDelay:
          13 * DEFAULT_STAGGERED_TEXT_TUNING.outgoingStaggerStepMs,
        fill: "both",
      });
    } finally {
      if (originalAnimate) {
        Object.defineProperty(Element.prototype, "animate", {
          configurable: true,
          value: originalAnimate,
        });
      } else {
        delete (Element.prototype as Partial<typeof Element.prototype>).animate;
      }
    }
  });

});
