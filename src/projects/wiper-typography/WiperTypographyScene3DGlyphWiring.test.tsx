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
import WiperTypographySceneStage3D from "./WiperTypographySceneStage3D";

globalThis.IS_REACT_ACT_ENVIRONMENT = true;

let container: HTMLDivElement;
let root: Root;
let consoleErrorSpy: ReturnType<typeof vi.spyOn>;

const {
  mockedCockpitShell,
  mockedCockpitWipers,
  mockedExtrudedGlyph,
} = vi.hoisted(() => ({
  mockedCockpitShell: vi.fn(() => <div data-stage-part="cockpit-shell" />),
  mockedCockpitWipers: vi.fn(() => <div data-stage-part="cockpit-wipers" />),
  mockedExtrudedGlyph: vi.fn(() => <div data-testid="extruded-glyph" />),
}));

vi.mock("./WiperTypographyExtrudedGlyph3D", () => ({
  default: mockedExtrudedGlyph,
}));

vi.mock("./WiperTypographyCockpitShell3D", () => ({
  default: mockedCockpitShell,
}));

vi.mock("./WiperTypographyCockpitWipers3D", () => ({
  default: mockedCockpitWipers,
}));

vi.mock("./useWiperSceneSimulation3D", () => ({
  useWiperSceneSimulation3D: vi.fn(() => ({
    glyphScale: 0.33,
    pixelHeight: 100,
    pixelWidth: 100,
    projectX: (value: number) => value,
    projectY: (value: number) => value,
    scale: 0.01,
    simulation: {
      bars: [],
      glyphs: [
        {
          index: 0,
          kind: "glyph",
          radius: 20,
          rotation: 0,
          text: "T",
          vx: 0,
          vy: 0,
          x: 10,
          y: 20,
        },
      ],
    },
    worldHeight: 100,
    worldWidth: 100,
  })),
}));

vi.mock("./WiperTypographySceneFrame", () => ({
  default: ({
    renderScene,
  }: {
    renderScene: ({ phaseRef }: { phaseRef: { current: number } }) => React.ReactNode;
  }) => <div>{renderScene({ phaseRef: { current: 0 } })}</div>,
}));

vi.mock("@react-three/drei", () => ({
  Text: ({ children }: { children?: React.ReactNode }) => <div>{children}</div>,
}));

vi.mock("@react-three/fiber", () => ({
  useFrame: () => undefined,
}));

describe("WiperTypographyScene3DGlyphWiring", () => {
  beforeEach(() => {
    mockedCockpitShell.mockClear();
    mockedCockpitWipers.mockClear();
    mockedExtrudedGlyph.mockClear();
    consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    container = document.createElement("div");
    document.body.appendChild(container);
    root = createRoot(container);
  });

  afterEach(() => {
    act(() => {
      root.unmount();
    });
    container.remove();
    consoleErrorSpy.mockRestore();
  });

  it("renders the shared extruded glyph component in the remaining 3d mode", () => {
    act(() => {
      root.render(<WiperTypographySceneStage3D projectId="wiper-typography" />);
    });

    expect(mockedExtrudedGlyph).toHaveBeenCalled();
  });

  it("applies a larger cockpit-stage glyph scale to the shared extruded renderer", () => {
    act(() => {
      root.render(<WiperTypographySceneStage3D projectId="wiper-typography" />);
    });

    const firstCall = mockedExtrudedGlyph.mock.calls[0]?.[0] as
      | { scale?: number }
      | undefined;

    expect(firstCall?.scale).toBeCloseTo(0.396, 3);
  });

  it("composes the dedicated cockpit shell and wiper assemblies", () => {
    act(() => {
      root.render(<WiperTypographySceneStage3D projectId="wiper-typography" />);
    });

    expect(mockedCockpitShell).toHaveBeenCalled();
    expect(mockedCockpitWipers).toHaveBeenCalled();

    const shellProps = mockedCockpitShell.mock.calls[0]?.[0] as
      | {
          windshieldY?: number;
          windshieldZ?: number;
          worldHeight?: number;
          worldWidth?: number;
        }
      | undefined;
    const wiperProps = mockedCockpitWipers.mock.calls[0]?.[0] as
      | {
          phaseRef?: { current: number };
          windshieldZ?: number;
          worldHeight?: number;
          worldWidth?: number;
        }
      | undefined;

    expect(shellProps).toEqual(
      expect.objectContaining({
        windshieldY: 2,
        windshieldZ: 0.08,
        worldHeight: 100,
        worldWidth: 100,
      })
    );
    expect(wiperProps).toEqual(
      expect.objectContaining({
        phaseRef: { current: 0 },
        windshieldZ: 0.08,
        worldHeight: 100,
        worldWidth: 100,
      })
    );
    expect(container.querySelector('[data-stage-part="cockpit-shell"]')).not.toBeNull();
    expect(container.querySelector('[data-stage-part="cockpit-wipers"]')).not.toBeNull();
  });
});
