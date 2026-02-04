"use client";

import { useState, useRef } from "react";
import {
  Zap,
  Copy,
  Check,
  Upload,
  FileText,
  Sparkles,
  Loader2,
  AlertCircle,
  ChevronDown,
} from "lucide-react";

type Platform = "shopify" | "amazon" | "etsy" | "general";

interface GeneratedContent {
  description: string;
  bullets: string[];
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  wordCount: number;
}

type TabId = "single" | "bulk";

export default function AppPage() {
  const [activeTab, setActiveTab] = useState<TabId>("single");
  const [productName, setProductName] = useState("");
  const [features, setFeatures] = useState("");
  const [category, setCategory] = useState("");
  const [platform, setPlatform] = useState<Platform>("shopify");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<GeneratedContent | null>(null);
  const [copied, setCopied] = useState<string | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const handleGenerate = async () => {
    if (!productName.trim() || !features.trim()) {
      setError("Please fill in the product name and features.");
      return;
    }

    setError("");
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productName: productName.trim(),
          features: features.trim(),
          category: category.trim(),
          platform,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Generation failed. Please try again.");
      }

      const data = await res.json();
      setResult(data);

      // Track generation
      fetch("/api/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          event: "generate",
          product: "copyforge",
          platform,
        }),
      }).catch(() => {});

      // Scroll to results
      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async (text: string, label: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(null), 2000);
  };

  const copyAll = () => {
    if (!result) return;
    const fullText = `${result.description}\n\n${result.bullets.map((b) => `• ${b}`).join("\n")}\n\nMeta Title: ${result.metaTitle}\nMeta Description: ${result.metaDescription}\n\nKeywords: ${result.keywords.join(", ")}`;
    handleCopy(fullText, "all");
  };

  const tabs: { id: TabId; label: string; icon: typeof FileText }[] = [
    { id: "single", label: "Single Product", icon: FileText },
    { id: "bulk", label: "Bulk Upload", icon: Upload },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="font-heading font-bold text-3xl text-brand-text mb-2">
          Generate Product Copy
        </h1>
        <p className="text-gray-500">
          Enter your product details and let AI create compelling descriptions.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 rounded-btn p-1 w-fit mb-8">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-md text-sm font-medium transition-all ${
              activeTab === tab.id
                ? "bg-white text-brand-blue shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Single Product Tab */}
      {activeTab === "single" && (
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <div className="card">
            <h2 className="font-heading font-bold text-lg mb-6 flex items-center gap-2">
              <FileText className="w-5 h-5 text-brand-blue" />
              Product Details
            </h2>

            <div className="space-y-5">
              {/* Product Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Product Name <span className="text-brand-pink">*</span>
                </label>
                <input
                  type="text"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  placeholder="e.g. Organic Cotton Tote Bag"
                  className="w-full border border-gray-200 rounded-btn px-4 py-3 text-sm bg-white"
                />
              </div>

              {/* Features */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Features & Details <span className="text-brand-pink">*</span>
                </label>
                <textarea
                  value={features}
                  onChange={(e) => setFeatures(e.target.value)}
                  placeholder="100% organic cotton, reinforced handles, machine washable, 15L capacity, available in 5 colors..."
                  rows={4}
                  className="w-full border border-gray-200 rounded-btn px-4 py-3 text-sm bg-white resize-none"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Category
                </label>
                <input
                  type="text"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  placeholder="e.g. Bags & Accessories"
                  className="w-full border border-gray-200 rounded-btn px-4 py-3 text-sm bg-white"
                />
              </div>

              {/* Platform */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Target Platform
                </label>
                <div className="relative">
                  <select
                    value={platform}
                    onChange={(e) => setPlatform(e.target.value as Platform)}
                    className="w-full border border-gray-200 rounded-btn px-4 py-3 text-sm bg-white appearance-none cursor-pointer"
                  >
                    <option value="shopify">Shopify</option>
                    <option value="amazon">Amazon</option>
                    <option value="etsy">Etsy</option>
                    <option value="general">General / Other</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Error */}
              {error && (
                <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 rounded-btn p-3">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  {error}
                </div>
              )}

              {/* Generate Button */}
              <button
                onClick={handleGenerate}
                disabled={loading}
                className="btn-primary w-full justify-center py-4 text-base disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Zap className="w-5 h-5" />
                    Generate Description
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Output */}
          <div ref={resultRef}>
            {result ? (
              <div className="card">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-heading font-bold text-lg flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-brand-blue" />
                    Generated Copy
                  </h2>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-gray-400">
                      {result.wordCount} words
                    </span>
                    <button
                      onClick={copyAll}
                      className="text-sm text-brand-blue hover:text-blue-700 font-medium flex items-center gap-1"
                    >
                      {copied === "all" ? (
                        <Check className="w-3.5 h-3.5" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                      Copy All
                    </button>
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Description */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                        Description
                      </h3>
                      <button
                        onClick={() => handleCopy(result.description, "desc")}
                        className="text-xs text-gray-400 hover:text-brand-blue flex items-center gap-1"
                      >
                        {copied === "desc" ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                        Copy
                      </button>
                    </div>
                    <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap bg-gray-50 rounded-btn p-4">
                      {result.description}
                    </p>
                  </div>

                  {/* Bullets */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                        Bullet Points
                      </h3>
                      <button
                        onClick={() =>
                          handleCopy(result.bullets.map((b) => `• ${b}`).join("\n"), "bullets")
                        }
                        className="text-xs text-gray-400 hover:text-brand-blue flex items-center gap-1"
                      >
                        {copied === "bullets" ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                        Copy
                      </button>
                    </div>
                    <ul className="space-y-2 bg-gray-50 rounded-btn p-4">
                      {result.bullets.map((bullet, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                          <span className="text-brand-blue mt-0.5">•</span>
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Meta */}
                  <div>
                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
                      SEO Meta
                    </h3>
                    <div className="bg-gray-50 rounded-btn p-4 space-y-3">
                      <div>
                        <span className="text-xs text-gray-400">Meta Title</span>
                        <p className="text-sm font-medium text-gray-700">{result.metaTitle}</p>
                      </div>
                      <div>
                        <span className="text-xs text-gray-400">Meta Description</span>
                        <p className="text-sm text-gray-700">{result.metaDescription}</p>
                      </div>
                    </div>
                  </div>

                  {/* Keywords */}
                  <div>
                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
                      SEO Keywords
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {result.keywords.map((kw) => (
                        <span key={kw} className="keyword-highlight text-xs">
                          {kw}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="card flex flex-col items-center justify-center text-center py-20">
                <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-4">
                  <Sparkles className="w-8 h-8 text-brand-blue/40" />
                </div>
                <h3 className="font-heading font-bold text-lg text-gray-300 mb-2">
                  Your copy will appear here
                </h3>
                <p className="text-sm text-gray-300">
                  Fill in product details and hit Generate
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Bulk Upload Tab */}
      {activeTab === "bulk" && (
        <div className="card max-w-3xl">
          <h2 className="font-heading font-bold text-lg mb-6 flex items-center gap-2">
            <Upload className="w-5 h-5 text-brand-blue" />
            Bulk CSV Upload
          </h2>

          {/* Upload Area */}
          <div className="border-2 border-dashed border-gray-200 rounded-card p-12 text-center hover:border-brand-blue/30 transition-colors cursor-pointer mb-6">
            <Upload className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="font-medium text-gray-600 mb-1">
              Drag & drop your CSV file here
            </p>
            <p className="text-sm text-gray-400 mb-4">or click to browse</p>
            <p className="text-xs text-gray-300">
              CSV format: product_name, features, category, platform
            </p>
          </div>

          {/* Coming Soon Note */}
          <div className="bg-blue-50 border border-blue-100 rounded-btn p-4 flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-brand-blue shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-brand-blue text-sm">
                Bulk generation coming soon!
              </p>
              <p className="text-sm text-blue-600/70 mt-1">
                We&apos;re polishing the bulk upload experience. For now, use the
                Single Product tab to generate descriptions one at a time. Bulk
                CSV processing will be available with the Starter plan.
              </p>
            </div>
          </div>

          {/* Preview Table Skeleton */}
          <div className="mt-6 opacity-50">
            <div className="bg-gray-50 rounded-btn overflow-hidden">
              <div className="grid grid-cols-4 gap-4 p-3 border-b border-gray-200 text-xs font-semibold text-gray-500 uppercase">
                <span>Product</span>
                <span>Features</span>
                <span>Category</span>
                <span>Status</span>
              </div>
              {[1, 2, 3].map((i) => (
                <div key={i} className="grid grid-cols-4 gap-4 p-3 border-b border-gray-100">
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                  <div className="h-4 bg-gray-200 rounded w-full" />
                  <div className="h-4 bg-gray-200 rounded w-1/2" />
                  <div className="h-4 bg-gray-200 rounded w-1/3" />
                </div>
              ))}
            </div>
            <button disabled className="btn-primary mt-4 opacity-50 cursor-not-allowed">
              <Zap className="w-4 h-4" />
              Generate All
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
