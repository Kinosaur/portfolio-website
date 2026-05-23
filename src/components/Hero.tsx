"use client";

import { useRef } from "react";
import Image from "next/image";
import { siteContent } from "@/data/content";
import TiltCard from "./TiltCard";

export default function Hero() {
  const primaryRef = useRef<HTMLAnchorElement>(null);
  const secondaryRef = useRef<HTMLAnchorElement>(null);

  function onMagneticMove(ref: React.RefObject<HTMLAnchorElement | null>) {
    return (e: React.MouseEvent<HTMLAnchorElement>) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) * 0.28;
      const y = (e.clientY - rect.top - rect.height / 2) * 0.28;
      el.style.transform = `translate(${x}px, ${y}px)`;
    };
  }

  function onMagneticLeave(ref: React.RefObject<HTMLAnchorElement | null>) {
    return () => {
      const el = ref.current;
      if (el) el.style.transform = "";
    };
  }

  return (
    <section
      id="hero"
      style={{
        position: "relative",
        minHeight: "100svh",
        display: "flex",
        alignItems: "center",
        paddingTop: "5rem",
        paddingBottom: "5rem",
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

            {/* 2 — name masthead (Inter 800 — clip-path reveal) */}
            <h1 className="hero-line hero-name">
              {siteContent.name}
            </h1>

            {/* 3 — editorial rule (scaleX reveal) */}
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

            {/* 7 — CTAs (magnetic on desktop) */}
            <div className="hero-actions hero-line">
              <a
                ref={primaryRef}
                href="#featured"
                className="action-button action-button--solid hero-magnetic"
                onMouseMove={onMagneticMove(primaryRef)}
                onMouseLeave={onMagneticLeave(primaryRef)}
              >
                {siteContent.hero.cta}
                <svg className="action-arrow action-arrow--down" width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path d="M8 3v10M3 8l5 5 5-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              <a
                ref={secondaryRef}
                href="#contact"
                className="action-button hero-magnetic"
                onMouseMove={onMagneticMove(secondaryRef)}
                onMouseLeave={onMagneticLeave(secondaryRef)}
              >
                Contact
                <svg className="action-arrow action-arrow--up-right" width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M4 12L12 4M6 4h6v6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
          </div>

          {/* ── Right: photo card (curtain-down reveal) ── */}
          <div className="hero-photo-wrap hero-photo-animate">
            <TiltCard style={{ borderRadius: "var(--r-photo)", width: "100%" }} maxTilt={6}>
              <figure className="hero-photo-card">
                <div className="hero-photo-frame">
                  <Image
                    src="/images/profile.png"
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

      {/* ── Scroll indicator ── */}
      <div className="hero-scroll-hint" aria-hidden="true">
        <span className="hero-scroll-text">Scroll</span>
        <div className="hero-scroll-line">
          <div className="hero-scroll-bar" />
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

        /* ── Name masthead (Inter 800 — clip-path in globals.css) ── */
        .hero-name {
          font-family: var(--font-sans), system-ui, sans-serif;
          font-weight: 800;
          font-size: clamp(3.4rem, 10vw, 6rem);
          letter-spacing: -0.04em;
          line-height: 0.9;
          color: var(--foreground);
          margin-bottom: 1.5rem;
          transform-origin: left;
        }

        /* ── Editorial rule — scaleX in globals.css ── */
        .hero-divider {
          height: 1px;
          background: var(--border);
          margin-bottom: 1.5rem;
          transform-origin: left;
        }

        /* ── Intro line ── */
        .hero-intro {
          font-size: 1.1rem;
          color: var(--foreground);
          margin-bottom: 1rem;
          line-height: 1.5;
        }

        /* ── Kinosaur — Playfair Display italic (editorial accent) ── */
        .hero-nickname {
          font-family: var(--font-display), Georgia, serif;
          font-style: italic;
          font-weight: 700;
          font-size: 1.42em;
          line-height: 1;
          letter-spacing: -0.01em;
          display: inline-block;
          vertical-align: -0.05em;
          color: color-mix(in srgb, var(--accent) 70%, var(--foreground));
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

        /* Magnetic transition — spring-back on leave */
        .hero-magnetic {
          transition:
            transform 0.55s cubic-bezier(0.34, 1.56, 0.64, 1),
            border-color 0.18s,
            background 0.18s,
            color 0.18s;
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

        /* ── Scroll hint ── */
        .hero-scroll-hint {
          position: absolute;
          bottom: 2rem;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.55rem;
          opacity: 0;
          animation: fadeUp 0.5s ease 1.1s forwards;
        }
        .hero-scroll-text {
          font-family: var(--font-mono), monospace;
          font-size: 0.55rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--muted);
          opacity: 0.65;
        }
        .hero-scroll-line {
          width: 1px;
          height: 2.25rem;
          background: var(--border);
          position: relative;
          overflow: hidden;
        }
        .hero-scroll-bar {
          position: absolute;
          top: -100%;
          left: 0;
          width: 100%;
          height: 100%;
          background: var(--accent);
          animation: scrollLine 1.9s ease-in-out 1.1s infinite;
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
          .hero-scroll-hint { display: none; }
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

        @media (hover: none) {
          .hero-photo-card { box-shadow: none !important; }
          .hero-magnetic { transition: border-color 0.18s, background 0.18s, color 0.18s; }
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-status-dot { animation: none; }
          .hero-scroll-bar { animation: none; }
          .hero-scroll-hint { opacity: 1; animation: none; }
        }
      `}</style>
    </section>
  );
}
