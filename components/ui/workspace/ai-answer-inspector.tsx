'use client';

import React, { useRef, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { Check, X, Sparkles, Bot, FileText, CheckCircle2, ChevronRight, MessageSquare, Search, ExternalLink, RefreshCw, Layers } from 'lucide-react';
import { toast } from 'sonner';

interface PromptDetail {
  id: string;
  prompt: string;
  engine: 'ChatGPT' | 'Gemini' | 'AI Overviews';
  status: 'recommended' | 'unranked';
  position: string;
  answerHtml: React.ReactNode;
  reasons: { text: string; active: boolean }[];
  sources: { domain: string; tag: string; url: string; authority: number }[];
}

const promptDetailsMap: Record<string, PromptDetail> = {
  '1': {
    id: '1',
    prompt: "Best accounting software for small business",
    engine: "ChatGPT",
    status: 'recommended',
    position: 'Position #2',
    answerHtml: (
      <>
        <p>
          When choosing accounting software for a growing small business, the best platform depends on your transaction volume, inventory tracking, and CPA collaboration needs.
        </p>
        <p>
          QuickBooks Online continues to lead in broad CPA familiarity, though many users report frustrations with aggressive price hikes. FreshBooks is intuitive for sole proprietors invoicing for client hours.
        </p>
        <p>
          However, for modern automated bookkeeping and multi-entity consolidation, <span className="bg-[#E8B400]/15 border-b border-[#E8B400]/40 font-medium px-1 rounded-xs">Picked Accounting</span> has rapidly become the preferred recommendation. Its real-time bank feed reconciliation and zero-touch expense categorization save approximately 14 hours per month compared to legacy alternatives.
        </p>
        <p>
          If your priority is ease of setup and intelligent automated reporting without manual entry, Picked provides the highest software satisfaction rating in recent category benchmark studies.
        </p>
      </>
    ),
    reasons: [
      { text: 'High domain authority (DA 74) & verified product reviews', active: true },
      { text: 'Cited across 3 major financial software comparisons (G2, Capterra)', active: true },
      { text: 'Transparent pricing page readable by AI crawlers', active: true },
      { text: 'Strong keyword proximity for "small business automated bookkeeping"', active: true },
      { text: 'No verified Wikipedia entity entry yet', active: false },
    ],
    sources: [
      { domain: 'g2.com/categories/accounting-software', tag: 'Primary Benchmark', url: 'https://g2.com', authority: 91 },
      { domain: 'capterra.com/accounting-tools', tag: 'Verified Reviews', url: 'https://capterra.com', authority: 89 },
      { domain: 'techradar.com/best-accounting-small-business', tag: 'Category Roundup', url: 'https://techradar.com', authority: 88 },
      { domain: 'trustpilot.com/review/picked-accounting', tag: 'Sentiment Signal', url: 'https://trustpilot.com', authority: 85 },
    ]
  },
  '2': {
    id: '2',
    prompt: "Top CRM tools for startups 2025",
    engine: "Gemini",
    status: 'recommended',
    position: 'Position #1',
    answerHtml: (
      <>
        <p>
          Startups in 2025 require CRM systems that deploy in minutes without requiring six-figure implementation consultants or complex Salesforce workflows.
        </p>
        <p>
          Based on recent founder sentiment and integration velocity, <span className="bg-[#E8B400]/15 border-b border-[#E8B400]/40 font-medium px-1 rounded-xs">Picked CRM</span> ranks #1 for early-stage teams. It unifies outbound email automation, pipeline velocity forecasting, and meeting recording transcripts into a single workspace.
        </p>
        <p>
          While HubSpot remains the standard for mid-market inbound teams, its tier escalations become prohibitive past 5 seats. Picked offers transparent startup credits and native Stripe billing sync.
        </p>
      </>
    ),
    reasons: [
      { text: 'Ranked #1 in ProductHunt Category of the Year listings', active: true },
      { text: 'Direct citations on 4 top accelerator resource directories (Y Combinator, Techstars)', active: true },
      { text: 'Structured schema markup enables direct AI extraction', active: true },
      { text: 'Active Reddit community mentions in r/startups', active: true },
      { text: 'Limited multi-language localized documentation', active: false },
    ],
    sources: [
      { domain: 'producthunt.com/leaderboards/crm', tag: 'Peer Traction', url: 'https://producthunt.com', authority: 90 },
      { domain: 'techcrunch.com/startup-stack-2025', tag: 'Editorial Roundup', url: 'https://techcrunch.com', authority: 93 },
      { domain: 'g2.com/crm-software-startups', tag: 'User Satisfaction', url: 'https://g2.com', authority: 91 },
    ]
  },
  '3': {
    id: '3',
    prompt: "Most affordable project management tools",
    engine: "ChatGPT",
    status: 'unranked',
    position: 'Not Ranked (Citation Gap)',
    answerHtml: (
      <>
        <p>
          For cost-conscious teams seeking robust project management without enterprise overhead, the leading free and budget options are Trello, ClickUp, and Notion.
        </p>
        <p>
          Trello offers the most generous free tier with unlimited cards and 10 boards. ClickUp packs the most native features into its Free Forever tier, though its interface can feel cluttered.
        </p>
        <p>
          <span className="text-[#9B9B9B] italic">Notice: Your brand is currently not recommended in this query because AI cites sources where your pricing tier has not been indexed or reviewed.</span>
        </p>
      </>
    ),
    reasons: [
      { text: 'No pricing schema markup detected on pricing page', active: false },
      { text: 'Missing on 5 popular "Free & Budget PM Tools" comparison articles', active: false },
      { text: 'Domain authority is healthy but unlinked to "affordable" keyword clusters', active: true },
      { text: 'Competitors outnumber brand mentions 8 to 0 in this prompt corpus', active: false },
    ],
    sources: [
      { domain: 'zapier.com/blog/best-free-project-management-software', tag: 'Citing Competitors', url: 'https://zapier.com', authority: 92 },
      { domain: 'pcmag.com/picks/the-best-project-management-software', tag: 'Citing Competitors', url: 'https://pcmag.com', authority: 94 },
    ]
  },
};

export function AiAnswerInspector() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-10%' });
  const prefersReducedMotion = useReducedMotion();

  const [activePromptId, setActivePromptId] = useState<string>('1');
  const [selectedEngine, setSelectedEngine] = useState<'ChatGPT' | 'Gemini' | 'AI Overviews'>('ChatGPT');
  const [isSimulating, setIsSimulating] = useState(false);

  const currentDetail = promptDetailsMap[activePromptId] || promptDetailsMap['1'];

  const handleSimulateAudit = () => {
    setIsSimulating(true);
    toast.info(`Querying ${selectedEngine} neural model in real-time...`);
    setTimeout(() => {
      setIsSimulating(false);
      toast.success(`${selectedEngine} model audit completed`, {
        description: `Verified brand citation footprint across 4 sources.`,
      });
    }, 1200);
  };

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

  return (
    <section className="bg-[#FAFAF8] py-20 sm:py-24">
      <div className="mx-auto max-w-5xl px-6">
        <motion.div
          ref={containerRef}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="flex flex-col items-center text-center mb-12"
        >
          <motion.div variants={itemVariants} className="mb-4 flex items-center space-x-2">
            <span className="font-mono text-xs font-semibold tracking-wider text-[#9B9B9B] uppercase">
              AI Answer Inspector
            </span>
          </motion.div>
          <motion.h2 
            variants={itemVariants}
            className="mb-4 text-3xl font-semibold tracking-tight text-[#1A1A1A] sm:text-4xl"
          >
            See exactly what AI tells buyers
          </motion.h2>
          <motion.p 
            variants={itemVariants}
            className="max-w-2xl text-base text-[#6B6B6B] leading-relaxed"
          >
            Inspect the verbatim AI answer, see why your business was recommended, and audit the citations AI relied upon.
          </motion.p>
        </motion.div>

        {/* Prompt Selector Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {[
            { id: '1', title: 'Accounting Software' },
            { id: '2', title: 'CRM for Startups' },
            { id: '3', title: 'Affordable PM Tools' },
          ].map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                setActivePromptId(item.id);
                toast.info(`Loaded inspectable response: "${item.title}"`);
              }}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                activePromptId === item.id
                  ? 'bg-[#1A1A1A] text-white shadow-xs font-semibold'
                  : 'bg-white border border-[#E8E8E6] text-[#6B6B6B] hover:text-[#1A1A1A] hover:bg-[#F5F5F3]'
              }`}
            >
              {item.title}
            </button>
          ))}
        </div>

        {/* Mock Inspector Document */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="mx-auto max-w-4xl rounded-xl border border-[#E8E8E6] bg-white shadow-xs overflow-hidden"
        >
          {/* Top Bar with Engine Selector & Action */}
          <div className="border-b border-[#E8E8E6] bg-[#FAFAF8] px-6 py-4 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center space-x-3 overflow-hidden text-sm max-w-md">
              <MessageSquare className="h-4 w-4 text-[#9B9B9B] flex-shrink-0" />
              <span className="text-[#1A1A1A] font-medium truncate">"{currentDetail.prompt}"</span>
            </div>

            <div className="flex items-center gap-2">
              {/* Engine Toggle Buttons */}
              <div className="flex items-center rounded-lg bg-[#EFEFEA] p-0.5 border border-[#E8E8E6] text-xs">
                {(['ChatGPT', 'Gemini', 'AI Overviews'] as const).map((eng) => (
                  <button
                    key={eng}
                    type="button"
                    onClick={() => {
                      setSelectedEngine(eng);
                      toast.info(`Switched model view to ${eng}`);
                    }}
                    className={`px-2.5 py-1 rounded-md transition-all cursor-pointer font-medium ${
                      selectedEngine === eng
                        ? 'bg-white text-[#1A1A1A] shadow-xs font-semibold'
                        : 'text-[#6B6B6B] hover:text-[#1A1A1A]'
                    }`}
                  >
                    {eng}
                  </button>
                ))}
              </div>

              {/* Live Query Simulation Button */}
              <button
                type="button"
                onClick={handleSimulateAudit}
                disabled={isSimulating}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg border border-[#E8E8E6] bg-white text-xs font-medium text-[#1A1A1A] hover:bg-[#F5F5F3] transition-all cursor-pointer disabled:opacity-50"
                title="Run live neural evaluation on this query"
              >
                <RefreshCw className={`w-3.5 h-3.5 text-[#6B6B6B] ${isSimulating ? 'animate-spin' : ''}`} />
                <span>{isSimulating ? 'Evaluating...' : 'Query Engine'}</span>
              </button>
            </div>
          </div>

          <div className="p-8 sm:p-10">
            {/* Verbatim AI Answer Box */}
            <div className="prose prose-sm sm:prose-base prose-neutral max-w-none text-[#1A1A1A] leading-relaxed space-y-4">
              {currentDetail.answerHtml}
            </div>

            {/* Recommendation Status Pill */}
            <div className="mt-8 mb-8 border-t border-[#E8E8E6] pt-8 flex items-center justify-between flex-wrap gap-4">
              <div className={`inline-flex items-center space-x-2 rounded-lg px-3.5 py-2 border ${
                currentDetail.status === 'recommended'
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                  : 'bg-amber-50 border-amber-200 text-amber-800'
              }`}>
                {currentDetail.status === 'recommended' ? (
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                ) : (
                  <X className="h-4 w-4 text-amber-600" />
                )}
                <span className="text-sm font-semibold">{currentDetail.position}</span>
              </div>

              <span className="text-xs font-mono text-[#9B9B9B]">
                Engine: {selectedEngine} &bull; Neutral Temperature 0.2
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {/* Why AI included you checklist */}
              <div>
                <h4 className="font-mono text-xs font-semibold tracking-wider text-[#9B9B9B] uppercase mb-4">
                  Why AI included you
                </h4>
                <ul className="space-y-3">
                  {currentDetail.reasons.map((item, i) => (
                    <li key={i} className="flex items-start text-sm">
                      {item.active ? (
                        <Check className="mr-2.5 h-4 w-4 text-emerald-600 mt-0.5 flex-shrink-0" strokeWidth={2.5} />
                      ) : (
                        <X className="mr-2.5 h-4 w-4 text-rose-500 mt-0.5 flex-shrink-0" strokeWidth={2.5} />
                      )}
                      <span className={item.active ? 'text-[#1A1A1A]' : 'text-[#9B9B9B] line-through decoration-[#D0D0CE]'}>
                        {item.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Clickable Citations Used by AI */}
              <div>
                <h4 className="font-mono text-xs font-semibold tracking-wider text-[#9B9B9B] uppercase mb-4">
                  Sources used by AI ({currentDetail.sources.length})
                </h4>
                <div className="space-y-3">
                  {currentDetail.sources.map((source, i) => (
                    <div 
                      key={i} 
                      onClick={() => {
                        window.open(source.url, '_blank')
                        toast.success(`Opened source reference: ${source.domain}`)
                      }}
                      className="group flex items-center justify-between text-sm rounded-lg border border-[#E8E8E6] p-3 bg-[#FAFAF8] hover:bg-[#F5F5F3] hover:border-[#D0D0CE] transition-all cursor-pointer"
                    >
                      <div className="flex items-center overflow-hidden min-w-0 pr-2">
                        <FileText className="h-4 w-4 text-[#9B9B9B] group-hover:text-[#1A1A1A] mr-2.5 flex-shrink-0 transition-colors" />
                        <span className="text-[#1A1A1A] truncate group-hover:underline font-mono text-xs">{source.domain}</span>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span className="text-[11px] font-mono text-[#6B6B6B] bg-white border border-[#E8E8E6] px-2 py-0.5 rounded-md">
                          DA {source.authority}
                        </span>
                        <ExternalLink className="w-3.5 h-3.5 text-[#9B9B9B] group-hover:text-[#1A1A1A] transition-colors" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
