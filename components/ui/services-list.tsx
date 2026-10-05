'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Sparkles, Shield, Cpu, Compass, Layers } from 'lucide-react';

interface Service {
  id: string;
  num: string;
  name: string;
  scope: string;
  summary: string;
  details: string[];
  image: string;
}

const services: Service[] = [
  {
    id: 'authority',
    num: '01',
    name: 'Synthetic Brand Authority',
    scope: 'Foundational Positioning',
    summary:
      'We establish foundational brand entities across Wikipedia, Wikidata, trade publications, and authoritative datasets ingested into core neural weights.',
    details: ['Wikidata Entity Ingestion', 'Schema.org Graph Engineering', 'Verified Entity Grounding'],
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 'retrieval',
    num: '02',
    name: 'Retrieval Augmented Dominance',
    scope: 'Vector & Search Grounding',
    summary:
      'Optimizing content architectures for real-time web retrieval models (Google AI Overviews, Perplexity, Bing Copilot) so your pages become primary cited URLs.',
    details: ['Answer Engine Microcopy', 'Deep Subpath Indexing', 'High-Affinity Citation Acquisition'],
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 'diagnostics',
    num: '03',
    name: 'Multi-Engine Simulated Auditing',
    scope: 'Empirical Telemetry',
    summary:
      'Deploying algorithmic buyer simulations across 30+ intent archetypes. We test exact queries your prospective customers enter before signing contracts.',
    details: ['ChatGPT 4o Penetration', 'Google Gemini 1.5 Grounding', 'Multi-Intent Prompt Battery'],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 'displacement',
    num: '04',
    name: 'Incumbent Displacement Strategy',
    scope: 'Market Conquest',
    summary:
      'Systematically dismantling competitor visibility by publishing objective comparison frameworks and resolving citation blind spots that keep you off shortlist answers.',
    details: ['Feature Delta Matrix', 'Rebuttal Silo Generation', 'Competitor Share Reclamation'],
    image: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 'telemetry',
    num: '05',
    name: 'Executive Visibility Telemetry',
    scope: 'Continuous Governance',
    summary:
      'Board-ready visibility dashboards, real-time citation drift tracking, and automated alerts whenever an engine updates its weights or citations shift.',
    details: ['Aiven Cloud PostgreSQL Storage', 'Resend Executive Dispatch', 'Automated Anomaly Alerts'],
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1000&q=80',
  },
];

export const ServicesListSection: React.FC<{ language?: string }> = ({ language = 'en' }) => {
  const [activeService, setActiveService] = useState<string | null>(services[0].id);

  return (
    <section id="services" className="relative w-full py-24 sm:py-36 px-4 sm:px-6 lg:px-12 bg-[#050505] border-t border-white/[0.04]">
      <div className="max-w-7xl mx-auto w-full">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-16 sm:pb-20 border-b border-white/[0.08]">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#E1E0CC]/40">
                06 / SERVICES
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-[#E1E0CC]">
              {language === 'et' ? 'Teenuste Programm' : 'Strategic Programs'}
            </h2>
          </div>
          <p className="max-w-md text-sm sm:text-base text-[#E1E0CC]/60 leading-relaxed font-light">
            {language === 'et'
              ? 'Meie spetsialiseeritud programmid viivad teie brändi tehisintellekti esmaseks soovituseks.'
              : 'Precision engagements designed to audit, capture, and defend commanding visibility across all consumer AI models.'}
          </p>
        </div>

        {/* Expandable Rows */}
        <div className="divide-y divide-white/[0.08]">
          {services.map((service) => {
            const isOpen = activeService === service.id;

            return (
              <div
                key={service.id}
                onClick={() => setActiveService(isOpen ? null : service.id)}
                className={`group py-8 sm:py-12 cursor-pointer transition-colors duration-300 ${
                  isOpen ? 'bg-white/[0.02]' : 'hover:bg-white/[0.01]'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-baseline gap-4 sm:gap-8">
                    <span
                      className={`font-mono text-xs sm:text-sm tracking-widest transition-colors ${
                        isOpen ? 'text-amber-400 font-bold' : 'text-[#E1E0CC]/40 group-hover:text-[#E1E0CC]'
                      }`}
                    >
                      {service.num}
                    </span>
                    <div>
                      <h3
                        className={`text-xl sm:text-3xl lg:text-4xl font-normal tracking-tight transition-transform duration-300 ${
                          isOpen ? 'text-white translate-x-1' : 'text-[#E1E0CC]/90 group-hover:text-white'
                        }`}
                      >
                        {service.name}
                      </h3>
                      <span className="text-xs uppercase tracking-widest text-[#E1E0CC]/40 mt-1 block">
                        {service.scope}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 self-end sm:self-center">
                    <span className="hidden md:inline text-xs font-mono text-[#E1E0CC]/40">
                      {isOpen ? 'Expanded' : 'Explore'}
                    </span>
                    <div
                      className={`w-9 h-9 sm:w-11 sm:h-11 rounded-full flex items-center justify-center border transition-all duration-300 ${
                        isOpen
                          ? 'bg-[#E1E0CC] text-[#050505] border-[#E1E0CC] rotate-90'
                          : 'border-white/10 text-white/40 group-hover:border-white/30 group-hover:text-white'
                      }`}
                    >
                      <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                  </div>
                </div>

                {/* Animated Drawer Details */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden pt-6 sm:pt-8"
                    >
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 border-t border-white/[0.04] pt-6">
                        <div className="lg:col-span-8">
                          <p className="text-sm sm:text-base text-[#E1E0CC]/80 font-light leading-relaxed max-w-2xl">
                            {service.summary}
                          </p>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-6">
                            {service.details.map((detail, idx) => (
                              <div
                                key={idx}
                                className="p-3 rounded-xl border border-white/[0.06] bg-white/[0.02] flex items-center gap-2"
                              >
                                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                                <span className="text-xs text-[#E1E0CC]/80 font-mono">{detail}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="lg:col-span-4 hidden lg:block">
                          <div className="relative aspect-[16/10] rounded-xl overflow-hidden border border-white/[0.08]">
                            <img
                              src={service.image}
                              alt={service.name}
                              className="h-full w-full object-cover opacity-75"
                            />
                            <div className="noise-overlay pointer-events-none absolute inset-0 opacity-40" />
                          </div>
                        </div>
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
