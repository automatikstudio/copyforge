"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Zap,
  Upload,
  ShoppingBag,
  Mic2,
  Search,
  ArrowRight,
  FileText,
  Sparkles,
  Download,
  Check,
} from "lucide-react";
import PricingModal from "@/components/PricingModal";

const features = [
  {
    icon: Upload,
    title: "Bulk CSV Upload",
    desc: "Upload hundreds of products at once. Get descriptions for your entire catalog in minutes.",
  },
  {
    icon: ShoppingBag,
    title: "Platform-Specific",
    desc: "Optimized formats for Shopify, Amazon, Etsy, and more. Each platform has unique requirements.",
  },
  {
    icon: Mic2,
    title: "Brand Voice",
    desc: "Maintain consistent tone across all descriptions. Professional, casual, luxury — your choice.",
  },
  {
    icon: Search,
    title: "SEO Optimized",
    desc: "AI-generated keywords and meta descriptions that help your products rank higher.",
  },
];

const steps = [
  {
    icon: FileText,
    step: "01",
    title: "Input Product Details",
    desc: "Paste your product name, features, and category. Or upload a CSV with your full catalog.",
  },
  {
    icon: Sparkles,
    step: "02",
    title: "AI Generates Copy",
    desc: "Our AI crafts compelling descriptions, bullet points, and SEO meta — tailored to your platform.",
  },
  {
    icon: Download,
    step: "03",
    title: "Export & Publish",
    desc: "Copy to clipboard or download as CSV. Ready to paste into your store in seconds.",
  },
];

const pricing = [
  {
    name: "Free",
    price: "$0",
    period: "/month",
    desc: "Try it out",
    quota: "10 descriptions/month",
    features: [
      "Single product generation",
      "All platforms supported",
      "Basic SEO keywords",
      "Copy to clipboard",
    ],
    cta: "Get Started Free",
    popular: false,
    href: "/app",
  },
  {
    name: "Starter",
    price: "$19",
    period: "/month",
    desc: "For growing stores",
    quota: "100 descriptions/month",
    features: [
      "Everything in Free",
      "Bulk CSV upload",
      "Brand voice customization",
      "Priority generation",
      "CSV export",
    ],
    cta: "Start Starter",
    popular: true,
    href: "#",
  },
  {
    name: "Pro",
    price: "$49",
    period: "/month",
    desc: "Unlimited power",
    quota: "Unlimited descriptions",
    features: [
      "Everything in Starter",
      "Unlimited generations",
      "API access",
      "Custom templates",
      "Priority support",
      "Team collaboration",
    ],
    cta: "Go Pro",
    popular: false,
    href: "#",
  },
];

