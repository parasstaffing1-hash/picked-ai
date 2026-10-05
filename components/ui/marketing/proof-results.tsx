'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface MetricItem {
  number: string;
  label: string;
  subtext: string;
}

const metrics: MetricItem[] = [
  {
    number: '+42%',
    label: 'AI VISIBILITY',
    subtext: 'Average baseline expansion across enterprise clients within 60 days of knowledge graph injection.',
  },
  {
    number: '3.8×',
    label: 'MORE CATEGORY MENTIONS',
    subtext: 'Multiplied frequency of unprompted natural brand references in comparative commercial buyer prompts.',
  },
  {
    number: '+27%',
    label: 'RECOMMENDATION RATE',
    subtext: 'Higher affirmative endorsement probability when users ask models to select the definitive choice.',
  },
];

export const ProofResultsSection: React.FC<{ language?: string }> = ({ language = 'en' }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' });

  return (
    <section
      ref={ref}
      id="proof"
      className="relative w-full py-28 sm:py-40 px-4 sm:px-6 lg:px-12 bg-[#050505] border-t border-[rgba(232,230,213,0.08)]"
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-14 sm:pb-20 border-b border-[rgba(232,230,213,0.10)]">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#E8E6D5]/40">
                10 / EMPIRICAL PROOF
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-[#E8E6D5]">
              {language === 'et' ? 'Tõestatud Mõju' : 'Measured Impact'}
            </h2>
          </div>
          <p className="max-w-md text-xs sm:text-sm md:text-base text-[rgba(232,230,213,0.62)] font-light leading-relaxed">
            {language === 'et'
              ? 'Tulemused, mis on mõõdetud sadade reaalsete päringute ja juhtivate ettevõtete põhjal.'
              : 'Deterministic validation across audited portfolios. Real metrics captured inside production neural weights.'}
          </p>
        </div>

        {/* Large Numbers Display */}
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[rgba(232,230,213,0.10)] pt-12 sm:pt-16">
          {metrics.map((item, idx) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="py-10 md:py-8 md:px-8 lg:px-12 first:md:pl-0 last:md:pr-0 flex flex-col justify-between"
            >
              <div>
                <span className="font-mono text-7xl sm:text-8xl lg:text-9xl font-light tracking-[-0.06em] text-[#E8E6D5] block leading-[0.85]">
                  {item.number}
                </span>
                <span className="mt-6 text-xs sm:text-sm font-mono uppercase tracking-widest text-[#E8B400] block">
                  {item.label}
                </span>
              </div>

              <p className="mt-8 pt-6 border-t border-[rgba(232,230,213,0.08)] text-xs sm:text-sm text-[rgba(232,230,213,0.62)] font-light leading-relaxed">
                {item.subtext}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
