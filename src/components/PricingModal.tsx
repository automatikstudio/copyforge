"use client";

import { X, Sparkles } from "lucide-react";

interface PricingModalProps {
  isOpen: boolean;
  onClose: () => void;
  planName: string;
}

export default function PricingModal({ isOpen, onClose, planName }: PricingModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-white rounded-card shadow-2xl max-w-md w-full p-8 animate-in">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center">
          <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <Sparkles className="w-8 h-8 text-brand-blue" />
          </div>

          <h3 className="font-heading font-bold text-2xl text-brand-text mb-2">
            Coming Soon!
          </h3>

          <p className="text-gray-500 mb-6">
            The <span className="font-semibold text-brand-blue">{planName}</span> plan
            is launching soon. We&apos;ll notify you when it&apos;s ready.
          </p>

          <div className="bg-blue-50 rounded-btn p-4 mb-6">
            <p className="text-sm text-brand-blue font-medium">
              🎉 In the meantime, enjoy the free tier with 10 descriptions per month!
            </p>
          </div>

          <button onClick={onClose} className="btn-primary w-full justify-center">
            Got it!
          </button>
        </div>
      </div>
    </div>
  );
}
