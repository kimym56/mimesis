(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/Development/Portfolio/mimesis/src/projects/bw-circle/BwCircleProject.module.css [app-client] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "canvas": "BwCircleProject-module__NbkQ1W__canvas",
  "errorText": "BwCircleProject-module__NbkQ1W__errorText",
  "inputRow": "BwCircleProject-module__NbkQ1W__inputRow",
  "interactivePane": "BwCircleProject-module__NbkQ1W__interactivePane",
  "linkInput": "BwCircleProject-module__NbkQ1W__linkInput",
  "modeButton": "BwCircleProject-module__NbkQ1W__modeButton",
  "modeButtonActive": "BwCircleProject-module__NbkQ1W__modeButtonActive",
  "modeToggle": "BwCircleProject-module__NbkQ1W__modeToggle",
  "modeToggleRow": "BwCircleProject-module__NbkQ1W__modeToggleRow",
  "permissionText": "BwCircleProject-module__NbkQ1W__permissionText",
  "playbackButton": "BwCircleProject-module__NbkQ1W__playbackButton",
  "previewFrame": "BwCircleProject-module__NbkQ1W__previewFrame",
  "previewHost": "BwCircleProject-module__NbkQ1W__previewHost",
  "sceneShell": "BwCircleProject-module__NbkQ1W__sceneShell",
  "syncControls": "BwCircleProject-module__NbkQ1W__syncControls",
  "syncPanel": "BwCircleProject-module__NbkQ1W__syncPanel",
  "tempoBadge": "BwCircleProject-module__NbkQ1W__tempoBadge",
  "tempoBadgeDark": "BwCircleProject-module__NbkQ1W__tempoBadgeDark",
  "tempoBadgeLight": "BwCircleProject-module__NbkQ1W__tempoBadgeLight",
});
}),
"[project]/Development/Portfolio/mimesis/src/projects/bw-circle/bwCircleAudioSync.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createBwCircleAudioBaseMotion",
    ()=>createBwCircleAudioBaseMotion,
    "createBwCircleAudioCue",
    ()=>createBwCircleAudioCue,
    "createBwCircleAudioReactiveMotion",
    ()=>createBwCircleAudioReactiveMotion,
    "measureBwCircleFrequencyLevels",
    ()=>measureBwCircleFrequencyLevels
]);
function clamp(value, min, max) {
    return Math.min(max, Math.max(min, value));
}
function lerp(from, to, amount) {
    return from + (to - from) * amount;
}
function measureBwCircleFrequencyLevels(frequencyData) {
    if (frequencyData.length === 0) {
        return {
            energy: 0,
            bassEnergy: 0
        };
    }
    let total = 0;
    let bassTotal = 0;
    const bassBinCount = Math.max(1, Math.round(frequencyData.length * 0.3));
    for(let index = 0; index < frequencyData.length; index += 1){
        const sample = clamp(frequencyData[index] / 255, 0, 1);
        total += sample;
        if (index < bassBinCount) {
            bassTotal += sample;
        }
    }
    return {
        energy: total / frequencyData.length,
        bassEnergy: bassTotal / bassBinCount
    };
}
function createBwCircleAudioCue({ energy, bassEnergy, energyBaseline, bassEnergyBaseline, previousEnergy, previousBassEnergy, shouldReduceMotion }) {
    const motionScale = shouldReduceMotion ? 0.55 : 1;
    const boundedEnergy = clamp(energy, 0, 1);
    const boundedBassEnergy = clamp(bassEnergy, 0, 1);
    const energyDelta = boundedEnergy - clamp(previousEnergy, 0, 1);
    const bassDelta = boundedBassEnergy - clamp(previousBassEnergy, 0, 1);
    const energyBaselineDelta = boundedEnergy - clamp(energyBaseline, 0, 1);
    const bassBaselineDelta = boundedBassEnergy - clamp(bassEnergyBaseline, 0, 1);
    const onsetDelta = Math.max(energyDelta, bassDelta * 0.55, energyBaselineDelta * 0.75, bassBaselineDelta * 0.85);
    return {
        energy: boundedEnergy * motionScale,
        bassEnergy: boundedBassEnergy * motionScale,
        onsetStrength: clamp(onsetDelta * 2.8, 0, 1) * motionScale
    };
}
function createBwCircleAudioBaseMotion({ audioControlsAccentMotion, syncCue, syncMotion }) {
    return {
        syncEnergy: syncCue?.energy ?? 0.28,
        syncPulse: syncCue?.pulseStrength ?? 0,
        ballKick: audioControlsAccentMotion ? 1 : syncMotion?.ballKick ?? 1,
        ballSquash: audioControlsAccentMotion ? 0 : syncMotion?.ballSquash ?? 0,
        particleAccent: audioControlsAccentMotion ? 1 : syncMotion?.particleAccent ?? 1
    };
}
function createBwCircleAudioReactiveMotion({ audioCue, baseMotion, previousMotion, shouldReduceMotion }) {
    if (!audioCue) {
        return baseMotion;
    }
    const motionScale = shouldReduceMotion ? 0.55 : 1;
    const smoothing = shouldReduceMotion ? 0.22 : 0.38;
    const previous = previousMotion ?? baseMotion;
    const target = {
        syncEnergy: clamp(baseMotion.syncEnergy + audioCue.energy * 0.18 * motionScale + audioCue.bassEnergy * 0.16 * motionScale + audioCue.onsetStrength * 0.08 * motionScale, 0, 1),
        syncPulse: clamp(baseMotion.syncPulse * 0.8 + audioCue.onsetStrength * 0.3 * motionScale + audioCue.bassEnergy * 0.12 * motionScale, 0, 1),
        ballKick: baseMotion.ballKick + audioCue.bassEnergy * 0.22 * motionScale + audioCue.onsetStrength * 0.18 * motionScale,
        ballSquash: baseMotion.ballSquash + audioCue.bassEnergy * 0.05 * motionScale + audioCue.onsetStrength * 0.09 * motionScale,
        particleAccent: baseMotion.particleAccent + audioCue.energy * 0.12 * motionScale + audioCue.bassEnergy * 0.09 * motionScale + audioCue.onsetStrength * 0.18 * motionScale
    };
    return {
        syncEnergy: lerp(previous.syncEnergy, target.syncEnergy, smoothing),
        syncPulse: lerp(previous.syncPulse, target.syncPulse, smoothing),
        ballKick: Math.max(1, lerp(previous.ballKick, target.ballKick, smoothing)),
        ballSquash: Math.max(0, lerp(previous.ballSquash, target.ballSquash, smoothing)),
        particleAccent: Math.max(1, lerp(previous.particleAccent, target.particleAccent, smoothing))
    };
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Development/Portfolio/mimesis/src/projects/bw-circle/bwCircleRealtimeBpmVendor.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createRealtimeBpmAnalyzer",
    ()=>createRealtimeBpmAnalyzer,
    "getBiquadFilter",
    ()=>getBiquadFilter
]);
// The published package exports are broken, so we load the internal CJS entrypoint directly.
// eslint-disable-next-line @typescript-eslint/no-require-imports
const realtimeBpmAnalyzer = __turbopack_context__.r("[project]/Development/Portfolio/mimesis/node_modules/realtime-bpm-analyzer/dist/dist/index.js [app-client] (ecmascript)");
const createRealtimeBpmAnalyzer = realtimeBpmAnalyzer.createRealtimeBpmAnalyzer;
const getBiquadFilter = realtimeBpmAnalyzer.getBiquadFilter;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Development/Portfolio/mimesis/src/projects/bw-circle/bwCircleRealtimeBpm.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createBwCircleRealtimeBpmBridge",
    ()=>createBwCircleRealtimeBpmBridge
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$bw$2d$circle$2f$bwCircleRealtimeBpmVendor$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Development/Portfolio/mimesis/src/projects/bw-circle/bwCircleRealtimeBpmVendor.ts [app-client] (ecmascript)");
;
const BPM_ANALYZER_OPTIONS = {
    continuousAnalysis: true,
    debug: false,
    stabilizationTime: 8_000
};
const BPM_INPUT_GAIN_VALUE = 6;
function readBwCircleRealtimeTempo(candidates) {
    const tempo = candidates?.bpm[0]?.tempo;
    return typeof tempo === "number" ? Math.round(tempo) : null;
}
async function createBwCircleRealtimeBpmBridge({ audioContext, onBpm, sourceNode }) {
    const analyzer = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$bw$2d$circle$2f$bwCircleRealtimeBpmVendor$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createRealtimeBpmAnalyzer"])(audioContext, BPM_ANALYZER_OPTIONS);
    const signalGainNode = audioContext.createGain();
    const mutedSinkNode = audioContext.createGain();
    signalGainNode.gain.value = BPM_INPUT_GAIN_VALUE;
    mutedSinkNode.gain.value = 0;
    const createTempoEventHandler = ()=>(event)=>{
            const detail = event.detail ?? null;
            const bpm = readBwCircleRealtimeTempo(detail);
            if (bpm !== null) {
                onBpm(bpm);
            }
        };
    const handleBpmEvent = createTempoEventHandler();
    const handleBpmStableEvent = createTempoEventHandler();
    analyzer.addEventListener("bpm", handleBpmEvent);
    analyzer.addEventListener("bpmStable", handleBpmStableEvent);
    sourceNode.connect(signalGainNode);
    signalGainNode.connect(analyzer.node);
    analyzer.connect(mutedSinkNode);
    mutedSinkNode.connect(audioContext.destination);
    return {
        disconnect () {
            analyzer.removeEventListener("bpm", handleBpmEvent);
            analyzer.removeEventListener("bpmStable", handleBpmStableEvent);
            analyzer.stop();
            analyzer.disconnect();
            try {
                sourceNode.disconnect(signalGainNode);
            } catch  {}
            try {
                signalGainNode.disconnect();
            } catch  {}
            try {
                mutedSinkNode.disconnect();
            } catch  {}
        }
    };
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Development/Portfolio/mimesis/src/projects/bw-circle/bwCircleSimulation.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createBeatAccentCue",
    ()=>createBeatAccentCue,
    "createBwCircleParticles",
    ()=>createBwCircleParticles,
    "createMimesisCue",
    ()=>createMimesisCue,
    "createMimesisLayout",
    ()=>createMimesisLayout,
    "createSyncCue",
    ()=>createSyncCue,
    "createSyncMotionProfile",
    ()=>createSyncMotionProfile,
    "getBwCircleRenderPixelRatio",
    ()=>getBwCircleRenderPixelRatio,
    "predictPlaybackTime",
    ()=>predictPlaybackTime
]);
function clamp(value, min, max) {
    return Math.min(max, Math.max(min, value));
}
const BIASED_PARTICLE_RATIO = 0.16;
const BIASED_PARTICLE_ACROSS_SIGMA_FACTOR = 0.105;
const BIASED_PARTICLE_ALONG_SIGMA_FACTOR = 0.225;
function createSeededRandom(seed) {
    let state = seed >>> 0 || 1;
    return ()=>{
        state = state * 1664525 + 1013904223 >>> 0;
        return state / 4294967296;
    };
}
function sampleNormal(random) {
    let u = 0;
    while(u <= Number.EPSILON){
        u = random();
    }
    return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * random());
}
function sampleUniformDiscPoint({ circleRadius, padding, random }) {
    const angle = random() * Math.PI * 2;
    const distance = Math.sqrt(random()) * Math.max(circleRadius - padding, 0);
    return {
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance
    };
}
function sampleBoundaryCenterBiasedPoint({ boundaryAngle, circleRadius, padding, random }) {
    const maxDistance = Math.max(circleRadius - padding, 0);
    const acrossSigma = maxDistance * BIASED_PARTICLE_ACROSS_SIGMA_FACTOR;
    const alongSigma = maxDistance * BIASED_PARTICLE_ALONG_SIGMA_FACTOR;
    for(let attempt = 0; attempt < 12; attempt += 1){
        const across = sampleNormal(random) * acrossSigma;
        const along = sampleNormal(random) * alongSigma;
        const x = -Math.sin(boundaryAngle) * across + Math.cos(boundaryAngle) * along;
        const y = Math.cos(boundaryAngle) * across + Math.sin(boundaryAngle) * along;
        if (Math.hypot(x, y) <= maxDistance) {
            return {
                x,
                y
            };
        }
    }
    return sampleUniformDiscPoint({
        circleRadius,
        padding,
        random
    });
}
function getCircleRadius(width) {
    return (width < 768 ? 0.336 : 0.175) * width;
}
const CAMERA_SEQUENCE = [
    "normal",
    "white",
    "black"
];
const SYNC_CAPTURE_MAX_PIXEL_RATIO = 1;
const SYNC_CAPTURE_PARTICLE_DENSITY_MULTIPLIER = 0.24;
function getBwCircleRenderPixelRatio(devicePixelRatio, performanceMode = "default") {
    const safeDevicePixelRatio = Math.max(1, devicePixelRatio || 1);
    return performanceMode === "sync-capture" ? Math.min(safeDevicePixelRatio, SYNC_CAPTURE_MAX_PIXEL_RATIO) : safeDevicePixelRatio;
}
function predictPlaybackTime({ currentTime, isPlaying, sampledAtMs, nowMs }) {
    if (!isPlaying) {
        return currentTime;
    }
    const elapsedSeconds = Math.max(0, nowMs - sampledAtMs) / 1000;
    return currentTime + elapsedSeconds;
}
function createBeatAccentCue({ currentTime, bpm, isPlaying }) {
    if (!isPlaying) {
        return {
            accentStrength: 0,
            beatPhase: 0
        };
    }
    const secondsPerBeat = 60 / Math.max(bpm, 1);
    const phaseSeconds = (currentTime % secondsPerBeat + secondsPerBeat) % secondsPerBeat;
    const beatPhase = phaseSeconds / secondsPerBeat;
    const accentStrength = clamp(1 - beatPhase / 0.18, 0, 1);
    return {
        accentStrength,
        beatPhase
    };
}
function createMimesisCue({ secondsWithinMinute }) {
    return {
        angle: secondsWithinMinute / 60 * Math.PI * 2 - Math.PI / 2,
        rotationVelocity: Math.PI * 2 / 60
    };
}
function createMimesisLayout(sceneWidth, viewportWidth = sceneWidth, performanceMode = "default") {
    const isMobile = sceneWidth < 768;
    const physicsScale = clamp(sceneWidth / 1440, 0.4, 1.2);
    const circleRadius = getCircleRadius(sceneWidth);
    const ballRadius = Math.max(6, circleRadius * 0.056);
    const referenceCircleRadius = getCircleRadius(viewportWidth);
    const particleDensityRatio = referenceCircleRadius > 0 ? (circleRadius / referenceCircleRadius) ** 2 : 1;
    const particleDensityMultiplier = performanceMode === "sync-capture" ? SYNC_CAPTURE_PARTICLE_DENSITY_MULTIPLIER : 1;
    const particleCountPerSet = Math.max(1, Math.round(5000 * particleDensityRatio * particleDensityMultiplier));
    return {
        isMobile,
        physicsScale,
        gravity: (isMobile ? 0.25 : 0.4) * physicsScale,
        bounce: isMobile ? 0.8 : 0.85,
        circleRadius,
        ballRadius,
        particleCountPerSet,
        speedScale: isMobile ? 0.6 : 1
    };
}
function createBwCircleParticles({ boundaryAngle = 0, circleRadius, count, seed }) {
    const random = createSeededRandom(seed);
    const particles = [];
    const biasedParticleCount = Math.round(count * BIASED_PARTICLE_RATIO);
    for(let index = 0; index < count; index += 1){
        const radius = 1 + random() * 1.5;
        const position = index < biasedParticleCount ? sampleBoundaryCenterBiasedPoint({
            boundaryAngle,
            circleRadius,
            padding: radius + 2,
            random
        }) : sampleUniformDiscPoint({
            circleRadius,
            padding: radius + 2,
            random
        });
        particles.push({
            x: position.x,
            y: position.y,
            vx: (random() - 0.5) * 0.8,
            vy: (random() - 0.5) * 0.8,
            radius
        });
    }
    return particles;
}
function createSyncCue({ currentTime, isPlaying, baseCameraMode }) {
    if (!isPlaying) {
        return {
            rotationVelocity: 0.0032,
            pulseStrength: 0,
            energy: 0.28,
            cameraMode: baseCameraMode
        };
    }
    const phase = currentTime * 0.85;
    const pulseStrength = clamp((Math.sin(phase * 1.7) + 1) * 0.5, 0, 1);
    const energy = clamp(0.35 + (Math.sin(phase * 0.75) + 1) * 0.325, 0.35, 1);
    const rotationVelocity = clamp(0.0045 + pulseStrength * 0.0105 + energy * 0.0015, 0.004, 0.02);
    const cameraIndex = Math.floor(currentTime / 7.5) % CAMERA_SEQUENCE.length;
    const cameraMode = pulseStrength > 0.72 ? CAMERA_SEQUENCE[cameraIndex] : baseCameraMode;
    return {
        rotationVelocity,
        pulseStrength,
        energy,
        cameraMode
    };
}
function createSyncMotionProfile({ currentTime, isPlaying, sampledAtMs, nowMs, bpm, baseCameraMode, shouldReduceMotion }) {
    const predictedCurrentTime = predictPlaybackTime({
        currentTime,
        isPlaying,
        sampledAtMs,
        nowMs
    });
    const syncCue = createSyncCue({
        currentTime: predictedCurrentTime,
        isPlaying,
        baseCameraMode
    });
    const rawBeatAccent = createBeatAccentCue({
        currentTime: predictedCurrentTime,
        bpm,
        isPlaying
    });
    const accentStrength = shouldReduceMotion ? rawBeatAccent.accentStrength * 0.45 : rawBeatAccent.accentStrength;
    return {
        predictedCurrentTime,
        syncCue,
        beatAccent: {
            ...rawBeatAccent,
            accentStrength
        },
        ballKick: 1 + accentStrength * (shouldReduceMotion ? 0.08 : 0.18),
        ballSquash: accentStrength * (shouldReduceMotion ? 0.05 : 0.12),
        particleAccent: 1 + accentStrength * (shouldReduceMotion ? 0.03 : 0.08)
    };
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Development/Portfolio/mimesis/src/projects/bw-circle/BwCircleScene.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>BwCircleScene
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Development/Portfolio/mimesis/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Development/Portfolio/mimesis/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$reduced$2d$motion$2f$use$2d$reduced$2d$motion$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Development/Portfolio/mimesis/node_modules/framer-motion/dist/es/utils/reduced-motion/use-reduced-motion.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$bw$2d$circle$2f$bwCircleAudioSync$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Development/Portfolio/mimesis/src/projects/bw-circle/bwCircleAudioSync.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$bw$2d$circle$2f$bwCircleRealtimeBpm$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Development/Portfolio/mimesis/src/projects/bw-circle/bwCircleRealtimeBpm.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$bw$2d$circle$2f$bwCircleSimulation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Development/Portfolio/mimesis/src/projects/bw-circle/bwCircleSimulation.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$bw$2d$circle$2f$BwCircleProject$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/Development/Portfolio/mimesis/src/projects/bw-circle/BwCircleProject.module.css [app-client] (css module)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
const FRICTION = 0.995;
const SQUASH_RECOVERY = 0.15;
const AUDIO_BASELINE_BLEND = 0.08;
function getAudioContextConstructor() {
    return window.AudioContext ?? window.webkitAudioContext;
}
const DIVIDER_LEAK_DISTANCE = 72;
const DIVIDER_LEAK_COOLDOWN_MIN = 20;
const DIVIDER_LEAK_COOLDOWN_RANGE = 18;
function createBall(x, vx, vy, color) {
    return {
        x,
        y: 0,
        vx,
        vy,
        color,
        scaleX: 1,
        scaleY: 1,
        squashAmount: 0
    };
}
function createSceneState(sceneWidth, viewportWidth, performanceMode = "default") {
    const layout = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$bw$2d$circle$2f$bwCircleSimulation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createMimesisLayout"])(sceneWidth, viewportWidth, performanceMode);
    const seedBase = Math.max(1, Math.round(sceneWidth));
    const now = new Date();
    const boundaryAngle = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$bw$2d$circle$2f$bwCircleSimulation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createMimesisCue"])({
        secondsWithinMinute: now.getSeconds() + now.getMilliseconds() / 1000
    }).angle;
    return {
        leftBall: createBall(-layout.circleRadius / 2, 4 * layout.speedScale, -3 * layout.speedScale, "#000000"),
        rightBall: createBall(layout.circleRadius / 2, -4 * layout.speedScale, 3 * layout.speedScale, "#ffffff"),
        leftParticles: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$bw$2d$circle$2f$bwCircleSimulation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createBwCircleParticles"])({
            boundaryAngle,
            circleRadius: layout.circleRadius,
            count: layout.particleCountPerSet,
            seed: seedBase * 17 + 1
        }),
        rightParticles: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$bw$2d$circle$2f$bwCircleSimulation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createBwCircleParticles"])({
            boundaryAngle,
            circleRadius: layout.circleRadius,
            count: layout.particleCountPerSet,
            seed: seedBase * 17 + 2
        }),
        splashParticles: [],
        leftDividerLeakCooldown: 0,
        rightDividerLeakCooldown: 0
    };
}
function getBwCircleScenePerformanceMode(mode, audioSyncStatus) {
    return mode === "sync" && audioSyncStatus === "active" ? "sync-capture" : "default";
}
function drawBall(context, ball, ballRadius) {
    context.save();
    context.translate(ball.x, ball.y);
    context.rotate(Math.atan2(ball.vy, ball.vx));
    context.scale(ball.scaleY, ball.scaleX);
    context.beginPath();
    context.arc(0, 0, ballRadius, 0, Math.PI * 2);
    context.fillStyle = ball.color;
    context.fill();
    context.restore();
}
function pushSplashParticle(splashParticles, particle) {
    splashParticles.push(particle);
}
function moveParticleOutsideCircle({ circleRadius, color, normalX, normalY, particles, removeSource = true, sourceIndex, speedMultiplier = 1, splashParticles }) {
    const sourceParticle = removeSource ? particles.splice(sourceIndex, 1)[0] : particles[sourceIndex];
    if (!sourceParticle) {
        return false;
    }
    let outwardX = normalX;
    let outwardY = normalY;
    const normalLength = Math.hypot(outwardX, outwardY);
    if (normalLength > 0.0001) {
        outwardX /= normalLength;
        outwardY /= normalLength;
    } else {
        const radialDistance = Math.hypot(sourceParticle.x, sourceParticle.y);
        if (radialDistance > 0.0001) {
            outwardX = sourceParticle.x / radialDistance;
            outwardY = sourceParticle.y / radialDistance;
        } else {
            const randomAngle = Math.random() * Math.PI * 2;
            outwardX = Math.cos(randomAngle);
            outwardY = Math.sin(randomAngle);
        }
    }
    const tangentX = -outwardY;
    const tangentY = outwardX;
    const tangentialOffset = (sourceParticle.x * tangentX + sourceParticle.y * tangentY) * 0.18 + (Math.random() - 0.5) * 6;
    const outwardSpeed = (0.24 + Math.random() * 0.42) * speedMultiplier;
    const tangentialSpeed = ((Math.random() - 0.5) * 0.28 + (sourceParticle.vx * tangentX + sourceParticle.vy * tangentY) * 0.08) * speedMultiplier;
    const spawnRadius = circleRadius + sourceParticle.radius + 3 + Math.random() * 2.5;
    pushSplashParticle(splashParticles, {
        x: outwardX * spawnRadius + tangentX * tangentialOffset,
        y: outwardY * spawnRadius + tangentY * tangentialOffset,
        vx: sourceParticle.vx * 0.24 + outwardX * outwardSpeed + tangentX * tangentialSpeed,
        vy: sourceParticle.vy * 0.24 + outwardY * outwardSpeed + tangentY * tangentialSpeed,
        radius: Math.min(3.2, Math.max(1, sourceParticle.radius + Math.random() * 0.4)),
        color,
        life: 1
    });
    return true;
}
function releaseImpactParticles({ circleRadius, color, impact, particles, splashParticles }) {
    if (!impact || particles.length === 0) {
        return;
    }
    const impactPointX = impact.normalX * (circleRadius - 6);
    const impactPointY = impact.normalY * (circleRadius - 6);
    const sourceRadius = Math.max(30, circleRadius * 0.18);
    const desiredCount = 3 + Math.floor(Math.random() * 4);
    const candidates = particles.map((particle, index)=>({
            distance: Math.hypot(particle.x - impactPointX, particle.y - impactPointY),
            index
        })).filter((candidate)=>candidate.distance <= sourceRadius).sort((left, right)=>left.distance - right.distance).slice(0, desiredCount).sort((left, right)=>right.index - left.index);
    if (candidates.length === 0) {
        return;
    }
    const speedMultiplier = 1 + Math.min(impact.speed / 12, 0.45);
    for (const candidate of candidates){
        moveParticleOutsideCircle({
            circleRadius,
            color,
            normalX: impact.normalX,
            normalY: impact.normalY,
            particles,
            removeSource: false,
            sourceIndex: candidate.index,
            speedMultiplier,
            splashParticles
        });
    }
}
function updateSplashParticles({ circleRadius, sceneHeight, sceneWidth, splashParticles }) {
    const angularVelocity = Math.PI * 2 / 60;
    const rotationAmount = angularVelocity / 60;
    const cosRotation = Math.cos(rotationAmount);
    const sinRotation = Math.sin(rotationAmount);
    const maxX = sceneWidth / 2 + 50;
    const maxY = sceneHeight / 2 + 50;
    for(let index = splashParticles.length - 1; index >= 0; index -= 1){
        const particle = splashParticles[index];
        const rotatedX = particle.x * cosRotation - particle.y * sinRotation;
        const rotatedY = particle.x * sinRotation + particle.y * cosRotation;
        particle.x = rotatedX;
        particle.y = rotatedY;
        particle.vx += (Math.random() - 0.5) * 0.08;
        particle.vy += (Math.random() - 0.5) * 0.08;
        particle.vx *= 0.97;
        particle.vy *= 0.97;
        particle.x += particle.vx;
        particle.y += particle.vy;
        const distanceFromCenter = Math.hypot(particle.x, particle.y);
        const minDistance = circleRadius + particle.radius + 2;
        if (distanceFromCenter < minDistance && distanceFromCenter > 0.0001) {
            const normalX = particle.x / distanceFromCenter;
            const normalY = particle.y / distanceFromCenter;
            const dotProduct = particle.vx * normalX + particle.vy * normalY;
            particle.x = normalX * minDistance;
            particle.y = normalY * minDistance;
            if (dotProduct < 0) {
                particle.vx -= dotProduct * normalX;
                particle.vy -= dotProduct * normalY;
            }
        }
        if (particle.x < -maxX || particle.x > maxX || particle.y < -maxY || particle.y > maxY) {
            splashParticles.splice(index, 1);
        }
    }
}
function updateParticles({ angle, ball, circleRadius, dividerLeakCooldown, isRightHalf, particleAccent, particles, splashColor, splashParticles }) {
    const repelRadius = 60;
    const gravity = 0.004;
    const damping = 0.98;
    const minSpeed = 0.3;
    const resetSpeed = 0.5;
    const boundaryBounce = 0.8;
    let nextDividerLeakCooldown = Math.max(0, dividerLeakCooldown - 1);
    for(let index = particles.length - 1; index >= 0; index -= 1){
        const particle = particles[index];
        const toBallX = particle.x - ball.x;
        const toBallY = particle.y - ball.y;
        const distanceToBall = Math.hypot(toBallX, toBallY);
        if (distanceToBall < repelRadius && distanceToBall > 0.0001) {
            const force = (repelRadius - distanceToBall) / repelRadius * 1.5;
            particle.vx += toBallX / distanceToBall * force;
            particle.vy += toBallY / distanceToBall * force;
        }
        particle.vy += gravity;
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.vx *= damping;
        particle.vy *= damping;
        const accentImpulse = (particleAccent - 1) * 0.35;
        if (accentImpulse > 0) {
            const speed = Math.hypot(particle.vx, particle.vy);
            if (speed > 0.0001) {
                particle.vx += particle.vx / speed * accentImpulse;
                particle.vy += particle.vy / speed * accentImpulse;
            } else {
                const accentAngle = Math.random() * Math.PI * 2;
                particle.vx += Math.cos(accentAngle) * accentImpulse;
                particle.vy += Math.sin(accentAngle) * accentImpulse;
            }
        }
        const speed = Math.hypot(particle.vx, particle.vy);
        if (speed < minSpeed) {
            const nextAngle = Math.random() * Math.PI * 2;
            particle.vx = Math.cos(nextAngle) * resetSpeed;
            particle.vy = Math.sin(nextAngle) * resetSpeed;
        }
        const distanceFromCenter = Math.hypot(particle.x, particle.y);
        const maxDistance = circleRadius - particle.radius;
        if (distanceFromCenter > maxDistance && distanceFromCenter > 0.0001) {
            const normalX = particle.x / distanceFromCenter;
            const normalY = particle.y / distanceFromCenter;
            const dotProduct = particle.vx * normalX + particle.vy * normalY;
            particle.x = normalX * maxDistance;
            particle.y = normalY * maxDistance;
            particle.vx -= 2 * dotProduct * normalX;
            particle.vy -= 2 * dotProduct * normalY;
        }
        const rotatedX = particle.x * Math.cos(-angle) - particle.y * Math.sin(-angle);
        const rotatedY = particle.x * Math.sin(-angle) + particle.y * Math.cos(-angle);
        const boundary = isRightHalf ? particle.radius : -particle.radius;
        const isOutside = isRightHalf ? rotatedX < boundary : rotatedX > boundary;
        if (isOutside) {
            if (nextDividerLeakCooldown <= 0 && distanceToBall <= DIVIDER_LEAK_DISTANCE) {
                const radialDistance = Math.hypot(particle.x, particle.y);
                const normalX = radialDistance > 0.0001 ? particle.x / radialDistance : Math.cos(angle);
                const normalY = radialDistance > 0.0001 ? particle.y / radialDistance : Math.sin(angle);
                if (moveParticleOutsideCircle({
                    circleRadius,
                    color: splashColor,
                    normalX,
                    normalY,
                    particles,
                    removeSource: false,
                    sourceIndex: index,
                    speedMultiplier: 0.92 + Math.random() * 0.18,
                    splashParticles
                })) {
                    nextDividerLeakCooldown = DIVIDER_LEAK_COOLDOWN_MIN + Math.floor(Math.random() * DIVIDER_LEAK_COOLDOWN_RANGE);
                    continue;
                }
            }
            const velocityX = particle.vx * Math.cos(-angle) - particle.vy * Math.sin(-angle);
            const velocityY = particle.vx * Math.sin(-angle) + particle.vy * Math.cos(-angle);
            const nextVelocityX = -velocityX * boundaryBounce;
            particle.vx = nextVelocityX * Math.cos(angle) - velocityY * Math.sin(angle);
            particle.vy = nextVelocityX * Math.sin(angle) + velocityY * Math.cos(angle);
            particle.x = boundary * Math.cos(angle) - rotatedY * Math.sin(angle);
            particle.y = boundary * Math.sin(angle) + rotatedY * Math.cos(angle);
        }
    }
    return nextDividerLeakCooldown;
}
function updateBall({ angle, ball, ballRadius, beatKick, beatSquash, bounce, circleRadius, gravity, isLeftSide, speedBoost }) {
    const beatImpulse = (beatKick - 1) * (circleRadius < 180 ? 0.9 : 1.2);
    let impactEvent = null;
    if (beatImpulse > 0) {
        const speed = Math.hypot(ball.vx, ball.vy);
        if (speed > 0.0001) {
            ball.vx += ball.vx / speed * beatImpulse;
            ball.vy += ball.vy / speed * beatImpulse * 0.9;
        } else {
            ball.vx += (isLeftSide ? 1 : -1) * beatImpulse;
            ball.vy -= beatImpulse * 0.6;
        }
        ball.squashAmount = Math.max(ball.squashAmount, beatSquash);
    }
    ball.vy += gravity;
    ball.vx *= FRICTION;
    ball.vy *= FRICTION;
    ball.x += ball.vx;
    ball.y += ball.vy;
    const distance = Math.hypot(ball.x, ball.y);
    const maxDistance = circleRadius - ballRadius;
    if (distance > maxDistance) {
        const normalX = ball.x / distance;
        const normalY = ball.y / distance;
        const dotProduct = ball.vx * normalX + ball.vy * normalY;
        ball.x = normalX * maxDistance;
        ball.y = normalY * maxDistance;
        ball.vx -= 2 * dotProduct * normalX;
        ball.vy -= 2 * dotProduct * normalY;
        ball.vx *= bounce;
        ball.vy *= bounce;
        const collisionSpeed = Math.hypot(ball.vx, ball.vy);
        const speedThreshold = maxDistance < 180 ? 6 : 10;
        const boostAmount = (maxDistance < 180 ? 1.5 : 1.8) * speedBoost;
        if (collisionSpeed < speedThreshold) {
            ball.vx *= boostAmount;
            ball.vy *= boostAmount;
        }
        ball.squashAmount = Math.min(Math.abs(dotProduct) * 0.04, 0.35);
        impactEvent = {
            normalX,
            normalY,
            speed: collisionSpeed
        };
    }
    const rotatedX = ball.x * Math.cos(-angle) - ball.y * Math.sin(-angle);
    const rotatedY = ball.x * Math.sin(-angle) + ball.y * Math.cos(-angle);
    if (isLeftSide) {
        if (rotatedX > -ballRadius) {
            const reflectedX = -ballRadius;
            const velocityX = ball.vx * Math.cos(-angle) - ball.vy * Math.sin(-angle);
            const velocityY = ball.vx * Math.sin(-angle) + ball.vy * Math.cos(-angle);
            const nextVelocityX = -velocityX * bounce;
            ball.vx = nextVelocityX * Math.cos(angle) - velocityY * Math.sin(angle);
            ball.vy = nextVelocityX * Math.sin(angle) + velocityY * Math.cos(angle);
            ball.x = reflectedX * Math.cos(angle) - rotatedY * Math.sin(angle);
            ball.y = reflectedX * Math.sin(angle) + rotatedY * Math.cos(angle);
        }
    } else if (rotatedX < ballRadius) {
        const reflectedX = ballRadius;
        const velocityX = ball.vx * Math.cos(-angle) - ball.vy * Math.sin(-angle);
        const velocityY = ball.vx * Math.sin(-angle) + ball.vy * Math.cos(-angle);
        const nextVelocityX = -velocityX * bounce;
        ball.vx = nextVelocityX * Math.cos(angle) - velocityY * Math.sin(angle);
        ball.vy = nextVelocityX * Math.sin(angle) + velocityY * Math.cos(angle);
        ball.x = reflectedX * Math.cos(angle) - rotatedY * Math.sin(angle);
        ball.y = reflectedX * Math.sin(angle) + rotatedY * Math.cos(angle);
    }
    ball.squashAmount *= 1 - SQUASH_RECOVERY;
    const speed = Math.hypot(ball.vx, ball.vy);
    const stretchAmount = Math.min(speed * 0.01, 0.2);
    if (ball.squashAmount > stretchAmount) {
        ball.scaleX = 1 + ball.squashAmount;
        ball.scaleY = 1 - ball.squashAmount * 0.5;
    } else {
        ball.scaleX = 1 - stretchAmount * 0.3;
        ball.scaleY = 1 + stretchAmount * 0.5;
    }
    return impactEvent;
}
function BwCircleScene({ audioSync, bpm, mode, onEstimatedBpmChange, playbackRef, syncOverlay }) {
    _s();
    const canvasRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const bpmRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(bpm);
    const modeRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(mode);
    const shouldReduceMotion = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$reduced$2d$motion$2f$use$2d$reduced$2d$motion$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReducedMotion"])() ?? false;
    const audioContextRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const analyserRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const audioSyncRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(audioSync);
    const frequencyDataRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const mediaSourceRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const previousAudioEnergyRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(0);
    const previousBassAudioEnergyRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(0);
    const audioEnergyBaselineRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(0);
    const bassAudioEnergyBaselineRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(0);
    const bpmBridgeRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const audioReactiveMotionRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const publishedEstimatedBpmRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const publishEstimatedBpm = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffectEvent"])({
        "BwCircleScene.useEffectEvent[publishEstimatedBpm]": (nextEstimatedBpm)=>{
            if (publishedEstimatedBpmRef.current === nextEstimatedBpm) {
                return;
            }
            publishedEstimatedBpmRef.current = nextEstimatedBpm;
            onEstimatedBpmChange?.(nextEstimatedBpm);
        }
    }["BwCircleScene.useEffectEvent[publishEstimatedBpm]"]);
    const resetEstimatedBpm = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffectEvent"])({
        "BwCircleScene.useEffectEvent[resetEstimatedBpm]": ()=>{
            publishEstimatedBpm(null);
        }
    }["BwCircleScene.useEffectEvent[resetEstimatedBpm]"]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "BwCircleScene.useEffect": ()=>{
            bpmRef.current = bpm;
        }
    }["BwCircleScene.useEffect"], [
        bpm
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "BwCircleScene.useEffect": ()=>{
            modeRef.current = mode;
        }
    }["BwCircleScene.useEffect"], [
        mode
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "BwCircleScene.useEffect": ()=>{
            audioSyncRef.current = audioSync;
        }
    }["BwCircleScene.useEffect"], [
        audioSync
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "BwCircleScene.useEffect": ()=>{
            let cancelled = false;
            const disconnectAudioGraph = {
                "BwCircleScene.useEffect.disconnectAudioGraph": ()=>{
                    bpmBridgeRef.current?.disconnect();
                    bpmBridgeRef.current = null;
                    mediaSourceRef.current?.disconnect();
                    analyserRef.current?.disconnect();
                    mediaSourceRef.current = null;
                    analyserRef.current = null;
                    frequencyDataRef.current = null;
                    previousAudioEnergyRef.current = 0;
                    previousBassAudioEnergyRef.current = 0;
                    audioEnergyBaselineRef.current = 0;
                    bassAudioEnergyBaselineRef.current = 0;
                    audioReactiveMotionRef.current = null;
                    resetEstimatedBpm();
                }
            }["BwCircleScene.useEffect.disconnectAudioGraph"];
            if (mode !== "sync" || audioSync.status !== "active" || !audioSync.stream) {
                disconnectAudioGraph();
                return;
            }
            const AudioContextConstructor = getAudioContextConstructor();
            if (!AudioContextConstructor) {
                disconnectAudioGraph();
                return;
            }
            if (!audioContextRef.current) {
                audioContextRef.current = new AudioContextConstructor();
            }
            const audioContext = audioContextRef.current;
            const mediaSource = audioContext.createMediaStreamSource(audioSync.stream);
            const analyser = audioContext.createAnalyser();
            analyser.fftSize = 1024;
            analyser.smoothingTimeConstant = shouldReduceMotion ? 0.84 : 0.72;
            mediaSource.connect(analyser);
            mediaSourceRef.current = mediaSource;
            analyserRef.current = analyser;
            frequencyDataRef.current = new Uint8Array(analyser.frequencyBinCount);
            previousAudioEnergyRef.current = 0;
            previousBassAudioEnergyRef.current = 0;
            audioEnergyBaselineRef.current = 0;
            bassAudioEnergyBaselineRef.current = 0;
            void audioContext.resume?.();
            void (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$bw$2d$circle$2f$bwCircleRealtimeBpm$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createBwCircleRealtimeBpmBridge"])({
                audioContext,
                onBpm: {
                    "BwCircleScene.useEffect": (nextBpm)=>{
                        if (modeRef.current === "sync" && audioSyncRef.current.status === "active" && playbackRef.current.isPlaying) {
                            publishEstimatedBpm(nextBpm);
                        }
                    }
                }["BwCircleScene.useEffect"],
                sourceNode: mediaSource
            }).then({
                "BwCircleScene.useEffect": (bridge)=>{
                    if (cancelled) {
                        bridge.disconnect();
                        return;
                    }
                    bpmBridgeRef.current = bridge;
                }
            }["BwCircleScene.useEffect"]).catch({
                "BwCircleScene.useEffect": ()=>{
                    if (!cancelled) {
                        publishEstimatedBpm(null);
                    }
                }
            }["BwCircleScene.useEffect"]);
            return ({
                "BwCircleScene.useEffect": ()=>{
                    cancelled = true;
                    disconnectAudioGraph();
                }
            })["BwCircleScene.useEffect"];
        }
    }["BwCircleScene.useEffect"], [
        audioSync.status,
        audioSync.stream,
        mode,
        playbackRef,
        shouldReduceMotion
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "BwCircleScene.useEffect": ()=>{
            return ({
                "BwCircleScene.useEffect": ()=>{
                    mediaSourceRef.current?.disconnect();
                    analyserRef.current?.disconnect();
                    mediaSourceRef.current = null;
                    analyserRef.current = null;
                    frequencyDataRef.current = null;
                    previousAudioEnergyRef.current = 0;
                    previousBassAudioEnergyRef.current = 0;
                    audioEnergyBaselineRef.current = 0;
                    bassAudioEnergyBaselineRef.current = 0;
                    bpmBridgeRef.current?.disconnect();
                    bpmBridgeRef.current = null;
                    audioReactiveMotionRef.current = null;
                    const audioContext = audioContextRef.current;
                    audioContextRef.current = null;
                    void audioContext?.close?.();
                }
            })["BwCircleScene.useEffect"];
        }
    }["BwCircleScene.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "BwCircleScene.useEffect": ()=>{
            const canvas = canvasRef.current;
            if (!canvas) {
                return;
            }
            const context = canvas.getContext("2d");
            if (!context) {
                return;
            }
            let width = 0;
            let height = 0;
            let animationFrame = 0;
            let performanceMode = getBwCircleScenePerformanceMode(modeRef.current, audioSyncRef.current.status);
            let sceneState = createSceneState(1440, 1440, performanceMode);
            const resize = {
                "BwCircleScene.useEffect.resize": ()=>{
                    const parent = canvas.parentElement;
                    if (!parent) {
                        return;
                    }
                    const bounds = parent.getBoundingClientRect();
                    performanceMode = getBwCircleScenePerformanceMode(modeRef.current, audioSyncRef.current.status);
                    const ratio = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$bw$2d$circle$2f$bwCircleSimulation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getBwCircleRenderPixelRatio"])(window.devicePixelRatio, performanceMode);
                    width = bounds.width;
                    height = bounds.height;
                    canvas.width = Math.max(1, Math.round(bounds.width * ratio));
                    canvas.height = Math.max(1, Math.round(bounds.height * ratio));
                    canvas.style.width = `${bounds.width}px`;
                    canvas.style.height = `${bounds.height}px`;
                    context.setTransform(ratio, 0, 0, ratio, 0, 0);
                    sceneState = createSceneState(bounds.width, window.innerWidth, performanceMode);
                }
            }["BwCircleScene.useEffect.resize"];
            const render = {
                "BwCircleScene.useEffect.render": ()=>{
                    const nextPerformanceMode = getBwCircleScenePerformanceMode(modeRef.current, audioSyncRef.current.status);
                    if (nextPerformanceMode !== performanceMode) {
                        resize();
                    }
                    const layout = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$bw$2d$circle$2f$bwCircleSimulation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createMimesisLayout"])(width || window.innerWidth, window.innerWidth, performanceMode);
                    const ballRadius = layout.ballRadius;
                    const nowMs = performance.now();
                    const now = new Date();
                    const secondsWithinMinute = now.getSeconds() + now.getMilliseconds() / 1000;
                    const mimesisCue = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$bw$2d$circle$2f$bwCircleSimulation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createMimesisCue"])({
                        secondsWithinMinute
                    });
                    const playbackValue = playbackRef.current;
                    const modeValue = modeRef.current;
                    const analyser = analyserRef.current;
                    const frequencyData = frequencyDataRef.current;
                    const syncMotion = modeValue === "sync" ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$bw$2d$circle$2f$bwCircleSimulation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createSyncMotionProfile"])({
                        currentTime: playbackValue.currentTime,
                        isPlaying: playbackValue.isPlaying,
                        sampledAtMs: playbackValue.sampledAtMs,
                        nowMs,
                        bpm: bpmRef.current,
                        baseCameraMode: "normal",
                        shouldReduceMotion
                    }) : null;
                    const syncCue = syncMotion?.syncCue ?? null;
                    const audioCue = modeValue === "sync" && playbackValue.isPlaying && analyser && frequencyData && audioSyncRef.current.status === "active" ? ({
                        "BwCircleScene.useEffect.render": ()=>{
                            analyser.getByteFrequencyData(frequencyData);
                            const levels = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$bw$2d$circle$2f$bwCircleAudioSync$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["measureBwCircleFrequencyLevels"])(frequencyData);
                            const nextCue = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$bw$2d$circle$2f$bwCircleAudioSync$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createBwCircleAudioCue"])({
                                energy: levels.energy,
                                bassEnergy: levels.bassEnergy,
                                energyBaseline: audioEnergyBaselineRef.current,
                                bassEnergyBaseline: bassAudioEnergyBaselineRef.current,
                                previousEnergy: previousAudioEnergyRef.current,
                                previousBassEnergy: previousBassAudioEnergyRef.current,
                                shouldReduceMotion
                            });
                            previousAudioEnergyRef.current = levels.energy;
                            previousBassAudioEnergyRef.current = levels.bassEnergy;
                            audioEnergyBaselineRef.current += (levels.energy - audioEnergyBaselineRef.current) * AUDIO_BASELINE_BLEND;
                            bassAudioEnergyBaselineRef.current += (levels.bassEnergy - bassAudioEnergyBaselineRef.current) * AUDIO_BASELINE_BLEND;
                            return nextCue;
                        }
                    })["BwCircleScene.useEffect.render"]() : null;
                    if (modeValue !== "sync" || !playbackValue.isPlaying || audioSyncRef.current.status !== "active") {
                        resetEstimatedBpm();
                    }
                    const baseMotion = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$bw$2d$circle$2f$bwCircleAudioSync$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createBwCircleAudioBaseMotion"])({
                        audioControlsAccentMotion: modeValue === "sync" && playbackValue.isPlaying && audioSyncRef.current.status === "active" && analyser !== null && frequencyData !== null,
                        syncCue,
                        syncMotion
                    });
                    const reactiveMotion = modeValue === "sync" ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$bw$2d$circle$2f$bwCircleAudioSync$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createBwCircleAudioReactiveMotion"])({
                        audioCue,
                        baseMotion,
                        previousMotion: audioReactiveMotionRef.current,
                        shouldReduceMotion
                    }) : null;
                    audioReactiveMotionRef.current = modeValue === "sync" ? reactiveMotion : null;
                    const syncEnergy = reactiveMotion?.syncEnergy ?? baseMotion.syncEnergy;
                    const syncPulse = reactiveMotion?.syncPulse ?? baseMotion.syncPulse;
                    const syncSeconds = ((syncMotion?.predictedCurrentTime ?? playbackValue.currentTime) % 60 + 60) % 60;
                    const syncAngle = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$bw$2d$circle$2f$bwCircleSimulation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createMimesisCue"])({
                        secondsWithinMinute: syncSeconds
                    }).angle + (modeValue === "sync" ? (syncPulse - 0.5) * 0.1 : 0);
                    const angle = modeValue === "sync" && playbackValue.isPlaying ? syncAngle : mimesisCue.angle;
                    const gravity = layout.gravity * (modeValue === "sync" && playbackValue.isPlaying ? shouldReduceMotion ? 1 : 0.9 + syncEnergy * 0.25 : 1);
                    const bounce = layout.bounce + (modeValue === "sync" && playbackValue.isPlaying && !shouldReduceMotion ? (syncEnergy - 0.35) * 0.05 : 0);
                    const speedBoost = modeValue === "sync" && playbackValue.isPlaying && !shouldReduceMotion ? 0.92 + syncEnergy * 0.16 : 1;
                    const ballKick = modeValue === "sync" ? reactiveMotion?.ballKick ?? baseMotion.ballKick : 1;
                    const ballSquash = modeValue === "sync" ? reactiveMotion?.ballSquash ?? baseMotion.ballSquash : 0;
                    const particleAccent = modeValue === "sync" ? reactiveMotion?.particleAccent ?? baseMotion.particleAccent : 1;
                    const diagonal = Math.hypot(width, height);
                    const leftBallImpact = updateBall({
                        angle,
                        ball: sceneState.leftBall,
                        ballRadius,
                        beatKick: ballKick,
                        beatSquash: ballSquash,
                        bounce,
                        circleRadius: layout.circleRadius,
                        gravity,
                        isLeftSide: true,
                        speedBoost
                    });
                    const rightBallImpact = updateBall({
                        angle,
                        ball: sceneState.rightBall,
                        ballRadius,
                        beatKick: ballKick,
                        beatSquash: ballSquash,
                        bounce,
                        circleRadius: layout.circleRadius,
                        gravity,
                        isLeftSide: false,
                        speedBoost
                    });
                    releaseImpactParticles({
                        circleRadius: layout.circleRadius,
                        color: "#ffffff",
                        impact: leftBallImpact,
                        particles: sceneState.leftParticles,
                        splashParticles: sceneState.splashParticles
                    });
                    releaseImpactParticles({
                        circleRadius: layout.circleRadius,
                        color: "#000000",
                        impact: rightBallImpact,
                        particles: sceneState.rightParticles,
                        splashParticles: sceneState.splashParticles
                    });
                    sceneState.leftDividerLeakCooldown = updateParticles({
                        angle,
                        ball: sceneState.leftBall,
                        circleRadius: layout.circleRadius,
                        dividerLeakCooldown: sceneState.leftDividerLeakCooldown,
                        isRightHalf: false,
                        particleAccent,
                        particles: sceneState.leftParticles,
                        splashColor: "#ffffff",
                        splashParticles: sceneState.splashParticles
                    });
                    sceneState.rightDividerLeakCooldown = updateParticles({
                        angle,
                        ball: sceneState.rightBall,
                        circleRadius: layout.circleRadius,
                        dividerLeakCooldown: sceneState.rightDividerLeakCooldown,
                        isRightHalf: true,
                        particleAccent,
                        particles: sceneState.rightParticles,
                        splashColor: "#000000",
                        splashParticles: sceneState.splashParticles
                    });
                    updateSplashParticles({
                        circleRadius: layout.circleRadius,
                        sceneHeight: height,
                        sceneWidth: width,
                        splashParticles: sceneState.splashParticles
                    });
                    context.clearRect(0, 0, width, height);
                    context.save();
                    context.translate(width / 2, height / 2);
                    context.rotate(angle);
                    context.fillStyle = "#000000";
                    context.fillRect(-diagonal, -diagonal, diagonal, diagonal * 2);
                    context.fillStyle = "#ffffff";
                    context.fillRect(0, -diagonal, diagonal, diagonal * 2);
                    context.restore();
                    context.save();
                    context.translate(width / 2, height / 2);
                    context.beginPath();
                    context.arc(0, 0, layout.circleRadius, 0, Math.PI * 2);
                    context.clip();
                    context.rotate(angle);
                    context.fillStyle = "#ffffff";
                    context.fillRect(-diagonal, -diagonal, diagonal, diagonal * 2);
                    context.fillStyle = "#000000";
                    context.fillRect(0, -diagonal, diagonal, diagonal * 2);
                    context.restore();
                    context.save();
                    context.translate(width / 2, height / 2);
                    context.beginPath();
                    context.arc(0, 0, layout.circleRadius, 0, Math.PI * 2);
                    context.clip();
                    context.beginPath();
                    context.fillStyle = "#ffffff";
                    for (const particle of sceneState.rightParticles){
                        context.moveTo(particle.x + particle.radius, particle.y);
                        context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
                    }
                    context.fill();
                    context.beginPath();
                    context.fillStyle = "#000000";
                    for (const particle of sceneState.leftParticles){
                        context.moveTo(particle.x + particle.radius, particle.y);
                        context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
                    }
                    context.fill();
                    drawBall(context, sceneState.leftBall, ballRadius);
                    drawBall(context, sceneState.rightBall, ballRadius);
                    context.restore();
                    for (const particle of sceneState.splashParticles){
                        context.globalAlpha = particle.life;
                        context.beginPath();
                        context.arc(width / 2 + particle.x, height / 2 + particle.y, particle.radius, 0, Math.PI * 2);
                        context.fillStyle = particle.color;
                        context.fill();
                    }
                    context.globalAlpha = 1;
                    animationFrame = window.requestAnimationFrame(render);
                }
            }["BwCircleScene.useEffect.render"];
            resize();
            window.addEventListener("resize", resize);
            animationFrame = window.requestAnimationFrame(render);
            return ({
                "BwCircleScene.useEffect": ()=>{
                    resetEstimatedBpm();
                    window.removeEventListener("resize", resize);
                    window.cancelAnimationFrame(animationFrame);
                }
            })["BwCircleScene.useEffect"];
        }
    }["BwCircleScene.useEffect"], [
        playbackRef,
        shouldReduceMotion
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$bw$2d$circle$2f$BwCircleProject$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].sceneShell,
        "data-scene-mode": mode,
        children: [
            syncOverlay ? syncOverlay : null,
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("canvas", {
                "aria-label": "Black and white circle canvas",
                className: __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$bw$2d$circle$2f$BwCircleProject$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].canvas,
                ref: canvasRef
            }, void 0, false, {
                fileName: "[project]/Development/Portfolio/mimesis/src/projects/bw-circle/BwCircleScene.tsx",
                lineNumber: 1136,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Development/Portfolio/mimesis/src/projects/bw-circle/BwCircleScene.tsx",
        lineNumber: 1134,
        columnNumber: 5
    }, this);
}
_s(BwCircleScene, "doeBXqpiH/XUXb1lw9KLadiWATA=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$reduced$2d$motion$2f$use$2d$reduced$2d$motion$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReducedMotion"],
        __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffectEvent"],
        __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffectEvent"]
    ];
});
_c = BwCircleScene;
var _c;
__turbopack_context__.k.register(_c, "BwCircleScene");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Development/Portfolio/mimesis/src/projects/bw-circle/bwCircleCanvasContrast.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "determineBwCircleContrastTone",
    ()=>determineBwCircleContrastTone,
    "readBwCircleCanvasContrastTone",
    ()=>readBwCircleCanvasContrastTone,
    "sampleBwCircleCanvasContrastTone",
    ()=>sampleBwCircleCanvasContrastTone
]);
const BASE_LUMINANCE_THRESHOLD = 0.52;
const LIGHT_TO_DARK_THRESHOLD = 0.58;
const DARK_TO_LIGHT_THRESHOLD = 0.46;
const SAMPLE_COLUMNS = 3;
const SAMPLE_ROWS = 3;
function clamp(value, min, max) {
    return Math.min(max, Math.max(min, value));
}
function measurePixelLuminance(pixel) {
    const alpha = (pixel[3] ?? 255) / 255;
    if (alpha <= 0) {
        return null;
    }
    const red = pixel[0] ?? 0;
    const green = pixel[1] ?? 0;
    const blue = pixel[2] ?? 0;
    return (0.2126 * red + 0.7152 * green + 0.0722 * blue) / 255 * alpha;
}
function determineBwCircleContrastTone(averageLuminance, previousTone = null) {
    if (previousTone === "light") {
        return averageLuminance >= LIGHT_TO_DARK_THRESHOLD ? "dark" : "light";
    }
    if (previousTone === "dark") {
        return averageLuminance <= DARK_TO_LIGHT_THRESHOLD ? "light" : "dark";
    }
    return averageLuminance >= BASE_LUMINANCE_THRESHOLD ? "dark" : "light";
}
function sampleBwCircleCanvasContrastTone({ canvasHeight, canvasRect, canvasWidth, previousTone = null, readPixel, targetRect }) {
    if (canvasWidth <= 0 || canvasHeight <= 0 || canvasRect.width <= 0 || canvasRect.height <= 0) {
        return null;
    }
    const overlapLeft = Math.max(targetRect.left, canvasRect.left);
    const overlapRight = Math.min(targetRect.right, canvasRect.right);
    const overlapTop = Math.max(targetRect.top, canvasRect.top);
    const overlapBottom = Math.min(targetRect.bottom, canvasRect.bottom);
    if (overlapRight <= overlapLeft || overlapBottom <= overlapTop) {
        return null;
    }
    let luminanceTotal = 0;
    let luminanceSamples = 0;
    for(let row = 0; row < SAMPLE_ROWS; row += 1){
        const sampleY = overlapTop + (row + 0.5) * (overlapBottom - overlapTop) / SAMPLE_ROWS;
        for(let column = 0; column < SAMPLE_COLUMNS; column += 1){
            const sampleX = overlapLeft + (column + 0.5) * (overlapRight - overlapLeft) / SAMPLE_COLUMNS;
            const canvasX = clamp(Math.round((sampleX - canvasRect.left) / canvasRect.width * (canvasWidth - 1)), 0, canvasWidth - 1);
            const canvasY = clamp(Math.round((sampleY - canvasRect.top) / canvasRect.height * (canvasHeight - 1)), 0, canvasHeight - 1);
            const pixel = readPixel(canvasX, canvasY);
            if (!pixel) {
                continue;
            }
            const luminance = measurePixelLuminance(pixel);
            if (luminance === null) {
                continue;
            }
            luminanceTotal += luminance;
            luminanceSamples += 1;
        }
    }
    if (luminanceSamples === 0) {
        return null;
    }
    return determineBwCircleContrastTone(luminanceTotal / luminanceSamples, previousTone);
}
function readBwCircleCanvasContrastTone({ canvas, previousTone = null, targetRect }) {
    try {
        const context = canvas.getContext("2d");
        if (!context) {
            return null;
        }
        return sampleBwCircleCanvasContrastTone({
            canvasHeight: canvas.height,
            canvasRect: canvas.getBoundingClientRect(),
            canvasWidth: canvas.width,
            previousTone,
            readPixel: (x, y)=>context.getImageData(x, y, 1, 1).data,
            targetRect
        });
    } catch  {
        return null;
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Development/Portfolio/mimesis/src/projects/bw-circle/bwCircleYouTube.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "parseYouTubeVideoId",
    ()=>parseYouTubeVideoId
]);
const YOUTUBE_HOSTS = new Set([
    "youtube.com",
    "www.youtube.com",
    "m.youtube.com",
    "youtu.be",
    "www.youtu.be"
]);
function normalizeVideoId(candidate) {
    if (!candidate) {
        return null;
    }
    return /^[A-Za-z0-9_-]{11}$/.test(candidate) ? candidate : null;
}
function parseYouTubeVideoId(input) {
    try {
        const url = new URL(input);
        if (!YOUTUBE_HOSTS.has(url.hostname)) {
            return null;
        }
        if (url.hostname.endsWith("youtu.be")) {
            return normalizeVideoId(url.pathname.split("/").filter(Boolean)[0]);
        }
        if (url.pathname === "/watch") {
            return normalizeVideoId(url.searchParams.get("v"));
        }
        if (url.pathname.startsWith("/embed/")) {
            return normalizeVideoId(url.pathname.split("/")[2]);
        }
        if (url.pathname.startsWith("/shorts/")) {
            return normalizeVideoId(url.pathname.split("/")[2]);
        }
        return null;
    } catch  {
        return null;
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Development/Portfolio/mimesis/src/projects/bw-circle/BwCircleYouTubePanel.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>BwCircleYouTubePanel
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Development/Portfolio/mimesis/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Development/Portfolio/mimesis/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$bw$2d$circle$2f$bwCircleCanvasContrast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Development/Portfolio/mimesis/src/projects/bw-circle/bwCircleCanvasContrast.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$bw$2d$circle$2f$bwCircleYouTube$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Development/Portfolio/mimesis/src/projects/bw-circle/bwCircleYouTube.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$bw$2d$circle$2f$BwCircleProject$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/Development/Portfolio/mimesis/src/projects/bw-circle/BwCircleProject.module.css [app-client] (css module)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
const IDLE_PLAYBACK_STATE = {
    currentTime: 0,
    isPlaying: false,
    sampledAtMs: 0
};
const DEFAULT_TEMPO_BADGE_TONE = "light";
const TEMPO_BADGE_SAMPLE_INTERVAL_MS = 80;
const PLACEHOLDER_URL = "https://youtu.be/97qr0BOdHkc?si=xgT_cD0WHCGQsn_C";
let youTubeApiPromise = null;
function createAudioOnlySyncStream(stream) {
    const audioTracks = stream.getAudioTracks();
    for (const videoTrack of stream.getVideoTracks()){
        videoTrack.stop();
    }
    return new MediaStream(audioTracks);
}
function hasQueryablePlaybackState(player) {
    return typeof player?.getCurrentTime === "function" && typeof player.getPlayerState === "function";
}
function hasPlaybackControls(player) {
    return hasQueryablePlaybackState(player) && typeof player.cueVideoById === "function" && typeof player.playVideo === "function" && typeof player.stopVideo === "function";
}
function getYouTubeErrorMessage(code) {
    switch(code){
        case 2:
            return "This YouTube link is invalid.";
        case 100:
            return "This video is unavailable.";
        case 101:
        case 150:
            return "This video can't be played in an embedded player.";
        default:
            return "This video can't be played right now.";
    }
}
function ensureYouTubeIframeApi() {
    if (window.YT?.Player) {
        return Promise.resolve();
    }
    if (youTubeApiPromise) {
        return youTubeApiPromise;
    }
    youTubeApiPromise = new Promise((resolve)=>{
        const previousReady = window.onYouTubeIframeAPIReady;
        window.onYouTubeIframeAPIReady = ()=>{
            previousReady?.();
            resolve();
        };
        const existingScript = document.querySelector('script[src="https://www.youtube.com/iframe_api"]');
        if (existingScript) {
            return;
        }
        const script = document.createElement("script");
        script.src = "https://www.youtube.com/iframe_api";
        script.async = true;
        document.head.appendChild(script);
    });
    return youTubeApiPromise;
}
function BwCircleYouTubePanel({ audioSyncStatus = "idle", estimatedBpm = null, onAudioSyncChange = ()=>{}, onLoad, onPlaybackChange, videoId }) {
    _s();
    const [input, setInput] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isPlaying, setIsPlaying] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [tempoBadgeTone, setTempoBadgeTone] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(DEFAULT_TEMPO_BADGE_TONE);
    const inputRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const tempoBadgeRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const playerHostRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const playerMountNodeRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const playerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const playerReadyRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    const pollRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const playbackCallbackRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(onPlaybackChange);
    const latestVideoIdRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(videoId);
    const pendingPlayRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    const playerCreationInFlightRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    const skipCueVideoIdRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const tempoBadgeToneRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(DEFAULT_TEMPO_BADGE_TONE);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "BwCircleYouTubePanel.useEffect": ()=>{
            playbackCallbackRef.current = onPlaybackChange;
        }
    }["BwCircleYouTubePanel.useEffect"], [
        onPlaybackChange
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "BwCircleYouTubePanel.useEffect": ()=>{
            latestVideoIdRef.current = videoId;
        }
    }["BwCircleYouTubePanel.useEffect"], [
        videoId
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "BwCircleYouTubePanel.useEffect": ()=>{
            tempoBadgeToneRef.current = tempoBadgeTone;
        }
    }["BwCircleYouTubePanel.useEffect"], [
        tempoBadgeTone
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "BwCircleYouTubePanel.useEffect": ()=>{
            const updateTempoBadgeTone = {
                "BwCircleYouTubePanel.useEffect.updateTempoBadgeTone": ()=>{
                    const badge = tempoBadgeRef.current;
                    if (!badge) {
                        return;
                    }
                    const sceneShell = badge.closest("[data-scene-mode]");
                    const canvas = sceneShell?.querySelector("canvas");
                    if (!(canvas instanceof HTMLCanvasElement)) {
                        return;
                    }
                    const nextTone = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$bw$2d$circle$2f$bwCircleCanvasContrast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["readBwCircleCanvasContrastTone"])({
                        canvas,
                        previousTone: tempoBadgeToneRef.current,
                        targetRect: badge.getBoundingClientRect()
                    });
                    if (!nextTone || nextTone === tempoBadgeToneRef.current) {
                        return;
                    }
                    tempoBadgeToneRef.current = nextTone;
                    setTempoBadgeTone(nextTone);
                }
            }["BwCircleYouTubePanel.useEffect.updateTempoBadgeTone"];
            updateTempoBadgeTone();
            const interval = window.setInterval(updateTempoBadgeTone, TEMPO_BADGE_SAMPLE_INTERVAL_MS);
            return ({
                "BwCircleYouTubePanel.useEffect": ()=>{
                    window.clearInterval(interval);
                }
            })["BwCircleYouTubePanel.useEffect"];
        }
    }["BwCircleYouTubePanel.useEffect"], []);
    const commitInputVideo = (candidateInput = input, { usePlaceholderWhenEmpty = false } = {})=>{
        const trimmedInput = candidateInput.trim();
        const resolvedInput = trimmedInput || (usePlaceholderWhenEmpty && !videoId ? PLACEHOLDER_URL : "");
        if (!resolvedInput) {
            return videoId;
        }
        const nextVideoId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$bw$2d$circle$2f$bwCircleYouTube$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseYouTubeVideoId"])(resolvedInput);
        if (!nextVideoId) {
            setError("Enter a valid YouTube link.");
            return null;
        }
        if (nextVideoId !== videoId) {
            setIsPlaying(false);
            onLoad(nextVideoId);
        }
        setError(null);
        return nextVideoId;
    };
    const requestAudioSync = async ()=>{
        if (audioSyncStatus === "active" || audioSyncStatus === "prompting") {
            return;
        }
        if (!navigator.mediaDevices?.getDisplayMedia) {
            onAudioSyncChange({
                status: "unsupported",
                stream: null
            });
            return;
        }
        onAudioSyncChange({
            status: "prompting",
            stream: null
        });
        try {
            const displayMediaOptions = {
                video: true,
                audio: true,
                preferCurrentTab: true,
                selfBrowserSurface: "include",
                surfaceSwitching: "include"
            };
            const stream = await navigator.mediaDevices.getDisplayMedia(displayMediaOptions);
            const audioOnlyStream = createAudioOnlySyncStream(stream);
            onAudioSyncChange({
                status: "active",
                stream: audioOnlyStream
            });
        } catch (captureError) {
            const status = captureError instanceof DOMException && captureError.name === "NotAllowedError" ? "denied" : "unsupported";
            onAudioSyncChange({
                status,
                stream: null
            });
        }
    };
    const handlePlaybackToggle = ()=>{
        const player = playerRef.current;
        if (isPlaying) {
            pendingPlayRef.current = false;
            if (hasPlaybackControls(player)) {
                player.stopVideo();
            }
            setIsPlaying(false);
            playbackCallbackRef.current(IDLE_PLAYBACK_STATE);
            return;
        }
        const nextVideoId = commitInputVideo(inputRef.current?.value ?? input, {
            usePlaceholderWhenEmpty: true
        });
        if (!nextVideoId) {
            return;
        }
        pendingPlayRef.current = true;
        if (audioSyncStatus !== "active" && audioSyncStatus !== "prompting") {
            void requestAudioSync();
        }
        if (hasPlaybackControls(player) && playerReadyRef.current) {
            if (nextVideoId !== videoId) {
                skipCueVideoIdRef.current = nextVideoId;
                player.loadVideoById(nextVideoId);
                pendingPlayRef.current = false;
                return;
            }
            player.playVideo();
            pendingPlayRef.current = false;
            return;
        }
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "BwCircleYouTubePanel.useEffect": ()=>{
            const player = playerRef.current;
            if (!videoId || !hasPlaybackControls(player) || !playerReadyRef.current) {
                return;
            }
            if (skipCueVideoIdRef.current === videoId) {
                skipCueVideoIdRef.current = null;
                return;
            }
            player.cueVideoById(videoId);
            playbackCallbackRef.current(IDLE_PLAYBACK_STATE);
        }
    }["BwCircleYouTubePanel.useEffect"], [
        videoId
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "BwCircleYouTubePanel.useEffect": ()=>{
            if (!videoId || !playerHostRef.current) {
                return;
            }
            if (playerRef.current || playerCreationInFlightRef.current) {
                return;
            }
            let cancelled = false;
            playerCreationInFlightRef.current = true;
            const stopPolling = {
                "BwCircleYouTubePanel.useEffect.stopPolling": ()=>{
                    if (pollRef.current) {
                        window.clearInterval(pollRef.current);
                        pollRef.current = null;
                    }
                }
            }["BwCircleYouTubePanel.useEffect.stopPolling"];
            const startPolling = {
                "BwCircleYouTubePanel.useEffect.startPolling": ()=>{
                    if (pollRef.current) {
                        return;
                    }
                    pollRef.current = window.setInterval(updatePlayback, 180);
                }
            }["BwCircleYouTubePanel.useEffect.startPolling"];
            const updatePlayback = {
                "BwCircleYouTubePanel.useEffect.updatePlayback": (event)=>{
                    const player = event?.target ?? playerRef.current;
                    if (!hasQueryablePlaybackState(player)) {
                        return;
                    }
                    playerRef.current = player;
                    const nextIsPlaying = event && "data" in event ? event.data === 1 : player.getPlayerState() === 1;
                    const sampledAtMs = performance.now();
                    setIsPlaying(nextIsPlaying);
                    playbackCallbackRef.current({
                        currentTime: player.getCurrentTime() || 0,
                        isPlaying: nextIsPlaying,
                        sampledAtMs
                    });
                }
            }["BwCircleYouTubePanel.useEffect.updatePlayback"];
            ensureYouTubeIframeApi().then({
                "BwCircleYouTubePanel.useEffect": ()=>{
                    if (cancelled || !playerHostRef.current || !window.YT?.Player) {
                        playerCreationInFlightRef.current = false;
                        return;
                    }
                    playerRef.current?.destroy();
                    playerHostRef.current.replaceChildren();
                    playerMountNodeRef.current = document.createElement("div");
                    playerHostRef.current.appendChild(playerMountNodeRef.current);
                    playerRef.current = new window.YT.Player(playerMountNodeRef.current, {
                        width: "200",
                        height: "200",
                        playerVars: {
                            origin: window.location.origin,
                            playsinline: 1,
                            rel: 0
                        },
                        ...latestVideoIdRef.current ? {
                            videoId: latestVideoIdRef.current
                        } : {},
                        events: {
                            onReady: {
                                "BwCircleYouTubePanel.useEffect": (event)=>{
                                    const player = event.target;
                                    playerRef.current = player;
                                    playerReadyRef.current = true;
                                    if (hasPlaybackControls(player)) {
                                        if (pendingPlayRef.current && latestVideoIdRef.current) {
                                            skipCueVideoIdRef.current = latestVideoIdRef.current;
                                            player.loadVideoById(latestVideoIdRef.current);
                                            pendingPlayRef.current = false;
                                        } else if (latestVideoIdRef.current) {
                                            player.cueVideoById(latestVideoIdRef.current);
                                        }
                                    }
                                    updatePlayback(event);
                                    if (player.getPlayerState() === 1) {
                                        startPolling();
                                    }
                                }
                            }["BwCircleYouTubePanel.useEffect"],
                            onError: {
                                "BwCircleYouTubePanel.useEffect": (event)=>{
                                    stopPolling();
                                    setError(getYouTubeErrorMessage(event.data));
                                    setIsPlaying(false);
                                    pendingPlayRef.current = false;
                                    playbackCallbackRef.current(IDLE_PLAYBACK_STATE);
                                }
                            }["BwCircleYouTubePanel.useEffect"],
                            onStateChange: {
                                "BwCircleYouTubePanel.useEffect": (event)=>{
                                    if (event.data === 0) {
                                        stopPolling();
                                        setIsPlaying(false);
                                        pendingPlayRef.current = false;
                                        playbackCallbackRef.current(IDLE_PLAYBACK_STATE);
                                        return;
                                    }
                                    if (event.data === 1) {
                                        setError(null);
                                        startPolling();
                                        pendingPlayRef.current = false;
                                    }
                                    updatePlayback(event);
                                }
                            }["BwCircleYouTubePanel.useEffect"]
                        }
                    });
                    playerCreationInFlightRef.current = false;
                }
            }["BwCircleYouTubePanel.useEffect"]);
            return ({
                "BwCircleYouTubePanel.useEffect": ()=>{
                    cancelled = true;
                    playerCreationInFlightRef.current = false;
                }
            })["BwCircleYouTubePanel.useEffect"];
        }
    }["BwCircleYouTubePanel.useEffect"], [
        videoId
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "BwCircleYouTubePanel.useEffect": ()=>{
            const playerHost = playerHostRef.current;
            return ({
                "BwCircleYouTubePanel.useEffect": ()=>{
                    if (pollRef.current) {
                        window.clearInterval(pollRef.current);
                        pollRef.current = null;
                    }
                    playerReadyRef.current = false;
                    playerCreationInFlightRef.current = false;
                    playerRef.current?.destroy();
                    playerRef.current = null;
                    playerMountNodeRef.current = null;
                    playerHost?.replaceChildren();
                    pendingPlayRef.current = false;
                    playbackCallbackRef.current(IDLE_PLAYBACK_STATE);
                }
            })["BwCircleYouTubePanel.useEffect"];
        }
    }["BwCircleYouTubePanel.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$bw$2d$circle$2f$BwCircleProject$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].syncPanel,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$bw$2d$circle$2f$BwCircleProject$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].syncControls,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$bw$2d$circle$2f$BwCircleProject$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].inputRow,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$bw$2d$circle$2f$BwCircleProject$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].linkInput,
                                ref: inputRef,
                                onBlur: (event)=>{
                                    commitInputVideo(event.currentTarget.value);
                                },
                                onChange: (event)=>setInput(event.target.value),
                                onKeyDown: (event)=>{
                                    if (event.key === "Enter") {
                                        event.preventDefault();
                                        commitInputVideo(event.currentTarget.value);
                                    }
                                },
                                placeholder: PLACEHOLDER_URL,
                                type: "url",
                                value: input
                            }, void 0, false, {
                                fileName: "[project]/Development/Portfolio/mimesis/src/projects/bw-circle/BwCircleYouTubePanel.tsx",
                                lineNumber: 535,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$bw$2d$circle$2f$BwCircleProject$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].playbackButton,
                                onClick: handlePlaybackToggle,
                                type: "button",
                                children: isPlaying ? "Stop" : "Play"
                            }, void 0, false, {
                                fileName: "[project]/Development/Portfolio/mimesis/src/projects/bw-circle/BwCircleYouTubePanel.tsx",
                                lineNumber: 552,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                "aria-live": "polite",
                                className: `${__TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$bw$2d$circle$2f$BwCircleProject$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].tempoBadge} ${tempoBadgeTone === "dark" ? __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$bw$2d$circle$2f$BwCircleProject$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].tempoBadgeDark : __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$bw$2d$circle$2f$BwCircleProject$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].tempoBadgeLight}`,
                                "data-contrast-tone": tempoBadgeTone,
                                ref: tempoBadgeRef,
                                children: estimatedBpm === null ? "-- BPM" : `${estimatedBpm} BPM`
                            }, void 0, false, {
                                fileName: "[project]/Development/Portfolio/mimesis/src/projects/bw-circle/BwCircleYouTubePanel.tsx",
                                lineNumber: 559,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Development/Portfolio/mimesis/src/projects/bw-circle/BwCircleYouTubePanel.tsx",
                        lineNumber: 534,
                        columnNumber: 9
                    }, this),
                    error ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$bw$2d$circle$2f$BwCircleProject$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].errorText,
                        children: error
                    }, void 0, false, {
                        fileName: "[project]/Development/Portfolio/mimesis/src/projects/bw-circle/BwCircleYouTubePanel.tsx",
                        lineNumber: 572,
                        columnNumber: 18
                    }, this) : null
                ]
            }, void 0, true, {
                fileName: "[project]/Development/Portfolio/mimesis/src/projects/bw-circle/BwCircleYouTubePanel.tsx",
                lineNumber: 533,
                columnNumber: 7
            }, this),
            videoId ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$bw$2d$circle$2f$BwCircleProject$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].previewFrame,
                "data-youtube-preview": "true",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$bw$2d$circle$2f$BwCircleProject$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].previewHost,
                    "data-youtube-player-host": "true",
                    ref: playerHostRef
                }, void 0, false, {
                    fileName: "[project]/Development/Portfolio/mimesis/src/projects/bw-circle/BwCircleYouTubePanel.tsx",
                    lineNumber: 576,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/Development/Portfolio/mimesis/src/projects/bw-circle/BwCircleYouTubePanel.tsx",
                lineNumber: 575,
                columnNumber: 9
            }, this) : null
        ]
    }, void 0, true, {
        fileName: "[project]/Development/Portfolio/mimesis/src/projects/bw-circle/BwCircleYouTubePanel.tsx",
        lineNumber: 532,
        columnNumber: 5
    }, this);
}
_s(BwCircleYouTubePanel, "d9iBvbV/7auSlX74J9EXy6Tbk0Q=");
_c = BwCircleYouTubePanel;
var _c;
__turbopack_context__.k.register(_c, "BwCircleYouTubePanel");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Development/Portfolio/mimesis/src/projects/bw-circle/BwCircleProject.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>BwCircleProject
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Development/Portfolio/mimesis/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Development/Portfolio/mimesis/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$bw$2d$circle$2f$BwCircleProject$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/Development/Portfolio/mimesis/src/projects/bw-circle/BwCircleProject.module.css [app-client] (css module)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$bw$2d$circle$2f$BwCircleScene$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Development/Portfolio/mimesis/src/projects/bw-circle/BwCircleScene.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$bw$2d$circle$2f$BwCircleYouTubePanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Development/Portfolio/mimesis/src/projects/bw-circle/BwCircleYouTubePanel.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
const IDLE_PLAYBACK_STATE = {
    currentTime: 0,
    isPlaying: false,
    sampledAtMs: 0
};
const IDLE_AUDIO_SYNC_STATE = {
    status: "idle",
    stream: null
};
const AUDIO_SYNC_PERMISSION_COPY = "*Allow permission to use audio sync for this feature.";
function BwCircleProject({ projectId }) {
    _s();
    const [mode, setMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("mimesis");
    const [videoId, setVideoId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [audioSync, setAudioSync] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(IDLE_AUDIO_SYNC_STATE);
    const [estimatedBpm, setEstimatedBpm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const playbackRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(IDLE_PLAYBACK_STATE);
    const syncBpm = 120;
    const handleModeChange = (nextMode)=>{
        setMode(nextMode);
        if (nextMode === "mimesis") {
            playbackRef.current = IDLE_PLAYBACK_STATE;
            setEstimatedBpm(null);
        }
    };
    const handleVideoLoad = (nextVideoId)=>{
        setVideoId(nextVideoId);
        playbackRef.current = IDLE_PLAYBACK_STATE;
        setEstimatedBpm(null);
    };
    const handlePlaybackChange = (nextPlayback)=>{
        playbackRef.current = nextPlayback;
    };
    const handleAudioSyncChange = (nextAudioSync)=>{
        setAudioSync(nextAudioSync);
        if (nextAudioSync.status !== "active") {
            setEstimatedBpm(null);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$bw$2d$circle$2f$BwCircleProject$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].interactivePane,
        "data-project-id": projectId,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$bw$2d$circle$2f$BwCircleProject$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].modeToggleRow,
                "data-sync-mode-row": "true",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$bw$2d$circle$2f$BwCircleProject$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].modeToggle,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: `${__TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$bw$2d$circle$2f$BwCircleProject$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].modeButton} ${mode === "mimesis" ? __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$bw$2d$circle$2f$BwCircleProject$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].modeButtonActive : ""}`,
                                "data-mode": "mimesis",
                                onClick: ()=>handleModeChange("mimesis"),
                                type: "button",
                                children: "Mimesis"
                            }, void 0, false, {
                                fileName: "[project]/Development/Portfolio/mimesis/src/projects/bw-circle/BwCircleProject.tsx",
                                lineNumber: 85,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: `${__TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$bw$2d$circle$2f$BwCircleProject$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].modeButton} ${mode === "sync" ? __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$bw$2d$circle$2f$BwCircleProject$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].modeButtonActive : ""}`,
                                "data-mode": "sync",
                                onClick: ()=>handleModeChange("sync"),
                                type: "button",
                                children: "Sync"
                            }, void 0, false, {
                                fileName: "[project]/Development/Portfolio/mimesis/src/projects/bw-circle/BwCircleProject.tsx",
                                lineNumber: 93,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Development/Portfolio/mimesis/src/projects/bw-circle/BwCircleProject.tsx",
                        lineNumber: 84,
                        columnNumber: 9
                    }, this),
                    mode === "sync" && audioSync.status !== "active" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$bw$2d$circle$2f$BwCircleProject$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].permissionText,
                        children: AUDIO_SYNC_PERMISSION_COPY
                    }, void 0, false, {
                        fileName: "[project]/Development/Portfolio/mimesis/src/projects/bw-circle/BwCircleProject.tsx",
                        lineNumber: 103,
                        columnNumber: 11
                    }, this) : null
                ]
            }, void 0, true, {
                fileName: "[project]/Development/Portfolio/mimesis/src/projects/bw-circle/BwCircleProject.tsx",
                lineNumber: 83,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$bw$2d$circle$2f$BwCircleScene$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                audioSync: audioSync,
                bpm: syncBpm,
                mode: mode,
                onEstimatedBpmChange: setEstimatedBpm,
                playbackRef: playbackRef,
                syncOverlay: mode === "sync" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$bw$2d$circle$2f$BwCircleYouTubePanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    audioSyncStatus: audioSync.status,
                    estimatedBpm: estimatedBpm,
                    onAudioSyncChange: handleAudioSyncChange,
                    onLoad: handleVideoLoad,
                    onPlaybackChange: handlePlaybackChange,
                    videoId: videoId
                }, void 0, false, {
                    fileName: "[project]/Development/Portfolio/mimesis/src/projects/bw-circle/BwCircleProject.tsx",
                    lineNumber: 114,
                    columnNumber: 13
                }, void 0) : null
            }, void 0, false, {
                fileName: "[project]/Development/Portfolio/mimesis/src/projects/bw-circle/BwCircleProject.tsx",
                lineNumber: 106,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Development/Portfolio/mimesis/src/projects/bw-circle/BwCircleProject.tsx",
        lineNumber: 82,
        columnNumber: 5
    }, this);
}
_s(BwCircleProject, "0mWze6PA7h13h3S43ocT56N8knM=");
_c = BwCircleProject;
var _c;
__turbopack_context__.k.register(_c, "BwCircleProject");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Development/Portfolio/mimesis/src/projects/bw-circle/BwCircleProject.tsx [app-client] (ecmascript, next/dynamic entry)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/Development/Portfolio/mimesis/src/projects/bw-circle/BwCircleProject.tsx [app-client] (ecmascript)"));
}),
]);

//# sourceMappingURL=Development_Portfolio_mimesis_src_projects_bw-circle_9b181254._.js.map