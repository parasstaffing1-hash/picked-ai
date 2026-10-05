'use client';

import React, { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, Copy, CheckCircle, ArrowRight, Sparkles, Clock, Target } from 'lucide-react';
import { toast } from 'sonner';

interface OpportunityItem {
  id: number;
  priority: 'high' | 'medium' | 'low';
  title: string;
  description: string;
  impact: string;
  effort: string;
  scoreBoost: string;
  steps: string[];
}

const opportunitiesData: OpportunityItem[] = [
  {
    id: 1,
    priority: 'high',
    title: 'Close citation gap on TechCrunch',
    description: "Get featured in TechCrunch's tool comparison articles to unlock 3 new AI citations.",
    impact: 'High Impact',
    effort: '2-3 weeks',
    scoreBoost: '+6 to +8 pts',
    steps: [
      'Identify 3 recent TechCrunch roundup articles reviewing competitor products.',
      'Submit editorial pitch to the software category editor with benchmark data.',
      'Provide verified customer quote and technical architecture specs for citation.',
    ],
  },
  {
    id: 2,
    priority: 'high',
    title: 'Improve G2 review volume & category leadership',
    description: 'Increase review count from 47 to 100+ to strengthen AI recommendation confidence.',
    impact: 'High Impact',
    effort: '4-6 weeks',
    scoreBoost: '+5 to +7 pts',
    steps: [
      'Launch automated review request campaign to active enterprise power users.',
      'Offer G2 gift card incentive program across verified customer accounts.',
      'Maintain at least 4.7 stars rating across the "Ease of Setup" metric.',
    ],
  },
  {
    id: 3,
    priority: 'medium',
    title: 'Add structured FAQ schema markup',
    description: "Implement FAQ schema markup to improve AI's ability to extract product answers directly.",
    impact: 'Medium Impact',
    effort: '1 week',
    scoreBoost: '+4 to +5 pts',
    steps: [
      'Add Schema.org JSON-LD FAQPage markup to your product and pricing pages.',
      'Include specific answer blocks for "pricing tiers", "API rate limits", and "integrations".',
      'Validate with Google Rich Results Test to ensure clean parser indexing.',
    ],
  },
  {
    id: 4,
    priority: 'medium',
    title: 'Expand category coverage in enterprise collaboration',
    description: "Target 'enterprise collaboration' category to appear in 12 additional buyer prompts.",
    impact: 'Medium Impact',
    effort: '2-3 weeks',
    scoreBoost: '+3 to +5 pts',
    steps: [
      'Publish comparison landing pages for enterprise Slack and Microsoft Teams workflows.',
      'Highlight SOC2 Type II compliance and single-sign-on (SSO) capabilities.',
      'Seed technical case studies featuring teams larger than 250 members.',
    ],
  },
  {
    id: 5,
    priority: 'low',
    title: 'Optimize pricing page for AI neural scrapers',
    description: 'Restructure pricing tables into clean HTML for automated LLM extraction and comparison.',
    impact: 'Medium Impact',
    effort: '1 week',
    scoreBoost: '+3 to +4 pts',
    steps: [
      'Replace canvas/image price charts with semantic HTML5 tables.',
      'Explicitly state entry-level tier costs and included feature quotas.',
      'Add a clear "Free Tier or Trial" disclosure prominently above the fold.',
    ],
  },
  {
    id: 6,
    priority: 'low',
    title: 'Build dedicated vs-competitor comparison hub',
    description: 'Create vs-competitor pages to capture direct comparison queries in ChatGPT & Gemini.',
    impact: 'Low Impact',
    effort: '3-4 weeks',
    scoreBoost: '+2 to +4 pts',
    steps: [
      'Build objective comparison pages: YourBrand vs Competitor A, Competitor B.',
      'Cite 3rd-party independent benchmarks rather than biased marketing claims.',
      'Provide downloadable feature-by-feature matrix in markdown and PDF.',
    ],
  },
];

const priorityColors = {
  high: 'bg-[#E8B400]',
  medium: 'bg-blue-500',
  low: 'bg-[#9B9B9B]',
};

