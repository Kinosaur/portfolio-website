"use client";

import { siteContent } from "@/data/content";

export default function Hero() {
  const { hero } = siteContent;

  return (
    <section
      id="hero"
      style={{
        position: "relative",
        minHeight: "100svh",
        display: "flex",
        alignItems: "center",
        paddingTop: "5rem",
        overflow: "hidden",
      }}
    >
      {/* Dot-grid background */}
      <div className="hero-bg" />

      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: "660px" }}>

          {/* Line 1 — eyebrow */}
          <p className="label hero-line" style={{ marginBottom: "1.25rem" }}>
            Portfolio · Data Engineering
          </p>

          {/* Line 2 — full name */}
          <h1
            className="hero-line"
            style={{
              fontSize: "clamp(2.4rem, 6vw, 3.75rem)",
              fontWeight: 700,
              letterSpacing: "-0.035em",
              lineHeight: 1.08,
              color: "var(--foreground)",
              marginBottom: "0.5rem",
            }}
          >
            {hero.headline}
          </h1>

          {/* Line 3 — handle */}
          <p
            className="hero-line"
            style={{
              fontSize: "1rem",
              color: "var(--muted)",
              marginBottom: "1.75rem",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <span
              style={{
                fontWeight: 600,
                color: "var(--accent)",
                fontSize: "0.85rem",
                padding: "0.15rem 0.55rem",
                border: "1px solid color-mix(in srgb, var(--accent) 35%, transparent)",
                borderRadius: "4px",
                letterSpacing: "0.02em",
              }}
            >
              — Kino
            </span>
            <span
              style={{
                fontSize: "0.78rem",
                color: "var(--muted)",
                opacity: 0.6,
              }}
            >
              @Kinosaur on GitHub
            </span>
          </p>

          {/* Line 4 — positioning */}
          <p
            className="hero-line"
            style={{
              fontSize: "1.05rem",
              lineHeight: 1.8,
              color: "var(--muted)",
              marginBottom: "2.75rem",
              maxWidth: "540px",
            }}
          >
            Final-year CS student at Assumption University, Bangkok.
            <br />
            Moving toward data engineering — currently strongest in Python data
            processing and visualization, learning warehousing and orchestration now.
          </p>

          {/* CTA */}
          <a
            href="#featured"
            className="cta-btn"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.8rem 1.65rem",
              background: "var(--accent)",
              color: "#fff",
              borderRadius: "8px",
              textDecoration: "none",
              fontWeight: 600,
              fontSize: "0.88rem",
              letterSpacing: "0.01em",
              boxShadow: "0 4px 16px color-mix(in srgb, var(--accent) 40%, transparent)",
              transition: "box-shadow 0.2s, transform 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow =
                "0 6px 24px color-mix(in srgb, var(--accent) 55%, transparent)";
              e.currentTarget.style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow =
                "0 4px 16px color-mix(in srgb, var(--accent) 40%, transparent)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            {hero.cta}
            <svg className="cta-arrow" width="15" height="15" viewBox="0 0 16 16" fill="none">
              <path
                d="M8 3v10M3 8l5 5 5-5"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
