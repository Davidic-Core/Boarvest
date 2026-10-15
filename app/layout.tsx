import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Boarvest | High-Yield Crypto Investment Management",
  description:
    "Take full control of your digital assets with Boarvest. Track real-time market data, optimize portfolio performance, and monitor active crypto investments using a lightning-fast, investor-first dashboard architecture",
  applicationName: "Boarvest",
  keywords: [
    "Boarvest",
    "crypto investment management",
    "digital assets",
    "crypto portfolio",
    "investment dashboard",
    "cryptocurrency market data",
  ],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Boarvest | High-Yield Crypto Investment Management",
    description:
      "Take control of your digital assets with an investor-first crypto portfolio and investment management experience.",
    siteName: "Boarvest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Boarvest | High-Yield Crypto Investment Management",
    description:
      "A modern, investor-first experience for managing and monitoring digital assets.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#080D0B",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}