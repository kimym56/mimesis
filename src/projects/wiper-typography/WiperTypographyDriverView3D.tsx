"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useReducedMotion } from "framer-motion";
import {
  type Dispatch,
  type SetStateAction,
  Suspense,
  startTransition,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type MutableRefObject,
} from "react";
import {
  Box3,
  type BufferGeometry,
  CanvasTexture,
  DoubleSide,
  LinearFilter,
  type Object3D,
  type PerspectiveCamera,
  SRGBColorSpace,
  Vector3,
} from "three";
import type { InteractiveProjectProps } from "../types";
import WiperTypographyTeslaModel, {
  TESLA_DRIVER_VIEW_MODEL_PATH,
} from "./WiperTypographyTeslaModel";
import { WIPER_DRIVER_VIEW_OUTSIDE_COLOR } from "./wiperConfig";
import styles from "./WiperTypographyProject.module.css";
import { useWiperSceneSimulation3D } from "./useWiperSceneSimulation3D";
import {
  computeDriverViewPhase,
  getDriverViewCycleDuration,
} from "./wiperDriverView";
import { drawWiperScene } from "./wiperSceneRenderer";
import { stepWiperSimulationState } from "./wiperSimulation";
import {
  createTeslaDriverGlyphQuaternion,
  createTeslaDriverViewLayout,
  createTeslaDriverViewPlaneFromPoints,
  getTeslaDriverWiperRotation,
  type TeslaDriverViewLayout,
} from "./wiperTeslaDriverLayout";
import {
  clampTeslaDriverViewFov,
  DEFAULT_TESLA_DRIVER_VIEW_TUNING,
  type TeslaDriverViewTuning,
} from "./wiperTeslaDriverTuning";
import { useTeslaDriverViewGui } from "./useTeslaDriverViewGui";

type WindshieldOverlayMesh = Object3D;
type DriverViewAssetState = "checking" | "available" | "missing";
interface DriverViewOverlayAssets {
  canvas: HTMLCanvasElement;
  texture: CanvasTexture;
}

const DRIVER_WINDSHIELD_OVERLAY_PLACEHOLDER: [number, number, number] = [0, -10, 0];
const DRIVER_VIEW_INITIAL_CAMERA_POSITION: [number, number, number] = [
  -0.41,
  0.47,
  -0.43,
];
const DRIVER_VIEW_INITIAL_LOOK_AT: [number, number, number] = [-0.23, 0.56, -0.82];
const DRIVER_VIEW_TEXTURE_MAX_SIZE = 2048;
const DRIVER_VIEW_TEXTURE_SCALE = 2;
const DRIVER_VIEW_INITIAL_FOV = clampTeslaDriverViewFov(
  DEFAULT_TESLA_DRIVER_VIEW_TUNING.fov
);

function addVector3(
  [ax, ay, az]: [number, number, number],
  [bx, by, bz]: [number, number, number]
): [number, number, number] {
  return [ax + bx, ay + by, az + bz];
}

function scaleVector3(
  [x, y, z]: [number, number, number],
  scalar: number
): [number, number, number] {
  return [x * scalar, y * scalar, z * scalar];
}

function createDriverViewOverlayCenter(
  layout: TeslaDriverViewLayout
): [number, number, number] {
  return addVector3(
    layout.windscreenCenter,
    addVector3(
      scaleVector3(
        layout.verticalAxis,
        (layout.glyphYBias - 0.5) * layout.glyphVisibleHeight
      ),
      scaleVector3(layout.normalAxis, layout.glyphDepthOffset)
    )
  );
}

function syncDriverViewOverlayCanvas(
  canvas: HTMLCanvasElement,
  context: CanvasRenderingContext2D,
  pixelWidth: number,
  pixelHeight: number
) {
  const safePixelWidth = Math.max(pixelWidth, 1);
  const safePixelHeight = Math.max(pixelHeight, 1);
  const textureScale = Math.max(
    1,
    Math.min(
      DRIVER_VIEW_TEXTURE_SCALE,
      DRIVER_VIEW_TEXTURE_MAX_SIZE / safePixelWidth,
      DRIVER_VIEW_TEXTURE_MAX_SIZE / safePixelHeight
    )
  );
  const textureWidth = Math.max(1, Math.round(safePixelWidth * textureScale));
  const textureHeight = Math.max(1, Math.round(safePixelHeight * textureScale));

  if (canvas.width !== textureWidth || canvas.height !== textureHeight) {
    canvas.width = textureWidth;
    canvas.height = textureHeight;
  }

  context.setTransform(
    textureWidth / safePixelWidth,
    0,
    0,
    textureHeight / safePixelHeight,
    0,
    0
  );
  context.imageSmoothingEnabled = true;
}

