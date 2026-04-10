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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
