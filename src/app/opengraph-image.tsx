import { ImageResponse } from "next/og";

/* ─── OG image — dark masthead, mirrors the site's newspaper identity ─── */

export const alt =
  "Kaung Khant Lin — Data Engineering. Building real data-backed products in Bangkok. Open to roles.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/* Fetch a TTF subset from Google Fonts (satori can't render woff2 or
   system fonts). css2 without a modern UA returns truetype sources.
   Returns null on any failure so the image still renders in satori's
   default font rather than failing the build. */
async function loadGoogleFont(
  family: string,
  text: string
): Promise<ArrayBuffer | null> {
  try {
    const url = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(
      family
    )}&text=${encodeURIComponent(text)}`;
    const css = await (await fetch(url)).text();
    const match = css.match(/src: url\((.+)\) format\('(opentype|truetype)'\)/);
    if (!match) return null;
    return await (await fetch(match[1])).arrayBuffer();
  } catch {
    return null;
  }
}

const NAME = "KAUNG KHANT LIN";
const MONO_TEXT =
  "PORTFOLIO · DATA ENGINEERING BANGKOK · MYANMAR BUILDING REAL DATA-BACKED PRODUCTS IN BANGKOK. OPEN TO ROLES";

export default async function OgImage() {
  const [bebas, mono] = await Promise.all([
    loadGoogleFont("Bebas Neue", NAME),
    loadGoogleFont("IBM Plex Mono:wght@500", MONO_TEXT),
  ]);

  const fonts = [
    bebas && { name: "Bebas Neue", data: bebas, weight: 400 as const, style: "normal" as const },
    mono && { name: "IBM Plex Mono", data: mono, weight: 500 as const, style: "normal" as const },
  ].filter(Boolean) as { name: string; data: ArrayBuffer; weight: 400 | 500; style: "normal" }[];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#141311",
          padding: "56px 64px",
        }}
      >
        {/* Top byline row */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontFamily: "IBM Plex Mono",
              fontSize: 21,
              letterSpacing: "0.18em",
              color: "#928D86",
              marginBottom: 26,
            }}
          >
            <span>PORTFOLIO · DATA ENGINEERING</span>
            <span>BANGKOK · MYANMAR</span>
          </div>
          <div style={{ display: "flex", height: 1, background: "#2E2B27" }} />
        </div>

        {/* Masthead name */}
        <div
          style={{
            display: "flex",
            fontFamily: "Bebas Neue",
            fontSize: 168,
            lineHeight: 1,
            letterSpacing: "0.02em",
            color: "#F2EFE9",
          }}
        >
          {NAME}
        </div>

        {/* Bottom: rule + positioning + availability chip */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              height: 3,
              background: "#F2EFE9",
              marginBottom: 30,
            }}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span
              style={{
                fontFamily: "IBM Plex Mono",
                fontSize: 24,
                letterSpacing: "0.06em",
                color: "#C8C3BC",
              }}
            >
              BUILDING REAL DATA-BACKED PRODUCTS IN BANGKOK.
            </span>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                border: "1.5px solid #2E2B27",
                padding: "10px 20px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  width: 12,
                  height: 12,
                  borderRadius: "50%",
                  background: "#5B9CF6",
                }}
              />
              <span
                style={{
                  fontFamily: "IBM Plex Mono",
                  fontSize: 21,
                  letterSpacing: "0.14em",
                  color: "#F2EFE9",
                }}
              >
                OPEN TO ROLES
              </span>
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size, fonts }
  );
}
