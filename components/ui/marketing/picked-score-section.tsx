'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export const PickedScoreSection: React.FC<{ language?: string }> = ({ language = 'en' }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' });

  return (
    <section
      ref={ref}
      id="score"
      className="relative w-full py-28 sm:py-40 px-4 sm:px-6 lg:px-12 bg-[#050505] border-t border-[rgba(232,230,213,0.08)] overflow-hidden"
    >
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#E8B400]/[0.025] blur-[160px] rounded-full pointer-events-none" />
      <div className="noise-overlay pointer-events-none absolute inset-0 opacity-30" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* Section Tag */}
        <div className="flex items-center gap-2 mb-6">
          <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#E8E6D5]/40">
            05 / THE STANDARD METRIC
          </span>
        </div>

        {/* Headline */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-16 sm:pb-20 border-b border-[rgba(232,230,213,0.10)]">
          <div>
            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-normal tracking-[-0.04em] text-[#E8E6D5]">
              PICKED SCORE
            </h2>
            <span className="text-xs sm:text-sm font-mono uppercase tracking-widest text-[#E8B400] mt-2 block">
              The Definitive Index of Generative Algorithmic Authority
            </span>
          </div>

          <p className="max-w-md text-xs sm:text-sm md:text-base text-[rgba(232,230,213,0.62)] font-light leading-relaxed">
            {language === 'et'
              ? 'Üks terviklik mõõdik, mis sünteesib teie brändi nähtavuse, soovituste sageduse, tsiteerimise tugevuse ja turupositsiooni.'
              : 'A rigorous deterministic score aggregating prompt penetration, recommendation velocity, citation depth, and entity authority.'}
          </p>
        </div>

        {/* Monolithic Score Hero Row */}
        <div className="py-16 sm:py-24 border-b border-[rgba(232,230,213,0.10)]">
          <div className="grid grid-cols-12 items-baseline gap-6">
            <div className="col-span-12 md:col-span-6 lg:col-span-7 flex items-baseline">
              <motion.span
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="font-mono text-8xl sm:text-9xl md:text-[14rem] lg:text-[18rem] font-light tracking-[-0.08em] text-[#E8E6D5] leading-[0.8]"
              >
                84
              </motion.span>
              <span className="font-mono text-2xl sm:text-4xl md:text-6xl text-[rgba(232,230,213,0.30)] ml-4 font-light">
                / 100
              </span>
            </div>

            <div className="col-span-12 md:col-span-6 lg:col-span-5 flex flex-col justify-end">
              <span className="text-xs font-mono uppercase tracking-widest text-[#E8B400] mb-2 block">
                Grade: A- • Dominant Tier
              </span>
              <p className="text-sm sm:text-base text-[rgba(232,230,213,0.80)] font-light leading-relaxed">
                Brand is actively recommended in 84% of high-intent evaluations. Incumbents are displaced across 24 out of 30 buyer queries in ChatGPT and Gemini.
              </p>
            </div>
          </div>
        </div>

        {/* 4 Core Pillars */}
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-[rgba(232,230,213,0.10)] pt-8 sm:pt-12">
          {/* Metric 1 */}
          <div className="py-6 sm:py-8 sm:px-6 lg:px-8 first:sm:pl-0">
            <span className="text-[11px] font-mono uppercase tracking-widest text-[rgba(232,230,213,0.40)] block mb-2">
              AI Visibility
            </span>
            <span className="font-mono text-4xl sm:text-5xl lg:text-6xl font-light text-white block">
              82%
            </span>
            <p className="text-xs text-[rgba(232,230,213,0.50)] mt-2 font-light">
              Brand is surfaced or referenced in core query universe.
            </p>
          </div>

          {/* Metric 2 */}
          <div className="py-6 sm:py-8 sm:px-6 lg:px-8">
            <span className="text-[11px] font-mono uppercase tracking-widest text-[rgba(232,230,213,0.40)] block mb-2">
              Recommendation Rate
            </span>
            <span className="font-mono text-4xl sm:text-5xl lg:text-6xl font-light text-white block">
              76%
            </span>
            <p className="text-xs text-[rgba(232,230,213,0.50)] mt-2 font-light">
              Model affirmatively endorses your solution to buyers.
            </p>
          </div>

          {/* Metric 3 */}
          <div className="py-6 sm:py-8 sm:px-6 lg:px-8">
            <span className="text-[11px] font-mono uppercase tracking-widest text-[rgba(232,230,213,0.40)] block mb-2">
              Citation Strength
            </span>
            <span className="font-mono text-4xl sm:text-5xl lg:text-6xl font-light text-white block">
              71%
            </span>
            <p className="text-xs text-[rgba(232,230,213,0.50)] mt-2 font-light">
              Direct domain links and verified source footnotes.
            </p>
          </div>

          {/* Metric 4 */}
          <div className="py-6 sm:py-8 sm:px-6 lg:px-8 last:sm:pr-0">
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#E8B400] block mb-2">
              Competitive Position
            </span>
            <span className="font-mono text-4xl sm:text-5xl lg:text-6xl font-light text-[#E8B400] block">
              #2
            </span>
            <p className="text-xs text-[rgba(232,230,213,0.50)] mt-2 font-light">
              Category rank across full multi-engine consensus.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
