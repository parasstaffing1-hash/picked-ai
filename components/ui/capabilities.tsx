'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';

interface CapabilityItem {
  id: string;
  number: string;
  title: string;
  category: string;
  description: string;
  deliverables: string[];
  image: string;
}

const capabilities: CapabilityItem[] = [
  {
    id: 'aeo',
    number: '01',
    title: 'Generative Engine Optimization',
    category: 'GEO / AEO Architecture',
    description:
      'We engineer authoritative web infrastructure, JSON-LD knowledge graphs, and semantic entity hierarchies that generative LLMs ingest into their core vector weights.',
    deliverables: ['Entity Schema Injection', 'Semantic Corpus Indexing', 'Algorithmic Grounding'],
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 'audits',
    number: '02',
    title: 'Multi-Engine Model Auditing',
    category: 'Diagnostic Intelligence',
    description:
      'Automated synthetic consumer panels executing 30+ deep high-intent purchase queries across ChatGPT 4o, Google Gemini 1.5, and Google AI Overviews.',
    deliverables: ['Position Rank Extraction', 'Competitor Share-of-Voice', 'Sentiment & Evidence Tracing'],
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 'citations',
    number: '03',
    title: 'Citation Authority Engineering',
    category: 'Source Dominance',
    description:
      'Pinpoint exactly which external knowledge repositories, trade directories, and digital PR citations are feeding model answers and systematically conquer them.',
    deliverables: ['Citation Gap Blueprint', 'High-Affinity Placement', 'Digital PR Ingestion'],
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 'displacement',
    number: '04',
    title: 'Competitor Displacement Strategy',
    category: 'Market Dominance',
    description:
      'Dethrone incumbents who currently occupy the #1 recommended slot in AI buyer guides through comparative authority pages and structured rebuttal proof.',
    deliverables: ['Battlecard Playbooks', 'Head-to-Head Content Silos', 'Incumbent Flaw Mapping'],
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 'design',
    number: '05',
    title: 'Editorial Creative Systems',
    category: 'Brand & Motion Artistry',
    description:
      'Ultra-premium, cinematic digital interfaces that fuse high-end Swiss typography, film-grain texture, and fluid spring animations with conversion mechanics.',
    deliverables: ['Custom Motion Design', 'Design Token Frameworks', 'Bespoke Typography'],
    image: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 'telemetry',
    number: '06',
    title: 'Autonomous Model Telemetry',
    category: 'Continuous Defense',
    description:
      '24/7 background cron telemetry tracking model drift, temperature shifts, and algorithmic updates to guard your market leadership.',
    deliverables: ['Automated Drift Alerts', 'Weekly Visibility Delta', 'Continuous Model Polling'],
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1000&q=80',
  },
];

export const CapabilitiesSection: React.FC<{ language?: string }> = ({ language = 'en' }) => {
  const [activeItem, setActiveItem] = useState<string | null>(capabilities[0].id);

  return (
    <section id="capabilities" className="relative w-full py-24 sm:py-32 px-4 sm:px-6 lg:px-12 bg-[#050505]">
      <div className="max-w-7xl mx-auto w-full">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 sm:pb-16 border-b border-white/[0.08]">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#E1E0CC]/40">
                02 / CAPABILITIES
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-[#E1E0CC]">
              {language === 'et' ? 'Mida Me Teeme' : 'What We Do'}
            </h2>
          </div>
          <p className="max-w-md text-sm sm:text-base text-[#E1E0CC]/60 leading-relaxed font-light">
            {language === 'et'
              ? 'Täielik strateegiline ja tehniline arsenal, mis kindlustab teie ettevõtte positsiooni tehisintellekti soovitustes.'
              : 'The comprehensive strategic and technological apparatus engineered to win the generative recommendation economy.'}
          </p>
        </div>

        {/* Horizontal Editorial Rows */}
        <div className="divide-y divide-white/[0.08]">
          {capabilities.map((cap) => {
            const isActive = activeItem === cap.id;

            return (
              <div
                key={cap.id}
                onMouseEnter={() => setActiveItem(cap.id)}
                className={`group transition-all duration-300 py-8 sm:py-10 cursor-pointer ${
                  isActive ? 'bg-white/[0.02]' : 'hover:bg-white/[0.01]'
                }`}
              >
                <div className="grid grid-cols-12 items-center gap-4 sm:gap-6">
                  {/* Number */}
                  <div className="col-span-2 sm:col-span-1">
                    <span
                      className={`font-mono text-xs sm:text-sm tracking-widest transition-colors ${
                        isActive ? 'text-amber-400' : 'text-[#E1E0CC]/40 group-hover:text-[#E1E0CC]'
                      }`}
                    >
                      {cap.number}
                    </span>
                  </div>

                  {/* Title & Category */}
                  <div className="col-span-8 sm:col-span-7 lg:col-span-5">
                    <div className="flex flex-col">
                      <h3
                        className={`text-xl sm:text-3xl lg:text-4xl font-normal tracking-tight transition-transform duration-300 ${
                          isActive
                            ? 'text-white translate-x-2'
                            : 'text-[#E1E0CC]/80 group-hover:text-[#E1E0CC] group-hover:translate-x-1'
                        }`}
                      >
                        {cap.title}
                      </h3>
                      <span className="text-xs uppercase tracking-widest text-[#E1E0CC]/40 mt-1">
                        {cap.category}
                      </span>
                    </div>
                  </div>

                  {/* Desktop Preview Description */}
                  <div className="hidden lg:block lg:col-span-5">
                    <p className="text-xs sm:text-sm text-[#E1E0CC]/60 font-light leading-relaxed line-clamp-2">
                      {cap.description}
                    </p>
                    <div className="flex items-center gap-3 mt-2">
                      {cap.deliverables.map((item, idx) => (
                        <span key={idx} className="text-[11px] text-[#E1E0CC]/40 font-mono">
                          • {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Arrow Indicator */}
                  <div className="col-span-2 sm:col-span-4 lg:col-span-1 flex justify-end">
                    <div
                      className={`w-9 h-9 sm:w-11 sm:h-11 rounded-full flex items-center justify-center border transition-all duration-300 ${
                        isActive
                          ? 'bg-[#E1E0CC] text-[#050505] border-[#E1E0CC] scale-105'
                          : 'border-white/10 text-white/40 group-hover:border-white/30 group-hover:text-white'
                      }`}
                    >
                      <ArrowUpRight
                        className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 ${
                          isActive ? 'rotate-45' : 'group-hover:translate-x-0.5 group-hover:-translate-y-0.5'
                        }`}
                      />
                    </div>
                  </div>
                </div>

                {/* Mobile / Tablet Accordion Detail */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden lg:hidden pt-4 mt-4 border-t border-white/[0.04]"
                    >
                      <p className="text-xs sm:text-sm text-[#E1E0CC]/70 font-light leading-relaxed mb-3">
                        {cap.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {cap.deliverables.map((item, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] sm:text-xs font-mono px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-[#E1E0CC]/70"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
