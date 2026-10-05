'use client';

import React, { useState, useMemo } from 'react';
import {
  Link2,
  ExternalLink,
  Download,
  Search,
  AlertCircle,
  CheckCircle2,
  Sparkles,
  Filter,
  Flame,
  Globe,
  ArrowUpRight,
  ShieldAlert,
} from 'lucide-react';
import { QuestionResultItem } from './CompetitorBattlecards';

export interface SourceItem {
  domain: string;
  title: string;
  url: string;
  occurrences: number;
}

interface CitationOpportunitiesViewProps {
  sources: SourceItem[];
  questions: QuestionResultItem[];
  targetDomain: string;
  language: 'en' | 'et';
}

function downloadCsv(filename: string, content: string) {
  const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export function CitationOpportunitiesView({
  sources,
  questions,
  targetDomain,
  language,
}: CitationOpportunitiesViewProps) {
  const [search, setSearch] = useState('');
  const [priorityFilter, setPriorityFilter] = useState<'all' | 'high_priority'>('all');
  const [hasExported, setHasExported] = useState(false);

  const isEt = language === 'et';
  const cleanTargetDomain = targetDomain.toLowerCase().replace(/^www\./, '');

  // Calculate high-priority citation opportunities:
  // Domains cited in queries where competitors were recommended and the target business was MISSING
  const opportunities = useMemo(() => {
    const oppMap = new Map<
      string,
      {
        domain: string;
        sampleTitle: string;
        sampleUrl: string;
        citationsCount: number;
        competitorsMentioned: Set<string>;
        queriesAssociated: Set<string>;
        isHighPriorityGap: boolean;
        isTargetDomain: boolean;
      }
    >();

    for (const q of questions) {
      const isTargetMissing = !(q.openai?.mentioned || q.gemini?.mentioned);
      const competitorsFound = new Set<string>();

      q.openai?.competitors?.forEach((c) => competitorsFound.add(c.name));
      q.gemini?.competitors?.forEach((c) => competitorsFound.add(c.name));

      const hasCompetitors = competitorsFound.size > 0;
      const isGapQuery = isTargetMissing && hasCompetitors;

      const qSources: Array<{ domain?: string; title?: string; url: string }> = [
        ...(q.openai?.sources || []),
        ...(q.gemini?.sources || []),
        ...(q.google?.sources || []),
      ];

      for (const s of qSources) {
        if (!s.domain) continue;
        const dom = s.domain.toLowerCase().replace(/^www\./, '');
        const isTarget = dom.includes(cleanTargetDomain);

        const existing = oppMap.get(dom) || {
          domain: dom,
          sampleTitle: s.title || dom,
          sampleUrl: s.url,
          citationsCount: 0,
          competitorsMentioned: new Set<string>(),
          queriesAssociated: new Set<string>(),
          isHighPriorityGap: false,
          isTargetDomain: isTarget,
        };

        existing.citationsCount++;
        existing.queriesAssociated.add(q.question);
        competitorsFound.forEach((c) => existing.competitorsMentioned.add(c));

        if (isGapQuery && !isTarget) {
          existing.isHighPriorityGap = true;
        }

        oppMap.set(dom, existing);
      }
    }

    return Array.from(oppMap.values())
      .map((item) => ({
        ...item,
        competitorsList: Array.from(item.competitorsMentioned),
        queriesList: Array.from(item.queriesAssociated),
      }))
      .sort((a, b) => {
        if (a.isHighPriorityGap !== b.isHighPriorityGap) return a.isHighPriorityGap ? -1 : 1;
        return b.citationsCount - a.citationsCount;
      });
  }, [questions, cleanTargetDomain]);

  // Filter list
  const filtered = useMemo(() => {
    return opportunities.filter((item) => {
      if (priorityFilter === 'high_priority' && !item.isHighPriorityGap) return false;
      if (!search.trim()) return true;
      const q = search.toLowerCase();
      return (
        item.domain.toLowerCase().includes(q) ||
        item.sampleTitle.toLowerCase().includes(q) ||
        item.competitorsList.some((c) => c.toLowerCase().includes(q))
      );
    });
  }, [opportunities, priorityFilter, search]);

  const handleExportCsv = () => {
    const headers = ['Domain', 'Title', 'URL', 'Citations', 'Is_High_Priority_Gap', 'Competitors_Cited_For'];
    const rows = opportunities.map((o) => [
      `"${o.domain}"`,
      `"${o.sampleTitle.replace(/"/g, '""')}"`,
      `"${o.sampleUrl}"`,
      o.citationsCount,
      o.isHighPriorityGap ? 'YES' : 'NO',
      `"${o.competitorsList.join(', ')}"`,
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    downloadCsv(`picked-ai-citation-gaps-${cleanTargetDomain}.csv`, csvContent);
    setHasExported(true);
    setTimeout(() => setHasExported(false), 3000);
  };

  const highPriorityCount = opportunities.filter((o) => o.isHighPriorityGap).length;

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header and Toolbar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900/60 p-5 rounded-2xl border border-slate-800">
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Link2 className="w-5 h-5 text-amber-400" />
            <span>{isEt ? 'Viidete ja allikate võimalused (Authority Gap Analysis)' : 'Authority Citation Opportunities'}</span>
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            {isEt
              ? 'Tuvasta veebidomeenid, mida AI mudelid tsiteerivad konkurentide soovitamisel'
              : 'Web domains cited by LLMs when recommending competing services—target these to win recommendation share'}
          </p>
        </div>

        {/* 1-Click CSV Export */}
        <button
          onClick={handleExportCsv}
          className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all hover:border-slate-600 active:scale-95 cursor-pointer shrink-0"
        >
          <Download className="w-4 h-4 text-amber-400" />
          <span>{hasExported ? (isEt ? 'CSV fail alla laaditud!' : 'CSV Exported!') : isEt ? 'Ekspordi CSV raport' : 'Export Citation CSV'}</span>
        </button>
      </div>

      {/* Control Filters Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-slate-900/40 p-4 rounded-2xl border border-slate-800/80">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={isEt ? 'Otsi domeeni, pealkirja või konkurenti...' : 'Search citation domain or competitor...'}
            className="w-full pl-9 pr-4 py-2 bg-slate-950/80 border border-slate-800 focus:border-amber-400 rounded-xl text-xs text-white placeholder:text-slate-500 outline-hidden transition-colors"
          />
        </div>

        {/* Priority Filter */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setPriorityFilter('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              priorityFilter === 'all'
                ? 'bg-slate-800 text-white border border-slate-700'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {isEt ? 'Kõik allikad' : 'All Sources'} ({opportunities.length})
          </button>

          <button
            onClick={() => setPriorityFilter('high_priority')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              priorityFilter === 'high_priority'
                ? 'bg-amber-400 text-slate-950 font-black shadow-md shadow-amber-400/20'
                : 'bg-amber-400/10 text-amber-400 border border-amber-400/30 hover:bg-amber-400/20'
            }`}
          >
            <Flame className="w-3.5 h-3.5 text-amber-400" />
            <span>{isEt ? 'Kriitilised puudujäägid' : 'High-Priority Gaps'}</span>
            <span className="px-1.5 py-0.2 rounded-full bg-slate-950/40 text-[10px] font-mono">
              {highPriorityCount}
            </span>
          </button>
        </div>
      </div>

      {/* Opportunities List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.length === 0 ? (
          <div className="col-span-2 p-8 text-center bg-slate-900/60 rounded-2xl border border-slate-800 text-slate-400 text-xs">
            {isEt ? 'Filtritele vastavaid viiteid ei leitud.' : 'No citation opportunities matched your filter criteria.'}
          </div>
        ) : (
          filtered.map((opp, idx) => (
            <div
              key={idx}
              className={`p-5 rounded-2xl border transition-all relative overflow-hidden flex flex-col justify-between space-y-4 ${
                opp.isTargetDomain
                  ? 'bg-emerald-950/10 border-emerald-500/30 shadow-sm'
                  : opp.isHighPriorityGap
                  ? 'bg-slate-900/80 border-amber-500/30 hover:border-amber-400/60 shadow-lg'
                  : 'bg-slate-900/50 border-slate-800/80 hover:border-slate-700'
              }`}
            >
              {opp.isHighPriorityGap && (
                <div className="absolute top-0 right-0 px-3 py-1 bg-amber-400 text-slate-950 text-[10px] font-black uppercase tracking-wider rounded-bl-xl flex items-center gap-1 shadow-sm">
                  <Flame className="w-3 h-3" />
                  <span>Authority Gap</span>
                </div>
              )}

              {opp.isTargetDomain && (
                <div className="absolute top-0 right-0 px-3 py-1 bg-emerald-500 text-slate-950 text-[10px] font-black uppercase tracking-wider rounded-bl-xl flex items-center gap-1 shadow-sm">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Your Domain</span>
                </div>
              )}

              <div className="space-y-2 pr-16">
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-slate-400" />
                  <span className="font-mono text-sm font-bold text-white tracking-tight">{opp.domain}</span>
                </div>
                <h4 className="text-xs text-slate-300 font-medium line-clamp-2 leading-relaxed">
                  {opp.sampleTitle}
                </h4>
              </div>

              {/* Competitors cited by this domain */}
              {opp.competitorsList.length > 0 && (
                <div className="space-y-1.5 pt-2 border-t border-slate-800/80 text-[11px]">
                  <span className="text-slate-500 font-semibold uppercase text-[10px] tracking-wider">
                    {isEt ? 'Tsiteeritud konkurentide kasuks:' : 'Cited For Competitors:'}
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {opp.competitorsList.slice(0, 4).map((c, cIdx) => (
                      <span
                        key={cIdx}
                        className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-slate-300 font-medium text-[11px]"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Action and Metrics Footer */}
              <div className="flex items-center justify-between pt-3 border-t border-slate-800/60 text-xs">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-slate-800 font-mono text-[11px] font-bold text-slate-300">
                    {opp.citationsCount} {opp.citationsCount === 1 ? 'citation' : 'citations'}
                  </span>
                  <span className="text-[11px] text-slate-500">
                    across {opp.queriesList.length} {opp.queriesList.length === 1 ? 'query' : 'queries'}
                  </span>
                </div>

                <a
                  href={opp.sampleUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-amber-400 hover:text-amber-300 font-bold transition-colors text-xs"
                >
                  <span>{isEt ? 'Vaata allikat' : 'Visit Source'}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
