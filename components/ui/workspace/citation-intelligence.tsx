'use client';

import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { Building2, Bot, CircleDot, Network } from 'lucide-react';
import { toast } from 'sonner';

export function CitationIntelligence() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-10%' });
  const prefersReducedMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      },
    },
  };

  const lineVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: { 
      pathLength: 1, 
      opacity: 1,
      transition: { 
        duration: 1.2, 
        ease: "easeInOut" as const,
        delay: 0.5 
      }
    }
  };

  const dashVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: { 
      pathLength: 1, 
      opacity: 0.4,
      transition: { 
        duration: 1.2, 
        ease: "easeInOut" as const,
        delay: 0.5 
      }
    }
  };

  return (
    <section className="bg-[#FAFAF8] py-20 sm:py-24">
      <div className="mx-auto max-w-5xl px-6">
        <motion.div
          ref={containerRef}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="flex flex-col items-center text-center mb-20"
        >
          <motion.div variants={itemVariants} className="mb-4 flex items-center space-x-2">
            <span className="font-mono text-xs font-semibold tracking-wider text-[#9B9B9B] uppercase">
              Citations
            </span>
          </motion.div>
          <motion.h2 
            variants={itemVariants}
            className="mb-4 text-3xl font-medium tracking-tight text-[#1A1A1A] sm:text-4xl"
          >
            How AI connects your brand to sources
          </motion.h2>
          <motion.p 
            variants={itemVariants}
            className="max-w-2xl text-base text-[#6B6B6B]"
          >
            Understand which sources AI uses to validate your business and where citation gaps exist.
          </motion.p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="relative mx-auto max-w-4xl mb-16"
        >
          {/* SVG Connection Lines Background */}
          <div className="absolute inset-0 z-0 pointer-events-none hidden md:block">
            <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 1000 400">
              {/* Business to Sources */}
              <motion.path d="M 150 200 C 250 200, 300 60, 400 60" fill="none" stroke="#1A1A1A" strokeWidth="1" variants={lineVariants} />
              <motion.path d="M 150 200 C 250 200, 300 130, 400 130" fill="none" stroke="#1A1A1A" strokeWidth="1" variants={lineVariants} />
              <motion.path d="M 150 200 C 250 200, 300 200, 400 200" fill="none" stroke="#1A1A1A" strokeWidth="1" variants={lineVariants} />
              <motion.path d="M 150 200 C 250 200, 300 270, 400 270" fill="none" stroke="#E8E8E6" strokeWidth="1" strokeDasharray="4 4" variants={dashVariants} />
              <motion.path d="M 150 200 C 250 200, 300 340, 400 340" fill="none" stroke="#E8E8E6" strokeWidth="1" strokeDasharray="4 4" variants={dashVariants} />
              
              {/* Sources to Engines */}
              <motion.path d="M 600 60 C 700 60, 750 100, 850 100" fill="none" stroke="#1A1A1A" strokeWidth="1" variants={lineVariants} />
              <motion.path d="M 600 130 C 700 130, 750 100, 850 100" fill="none" stroke="#1A1A1A" strokeWidth="1" variants={lineVariants} />
              <motion.path d="M 600 200 C 700 200, 750 200, 850 200" fill="none" stroke="#1A1A1A" strokeWidth="1" variants={lineVariants} />
              <motion.path d="M 600 60 C 700 60, 750 300, 850 300" fill="none" stroke="#1A1A1A" strokeWidth="1" variants={lineVariants} />
            </svg>
          </div>

          <div className="relative z-10 flex flex-col md:flex-row justify-between items-center md:items-stretch gap-10 md:gap-0 min-h-[400px]">
            {/* Left Column: Business */}
            <motion.div variants={itemVariants} className="flex flex-col justify-center w-full md:w-48 shrink-0">
              <div className="rounded-lg border border-[#E8E8E6] bg-white p-4 shadow-sm flex flex-col items-center justify-center text-center h-24">
                <Building2 className="h-5 w-5 text-[#1A1A1A] mb-2" />
                <span className="text-sm font-medium text-[#1A1A1A]">Your Business</span>
              </div>
            </motion.div>

            {/* Middle Column: Sources */}
            <motion.div variants={itemVariants} className="flex flex-col justify-between w-full md:w-64 py-4 space-y-4 md:space-y-0">
              {[
                { name: 'g2.com', connected: true, desc: 'Verified 14 brand recommendations in ChatGPT & Gemini' },
                { name: 'capterra.com', connected: true, desc: 'Verified 11 citations across software buyer guides' },
                { name: 'trustpilot.com', connected: true, desc: 'Verified customer sentiment rating of 4.8/5' },
                { name: 'techcrunch.com', connected: false, desc: 'Gap: Competitors cited in 3 articles, your brand is missing' },
                { name: 'forbes.com', connected: false, desc: 'Gap: No editorial mention indexed by Google AI Overviews' },
              ].map((source, i) => (
                <div 
                  key={i} 
                  onClick={() => {
                    if (source.connected) {
                      toast.success(`Active Citation: ${source.name}`, {
                        description: source.desc,
                      });
                    } else {
                      toast.warning(`Citation Gap: ${source.name}`, {
                        description: source.desc,
                      });
                    }
                  }}
                  className={`flex items-center justify-between px-4 py-3 rounded-lg border transition-all cursor-pointer select-none ${
                    source.connected 
                      ? 'border-[#E8E8E6] bg-white shadow-2xs hover:bg-[#F5F5F3]' 
                      : 'border-dashed border-[#D0D0CE] bg-white/40 hover:bg-white text-[#9B9B9B]'
                  }`}
                >
                  <div className="flex items-center">
                    <div className={`w-2 h-2 rounded-full mr-3 ${source.connected ? 'bg-emerald-500' : 'bg-[#D0D0CE]'}`} />
                    <span className={`text-sm font-mono ${source.connected ? 'text-[#1A1A1A] font-medium' : 'text-[#6B6B6B]'}`}>
                      {source.name}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-[#9B9B9B]">
                    {source.connected ? 'Verified' : 'Gap'}
                  </span>
                </div>
              ))}
            </motion.div>

            {/* Right Column: AI Engines */}
            <motion.div variants={itemVariants} className="flex flex-col justify-around w-full md:w-48 shrink-0 py-8 space-y-8 md:space-y-0">
              {[
                { name: 'ChatGPT' },
                { name: 'Gemini' },
                { name: 'AI Overviews' }
              ].map((engine, i) => (
                <div key={i} className="rounded-lg border border-[#E8E8E6] bg-white p-4 shadow-sm flex flex-col items-center justify-center text-center h-20">
                  <Bot className="h-4 w-4 text-[#6B6B6B] mb-1" />
                  <span className="text-sm font-medium text-[#1A1A1A]">{engine.name}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Bottom Stats */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-3 divide-x divide-[#E8E8E6] rounded-lg border border-[#E8E8E6] bg-white max-w-2xl mx-auto shadow-sm"
        >
          <div className="p-6 text-center">
            <div className="text-2xl font-semibold text-[#1A1A1A]">12</div>
            <div className="text-xs text-[#6B6B6B] mt-1 font-mono uppercase tracking-wider">Active Citations</div>
          </div>
          <div className="p-6 text-center">
            <div className="text-2xl font-semibold text-[#1A1A1A]">5</div>
            <div className="text-xs text-[#6B6B6B] mt-1 font-mono uppercase tracking-wider">Citation Gaps</div>
          </div>
          <div className="p-6 text-center">
            <div className="text-2xl font-semibold text-[#1A1A1A]">71%</div>
            <div className="text-xs text-[#6B6B6B] mt-1 font-mono uppercase tracking-wider">Source Coverage</div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
