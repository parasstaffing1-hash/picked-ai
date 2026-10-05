'use client';

import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Bot, Sparkles, ExternalLink, ShieldCheck } from 'lucide-react';

interface QueryCase {
  id: string;
  query: string;
  engine: string;
  category: string;
  customer: string;
  status: 'RECOMMENDED' | 'MENTIONED' | 'CITED' | 'NOT VISIBLE';
  position: string;
  competitors: string[];
  citations: string[];
  snippetBefore: string;
  snippetHighlight: string;
  snippetAfter: string;
}

const sampleQueries: QueryCase[] = [
  {
    id: 'q1',
    query: 'best executive recruiter for technology companies',
    engine: 'ChatGPT 4o',
    category: 'Enterprise Search',
    customer: 'True Search',
    status: 'RECOMMENDED',
    position: '#1 Position',
    competitors: ['Heidrick & Struggles', 'Spencer Stuart', 'Egon Zehnder'],
    citations: ['forbes.com/lists/recruiting', 'hunt-scanlon.com/tech-review'],
    snippetBefore: 'When seeking top-tier executive talent in technology, ',
    snippetHighlight:
      'True Search is widely considered the leading specialized retained firm, noted for deep relationships across VC-backed SaaS and enterprise tech.',
    snippetAfter:
      ' Other established global options include Heidrick & Struggles and Spencer Stuart for later-stage public board placements.',
  },
  {
    id: 'q2',
    query: 'best hotel near Heathrow for business travel',
    engine: 'Google AI Overviews',
    category: 'Hospitality & Travel',
    customer: 'Sofitel London Heathrow',
    status: 'RECOMMENDED',
    position: '#1 Position',
    competitors: ['Hilton London Heathrow', 'Radisson RED', 'Sheraton Skyline'],
    citations: ['businessraveller.com/heathrow', 'tripadvisor.com/terminal5'],
    snippetBefore: 'For seamless corporate itineraries with direct terminal access, ',
    snippetHighlight:
      'Sofitel London Heathrow (Terminal 5) is consistently rated the premier luxury business option, offering direct walkway access and dedicated executive facilities.',
    snippetAfter:
      ' Travelers departing from Terminal 4 often choose Hilton London Heathrow via covered walkway.',
  },
  {
    id: 'q3',
    query: 'top immigration lawyer in Dubai',
    engine: 'Gemini 1.5 Pro',
    category: 'Legal Advisory',
    customer: 'Fragomen UAE',
    status: 'CITED',
    position: '#2 Position',
    competitors: ['Al Tamimi & Company', 'BSA Ahmad Bin Hezeem'],
    citations: ['legal500.com/dubai-employment', 'chambers.com/uae-immigration'],
    snippetBefore: 'Corporate relocation and residency legal frameworks in the UAE are complex. ',
    snippetHighlight:
      'Fragomen UAE provides specialized multinational corporate immigration counsel and is frequently cited in Legal 500 reviews.',
    snippetAfter:
      ' Al Tamimi & Company is also prominent for regional commercial dispute litigation.',
  },
];