function DriverViewGuiController({
  setTuning,
  tuning,
}: {
  setTuning: Dispatch<SetStateAction<TeslaDriverViewTuning>>;
  tuning: TeslaDriverViewTuning;
}) {
  useTeslaDriverViewGui({
    enabled: true,
    setTuning,
    tuning,
  });

  return null;
}

function DriverViewGlyphField({
  onSceneReady,
  phaseRef,
  reducedMotion,
  tuning,
}: {
  onSceneReady: () => void;
  phaseRef: MutableRefObject<number>;
  reducedMotion: boolean;
  tuning: TeslaDriverViewTuning;
}) {
  const overlayMeshRef = useRef<WindshieldOverlayMesh | null>(null);
  const overlayCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const overlayContextRef = useRef<CanvasRenderingContext2D | null>(null);
  const overlayTextureRef = useRef<CanvasTexture | null>(null);
  const teslaSceneRef = useRef<Object3D | null>(null);
  const wiperDummyRef = useRef<Object3D | null>(null);
  const layoutRef = useRef<TeslaDriverViewLayout | null>(null);
  const { pixelHeight, pixelWidth, simulation } =
    useWiperSceneSimulation3D({
      widthRatio: 0.74,
      heightRatio: 0.62,
    });
  const cycleDuration = getDriverViewCycleDuration(reducedMotion);
  const scratchBoxRef = useRef(new Box3());
  const scratchCenterRef = useRef(new Vector3());
  const scratchPlanePointRef = useRef(new Vector3());
  const scratchSizeRef = useRef(new Vector3());
  const scratchSteeringPositionRef = useRef(new Vector3());
  const overlayAssets = useMemo<DriverViewOverlayAssets | null>(() => {
    if (typeof document === "undefined") {
      return null;
    }

    const canvas = document.createElement("canvas");
    const texture = new CanvasTexture(canvas);

    texture.colorSpace = SRGBColorSpace;
    texture.generateMipmaps = false;
    texture.magFilter = LinearFilter;
    texture.minFilter = LinearFilter;

    return { canvas, texture };
  }, []);

  useEffect(() => {
    layoutRef.current = null;
  }, [tuning]);

  useEffect(() => {
    overlayCanvasRef.current = overlayAssets?.canvas ?? null;
    overlayTextureRef.current = overlayAssets?.texture ?? null;

    return () => {
      overlayCanvasRef.current = null;
      overlayContextRef.current = null;
      overlayTextureRef.current = null;
      overlayAssets?.texture.dispose();
    };
  }, [overlayAssets]);

  const syncLayoutFromScene = useCallback(() => {
    const scene = teslaSceneRef.current;
    if (!scene) {
      return null;
    }

    const steeringDummy = scene.getObjectByName("steering_dummy");
    const windscreenMesh =
      (scene.getObjectByName("windscreen_ok_glass0_0") ??
        scene.getObjectByName("windscreen_ok_glass.0_0")) as
        | (Object3D & { geometry?: BufferGeometry })
        | null;
    const wiperDummy = scene.getObjectByName("dvornik_dummy");

    if (!steeringDummy || !windscreenMesh || !wiperDummy) {
      return null;
    }

    scene.updateMatrixWorld(true);

    const steeringPosition = steeringDummy.getWorldPosition(
      scratchSteeringPositionRef.current
    );
    const windscreenBox = scratchBoxRef.current.setFromObject(windscreenMesh);
    const windscreenCenter = windscreenBox.getCenter(scratchCenterRef.current);
    const windscreenSize = windscreenBox.getSize(scratchSizeRef.current);
    const windscreenGeometry = windscreenMesh.geometry;
    const windscreenPlane =
      windscreenGeometry != null
        ? (() => {
            const positionAttribute = windscreenGeometry.getAttribute("position");

            if (!positionAttribute) {
              return undefined;
            }

            const scratchPoint = scratchPlanePointRef.current;
            const points: Array<[number, number, number]> = [];

            for (let index = 0; index < positionAttribute.count; index += 1) {
              scratchPoint
                .set(
                  positionAttribute.getX(index),
                  positionAttribute.getY(index),
                  positionAttribute.getZ(index)
                )
                .applyMatrix4(windscreenMesh.matrixWorld);
              points.push([scratchPoint.x, scratchPoint.y, scratchPoint.z]);
            }

            return createTeslaDriverViewPlaneFromPoints({
              driverPosition: steeringPosition.toArray() as [number, number, number],
              points,
            });
          })()
        : undefined;

    layoutRef.current = createTeslaDriverViewLayout({
      steeringPosition: steeringPosition.toArray() as [number, number, number],
      windscreenCenter: windscreenCenter.toArray() as [number, number, number],
      windscreenPlane,
      windscreenSize: windscreenSize.toArray() as [number, number, number],
    }, tuning);
    wiperDummyRef.current = wiperDummy;

    return layoutRef.current;
  }, [tuning]);

  useFrame((state) => {
    const layout = layoutRef.current ?? syncLayoutFromScene();
    const phase = computeDriverViewPhase(state.clock.getElapsedTime(), cycleDuration);
    phaseRef.current = phase;
    const perspectiveCamera = state.camera as PerspectiveCamera;
    const clampedFov = clampTeslaDriverViewFov(tuning.fov);

    if (perspectiveCamera.fov !== clampedFov) {
      perspectiveCamera.fov = clampedFov;
      perspectiveCamera.updateProjectionMatrix();
    }

    if (!layout) {
      return;
    }

    state.camera.position.set(...layout.cameraPosition);
    state.camera.lookAt(...layout.lookAt);

    if (wiperDummyRef.current) {
      wiperDummyRef.current.rotation.x = getTeslaDriverWiperRotation(phase);
    }

    stepWiperSimulationState(simulation, phase);

    if (overlayMeshRef.current) {
      overlayMeshRef.current.position.set(...createDriverViewOverlayCenter(layout));
      overlayMeshRef.current.quaternion.copy(
        createTeslaDriverGlyphQuaternion(layout, 0)
      );
      overlayMeshRef.current.scale.set(
        layout.glyphVisibleWidth,
        layout.glyphVisibleHeight,
        1
      );
    }

    const overlayCanvas = overlayCanvasRef.current;
    const overlayTexture = overlayTextureRef.current;

    if (!overlayCanvas || !overlayTexture) {
      return;
    }

    let overlayContext = overlayContextRef.current;

    if (!overlayContext) {
      overlayContext = overlayCanvas.getContext("2d");
      overlayContextRef.current = overlayContext;
    }

    if (!overlayContext) {
      return;
    }

    syncDriverViewOverlayCanvas(
      overlayCanvas,
      overlayContext,
      pixelWidth,
      pixelHeight
    );
    overlayTexture.anisotropy = state.gl.capabilities.getMaxAnisotropy();
    drawWiperScene(overlayContext, simulation);
    overlayTexture.needsUpdate = true;
  });

  return (
    <>
      <WiperTypographyTeslaModel
        onReady={(scene) => {
          teslaSceneRef.current = scene;
          layoutRef.current = null;
          onSceneReady();
        }}
      />
      <mesh
        data-driver-view-part="windshield-overlay"
        position={DRIVER_WINDSHIELD_OVERLAY_PLACEHOLDER}
        ref={(node) => {
          overlayMeshRef.current = node;
        }}
        renderOrder={2}
        scale={[0.001, 0.001, 1]}
      >
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial
          depthWrite={false}
          map={overlayAssets?.texture ?? undefined}
          polygonOffset
          polygonOffsetFactor={-1}
          polygonOffsetUnits={-1}
          side={DoubleSide}
          toneMapped={false}
          transparent
        />
      </mesh>
    </>
  );
}

