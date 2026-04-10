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
            <div className="featured-grid" style={{ background: "var(--card)" }}>
              {/* ── Left: main content ── */}
              <div style={{ padding: "2rem 2.5rem" }}>
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

                {/* Links */}
                <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", paddingTop: "0.5rem" }}>
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

              {/* ── Right: stats sidebar ── */}
              <aside className="featured-sidebar">
                <p className="label" style={{ marginBottom: "1rem", color: "var(--accent)" }}>
                  At a Glance
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  {[
                    { value: "1.1M+", label: "civic tickets" },
                    { value: "~15%", label: "missing geo — handled" },
                    { value: "Weekly", label: "pipeline refresh" },
                  ].map((stat) => (
                    <div key={stat.label} className="stat-tile">
                      <div className="stat-value">{stat.value}</div>
                      <div className="stat-label">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </aside>
            </div>
          </div>
        </InView>

        <style>{`
          .featured-grid {
            display: grid;
            grid-template-columns: 1fr 260px;
          }
          .featured-sidebar {
            padding: 2rem 1.75rem;
            border-left: 1px solid var(--border);
          }

          /* Stat tiles */
          .stat-tile {
            border: 1px solid var(--border);
            border-radius: 8px;
            padding: 0.85rem 1rem;
            background: color-mix(in srgb, var(--card) 50%, var(--background) 50%);
            transition: border-color 0.18s, background 0.18s;
            cursor: default;
          }
          .stat-tile:hover {
            border-color: color-mix(in srgb, var(--accent) 40%, var(--border));
            background: color-mix(in srgb, var(--accent) 5%, var(--card));
          }
          .stat-tile:hover .stat-value {
            color: var(--accent);
          }
          .stat-value {
            font-size: 1.4rem;
            font-weight: 800;
            color: var(--foreground);
            letter-spacing: -0.03em;
            line-height: 1;
            transition: color 0.18s;
          }
          .stat-label {
            font-size: 0.75rem;
            color: var(--muted);
            margin-top: 0.3rem;
          }

          @media (max-width: 860px) {
            .featured-grid { grid-template-columns: 1fr; }
            .featured-sidebar {
              border-left: none;
              border-top: 1px solid var(--border);
              padding: 1.75rem 2.5rem;
            }
          }
        `}</style>
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
