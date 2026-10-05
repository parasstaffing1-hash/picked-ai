'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Globe, Building2, MapPin, Target, Sparkles } from 'lucide-react';

interface AuditExperienceProps {
  language?: string;
  onOpenScan?: () => void;
  onSubmitScan?: (url: string, email: string) => Promise<void>;
}

export const AuditExperienceSection: React.FC<AuditExperienceProps> = ({
  language = 'en',
  onOpenScan,
  onSubmitScan,
}) => {
  const [website, setWebsite] = useState('https://veriff.com');
  const [industry, setIndustry] = useState('Identity Verification & AI Fraud');
  const [location, setLocation] = useState('Tallinn, Estonia • Global Online');
  const [targetMarket, setTargetMarket] = useState('Enterprise FinTech & Regulated SaaS');

  return (
    <section
      id="audit-tool"
      className="relative w-full py-24 sm:py-36 px-4 sm:px-6 lg:px-12 bg-[#050505] border-t border-[rgba(232,230,213,0.08)]"
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-14 sm:pb-20 border-b border-[rgba(232,230,213,0.10)]">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#E8E6D5]/40">
                07 / DIAGNOSTIC ENGINE
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-[#E8E6D5]">
              {language === 'et' ? 'Käivita Audit' : 'Audit Initiation'}
            </h2>
          </div>
          <p className="max-w-md text-xs sm:text-sm md:text-base text-[rgba(232,230,213,0.62)] font-light leading-relaxed">
            {language === 'et'
              ? 'Täpsusta oma ettevõtte parameetrid ja lase tehisintellekti paneelil teostada 30-päringuline test.'
              : 'Configure your entity perimeter and execute an autonomous 30-prompt multi-model probe.'}
          </p>
        </div>

        {/* Console Box Form */}
        <div className="mt-12 sm:mt-16 max-w-4xl mx-auto rounded-2xl md:rounded-3xl border border-[rgba(232,230,213,0.14)] bg-[#0A0A09] p-6 sm:p-10 md:p-14 shadow-2xl relative overflow-hidden">
          <div className="noise-overlay pointer-events-none absolute inset-0 opacity-40" />

          {/* Top Command Bar */}
          <div className="flex items-center justify-between pb-8 border-b border-[rgba(232,230,213,0.08)] text-xs font-mono">
            <div className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-[#E8B400] animate-pulse" />
              <span className="text-[#E8E6D5] uppercase tracking-widest">
                Target Entity Parameter Setup
              </span>
            </div>
            <span className="text-[rgba(232,230,213,0.40)] hidden sm:inline">
              Multi-Engine Ready: 3 Systems
            </span>
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-8">
            {/* Field 1: Website */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-wider text-[rgba(232,230,213,0.60)]">
                <Globe className="w-3.5 h-3.5 text-[#E8B400]" />
                <span>Target Website</span>
              </label>
              <input
                type="text"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                className="w-full rounded-xl bg-white/[0.03] border border-[rgba(232,230,213,0.10)] px-4 py-3 text-sm font-mono text-white focus:border-[#E8B400] focus:outline-none transition-colors"
              />
            </div>

            {/* Field 2: Industry */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-wider text-[rgba(232,230,213,0.60)]">
                <Building2 className="w-3.5 h-3.5 text-[#E8B400]" />
                <span>Primary Industry / Domain</span>
              </label>
              <input
                type="text"
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                className="w-full rounded-xl bg-white/[0.03] border border-[rgba(232,230,213,0.10)] px-4 py-3 text-sm font-mono text-white focus:border-[#E8B400] focus:outline-none transition-colors"
              />
            </div>

            {/* Field 3: Location */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-wider text-[rgba(232,230,213,0.60)]">
                <MapPin className="w-3.5 h-3.5 text-[#E8B400]" />
                <span>Headquarters / Geo Focus</span>
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full rounded-xl bg-white/[0.03] border border-[rgba(232,230,213,0.10)] px-4 py-3 text-sm font-mono text-white focus:border-[#E8B400] focus:outline-none transition-colors"
              />
            </div>

            {/* Field 4: Target Market */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-wider text-[rgba(232,230,213,0.60)]">
                <Target className="w-3.5 h-3.5 text-[#E8B400]" />
                <span>Key Commercial Intent</span>
              </label>
              <input
                type="text"
                value={targetMarket}
                onChange={(e) => setTargetMarket(e.target.value)}
                className="w-full rounded-xl bg-white/[0.03] border border-[rgba(232,230,213,0.10)] px-4 py-3 text-sm font-mono text-white focus:border-[#E8B400] focus:outline-none transition-colors"
              />
            </div>
          </div>

          {/* Action Trigger */}
          <div className="mt-10 pt-8 border-t border-[rgba(232,230,213,0.08)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="text-xs font-mono text-[rgba(232,230,213,0.40)]">
              Outputs full diagnostic report & sends executive PDF to your inbox
            </div>

            <button
              type="button"
              onClick={onOpenScan}
              className="group inline-flex items-center justify-center gap-3 rounded-full bg-[#E8E6D5] hover:bg-white text-[#050505] px-6 py-3 text-sm font-semibold transition-all hover:scale-105 cursor-pointer shadow-[0_0_24px_rgba(232,230,213,0.2)]"
            >
              <span>RUN AI VISIBILITY AUDIT</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
