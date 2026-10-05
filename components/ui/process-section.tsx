'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Search, Compass, Sliders, Cpu, Rocket } from 'lucide-react';

interface Step {
  num: string;
  title: string;
  subtitle: string;
  description: string;
  icon: any;
}

const steps: Step[] = [
  {
    num: '01',
    title: 'Discover & Crawl',
    subtitle: 'Deep Asset Ingestion',
    description:
      'We crawl your site structure, extracting core entity identifiers, leadership profiles, product specifications, and target geographical markets.',
    icon: Search,
  },
  {
    num: '02',
    title: 'Define & Simulate',
    subtitle: '30-Prompt Neural Battery',
    description:
      'We formulate 10 high-intent buyer questions tailored to your category and test them across ChatGPT 4o, Google Gemini, and Google AI Overviews.',
    icon: Compass,
  },
  {
    num: '03',
    title: 'Diagnose & Gap Map',
    subtitle: 'Empirical Scoring',
    description:
      'We extract exact ranking positions, quote verbatim evidence, and identify which competitors and external sources models cite when ignoring you.',
    icon: Sliders,
  },
  {
    num: '04',
    title: 'Engineer & Ground',
    subtitle: 'Citation Architecture',
    description:
      'We deploy Schema.org JSON-LD microdata, knowledge graph entities, and authority placements to make your brand the definitive consensus answer.',
    icon: Cpu,
  },
  {
    num: '05',
    title: 'Launch & Defend',
    subtitle: 'Continuous Telemetry',
    description:
      'Live 24/7 background telemetry alerts you whenever algorithms shift weights, ensuring permanent search sovereignty.',
    icon: Rocket,
  },
];

export const ProcessSection: React.FC<{ language?: string }> = ({ language = 'en' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 80%', 'end 20%'],
  });

  const progressScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section
      id="process"
      ref={containerRef}
      className="relative w-full py-24 sm:py-36 px-4 sm:px-6 lg:px-12 bg-[#050505] border-t border-white/[0.04] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-16 sm:pb-24 border-b border-white/[0.08]">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#E1E0CC]/40">
                07 / METHODOLOGY
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-[#E1E0CC]">
              {language === 'et' ? 'Tööprotsess' : 'The Execution Arc'}
            </h2>
          </div>
          <p className="max-w-md text-sm sm:text-base text-[#E1E0CC]/60 leading-relaxed font-light">
            {language === 'et'
              ? 'Viis täpset sammu toorandmetest kuni tehisintellekti soovituste vallutamiseni.'
              : 'Five disciplined phases converting raw domain footprint into authoritative model endorsement.'}
          </p>
        </div>

        {/* Desktop Horizontal Process Arc */}
        <div className="hidden lg:block pt-16 relative">
          {/* Connecting glowing baseline */}
          <div className="absolute top-24 left-0 right-0 h-px bg-white/10" />
          <motion.div
            style={{ scaleX: progressScale, transformOrigin: '0% 50%' }}
            className="absolute top-24 left-0 right-0 h-px bg-gradient-to-r from-amber-400 via-[#E1E0CC] to-amber-300"
          />

          <div className="grid grid-cols-5 gap-6 relative z-10">
            {steps.map((step, idx) => {
              const Icon = step.icon;

              return (
                <div key={step.num} className="flex flex-col items-start group">
                  {/* Step Marker */}
                  <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-black border border-white/[0.1] text-[#E1E0CC] group-hover:border-amber-400/80 group-hover:text-amber-400 transition-colors mb-8 shadow-xl">
                    <Icon className="w-6 h-6" />
                  </div>

                  <span className="text-xs font-mono text-amber-400/80 tracking-widest uppercase mb-1">
                    Step {step.num}
                  </span>
                  <h3 className="text-xl font-normal text-white tracking-tight mb-1 group-hover:text-white transition-colors">
                    {step.title}
                  </h3>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-[#E1E0CC]/40 mb-3 block">
                    {step.subtitle}
                  </span>
                  <p className="text-xs text-[#E1E0CC]/60 font-light leading-relaxed">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile / Tablet Vertical Timeline */}
        <div className="lg:hidden pt-12 relative">
          {/* Vertical connecting line */}
          <div className="absolute top-12 bottom-12 left-5 w-px bg-white/10" />

          <div className="flex flex-col gap-10">
            {steps.map((step) => {
              const Icon = step.icon;

              return (
                <div key={step.num} className="flex items-start gap-5 relative">
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-black border border-white/[0.12] text-amber-400 flex items-center justify-center z-10 shadow-lg">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[11px] font-mono text-amber-400 uppercase tracking-widest">
                      Step {step.num} • {step.subtitle}
                    </span>
                    <h3 className="text-lg font-normal text-white tracking-tight mt-0.5">
                      {step.title}
                    </h3>
                    <p className="text-xs text-[#E1E0CC]/70 font-light leading-relaxed mt-2">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
