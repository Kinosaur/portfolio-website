import Image from "next/image";
import { siteContent } from "@/data/content";
import InView from "./InView";
import TiltCard from "./TiltCard";

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
            className="section-heading heading-reveal"
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

        <div className="about-grid">
          <InView delay={80}>
            <TiltCard style={{ borderRadius: "12px" }}>
              <figure
                style={{
                  margin: 0,
                  border: "1px solid var(--border)",
                  borderRadius: "12px",
                  overflow: "hidden",
                  background: "var(--card)",
                  boxShadow: "var(--shadow-md)",
                }}
              >
                <Image
                  src="/images/profile.jpg"
                  alt="Kaung Khant Lin"
                  width={768}
                  height={1024}
                  style={{
                    width: "100%",
                    height: "auto",
                    display: "block",
                  }}
                  priority
                />
                <figcaption
                  style={{
                    padding: "0.65rem 0.9rem",
                    fontSize: "0.8rem",
                    color: "var(--muted)",
                    borderTop: "1px solid var(--border)",
                  }}
                >
                  Bangkok, Thailand
                </figcaption>
              </figure>
            </TiltCard>
          </InView>

          <div>
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
      </div>

      <style>{`
        .about-grid {
          display: grid;
          grid-template-columns: minmax(260px, 340px) 1fr;
          gap: 4rem;
          align-items: start;
        }

        @media (max-width: 860px) {
          .about-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
        }
      `}</style>
    </section>
  );
}
