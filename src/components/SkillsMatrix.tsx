import { skills } from "@/data/skills";
import InView from "./InView";

const tierAccent: Record<string, string> = {
  proficient: "var(--accent)",
  learning:   "#d97706",
  exploring:  "var(--muted)",
};

export default function SkillsMatrix() {
  return (
    <section id="skills" className="section">
      <div className="container">
        <InView>
          <p className="label" style={{ marginBottom: "0.6rem" }}>Skills</p>
          <h2
            className="section-heading heading-reveal"
            style={{
              fontSize: "clamp(1.5rem, 3vw, 2rem)",
              letterSpacing: "-0.022em",
              marginBottom: "2.5rem",
              color: "var(--foreground)",
            }}
          >
            Technical Stack
          </h2>
        </InView>

        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {skills.map((tier, i) => {
            const accent = tierAccent[tier.tier];
            return (
              <InView key={tier.tier} delay={i * 80}>
                <div className="skills-tier-card">
                  {/* Tier header */}
                  <div className="skills-tier-header">
                    <span className="skills-tier-label" style={{ color: accent }}>
                      {tier.label}
                    </span>
                    <span style={{ fontWeight: 300, color: "var(--muted)" }}>
                      {tier.description}
                    </span>
                  </div>

                  {/* Skill groups */}
                  <div className="skills-tier-body">
                    {tier.groups.map((group) => (
                      <div key={group.category} className="skill-row skills-group-row">
                        <span className="skills-category-label">
                          {group.category}
                        </span>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem" }}>
                          {group.items.map((item) => (
                            <span
                              key={item}
                              className="skill-tag"
                              style={{
                                padding: "0.22rem 0.6rem",
                                borderRadius: "var(--r-tag)",
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

      <style>{`
        .skills-tier-card {
          border: 1px solid var(--border);
          border-radius: var(--r-card);
          overflow: hidden;
        }
        .skills-tier-header {
          padding: 1rem 1.75rem;
          border-bottom: 1px solid var(--border);
          background: var(--card);
          display: flex;
          align-items: baseline;
          gap: 1rem;
          flex-wrap: wrap;
        }
        /* Tier label — Playfair Display italic */
        .skills-tier-label {
          font-family: var(--font-display), Georgia, serif;
          font-style: italic;
          font-weight: 700;
          font-size: 0.95rem;
          letter-spacing: -0.01em;
        }
        .skills-tier-body {
          padding: 1.25rem 1.75rem;
          background: var(--card);
          display: flex;
          flex-direction: column;
          gap: 0.9rem;
        }
        .skills-group-row {
          display: grid;
          grid-template-columns: 150px 1fr;
          gap: 1rem;
          align-items: start;
        }
        /* Category label — JetBrains Mono */
        .skills-category-label {
          font-family: var(--font-mono), monospace;
          font-size: 0.7rem;
          font-weight: 500;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--foreground);
          padding-top: 0.12rem;
        }

        @media (max-width: 600px) {
          .skills-tier-header { padding: 0.9rem 1.25rem; }
          .skills-tier-body   { padding: 1rem 1.25rem; }
          .skills-group-row   { grid-template-columns: 1fr !important; gap: 0.3rem !important; }
        }
      `}</style>
    </section>
  );
}
