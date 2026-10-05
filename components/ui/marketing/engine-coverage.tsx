'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface EngineMetric {
  name: string;
  code: string;
  score: number;
  delta: string;
  deltaType: 'up' | 'down';
  grounding: string;
  description: string;
}

const engines: EngineMetric[] = [
  {
    name: 'CHATGPT',
    code: 'GPT-4o / O3-Mini',
    score: 82,
    delta: '+8.4%',
    deltaType: 'up',
    grounding: 'Direct Vector Weights & Live Web Browsing',
    description:
      'Audits generative consensus, comparative rankings, and brand sentiment across executive buyer queries.',
  },
  {
    name: 'GEMINI',
    code: 'Gemini 1.5 Pro',
    score: 76,
    delta: '+4.1%',
    deltaType: 'up',
    grounding: 'Google Knowledge Graph & Multimodal Context',
    description:
      'Measures search grounding, entity disambiguation, and verified fact-checking against Google corporate indices.',
  },
  {
    name: 'AI OVERVIEWS',
    code: 'Google SGE / AIO',
    score: 69,
    delta: '-2.7%',
    deltaType: 'down',
    grounding: 'Real-Time SERP Extraction & Citation Links',
    description:
      'Evaluates zero-click snippet recommendations and high-affinity URL citation frequency in consumer search results.',
  },
];

export const EngineCoverageSection: React.FC<{ language?: string }> = ({ language = 'en' }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' });

  return (
    <section
      ref={ref}
      id="engines"
      className="relative w-full py-24 sm:py-36 px-4 sm:px-6 lg:px-12 bg-[#050505] border-t border-[rgba(232,230,213,0.08)]"
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-14 sm:pb-20 border-b border-[rgba(232,230,213,0.10)]">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#E8E6D5]/40">
                03 / ENGINE SIGNALS
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-[#E8E6D5]">
              {language === 'et' ? 'Mudelite Kaetus' : 'Frontier Coverage'}
            </h2>
          </div>
          <p className="max-w-md text-xs sm:text-sm md:text-base text-[rgba(232,230,213,0.62)] font-light leading-relaxed">
            {language === 'et'
              ? 'Me analüüsime reaalajas kolme peamist tehisintellekti mootorit, mis mõjutavad ostuotsuseid.'
              : 'Continuous diagnostic telemetry across the three algorithmic systems governing global business recommendation.'}
          </p>
        </div>

        {/* Engine Intelligence Signals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[rgba(232,230,213,0.10)] pt-6 sm:pt-10">
          {engines.map((engine, idx) => (
            <motion.div
              key={engine.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="py-8 sm:py-10 md:px-8 lg:px-12 first:md:pl-0 last:md:pr-0 flex flex-col justify-between"
            >
              <div>
                {/* Engine Code and Status */}
                <div className="flex items-center justify-between text-xs font-mono text-[rgba(232,230,213,0.40)]">
                  <span>{engine.code}</span>
                  <span
                    className={`font-semibold ${
                      engine.deltaType === 'up' ? 'text-[#E8E6D5]' : 'text-[#E8B400]'
                    }`}
                  >
                    {engine.delta}
                  </span>
                </div>

                {/* Engine Name */}
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-normal tracking-tight text-white mt-4 sm:mt-6">
                  {engine.name}
                </h3>

                {/* Giant Metric Number */}
                <div className="my-6 sm:my-8">
                  <span className="font-mono text-6xl sm:text-7xl lg:text-8xl font-light tracking-tight text-[#E8E6D5]">
                    {engine.score}
                  </span>
                  <span className="text-xs font-mono text-[rgba(232,230,213,0.3)] ml-2">/ 100</span>
                </div>
              </div>

              <div className="space-y-3 pt-6 border-t border-[rgba(232,230,213,0.08)]">
                <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-widest text-[#E8B400] block">
                  {engine.grounding}
                </span>
                <p className="text-xs sm:text-sm text-[rgba(232,230,213,0.62)] font-light leading-relaxed">
                  {engine.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
