'use client';

import React from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';

interface FinalCTAProps {
  language?: string;
  onOpenScan?: () => void;
}

export const FinalCTASection: React.FC<FinalCTAProps> = ({
  language = 'en',
  onOpenScan,
}) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' });

  return (
    <section
      ref={ref}
      className="relative min-h-[85vh] sm:min-h-[95vh] w-full flex items-center justify-center px-4 sm:px-6 lg:px-12 py-24 sm:py-32 bg-[#050505] overflow-hidden border-t border-white/[0.06]"
    >
      {/* Background Cinematic Texture */}
      <div className="absolute inset-0 pointer-events-none">
        <img
          src="https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=2000&q=80"
          alt="Atmosphere"
          className="h-full w-full object-cover opacity-25 filter grayscale contrast-125"
        />
        <div className="noise-overlay absolute inset-0 opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-[#050505]/85 to-[#050505]" />
      </div>

      <div className="max-w-6xl mx-auto w-full text-center relative z-10 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 rounded-full border border-white/[0.1] bg-black/60 backdrop-blur-xl px-4 py-1.5 text-xs font-mono uppercase tracking-[0.25em] text-[#E1E0CC]/70 mb-8"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
          <span>{language === 'et' ? '09 / Valmisolek' : '09 / The Frontier'}</span>
        </motion.div>

        <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-normal tracking-[-0.05em] text-[#E1E0CC] leading-[0.9] max-w-5xl">
          {language === 'et' ? (
            <>
              TEEME TEIE BRÄNDI <br />
              <span className="text-white font-serif italic">VÄLTIMATUKS.</span>
            </>
          ) : (
            <>
              LET'S MAKE YOUR BRAND <br />
              <span className="text-white font-serif italic">UNDISPUTED.</span>
            </>
          )}
        </h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 sm:mt-8 max-w-xl text-xs sm:text-base md:text-lg text-[#E1E0CC]/70 font-light leading-relaxed"
        >
          {language === 'et'
            ? 'Käivitage kohene 30-päringuline audit või võtke ühendust meie arhitektidega süvendatud strateegia loomiseks.'
            : 'Initiate a live 30-prompt multi-engine visibility audit or engage our studio architects to secure strategic category dominance.'}
        </motion.p>

        {/* Big Action Pill */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 sm:mt-12"
        >
          <button
            type="button"
            onClick={onOpenScan}
            className="group relative inline-flex items-center gap-3 sm:gap-4 rounded-full bg-[#E1E0CC] hover:bg-white text-[#050505] p-2 pl-6 sm:pl-8 pr-2 text-sm sm:text-base md:text-lg font-semibold transition-all hover:scale-105 shadow-[0_0_40px_rgba(225,224,204,0.25)] cursor-pointer"
          >
            <span>{language === 'et' ? 'Käivita tasuta audit' : 'Start a project'}</span>
            <span className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-[#050505] text-[#E1E0CC] transition-transform group-hover:scale-110">
              <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-0.5 transition-transform" />
            </span>
          </button>
        </motion.div>

        {/* Metadata subline */}
        <div className="mt-12 pt-8 border-t border-white/[0.08] w-full max-w-md flex items-center justify-between text-xs text-[#E1E0CC]/40 font-mono">
          <span>Accepting Q2 / Q3 Audits</span>
          <span>•</span>
          <span>Zero Hallucinations</span>
        </div>
      </div>
    </section>
  );
};
