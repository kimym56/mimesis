(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/Development/Portfolio/mimesis/src/projects/staggered-text/StaggeredTextProject.module.css [app-client] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "buttonModePane": "StaggeredTextProject-module__t0AzOq__buttonModePane",
  "buttonStage": "StaggeredTextProject-module__t0AzOq__buttonStage",
  "controls": "StaggeredTextProject-module__t0AzOq__controls",
  "hoverStage": "StaggeredTextProject-module__t0AzOq__hoverStage",
  "incomingGlyph": "StaggeredTextProject-module__t0AzOq__incomingGlyph",
  "interactivePane": "StaggeredTextProject-module__t0AzOq__interactivePane",
  "modeButton": "StaggeredTextProject-module__t0AzOq__modeButton",
  "modeButtonActive": "StaggeredTextProject-module__t0AzOq__modeButtonActive",
  "modeToggle": "StaggeredTextProject-module__t0AzOq__modeToggle",
  "outgoingArm": "StaggeredTextProject-module__t0AzOq__outgoingArm",
  "outgoingGlyph": "StaggeredTextProject-module__t0AzOq__outgoingGlyph",
  "previewFrame": "StaggeredTextProject-module__t0AzOq__previewFrame",
  "projectShell": "StaggeredTextProject-module__t0AzOq__projectShell",
  "shadow": "StaggeredTextProject-module__t0AzOq__shadow",
  "slot": "StaggeredTextProject-module__t0AzOq__slot",
  "slotSizer": "StaggeredTextProject-module__t0AzOq__slotSizer",
  "space": "StaggeredTextProject-module__t0AzOq__space",
  "textInput": "StaggeredTextProject-module__t0AzOq__textInput",
  "textInputOverlay": "StaggeredTextProject-module__t0AzOq__textInputOverlay",
  "textInputRow": "StaggeredTextProject-module__t0AzOq__textInputRow",
  "trigger": "StaggeredTextProject-module__t0AzOq__trigger",
  "wordmark": "StaggeredTextProject-module__t0AzOq__wordmark",
});
}),
"[project]/Development/Portfolio/mimesis/src/projects/staggered-text/StaggeredTextButtonPreview.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "StaggeredTextButtonPreview",
    ()=>StaggeredTextButtonPreview
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Development/Portfolio/mimesis/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$reduced$2d$motion$2f$use$2d$reduced$2d$motion$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Development/Portfolio/mimesis/node_modules/framer-motion/dist/es/utils/reduced-motion/use-reduced-motion.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Development/Portfolio/mimesis/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$staggered$2d$text$2f$StaggeredTextProject$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/Development/Portfolio/mimesis/src/projects/staggered-text/StaggeredTextProject.module.css [app-client] (css module)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
const DEFAULT_BUTTON_TEXT = "Type Anything";
const EASE_CUSTOM = "cubic-bezier(0.16, 1, 0.3, 1)";
function createCharacterSlots(text) {
    const characterCount = Array.from(text).filter((char)=>char !== " ").length;
    let staggerIndex = 0;
    return Array.from(text).map((char, index)=>{
        const isSpace = char === " ";
        const slot = {
            char,
            id: `${char}-${index}`,
            isSpace,
            staggerIndex,
            reverseStaggerIndex: characterCount - staggerIndex - 1
        };
        if (!isSpace) {
            staggerIndex += 1;
        }
        return slot;
    });
}
function createPausedAnimation(element, keyframes, options) {
    if (!element || typeof element.animate !== "function") {
        return undefined;
    }
    const animation = element.animate(keyframes, {
        ...options,
        fill: "both"
    });
    animation.pause();
    animation.currentTime = 0;
    return animation;
}
function subscribeToHydration() {
    return ()=>{};
}
function StaggeredTextButtonPreview({ onTextChange, text, tuning }) {
    _s();
    const shouldReduceMotion = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$reduced$2d$motion$2f$use$2d$reduced$2d$motion$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReducedMotion"])();
    const suppressNextFocusRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    const [isPressed, setIsPressed] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isKeyboardFocusVisible, setIsKeyboardFocusVisible] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const outgoingArmRefs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])([]);
    const outgoingGlyphRefs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])([]);
    const incomingGlyphRefs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])([]);
    const shadowRefs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])([]);
    const animationSetsRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])([]);
    const displayText = text.trim() || DEFAULT_BUTTON_TEXT;
    const characterSlots = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "StaggeredTextButtonPreview.useMemo[characterSlots]": ()=>createCharacterSlots(displayText)
    }["StaggeredTextButtonPreview.useMemo[characterSlots]"], [
        displayText
    ]);
    const prefersReducedMotion = shouldReduceMotion ?? false;
    const isActive = isPressed || isKeyboardFocusVisible;
    const isHydrated = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSyncExternalStore"])(subscribeToHydration, {
        "StaggeredTextButtonPreview.useSyncExternalStore[isHydrated]": ()=>true
    }["StaggeredTextButtonPreview.useSyncExternalStore[isHydrated]"], {
        "StaggeredTextButtonPreview.useSyncExternalStore[isHydrated]": ()=>false
    }["StaggeredTextButtonPreview.useSyncExternalStore[isHydrated]"]);
    const motionDriver = !isHydrated || prefersReducedMotion || typeof Element === "undefined" || typeof Element.prototype.animate !== "function" ? "css" : "waapi";
    const { fontWeight, handoffDelayMs, incomingDurationMs, incomingStaggerStepMs, letterSpacingEm, outgoingDurationMs, outgoingStaggerStepMs } = tuning;
    const timingStyle = {
        "--handoff-delay": `${handoffDelayMs}ms`,
        "--incoming-duration": `${incomingDurationMs}ms`,
        "--incoming-stagger-step": `${incomingStaggerStepMs}ms`,
        "--outgoing-duration": `${outgoingDurationMs}ms`,
        "--outgoing-stagger-step": `${outgoingStaggerStepMs}ms`
    };
    const wordmarkStyle = {
        "--wordmark-font-weight": `${fontWeight}`,
        "--wordmark-letter-spacing": `${letterSpacingEm}em`
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "StaggeredTextButtonPreview.useEffect": ()=>{
            if (motionDriver !== "waapi") {
                animationSetsRef.current.forEach({
                    "StaggeredTextButtonPreview.useEffect": (animations)=>{
                        Object.values(animations).forEach({
                            "StaggeredTextButtonPreview.useEffect": (animation)=>animation?.cancel()
                        }["StaggeredTextButtonPreview.useEffect"]);
                    }
                }["StaggeredTextButtonPreview.useEffect"]);
                animationSetsRef.current = [];
                return;
            }
            const animations = characterSlots.filter({
                "StaggeredTextButtonPreview.useEffect.animations": (slot)=>!slot.isSpace
            }["StaggeredTextButtonPreview.useEffect.animations"]).map({
                "StaggeredTextButtonPreview.useEffect.animations": (slot)=>{
                    const index = slot.staggerIndex;
                    const reverseDelay = slot.reverseStaggerIndex * outgoingStaggerStepMs;
                    return {
                        outgoingArm: createPausedAnimation(outgoingArmRefs.current[index], [
                            {
                                opacity: 1,
                                transform: "none"
                            },
                            {
                                opacity: 0.92,
                                transform: "translateY(-0.12em) rotateX(82deg)"
                            }
                        ], {
                            delay: index * outgoingStaggerStepMs,
                            duration: outgoingDurationMs,
                            easing: EASE_CUSTOM,
                            endDelay: reverseDelay
                        }),
                        outgoingGlyph: createPausedAnimation(outgoingGlyphRefs.current[index], [
                            {
                                filter: "blur(0)",
                                opacity: 1,
                                transform: "translateZ(0.02em)"
                            },
                            {
                                filter: "blur(8px)",
                                opacity: 0,
                                transform: "translateY(-0.1em) translateZ(0.14em) rotateX(-18deg)"
                            }
                        ], {
                            delay: index * outgoingStaggerStepMs,
                            duration: outgoingDurationMs,
                            easing: EASE_CUSTOM,
                            endDelay: reverseDelay
                        }),
                        incomingGlyph: createPausedAnimation(incomingGlyphRefs.current[index], [
                            {
                                filter: "blur(8px)",
                                opacity: 0,
                                transform: "translateY(-0.02em) rotateX(-88deg) translateZ(0)"
                            },
                            {
                                filter: "blur(0)",
                                opacity: 1,
                                transform: "translateY(-0.02em) rotateX(0deg) translateZ(0)"
                            }
                        ], {
                            delay: index * incomingStaggerStepMs + handoffDelayMs,
                            duration: incomingDurationMs,
                            easing: EASE_CUSTOM,
                            endDelay: slot.reverseStaggerIndex * incomingStaggerStepMs
                        }),
                        shadow: createPausedAnimation(shadowRefs.current[index], [
                            {
                                filter: "blur(12px)",
                                opacity: 0,
                                transform: "translateY(0.28em) scale(1.03)"
                            },
                            {
                                filter: "blur(8px)",
                                opacity: 0.36,
                                transform: "translateY(-0.04em) scale(1.04)"
                            }
                        ], {
                            delay: index * outgoingStaggerStepMs,
                            duration: outgoingDurationMs,
                            easing: EASE_CUSTOM,
                            endDelay: reverseDelay
                        })
                    };
                }
            }["StaggeredTextButtonPreview.useEffect.animations"]);
            animationSetsRef.current = animations;
            return ({
                "StaggeredTextButtonPreview.useEffect": ()=>{
                    animations.forEach({
                        "StaggeredTextButtonPreview.useEffect": (animationSet)=>{
                            Object.values(animationSet).forEach({
                                "StaggeredTextButtonPreview.useEffect": (animation)=>animation?.cancel()
                            }["StaggeredTextButtonPreview.useEffect"]);
                        }
                    }["StaggeredTextButtonPreview.useEffect"]);
                    animationSetsRef.current = [];
                }
            })["StaggeredTextButtonPreview.useEffect"];
        }
    }["StaggeredTextButtonPreview.useEffect"], [
        characterSlots,
        handoffDelayMs,
        incomingDurationMs,
        incomingStaggerStepMs,
        motionDriver,
        outgoingDurationMs,
        outgoingStaggerStepMs
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "StaggeredTextButtonPreview.useEffect": ()=>{
            if (motionDriver !== "waapi") {
                return;
            }
            animationSetsRef.current.forEach({
                "StaggeredTextButtonPreview.useEffect": (animationSet)=>{
                    Object.values(animationSet).forEach({
                        "StaggeredTextButtonPreview.useEffect": (animation)=>{
                            if (!animation) {
                                return;
                            }
                            if (isActive) {
                                animation.playbackRate = 1;
                                animation.play();
                                return;
                            }
                            const currentTime = typeof animation.currentTime === "number" ? animation.currentTime : 0;
                            if (currentTime <= 0) {
                                animation.pause();
                                animation.currentTime = 0;
                                return;
                            }
                            animation.playbackRate = -1;
                            animation.play();
                        }
                    }["StaggeredTextButtonPreview.useEffect"]);
                }
            }["StaggeredTextButtonPreview.useEffect"]);
        }
    }["StaggeredTextButtonPreview.useEffect"], [
        handoffDelayMs,
        incomingDurationMs,
        incomingStaggerStepMs,
        isActive,
        motionDriver,
        outgoingDurationMs,
        outgoingStaggerStepMs
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `${__TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$staggered$2d$text$2f$StaggeredTextProject$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].interactivePane} ${__TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$staggered$2d$text$2f$StaggeredTextProject$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].buttonModePane}`,
        "data-implementation": "button",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                className: `${__TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$staggered$2d$text$2f$StaggeredTextProject$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].textInputRow} ${__TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$staggered$2d$text$2f$StaggeredTextProject$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].textInputOverlay}`,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                    type: "text",
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$staggered$2d$text$2f$StaggeredTextProject$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].textInput,
                    "aria-label": "Edit staggered text",
                    placeholder: DEFAULT_BUTTON_TEXT,
                    value: text,
                    onInput: (event)=>{
                        onTextChange(event.currentTarget.value);
                    }
                }, void 0, false, {
                    fileName: "[project]/Development/Portfolio/mimesis/src/projects/staggered-text/StaggeredTextButtonPreview.tsx",
                    lineNumber: 285,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/Development/Portfolio/mimesis/src/projects/staggered-text/StaggeredTextButtonPreview.tsx",
                lineNumber: 284,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                className: `${__TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$staggered$2d$text$2f$StaggeredTextProject$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].trigger} ${__TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$staggered$2d$text$2f$StaggeredTextProject$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].buttonStage}`,
                "aria-label": "Preview the staggered text click motion",
                "data-active": isActive,
                "data-motion-driver": motionDriver,
                "data-reduced-motion": prefersReducedMotion,
                style: timingStyle,
                onPointerDown: ()=>{
                    suppressNextFocusRef.current = true;
                    setIsPressed(true);
                },
                onPointerUp: ()=>{
                    suppressNextFocusRef.current = false;
                    setIsPressed(false);
                },
                onPointerLeave: ()=>{
                    suppressNextFocusRef.current = false;
                    setIsPressed(false);
                },
                onPointerCancel: ()=>{
                    suppressNextFocusRef.current = false;
                    setIsPressed(false);
                },
                onFocus: ()=>{
                    if (suppressNextFocusRef.current) {
                        suppressNextFocusRef.current = false;
                        return;
                    }
                    setIsKeyboardFocusVisible(true);
                },
                onBlur: ()=>{
                    suppressNextFocusRef.current = false;
                    setIsPressed(false);
                    setIsKeyboardFocusVisible(false);
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$staggered$2d$text$2f$StaggeredTextProject$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].wordmark,
                    style: wordmarkStyle,
                    children: characterSlots.map((slot)=>{
                        if (slot.isSpace) {
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$staggered$2d$text$2f$StaggeredTextProject$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].space,
                                "aria-hidden": "true",
                                children: " "
                            }, slot.id, false, {
                                fileName: "[project]/Development/Portfolio/mimesis/src/projects/staggered-text/StaggeredTextButtonPreview.tsx",
                                lineNumber: 338,
                                columnNumber: 17
                            }, this);
                        }
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$staggered$2d$text$2f$StaggeredTextProject$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].slot,
                            "data-slot": "character",
                            style: {
                                "--char-index": slot.staggerIndex,
                                "--char-reverse-index": slot.reverseStaggerIndex
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$staggered$2d$text$2f$StaggeredTextProject$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].slotSizer,
                                    "data-part": "slot-sizer",
                                    "aria-hidden": "true",
                                    children: slot.char
                                }, void 0, false, {
                                    fileName: "[project]/Development/Portfolio/mimesis/src/projects/staggered-text/StaggeredTextButtonPreview.tsx",
                                    lineNumber: 356,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$staggered$2d$text$2f$StaggeredTextProject$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].outgoingArm,
                                    "data-part": "outgoing-arm",
                                    ref: (node)=>{
                                        outgoingArmRefs.current[slot.staggerIndex] = node;
                                    },
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$staggered$2d$text$2f$StaggeredTextProject$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].outgoingGlyph,
                                        "data-part": "outgoing-glyph",
                                        ref: (node)=>{
                                            outgoingGlyphRefs.current[slot.staggerIndex] = node;
                                        },
                                        children: slot.char
                                    }, void 0, false, {
                                        fileName: "[project]/Development/Portfolio/mimesis/src/projects/staggered-text/StaggeredTextButtonPreview.tsx",
                                        lineNumber: 366,
                                        columnNumber: 19
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/Development/Portfolio/mimesis/src/projects/staggered-text/StaggeredTextButtonPreview.tsx",
                                    lineNumber: 359,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$staggered$2d$text$2f$StaggeredTextProject$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].incomingGlyph,
                                    "data-part": "incoming-glyph",
                                    ref: (node)=>{
                                        incomingGlyphRefs.current[slot.staggerIndex] = node;
                                    },
                                    children: slot.char
                                }, void 0, false, {
                                    fileName: "[project]/Development/Portfolio/mimesis/src/projects/staggered-text/StaggeredTextButtonPreview.tsx",
                                    lineNumber: 376,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$staggered$2d$text$2f$StaggeredTextProject$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].shadow,
                                    "aria-hidden": "true",
                                    ref: (node)=>{
                                        shadowRefs.current[slot.staggerIndex] = node;
                                    },
                                    children: slot.char
                                }, void 0, false, {
                                    fileName: "[project]/Development/Portfolio/mimesis/src/projects/staggered-text/StaggeredTextButtonPreview.tsx",
                                    lineNumber: 385,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, slot.id, true, {
                            fileName: "[project]/Development/Portfolio/mimesis/src/projects/staggered-text/StaggeredTextButtonPreview.tsx",
                            lineNumber: 345,
                            columnNumber: 15
                        }, this);
                    })
                }, void 0, false, {
                    fileName: "[project]/Development/Portfolio/mimesis/src/projects/staggered-text/StaggeredTextButtonPreview.tsx",
                    lineNumber: 334,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/Development/Portfolio/mimesis/src/projects/staggered-text/StaggeredTextButtonPreview.tsx",
                lineNumber: 296,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Development/Portfolio/mimesis/src/projects/staggered-text/StaggeredTextButtonPreview.tsx",
        lineNumber: 283,
        columnNumber: 5
    }, this);
}
_s(StaggeredTextButtonPreview, "yFZGEWujvB6yNbiibl/623nKK0k=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$reduced$2d$motion$2f$use$2d$reduced$2d$motion$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReducedMotion"],
        __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSyncExternalStore"]
    ];
});
_c = StaggeredTextButtonPreview;
var _c;
__turbopack_context__.k.register(_c, "StaggeredTextButtonPreview");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Development/Portfolio/mimesis/src/projects/staggered-text/StaggeredTextHoverPreview.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "StaggeredTextHoverPreview",
    ()=>StaggeredTextHoverPreview
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Development/Portfolio/mimesis/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$reduced$2d$motion$2f$use$2d$reduced$2d$motion$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Development/Portfolio/mimesis/node_modules/framer-motion/dist/es/utils/reduced-motion/use-reduced-motion.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Development/Portfolio/mimesis/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$staggered$2d$text$2f$StaggeredTextProject$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/Development/Portfolio/mimesis/src/projects/staggered-text/StaggeredTextProject.module.css [app-client] (css module)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
const DISPLAY_TEXT = "Start Deploying";
const EASE_CUSTOM = "cubic-bezier(0.16, 1, 0.3, 1)";
function createCharacterSlots(text) {
    const characterCount = Array.from(text).filter((char)=>char !== " ").length;
    let staggerIndex = 0;
    return Array.from(text).map((char, index)=>{
        const isSpace = char === " ";
        const slot = {
            char,
            id: `${char}-${index}`,
            isSpace,
            staggerIndex,
            reverseStaggerIndex: characterCount - staggerIndex - 1
        };
        if (!isSpace) {
            staggerIndex += 1;
        }
        return slot;
    });
}
const CHARACTER_SLOTS = createCharacterSlots(DISPLAY_TEXT);
_c = CHARACTER_SLOTS;
function createPausedAnimation(element, keyframes, options) {
    if (!element || typeof element.animate !== "function") {
        return undefined;
    }
    const animation = element.animate(keyframes, {
        ...options,
        fill: "both"
    });
    animation.pause();
    animation.currentTime = 0;
    return animation;
}
function subscribeToHydration() {
    return ()=>{};
}
function StaggeredTextHoverPreview({ tuning }) {
    _s();
    const shouldReduceMotion = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$reduced$2d$motion$2f$use$2d$reduced$2d$motion$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReducedMotion"])();
    const [isHovered, setIsHovered] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const outgoingArmRefs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])([]);
    const outgoingGlyphRefs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])([]);
    const incomingGlyphRefs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])([]);
    const shadowRefs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])([]);
    const animationSetsRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])([]);
    const prefersReducedMotion = shouldReduceMotion ?? false;
    const isHydrated = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSyncExternalStore"])(subscribeToHydration, {
        "StaggeredTextHoverPreview.useSyncExternalStore[isHydrated]": ()=>true
    }["StaggeredTextHoverPreview.useSyncExternalStore[isHydrated]"], {
        "StaggeredTextHoverPreview.useSyncExternalStore[isHydrated]": ()=>false
    }["StaggeredTextHoverPreview.useSyncExternalStore[isHydrated]"]);
    const motionDriver = !isHydrated || prefersReducedMotion || typeof Element === "undefined" || typeof Element.prototype.animate !== "function" ? "css" : "waapi";
    const { fontWeight, handoffDelayMs, incomingDurationMs, incomingStaggerStepMs, letterSpacingEm, outgoingDurationMs, outgoingStaggerStepMs } = tuning;
    const timingStyle = {
        "--handoff-delay": `${handoffDelayMs}ms`,
        "--incoming-duration": `${incomingDurationMs}ms`,
        "--incoming-stagger-step": `${incomingStaggerStepMs}ms`,
        "--outgoing-duration": `${outgoingDurationMs}ms`,
        "--outgoing-stagger-step": `${outgoingStaggerStepMs}ms`
    };
    const wordmarkStyle = {
        "--wordmark-font-weight": `${fontWeight}`,
        "--wordmark-letter-spacing": `${letterSpacingEm}em`
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "StaggeredTextHoverPreview.useEffect": ()=>{
            if (motionDriver !== "waapi") {
                animationSetsRef.current.forEach({
                    "StaggeredTextHoverPreview.useEffect": (animations)=>{
                        Object.values(animations).forEach({
                            "StaggeredTextHoverPreview.useEffect": (animation)=>animation?.cancel()
                        }["StaggeredTextHoverPreview.useEffect"]);
                    }
                }["StaggeredTextHoverPreview.useEffect"]);
                animationSetsRef.current = [];
                return;
            }
            const animations = CHARACTER_SLOTS.filter({
                "StaggeredTextHoverPreview.useEffect.animations": (slot)=>!slot.isSpace
            }["StaggeredTextHoverPreview.useEffect.animations"]).map({
                "StaggeredTextHoverPreview.useEffect.animations": (slot)=>{
                    const index = slot.staggerIndex;
                    const reverseDelay = slot.reverseStaggerIndex * outgoingStaggerStepMs;
                    return {
                        outgoingArm: createPausedAnimation(outgoingArmRefs.current[index], [
                            {
                                opacity: 1,
                                transform: "none"
                            },
                            {
                                opacity: 0.92,
                                transform: "translateY(-0.12em) rotateX(82deg)"
                            }
                        ], {
                            delay: index * outgoingStaggerStepMs,
                            duration: outgoingDurationMs,
                            easing: EASE_CUSTOM,
                            endDelay: reverseDelay
                        }),
                        outgoingGlyph: createPausedAnimation(outgoingGlyphRefs.current[index], [
                            {
                                filter: "blur(0)",
                                opacity: 1,
                                transform: "translateZ(0.02em)"
                            },
                            {
                                filter: "blur(8px)",
                                opacity: 0,
                                transform: "translateY(-0.1em) translateZ(0.14em) rotateX(-18deg)"
                            }
                        ], {
                            delay: index * outgoingStaggerStepMs,
                            duration: outgoingDurationMs,
                            easing: EASE_CUSTOM,
                            endDelay: reverseDelay
                        }),
                        incomingGlyph: createPausedAnimation(incomingGlyphRefs.current[index], [
                            {
                                filter: "blur(8px)",
                                opacity: 0,
                                transform: "translateY(-0.02em) rotateX(-88deg) translateZ(0)"
                            },
                            {
                                filter: "blur(0)",
                                opacity: 1,
                                transform: "translateY(-0.02em) rotateX(0deg) translateZ(0)"
                            }
                        ], {
                            delay: index * incomingStaggerStepMs + handoffDelayMs,
                            duration: incomingDurationMs,
                            easing: EASE_CUSTOM,
                            endDelay: slot.reverseStaggerIndex * incomingStaggerStepMs
                        }),
                        shadow: createPausedAnimation(shadowRefs.current[index], [
                            {
                                filter: "blur(12px)",
                                opacity: 0,
                                transform: "translateY(0.28em) scale(1.03)"
                            },
                            {
                                filter: "blur(8px)",
                                opacity: 0.36,
                                transform: "translateY(-0.04em) scale(1.04)"
                            }
                        ], {
                            delay: index * outgoingStaggerStepMs,
                            duration: outgoingDurationMs,
                            easing: EASE_CUSTOM,
                            endDelay: reverseDelay
                        })
                    };
                }
            }["StaggeredTextHoverPreview.useEffect.animations"]);
            animationSetsRef.current = animations;
            return ({
                "StaggeredTextHoverPreview.useEffect": ()=>{
                    animations.forEach({
                        "StaggeredTextHoverPreview.useEffect": (animationSet)=>{
                            Object.values(animationSet).forEach({
                                "StaggeredTextHoverPreview.useEffect": (animation)=>animation?.cancel()
                            }["StaggeredTextHoverPreview.useEffect"]);
                        }
                    }["StaggeredTextHoverPreview.useEffect"]);
                    animationSetsRef.current = [];
                }
            })["StaggeredTextHoverPreview.useEffect"];
        }
    }["StaggeredTextHoverPreview.useEffect"], [
        handoffDelayMs,
        incomingDurationMs,
        incomingStaggerStepMs,
        motionDriver,
        outgoingDurationMs,
        outgoingStaggerStepMs
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "StaggeredTextHoverPreview.useEffect": ()=>{
            if (motionDriver !== "waapi") {
                return;
            }
            animationSetsRef.current.forEach({
                "StaggeredTextHoverPreview.useEffect": (animationSet)=>{
                    Object.values(animationSet).forEach({
                        "StaggeredTextHoverPreview.useEffect": (animation)=>{
                            if (!animation) {
                                return;
                            }
                            if (isHovered) {
                                animation.playbackRate = 1;
                                animation.play();
                                return;
                            }
                            const currentTime = typeof animation.currentTime === "number" ? animation.currentTime : 0;
                            if (currentTime <= 0) {
                                animation.pause();
                                animation.currentTime = 0;
                                return;
                            }
                            animation.playbackRate = -1;
                            animation.play();
                        }
                    }["StaggeredTextHoverPreview.useEffect"]);
                }
            }["StaggeredTextHoverPreview.useEffect"]);
        }
    }["StaggeredTextHoverPreview.useEffect"], [
        handoffDelayMs,
        incomingDurationMs,
        incomingStaggerStepMs,
        isHovered,
        motionDriver,
        outgoingDurationMs,
        outgoingStaggerStepMs
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `${__TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$staggered$2d$text$2f$StaggeredTextProject$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].interactivePane} ${__TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$staggered$2d$text$2f$StaggeredTextProject$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].trigger} ${__TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$staggered$2d$text$2f$StaggeredTextProject$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].hoverStage}`,
        "data-implementation": "hover",
        "data-active": isHovered,
        "data-motion-driver": motionDriver,
        "data-reduced-motion": prefersReducedMotion,
        style: timingStyle,
        onPointerEnter: ()=>{
            setIsHovered(true);
        },
        onPointerLeave: ()=>{
            setIsHovered(false);
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$staggered$2d$text$2f$StaggeredTextProject$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].wordmark,
            style: wordmarkStyle,
            children: CHARACTER_SLOTS.map((slot)=>{
                if (slot.isSpace) {
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$staggered$2d$text$2f$StaggeredTextProject$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].space,
                        "aria-hidden": "true",
                        children: " "
                    }, slot.id, false, {
                        fileName: "[project]/Development/Portfolio/mimesis/src/projects/staggered-text/StaggeredTextHoverPreview.tsx",
                        lineNumber: 292,
                        columnNumber: 15
                    }, this);
                }
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$staggered$2d$text$2f$StaggeredTextProject$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].slot,
                    "data-slot": "character",
                    style: {
                        "--char-index": slot.staggerIndex,
                        "--char-reverse-index": slot.reverseStaggerIndex
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$staggered$2d$text$2f$StaggeredTextProject$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].slotSizer,
                            "data-part": "slot-sizer",
                            "aria-hidden": "true",
                            children: slot.char
                        }, void 0, false, {
                            fileName: "[project]/Development/Portfolio/mimesis/src/projects/staggered-text/StaggeredTextHoverPreview.tsx",
                            lineNumber: 310,
                            columnNumber: 15
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$staggered$2d$text$2f$StaggeredTextProject$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].outgoingArm,
                            "data-part": "outgoing-arm",
                            ref: (node)=>{
                                outgoingArmRefs.current[slot.staggerIndex] = node;
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$staggered$2d$text$2f$StaggeredTextProject$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].outgoingGlyph,
                                "data-part": "outgoing-glyph",
                                ref: (node)=>{
                                    outgoingGlyphRefs.current[slot.staggerIndex] = node;
                                },
                                children: slot.char
                            }, void 0, false, {
                                fileName: "[project]/Development/Portfolio/mimesis/src/projects/staggered-text/StaggeredTextHoverPreview.tsx",
                                lineNumber: 320,
                                columnNumber: 17
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/Development/Portfolio/mimesis/src/projects/staggered-text/StaggeredTextHoverPreview.tsx",
                            lineNumber: 313,
                            columnNumber: 15
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$staggered$2d$text$2f$StaggeredTextProject$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].incomingGlyph,
                            "data-part": "incoming-glyph",
                            ref: (node)=>{
                                incomingGlyphRefs.current[slot.staggerIndex] = node;
                            },
                            children: slot.char
                        }, void 0, false, {
                            fileName: "[project]/Development/Portfolio/mimesis/src/projects/staggered-text/StaggeredTextHoverPreview.tsx",
                            lineNumber: 330,
                            columnNumber: 15
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$staggered$2d$text$2f$StaggeredTextProject$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].shadow,
                            "aria-hidden": "true",
                            ref: (node)=>{
                                shadowRefs.current[slot.staggerIndex] = node;
                            },
                            children: slot.char
                        }, void 0, false, {
                            fileName: "[project]/Development/Portfolio/mimesis/src/projects/staggered-text/StaggeredTextHoverPreview.tsx",
                            lineNumber: 339,
                            columnNumber: 15
                        }, this)
                    ]
                }, slot.id, true, {
                    fileName: "[project]/Development/Portfolio/mimesis/src/projects/staggered-text/StaggeredTextHoverPreview.tsx",
                    lineNumber: 299,
                    columnNumber: 13
                }, this);
            })
        }, void 0, false, {
            fileName: "[project]/Development/Portfolio/mimesis/src/projects/staggered-text/StaggeredTextHoverPreview.tsx",
            lineNumber: 288,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/Development/Portfolio/mimesis/src/projects/staggered-text/StaggeredTextHoverPreview.tsx",
        lineNumber: 274,
        columnNumber: 5
    }, this);
}
_s(StaggeredTextHoverPreview, "kTSSn7GHrCcOPBzzzliQhQSVGrM=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$reduced$2d$motion$2f$use$2d$reduced$2d$motion$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReducedMotion"],
        __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSyncExternalStore"]
    ];
});
_c1 = StaggeredTextHoverPreview;
var _c, _c1;
__turbopack_context__.k.register(_c, "CHARACTER_SLOTS");
__turbopack_context__.k.register(_c1, "StaggeredTextHoverPreview");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Development/Portfolio/mimesis/src/projects/staggered-text/staggeredTextTuning.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DEFAULT_STAGGERED_TEXT_TUNING",
    ()=>DEFAULT_STAGGERED_TEXT_TUNING,
    "STAGGERED_TEXT_GUI_FOLDERS",
    ()=>STAGGERED_TEXT_GUI_FOLDERS
]);
const DEFAULT_STAGGERED_TEXT_TUNING = {
    fontWeight: 700,
    handoffDelayMs: 60,
    incomingDurationMs: 710,
    incomingStaggerStepMs: 60,
    letterSpacingEm: 0,
    outgoingDurationMs: 788,
    outgoingStaggerStepMs: 60
};
const STAGGERED_TEXT_GUI_FOLDERS = [
    {
        title: "Typography",
        controls: [
            {
                key: "letterSpacingEm",
                label: "Letter Spacing",
                min: -0.08,
                max: 0.08,
                step: 0.001
            },
            {
                key: "fontWeight",
                label: "Font Weight",
                min: 300,
                max: 900,
                step: 1
            }
        ]
    },
    {
        title: "Timing",
        controls: [
            {
                key: "outgoingStaggerStepMs",
                label: "Out Stagger",
                min: 0,
                max: 240,
                step: 1
            },
            {
                key: "incomingStaggerStepMs",
                label: "In Stagger",
                min: 0,
                max: 240,
                step: 1
            },
            {
                key: "handoffDelayMs",
                label: "Handoff",
                min: 0,
                max: 400,
                step: 1
            },
            {
                key: "outgoingDurationMs",
                label: "Out Duration",
                min: 100,
                max: 2000,
                step: 1
            },
            {
                key: "incomingDurationMs",
                label: "In Duration",
                min: 100,
                max: 2000,
                step: 1
            }
        ]
    }
];
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Development/Portfolio/mimesis/src/projects/staggered-text/useStaggeredTextGui.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useStaggeredTextGui",
    ()=>useStaggeredTextGui
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/Development/Portfolio/mimesis/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Development/Portfolio/mimesis/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$staggered$2d$text$2f$staggeredTextTuning$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Development/Portfolio/mimesis/src/projects/staggered-text/staggeredTextTuning.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function useStaggeredTextGui({ enabled, setTuning, tuning }) {
    _s();
    const tuningRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(tuning);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useStaggeredTextGui.useEffect": ()=>{
            tuningRef.current = tuning;
        }
    }["useStaggeredTextGui.useEffect"], [
        tuning
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useStaggeredTextGui.useEffect": ()=>{
            if (!enabled || ("TURBOPACK compile-time value", "development") !== "development") {
                return;
            }
            let cancelled = false;
            let gui = null;
            const draftValues = {
                ...tuningRef.current
            };
            void __turbopack_context__.A("[project]/Development/Portfolio/mimesis/node_modules/lil-gui/dist/lil-gui.esm.js [app-client] (ecmascript, async loader)").then({
                "useStaggeredTextGui.useEffect": ({ GUI })=>{
                    if (cancelled) {
                        return;
                    }
                    gui = new GUI({
                        closeFolders: true,
                        title: "Staggered Text Timing"
                    });
                    gui.close();
                    for (const folderConfig of __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$staggered$2d$text$2f$staggeredTextTuning$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STAGGERED_TEXT_GUI_FOLDERS"]){
                        const folder = gui.addFolder(folderConfig.title);
                        for (const control of folderConfig.controls){
                            folder.add(draftValues, control.key, control.min, control.max, control.step).name(control.label).onChange({
                                "useStaggeredTextGui.useEffect": (value)=>{
                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["startTransition"])({
                                        "useStaggeredTextGui.useEffect": ()=>{
                                            setTuning({
                                                "useStaggeredTextGui.useEffect": (current)=>({
                                                        ...current,
                                                        [control.key]: value
                                                    })
                                            }["useStaggeredTextGui.useEffect"]);
                                        }
                                    }["useStaggeredTextGui.useEffect"]);
                                }
                            }["useStaggeredTextGui.useEffect"]);
                        }
                        folder.close();
                    }
                }
            }["useStaggeredTextGui.useEffect"]);
            return ({
                "useStaggeredTextGui.useEffect": ()=>{
                    cancelled = true;
                    gui?.destroy();
                }
            })["useStaggeredTextGui.useEffect"];
        }
    }["useStaggeredTextGui.useEffect"], [
        enabled,
        setTuning
    ]);
}
_s(useStaggeredTextGui, "XxB+jHAhd+rZ3frRt0r0P+7o8Hs=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Development/Portfolio/mimesis/src/projects/staggered-text/StaggeredTextProject.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>StaggeredTextProject
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Development/Portfolio/mimesis/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Development/Portfolio/mimesis/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$staggered$2d$text$2f$StaggeredTextButtonPreview$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Development/Portfolio/mimesis/src/projects/staggered-text/StaggeredTextButtonPreview.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$staggered$2d$text$2f$StaggeredTextHoverPreview$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Development/Portfolio/mimesis/src/projects/staggered-text/StaggeredTextHoverPreview.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$staggered$2d$text$2f$staggeredTextTuning$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Development/Portfolio/mimesis/src/projects/staggered-text/staggeredTextTuning.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$staggered$2d$text$2f$StaggeredTextProject$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/Development/Portfolio/mimesis/src/projects/staggered-text/StaggeredTextProject.module.css [app-client] (css module)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$staggered$2d$text$2f$useStaggeredTextGui$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Development/Portfolio/mimesis/src/projects/staggered-text/useStaggeredTextGui.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
const DEFAULT_BUTTON_TEXT = "";
function StaggeredTextProject({ projectId }) {
    _s();
    const [mode, setMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("hover");
    const [buttonText, setButtonText] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(DEFAULT_BUTTON_TEXT);
    const [tuning, setTuning] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(__TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$staggered$2d$text$2f$staggeredTextTuning$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEFAULT_STAGGERED_TEXT_TUNING"]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$staggered$2d$text$2f$useStaggeredTextGui$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStaggeredTextGui"])({
        enabled: true,
        setTuning,
        tuning
    });
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$staggered$2d$text$2f$StaggeredTextProject$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].projectShell,
        "data-project-id": projectId,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$staggered$2d$text$2f$StaggeredTextProject$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].controls,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$staggered$2d$text$2f$StaggeredTextProject$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].modeToggle,
                    role: "tablist",
                    "aria-label": "Staggered text preview mode",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            role: "tab",
                            "aria-selected": mode === "hover",
                            className: `${__TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$staggered$2d$text$2f$StaggeredTextProject$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].modeButton} ${mode === "hover" ? __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$staggered$2d$text$2f$StaggeredTextProject$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].modeButtonActive : ""}`,
                            "data-mode-toggle": "hover",
                            onClick: ()=>{
                                setMode("hover");
                            },
                            children: "Hover"
                        }, void 0, false, {
                            fileName: "[project]/Development/Portfolio/mimesis/src/projects/staggered-text/StaggeredTextProject.tsx",
                            lineNumber: 36,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            role: "tab",
                            "aria-selected": mode === "button",
                            className: `${__TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$staggered$2d$text$2f$StaggeredTextProject$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].modeButton} ${mode === "button" ? __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$staggered$2d$text$2f$StaggeredTextProject$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].modeButtonActive : ""}`,
                            "data-mode-toggle": "button",
                            onClick: ()=>{
                                setMode("button");
                            },
                            children: "Button"
                        }, void 0, false, {
                            fileName: "[project]/Development/Portfolio/mimesis/src/projects/staggered-text/StaggeredTextProject.tsx",
                            lineNumber: 48,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Development/Portfolio/mimesis/src/projects/staggered-text/StaggeredTextProject.tsx",
                    lineNumber: 31,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/Development/Portfolio/mimesis/src/projects/staggered-text/StaggeredTextProject.tsx",
                lineNumber: 30,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$staggered$2d$text$2f$StaggeredTextProject$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].previewFrame,
                children: mode === "hover" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$staggered$2d$text$2f$StaggeredTextHoverPreview$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StaggeredTextHoverPreview"], {
                    tuning: tuning
                }, void 0, false, {
                    fileName: "[project]/Development/Portfolio/mimesis/src/projects/staggered-text/StaggeredTextProject.tsx",
                    lineNumber: 64,
                    columnNumber: 11
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$staggered$2d$text$2f$StaggeredTextButtonPreview$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StaggeredTextButtonPreview"], {
                    text: buttonText,
                    onTextChange: setButtonText,
                    tuning: tuning
                }, void 0, false, {
                    fileName: "[project]/Development/Portfolio/mimesis/src/projects/staggered-text/StaggeredTextProject.tsx",
                    lineNumber: 66,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/Development/Portfolio/mimesis/src/projects/staggered-text/StaggeredTextProject.tsx",
                lineNumber: 62,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Development/Portfolio/mimesis/src/projects/staggered-text/StaggeredTextProject.tsx",
        lineNumber: 29,
        columnNumber: 5
    }, this);
}
_s(StaggeredTextProject, "khwepWHVdUxfvKwY2l5DoiNyPRU=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$staggered$2d$text$2f$useStaggeredTextGui$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStaggeredTextGui"]
    ];
});
_c = StaggeredTextProject;
var _c;
__turbopack_context__.k.register(_c, "StaggeredTextProject");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Development/Portfolio/mimesis/src/projects/staggered-text/StaggeredTextProject.tsx [app-client] (ecmascript, next/dynamic entry)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/Development/Portfolio/mimesis/src/projects/staggered-text/StaggeredTextProject.tsx [app-client] (ecmascript)"));
}),
]);

//# sourceMappingURL=Development_Portfolio_mimesis_src_projects_staggered-text_153cd929._.js.map