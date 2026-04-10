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
              className="hero-line"
              style={{
                fontSize: "clamp(2rem, 9vw, 3.75rem)",
                fontWeight: 700,
                letterSpacing: "-0.035em",
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
              Hi — I&rsquo;m Kinosaur.
            </p>

            {/* Positioning */}
            <p
              className="hero-line"
              style={{
                fontSize: "1.05rem",
                lineHeight: 1.85,
                color: "var(--muted)",
                marginBottom: "2.75rem",
                maxWidth: "540px",
              }}
            >
              Final-year CS student at Assumption University, Bangkok, originally from
              Myanmar. Moving toward data engineering — currently strongest in Python
              data processing and visualization, learning warehousing and orchestration
              now.
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
                      d="M3.5 8h9M8.5 4.5 12 8l-3.5 3.5"
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
        .hero-actions {
          display: flex;
          align-items: center;
          gap: 0.8rem;
          flex-wrap: wrap;
        }
        .hero-actions > a {
          inline-size: 14.5rem;
          block-size: 3.25rem;
          flex: 0 0 14.5rem;
          box-sizing: border-box;
        }
        .hero-secondary-cta {
          min-width: 0;
        }
        .hero-secondary-cta-main {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          font-size: 0.9rem;
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
          .hero-photo-card:hover {
            transform: none;
            box-shadow: 0 8px 32px rgba(0,0,0,0.35), 0 2px 8px rgba(0,0,0,0.2);
          }
        }

        @media (max-width: 640px) {
          .hero-section {
            min-height: auto !important;
            padding-top: 5.5rem !important;
            padding-bottom: 2.25rem;
          }
          .hero-layout {
            gap: 1.5rem;
            align-items: start;
          }
          .hero-photo-wrap {
            justify-content: flex-start;
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
            max-width: 205px;
          }
          .hero-profile-image {
            transform: scale(1.06);
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

        @media (max-width: 400px) {
          .hero-photo-card {
            max-width: 185px;
          }
          .hero-profile-image {
            transform: scale(1.03);
          }
        }
      `}</style>
    </section>
  );
}
