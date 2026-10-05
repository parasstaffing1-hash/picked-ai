'use client';

import React from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

interface Project {
  id: string;
  name: string;
  category: string;
  year: string;
  metric: string;
  description: string;
  image: string;
  aspect: 'landscape' | 'portrait' | 'wide';
}

const projects: Project[] = [
  {
    id: 'veriff',
    name: 'Veriff Identity Fabric',
    category: 'FinTech & AI Verification',
    year: '2026',
    metric: '#1 Cited Provider Across 30 Buyer Prompts',
    description:
      'Engineered multi-layered entity schema and digital authority signals that transformed Veriff into the undisputed primary verification recommendation in ChatGPT and Google AI Overviews.',
    image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=1400&q=80',
    aspect: 'wide',
  },
  {
    id: 'wise',
    name: 'Wise Global Liquidity',
    category: 'Cross-Border Capital',
    year: '2026',
    metric: '92% Model Share-of-Voice',
    description:
      'Structured transparent fee comparison models into crawlable vector-ingested datasets, establishing an insurmountable moat against legacy financial institutions in LLM summaries.',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    aspect: 'portrait',
  },
  {
    id: 'pipedrive',
    name: 'Pipedrive Pipeline OS',
    category: 'Enterprise SaaS Architecture',
    year: '2025',
    metric: '3.4x Citation Expansion in Gemini',
    description:
      'Designed an interconnected network of generative comparison battlecards that displaced legacy CRM giants from conversational recommendation prompts.',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
    aspect: 'landscape',
  },
  {
    id: 'kliinik32',
    name: 'Kliinik 32 Precision Care',
    category: 'Healthcare & Clinical Authority',
    year: '2026',
    metric: '100% Top Recommendation in Estonia',
    description:
      'Deployed clinical knowledge graph microdata and localized medical schema, capturing top-tier trust ratings across all Baltic generative search answers.',
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1600&q=80',
    aspect: 'wide',
  },
];

