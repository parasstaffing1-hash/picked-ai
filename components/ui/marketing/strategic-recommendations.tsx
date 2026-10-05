'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface Recommendation {
  priority: string;
  impact: 'CRITICAL' | 'HIGH' | 'MEDIUM';
  effort: 'LOW' | 'MEDIUM' | 'HIGH';
  headline: string;
  why: string;
  action: string;
}

const recommendations: Recommendation[] = [
  {
    priority: '01',
    impact: 'HIGH',
    effort: 'MEDIUM',
    headline: 'Strengthen Authority Graph Around "Identity Fraud Prevention"',
    why: 'Competitors with verified Wikidata entity nodes and Schema.org organizational microdata appear in 78% more generative recommendation summaries.',
    action:
      'Deploy structured JSON-LD entity markup on all root product pages and seed verified citations across top technical trade indices.',
  },
  {
    priority: '02',
    impact: 'CRITICAL',
    effort: 'LOW',
    headline: 'Displace Incumbents on Baltic & Nordic Commercial Shortlists',
    why: 'ChatGPT models rely on outdated 2023 directory citations when recommending corporate verification providers in Northern Europe.',
    action:
      'Publish high-intent comparison matrices and secure verified press releases detailing Tier-1 enterprise banking partnerships.',
  },
  {
    priority: '03',
    impact: 'HIGH',
    effort: 'MEDIUM',
    headline: 'Eliminate AI Overview Snippet Omissions on Core Service Terms',
    why: 'Google AI Overviews currently extracts answers from competitor blog glossaries rather than your official technical documentation.',
    action:
      'Format product capability overviews into concise definition blocks with explicit H2/H3 semantic answer headers.',
  },
];

export const StrategicRecommendationsSection: React.FC<{ language?: string }> = ({
  language = 'en',
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' });

  return (
    <section
      ref={ref}
      id="recommendations"
      className="relative w-full py-24 sm:py-36 px-4 sm:px-6 lg:px-12 bg-[#050505] border-t border-[rgba(232,230,213,0.08)]"
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-14 sm:pb-20 border-b border-[rgba(232,230,213,0.10)]">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#E8E6D5]/40">
                08 / PRESCRIPTIVE PLAYBOOKS
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-[#E8E6D5]">
              {language === 'et' ? 'Strateegilised Soovitused' : 'Actionable Authority'}
            </h2>
          </div>
          <p className="max-w-md text-xs sm:text-sm md:text-base text-[rgba(232,230,213,0.62)] font-light leading-relaxed">
            {language === 'et'
              ? 'Picked ei kuva lihtsalt andmeid. Me anname täpse tegevuskava mudelite soovituste vallutamiseks.'
              : 'Picked does not stop at diagnostic reporting. We synthesize prescriptive engineering moves to capture #1 slots.'}
          </p>
        </div>

        {/* Recommendations List */}
        <div className="divide-y divide-[rgba(232,230,213,0.08)]">
          {recommendations.map((rec, idx) => (
            <motion.div
              key={rec.priority}
              initial={{ opacity: 0, y: 25 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="py-10 sm:py-14 grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10"
            >
              {/* Priority & Impact Badges */}
              <div className="lg:col-span-3 flex flex-col justify-between">
                <div>
                  <span className="font-mono text-xs sm:text-sm tracking-widest text-[#E8B400] block mb-2">
                    PRIORITY {rec.priority}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-[#E8B400]/10 border border-[#E8B400]/30 text-[#E8B400]">
                      IMPACT: {rec.impact}
                    </span>
                    <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-white/[0.04] border border-[rgba(232,230,213,0.10)] text-[rgba(232,230,213,0.60)]">
                      EFFORT: {rec.effort}
                    </span>
                  </div>
                </div>
              </div>

              {/* Core Content */}
              <div className="lg:col-span-9 space-y-4">
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-normal text-white tracking-tight">
                  {rec.headline}
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                  <div className="p-4 rounded-xl bg-[#0A0A09] border border-[rgba(232,230,213,0.08)]">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#E8B400] block mb-1">
                      WHY IT MATTERS:
                    </span>
                    <p className="text-xs sm:text-sm text-[rgba(232,230,213,0.70)] font-light leading-relaxed">
                      {rec.why}
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-[#0A0A09] border border-[rgba(232,230,213,0.08)]">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-white block mb-1">
                      RECOMMENDED ACTION:
                    </span>
                    <p className="text-xs sm:text-sm text-[rgba(232,230,213,0.70)] font-light leading-relaxed">
                      {rec.action}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
