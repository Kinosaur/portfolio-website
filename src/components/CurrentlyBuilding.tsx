import { buildingItems, type BuildStatus } from "@/data/building";
import InView from "./InView";

const statusConfig: Record<BuildStatus, { label: string; dotColor: string; pulse: boolean }> = {
  in_progress: { label: "in progress", dotColor: "#d97706", pulse: true  },
  planned:     { label: "planned",     dotColor: "var(--muted)", pulse: false },
};

export default function CurrentlyBuilding() {
  return (
    <section id="building" className="section" style={{ background: "var(--building-bg)" }}>
      <div className="container">
        <InView>
          <div className="section-eyebrow">
            <span className="section-num">04</span>
            <span className="section-rule-line" />
          </div>
          <p className="label" style={{ marginBottom: "0.6rem" }}>Currently Building</p>
          <h2
            className="section-heading heading-reveal"
            style={{
              fontSize: "clamp(1.5rem, 3vw, 2rem)",
              letterSpacing: "-0.022em",
              marginBottom: "0.75rem",
              color: "var(--foreground)",
            }}
          >
            What&rsquo;s in Motion
          </h2>
          <p style={{
            fontWeight: 300,
            color: "var(--muted)",
            marginBottom: "2.5rem",
            maxWidth: "520px",
            lineHeight: 1.78,
          }}>
            Work in progress and what&rsquo;s planned next. Updated regularly — if it&rsquo;s stale, something shipped.
          </p>
        </InView>

        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {buildingItems.map((item, i) => {
            const status = statusConfig[item.status];
            return (
              <InView key={item.id} delay={i * 80} animation="slide-left">
                <div className="building-item card-lift building-card">
                  {/* Arrow */}
                  <span className="building-arrow" aria-hidden="true"
                    style={{ color: "var(--accent)", fontWeight: 700, fontSize: "1rem", flexShrink: 0 }}>
                    →
                  </span>

                  <div style={{ flex: 1, minWidth: 0 }}>
                    {/* Title + inline status */}
                    <div style={{ display: "flex", alignItems: "center", gap: "0.65rem", flexWrap: "wrap", marginBottom: "0.4rem" }}>
                      <span style={{ fontWeight: 600, fontSize: "1rem", color: "var(--foreground)" }}>
                        {item.title}
                      </span>
                      <span className="building-status">
                        {status.pulse && (
                          <span
                            className="pulse-dot"
                            style={{ background: status.dotColor }}
                            aria-hidden="true"
                          />
                        )}
                        <span style={{ color: status.dotColor }}>
                          {status.label}
                        </span>
                      </span>
                    </div>

                    {/* Description (Source Serif 4) */}
                    <p style={{ fontWeight: 300, color: "var(--muted)", lineHeight: 1.78 }}>
                      {item.description}
                    </p>

                    {/* Repo link */}
                    {item.repoUrl && (
                      <a
                        href={item.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="building-repo-link"
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

      <style>{`
        .building-card {
          border: 1px solid var(--border);
          border-radius: var(--r-card);
          padding: 1.25rem 1.5rem;
          background: var(--card);
          display: flex;
          gap: 1rem;
          align-items: flex-start;
          cursor: default;
        }
        /* Status: mono text inline, no pill background */
        .building-status {
          display: inline-flex;
          align-items: center;
          font-family: var(--font-mono), monospace;
          font-size: 0.65rem;
          font-weight: 500;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }
        .building-repo-link {
          display: inline-flex;
          align-items: center;
          margin-top: 0.55rem;
          font-family: var(--font-mono), monospace;
          font-size: 0.68rem;
          font-weight: 500;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--accent);
          text-decoration: none;
          transition: opacity 0.15s;
        }
        .building-repo-link:hover { opacity: 0.75; }
      `}</style>
    </section>
  );
}
