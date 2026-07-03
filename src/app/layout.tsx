import type { Metadata, Viewport } from "next";
import { Bebas_Neue, IBM_Plex_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F5F3EF" },
    { media: "(prefers-color-scheme: dark)",  color: "#141311" },
  ],
};

const BASE_URL = "https://kaungkhantlin-portfolio-website.vercel.app";
const TITLE = "Kaung Khant Lin — Data Engineering";
const DESCRIPTION =
  "Building real data-backed products in Bangkok. Pipelines, analytics APIs, and civic dashboards. Open to data engineering roles, graduating 2026.";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: BASE_URL,
    siteName: "Kaung Khant Lin",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
  robots: {
    index: true,
    follow: true,
  },
};

/* Person schema — helps Google surface name, role, and profiles correctly */
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Kaung Khant Lin",
  url: BASE_URL,
  jobTitle: "Data Engineering Student",
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Assumption University of Thailand",
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Bangkok",
    addressCountry: "TH",
  },
  nationality: "Myanmar",
  sameAs: [
    "https://github.com/Kinosaur",
    "https://www.linkedin.com/in/kaungkhantlin-kinosaur/",
  ],
  knowsAbout: [
    "Data Engineering",
    "Python",
    "Data Pipelines",
    "Data Visualization",
    "PostgreSQL",
    "Civic Technology",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${bebasNeue.variable} ${ibmPlexMono.variable}`}>
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <Analytics />
      </body>
    </html>
  );
}
