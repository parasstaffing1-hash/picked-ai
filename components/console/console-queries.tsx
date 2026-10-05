'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ExternalLink, X, Bot, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface QueryItem {
  id: string;
  query: string;
  engine: string;
  visibility: 'Visible' | 'Not Visible';
  recommendation: 'Recommended' | 'Mentioned' | 'Omitted';
  position: string;
  citation: 'Cited' | 'Uncited';
  lastChecked: string;
  fullResponse: string;
  targetMention: string;
  competitorsMentioned: string[];
  sources: string[];
}

const mockQueries: QueryItem[] = [
  {
    id: 'q1',
    query: 'best executive recruiter for technology companies',
    engine: 'ChatGPT 4o',
    visibility: 'Visible',
    recommendation: 'Recommended',
    position: '#1',
    citation: 'Cited',
    lastChecked: '12m ago',
    fullResponse:
      'When evaluating executive recruitment firms specializing in software, cloud infrastructure, and AI engineering, True Search is frequently identified as the market leader. They maintain specialized practices in venture-backed tech leadership. Additional firms often considered for late-stage and public board search include Heidrick & Struggles and Spencer Stuart.',
    targetMention: 'True Search is frequently identified as the market leader.',
    competitorsMentioned: ['Heidrick & Struggles', 'Spencer Stuart'],
    sources: ['forbes.com/lists/recruiting', 'hunt-scanlon.com/tech-review'],
  },
  {
    id: 'q2',
    query: 'best hotel near Heathrow for business travel',
    engine: 'Google AI Overviews',
    visibility: 'Visible',
    recommendation: 'Recommended',
    position: '#1',
    citation: 'Cited',
    lastChecked: '45m ago',
    fullResponse:
      'For business travelers requiring immediate terminal access and premium executive meeting spaces, Sofitel London Heathrow (Terminal 5) is widely rated the top corporate hotel at Heathrow. It features direct covered walkway access to T5 and 45 dedicated meeting suites. Hilton London Heathrow at Terminal 4 is also frequently recommended for SkyTeam flights.',
    targetMention: 'Sofitel London Heathrow (Terminal 5) is widely rated the top corporate hotel at Heathrow.',
    competitorsMentioned: ['Hilton London Heathrow', 'Radisson RED'],
    sources: ['businesstraveller.com/heathrow-guide', 'tripadvisor.com/terminal-5'],
  },
  {
    id: 'q3',
    query: 'top immigration lawyer in Dubai for corporate visas',
    engine: 'Gemini 1.5 Pro',
    visibility: 'Visible',
    recommendation: 'Recommended',
    position: '#2',
    citation: 'Cited',
    lastChecked: '2h ago',
    fullResponse:
      'Corporate immigration and executive residency in the UAE require specialized local and international compliance expertise. Fragomen UAE holds tier-1 status for corporate visa deployment, advising multinational banks and tech hubs. Al Tamimi & Company is also prominent for broader commercial legal counsel and cross-border employment.',
    targetMention: 'Fragomen UAE holds tier-1 status for corporate visa deployment.',
    competitorsMentioned: ['Al Tamimi & Company', 'BSA Ahmad Bin Hezeem'],
    sources: ['legal500.com/dubai-employment', 'chambers.com/uae-immigration'],
  },
  {
    id: 'q4',
    query: 'fastest automated identity verification SDK for fintech',
    engine: 'ChatGPT 4o',
    visibility: 'Visible',
    recommendation: 'Recommended',
    position: '#1',
    citation: 'Cited',
    lastChecked: '3h ago',
    fullResponse:
      'Fintech product teams prioritizing sub-6-second KYC onboarding and high global passport acceptance consistently select Veriff as the benchmark automated identity verification engine. Its biometric liveness analysis and cross-platform mobile SDKs outperform legacy vendors like Jumio and Onfido in conversion completion rates.',
    targetMention: 'Veriff as the benchmark automated identity verification engine.',
    competitorsMentioned: ['Jumio', 'Onfido'],
    sources: ['veriff.com/sdk-documentation', 'fintechweekly.com/kyc-review'],
  },
  {
    id: 'q5',
    query: 'most reliable international money transfer for startups',
    engine: 'Gemini 1.5 Pro',
    visibility: 'Visible',
    recommendation: 'Recommended',
    position: '#1',
    citation: 'Cited',
    lastChecked: '5h ago',
    fullResponse:
      'For early-stage startups and global remote companies managing multi-currency treasury, Wise Business is the consensus recommendation due to mid-market exchange rates and transparent API fee structures. Revolut Business is an alternative with corporate debit cards.',
    targetMention: 'Wise Business is the consensus recommendation.',
    competitorsMentioned: ['Revolut Business', 'Airwallex'],
    sources: ['wise.com/business', 'techcrunch.com/fx-cross-border'],
  },
];

