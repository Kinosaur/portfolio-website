"use client";

import { useEffect, useRef } from "react";

// Only true clickables — cards/tags handle their own hover feedback visually
const CLICKABLE = "a, button, [role='button'], label[for]";

export default function Cursor() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    document.documentElement.classList.add("has-custom-cursor");

    const el = ref.current!;

    function onMove(e: MouseEvent) {
      el.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      el.style.opacity = "1";
      el.dataset.state = (e.target as Element).closest(CLICKABLE) ? "click" : "default";
    }

    function onLeave() { el.style.opacity = "0"; }
    function onEnter(e: MouseEvent) {
      el.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      el.style.opacity = "1";
    }

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter as EventListener);

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter as EventListener);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, []);

  return (
    <div
      ref={ref}
      className="cursor"
      data-state="default"
      aria-hidden="true"
    />
  );
}
