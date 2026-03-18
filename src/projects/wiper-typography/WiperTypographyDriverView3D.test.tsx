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
import WiperTypographyDriverView3D from "./WiperTypographyDriverView3D";
import { DEFAULT_TESLA_DRIVER_VIEW_TUNING } from "./wiperTeslaDriverTuning";

globalThis.IS_REACT_ACT_ENVIRONMENT = true;

const { mockedTeslaModel, teslaModelState } = vi.hoisted(() => {
  const state = { shouldSignalReady: true, shouldThrow: false };

  return {
    mockedTeslaModel: vi.fn(
      ({ onReady }: { onReady?: (scene: object) => void } = {}) => {
      if (state.shouldThrow) {
        throw new Error("asset failed");
      }

      if (state.shouldSignalReady) {
        onReady?.({});
      }

      return <div>mock-tesla-model</div>;
      }
    ),
    teslaModelState: state,
  };
});

const { mockedFetch } = vi.hoisted(() => ({
  mockedFetch: vi.fn(),
}));

const { mockedUseTeslaDriverViewGui } = vi.hoisted(() => ({
  mockedUseTeslaDriverViewGui: vi.fn(),
}));

vi.mock("@react-three/fiber", () => ({
  Canvas: ({ children }: { children?: React.ReactNode }) => (
    <div data-testid="mock-canvas">{children}</div>
  ),
  useFrame: () => undefined,
}));

vi.mock("@react-three/drei", () => ({
  Html: ({ children }: { children?: React.ReactNode }) => <div>{children}</div>,
}));

vi.mock("./WiperTypographyTeslaModel", () => ({
  default: mockedTeslaModel,
  TESLA_DRIVER_VIEW_MODEL_PATH: "/models/tesla_2018_model_3.glb",
}));

vi.mock("./WiperTypographyExtrudedGlyph3D", () => ({
  default: () => <div>mock-extruded-glyph</div>,
}));

vi.mock("./useTeslaDriverViewGui", () => ({
  useTeslaDriverViewGui: mockedUseTeslaDriverViewGui,
}));

vi.mock("./WiperTypographyCockpitWipers3D", () => ({
  default: () => <div>mock-cockpit-wipers</div>,
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

describe("WiperTypographyDriverView3D", () => {
  let container: HTMLDivElement;
  let consoleErrorSpy: ReturnType<typeof vi.spyOn>;
  let root: Root;

  beforeEach(() => {
    teslaModelState.shouldSignalReady = true;
    teslaModelState.shouldThrow = false;
    mockedTeslaModel.mockClear();
    mockedUseTeslaDriverViewGui.mockClear();
    mockedFetch.mockReset();
    mockedFetch.mockResolvedValue({ ok: true });
    vi.stubGlobal("fetch", mockedFetch);
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
    vi.unstubAllGlobals();
    consoleErrorSpy.mockRestore();
  });

  it("renders the tesla driver view scene when the model asset exists", async () => {
    await act(async () => {
      root.render(<WiperTypographyDriverView3D projectId="wiper-typography" />);
      await Promise.resolve();
    });

    expect(mockedFetch).toHaveBeenCalledWith("/models/tesla_2018_model_3.glb", {
      method: "HEAD",
    });
    expect(container.textContent).toContain("mock-tesla-model");
    expect(container.textContent).not.toContain("Autoplay driver view");
  });

  it("enables the dev-only tuning gui when the 3d driver view is active", async () => {
    await act(async () => {
      root.render(<WiperTypographyDriverView3D projectId="wiper-typography" />);
      await Promise.resolve();
    });

    expect(mockedUseTeslaDriverViewGui).toHaveBeenCalled();
    expect(mockedUseTeslaDriverViewGui.mock.calls[0]?.[0]).toMatchObject({
      enabled: true,
      tuning: expect.objectContaining({
        fov: DEFAULT_TESLA_DRIVER_VIEW_TUNING.fov,
        lookAtOffsetX: DEFAULT_TESLA_DRIVER_VIEW_TUNING.lookAtOffsetX,
      }),
    });
  });

  it("keeps showing a loading state until the tesla scene signals ready", async () => {
    teslaModelState.shouldSignalReady = false;

    await act(async () => {
      root.render(<WiperTypographyDriverView3D projectId="wiper-typography" />);
      await Promise.resolve();
    });

    expect(container.textContent).toContain("Preparing 3D driver view");
    expect(container.textContent).not.toContain("Autoplay driver view");
  });

  it("shows a fallback instead of mounting the tesla model when the asset is missing", async () => {
    mockedFetch.mockResolvedValue({ ok: false });

    await act(async () => {
      root.render(<WiperTypographyDriverView3D projectId="wiper-typography" />);
      await Promise.resolve();
    });

    expect(mockedTeslaModel).not.toHaveBeenCalled();
    expect(container.textContent).toContain("3D driver view unavailable");
    expect(container.textContent).toContain("/public/models/tesla_2018_model_3.glb");
  });
});
