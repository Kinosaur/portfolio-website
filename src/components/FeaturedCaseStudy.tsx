"use client";

import { useState } from "react";
import { siteContent } from "@/data/content";
import InView from "./InView";

export default function FeaturedCaseStudy() {
  const { featuredCaseStudy: cs } = siteContent;
  const [mobileProblemExpanded,  setMobileProblemExpanded]  = useState(false);
  const [mobileApproachExpanded, setMobileApproachExpanded] = useState(false);

  return (
    <section id="featured" className="section">
      <div className="container">

        {/* ── Header ── */}
        <InView>
          <p className="label" style={{ marginBottom: "0.6rem" }}>{cs.label}</p>
          <h2
            className="section-heading heading-reveal"
            style={{
              fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
              letterSpacing: "-0.025em",
              color: "var(--foreground)",
              marginBottom: "0.4rem",
              marginTop: 0,
            }}
          >
            {cs.title}
          </h2>
          <p style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.72rem",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "var(--muted)",
            marginBottom: "2.25rem",
          }}>
            {cs.tagline}
          </p>
        </InView>

        {/* ── Content card ── */}
        <InView delay={80}>
          <div className="featured-card">
            <div className="featured-grid">

              {/* ── Left: main content ── */}
              <div className="featured-main">

                {/* Problem */}
                <div style={{ marginBottom: "2rem" }}>
                  <p className="label featured-section-label" style={{ marginBottom: "0.65rem" }}>
                    Problem
                  </p>
                  <p
                    className={`featured-problem-text${mobileProblemExpanded ? " is-expanded" : ""}`}
                    style={{
                      fontWeight: 300,
                      color: "var(--muted)",
                      lineHeight: 1.85,
                    }}
                  >
                    {cs.problem}
                  </p>
                  <button
                    type="button"
                    className="featured-mobile-toggle"
                    onClick={() => setMobileProblemExpanded((v) => !v)}
                    aria-expanded={mobileProblemExpanded}
                  >
                    {mobileProblemExpanded ? "Show less" : "Read full context"}
                  </button>
                </div>

                {/* Approach */}
                <div style={{ marginBottom: "2rem" }}>
                  <p className="label featured-section-label" style={{ marginBottom: "1rem" }}>
                    Approach
                  </p>
                  <div className="featured-approach-table">
                    {cs.approach.map((step, i) => (
                      <div
                        key={step.label}
                        className={`approach-row featured-approach-row${!mobileApproachExpanded && i >= 2 ? " approach-row-mobile-hidden" : ""}`}
                        style={{
                          display: "grid",
                          gridTemplateColumns: "110px 1fr",
                          gap: "1.25rem",
                          alignItems: "start",
                          padding: "0.95rem 1.4rem",
                          borderBottom: i < cs.approach.length - 1 ? "1px solid var(--border)" : "none",
                          background: i % 2 === 0 ? "transparent" : "color-mix(in srgb, var(--border) 25%, transparent)",
                        }}
                      >
                        <span className="featured-approach-label">{step.label}</span>
                        <span style={{ fontWeight: 300, color: "var(--muted)", lineHeight: 1.8 }}>
                          {step.text}
                        </span>
                      </div>
                    ))}
                  </div>
                  <button
                    type="button"
                    className="featured-mobile-toggle"
                    onClick={() => setMobileApproachExpanded((v) => !v)}
                    aria-expanded={mobileApproachExpanded}
                  >
                    {mobileApproachExpanded ? "Show fewer steps" : "See full approach"}
                  </button>
                </div>

                {/* Links */}
                <div style={{ display: "flex", gap: "0.65rem", flexWrap: "wrap", paddingTop: "0.25rem" }}>
                  <a
                    href={cs.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="action-button featured-link-btn"
                  >
                    GitHub
                    <span className="action-arrow action-arrow--up-right" aria-hidden="true">↗</span>
                  </a>
                  <a
                    href={cs.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="action-button action-button--solid featured-link-btn"
                  >
                    Live Demo
                    <span className="action-arrow action-arrow--up-right" aria-hidden="true">↗</span>
                  </a>
                </div>
              </div>

              {/* ── Right: stats sidebar ── */}
              <aside className="featured-sidebar">
                <p className="label" style={{ marginBottom: "1.1rem" }}>At a Glance</p>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.7rem" }}>
                  {cs.stats.map((stat) => (
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
      </div>

      <style>{`
        /* ── Card wrapper ── */
        .featured-card {
          border: 1px solid var(--border);
          border-top: 2px solid var(--foreground);
          border-radius: var(--r-card);
          overflow: hidden;
          background: var(--card);
        }

        /* ── Two-column grid ── */
        .featured-grid {
          display: grid;
          grid-template-columns: 1fr 230px;
        }

        /* ── Main content ── */
        .featured-main {
          padding: 2rem 2.5rem;
        }

        /* ── Section labels (accent) ── */
        .featured-section-label {
          color: var(--accent) !important;
          letter-spacing: 0.12em;
        }

        /* ── Approach table ── */
        .featured-approach-table {
          border: 1px solid var(--border);
          border-radius: var(--r-card);
          overflow: hidden;
        }
        .featured-approach-label {
          font-family: var(--font-mono), monospace;
          font-size: 0.7rem;
          font-weight: 500;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--foreground);
          padding-top: 0.1rem;
        }

        /* ── Mobile expand toggles ── */
        .featured-mobile-toggle {
          display: none;
          margin-top: 0.65rem;
          border: none;
          background: none;
          color: var(--accent);
          font-family: var(--font-mono), monospace;
          font-size: 0.72rem;
          font-weight: 500;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          padding: 0;
          cursor: pointer;
        }
        .featured-mobile-toggle:hover { opacity: 0.75; }

        /* ── Stat tiles ── */
        .featured-sidebar {
          padding: 2rem 1.75rem;
          border-left: 1px solid var(--border);
        }
        .stat-tile {
          border: 1px solid var(--border);
          border-radius: var(--r-card);
          padding: 0.85rem 1rem;
          background: color-mix(in srgb, var(--background) 50%, var(--card) 50%);
          transition: border-color 0.18s, background 0.18s;
          cursor: default;
        }
        .stat-tile:hover {
          border-color: color-mix(in srgb, var(--accent) 45%, var(--border));
          background: color-mix(in srgb, var(--accent) 4%, var(--card));
        }
        .stat-tile:hover .stat-value { color: var(--accent); }
        .stat-value {
          font-family: var(--font-display), Georgia, serif;
          font-size: 1.55rem;
          font-weight: 700;
          color: var(--foreground);
          letter-spacing: -0.04em;
          line-height: 1;
          transition: color 0.18s;
        }
        .stat-label {
          font-family: var(--font-mono), monospace;
          font-size: 0.65rem;
          font-weight: 400;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--muted);
          margin-top: 0.35rem;
        }

        /* ── Link buttons ── */
        .featured-link-btn { min-width: 9rem; }

        /* ── Tablet ── */
        @media (max-width: 860px) {
          .featured-grid { grid-template-columns: 1fr; }
          .featured-sidebar {
            border-left: none;
            border-top: 1px solid var(--border);
            padding: 1.75rem 2.5rem;
          }
        }

        /* ── Mobile ── */
        @media (max-width: 640px) {
          .featured-main { padding: 1.4rem 1rem !important; }
          .featured-sidebar { padding: 1.2rem 1rem !important; }
          .featured-mobile-toggle { display: inline-flex; align-items: center; }
          .featured-problem-text {
            display: -webkit-box;
            -webkit-line-clamp: 4;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
          .featured-problem-text.is-expanded {
            display: block;
            -webkit-line-clamp: unset;
          }
          .approach-row-mobile-hidden { display: none !important; }
        }
      `}</style>
    </section>
  );
}
