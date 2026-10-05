'use client';

import React from 'react';
import { TrendingUp, ShieldAlert, Award } from 'lucide-react';

interface Competitor {
  rank: number;
  name: string;
  isTarget: boolean;
  visibility: number;
  recommendation: number;
  citation: number;
  avgPosition: string;
  coverage: string;
  delta: string;
}

const competitorRanking: Competitor[] = [
  {
    rank: 1,
    name: 'Jumio Corporation',
    isTarget: false,
    visibility: 89,
    recommendation: 81,
    citation: 84,
    avgPosition: '#1.4',
    coverage: '28 / 30',
    delta: '+1.2%',
  },
  {
    rank: 2,
    name: 'Veriff (Your Business)',
    isTarget: true,
    visibility: 82,
    recommendation: 76,
    citation: 71,
    avgPosition: '#1.8',
    coverage: '25 / 30',
    delta: '+4.2%',
  },
  {
    rank: 3,
    name: 'Onfido (Entrust Group)',
    isTarget: false,
    visibility: 68,
    recommendation: 59,
    citation: 64,
    avgPosition: '#2.6',
    coverage: '21 / 30',
    delta: '-0.8%',
  },
  {
    rank: 4,
    name: 'Trulioo Global',
    isTarget: false,
    visibility: 54,
    recommendation: 42,
    citation: 51,
    avgPosition: '#3.4',
    coverage: '16 / 30',
    delta: '-3.1%',
  },
];

export const ConsoleCompetitors: React.FC = () => {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#E8B400] block mb-1">
            CATEGORY LEADERBOARD
          </span>
          <h2 className="text-2xl sm:text-3xl font-normal text-white">Competitive Intelligence</h2>
        </div>
        <span className="text-xs font-mono text-[rgba(232,230,213,0.40)]">
          Audit Set: 30 Buyer Intent Prompts
        </span>
      </div>

      {/* Competitor Ranked Cards */}
      <div className="space-y-4">
        {competitorRanking.map((comp) => (
          <div
            key={comp.name}
            className={`p-6 sm:p-8 rounded-2xl border transition-all ${
              comp.isTarget
                ? 'bg-[#0A0A09] border-[#E8B400]/50 shadow-[0_0_30px_rgba(232,180,0,0.06)]'
                : 'bg-[#0A0A09] border-[rgba(232,230,213,0.08)] hover:border-[rgba(232,230,213,0.16)]'
            }`}
          >
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              {/* Left: Rank & Name */}
              <div className="flex items-center gap-5">
                <span
                  className={`font-mono text-3xl sm:text-4xl font-light ${
                    comp.isTarget ? 'text-[#E8B400]' : 'text-[rgba(232,230,213,0.40)]'
                  }`}
                >
                  0{comp.rank}
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg sm:text-xl font-normal text-white">{comp.name}</h3>
                    {comp.isTarget && (
                      <span className="px-2 py-0.5 rounded-full bg-[#E8B400]/10 border border-[#E8B400]/40 text-[#E8B400] text-[10px] font-mono uppercase">
                        Current Account
                      </span>
                    )}
                  </div>
                  <span className="text-xs font-mono text-[rgba(232,230,213,0.40)] mt-1 block">
                    Avg Recommended Position: {comp.avgPosition} • Coverage: {comp.coverage} queries
                  </span>
                </div>
              </div>

              {/* Right: Comparative Metrics Grid */}
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-4 sm:gap-6 font-mono text-center">
                <div className="p-3 rounded-xl bg-white/[0.02] border border-[rgba(232,230,213,0.06)]">
                  <span className="text-[10px] text-[rgba(232,230,213,0.40)] block uppercase">
                    Visibility
                  </span>
                  <span className="text-lg text-white font-semibold">{comp.visibility}%</span>
                </div>

                <div className="p-3 rounded-xl bg-white/[0.02] border border-[rgba(232,230,213,0.06)]">
                  <span className="text-[10px] text-[rgba(232,230,213,0.40)] block uppercase">
                    Recommend
                  </span>
                  <span className="text-lg text-white font-semibold">{comp.recommendation}%</span>
                </div>

                <div className="p-3 rounded-xl bg-white/[0.02] border border-[rgba(232,230,213,0.06)]">
                  <span className="text-[10px] text-[rgba(232,230,213,0.40)] block uppercase">
                    Citations
                  </span>
                  <span className="text-lg text-white font-semibold">{comp.citation}%</span>
                </div>

                <div className="hidden sm:block p-3 rounded-xl bg-white/[0.02] border border-[rgba(232,230,213,0.06)]">
                  <span className="text-[10px] text-[rgba(232,230,213,0.40)] block uppercase">
                    30D Delta
                  </span>
                  <span
                    className={`text-lg font-semibold ${
                      comp.delta.startsWith('+') ? 'text-emerald-400' : 'text-rose-400'
                    }`}
                  >
                    {comp.delta}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
