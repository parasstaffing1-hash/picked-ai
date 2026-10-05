'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';

export const FinalStatementSection: React.FC<{ language?: string }> = ({ language = 'en' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const y1 = useTransform(scrollYProgress, [0.1, 0.6], shouldReduceMotion ? [0, 0] : [50, -20]);
  const y2 = useTransform(scrollYProgress, [0.2, 0.7], shouldReduceMotion ? [0, 0] : [70, 0]);
  const y3 = useTransform(scrollYProgress, [0.3, 0.8], shouldReduceMotion ? [0, 0] : [90, 20]);
  const opacity = useTransform(scrollYProgress, [0.1, 0.35, 0.7, 0.9], [0.1, 1, 1, 0.2]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[90vh] sm:min-h-[110vh] w-full flex items-center justify-center px-4 sm:px-6 lg:px-12 py-28 sm:py-36 bg-[#050505] overflow-hidden border-t border-[rgba(232,230,213,0.06)]"
    >
      <div className="noise-overlay pointer-events-none absolute inset-0 opacity-30" />

      <motion.div
        style={{ opacity }}
        className="max-w-7xl mx-auto w-full flex flex-col items-center text-center relative z-10"
      >
        <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-[#E8E6D5]/40 mb-10 sm:mb-16">
          11 / THE MANDATE
        </span>

        <div className="flex flex-col space-y-1 sm:space-y-3 font-normal tracking-[-0.05em] text-[#E8E6D5] leading-[0.88]">
          <motion.div style={{ y: y1 }} className="overflow-hidden">
            <span className="inline-block text-4xl sm:text-7xl md:text-8xl lg:text-9xl font-light text-[rgba(232,230,213,0.50)]">
              {language === 'et' ? 'BRÄNDID, KEDA' : 'THE BRANDS'}
            </span>
          </motion.div>

          <motion.div style={{ y: y2 }} className="overflow-hidden">
            <span className="inline-block text-4xl sm:text-7xl md:text-8xl lg:text-9xl font-medium text-white">
              {language === 'et' ? 'TEHISINTELLEKT LEIAB' : 'AI CAN FIND'}
            </span>
          </motion.div>

          <motion.div style={{ y: y3 }} className="overflow-hidden pt-2 sm:pt-4">
            <span className="inline-block text-4xl sm:text-7xl md:text-8xl lg:text-9xl font-normal text-[#E8B400] font-serif italic">
              {language === 'et' ? 'VÕIDAVAD TULEVIKU.' : 'WILL WIN WHAT COMES NEXT.'}
            </span>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};
