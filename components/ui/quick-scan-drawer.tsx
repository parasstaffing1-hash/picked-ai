'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, Zap, Globe, Mail, Sparkles, AlertCircle } from 'lucide-react';
import { SupportedLanguage } from '@/types/scanner';

interface QuickScanDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (url: string, email: string) => Promise<void>;
  isLoading: boolean;
  language?: SupportedLanguage;
}

const presets = [
  { name: 'Veriff', url: 'https://veriff.com' },
  { name: 'Wise', url: 'https://wise.com' },
  { name: 'Pipedrive', url: 'https://pipedrive.com' },
  { name: 'Kliinik 32', url: 'https://kliinik32.ee' },
  { name: 'Confido', url: 'https://confido.ee' },
  { name: 'Sorainen', url: 'https://sorainen.com' },
];

export const QuickScanDrawer: React.FC<QuickScanDrawerProps> = ({
  isOpen,
  onClose,
  onSubmit,
  isLoading,
  language = 'en',
}) => {
  const [url, setUrl] = useState('');
  const [email, setEmail] = useState('');
  const [formError, setFormError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!url.trim()) {
      setFormError(language === 'et' ? 'Sisestage veebiaadress.' : 'Please enter a website URL.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setFormError(language === 'et' ? 'Sisestage kehtiv e-posti aadress.' : 'Please enter a valid work email.');
      return;
    }

    try {
      await onSubmit(url.trim(), email.trim());
      onClose();
    } catch (err: any) {
      setFormError(err.message || 'Failed to start scan.');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-xl"
          />

          {/* Dialog Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-xl rounded-2xl md:rounded-3xl border border-white/[0.12] bg-[#0a0a0a] p-6 sm:p-8 md:p-10 shadow-2xl text-[#E1E0CC] z-10 overflow-hidden"
          >
            {/* Film Grain & Top Gradient Accent */}
            <div className="noise-overlay pointer-events-none absolute inset-0 opacity-30" />
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 via-[#E1E0CC] to-amber-300" />

            {/* Header */}
            <div className="flex items-center justify-between pb-6 border-b border-white/[0.08]">
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
                <h3 className="text-lg sm:text-xl font-medium tracking-tight text-white">
                  {language === 'et' ? 'Käivita Tehisintellekti Audit' : 'Initiate Model Audit'}
                </h3>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="p-1.5 rounded-full text-[#E1E0CC]/50 hover:text-white hover:bg-white/[0.08] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              {formError && (
                <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{formError}</span>
                </div>
              )}

              {/* Website URL */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[#E1E0CC]/60 mb-2">
                  {language === 'et' ? 'Ettevõtte veebileht' : 'Target Website URL'}
                </label>
                <div className="relative">
                  <Globe className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#E1E0CC]/40" />
                  <input
                    type="text"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="https://company.com"
                    disabled={isLoading}
                    className="w-full rounded-xl bg-white/[0.04] border border-white/[0.1] px-4 py-3 pl-10 text-sm text-white placeholder-[#E1E0CC]/30 focus:border-amber-400/80 focus:outline-none focus:ring-1 focus:ring-amber-400 transition-all font-mono"
                  />
                </div>
              </div>

              {/* Work Email */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[#E1E0CC]/60 mb-2">
                  {language === 'et' ? 'Töö e-post (raporti saamiseks)' : 'Work Email (For Dispatch)'}
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#E1E0CC]/40" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="alex@company.com"
                    disabled={isLoading}
                    className="w-full rounded-xl bg-white/[0.04] border border-white/[0.1] px-4 py-3 pl-10 text-sm text-white placeholder-[#E1E0CC]/30 focus:border-amber-400/80 focus:outline-none focus:ring-1 focus:ring-amber-400 transition-all font-mono"
                  />
                </div>
              </div>

              {/* Preset Quick Picks */}
              <div className="pt-2">
                <span className="text-[10px] uppercase font-mono tracking-wider text-[#E1E0CC]/40 block mb-2">
                  Quick Benchmark Presets:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {presets.map((p) => (
                    <button
                      key={p.name}
                      type="button"
                      onClick={() => setUrl(p.url)}
                      className="px-2.5 py-1 rounded-full bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.08] text-[11px] font-mono text-[#E1E0CC]/70 hover:text-white transition-colors cursor-pointer"
                    >
                      {p.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full group flex items-center justify-center gap-2 rounded-full bg-[#E1E0CC] hover:bg-white text-[#050505] p-3 text-sm font-semibold transition-all hover:shadow-[0_0_24px_rgba(225,224,204,0.3)] disabled:opacity-50 cursor-pointer"
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-[#050505] border-t-transparent rounded-full animate-spin" />
                      <span>{language === 'et' ? 'Käivitan auditit...' : 'Queuing Multi-Engine Audit...'}</span>
                    </div>
                  ) : (
                    <>
                      <span>{language === 'et' ? 'Käivita täielik audit' : 'Launch 30-Prompt Audit'}</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </div>

              <div className="text-center pt-2">
                <span className="text-[11px] text-[#E1E0CC]/40 font-mono">
                  Multi-Engine: ChatGPT 4o • Google Gemini 1.5 • Google AI Overviews
                </span>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
