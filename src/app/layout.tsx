import type { Metadata } from "next";
import { Inter, Playfair_Display, Source_Serif_4, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Cursor from "@/components/Cursor";

// Swiss UI layer — hero name, section headings, nav
const sansFont = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700", "800"],
});

// Editorial accent layer — logo, pull quotes, "Kinosaur" nickname, italic moments
const displayFont = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "700", "900"],
  style: ["normal", "italic"],
});

// Body prose — descriptions, about text, all long-form
const bodyFont = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["300", "400", "600"],
  style: ["normal", "italic"],
});

// Technical layer — labels, tags, stats, captions, nav links
const monoFont = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
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
      className={`${sansFont.variable} ${displayFont.variable} ${bodyFont.variable} ${monoFont.variable}`}
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
