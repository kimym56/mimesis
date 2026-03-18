"use client";

import { Html } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useReducedMotion } from "framer-motion";
import {
  type Dispatch,
  type SetStateAction,
  Suspense,
  startTransition,
  useCallback,
  useEffect,
  useRef,
  useState,
  type MutableRefObject,
} from "react";
import {
  Box3,
  type BufferGeometry,
  type Object3D,
  type PerspectiveCamera,
  Vector3,
} from "three";
import type { InteractiveProjectProps } from "../types";
import WiperTypographyExtrudedGlyph3D from "./WiperTypographyExtrudedGlyph3D";
import WiperTypographyTeslaModel, {
  TESLA_DRIVER_VIEW_MODEL_PATH,
} from "./WiperTypographyTeslaModel";
import { WIPER_BACKGROUND_COLOR } from "./wiperConfig";
import styles from "./WiperTypographyProject.module.css";
import { useWiperSceneSimulation3D } from "./useWiperSceneSimulation3D";
import {
  computeDriverViewPhase,
  getDriverViewCycleDuration,
} from "./wiperDriverView";
import {
  stepWiperSimulationState,
  type WiperGlyphState,
} from "./wiperSimulation";
import {
  createTeslaDriverGlyphProjectionInsets,
  createTeslaDriverGlyphQuaternion,
  createTeslaDriverViewLayout,
  createTeslaDriverViewPlaneFromPoints,
  getTeslaDriverWiperRotation,
  projectTeslaDriverGlyphPosition,
  type TeslaDriverViewLayout,
} from "./wiperTeslaDriverLayout";
import {
  clampTeslaDriverViewFov,
  DEFAULT_TESLA_DRIVER_VIEW_TUNING,
  type TeslaDriverViewTuning,
} from "./wiperTeslaDriverTuning";
import { useTeslaDriverViewGui } from "./useTeslaDriverViewGui";

type GlyphMesh = Object3D;
type DriverViewAssetState = "checking" | "available" | "missing";
const DRIVER_GLYPH_PLACEHOLDER: [number, number, number] = [0, -10, 0];
const DRIVER_VIEW_INITIAL_CAMERA_POSITION: [number, number, number] = [
  -0.41,
  0.47,
  -0.43,
];
const DRIVER_VIEW_INITIAL_LOOK_AT: [number, number, number] = [-0.23, 0.56, -0.82];
const DRIVER_VIEW_INITIAL_FOV = clampTeslaDriverViewFov(
  DEFAULT_TESLA_DRIVER_VIEW_TUNING.fov
);

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
  const glyphRefs = useRef<Array<GlyphMesh | null>>([]);
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

  useEffect(() => {
    layoutRef.current = null;
  }, [tuning]);

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

    const glyphScale =
      Math.min(
        layout.windscreenWidth / Math.max(pixelWidth, 1),
        layout.windscreenHeight / Math.max(pixelHeight, 1)
      ) * 0.92;

    for (const glyph of simulation.glyphs) {
      const mesh = glyphRefs.current[glyph.index];
      if (!mesh) {
        continue;
      }

      const position = projectTeslaDriverGlyphPosition(
        layout,
        glyph.x / Math.max(pixelWidth, 1),
        glyph.y / Math.max(pixelHeight, 1),
        createTeslaDriverGlyphProjectionInsets({
          glyphRadius: glyph.radius,
          pixelHeight,
          pixelWidth,
        })
      );

      mesh.position.set(...position);
      mesh.quaternion.copy(
        createTeslaDriverGlyphQuaternion(layout, -glyph.rotation * Math.PI)
      );
      mesh.scale.set(glyphScale, glyphScale, glyphScale);
    }
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

      {simulation.glyphs.map((glyph: WiperGlyphState) => (
        <WiperTypographyExtrudedGlyph3D
          glyph={glyph.text}
          key={glyph.index}
          position={DRIVER_GLYPH_PLACEHOLDER}
          ref={(node) => {
            glyphRefs.current[glyph.index] = node;
          }}
          rotationZ={-glyph.rotation * Math.PI}
          scale={0.001}
        />
      ))}
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
  showLabel,
  tuning,
}: {
  onSceneReady: () => void;
  reducedMotion: boolean;
  showLabel: boolean;
  tuning: TeslaDriverViewTuning;
}) {
  const phaseRef = useRef(0);

  return (
    <>
      <color attach="background" args={[WIPER_BACKGROUND_COLOR]} />
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
      {showLabel ? (
        <Html center>
          <div className={styles.driverViewLabel}>Autoplay driver view</div>
        </Html>
      ) : null}
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
          showLabel={sceneReady}
          tuning={tuning}
        />
      </Canvas>
    </div>
  );
}
