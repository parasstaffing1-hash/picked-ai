'use client';

import React, { useRef } from 'react';
import { motion, useInView, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { ArrowRight, ChevronDown, Sparkles } from 'lucide-react';
import { SupportedLanguage } from '@/types/scanner';

// Replaceable hero video asset constant
export const HERO_VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_170732_8a9ccda6-5cff-4628-b164-059c500a2b41.mp4';

/* ---------------- WordsPullUp ---------------- */
interface WordsPullUpProps {
  text: string;
  className?: string;
  showAsterisk?: boolean;
  style?: React.CSSProperties;
}

export const WordsPullUp = ({
  text,
  className = '',
  showAsterisk = false,
  style,
}: WordsPullUpProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const words = text.split(' ');

  return (
    <div ref={ref} className={`inline-flex flex-wrap ${className}`} style={style}>
      {words.map((word, i) => {
        const isLast = i === words.length - 1;
        return (
          <motion.span
            key={i}
            initial={{ y: 30, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="inline-block relative"
            style={{ marginRight: isLast ? 0 : '0.25em' }}
          >
            {word}
            {showAsterisk && isLast && (
              <span className="absolute top-[0.65em] -right-[0.32em] text-[0.32em] text-[#FFAE00] drop-shadow-[0_0_24px_rgba(255,174,0,0.95)] font-serif font-black">
                *
              </span>
            )}
          </motion.span>
        );
      })}
    </div>
  );
};

/* ---------------- WordsPullUpMultiStyle ---------------- */
interface Segment {
  text: string;
  className?: string;
}

interface WordsPullUpMultiStyleProps {
  segments: Segment[];
  className?: string;
  style?: React.CSSProperties;
}

export const WordsPullUpMultiStyle = ({
  segments,
  className = '',
  style,
}: WordsPullUpMultiStyleProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  const words: { word: string; className?: string }[] = [];
  segments.forEach((seg) => {
    seg.text.split(' ').forEach((w) => {
      if (w) words.push({ word: w, className: seg.className });
    });
  });

  return (
    <div ref={ref} className={`inline-flex flex-wrap justify-center ${className}`} style={style}>
      {words.map((w, i) => (
        <motion.span
          key={i}
          initial={{ y: 20, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
          className={`inline-block ${w.className ?? ''}`}
          style={{ marginRight: '0.25em' }}
        >
          {w.word}
        </motion.span>
      ))}
    </div>
  );
};

/* ---------------- Cinematic Hero Section ---------------- */
interface PrismaHeroProps {
  language?: SupportedLanguage;
  onLanguageChange?: (lang: SupportedLanguage) => void;
  onSubmit?: (url: string, email: string) => Promise<void>;
  onOpenScan?: () => void;
  onOpenLeads?: () => void;
  isLoading?: boolean;
}

export const PrismaHero: React.FC<PrismaHeroProps> = ({
  language = 'en',
  onOpenScan,
}) => {
  const heroRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Scroll transition linking into next section
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const videoScale = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? [1, 1] : [1, 1.08]);
  const videoOpacity = useTransform(scrollYProgress, [0, 0.8], [0.85, 0.3]);
  const contentY = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? [0, 0] : [0, -70]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0.15]);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden bg-[#050505] p-0"
    >
      {/* Full-Screen Endless Cinematic Viewport */}
      <div className="relative h-full min-h-screen w-full overflow-hidden rounded-none bg-black">
        {/* Background Ambient Video with Enhanced Color Saturation & Vibrancy */}
        <motion.video
          style={{ scale: videoScale, opacity: videoOpacity }}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover filter saturate-[1.4] contrast-[1.12] brightness-[1.15]"
          src={HERO_VIDEO_URL}
        />

        {/* Luminous Warm Sunset / Prismatic Color Glow Aura */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-amber-500/20 via-orange-500/15 to-sky-400/15 mix-blend-screen" />
        <div className="pointer-events-none absolute -top-20 -right-20 w-[600px] h-[500px] bg-gradient-to-br from-amber-400/25 via-orange-500/20 to-transparent blur-[140px] rounded-full" />
        <div className="pointer-events-none absolute bottom-0 left-1/3 w-[500px] h-[300px] bg-emerald-500/10 blur-[120px] rounded-full mix-blend-screen" />

        {/* Fine Noise Texture with Gentle Opacity (doesn't wash out color) */}
        <div className="noise-overlay pointer-events-none absolute inset-0 opacity-[0.18] mix-blend-overlay" />

        {/* Transparent Scrims: Keep center 100% vibrant, gentle bottom gradient for text contrast */}
        <div className="pointer-events-none absolute top-0 left-0 right-0 h-36 bg-gradient-to-b from-black/45 via-black/10 to-transparent" />
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-[50%] bg-gradient-to-t from-[#050505]/95 via-[#050505]/40 to-transparent" />

        {/* Hero Content Layer */}
        <motion.div
          style={{ y: contentY, opacity: contentOpacity }}
          className="absolute inset-0 flex flex-col justify-between p-6 sm:p-10 md:p-12 lg:p-16 z-10"
        >
          {/* Top Brand Subtitle */}
          <div className="pt-20 sm:pt-24 flex items-center justify-between">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2.5 rounded-full bg-black/60 backdrop-blur-2xl px-4 py-1.5 border border-white/[0.12] shadow-[0_4px_20px_rgba(0,0,0,0.5)]"
            >
              <span className="w-2 h-2 rounded-full bg-[#FFAE00] shadow-[0_0_10px_rgba(255,174,0,0.9)] animate-pulse" />
              <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#F4F2E6]">
                Frontier AI Visibility Intelligence Platform
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="hidden md:flex items-center gap-3 text-xs font-mono text-[#E1E0CC]/50"
            >
              <span>ChatGPT 4o</span>
              <span>•</span>
              <span>Gemini 1.5</span>
              <span>•</span>
              <span>Google AIO</span>
            </motion.div>
          </div>

          {/* Bottom Grid: Giant Typography & Editorial Action */}
          <div className="grid grid-cols-12 items-end gap-6 sm:gap-8 pb-4 sm:pb-8">
            {/* Giant Monolithic Word */}
            <div className="col-span-12 lg:col-span-8">
              <h1
                className="font-normal leading-[0.82] tracking-[-0.07em] text-[25vw] sm:text-[23vw] md:text-[21vw] lg:text-[19vw] xl:text-[18vw]"
                style={{
                  color: '#F4F2E6',
                  textShadow: '0 4px 35px rgba(0, 0, 0, 0.75), 0 1px 3px rgba(0, 0, 0, 0.9)',
                }}
              >
                <WordsPullUp text={language === 'et' ? 'Nähtav' : 'Picked'} showAsterisk />
              </h1>
            </div>

            {/* Right Editorial Statement & CTA */}
            <div className="col-span-12 flex flex-col gap-6 lg:col-span-4 pb-2 lg:pb-6">
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="text-xs sm:text-sm md:text-base text-[#F4F2E6]/90 font-light leading-relaxed max-w-md drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]"
              >
                {language === 'et'
                  ? 'Picked AI analüüsib, hindab ja optimeerib, kuidas ChatGPT, Gemini ja Google AI Overviews teie brändi ostuotsustes soovitavad ja tsiteerivad.'
                  : 'Picked AI continuously audits, scores, and optimizes how ChatGPT, Google Gemini, and AI Overviews recommend and cite your business across high-intent buyer searches.'}
              </motion.p>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-center gap-4"
              >
                <button
                  type="button"
                  onClick={onOpenScan}
                  className="group inline-flex items-center gap-3 rounded-full bg-[#F4F2E6] hover:bg-white p-1 pl-6 pr-1 text-xs sm:text-sm md:text-base font-semibold text-[#050505] transition-all hover:scale-105 shadow-[0_0_35px_rgba(255,180,0,0.3)] hover:shadow-[0_0_45px_rgba(255,180,0,0.5)] cursor-pointer"
                >
                  <span>{language === 'et' ? 'Käivita tasuta audit' : 'Run Free Audit'}</span>
                  <span className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-[#050505] text-[#FFAE00] transition-transform group-hover:scale-105">
                    <ArrowRight className="h-4 w-4 text-[#FFAE00] group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </button>

                <a
                  href="#overview"
                  className="hidden sm:inline-flex text-xs font-mono uppercase tracking-widest text-[#F4F2E6]/70 hover:text-white transition-colors drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
                >
                  Explore Intelligence ↓
                </a>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Scroll Cue Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1 text-[10px] font-mono uppercase tracking-widest text-[#E1E0CC]/40 pointer-events-none"
        >
          <span className="animate-bounce">↓</span>
        </motion.div>
      </div>
    </section>
  );
};
