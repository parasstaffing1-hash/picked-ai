'use client';

import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus, Info, ExternalLink, ShieldCheck } from 'lucide-react';
import { toast } from 'sonner';

interface CompetitorRecord {
  name: string;
  share: string;
  coverage: string;
  position: string;
  change: number;
  isOurs: boolean;
  topSources: string[];
  mentionsCount: number;
}

const competitorsData: CompetitorRecord[] = [
  {
    name: 'Your Business',
    share: '34%',
    coverage: '72%',
    position: '#2.1',
    change: 3,
    isOurs: true,
    topSources: ['g2.com', 'capterra.com', 'techradar.com'],
    mentionsCount: 28,
  },
  {
    name: 'Competitor A (Monday.com)',
    share: '28%',
    coverage: '68%',
    position: '#2.8',
    change: 1,
    isOurs: false,
    topSources: ['forbes.com', 'pcmag.com', 'capterra.com'],
    mentionsCount: 24,
  },
  {
    name: 'Competitor B (Asana)',
    share: '22%',
    coverage: '61%',
    position: '#3.2',
    change: 0,
    isOurs: false,
    topSources: ['zapier.com', 'g2.com', 'techcrunch.com'],
    mentionsCount: 19,
  },
  {
    name: 'Competitor C (ClickUp)',
    share: '18%',
    coverage: '54%',
    position: '#4.1',
    change: -2,
    isOurs: false,
    topSources: ['trustradius.com', 'reddit.com'],
    mentionsCount: 14,
  },
  {
    name: 'Competitor D (Linear)',
    share: '14%',
    coverage: '42%',
    position: '#5.4',
    change: -1,
    isOurs: false,
    topSources: ['producthunt.com', 'github.com'],
    mentionsCount: 11,
  },
  {
    name: 'Competitor E (Jira)',
    share: '8%',
    coverage: '31%',
    position: '#7.2',
    change: 2,
    isOurs: false,
    topSources: ['atlassian.com', 'gartner.com'],
    mentionsCount: 7,
  },
];

export function CompetitiveVisibility() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-10% 0px' });

  const [selectedComp, setSelectedComp] = useState<CompetitorRecord>(competitorsData[0]);

  const handleSelect = (comp: CompetitorRecord) => {
    setSelectedComp(comp);
    toast.info(`Analyzing ${comp.name}`, {
      description: `Recommendation share: ${comp.share} across ${comp.mentionsCount} queries`,
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
    },
  };

  return (
    <section className="bg-[#FAFAF8] py-20 sm:py-24 px-6">
      <div className="max-w-5xl mx-auto" ref={containerRef}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="space-y-8"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="space-y-4">
            <span className="text-xs font-mono text-[#6B6B6B] tracking-wider uppercase">
              Competitors
            </span>
            <h2 className="text-3xl sm:text-4xl font-semibold text-[#1A1A1A] tracking-tight">
              Your competitive position in AI
            </h2>
            <p className="text-base text-[#6B6B6B] max-w-2xl leading-relaxed">
              Compare your brand's AI recommendation share, citation volume, and ranking positions directly against industry competitors.
            </p>
          </motion.div>

          {/* Table */}
          <motion.div
            variants={itemVariants}
            className="bg-white border border-[#E8E8E6] rounded-xl shadow-xs overflow-hidden"
          >
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-[#FAFAF8]/70 border-b border-[#E8E8E6] font-mono text-[10px] uppercase text-[#9B9B9B] tracking-wider">
                  <tr>
                    <th className="px-6 py-4 font-medium">Business</th>
                    <th className="px-6 py-4 font-medium whitespace-nowrap">Rec. Share</th>
                    <th className="px-6 py-4 font-medium whitespace-nowrap">Citation Coverage</th>
                    <th className="px-6 py-4 font-medium whitespace-nowrap">Avg Position</th>
                    <th className="px-6 py-4 font-medium whitespace-nowrap text-right">Change</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E8E8E6]">
                  {competitorsData.map((comp) => {
                    const isSelected = selectedComp.name === comp.name;

                    return (
                      <tr
                        key={comp.name}
                        onClick={() => handleSelect(comp)}
                        className={`transition-colors cursor-pointer select-none ${
                          comp.isOurs 
                            ? isSelected 
                              ? 'bg-[#FFFDF5] border-l-3 border-l-[#E8B400]' 
                              : 'bg-[#FFFDF5]/70 border-l-2 border-l-[#E8B400]/60 hover:bg-[#FFFDF5]'
                            : isSelected
                            ? 'bg-[#F5F5F3] border-l-3 border-l-[#1A1A1A]'
                            : 'bg-white hover:bg-[#FAFAF8]'
                        }`}
                      >
                        <td className="px-6 py-4 font-medium text-[#1A1A1A]">
                          <div className="flex items-center gap-2">
                            <span>{comp.name}</span>
                            {comp.isOurs && (
                              <span className="inline-flex items-center gap-1 text-[10px] font-mono bg-[#E8B400]/15 text-[#8A6A00] font-semibold px-2 py-0.5 rounded-full">
                                <ShieldCheck className="w-3 h-3" />
                                Your Brand
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-[#1A1A1A] font-mono font-medium">{comp.share}</td>
                        <td className="px-6 py-4 text-[#6B6B6B] font-mono">{comp.coverage}</td>
                        <td className="px-6 py-4 text-[#1A1A1A] font-mono font-medium">{comp.position}</td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end font-mono gap-1">
                            {comp.change > 0 ? (
                              <>
                                <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                                <span className="text-emerald-600 font-semibold">+{comp.change}</span>
                              </>
                            ) : comp.change < 0 ? (
                              <>
                                <TrendingDown className="w-3.5 h-3.5 text-rose-500" />
                                <span className="text-rose-500 font-semibold">{comp.change}</span>
                              </>
                            ) : (
                              <>
                                <Minus className="w-3.5 h-3.5 text-[#9B9B9B]" />
                                <span className="text-[#9B9B9B]">0</span>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Selected Competitor Intelligence Strip */}
            <div className="p-4 bg-[#FAFAF8] border-t border-[#E8E8E6] flex flex-wrap items-center justify-between gap-4 text-xs">
              <div className="flex items-center gap-2 text-[#6B6B6B]">
                <Info className="w-3.5 h-3.5 text-[#1A1A1A]" />
                <span>Selected: <strong className="text-[#1A1A1A]">{selectedComp.name}</strong> &bull; Top Citations: {selectedComp.topSources.join(', ')}</span>
              </div>
              <span className="font-mono text-[#9B9B9B]">
                {selectedComp.mentionsCount} queries citing this brand
              </span>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="text-xs text-[#9B9B9B] font-mono flex items-center justify-between flex-wrap gap-2">
            <span>Updated 2 hours ago &middot; Tracking 18 category competitors &bull; Click any row to inspect</span>
            <a href="/console" className="hover:text-[#1A1A1A] text-[#6B6B6B] transition-colors flex items-center gap-1 font-sans font-semibold">
              <span>Open Competitive Matrix in Console</span>
              <span>&rarr;</span>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
