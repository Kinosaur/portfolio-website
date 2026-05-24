import type { Metadata, Viewport } from "next";
import { Bebas_Neue, IBM_Plex_Mono } from "next/font/google";
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

const BASE_URL = "https://kaungkhantlin-porfolio-website.vercel.app";
const DESCRIPTION =
  "Data engineering student in Bangkok. Building pipelines, dashboards, and small useful systems.";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: "Kaung Khant Lin",
  description: DESCRIPTION,
  openGraph: {
    title: "Kaung Khant Lin",
    description: DESCRIPTION,
    url: BASE_URL,
    siteName: "Kaung Khant Lin",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kaung Khant Lin",
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${bebasNeue.variable} ${ibmPlexMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
