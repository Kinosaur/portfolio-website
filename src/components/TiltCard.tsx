"use client";

import { useRef } from "react";

interface TiltCardProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
  maxTilt?: number;
}

export default function TiltCard({
  children,
  style,
  className,
  maxTilt = 8,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current!;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transition = "transform 0.08s ease-out";
    el.style.transform = `perspective(800px) rotateX(${-y * maxTilt}deg) rotateY(${x * maxTilt}deg) scale(1.025)`;
  }

  function onLeave() {
    const el = ref.current!;
    el.style.transition = "transform 0.65s cubic-bezier(0.16, 1, 0.3, 1)";
    el.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)";
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ willChange: "transform", ...style }}
      className={className}
    >
      {children}
    </div>
  );
}
