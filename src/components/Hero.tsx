"use client";

import Image from "next/image";
import { siteContent } from "@/data/content";
import TiltCard from "./TiltCard";

export default function Hero() {
  return (
    <section
      id="hero"
      style={{
        position: "relative",
        minHeight: "100svh",
        display: "flex",
        alignItems: "center",
        paddingTop: "5rem",
        paddingBottom: "3rem",
        overflow: "hidden",
      }}
    >
      <div className="container" style={{ position: "relative", zIndex: 1, width: "100%" }}>
        <div className="hero-layout">

          {/* ── Left: editorial masthead ── */}
          <div className="hero-text">

            {/* 1 — eyebrow (JetBrains Mono via .label) */}
            <p className="label hero-line" style={{ marginBottom: "1.75rem" }}>
              {siteContent.hero.eyebrow}
            </p>

            {/* 2 — name masthead (Playfair Display 900) */}
            <h1 className="hero-line hero-name">
              {siteContent.name}
            </h1>

            {/* 3 — editorial rule */}
            <div className="hero-divider hero-line" role="separator" aria-hidden="true" />

            {/* 4 — human intro */}
            <p className="hero-line hero-intro">
              Hello — I&rsquo;m{" "}
              <span className="hero-nickname">Kinosaur</span>.
            </p>

            {/* 5 — positioning body (Source Serif 4, body default) */}
            <p className="hero-line hero-positioning">
              {siteContent.hero.positioning}
            </p>

            {/* 6 — mobile short version (hidden on desktop) */}
            <p className="hero-line hero-mobile-summary">
              {siteContent.hero.positioningShort}
            </p>

            {/* 7 — CTAs */}
            <div className="hero-actions hero-line">
              <a href="#featured" className="action-button action-button--solid">
                {siteContent.hero.cta}
                <svg className="action-arrow action-arrow--down" width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path d="M8 3v10M3 8l5 5 5-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              <a href="#contact" className="action-button">
                Contact
                <svg className="action-arrow action-arrow--up-right" width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M4 12L12 4M6 4h6v6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
          </div>

          {/* ── Right: photo card ──
               Uses .hero-photo-animate (independent of nth-child stagger) ── */}
          <div className="hero-photo-wrap hero-photo-animate">
            <TiltCard style={{ borderRadius: "var(--r-photo)", width: "100%" }} maxTilt={6}>
              <figure className="hero-photo-card">
                <div className="hero-photo-frame">
                  <Image
                    src="/images/profile.jpg"
                    alt="Kaung Khant Lin"
                    fill
                    sizes="(max-width: 640px) 200px, (max-width: 860px) 260px, 320px"
                    className="hero-profile-img"
                    style={{ objectFit: "cover", objectPosition: "center top" }}
                    priority
                  />
                  <div className="hero-photo-fade" aria-hidden="true" />
                </div>
                <figcaption className="hero-photo-caption">
                  <span className="hero-photo-status">
                    <span className="hero-status-dot" aria-hidden="true" />
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
        /* ── Two-column grid ── */
        .hero-layout {
          display: grid;
          grid-template-columns: 1fr minmax(220px, 310px);
          gap: 4rem;
          align-items: center;
        }

        /* ── Name masthead ── */
        .hero-name {
          font-family: var(--font-display), Georgia, serif;
          font-weight: 900;
          font-size: clamp(2.8rem, 8.5vw, 5rem);
          letter-spacing: -0.04em;
          line-height: 0.93;
          color: var(--foreground);
          margin-bottom: 1.5rem;
        }

        /* ── Editorial rule below name ── */
        .hero-divider {
          height: 1px;
          background: var(--border);
          margin-bottom: 1.5rem;
        }

        /* ── Intro line ── */
        .hero-intro {
          font-size: 1.1rem;
          color: var(--foreground);
          margin-bottom: 1rem;
          line-height: 1.5;
        }

        /* ── Kinosaur script accent ── */
        .hero-nickname {
          font-family: var(--font-script), cursive;
          font-size: 1.45em;
          line-height: 1;
          letter-spacing: 0.01em;
          display: inline-block;
          vertical-align: -0.05em;
          color: color-mix(in srgb, var(--accent) 65%, var(--foreground));
        }

        /* ── Positioning body (Source Serif 4 300) ── */
        .hero-positioning {
          font-weight: 300;
          line-height: 1.82;
          color: var(--muted);
          margin-bottom: 2.75rem;
          max-width: 500px;
        }

        /* ── Mobile summary (hidden on desktop) ── */
        .hero-mobile-summary { display: none; }

        /* ── CTA row ── */
        .hero-actions {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          flex-wrap: wrap;
        }

        /* ── Photo card ── */
        .hero-photo-wrap {
          display: flex;
          justify-content: flex-end;
        }
        .hero-photo-card {
          margin: 0;
          border: 1px solid var(--border);
          border-radius: var(--r-photo);
          overflow: hidden;
          background: var(--card);
          width: 100%;
          /* No competing hover transform — TiltCard owns the 3D interaction */
        }
        .hero-photo-frame {
          width: 100%;
          aspect-ratio: 3 / 4;
          max-height: 400px;
          overflow: hidden;
          position: relative;
        }
        .hero-profile-img {
          transform: scale(1.12);
          transform-origin: center 18%;
        }

        /* Gradient fade-to-card — dark mode only */
        .hero-photo-fade {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to bottom,
            transparent 52%,
            color-mix(in srgb, var(--card) 68%, transparent) 100%
          );
          pointer-events: none;
          opacity: 0;
        }
        :root[data-theme="dark"] .hero-photo-fade { opacity: 1; }
        @media (prefers-color-scheme: dark) {
          :root:not([data-theme="light"]) .hero-photo-fade { opacity: 1; }
        }

        /* ── Caption (JetBrains Mono) ── */
        .hero-photo-caption {
          display: flex;
          flex-direction: column;
          gap: 0.32rem;
          padding: 0.9rem 1.05rem;
          border-top: 1px solid var(--border);
          background: var(--card);
        }
        .hero-photo-status {
          display: flex;
          align-items: center;
          gap: 0.48rem;
          font-family: var(--font-mono), monospace;
          font-size: 0.74rem;
          font-weight: 500;
          letter-spacing: 0.04em;
          color: var(--foreground);
        }
        .hero-status-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #22c55e;
          flex-shrink: 0;
          animation: pulse-dot 2.2s ease-in-out infinite;
        }
        .hero-photo-location {
          font-family: var(--font-mono), monospace;
          font-size: 0.65rem;
          font-weight: 400;
          letter-spacing: 0.06em;
          color: var(--muted);
          padding-left: 1.15rem;
        }

        /* ── Tablet ── */
        @media (max-width: 860px) {
          .hero-layout {
            grid-template-columns: 1fr;
            gap: 2.5rem;
          }
          .hero-photo-wrap { justify-content: center; }
          .hero-photo-card { max-width: 260px; }
          .hero-photo-frame { max-height: 360px; }
        }

        /* ── Mobile ── */
        @media (max-width: 640px) {
          .hero-layout { gap: 1.5rem; align-items: start; }
          .hero-name { margin-bottom: 1.1rem; }
          .hero-positioning { display: none; }
          .hero-mobile-summary {
            display: block;
            font-weight: 300;
            line-height: 1.75;
            color: var(--muted);
            margin-bottom: 1.75rem;
          }
          .hero-actions { flex-direction: column; }
          .hero-actions > a { width: 100%; justify-content: center; }
          .hero-photo-card { max-width: 195px; margin-inline: auto; }
          .hero-photo-frame { max-height: 280px; }
          .hero-profile-img { transform: scale(1.04); transform-origin: center 15%; }
          .hero-photo-caption { padding: 0.72rem 0.85rem; gap: 0.25rem; }
          .hero-photo-status { font-size: 0.68rem; }
          .hero-photo-location { font-size: 0.6rem; }
          .hero-status-dot { width: 6px; height: 6px; }
        }

        @media (max-width: 400px) {
          .hero-photo-card { max-width: 170px; }
        }

        /* Touch: no hover state on card (TiltCard reset handles it) */
        @media (hover: none) {
          .hero-photo-card { box-shadow: none !important; }
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-status-dot { animation: none; }
        }
      `}</style>
    </section>
  );
}
