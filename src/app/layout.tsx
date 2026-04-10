import type { Metadata } from "next";
import { Playfair_Display, Plus_Jakarta_Sans, Caveat } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Cursor from "@/components/Cursor";

const displaySerif = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display-serif",
  weight: ["600", "700"],
});

const uiSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-ui-sans",
  weight: ["400", "500", "600", "700"],
});

const accentScript = Caveat({
  subsets: ["latin"],
  variable: "--font-accent-script",
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

// Runs before React hydrates — prevents flash of wrong theme
const themeScript = `
  try {
    var stored = localStorage.getItem('kino-theme');
    if (stored === 'light' || stored === 'dark') {
      document.documentElement.setAttribute('data-theme', stored);
    } else if (window.matchMedia('(prefers-color-scheme: light)').matches) {
      document.documentElement.setAttribute('data-theme', 'light');
    } else {
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
      className={`${displaySerif.variable} ${uiSans.variable} ${accentScript.variable}`}
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
