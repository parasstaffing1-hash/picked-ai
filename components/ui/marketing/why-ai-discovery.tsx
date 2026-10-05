'use client';

import React, { useRef } from 'react';
import { motion, useInView, useScroll, useTransform, useReducedMotion } from 'framer-motion';

export const WhyAiDiscoverySection: React.FC<{ language?: string }> = ({ language = 'en' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-10% 0px' });
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5], shouldReduceMotion ? [1, 1] : [0.94, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.4], [0.5, 1]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[90vh] w-full py-24 sm:py-36 px-4 sm:px-6 lg:px-12 bg-[#050505] flex items-center justify-center overflow-hidden border-t border-[rgba(232,230,213,0.08)]"
    >
      <motion.div
        style={{ scale, opacity }}
        className="relative max-w-7xl mx-auto w-full rounded-2xl md:rounded-[2.5rem] overflow-hidden bg-[#0A0A09] border border-[rgba(232,230,213,0.10)] min-h-[600px] flex flex-col justify-between p-6 sm:p-12 md:p-16 lg:p-20 shadow-2xl"
      >
        {/* Cinematic Backdrop Image with Fine Noise Scrim */}
        <img
          src="https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=2000&q=85"
          alt="Atmosphere"
          className="absolute inset-0 h-full w-full object-cover opacity-35 filter contrast-125 brightness-75"
        />
        <div className="noise-overlay pointer-events-none absolute inset-0 opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/80 via-transparent to-transparent" />

        {/* Top Metadata */}
        <div className="relative z-10 flex items-center justify-between">
          <div className="inline-flex items-center gap-2 rounded-full bg-black/60 backdrop-blur-xl px-3.5 py-1.5 border border-[rgba(232,230,213,0.12)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E8B400] animate-pulse" />
            <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.25em] text-[#E8E6D5]/70">
              02 / PARADIGM SHIFT
            </span>
          </div>

          <span className="hidden sm:inline-block text-xs font-mono text-[rgba(232,230,213,0.40)]">
            Consensus vs. Links
          </span>
        </div>

        {/* Center / Bottom Cinematic Statements */}
        <div className="relative z-10 pt-16 sm:pt-24 max-w-3xl">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-normal tracking-[-0.05em] text-[#E8E6D5] leading-[0.92]"
          >
            SEARCH <br />
            <span className="text-white font-medium">HAS CHANGED.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 text-base sm:text-lg md:text-xl text-[rgba(232,230,213,0.62)] font-light leading-relaxed max-w-2xl"
          >
            {language === 'et'
              ? 'Enne veebilehtede külastamist pöörduvad ostjad ja ettevõtete juhid tehisintellekti poole, et võrrelda turuliidreid ja saada koheseid soovitusi. Kui mudel ei tea teie nime, ei tea seda ka klient.'
              : 'Enterprise buyers, high-net-worth consumers, and procurement leaders increasingly use conversational AI to evaluate, filter, and shortlist partners before ever clicking a website link.'}
          </motion.p>

          <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 gap-6 pt-8 border-t border-[rgba(232,230,213,0.10)] text-xs font-mono">
            <div>
              <span className="text-white text-lg font-medium block">73%</span>
              <span className="text-[rgba(232,230,213,0.40)] uppercase tracking-wider">
                Pre-Purchase AI Synthesis
              </span>
            </div>
            <div>
              <span className="text-[#E8B400] text-lg font-medium block">0 Blue Links</span>
              <span className="text-[rgba(232,230,213,0.40)] uppercase tracking-wider">
                Direct Neural Endorsement
              </span>
            </div>
            <div className="hidden sm:block">
              <span className="text-white text-lg font-medium block">#1 Slot</span>
              <span className="text-[rgba(232,230,213,0.40)] uppercase tracking-wider">
                Decides Buyer Inquiries
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
