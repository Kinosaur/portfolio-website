"use client";

import { useEffect, useRef, useState } from "react";
import { projects } from "@/data/projects";
import InView from "./InView";

// Tag colors — display concern, lives here
const tagColors: Record<string, string> = {
  "CIVIC TECH":        "#10b981",
  "DATA VIZ":          "#8b5cf6",
  "CS FUNDAMENTALS":   "#f59e0b",
  "DATA QUALITY":      "#3b82f6",
  "UNSTRUCTURED DATA": "#ec4899",
};

export default function ProjectsGrid() {
  const [openProjectId, setOpenProjectId] = useState<string | null>(null);
  const rowRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const toggleProject = (projectId: string) => {
    setOpenProjectId((current) => (current === projectId ? null : projectId));
  };

  useEffect(() => {
    if (!openProjectId) return;
    if (typeof window === "undefined") return;

    const isMobileContext = window.matchMedia("(max-width: 700px), (hover: none)").matches;
    if (!isMobileContext) return;

    const row = rowRefs.current[openProjectId];
    if (!row) return;

    const timer = window.setTimeout(() => {
      const top = row.getBoundingClientRect().top + window.scrollY - 92;
      window.scrollTo({ top, behavior: "smooth" });
    }, 120);

    return () => window.clearTimeout(timer);
  }, [openProjectId]);

  return (
    <section id="projects" className="section">
      <div className="container">
        <InView>
          <div className="section-eyebrow">
            <span className="section-num">02</span>
            <span className="section-rule-line" />
          </div>
          <div style={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
            marginBottom: "2.5rem",
            flexWrap: "wrap",
            gap: "0.5rem",
          }}>
            <h2
              className="section-heading heading-reveal"
              style={{
                fontSize: "clamp(1.5rem, 3vw, 2rem)",
                letterSpacing: "-0.02em",
                color: "var(--foreground)",
              }}
            >
              Selected Work
            </h2>
            <span style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.68rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--muted)",
            }}>
              {projects.length} projects
            </span>
          </div>
        </InView>

        {/* Project list */}
        <div style={{ borderTop: "1px solid var(--border)" }}>
          {projects.map((project, i) => {
            const color = tagColors[project.tag] ?? "var(--accent)";
            const num   = String(i + 1).padStart(2, "0");
            const isOpen = openProjectId === project.id;

            return (
              <InView key={project.id} delay={i * 55} animation="slide-left">
                <div
                  className={`project-row${isOpen ? " is-open" : ""}`}
                  ref={(el) => { rowRefs.current[project.id] = el; }}
                >
                  {/* ── Row header (clickable) ── */}
                  <button
                    type="button"
                    className="project-row-header project-row-toggle"
                    aria-expanded={isOpen}
                    aria-controls={`project-desc-${project.id}`}
                    onClick={() => toggleProject(project.id)}
                  >
                    {/* Number (JetBrains Mono) */}
                    <span className="project-num">{num}</span>

                    {/* Title block */}
                    <div className="project-title-block">
                      <span
                        className="project-tag-badge"
                        style={{
                          color,
                          borderColor: `color-mix(in srgb, ${color} 28%, var(--border))`,
                        }}
                      >
                        {project.tag}
                      </span>
                      <div className="project-title-row">
                        <h3 className="project-title">{project.title}</h3>
                        <span className="project-title-arrow" aria-hidden="true">↗</span>
                        <span className="project-mobile-toggle-indicator" aria-hidden="true">
                          {isOpen ? "−" : "+"}
                        </span>
                      </div>
                    </div>

                    {/* Stack chips — desktop only */}
                    <div className="project-stack-row">
                      {project.stack.slice(0, 3).map((tech) => (
                        <span key={tech} className="project-stack-chip skill-tag">{tech}</span>
                      ))}
                      {project.stack.length > 3 && (
                        <span className="project-stack-chip skill-tag">
                          +{project.stack.length - 3}
                        </span>
                      )}
                    </div>
                  </button>

                  {/* ── Expanded description ── */}
                  <div id={`project-desc-${project.id}`} className="project-desc">
                    <p className="project-desc-text">{project.description}</p>
                    <div className="project-links">
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-link"
                        style={{ color: "var(--muted)" }}
                      >
                        GitHub
                        <span className="project-link-arrow" aria-hidden="true">↗</span>
                      </a>
                      {project.liveUrl ? (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="project-link"
                          style={{ color }}
                        >
                          {project.liveLabel ?? "Live"}
                          <span className="project-link-arrow" aria-hidden="true">↗</span>
                        </a>
                      ) : project.liveLabel ? (
                        <span className="project-link" style={{ opacity: 0.35, cursor: "default", color: "var(--muted)" }}>
                          {project.liveLabel}
                        </span>
                      ) : null}
                    </div>
                    <div className="project-stack-expanded">
                      {project.stack.map((tech) => (
                        <span key={tech} className="skill-tag project-stack-chip"
                          style={{ padding: "0.22rem 0.55rem", border: "1px solid var(--border)", borderRadius: "var(--r-tag)", color: "var(--muted)" }}>
                          {tech}
                        </span>
                      ))}
                    </div>
                    <button
                      type="button"
                      className="project-mobile-close"
                      onClick={() => setOpenProjectId(null)}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </InView>
            );
          })}
        </div>
      </div>

      <style>{`
        /* ── Row layout: grid-template-rows for smooth expand ── */
        .project-row {
          border-bottom: 1px solid var(--border);
          cursor: default;
          overflow: clip;
          display: grid;
          grid-template-rows: auto 0fr;
          transition: background 0.2s ease, grid-template-rows 0.34s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .project-row:hover,
        .project-row:focus-within,
        .project-row.is-open {
          background: color-mix(in srgb, var(--card) 60%, var(--background) 40%);
          grid-template-rows: auto 1fr;
        }

        /* ── Toggle button ── */
        .project-row-toggle {
          appearance: none;
          border: 0;
          background: transparent;
          color: inherit;
          cursor: pointer;
          font: inherit;
          margin: 0;
          padding: 1.35rem 0.5rem 1.35rem 0;
          text-align: left;
          width: 100%;
        }
        .project-row-header {
          display: grid;
          grid-template-columns: 2.75rem 1fr 200px;
          align-items: center;
          gap: 1.5rem;
        }

        /* ── Number (JetBrains Mono) ── */
        .project-num {
          font-family: var(--font-mono), monospace;
          font-size: 0.8rem;
          font-weight: 500;
          color: var(--border);
          letter-spacing: 0.05em;
          font-variant-numeric: tabular-nums;
          transition: color 0.18s;
          flex-shrink: 0;
        }
        .project-row:hover .project-num,
        .project-row:focus-within .project-num { color: var(--muted); }

        /* ── Title block ── */
        .project-title-block {
          display: flex;
          flex-direction: column;
          gap: 0.28rem;
          min-width: 0;
        }
        .project-title-row {
          display: flex;
          align-items: center;
          gap: 0.45rem;
          min-width: 0;
        }

        /* ── Tag badge (JetBrains Mono) ── */
        .project-tag-badge {
          font-family: var(--font-mono), monospace;
          font-size: 0.62rem;
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          border: 1px solid;
          border-radius: var(--r-tag);
          padding: 0.08rem 0.4rem;
          display: inline-block;
          width: fit-content;
        }

        /* ── Title (Source Serif 4) ── */
        .project-title {
          font-family: var(--font-body), Georgia, serif;
          font-size: 1.1rem;
          font-weight: 600;
          color: var(--foreground);
          letter-spacing: -0.01em;
          line-height: 1.3;
          flex: 1;
        }
        .project-title-arrow {
          color: var(--muted);
          font-size: 0.9rem;
          transition: transform 0.18s ease, color 0.18s;
          flex-shrink: 0;
        }
        .project-mobile-toggle-indicator {
          display: none;
          width: 1.4rem;
          text-align: center;
          color: var(--muted);
          font-family: var(--font-mono), monospace;
          font-size: 1rem;
          flex-shrink: 0;
        }
        .project-row:hover .project-title-arrow,
        .project-row:focus-within .project-title-arrow,
        .project-row.is-open .project-title-arrow {
          transform: translate(2px, -2px);
          color: var(--foreground);
        }

        /* ── Stack chips — desktop right column ── */
        .project-stack-row {
          display: flex;
          gap: 0.3rem;
          flex-wrap: wrap;
          justify-content: flex-end;
          align-items: center;
        }
        .project-stack-chip {
          font-size: 0.66rem;
          padding: 0.18rem 0.45rem;
          border: 1px solid var(--border);
          border-radius: var(--r-tag);
          color: var(--muted);
          white-space: nowrap;
        }

        /* ── Expanded description ── */
        .project-desc {
          min-height: 0;
          overflow: hidden;
          opacity: 0;
          transform: translateY(-6px);
          will-change: opacity, transform;
          transition: opacity 0.24s ease, transform 0.24s ease;
          padding-left: calc(2.75rem + 1.5rem);
        }
        .project-row:hover .project-desc,
        .project-row:focus-within .project-desc { opacity: 1; transform: translateY(0); transition-delay: 45ms; }
        .project-row.is-open .project-desc { opacity: 1; transform: translateY(0); }

        .project-desc-text {
          font-weight: 300;
          color: var(--muted);
          line-height: 1.82;
          padding-bottom: 0.75rem;
          max-width: 620px;
        }
        .project-links {
          display: flex;
          gap: 1.5rem;
          padding-bottom: 0.6rem;
          align-items: center;
        }
        .project-link {
          display: inline-flex;
          align-items: center;
          gap: 0.25rem;
          font-family: var(--font-mono), monospace;
          font-size: 0.72rem;
          font-weight: 500;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          text-decoration: none;
          transition: opacity 0.18s;
        }
        .project-link:hover,
        .project-link:focus-visible { opacity: 0.72; }
        .project-link-arrow {
          display: inline-block;
          transition: transform 0.18s ease;
        }
        .project-link:hover .project-link-arrow { transform: translate(2px, -2px); }
        .project-stack-expanded { display: flex; flex-wrap: wrap; gap: 0.3rem; padding-bottom: 1.25rem; }
        .project-mobile-close { display: none; }

        /* ── Mobile ── */
        @media (max-width: 700px) {
          .project-stack-row { display: none; }
          .project-row-header { grid-template-columns: 2.5rem 1fr; }
          .project-row { scroll-margin-top: 5rem; }
          .project-row-toggle { padding: 1.1rem 0.4rem 1.1rem 0; touch-action: manipulation; }
          .project-title-arrow { display: none; }
          .project-mobile-toggle-indicator { display: inline-block; }
          .project-row.is-open .project-mobile-toggle-indicator { color: var(--foreground); }
          .project-row { grid-template-rows: auto 0fr !important; }
          .project-desc { opacity: 0 !important; transform: translateY(-8px) !important; padding-bottom: 0; padding-left: calc(2.5rem + 1.5rem); }
          .project-row.is-open { grid-template-rows: auto 1fr !important; }
          .project-row.is-open .project-desc { opacity: 1 !important; transform: translateY(0) !important; padding-bottom: 0.95rem; }
          .project-mobile-close {
            display: inline-flex;
            align-items: center;
            border: 1px solid var(--border);
            border-radius: var(--r-btn);
            background: var(--card);
            color: var(--foreground);
            padding: 0.4rem 0.7rem;
            font-family: var(--font-mono), monospace;
            font-size: 0.68rem;
            font-weight: 500;
            letter-spacing: 0.08em;
            text-transform: uppercase;
            margin-top: 0.25rem;
            cursor: pointer;
          }
          .project-desc-text { padding-top: 0.3rem; }
          .project-stack-expanded { display: flex; }
        }

        @media (hover: none) {
          .project-row { grid-template-rows: auto 0fr !important; }
          .project-desc { opacity: 0 !important; transform: translateY(-8px) !important; padding-bottom: 0; }
          .project-row.is-open { grid-template-rows: auto 1fr !important; }
          .project-row.is-open .project-desc { opacity: 1 !important; transform: translateY(0) !important; padding-bottom: 0.95rem; }
        }
      `}</style>
    </section>
  );
}
