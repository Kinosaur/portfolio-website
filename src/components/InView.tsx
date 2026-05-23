"use client";

import { useEffect, useRef } from "react";

type AnimationVariant = "fade-up" | "slide-left" | "spring-in" | "curtain-reveal";

interface InViewProps {
  children: React.ReactNode;
  delay?: number; // ms
  className?: string;
  style?: React.CSSProperties;
  animation?: AnimationVariant;
}

export default function InView({
  children,
  delay = 0,
  className = "",
  style,
  animation = "fade-up",
}: InViewProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (delay) {
            setTimeout(() => el.classList.add("in-view"), delay);
          } else {
            el.classList.add("in-view");
          }
          observer.unobserve(el);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div ref={ref} className={`${animation} ${className}`} style={style}>
      {children}
    </div>
  );
}
