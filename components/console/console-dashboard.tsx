'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
} from 'lucide-react';

export const ConsoleDashboard: React.FC<{
  onOpenAuditWizard?: () => void;
  onNavigateTab?: (tab: string) => void;
}> = ({ onOpenAuditWizard, onNavigateTab }) => {
  const [timeRange, setTimeRange] = useState<'7D' | '30D' | '90D' | '1Y'>('30D');
  const [activeMetric, setActiveMetric] = useState<'visibility' | 'recommendation' | 'citation'>('visibility');

  return (
    <div className="space-y-10">
      {/* Visual Center: Monolithic Picked Score */}
      <div className="p-8 sm:p-12 rounded-3xl bg-[#0A0A09] border border-[rgba(232,230,213,0.12)] relative overflow-hidden shadow-2xl">
        <div className="noise-overlay pointer-events-none absolute inset-0 opacity-25" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-8 border-b border-[rgba(232,230,213,0.08)]">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-[#E8B400] animate-pulse" />
              <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#E8B400]">
                Active Entity Telemetry: Veriff Global
              </span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-normal tracking-tight text-[#E8E6D5]">
              PICKED SCORE
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onOpenAuditWizard}
              className="inline-flex items-center gap-2 rounded-full bg-[#E8E6D5] hover:bg-white text-[#050505] px-5 py-2 text-xs font-mono font-semibold transition-all hover:scale-105 cursor-pointer"
            >
              <span>RUN REAL-TIME AUDIT</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Monolithic Number & 4 Core Signals */}
        <div className="relative z-10 grid grid-cols-12 gap-8 pt-8 items-baseline">
          <div className="col-span-12 lg:col-span-5 flex items-baseline">
            <span className="font-mono text-8xl sm:text-9xl font-light tracking-[-0.08em] text-white leading-none">
              84
            </span>
            <span className="font-mono text-xl sm:text-3xl text-[rgba(232,230,213,0.30)] ml-3 font-light">
              / 100
            </span>
            <div className="ml-6 px-3 py-1 rounded-full bg-[#E8B400]/10 border border-[#E8B400]/30 text-[#E8B400] text-xs font-mono">
              Grade A-
            </div>
          </div>

          <div className="col-span-12 lg:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 pt-4 lg:pt-0">
            {/* Metric 1 */}
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-[rgba(232,230,213,0.06)]">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[rgba(232,230,213,0.40)] block mb-1">
                AI Visibility
              </span>
              <span className="font-mono text-2xl sm:text-3xl font-light text-white block">
                82%
              </span>
              <span className="text-[11px] font-mono text-[#E8B400] mt-1 flex items-center gap-0.5">
                <TrendingUp className="w-3 h-3" /> +4.2%
              </span>
            </div>

            {/* Metric 2 */}
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-[rgba(232,230,213,0.06)]">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[rgba(232,230,213,0.40)] block mb-1">
                Recommendation
              </span>
              <span className="font-mono text-2xl sm:text-3xl font-light text-white block">
                76%
              </span>
              <span className="text-[11px] font-mono text-[#E8B400] mt-1 flex items-center gap-0.5">
                <TrendingUp className="w-3 h-3" /> +6.0%
              </span>
            </div>

            {/* Metric 3 */}
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-[rgba(232,230,213,0.06)]">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[rgba(232,230,213,0.40)] block mb-1">
                Citation Strength
              </span>
              <span className="font-mono text-2xl sm:text-3xl font-light text-white block">
                71%
              </span>
              <span className="text-[11px] font-mono text-[rgba(232,230,213,0.40)] mt-1 flex items-center gap-0.5">
                <TrendingDown className="w-3 h-3" /> -1.2%
              </span>
            </div>

            {/* Metric 4 */}
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-[rgba(232,230,213,0.06)]">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#E8B400] block mb-1">
                Position
              </span>
              <span className="font-mono text-2xl sm:text-3xl font-light text-[#E8B400] block">
                #2
              </span>
              <span className="text-[11px] font-mono text-[rgba(232,230,213,0.40)] mt-1">
                Category Rank
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Engine Performance Telemetry Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* ChatGPT */}
        <div className="p-6 rounded-2xl bg-[#0A0A09] border border-[rgba(232,230,213,0.10)]">
          <div className="flex items-center justify-between text-xs font-mono text-[rgba(232,230,213,0.40)] mb-3">
            <span>ENGINE 01</span>
            <span className="text-[#E8B400] flex items-center gap-0.5">
              <TrendingUp className="w-3 h-3" /> +8.4%
            </span>
          </div>
          <h3 className="text-xl font-normal text-white">CHATGPT</h3>
          <div className="my-4 flex items-baseline gap-2">
            <span className="font-mono text-5xl font-light text-[#E8E6D5]">82</span>
            <span className="font-mono text-xs text-[rgba(232,230,213,0.30)]">/ 100</span>
          </div>
          <p className="text-xs text-[rgba(232,230,213,0.60)] font-light">
            Strongest performance across FinTech identity verification prompts.
          </p>
        </div>

        {/* Gemini */}
        <div className="p-6 rounded-2xl bg-[#0A0A09] border border-[rgba(232,230,213,0.10)]">
          <div className="flex items-center justify-between text-xs font-mono text-[rgba(232,230,213,0.40)] mb-3">
            <span>ENGINE 02</span>
            <span className="text-[#E8B400] flex items-center gap-0.5">
              <TrendingUp className="w-3 h-3" /> +4.1%
            </span>
          </div>
          <h3 className="text-xl font-normal text-white">GEMINI</h3>
          <div className="my-4 flex items-baseline gap-2">
            <span className="font-mono text-5xl font-light text-[#E8E6D5]">76</span>
            <span className="font-mono text-xs text-[rgba(232,230,213,0.30)]">/ 100</span>
          </div>
          <p className="text-xs text-[rgba(232,230,213,0.60)] font-light">
            Grounded via Google Knowledge Graph and Wikipedia corporate entity records.
          </p>
        </div>

        {/* Google AI Overviews */}
        <div className="p-6 rounded-2xl bg-[#0A0A09] border border-[rgba(232,230,213,0.10)]">
          <div className="flex items-center justify-between text-xs font-mono text-[rgba(232,230,213,0.40)] mb-3">
            <span>ENGINE 03</span>
            <span className="text-[rgba(232,230,213,0.40)] flex items-center gap-0.5">
              <TrendingDown className="w-3 h-3" /> -2.7%
            </span>
          </div>
          <h3 className="text-xl font-normal text-white">GOOGLE AI OVERVIEWS</h3>
          <div className="my-4 flex items-baseline gap-2">
            <span className="font-mono text-5xl font-light text-[#E8E6D5]">69</span>
            <span className="font-mono text-xs text-[rgba(232,230,213,0.30)]">/ 100</span>
          </div>
          <p className="text-xs text-[rgba(232,230,213,0.60)] font-light">
            Citation gaps present in Baltic travel and compliance directory searches.
          </p>
        </div>
      </div>

      {/* Visibility Trend Analytics Visualization */}
      <div className="p-6 sm:p-8 rounded-2xl bg-[#0A0A09] border border-[rgba(232,230,213,0.10)]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[rgba(232,230,213,0.08)]">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#E8B400] block mb-1">
              HISTORICAL TELEMETRY
            </span>
            <h3 className="text-lg font-normal text-white">Algorithmic Visibility Trajectory</h3>
          </div>

          <div className="flex items-center gap-2">
            {/* Filter buttons */}
            {(['7D', '30D', '90D', '1Y'] as const).map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setTimeRange(r)}
                className={`px-3 py-1 rounded-md text-xs font-mono transition-colors ${
                  timeRange === r
                    ? 'bg-[#E8E6D5] text-[#050505] font-semibold'
                    : 'bg-white/[0.04] text-[rgba(232,230,213,0.60)] hover:text-white'
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        {/* Minimal Editorial Trend Chart (SVG) */}
        <div className="pt-8">
          <div className="h-48 w-full relative">
            {/* Horizontal Grid lines */}
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-20">
              <div className="border-b border-white" />
              <div className="border-b border-white" />
              <div className="border-b border-white" />
              <div className="border-b border-white" />
            </div>

            {/* SVG Trend Line */}
            <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 500 150">
              <defs>
                <linearGradient id="trendGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#E8B400" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#E8B400" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              <path
                d="M 0,110 Q 70,100 120,85 T 250,70 T 380,45 T 500,25 L 500,150 L 0,150 Z"
                fill="url(#trendGradient)"
              />

              <path
                d="M 0,110 Q 70,100 120,85 T 250,70 T 380,45 T 500,25"
                fill="none"
                stroke="#E8B400"
                strokeWidth="2.5"
                strokeLinecap="round"
              />

              {/* Data points */}
              <circle cx="120" cy="85" r="4" fill="#E8B400" />
              <circle cx="250" cy="70" r="4" fill="#E8B400" />
              <circle cx="380" cy="45" r="4" fill="#E8B400" />
              <circle cx="500" cy="25" r="5" fill="#E8E6D5" stroke="#050505" strokeWidth="2" />
            </svg>
          </div>

          <div className="flex items-center justify-between text-[11px] font-mono text-[rgba(232,230,213,0.40)] mt-4 pt-2 border-t border-[rgba(232,230,213,0.06)]">
            <span>Day 0 (Initial Audit: 62%)</span>
            <span>Day 10 (Schema Injected: 71%)</span>
            <span>Day 20 (Citations Grounded: 78%)</span>
            <span className="text-[#E8B400] font-semibold">Today: 84% (+22pts)</span>
          </div>
        </div>
      </div>
    </div>
  );
};
