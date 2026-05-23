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
          <p className="label" style={{ marginBottom: "0.6rem" }}>About</p>
          <h2
            className="section-heading heading-reveal"
            style={{
              fontSize: "clamp(1.5rem, 3vw, 2rem)",
              letterSpacing: "-0.022em",
              marginBottom: "2.25rem",
              color: "var(--foreground)",
            }}
          >
            Background
          </h2>
        </InView>

        <div className="about-grid">
          {/* Photo — raw, no card wrapper, just hairline border */}
          <InView delay={80}>
            <TiltCard className="about-photo-wrap" style={{ borderRadius: "var(--r-photo)" }}>
              <figure className="about-photo-figure">
                <Image
                  src="/images/profile.jpg"
                  alt="Kaung Khant Lin"
                  width={768}
                  height={1024}
                  style={{ width: "100%", height: "auto", display: "block" }}
                  priority
                />
                <figcaption className="about-photo-caption">
                  Bangkok, Thailand
                </figcaption>
              </figure>
            </TiltCard>
          </InView>

          {/* Bio paragraphs (Source Serif 4) */}
          <div>
            {about.paragraphs.map((para, i) => (
              <InView key={i} delay={i * 100}>
                <p
                  style={{
                    fontWeight: 300,
                    lineHeight: 1.88,
                    color: "var(--muted)",
                    marginBottom: i < about.paragraphs.length - 1 ? "1.4rem" : 0,
                    fontSize: "1.02rem",
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
          grid-template-columns: minmax(240px, 310px) 1fr;
          gap: 4rem;
          align-items: start;
        }
        .about-photo-figure {
          margin: 0;
          border: 1px solid var(--border);
          border-radius: var(--r-photo);
          overflow: hidden;
          background: var(--card);
          /* No box-shadow — editorial, raw */
        }
        .about-photo-caption {
          padding: 0.6rem 0.85rem;
          font-family: var(--font-mono), monospace;
          font-size: 0.65rem;
          font-weight: 400;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--muted);
          border-top: 1px solid var(--border);
        }

        @media (max-width: 860px) {
          .about-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
          .about-photo-wrap { max-width: 260px; margin: 0 auto; }
        }
        @media (max-width: 640px) {
          .about-photo-wrap { max-width: 220px; }
        }
        @media (max-width: 400px) {
          .about-photo-wrap { max-width: 190px; }
        }
      `}</style>
    </section>
  );
}
