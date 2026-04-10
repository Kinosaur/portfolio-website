import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Kaung Khant Lin — Data Engineering Portfolio",
  description:
    "Final-year CS student at Assumption University, Bangkok. Moving toward data engineering — Python data processing, visualization, and learning warehousing and orchestration.",
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
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* eslint-disable-next-line @next/next/no-before-interactive-script-outside-document */}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
