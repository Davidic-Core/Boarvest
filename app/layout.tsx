import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./dashboard/dashboard.css";
import "./admin/admin.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Boarvest | Digital Asset Management",
  description:
    "Discover Boarvest, a developing digital asset management platform focused on portfolio visibility, cryptocurrency market awareness, and a clearer investor experience.",
  applicationName: "Boarvest",
  keywords: [
    "Boarvest",
    "digital asset management",
    "crypto portfolio",
    "cryptocurrency market information",
    "digital assets",
    "portfolio visibility",
  ],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Boarvest | Digital Asset Management",
    description:
      "Explore the Boarvest vision for a clearer, more organized digital asset management experience.",
    siteName: "Boarvest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Boarvest | Digital Asset Management",
    description:
      "A developing platform focused on digital asset visibility, market awareness, and a clearer investor experience.",
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
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
