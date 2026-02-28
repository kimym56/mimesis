'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import styles from './ProjectDetail.module.css'

interface Pt { x: number; y: number }

// Returns the edge origin point and inward unit direction for a given angle.
// Angle is in degrees; 0 = right edge, 90 = bottom, 180 = left, 270 = top.
// Works in pixel space so the direction is visually correct for the canvas size.
function getOrigin(angleDeg: number, W: number, H: number): { origin: Pt; inward: Pt; maxDist: number } {
  const rad = (angleDeg * Math.PI) / 180
  const dx = Math.cos(rad)  // outward x (pixels)
  const dy = Math.sin(rad)  // outward y (pixels)

  // Ray from center (W/2, H/2) outward — find t where it hits the edge
  const tx = dx !== 0 ? (dx > 0 ? (W - W / 2) / dx : (0 - W / 2) / dx) : Infinity
  const ty = dy !== 0 ? (dy > 0 ? (H - H / 2) / dy : (0 - H / 2) / dy) : Infinity
  const t = Math.min(tx, ty)

  const origin: Pt = {
    x: Math.max(0, Math.min(W, W / 2 + dx * t)),
    y: Math.max(0, Math.min(H, H / 2 + dy * t)),
  }
  const len = Math.sqrt(dx * dx + dy * dy)
  const inward: Pt = { x: -dx / len, y: -dy / len }
  // max distance from origin to center (in pixels)
  const maxDist = Math.sqrt((W / 2 - origin.x) ** 2 + (H / 2 - origin.y) ** 2)
  return { origin, inward, maxDist }
}

function clipPoly(poly: Pt[], ox: number, oy: number, nx: number, ny: number): Pt[] {
  const out: Pt[] = []
  const n = poly.length
  for (let i = 0; i < n; i++) {
    const a = poly[i], b = poly[(i + 1) % n]
    const da = (a.x - ox) * nx + (a.y - oy) * ny
    const db = (b.x - ox) * nx + (b.y - oy) * ny
    if (da >= 0) out.push(a)
    if ((da >= 0) !== (db >= 0)) {
      const t = da / (da - db)
      out.push({ x: a.x + t * (b.x - a.x), y: a.y + t * (b.y - a.y) })
    }
  }
  return out
}

function reflectPt(p: Pt, lx: number, ly: number, ldx: number, ldy: number): Pt {
  const nx = -ldy, ny = ldx
  const d = (p.x - lx) * nx + (p.y - ly) * ny
  return { x: p.x - 2 * d * nx, y: p.y - 2 * d * ny }
}

function tracePoly(ctx: CanvasRenderingContext2D, pts: Pt[]) {
  if (pts.length < 2) return
  ctx.moveTo(pts[0].x, pts[0].y)
  for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i].x, pts[i].y)
  ctx.closePath()
}

