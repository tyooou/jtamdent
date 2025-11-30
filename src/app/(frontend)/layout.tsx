import type { Metadata } from "next";
import { interTight } from "./font";
import "./globals.css";
import PageTransition from "./components/PageTransition";
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/next"
import path from "path";

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
      <body className={interTight.className}>
        <PageTransition>{children}</PageTransition>
        <SpeedInsights/>
        <Analytics />
      </body>
    </html>
  );
}
