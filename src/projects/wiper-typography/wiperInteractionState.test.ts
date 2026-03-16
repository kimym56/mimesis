import { describe, expect, it } from "vitest";
import {
  beginDesktopViewDrag,
  createWiperInteractionState,
  endDesktopViewDrag,
  handleDesktopHoverMove,
  primeTouchPhaseDrag,
  updateDesktopViewDrag,
  updateTouchPhaseDrag,
} from "./wiperInteractionState";

describe("wiperInteractionState", () => {
  it("updates phase on desktop hover without changing view", () => {
    const state = createWiperInteractionState();
    const next = handleDesktopHoverMove(state, {
      pointerX: 700,
      width: 1000,
      margin: 0,
    });

    expect(next.pointerTargetPhase).toBeCloseTo(0.7);
    expect(next.view.yaw).toBe(0);
  });

  it("freezes phase and updates view during desktop drag", () => {
    const pressed = beginDesktopViewDrag(createWiperInteractionState(), {
      pointerX: 300,
      pointerY: 200,
      phase: 0.45,
    });
    const dragged = updateDesktopViewDrag(pressed, {
      pointerX: 650,
      pointerY: 120,
      width: 1000,
      height: 600,
    });

    expect(dragged.frozenPhase).toBeCloseTo(0.45);
    expect(dragged.pointerTargetPhase).toBeCloseTo(0.45);
    expect(dragged.view.yaw).not.toBe(0);
  });

  it("keeps the view angle after desktop drag release", () => {
    const released = endDesktopViewDrag({
      ...createWiperInteractionState(),
      isDraggingView: true,
      view: { yaw: 0.2, pitch: -0.1 },
    });

    expect(released.isDraggingView).toBe(false);
    expect(released.view).toEqual({ yaw: 0.2, pitch: -0.1 });
  });

  it("keeps touch pointer moves on the legacy drag-to-phase path", () => {
    const primed = primeTouchPhaseDrag(createWiperInteractionState(), {
      pointerX: 200,
      phase: 0.25,
    });
    const next = updateTouchPhaseDrag(primed, {
      pointerX: 500,
      width: 1000,
      margin: 0,
    });

    expect(next.pointerTargetPhase).toBeGreaterThan(0.25);
    expect(next.view).toEqual({ yaw: 0, pitch: 0 });
  });
});
