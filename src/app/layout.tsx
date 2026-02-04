import type { Metadata } from "next";
import { Syne, Work_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const workSans = Work_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "CopyForge — AI Product Descriptions That Sell",
  description:
    "Generate SEO-optimized product descriptions, bullet points, and ad copy at scale. Built for Shopify, Amazon, Etsy, and more.",
  keywords: [
    "product descriptions",
    "AI copywriting",
    "e-commerce",
    "SEO",
    "bulk descriptions",
    "Shopify",
    "Amazon",
    "Etsy",
  ],
  openGraph: {
    title: "CopyForge — AI Product Descriptions That Sell",
    description: "Generate SEO-optimized product descriptions, bullet points, and ad copy at scale.",
    type: "website",
    siteName: "CopyForge",
    url: "https://copyforge-seven.vercel.app",
    images: [{ url: "https://copyforge-seven.vercel.app/og-image.png", width: 1200, height: 630, alt: "CopyForge — AI Product Descriptions That Sell" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "CopyForge — AI Product Descriptions That Sell",
    description: "Generate SEO-optimized product descriptions, bullet points, and ad copy at scale.",
    creator: "@automatikstudio",
    images: ["https://copyforge-seven.vercel.app/og-image.png"],
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${syne.variable} ${workSans.variable}`}>
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
