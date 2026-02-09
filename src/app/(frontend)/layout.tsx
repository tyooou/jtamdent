import type { Metadata } from "next";
import { interTight } from "./font";
import "./globals.css";
import PageTransition from "./components/PageTransition";
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/next"

export const metadata: Metadata = {
  title: "jtamdent - Dental Photography & Videography",
  description: "Dental content simplified.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta property="og:image" content="/og-image.png" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body className={interTight.className + " selection:bg-transparent selection:text-inherit"}>
        <PageTransition>{children}</PageTransition>
        <SpeedInsights/>
        <Analytics />
      </body>
    </html>
  );
}
