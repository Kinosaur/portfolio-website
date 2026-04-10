"use client";

import { siteContent } from "@/data/content";
import InView from "./InView";

export default function FeaturedCaseStudy() {
  const { featuredCaseStudy: cs } = siteContent;

  return (
    <section id="featured" className="section">
      <div className="container">
        <InView>
          <p className="label" style={{ marginBottom: "0.5rem" }}>
            {cs.label}
          </p>
          <h2
            className="section-heading heading-reveal"
            style={{
              fontSize: "clamp(1.5rem, 3vw, 2rem)",
              fontWeight: 700,
              letterSpacing: "-0.025em",
              color: "var(--foreground)",
              marginBottom: "0.35rem",
              marginTop: "0",
            }}
          >
            {cs.title}
          </h2>
          <p style={{ color: "var(--muted)", fontSize: "0.9rem", marginBottom: "2rem" }}>
            {cs.tagline}
          </p>
        </InView>

        <InView delay={80}>
          <div
            style={{
              border: "1px solid var(--border)",
              borderRadius: "12px",
              overflow: "hidden",
            }}
          >
            <div style={{ padding: "2rem 2.5rem", background: "var(--card)" }}>
              {/* Problem */}
              <div style={{ marginBottom: "2rem" }}>
                <p className="label" style={{ marginBottom: "0.6rem", color: "var(--accent)" }}>
                  Problem
                </p>
                <p style={{ color: "var(--muted)", lineHeight: 1.8, fontSize: "1rem" }}>
                  {cs.problem}
                </p>
              </div>

              {/* Approach */}
              <div style={{ marginBottom: "2rem" }}>
                <p className="label" style={{ marginBottom: "1rem", color: "var(--accent)" }}>
                  Approach
                </p>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0",
                    border: "1px solid var(--border)",
                    borderRadius: "8px",
                    overflow: "hidden",
                  }}
                >
                  {cs.approach.map((step, i) => (
                    <div
                      key={step.label}
                      className="approach-row"
                      style={{
                        display: "grid",
                        gridTemplateColumns: "120px 1fr",
                        gap: "1.25rem",
                        alignItems: "start",
                        padding: "1rem 1.5rem",
                        borderBottom:
                          i < cs.approach.length - 1 ? "1px solid var(--border)" : "none",
                        background:
                          i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.015)",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "0.82rem",
                          fontWeight: 700,
                          color: "var(--foreground)",
                          paddingTop: "0.1rem",
                          letterSpacing: "0.01em",
                        }}
                      >
                        {step.label}
                      </span>
                      <span style={{ color: "var(--muted)", lineHeight: 1.75, fontSize: "0.95rem" }}>
                        {step.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* What this demonstrates */}
              <div style={{ marginBottom: "2rem" }}>
                <p className="label" style={{ marginBottom: "0.8rem", color: "var(--accent)" }}>
                  What This Demonstrates
                </p>
                <ul
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.45rem",
                    paddingLeft: 0,
                    listStyle: "none",
                  }}
                >
                  {cs.demonstrates.map((point) => (
                    <li
                      key={point}
                      style={{
                        display: "flex",
                        gap: "0.65rem",
                        alignItems: "flex-start",
                        color: "var(--muted)",
                        fontSize: "0.95rem",
                        lineHeight: 1.72,
                      }}
                    >
                      <span style={{ color: "var(--accent)", marginTop: "0.28rem", flexShrink: 0, fontWeight: 700 }}>
                        —
                      </span>
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
                  style={ghostLinkStyle}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "var(--foreground)";
                    e.currentTarget.style.color = "var(--foreground)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "var(--border)";
                    e.currentTarget.style.color = "var(--muted)";
                  }}
                >
                  GitHub ↗
                </a>
                <a
                  href={cs.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    ...ghostLinkStyle,
                    background: "var(--accent)",
                    color: "#fff",
                    borderColor: "var(--accent)",
                    boxShadow: "0 4px 14px color-mix(in srgb, var(--accent) 35%, transparent)",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                >
                  Live Demo ↗
                </a>
              </div>
            </div>
          </div>
        </InView>
      </div>
    </section>
  );
}

const ghostLinkStyle: React.CSSProperties = {
  display: "inline-block",
  padding: "0.55rem 1.15rem",
  border: "1px solid var(--border)",
  borderRadius: "7px",
  color: "var(--muted)",
  textDecoration: "none",
  fontSize: "0.85rem",
  fontWeight: 500,
  transition: "border-color 0.15s, color 0.15s, opacity 0.15s",
};
