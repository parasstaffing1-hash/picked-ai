'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';

export const NetworkSection: React.FC<{ language?: string }> = ({ language = 'en' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? [0, 0] : [-30, 40]);
  const y2 = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? [0, 0] : [50, -40]);

  return (
    <section
      id="network"
      ref={containerRef}
      className="relative w-full py-24 sm:py-36 px-4 sm:px-6 lg:px-12 bg-[#050505] border-t border-white/[0.04] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-16 sm:pb-20 border-b border-white/[0.08]">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#E1E0CC]/40">
                08 / THE COLLECTIVE
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-[#E1E0CC]">
              {language === 'et' ? 'Globaalne Võrgustik' : 'Global Intelligence Fabric'}
            </h2>
          </div>
          <p className="max-w-md text-sm sm:text-base text-[#E1E0CC]/60 leading-relaxed font-light">
            {language === 'et'
              ? 'Tipptasemel tehisintellekti insenerid, andmeteadlased ja brändistrateegid Tallinnas, Londonis ja San Franciscos.'
              : 'A decentralized guild of machine learning researchers, ontology architects, and strategic directors decoding frontier neural behavior.'}
          </p>
        </div>

        {/* Visual Composition with Subtle Depth */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 pt-16 items-center">
          {/* Left Column: Overlapping imagery with subtle parallax */}
          <div className="lg:col-span-7 relative min-h-[380px] sm:min-h-[500px] flex items-center justify-center">
            {/* Primary Image */}
            <motion.div
              style={{ y: y1 }}
              className="relative w-[85%] sm:w-[75%] aspect-[4/3] rounded-2xl md:rounded-3xl overflow-hidden border border-white/[0.1] shadow-2xl z-10"
            >
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80"
                alt="Intelligence Lab"
                className="h-full w-full object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="noise-overlay pointer-events-none absolute inset-0 opacity-40" />
              <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6">
                <span className="text-[10px] sm:text-xs font-mono text-amber-400 uppercase tracking-widest">
                  Studio Lab 01 • Tallinn
                </span>
              </div>
            </motion.div>

            {/* Secondary Floating Image */}
            <motion.div
              style={{ y: y2 }}
              className="absolute -bottom-6 right-0 sm:right-6 w-[55%] sm:w-[48%] aspect-[4/3] rounded-xl sm:rounded-2xl overflow-hidden border border-white/[0.12] shadow-2xl z-20"
            >
              <img
                src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80"
                alt="Research Session"
                className="h-full w-full object-cover opacity-85"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="noise-overlay pointer-events-none absolute inset-0 opacity-40" />
              <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4">
                <span className="text-[10px] font-mono text-[#E1E0CC]/80 uppercase tracking-wider">
                  Frontier Telemetry
                </span>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Editorial Stats & Philosophy */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-8 sm:space-y-10 lg:pl-6">
            <div className="space-y-4">
              <h3 className="text-2xl sm:text-4xl font-normal text-white tracking-tight">
                {language === 'et'
                  ? 'Tehisintellekt ei ole must kast. See on loogiline struktuur.'
                  : 'Frontier AI is not a black box. It is a structured probability engine.'}
              </h3>
              <p className="text-sm sm:text-base text-[#E1E0CC]/70 font-light leading-relaxed">
                {language === 'et'
                  ? 'Me ei kasuta spekulatsioone ega trikke. Meie metoodika põhineb empiirilistel testidel, mudeli vastuste struktuuranalüüsil ja reaalsetel tsiteerimisallikatel.'
                  : 'We reject generic heuristics and speculative hacks. Our practice is built entirely on empirical probing, semantic graph ingestion, and verifiable citation capture.'}
              </p>
            </div>

            {/* Network Metric Tokens */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/[0.08]">
              <div>
                <span className="text-2xl sm:text-3xl font-mono font-medium text-white block">
                  30+
                </span>
                <span className="text-xs text-[#E1E0CC]/50 uppercase tracking-wider font-mono">
                  Prompts Per Audit
                </span>
              </div>
              <div>
                <span className="text-2xl sm:text-3xl font-mono font-medium text-amber-400 block">
                  100%
                </span>
                <span className="text-xs text-[#E1E0CC]/50 uppercase tracking-wider font-mono">
                  Deterministic Tests
                </span>
              </div>
              <div>
                <span className="text-2xl sm:text-3xl font-mono font-medium text-white block">
                  3 Hubs
                </span>
                <span className="text-xs text-[#E1E0CC]/50 uppercase tracking-wider font-mono">
                  Tallinn • London • SF
                </span>
              </div>
              <div>
                <span className="text-2xl sm:text-3xl font-mono font-medium text-[#E1E0CC] block">
                  &lt; 30s
                </span>
                <span className="text-xs text-[#E1E0CC]/50 uppercase tracking-wider font-mono">
                  Autonomous Synthesis
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