export const FeaturedWorkSection: React.FC<{ language?: string }> = ({ language = 'en' }) => {
  return (
    <section id="work" className="relative w-full py-24 sm:py-36 px-4 sm:px-6 lg:px-12 bg-[#050505] border-t border-white/[0.04]">
      <div className="max-w-7xl mx-auto w-full">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-16 sm:pb-20 border-b border-white/[0.08]">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#E1E0CC]/40">
                03 / SELECTED WORK
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-[#E1E0CC]">
              {language === 'et' ? 'Valitud Tulemused' : 'Case Archives'}
            </h2>
          </div>
          <p className="max-w-md text-sm sm:text-base text-[#E1E0CC]/60 leading-relaxed font-light">
            {language === 'et'
              ? 'Kuidas me aitasime turuliidritel kindlustada esikoha generatiivse otsingu soovitustes ja suurendada müügilehtede tsiteeritavust.'
              : 'Empirical visibility engineering across market-defining companies. Measurable share-of-voice captured inside frontier neural models.'}
          </p>
        </div>

        {/* Project 1: Full-Width Cinematic Masterpiece */}
        <div className="pt-12 sm:pt-16 pb-20 sm:pb-24 border-b border-white/[0.08]">
          <div className="group relative overflow-hidden rounded-2xl md:rounded-3xl border border-white/[0.08] bg-black">
            <div className="relative aspect-[16/9] sm:aspect-[21/9] w-full overflow-hidden">
              <img
                src={projects[0].image}
                alt={projects[0].name}
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
              <div className="noise-overlay pointer-events-none absolute inset-0 opacity-40" />

              {/* Floating Top Badge */}
              <div className="absolute top-4 left-4 sm:top-6 sm:left-6 flex items-center gap-3">
                <span className="rounded-full bg-black/60 backdrop-blur-xl px-3 py-1 text-[11px] font-mono uppercase tracking-widest text-amber-400 border border-white/10">
                  {projects[0].metric}
                </span>
                <span className="rounded-full bg-black/60 backdrop-blur-xl px-3 py-1 text-[11px] font-mono text-[#E1E0CC]/70 border border-white/10">
                  {projects[0].year}
                </span>
              </div>

              {/* Bottom Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10 md:p-12">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                  <div className="max-w-2xl">
                    <span className="text-xs uppercase tracking-widest text-[#E1E0CC]/50 font-mono">
                      {projects[0].category}
                    </span>
                    <h3 className="text-2xl sm:text-4xl md:text-5xl font-normal text-white mt-1 tracking-tight">
                      {projects[0].name}
                    </h3>
                    <p className="text-xs sm:text-sm md:text-base text-[#E1E0CC]/80 mt-3 font-light leading-relaxed">
                      {projects[0].description}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 rounded-full bg-[#E1E0CC] text-[#050505] px-4 py-2 text-xs sm:text-sm font-semibold self-start md:self-auto transition-transform group-hover:scale-105">
                    <span>Inspect Blueprint</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Projects 2 & 3: Asymmetrical Grid (Small Left / Large Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 py-16 sm:py-24 border-b border-white/[0.08]">
          {/* Project 2: Wise (5 columns) */}
          <div className="lg:col-span-5 flex flex-col justify-between group">
            <div className="relative aspect-[4/5] sm:aspect-[3/4] w-full overflow-hidden rounded-2xl md:rounded-3xl border border-white/[0.08] bg-black">
              <img
                src={projects[1].image}
                alt={projects[1].name}
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
              <div className="noise-overlay pointer-events-none absolute inset-0 opacity-40" />

              <div className="absolute top-4 left-4 flex items-center gap-2">
                <span className="rounded-full bg-black/60 backdrop-blur-xl px-2.5 py-1 text-[10px] font-mono text-amber-400 border border-white/10">
                  {projects[1].metric}
                </span>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                <span className="text-[11px] uppercase tracking-widest text-[#E1E0CC]/50 font-mono">
                  {projects[1].category}
                </span>
                <h3 className="text-xl sm:text-3xl font-normal text-white mt-1 tracking-tight">
                  {projects[1].name}
                </h3>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-[#E1E0CC]/70 mt-4 font-light leading-relaxed">
              {projects[1].description}
            </p>
          </div>

          {/* Project 3: Pipedrive (7 columns) */}
          <div className="lg:col-span-7 flex flex-col justify-between group">
            <div className="relative aspect-[16/11] sm:aspect-[16/10] w-full overflow-hidden rounded-2xl md:rounded-3xl border border-white/[0.08] bg-black">
              <img
                src={projects[2].image}
                alt={projects[2].name}
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
              <div className="noise-overlay pointer-events-none absolute inset-0 opacity-40" />

              <div className="absolute top-4 left-4 flex items-center gap-2">
                <span className="rounded-full bg-black/60 backdrop-blur-xl px-2.5 py-1 text-[10px] font-mono text-amber-400 border border-white/10">
                  {projects[2].metric}
                </span>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                <span className="text-[11px] uppercase tracking-widest text-[#E1E0CC]/50 font-mono">
                  {projects[2].category}
                </span>
                <h3 className="text-2xl sm:text-4xl font-normal text-white mt-1 tracking-tight">
                  {projects[2].name}
                </h3>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-[#E1E0CC]/70 mt-4 font-light leading-relaxed">
              {projects[2].description}
            </p>
          </div>
        </div>

        {/* Project 4: Wide Panoramic Finale */}
        <div className="pt-16 sm:pt-24">
          <div className="group relative overflow-hidden rounded-2xl md:rounded-3xl border border-white/[0.08] bg-black">
            <div className="relative aspect-[16/9] sm:aspect-[24/10] w-full overflow-hidden">
              <img
                src={projects[3].image}
                alt={projects[3].name}
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 opacity-75"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
              <div className="noise-overlay pointer-events-none absolute inset-0 opacity-40" />

              <div className="absolute top-4 left-4 sm:top-6 sm:left-6">
                <span className="rounded-full bg-black/60 backdrop-blur-xl px-3 py-1 text-[11px] font-mono uppercase tracking-widest text-amber-400 border border-white/10">
                  {projects[3].metric}
                </span>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10">
                <div className="max-w-2xl">
                  <span className="text-xs uppercase tracking-widest text-[#E1E0CC]/50 font-mono">
                    {projects[3].category}
                  </span>
                  <h3 className="text-xl sm:text-3xl md:text-4xl font-normal text-white mt-1 tracking-tight">
                    {projects[3].name}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#E1E0CC]/80 mt-2 font-light leading-relaxed">
                    {projects[3].description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
