'use client';

import React from 'react';
import { Cpu, ShieldCheck, CheckCircle2, TrendingUp, Globe, Bot } from 'lucide-react';

interface EngineDetail {
  id: string;
  name: string;
  version: string;
  score: number;
  delta: string;
  modelArchitecture: string;
  groundingMethod: string;
  refreshCycle: string;
  primaryStrengths: string[];
  vulnerabilities: string[];
}

const engineDetails: EngineDetail[] = [
  {
    id: 'openai',
    name: 'OpenAI ChatGPT',
    version: 'GPT-4o (2024-11-20) / o3-mini',
    score: 82,
    delta: '+8.4%',
    modelArchitecture: 'Dense Transformer with RLHF & Web Browsing Tooling',
    groundingMethod: 'Pre-training vector distribution + Bing Search retrieval',
    refreshCycle: 'Continuous browse synthesis with monthly model fine-tunes',
    primaryStrengths: [
      'Comprehensive comparative analysis',
      'Strong memory of recognized global brands',
      'High affirmative recommendation confidence',
    ],
    vulnerabilities: [
      'Older training weights prioritize 2022-2023 incumbents',
      'Requires explicit third-party press proof to update consensus',
    ],
  },
  {
    id: 'gemini',
    name: 'Google Gemini',
    version: 'Gemini 1.5 Pro / Flash',
    score: 76,
    delta: '+4.1%',
    modelArchitecture: 'Mixture of Experts (MoE) with 2M token context window',
    groundingMethod: 'Google Knowledge Graph + Google Search Grounding Tool',
    refreshCycle: 'Real-time grounding against indexed web domains',
    primaryStrengths: [
      'Verified Google Knowledge Graph entity mapping',
      'Rapid indexing of new structured Schema.org markup',
      'Direct link citations included in conversational summaries',
    ],
    vulnerabilities: [
      'Penalizes domains lacking verified Wikipedia/Wikidata entities',
      'Occasional truncation of Baltic and regional service providers',
    ],
  },
  {
    id: 'google_aio',
    name: 'Google AI Overviews',
    version: 'Search Generative Experience (SGE)',
    score: 69,
    delta: '-2.7%',
    modelArchitecture: 'Query Intent Classifier + Multi-Page Extractive LLM',
    groundingMethod: 'Top-10 organic Google SERP snippet extraction & clustering',
    refreshCycle: 'Per-query live generation (zero-click search)',
    primaryStrengths: [
      'Visible at the very top of Google Search on high-intent terms',
      'Direct prominent citation cards with brand logo and link',
    ],
    vulnerabilities: [
      'High volatility based on daily core search algorithm updates',
      'Frequently cites aggregator comparison portals over brand sites',
    ],
  },
];

export const ConsoleEngines: React.FC = () => {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <span className="text-[10px] font-mono uppercase tracking-widest text-[#E8B400] block mb-1">
          NEURAL INFRASTRUCTURE
        </span>
        <h2 className="text-2xl sm:text-3xl font-normal text-white">Engine Coverage & Diagnostics</h2>
      </div>

      {/* Engine Detailed Cards */}
      <div className="space-y-8">
        {engineDetails.map((engine) => (
          <div
            key={engine.id}
            className="p-6 sm:p-10 rounded-2xl bg-[#0A0A09] border border-[rgba(232,230,213,0.10)] space-y-8"
          >
            {/* Top Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[rgba(232,230,213,0.08)]">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-2 h-2 rounded-full bg-[#E8B400]" />
                  <span className="text-xs font-mono uppercase tracking-widest text-[#E8B400]">
                    {engine.version}
                  </span>
                </div>
                <h3 className="text-2xl font-normal text-white">{engine.name}</h3>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-right">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[rgba(232,230,213,0.40)] block">
                    Score
                  </span>
                  <span className="font-mono text-3xl font-light text-white">
                    {engine.score}<span className="text-xs text-[rgba(232,230,213,0.30)]">/100</span>
                  </span>
                </div>
                <div className="px-3 py-1 rounded-full bg-white/[0.04] border border-[rgba(232,230,213,0.10)] font-mono text-xs text-[#E8B400]">
                  {engine.delta}
                </div>
              </div>
            </div>

            {/* Architecture Details */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs font-mono">
              <div className="p-4 rounded-xl bg-white/[0.02] border border-[rgba(232,230,213,0.06)]">
                <span className="text-[10px] uppercase text-[rgba(232,230,213,0.40)] block mb-1">
                  Model Architecture
                </span>
                <p className="text-[rgba(232,230,213,0.80)] font-light leading-relaxed">
                  {engine.modelArchitecture}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.02] border border-[rgba(232,230,213,0.06)]">
                <span className="text-[10px] uppercase text-[rgba(232,230,213,0.40)] block mb-1">
                  Grounding Method
                </span>
                <p className="text-[rgba(232,230,213,0.80)] font-light leading-relaxed">
                  {engine.groundingMethod}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.02] border border-[rgba(232,230,213,0.06)]">
                <span className="text-[10px] uppercase text-[rgba(232,230,213,0.40)] block mb-1">
                  Refresh Cadence
                </span>
                <p className="text-[rgba(232,230,213,0.80)] font-light leading-relaxed">
                  {engine.refreshCycle}
                </p>
              </div>
            </div>

            {/* Strengths & Vulnerabilities */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              <div className="space-y-2">
                <span className="text-[11px] font-mono uppercase tracking-widest text-emerald-400 block">
                  Observed Recommendation Drivers
                </span>
                <ul className="space-y-1.5 text-xs text-[rgba(232,230,213,0.70)] font-light">
                  {engine.primaryStrengths.map((s, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-2">
                <span className="text-[11px] font-mono uppercase tracking-widest text-[#E8B400] block">
                  Observed Vulnerabilities & Blind Spots
                </span>
                <ul className="space-y-1.5 text-xs text-[rgba(232,230,213,0.70)] font-light">
                  {engine.vulnerabilities.map((v, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#E8B400] mt-1.5 shrink-0" />
                      <span>{v}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
