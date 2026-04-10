"use client";

import { siteContent } from "@/data/content";

export default function FeaturedCaseStudy() {
  const { featuredCaseStudy: cs } = siteContent;

  return (
    <section id="featured" className="section">
      <div className="container">
        {/* Section label */}
        <p className="label" style={{ marginBottom: "2.5rem" }}>
          {cs.label}
        </p>

        <div
          style={{
            border: "1px solid var(--border)",
            borderRadius: "12px",
            overflow: "hidden",
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: "2rem 2.5rem",
              borderBottom: "1px solid var(--border)",
              background: "var(--card)",
            }}
          >
            <h2
              style={{
                fontSize: "clamp(1.5rem, 3vw, 2rem)",
                fontWeight: 700,
                letterSpacing: "-0.02em",
                color: "var(--foreground)",
                marginBottom: "0.35rem",
              }}
            >
              {cs.title}
            </h2>
            <p style={{ color: "var(--muted)", fontSize: "0.9rem" }}>{cs.tagline}</p>
          </div>

          <div style={{ padding: "2rem 2.5rem", background: "var(--card)" }}>
            {/* Problem */}
            <div style={{ marginBottom: "2rem" }}>
              <p
                className="label"
                style={{ marginBottom: "0.6rem", color: "var(--accent)" }}
              >
                Problem
              </p>
              <p style={{ color: "var(--muted)", lineHeight: 1.7, fontSize: "0.95rem" }}>
                {cs.problem}
              </p>
            </div>

            {/* Approach */}
            <div style={{ marginBottom: "2rem" }}>
              <p
                className="label"
                style={{ marginBottom: "1rem", color: "var(--accent)" }}
              >
                Approach
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.9rem" }}>
                {cs.approach.map((step) => (
                  <div
                    key={step.label}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "120px 1fr",
                      gap: "1rem",
                      alignItems: "start",
                    }}
                    className="approach-row"
                  >
                    <span
                      style={{
                        fontSize: "0.78rem",
                        fontWeight: 600,
                        color: "var(--foreground)",
                        paddingTop: "0.15rem",
                      }}
                    >
                      {step.label}
                    </span>
                    <span style={{ color: "var(--muted)", lineHeight: 1.65, fontSize: "0.9rem" }}>
                      {step.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* What this demonstrates */}
            <div style={{ marginBottom: "2rem" }}>
              <p
                className="label"
                style={{ marginBottom: "0.8rem", color: "var(--accent)" }}
              >
                What This Demonstrates
              </p>
              <ul style={{ display: "flex", flexDirection: "column", gap: "0.45rem", paddingLeft: 0, listStyle: "none" }}>
                {cs.demonstrates.map((point) => (
                  <li
                    key={point}
                    style={{
                      display: "flex",
                      gap: "0.6rem",
                      alignItems: "flex-start",
                      color: "var(--muted)",
                      fontSize: "0.9rem",
                      lineHeight: 1.6,
                    }}
                  >
                    <span style={{ color: "var(--accent)", marginTop: "0.3rem", flexShrink: 0 }}>—</span>
                    {point}
                  </li>
                ))}
              </ul>
            </div>

            {/* Links */}
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
              <a
                href={cs.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={linkStyle}
              >
                GitHub →
              </a>
              <a
                href={cs.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{ ...linkStyle, background: "var(--accent)", color: "#fff", borderColor: "var(--accent)" }}
              >
                Live Demo →
              </a>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 600px) {
          .approach-row {
            grid-template-columns: 1fr !important;
            gap: 0.25rem !important;
          }
        }
      `}</style>
    </section>
  );
}

const linkStyle: React.CSSProperties = {
  display: "inline-block",
  padding: "0.5rem 1.1rem",
  border: "1px solid var(--border)",
  borderRadius: "6px",
  color: "var(--foreground)",
  textDecoration: "none",
  fontSize: "0.85rem",
  fontWeight: 500,
  transition: "border-color 0.15s, color 0.15s",
};
