"use client";

import { siteContent } from "@/data/content";

export default function Hero() {
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
      <div className="hero-bg" />

      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: "680px" }}>

          {/* Eyebrow */}
          <p className="label hero-line" style={{ marginBottom: "1.5rem" }}>
            Portfolio · Data Engineering
          </p>

          {/* Name */}
          <h1
            className="hero-line"
            style={{
              fontSize: "clamp(2.4rem, 6vw, 3.75rem)",
              fontWeight: 700,
              letterSpacing: "-0.035em",
              lineHeight: 1.08,
              color: "var(--foreground)",
              marginBottom: "1rem",
            }}
          >
            {siteContent.name}
          </h1>

          {/* Human intro */}
          <p
            className="hero-line"
            style={{
              fontSize: "1.2rem",
              fontWeight: 500,
              color: "var(--foreground)",
              marginBottom: "1.1rem",
            }}
          >
            Hi — I&rsquo;m Kino.
          </p>

          {/* Positioning */}
          <p
            className="hero-line"
            style={{
              fontSize: "1.05rem",
              lineHeight: 1.85,
              color: "var(--muted)",
              marginBottom: "2.75rem",
              maxWidth: "540px",
            }}
          >
            Final-year CS student at Assumption University, Bangkok, originally from
            Myanmar. Moving toward data engineering — currently strongest in Python
            data processing and visualization, learning warehousing and orchestration
            now.
          </p>

          {/* CTA */}
          <a
            href="#featured"
            className="cta-btn hero-line"
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
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow =
                "0 4px 16px color-mix(in srgb, var(--accent) 40%, transparent)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            {siteContent.hero.cta}
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