export function Opportunities() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-10% 0px' });

  const [expandedId, setExpandedId] = useState<number | null>(1);
  const [completedMap, setCompletedMap] = useState<Record<number, boolean>>({});

  const toggleExpand = (id: number) => {
    setExpandedId(prev => (prev === id ? null : id));
  };

  const handleCopySteps = (opp: OpportunityItem, e: React.MouseEvent) => {
    e.stopPropagation();
    const text = `PLAYBOOK: ${opp.title}\nImpact: ${opp.impact} (${opp.scoreBoost})\nEffort: ${opp.effort}\n\nAction Steps:\n${opp.steps.map((s, i) => `${i + 1}. ${s}`).join('\n')}`;
    navigator.clipboard?.writeText(text);
    toast.success('Action playbook copied to clipboard', {
      description: `Ready to paste into Linear, Notion, or Jira.`,
    });
  };

  const handleToggleComplete = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setCompletedMap(prev => {
      const next = !prev[id];
      if (next) {
        toast.success('Opportunity marked as In Progress! 🚀', {
          description: 'Visibility score will recalculate on your next audit scan.',
        });
      } else {
        toast.info('Opportunity reset to open queue.');
      }
      return { ...prev, [id]: next };
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
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
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <motion.div variants={itemVariants} className="space-y-3">
              <span className="text-xs font-mono text-[#6B6B6B] tracking-wider uppercase">
                Opportunities
              </span>
              <h2 className="text-3xl sm:text-4xl font-semibold text-[#1A1A1A] tracking-tight">
                Actions to improve visibility
              </h2>
              <p className="text-base text-[#6B6B6B] max-w-xl leading-relaxed">
                Prioritized engineering and content initiatives to close citation gaps and increase your recommendation frequency in AI answers.
              </p>
            </motion.div>

            <a
              href="/console"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1A1A1A] hover:underline self-start md:self-auto mb-1"
            >
              <span>Manage All Playbooks in Console</span>
              <span>&rarr;</span>
            </a>
          </div>

          {/* List */}
          <motion.div 
            variants={itemVariants} 
            className="bg-white border border-[#E8E8E6] rounded-xl shadow-xs overflow-hidden"
          >
            <div className="flex flex-col">
              {opportunitiesData.map((opp, idx) => {
                const isExpanded = expandedId === opp.id;
                const isDone = !!completedMap[opp.id];

                return (
                  <div
                    key={opp.id}
                    className={`border-b border-[#E8E8E6] last:border-0 transition-colors ${
                      isExpanded ? 'bg-[#FAFAF8]/50' : 'hover:bg-[#F5F5F3]'
                    }`}
                  >
                    {/* Clickable Row Header */}
                    <div
                      onClick={() => toggleExpand(opp.id)}
                      className="flex flex-col sm:flex-row sm:items-center justify-between p-4 sm:p-5 cursor-pointer select-none"
                    >
                      <div className="flex items-start gap-4 flex-1">
                        <div className="mt-1.5 flex-shrink-0">
                          <div className={`w-2.5 h-2.5 rounded-full ${priorityColors[opp.priority]}`} />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className={`text-sm font-semibold ${isDone ? 'line-through text-[#9B9B9B]' : 'text-[#1A1A1A]'}`}>
                              {opp.title}
                            </h4>
                            {isDone && (
                              <span className="inline-flex items-center gap-1 text-[10px] font-mono bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                                In Progress
                              </span>
                            )}
                          </div>
                          <p className="text-xs sm:text-sm text-[#6B6B6B]">{opp.description}</p>
                        </div>
                      </div>
                      
                      <div className="mt-4 sm:mt-0 ml-6 sm:ml-4 flex items-center gap-3 sm:gap-4 flex-shrink-0">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-md border border-[#E8E8E6] bg-white text-xs font-mono text-[#1A1A1A] font-medium shadow-2xs">
                          {opp.scoreBoost}
                        </span>
                        <span className="text-xs text-[#9B9B9B] font-mono min-w-[70px] text-right hidden sm:inline">
                          {opp.effort}
                        </span>
                        <div className="p-1 rounded-md text-[#9B9B9B] hover:text-[#1A1A1A]">
                          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </div>
                      </div>
                    </div>

                    {/* Expandable Playbook Drawer */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.25 }}
                          className="px-6 pb-6 pt-2 border-t border-[#F0F0EE] bg-white"
                        >
                          <div className="rounded-lg bg-[#FAFAF8] p-5 border border-[#E8E8E6]">
                            <div className="flex items-center justify-between mb-3">
                              <span className="text-xs font-mono uppercase tracking-wider text-[#9B9B9B] flex items-center gap-1.5">
                                <Target className="w-3.5 h-3.5 text-[#1A1A1A]" />
                                Step-by-Step Implementation Blueprint
                              </span>
                              <span className="text-xs font-mono text-[#6B6B6B]">
                                Est. Effort: {opp.effort}
                              </span>
                            </div>

                            <ol className="space-y-2 mb-4 text-xs sm:text-sm text-[#1A1A1A]">
                              {opp.steps.map((step, sIdx) => (
                                <li key={sIdx} className="flex items-start gap-2.5">
                                  <span className="w-5 h-5 rounded-full bg-[#EFEFEA] text-[#1A1A1A] font-mono text-[11px] font-semibold flex items-center justify-center shrink-0 mt-0.5">
                                    {sIdx + 1}
                                  </span>
                                  <span className="leading-relaxed">{step}</span>
                                </li>
                              ))}
                            </ol>

                            <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-[#E8E8E6]">
                              <button
                                type="button"
                                onClick={(e) => handleCopySteps(opp, e)}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-[#E8E8E6] bg-white text-xs font-medium text-[#1A1A1A] hover:bg-[#F5F5F3] transition-colors cursor-pointer"
                              >
                                <Copy className="w-3.5 h-3.5 text-[#6B6B6B]" />
                                Copy to Notion / Linear
                              </button>
                              <button
                                type="button"
                                onClick={(e) => handleToggleComplete(opp.id, e)}
                                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                                  isDone
                                    ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                                    : 'bg-[#1A1A1A] text-white hover:bg-black'
                                }`}
                              >
                                <CheckCircle className="w-3.5 h-3.5" />
                                {isDone ? 'Mark as Open' : 'Start Implementation'}
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
