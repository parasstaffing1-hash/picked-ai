'use client';

import React, { useState } from 'react';
import { ArrowUpRight, CheckCircle2, AlertTriangle, AlertCircle, Info } from 'lucide-react';

interface RecommendationItem {
  id: string;
  tier: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  priority: string;
  problem: string;
  reason: string;
  impact: string;
  effort: 'Low' | 'Medium' | 'High';
  action: string;
}

const recommendations: RecommendationItem[] = [
  {
    id: 'r1',
    tier: 'CRITICAL',
    priority: '01',
    problem: 'Omission from Gemini 1.5 commercial summaries on European KYC tenders',
    reason: 'Gemini relies heavily on Google corporate entity verification and lack of Schema.org Organization ID.',
    impact: '+14% recommendation win rate across Northern European banking queries.',
    effort: 'Low',
    action:
      'Inject verified JSON-LD Organization markup with explicit sameAs links to official European banking compliance registries.',
  },
  {
    id: 'r2',
    tier: 'HIGH',
    priority: '02',
    problem: 'Jumio outranks Veriff as #1 recommended option for US biometric ID verification',
    reason: 'Jumio maintains 4x more third-party citations on TechCrunch, Forbes, and Finovate conference archives.',
    impact: 'Displaces incumbent on 8 high-intent enterprise SaaS queries.',
    effort: 'Medium',
    action:
      'Publish head-to-head architectural benchmark papers and distribute press releases highlighting automated sub-6s verification speed.',
  },
  {
    id: 'r3',
    tier: 'MEDIUM',
    priority: '03',
    problem: 'Google AI Overviews quotes unofficial forum reviews instead of official API documentation',
    reason: 'Subpaths for developer documentation lack semantic question/answer H2 anchor headers.',
    impact: 'Direct citation link inclusion on zero-click developer searches.',
    effort: 'Low',
    action:
      'Restructure API documentation headings into concise Q&A summary cards matching common developer inquiry formats.',
  },
  {
    id: 'r4',
    tier: 'LOW',
    priority: '04',
    problem: 'Wikipedia corporate entity page missing recent Series C capital deployment milestones',
    reason: 'Model training corpora rely on historical Wikipedia summaries from 2022.',
    impact: 'Improves entity recency confidence score in frontier LLMs.',
    effort: 'High',
    action:
      'Submit updated secondary source verification citations to Wikipedia editors to update corporate infobox data.',
  },
];

export const ConsoleRecommendations: React.FC = () => {
  const [filterTier, setFilterTier] = useState<string>('ALL');

  const filtered = filterTier === 'ALL'
    ? recommendations
    : recommendations.filter((r) => r.tier === filterTier);

  return (
    <div className="space-y-10">
      {/* Header & Filter */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-[rgba(232,230,213,0.08)]">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#E8B400] block mb-1">
            PRESCRIPTIVE PLAYBOOKS
          </span>
          <h2 className="text-2xl sm:text-3xl font-normal text-white">Strategic Recommendation Center</h2>
        </div>

        {/* Tier Filters */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#0A0A09] border border-[rgba(232,230,213,0.10)] text-xs font-mono">
          {['ALL', 'CRITICAL', 'HIGH', 'MEDIUM', 'LOW'].map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setFilterTier(t)}
              className={`px-3 py-1 rounded-lg transition-colors cursor-pointer ${
                filterTier === t
                  ? 'bg-[#E8E6D5] text-[#050505] font-semibold'
                  : 'text-[rgba(232,230,213,0.60)] hover:text-white'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Recommendations Cards */}
      <div className="space-y-6">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="p-6 sm:p-8 rounded-2xl bg-[#0A0A09] border border-[rgba(232,230,213,0.10)] space-y-6"
          >
            {/* Top Row: Priority, Tier, Effort */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs font-bold text-[#E8B400]">
                  PRIORITY {item.priority}
                </span>
                <span
                  className={`text-[10px] font-mono px-2 py-0.5 rounded-full uppercase tracking-wider ${
                    item.tier === 'CRITICAL'
                      ? 'bg-rose-500/10 text-rose-400 border border-rose-500/30'
                      : item.tier === 'HIGH'
                      ? 'bg-[#E8B400]/10 text-[#E8B400] border border-[#E8B400]/30'
                      : 'bg-white/10 text-white border border-white/20'
                  }`}
                >
                  {item.tier} TIER
                </span>
              </div>

              <span className="text-xs font-mono text-[rgba(232,230,213,0.40)]">
                Effort: {item.effort}
              </span>
            </div>

            {/* Problem Statement */}
            <h3 className="text-lg sm:text-xl font-normal text-white">
              {item.problem}
            </h3>

            {/* Detailed Grid: Reason / Impact / Action */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-white/[0.02] border border-[rgba(232,230,213,0.06)]">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#E8B400] block mb-1">
                  ROOT CAUSE / REASON
                </span>
                <p className="text-xs text-[rgba(232,230,213,0.70)] font-light leading-relaxed">
                  {item.reason}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.02] border border-[rgba(232,230,213,0.06)]">
                <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 block mb-1">
                  EXPECTED IMPACT
                </span>
                <p className="text-xs text-[rgba(232,230,213,0.70)] font-light leading-relaxed">
                  {item.impact}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.02] border border-[rgba(232,230,213,0.06)]">
                <span className="text-[10px] font-mono uppercase tracking-widest text-white block mb-1">
                  RECOMMENDED ACTION
                </span>
                <p className="text-xs text-[rgba(232,230,213,0.70)] font-light leading-relaxed">
                  {item.action}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
