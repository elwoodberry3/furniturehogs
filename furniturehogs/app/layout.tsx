import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Furniture Hogs — Residential Furniture Removal · Denton County, TX",
  description:
    "Denton County's furniture removal specialist. Book online, get an upfront volume-based price, pick your 2-hour window. You never lift a thing.",
  openGraph: {
    title: "Furniture Hogs — Residential Furniture Removal",
    description: "Old furniture gone. No heavy lifting. No hassle. Serving Denton County, TX.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Jost = geometric-sans proxy for Futura (brand typeface, not a webfont).
            Loaded via link (runtime) so the production build has no network dependency. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Jost:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans">{children}</body>
    </html>
  );
}
