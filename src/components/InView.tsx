"use client";

import { useEffect, useRef } from "react";

interface InViewProps {
  children: React.ReactNode;
  delay?: number; // ms
  className?: string;
  style?: React.CSSProperties;
}

export default function InView({ children, delay = 0, className = "", style }: InViewProps) {
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
      { threshold: 0.12 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div ref={ref} className={`fade-up ${className}`} style={style}>
      {children}
    </div>
  );
}
