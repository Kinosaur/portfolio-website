"use client";

import { useEffect, useRef } from "react";

const DOT = 8;
const RING = 36;
const LERP = 0.13;

// Elements considered interactive for cursor state change
const INTERACTIVE = "a, button, label, [role='button'], .card-lift, .skill-tag, .building-item, .nav-link, .logo-link, .cta-btn";

export default function Cursor() {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const m  = useRef({ x: -200, y: -200 });   // mouse
  const r  = useRef({ x: -200, y: -200 });   // ring (lerped)
  const raf = useRef<number>(0);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const dot  = dotRef.current!;
    const ring = ringRef.current!;
    dot.style.opacity  = "0";
    ring.style.opacity = "0";

    function tick() {
      r.current.x += (m.current.x - r.current.x) * LERP;
      r.current.y += (m.current.y - r.current.y) * LERP;
      ring.style.transform = `translate(${r.current.x - RING / 2}px, ${r.current.y - RING / 2}px)`;
      raf.current = requestAnimationFrame(tick);
    }

    function onMove(e: MouseEvent) {
      m.current = { x: e.clientX, y: e.clientY };
      dot.style.transform = `translate(${e.clientX - DOT / 2}px, ${e.clientY - DOT / 2}px)`;
      dot.style.opacity   = "1";
      ring.style.opacity  = "1";

      const el = e.target as Element;
      const interactive = !!el.closest(INTERACTIVE);
      dot.dataset.hover  = interactive ? "1" : "0";
      ring.dataset.hover = interactive ? "1" : "0";
    }

    function onLeave() {
      dot.style.opacity  = "0";
      ring.style.opacity = "0";
    }
    function onEnter(e: MouseEvent) {
      m.current = { x: e.clientX, y: e.clientY };
      dot.style.opacity  = "1";
      ring.style.opacity = "1";
    }

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter as EventListener);
    raf.current = requestAnimationFrame(tick);

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter as EventListener);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <>
      <div ref={dotRef}  className="cursor-dot"  aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
    </>
  );
}
