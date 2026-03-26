(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/Development/Portfolio/mimesis/src/projects/page-curl/PageCurlProject.module.css [app-client] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "controlItem": "PageCurlProject-module__3imEBW__controlItem",
  "controlLabel": "PageCurlProject-module__3imEBW__controlLabel",
  "curlCanvas": "PageCurlProject-module__3imEBW__curlCanvas",
  "embedControls": "PageCurlProject-module__3imEBW__embedControls",
  "embedWrapper": "PageCurlProject-module__3imEBW__embedWrapper",
  "interactivePane": "PageCurlProject-module__3imEBW__interactivePane",
  "modeButton": "PageCurlProject-module__3imEBW__modeButton",
  "modeButtonActive": "PageCurlProject-module__3imEBW__modeButtonActive",
  "modeToggle": "PageCurlProject-module__3imEBW__modeToggle",
  "slider": "PageCurlProject-module__3imEBW__slider",
});
}),
"[project]/Development/Portfolio/mimesis/src/projects/page-curl/PageCurlEmbed.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>PageCurlEmbed
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Development/Portfolio/mimesis/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Development/Portfolio/mimesis/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$page$2d$curl$2f$PageCurlProject$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/Development/Portfolio/mimesis/src/projects/page-curl/PageCurlProject.module.css [app-client] (css module)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
const PAD_RATIO = 0.08 // 8% of smaller dimension as padding on each side
;
// Returns the edge origin point and inward unit direction for a given angle.
// Angle is in degrees; 0 = right edge, 90 = bottom, 180 = left, 270 = top.
// Works in pixel space so the direction is visually correct for the canvas size.
function getOrigin(angleDeg, W, H) {
    const rad = angleDeg * Math.PI / 180;
    const dx = Math.cos(rad) // outward x (pixels)
    ;
    const dy = Math.sin(rad) // outward y (pixels)
    ;
    // Ray from center (W/2, H/2) outward — find t where it hits the edge
    const tx = dx !== 0 ? dx > 0 ? (W - W / 2) / dx : (0 - W / 2) / dx : Infinity;
    const ty = dy !== 0 ? dy > 0 ? (H - H / 2) / dy : (0 - H / 2) / dy : Infinity;
    const t = Math.min(tx, ty);
    const origin = {
        x: Math.max(0, Math.min(W, W / 2 + dx * t)),
        y: Math.max(0, Math.min(H, H / 2 + dy * t))
    };
    const len = Math.sqrt(dx * dx + dy * dy);
    const inward = {
        x: -dx / len,
        y: -dy / len
    };
    // max distance: fold must sweep past the farthest corner for a full flip
    const corners = [
        {
            x: 0,
            y: 0
        },
        {
            x: W,
            y: 0
        },
        {
            x: W,
            y: H
        },
        {
            x: 0,
            y: H
        }
    ];
    const maxProj = Math.max(...corners.map((c)=>(c.x - origin.x) * inward.x + (c.y - origin.y) * inward.y));
    const maxDist = 2 * maxProj // fold is at midpoint, so dist = 2× to reach farthest corner
    ;
    return {
        origin,
        inward,
        maxDist
    };
}
function clipPoly(poly, ox, oy, nx, ny) {
    const out = [];
    const n = poly.length;
    for(let i = 0; i < n; i++){
        const a = poly[i], b = poly[(i + 1) % n];
        const da = (a.x - ox) * nx + (a.y - oy) * ny;
        const db = (b.x - ox) * nx + (b.y - oy) * ny;
        if (da >= 0) out.push(a);
        if (da >= 0 !== db >= 0) {
            const t = da / (da - db);
            out.push({
                x: a.x + t * (b.x - a.x),
                y: a.y + t * (b.y - a.y)
            });
        }
    }
    return out;
}
function reflectPt(p, lx, ly, ldx, ldy) {
    const nx = -ldy, ny = ldx;
    const d = (p.x - lx) * nx + (p.y - ly) * ny;
    return {
        x: p.x - 2 * d * nx,
        y: p.y - 2 * d * ny
    };
}
function tracePoly(ctx, pts) {
    if (pts.length < 2) return;
    ctx.moveTo(pts[0].x, pts[0].y);
    for(let i = 1; i < pts.length; i++)ctx.lineTo(pts[i].x, pts[i].y);
    ctx.closePath();
}
// dist: peel distance in pixels from the edge origin toward center
function draw(canvas, angleDeg, dist, backOpacity, front, dpr, padding// space around the page for curl overflow
) {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const canvasW = canvas.width / dpr;
    const canvasH = canvas.height / dpr;
    const W = canvasW - 2 * padding;
    const H = canvasH - 2 * padding;
    if (W <= 0 || H <= 0) return;
    ctx.save();
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, canvasW, canvasH);
    ctx.translate(padding, padding);
    const rPage = Math.min(12, W / 2, H / 2);
    const page = [];
    const steps = 8;
    for(let i = 0; i <= steps; i++){
        const a = i / steps * (Math.PI / 2) - Math.PI / 2;
        page.push({
            x: W - rPage + rPage * Math.cos(a),
            y: rPage + rPage * Math.sin(a)
        });
    }
    for(let i = 0; i <= steps; i++){
        const a = i / steps * (Math.PI / 2);
        page.push({
            x: W - rPage + rPage * Math.cos(a),
            y: H - rPage + rPage * Math.sin(a)
        });
    }
    for(let i = 0; i <= steps; i++){
        const a = i / steps * (Math.PI / 2) + Math.PI / 2;
        page.push({
            x: rPage + rPage * Math.cos(a),
            y: H - rPage + rPage * Math.sin(a)
        });
    }
    for(let i = 0; i <= steps; i++){
        const a = i / steps * (Math.PI / 2) + Math.PI;
        page.push({
            x: rPage + rPage * Math.cos(a),
            y: rPage + rPage * Math.sin(a)
        });
    }
    if (dist <= 0) {
        ctx.save();
        ctx.beginPath();
        tracePoly(ctx, page);
        ctx.clip();
        if (front) ctx.drawImage(front, 0, 0, W, H);
        else {
            ctx.fillStyle = '#fff';
            ctx.fillRect(0, 0, W, H);
        }
        ctx.restore();
        ctx.restore();
        return;
    }
    const { origin, inward } = getOrigin(angleDeg, W, H);
    // Tip in pixel space
    const tip = {
        x: origin.x + inward.x * dist,
        y: origin.y + inward.y * dist
    };
    // Fold midpoint between origin and tip
    const mx = (origin.x + tip.x) / 2;
    const my = (origin.y + tip.y) / 2;
    // Fold line direction: perpendicular to origin→tip
    const fdx = -inward.y, fdy = inward.x;
    // Away normal: from origin toward tip (same as inward direction)
    const awnx = inward.x, awny = inward.y;
    const flatPoly = clipPoly(page, mx, my, awnx, awny);
    const flapPoly = clipPoly(page, mx, my, -awnx, -awny);
    // Normalised curl progress (0 = flat, 1 = fully peeled)
    const curlP = Math.min(dist / Math.sqrt(W * W + H * H), 1);
    // 1. Flat front face
    ctx.save();
    ctx.beginPath();
    tracePoly(ctx, flatPoly);
    ctx.clip();
    if (front) ctx.drawImage(front, 0, 0, W, H);
    else {
        ctx.fillStyle = '#fff';
        ctx.fillRect(0, 0, W, H);
    }
    ctx.restore();
    if (flapPoly.length < 3) {
        ctx.restore();
        return;
    }
    // 2. Reflected flap (computed early so we can use its shape for the shadow)
    const reflectedFlap = flapPoly.map((p)=>reflectPt(p, mx, my, fdx, fdy));
    // 3. Shadow cast by the curled flap onto the front face
    // We use a combination of a true outer drop-shadow and an ambient occlusion gradient near the crease.
    if (flatPoly.length >= 3 && reflectedFlap.length >= 3) {
        ctx.save();
        ctx.beginPath();
        tracePoly(ctx, flatPoly);
        ctx.clip();
        // 3a. Cast a blurred drop shadow so it bleeds smoothly outside the flap
        ctx.save();
        ctx.shadowColor = `rgba(0,0,0,${0.35 * curlP})`;
        ctx.shadowBlur = 10 + dist * 0.15;
        ctx.shadowOffsetX = awnx * (dist * 0.05);
        ctx.shadowOffsetY = awny * (dist * 0.05);
        ctx.beginPath();
        tracePoly(ctx, reflectedFlap);
        ctx.fillStyle = '#000';
        ctx.fill();
        ctx.restore();
        // 3b. Add a linear gradient acting as ambient occlusion right at the crease line
        // This creates depth by grounding the base of the curl to the page
        const aoS = Math.min(W, H) * 0.5;
        const gx0 = mx, gy0 = my;
        const gx1 = mx + awnx * aoS, gy1 = my + awny * aoS;
        const aoGrad = ctx.createLinearGradient(gx0, gy0, gx1, gy1);
        aoGrad.addColorStop(0, `rgba(0,0,0,${0.5 * curlP})`);
        aoGrad.addColorStop(0.1, `rgba(0,0,0,${0.15 * curlP})`);
        aoGrad.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = aoGrad;
        // Fill the whole canvas area; the flatPoly clip ensures it only draws on the flat page
        ctx.fillRect(-W, -H, W * 3, H * 3);
        ctx.restore();
    }
    // 4. Reflected flap image (extends into padding for curl overflow)
    ctx.save();
    ctx.beginPath();
    tracePoly(ctx, reflectedFlap);
    ctx.clip();
    // Fill the background of the flap with white so it's not black or transparent when opacity is low
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(-W, -H, W * 3, H * 3);
    if (front) {
        const nx = -fdy, ny = fdx // fold normal (unit, since fdx²+fdy²=1)
        ;
        ctx.transform(1 - 2 * nx * nx, -2 * nx * ny, -2 * nx * ny, 1 - 2 * ny * ny, 2 * (mx * nx * nx + my * nx * ny), 2 * (mx * nx * ny + my * ny * ny));
        ctx.globalAlpha = backOpacity;
        ctx.drawImage(front, 0, 0, W, H);
        ctx.globalAlpha = 1;
    } else {
        ctx.fillStyle = '#f5f3f0';
        ctx.fillRect(-W, -H, W * 3, H * 3);
    }
    ctx.restore();
    // 5. Cylindrical shading on back face — follows the reflected flap everywhere
    ctx.save();
    ctx.beginPath();
    tracePoly(ctx, reflectedFlap);
    ctx.clip();
    {
        const flapDists = reflectedFlap.map((p)=>(p.x - mx) * awnx + (p.y - my) * awny);
        const maxFlapDist = Math.max(...flapDists, 1);
        const gx0 = mx, gy0 = my;
        const gx1 = mx + awnx * maxFlapDist, gy1 = my + awny * maxFlapDist;
        const core = ctx.createLinearGradient(gx0, gy0, gx1, gy1);
        core.addColorStop(0, `rgba(0,0,0,${0.12 * curlP})`);
        core.addColorStop(0.15, `rgba(0,0,0,${0.28 * curlP})`);
        core.addColorStop(0.35, `rgba(0,0,0,${0.18 * curlP})`);
        core.addColorStop(0.6, `rgba(0,0,0,${0.08 * curlP})`);
        core.addColorStop(0.85, `rgba(0,0,0,${0.15 * curlP})`);
        core.addColorStop(1, `rgba(0,0,0,${0.25 * curlP})`);
        ctx.fillStyle = core;
        ctx.fillRect(-W, -H, W * 3, H * 3);
        const spec = ctx.createLinearGradient(gx0, gy0, gx1, gy1);
        spec.addColorStop(0, `rgba(255,255,255,${0.35 * curlP * backOpacity})`);
        spec.addColorStop(0.08, `rgba(255,255,255,${0.18 * curlP * backOpacity})`);
        spec.addColorStop(0.2, 'rgba(255,255,255,0)');
        spec.addColorStop(1, 'rgba(255,255,255,0)');
        ctx.fillStyle = spec;
        ctx.fillRect(-W, -H, W * 3, H * 3);
    }
    ctx.restore();
    // 6. Curved band at the fold — clipped to reflected flap surface
    {
        // The bend radius narrows as the curl progresses (cone effect)
        // At dist=0, band is small. As we pull further, the band near the center gets wider, but near the tip it stays tight.
        // We achieve a faux-cone effect by adjusting the width of the specular highlight band based on dist and perspective.
        const bandBack = Math.max(6, Math.min(40, dist * 0.18));
        const x0 = mx, y0 = my;
        // To simulate a cone, we shift the gradient endpoints a bit to widen it as it travels inward
        const x1 = mx - awnx * bandBack, y1 = my - awny * bandBack;
        ctx.save();
        ctx.beginPath();
        tracePoly(ctx, reflectedFlap);
        ctx.clip();
        const bFar = Math.max(W, H) * 2;
        const bx = fdx * bFar, by = fdy * bFar;
        // We use a slight radial or skew expansion if we wanted true cones, 
        // but a scaled linear gradient spanning further back creates a very convincing 2.5D softer bend.
        ctx.beginPath();
        ctx.moveTo(x0 + bx, y0 + by);
        ctx.lineTo(x0 - bx, y0 - by);
        ctx.lineTo(x1 - bx, y1 - by);
        ctx.lineTo(x1 + bx, y1 + by);
        ctx.closePath();
        ctx.clip();
        // Base dark crease
        const cg = ctx.createLinearGradient(x0, y0, x1, y1);
        cg.addColorStop(0, `rgba(0,0,0,${0.45 * curlP})`);
        cg.addColorStop(0.3, `rgba(0,0,0,${0.25 * curlP})`);
        cg.addColorStop(0.7, `rgba(0,0,0,${0.10 * curlP})`);
        cg.addColorStop(1, `rgba(0,0,0,${0.02 * curlP})`);
        ctx.fillStyle = cg;
        ctx.fillRect(-W, -H, W * 3, H * 3);
        // Specular highlight pushes slightly further away from the crease as we pull the page more
        const specOffset = x0 - awnx * (bandBack * 0.15);
        const specOffsetY = y0 - awny * (bandBack * 0.15);
        const sg = ctx.createLinearGradient(specOffset, specOffsetY, x1, y1);
        sg.addColorStop(0, `rgba(255,255,255,0)`);
        sg.addColorStop(0.1, `rgba(255,255,255,${0.40 * curlP * backOpacity})`);
        sg.addColorStop(0.3, `rgba(255,255,255,${0.15 * curlP * backOpacity})`);
        sg.addColorStop(0.6, 'rgba(255,255,255,0)');
        sg.addColorStop(1, 'rgba(255,255,255,0)');
        ctx.fillStyle = sg;
        ctx.fillRect(-W, -H, W * 3, H * 3);
        ctx.restore();
    }
    ctx.restore();
}
function makeFrontFromImage(img, W, H, dpr) {
    const oc = new OffscreenCanvas(Math.round(W * dpr), Math.round(H * dpr));
    const c = oc.getContext('2d');
    c.scale(dpr, dpr);
    // Clip to rounded rect
    c.beginPath();
    c.roundRect(0, 0, W, H, 12);
    c.clip();
    // Draw image with cover-fit (fill canvas, center-crop)
    const iw = img.width, ih = img.height;
    const scale = Math.max(W / iw, H / ih);
    const sw = iw * scale, sh = ih * scale;
    c.drawImage(img, (W - sw) / 2, (H - sh) / 2, sw, sh);
    return oc;
}
function PageCurlEmbed({ demo = false }) {
    _s();
    const initialOpacity = demo ? 0.5 : 1;
    const initialAngle = demo ? 45 : 225;
    const canvasRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const frontRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const coverRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const pageSizeRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])({
        w: 0,
        h: 0,
        pad: 0
    });
    // Single source of truth: peel distance in pixels
    const distRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(demo ? 80 : 0);
    const angleRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(initialAngle);
    const targetAngleRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(initialAngle);
    const opacityRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(initialOpacity);
    const dragging = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    const downClientRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])({
        x: 0,
        y: 0
    });
    const distAtDownRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(0);
    const rafRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(0);
    const angleRafRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(0);
    const [opacity, setOpacity] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(initialOpacity);
    const [angle, setAngle] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(initialAngle);
    const render = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "PageCurlEmbed.useCallback[render]": ()=>{
            const canvas = canvasRef.current;
            if (!canvas) return;
            const dpr = window.devicePixelRatio || 1;
            draw(canvas, angleRef.current, distRef.current, opacityRef.current, frontRef.current, dpr, pageSizeRef.current.pad);
        }
    }["PageCurlEmbed.useCallback[render]"], []);
    const buildSurfaces = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "PageCurlEmbed.useCallback[buildSurfaces]": ()=>{
            const canvas = canvasRef.current;
            if (!canvas) return;
            const dpr = window.devicePixelRatio || 1;
            const W = canvas.offsetWidth;
            const H = canvas.offsetHeight;
            if (!W || !H) return;
            canvas.width = Math.round(W * dpr);
            canvas.height = Math.round(H * dpr);
            const pad = Math.min(W, H) * PAD_RATIO;
            const pageW = W - 2 * pad;
            const pageH = H - 2 * pad;
            pageSizeRef.current = {
                w: pageW,
                h: pageH,
                pad
            };
            if (coverRef.current) {
                frontRef.current = makeFrontFromImage(coverRef.current, pageW, pageH, dpr);
            }
            render();
        }
    }["PageCurlEmbed.useCallback[buildSurfaces]"], [
        render
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PageCurlEmbed.useEffect": ()=>{
            let cancelled = false;
            fetch('/images/love-jones-cover.jpg').then({
                "PageCurlEmbed.useEffect": (r)=>r.blob()
            }["PageCurlEmbed.useEffect"]).then({
                "PageCurlEmbed.useEffect": (b)=>createImageBitmap(b)
            }["PageCurlEmbed.useEffect"]).then({
                "PageCurlEmbed.useEffect": (bmp)=>{
                    if (cancelled) return;
                    coverRef.current = bmp;
                    buildSurfaces();
                }
            }["PageCurlEmbed.useEffect"]);
            const ro = new ResizeObserver(buildSurfaces);
            if (canvasRef.current) ro.observe(canvasRef.current);
            return ({
                "PageCurlEmbed.useEffect": ()=>{
                    cancelled = true;
                    ro.disconnect();
                }
            })["PageCurlEmbed.useEffect"];
        }
    }["PageCurlEmbed.useEffect"], [
        buildSurfaces
    ]);
    // Angle change: animate angleRef toward the target over multiple frames
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PageCurlEmbed.useEffect": ()=>{
            targetAngleRef.current = angle % 360;
            cancelAnimationFrame(angleRafRef.current);
            function animateAngle() {
                const current = angleRef.current;
                const target = targetAngleRef.current;
                // Shortest-path delta on the circle
                const delta = (target - current + 540) % 360 - 180;
                if (Math.abs(delta) < 0.3) {
                    angleRef.current = target;
                    render();
                    return;
                }
                angleRef.current = (current + delta * 0.18 + 360) % 360;
                render();
                angleRafRef.current = requestAnimationFrame(animateAngle);
            }
            angleRafRef.current = requestAnimationFrame(animateAngle);
        }
    }["PageCurlEmbed.useEffect"], [
        angle,
        render
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PageCurlEmbed.useEffect": ()=>{
            opacityRef.current = opacity;
            render();
        }
    }["PageCurlEmbed.useEffect"], [
        opacity,
        render
    ]);
    const onDown = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "PageCurlEmbed.useCallback[onDown]": (clientX, clientY)=>{
            dragging.current = true;
            downClientRef.current = {
                x: clientX,
                y: clientY
            };
            distAtDownRef.current = distRef.current;
            cancelAnimationFrame(rafRef.current);
            rafRef.current = requestAnimationFrame(render);
        }
    }["PageCurlEmbed.useCallback[onDown]"], [
        render
    ]);
    const onMove = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "PageCurlEmbed.useCallback[onMove]": (clientX, clientY)=>{
            if (!dragging.current) return;
            const canvas = canvasRef.current;
            if (!canvas) return;
            const dpr = window.devicePixelRatio || 1;
            const canvasW = canvas.width / dpr;
            const canvasH = canvas.height / dpr;
            const r = canvas.getBoundingClientRect();
            const { w: pageW, h: pageH } = pageSizeRef.current;
            const { inward, maxDist } = getOrigin(angleRef.current, pageW, pageH);
            // Project pointer delta onto inward direction (in canvas pixel space)
            const scaleX = canvasW / r.width;
            const scaleY = canvasH / r.height;
            const dragDx = (clientX - downClientRef.current.x) * scaleX;
            const dragDy = (clientY - downClientRef.current.y) * scaleY;
            const proj = dragDx * inward.x + dragDy * inward.y;
            distRef.current = Math.max(0, Math.min(maxDist, distAtDownRef.current + proj));
            cancelAnimationFrame(rafRef.current);
            rafRef.current = requestAnimationFrame(render);
        }
    }["PageCurlEmbed.useCallback[onMove]"], [
        render
    ]);
    const onUp = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "PageCurlEmbed.useCallback[onUp]": ()=>{
            dragging.current = false;
        }
    }["PageCurlEmbed.useCallback[onUp]"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PageCurlEmbed.useEffect": ()=>{
            if (demo) return;
            const mm = {
                "PageCurlEmbed.useEffect.mm": (e)=>{
                    // If mouse button was released outside the window, stop dragging
                    if (dragging.current && e.buttons === 0) {
                        onUp();
                        return;
                    }
                    onMove(e.clientX, e.clientY);
                }
            }["PageCurlEmbed.useEffect.mm"];
            const mu = {
                "PageCurlEmbed.useEffect.mu": ()=>onUp()
            }["PageCurlEmbed.useEffect.mu"];
            const tm = {
                "PageCurlEmbed.useEffect.tm": (e)=>onMove(e.touches[0].clientX, e.touches[0].clientY)
            }["PageCurlEmbed.useEffect.tm"];
            const te = {
                "PageCurlEmbed.useEffect.te": ()=>onUp()
            }["PageCurlEmbed.useEffect.te"];
            window.addEventListener('mousemove', mm);
            window.addEventListener('mouseup', mu);
            window.addEventListener('touchmove', tm, {
                passive: true
            });
            window.addEventListener('touchend', te);
            return ({
                "PageCurlEmbed.useEffect": ()=>{
                    window.removeEventListener('mousemove', mm);
                    window.removeEventListener('mouseup', mu);
                    window.removeEventListener('touchmove', tm);
                    window.removeEventListener('touchend', te);
                }
            })["PageCurlEmbed.useEffect"];
        }
    }["PageCurlEmbed.useEffect"], [
        demo,
        onMove,
        onUp
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$page$2d$curl$2f$PageCurlProject$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].embedWrapper,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("canvas", {
                ref: canvasRef,
                className: __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$page$2d$curl$2f$PageCurlProject$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].curlCanvas,
                onMouseDown: demo ? undefined : (e)=>onDown(e.clientX, e.clientY),
                onTouchStart: demo ? undefined : (e)=>onDown(e.touches[0].clientX, e.touches[0].clientY),
                style: demo ? {
                    cursor: 'default'
                } : undefined,
                "aria-label": demo ? 'iOS page curl reference' : 'Page curl — drag to peel'
            }, void 0, false, {
                fileName: "[project]/Development/Portfolio/mimesis/src/projects/page-curl/PageCurlEmbed.tsx",
                lineNumber: 492,
                columnNumber: 7
            }, this),
            !demo && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$page$2d$curl$2f$PageCurlProject$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].embedControls,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$page$2d$curl$2f$PageCurlProject$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].controlItem,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$page$2d$curl$2f$PageCurlProject$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].controlLabel,
                                children: "Opacity"
                            }, void 0, false, {
                                fileName: "[project]/Development/Portfolio/mimesis/src/projects/page-curl/PageCurlEmbed.tsx",
                                lineNumber: 503,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "range",
                                min: "0",
                                max: "1",
                                step: "0.01",
                                value: opacity,
                                onChange: (e)=>setOpacity(parseFloat(e.target.value)),
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$page$2d$curl$2f$PageCurlProject$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].slider,
                                "aria-label": "Shadow opacity"
                            }, void 0, false, {
                                fileName: "[project]/Development/Portfolio/mimesis/src/projects/page-curl/PageCurlEmbed.tsx",
                                lineNumber: 504,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Development/Portfolio/mimesis/src/projects/page-curl/PageCurlEmbed.tsx",
                        lineNumber: 502,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$page$2d$curl$2f$PageCurlProject$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].controlItem,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$page$2d$curl$2f$PageCurlProject$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].controlLabel,
                                children: "Angle"
                            }, void 0, false, {
                                fileName: "[project]/Development/Portfolio/mimesis/src/projects/page-curl/PageCurlEmbed.tsx",
                                lineNumber: 514,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "range",
                                min: "0",
                                max: "315",
                                step: "1",
                                value: angle,
                                onChange: (e)=>setAngle(parseInt(e.target.value)),
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$page$2d$curl$2f$PageCurlProject$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].slider,
                                "aria-label": "Curl angle"
                            }, void 0, false, {
                                fileName: "[project]/Development/Portfolio/mimesis/src/projects/page-curl/PageCurlEmbed.tsx",
                                lineNumber: 515,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Development/Portfolio/mimesis/src/projects/page-curl/PageCurlEmbed.tsx",
                        lineNumber: 513,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Development/Portfolio/mimesis/src/projects/page-curl/PageCurlEmbed.tsx",
                lineNumber: 501,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Development/Portfolio/mimesis/src/projects/page-curl/PageCurlEmbed.tsx",
        lineNumber: 491,
        columnNumber: 5
    }, this);
}
_s(PageCurlEmbed, "Ot3ABKL1huXt5c8QVXSVJ5U87Oo=");
_c = PageCurlEmbed;
var _c;
__turbopack_context__.k.register(_c, "PageCurlEmbed");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Development/Portfolio/mimesis/src/projects/page-curl/PageCurlEmbed3D.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>PageCurlEmbed3D
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Development/Portfolio/mimesis/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$Texture$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Development/Portfolio/mimesis/node_modules/@react-three/drei/core/Texture.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$react$2d$three$2d$fiber$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Development/Portfolio/mimesis/node_modules/@react-three/fiber/dist/react-three-fiber.esm.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$5a94e5eb$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__ = __turbopack_context__.i("[project]/Development/Portfolio/mimesis/node_modules/@react-three/fiber/dist/events-5a94e5eb.esm.js [app-client] (ecmascript) <export D as useFrame>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$5a94e5eb$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__C__as__useThree$3e$__ = __turbopack_context__.i("[project]/Development/Portfolio/mimesis/node_modules/@react-three/fiber/dist/events-5a94e5eb.esm.js [app-client] (ecmascript) <export C as useThree>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Development/Portfolio/mimesis/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Development/Portfolio/mimesis/node_modules/three/build/three.core.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Development/Portfolio/mimesis/node_modules/three/build/three.module.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$page$2d$curl$2f$PageCurlProject$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/Development/Portfolio/mimesis/src/projects/page-curl/PageCurlProject.module.css [app-client] (css module)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
if (typeof console !== "undefined") {
    const originalWarn = console.warn;
    console.warn = (...args)=>{
        const msg = args[0];
        if (typeof msg === "string") {
            if (msg.includes("THREE.Clock:")) return;
            if (msg.includes("THREE.WebGLShadowMap:")) return;
            if (msg.includes("VIDEOJS: WARN:")) return;
        }
        originalWarn(...args);
    };
}
// --- SHADERS ---
const deformChunk = `
vec3 deformPosition(vec3 position, vec2 uSize, float uPeelDist, vec2 uOrigin, vec2 uInward, out vec3 objectNormal, vec3 normal) {
    float R = min(uSize.x, uSize.y) * 0.12; // Bend radius
    
    float dp = dot(position.xy - uOrigin, uInward);
    float fold_pos = uPeelDist / 2.0;
    float d = dp - fold_pos;
    
    float pi = 3.141592653589793;
    
    float new_d = d;
    float z = 0.0;
    float normal_theta = 0.0;
    
    if (uPeelDist <= 0.0) {
        objectNormal = normal;
        return position;
    }
    
    if (d > R) {
        new_d = d;
        z = 0.0;
        normal_theta = 0.0;
    } else if (d > R - pi * R) {
        float arc = R - d;
        float theta = arc / R;
        new_d = R - sin(theta) * R;
        z = R - cos(theta) * R;
        normal_theta = theta;
    } else {
        float remaining = (R - pi * R) - d;
        new_d = R + remaining;
        z = 2.0 * R + d * 0.001; // Tiny slope to prevent z-fighting
        normal_theta = pi;
    }
    
    vec3 transformed = position;
    transformed.x += uInward.x * (new_d - d);
    transformed.y += uInward.y * (new_d - d);
    transformed.z += z;
    
    vec3 axis = vec3(-uInward.y, uInward.x, 0.0);
    float s = sin(normal_theta);
    float c = cos(normal_theta);
    
    // Rodrigues' rotation formula
    objectNormal = normal * c + cross(axis, normal) * s + axis * dot(axis, normal) * (1.0 - c);
    
    return transformed;
}
`;
const shadowDeformChunk = `
vec3 deformShadowPosition(vec3 position, vec2 uSize, float uPeelDist, vec2 uOrigin, vec2 uInward) {
    if (uPeelDist <= 0.0) {
        return position;
    }

    float dp = dot(position.xy - uOrigin, uInward);
    float foldPos = uPeelDist / 2.0;
    float d = dp - foldPos;
    float foldBlend = max(min(uSize.x, uSize.y) * 0.03, 0.02);
    float peeled = 1.0 - smoothstep(-foldBlend, foldBlend, d);
    float reflectedD = mix(d, abs(d), peeled);
    float shadowLift = min(uPeelDist * 0.1, min(uSize.x, uSize.y) * 0.16);

    vec3 transformed = position;
    transformed.x += uInward.x * (reflectedD - d);
    transformed.y += uInward.y * (reflectedD - d);
    transformed.z += shadowLift * peeled;

    return transformed;
}
`;
const vertexShader = `
uniform float uPeelDist;
uniform vec2 uOrigin;
uniform vec2 uInward;
uniform vec2 uSize;

varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vViewPosition;

${deformChunk}

void main() {
    vUv = uv;

    vec3 objectNormal;
    vec3 transformed = deformPosition(position, uSize, uPeelDist, uOrigin, uInward, objectNormal, normal);

    vec4 mvPosition = modelViewMatrix * vec4(transformed, 1.0);
    gl_Position = projectionMatrix * mvPosition;
    
    vNormal = normalize(normalMatrix * objectNormal);
    vViewPosition = -mvPosition.xyz;
}
`;
const fragmentShader = `
uniform sampler2D uTex;
uniform float uOpacity;
uniform vec2 uSize;
uniform vec2 uImageSize;

varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vViewPosition;

float boxSDF(vec2 p, vec2 b, float r) {
    vec2 q = abs(p) - b + vec2(r);
    return min(max(q.x, q.y), 0.0) + length(max(q, 0.0)) - r;
}

vec2 getCoverUv(vec2 uv) {
    float rs = uSize.x / uSize.y;
    float ri = uImageSize.x / uImageSize.y;
    
    vec2 newUv = uv;
    if (rs > ri) {
        float scale = ri / rs;
        newUv.y = (newUv.y - 0.5) * scale + 0.5;
    } else {
        float scale = rs / ri;
        newUv.x = (newUv.x - 0.5) * scale + 0.5;
    }
    return newUv;
}

void main() {
    vec2 p = (vUv - 0.5) * uSize;
    vec2 b = uSize * 0.5;
    float cornerRadius = min(uSize.x, uSize.y) * 0.03; // Approx 12px
    if (boxSDF(p, b, cornerRadius) > 0.0) {
        discard;
    }

    bool isFront = gl_FrontFacing;
    vec2 mappedUv = isFront ? vUv : vec2(1.0 - vUv.x, vUv.y);
    
    vec2 coverUv = getCoverUv(mappedUv);
    vec4 texColor = texture2D(uTex, coverUv);
    
    vec3 normal = normalize(vNormal);
    if (!isFront) normal = -normal;
    
    vec3 viewDir = normalize(vViewPosition);
    vec3 lightDir = normalize(vec3(0.5, 0.8, 1.0)); 
    
    vec3 ambient = vec3(0.4);
    float diff = max(dot(normal, lightDir), 0.0);
    vec3 diffuse = diff * vec3(0.8);
    
    vec3 reflectDir = reflect(-lightDir, normal);
    float spec = pow(max(dot(viewDir, reflectDir), 0.0), isFront ? 16.0 : 64.0); 
    vec3 specular = spec * vec3(0.3);
    
    vec3 finalLight = ambient + diffuse + specular;

    vec4 color = texColor * vec4(finalLight, 1.0);
    
    if (!isFront) {
        vec3 paperWhite = vec3(0.95) * finalLight;
        color = vec4(mix(paperWhite, color.xyz, uOpacity), 1.0);
    }
    
    gl_FragColor = color;
}
`;
function PageComponent({ peelDist, angle, opacity, size, liveAngleRadRef }) {
    _s();
    const texture = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$Texture$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTexture"])("/images/love-jones-cover.jpg");
    const [uniforms] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "PageComponent.useState": ()=>({
                uTex: {
                    value: texture
                },
                uPeelDist: {
                    value: 0.0
                },
                uOrigin: {
                    value: new __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector2"]()
                },
                uInward: {
                    value: new __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector2"]()
                },
                uTargetAngleRad: {
                    value: angle * (Math.PI / 180)
                },
                uOpacity: {
                    value: opacity
                },
                uSize: {
                    value: new __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector2"](size.w, size.h)
                },
                uImageSize: {
                    value: new __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector2"](1024, 1024)
                }
            })
    }["PageComponent.useState"]);
    const uniformsRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(uniforms);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PageComponent.useEffect": ()=>{
            const uniforms = uniformsRef.current;
            uniforms.uTex.value = texture;
            if (texture && texture.image) {
                const img = texture.image;
                uniforms.uImageSize.value.set(img.width || 1024, img.height || 1024);
            }
        }
    }["PageComponent.useEffect"], [
        texture
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PageComponent.useEffect": ()=>{
            uniformsRef.current.uOpacity.value = opacity;
        }
    }["PageComponent.useEffect"], [
        opacity
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PageComponent.useEffect": ()=>{
            uniformsRef.current.uSize.value.set(size.w, size.h);
        }
    }["PageComponent.useEffect"], [
        size.h,
        size.w
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$5a94e5eb$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__["useFrame"])({
        "PageComponent.useFrame": ()=>{
            const uniforms = uniformsRef.current;
            uniforms.uPeelDist.value += (peelDist - uniforms.uPeelDist.value) * 0.2;
            const targetAngleRad = angle * (Math.PI / 180);
            let current = uniforms.uTargetAngleRad.value;
            const delta = (targetAngleRad - current + Math.PI * 3) % (Math.PI * 2) - Math.PI;
            current += delta * 0.15;
            uniforms.uTargetAngleRad.value = current;
            liveAngleRadRef.current = current;
            const rad = current;
            const dx = Math.cos(rad);
            const dy = -Math.sin(rad);
            const tx = dx !== 0 ? Math.abs(size.w / 2 / dx) : Infinity;
            const ty = dy !== 0 ? Math.abs(size.h / 2 / dy) : Infinity;
            const t = Math.min(tx, ty);
            uniforms.uOrigin.value.set(dx * t, dy * t);
            uniforms.uInward.value.set(-dx, -dy);
        }
    }["PageComponent.useFrame"]);
    const depthUniforms = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "PageComponent.useMemo[depthUniforms]": ()=>{
            const d = __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UniformsUtils"].clone(__TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["ShaderLib"].depth.uniforms);
            d.uPeelDist = uniforms.uPeelDist;
            d.uOrigin = uniforms.uOrigin;
            d.uInward = uniforms.uInward;
            d.uSize = uniforms.uSize;
            return d;
        }
    }["PageComponent.useMemo[depthUniforms]"], [
        uniforms
    ]);
    const depthVertexShader = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "PageComponent.useMemo[depthVertexShader]": ()=>{
            let vs = __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["ShaderLib"].depth.vertexShader;
            vs = `
            varying vec2 vMyUv;
            uniform float uPeelDist;
            uniform vec2 uOrigin;
            uniform vec2 uInward;
            uniform vec2 uSize;
            ${shadowDeformChunk}
        ` + vs;
            vs = vs.replace("#include <begin_vertex>", `
            vMyUv = uv;
            vec3 transformed = deformShadowPosition(position, uSize, uPeelDist, uOrigin, uInward);
            `);
            return vs;
        }
    }["PageComponent.useMemo[depthVertexShader]"], []);
    const depthFragmentShader = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "PageComponent.useMemo[depthFragmentShader]": ()=>{
            let fs = __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["ShaderLib"].depth.fragmentShader;
            fs = `
            varying vec2 vMyUv;
            uniform vec2 uSize;
            float boxSDF(vec2 p, vec2 b, float r) {
                vec2 q = abs(p) - b + vec2(r);
                return min(max(q.x, q.y), 0.0) + length(max(q, 0.0)) - r;
            }
        ` + fs;
            fs = fs.replace("void main() {", `
        void main() {
            vec2 p = (vMyUv - 0.5) * uSize;
            float cornerRadius = min(uSize.x, uSize.y) * 0.03;
            if (boxSDF(p, uSize * 0.5, cornerRadius) > 0.0) {
                discard;
            }
            `);
            return fs;
        }
    }["PageComponent.useMemo[depthFragmentShader]"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
        receiveShadow: true,
        castShadow: true,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("planeGeometry", {
                args: [
                    size.w,
                    size.h,
                    512,
                    512
                ]
            }, void 0, false, {
                fileName: "[project]/Development/Portfolio/mimesis/src/projects/page-curl/PageCurlEmbed3D.tsx",
                lineNumber: 318,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("shaderMaterial", {
                vertexShader: vertexShader,
                fragmentShader: fragmentShader,
                uniforms: uniforms,
                side: __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DoubleSide"],
                transparent: true
            }, void 0, false, {
                fileName: "[project]/Development/Portfolio/mimesis/src/projects/page-curl/PageCurlEmbed3D.tsx",
                lineNumber: 320,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("shaderMaterial", {
                attach: "customDepthMaterial",
                vertexShader: depthVertexShader,
                fragmentShader: depthFragmentShader,
                uniforms: depthUniforms,
                defines: {
                    DEPTH_PACKING: 3201
                },
                side: __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DoubleSide"]
            }, void 0, false, {
                fileName: "[project]/Development/Portfolio/mimesis/src/projects/page-curl/PageCurlEmbed3D.tsx",
                lineNumber: 328,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Development/Portfolio/mimesis/src/projects/page-curl/PageCurlEmbed3D.tsx",
        lineNumber: 317,
        columnNumber: 9
    }, this);
}
_s(PageComponent, "wx7103mcI9u/ybCwmiRcaYcquQY=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$Texture$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTexture"],
        __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$5a94e5eb$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__["useFrame"]
    ];
});
_c = PageComponent;
function Scene({ peelDist, angle, opacity, maxDistRef, liveAngleRadRef }) {
    _s1();
    const { viewport } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$5a94e5eb$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__C__as__useThree$3e$__["useThree"])();
    const pad = Math.min(viewport.width, viewport.height) * 0.08;
    const pageW = viewport.width - 2 * pad;
    const pageH = viewport.height - 2 * pad;
    const shadowPlaneZ = -0.12;
    const shadowFrustumX = pageW * 0.9;
    const shadowFrustumY = pageH * 0.9;
    // Calculate max drag distance for safety.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Scene.useEffect": ()=>{
            maxDistRef.current = Math.sqrt(pageW * pageW + pageH * pageH) * 2.0;
        }
    }["Scene.useEffect"], [
        pageW,
        pageH,
        maxDistRef
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ambientLight", {
                intensity: 0.5,
                color: "#ffffff"
            }, void 0, false, {
                fileName: "[project]/Development/Portfolio/mimesis/src/projects/page-curl/PageCurlEmbed3D.tsx",
                lineNumber: 369,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("directionalLight", {
                position: [
                    6,
                    6,
                    5
                ],
                intensity: 1.2,
                castShadow: true,
                "shadow-mapSize": [
                    4096,
                    4096
                ],
                "shadow-bias": -0.0001,
                "shadow-normalBias": 0.02,
                "shadow-radius": 1.5,
                "shadow-camera-left": -shadowFrustumX,
                "shadow-camera-right": shadowFrustumX,
                "shadow-camera-top": shadowFrustumY,
                "shadow-camera-bottom": -shadowFrustumY,
                "shadow-camera-near": 0.1,
                "shadow-camera-far": 20
            }, void 0, false, {
                fileName: "[project]/Development/Portfolio/mimesis/src/projects/page-curl/PageCurlEmbed3D.tsx",
                lineNumber: 370,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("group", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PageComponent, {
                        peelDist: peelDist,
                        angle: angle,
                        opacity: opacity,
                        size: {
                            w: pageW,
                            h: pageH
                        },
                        liveAngleRadRef: liveAngleRadRef
                    }, void 0, false, {
                        fileName: "[project]/Development/Portfolio/mimesis/src/projects/page-curl/PageCurlEmbed3D.tsx",
                        lineNumber: 387,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                        position: [
                            0,
                            0,
                            shadowPlaneZ
                        ],
                        receiveShadow: true,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("planeGeometry", {
                                args: [
                                    viewport.width * 2,
                                    viewport.height * 2
                                ]
                            }, void 0, false, {
                                fileName: "[project]/Development/Portfolio/mimesis/src/projects/page-curl/PageCurlEmbed3D.tsx",
                                lineNumber: 396,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("shadowMaterial", {
                                opacity: 0.3,
                                transparent: true,
                                depthWrite: false
                            }, void 0, false, {
                                fileName: "[project]/Development/Portfolio/mimesis/src/projects/page-curl/PageCurlEmbed3D.tsx",
                                lineNumber: 397,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Development/Portfolio/mimesis/src/projects/page-curl/PageCurlEmbed3D.tsx",
                        lineNumber: 395,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Development/Portfolio/mimesis/src/projects/page-curl/PageCurlEmbed3D.tsx",
                lineNumber: 386,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true);
}
_s1(Scene, "HpfykU4cIxAijWayLXECmt/1eAc=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$5a94e5eb$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__C__as__useThree$3e$__["useThree"]
    ];
});
_c1 = Scene;
function PageCurlEmbed3D({ demo = false }) {
    _s2();
    const initialAngle = demo ? 45 : 225;
    const initialOpacity = demo ? 0.5 : 1;
    const [angle, setAngle] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(initialAngle);
    const [opacity, setOpacity] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(initialOpacity);
    const [peelDist, setPeelDist] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(demo ? 1.5 : 0);
    const dragging = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    const downClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])({
        x: 0,
        y: 0
    });
    const peelAtDown = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(0);
    const maxDistRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(10);
    const liveAngleRadRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(initialAngle * (Math.PI / 180));
    const canvasContainerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const handlePointerDown = (e)=>{
        if (demo) return;
        dragging.current = true;
        downClient.current = {
            x: e.clientX,
            y: e.clientY
        };
        peelAtDown.current = peelDist;
        e.currentTarget.setPointerCapture(e.pointerId);
    };
    const handlePointerMove = (e)=>{
        if (demo || !dragging.current) return;
        const rect = canvasContainerRef.current?.getBoundingClientRect();
        if (!rect) return;
        // Use the same animated angle the shader currently uses.
        const rad = liveAngleRadRef.current;
        // Convert inward vector from world Y-up to pointer/canvas Y-down space.
        const inwardX = -Math.cos(rad);
        const inwardY = -Math.sin(rad);
        // Movement in pixels
        const dragDx = e.clientX - downClient.current.x;
        const dragDy = e.clientY - downClient.current.y;
        // In 2D space, inward proj is calculated in pixels.
        // Here we need a screen-to-world ratio. We can approximate using rect.width and maxDist.
        // A generic scale factor so it feels 1:1 with pointer:
        const screenToWorld = maxDistRef.current / Math.sqrt(rect.width * rect.width + rect.height * rect.height);
        const proj = (dragDx * inwardX + dragDy * inwardY) * screenToWorld;
        const bounded = Math.max(0, Math.min(maxDistRef.current, peelAtDown.current + proj * 1.5));
        setPeelDist(bounded);
    };
    const handlePointerUp = (e)=>{
        if (demo) return;
        dragging.current = false;
        if (e.currentTarget.hasPointerCapture(e.pointerId)) {
            e.currentTarget.releasePointerCapture(e.pointerId);
        }
    // Do not reset peelDist! Same behavior as 2D canvas.
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$page$2d$curl$2f$PageCurlProject$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].embedWrapper,
        style: {
            height: "100%",
            width: "100%"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: canvasContainerRef,
                className: __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$page$2d$curl$2f$PageCurlProject$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].curlCanvas,
                onPointerDown: handlePointerDown,
                onPointerMove: handlePointerMove,
                onPointerUp: handlePointerUp,
                onPointerCancel: handlePointerUp,
                onLostPointerCapture: ()=>{
                    dragging.current = false;
                },
                style: {
                    background: "transparent",
                    touchAction: "none",
                    cursor: demo ? "default" : "grab"
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$react$2d$three$2d$fiber$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["Canvas"], {
                    shadows: true,
                    camera: {
                        position: [
                            0,
                            0,
                            5
                        ],
                        fov: 50
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Scene, {
                        peelDist: peelDist,
                        angle: angle,
                        opacity: opacity,
                        maxDistRef: maxDistRef,
                        liveAngleRadRef: liveAngleRadRef
                    }, void 0, false, {
                        fileName: "[project]/Development/Portfolio/mimesis/src/projects/page-curl/PageCurlEmbed3D.tsx",
                        lineNumber: 494,
                        columnNumber: 21
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/Development/Portfolio/mimesis/src/projects/page-curl/PageCurlEmbed3D.tsx",
                    lineNumber: 493,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/Development/Portfolio/mimesis/src/projects/page-curl/PageCurlEmbed3D.tsx",
                lineNumber: 477,
                columnNumber: 13
            }, this),
            !demo && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$page$2d$curl$2f$PageCurlProject$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].embedControls,
                onPointerDown: (e)=>e.stopPropagation(),
                onPointerMove: (e)=>e.stopPropagation(),
                onPointerUp: (e)=>e.stopPropagation(),
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$page$2d$curl$2f$PageCurlProject$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].controlItem,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$page$2d$curl$2f$PageCurlProject$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].controlLabel,
                                children: "Opacity"
                            }, void 0, false, {
                                fileName: "[project]/Development/Portfolio/mimesis/src/projects/page-curl/PageCurlEmbed3D.tsx",
                                lineNumber: 512,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "range",
                                min: "0",
                                max: "1",
                                step: "0.01",
                                value: opacity,
                                onChange: (e)=>setOpacity(parseFloat(e.target.value)),
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$page$2d$curl$2f$PageCurlProject$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].slider,
                                "aria-label": "Backside opacity"
                            }, void 0, false, {
                                fileName: "[project]/Development/Portfolio/mimesis/src/projects/page-curl/PageCurlEmbed3D.tsx",
                                lineNumber: 513,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Development/Portfolio/mimesis/src/projects/page-curl/PageCurlEmbed3D.tsx",
                        lineNumber: 511,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$page$2d$curl$2f$PageCurlProject$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].controlItem,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$page$2d$curl$2f$PageCurlProject$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].controlLabel,
                                children: "Angle"
                            }, void 0, false, {
                                fileName: "[project]/Development/Portfolio/mimesis/src/projects/page-curl/PageCurlEmbed3D.tsx",
                                lineNumber: 525,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "range",
                                min: "0",
                                max: "315",
                                step: "1",
                                value: angle,
                                onChange: (e)=>setAngle(parseInt(e.target.value)),
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$page$2d$curl$2f$PageCurlProject$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].slider,
                                "aria-label": "Curl angle"
                            }, void 0, false, {
                                fileName: "[project]/Development/Portfolio/mimesis/src/projects/page-curl/PageCurlEmbed3D.tsx",
                                lineNumber: 526,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Development/Portfolio/mimesis/src/projects/page-curl/PageCurlEmbed3D.tsx",
                        lineNumber: 524,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Development/Portfolio/mimesis/src/projects/page-curl/PageCurlEmbed3D.tsx",
                lineNumber: 505,
                columnNumber: 17
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Development/Portfolio/mimesis/src/projects/page-curl/PageCurlEmbed3D.tsx",
        lineNumber: 470,
        columnNumber: 9
    }, this);
}
_s2(PageCurlEmbed3D, "hWXdttPJnht8NUJYeJAJcvEGRoQ=");
_c2 = PageCurlEmbed3D;
var _c, _c1, _c2;
__turbopack_context__.k.register(_c, "PageComponent");
__turbopack_context__.k.register(_c1, "Scene");
__turbopack_context__.k.register(_c2, "PageCurlEmbed3D");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Development/Portfolio/mimesis/src/projects/page-curl/PageCurlProject.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>PageCurlProject
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Development/Portfolio/mimesis/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Development/Portfolio/mimesis/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$page$2d$curl$2f$PageCurlEmbed$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Development/Portfolio/mimesis/src/projects/page-curl/PageCurlEmbed.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$page$2d$curl$2f$PageCurlEmbed3D$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Development/Portfolio/mimesis/src/projects/page-curl/PageCurlEmbed3D.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$page$2d$curl$2f$PageCurlProject$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/Development/Portfolio/mimesis/src/projects/page-curl/PageCurlProject.module.css [app-client] (css module)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
function PageCurlProject({ projectId }) {
    _s();
    const [mode, setMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("2d");
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$page$2d$curl$2f$PageCurlProject$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].interactivePane,
        "data-project-id": projectId,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$page$2d$curl$2f$PageCurlProject$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].modeToggle,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: `${__TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$page$2d$curl$2f$PageCurlProject$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].modeButton} ${mode === "2d" ? __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$page$2d$curl$2f$PageCurlProject$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].modeButtonActive : ""}`,
                        onClick: ()=>setMode("2d"),
                        type: "button",
                        children: "2D Canvas"
                    }, void 0, false, {
                        fileName: "[project]/Development/Portfolio/mimesis/src/projects/page-curl/PageCurlProject.tsx",
                        lineNumber: 15,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: `${__TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$page$2d$curl$2f$PageCurlProject$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].modeButton} ${mode === "3d" ? __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$page$2d$curl$2f$PageCurlProject$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].modeButtonActive : ""}`,
                        onClick: ()=>setMode("3d"),
                        type: "button",
                        children: "3D Shader"
                    }, void 0, false, {
                        fileName: "[project]/Development/Portfolio/mimesis/src/projects/page-curl/PageCurlProject.tsx",
                        lineNumber: 22,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Development/Portfolio/mimesis/src/projects/page-curl/PageCurlProject.tsx",
                lineNumber: 14,
                columnNumber: 7
            }, this),
            mode === "2d" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$page$2d$curl$2f$PageCurlEmbed$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/Development/Portfolio/mimesis/src/projects/page-curl/PageCurlProject.tsx",
                lineNumber: 30,
                columnNumber: 24
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Development$2f$Portfolio$2f$mimesis$2f$src$2f$projects$2f$page$2d$curl$2f$PageCurlEmbed3D$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/Development/Portfolio/mimesis/src/projects/page-curl/PageCurlProject.tsx",
                lineNumber: 30,
                columnNumber: 44
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Development/Portfolio/mimesis/src/projects/page-curl/PageCurlProject.tsx",
        lineNumber: 13,
        columnNumber: 5
    }, this);
}
_s(PageCurlProject, "IwBXNHRZ/Y/6R/h/TYeVFWFNb0o=");
_c = PageCurlProject;
var _c;
__turbopack_context__.k.register(_c, "PageCurlProject");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Development/Portfolio/mimesis/src/projects/page-curl/PageCurlProject.tsx [app-client] (ecmascript, next/dynamic entry)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/Development/Portfolio/mimesis/src/projects/page-curl/PageCurlProject.tsx [app-client] (ecmascript)"));
}),
]);

//# sourceMappingURL=Development_Portfolio_mimesis_src_projects_page-curl_4d5901e5._.js.map