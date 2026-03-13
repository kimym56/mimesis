"use client";

import { useReducedMotion } from "framer-motion";
import {
  useEffect,
  useRef,
  type MutableRefObject,
  type PointerEventHandler,
  type RefObject,
} from "react";
import {
  WIPER_AUTOPLAY_SPEED,
  WIPER_POINTER_PHASE_MAX_DELTA,
} from "./wiperConfig";
import {
  WIPER_MARGIN,
  isPointerInsideActiveRange,
  mapPointerDragToPhase,
} from "./wiperMath";
import {
  stepIdlePhase,
  stepInteractivePhase,
  syncAutoplayAngle,
} from "./wiperPhase";

interface WiperSize {
  width: number;
  height: number;
}

interface UseWiperInteractionOptions {
  margin?: number;
  autoplaySpeed?: number;
  maxDelta?: number;
}

export interface WiperInteractionModel {
  containerRef: RefObject<HTMLDivElement | null>;
  dragLayerRef: RefObject<HTMLDivElement | null>;
  phaseRef: MutableRefObject<number>;
  sizeRef: MutableRefObject<WiperSize>;
  reducedMotion: boolean;
  tick: () => number;
  dragLayerProps: {
    onPointerEnter: PointerEventHandler<HTMLDivElement>;
    onPointerMove: PointerEventHandler<HTMLDivElement>;
    onPointerLeave: PointerEventHandler<HTMLDivElement>;
    onPointerCancel: PointerEventHandler<HTMLDivElement>;
  };
}

export function useWiperInteraction(
  options: UseWiperInteractionOptions = {}
): WiperInteractionModel {
  const {
    margin = WIPER_MARGIN,
    autoplaySpeed = WIPER_AUTOPLAY_SPEED,
    maxDelta = WIPER_POINTER_PHASE_MAX_DELTA,
  } = options;

  const prefersReducedMotion = useReducedMotion() ?? false;

  const containerRef = useRef<HTMLDivElement>(null);
  const dragLayerRef = useRef<HTMLDivElement>(null);
  const phaseRef = useRef(0);
  const sizeRef = useRef<WiperSize>({ width: 1, height: 1 });
  const autoPhaseAngleRef = useRef(0);
  const pointerOnStageRef = useRef(false);
  const pointerTargetPhaseRef = useRef(0);
  const pointerDragStartXRef = useRef(0);
  const pointerDragStartPhaseRef = useRef(0);
  const pointerDragPrimedRef = useRef(false);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) {
      return;
    }

    const updateSize = () => {
      const rect = element.getBoundingClientRect();
      sizeRef.current = {
        width: Math.max(1, rect.width),
        height: Math.max(1, rect.height),
      };
    };

    updateSize();

    const observer = new ResizeObserver(updateSize);
    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, []);

  const getPointerX = (clientX: number): number => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) {
      return 0;
    }

    return clientX - rect.left;
  };

  const leavePointerMode = () => {
    pointerOnStageRef.current = false;
    pointerDragPrimedRef.current = false;
    autoPhaseAngleRef.current = syncAutoplayAngle(phaseRef.current);
  };

  const onPointerEnter: PointerEventHandler<HTMLDivElement> = () => {
    pointerOnStageRef.current = true;
    pointerTargetPhaseRef.current = phaseRef.current;
    pointerDragPrimedRef.current = false;
  };

  const onPointerMove: PointerEventHandler<HTMLDivElement> = (event) => {
    const pointerX = getPointerX(event.clientX);
    const width = sizeRef.current.width;

    if (!isPointerInsideActiveRange(pointerX, width, margin)) {
      if (pointerOnStageRef.current) {
        leavePointerMode();
      }
      return;
    }

    if (!pointerOnStageRef.current) {
      pointerOnStageRef.current = true;
      pointerTargetPhaseRef.current = phaseRef.current;
      pointerDragPrimedRef.current = false;
      return;
    }

    if (!pointerDragPrimedRef.current) {
      pointerDragStartXRef.current = pointerX;
      pointerDragStartPhaseRef.current = phaseRef.current;
      pointerTargetPhaseRef.current = phaseRef.current;
      pointerDragPrimedRef.current = true;
      return;
    }

    pointerTargetPhaseRef.current = mapPointerDragToPhase(
      pointerX,
      pointerDragStartXRef.current,
      pointerDragStartPhaseRef.current,
      width,
      margin
    );
  };

  const onPointerLeave: PointerEventHandler<HTMLDivElement> = () => {
    leavePointerMode();
  };

  const onPointerCancel: PointerEventHandler<HTMLDivElement> = () => {
    leavePointerMode();
  };

  const tick = (): number => {
    if (pointerOnStageRef.current) {
      phaseRef.current = stepInteractivePhase(
        phaseRef.current,
        pointerTargetPhaseRef.current,
        maxDelta
      );
      return phaseRef.current;
    }

    const next = stepIdlePhase(autoPhaseAngleRef.current, autoplaySpeed);
    autoPhaseAngleRef.current = next.autoPhaseAngle;
    phaseRef.current = next.phase;

    return phaseRef.current;
  };

  return {
    containerRef,
    dragLayerRef,
    phaseRef,
    sizeRef,
    reducedMotion: prefersReducedMotion,
    tick,
    dragLayerProps: {
      onPointerEnter,
      onPointerMove,
      onPointerLeave,
      onPointerCancel,
    },
  };
}
