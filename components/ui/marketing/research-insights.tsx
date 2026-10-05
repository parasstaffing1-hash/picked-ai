'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

interface InsightRow {
  num: string;
  title: string;
  tag: string;
  date: string;
  readTime: string;
}

const insights: InsightRow[] = [
  {
    num: '01',
    title: 'THE NEW AI DISCOVERY JOURNEY',
    tag: 'Foundational Intelligence',
    date: 'Q2 2026',
    readTime: '6 MIN BRIEFING',
  },
  {
    num: '02',
    title: 'HOW AI CHOOSES WHICH BUSINESSES TO RECOMMEND',
    tag: 'Algorithmic Synthesis',
    date: 'Q1 2026',
    readTime: '9 MIN STUDY',
  },
  {
    num: '03',
    title: 'THE AI VISIBILITY INDEX: BENCHMARKING FRONTIER ADOPTION',
    tag: 'Empirical Data',
    date: '2026 REPORT',
    readTime: '12 MIN WHITE PAPER',
  },
];

export const ResearchInsightsSection: React.FC<{ language?: string }> = ({ language = 'en' }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' });

  return (
    <section
      ref={ref}
      id="research"
      className="relative w-full py-24 sm:py-36 px-4 sm:px-6 lg:px-12 bg-[#050505] border-t border-[rgba(232,230,213,0.08)]"
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-14 sm:pb-20 border-b border-[rgba(232,230,213,0.10)]">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#E8E6D5]/40">
                09 / PUBLICATIONS
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-[#E8E6D5]">
              {language === 'et' ? 'Teadustööd & Uuringud' : 'Frontier Research'}
            </h2>
          </div>
          <p className="max-w-md text-xs sm:text-sm md:text-base text-[rgba(232,230,213,0.62)] font-light leading-relaxed">
            {language === 'et'
              ? 'Meie labori väljaanded tehisintellekti treeningandmete, otsingumudelite ja soovituste mehaanika kohta.'
              : 'Original monographs, empirical audits, and telemetry blueprints published by the Picked Research Lab.'}
          </p>
        </div>

        {/* Editorial Rows */}
        <div className="divide-y divide-[rgba(232,230,213,0.10)]">
          {insights.map((item, idx) => (
            <motion.div
              key={item.num}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: idx * 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="group py-8 sm:py-12 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer hover:bg-[#0A0A09]/60 transition-colors px-2 sm:px-4"
            >
              <div className="flex items-baseline gap-6 sm:gap-10">
                <span className="font-mono text-xs sm:text-sm text-[rgba(232,230,213,0.40)] group-hover:text-[#E8B400] transition-colors">
                  {item.num}
                </span>
                <div>
                  <h3 className="text-lg sm:text-2xl md:text-3xl font-normal text-[#E8E6D5] group-hover:text-white transition-colors tracking-tight">
                    {item.title}
                  </h3>
                  <div className="mt-1 flex items-center gap-3 text-xs font-mono text-[rgba(232,230,213,0.40)]">
                    <span>{item.tag}</span>
                    <span>•</span>
                    <span>{item.date}</span>
                    <span>•</span>
                    <span>{item.readTime}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 self-end md:self-center">
                <span className="text-xs font-mono uppercase tracking-widest text-[rgba(232,230,213,0.40)] group-hover:text-white transition-colors hidden sm:inline">
                  Read Monograph
                </span>
                <div className="w-10 h-10 rounded-full border border-[rgba(232,230,213,0.12)] flex items-center justify-center text-[rgba(232,230,213,0.40)] group-hover:border-white group-hover:text-white transition-all group-hover:scale-105">
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
