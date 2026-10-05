'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface CompetitorData {
  rank: string;
  name: string;
  isYou: boolean;
  visibility: string;
  recommendation: string;
  citation: string;
  avgPosition: string;
  coverage: string;
}

const competitors: CompetitorData[] = [
  {
    rank: '01',
    name: 'Jumio Global',
    isYou: false,
    visibility: '89%',
    recommendation: '81%',
    citation: '84%',
    avgPosition: '#1.4',
    coverage: '28 / 30',
  },
  {
    rank: '02',
    name: 'Your Business (Veriff)',
    isYou: true,
    visibility: '82%',
    recommendation: '76%',
    citation: '71%',
    avgPosition: '#1.8',
    coverage: '25 / 30',
  },
  {
    rank: '03',
    name: 'Onfido (Entrust)',
    isYou: false,
    visibility: '68%',
    recommendation: '59%',
    citation: '64%',
    avgPosition: '#2.6',
    coverage: '21 / 30',
  },
  {
    rank: '04',
    name: 'Trulioo Identity',
    isYou: false,
    visibility: '54%',
    recommendation: '42%',
    citation: '51%',
    avgPosition: '#3.4',
    coverage: '16 / 30',
  },
];

export const CompetitiveIntelligenceSection: React.FC<{ language?: string }> = ({ language = 'en' }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' });

  return (
    <section
      ref={ref}
      id="competitors"
      className="relative w-full py-24 sm:py-36 px-4 sm:px-6 lg:px-12 bg-[#050505] border-t border-[rgba(232,230,213,0.08)]"
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-14 sm:pb-20 border-b border-[rgba(232,230,213,0.10)]">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#E8E6D5]/40">
                06 / COMPARATIVE CONQUEST
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-[#E8E6D5]">
              {language === 'et' ? 'Konkurentsianalüüs' : 'Competitive Telemetry'}
            </h2>
          </div>
          <p className="max-w-md text-xs sm:text-sm md:text-base text-[rgba(232,230,213,0.62)] font-light leading-relaxed">
            {language === 'et'
              ? 'Täpne ülevaade sellest, kuidas mudelid reastavad teie ettevõtte konkurentide suhtes.'
              : 'Direct multi-model benchmark tracking category incumbents across ChatGPT, Gemini, and Google AI Overviews.'}
          </p>
        </div>

        {/* Editorial Table */}
        <div className="pt-8 overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="border-b border-[rgba(232,230,213,0.10)] text-[11px] font-mono uppercase tracking-widest text-[rgba(232,230,213,0.40)]">
                <th className="py-4 font-normal">Rank</th>
                <th className="py-4 font-normal">Entity / Business</th>
                <th className="py-4 font-normal">AI Visibility</th>
                <th className="py-4 font-normal">Recommendation Rate</th>
                <th className="py-4 font-normal">Citation Strength</th>
                <th className="py-4 font-normal">Avg Position</th>
                <th className="py-4 font-normal text-right">Coverage</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[rgba(232,230,213,0.08)] font-mono text-sm">
              {competitors.map((item) => (
                <tr
                  key={item.name}
                  className={`transition-colors ${
                    item.isYou
                      ? 'bg-[#0A0A09] text-white'
                      : 'hover:bg-[#0A0A09]/40 text-[rgba(232,230,213,0.80)]'
                  }`}
                >
                  {/* Rank */}
                  <td className="py-6 sm:py-7">
                    <span
                      className={`text-sm ${
                        item.isYou ? 'text-[#E8B400] font-bold' : 'text-[rgba(232,230,213,0.40)]'
                      }`}
                    >
                      {item.rank}
                    </span>
                  </td>

                  {/* Business Name */}
                  <td className="py-6 sm:py-7 font-sans font-normal text-base sm:text-lg">
                    <div className="flex items-center gap-2">
                      <span className={item.isYou ? 'text-white font-medium' : 'text-[#E8E6D5]'}>
                        {item.name}
                      </span>
                      {item.isYou && (
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#E8B400]/10 border border-[#E8B400]/40 text-[#E8B400] uppercase tracking-wider">
                          Target
                        </span>
                      )}
                    </div>
                  </td>

                  {/* Visibility */}
                  <td className="py-6 sm:py-7 font-mono">{item.visibility}</td>

                  {/* Recommendation Rate */}
                  <td className="py-6 sm:py-7 font-mono">{item.recommendation}</td>

                  {/* Citation Strength */}
                  <td className="py-6 sm:py-7 font-mono">{item.citation}</td>

                  {/* Avg Position */}
                  <td className="py-6 sm:py-7 font-mono text-[#E8B400]">{item.avgPosition}</td>

                  {/* Coverage */}
                  <td className="py-6 sm:py-7 font-mono text-right text-[rgba(232,230,213,0.60)]">
                    {item.coverage}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footnote Insight */}
        <div className="mt-8 pt-6 border-t border-[rgba(232,230,213,0.08)] flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-mono text-[rgba(232,230,213,0.40)]">
          <span>Benchmarked across 30 identical commercial buyer intent queries</span>
          <span className="text-[#E8B400]">Gap to #1: +7% Citation Depth Needed</span>
        </div>
      </div>
    </section>
  );
};
