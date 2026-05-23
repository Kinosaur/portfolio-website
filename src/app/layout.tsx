import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kaung Khant Lin",
  description: "Data Engineering Portfolio",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
