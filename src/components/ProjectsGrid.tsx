"use client";

import { projects } from "@/data/projects";

export default function ProjectsGrid() {
  return (
    <section id="projects" className="section">
      <div className="container">
        <p className="label" style={{ marginBottom: "0.5rem" }}>
          Projects
        </p>
        <h2
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

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "1px",
            border: "1px solid var(--border)",
            borderRadius: "12px",
            overflow: "hidden",
          }}
        >
          {projects.map((project) => (
            <div
              key={project.id}
              style={{
                background: "var(--card)",
                padding: "1.75rem",
                display: "flex",
                flexDirection: "column",
                gap: "0.75rem",
                transition: "background 0.15s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background =
                  "color-mix(in srgb, var(--card) 80%, var(--accent) 5%)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "var(--card)")
              }
            >
              {/* Tag */}
              <span className="label">{project.tag}</span>

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
                  color: "var(--accent)",
                  fontWeight: 500,
                }}
              >
                ↳ {project.subtitle}
              </p>

              {/* Description */}
              <p
                style={{
                  fontSize: "0.85rem",
                  color: "var(--muted)",
                  lineHeight: 1.65,
                  flexGrow: 1,
                }}
              >
                {project.description}
              </p>

              {/* Stack */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    style={{
                      fontSize: "0.7rem",
                      padding: "0.2rem 0.5rem",
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
              <div style={{ display: "flex", gap: "0.75rem", paddingTop: "0.25rem" }}>
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={linkStyle}
                >
                  GitHub
                </a>
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={linkStyle}
                  >
                    {project.liveLabel ?? "Live"}
                  </a>
                )}
                {!project.liveUrl && project.liveLabel && (
                  <span style={{ ...linkStyle, opacity: 0.4, cursor: "default" }}>
                    {project.liveLabel}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const linkStyle: React.CSSProperties = {
  fontSize: "0.78rem",
  color: "var(--muted)",
  textDecoration: "none",
  padding: "0.25rem 0",
  borderBottom: "1px solid var(--border)",
  transition: "color 0.15s, border-color 0.15s",
};
