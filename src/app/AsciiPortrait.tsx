"use client";

import { useEffect, useRef, useState } from "react";

/* ─── ASCII portrait ──────────────────────────────────────────────────
   At rest the portrait is rendered as ASCII (IBM Plex Mono, --fg-body).
   On mouse devices, moving the cursor accumulates a soft, decaying trail
   that masks the real photo through it — so the person is "revealed"
   along the cursor's path, then heals back to text.

   Layering (all offscreen canvases, one draw/frame):
     ascii   — static text portrait, drawn once
     photo   — the cropped photo, drawn once
     trail   — decaying alpha field; blobs stamped along the cursor path
     scratch — photo ∩ trail (destination-in), composited over ascii

   Touch / reduced-motion → plain <Image> (the effect is cursor-driven).
──────────────────────────────────────────────────────────────────────── */

/* Luminance ramp, light → dense (space first). Richer set = "wordier"
   texture with more distinct glyphs across the tonal range. */
const RAMP =
  " .'`^\",:;Il!i><~+_-?][}{1)(|/tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@$";
const W = 300; // display box (desktop); mobile uses the fallback <div>
const H = 368;
/* Tight head-and-chest crop of the 1333×2000 source so the subject fills
   the frame instead of sitting small inside a full-figure crop. Drives BOTH
   the canvas (drawImage) and the CSS fallback so they match exactly. */
const IW = 1333;
const IH = 2000;
const CROP = { sx: 335, sy: 330, sw: 760, sh: 933 };
/* CSS background equivalents of CROP (responsive, no JS) */
const BG_SIZE = `${(IW / CROP.sw) * 100}% auto`;
const BG_POS = `${(CROP.sx / (IW - CROP.sw)) * 100}% ${
  (CROP.sy / (IH - CROP.sh)) * 100
}%`;
const FONT_PX = 5; // smaller → more, denser characters
const RADIUS = 30; // reveal radius — scales with the larger box, still subtle
const DECAY = 0.04; // trail alpha lost per frame (lower = longer tail ~1.7s)

