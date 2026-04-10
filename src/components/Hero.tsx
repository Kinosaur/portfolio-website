"use client";

import Image from "next/image";
import { siteContent } from "@/data/content";
import TiltCard from "./TiltCard";

export default function Hero() {

  return (
    <section
      id="hero"
      className="hero-section"
      style={{
        position: "relative",
        minHeight: "100svh",
        display: "flex",
        alignItems: "center",
        paddingTop: "5rem",
        overflow: "hidden",
      }}
    >
      <div className="hero-bg" />

      <div className="container" style={{ position: "relative", zIndex: 1, width: "100%" }}>
        <div className="hero-layout">
          {/* ── Left: text ── */}
          <div className="hero-text">
            {/* Eyebrow */}
            <p className="label hero-line" style={{ marginBottom: "1.5rem" }}>
              Portfolio · Data Engineering
            </p>

            {/* Name */}
            <h1
              className="hero-line hero-name-display"
              style={{
                fontSize: "clamp(2rem, 9vw, 3.75rem)",
                fontWeight: 700,
                letterSpacing: "-0.02em",
                lineHeight: 1.08,
                color: "var(--foreground)",
                marginBottom: "1rem",
              }}
            >
              {siteContent.name}
            </h1>

            {/* Human intro */}
            <p
              className="hero-line"
              style={{
                fontSize: "1.2rem",
                fontWeight: 500,
                color: "var(--foreground)",
                marginBottom: "1.1rem",
              }}
            >
              Hello — I&rsquo;m <span className="hero-nickname-script">Kinosaur</span>.
            </p>

            {/* Positioning */}
            <p
              className="hero-line hero-positioning"
              style={{
                fontSize: "1.08rem",
                lineHeight: 1.85,
                color: "color-mix(in srgb, var(--foreground) 76%, var(--muted))",
                marginBottom: "2.75rem",
                maxWidth: "540px",
              }}
            >
              Moving toward data engineering — currently strongest in Python
              data processing and visualization, learning warehousing and orchestration
              now.
            </p>
            <p className="hero-line hero-mobile-summary">
              CS senior in Bangkok pivoting into data engineering, focused on Python
              data workflows and analytics.
            </p>

            {/* CTA */}
            <div className="hero-actions hero-line">
              <a
                href="#featured"
                className="action-button action-button--solid hero-primary-cta"
              >
                {siteContent.hero.cta}
                <svg className="action-arrow action-arrow--down" width="15" height="15" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M8 3v10M3 8l5 5 5-5"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>

              <a
                href="#contact"
                className="action-button hero-secondary-cta"
              >
                <span className="hero-secondary-cta-main">
                  Contact me
                  <svg className="action-arrow action-arrow--up-right" width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path
                      d="M4 12L12 4M6 4h6v6"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </a>
            </div>
          </div>

          {/* ── Right: photo card ── */}
          <div className="hero-photo-wrap hero-line" style={{ animationDelay: "0.6s" }}>
            <TiltCard style={{ borderRadius: "14px", width: "100%", maxWidth: "100%" }} maxTilt={6}>
              <figure className="hero-photo-card">
                <div className="hero-photo-frame">
                  <Image
                    src="/images/profile.jpg"
                    alt="Kaung Khant Lin"
                    fill
                    sizes="(max-width: 640px) 205px, (max-width: 860px) 260px, 360px"
                    className="hero-profile-image"
                    style={{ objectFit: "cover", objectPosition: "center top" }}
                    priority
                  />
                </div>
                <figcaption className="hero-photo-caption">
                  <span className="hero-photo-status">
                    <span className="hero-status-dot" />
                    Open to DE roles
                  </span>
                  <span className="hero-photo-location">Bangkok · available remotely</span>
                </figcaption>
              </figure>
            </TiltCard>
          </div>
        </div>
      </div>

      <style>{`
        .hero-layout {
          display: grid;
          grid-template-columns: 1fr minmax(260px, 360px);
          gap: 3.5rem;
          align-items: center;
        }

        .hero-photo-wrap {
          display: flex;
          justify-content: flex-end;
        }
        .hero-name-display {
          font-family: var(--font-display-serif), "Times New Roman", serif;
          font-variation-settings: "opsz" 32;
        }
        .hero-nickname-script {
          font-family: var(--font-accent-script), "Brush Script MT", cursive;
          font-size: 1.55em;
          line-height: 1;
          letter-spacing: 0.01em;
          display: inline-block;
          vertical-align: -0.04em;
          color: color-mix(in srgb, var(--accent) 62%, var(--foreground));
        }
        .hero-actions {
          display: flex;
          align-items: center;
          gap: 0.8rem;
          flex-wrap: wrap;
        }
        .hero-mobile-summary {
          display: none;
        }
        .hero-actions > a {
          inline-size: 14.5rem;
          block-size: 3.25rem;
          flex: 0 0 14.5rem;
          box-sizing: border-box;
          font-size: 0.92rem;
          font-weight: 600;
        }
        .hero-secondary-cta {
          min-width: 0;
        }
        .hero-secondary-cta-main {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          line-height: 1;
        }
        .hero-primary-cta {
          min-width: 0;
        }
        .hero-photo-card {
          margin: 0;
          border: 1px solid var(--border);
          border-radius: 14px;
          overflow: hidden;
          background: var(--card);
          box-shadow: 0 8px 32px rgba(0,0,0,0.35), 0 2px 8px rgba(0,0,0,0.2);
          width: 100%;
          transition: transform 0.22s ease, box-shadow 0.22s ease;
        }
        .hero-photo-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 14px 40px rgba(0,0,0,0.22), 0 4px 12px rgba(0,0,0,0.12);
        }
        .hero-photo-frame {
          width: 100%;
          aspect-ratio: 3 / 4;
          overflow: hidden;
          position: relative;
        }
        .hero-profile-image {
          transform: scale(1.14);
          transform-origin: center 18%;
        }
        .hero-photo-frame::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to bottom,
            transparent 56%,
            color-mix(in srgb, var(--card) 72%, transparent) 100%
          );
          pointer-events: none;
        }

        :root[data-theme="light"] .hero-photo-frame::after {
          content: none;
        }
        .hero-photo-caption {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
          padding: 1rem 1.25rem;
          border-top: 1px solid var(--border);
          background: color-mix(in srgb, var(--accent) 4%, var(--card));
        }
        .hero-photo-status {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.95rem;
          font-weight: 700;
          color: var(--foreground);
        }
        .hero-status-dot {
          width: 9px;
          height: 9px;
          border-radius: 50%;
          background: #22c55e;
          flex-shrink: 0;
          animation: pulse-dot 2.2s ease-in-out infinite;
        }
        .hero-photo-location {
          font-size: 0.82rem;
          color: var(--muted);
          padding-left: 1.35rem;
        }
        @media (max-width: 860px) {
          .hero-layout {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
          .hero-photo-wrap {
            justify-content: center;
          }
          .hero-photo-card {
            max-width: 260px;
          }
        }

        @media (hover: none) {
          .hero-bg::before {
            display: none;
          }
          .hero-photo-card:hover {
            transform: none;
            box-shadow: 0 8px 32px rgba(0,0,0,0.35), 0 2px 8px rgba(0,0,0,0.2);
          }
        }

        @media (max-width: 640px) {
          .hero-section {
            min-height: auto !important;
            padding-top: 5rem !important;
            padding-bottom: 2.25rem;
          }
          .hero-layout {
            gap: 1.25rem;
            align-items: start;
          }
          .hero-photo-wrap {
            justify-content: center;
          }
          .hero-positioning {
            display: none;
          }
          .hero-mobile-summary {
            display: block;
            font-size: 1rem;
            line-height: 1.6;
            color: color-mix(in srgb, var(--foreground) 72%, var(--muted));
            margin-bottom: 1.6rem;
            max-width: 34ch;
          }
          .hero-text .action-button {
            width: 100%;
            justify-content: center;
            padding: 0.85rem 1.1rem;
          }
          .hero-actions {
            flex-direction: column;
            align-items: stretch;
          }
          .hero-actions > a {
            inline-size: 100%;
            block-size: auto;
            flex: 1 1 auto;
          }
          .hero-secondary-cta {
            width: 100%;
          }
          .hero-secondary-cta-main {
            justify-content: center;
          }
          .hero-photo-card {
            max-width: 195px;
            margin-inline: auto;
          }
          .hero-profile-image {
            transform: scale(1.03);
            transform-origin: center 15%;
          }
          .hero-photo-caption {
            padding: 0.72rem 0.85rem;
            gap: 0.28rem;
          }
          .hero-photo-status {
            font-size: 0.84rem;
          }
          .hero-photo-location {
            font-size: 0.72rem;
            padding-left: 1.15rem;
          }
          .hero-status-dot {
            width: 7px;
            height: 7px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-bg::before {
            display: none;
          }
        }

        @media (max-width: 400px) {
          .hero-photo-card {
            max-width: 176px;
          }
          .hero-profile-image {
            transform: scale(1.01);
          }
        }
      `}</style>
    </section>
  );
}
