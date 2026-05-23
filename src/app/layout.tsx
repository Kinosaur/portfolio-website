import type { Metadata } from "next";
import { Playfair_Display, Source_Serif_4, JetBrains_Mono, Caveat } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Cursor from "@/components/Cursor";

// Display / masthead — hero name, section titles
const displayFont = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "700", "900"],
  style: ["normal", "italic"],
});

// Body serif — all prose, descriptions, about text
const bodyFont = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["300", "400", "600"],
  style: ["normal", "italic"],
});

// Mono — labels, tags, stats, nav links, captions
const monoFont = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
});

// Script — "Kinosaur" nickname only
const scriptFont = Caveat({
  subsets: ["latin"],
  variable: "--font-script",
  weight: ["600", "700"],
});

export const metadata: Metadata = {
  title: "Kaung Khant Lin — Data Engineering Portfolio",
  description:
    "Final-year CS student at Assumption University, Bangkok. Moving toward data engineering — Python data processing, visualization, and learning warehousing and orchestration.",
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "Kaung Khant Lin — Data Engineering Portfolio",
    description:
      "Projects in civic data visualization, data quality, and data engineering from a CS student in Bangkok.",
    type: "website",
  },
};

// Runs before React hydrates — prevents flash of wrong theme.
// Light is the default (:root in CSS). Dark is the explicit override.
const themeScript = `
  try {
    var stored = localStorage.getItem('kino-theme');
    if (stored === 'light' || stored === 'dark') {
      document.documentElement.setAttribute('data-theme', stored);
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  } catch(e) {}
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${displayFont.variable} ${bodyFont.variable} ${monoFont.variable} ${scriptFont.variable}`}
    >
      <head>
        {/* eslint-disable-next-line @next/next/no-before-interactive-script-outside-document */}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <Cursor />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
