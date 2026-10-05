'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export const AiVisibilityIntro: React.FC<{ language?: string }> = ({ language = 'en' }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' });

  return (
    <section
      ref={ref}
      className="relative min-h-[75vh] sm:min-h-[85vh] w-full flex items-center justify-center px-4 sm:px-8 lg:px-16 py-28 sm:py-36 bg-[#050505] overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#E8B400]/[0.02] blur-[150px] rounded-full pointer-events-none" />
      <div className="noise-overlay pointer-events-none absolute inset-0 opacity-40" />

      <div className="max-w-6xl mx-auto w-full flex flex-col items-start relative z-10">
        {/* Tiny uppercase metadata */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-3 mb-8 sm:mb-12"
        >
          <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#E8E6D5]/40">
            01 / THE NEW DISCOVERY
          </span>
          <span className="w-12 h-px bg-[rgba(232,230,213,0.12)]" />
        </motion.div>

        {/* Large Statement */}
        <div className="space-y-2 sm:space-y-4">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-normal tracking-[-0.04em] text-[#E8E6D5] leading-[0.95]"
          >
            {language === 'et' ? (
              <>
                TEIE KLIENDID <br />
                <span className="text-white font-medium">KÜSIVAD TEHISINTELLEKTILT.</span>
              </>
            ) : (
              <>
                YOUR CUSTOMERS <br />
                <span className="text-white font-medium">ARE ASKING AI.</span>
              </>
            )}
          </motion.h2>
        </div>

        {/* Supporting Copy */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 sm:mt-16 max-w-2xl border-t border-[rgba(232,230,213,0.10)] pt-8 w-full"
        >
          <p className="text-base sm:text-xl md:text-2xl text-[rgba(232,230,213,0.62)] font-light leading-relaxed">
            {language === 'et'
              ? 'Picked näitab reaalajas, kuidas juhtivad tehisintellekti mudelid avastavad, soovitavad, võrdlevad ja tsiteerivad teie ettevõtet.'
              : 'Picked shows how frontier AI systems discover, recommend, compare and cite your business.'}
          </p>
          <div className="mt-6 flex items-center gap-4 text-xs font-mono text-[rgba(232,230,213,0.40)] uppercase tracking-wider">
            <span>ChatGPT 4o</span>
            <span>•</span>
            <span>Gemini 1.5</span>
            <span>•</span>
            <span>Google AI Overviews</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
