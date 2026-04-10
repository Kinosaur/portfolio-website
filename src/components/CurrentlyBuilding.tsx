import { buildingItems, type BuildStatus } from "@/data/building";

const statusConfig: Record<BuildStatus, { label: string; color: string; bg: string }> = {
  in_progress: {
    label: "in progress",
    color: "#d97706",
    bg: "rgba(217, 119, 6, 0.1)",
  },
  planned: {
    label: "planned",
    color: "var(--muted)",
    bg: "rgba(139, 146, 165, 0.1)",
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
        <p className="label" style={{ marginBottom: "0.5rem" }}>
          Currently Building
        </p>
        <h2
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
            fontSize: "0.88rem",
            color: "var(--muted)",
            marginBottom: "2.5rem",
            maxWidth: "520px",
            lineHeight: 1.65,
          }}
        >
          Work in progress and what&rsquo;s planned next. Updated regularly — if it&rsquo;s stale, something shipped.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {buildingItems.map((item) => {
            const status = statusConfig[item.status];
            return (
              <div
                key={item.id}
                style={{
                  border: "1px solid var(--border)",
                  borderRadius: "10px",
                  padding: "1.25rem 1.5rem",
                  background: "var(--card)",
                  display: "flex",
                  gap: "1rem",
                  alignItems: "flex-start",
                }}
              >
                {/* Arrow */}
                <span
                  style={{
                    color: "var(--accent)",
                    fontWeight: 600,
                    fontSize: "1rem",
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
                      marginBottom: "0.4rem",
                    }}
                  >
                    <span
                      style={{
                        fontWeight: 600,
                        fontSize: "0.92rem",
                        color: "var(--foreground)",
                      }}
                    >
                      {item.title}
                    </span>

                    {/* Status pill */}
                    <span
                      style={{
                        fontSize: "0.65rem",
                        fontWeight: 600,
                        letterSpacing: "0.06em",
                        textTransform: "uppercase",
                        padding: "0.15rem 0.5rem",
                        borderRadius: "999px",
                        color: status.color,
                        background: status.bg,
                      }}
                    >
                      {status.label}
                    </span>
                  </div>

                  <p
                    style={{
                      fontSize: "0.85rem",
                      color: "var(--muted)",
                      lineHeight: 1.65,
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
            );
          })}
        </div>
      </div>
    </section>
  );
}