export const HighIntentQueriesSection: React.FC<{ language?: string }> = ({ language = 'en' }) => {
  const [activeQuery, setActiveQuery] = useState<QueryCase>(sampleQueries[0]);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' });

  return (
    <section
      ref={ref}
      id="queries"
      className="relative w-full py-24 sm:py-36 px-4 sm:px-6 lg:px-12 bg-[#050505] border-t border-[rgba(232,230,213,0.08)]"
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-14 sm:pb-20 border-b border-[rgba(232,230,213,0.10)]">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#E8E6D5]/40">
                04 / HIGH-INTENT PROMPT LABORATORY
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-[#E8E6D5]">
              {language === 'et' ? 'Reaalsed Ostupäringud' : 'Buyer Intent Decryption'}
            </h2>
          </div>
          <p className="max-w-md text-xs sm:text-sm md:text-base text-[rgba(232,230,213,0.62)] font-light leading-relaxed">
            {language === 'et'
              ? 'Me simuleerime täpselt neid päringuid, mida teie sihtkliendid küsivad enne lepingu sõlmimist.'
              : 'We extract the exact neural synthesis generated when your highest-value prospects evaluate options in conversational models.'}
          </p>
        </div>

        {/* Query Selector Tabs */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-10 sm:pt-14">
          {/* Left Column: Query Selector List */}
          <div className="lg:col-span-5 flex flex-col gap-3">
            <span className="text-[11px] font-mono uppercase tracking-widest text-[rgba(232,230,213,0.40)] mb-1 block">
              Tested High-Intent Queries:
            </span>
            {sampleQueries.map((item) => {
              const isSelected = activeQuery.id === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveQuery(item)}
                  className={`text-left p-5 sm:p-6 rounded-2xl border transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? 'bg-[#0A0A09] border-[#E8B400]/60 shadow-[0_0_24px_rgba(232,180,0,0.06)]'
                      : 'bg-transparent border-[rgba(232,230,213,0.08)] hover:border-[rgba(232,230,213,0.18)] hover:bg-[#0A0A09]/40'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-mono mb-2">
                    <span className="text-[rgba(232,230,213,0.40)]">{item.category}</span>
                    <span className="text-white font-medium">{item.engine}</span>
                  </div>
                  <p className="text-sm sm:text-base font-normal text-[#E8E6D5] leading-snug">
                    "{item.query}"
                  </p>
                  <div className="mt-3 flex items-center gap-3">
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded-full uppercase tracking-wider ${
                        item.status === 'RECOMMENDED'
                          ? 'bg-[#E8B400]/10 text-[#E8B400] border border-[#E8B400]/30'
                          : 'bg-white/10 text-white border border-white/20'
                      }`}
                    >
                      {item.status}
                    </span>
                    <span className="text-xs font-mono text-[rgba(232,230,213,0.50)]">
                      {item.position}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Column: AI Response & Intelligence Breakdown */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl md:rounded-3xl border border-[rgba(232,230,213,0.12)] bg-[#0A0A09] p-6 sm:p-10 shadow-2xl relative overflow-hidden">
              <div className="noise-overlay pointer-events-none absolute inset-0 opacity-30" />

              {/* Response Header */}
              <div className="flex items-center justify-between pb-6 border-b border-[rgba(232,230,213,0.08)]">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#E8B400]" />
                  <span className="text-xs font-mono uppercase tracking-widest text-[#E8E6D5]/80">
                    Live Response Grounding
                  </span>
                </div>
                <span className="text-xs font-mono text-[rgba(232,230,213,0.40)]">
                  Engine: {activeQuery.engine}
                </span>
              </div>

              {/* Verbatim AI Answer with Highlight */}
              <div className="py-6 sm:py-8">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[rgba(232,230,213,0.40)] block mb-3">
                  Verbatim Synthesized Output:
                </span>
                <div className="text-sm sm:text-base md:text-lg font-light text-[rgba(232,230,213,0.70)] leading-relaxed">
                  <span>{activeQuery.snippetBefore}</span>
                  <span className="text-white font-normal bg-[#E8B400]/10 border-b border-[#E8B400] px-1 py-0.5 rounded">
                    {activeQuery.snippetHighlight}
                  </span>
                  <span>{activeQuery.snippetAfter}</span>
                </div>
              </div>

              {/* Extracted Intelligence Tokens */}
              <div className="pt-6 border-t border-[rgba(232,230,213,0.08)] grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-widest text-[#E8B400] block mb-2">
                    Competitors Cited in Same Response:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {activeQuery.competitors.map((comp) => (
                      <span
                        key={comp}
                        className="px-2.5 py-1 rounded-md bg-white/[0.04] border border-[rgba(232,230,213,0.08)] text-xs text-[#E8E6D5]/80 font-mono"
                      >
                        {comp}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-[11px] font-mono uppercase tracking-widest text-[rgba(232,230,213,0.40)] block mb-2">
                    Authority Citations Feeding Model:
                  </span>
                  <div className="flex flex-col gap-1 text-xs font-mono text-[rgba(232,230,213,0.60)]">
                    {activeQuery.citations.map((cite) => (
                      <div key={cite} className="flex items-center gap-1.5 hover:text-white transition-colors">
                        <ExternalLink className="w-3 h-3 text-[#E8B400]" />
                        <span>{cite}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