// dist: peel distance in pixels from the edge origin toward center
function draw(
  canvas: HTMLCanvasElement,
  angleDeg: number,
  dist: number,           // 0 = flat, >0 = peeled
  shadowOpacity: number,
  front: OffscreenCanvas | null,
  back: OffscreenCanvas | null,
  dpr: number
) {
  const ctx = canvas.getContext('2d')
  if (!ctx) return
  const W = canvas.width / dpr
  const H = canvas.height / dpr

  ctx.save()
  ctx.scale(dpr, dpr)
  ctx.clearRect(0, 0, W, H)

  const page: Pt[] = [{ x: 0, y: 0 }, { x: W, y: 0 }, { x: W, y: H }, { x: 0, y: H }]

  if (dist <= 0) {
    ctx.save()
    ctx.beginPath()
    tracePoly(ctx, page)
    ctx.clip()
    if (front) ctx.drawImage(front, 0, 0, W, H)
    else { ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, W, H) }
    ctx.restore()
    ctx.restore()
    return
  }

  const { origin, inward } = getOrigin(angleDeg, W, H)

  // Tip in pixel space
  const tip: Pt = {
    x: origin.x + inward.x * dist,
    y: origin.y + inward.y * dist,
  }

  // Fold midpoint between origin and tip
  const mx = (origin.x + tip.x) / 2
  const my = (origin.y + tip.y) / 2

  // Fold line direction: perpendicular to origin→tip
  const fdx = -inward.y, fdy = inward.x

  // Away normal: from origin toward tip (same as inward direction)
  const awnx = inward.x, awny = inward.y

  const flatPoly = clipPoly(page, mx, my, awnx, awny)
  const flapPoly = clipPoly(page, mx, my, -awnx, -awny)

  // 1. Flat front face
  ctx.save()
  ctx.beginPath()
  tracePoly(ctx, flatPoly)
  ctx.clip()
  if (front) ctx.drawImage(front, 0, 0, W, H)
  else { ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, W, H) }
  ctx.restore()

  // 2. Shadow on flat page
  if (flatPoly.length >= 3 && shadowOpacity > 0) {
    ctx.save()
    ctx.beginPath()
    tracePoly(ctx, flatPoly)
    ctx.clip()
    const curlP = Math.min(dist / Math.sqrt(W * W + H * H), 1)
    const shadowLen = 56 + dist * 0.12
    const g = ctx.createLinearGradient(mx, my, mx + awnx * shadowLen, my + awny * shadowLen)
    g.addColorStop(0,   `rgba(0,0,0,${shadowOpacity * curlP})`)
    g.addColorStop(0.5, `rgba(0,0,0,${shadowOpacity * 0.35 * curlP})`)
    g.addColorStop(1,   'rgba(0,0,0,0)')
    ctx.fillStyle = g
    ctx.fillRect(0, 0, W, H)
    ctx.restore()
  }

  if (flapPoly.length < 3) { ctx.restore(); return }

  const reflectedFlap = flapPoly.map(p => reflectPt(p, mx, my, fdx, fdy))

  // 3. Back face
  ctx.save()
  ctx.beginPath()
  tracePoly(ctx, reflectedFlap)
  ctx.clip()
  if (back) {
    ctx.save()
    const ang = Math.atan2(fdy, fdx)
    ctx.translate(mx, my)
    ctx.rotate(ang)
    ctx.scale(-1, 1)
    ctx.rotate(-ang)
    ctx.translate(-mx, -my)
    ctx.drawImage(back, 0, 0, W, H)
    ctx.restore()
  } else {
    ctx.fillStyle = '#f5f0ea'
    ctx.fillRect(-W, -H, W * 3, H * 3)
  }
  if (shadowOpacity > 0) {
    const curlP = Math.min(dist / Math.sqrt(W * W + H * H), 1)
    const bg = ctx.createLinearGradient(mx, my, tip.x * 0.5 + mx * 0.5, tip.y * 0.5 + my * 0.5)
    bg.addColorStop(0,   `rgba(0,0,0,${shadowOpacity * curlP})`)
    bg.addColorStop(0.4, `rgba(0,0,0,${shadowOpacity * 0.35 * curlP})`)
    bg.addColorStop(1,   'rgba(0,0,0,0)')
    ctx.fillStyle = bg
    ctx.fillRect(-W, -H, W * 3, H * 3)
  }
  ctx.restore()

  // 4. Fold highlight
  if (reflectedFlap.length >= 3) {
    ctx.save()
    ctx.beginPath()
    tracePoly(ctx, reflectedFlap)
    ctx.clip()
    const curlP = Math.min(dist / Math.sqrt(W * W + H * H), 1)
    const hg = ctx.createLinearGradient(mx, my, mx - awnx * 20, my - awny * 20)
    hg.addColorStop(0, `rgba(255,255,255,${0.55 * curlP})`)
    hg.addColorStop(1, 'rgba(255,255,255,0)')
    ctx.fillStyle = hg
    ctx.fillRect(-W, -H, W * 3, H * 3)
    ctx.restore()
  }

  // 5. Front flap sliver
  if (flapPoly.length >= 3) {
    ctx.save()
    ctx.beginPath()
    tracePoly(ctx, flapPoly)
    ctx.clip()
    const fg2 = ctx.createLinearGradient(mx, my, mx - awnx * 14, my - awny * 14)
    fg2.addColorStop(0, 'rgba(255,255,255,0.45)')
    fg2.addColorStop(1, 'rgba(255,255,255,0)')
    ctx.fillStyle = fg2
    ctx.fillRect(-W, -H, W * 3, H * 3)
    ctx.restore()
  }

  ctx.restore()
}