export default function AsciiPortrait({
  src,
  alt,
  isDark,
}: {
  src: string;
  alt: string;
  isDark: boolean;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef(0);
  const [enabled, setEnabled] = useState(false); // mouse + motion allowed
  const [ready, setReady] = useState(false); // ascii built → fade photo out

  /* Decide whether the effect runs at all (mouse device, motion allowed) */
  useEffect(() => {
    const hoverNone = window.matchMedia("(hover: none)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setEnabled(!hoverNone && !reduce);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const DPR = Math.min(window.devicePixelRatio || 1, 2);
    let cancelled = false;

    /* Make a DPR-scaled offscreen canvas that draws in CSS-px space */
    const mk = () => {
      const c = document.createElement("canvas");
      c.width = W * DPR;
      c.height = H * DPR;
      const x = c.getContext("2d")!;
      x.scale(DPR, DPR);
      return { c, x };
    };

    canvas.width = W * DPR;
    canvas.height = H * DPR;
    const ctx = canvas.getContext("2d")!;
    ctx.scale(DPR, DPR);

    const ascii = mk();
    const photo = mk();
    const trail = mk();
    const scratch = mk();

    /* Cursor state, in CSS-px canvas coords */
    const pt = { x: -1, y: -1, px: -1, py: -1, inside: false };
    let built = false;
    let running = false;
    let idleFrames = 0;

    const rect = () => canvas.getBoundingClientRect();
    const toLocal = (e: MouseEvent) => {
      const b = rect();
      return {
        x: ((e.clientX - b.left) / b.width) * W,
        y: ((e.clientY - b.top) / b.height) * H,
      };
    };

    const ensureLoop = () => {
      idleFrames = 0;
      if (!running && built) {
        running = true;
        rafRef.current = requestAnimationFrame(frame);
      }
    };

    const onEnter = (e: MouseEvent) => {
      const p = toLocal(e);
      pt.px = p.x;
      pt.py = p.y;
    };
    const onMove = (e: MouseEvent) => {
      const p = toLocal(e);
      pt.x = p.x;
      pt.y = p.y;
      pt.inside = true;
      ensureLoop();
    };
    const onLeave = () => {
      pt.inside = false;
    };

    canvas.addEventListener("mouseenter", onEnter);
    canvas.addEventListener("mousemove", onMove);
    canvas.addEventListener("mouseleave", onLeave);

    /* Stamp soft blobs along the segment prev→current so fast moves stay
       continuous (this is what makes it path-reactive, not point-reactive) */
    const stamp = () => {
      if (pt.px < 0) {
        pt.px = pt.x;
        pt.py = pt.y;
      }
      const dx = pt.x - pt.px;
      const dy = pt.y - pt.py;
      const steps = Math.max(1, Math.ceil(Math.hypot(dx, dy) / 6));
      trail.x.globalCompositeOperation = "source-over";
      for (let s = 0; s <= steps; s++) {
        const bx = pt.px + (dx * s) / steps;
        const by = pt.py + (dy * s) / steps;
        const g = trail.x.createRadialGradient(bx, by, 0, bx, by, RADIUS);
        g.addColorStop(0, "rgba(0,0,0,0.9)");
        g.addColorStop(1, "rgba(0,0,0,0)");
        trail.x.fillStyle = g;
        trail.x.fillRect(bx - RADIUS, by - RADIUS, RADIUS * 2, RADIUS * 2);
      }
      pt.px = pt.x;
      pt.py = pt.y;
    };

    const drawAsciiOnly = () => {
      ctx.clearRect(0, 0, W, H);
      ctx.drawImage(ascii.c, 0, 0, W, H);
    };

    const frame = () => {
      /* Decay the whole trail toward transparent (exponential tail) */
      trail.x.globalCompositeOperation = "destination-out";
      trail.x.fillStyle = `rgba(0,0,0,${DECAY})`;
      trail.x.fillRect(0, 0, W, H);
      trail.x.globalCompositeOperation = "source-over";

      if (pt.inside) stamp();

      /* photo ∩ trail */
      scratch.x.globalCompositeOperation = "source-over";
      scratch.x.clearRect(0, 0, W, H);
      scratch.x.drawImage(photo.c, 0, 0, W, H);
      scratch.x.globalCompositeOperation = "destination-in";
      scratch.x.drawImage(trail.c, 0, 0, W, H);
      scratch.x.globalCompositeOperation = "source-over";

      /* ascii base + revealed photo on top */
      ctx.clearRect(0, 0, W, H);
      ctx.drawImage(ascii.c, 0, 0, W, H);
      ctx.drawImage(scratch.c, 0, 0, W, H);

      /* Keep running while hovering, then ~1s to let the trail fade out */
      idleFrames = pt.inside ? 0 : idleFrames + 1;
      if (pt.inside || idleFrames < 60) {
        rafRef.current = requestAnimationFrame(frame);
      } else {
        running = false;
        drawAsciiOnly();
      }
    };

    const img = new window.Image();
    img.onload = () => {
      if (cancelled) return;

      photo.x.drawImage(img, CROP.sx, CROP.sy, CROP.sw, CROP.sh, 0, 0, W, H);

      /* Derive the grid from the font's REAL glyph metrics so characters
         align to their true advance width (no drift / overlap), then
         centre the grid in the box. */
      ascii.x.font = `${FONT_PX}px ui-monospace, "IBM Plex Mono", monospace`;
      ascii.x.textBaseline = "top";
      const cw = ascii.x.measureText("W").width || FONT_PX * 0.6;
      const ch = FONT_PX * 1.05;
      const cols = Math.max(1, Math.floor(W / cw));
      const rows = Math.max(1, Math.floor(H / ch));
      const offX = (W - cols * cw) / 2;
      const offY = (H - rows * ch) / 2;

      const s = document.createElement("canvas");
      s.width = cols;
      s.height = rows;
      const sctx = s.getContext("2d")!;
      sctx.drawImage(img, CROP.sx, CROP.sy, CROP.sw, CROP.sh, 0, 0, cols, rows);
      const data = sctx.getImageData(0, 0, cols, rows).data;

      const fg =
        getComputedStyle(canvas).getPropertyValue("--fg-body").trim() ||
        (isDark ? "#C8C3BC" : "#2C2A27");

      ascii.x.clearRect(0, 0, W, H);
      ascii.x.fillStyle = fg;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const i = (r * cols + c) * 4;
          if (data[i + 3] < 40) continue; // transparent → keep silhouette
          const lum = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
          const chr = RAMP[Math.floor((1 - lum / 255) * (RAMP.length - 1))];
          if (chr === " ") continue;
          ascii.x.fillText(chr, offX + c * cw, offY + r * ch);
        }
      }

      built = true;
      setReady(true);
      drawAsciiOnly();
    };
    img.src = src;

    return () => {
      cancelled = true;
      cancelAnimationFrame(rafRef.current);
      canvas.removeEventListener("mouseenter", onEnter);
      canvas.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("mouseleave", onLeave);
    };
  }, [enabled, isDark, src]);

  return (
    <div style={{ position: "relative", width: "100%" }} data-cursor="read">
      {/* Photo: the SSR/touch/reduced-motion visual and the a11y source,
          cropped identically to the canvas. Fades out once the ASCII layer
          is painted so sparse (bright) cells don't leak the photo through. */}
      <div
        role="img"
        aria-label={alt}
        className="profile-photo"
        style={{
          width: "100%",
          aspectRatio: `${W} / ${H}`,
          backgroundImage: `url(${src})`,
          backgroundSize: BG_SIZE,
          backgroundPosition: BG_POS,
          backgroundRepeat: "no-repeat",
          opacity: enabled && ready ? 0 : 1,
          transition: "opacity 0.4s ease",
        }}
      />
      {enabled && (
        <canvas
          ref={canvasRef}
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            display: "block",
          }}
        />
      )}
    </div>
  );
}
