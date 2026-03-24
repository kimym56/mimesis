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
import XPostReferenceEmbed from "./XPostReferenceEmbed";

globalThis.IS_REACT_ACT_ENVIRONMENT = true;

describe("XPostReferenceEmbed", () => {
  let container: HTMLDivElement;
  let root: Root;
  let secondContainer: HTMLDivElement | null;
  let secondRoot: Root | null;
  let originalTwttr: typeof window.twttr;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
    root = createRoot(container);
    secondContainer = null;
    secondRoot = null;
    originalTwttr = window.twttr;
    delete window.twttr;
  });

  afterEach(() => {
    act(() => {
      root.unmount();
      secondRoot?.unmount();
    });
    container.remove();
    secondContainer?.remove();
    delete window.twttr;
    if (originalTwttr) {
      window.twttr = originalTwttr;
    }
    document
      .querySelectorAll('script[src="https://platform.twitter.com/widgets.js"]')
      .forEach((script) => script.remove());
    vi.restoreAllMocks();
  });

  it("renders the official X blockquote and injects the widget script", async () => {
    await act(async () => {
      root.render(
        <XPostReferenceEmbed fallback={<div>Fallback card</div>} />,
      );
    });

    expect(container.innerHTML).toContain("twitter-tweet");
    expect(container.textContent).toContain("Staggered text hover effect");
    expect(
      document.querySelectorAll(
        'script[src="https://platform.twitter.com/widgets.js"]',
      ),
    ).toHaveLength(1);
  });

  it("injects the widget script only once across multiple mounts", async () => {
    await act(async () => {
      root.render(
        <XPostReferenceEmbed fallback={<div>Fallback card</div>} />,
      );
    });

    secondContainer = document.createElement("div");
    document.body.appendChild(secondContainer);
    secondRoot = createRoot(secondContainer);

    await act(async () => {
      secondRoot?.render(
        <XPostReferenceEmbed fallback={<div>Fallback card</div>} />,
      );
    });

    expect(
      document.querySelectorAll(
        'script[src="https://platform.twitter.com/widgets.js"]',
      ),
    ).toHaveLength(1);
  });

  it("keeps the fallback visible when the widget script fails", async () => {
    await act(async () => {
      root.render(
        <XPostReferenceEmbed fallback={<div>Fallback card</div>} />,
      );
    });

    const script = document.querySelector(
      'script[src="https://platform.twitter.com/widgets.js"]',
    );

    expect(script).not.toBeNull();

    await act(async () => {
      script?.dispatchEvent(new Event("error"));
    });

    expect(container.textContent).toContain("Fallback card");
  });

  it("calls the X widgets loader when the script becomes ready", async () => {
    await act(async () => {
      root.render(
        <XPostReferenceEmbed fallback={<div>Fallback card</div>} />,
      );
    });

    const loadMock = vi.fn();
    window.twttr = {
      widgets: {
        load: loadMock,
      },
    };

    const script = document.querySelector(
      'script[src="https://platform.twitter.com/widgets.js"]',
    );

    await act(async () => {
      script?.dispatchEvent(new Event("load"));
      await Promise.resolve();
    });

    expect(loadMock).toHaveBeenCalledTimes(1);
  });
});