function makeFront(W: number, H: number, dpr: number): OffscreenCanvas {
  const oc = new OffscreenCanvas(Math.round(W * dpr), Math.round(H * dpr))
  const c = oc.getContext('2d')!
  c.scale(dpr, dpr)
  c.fillStyle = '#ffffff'
  c.roundRect(0, 0, W, H, 12)
  c.fill()
  const p = 28
  c.fillStyle = '#111'
  c.font = `600 20px "Archivo", system-ui, sans-serif`
  c.fillText('The Art of Design', p, p + 24)
  c.fillStyle = '#777'
  c.font = `400 13px "Space Grotesk", system-ui, sans-serif`
  ;['Design is not just what it looks like.', 'Design is how it works.', '', 'The smallest interactions create', 'the most lasting impressions.', '', 'Drag to curl.'].forEach((line, i) => {
    if (line) c.fillText(line, p, p + 52 + i * 19)
  })
  c.fillStyle = '#1a1a1a'
  c.roundRect(p, H - 100, W - p * 2, 68, 10)
  c.fill()
  c.fillStyle = '#ffffff'
  c.font = `500 12px "Space Grotesk", system-ui, sans-serif`
  c.fillText('iOS Page Curl', p + 16, H - 100 + 38)
  return oc
}

function makeBack(W: number, H: number, dpr: number): OffscreenCanvas {
  const oc = new OffscreenCanvas(Math.round(W * dpr), Math.round(H * dpr))
  const c = oc.getContext('2d')!
  c.scale(dpr, dpr)
  c.fillStyle = '#f5f0ea'
  c.roundRect(0, 0, W, H, 12)
  c.fill()
  c.strokeStyle = 'rgba(0,0,0,0.07)'
  c.lineWidth = 1
  for (let y = 32; y < H; y += 22) {
    c.beginPath(); c.moveTo(24, y); c.lineTo(W - 24, y); c.stroke()
  }
  c.fillStyle = '#bbb'
  c.font = `500 12px "Space Grotesk", system-ui, sans-serif`
  c.fillText('back of page', 24, 40)
  return oc
}

