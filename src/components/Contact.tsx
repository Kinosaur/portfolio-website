import { siteContent } from "@/data/content";
import InView from "./InView";

const EmailIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const GitHubIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" style={{ flexShrink: 0 }}>
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" style={{ flexShrink: 0 }}>
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 23.2 24 22.222 24h.003z" />
  </svg>
);

export default function Contact() {
  const { contact } = siteContent;

  return (
    <footer id="contact" style={{ borderTop: "1px solid var(--border)" }}>
      <div className="container footer-container">

        <div className="footer-top">
          {/* ── Brand / colophon ── */}
          <InView>
            <div>
              {/* Masthead logo — echoes the hero name in Playfair Display 900 */}
              <a href="#" className="logo-link footer-logo" style={{ textDecoration: "none", marginBottom: "1.25rem" }}>
                <span className="logo-text footer-logo-text">Kinosaur</span>
                <span className="logo-dot" style={{ width: "6px", height: "6px" }} />
              </a>
              <p style={{
                fontWeight: 300,
                color: "var(--muted)",
                lineHeight: 1.78,
                marginTop: "1.25rem",
                maxWidth: "28ch",
              }}>
                Open to data engineering roles.<br />
                Bangkok — available remotely.
              </p>
            </div>
          </InView>

          {/* ── Contact links ── */}
          <InView delay={80}>
            <div>
              <p className="label" style={{ marginBottom: "1.1rem" }}>Get in touch</p>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                <a href={`mailto:${contact.email}`} className="footer-link">
                  <EmailIcon />
                  <span>{contact.email}</span>
                </a>
                <a href={contact.github} target="_blank" rel="noopener noreferrer" className="footer-link">
                  <GitHubIcon />
                  <span>github.com/Kinosaur</span>
                </a>
                <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className="footer-link">
                  <LinkedInIcon />
                  <span>linkedin.com/in/kaungkhantlin-kinosaur</span>
                </a>
              </div>
            </div>
          </InView>
        </div>

        {/* ── Bottom colophon bar ── */}
        <InView delay={120}>
          <div className="footer-bottom">
            <p>&copy; {new Date().getFullYear()} Kaung Khant Lin</p>
            <p>Built with Next.js · Shipped from Bangkok</p>
          </div>
        </InView>
      </div>

      <style>{`
        .footer-container {
          padding: 4.5rem 2rem 2.5rem;
        }
        .footer-top {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 6rem;
          align-items: start;
          margin-bottom: 3rem;
        }
        /* Footer logo — slightly larger than nav to echo hero masthead */
        .footer-logo { display: inline-flex; }
        .footer-logo-text {
          font-size: 1.65rem !important;
          letter-spacing: -0.04em !important;
        }
        /* Contact links — JetBrains Mono */
        .footer-link {
          display: inline-flex;
          align-items: center;
          gap: 0.55rem;
          font-family: var(--font-mono), monospace;
          font-size: 0.72rem;
          font-weight: 400;
          letter-spacing: 0.04em;
          color: var(--muted);
          text-decoration: none;
          transition: color 0.15s, transform 0.18s;
          padding: 0.16rem 0;
          width: fit-content;
        }
        .footer-link:hover {
          color: var(--foreground);
          transform: translateX(2px);
        }
        /* Colophon bar */
        .footer-bottom {
          padding-top: 1.75rem;
          border-top: 1px solid var(--border);
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 0.5rem;
          font-family: var(--font-mono), monospace;
          font-size: 0.65rem;
          font-weight: 400;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--muted);
        }

        @media (max-width: 860px) {
          .footer-top { gap: 3rem; }
        }
        @media (max-width: 640px) {
          .footer-container { padding: 3.5rem 1.25rem 2rem !important; }
          .footer-top { grid-template-columns: 1fr; gap: 2.25rem; }
          .footer-bottom { flex-direction: column; align-items: flex-start; gap: 0.35rem; }
        }
      `}</style>
    </footer>
  );
}
