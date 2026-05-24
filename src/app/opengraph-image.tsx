import { ImageResponse } from "next/og";

export const alt = "Kaung Khant Lin — Data Engineering";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#F5F3EF",
          padding: "56px 80px 52px",
        }}
      >
        {/* Top accent rule */}
        <div style={{ height: 4, backgroundColor: "#111111", display: "flex", marginBottom: 44 }} />

        {/* Monogram + year */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 36 }}>
          <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.22em", color: "#9B9590", fontFamily: "monospace" }}>
            KKL
          </span>
          <span style={{ fontSize: 12, letterSpacing: "0.12em", color: "#9B9590", fontFamily: "monospace" }}>
            2026
          </span>
        </div>

        {/* Name — hero display */}
        <div
          style={{
            fontSize: 80,
            fontWeight: 900,
            letterSpacing: "-0.01em",
            color: "#111111",
            lineHeight: 0.9,
            marginBottom: 28,
            display: "flex",
            fontFamily: "Arial Black, Impact, \"Helvetica Neue\", Helvetica, sans-serif",
          }}
        >
          KAUNG KHANT LIN
        </div>

        {/* Rule */}
        <div style={{ height: 1, backgroundColor: "#111111", display: "flex", marginBottom: 24 }} />

        {/* Role + location */}
        <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: "auto" }}>
          <span style={{ fontSize: 18, fontWeight: 600, letterSpacing: "0.14em", color: "#504B46", fontFamily: "monospace" }}>
            DATA ENGINEERING
          </span>
          <span style={{ fontSize: 18, color: "#C8C3BB", fontFamily: "monospace" }}>·</span>
          <span style={{ fontSize: 18, letterSpacing: "0.1em", color: "#9B9590", fontFamily: "monospace" }}>
            BANGKOK
          </span>
          <span style={{ fontSize: 18, color: "#C8C3BB", fontFamily: "monospace" }}>·</span>
          <span style={{ fontSize: 18, letterSpacing: "0.1em", color: "#9B9590", fontFamily: "monospace" }}>
            MYANMAR
          </span>
        </div>

        {/* Tagline */}
        <div
          style={{
            display: "flex",
            fontSize: 20,
            color: "#2C2A27",
            lineHeight: 1.65,
            marginBottom: 44,
            fontFamily: "monospace",
            maxWidth: 660,
          }}
        >
          Learning data engineering. Building real pipelines in Bangkok.
        </div>

        {/* Bottom light rule */}
        <div style={{ height: 1, backgroundColor: "#C8C3BB", display: "flex" }} />
      </div>
    ),
    { ...size }
  );
}
