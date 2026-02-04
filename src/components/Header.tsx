"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Zap } from "lucide-react";

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-brand-blue rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="font-heading font-bold text-xl text-brand-text">
              Copy<span className="text-brand-blue">Forge</span>
            </span>
          </Link>

          {/* Nav */}
          <nav className="flex items-center gap-6">
            <Link
              href="/#features"
              className="text-sm text-gray-600 hover:text-brand-blue transition-colors hidden sm:block"
            >
              Features
            </Link>
            <Link
              href="/#pricing"
              className="text-sm text-gray-600 hover:text-brand-blue transition-colors hidden sm:block"
            >
              Pricing
            </Link>
            <Link
              href="/app"
              className={`btn-primary text-sm ${
                pathname === "/app" ? "bg-blue-700" : ""
              }`}
            >
              <Zap className="w-4 h-4" />
              Launch App
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