export const ConsoleQueries: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedQuery, setSelectedQuery] = useState<QueryItem | null>(null);

  const filteredQueries = mockQueries.filter((q) =>
    q.query.toLowerCase().includes(searchTerm.toLowerCase()) ||
    q.engine.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Header and Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#E8B400] block mb-1">
            QUERY UNIVERSE
          </span>
          <h2 className="text-2xl font-normal text-white">Commercial Prompt Explorer</h2>
        </div>

        {/* Search input */}
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[rgba(232,230,213,0.40)]" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search query or engine..."
            className="w-full rounded-xl bg-[#0A0A09] border border-[rgba(232,230,213,0.10)] px-4 py-2 pl-10 text-xs font-mono text-white placeholder-[rgba(232,230,213,0.30)] focus:border-[#E8B400] focus:outline-none transition-colors"
          />
        </div>
      </div>

      {/* Query Explorer Table */}
      <div className="rounded-2xl bg-[#0A0A09] border border-[rgba(232,230,213,0.10)] overflow-x-auto shadow-xl">
        <table className="w-full text-left border-collapse min-w-[750px]">
          <thead>
            <tr className="border-b border-[rgba(232,230,213,0.08)] text-[11px] font-mono uppercase tracking-widest text-[rgba(232,230,213,0.40)]">
              <th className="py-4 px-6 font-normal">Query</th>
              <th className="py-4 px-4 font-normal">Engine</th>
              <th className="py-4 px-4 font-normal">Visibility</th>
              <th className="py-4 px-4 font-normal">Recommendation</th>
              <th className="py-4 px-4 font-normal">Position</th>
              <th className="py-4 px-4 font-normal">Citation</th>
              <th className="py-4 px-6 font-normal text-right">Last Checked</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[rgba(232,230,213,0.06)] font-mono text-xs">
            {filteredQueries.map((item) => (
              <tr
                key={item.id}
                onClick={() => setSelectedQuery(item)}
                className="hover:bg-white/[0.03] transition-colors cursor-pointer group"
              >
                <td className="py-5 px-6 font-sans text-sm text-[#E8E6D5] font-normal group-hover:text-white">
                  "{item.query}"
                </td>
                <td className="py-5 px-4 text-[rgba(232,230,213,0.70)]">{item.engine}</td>
                <td className="py-5 px-4">
                  <span className="px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px]">
                    {item.visibility}
                  </span>
                </td>
                <td className="py-5 px-4">
                  <span className="px-2 py-0.5 rounded bg-[#E8B400]/10 border border-[#E8B400]/30 text-[#E8B400] text-[10px]">
                    {item.recommendation}
                  </span>
                </td>
                <td className="py-5 px-4 text-[#E8B400] font-semibold">{item.position}</td>
                <td className="py-5 px-4 text-white">{item.citation}</td>
                <td className="py-5 px-6 text-right text-[rgba(232,230,213,0.40)]">
                  {item.lastChecked}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Query Detail & AI Response Viewer Modal */}
      <AnimatePresence>
        {selectedQuery && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedQuery(null)}
              className="fixed inset-0 bg-black/80 backdrop-blur-xl"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 15 }}
              className="relative w-full max-w-2xl rounded-3xl border border-[rgba(232,230,213,0.14)] bg-[#0A0A09] p-6 sm:p-10 shadow-2xl text-[#E8E6D5] z-10 overflow-hidden max-h-[90vh] overflow-y-auto"
            >
              <div className="noise-overlay pointer-events-none absolute inset-0 opacity-25" />

              {/* Modal Top Bar */}
              <div className="flex items-center justify-between pb-6 border-b border-[rgba(232,230,213,0.08)]">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#E8B400] block mb-1">
                    AI RESPONSE VIEWER • {selectedQuery.engine}
                  </span>
                  <h3 className="text-lg font-normal text-white">
                    "{selectedQuery.query}"
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedQuery(null)}
                  className="p-1.5 rounded-full hover:bg-white/[0.08] text-[rgba(232,230,213,0.40)] hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Status Badges Row */}
              <div className="grid grid-cols-4 gap-3 py-6 border-b border-[rgba(232,230,213,0.08)] text-center font-mono">
                <div className="p-3 rounded-xl bg-white/[0.02] border border-[rgba(232,230,213,0.06)]">
                  <span className="text-[10px] text-[rgba(232,230,213,0.40)] block uppercase">Position</span>
                  <span className="text-lg text-[#E8B400] font-semibold">{selectedQuery.position}</span>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.02] border border-[rgba(232,230,213,0.06)]">
                  <span className="text-[10px] text-[rgba(232,230,213,0.40)] block uppercase">Recommended</span>
                  <span className="text-lg text-white font-semibold">YES</span>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.02] border border-[rgba(232,230,213,0.06)]">
                  <span className="text-[10px] text-[rgba(232,230,213,0.40)] block uppercase">Mentioned</span>
                  <span className="text-lg text-white font-semibold">YES</span>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.02] border border-[rgba(232,230,213,0.06)]">
                  <span className="text-[10px] text-[rgba(232,230,213,0.40)] block uppercase">Cited</span>
                  <span className="text-lg text-[#E8B400] font-semibold">YES</span>
                </div>
              </div>

              {/* Actual Verbatim Answer with Highlight */}
              <div className="py-6 space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[rgba(232,230,213,0.40)] block">
                  Verbatim Synthesized Output:
                </span>
                <div className="p-5 rounded-xl bg-[#050505] border border-[rgba(232,230,213,0.08)] text-sm sm:text-base text-[rgba(232,230,213,0.70)] leading-relaxed font-light">
                  {selectedQuery.fullResponse}
                </div>
              </div>

              {/* Mention Context Highlight */}
              <div className="p-4 rounded-xl bg-[#E8B400]/10 border border-[#E8B400]/30 space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#E8B400] block">
                  Exact Recommendation Evidence:
                </span>
                <p className="text-xs sm:text-sm text-white font-medium">
                  "{selectedQuery.targetMention}"
                </p>
              </div>

              {/* Competitors and Sources */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-[rgba(232,230,213,0.08)] mt-6 text-xs font-mono">
                <div>
                  <span className="text-[10px] uppercase text-[rgba(232,230,213,0.40)] block mb-1">
                    Competitors Cited:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {selectedQuery.competitorsMentioned.map((c) => (
                      <span key={c} className="px-2 py-0.5 rounded bg-white/[0.04] text-[#E8E6D5]">
                        {c}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-[10px] uppercase text-[rgba(232,230,213,0.40)] block mb-1">
                    Authority Citations:
                  </span>
                  <div className="space-y-1">
                    {selectedQuery.sources.map((s) => (
                      <div key={s} className="flex items-center gap-1 text-[rgba(232,230,213,0.70)]">
                        <ExternalLink className="w-3 h-3 text-[#E8B400]" />
                        <span>{s}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
