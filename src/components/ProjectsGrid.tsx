"use client";

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
              className="section-heading"
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
              style={{ fontSize: "0.78rem", color: "var(--muted)", letterSpacing: "0.05em" }}
            >
              {projects.length} projects — hover to read
            </span>
          </div>
        </InView>

        {/* List */}
        <div style={{ borderTop: "1px solid var(--border)" }}>
          {projects.map((project, i) => {
            const color = tagColors[project.tag] ?? "var(--accent)";
            const num = String(i + 1).padStart(2, "0");

            return (
              <InView key={project.id} delay={i * 55}>
                <div className="project-row">
                  {/* ── visible row ── */}
                  <div className="project-row-header">
                    {/* Number */}
                    <span className="project-num">{num}</span>

                    {/* Title block */}
                    <div className="project-title-block">
                      <span className="project-tag-badge" style={{ color, borderColor: `color-mix(in srgb, ${color} 30%, transparent)` }}>
                        {project.tag}
                      </span>
                      <h3 className="project-title">{project.title}</h3>
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
                  </div>

                  {/* ── expanded description (hover reveals) ── */}
                  <div className="project-desc">
                    <p className="project-desc-text">{project.description}</p>
                    <div className="project-links">
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-link"
                        style={{ color: "var(--muted)" }}
                      >
                        GitHub ↗
                      </a>
                      {project.liveUrl ? (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="project-link"
                          style={{ color }}
                        >
                          {project.liveLabel ?? "Live"} ↗
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
          transition: background 0.18s;
        }
        .project-row:hover {
          background: color-mix(in srgb, var(--card) 60%, var(--background) 40%);
        }
        .project-row-header {
          display: grid;
          grid-template-columns: 3rem 1fr 210px;
          align-items: center;
          gap: 1.5rem;
          padding: 1.4rem 0.5rem 1.4rem 0;
          transition: padding 0.18s;
        }
        .project-row:hover .project-row-header {
          padding-left: 0.3rem;
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

        /* Title block */
        .project-title-block {
          display: flex;
          flex-direction: column;
          gap: 0.3rem;
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
          transition: letter-spacing 0.18s;
        }
        .project-row:hover .project-title {
          letter-spacing: -0.01em;
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
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.35s cubic-bezier(0.4, 0, 0.2, 1);
          padding-left: calc(3rem + 1.5rem);
        }
        .project-row:hover .project-desc {
          max-height: 260px;
        }
        .project-desc-text {
          font-size: 0.95rem;
          color: var(--muted);
          line-height: 1.75;
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
          font-size: 0.88rem;
          font-weight: 500;
          text-decoration: none;
          transition: opacity 0.15s;
        }
        .project-link:hover { opacity: 0.7; }
        .project-stack-expanded {
          display: flex;
          flex-wrap: wrap;
          gap: 0.35rem;
          padding-bottom: 1.25rem;
        }

        /* Mobile — always show description, hide right stack column */
        @media (max-width: 700px) {
          .project-stack-row { display: none; }
          .project-row-header { grid-template-columns: 2.5rem 1fr; }
          .project-desc { max-height: none !important; padding-bottom: 1rem; }
          .project-desc-text { padding-top: 0.3rem; }
          .project-stack-expanded { display: flex; }
        }

        /* Touch devices — also always show */
        @media (hover: none) {
          .project-desc { max-height: none !important; padding-bottom: 1rem; }
          .project-stack-expanded { display: flex; }
        }
      `}</style>
    </section>
  );
}
