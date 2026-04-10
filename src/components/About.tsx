import { siteContent } from "@/data/content";
import InView from "./InView";

export default function About() {
  const { about } = siteContent;

  return (
    <section id="about" className="section">
      <div className="container">
        <InView>
          <p className="label" style={{ marginBottom: "0.5rem" }}>
            About
          </p>
          <h2
            className="section-heading"
            style={{
              fontSize: "clamp(1.4rem, 3vw, 1.8rem)",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              marginBottom: "2rem",
              color: "var(--foreground)",
            }}
          >
            Background
          </h2>
        </InView>

        <div style={{ maxWidth: "640px" }}>
          {about.paragraphs.map((para, i) => (
            <InView key={i} delay={i * 100}>
              <p
                style={{
                  fontSize: "1rem",
                  lineHeight: 1.85,
                  color: "var(--muted)",
                  marginBottom: i < about.paragraphs.length - 1 ? "1.35rem" : 0,
                }}
              >
                {para}
              </p>
            </InView>
          ))}
        </div>
      </div>
    </section>
  );
}
