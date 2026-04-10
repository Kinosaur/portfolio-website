import { skills } from "@/data/skills";
import InView from "./InView";

const tierAccent: Record<string, string> = {
  proficient: "var(--accent)",
  learning: "#d97706",
  exploring: "var(--muted)",
};

export default function SkillsMatrix() {
  return (
    <section id="skills" className="section">
      <div className="container">
        <InView>
          <p className="label" style={{ marginBottom: "0.5rem" }}>
            Skills
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
            Technical Stack
          </h2>
        </InView>

        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          {skills.map((tier, i) => {
            const accent = tierAccent[tier.tier];
            return (
              <InView key={tier.tier} delay={i * 80}>
              <div
                style={{
                  border: "1px solid var(--border)",
                  borderRadius: "10px",
                  overflow: "hidden",
                }}
              >
                {/* Tier header */}
                <div
                  style={{
                    padding: "1.1rem 1.75rem",
                    borderBottom: "1px solid var(--border)",
                    background: "var(--card)",
                    display: "flex",
                    alignItems: "baseline",
                    gap: "1rem",
                    flexWrap: "wrap",
                  }}
                >
                  <span
                    style={{
                      fontWeight: 700,
                      fontSize: "0.9rem",
                      color: accent,
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                    }}
                  >
                    {tier.label}
                  </span>
                  <span
                    style={{
                      fontSize: "0.88rem",
                      color: "var(--muted)",
                    }}
                  >
                    {tier.description}
                  </span>
                </div>

                {/* Groups */}
                <div
                  style={{
                    padding: "1.4rem 1.75rem",
                    background: "var(--card)",
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                  }}
                >
                  {tier.groups.map((group) => (
                    <div
                      key={group.category}
                      style={{
                        display: "grid",
                        gridTemplateColumns: "160px 1fr",
                        gap: "1rem",
                        alignItems: "start",
                      }}
                      className="skill-row"
                    >
                      <span
                        style={{
                          fontSize: "0.85rem",
                          fontWeight: 600,
                          color: "var(--foreground)",
                          paddingTop: "0.1rem",
                        }}
                      >
                        {group.category}
                      </span>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                        {group.items.map((item) => (
                          <span
                            key={item}
                            className="skill-tag"
                            style={{
                              fontSize: "0.85rem",
                              padding: "0.25rem 0.65rem",
                              borderRadius: "4px",
                              border: "1px solid var(--border)",
                              color: "var(--muted)",
                            }}
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
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
