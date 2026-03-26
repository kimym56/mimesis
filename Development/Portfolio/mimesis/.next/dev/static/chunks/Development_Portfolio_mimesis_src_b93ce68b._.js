(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/Development/Portfolio/mimesis/src/projects/wiper-typography/wiperConfig.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "WIPER_3D_GLYPH_EXTRUSION_DEPTH",
    ()=>WIPER_3D_GLYPH_EXTRUSION_DEPTH,
    "WIPER_3D_GLYPH_SIDE_COLOR",
    ()=>WIPER_3D_GLYPH_SIDE_COLOR,
    "WIPER_AUTOPLAY_SPEED",
    ()=>WIPER_AUTOPLAY_SPEED,
    "WIPER_BACKGROUND_COLOR",
    ()=>WIPER_BACKGROUND_COLOR,
    "WIPER_BAR_COLOR",
    ()=>WIPER_BAR_COLOR,
    "WIPER_COLLISION_PUSH",
    ()=>WIPER_COLLISION_PUSH,
    "WIPER_DRIVER_VIEW_OUTSIDE_COLOR",
    ()=>WIPER_DRIVER_VIEW_OUTSIDE_COLOR,
    "WIPER_GLYPHS",
    ()=>WIPER_GLYPHS,
    "WIPER_GLYPH_COLOR",
    ()=>WIPER_GLYPH_COLOR,
    "WIPER_GLYPH_FONT_SIZE",
    ()=>WIPER_GLYPH_FONT_SIZE,
    "WIPER_GLYPH_ROTATION_STEP",
    ()=>WIPER_GLYPH_ROTATION_STEP,
    "WIPER_GLYPH_SIZE",
    ()=>WIPER_GLYPH_SIZE,
    "WIPER_GLYPH_SPAWN_Y",
    ()=>WIPER_GLYPH_SPAWN_Y,
    "WIPER_GLYPH_TEXT_OFFSET_Y",
    ()=>WIPER_GLYPH_TEXT_OFFSET_Y,
    "WIPER_LINE_WIDTH",
    ()=>WIPER_LINE_WIDTH,
    "WIPER_MAX_BAR_DEPTH",
    ()=>WIPER_MAX_BAR_DEPTH,
    "WIPER_MAX_GLYPH_FIELD_DEPTH",
    ()=>WIPER_MAX_GLYPH_FIELD_DEPTH,
    "WIPER_MAX_STAGE_CAMERA_OFFSET",
    ()=>WIPER_MAX_STAGE_CAMERA_OFFSET,
    "WIPER_MAX_VIEW_PITCH",
    ()=>WIPER_MAX_VIEW_PITCH,
    "WIPER_MAX_VIEW_YAW",
    ()=>WIPER_MAX_VIEW_YAW,
    "WIPER_PARTICLE_BUDGET",
    ()=>WIPER_PARTICLE_BUDGET,
    "WIPER_PARTICLE_FRICTION",
    ()=>WIPER_PARTICLE_FRICTION,
    "WIPER_PARTICLE_GRAVITY",
    ()=>WIPER_PARTICLE_GRAVITY,
    "WIPER_PARTICLE_INITIAL_VELOCITY",
    ()=>WIPER_PARTICLE_INITIAL_VELOCITY,
    "WIPER_POINTER_PHASE_MAX_DELTA",
    ()=>WIPER_POINTER_PHASE_MAX_DELTA,
    "WIPER_STAGE_COWL_COLOR",
    ()=>WIPER_STAGE_COWL_COLOR,
    "WIPER_STAGE_DASHBOARD_COLOR",
    ()=>WIPER_STAGE_DASHBOARD_COLOR,
    "WIPER_STAGE_DISPLAY_MOUNT_COLOR",
    ()=>WIPER_STAGE_DISPLAY_MOUNT_COLOR,
    "WIPER_STAGE_EXTERIOR_COLOR",
    ()=>WIPER_STAGE_EXTERIOR_COLOR,
    "WIPER_STAGE_GLASS_COLOR",
    ()=>WIPER_STAGE_GLASS_COLOR,
    "WIPER_STAGE_GLASS_OPACITY",
    ()=>WIPER_STAGE_GLASS_OPACITY,
    "WIPER_STAGE_GLYPH_DEPTH_OFFSET",
    ()=>WIPER_STAGE_GLYPH_DEPTH_OFFSET,
    "WIPER_STAGE_GLYPH_DEPTH_SPREAD",
    ()=>WIPER_STAGE_GLYPH_DEPTH_SPREAD,
    "WIPER_STAGE_GLYPH_SCALE_MULTIPLIER",
    ()=>WIPER_STAGE_GLYPH_SCALE_MULTIPLIER,
    "WIPER_STAGE_HEADLINER_COLOR",
    ()=>WIPER_STAGE_HEADLINER_COLOR,
    "WIPER_STAGE_SCREEN_FRAME_COLOR",
    ()=>WIPER_STAGE_SCREEN_FRAME_COLOR,
    "WIPER_STAGE_SCREEN_GLOW_COLOR",
    ()=>WIPER_STAGE_SCREEN_GLOW_COLOR,
    "WIPER_STAGE_SCREEN_SURFACE_COLOR",
    ()=>WIPER_STAGE_SCREEN_SURFACE_COLOR,
    "WIPER_STAGE_SIMULATOR_GRID_COLOR",
    ()=>WIPER_STAGE_SIMULATOR_GRID_COLOR,
    "WIPER_STAGE_SIMULATOR_GROUND_COLOR",
    ()=>WIPER_STAGE_SIMULATOR_GROUND_COLOR,
    "WIPER_STAGE_TRIM_COLOR",
    ()=>WIPER_STAGE_TRIM_COLOR,
    "WIPER_STAGE_WINDSHIELD_FRAME_COLOR",
    ()=>WIPER_STAGE_WINDSHIELD_FRAME_COLOR,
    "WIPER_STAGE_WIPER_ARM_COLOR",
    ()=>WIPER_STAGE_WIPER_ARM_COLOR,
    "WIPER_STAGE_WIPER_BLADE_COLOR",
    ()=>WIPER_STAGE_WIPER_BLADE_COLOR,
    "WIPER_STAGE_YOKE_COLOR",
    ()=>WIPER_STAGE_YOKE_COLOR,
    "WIPER_VIEW_PITCH_SENSITIVITY",
    ()=>WIPER_VIEW_PITCH_SENSITIVITY,
    "WIPER_VIEW_YAW_SENSITIVITY",
    ()=>WIPER_VIEW_YAW_SENSITIVITY
]);
const WIPER_GLYPHS = "TYPOGRH".split("");
const WIPER_BACKGROUND_COLOR = "#1171b2";
const WIPER_DRIVER_VIEW_OUTSIDE_COLOR = "#d8dee3";
const WIPER_GLYPH_COLOR = "rgb(255, 255, 255)";
const WIPER_BAR_COLOR = "rgb(0, 0, 0)";
const WIPER_GLYPH_SIZE = 50;
const WIPER_GLYPH_FONT_SIZE = 40;
const WIPER_GLYPH_TEXT_OFFSET_Y = 15;
const WIPER_GLYPH_ROTATION_STEP = 0.01;
const WIPER_GLYPH_SPAWN_Y = -30;
const WIPER_LINE_WIDTH = 22;
const WIPER_AUTOPLAY_SPEED = 0.01;
const WIPER_POINTER_PHASE_MAX_DELTA = 0.012;
const WIPER_MAX_BAR_DEPTH = 0.18;
const WIPER_MAX_GLYPH_FIELD_DEPTH = 0.72;
const WIPER_MAX_STAGE_CAMERA_OFFSET = 0.24;
const WIPER_3D_GLYPH_EXTRUSION_DEPTH = 16;
const WIPER_3D_GLYPH_SIDE_COLOR = "#dde7ef";
const WIPER_STAGE_GLYPH_SCALE_MULTIPLIER = 1.2;
const WIPER_STAGE_GLYPH_DEPTH_OFFSET = -0.16;
const WIPER_STAGE_GLYPH_DEPTH_SPREAD = 0.08;
const WIPER_STAGE_DASHBOARD_COLOR = "#12161b";
const WIPER_STAGE_TRIM_COLOR = "#262d34";
const WIPER_STAGE_GLASS_COLOR = "#d7dde2";
const WIPER_STAGE_GLASS_OPACITY = 0.11;
const WIPER_STAGE_EXTERIOR_COLOR = "#e4e7e9";
const WIPER_STAGE_HEADLINER_COLOR = "#14181d";
const WIPER_STAGE_COWL_COLOR = "#101418";
const WIPER_STAGE_SCREEN_FRAME_COLOR = "#11161a";
const WIPER_STAGE_SCREEN_SURFACE_COLOR = "#171c20";
const WIPER_STAGE_SCREEN_GLOW_COLOR = "#d9e3eb";
const WIPER_STAGE_DISPLAY_MOUNT_COLOR = "#2b3239";
const WIPER_STAGE_WINDSHIELD_FRAME_COLOR = "#20262c";
const WIPER_STAGE_SIMULATOR_GROUND_COLOR = "#f1f3f4";
const WIPER_STAGE_SIMULATOR_GRID_COLOR = "#c8cfd5";
const WIPER_STAGE_YOKE_COLOR = "#1a2026";
const WIPER_STAGE_WIPER_ARM_COLOR = "#171c21";
const WIPER_STAGE_WIPER_BLADE_COLOR = "#0d1013";
const WIPER_MAX_VIEW_YAW = 0.42;
const WIPER_MAX_VIEW_PITCH = 0.26;
const WIPER_VIEW_YAW_SENSITIVITY = 1.1;
const WIPER_VIEW_PITCH_SENSITIVITY = 0.9;
const WIPER_PARTICLE_FRICTION = 0.93;
const WIPER_PARTICLE_GRAVITY = 0.1;
const WIPER_PARTICLE_INITIAL_VELOCITY = 1.4;
const WIPER_COLLISION_PUSH = 0.4;
const WIPER_PARTICLE_BUDGET = {
    desktop: 120,
    tablet: 80,
    mobile: 50
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Development/Portfolio/mimesis/src/projects/wiper-typography/wiperSceneRenderer.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "drawWiperScene",
    ()=>drawWiperScene
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$wiper$2d$typography$2f$wiperConfig$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Development/Portfolio/mimesis/src/projects/wiper-typography/wiperConfig.ts [app-client] (ecmascript)");
;
function drawGlyph(context, glyph) {
    context.save();
    context.translate(glyph.x, glyph.y);
    context.rotate(glyph.rotation * Math.PI);
    context.textAlign = "center";
    context.font = `bold ${__TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$wiper$2d$typography$2f$wiperConfig$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WIPER_GLYPH_FONT_SIZE"]}px Helvetica`;
    context.fillStyle = __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$wiper$2d$typography$2f$wiperConfig$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WIPER_GLYPH_COLOR"];
    context.fillText(glyph.text, 0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$wiper$2d$typography$2f$wiperConfig$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WIPER_GLYPH_TEXT_OFFSET_Y"]);
    context.restore();
}
function drawBar(context, bar) {
    context.save();
    context.fillStyle = __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$wiper$2d$typography$2f$wiperConfig$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WIPER_BAR_COLOR"];
    context.translate(bar.x, bar.y);
    context.rotate(bar.rotation);
    context.fillRect(-bar.radius, -bar.height * 0.5, bar.width, bar.height);
    context.restore();
}
function drawWiperScene(context, scene, { backgroundColor } = {}) {
    if (backgroundColor) {
        context.fillStyle = backgroundColor;
        context.fillRect(0, 0, scene.width, scene.height);
    } else {
        context.clearRect(0, 0, scene.width, scene.height);
    }
    for (const glyph of scene.glyphs){
        drawGlyph(context, glyph);
    }
    for (const bar of scene.bars){
        drawBar(context, bar);
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Development/Portfolio/mimesis/src/projects/wiper-typography/wiperMath.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "WIPER_MARGIN",
    ()=>WIPER_MARGIN,
    "clamp",
    ()=>clamp,
    "computeBarDepth",
    ()=>computeBarDepth,
    "computeGlyphLayerDepth",
    ()=>computeGlyphLayerDepth,
    "computeLineCount",
    ()=>computeLineCount,
    "computeLineDimensions",
    ()=>computeLineDimensions,
    "computeLinePose",
    ()=>computeLinePose,
    "computeStageCameraOffset",
    ()=>computeStageCameraOffset,
    "isPointerInsideActiveRange",
    ()=>isPointerInsideActiveRange,
    "mapPointerDragToPhase",
    ()=>mapPointerDragToPhase,
    "mapPointerXToPhase",
    ()=>mapPointerXToPhase,
    "stepPhaseToward",
    ()=>stepPhaseToward
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$wiper$2d$typography$2f$wiperConfig$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Development/Portfolio/mimesis/src/projects/wiper-typography/wiperConfig.ts [app-client] (ecmascript)");
;
function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
}
const WIPER_MARGIN = 100;
function mapPointerXToPhase(pointerX, width, margin = WIPER_MARGIN) {
    const usableWidth = width - margin * 2;
    if (usableWidth <= 0) {
        return 0;
    }
    const clampedX = clamp(pointerX, margin, width - margin);
    return (clampedX - margin) / usableWidth;
}
function mapPointerDragToPhase(pointerX, dragStartX, dragStartPhase, width, margin = WIPER_MARGIN) {
    const usableWidth = width - margin * 2;
    if (usableWidth <= 0) {
        return clamp(dragStartPhase, 0, 1);
    }
    const phaseDelta = (pointerX - dragStartX) / usableWidth;
    return clamp(dragStartPhase + phaseDelta, 0, 1);
}
function stepPhaseToward(currentPhase, targetPhase, maxDelta) {
    const safeCurrent = clamp(currentPhase, 0, 1);
    const safeTarget = clamp(targetPhase, 0, 1);
    const safeMaxDelta = Math.max(0, maxDelta);
    const delta = safeTarget - safeCurrent;
    if (Math.abs(delta) <= safeMaxDelta) {
        return safeTarget;
    }
    return clamp(safeCurrent + Math.sign(delta) * safeMaxDelta, 0, 1);
}
function isPointerInsideActiveRange(pointerX, width, margin = WIPER_MARGIN) {
    return pointerX >= margin && pointerX <= width - margin;
}
function computeLineCount(height, segmentWidth, overscan = 1.2) {
    if (height <= 0 || segmentWidth <= 0) {
        return 0;
    }
    return Math.floor(height / segmentWidth * overscan);
}
function computeLineDimensions(index, width) {
    return {
        width,
        height: width - 0.2 * index
    };
}
function computeBarDepth(index) {
    return clamp(__TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$wiper$2d$typography$2f$wiperConfig$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WIPER_MAX_BAR_DEPTH"] - index * 0.0015, 0.06, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$wiper$2d$typography$2f$wiperConfig$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WIPER_MAX_BAR_DEPTH"]);
}
function computeGlyphLayerDepth(index, totalLayers) {
    if (totalLayers <= 1) {
        return 0;
    }
    const normalized = index / (totalLayers - 1);
    return (normalized * 2 - 1) * __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$wiper$2d$typography$2f$wiperConfig$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WIPER_MAX_GLYPH_FIELD_DEPTH"];
}
function computeStageCameraOffset(phase) {
    const normalizedPhase = clamp(phase, 0, 1);
    return {
        x: (normalizedPhase * 2 - 1) * __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$wiper$2d$typography$2f$wiperConfig$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WIPER_MAX_STAGE_CAMERA_OFFSET"],
        y: (0.5 - Math.abs(normalizedPhase - 0.5)) * __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$wiper$2d$typography$2f$wiperConfig$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WIPER_MAX_STAGE_CAMERA_OFFSET"] * 0.35
    };
}
function computeLinePose(index, phase, width, height, segmentWidth) {
    const theta = phase * Math.PI;
    const distance = -(segmentWidth - 2) * index;
    return {
        x: Math.cos(theta) * distance + width / 2,
        y: Math.sin(theta) * distance + height + segmentWidth,
        rotation: theta
    };
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Development/Portfolio/mimesis/src/projects/wiper-typography/wiperSimulation.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createWiperSimulationState",
    ()=>createWiperSimulationState,
    "detectWiperParticleCount",
    ()=>detectWiperParticleCount,
    "selectWiperParticleCount",
    ()=>selectWiperParticleCount,
    "stepWiperSimulationState",
    ()=>stepWiperSimulationState
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$wiper$2d$typography$2f$wiperConfig$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Development/Portfolio/mimesis/src/projects/wiper-typography/wiperConfig.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$wiper$2d$typography$2f$wiperMath$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Development/Portfolio/mimesis/src/projects/wiper-typography/wiperMath.ts [app-client] (ecmascript)");
;
;
function randomInt(random, min, max) {
    return Math.floor(random() * (max - min + 1)) + min;
}
function createGlyph(index, scene) {
    const glyph = {
        kind: "glyph",
        index,
        x: 0,
        y: 0,
        vx: 0,
        vy: 0,
        radius: __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$wiper$2d$typography$2f$wiperConfig$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WIPER_GLYPH_SIZE"] * 0.5,
        rotation: 0,
        text: __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$wiper$2d$typography$2f$wiperConfig$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WIPER_GLYPHS"][0] ?? ""
    };
    resetGlyph(glyph, scene);
    return glyph;
}
function resetGlyph(glyph, scene) {
    glyph.x = randomInt(scene.random, 0, scene.width);
    glyph.y = __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$wiper$2d$typography$2f$wiperConfig$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WIPER_GLYPH_SPAWN_Y"];
    glyph.vx = scene.random() * (__TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$wiper$2d$typography$2f$wiperConfig$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WIPER_PARTICLE_INITIAL_VELOCITY"] * 2) - __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$wiper$2d$typography$2f$wiperConfig$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WIPER_PARTICLE_INITIAL_VELOCITY"];
    glyph.vy = scene.random() * (__TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$wiper$2d$typography$2f$wiperConfig$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WIPER_PARTICLE_INITIAL_VELOCITY"] * 2) - __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$wiper$2d$typography$2f$wiperConfig$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WIPER_PARTICLE_INITIAL_VELOCITY"];
    glyph.rotation = 0;
    glyph.text = __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$wiper$2d$typography$2f$wiperConfig$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WIPER_GLYPHS"][randomInt(scene.random, 0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$wiper$2d$typography$2f$wiperConfig$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WIPER_GLYPHS"].length - 1)] ?? "";
}
function createBar(index, scene, phase) {
    const dimensions = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$wiper$2d$typography$2f$wiperMath$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["computeLineDimensions"])(index, scene.lineWidth);
    const pose = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$wiper$2d$typography$2f$wiperMath$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["computeLinePose"])(index, phase, scene.width, scene.height, scene.lineWidth);
    return {
        kind: "bar",
        index,
        x: pose.x,
        y: pose.y,
        vx: 0,
        vy: 0,
        radius: dimensions.width * 0.5,
        rotation: pose.rotation,
        width: dimensions.width,
        height: dimensions.height
    };
}
function updateBarPose(bar, scene, phase) {
    const dimensions = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$wiper$2d$typography$2f$wiperMath$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["computeLineDimensions"])(bar.index, scene.lineWidth);
    const pose = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$wiper$2d$typography$2f$wiperMath$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["computeLinePose"])(bar.index, phase, scene.width, scene.height, scene.lineWidth);
    bar.x = pose.x;
    bar.y = pose.y;
    bar.vx = 0;
    bar.vy = 0;
    bar.radius = dimensions.width * 0.5;
    bar.rotation = pose.rotation;
    bar.width = dimensions.width;
    bar.height = dimensions.height;
}
function moveGlyph(glyph, scene) {
    glyph.rotation += __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$wiper$2d$typography$2f$wiperConfig$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WIPER_GLYPH_ROTATION_STEP"];
    glyph.vx *= __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$wiper$2d$typography$2f$wiperConfig$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WIPER_PARTICLE_FRICTION"];
    glyph.vy *= __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$wiper$2d$typography$2f$wiperConfig$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WIPER_PARTICLE_FRICTION"];
    glyph.vy += __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$wiper$2d$typography$2f$wiperConfig$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WIPER_PARTICLE_GRAVITY"];
    glyph.x += glyph.vx;
    glyph.y += glyph.vy;
    if (glyph.x - glyph.radius > scene.width || glyph.x + glyph.radius < 0) {
        resetGlyph(glyph, scene);
        return;
    }
    if (glyph.y - glyph.radius > scene.height) {
        resetGlyph(glyph, scene);
    }
}
function applyCollisions(scene) {
    const entities = [
        ...scene.glyphs,
        ...scene.bars
    ];
    for(let currentIndex = 0; currentIndex < entities.length - 1; currentIndex += 1){
        const current = entities[currentIndex];
        if (!current) {
            continue;
        }
        for(let targetIndex = currentIndex + 1; targetIndex < entities.length; targetIndex += 1){
            const target = entities[targetIndex];
            if (!target) {
                continue;
            }
            const dx = target.x - current.x;
            const dy = target.y - current.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const radiusSum = current.radius + target.radius;
            if (distance >= radiusSum || distance === 0) {
                continue;
            }
            const angle = Math.atan2(dy, dx);
            const nextX = current.x + Math.cos(angle) * radiusSum;
            const nextY = current.y + Math.sin(angle) * radiusSum;
            const impulseX = __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$wiper$2d$typography$2f$wiperConfig$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WIPER_COLLISION_PUSH"] * (nextX - target.x);
            const impulseY = __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$wiper$2d$typography$2f$wiperConfig$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WIPER_COLLISION_PUSH"] * (nextY - target.y);
            current.vx -= impulseX;
            current.vy -= impulseY;
            target.vx += impulseX;
            target.vy += impulseY;
        }
    }
}
function selectWiperParticleCount({ coarsePointer, isIpad }) {
    if (!coarsePointer) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$wiper$2d$typography$2f$wiperConfig$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WIPER_PARTICLE_BUDGET"].desktop;
    }
    return isIpad ? __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$wiper$2d$typography$2f$wiperConfig$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WIPER_PARTICLE_BUDGET"].tablet : __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$wiper$2d$typography$2f$wiperConfig$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WIPER_PARTICLE_BUDGET"].mobile;
}
function detectWiperParticleCount() {
    if (("TURBOPACK compile-time value", "object") === "undefined" || typeof navigator === "undefined") {
        return __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$wiper$2d$typography$2f$wiperConfig$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WIPER_PARTICLE_BUDGET"].desktop;
    }
    const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
    const isIpad = /iPad/.test(navigator.userAgent) || navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1;
    return selectWiperParticleCount({
        coarsePointer,
        isIpad
    });
}
function createWiperSimulationState({ width, height, lineWidth = __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$wiper$2d$typography$2f$wiperConfig$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WIPER_LINE_WIDTH"], particleCount, phase = 0, random = Math.random }) {
    const safeWidth = Math.max(1, width);
    const safeHeight = Math.max(1, height);
    const scene = {
        width: safeWidth,
        height: safeHeight,
        lineWidth,
        glyphs: [],
        bars: [],
        random
    };
    for(let index = 0; index < particleCount; index += 1){
        scene.glyphs.push(createGlyph(index, scene));
    }
    const lineCount = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$wiper$2d$typography$2f$wiperMath$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["computeLineCount"])(safeHeight, lineWidth);
    for(let index = 0; index < lineCount; index += 1){
        scene.bars.push(createBar(index, scene, phase));
    }
    return scene;
}
function stepWiperSimulationState(scene, phase) {
    for (const bar of scene.bars){
        updateBarPose(bar, scene, phase);
    }
    applyCollisions(scene);
    for (const glyph of scene.glyphs){
        moveGlyph(glyph, scene);
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Development/Portfolio/mimesis/src/projects/wiper-typography/WiperTypographyProject.module.css [app-client] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "canvas": "WiperTypographyProject-module__7IbnFa__canvas",
  "dragLayer": "WiperTypographyProject-module__7IbnFa__dragLayer",
  "driverViewDragLayer": "WiperTypographyProject-module__7IbnFa__driverViewDragLayer",
  "driverViewLoadingOverlay": "WiperTypographyProject-module__7IbnFa__driverViewLoadingOverlay",
  "interactivePane": "WiperTypographyProject-module__7IbnFa__interactivePane",
  "modeButton": "WiperTypographyProject-module__7IbnFa__modeButton",
  "modeButtonActive": "WiperTypographyProject-module__7IbnFa__modeButtonActive",
  "modeToggle": "WiperTypographyProject-module__7IbnFa__modeToggle",
  "placeholder3D": "WiperTypographyProject-module__7IbnFa__placeholder3D",
  "placeholderBody": "WiperTypographyProject-module__7IbnFa__placeholderBody",
  "placeholderTitle": "WiperTypographyProject-module__7IbnFa__placeholderTitle",
  "wrapper": "WiperTypographyProject-module__7IbnFa__wrapper",
});
}),
"[project]/Development/Portfolio/mimesis/src/projects/wiper-typography/wiperTeslaDriverTuning.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DEFAULT_TESLA_DRIVER_VIEW_TUNING",
    ()=>DEFAULT_TESLA_DRIVER_VIEW_TUNING,
    "TESLA_DRIVER_VIEW_FOV_RANGE",
    ()=>TESLA_DRIVER_VIEW_FOV_RANGE,
    "TESLA_DRIVER_VIEW_GUI_FOLDERS",
    ()=>TESLA_DRIVER_VIEW_GUI_FOLDERS,
    "clampTeslaDriverViewFov",
    ()=>clampTeslaDriverViewFov
]);
const TESLA_DRIVER_VIEW_FOV_RANGE = {
    min: 8,
    max: 170
};
function clampTeslaDriverViewFov(value) {
    return Math.min(TESLA_DRIVER_VIEW_FOV_RANGE.max, Math.max(TESLA_DRIVER_VIEW_FOV_RANGE.min, value));
}
const DEFAULT_TESLA_DRIVER_VIEW_TUNING = {
    cameraOffsetX: 0.19,
    cameraOffsetY: 0.26,
    cameraOffsetZ: 0.57,
    fov: clampTeslaDriverViewFov(64),
    glyphDepthOffset: 0.07,
    glyphHeightScale: 1.19,
    glyphWidthScale: 1.37,
    glyphYBias: 0.43,
    lookAtOffsetX: 0.12,
    lookAtOffsetY: -0.0599,
    lookAtOffsetZ: 0.03,
    windscreenCenterOffsetNormal: 0,
    windscreenCenterOffsetX: -0.0599,
    windscreenCenterOffsetY: 0,
    windscreenHeightScale: 0.68,
    windscreenWidthScale: 0.72
};
const TESLA_DRIVER_VIEW_GUI_FOLDERS = [
    {
        title: "Camera",
        controls: [
            {
                key: "fov",
                label: "FOV",
                min: TESLA_DRIVER_VIEW_FOV_RANGE.min,
                max: TESLA_DRIVER_VIEW_FOV_RANGE.max,
                step: 1
            },
            {
                key: "cameraOffsetX",
                label: "Offset X",
                min: -1.5,
                max: 1.5,
                step: 0.01
            },
            {
                key: "cameraOffsetY",
                label: "Offset Y",
                min: -1.5,
                max: 1.5,
                step: 0.01
            },
            {
                key: "cameraOffsetZ",
                label: "Offset Z",
                min: -1.5,
                max: 2.5,
                step: 0.01
            },
            {
                key: "lookAtOffsetX",
                label: "Target X",
                min: -2,
                max: 2,
                step: 0.01
            },
            {
                key: "lookAtOffsetY",
                label: "Target Y",
                min: -2,
                max: 2,
                step: 0.01
            },
            {
                key: "lookAtOffsetZ",
                label: "Target Z",
                min: -2,
                max: 2,
                step: 0.01
            }
        ]
    },
    {
        title: "Windshield",
        controls: [
            {
                key: "windscreenWidthScale",
                label: "Width",
                min: 0.05,
                max: 3,
                step: 0.01
            },
            {
                key: "windscreenHeightScale",
                label: "Height",
                min: 0.05,
                max: 3,
                step: 0.01
            },
            {
                key: "windscreenCenterOffsetX",
                label: "Center X",
                min: -2,
                max: 2,
                step: 0.01
            },
            {
                key: "windscreenCenterOffsetY",
                label: "Center Y",
                min: -2,
                max: 2,
                step: 0.01
            },
            {
                key: "windscreenCenterOffsetNormal",
                label: "Center Z",
                min: -1.5,
                max: 1.5,
                step: 0.002
            }
        ]
    },
    {
        title: "Glyphs",
        controls: [
            {
                key: "glyphWidthScale",
                label: "Width",
                min: 0.05,
                max: 3,
                step: 0.01
            },
            {
                key: "glyphHeightScale",
                label: "Height",
                min: 0.05,
                max: 3,
                step: 0.01
            },
            {
                key: "glyphYBias",
                label: "Y Bias",
                min: -2,
                max: 3,
                step: 0.01
            },
            {
                key: "glyphDepthOffset",
                label: "Depth",
                min: -1,
                max: 1,
                step: 0.002
            }
        ]
    }
];
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Development/Portfolio/mimesis/src/projects/wiper-typography/wiperView.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "applyDriverViewCameraOffset",
    ()=>applyDriverViewCameraOffset,
    "computeWiperCameraPose",
    ()=>computeWiperCameraPose,
    "mapDragDeltaToViewAngle",
    ()=>mapDragDeltaToViewAngle,
    "mapWheelDeltaToDriverViewFov",
    ()=>mapWheelDeltaToDriverViewFov,
    "stepViewAngleToward",
    ()=>stepViewAngleToward
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$wiper$2d$typography$2f$wiperConfig$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Development/Portfolio/mimesis/src/projects/wiper-typography/wiperConfig.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$wiper$2d$typography$2f$wiperMath$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Development/Portfolio/mimesis/src/projects/wiper-typography/wiperMath.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$wiper$2d$typography$2f$wiperTeslaDriverTuning$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Development/Portfolio/mimesis/src/projects/wiper-typography/wiperTeslaDriverTuning.ts [app-client] (ecmascript)");
;
;
;
const DRIVER_VIEW_FOV_WHEEL_SENSITIVITY = 0.02;
function addScaledVector3([x, y, z], [ax, ay, az], scalar) {
    return [
        x + ax * scalar,
        y + ay * scalar,
        z + az * scalar
    ];
}
function distanceBetween([ax, ay, az], [bx, by, bz]) {
    return Math.hypot(ax - bx, ay - by, az - bz);
}
function mapDragDeltaToViewAngle(origin, input) {
    const nextYaw = origin.yaw + input.deltaX / Math.max(1, input.width) * __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$wiper$2d$typography$2f$wiperConfig$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WIPER_VIEW_YAW_SENSITIVITY"];
    const nextPitch = origin.pitch - input.deltaY / Math.max(1, input.height) * __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$wiper$2d$typography$2f$wiperConfig$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WIPER_VIEW_PITCH_SENSITIVITY"];
    return {
        yaw: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$wiper$2d$typography$2f$wiperMath$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clamp"])(nextYaw, -__TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$wiper$2d$typography$2f$wiperConfig$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WIPER_MAX_VIEW_YAW"], __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$wiper$2d$typography$2f$wiperConfig$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WIPER_MAX_VIEW_YAW"]),
        pitch: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$wiper$2d$typography$2f$wiperMath$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clamp"])(nextPitch, -__TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$wiper$2d$typography$2f$wiperConfig$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WIPER_MAX_VIEW_PITCH"], __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$wiper$2d$typography$2f$wiperConfig$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WIPER_MAX_VIEW_PITCH"])
    };
}
function stepViewAngleToward(current, target, factor) {
    const clampedFactor = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$wiper$2d$typography$2f$wiperMath$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clamp"])(factor, 0, 1);
    return {
        yaw: current.yaw + (target.yaw - current.yaw) * clampedFactor,
        pitch: current.pitch + (target.pitch - current.pitch) * clampedFactor
    };
}
function mapWheelDeltaToDriverViewFov(currentFov, deltaY) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$wiper$2d$typography$2f$wiperTeslaDriverTuning$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clampTeslaDriverViewFov"])(currentFov + deltaY * DRIVER_VIEW_FOV_WHEEL_SENSITIVITY);
}
function applyDriverViewCameraOffset(layout, view) {
    const distance = distanceBetween(layout.cameraPosition, layout.lookAt);
    const position = addScaledVector3(addScaledVector3(layout.cameraPosition, layout.horizontalAxis, view.yaw * distance * 0.16), layout.verticalAxis, -view.pitch * distance * 0.08);
    const lookAt = addScaledVector3(addScaledVector3(layout.lookAt, layout.horizontalAxis, view.yaw * distance * 0.5), layout.verticalAxis, view.pitch * distance * 0.38);
    return {
        position,
        lookAt
    };
}
function computeWiperCameraPose({ view, phaseBias = {
    x: 0,
    y: 0
}, distance }) {
    return {
        position: [
            phaseBias.x + view.yaw * distance * 0.55,
            phaseBias.y - view.pitch * distance * 0.4,
            distance
        ],
        lookAt: [
            phaseBias.x + view.yaw * 0.45,
            phaseBias.y + view.pitch * 0.12,
            0
        ]
    };
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Development/Portfolio/mimesis/src/projects/wiper-typography/wiperInteractionState.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "beginDesktopCameraControlDrag",
    ()=>beginDesktopCameraControlDrag,
    "beginDesktopViewDrag",
    ()=>beginDesktopViewDrag,
    "createWiperInteractionState",
    ()=>createWiperInteractionState,
    "endDesktopViewDrag",
    ()=>endDesktopViewDrag,
    "handleDesktopHoverMove",
    ()=>handleDesktopHoverMove,
    "primeTouchPhaseDrag",
    ()=>primeTouchPhaseDrag,
    "updateDesktopViewDrag",
    ()=>updateDesktopViewDrag,
    "updateDesktopWheelZoom",
    ()=>updateDesktopWheelZoom,
    "updateTouchPhaseDrag",
    ()=>updateTouchPhaseDrag
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$wiper$2d$typography$2f$wiperMath$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Development/Portfolio/mimesis/src/projects/wiper-typography/wiperMath.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$wiper$2d$typography$2f$wiperView$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Development/Portfolio/mimesis/src/projects/wiper-typography/wiperView.ts [app-client] (ecmascript)");
;
;
function createWiperInteractionState(initialFov = null) {
    return {
        fov: initialFov,
        pointerTargetPhase: 0,
        frozenPhase: null,
        isDraggingView: false,
        dragStartX: 0,
        dragStartY: 0,
        dragStartView: {
            yaw: 0,
            pitch: 0
        },
        view: {
            yaw: 0,
            pitch: 0
        },
        isTouchDraggingPhase: false,
        touchDragStartX: 0,
        touchDragStartPhase: 0
    };
}
function handleDesktopHoverMove(state, input) {
    return {
        ...state,
        frozenPhase: null,
        pointerTargetPhase: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$wiper$2d$typography$2f$wiperMath$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mapPointerXToPhase"])(input.pointerX, input.width, input.margin)
    };
}
function beginDesktopCameraControlDrag(state, input) {
    return {
        ...state,
        frozenPhase: null,
        isDraggingView: true,
        dragStartX: input.pointerX,
        dragStartY: input.pointerY,
        dragStartView: state.view
    };
}
function beginDesktopViewDrag(state, input) {
    return {
        ...state,
        pointerTargetPhase: input.phase,
        frozenPhase: input.phase,
        isDraggingView: true,
        dragStartX: input.pointerX,
        dragStartY: input.pointerY,
        dragStartView: state.view
    };
}
function updateDesktopViewDrag(state, input) {
    if (!state.isDraggingView) {
        return state;
    }
    return {
        ...state,
        pointerTargetPhase: state.frozenPhase ?? state.pointerTargetPhase,
        view: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$wiper$2d$typography$2f$wiperView$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mapDragDeltaToViewAngle"])(state.dragStartView, {
            deltaX: input.pointerX - state.dragStartX,
            deltaY: input.pointerY - state.dragStartY,
            width: input.width,
            height: input.height
        })
    };
}
function endDesktopViewDrag(state) {
    return {
        ...state,
        frozenPhase: null,
        isDraggingView: false
    };
}
function updateDesktopWheelZoom(state, input) {
    return {
        ...state,
        fov: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$wiper$2d$typography$2f$wiperView$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mapWheelDeltaToDriverViewFov"])(input.fov, input.deltaY)
    };
}
function primeTouchPhaseDrag(state, input) {
    return {
        ...state,
        pointerTargetPhase: input.phase,
        isTouchDraggingPhase: true,
        touchDragStartX: input.pointerX,
        touchDragStartPhase: input.phase
    };
}
function updateTouchPhaseDrag(state, input) {
    if (!state.isTouchDraggingPhase) {
        return state;
    }
    return {
        ...state,
        pointerTargetPhase: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$wiper$2d$typography$2f$wiperMath$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mapPointerDragToPhase"])(input.pointerX, state.touchDragStartX, state.touchDragStartPhase, input.width, input.margin)
    };
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Development/Portfolio/mimesis/src/projects/wiper-typography/wiperPhase.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "stepIdlePhase",
    ()=>stepIdlePhase,
    "stepInteractivePhase",
    ()=>stepInteractivePhase,
    "syncAutoplayAngle",
    ()=>syncAutoplayAngle
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$wiper$2d$typography$2f$wiperMath$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Development/Portfolio/mimesis/src/projects/wiper-typography/wiperMath.ts [app-client] (ecmascript)");
;
function syncAutoplayAngle(phase) {
    return Math.asin((0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$wiper$2d$typography$2f$wiperMath$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clamp"])(phase, 0, 1));
}
function stepInteractivePhase(current, target, maxDelta) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$wiper$2d$typography$2f$wiperMath$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["stepPhaseToward"])(current, target, maxDelta);
}
function stepIdlePhase(autoPhaseAngle, speed) {
    const nextAngle = autoPhaseAngle + speed;
    return {
        autoPhaseAngle: nextAngle,
        phase: Math.abs(Math.sin(nextAngle))
    };
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Development/Portfolio/mimesis/src/projects/wiper-typography/useWiperInteraction.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useWiperInteraction",
    ()=>useWiperInteraction
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$reduced$2d$motion$2f$use$2d$reduced$2d$motion$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Development/Portfolio/mimesis/node_modules/framer-motion/dist/es/utils/reduced-motion/use-reduced-motion.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Development/Portfolio/mimesis/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$wiper$2d$typography$2f$wiperConfig$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Development/Portfolio/mimesis/src/projects/wiper-typography/wiperConfig.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$wiper$2d$typography$2f$wiperInteractionState$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Development/Portfolio/mimesis/src/projects/wiper-typography/wiperInteractionState.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$wiper$2d$typography$2f$wiperMath$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Development/Portfolio/mimesis/src/projects/wiper-typography/wiperMath.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$wiper$2d$typography$2f$wiperPhase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Development/Portfolio/mimesis/src/projects/wiper-typography/wiperPhase.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
function useWiperInteraction(options = {}) {
    _s();
    const { margin = __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$wiper$2d$typography$2f$wiperMath$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WIPER_MARGIN"], autoplaySpeed = __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$wiper$2d$typography$2f$wiperConfig$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WIPER_AUTOPLAY_SPEED"], maxDelta = __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$wiper$2d$typography$2f$wiperConfig$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WIPER_POINTER_PHASE_MAX_DELTA"], interactionMode = "legacy-phase", initialFov } = options;
    const prefersReducedMotion = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$reduced$2d$motion$2f$use$2d$reduced$2d$motion$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReducedMotion"])() ?? false;
    const containerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const dragLayerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const fovRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(initialFov ?? null);
    const phaseRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(0);
    const sizeRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])({
        width: 1,
        height: 1
    });
    const viewRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])({
        yaw: 0,
        pitch: 0,
        isDraggingView: false
    });
    const autoPhaseAngleRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(0);
    const pointerOnStageRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    const pointerTargetPhaseRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(0);
    const pointerDragStartXRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(0);
    const pointerDragStartPhaseRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(0);
    const pointerDragPrimedRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    const interactionStateRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$wiper$2d$typography$2f$wiperInteractionState$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createWiperInteractionState"])(initialFov ?? null));
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useWiperInteraction.useEffect": ()=>{
            const element = containerRef.current;
            if (!element) {
                return;
            }
            const updateSize = {
                "useWiperInteraction.useEffect.updateSize": ()=>{
                    const rect = element.getBoundingClientRect();
                    sizeRef.current = {
                        width: Math.max(1, rect.width),
                        height: Math.max(1, rect.height)
                    };
                }
            }["useWiperInteraction.useEffect.updateSize"];
            updateSize();
            const observer = new ResizeObserver(updateSize);
            observer.observe(element);
            return ({
                "useWiperInteraction.useEffect": ()=>{
                    observer.disconnect();
                }
            })["useWiperInteraction.useEffect"];
        }
    }["useWiperInteraction.useEffect"], []);
    const syncSizeFromElement = (element)=>{
        const fallbackElement = containerRef.current;
        const measuredElement = (element instanceof HTMLElement ? element : null) ?? fallbackElement;
        if (!measuredElement) {
            return sizeRef.current;
        }
        const rect = measuredElement.getBoundingClientRect();
        const nextSize = {
            width: Math.max(1, rect.width),
            height: Math.max(1, rect.height)
        };
        sizeRef.current = nextSize;
        return nextSize;
    };
    const syncInteractionState = (nextState)=>{
        interactionStateRef.current = nextState;
        pointerTargetPhaseRef.current = nextState.pointerTargetPhase;
        fovRef.current = nextState.fov;
        viewRef.current = {
            yaw: nextState.view.yaw,
            pitch: nextState.view.pitch,
            isDraggingView: nextState.isDraggingView
        };
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useWiperInteraction.useEffect": ()=>{
            if (interactionMode !== "driver-view-camera") {
                return;
            }
            const target = dragLayerRef.current ?? containerRef.current;
            if (!target) {
                return;
            }
            const handleWheel = {
                "useWiperInteraction.useEffect.handleWheel": (event)=>{
                    event.preventDefault();
                    syncInteractionState((0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$wiper$2d$typography$2f$wiperInteractionState$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["updateDesktopWheelZoom"])(interactionStateRef.current, {
                        deltaY: event.deltaY,
                        fov: fovRef.current ?? initialFov ?? 0
                    }));
                }
            }["useWiperInteraction.useEffect.handleWheel"];
            target.addEventListener("wheel", handleWheel, {
                passive: false
            });
            return ({
                "useWiperInteraction.useEffect": ()=>{
                    target.removeEventListener("wheel", handleWheel);
                }
            })["useWiperInteraction.useEffect"];
        }
    }["useWiperInteraction.useEffect"], [
        initialFov,
        interactionMode
    ]);
    const getPointerX = (clientX)=>{
        const rect = containerRef.current?.getBoundingClientRect();
        if (!rect) {
            return 0;
        }
        return clientX - rect.left;
    };
    const leavePointerMode = ()=>{
        pointerOnStageRef.current = false;
        pointerDragPrimedRef.current = false;
        autoPhaseAngleRef.current = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$wiper$2d$typography$2f$wiperPhase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["syncAutoplayAngle"])(phaseRef.current);
    };
    const onPointerEnter = ()=>{
        pointerOnStageRef.current = true;
        pointerTargetPhaseRef.current = phaseRef.current;
        pointerDragPrimedRef.current = false;
    };
    const onPointerMove = (event)=>{
        const measuredSize = syncSizeFromElement(event.currentTarget);
        const pointerX = getPointerX(event.clientX);
        const width = measuredSize.width;
        if (interactionMode === "driver-view-camera") {
            if (viewRef.current.isDraggingView) {
                syncInteractionState((0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$wiper$2d$typography$2f$wiperInteractionState$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["updateDesktopViewDrag"])(interactionStateRef.current, {
                    pointerX,
                    pointerY: event.clientY,
                    width,
                    height: measuredSize.height
                }));
            }
            return;
        }
        if (interactionMode === "desktop-view-drag") {
            if (event.pointerType === "touch") {
                syncInteractionState((0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$wiper$2d$typography$2f$wiperInteractionState$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["updateTouchPhaseDrag"])(interactionStateRef.current, {
                    pointerX,
                    width,
                    margin
                }));
                return;
            }
            if (viewRef.current.isDraggingView) {
                syncInteractionState((0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$wiper$2d$typography$2f$wiperInteractionState$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["updateDesktopViewDrag"])(interactionStateRef.current, {
                    pointerX,
                    pointerY: event.clientY,
                    width,
                    height: measuredSize.height
                }));
                return;
            }
            if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$wiper$2d$typography$2f$wiperMath$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isPointerInsideActiveRange"])(pointerX, width, margin)) {
                if (pointerOnStageRef.current) {
                    leavePointerMode();
                }
                return;
            }
            pointerOnStageRef.current = true;
            syncInteractionState((0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$wiper$2d$typography$2f$wiperInteractionState$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["handleDesktopHoverMove"])(interactionStateRef.current, {
                pointerX,
                width,
                margin
            }));
            return;
        }
        if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$wiper$2d$typography$2f$wiperMath$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isPointerInsideActiveRange"])(pointerX, width, margin)) {
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
        pointerTargetPhaseRef.current = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$wiper$2d$typography$2f$wiperMath$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mapPointerDragToPhase"])(pointerX, pointerDragStartXRef.current, pointerDragStartPhaseRef.current, width, margin);
    };
    const onPointerDown = (event)=>{
        const measuredSize = syncSizeFromElement(event.currentTarget);
        if (interactionMode === "driver-view-camera") {
            if (event.pointerType === "touch") {
                return;
            }
            syncInteractionState((0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$wiper$2d$typography$2f$wiperInteractionState$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["beginDesktopCameraControlDrag"])(interactionStateRef.current, {
                pointerX: getPointerX(event.clientX),
                pointerY: event.clientY
            }));
            event.currentTarget.setPointerCapture(event.pointerId);
            return;
        }
        if (interactionMode !== "desktop-view-drag") {
            return;
        }
        const pointerX = getPointerX(event.clientX);
        const width = measuredSize.width;
        if (event.pointerType === "touch") {
            pointerOnStageRef.current = true;
            syncInteractionState((0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$wiper$2d$typography$2f$wiperInteractionState$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["primeTouchPhaseDrag"])(interactionStateRef.current, {
                pointerX,
                phase: phaseRef.current
            }));
            event.currentTarget.setPointerCapture(event.pointerId);
            return;
        }
        if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$wiper$2d$typography$2f$wiperMath$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isPointerInsideActiveRange"])(pointerX, width, margin)) {
            return;
        }
        pointerOnStageRef.current = true;
        syncInteractionState((0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$wiper$2d$typography$2f$wiperInteractionState$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["beginDesktopViewDrag"])(interactionStateRef.current, {
            pointerX,
            pointerY: event.clientY,
            phase: phaseRef.current
        }));
        event.currentTarget.setPointerCapture(event.pointerId);
    };
    const onPointerUp = (event)=>{
        if (interactionMode === "driver-view-camera") {
            if (event.currentTarget.hasPointerCapture(event.pointerId)) {
                event.currentTarget.releasePointerCapture(event.pointerId);
            }
            if (viewRef.current.isDraggingView) {
                syncInteractionState((0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$wiper$2d$typography$2f$wiperInteractionState$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["endDesktopViewDrag"])(interactionStateRef.current));
            }
            return;
        }
        if (interactionMode !== "desktop-view-drag") {
            leavePointerMode();
            return;
        }
        if (event.currentTarget.hasPointerCapture(event.pointerId)) {
            event.currentTarget.releasePointerCapture(event.pointerId);
        }
        if (event.pointerType === "touch") {
            interactionStateRef.current = {
                ...interactionStateRef.current,
                isTouchDraggingPhase: false
            };
            leavePointerMode();
            return;
        }
        if (viewRef.current.isDraggingView) {
            syncInteractionState((0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$wiper$2d$typography$2f$wiperInteractionState$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["endDesktopViewDrag"])(interactionStateRef.current));
        }
    };
    const onPointerLeave = ()=>{
        if (interactionMode === "driver-view-camera") {
            return;
        }
        if (interactionMode === "desktop-view-drag" && viewRef.current.isDraggingView) {
            return;
        }
        leavePointerMode();
    };
    const onPointerCancel = (event)=>{
        if (interactionMode === "driver-view-camera") {
            if (viewRef.current.isDraggingView) {
                syncInteractionState((0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$wiper$2d$typography$2f$wiperInteractionState$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["endDesktopViewDrag"])(interactionStateRef.current));
            }
            if (event.currentTarget.hasPointerCapture(event.pointerId)) {
                event.currentTarget.releasePointerCapture(event.pointerId);
            }
            return;
        }
        if (interactionMode === "desktop-view-drag" && viewRef.current.isDraggingView) {
            syncInteractionState((0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$wiper$2d$typography$2f$wiperInteractionState$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["endDesktopViewDrag"])(interactionStateRef.current));
        }
        if (interactionMode === "desktop-view-drag" && event.currentTarget.hasPointerCapture(event.pointerId)) {
            event.currentTarget.releasePointerCapture(event.pointerId);
        }
        interactionStateRef.current = {
            ...interactionStateRef.current,
            isTouchDraggingPhase: false
        };
        leavePointerMode();
    };
    const onWheel = ()=>{};
    const tick = ()=>{
        if (interactionMode === "desktop-view-drag") {
            if (viewRef.current.isDraggingView) {
                return phaseRef.current;
            }
            if (pointerOnStageRef.current || interactionStateRef.current.isTouchDraggingPhase) {
                phaseRef.current = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$wiper$2d$typography$2f$wiperPhase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["stepInteractivePhase"])(phaseRef.current, pointerTargetPhaseRef.current, maxDelta);
                return phaseRef.current;
            }
        } else if (pointerOnStageRef.current) {
            phaseRef.current = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$wiper$2d$typography$2f$wiperPhase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["stepInteractivePhase"])(phaseRef.current, pointerTargetPhaseRef.current, maxDelta);
            return phaseRef.current;
        }
        const next = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$wiper$2d$typography$2f$wiperPhase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["stepIdlePhase"])(autoPhaseAngleRef.current, autoplaySpeed);
        autoPhaseAngleRef.current = next.autoPhaseAngle;
        phaseRef.current = next.phase;
        return phaseRef.current;
    };
    return {
        containerRef,
        dragLayerRef,
        fovRef,
        phaseRef,
        sizeRef,
        viewRef,
        reducedMotion: prefersReducedMotion,
        tick,
        dragLayerProps: {
            onPointerEnter,
            onPointerMove,
            onPointerDown,
            onPointerUp,
            onPointerLeave,
            onPointerCancel,
            onWheel
        }
    };
}
_s(useWiperInteraction, "RYI8DUItQrEAONgMBUEjna/VjzU=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$reduced$2d$motion$2f$use$2d$reduced$2d$motion$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReducedMotion"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Development/Portfolio/mimesis/src/projects/wiper-typography/WiperTypographyCanvas2D.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>WiperTypographyCanvas2D
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Development/Portfolio/mimesis/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Development/Portfolio/mimesis/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$wiper$2d$typography$2f$wiperConfig$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Development/Portfolio/mimesis/src/projects/wiper-typography/wiperConfig.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$wiper$2d$typography$2f$wiperSceneRenderer$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Development/Portfolio/mimesis/src/projects/wiper-typography/wiperSceneRenderer.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$wiper$2d$typography$2f$wiperSimulation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Development/Portfolio/mimesis/src/projects/wiper-typography/wiperSimulation.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$wiper$2d$typography$2f$WiperTypographyProject$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/Development/Portfolio/mimesis/src/projects/wiper-typography/WiperTypographyProject.module.css [app-client] (css module)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$wiper$2d$typography$2f$useWiperInteraction$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Development/Portfolio/mimesis/src/projects/wiper-typography/useWiperInteraction.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
function WiperTypographyCanvas2D({ projectId }) {
    _s();
    const canvasRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const { containerRef, dragLayerRef, dragLayerProps, phaseRef, sizeRef, tick } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$wiper$2d$typography$2f$useWiperInteraction$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWiperInteraction"])({
        interactionMode: "legacy-phase",
        margin: 0
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "WiperTypographyCanvas2D.useEffect": ()=>{
            const canvas = canvasRef.current;
            const container = containerRef.current;
            if (!canvas || !container) {
                return;
            }
            const context = canvas.getContext("2d");
            if (!context) {
                return;
            }
            let frame = 0;
            let width = 1;
            let height = 1;
            let dpr = 1;
            let scene = null;
            const buildScene = {
                "WiperTypographyCanvas2D.useEffect.buildScene": ()=>{
                    width = Math.max(1, sizeRef.current.width);
                    height = Math.max(1, sizeRef.current.height);
                    dpr = window.devicePixelRatio || 1;
                    canvas.width = Math.floor(width * dpr);
                    canvas.height = Math.floor(height * dpr);
                    canvas.style.width = `${width}px`;
                    canvas.style.height = `${height}px`;
                    context.setTransform(dpr, 0, 0, dpr, 0, 0);
                    scene = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$wiper$2d$typography$2f$wiperSimulation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createWiperSimulationState"])({
                        width,
                        height,
                        particleCount: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$wiper$2d$typography$2f$wiperSimulation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["detectWiperParticleCount"])(),
                        phase: phaseRef.current
                    });
                }
            }["WiperTypographyCanvas2D.useEffect.buildScene"];
            const ensureStage = {
                "WiperTypographyCanvas2D.useEffect.ensureStage": ()=>{
                    const { width: nextWidth, height: nextHeight } = sizeRef.current;
                    const nextDpr = window.devicePixelRatio || 1;
                    if (nextWidth !== width || nextHeight !== height || nextDpr !== dpr) {
                        buildScene();
                    }
                }
            }["WiperTypographyCanvas2D.useEffect.ensureStage"];
            const tickFrame = {
                "WiperTypographyCanvas2D.useEffect.tickFrame": ()=>{
                    ensureStage();
                    const phase = tick();
                    if (scene === null) {
                        buildScene();
                    }
                    if (scene === null) {
                        frame = window.requestAnimationFrame(tickFrame);
                        return;
                    }
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$wiper$2d$typography$2f$wiperSimulation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["stepWiperSimulationState"])(scene, phase);
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$wiper$2d$typography$2f$wiperSceneRenderer$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["drawWiperScene"])(context, scene, {
                        backgroundColor: __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$wiper$2d$typography$2f$wiperConfig$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WIPER_BACKGROUND_COLOR"]
                    });
                    frame = window.requestAnimationFrame(tickFrame);
                }
            }["WiperTypographyCanvas2D.useEffect.tickFrame"];
            buildScene();
            frame = window.requestAnimationFrame(tickFrame);
            return ({
                "WiperTypographyCanvas2D.useEffect": ()=>{
                    window.cancelAnimationFrame(frame);
                }
            })["WiperTypographyCanvas2D.useEffect"];
        }
    }["WiperTypographyCanvas2D.useEffect"], [
        containerRef,
        phaseRef,
        sizeRef,
        tick
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$wiper$2d$typography$2f$WiperTypographyProject$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].wrapper,
        "data-project-id": projectId,
        ref: containerRef,
        role: "img",
        "aria-label": "Interactive wiper typography simulation",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("canvas", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$wiper$2d$typography$2f$WiperTypographyProject$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].canvas,
                ref: canvasRef
            }, void 0, false, {
                fileName: "[project]/Development/Portfolio/mimesis/src/projects/wiper-typography/WiperTypographyCanvas2D.tsx",
                lineNumber: 104,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$wiper$2d$typography$2f$WiperTypographyProject$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].dragLayer,
                ref: dragLayerRef,
                ...dragLayerProps
            }, void 0, false, {
                fileName: "[project]/Development/Portfolio/mimesis/src/projects/wiper-typography/WiperTypographyCanvas2D.tsx",
                lineNumber: 105,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Development/Portfolio/mimesis/src/projects/wiper-typography/WiperTypographyCanvas2D.tsx",
        lineNumber: 97,
        columnNumber: 5
    }, this);
}
_s(WiperTypographyCanvas2D, "fqPjF4qcIAzVJlMl9cwk/VPPCA4=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$wiper$2d$typography$2f$useWiperInteraction$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWiperInteraction"]
    ];
});
_c = WiperTypographyCanvas2D;
var _c;
__turbopack_context__.k.register(_c, "WiperTypographyCanvas2D");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Development/Portfolio/mimesis/src/projects/wiper-typography/WiperTypographyModeToggle.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>WiperTypographyModeToggle
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Development/Portfolio/mimesis/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$wiper$2d$typography$2f$WiperTypographyProject$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/Development/Portfolio/mimesis/src/projects/wiper-typography/WiperTypographyProject.module.css [app-client] (css module)");
"use client";
;
;
const MODE_OPTIONS = [
    {
        id: "2d",
        label: "2D Canvas"
    },
    {
        id: "3d-driver",
        label: "3D Driver View"
    }
];
function WiperTypographyModeToggle({ activeMode, onChange }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$wiper$2d$typography$2f$WiperTypographyProject$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].modeToggle,
        children: MODE_OPTIONS.map((option)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                className: `${__TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$wiper$2d$typography$2f$WiperTypographyProject$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].modeButton} ${activeMode === option.id ? __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$wiper$2d$typography$2f$WiperTypographyProject$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].modeButtonActive : ""}`,
                "data-mode": option.id,
                onClick: ()=>onChange(option.id),
                type: "button",
                children: option.label
            }, option.id, false, {
                fileName: "[project]/Development/Portfolio/mimesis/src/projects/wiper-typography/WiperTypographyModeToggle.tsx",
                lineNumber: 27,
                columnNumber: 9
            }, this))
    }, void 0, false, {
        fileName: "[project]/Development/Portfolio/mimesis/src/projects/wiper-typography/WiperTypographyModeToggle.tsx",
        lineNumber: 25,
        columnNumber: 5
    }, this);
}
_c = WiperTypographyModeToggle;
var _c;
__turbopack_context__.k.register(_c, "WiperTypographyModeToggle");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Development/Portfolio/mimesis/src/projects/wiper-typography/WiperTypographyProject.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>WiperTypographyProject
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Development/Portfolio/mimesis/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Development/Portfolio/mimesis/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$wiper$2d$typography$2f$WiperTypographyCanvas2D$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Development/Portfolio/mimesis/src/projects/wiper-typography/WiperTypographyCanvas2D.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$wiper$2d$typography$2f$WiperTypographyModeToggle$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Development/Portfolio/mimesis/src/projects/wiper-typography/WiperTypographyModeToggle.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$wiper$2d$typography$2f$WiperTypographyProject$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/Development/Portfolio/mimesis/src/projects/wiper-typography/WiperTypographyProject.module.css [app-client] (css module)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
function WiperTypographyProject({ projectId, onViewStateChange }) {
    _s();
    const [mode, setMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("2d");
    const [driverView3D, setDriverView3D] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "WiperTypographyProject.useEffect": ()=>{
            onViewStateChange?.({
                renderMode: mode
            });
        }
    }["WiperTypographyProject.useEffect"], [
        mode,
        onViewStateChange
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "WiperTypographyProject.useEffect": ()=>{
            if (mode !== "3d-driver" || driverView3D) {
                return;
            }
            let cancelled = false;
            void __turbopack_context__.A("[project]/Development/Portfolio/mimesis/src/projects/wiper-typography/WiperTypographyDriverView3D.tsx [app-client] (ecmascript, async loader)").then({
                "WiperTypographyProject.useEffect": ({ default: Component })=>{
                    if (!cancelled) {
                        setDriverView3D({
                            "WiperTypographyProject.useEffect": ()=>Component
                        }["WiperTypographyProject.useEffect"]);
                    }
                }
            }["WiperTypographyProject.useEffect"]);
            return ({
                "WiperTypographyProject.useEffect": ()=>{
                    cancelled = true;
                }
            })["WiperTypographyProject.useEffect"];
        }
    }["WiperTypographyProject.useEffect"], [
        driverView3D,
        mode
    ]);
    const ActiveMode = mode === "2d" ? __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$wiper$2d$typography$2f$WiperTypographyCanvas2D$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"] : driverView3D;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$wiper$2d$typography$2f$WiperTypographyProject$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].interactivePane,
        "data-project-id": projectId,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$wiper$2d$typography$2f$WiperTypographyModeToggle$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                activeMode: mode,
                onChange: setMode
            }, void 0, false, {
                fileName: "[project]/Development/Portfolio/mimesis/src/projects/wiper-typography/WiperTypographyProject.tsx",
                lineNumber: 47,
                columnNumber: 7
            }, this),
            ActiveMode ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ActiveMode, {
                projectId: projectId,
                onViewStateChange: onViewStateChange
            }, void 0, false, {
                fileName: "[project]/Development/Portfolio/mimesis/src/projects/wiper-typography/WiperTypographyProject.tsx",
                lineNumber: 49,
                columnNumber: 9
            }, this) : null
        ]
    }, void 0, true, {
        fileName: "[project]/Development/Portfolio/mimesis/src/projects/wiper-typography/WiperTypographyProject.tsx",
        lineNumber: 46,
        columnNumber: 5
    }, this);
}
_s(WiperTypographyProject, "fqnDkxEczfPBqtyXo9ts+lJxhqI=");
_c = WiperTypographyProject;
var _c;
__turbopack_context__.k.register(_c, "WiperTypographyProject");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Development/Portfolio/mimesis/src/projects/registry.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "interactiveProjectRegistry",
    ()=>interactiveProjectRegistry
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Development/Portfolio/mimesis/node_modules/next/dist/shared/lib/app-dynamic.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$wiper$2d$typography$2f$WiperTypographyProject$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Development/Portfolio/mimesis/src/projects/wiper-typography/WiperTypographyProject.tsx [app-client] (ecmascript)");
;
;
;
;
;
const PageCurlProject = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(_c = ()=>__turbopack_context__.A("[project]/Development/Portfolio/mimesis/src/projects/page-curl/PageCurlProject.tsx [app-client] (ecmascript, next/dynamic entry, async loader)"), {
    loadableGenerated: {
        modules: [
            "[project]/Development/Portfolio/mimesis/src/projects/page-curl/PageCurlProject.tsx [app-client] (ecmascript, next/dynamic entry)"
        ]
    },
    loading: ()=>null
});
_c1 = PageCurlProject;
const BwCircleProject = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(_c2 = ()=>__turbopack_context__.A("[project]/Development/Portfolio/mimesis/src/projects/bw-circle/BwCircleProject.tsx [app-client] (ecmascript, next/dynamic entry, async loader)"), {
    loadableGenerated: {
        modules: [
            "[project]/Development/Portfolio/mimesis/src/projects/bw-circle/BwCircleProject.tsx [app-client] (ecmascript, next/dynamic entry)"
        ]
    },
    loading: ()=>null
});
_c3 = BwCircleProject;
const StaggeredTextProject = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(_c4 = ()=>__turbopack_context__.A("[project]/Development/Portfolio/mimesis/src/projects/staggered-text/StaggeredTextProject.tsx [app-client] (ecmascript, next/dynamic entry, async loader)"), {
    loadableGenerated: {
        modules: [
            "[project]/Development/Portfolio/mimesis/src/projects/staggered-text/StaggeredTextProject.tsx [app-client] (ecmascript, next/dynamic entry)"
        ]
    },
    loading: ()=>null
});
_c5 = StaggeredTextProject;
const interactiveProjectRegistry = {
    "bw-circle": BwCircleProject,
    "page-curl": PageCurlProject,
    "staggered-text": StaggeredTextProject,
    "wiper-typography": __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$wiper$2d$typography$2f$WiperTypographyProject$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
};
var _c, _c1, _c2, _c3, _c4, _c5;
__turbopack_context__.k.register(_c, "PageCurlProject$dynamic");
__turbopack_context__.k.register(_c1, "PageCurlProject");
__turbopack_context__.k.register(_c2, "BwCircleProject$dynamic");
__turbopack_context__.k.register(_c3, "BwCircleProject");
__turbopack_context__.k.register(_c4, "StaggeredTextProject$dynamic");
__turbopack_context__.k.register(_c5, "StaggeredTextProject");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Development/Portfolio/mimesis/src/app/project/[id]/ProjectDetail.module.css [app-client] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "backButton": "ProjectDetail-module__Z-ysEa__backButton",
  "container": "ProjectDetail-module__Z-ysEa__container",
  "description": "ProjectDetail-module__Z-ysEa__description",
  "iframeContainer": "ProjectDetail-module__Z-ysEa__iframeContainer",
  "image": "ProjectDetail-module__Z-ysEa__image",
  "imageContainer": "ProjectDetail-module__Z-ysEa__imageContainer",
  "info": "ProjectDetail-module__Z-ysEa__info",
  "label": "ProjectDetail-module__Z-ysEa__label",
  "pane": "ProjectDetail-module__Z-ysEa__pane",
  "paneHeader": "ProjectDetail-module__Z-ysEa__paneHeader",
  "referenceCard": "ProjectDetail-module__Z-ysEa__referenceCard",
  "referenceCardBody": "ProjectDetail-module__Z-ysEa__referenceCardBody",
  "referenceCardDescription": "ProjectDetail-module__Z-ysEa__referenceCardDescription",
  "referenceCardImage": "ProjectDetail-module__Z-ysEa__referenceCardImage",
  "referenceCardImageWrap": "ProjectDetail-module__Z-ysEa__referenceCardImageWrap",
  "referenceCardLink": "ProjectDetail-module__Z-ysEa__referenceCardLink",
  "referenceCardTitle": "ProjectDetail-module__Z-ysEa__referenceCardTitle",
  "referenceIframe": "ProjectDetail-module__Z-ysEa__referenceIframe",
  "referenceLink": "ProjectDetail-module__Z-ysEa__referenceLink",
  "referenceMeta": "ProjectDetail-module__Z-ysEa__referenceMeta",
  "referencePlatformLabel": "ProjectDetail-module__Z-ysEa__referencePlatformLabel",
  "splitLayout": "ProjectDetail-module__Z-ysEa__splitLayout",
  "threadsEmbedMarkup": "ProjectDetail-module__Z-ysEa__threadsEmbedMarkup",
  "threadsEmbedShell": "ProjectDetail-module__Z-ysEa__threadsEmbedShell",
  "title": "ProjectDetail-module__Z-ysEa__title",
});
}),
"[project]/Development/Portfolio/mimesis/src/app/project/[id]/ThreadsReferenceEmbed.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ThreadsReferenceEmbed
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Development/Portfolio/mimesis/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Development/Portfolio/mimesis/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$app$2f$project$2f5b$id$5d2f$ProjectDetail$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/Development/Portfolio/mimesis/src/app/project/[id]/ProjectDetail.module.css [app-client] (css module)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
let threadsEmbedScriptPromise = null;
function ensureThreadsEmbedScript() {
    if (window.instgrm?.Embeds?.process) {
        return Promise.resolve();
    }
    if (threadsEmbedScriptPromise) {
        return threadsEmbedScriptPromise;
    }
    threadsEmbedScriptPromise = new Promise((resolve, reject)=>{
        const existingScript = document.querySelector('script[src="https://www.threads.com/embed.js"]');
        const handleLoad = ()=>resolve();
        const handleError = ()=>reject(new Error("Threads embed script failed to load."));
        if (existingScript) {
            existingScript.addEventListener("load", handleLoad, {
                once: true
            });
            existingScript.addEventListener("error", handleError, {
                once: true
            });
            return;
        }
        const script = document.createElement("script");
        script.src = "https://www.threads.com/embed.js";
        script.async = true;
        script.addEventListener("load", handleLoad, {
            once: true
        });
        script.addEventListener("error", handleError, {
            once: true
        });
        document.head.appendChild(script);
    }).catch((error)=>{
        threadsEmbedScriptPromise = null;
        throw error;
    });
    return threadsEmbedScriptPromise;
}
function stripEmbedScriptTag(html) {
    return html.replace(/<script[\s\S]*?<\/script>/gi, "").trim();
}
function ThreadsReferenceEmbed({ fallback, url }) {
    _s();
    const [resolvedEmbed, setResolvedEmbed] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        html: null,
        url: null
    });
    const oembedUrl = `https://graph.threads.net/oembed?url=${encodeURIComponent(url)}`;
    const html = resolvedEmbed.url === url ? resolvedEmbed.html : null;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ThreadsReferenceEmbed.useEffect": ()=>{
            let cancelled = false;
            fetch(oembedUrl).then({
                "ThreadsReferenceEmbed.useEffect": async (response)=>{
                    if (!response.ok) {
                        return null;
                    }
                    const payload = await response.json();
                    return payload.html ? stripEmbedScriptTag(payload.html) : null;
                }
            }["ThreadsReferenceEmbed.useEffect"]).then({
                "ThreadsReferenceEmbed.useEffect": (nextHtml)=>{
                    if (cancelled || !nextHtml) {
                        return;
                    }
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["startTransition"])({
                        "ThreadsReferenceEmbed.useEffect": ()=>{
                            setResolvedEmbed({
                                html: nextHtml,
                                url
                            });
                        }
                    }["ThreadsReferenceEmbed.useEffect"]);
                }
            }["ThreadsReferenceEmbed.useEffect"]).catch({
                "ThreadsReferenceEmbed.useEffect": ()=>{
                // Keep the fallback card visible when oEmbed is unavailable.
                }
            }["ThreadsReferenceEmbed.useEffect"]);
            return ({
                "ThreadsReferenceEmbed.useEffect": ()=>{
                    cancelled = true;
                }
            })["ThreadsReferenceEmbed.useEffect"];
        }
    }["ThreadsReferenceEmbed.useEffect"], [
        oembedUrl,
        url
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ThreadsReferenceEmbed.useEffect": ()=>{
            if (!html) {
                return;
            }
            let cancelled = false;
            ensureThreadsEmbedScript().then({
                "ThreadsReferenceEmbed.useEffect": ()=>{
                    if (cancelled) {
                        return;
                    }
                    window.instgrm?.Embeds?.process?.();
                }
            }["ThreadsReferenceEmbed.useEffect"]).catch({
                "ThreadsReferenceEmbed.useEffect": ()=>{
                // The fallback path already handled fetch failures; a script failure leaves
                // the lightweight blockquote visible instead of breaking the pane.
                }
            }["ThreadsReferenceEmbed.useEffect"]);
            return ({
                "ThreadsReferenceEmbed.useEffect": ()=>{
                    cancelled = true;
                }
            })["ThreadsReferenceEmbed.useEffect"];
        }
    }["ThreadsReferenceEmbed.useEffect"], [
        html
    ]);
    if (!html) {
        return fallback;
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$app$2f$project$2f5b$id$5d2f$ProjectDetail$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].threadsEmbedShell,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$app$2f$project$2f5b$id$5d2f$ProjectDetail$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].threadsEmbedMarkup,
            dangerouslySetInnerHTML: {
                __html: html
            }
        }, void 0, false, {
            fileName: "[project]/Development/Portfolio/mimesis/src/app/project/[id]/ThreadsReferenceEmbed.tsx",
            lineNumber: 150,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/Development/Portfolio/mimesis/src/app/project/[id]/ThreadsReferenceEmbed.tsx",
        lineNumber: 149,
        columnNumber: 5
    }, this);
}
_s(ThreadsReferenceEmbed, "ncRuFkH5gG6ZHUgXBRK03BXtzks=");
_c = ThreadsReferenceEmbed;
var _c;
__turbopack_context__.k.register(_c, "ThreadsReferenceEmbed");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Development/Portfolio/mimesis/src/app/project/[id]/XPostReferenceEmbed.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>XPostReferenceEmbed
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Development/Portfolio/mimesis/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Development/Portfolio/mimesis/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$app$2f$project$2f5b$id$5d2f$ProjectDetail$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/Development/Portfolio/mimesis/src/app/project/[id]/ProjectDetail.module.css [app-client] (css module)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
const X_WIDGETS_SCRIPT_SRC = "https://platform.twitter.com/widgets.js";
let xEmbedScriptPromise = null;
function ensureXEmbedScript() {
    if (window.twttr?.widgets?.load) {
        return Promise.resolve();
    }
    const existingScript = document.querySelector(`script[src="${X_WIDGETS_SCRIPT_SRC}"]`);
    if (xEmbedScriptPromise && existingScript) {
        return xEmbedScriptPromise;
    }
    if (xEmbedScriptPromise && !existingScript) {
        xEmbedScriptPromise = null;
    }
    xEmbedScriptPromise = new Promise((resolve, reject)=>{
        const script = existingScript ?? document.createElement("script");
        const handleLoad = ()=>{
            script.dataset.loaded = "true";
            resolve();
        };
        const handleError = ()=>reject(new Error("X widget script failed to load."));
        if (script.dataset.loaded === "true") {
            resolve();
            return;
        }
        script.addEventListener("load", handleLoad, {
            once: true
        });
        script.addEventListener("error", handleError, {
            once: true
        });
        if (!existingScript) {
            script.src = X_WIDGETS_SCRIPT_SRC;
            script.async = true;
            script.charset = "utf-8";
            document.head.appendChild(script);
        }
    }).catch((error)=>{
        xEmbedScriptPromise = null;
        throw error;
    });
    return xEmbedScriptPromise;
}
function XPostReferenceEmbed({ fallback }) {
    _s();
    const embedRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [scriptFailed, setScriptFailed] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "XPostReferenceEmbed.useEffect": ()=>{
            let cancelled = false;
            ensureXEmbedScript().then({
                "XPostReferenceEmbed.useEffect": ()=>{
                    if (cancelled) {
                        return;
                    }
                    if (!window.twttr?.widgets?.load) {
                        setScriptFailed(true);
                        return;
                    }
                    window.twttr.widgets.load?.(embedRef.current);
                }
            }["XPostReferenceEmbed.useEffect"]).catch({
                "XPostReferenceEmbed.useEffect": ()=>{
                    if (!cancelled) {
                        setScriptFailed(true);
                    }
                }
            }["XPostReferenceEmbed.useEffect"]);
            return ({
                "XPostReferenceEmbed.useEffect": ()=>{
                    cancelled = true;
                }
            })["XPostReferenceEmbed.useEffect"];
        }
    }["XPostReferenceEmbed.useEffect"], []);
    if (scriptFailed) {
        return fallback;
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$app$2f$project$2f5b$id$5d2f$ProjectDetail$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].threadsEmbedShell,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            ref: embedRef,
            className: __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$app$2f$project$2f5b$id$5d2f$ProjectDetail$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].threadsEmbedMarkup,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("blockquote", {
                className: "twitter-tweet",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        lang: "en",
                        dir: "ltr",
                        children: [
                            "Staggered text hover effect",
                            " ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                href: "https://t.co/vpKBaD5sa6",
                                children: "pic.twitter.com/vpKBaD5sa6"
                            }, void 0, false, {
                                fileName: "[project]/Development/Portfolio/mimesis/src/app/project/[id]/XPostReferenceEmbed.tsx",
                                lineNumber: 115,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Development/Portfolio/mimesis/src/app/project/[id]/XPostReferenceEmbed.tsx",
                        lineNumber: 113,
                        columnNumber: 11
                    }, this),
                    "— rauno (@raunofreiberg)",
                    " ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                        href: "https://twitter.com/raunofreiberg/status/1826969932099104959?ref_src=twsrc%5Etfw",
                        children: "August 23, 2024"
                    }, void 0, false, {
                        fileName: "[project]/Development/Portfolio/mimesis/src/app/project/[id]/XPostReferenceEmbed.tsx",
                        lineNumber: 118,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Development/Portfolio/mimesis/src/app/project/[id]/XPostReferenceEmbed.tsx",
                lineNumber: 112,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/Development/Portfolio/mimesis/src/app/project/[id]/XPostReferenceEmbed.tsx",
            lineNumber: 111,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/Development/Portfolio/mimesis/src/app/project/[id]/XPostReferenceEmbed.tsx",
        lineNumber: 110,
        columnNumber: 5
    }, this);
}
_s(XPostReferenceEmbed, "9WaymxNbgjg4ph/q1mY5pPLEUcM=");
_c = XPostReferenceEmbed;
var _c;
__turbopack_context__.k.register(_c, "XPostReferenceEmbed");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Development/Portfolio/mimesis/src/app/project/[id]/ProjectReferenceContent.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ProjectReferenceContent
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Development/Portfolio/mimesis/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Development/Portfolio/mimesis/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$app$2f$project$2f5b$id$5d2f$ThreadsReferenceEmbed$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Development/Portfolio/mimesis/src/app/project/[id]/ThreadsReferenceEmbed.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$app$2f$project$2f5b$id$5d2f$XPostReferenceEmbed$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Development/Portfolio/mimesis/src/app/project/[id]/XPostReferenceEmbed.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$app$2f$project$2f5b$id$5d2f$ProjectDetail$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/Development/Portfolio/mimesis/src/app/project/[id]/ProjectDetail.module.css [app-client] (css module)");
;
;
;
;
;
function getReferencePlatformLabel(platform) {
    if (platform === "x") {
        return "X";
    }
    return "Threads";
}
function renderReferencePreviewCard(project) {
    if (!project.referencePreview) {
        return null;
    }
    const platformLabel = getReferencePlatformLabel(project.referencePreview.platform);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$app$2f$project$2f5b$id$5d2f$ProjectDetail$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].referenceCard,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$app$2f$project$2f5b$id$5d2f$ProjectDetail$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].referenceCardImageWrap,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    src: project.referencePreview.image,
                    alt: `${project.title} reference preview`,
                    fill: true,
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$app$2f$project$2f5b$id$5d2f$ProjectDetail$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].referenceCardImage,
                    sizes: "(max-width: 1024px) 100vw, 50vw",
                    priority: true
                }, void 0, false, {
                    fileName: "[project]/Development/Portfolio/mimesis/src/app/project/[id]/ProjectReferenceContent.tsx",
                    lineNumber: 25,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/Development/Portfolio/mimesis/src/app/project/[id]/ProjectReferenceContent.tsx",
                lineNumber: 24,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$app$2f$project$2f5b$id$5d2f$ProjectDetail$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].referenceCardBody,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$app$2f$project$2f5b$id$5d2f$ProjectDetail$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].referencePlatformLabel,
                        children: platformLabel
                    }, void 0, false, {
                        fileName: "[project]/Development/Portfolio/mimesis/src/app/project/[id]/ProjectReferenceContent.tsx",
                        lineNumber: 35,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$app$2f$project$2f5b$id$5d2f$ProjectDetail$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].referenceCardTitle,
                        children: project.referencePreview.title
                    }, void 0, false, {
                        fileName: "[project]/Development/Portfolio/mimesis/src/app/project/[id]/ProjectReferenceContent.tsx",
                        lineNumber: 36,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$app$2f$project$2f5b$id$5d2f$ProjectDetail$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].referenceCardDescription,
                        children: project.referencePreview.description
                    }, void 0, false, {
                        fileName: "[project]/Development/Portfolio/mimesis/src/app/project/[id]/ProjectReferenceContent.tsx",
                        lineNumber: 39,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                        href: project.referencePreview.url,
                        target: "_blank",
                        rel: "noopener noreferrer",
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$app$2f$project$2f5b$id$5d2f$ProjectDetail$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].referenceCardLink,
                        children: `Open on ${platformLabel}`
                    }, void 0, false, {
                        fileName: "[project]/Development/Portfolio/mimesis/src/app/project/[id]/ProjectReferenceContent.tsx",
                        lineNumber: 42,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Development/Portfolio/mimesis/src/app/project/[id]/ProjectReferenceContent.tsx",
                lineNumber: 34,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Development/Portfolio/mimesis/src/app/project/[id]/ProjectReferenceContent.tsx",
        lineNumber: 23,
        columnNumber: 5
    }, this);
}
function ProjectReferenceContent({ project }) {
    if (project.referencePreview) {
        const fallback = renderReferencePreviewCard(project);
        if (project.id === "staggered-text" && fallback) {
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$app$2f$project$2f5b$id$5d2f$XPostReferenceEmbed$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                fallback: fallback
            }, void 0, false, {
                fileName: "[project]/Development/Portfolio/mimesis/src/app/project/[id]/ProjectReferenceContent.tsx",
                lineNumber: 64,
                columnNumber: 14
            }, this);
        }
        if (project.referencePreview.platform === "threads" && project.referencePreview.embed === "official" && fallback) {
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$app$2f$project$2f5b$id$5d2f$ThreadsReferenceEmbed$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                url: project.referencePreview.url,
                fallback: fallback
            }, void 0, false, {
                fileName: "[project]/Development/Portfolio/mimesis/src/app/project/[id]/ProjectReferenceContent.tsx",
                lineNumber: 73,
                columnNumber: 9
            }, this);
        }
        return fallback;
    }
    if (project.referenceEmbed) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$app$2f$project$2f5b$id$5d2f$ProjectDetail$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].iframeContainer,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("iframe", {
                src: project.referenceEmbed,
                height: "877",
                width: "504",
                frameBorder: "0",
                allowFullScreen: true,
                title: "Original reference",
                className: __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$app$2f$project$2f5b$id$5d2f$ProjectDetail$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].referenceIframe
            }, void 0, false, {
                fileName: "[project]/Development/Portfolio/mimesis/src/app/project/[id]/ProjectReferenceContent.tsx",
                lineNumber: 86,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/Development/Portfolio/mimesis/src/app/project/[id]/ProjectReferenceContent.tsx",
            lineNumber: 85,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$app$2f$project$2f5b$id$5d2f$ProjectDetail$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].imageContainer,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            src: project.originalImage,
            alt: `${project.title} — original reference`,
            fill: true,
            className: __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$app$2f$project$2f5b$id$5d2f$ProjectDetail$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].image,
            sizes: "(max-width: 1024px) 100vw, 50vw",
            priority: true
        }, void 0, false, {
            fileName: "[project]/Development/Portfolio/mimesis/src/app/project/[id]/ProjectReferenceContent.tsx",
            lineNumber: 101,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/Development/Portfolio/mimesis/src/app/project/[id]/ProjectReferenceContent.tsx",
        lineNumber: 100,
        columnNumber: 5
    }, this);
}
_c = ProjectReferenceContent;
var _c;
__turbopack_context__.k.register(_c, "ProjectReferenceContent");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Development/Portfolio/mimesis/src/app/project/[id]/ProjectDetailClient.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ProjectDetailClient
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Development/Portfolio/mimesis/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$registry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Development/Portfolio/mimesis/src/projects/registry.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Development/Portfolio/mimesis/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$reduced$2d$motion$2f$use$2d$reduced$2d$motion$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Development/Portfolio/mimesis/node_modules/framer-motion/dist/es/utils/reduced-motion/use-reduced-motion.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__ = __turbopack_context__.i("[project]/Development/Portfolio/mimesis/node_modules/lucide-react/dist/esm/icons/arrow-left.js [app-client] (ecmascript) <export default as ArrowLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Development/Portfolio/mimesis/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Development/Portfolio/mimesis/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Development/Portfolio/mimesis/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$app$2f$project$2f5b$id$5d2f$ProjectDetail$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/Development/Portfolio/mimesis/src/app/project/[id]/ProjectDetail.module.css [app-client] (css module)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$app$2f$project$2f5b$id$5d2f$ProjectReferenceContent$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Development/Portfolio/mimesis/src/app/project/[id]/ProjectReferenceContent.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
;
function ProjectDetailClient({ project }) {
    _s();
    const shouldReduceMotion = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$reduced$2d$motion$2f$use$2d$reduced$2d$motion$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReducedMotion"])();
    const [interactiveRenderMode, setInteractiveRenderMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("2d");
    const InteractiveProject = project.interactiveDemo ? __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$registry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["interactiveProjectRegistry"][project.interactiveDemo] : undefined;
    const showWiperModelSource = project.id === "wiper-typography" && interactiveRenderMode === "3d-driver";
    const ease = [
        0.16,
        1,
        0.3,
        1
    ];
    const motionProps = (xOffset, delay = 0)=>shouldReduceMotion ? {} : {
            initial: {
                opacity: 0,
                x: xOffset
            },
            animate: {
                opacity: 1,
                x: 0
            },
            transition: {
                duration: 0.6,
                ease,
                delay
            }
        };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$app$2f$project$2f5b$id$5d2f$ProjectDetail$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].container,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                href: "/",
                className: __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$app$2f$project$2f5b$id$5d2f$ProjectDetail$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].backButton,
                "aria-label": "Back to Projects",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__["ArrowLeft"], {
                        size: 18,
                        "aria-hidden": "true"
                    }, void 0, false, {
                        fileName: "[project]/Development/Portfolio/mimesis/src/app/project/[id]/ProjectDetailClient.tsx",
                        lineNumber: 41,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: "Back to Projects"
                    }, void 0, false, {
                        fileName: "[project]/Development/Portfolio/mimesis/src/app/project/[id]/ProjectDetailClient.tsx",
                        lineNumber: 42,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Development/Portfolio/mimesis/src/app/project/[id]/ProjectDetailClient.tsx",
                lineNumber: 36,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$app$2f$project$2f5b$id$5d2f$ProjectDetail$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].splitLayout,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$app$2f$project$2f5b$id$5d2f$ProjectDetail$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].pane,
                        ...motionProps(-30),
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$app$2f$project$2f5b$id$5d2f$ProjectDetail$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].paneHeader,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$app$2f$project$2f5b$id$5d2f$ProjectDetail$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].label,
                                    children: "My Mimesis"
                                }, void 0, false, {
                                    fileName: "[project]/Development/Portfolio/mimesis/src/app/project/[id]/ProjectDetailClient.tsx",
                                    lineNumber: 49,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/Development/Portfolio/mimesis/src/app/project/[id]/ProjectDetailClient.tsx",
                                lineNumber: 48,
                                columnNumber: 11
                            }, this),
                            project.interactive ? InteractiveProject ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(InteractiveProject, {
                                projectId: project.id,
                                onViewStateChange: (state)=>{
                                    if (typeof state.renderMode === "string") {
                                        setInteractiveRenderMode(state.renderMode);
                                    }
                                }
                            }, void 0, false, {
                                fileName: "[project]/Development/Portfolio/mimesis/src/app/project/[id]/ProjectDetailClient.tsx",
                                lineNumber: 53,
                                columnNumber: 15
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$app$2f$project$2f5b$id$5d2f$ProjectDetail$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].imageContainer,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    src: project.imitationImage,
                                    alt: `${project.title} — imitation recreation`,
                                    fill: true,
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$app$2f$project$2f5b$id$5d2f$ProjectDetail$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].image,
                                    sizes: "(max-width: 1024px) 100vw, 50vw",
                                    priority: true
                                }, void 0, false, {
                                    fileName: "[project]/Development/Portfolio/mimesis/src/app/project/[id]/ProjectDetailClient.tsx",
                                    lineNumber: 63,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/Development/Portfolio/mimesis/src/app/project/[id]/ProjectDetailClient.tsx",
                                lineNumber: 62,
                                columnNumber: 15
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$app$2f$project$2f5b$id$5d2f$ProjectDetail$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].imageContainer,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    src: project.imitationImage,
                                    alt: `${project.title} — imitation recreation`,
                                    fill: true,
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$app$2f$project$2f5b$id$5d2f$ProjectDetail$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].image,
                                    sizes: "(max-width: 1024px) 100vw, 50vw",
                                    priority: true
                                }, void 0, false, {
                                    fileName: "[project]/Development/Portfolio/mimesis/src/app/project/[id]/ProjectDetailClient.tsx",
                                    lineNumber: 75,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/Development/Portfolio/mimesis/src/app/project/[id]/ProjectDetailClient.tsx",
                                lineNumber: 74,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Development/Portfolio/mimesis/src/app/project/[id]/ProjectDetailClient.tsx",
                        lineNumber: 47,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$app$2f$project$2f5b$id$5d2f$ProjectDetail$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].pane,
                        ...motionProps(30, 0.1),
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$app$2f$project$2f5b$id$5d2f$ProjectDetail$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].paneHeader,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$app$2f$project$2f5b$id$5d2f$ProjectDetail$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].label,
                                        children: "Original Reference"
                                    }, void 0, false, {
                                        fileName: "[project]/Development/Portfolio/mimesis/src/app/project/[id]/ProjectDetailClient.tsx",
                                        lineNumber: 90,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$app$2f$project$2f5b$id$5d2f$ProjectDetail$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].info,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$app$2f$project$2f5b$id$5d2f$ProjectDetail$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].title,
                                                children: project.title
                                            }, void 0, false, {
                                                fileName: "[project]/Development/Portfolio/mimesis/src/app/project/[id]/ProjectDetailClient.tsx",
                                                lineNumber: 92,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$app$2f$project$2f5b$id$5d2f$ProjectDetail$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].description,
                                                children: [
                                                    project.description,
                                                    project.referenceUser && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                        children: [
                                                            " ",
                                                            "Reference by",
                                                            " ",
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                                href: project.referenceUser.url,
                                                                target: "_blank",
                                                                rel: "noopener noreferrer",
                                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$app$2f$project$2f5b$id$5d2f$ProjectDetail$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].referenceLink,
                                                                style: {
                                                                    textDecoration: "underline",
                                                                    color: "inherit"
                                                                },
                                                                children: project.referenceUser.name
                                                            }, void 0, false, {
                                                                fileName: "[project]/Development/Portfolio/mimesis/src/app/project/[id]/ProjectDetailClient.tsx",
                                                                lineNumber: 99,
                                                                columnNumber: 21
                                                            }, this),
                                                            "."
                                                        ]
                                                    }, void 0, true)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Development/Portfolio/mimesis/src/app/project/[id]/ProjectDetailClient.tsx",
                                                lineNumber: 93,
                                                columnNumber: 15
                                            }, this),
                                            showWiperModelSource ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$app$2f$project$2f5b$id$5d2f$ProjectDetail$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].referenceMeta,
                                                children: [
                                                    "Model source",
                                                    " ",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                        href: "https://sketchfab.com/3d-models/tesla-2018-model-3-5ef9b845aaf44203b6d04e2c677e444f",
                                                        target: "_blank",
                                                        rel: "noopener noreferrer",
                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$app$2f$project$2f5b$id$5d2f$ProjectDetail$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].referenceLink,
                                                        style: {
                                                            textDecoration: "underline",
                                                            color: "inherit"
                                                        },
                                                        children: "Tesla 2018 Model 3 (Sketchfab)"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Development/Portfolio/mimesis/src/app/project/[id]/ProjectDetailClient.tsx",
                                                        lineNumber: 115,
                                                        columnNumber: 19
                                                    }, this),
                                                    "."
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Development/Portfolio/mimesis/src/app/project/[id]/ProjectDetailClient.tsx",
                                                lineNumber: 113,
                                                columnNumber: 17
                                            }, this) : null
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Development/Portfolio/mimesis/src/app/project/[id]/ProjectDetailClient.tsx",
                                        lineNumber: 91,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Development/Portfolio/mimesis/src/app/project/[id]/ProjectDetailClient.tsx",
                                lineNumber: 89,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$app$2f$project$2f5b$id$5d2f$ProjectReferenceContent$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                project: project
                            }, void 0, false, {
                                fileName: "[project]/Development/Portfolio/mimesis/src/app/project/[id]/ProjectDetailClient.tsx",
                                lineNumber: 129,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Development/Portfolio/mimesis/src/app/project/[id]/ProjectDetailClient.tsx",
                        lineNumber: 88,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Development/Portfolio/mimesis/src/app/project/[id]/ProjectDetailClient.tsx",
                lineNumber: 45,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Development/Portfolio/mimesis/src/app/project/[id]/ProjectDetailClient.tsx",
        lineNumber: 35,
        columnNumber: 5
    }, this);
}
_s(ProjectDetailClient, "ZpPta+f5+FWIodOd9lQE/bwGcMc=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$reduced$2d$motion$2f$use$2d$reduced$2d$motion$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReducedMotion"]
    ];
});
_c = ProjectDetailClient;
var _c;
__turbopack_context__.k.register(_c, "ProjectDetailClient");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=Development_Portfolio_mimesis_src_b93ce68b._.js.map