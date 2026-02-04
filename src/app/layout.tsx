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
