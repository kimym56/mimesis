// @vitest-environment jsdom

import { act } from "react";
import { createRoot, hydrateRoot, type Root } from "react-dom/client";
import { renderToString } from "react-dom/server";
import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import StaggeredTextProject from "./StaggeredTextProject";
import styles from "./StaggeredTextProject.module.css";
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

  it("renders hover mode by default and switches implementations with the mode toggle", () => {
    act(() => {
      root.render(<StaggeredTextProject projectId="staggered-text" />);
    });

    const hoverImplementation = container.querySelector('[data-implementation="hover"]');
    const buttonImplementation = container.querySelector('[data-implementation="button"]');
    const toggleShell = container.querySelector('[role="tablist"]');
    const hoverToggle = container.querySelector('[data-mode-toggle="hover"]');
    const buttonToggle = container.querySelector('[data-mode-toggle="button"]');

    expect(hoverImplementation).not.toBeNull();
    expect(buttonImplementation).toBeNull();
    expect(toggleShell?.className).toContain(styles.modeToggle);
    expect(hoverToggle?.className).toContain(styles.modeButton);
    expect(hoverToggle?.className).toContain(styles.modeButtonActive);
    expect(buttonToggle?.className).toContain(styles.modeButton);
    expect(buttonToggle?.className).not.toContain(styles.modeButtonActive);
    expect(container.querySelector('input[type="text"]')).toBeNull();
    expect(hoverImplementation?.querySelectorAll('[data-slot="character"]')).toHaveLength(14);
    expect(hoverImplementation?.getAttribute("data-active")).toBe("false");
    expect(hoverImplementation?.style.getPropertyValue("--outgoing-stagger-step")).toBe(
      `${DEFAULT_STAGGERED_TEXT_TUNING.outgoingStaggerStepMs}ms`,
    );
    expect(hoverImplementation?.style.getPropertyValue("--incoming-stagger-step")).toBe(
      `${DEFAULT_STAGGERED_TEXT_TUNING.incomingStaggerStepMs}ms`,
    );
    expect(hoverImplementation?.style.getPropertyValue("--handoff-delay")).toBe(
      `${DEFAULT_STAGGERED_TEXT_TUNING.handoffDelayMs}ms`,
    );
    expect(hoverImplementation?.style.getPropertyValue("--outgoing-duration")).toBe(
      `${DEFAULT_STAGGERED_TEXT_TUNING.outgoingDurationMs}ms`,
    );
    expect(hoverImplementation?.style.getPropertyValue("--incoming-duration")).toBe(
      `${DEFAULT_STAGGERED_TEXT_TUNING.incomingDurationMs}ms`,
    );

    act(() => {
      buttonToggle?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    expect(buttonToggle?.className).toContain(styles.modeButtonActive);
    expect(container.querySelector('[data-implementation="hover"]')).toBeNull();
    expect(container.querySelector('[data-implementation="button"]')).not.toBeNull();
    expect(container.querySelector('input[type="text"]')).not.toBeNull();
  });

  it("activates the hover implementation on stage hover", () => {
    act(() => {
      root.render(<StaggeredTextProject projectId="staggered-text" />);
    });

    const stage = container.querySelector('[data-implementation="hover"]');

    expect(stage?.getAttribute("data-active")).toBe("false");

    act(() => {
      stage?.dispatchEvent(new Event("pointerover", { bubbles: true }));
    });

    expect(stage?.getAttribute("data-active")).toBe("true");

    act(() => {
      stage?.dispatchEvent(new Event("pointerout", { bubbles: true }));
    });

    expect(stage?.getAttribute("data-active")).toBe("false");
  });

  it("updates the button-mode text input, falls back when empty, and preserves the press interaction", () => {
    act(() => {
      root.render(<StaggeredTextProject projectId="staggered-text" />);
    });

    const buttonToggle = container.querySelector('[data-mode-toggle="button"]');

    act(() => {
      buttonToggle?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    const implementation = container.querySelector('[data-implementation="button"]');
    const input = container.querySelector('input[type="text"]') as HTMLInputElement | null;
    const trigger = implementation?.querySelector("button");

    expect(input).not.toBeNull();
    expect(trigger).not.toBeNull();
    expect(trigger?.getAttribute("data-active")).toBe("false");

    act(() => {
      input!.value = "Hello Motion";
      input!.dispatchEvent(new Event("input", { bubbles: true }));
    });

    const updatedOutgoingText = Array.from(
      implementation?.querySelectorAll('[data-part="outgoing-glyph"]') ?? [],
    )
      .map((glyph) => glyph.textContent)
      .join("");
    const updatedIncomingText = Array.from(
      implementation?.querySelectorAll('[data-part="incoming-glyph"]') ?? [],
    )
      .map((glyph) => glyph.textContent)
      .join("");

    expect(updatedOutgoingText).toBe("HelloMotion");
    expect(updatedIncomingText).toBe("HelloMotion");

    act(() => {
      trigger?.dispatchEvent(new Event("pointerdown", { bubbles: true }));
    });

    expect(trigger?.getAttribute("data-active")).toBe("true");

    act(() => {
      trigger?.dispatchEvent(new Event("pointerout", { bubbles: true }));
    });

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
      input!.value = "";
      input!.dispatchEvent(new Event("input", { bubbles: true }));
    });

    const fallbackOutgoingText = Array.from(
      implementation?.querySelectorAll('[data-part="outgoing-glyph"]') ?? [],
    )
      .map((glyph) => glyph.textContent)
      .join("");

    expect(fallbackOutgoingText).toBe("StartDeploying");
  });

  it("assigns reverse stagger positions in hover mode so the release cascade can unwind from the last character", () => {
    act(() => {
      root.render(<StaggeredTextProject projectId="staggered-text" />);
    });

    const slots = Array.from(
      container.querySelectorAll<HTMLElement>('[data-implementation="hover"] [data-slot="character"]'),
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

      const stage = container.querySelector('[data-implementation="hover"]');

      expect(stage?.getAttribute("data-motion-driver")).toBe("waapi");
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

  it("does not rebuild button-mode animations when pointer leave triggers rollback", () => {
    const originalAnimate = Element.prototype.animate;
    const animateMock = vi.fn(() => ({
      cancel: vi.fn(),
      currentTime: 120,
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

      const buttonToggle = container.querySelector('[data-mode-toggle="button"]');

      act(() => {
        buttonToggle?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
      });

      const trigger = container.querySelector('[data-implementation="button"] button');
      const initialAnimateCalls = animateMock.mock.calls.length;

      act(() => {
        trigger?.dispatchEvent(new Event("pointerdown", { bubbles: true }));
      });

      act(() => {
        trigger?.dispatchEvent(new Event("pointerout", { bubbles: true }));
      });

      expect(animateMock.mock.calls).toHaveLength(initialAnimateCalls);
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

  it("hydrates without changing the motion driver between the server and first client render", async () => {
    const originalAnimate = Element.prototype.animate;
    const originalElement = globalThis.Element;
    const animateMock = vi.fn(() => ({
      cancel: vi.fn(),
      currentTime: 0,
      pause: vi.fn(),
      play: vi.fn(),
      playbackRate: 1,
    }));
    const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    const hydrationContainer = document.createElement("div");
    let hydrationRoot: Root | null = null;

    document.body.appendChild(hydrationContainer);

    Object.defineProperty(Element.prototype, "animate", {
      configurable: true,
      value: animateMock,
    });

    try {
      // Simulate the server environment where Element is unavailable during render.
      // @ts-expect-error Test-only server emulation.
      delete globalThis.Element;
      const serverHtml = renderToString(
        <StaggeredTextProject projectId="staggered-text" />,
      );
      globalThis.Element = originalElement;

      hydrationContainer.innerHTML = serverHtml;

      await act(async () => {
        hydrationRoot = hydrateRoot(
          hydrationContainer,
          <StaggeredTextProject projectId="staggered-text" />,
        );
      });

      const stage = hydrationContainer.querySelector('[data-implementation="hover"]');

      expect(consoleErrorSpy).not.toHaveBeenCalled();
      expect(stage?.getAttribute("data-motion-driver")).toBe("waapi");
    } finally {
      hydrationRoot?.unmount();
      hydrationContainer.remove();
      consoleErrorSpy.mockRestore();

      if (originalElement) {
        globalThis.Element = originalElement;
      }

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