function DriverViewFallback({ projectId }: { projectId: string }) {
  return (
    <div
      className={`${styles.wrapper} ${styles.placeholder3D}`}
      data-project-id={projectId}
      role="img"
      aria-label="Tesla driver view wiper typography simulation"
    >
      <div className={styles.placeholderTitle}>3D driver view unavailable</div>
      <div className={styles.placeholderBody}>
        Add the local Tesla export at
        {" "}
        <code>/public/models/tesla_2018_model_3.glb</code>
        {" "}
        to enable this mode.
      </div>
    </div>
  );
}

function DriverViewLoading({
  body,
  projectId,
}: {
  body: string;
  projectId: string;
}) {
  return (
    <div
      className={`${styles.wrapper} ${styles.placeholder3D}`}
      data-project-id={projectId}
      role="img"
      aria-label="Tesla driver view wiper typography simulation"
    >
      <div className={styles.placeholderTitle}>Preparing 3D driver view</div>
      <div className={styles.placeholderBody}>{body}</div>
    </div>
  );
}

function DriverViewLoadingOverlay() {
  return (
    <div className={`${styles.placeholder3D} ${styles.driverViewLoadingOverlay}`}>
      <div className={styles.placeholderTitle}>Preparing 3D driver view</div>
      <div className={styles.placeholderBody}>Loading the Tesla cabin scene.</div>
    </div>
  );
}