export default function LandingPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("");

  const handlePricingClick = (plan: typeof pricing[0]) => {
    // Track the click
    fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        event: "pricing_click",
        product: "copyforge",
        plan: plan.name.toLowerCase(),
      }),
    }).catch(() => {});

    if (plan.href === "/app") {
      window.location.href = "/app";
      return;
    }

    setSelectedPlan(plan.name);
    setModalOpen(true);
  };

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-pink-50" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-28">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 rounded-full px-4 py-1.5 mb-6">
              <Sparkles className="w-4 h-4 text-brand-blue" />
              <span className="text-sm font-medium text-brand-blue">
                Powered by AI
              </span>
            </div>

            <h1 className="font-heading font-extrabold text-5xl sm:text-6xl lg:text-7xl text-brand-text leading-tight mb-6">
              Product descriptions
              <br />
              that{" "}
              <span className="text-brand-blue relative">
                sell
                <svg
                  className="absolute -bottom-2 left-0 w-full"
                  viewBox="0 0 200 12"
                  fill="none"
                >
                  <path
                    d="M2 8C40 2 100 2 198 8"
                    stroke="#EC4899"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              . At scale.
            </h1>

            <p className="text-xl text-gray-500 max-w-2xl mx-auto mb-10 font-body">
              Generate SEO-optimized descriptions, bullet points, and meta tags
              for Shopify, Amazon, Etsy — in seconds. One product or thousands.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/app" className="btn-primary text-lg px-8 py-4">
                <Zap className="w-5 h-5" />
                Start Generating — Free
              </Link>
              <Link href="#how-it-works" className="btn-secondary text-lg px-8 py-4">
                See How It Works
              </Link>
            </div>

            <p className="text-sm text-gray-400 mt-4">
              No signup required · 10 free descriptions/month
            </p>
          </div>

          {/* Demo Preview */}
          <div className="mt-16 max-w-4xl mx-auto">
            <div className="card shadow-xl border-gray-200 overflow-hidden">
              <div className="flex items-center gap-2 pb-4 border-b border-gray-100">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
                <span className="ml-2 text-xs text-gray-400 font-mono">
                  copyforge.app
                </span>
              </div>
              <div className="grid md:grid-cols-2 gap-6 pt-4">
                <div className="space-y-3">
                  <div className="bg-gray-50 rounded-btn p-3">
                    <p className="text-xs text-gray-400 mb-1">Product Name</p>
                    <p className="text-sm font-medium">Organic Cotton Tote Bag</p>
                  </div>
                  <div className="bg-gray-50 rounded-btn p-3">
                    <p className="text-xs text-gray-400 mb-1">Features</p>
                    <p className="text-sm">100% organic cotton, reinforced handles, machine washable, 15L capacity</p>
                  </div>
                  <div className="bg-gray-50 rounded-btn p-3">
                    <p className="text-xs text-gray-400 mb-1">Platform</p>
                    <p className="text-sm font-medium text-brand-blue">Shopify</p>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-blue-50 to-pink-50 rounded-btn p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="w-4 h-4 text-brand-blue" />
                    <p className="text-xs font-semibold text-brand-blue">AI Generated</p>
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    Carry your essentials in style with our Organic Cotton Tote Bag. Crafted from 100% certified organic cotton, this eco-friendly bag features reinforced handles for lasting durability...
                  </p>
                  <div className="flex gap-1 mt-3 flex-wrap">
                    <span className="keyword-highlight text-xs">organic</span>
                    <span className="keyword-highlight text-xs">eco-friendly</span>
                    <span className="keyword-highlight text-xs">sustainable</span>
                    <span className="keyword-highlight text-xs">tote bag</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="how-it-works" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-heading font-bold text-4xl text-brand-text mb-4">
              Three steps to perfect copy
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              From product details to published descriptions in under a minute.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step) => (
              <div key={step.step} className="text-center group">
                <div className="relative inline-flex mb-6">
                  <div className="w-20 h-20 bg-blue-50 rounded-2xl flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                    <step.icon className="w-10 h-10 text-brand-blue" />
                  </div>
                  <span className="absolute -top-2 -right-2 bg-brand-pink text-white text-xs font-bold w-7 h-7 rounded-full flex items-center justify-center">
                    {step.step}
                  </span>
                </div>
                <h3 className="font-heading font-bold text-xl mb-2">{step.title}</h3>
                <p className="text-gray-500">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="badge-pink mb-4 inline-block">Features</span>
            <h2 className="font-heading font-bold text-4xl text-brand-text mb-4">
              Everything you need to scale your store
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              Built for e-commerce sellers who need quality descriptions fast.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="card hover:shadow-md hover:border-blue-100 transition-all duration-200 group"
              >
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-100 transition-colors">
                  <feature.icon className="w-6 h-6 text-brand-blue" />
                </div>
                <h3 className="font-heading font-bold text-lg mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-500 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-heading font-bold text-4xl text-brand-text mb-4">
              Simple, transparent pricing
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              Start free. Upgrade when you need more.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {pricing.map((plan) => (
              <div
                key={plan.name}
                className={`card relative ${
                  plan.popular
                    ? "border-brand-blue border-2 shadow-lg shadow-blue-100"
                    : ""
                }`}
              >
                {plan.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 badge-pink">
                    Most Popular
                  </span>
                )}
                <div className="mb-6">
                  <h3 className="font-heading font-bold text-xl mb-1">
                    {plan.name}
                  </h3>
                  <p className="text-sm text-gray-400">{plan.desc}</p>
                </div>
                <div className="mb-6">
                  <span className="font-heading font-extrabold text-4xl text-brand-text">
                    {plan.price}
                  </span>
                  <span className="text-gray-400">{plan.period}</span>
                  <p className="text-sm text-brand-blue font-medium mt-1">
                    {plan.quota}
                  </p>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-gray-600">
                      <Check className="w-4 h-4 text-brand-blue shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => handlePricingClick(plan)}
                  className={`w-full justify-center ${
                    plan.popular ? "btn-primary" : "btn-secondary"
                  }`}
                >
                  {plan.cta}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="card bg-gradient-to-br from-brand-blue to-blue-700 border-0 py-16 px-8">
            <h2 className="font-heading font-bold text-4xl text-white mb-4">
              Ready to supercharge your product listings?
            </h2>
            <p className="text-blue-100 text-lg mb-8 max-w-xl mx-auto">
              Join thousands of sellers using CopyForge to create compelling
              descriptions that convert.
            </p>
            <Link
              href="/app"
              className="bg-white text-brand-blue px-8 py-4 rounded-btn font-semibold text-lg hover:bg-blue-50 transition-colors inline-flex items-center gap-2"
            >
              <Zap className="w-5 h-5" />
              Start Generating — It&apos;s Free
            </Link>
          </div>
        </div>
      </section>

      <PricingModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        planName={selectedPlan}
      />
    </>
  );
}
