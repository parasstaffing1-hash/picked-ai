'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface FinalCinematicCtaProps {
  language?: string;
  onOpenScan?: () => void;
}

export const FinalCinematicCtaSection: React.FC<FinalCinematicCtaProps> = ({
  language = 'en',
  onOpenScan,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' });

  return (
    <section
      ref={ref}
      className="relative min-h-[90vh] sm:min-h-screen w-full flex items-center justify-center p-3 sm:p-5 md:p-6 bg-[#050505] overflow-hidden"
    >
      {/* Cinematic Enclosure Box Echoing the Existing Hero */}
      <div className="relative h-full min-h-[calc(90vh-1.5rem)] sm:min-h-[calc(100vh-2.5rem)] md:min-h-[calc(100vh-3rem)] w-full overflow-hidden rounded-2xl md:rounded-[2.5rem] bg-black flex flex-col justify-between p-6 sm:p-12 md:p-16 lg:p-20 shadow-2xl">
        {/* Background Cinematic Texture / Ambient Scrim */}
        <img
          src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=2000&q=80"
          alt="Cinematic Stage"
          className="absolute inset-0 h-full w-full object-cover opacity-35 filter brightness-75 contrast-125"
        />
        <div className="noise-overlay pointer-events-none absolute inset-0 opacity-55 mix-blend-overlay" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-black/40 to-black/70" />

        {/* Top Tag */}
        <div className="relative z-10 flex items-center justify-between">
          <div className="inline-flex items-center gap-2 rounded-full bg-black/60 backdrop-blur-xl px-4 py-1.5 border border-[rgba(232,230,213,0.12)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E8B400] animate-pulse" />
            <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.25em] text-[#E8E6D5]/80">
              12 / THE CONCLUSION
            </span>
          </div>

          <span className="text-xs font-mono text-[rgba(232,230,213,0.40)] hidden sm:inline">
            Frontier AI Visibility
          </span>
        </div>

        {/* Center / Bottom Cinematic Typography & Action */}
        <div className="relative z-10 my-auto py-12 sm:py-16 max-w-4xl">
          <motion.h2
            initial={{ opacity: 0, y: 35 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-normal tracking-[-0.06em] text-[#E8E6D5] leading-[0.88]"
          >
            {language === 'et' ? (
              <>
                OLE <br />
                <span className="text-white font-serif italic">VASTUS.</span>
              </>
            ) : (
              <>
                BE THE <br />
                <span className="text-white font-serif italic">ANSWER.</span>
              </>
            )}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 text-base sm:text-lg md:text-xl text-[rgba(232,230,213,0.70)] font-light leading-relaxed max-w-xl"
          >
            {language === 'et'
              ? 'Käivita kohene 30-päringuline audit ja näe, kuidas juhtivad tehisintellekti mudelid sinu ettevõtet hindavad.'
              : 'Launch your 30-prompt multi-engine visibility audit to benchmark, diagnose, and capture algorithmic category dominance.'}
          </motion.p>

          {/* Luxury Pill CTA */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="mt-10 sm:mt-12"
          >
            <button
              type="button"
              onClick={onOpenScan}
              className="group inline-flex items-center gap-3 sm:gap-4 rounded-full bg-[#E8E6D5] hover:bg-white text-[#050505] p-2 pl-6 sm:pl-8 pr-2 text-sm sm:text-base font-semibold transition-all hover:scale-105 shadow-[0_0_40px_rgba(232,230,213,0.25)] cursor-pointer"
            >
              <span>{language === 'et' ? 'ALUSTA AUDITIT' : 'START YOUR AUDIT'}</span>
              <span className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-[#050505] text-[#E8E6D5] transition-transform group-hover:scale-110">
                <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </button>
          </motion.div>
        </div>

        {/* Bottom Metadata */}
        <div className="relative z-10 pt-6 border-t border-[rgba(232,230,213,0.10)] flex items-center justify-between text-xs font-mono text-[rgba(232,230,213,0.40)]">
          <span>Tallinn • London • San Francisco</span>
          <span>© {new Date().getFullYear()} Picked AI Intelligence Studio</span>
        </div>
      </div>
    </section>
  );
};
