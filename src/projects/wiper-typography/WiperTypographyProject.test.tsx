// @vitest-environment jsdom

import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import {
  afterAll,
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import WiperTypographyProject from "./WiperTypographyProject";

globalThis.IS_REACT_ACT_ENVIRONMENT = true;

vi.mock(
  "./WiperTypographyCanvas2D",
  () => ({
    default: () => <div>mock-2d-canvas</div>,
  }),
  { virtual: true }
);

vi.mock(
  "./WiperTypographySceneGlyphField3D",
  () => ({
    default: () => <div>mock-3d-glyphs</div>,
  }),
  { virtual: true }
);

vi.mock(
  "./WiperTypographySceneFrame",
  () => ({
    default: ({ children }: { children?: React.ReactNode }) => (
      <div>mock-scene-frame{children}</div>
    ),
  }),
  { virtual: true }
);

vi.mock(
  "./WiperTypographySceneStage3D",
  () => ({
    default: () => <div>mock-3d-stage</div>,
  }),
  { virtual: true }
);

describe("WiperTypographyProject", () => {
  let container: HTMLDivElement;
  let root: Root;
  let originalGetContext: typeof HTMLCanvasElement.prototype.getContext;

  beforeAll(() => {
    originalGetContext = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = vi.fn(() => null);
  });

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
    root = createRoot(container);
  });

  afterAll(() => {
    HTMLCanvasElement.prototype.getContext = originalGetContext;
  });

  afterEach(() => {
    act(() => {
      root.unmount();
    });
    container.remove();
  });

  it("renders four mode buttons and switches to a selected 3d mode", () => {
    act(() => {
      root.render(<WiperTypographyProject projectId="wiper-typography" />);
    });

    expect(container.textContent).toContain("mock-2d-canvas");
    expect(container.textContent).toContain("2D Canvas");
    expect(container.textContent).toContain("3D Wiper Bars");
    expect(container.textContent).toContain("3D Glyph Field");
    expect(container.textContent).toContain("3D Stage");

    const button = container.querySelector(
      '[data-mode="3d-bars"]'
    ) as HTMLButtonElement | null;

    expect(button).not.toBeNull();

    act(() => {
      button?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    expect(container.textContent).toContain("mock-scene-frame");
  });
});