export default function PageCurlEmbed({ demo = false }: { demo?: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const frontRef  = useRef<OffscreenCanvas | null>(null)
  const backRef   = useRef<OffscreenCanvas | null>(null)

  // Single source of truth: peel distance in pixels
  const distRef       = useRef(demo ? 80 : 0)
  const angleRef      = useRef(45)
  const targetAngleRef = useRef(0)
  const shadowRef     = useRef(0.5)
  const dragging      = useRef(false)
  const downClientRef = useRef<Pt>({ x: 0, y: 0 })
  const distAtDownRef = useRef(0)
  const rafRef        = useRef(0)
  const angleRafRef   = useRef(0)

  const [shadowOpacity, setShadowOpacity] = useState(0.5)
  const [angle, setAngle] = useState(0)

  const render = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const dpr = window.devicePixelRatio || 1
    draw(canvas, angleRef.current, distRef.current, shadowRef.current, frontRef.current, backRef.current, dpr)
  }, [])

  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const dpr = window.devicePixelRatio || 1
    const W = canvas.offsetWidth
    const H = canvas.offsetHeight
    if (!W || !H) return
    canvas.width  = Math.round(W * dpr)
    canvas.height = Math.round(H * dpr)
    frontRef.current = makeFront(W, H, dpr)
    backRef.current  = makeBack(W, H, dpr)
    render()
  }, [render])

  useEffect(() => {
    initCanvas()
    const ro = new ResizeObserver(initCanvas)
    if (canvasRef.current) ro.observe(canvasRef.current)
    return () => ro.disconnect()
  }, [initCanvas])

  // Angle change: animate angleRef toward the target over multiple frames
  useEffect(() => {
    targetAngleRef.current = (angle + 45) % 360
    cancelAnimationFrame(angleRafRef.current)

    function animateAngle() {
      const current = angleRef.current
      const target = targetAngleRef.current

      // Shortest-path delta on the circle
      let delta = ((target - current + 540) % 360) - 180
      if (Math.abs(delta) < 0.3) {
        angleRef.current = target
        render()
        return
      }

      angleRef.current = (current + delta * 0.18 + 360) % 360
      render()
      angleRafRef.current = requestAnimationFrame(animateAngle)
    }

    angleRafRef.current = requestAnimationFrame(animateAngle)
  }, [angle, render])

  useEffect(() => {
    shadowRef.current = shadowOpacity
    render()
  }, [shadowOpacity, render])

  const onDown = useCallback((clientX: number, clientY: number) => {
    dragging.current = true
    downClientRef.current = { x: clientX, y: clientY }
    distAtDownRef.current = distRef.current
    cancelAnimationFrame(rafRef.current)
    rafRef.current = requestAnimationFrame(render)
  }, [render])

  const onMove = useCallback((clientX: number, clientY: number) => {
    if (!dragging.current) return
    const canvas = canvasRef.current
    if (!canvas) return
    const dpr = window.devicePixelRatio || 1
    const W = canvas.width / dpr
    const H = canvas.height / dpr
    const r = canvas.getBoundingClientRect()

    const { inward, maxDist } = getOrigin(angleRef.current, W, H)

    // Project pointer delta onto inward direction (in canvas pixel space)
    const scaleX = W / r.width
    const scaleY = H / r.height
    const dragDx = (clientX - downClientRef.current.x) * scaleX
    const dragDy = (clientY - downClientRef.current.y) * scaleY
    const proj = dragDx * inward.x + dragDy * inward.y

    distRef.current = Math.max(0, Math.min(maxDist, distAtDownRef.current + proj))
    cancelAnimationFrame(rafRef.current)
    rafRef.current = requestAnimationFrame(render)
  }, [render])

  const onUp = useCallback(() => {
    dragging.current = false
  }, [])

  useEffect(() => {
    if (demo) return
    const mm = (e: MouseEvent) => {
      // If mouse button was released outside the window, stop dragging
      if (dragging.current && e.buttons === 0) {
        onUp()
        return
      }
      onMove(e.clientX, e.clientY)
    }
    const mu = () => onUp()
    const tm = (e: TouchEvent) => onMove(e.touches[0].clientX, e.touches[0].clientY)
    const te = () => onUp()
    window.addEventListener('mousemove', mm)
    window.addEventListener('mouseup', mu)
    window.addEventListener('touchmove', tm, { passive: true })
    window.addEventListener('touchend', te)
    return () => {
      window.removeEventListener('mousemove', mm)
      window.removeEventListener('mouseup', mu)
      window.removeEventListener('touchmove', tm)
      window.removeEventListener('touchend', te)
    }
  }, [demo, onMove, onUp])

  return (
    <div className={styles.embedWrapper}>
      <canvas
        ref={canvasRef}
        className={styles.curlCanvas}
        onMouseDown={demo ? undefined : (e) => onDown(e.clientX, e.clientY)}
        onTouchStart={demo ? undefined : (e) => onDown(e.touches[0].clientX, e.touches[0].clientY)}
        style={demo ? { cursor: 'default' } : undefined}
        aria-label={demo ? 'iOS page curl reference' : 'Page curl — drag to peel'}
      />
      {!demo && (
        <div className={styles.embedControls}>
          <div className={styles.controlItem}>
            <span className={styles.controlLabel}>Opacity</span>
            <input
              type="range"
              min="0" max="1" step="0.01"
              value={shadowOpacity}
              onChange={(e) => setShadowOpacity(parseFloat(e.target.value))}
              className={styles.slider}
              aria-label="Shadow opacity"
            />
          </div>
          <div className={styles.controlItem}>
            <span className={styles.controlLabel}>Angle</span>
            <input
              type="range"
              min="0" max="315" step="1"
              value={angle}
              onChange={(e) => setAngle(parseInt(e.target.value))}
              className={styles.slider}
              aria-label="Curl angle"
            />
          </div>
        </div>
      )}
    </div>
  )
}
