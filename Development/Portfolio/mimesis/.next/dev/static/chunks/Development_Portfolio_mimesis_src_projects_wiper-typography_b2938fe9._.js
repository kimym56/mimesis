(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/Development/Portfolio/mimesis/src/projects/wiper-typography/WiperTypographyTeslaModel.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TESLA_DRIVER_VIEW_MODEL_PATH",
    ()=>TESLA_DRIVER_VIEW_MODEL_PATH,
    "TESLA_DRIVER_VIEW_MODEL_SCALE",
    ()=>TESLA_DRIVER_VIEW_MODEL_SCALE,
    "default",
    ()=>WiperTypographyTeslaModel
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Development/Portfolio/mimesis/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$Gltf$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Development/Portfolio/mimesis/node_modules/@react-three/drei/core/Gltf.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Development/Portfolio/mimesis/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
const TESLA_DRIVER_VIEW_MODEL_PATH = "/models/tesla_2018_model_3.glb";
const TESLA_DRIVER_VIEW_MODEL_SCALE = 0.01;
function applyShadows(node) {
    node.traverse((child)=>{
        const mesh = child;
        mesh.castShadow = true;
        mesh.receiveShadow = true;
    });
}
function WiperTypographyTeslaModel({ onReady }) {
    _s();
    const gltf = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$Gltf$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGLTF"])(TESLA_DRIVER_VIEW_MODEL_PATH);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "WiperTypographyTeslaModel.useEffect": ()=>{
            applyShadows(gltf.scene);
            gltf.scene.updateMatrixWorld(true);
            onReady?.(gltf.scene);
        }
    }["WiperTypographyTeslaModel.useEffect"], [
        gltf.scene,
        onReady
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("primitive", {
        object: gltf.scene,
        position: [
            0,
            0,
            0
        ],
        scale: TESLA_DRIVER_VIEW_MODEL_SCALE
    }, void 0, false, {
        fileName: "[project]/Development/Portfolio/mimesis/src/projects/wiper-typography/WiperTypographyTeslaModel.tsx",
        lineNumber: 36,
        columnNumber: 5
    }, this);
}
_s(WiperTypographyTeslaModel, "K+G/sivENdZMaxFNdLbQB/gWxJ4=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$Gltf$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGLTF"]
    ];
});
_c = WiperTypographyTeslaModel;
__TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$Gltf$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGLTF"].preload(TESLA_DRIVER_VIEW_MODEL_PATH);
var _c;
__turbopack_context__.k.register(_c, "WiperTypographyTeslaModel");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Development/Portfolio/mimesis/src/projects/wiper-typography/useTeslaDriverViewGui.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useTeslaDriverViewGui",
    ()=>useTeslaDriverViewGui
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/Development/Portfolio/mimesis/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Development/Portfolio/mimesis/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$wiper$2d$typography$2f$wiperTeslaDriverTuning$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Development/Portfolio/mimesis/src/projects/wiper-typography/wiperTeslaDriverTuning.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function useTeslaDriverViewGui({ enabled, setTuning, tuning }) {
    _s();
    const tuningRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(tuning);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useTeslaDriverViewGui.useEffect": ()=>{
            tuningRef.current = tuning;
        }
    }["useTeslaDriverViewGui.useEffect"], [
        tuning
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useTeslaDriverViewGui.useEffect": ()=>{
            if (!enabled || ("TURBOPACK compile-time value", "development") === "production") {
                return;
            }
            let cancelled = false;
            let gui = null;
            const draftValues = {
                ...tuningRef.current
            };
            void __turbopack_context__.A("[project]/Development/Portfolio/mimesis/node_modules/lil-gui/dist/lil-gui.esm.js [app-client] (ecmascript, async loader)").then({
                "useTeslaDriverViewGui.useEffect": ({ GUI })=>{
                    if (cancelled) {
                        return;
                    }
                    gui = new GUI({
                        closeFolders: true,
                        title: "Driver View Tuning"
                    });
                    gui.close();
                    for (const folderConfig of __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$wiper$2d$typography$2f$wiperTeslaDriverTuning$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TESLA_DRIVER_VIEW_GUI_FOLDERS"]){
                        const folder = gui.addFolder(folderConfig.title);
                        for (const control of folderConfig.controls){
                            folder.add(draftValues, control.key, control.min, control.max, control.step).name(control.label).onChange({
                                "useTeslaDriverViewGui.useEffect": (value)=>{
                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["startTransition"])({
                                        "useTeslaDriverViewGui.useEffect": ()=>{
                                            setTuning({
                                                "useTeslaDriverViewGui.useEffect": (current)=>({
                                                        ...current,
                                                        [control.key]: value
                                                    })
                                            }["useTeslaDriverViewGui.useEffect"]);
                                        }
                                    }["useTeslaDriverViewGui.useEffect"]);
                                }
                            }["useTeslaDriverViewGui.useEffect"]);
                        }
                        folder.close();
                    }
                }
            }["useTeslaDriverViewGui.useEffect"]);
            return ({
                "useTeslaDriverViewGui.useEffect": ()=>{
                    cancelled = true;
                    gui?.destroy();
                }
            })["useTeslaDriverViewGui.useEffect"];
        }
    }["useTeslaDriverViewGui.useEffect"], [
        enabled,
        setTuning
    ]);
}
_s(useTeslaDriverViewGui, "XxB+jHAhd+rZ3frRt0r0P+7o8Hs=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Development/Portfolio/mimesis/src/projects/wiper-typography/useWiperSceneSimulation3D.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useWiperSceneSimulation3D",
    ()=>useWiperSceneSimulation3D
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$5a94e5eb$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__C__as__useThree$3e$__ = __turbopack_context__.i("[project]/Development/Portfolio/mimesis/node_modules/@react-three/fiber/dist/events-5a94e5eb.esm.js [app-client] (ecmascript) <export C as useThree>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Development/Portfolio/mimesis/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$wiper$2d$typography$2f$wiperSimulation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Development/Portfolio/mimesis/src/projects/wiper-typography/wiperSimulation.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
function useWiperSceneSimulation3D({ widthRatio, heightRatio }) {
    _s();
    const { viewport, size } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$5a94e5eb$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__C__as__useThree$3e$__["useThree"])();
    const [particleCount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(__TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$wiper$2d$typography$2f$wiperSimulation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["detectWiperParticleCount"]);
    const pixelWidth = Math.max(1, size.width);
    const pixelHeight = Math.max(1, size.height);
    const availableWidth = Math.max(1, viewport.width * widthRatio);
    const availableHeight = Math.max(1, viewport.height * heightRatio);
    const scale = Math.min(availableWidth / pixelWidth, availableHeight / pixelHeight);
    const simulation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "useWiperSceneSimulation3D.useMemo[simulation]": ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$wiper$2d$typography$2f$wiperSimulation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createWiperSimulationState"])({
                width: pixelWidth,
                height: pixelHeight,
                particleCount
            })
    }["useWiperSceneSimulation3D.useMemo[simulation]"], [
        particleCount,
        pixelHeight,
        pixelWidth
    ]);
    return {
        simulation,
        scale,
        worldWidth: pixelWidth * scale,
        worldHeight: pixelHeight * scale,
        pixelWidth,
        pixelHeight,
        glyphScale: scale,
        projectX: (value)=>(value - pixelWidth * 0.5) * scale,
        projectY: (value)=>(pixelHeight * 0.5 - value) * scale
    };
}
_s(useWiperSceneSimulation3D, "a+id2wyE0xZNcdEvhjuEOdpUms4=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$5a94e5eb$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__C__as__useThree$3e$__["useThree"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Development/Portfolio/mimesis/src/projects/wiper-typography/wiperDriverView.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "computeDriverViewPhase",
    ()=>computeDriverViewPhase,
    "getDriverViewCycleDuration",
    ()=>getDriverViewCycleDuration
]);
function getDriverViewCycleDuration(reducedMotion) {
    return reducedMotion ? 8 : 4.8;
}
function computeDriverViewPhase(elapsedSeconds, cycleDuration) {
    const safeCycleDuration = Math.max(cycleDuration, 0.001);
    const elapsedWithinCycle = (elapsedSeconds % safeCycleDuration + safeCycleDuration) % safeCycleDuration;
    const normalizedElapsed = elapsedWithinCycle / safeCycleDuration;
    return 1 - Math.abs(normalizedElapsed * 2 - 1);
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Development/Portfolio/mimesis/src/projects/wiper-typography/wiperTeslaDriverLayout.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createTeslaDriverGlyphProjectionInsets",
    ()=>createTeslaDriverGlyphProjectionInsets,
    "createTeslaDriverGlyphQuaternion",
    ()=>createTeslaDriverGlyphQuaternion,
    "createTeslaDriverViewLayout",
    ()=>createTeslaDriverViewLayout,
    "createTeslaDriverViewPlane",
    ()=>createTeslaDriverViewPlane,
    "createTeslaDriverViewPlaneFromPoints",
    ()=>createTeslaDriverViewPlaneFromPoints,
    "getTeslaDriverWiperRotation",
    ()=>getTeslaDriverWiperRotation,
    "projectTeslaDriverGlyphPosition",
    ()=>projectTeslaDriverGlyphPosition
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Development/Portfolio/mimesis/node_modules/three/build/three.core.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$wiper$2d$typography$2f$wiperTeslaDriverTuning$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Development/Portfolio/mimesis/src/projects/wiper-typography/wiperTeslaDriverTuning.ts [app-client] (ecmascript)");
;
;
function normalize([x, y, z]) {
    const length = Math.hypot(x, y, z) || 1;
    return [
        x / length,
        y / length,
        z / length
    ];
}
function add([ax, ay, az], [bx, by, bz]) {
    return [
        ax + bx,
        ay + by,
        az + bz
    ];
}
function scale([x, y, z], scalar) {
    return [
        x * scalar,
        y * scalar,
        z * scalar
    ];
}
function cross([ax, ay, az], [bx, by, bz]) {
    return [
        ay * bz - az * by,
        az * bx - ax * bz,
        ax * by - ay * bx
    ];
}
function dot([ax, ay, az], [bx, by, bz]) {
    return ax * bx + ay * by + az * bz;
}
function subtract([ax, ay, az], [bx, by, bz]) {
    return [
        ax - bx,
        ay - by,
        az - bz
    ];
}
function clampGlyphInset(value) {
    return Math.max(0, Math.min(0.49, value));
}
function clampGlyphCoordinate(value, inset) {
    const clampedInset = clampGlyphInset(inset);
    return Math.min(1 - clampedInset, Math.max(clampedInset, value));
}
function projectOntoPlane(axis, normalAxis) {
    return subtract(axis, scale(normalAxis, dot(axis, normalAxis)));
}
function squaredLength([x, y, z]) {
    return x * x + y * y + z * z;
}
function createIdentityMat3() {
    return [
        [
            1,
            0,
            0
        ],
        [
            0,
            1,
            0
        ],
        [
            0,
            0,
            1
        ]
    ];
}
function cloneMat3(matrix) {
    return [
        [
            ...matrix[0]
        ],
        [
            ...matrix[1]
        ],
        [
            ...matrix[2]
        ]
    ];
}
function diagonalizeSymmetricMat3(matrix) {
    const diagonalized = cloneMat3(matrix);
    const eigenvectors = createIdentityMat3();
    for(let iteration = 0; iteration < 32; iteration += 1){
        let row = 0;
        let column = 1;
        let largestOffDiagonal = Math.abs(diagonalized[row][column]);
        for (const [candidateRow, candidateColumn] of [
            [
                0,
                2
            ],
            [
                1,
                2
            ]
        ]){
            const candidateValue = Math.abs(diagonalized[candidateRow][candidateColumn]);
            if (candidateValue > largestOffDiagonal) {
                row = candidateRow;
                column = candidateColumn;
                largestOffDiagonal = candidateValue;
            }
        }
        if (largestOffDiagonal < 1e-10) {
            break;
        }
        const theta = 0.5 * Math.atan2(2 * diagonalized[row][column], diagonalized[column][column] - diagonalized[row][row]);
        const cosine = Math.cos(theta);
        const sine = Math.sin(theta);
        for(let index = 0; index < 3; index += 1){
            const left = diagonalized[index][row];
            const right = diagonalized[index][column];
            diagonalized[index][row] = cosine * left - sine * right;
            diagonalized[index][column] = sine * left + cosine * right;
        }
        for(let index = 0; index < 3; index += 1){
            const top = diagonalized[row][index];
            const bottom = diagonalized[column][index];
            diagonalized[row][index] = cosine * top - sine * bottom;
            diagonalized[column][index] = sine * top + cosine * bottom;
        }
        for(let index = 0; index < 3; index += 1){
            const left = eigenvectors[index][row];
            const right = eigenvectors[index][column];
            eigenvectors[index][row] = cosine * left - sine * right;
            eigenvectors[index][column] = sine * left + cosine * right;
        }
    }
    return [
        {
            value: diagonalized[0][0],
            vector: normalize([
                eigenvectors[0][0],
                eigenvectors[1][0],
                eigenvectors[2][0]
            ])
        },
        {
            value: diagonalized[1][1],
            vector: normalize([
                eigenvectors[0][1],
                eigenvectors[1][1],
                eigenvectors[2][1]
            ])
        },
        {
            value: diagonalized[2][2],
            vector: normalize([
                eigenvectors[0][2],
                eigenvectors[1][2],
                eigenvectors[2][2]
            ])
        }
    ].sort((left, right)=>right.value - left.value);
}
function createTeslaDriverGlyphProjectionInsets({ glyphRadius, pixelHeight, pixelWidth }) {
    const safeGlyphRadius = Math.max(0, glyphRadius);
    return {
        insetX: clampGlyphInset(safeGlyphRadius / Math.max(pixelWidth, 1)),
        insetY: clampGlyphInset(safeGlyphRadius / Math.max(pixelHeight, 1))
    };
}
function createApproximateTeslaDriverViewPlane({ windscreenCenter, windscreenSize }) {
    const horizontalAxis = [
        1,
        0,
        0
    ];
    const verticalAxis = normalize([
        0,
        Math.max(windscreenSize[1], 0.001),
        -Math.max(windscreenSize[2] * 0.92, windscreenSize[1] * 0.4)
    ]);
    const initialNormalAxis = normalize(cross(horizontalAxis, verticalAxis));
    const normalAxis = initialNormalAxis[2] >= 0 ? initialNormalAxis : scale(initialNormalAxis, -1);
    return {
        center: windscreenCenter,
        height: Math.hypot(windscreenSize[1], windscreenSize[2]),
        horizontalAxis,
        normalAxis,
        verticalAxis,
        width: windscreenSize[0]
    };
}
function createTeslaDriverViewPlane({ axisX, axisY, axisZ, center, driverPosition, extents }) {
    const candidates = [
        {
            axis: normalize(axisX),
            extent: Math.abs(extents[0])
        },
        {
            axis: normalize(axisY),
            extent: Math.abs(extents[1])
        },
        {
            axis: normalize(axisZ),
            extent: Math.abs(extents[2])
        }
    ];
    const thicknessCandidate = candidates.reduce((smallest, current)=>current.extent < smallest.extent ? current : smallest);
    const planeCandidates = candidates.filter((candidate)=>candidate !== thicknessCandidate);
    let normalAxis = thicknessCandidate.axis;
    const toDriver = subtract(driverPosition, center);
    if (dot(normalAxis, toDriver) < 0) {
        normalAxis = scale(normalAxis, -1);
    }
    const [candidateA, candidateB] = planeCandidates;
    let horizontalCandidate = Math.abs(candidateA?.axis[0] ?? 0) >= Math.abs(candidateB?.axis[0] ?? 0) ? candidateA : candidateB;
    const verticalCandidate = horizontalCandidate === candidateA ? candidateB : candidateA;
    let horizontalAxis = horizontalCandidate?.axis ?? [
        1,
        0,
        0
    ];
    if (horizontalAxis[0] < 0) {
        horizontalAxis = scale(horizontalAxis, -1);
    }
    let verticalAxis = normalize(cross(normalAxis, horizontalAxis));
    if (verticalAxis[1] < 0) {
        horizontalAxis = scale(horizontalAxis, -1);
        verticalAxis = normalize(cross(normalAxis, horizontalAxis));
        horizontalCandidate = horizontalCandidate === candidateA ? candidateA : candidateB;
    }
    return {
        center,
        height: verticalCandidate?.extent ?? 1,
        horizontalAxis,
        normalAxis,
        verticalAxis,
        width: horizontalCandidate?.extent ?? 1
    };
}
function createTeslaDriverViewPlaneFromPoints({ driverPosition, horizontalReferenceAxis = [
    1,
    0,
    0
], points }) {
    if (points.length < 3) {
        return undefined;
    }
    const center = points.reduce((accumulator, point)=>add(accumulator, point), [
        0,
        0,
        0
    ]).map((value)=>value / points.length);
    const covariance = [
        [
            0,
            0,
            0
        ],
        [
            0,
            0,
            0
        ],
        [
            0,
            0,
            0
        ]
    ];
    for (const point of points){
        const [dx, dy, dz] = subtract(point, center);
        covariance[0][0] += dx * dx;
        covariance[0][1] += dx * dy;
        covariance[0][2] += dx * dz;
        covariance[1][0] += dy * dx;
        covariance[1][1] += dy * dy;
        covariance[1][2] += dy * dz;
        covariance[2][0] += dz * dx;
        covariance[2][1] += dz * dy;
        covariance[2][2] += dz * dz;
    }
    const [dominantAxis, secondaryAxis, smallestAxis] = diagonalizeSymmetricMat3(covariance);
    let normalAxis = smallestAxis.vector;
    const toDriver = subtract(driverPosition, center);
    if (dot(normalAxis, toDriver) > 0) {
        normalAxis = scale(normalAxis, -1);
    }
    const horizontalCandidates = [
        horizontalReferenceAxis,
        dominantAxis.vector,
        secondaryAxis.vector,
        [
            0,
            1,
            0
        ],
        [
            0,
            0,
            1
        ]
    ];
    let horizontalAxis = horizontalCandidates.map((axis)=>projectOntoPlane(axis, normalAxis)).find((axis)=>squaredLength(axis) > 1e-8) ?? [
        1,
        0,
        0
    ];
    horizontalAxis = normalize(horizontalAxis);
    if (horizontalAxis[0] < 0) {
        horizontalAxis = scale(horizontalAxis, -1);
    }
    let verticalAxis = normalize(cross(normalAxis, horizontalAxis));
    if (verticalAxis[1] < 0) {
        horizontalAxis = scale(horizontalAxis, -1);
        verticalAxis = normalize(cross(normalAxis, horizontalAxis));
    }
    let minHorizontal = Infinity;
    let maxHorizontal = -Infinity;
    let minVertical = Infinity;
    let maxVertical = -Infinity;
    for (const point of points){
        const pointOffset = subtract(point, center);
        const horizontalOffset = dot(pointOffset, horizontalAxis);
        const verticalOffset = dot(pointOffset, verticalAxis);
        minHorizontal = Math.min(minHorizontal, horizontalOffset);
        maxHorizontal = Math.max(maxHorizontal, horizontalOffset);
        minVertical = Math.min(minVertical, verticalOffset);
        maxVertical = Math.max(maxVertical, verticalOffset);
    }
    return {
        center,
        height: maxVertical - minVertical,
        horizontalAxis,
        normalAxis,
        verticalAxis,
        width: maxHorizontal - minHorizontal
    };
}
function createTeslaDriverViewLayout({ steeringPosition, windscreenCenter, windscreenPlane, windscreenSize }, tuning = __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$wiper$2d$typography$2f$wiperTeslaDriverTuning$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEFAULT_TESLA_DRIVER_VIEW_TUNING"]) {
    const plane = windscreenPlane ?? createApproximateTeslaDriverViewPlane({
        windscreenCenter,
        windscreenSize
    });
    const horizontalAxis = plane.horizontalAxis;
    const verticalAxis = plane.verticalAxis;
    const normalAxis = plane.normalAxis;
    const windscreenWidth = plane.width * tuning.windscreenWidthScale;
    const windscreenHeight = plane.height * tuning.windscreenHeightScale;
    const adjustedWindscreenCenter = add(plane.center, add(scale(horizontalAxis, windscreenWidth * tuning.windscreenCenterOffsetX), add(scale(verticalAxis, windscreenHeight * tuning.windscreenCenterOffsetY), scale(normalAxis, tuning.windscreenCenterOffsetNormal))));
    return {
        cameraPosition: add(steeringPosition, [
            tuning.cameraOffsetX,
            tuning.cameraOffsetY,
            tuning.cameraOffsetZ
        ]),
        glyphDepthOffset: tuning.glyphDepthOffset,
        glyphVisibleHeight: windscreenHeight * tuning.glyphHeightScale,
        glyphVisibleWidth: windscreenWidth * tuning.glyphWidthScale,
        glyphYBias: tuning.glyphYBias,
        horizontalAxis,
        lookAt: add(plane.center, add(scale(horizontalAxis, windscreenWidth * tuning.lookAtOffsetX), add(scale(verticalAxis, windscreenHeight * tuning.lookAtOffsetY), scale(normalAxis, tuning.lookAtOffsetZ)))),
        normalAxis,
        verticalAxis,
        windscreenCenter: adjustedWindscreenCenter,
        windscreenHeight,
        windscreenWidth
    };
}
function projectTeslaDriverGlyphPosition(layout, normalizedX, normalizedY, projectionInsets = {
    insetX: 0,
    insetY: 0
}) {
    const safeX = clampGlyphCoordinate(normalizedX, projectionInsets.insetX);
    const safeY = clampGlyphCoordinate(normalizedY, projectionInsets.insetY);
    const xOffset = (safeX - 0.5) * layout.glyphVisibleWidth;
    const yOffset = (layout.glyphYBias - safeY) * layout.glyphVisibleHeight;
    return add(layout.windscreenCenter, add(scale(layout.horizontalAxis, xOffset), add(scale(layout.verticalAxis, yOffset), scale(layout.normalAxis, layout.glyphDepthOffset))));
}
function createTeslaDriverGlyphQuaternion(layout, rotationZ) {
    const basisMatrix = new __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Matrix4"]().makeBasis(new __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](...layout.horizontalAxis), new __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](...layout.verticalAxis), new __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](...layout.normalAxis));
    const planeQuaternion = new __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Quaternion"]().setFromRotationMatrix(basisMatrix);
    const spinQuaternion = new __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Quaternion"]().setFromAxisAngle(new __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](0, 0, 1), rotationZ);
    return planeQuaternion.multiply(spinQuaternion);
}
function getTeslaDriverWiperRotation(phase) {
    const clampedPhase = Math.max(0, Math.min(1, phase));
    return 0.82 + clampedPhase * 0.48;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Development/Portfolio/mimesis/src/projects/wiper-typography/WiperTypographyDriverView3D.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>WiperTypographyDriverView3D
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/Development/Portfolio/mimesis/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Development/Portfolio/mimesis/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$react$2d$three$2d$fiber$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Development/Portfolio/mimesis/node_modules/@react-three/fiber/dist/react-three-fiber.esm.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$5a94e5eb$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__ = __turbopack_context__.i("[project]/Development/Portfolio/mimesis/node_modules/@react-three/fiber/dist/events-5a94e5eb.esm.js [app-client] (ecmascript) <export D as useFrame>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$reduced$2d$motion$2f$use$2d$reduced$2d$motion$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Development/Portfolio/mimesis/node_modules/framer-motion/dist/es/utils/reduced-motion/use-reduced-motion.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Development/Portfolio/mimesis/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Development/Portfolio/mimesis/node_modules/three/build/three.core.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$wiper$2d$typography$2f$WiperTypographyProject$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/Development/Portfolio/mimesis/src/projects/wiper-typography/WiperTypographyProject.module.css [app-client] (css module)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$wiper$2d$typography$2f$WiperTypographyTeslaModel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Development/Portfolio/mimesis/src/projects/wiper-typography/WiperTypographyTeslaModel.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$wiper$2d$typography$2f$useTeslaDriverViewGui$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Development/Portfolio/mimesis/src/projects/wiper-typography/useTeslaDriverViewGui.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$wiper$2d$typography$2f$useWiperInteraction$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Development/Portfolio/mimesis/src/projects/wiper-typography/useWiperInteraction.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$wiper$2d$typography$2f$useWiperSceneSimulation3D$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Development/Portfolio/mimesis/src/projects/wiper-typography/useWiperSceneSimulation3D.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$wiper$2d$typography$2f$wiperConfig$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Development/Portfolio/mimesis/src/projects/wiper-typography/wiperConfig.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$wiper$2d$typography$2f$wiperDriverView$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Development/Portfolio/mimesis/src/projects/wiper-typography/wiperDriverView.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$wiper$2d$typography$2f$wiperSceneRenderer$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Development/Portfolio/mimesis/src/projects/wiper-typography/wiperSceneRenderer.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$wiper$2d$typography$2f$wiperSimulation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Development/Portfolio/mimesis/src/projects/wiper-typography/wiperSimulation.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$wiper$2d$typography$2f$wiperTeslaDriverLayout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Development/Portfolio/mimesis/src/projects/wiper-typography/wiperTeslaDriverLayout.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$wiper$2d$typography$2f$wiperTeslaDriverTuning$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Development/Portfolio/mimesis/src/projects/wiper-typography/wiperTeslaDriverTuning.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$wiper$2d$typography$2f$wiperView$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Development/Portfolio/mimesis/src/projects/wiper-typography/wiperView.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature(), _s3 = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
const DRIVER_WINDSHIELD_OVERLAY_PLACEHOLDER = [
    0,
    -10,
    0
];
const DRIVER_VIEW_INITIAL_CAMERA_POSITION = [
    -0.41,
    0.47,
    -0.43
];
const DRIVER_VIEW_INITIAL_LOOK_AT = [
    -0.23,
    0.56,
    -0.82
];
const DRIVER_VIEW_TEXTURE_MAX_SIZE = 2048;
const DRIVER_VIEW_TEXTURE_SCALE = 2;
const DRIVER_VIEW_INITIAL_FOV = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$wiper$2d$typography$2f$wiperTeslaDriverTuning$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clampTeslaDriverViewFov"])(__TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$wiper$2d$typography$2f$wiperTeslaDriverTuning$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEFAULT_TESLA_DRIVER_VIEW_TUNING"].fov);
const DRIVER_VIEW_DRAG_SMOOTHING = 0.1;
const DRIVER_VIEW_CANVAS_SHADOWS = {
    type: __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PCFShadowMap"]
};
const THREE_CLOCK_WARNING_FILTER_FLAG = "__mimesisThreeClockWarningFilter";
function suppressThreeClockDeprecationWarning() {
    if (("TURBOPACK compile-time value", "development") === "production" || typeof console === "undefined") {
        return;
    }
    const currentWarn = console.warn;
    if (currentWarn[THREE_CLOCK_WARNING_FILTER_FLAG]) {
        return;
    }
    const wrappedWarn = (...args)=>{
        const message = args[0];
        if (typeof message === "string" && message.includes("THREE.Clock:")) {
            return;
        }
        currentWarn(...args);
    };
    wrappedWarn[THREE_CLOCK_WARNING_FILTER_FLAG] = true;
    console.warn = wrappedWarn;
}
function addVector3([ax, ay, az], [bx, by, bz]) {
    return [
        ax + bx,
        ay + by,
        az + bz
    ];
}
function scaleVector3([x, y, z], scalar) {
    return [
        x * scalar,
        y * scalar,
        z * scalar
    ];
}
function createDriverViewOverlayCenter(layout) {
    return addVector3(layout.windscreenCenter, addVector3(scaleVector3(layout.verticalAxis, (layout.glyphYBias - 0.5) * layout.glyphVisibleHeight), scaleVector3(layout.normalAxis, layout.glyphDepthOffset)));
}
function syncDriverViewOverlayCanvas(canvas, context, pixelWidth, pixelHeight) {
    const safePixelWidth = Math.max(pixelWidth, 1);
    const safePixelHeight = Math.max(pixelHeight, 1);
    const textureScale = Math.max(1, Math.min(DRIVER_VIEW_TEXTURE_SCALE, DRIVER_VIEW_TEXTURE_MAX_SIZE / safePixelWidth, DRIVER_VIEW_TEXTURE_MAX_SIZE / safePixelHeight));
    const textureWidth = Math.max(1, Math.round(safePixelWidth * textureScale));
    const textureHeight = Math.max(1, Math.round(safePixelHeight * textureScale));
    if (canvas.width !== textureWidth || canvas.height !== textureHeight) {
        canvas.width = textureWidth;
        canvas.height = textureHeight;
    }
    context.setTransform(textureWidth / safePixelWidth, 0, 0, textureHeight / safePixelHeight, 0, 0);
    context.imageSmoothingEnabled = true;
}
function DriverViewGuiController({ setTuning, tuning }) {
    _s();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$wiper$2d$typography$2f$useTeslaDriverViewGui$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTeslaDriverViewGui"])({
        enabled: true,
        setTuning,
        tuning
    });
    return null;
}
_s(DriverViewGuiController, "l7UEBQb8YoWScGtxMgXswAcTxOA=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$wiper$2d$typography$2f$useTeslaDriverViewGui$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTeslaDriverViewGui"]
    ];
});
_c = DriverViewGuiController;
function DriverViewGlyphField({ fovRef, onSceneReady, phaseRef, reducedMotion, tuning, viewRef }) {
    _s1();
    const overlayMeshRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const overlayCanvasRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const overlayContextRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const overlayTextureRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const teslaSceneRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const wiperDummyRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const layoutRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const smoothedViewRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])({
        yaw: 0,
        pitch: 0
    });
    const { pixelHeight, pixelWidth, simulation } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$wiper$2d$typography$2f$useWiperSceneSimulation3D$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWiperSceneSimulation3D"])({
        widthRatio: 0.74,
        heightRatio: 0.62
    });
    const cycleDuration = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$wiper$2d$typography$2f$wiperDriverView$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDriverViewCycleDuration"])(reducedMotion);
    const scratchBoxRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(new __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Box3"]());
    const scratchCenterRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(new __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]());
    const scratchPlanePointRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(new __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]());
    const scratchSizeRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(new __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]());
    const scratchSteeringPositionRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(new __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]());
    const overlayAssets = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "DriverViewGlyphField.useMemo[overlayAssets]": ()=>{
            if (typeof document === "undefined") {
                return null;
            }
            const canvas = document.createElement("canvas");
            const texture = new __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CanvasTexture"](canvas);
            texture.colorSpace = __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SRGBColorSpace"];
            texture.generateMipmaps = false;
            texture.magFilter = __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LinearFilter"];
            texture.minFilter = __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LinearFilter"];
            return {
                canvas,
                texture
            };
        }
    }["DriverViewGlyphField.useMemo[overlayAssets]"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DriverViewGlyphField.useEffect": ()=>{
            layoutRef.current = null;
        }
    }["DriverViewGlyphField.useEffect"], [
        tuning
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DriverViewGlyphField.useEffect": ()=>{
            overlayCanvasRef.current = overlayAssets?.canvas ?? null;
            overlayTextureRef.current = overlayAssets?.texture ?? null;
            return ({
                "DriverViewGlyphField.useEffect": ()=>{
                    overlayCanvasRef.current = null;
                    overlayContextRef.current = null;
                    overlayTextureRef.current = null;
                    overlayAssets?.texture.dispose();
                }
            })["DriverViewGlyphField.useEffect"];
        }
    }["DriverViewGlyphField.useEffect"], [
        overlayAssets
    ]);
    const syncLayoutFromScene = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "DriverViewGlyphField.useCallback[syncLayoutFromScene]": ()=>{
            const scene = teslaSceneRef.current;
            if (!scene) {
                return null;
            }
            const steeringDummy = scene.getObjectByName("steering_dummy");
            const windscreenMesh = scene.getObjectByName("windscreen_ok_glass0_0") ?? scene.getObjectByName("windscreen_ok_glass.0_0");
            const wiperDummy = scene.getObjectByName("dvornik_dummy");
            if (!steeringDummy || !windscreenMesh || !wiperDummy) {
                return null;
            }
            scene.updateMatrixWorld(true);
            const steeringPosition = steeringDummy.getWorldPosition(scratchSteeringPositionRef.current);
            const windscreenBox = scratchBoxRef.current.setFromObject(windscreenMesh);
            const windscreenCenter = windscreenBox.getCenter(scratchCenterRef.current);
            const windscreenSize = windscreenBox.getSize(scratchSizeRef.current);
            const windscreenGeometry = windscreenMesh.geometry;
            const windscreenPlane = windscreenGeometry != null ? ({
                "DriverViewGlyphField.useCallback[syncLayoutFromScene]": ()=>{
                    const positionAttribute = windscreenGeometry.getAttribute("position");
                    if (!positionAttribute) {
                        return undefined;
                    }
                    const scratchPoint = scratchPlanePointRef.current;
                    const points = [];
                    for(let index = 0; index < positionAttribute.count; index += 1){
                        scratchPoint.set(positionAttribute.getX(index), positionAttribute.getY(index), positionAttribute.getZ(index)).applyMatrix4(windscreenMesh.matrixWorld);
                        points.push([
                            scratchPoint.x,
                            scratchPoint.y,
                            scratchPoint.z
                        ]);
                    }
                    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$wiper$2d$typography$2f$wiperTeslaDriverLayout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createTeslaDriverViewPlaneFromPoints"])({
                        driverPosition: steeringPosition.toArray(),
                        points
                    });
                }
            })["DriverViewGlyphField.useCallback[syncLayoutFromScene]"]() : undefined;
            layoutRef.current = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$wiper$2d$typography$2f$wiperTeslaDriverLayout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createTeslaDriverViewLayout"])({
                steeringPosition: steeringPosition.toArray(),
                windscreenCenter: windscreenCenter.toArray(),
                windscreenPlane,
                windscreenSize: windscreenSize.toArray()
            }, tuning);
            wiperDummyRef.current = wiperDummy;
            return layoutRef.current;
        }
    }["DriverViewGlyphField.useCallback[syncLayoutFromScene]"], [
        tuning
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$5a94e5eb$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__["useFrame"])({
        "DriverViewGlyphField.useFrame": (state)=>{
            const layout = layoutRef.current ?? syncLayoutFromScene();
            const phase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$wiper$2d$typography$2f$wiperDriverView$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["computeDriverViewPhase"])(state.clock.getElapsedTime(), cycleDuration);
            phaseRef.current = phase;
            const perspectiveCamera = state.camera;
            const clampedFov = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$wiper$2d$typography$2f$wiperTeslaDriverTuning$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clampTeslaDriverViewFov"])(fovRef.current ?? tuning.fov);
            if (perspectiveCamera.fov !== clampedFov) {
                perspectiveCamera.fov = clampedFov;
                perspectiveCamera.updateProjectionMatrix();
            }
            if (!layout) {
                return;
            }
            smoothedViewRef.current = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$wiper$2d$typography$2f$wiperView$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["stepViewAngleToward"])(smoothedViewRef.current, viewRef.current, DRIVER_VIEW_DRAG_SMOOTHING);
            const pose = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$wiper$2d$typography$2f$wiperView$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["applyDriverViewCameraOffset"])(layout, smoothedViewRef.current);
            state.camera.position.set(...pose.position);
            state.camera.lookAt(...pose.lookAt);
            if (wiperDummyRef.current) {
                wiperDummyRef.current.rotation.x = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$wiper$2d$typography$2f$wiperTeslaDriverLayout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getTeslaDriverWiperRotation"])(phase);
            }
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$wiper$2d$typography$2f$wiperSimulation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["stepWiperSimulationState"])(simulation, phase);
            if (overlayMeshRef.current) {
                overlayMeshRef.current.position.set(...createDriverViewOverlayCenter(layout));
                overlayMeshRef.current.quaternion.copy((0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$wiper$2d$typography$2f$wiperTeslaDriverLayout$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createTeslaDriverGlyphQuaternion"])(layout, 0));
                overlayMeshRef.current.scale.set(layout.glyphVisibleWidth, layout.glyphVisibleHeight, 1);
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
            syncDriverViewOverlayCanvas(overlayCanvas, overlayContext, pixelWidth, pixelHeight);
            overlayTexture.anisotropy = state.gl.capabilities.getMaxAnisotropy();
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$wiper$2d$typography$2f$wiperSceneRenderer$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["drawWiperScene"])(overlayContext, simulation);
            overlayTexture.needsUpdate = true;
        }
    }["DriverViewGlyphField.useFrame"]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$wiper$2d$typography$2f$WiperTypographyTeslaModel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                onReady: (scene)=>{
                    teslaSceneRef.current = scene;
                    layoutRef.current = null;
                    onSceneReady();
                }
            }, void 0, false, {
                fileName: "[project]/Development/Portfolio/mimesis/src/projects/wiper-typography/WiperTypographyDriverView3D.tsx",
                lineNumber: 425,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                "data-driver-view-part": "windshield-overlay",
                position: DRIVER_WINDSHIELD_OVERLAY_PLACEHOLDER,
                ref: (node)=>{
                    overlayMeshRef.current = node;
                },
                renderOrder: 2,
                scale: [
                    0.001,
                    0.001,
                    1
                ],
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("planeGeometry", {
                        args: [
                            1,
                            1
                        ]
                    }, void 0, false, {
                        fileName: "[project]/Development/Portfolio/mimesis/src/projects/wiper-typography/WiperTypographyDriverView3D.tsx",
                        lineNumber: 441,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshBasicMaterial", {
                        depthWrite: false,
                        map: overlayAssets?.texture ?? undefined,
                        polygonOffset: true,
                        polygonOffsetFactor: -1,
                        polygonOffsetUnits: -1,
                        side: __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DoubleSide"],
                        toneMapped: false,
                        transparent: true
                    }, void 0, false, {
                        fileName: "[project]/Development/Portfolio/mimesis/src/projects/wiper-typography/WiperTypographyDriverView3D.tsx",
                        lineNumber: 442,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Development/Portfolio/mimesis/src/projects/wiper-typography/WiperTypographyDriverView3D.tsx",
                lineNumber: 432,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
_s1(DriverViewGlyphField, "ABXbb84F0RVGt0cD1dXqX626Smw=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$wiper$2d$typography$2f$useWiperSceneSimulation3D$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWiperSceneSimulation3D"],
        __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$5a94e5eb$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__["useFrame"]
    ];
});
_c1 = DriverViewGlyphField;
function DriverViewFallback({ projectId }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `${__TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$wiper$2d$typography$2f$WiperTypographyProject$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].wrapper} ${__TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$wiper$2d$typography$2f$WiperTypographyProject$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].placeholder3D}`,
        "data-project-id": projectId,
        role: "img",
        "aria-label": "Tesla driver view wiper typography simulation",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$wiper$2d$typography$2f$WiperTypographyProject$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].placeholderTitle,
                children: "3D driver view unavailable"
            }, void 0, false, {
                fileName: "[project]/Development/Portfolio/mimesis/src/projects/wiper-typography/WiperTypographyDriverView3D.tsx",
                lineNumber: 465,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$wiper$2d$typography$2f$WiperTypographyProject$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].placeholderBody,
                children: [
                    "Add the local Tesla export at",
                    " ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("code", {
                        children: "/public/models/tesla_2018_model_3.glb"
                    }, void 0, false, {
                        fileName: "[project]/Development/Portfolio/mimesis/src/projects/wiper-typography/WiperTypographyDriverView3D.tsx",
                        lineNumber: 468,
                        columnNumber: 9
                    }, this),
                    " to enable this mode."
                ]
            }, void 0, true, {
                fileName: "[project]/Development/Portfolio/mimesis/src/projects/wiper-typography/WiperTypographyDriverView3D.tsx",
                lineNumber: 466,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Development/Portfolio/mimesis/src/projects/wiper-typography/WiperTypographyDriverView3D.tsx",
        lineNumber: 459,
        columnNumber: 5
    }, this);
}
_c2 = DriverViewFallback;
function DriverViewLoading({ body, projectId }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `${__TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$wiper$2d$typography$2f$WiperTypographyProject$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].wrapper} ${__TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$wiper$2d$typography$2f$WiperTypographyProject$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].placeholder3D}`,
        "data-project-id": projectId,
        role: "img",
        "aria-label": "Tesla driver view wiper typography simulation",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$wiper$2d$typography$2f$WiperTypographyProject$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].placeholderTitle,
                children: "Preparing 3D driver view"
            }, void 0, false, {
                fileName: "[project]/Development/Portfolio/mimesis/src/projects/wiper-typography/WiperTypographyDriverView3D.tsx",
                lineNumber: 488,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$wiper$2d$typography$2f$WiperTypographyProject$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].placeholderBody,
                children: body
            }, void 0, false, {
                fileName: "[project]/Development/Portfolio/mimesis/src/projects/wiper-typography/WiperTypographyDriverView3D.tsx",
                lineNumber: 489,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Development/Portfolio/mimesis/src/projects/wiper-typography/WiperTypographyDriverView3D.tsx",
        lineNumber: 482,
        columnNumber: 5
    }, this);
}
_c3 = DriverViewLoading;
function DriverViewLoadingOverlay() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `${__TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$wiper$2d$typography$2f$WiperTypographyProject$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].placeholder3D} ${__TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$wiper$2d$typography$2f$WiperTypographyProject$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].driverViewLoadingOverlay}`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$wiper$2d$typography$2f$WiperTypographyProject$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].placeholderTitle,
                children: "Preparing 3D driver view"
            }, void 0, false, {
                fileName: "[project]/Development/Portfolio/mimesis/src/projects/wiper-typography/WiperTypographyDriverView3D.tsx",
                lineNumber: 499,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$wiper$2d$typography$2f$WiperTypographyProject$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].placeholderBody,
                children: "Loading the Tesla cabin scene."
            }, void 0, false, {
                fileName: "[project]/Development/Portfolio/mimesis/src/projects/wiper-typography/WiperTypographyDriverView3D.tsx",
                lineNumber: 500,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Development/Portfolio/mimesis/src/projects/wiper-typography/WiperTypographyDriverView3D.tsx",
        lineNumber: 496,
        columnNumber: 5
    }, this);
}
_c4 = DriverViewLoadingOverlay;
function DriverViewScene({ fovRef, onSceneReady, reducedMotion, tuning, viewRef }) {
    _s2();
    const phaseRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(0);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("color", {
                attach: "background",
                args: [
                    __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$wiper$2d$typography$2f$wiperConfig$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WIPER_DRIVER_VIEW_OUTSIDE_COLOR"]
                ]
            }, void 0, false, {
                fileName: "[project]/Development/Portfolio/mimesis/src/projects/wiper-typography/WiperTypographyDriverView3D.tsx",
                lineNumber: 524,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ambientLight", {
                intensity: reducedMotion ? 0.95 : 0.8
            }, void 0, false, {
                fileName: "[project]/Development/Portfolio/mimesis/src/projects/wiper-typography/WiperTypographyDriverView3D.tsx",
                lineNumber: 525,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("directionalLight", {
                castShadow: true,
                intensity: 1.1,
                position: [
                    4,
                    6,
                    5
                ]
            }, void 0, false, {
                fileName: "[project]/Development/Portfolio/mimesis/src/projects/wiper-typography/WiperTypographyDriverView3D.tsx",
                lineNumber: 526,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Suspense"], {
                fallback: null,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DriverViewGlyphField, {
                    fovRef: fovRef,
                    onSceneReady: onSceneReady,
                    phaseRef: phaseRef,
                    reducedMotion: reducedMotion,
                    tuning: tuning,
                    viewRef: viewRef
                }, void 0, false, {
                    fileName: "[project]/Development/Portfolio/mimesis/src/projects/wiper-typography/WiperTypographyDriverView3D.tsx",
                    lineNumber: 528,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/Development/Portfolio/mimesis/src/projects/wiper-typography/WiperTypographyDriverView3D.tsx",
                lineNumber: 527,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
_s2(DriverViewScene, "J0RaRA/0G2H5rGJ4j0CnifAc0Jk=");
_c5 = DriverViewScene;
function WiperTypographyDriverView3D({ projectId }) {
    _s3();
    suppressThreeClockDeprecationWarning();
    const reducedMotion = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$reduced$2d$motion$2f$use$2d$reduced$2d$motion$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReducedMotion"])() ?? false;
    const [assetState, setAssetState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("checking");
    const [sceneReady, setSceneReady] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [tuning, setTuning] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "WiperTypographyDriverView3D.useState": ()=>({
                ...__TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$wiper$2d$typography$2f$wiperTeslaDriverTuning$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEFAULT_TESLA_DRIVER_VIEW_TUNING"]
            })
    }["WiperTypographyDriverView3D.useState"]);
    const { containerRef, dragLayerRef, dragLayerProps, fovRef, viewRef } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$wiper$2d$typography$2f$useWiperInteraction$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWiperInteraction"])({
        interactionMode: "driver-view-camera",
        initialFov: tuning.fov,
        margin: 0
    });
    const handleSceneReady = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "WiperTypographyDriverView3D.useCallback[handleSceneReady]": ()=>{
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["startTransition"])({
                "WiperTypographyDriverView3D.useCallback[handleSceneReady]": ()=>{
                    setSceneReady(true);
                }
            }["WiperTypographyDriverView3D.useCallback[handleSceneReady]"]);
        }
    }["WiperTypographyDriverView3D.useCallback[handleSceneReady]"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "WiperTypographyDriverView3D.useEffect": ()=>{
            let cancelled = false;
            async function verifyAsset() {
                if (typeof fetch !== "function") {
                    if (!cancelled) {
                        setAssetState("missing");
                    }
                    return;
                }
                try {
                    const response = await fetch(__TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$wiper$2d$typography$2f$WiperTypographyTeslaModel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TESLA_DRIVER_VIEW_MODEL_PATH"], {
                        method: "HEAD"
                    });
                    if (!cancelled) {
                        setAssetState(response.ok ? "available" : "missing");
                    }
                } catch  {
                    if (!cancelled) {
                        setAssetState("missing");
                    }
                }
            }
            void verifyAsset();
            return ({
                "WiperTypographyDriverView3D.useEffect": ()=>{
                    cancelled = true;
                }
            })["WiperTypographyDriverView3D.useEffect"];
        }
    }["WiperTypographyDriverView3D.useEffect"], []);
    if (assetState === "checking") {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DriverViewLoading, {
            body: "Checking the local Tesla model asset.",
            projectId: projectId
        }, void 0, false, {
            fileName: "[project]/Development/Portfolio/mimesis/src/projects/wiper-typography/WiperTypographyDriverView3D.tsx",
            lineNumber: 601,
            columnNumber: 7
        }, this);
    }
    if (assetState === "missing") {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DriverViewFallback, {
            projectId: projectId
        }, void 0, false, {
            fileName: "[project]/Development/Portfolio/mimesis/src/projects/wiper-typography/WiperTypographyDriverView3D.tsx",
            lineNumber: 609,
            columnNumber: 12
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$wiper$2d$typography$2f$WiperTypographyProject$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].wrapper,
        "data-project-id": projectId,
        ref: containerRef,
        role: "img",
        "aria-label": "Tesla driver view wiper typography simulation",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DriverViewGuiController, {
                setTuning: setTuning,
                tuning: tuning
            }, void 0, false, {
                fileName: "[project]/Development/Portfolio/mimesis/src/projects/wiper-typography/WiperTypographyDriverView3D.tsx",
                lineNumber: 620,
                columnNumber: 7
            }, this),
            !sceneReady ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DriverViewLoadingOverlay, {}, void 0, false, {
                fileName: "[project]/Development/Portfolio/mimesis/src/projects/wiper-typography/WiperTypographyDriverView3D.tsx",
                lineNumber: 622,
                columnNumber: 22
            }, this) : null,
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$react$2d$three$2d$fiber$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["Canvas"], {
                camera: {
                    position: DRIVER_VIEW_INITIAL_CAMERA_POSITION,
                    fov: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$wiper$2d$typography$2f$wiperTeslaDriverTuning$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clampTeslaDriverViewFov"])(tuning.fov ?? DRIVER_VIEW_INITIAL_FOV),
                    near: 0.01,
                    far: 30
                },
                dpr: [
                    1,
                    2
                ],
                onCreated: ({ camera })=>{
                    camera.lookAt(...DRIVER_VIEW_INITIAL_LOOK_AT);
                },
                shadows: DRIVER_VIEW_CANVAS_SHADOWS,
                style: {
                    inset: 0,
                    position: "absolute"
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DriverViewScene, {
                    fovRef: fovRef,
                    onSceneReady: handleSceneReady,
                    reducedMotion: reducedMotion,
                    tuning: tuning,
                    viewRef: viewRef
                }, void 0, false, {
                    fileName: "[project]/Development/Portfolio/mimesis/src/projects/wiper-typography/WiperTypographyDriverView3D.tsx",
                    lineNumber: 638,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/Development/Portfolio/mimesis/src/projects/wiper-typography/WiperTypographyDriverView3D.tsx",
                lineNumber: 624,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `${__TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$wiper$2d$typography$2f$WiperTypographyProject$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].dragLayer} ${__TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$wiper$2d$typography$2f$WiperTypographyProject$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].driverViewDragLayer}`,
                "data-driver-view-part": "interaction-layer",
                ref: dragLayerRef,
                ...dragLayerProps
            }, void 0, false, {
                fileName: "[project]/Development/Portfolio/mimesis/src/projects/wiper-typography/WiperTypographyDriverView3D.tsx",
                lineNumber: 646,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Development/Portfolio/mimesis/src/projects/wiper-typography/WiperTypographyDriverView3D.tsx",
        lineNumber: 613,
        columnNumber: 5
    }, this);
}
_s3(WiperTypographyDriverView3D, "RSeqBBwtktFBg0zV14YzUWz2dSY=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$reduced$2d$motion$2f$use$2d$reduced$2d$motion$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReducedMotion"],
        __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$wiper$2d$typography$2f$useWiperInteraction$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWiperInteraction"]
    ];
});
_c6 = WiperTypographyDriverView3D;
var _c, _c1, _c2, _c3, _c4, _c5, _c6;
__turbopack_context__.k.register(_c, "DriverViewGuiController");
__turbopack_context__.k.register(_c1, "DriverViewGlyphField");
__turbopack_context__.k.register(_c2, "DriverViewFallback");
__turbopack_context__.k.register(_c3, "DriverViewLoading");
__turbopack_context__.k.register(_c4, "DriverViewLoadingOverlay");
__turbopack_context__.k.register(_c5, "DriverViewScene");
__turbopack_context__.k.register(_c6, "WiperTypographyDriverView3D");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=Development_Portfolio_mimesis_src_projects_wiper-typography_b2938fe9._.js.map