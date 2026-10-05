'use client';

import React, { useRef } from 'react';
import { motion, useInView, useScroll, useTransform, useReducedMotion } from 'framer-motion';

interface AnimatedHeadingProps {
  lines: string[];
  eyebrow?: string;
  tagline?: string;
  className?: string;
  align?: 'left' | 'center' | 'right';
}

export const AnimatedHeading: React.FC<AnimatedHeadingProps> = ({
  lines,
  eyebrow,
  tagline,
  className = '',
  align = 'left',
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-10% 0px -10% 0px' });
  const shouldReduceMotion = useReducedMotion();

  const alignClass =
    align === 'center'
      ? 'text-center items-center'
      : align === 'right'
      ? 'text-right items-end'
      : 'text-left items-start';

  return (
    <div ref={ref} className={`flex flex-col ${alignClass} ${className}`}>
      {eyebrow && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-3.5 py-1 text-xs tracking-widest uppercase text-[#E1E0CC]/60"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
          {eyebrow}
        </motion.div>
      )}

      <h2 className="flex flex-col font-medium tracking-tight text-[#E1E0CC] leading-[0.92]">
        {lines.map((line, idx) => (
          <div key={idx} className="overflow-hidden">
            <motion.span
              initial={{ y: shouldReduceMotion ? 0 : 50, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : {}}
              transition={{
                duration: 0.8,
                delay: idx * 0.12,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="inline-block text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl tracking-[-0.03em]"
            >
              {line}
            </motion.span>
          </div>
        ))}
      </h2>

      {tagline && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: lines.length * 0.12 + 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 max-w-2xl text-sm sm:text-base md:text-lg text-[#E1E0CC]/70 leading-relaxed font-light"
        >
          {tagline}
        </motion.p>
      )}
    </div>
  );
};

/* ---------------- Editorial Intro Section (Section 3) ---------------- */
export const IntroSection: React.FC<{ language?: string }> = ({ language = 'en' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0.1, 0.4, 0.7, 0.9], [0.2, 1, 1, 0.3]);
  const y = useTransform(scrollYProgress, [0.1, 0.5], [40, 0]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[70vh] sm:min-h-[85vh] w-full flex items-center justify-center px-4 sm:px-6 lg:px-12 py-24 sm:py-32 overflow-hidden border-t border-white/[0.04]"
    >
      {/* Background ambient lighting */}
      <div className="absolute inset-0 pointer-events-none noise-overlay opacity-30" />
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-amber-400/[0.03] blur-[120px] rounded-full pointer-events-none" />

      <motion.div
        style={{ opacity, y }}
        className="max-w-6xl mx-auto w-full flex flex-col items-start gap-8 sm:gap-12 relative z-10"
      >
        <div className="flex items-center gap-3">
          <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#E1E0CC]/40">
            01 / MANIFESTO
          </span>
          <span className="w-12 h-px bg-white/10" />
        </div>

        <div className="space-y-2 sm:space-y-4">
          <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-normal tracking-[-0.04em] text-[#E1E0CC] leading-[1.05]">
            {language === 'et' ? (
              <>
                ME EHITAME <span className="text-white font-medium">DIGITAALSEID KOGEMUSI</span>, MIS KÕNETAVAD NII INIMESI KUI KA TEHISINTELLEKTI.
              </>
            ) : (
              <>
                WE ARCHITECT <span className="text-white font-medium">DIGITAL EXPERIENCES</span> THAT COMMAND ATTENTION ACROSS BOTH HUMAN MINDS AND AI MODELS.
              </>
            )}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-10 pt-6 sm:pt-10 border-t border-white/[0.08] w-full">
          <div className="md:col-span-4">
            <span className="text-xs uppercase tracking-widest text-[#E1E0CC]/40 font-mono">
              The Evolution
            </span>
          </div>
          <div className="md:col-span-8 space-y-4">
            <p className="text-base sm:text-xl text-[#E1E0CC]/80 font-light leading-relaxed">
              {language === 'et'
                ? 'Klassikaline otsing on asendumas generatiivse tehisintellektiga. Kui teie ettevõtet ei mainita ChatGPT, Gemini ja Google AI Overviews vastustes, olete tuleviku ostuotsustest välja lülitatud.'
                : 'Search engines are morphing into conversational synthesis engines. When buyers ask generative models for recommendations, legacy SEO is blind. We reverse-engineer algorithmic conviction to ensure your brand is cited, ranked, and chosen.'}
            </p>
            <div className="flex flex-wrap items-center gap-6 pt-2 text-xs sm:text-sm text-[#E1E0CC]/50 font-mono">
              <span>• ChatGPT 4o Synthesis</span>
              <span>• Gemini 1.5 Grounding</span>
              <span>• Google AI Overviews</span>
              <span>• Zero Slop, Pure Precision</span>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
