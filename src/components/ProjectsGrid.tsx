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
          <p className="label" style={{ marginBottom: "0.5rem" }}>
            Projects
          </p>
          <h2
            className="section-heading"
            style={{
              fontSize: "clamp(1.4rem, 3vw, 1.8rem)",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              marginBottom: "2.5rem",
              color: "var(--foreground)",
            }}
          >
            Selected Work
          </h2>
        </InView>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "1rem",
          }}
        >
          {projects.map((project, i) => {
            const tagColor = tagColors[project.tag] ?? "var(--accent)";
            return (
              <InView key={project.id} delay={i * 60}>
                <div
                  className="card-lift"
                  style={{
                    background: "var(--card)",
                    border: "1px solid var(--border)",
                    borderRadius: "10px",
                    padding: "1.5rem 1.5rem 1.5rem 1.75rem",
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.75rem",
                    height: "100%",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  {/* Left accent bar */}
                  <div
                    style={{
                      position: "absolute",
                      top: "1rem",
                      left: 0,
                      bottom: "1rem",
                      width: "3px",
                      background: tagColor,
                      borderRadius: "0 2px 2px 0",
                      opacity: 0.7,
                    }}
                  />

                  {/* Tag */}
                  <span
                    style={{
                      fontSize: "0.65rem",
                      fontWeight: 700,
                      letterSpacing: "0.09em",
                      textTransform: "uppercase",
                      color: tagColor,
                    }}
                  >
                    {project.tag}
                  </span>

                  {/* Title */}
                  <h3
                    style={{
                      fontSize: "1rem",
                      fontWeight: 600,
                      color: "var(--foreground)",
                      letterSpacing: "-0.01em",
                      lineHeight: 1.3,
                    }}
                  >
                    {project.title}
                  </h3>

                  {/* Subtitle */}
                  <p
                    style={{
                      fontSize: "0.82rem",
                      color: tagColor,
                      fontWeight: 500,
                      opacity: 0.9,
                    }}
                  >
                    ↳ {project.subtitle}
                  </p>

                  {/* Description */}
                  <p
                    style={{
                      fontSize: "0.85rem",
                      color: "var(--muted)",
                      lineHeight: 1.68,
                      flexGrow: 1,
                    }}
                  >
                    {project.description}
                  </p>

                  {/* Stack */}
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem" }}>
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="skill-tag"
                        style={{
                          fontSize: "0.68rem",
                          padding: "0.18rem 0.5rem",
                          border: "1px solid var(--border)",
                          borderRadius: "4px",
                          color: "var(--muted)",
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div style={{ display: "flex", gap: "0.9rem", paddingTop: "0.15rem", borderTop: "1px solid var(--border)" }}>
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={linkStyle}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = "var(--foreground)";
                        e.currentTarget.style.borderColor = "var(--foreground)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = "var(--muted)";
                        e.currentTarget.style.borderColor = "var(--border)";
                      }}
                    >
                      GitHub ↗
                    </a>
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ ...linkStyle, color: tagColor, borderColor: "transparent" }}
                        onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.75")}
                        onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                      >
                        {project.liveLabel ?? "Live"} ↗
                      </a>
                    )}
                    {!project.liveUrl && project.liveLabel && (
                      <span style={{ ...linkStyle, opacity: 0.3, cursor: "default", borderColor: "transparent" }}>
                        {project.liveLabel}
                      </span>
                    )}
                  </div>
                </div>
              </InView>
            );
          })}
        </div>
      </div>
    </section>
  );
}

const linkStyle: React.CSSProperties = {
  fontSize: "0.78rem",
  color: "var(--muted)",
  textDecoration: "none",
  paddingTop: "0.6rem",
  borderBottom: "1px solid var(--border)",
  transition: "color 0.15s, border-color 0.15s, opacity 0.15s",
  display: "inline-block",
};
