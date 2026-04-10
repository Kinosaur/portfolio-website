import { buildingItems, type BuildStatus } from "@/data/building";
import InView from "./InView";

const statusConfig: Record<BuildStatus, { label: string; color: string; bg: string; pulse: boolean }> = {
  in_progress: {
    label: "in progress",
    color: "#d97706",
    bg: "rgba(217, 119, 6, 0.1)",
    pulse: true,
  },
  planned: {
    label: "planned",
    color: "var(--muted)",
    bg: "rgba(139, 146, 165, 0.1)",
    pulse: false,
  },
};

export default function CurrentlyBuilding() {
  return (
    <section
      id="building"
      className="section"
      style={{ background: "var(--building-bg)" }}
    >
      <div className="container">
        <InView>
          <p className="label" style={{ marginBottom: "0.5rem" }}>
            Currently Building
          </p>
          <h2
            className="section-heading heading-reveal"
            style={{
              fontSize: "clamp(1.4rem, 3vw, 1.8rem)",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              marginBottom: "0.75rem",
              color: "var(--foreground)",
            }}
          >
            What&rsquo;s in Motion
          </h2>
          <p
            style={{
              fontSize: "0.95rem",
              color: "var(--muted)",
              marginBottom: "2.5rem",
              maxWidth: "560px",
              lineHeight: 1.75,
            }}
          >
            Work in progress and what&rsquo;s planned next. Updated regularly — if it&rsquo;s stale, something shipped.
          </p>
        </InView>

        <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
          {buildingItems.map((item, i) => {
            const status = statusConfig[item.status];
            return (
              <InView key={item.id} delay={i * 80}>
                <div
                  className="card-lift building-item"
                  style={{
                    border: "1px solid var(--border)",
                    borderRadius: "10px",
                    padding: "1.25rem 1.5rem",
                    background: "var(--card)",
                    display: "flex",
                    gap: "1rem",
                    alignItems: "flex-start",
                    cursor: "default",
                  }}
                >
                  {/* Arrow */}
                  <span
                    className="building-arrow"
                    style={{
                      color: "var(--accent)",
                      fontWeight: 700,
                      fontSize: "1.05rem",
                      marginTop: "0.05rem",
                      flexShrink: 0,
                    }}
                  >
                    →
                  </span>

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.6rem",
                        flexWrap: "wrap",
                        marginBottom: "0.45rem",
                      }}
                    >
                      <span
                        style={{
                          fontWeight: 600,
                          fontSize: "1rem",
                          color: "var(--foreground)",
                        }}
                      >
                        {item.title}
                      </span>

                      {/* Status pill */}
                      <span
                        style={{
                          fontSize: "0.68rem",
                          fontWeight: 700,
                          letterSpacing: "0.07em",
                          textTransform: "uppercase",
                          padding: "0.15rem 0.55rem",
                          borderRadius: "999px",
                          color: status.color,
                          background: status.bg,
                          display: "inline-flex",
                          alignItems: "center",
                        }}
                      >
                        {status.pulse && <span className="pulse-dot" />}
                        {status.label}
                      </span>
                    </div>

                    <p
                      style={{
                        fontSize: "0.95rem",
                        color: "var(--muted)",
                        lineHeight: 1.75,
                      }}
                    >
                      {item.description}
                    </p>

                    {item.repoUrl && (
                      <a
                        href={item.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: "inline-block",
                          marginTop: "0.5rem",
                          fontSize: "0.78rem",
                          color: "var(--accent)",
                          textDecoration: "none",
                        }}
                      >
                        View repo →
                      </a>
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
