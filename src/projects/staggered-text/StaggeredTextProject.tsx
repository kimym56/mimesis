"use client";

import { useReducedMotion } from "framer-motion";
import { useRef, useState, type CSSProperties } from "react";
import type { InteractiveProjectProps } from "../types";
import styles from "./StaggeredTextProject.module.css";

const DISPLAY_TEXT = "Get started";

function createCharacterSlots(text: string) {
  let staggerIndex = 0;

  return Array.from(text).map((char, index) => {
    const isSpace = char === " ";
    const slot = {
      char,
      id: `${char}-${index}`,
      isSpace,
      staggerIndex,
    };

    if (!isSpace) {
      staggerIndex += 1;
    }

    return slot;
  });
}

const CHARACTER_SLOTS = createCharacterSlots(DISPLAY_TEXT);

export default function StaggeredTextProject({
  projectId,
}: InteractiveProjectProps) {
  const shouldReduceMotion = useReducedMotion();
  const suppressNextFocusRef = useRef(false);
  const [isPressed, setIsPressed] = useState(false);
  const [isKeyboardFocusVisible, setIsKeyboardFocusVisible] = useState(false);

  const prefersReducedMotion = shouldReduceMotion ?? false;
  const isActive = isPressed || isKeyboardFocusVisible;

  return (
    <div className={styles.interactivePane} data-project-id={projectId}>
      <button
        type="button"
        className={styles.trigger}
        aria-label="Preview the staggered text hover motion"
        data-active={isActive}
        data-reduced-motion={prefersReducedMotion}
        onPointerDown={() => {
          suppressNextFocusRef.current = true;
          setIsPressed(true);
        }}
        onPointerUp={() => {
          suppressNextFocusRef.current = false;
          setIsPressed(false);
        }}
        onPointerLeave={() => {
          suppressNextFocusRef.current = false;
          setIsPressed(false);
        }}
        onPointerCancel={() => {
          suppressNextFocusRef.current = false;
          setIsPressed(false);
        }}
        onFocus={() => {
          if (suppressNextFocusRef.current) {
            suppressNextFocusRef.current = false;
            return;
          }

          setIsKeyboardFocusVisible(true);
        }}
        onBlur={() => {
          suppressNextFocusRef.current = false;
          setIsPressed(false);
          setIsKeyboardFocusVisible(false);
        }}
      >
        <span className={styles.wordmark}>
          {CHARACTER_SLOTS.map((slot) => {
            if (slot.isSpace) {
              return (
                <span key={slot.id} className={styles.space} aria-hidden="true">
                  {" "}
                </span>
              );
            }

            return (
              <span
                key={slot.id}
                className={styles.character}
                data-char={slot.char}
                data-slot="character"
                style={{ "--char-index": slot.staggerIndex } as CSSProperties}
              >
                {slot.char}
              </span>
            );
          })}
        </span>
      </button>
    </div>
  );
}