function DriverViewScene({
  onSceneReady,
  reducedMotion,
  tuning,
}: {
  onSceneReady: () => void;
  reducedMotion: boolean;
  tuning: TeslaDriverViewTuning;
}) {
  const phaseRef = useRef(0);

  return (
    <>
      <color attach="background" args={[WIPER_DRIVER_VIEW_OUTSIDE_COLOR]} />
      <ambientLight intensity={reducedMotion ? 0.95 : 0.8} />
      <directionalLight castShadow intensity={1.1} position={[4, 6, 5]} />
      <Suspense fallback={null}>
        <DriverViewGlyphField
          onSceneReady={onSceneReady}
          phaseRef={phaseRef}
          reducedMotion={reducedMotion}
          tuning={tuning}
        />
      </Suspense>
    </>
  );
}

export default function WiperTypographyDriverView3D({
  projectId,
}: InteractiveProjectProps) {
  const reducedMotion = useReducedMotion() ?? false;
  const [assetState, setAssetState] = useState<DriverViewAssetState>("checking");
  const [sceneReady, setSceneReady] = useState(false);
  const [tuning, setTuning] = useState<TeslaDriverViewTuning>(() => ({
    ...DEFAULT_TESLA_DRIVER_VIEW_TUNING,
  }));

  const handleSceneReady = useCallback(() => {
    startTransition(() => {
      setSceneReady(true);
    });
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function verifyAsset() {
      if (typeof fetch !== "function") {
        if (!cancelled) {
          setAssetState("missing");
        }
        return;
      }

      try {
        const response = await fetch(TESLA_DRIVER_VIEW_MODEL_PATH, {
          method: "HEAD",
        });

        if (!cancelled) {
          setAssetState(response.ok ? "available" : "missing");
        }
      } catch {
        if (!cancelled) {
          setAssetState("missing");
        }
      }
    }

    void verifyAsset();

    return () => {
      cancelled = true;
    };
  }, []);

  if (assetState === "checking") {
    return (
      <DriverViewLoading
        body="Checking the local Tesla model asset."
        projectId={projectId}
      />
    );
  }

  if (assetState === "missing") {
    return <DriverViewFallback projectId={projectId} />;
  }

  return (
    <div
      className={styles.wrapper}
      data-project-id={projectId}
      role="img"
      aria-label="Tesla driver view wiper typography simulation"
    >
      <DriverViewGuiController setTuning={setTuning} tuning={tuning} />

      {!sceneReady ? <DriverViewLoadingOverlay /> : null}

      <Canvas
        camera={{
          position: DRIVER_VIEW_INITIAL_CAMERA_POSITION,
          fov: clampTeslaDriverViewFov(tuning.fov ?? DRIVER_VIEW_INITIAL_FOV),
          near: 0.01,
          far: 30,
        }}
        dpr={[1, 2]}
        onCreated={({ camera }) => {
          camera.lookAt(...DRIVER_VIEW_INITIAL_LOOK_AT);
        }}
        shadows
        style={{ inset: 0, position: "absolute" }}
      >
        <DriverViewScene
          onSceneReady={handleSceneReady}
          reducedMotion={reducedMotion}
          tuning={tuning}
        />
      </Canvas>
    </div>
  );
}
