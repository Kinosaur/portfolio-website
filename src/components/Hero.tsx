"use client";

import { siteContent } from "@/data/content";

export default function Hero() {
  const { hero } = siteContent;

  return (
    <section
      id="hero"
      style={{
        minHeight: "100svh",
        display: "flex",
        alignItems: "center",
        paddingTop: "5rem",
      }}
    >
      <div className="container">
        <div style={{ maxWidth: "640px" }}>
          {/* Eyebrow */}
          <p className="label" style={{ marginBottom: "1.5rem" }}>
            Portfolio
          </p>

          {/* Name */}
          <h1
            style={{
              fontSize: "clamp(2.2rem, 5vw, 3.5rem)",
              fontWeight: 700,
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
              color: "var(--foreground)",
              marginBottom: "1.5rem",
            }}
          >
            {hero.headline}
          </h1>

          {/* Positioning statement */}
          <p
            style={{
              fontSize: "1.05rem",
              lineHeight: 1.75,
              color: "var(--muted)",
              marginBottom: "2.5rem",
              whiteSpace: "pre-line",
            }}
          >
            {hero.subheadline}
          </p>

          {/* CTA */}
          <a
            href="#featured"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.75rem 1.5rem",
              background: "var(--accent)",
              color: "#fff",
              borderRadius: "6px",
              textDecoration: "none",
              fontWeight: 500,
              fontSize: "0.9rem",
              transition: "opacity 0.15s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            {hero.cta}
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 3v10M3 8l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
