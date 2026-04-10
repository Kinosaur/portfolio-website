"use client";

import { useEffect, useRef, useState } from "react";
import { projects } from "@/data/projects";
import InView from "./InView";

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
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              justifyContent: "space-between",
              marginBottom: "2.5rem",
              flexWrap: "wrap",
              gap: "0.5rem",
            }}
          >
            <h2
              className="section-heading heading-reveal"
              style={{
                fontSize: "clamp(1.4rem, 3vw, 1.8rem)",
                fontWeight: 700,
                letterSpacing: "-0.02em",
                color: "var(--foreground)",
              }}
            >
              Selected Work
            </h2>
            <span
              style={{ fontSize: "0.84rem", color: "var(--muted)", letterSpacing: "0.04em" }}
            >
              {projects.length} projects — hover or tap to read
            </span>
          </div>
        </InView>

        {/* List */}
        <div style={{ borderTop: "1px solid var(--border)" }}>
          {projects.map((project, i) => {
            const color = tagColors[project.tag] ?? "var(--accent)";
            const num = String(i + 1).padStart(2, "0");
            const isOpen = openProjectId === project.id;

            return (
              <InView key={project.id} delay={i * 55}>
                <div
                  className={`project-row${isOpen ? " is-open" : ""}`}
                  ref={(el) => {
                    rowRefs.current[project.id] = el;
                  }}
                >
                  {/* ── visible row ── */}
                  <button
                    type="button"
                    className="project-row-header project-row-toggle"
                    aria-expanded={isOpen}
                    aria-controls={`project-desc-${project.id}`}
                    onClick={() => toggleProject(project.id)}
                  >
                    {/* Number */}
                    <span className="project-num">{num}</span>

                    {/* Title block */}
                    <div className="project-title-block">
                      <span className="project-tag-badge" style={{ color, borderColor: `color-mix(in srgb, ${color} 30%, transparent)` }}>
                        {project.tag}
                      </span>
                      <div className="project-title-row">
                        <h3 className="project-title">{project.title}</h3>
                        <span className="project-title-arrow">↗</span>
                        <span className="project-mobile-toggle-indicator" aria-hidden="true">
                          {isOpen ? "−" : "+"}
                        </span>
                      </div>
                    </div>

                    {/* Stack — right side, desktop only */}
                    <div className="project-stack-row">
                      {project.stack.slice(0, 3).map((tech) => (
                        <span key={tech} className="project-stack-chip">{tech}</span>
                      ))}
                      {project.stack.length > 3 && (
                        <span className="project-stack-chip">+{project.stack.length - 3}</span>
                      )}
                    </div>
                  </button>

                  {/* ── expanded description (hover reveals) ── */}
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
                    {/* All stack chips visible in expanded state */}
                    <div className="project-stack-expanded">
                      {project.stack.map((tech) => (
                        <span key={tech} className="skill-tag project-stack-chip">{tech}</span>
                      ))}
                    </div>
                    <button
                      type="button"
                      className="project-mobile-close"
                      onClick={() => setOpenProjectId(null)}
                    >
                      Close details
                    </button>
                  </div>
                </div>
              </InView>
            );
          })}
        </div>
      </div>

      <style>{`
        /* ── Row layout ── */
        .project-row {
          border-bottom: 1px solid var(--border);
          cursor: default;
          overflow: clip;
          display: grid;
          grid-template-rows: auto 0fr;
          transition: background 0.2s ease, grid-template-rows 0.34s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .project-row:hover {
          background: color-mix(in srgb, var(--card) 60%, var(--background) 40%);
          grid-template-rows: auto 1fr;
        }
        .project-row:focus-within {
          background: color-mix(in srgb, var(--card) 60%, var(--background) 40%);
          grid-template-rows: auto 1fr;
        }
        .project-row.is-open {
          background: color-mix(in srgb, var(--card) 60%, var(--background) 40%);
          grid-template-rows: auto 1fr;
        }
        .project-row-toggle {
          appearance: none;
          border: 0;
          background: transparent;
          color: inherit;
          cursor: pointer;
          font: inherit;
          margin: 0;
          padding: 1.4rem 0.5rem 1.4rem 0;
          text-align: left;
          width: 100%;
        }
        .project-row-header {
          display: grid;
          grid-template-columns: 3rem 1fr 210px;
          align-items: center;
          gap: 1.5rem;
        }

        /* Number */
        .project-num {
          font-size: 0.8rem;
          font-weight: 700;
          color: var(--border);
          letter-spacing: 0.04em;
          font-variant-numeric: tabular-nums;
          transition: color 0.18s;
          flex-shrink: 0;
        }
        .project-row:hover .project-num {
          color: var(--muted);
        }
        .project-row:focus-within .project-num {
          color: var(--muted);
        }

        /* Title block */
        .project-title-block {
          display: flex;
          flex-direction: column;
          gap: 0.3rem;
          min-width: 0;
        }
        .project-title-row {
          display: flex;
          align-items: center;
          gap: 0.45rem;
          min-width: 0;
        }
        .project-tag-badge {
          font-size: 0.67rem;
          font-weight: 700;
          letter-spacing: 0.09em;
          text-transform: uppercase;
          border: 1px solid;
          border-radius: 3px;
          padding: 0.1rem 0.45rem;
          display: inline-block;
          width: fit-content;
        }
        .project-title {
          font-size: 1.15rem;
          font-weight: 600;
          color: var(--foreground);
          letter-spacing: -0.02em;
          line-height: 1.3;
          flex: 1;
        }
        .project-title-arrow {
          color: var(--muted);
          font-size: 0.95rem;
          transition: transform 0.18s ease, color 0.18s ease;
          flex-shrink: 0;
        }
        .project-mobile-toggle-indicator {
          display: none;
          width: 1.4rem;
          text-align: center;
          color: var(--muted);
          font-size: 1.05rem;
          line-height: 1;
          flex-shrink: 0;
          transform: translateY(-1px);
        }
        .project-row:hover .project-title-arrow,
        .project-row:focus-within .project-title-arrow {
          transform: translate(2px, -2px);
          color: var(--foreground);
        }
        .project-row.is-open .project-title-arrow {
          transform: translate(2px, -2px);
          color: var(--foreground);
        }
        .project-row:hover .project-tag-badge,
        .project-row:focus-within .project-tag-badge {
          background: color-mix(in srgb, var(--card) 84%, var(--background) 16%);
        }
        .project-row.is-open .project-tag-badge {
          background: color-mix(in srgb, var(--card) 84%, var(--background) 16%);
        }

        /* Stack chips — desktop right column */
        .project-stack-row {
          display: flex;
          gap: 0.35rem;
          flex-wrap: wrap;
          justify-content: flex-end;
          align-items: center;
        }
        .project-stack-chip {
          font-size: 0.72rem;
          padding: 0.2rem 0.5rem;
          border: 1px solid var(--border);
          border-radius: 3px;
          color: var(--muted);
          white-space: nowrap;
        }

        /* Description expand */
        .project-desc {
          min-height: 0;
          overflow: hidden;
          opacity: 0;
          transform: translateY(-6px);
          will-change: opacity, transform;
          transition: opacity 0.24s ease, transform 0.24s ease, padding 0.24s ease;
          padding-left: calc(3rem + 1.5rem);
        }
        .project-row:hover .project-desc {
          opacity: 1;
          transform: translateY(0);
          transition-delay: 45ms;
        }
        .project-row:focus-within .project-desc {
          opacity: 1;
          transform: translateY(0);
          transition-delay: 0s;
        }
        .project-row.is-open .project-desc {
          opacity: 1;
          transform: translateY(0);
          transition-delay: 0s;
        }
        .project-desc-text {
          font-size: 1.02rem;
          color: color-mix(in srgb, var(--foreground) 72%, var(--muted));
          line-height: 1.82;
          padding-bottom: 0.75rem;
          max-width: 640px;
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
          font-size: 0.88rem;
          font-weight: 500;
          text-decoration: none;
          transition: color 0.18s, opacity 0.18s;
        }
        .project-link:hover,
        .project-link:focus-visible {
          opacity: 0.78;
        }
        .project-link-arrow {
          display: inline-block;
          transition: transform 0.18s ease;
        }
        .project-link:hover .project-link-arrow,
        .project-link:focus-visible .project-link-arrow {
          transform: translate(2px, -2px);
        }
        .project-stack-expanded {
          display: flex;
          flex-wrap: wrap;
          gap: 0.35rem;
          padding-bottom: 1.25rem;
        }
        .project-mobile-close {
          display: none;
        }

        /* Mobile — tap to reveal description, hide right stack column */
        @media (max-width: 700px) {
          .project-stack-row { display: none; }
          .project-row-header { grid-template-columns: 2.5rem 1fr; }
          .project-row { scroll-margin-top: 5rem; }
          .project-row-toggle {
            padding: 1.1rem 0.4rem 1.1rem 0;
            touch-action: manipulation;
          }
          .project-title-arrow { display: none; }
          .project-mobile-toggle-indicator { display: inline-block; }
          .project-row.is-open .project-mobile-toggle-indicator { color: var(--foreground); }
          .project-row { grid-template-rows: auto 0fr !important; }
          .project-desc {
            opacity: 0 !important;
            transform: translateY(-8px) !important;
            padding-bottom: 0;
            padding-left: calc(2.5rem + 1.5rem);
          }
          .project-row.is-open { grid-template-rows: auto 1fr !important; }
          .project-row.is-open .project-desc {
            opacity: 1 !important;
            transform: translateY(0) !important;
            padding-bottom: 0.95rem;
          }
          .project-mobile-close {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            border: 1px solid var(--border);
            background: color-mix(in srgb, var(--card) 88%, transparent);
            color: var(--foreground);
            border-radius: 8px;
            padding: 0.45rem 0.75rem;
            font-size: 0.8rem;
            font-weight: 600;
            margin-top: 0.25rem;
          }
          .project-desc-text { padding-top: 0.3rem; }
          .project-stack-expanded { display: flex; }
        }

        /* Touch devices — tap to reveal */
        @media (hover: none) {
          .project-row { grid-template-rows: auto 0fr !important; }
          .project-desc { opacity: 0 !important; transform: translateY(-8px) !important; padding-bottom: 0; }
          .project-row.is-open { grid-template-rows: auto 1fr !important; }
          .project-row.is-open .project-desc { opacity: 1 !important; transform: translateY(0) !important; padding-bottom: 0.95rem; }
          .project-stack-expanded { display: flex; }
        }
      `}</style>
    </section>
  );
}
