'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';

export const CinematicSection: React.FC<{ language?: string }> = ({ language = 'en' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Scale image from compact card to full viewport
  const scale = useTransform(scrollYProgress, [0, 0.45], shouldReduceMotion ? [1, 1] : [0.88, 1]);
  const borderRadius = useTransform(scrollYProgress, [0, 0.45], shouldReduceMotion ? ['0px', '0px'] : ['32px', '0px']);
  
  // Text entrance and opacity shifts
  const text1Opacity = useTransform(scrollYProgress, [0.05, 0.25, 0.45], [0, 1, 0]);
  const text1Y = useTransform(scrollYProgress, [0.05, 0.25], [30, 0]);

  const text2Opacity = useTransform(scrollYProgress, [0.45, 0.65, 0.9], [0, 1, 0.8]);
  const text2Y = useTransform(scrollYProgress, [0.45, 0.65], [30, 0]);
  const text2Scale = useTransform(scrollYProgress, [0.45, 0.8], [0.95, 1]);

  return (
    <div id="story" ref={containerRef} className="relative h-[220vh] w-full bg-[#050505]">
      {/* Sticky Viewport Stage */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        {/* Animated Visual Canvas */}
        <motion.div
          style={{
            scale,
            borderRadius,
          }}
          className="relative h-full w-full overflow-hidden bg-black shadow-2xl"
        >
          {/* Background Image / Architecture Texture */}
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=85"
            alt="Cinematic Space"
            className="absolute inset-0 h-full w-full object-cover opacity-60"
          />

          {/* Film Grain & Darkness Gradients */}
          <div className="noise-overlay pointer-events-none absolute inset-0 opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-black/50 to-[#050505]/80" />

          {/* Scene 1: Entering Phase */}
          <motion.div
            style={{ opacity: text1Opacity, y: text1Y }}
            className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 sm:px-6 pointer-events-none"
          >
            <span className="text-xs sm:text-sm font-mono uppercase tracking-[0.3em] text-amber-400 mb-4">
              04 / KINETIC STORYTELLING
            </span>
            <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-normal text-[#E1E0CC] tracking-[-0.04em] leading-[0.95] max-w-5xl">
              FROM SEARCH QUERY
              <br />
              <span className="text-white font-serif italic">TO ALGORITHMIC TRUST</span>
            </h2>
          </motion.div>

          {/* Scene 2: Full Immersion Climax */}
          <motion.div
            style={{ opacity: text2Opacity, y: text2Y, scale: text2Scale }}
            className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 sm:px-6 pointer-events-none"
          >
            <div className="max-w-4xl space-y-6">
              <span className="text-xs sm:text-sm font-mono uppercase tracking-[0.3em] text-[#E1E0CC]/50">
                Frontier Model Decryption
              </span>
              <h3 className="text-3xl sm:text-5xl md:text-7xl font-light text-white tracking-[-0.03em] leading-tight">
                When answers replace links,
                <br />
                <span className="text-[#E1E0CC] font-medium">authority is synthesized, not clicked.</span>
              </h3>
              <p className="max-w-xl mx-auto text-xs sm:text-base text-[#E1E0CC]/70 font-light leading-relaxed">
                {language === 'et'
                  ? 'Kommertspäringutes ei sirvi kasutaja enam 10 sinist linki. Mudel teeb otsuse ja soovitab ainult ühte või kahte brändi.'
                  : 'Buyers no longer click through search pages. Frontier models synthesize consensus and endorse one definitive option. We guarantee you are the answer.'}
              </p>
            </div>
          </motion.div>

          {/* Fixed Subtle Progress Indicator at Bottom */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 text-[11px] font-mono uppercase tracking-widest text-[#E1E0CC]/40">
            <span>Scroll to continue</span>
            <span className="w-8 h-px bg-white/20" />
            <span>Chapter 04</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
