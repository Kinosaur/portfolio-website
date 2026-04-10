import { siteContent } from "@/data/content";

export default function About() {
  const { about } = siteContent;

  return (
    <section id="about" className="section">
      <div className="container">
        <p className="label" style={{ marginBottom: "0.5rem" }}>
          About
        </p>
        <h2
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

        <div style={{ maxWidth: "640px" }}>
          {about.paragraphs.map((para, i) => (
            <p
              key={i}
              style={{
                fontSize: "1rem",
                lineHeight: 1.8,
                color: "var(--muted)",
                marginBottom: i < about.paragraphs.length - 1 ? "1.25rem" : 0,
              }}
            >
              {para}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
