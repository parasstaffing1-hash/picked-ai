'use client';

import React from 'react';
import { ExternalLink, TrendingUp, ShieldCheck } from 'lucide-react';

interface CitationSource {
  source: string;
  type: string;
  authority: number;
  citedBy: string;
  firstSeen: string;
  lastSeen: string;
}

const mockSources: CitationSource[] = [
  {
    source: 'forbes.com/lists/recruiting',
    type: 'Tier-1 Editorial Index',
    authority: 94,
    citedBy: 'ChatGPT, Gemini',
    firstSeen: 'Jan 2026',
    lastSeen: '2h ago',
  },
  {
    source: 'wikipedia.org/wiki/Identity_verification',
    type: 'Knowledge Graph Corpus',
    authority: 98,
    citedBy: 'ChatGPT, Gemini, AIO',
    firstSeen: 'Aug 2025',
    lastSeen: '12m ago',
  },
  {
    source: 'techcrunch.com/fintech-id-leaders',
    type: 'Technology Media',
    authority: 92,
    citedBy: 'ChatGPT, AIO',
    firstSeen: 'Dec 2025',
    lastSeen: '1d ago',
  },
  {
    source: 'hunt-scanlon.com/tech-review',
    type: 'Trade Publication',
    authority: 81,
    citedBy: 'ChatGPT',
    firstSeen: 'Feb 2026',
    lastSeen: '4h ago',
  },
  {
    source: 'legal500.com/dubai-employment',
    type: 'Directory & Ranking',
    authority: 86,
    citedBy: 'Gemini, AIO',
    firstSeen: 'Nov 2025',
    lastSeen: '3d ago',
  },
];

export const ConsoleCitations: React.FC = () => {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <span className="text-[10px] font-mono uppercase tracking-widest text-[#E8B400] block mb-1">
          SOURCE TELEMETRY
        </span>
        <h2 className="text-2xl sm:text-3xl font-normal text-white">Citation Intelligence</h2>
      </div>

      {/* 4 Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="p-6 rounded-2xl bg-[#0A0A09] border border-[rgba(232,230,213,0.10)]">
          <span className="text-[10px] font-mono uppercase tracking-widest text-[rgba(232,230,213,0.40)] block mb-1">
            Total Citations
          </span>
          <span className="font-mono text-4xl sm:text-5xl font-light text-white block">
            142
          </span>
          <span className="text-xs font-mono text-[#E8B400] mt-2 flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" /> +18 this month
          </span>
        </div>

        <div className="p-6 rounded-2xl bg-[#0A0A09] border border-[rgba(232,230,213,0.10)]">
          <span className="text-[10px] font-mono uppercase tracking-widest text-[rgba(232,230,213,0.40)] block mb-1">
            Unique Domains
          </span>
          <span className="font-mono text-4xl sm:text-5xl font-light text-white block">
            38
          </span>
          <span className="text-xs font-mono text-[rgba(232,230,213,0.40)] mt-2 block">
            High Authority Root Domains
          </span>
        </div>

        <div className="p-6 rounded-2xl bg-[#0A0A09] border border-[rgba(232,230,213,0.10)]">
          <span className="text-[10px] font-mono uppercase tracking-widest text-[rgba(232,230,213,0.40)] block mb-1">
            Citation Authority
          </span>
          <span className="font-mono text-4xl sm:text-5xl font-light text-white block">
            89<span className="text-sm text-[rgba(232,230,213,0.30)]">/100</span>
          </span>
          <span className="text-xs font-mono text-emerald-400 mt-2 block">
            Tier-1 Global Trust
          </span>
        </div>

        <div className="p-6 rounded-2xl bg-[#0A0A09] border border-[rgba(232,230,213,0.10)]">
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#E8B400] block mb-1">
            Citation Growth
          </span>
          <span className="font-mono text-4xl sm:text-5xl font-light text-[#E8B400] block">
            +34%
          </span>
          <span className="text-xs font-mono text-[rgba(232,230,213,0.40)] mt-2 block">
            Quarter-over-Quarter
          </span>
        </div>
      </div>

      {/* Sources Table */}
      <div className="rounded-2xl bg-[#0A0A09] border border-[rgba(232,230,213,0.10)] overflow-x-auto shadow-xl">
        <div className="p-6 border-b border-[rgba(232,230,213,0.08)]">
          <h3 className="text-base font-normal text-white">Dominant Citation Sources</h3>
          <p className="text-xs text-[rgba(232,230,213,0.50)] font-light mt-1">
            The external web resources frontier models quote when synthesizing answers about your sector.
          </p>
        </div>

        <table className="w-full text-left border-collapse min-w-[700px]">
          <thead>
            <tr className="border-b border-[rgba(232,230,213,0.08)] text-[11px] font-mono uppercase tracking-widest text-[rgba(232,230,213,0.40)]">
              <th className="py-4 px-6 font-normal">Source</th>
              <th className="py-4 px-4 font-normal">Type</th>
              <th className="py-4 px-4 font-normal">Authority</th>
              <th className="py-4 px-4 font-normal">Cited By</th>
              <th className="py-4 px-4 font-normal">First Seen</th>
              <th className="py-4 px-6 font-normal text-right">Last Seen</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[rgba(232,230,213,0.06)] font-mono text-xs">
            {mockSources.map((item) => (
              <tr key={item.source} className="hover:bg-white/[0.02] transition-colors">
                <td className="py-5 px-6 font-sans text-sm text-[#E8E6D5] flex items-center gap-2">
                  <ExternalLink className="w-3.5 h-3.5 text-[#E8B400]" />
                  <span>{item.source}</span>
                </td>
                <td className="py-5 px-4 text-[rgba(232,230,213,0.70)]">{item.type}</td>
                <td className="py-5 px-4 text-white font-semibold">{item.authority}/100</td>
                <td className="py-5 px-4 text-[#E8B400]">{item.citedBy}</td>
                <td className="py-5 px-4 text-[rgba(232,230,213,0.40)]">{item.firstSeen}</td>
                <td className="py-5 px-6 text-right text-[rgba(232,230,213,0.40)]">
                  {item.lastSeen}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
