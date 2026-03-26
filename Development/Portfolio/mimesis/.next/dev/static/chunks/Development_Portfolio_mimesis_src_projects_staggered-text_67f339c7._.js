(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/Development/Portfolio/mimesis/src/projects/staggered-text/staggeredTextTuning.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DEFAULT_STAGGERED_TEXT_TUNING",
    ()=>DEFAULT_STAGGERED_TEXT_TUNING,
    "STAGGERED_TEXT_GUI_FOLDERS",
    ()=>STAGGERED_TEXT_GUI_FOLDERS
]);
const DEFAULT_STAGGERED_TEXT_TUNING = {
    handoffDelayMs: 60,
    incomingDurationMs: 710,
    incomingStaggerStepMs: 60,
    outgoingDurationMs: 788,
    outgoingStaggerStepMs: 60
};
const STAGGERED_TEXT_GUI_FOLDERS = [
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
"[project]/Development/Portfolio/mimesis/src/projects/staggered-text/StaggeredTextProject.module.css [app-client] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "incomingGlyph": "StaggeredTextProject-module__t0AzOq__incomingGlyph",
  "interactivePane": "StaggeredTextProject-module__t0AzOq__interactivePane",
  "outgoingArm": "StaggeredTextProject-module__t0AzOq__outgoingArm",
  "outgoingGlyph": "StaggeredTextProject-module__t0AzOq__outgoingGlyph",
  "shadow": "StaggeredTextProject-module__t0AzOq__shadow",
  "slot": "StaggeredTextProject-module__t0AzOq__slot",
  "slotSizer": "StaggeredTextProject-module__t0AzOq__slotSizer",
  "space": "StaggeredTextProject-module__t0AzOq__space",
  "trigger": "StaggeredTextProject-module__t0AzOq__trigger",
  "wordmark": "StaggeredTextProject-module__t0AzOq__wordmark",
});
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
var __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$reduced$2d$motion$2f$use$2d$reduced$2d$motion$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Development/Portfolio/mimesis/node_modules/framer-motion/dist/es/utils/reduced-motion/use-reduced-motion.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Development/Portfolio/mimesis/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
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
        return null;
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
function StaggeredTextProject({ projectId }) {
    _s();
    const shouldReduceMotion = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$reduced$2d$motion$2f$use$2d$reduced$2d$motion$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReducedMotion"])();
    const suppressNextFocusRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    const [isPressed, setIsPressed] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isKeyboardFocusVisible, setIsKeyboardFocusVisible] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [tuning, setTuning] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(__TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$staggered$2d$text$2f$staggeredTextTuning$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEFAULT_STAGGERED_TEXT_TUNING"]);
    const outgoingArmRefs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])([]);
    const outgoingGlyphRefs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])([]);
    const incomingGlyphRefs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])([]);
    const shadowRefs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])([]);
    const animationSetsRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])([]);
    const prefersReducedMotion = shouldReduceMotion ?? false;
    const isActive = isPressed || isKeyboardFocusVisible;
    const isHydrated = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSyncExternalStore"])(subscribeToHydration, {
        "StaggeredTextProject.useSyncExternalStore[isHydrated]": ()=>true
    }["StaggeredTextProject.useSyncExternalStore[isHydrated]"], {
        "StaggeredTextProject.useSyncExternalStore[isHydrated]": ()=>false
    }["StaggeredTextProject.useSyncExternalStore[isHydrated]"]);
    const motionDriver = !isHydrated || prefersReducedMotion || typeof Element === "undefined" || typeof Element.prototype.animate !== "function" ? "css" : "waapi";
    const { handoffDelayMs, incomingDurationMs, incomingStaggerStepMs, outgoingDurationMs, outgoingStaggerStepMs } = tuning;
    const timingStyle = {
        "--handoff-delay": `${handoffDelayMs}ms`,
        "--incoming-duration": `${incomingDurationMs}ms`,
        "--incoming-stagger-step": `${incomingStaggerStepMs}ms`,
        "--outgoing-duration": `${outgoingDurationMs}ms`,
        "--outgoing-stagger-step": `${outgoingStaggerStepMs}ms`
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$staggered$2d$text$2f$useStaggeredTextGui$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStaggeredTextGui"])({
        enabled: true,
        setTuning,
        tuning
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "StaggeredTextProject.useEffect": ()=>{
            if (motionDriver !== "waapi") {
                animationSetsRef.current.forEach({
                    "StaggeredTextProject.useEffect": (animations)=>{
                        Object.values(animations).forEach({
                            "StaggeredTextProject.useEffect": (animation)=>animation?.cancel()
                        }["StaggeredTextProject.useEffect"]);
                    }
                }["StaggeredTextProject.useEffect"]);
                animationSetsRef.current = [];
                return;
            }
            const animations = CHARACTER_SLOTS.filter({
                "StaggeredTextProject.useEffect.animations": (slot)=>!slot.isSpace
            }["StaggeredTextProject.useEffect.animations"]).map({
                "StaggeredTextProject.useEffect.animations": (slot)=>{
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
            }["StaggeredTextProject.useEffect.animations"]);
            animationSetsRef.current = animations;
            return ({
                "StaggeredTextProject.useEffect": ()=>{
                    animations.forEach({
                        "StaggeredTextProject.useEffect": (animationSet)=>{
                            Object.values(animationSet).forEach({
                                "StaggeredTextProject.useEffect": (animation)=>animation?.cancel()
                            }["StaggeredTextProject.useEffect"]);
                        }
                    }["StaggeredTextProject.useEffect"]);
                    animationSetsRef.current = [];
                }
            })["StaggeredTextProject.useEffect"];
        }
    }["StaggeredTextProject.useEffect"], [
        handoffDelayMs,
        incomingDurationMs,
        incomingStaggerStepMs,
        motionDriver,
        outgoingDurationMs,
        outgoingStaggerStepMs
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "StaggeredTextProject.useEffect": ()=>{
            if (motionDriver !== "waapi") {
                return;
            }
            animationSetsRef.current.forEach({
                "StaggeredTextProject.useEffect": (animationSet)=>{
                    Object.values(animationSet).forEach({
                        "StaggeredTextProject.useEffect": (animation)=>{
                            if (!animation) return;
                            if (isActive) {
                                animation.playbackRate = 1;
                                animation.play();
                                return;
                            }
                            if ((animation.currentTime ?? 0) <= 0) {
                                animation.pause();
                                animation.currentTime = 0;
                                return;
                            }
                            animation.playbackRate = -1;
                            animation.play();
                        }
                    }["StaggeredTextProject.useEffect"]);
                }
            }["StaggeredTextProject.useEffect"]);
        }
    }["StaggeredTextProject.useEffect"], [
        handoffDelayMs,
        incomingDurationMs,
        incomingStaggerStepMs,
        isActive,
        motionDriver,
        outgoingDurationMs,
        outgoingStaggerStepMs
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$staggered$2d$text$2f$StaggeredTextProject$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].interactivePane,
        "data-project-id": projectId,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            type: "button",
            className: __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$staggered$2d$text$2f$StaggeredTextProject$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].trigger,
            "aria-label": "Preview the staggered text hover motion",
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
                children: CHARACTER_SLOTS.map((slot)=>{
                    if (slot.isSpace) {
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$staggered$2d$text$2f$StaggeredTextProject$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].space,
                            "aria-hidden": "true",
                            children: " "
                        }, slot.id, false, {
                            fileName: "[project]/Development/Portfolio/mimesis/src/projects/staggered-text/StaggeredTextProject.tsx",
                            lineNumber: 306,
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
                                fileName: "[project]/Development/Portfolio/mimesis/src/projects/staggered-text/StaggeredTextProject.tsx",
                                lineNumber: 324,
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
                                    fileName: "[project]/Development/Portfolio/mimesis/src/projects/staggered-text/StaggeredTextProject.tsx",
                                    lineNumber: 334,
                                    columnNumber: 19
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/Development/Portfolio/mimesis/src/projects/staggered-text/StaggeredTextProject.tsx",
                                lineNumber: 327,
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
                                fileName: "[project]/Development/Portfolio/mimesis/src/projects/staggered-text/StaggeredTextProject.tsx",
                                lineNumber: 344,
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
                                fileName: "[project]/Development/Portfolio/mimesis/src/projects/staggered-text/StaggeredTextProject.tsx",
                                lineNumber: 353,
                                columnNumber: 17
                            }, this)
                        ]
                    }, slot.id, true, {
                        fileName: "[project]/Development/Portfolio/mimesis/src/projects/staggered-text/StaggeredTextProject.tsx",
                        lineNumber: 313,
                        columnNumber: 15
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/Development/Portfolio/mimesis/src/projects/staggered-text/StaggeredTextProject.tsx",
                lineNumber: 302,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/Development/Portfolio/mimesis/src/projects/staggered-text/StaggeredTextProject.tsx",
            lineNumber: 264,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/Development/Portfolio/mimesis/src/projects/staggered-text/StaggeredTextProject.tsx",
        lineNumber: 263,
        columnNumber: 5
    }, this);
}
_s(StaggeredTextProject, "ZbMv3pciPI0QnpU2MQi8DJacyMw=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$reduced$2d$motion$2f$use$2d$reduced$2d$motion$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReducedMotion"],
        __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSyncExternalStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$staggered$2d$text$2f$useStaggeredTextGui$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStaggeredTextGui"]
    ];
});
_c1 = StaggeredTextProject;
var _c, _c1;
__turbopack_context__.k.register(_c, "CHARACTER_SLOTS");
__turbopack_context__.k.register(_c1, "StaggeredTextProject");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Development/Portfolio/mimesis/src/projects/staggered-text/StaggeredTextProject.tsx [app-client] (ecmascript, next/dynamic entry)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/Development/Portfolio/mimesis/src/projects/staggered-text/StaggeredTextProject.tsx [app-client] (ecmascript)"));
}),
]);

//# sourceMappingURL=Development_Portfolio_mimesis_src_projects_staggered-text_67f339c7._.js.map