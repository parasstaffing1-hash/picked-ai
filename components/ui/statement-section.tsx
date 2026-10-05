'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';

export const StatementSection: React.FC<{ language?: string }> = ({ language = 'en' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const y1 = useTransform(scrollYProgress, [0.1, 0.5], shouldReduceMotion ? [0, 0] : [60, -20]);
  const y2 = useTransform(scrollYProgress, [0.2, 0.6], shouldReduceMotion ? [0, 0] : [80, 0]);
  const y3 = useTransform(scrollYProgress, [0.3, 0.7], shouldReduceMotion ? [0, 0] : [100, 20]);
  const opacity = useTransform(scrollYProgress, [0.1, 0.4, 0.7, 0.9], [0.2, 1, 1, 0.3]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[90vh] sm:min-h-[105vh] w-full flex items-center justify-center px-4 sm:px-6 lg:px-12 py-24 sm:py-32 bg-[#050505] overflow-hidden"
    >
      {/* Background ambient light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-amber-400/[0.02] blur-[160px] rounded-full pointer-events-none" />
      <div className="noise-overlay pointer-events-none absolute inset-0 opacity-30" />

      <motion.div
        style={{ opacity }}
        className="max-w-7xl mx-auto w-full flex flex-col items-center text-center relative z-10"
      >
        <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-[#E1E0CC]/40 mb-8 sm:mb-12">
          05 / STATEMENT
        </span>

        <div className="flex flex-col space-y-1 sm:space-y-3 font-normal tracking-[-0.05em] text-[#E1E0CC] leading-[0.88]">
          <motion.div style={{ y: y1 }} className="overflow-hidden">
            <span className="inline-block text-4xl sm:text-7xl md:text-8xl lg:text-9xl font-light text-[#E1E0CC]/60">
              {language === 'et' ? 'ME EI JÄLGI' : "WE DON'T"}
            </span>
          </motion.div>

          <motion.div style={{ y: y2 }} className="overflow-hidden">
            <span className="inline-block text-4xl sm:text-7xl md:text-8xl lg:text-9xl font-medium text-white">
              {language === 'et' ? 'ALGORITME.' : 'THE ALGORITHMS.'}
            </span>
          </motion.div>

          <motion.div style={{ y: y3 }} className="overflow-hidden pt-2 sm:pt-4">
            <span className="inline-block text-4xl sm:text-7xl md:text-8xl lg:text-9xl font-normal text-amber-400/90 font-serif italic">
              {language === 'et' ? 'ME JUHIME NEID.' : 'WE COMMAND THEM.'}
            </span>
          </motion.div>
        </div>

        <div className="mt-12 sm:mt-16 max-w-xl text-center">
          <p className="text-xs sm:text-base text-[#E1E0CC]/60 font-light leading-relaxed">
            {language === 'et'
              ? 'Tehisintellekti treeningandmed ja tsiteerimise mehhanismid ei ole juhuslikud. Me loome andmestruktuuri, mis teeb teie brändist vältimatu konsensuse.'
              : 'Neural network training distributions and retrieval-augmented synthesis are not accidental. We construct the knowledge architecture that makes your brand inevitable.'}
          </p>
        </div>
      </motion.div>
    </section>
  );
};
