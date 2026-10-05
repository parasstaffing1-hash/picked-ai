'use client';

import React, { useState } from 'react';
import {
  TrendingUp,
  Award,
  Swords,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  ShieldCheck,
  Trophy,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  ArrowRight,
} from 'lucide-react';

export interface CompetitorItem {
  name: string;
  appearances: number;
  averagePosition: number | null;
}

export interface QuestionResultItem {
  orderIndex: number;
  question: string;
  intent: string;
  openai: {
    mentioned: boolean;
    position: number | null;
    competitors?: Array<{ name: string; position?: number }>;
    sources?: Array<{ title?: string; url: string; domain?: string }>;
  } | null;
  gemini: {
    mentioned: boolean;
    position: number | null;
    competitors?: Array<{ name: string; position?: number }>;
    sources?: Array<{ title?: string; url: string; domain?: string }>;
  } | null;
  google: {
    visible: boolean;
    position: number | null;
    sources?: Array<{ title?: string; url: string; domain?: string }>;
  } | null;
}

interface CompetitorBattlecardsProps {
  targetBrand: string;
  targetDomain: string;
  competitors: CompetitorItem[];
  questions: QuestionResultItem[];
  language: 'en' | 'et';
}

export function CompetitorBattlecards({
  targetBrand,
  targetDomain,
  competitors,
  questions,
  language,
}: CompetitorBattlecardsProps) {
  const [selectedComp, setSelectedComp] = useState<string | null>(
    competitors.length > 0 ? competitors[0].name : null
  );

  const isEt = language === 'et';

  // Calculate target business metrics
  let targetAppearances = 0;
  const targetPositions: number[] = [];

  for (const q of questions) {
    if (q.openai?.mentioned) {
      targetAppearances++;
      if (q.openai.position) targetPositions.push(q.openai.position);
    }
    if (q.gemini?.mentioned) {
      targetAppearances++;
      if (q.gemini.position) targetPositions.push(q.gemini.position);
    }
  }

  const targetAvgPos =
    targetPositions.length > 0
      ? Number((targetPositions.reduce((a, b) => a + b, 0) / targetPositions.length).toFixed(1))
      : null;

  const totalChecks = Math.max(1, questions.length * 2);

  if (competitors.length === 0) {
    return (
      <div className="p-8 text-center bg-slate-900/60 rounded-2xl border border-slate-800 text-slate-400 text-xs">
        {isEt
          ? 'Selles skannis ei tuvastatud konkurente vastustes.'
          : 'No major competitors were detected across the AI query responses.'}
      </div>
    );
  }

  const activeCompetitor = competitors.find((c) => c.name === selectedComp) || competitors[0];

  // Find prompts where this competitor was mentioned
  const wonPrompts: Array<{
    question: string;
    intent: string;
    competitorPos: number | null;
    targetMentioned: boolean;
    targetPos: number | null;
  }> = [];
  const associatedDomains = new Set<string>();

  for (const q of questions) {
    const oComp = q.openai?.competitors?.find(
      (c) => c.name.toLowerCase() === activeCompetitor.name.toLowerCase()
    );
    const gComp = q.gemini?.competitors?.find(
      (c) => c.name.toLowerCase() === activeCompetitor.name.toLowerCase()
    );

    if (oComp || gComp) {
      const pos = oComp?.position || gComp?.position || null;
      const targetMentioned = Boolean(q.openai?.mentioned || q.gemini?.mentioned);
      const targetPos = q.openai?.position || q.gemini?.position || null;

      wonPrompts.push({
        question: q.question,
        intent: q.intent,
        competitorPos: pos,
        targetMentioned,
        targetPos,
      });

      // Collect cited sources
      q.openai?.sources?.forEach((s) => s.domain && associatedDomains.add(s.domain));
      q.gemini?.sources?.forEach((s) => s.domain && associatedDomains.add(s.domain));
    }
  }

  const compSharePercent = Math.min(100, Math.round((activeCompetitor.appearances / totalChecks) * 100));
  const targetSharePercent = Math.min(100, Math.round((targetAppearances / totalChecks) * 100));

  // Determine head-to-head win record
  let targetWins = 0;
  let competitorWins = 0;
  let ties = 0;

  for (const wp of wonPrompts) {
    if (wp.targetMentioned && (!wp.competitorPos || (wp.targetPos && wp.targetPos < wp.competitorPos))) {
      targetWins++;
    } else if (!wp.targetMentioned || (wp.competitorPos && wp.targetPos && wp.competitorPos < wp.targetPos)) {
      competitorWins++;
    } else {
      ties++;
    }
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header and Competitor Selector */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900/60 p-5 rounded-2xl border border-slate-800">
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Swords className="w-5 h-5 text-amber-400" />
            <span>{isEt ? 'Konkurentide lahingukaardid' : 'Competitor Head-to-Head Battlecards'}</span>
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            {isEt
              ? 'Võrdle oma ettevõtet tehisintellekti poolt kõige enam soovitatud konkurentidega'
              : 'Direct comparative intelligence measuring recommendation share of voice and ranking dominance'}
          </p>
        </div>

        {/* Competitor Selector Pills */}
        <div className="flex flex-wrap gap-2">
          {competitors.slice(0, 5).map((comp, idx) => {
            const isSelected = comp.name === activeCompetitor.name;
            return (
              <button
                key={idx}
                onClick={() => setSelectedComp(comp.name)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                  isSelected
                    ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-400/20 font-black scale-[1.02]'
                    : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800 hover:border-slate-700'
                }`}
              >
                <span className="w-4 h-4 rounded-full bg-slate-800/80 text-[10px] flex items-center justify-center font-mono">
                  {idx + 1}
                </span>
                <span>{comp.name}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                  isSelected ? 'bg-slate-950/20 text-slate-950' : 'bg-slate-800 text-slate-400'
                }`}>
                  {comp.appearances}x
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Head-to-Head Duel Card */}
      <div className="bg-slate-900/90 rounded-2xl border border-slate-800/90 shadow-2xl p-6 sm:p-8 backdrop-blur-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-radial from-amber-500/5 via-transparent to-transparent pointer-events-none" />

        {/* Duel Header: Target Brand vs Active Competitor */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6 border-b border-slate-800">
          {/* Target Brand Panel */}
          <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800/80 relative space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                {isEt ? 'Sinu ettevõte' : 'Your Business'}
              </span>
              <span className="text-xs font-mono font-bold text-slate-400">{targetDomain}</span>
            </div>

            <div className="text-xl sm:text-2xl font-black text-white">{targetBrand}</div>

            <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-800/60">
              <div>
                <span className="text-[11px] text-slate-500 uppercase font-semibold">
                  {isEt ? 'Hääleosa (SOV)' : 'Share of Voice'}
                </span>
                <div className="text-xl font-bold font-mono text-emerald-400">{targetSharePercent}%</div>
              </div>
              <div>
                <span className="text-[11px] text-slate-500 uppercase font-semibold">
                  {isEt ? 'Keskmine positsioon' : 'Average Rank'}
                </span>
                <div className="text-xl font-bold font-mono text-white">
                  {targetAvgPos ? `#${targetAvgPos}` : isEt ? 'Pole mainitud' : 'Unranked'}
                </div>
              </div>
            </div>
          </div>

          {/* Competitor Panel */}
          <div className="p-5 rounded-2xl bg-slate-950/70 border border-amber-500/30 relative space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                {isEt ? 'Põhikonkurent' : 'Primary Competitor'}
              </span>
              <span className="text-xs font-mono font-bold text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/20">
                {activeCompetitor.appearances} {isEt ? 'AI mainimist' : 'AI mentions'}
              </span>
            </div>

            <div className="text-xl sm:text-2xl font-black text-white">{activeCompetitor.name}</div>

            <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-800/60">
              <div>
                <span className="text-[11px] text-slate-500 uppercase font-semibold">
                  {isEt ? 'Hääleosa (SOV)' : 'Share of Voice'}
                </span>
                <div className="text-xl font-bold font-mono text-amber-400">{compSharePercent}%</div>
              </div>
              <div>
                <span className="text-[11px] text-slate-500 uppercase font-semibold">
                  {isEt ? 'Keskmine positsioon' : 'Average Rank'}
                </span>
                <div className="text-xl font-bold font-mono text-white">
                  {activeCompetitor.averagePosition ? `#${activeCompetitor.averagePosition}` : '#1.0'}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Share of Voice Visual Comparison Bar */}
        <div className="py-6 space-y-2 border-b border-slate-800">
          <div className="flex justify-between text-xs font-bold">
            <span className="text-emerald-400">{targetBrand} ({targetSharePercent}%)</span>
            <span className="text-slate-400 text-[11px]">AI Recommendation Share Comparison</span>
            <span className="text-amber-400">{activeCompetitor.name} ({compSharePercent}%)</span>
          </div>
          <div className="w-full h-3.5 bg-slate-950 rounded-full overflow-hidden flex p-0.5 border border-slate-800">
            <div
              className="h-full bg-emerald-500 rounded-l-full transition-all duration-700"
              style={{ width: `${Math.max(5, targetSharePercent)}%` }}
              title={`${targetBrand}: ${targetSharePercent}%`}
            />
            <div className="flex-1 bg-slate-800/50" />
            <div
              className="h-full bg-amber-400 rounded-r-full transition-all duration-700"
              style={{ width: `${Math.max(5, compSharePercent)}%` }}
              title={`${activeCompetitor.name}: ${compSharePercent}%`}
            />
          </div>
        </div>

        {/* Head-to-Head Win/Loss Record */}
        <div className="pt-6 grid grid-cols-3 gap-3 text-center">
          <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
            <span className="text-xs text-slate-400 font-semibold">{isEt ? 'Sinu võidud' : 'Your Brand Won'}</span>
            <div className="text-2xl font-black text-emerald-400 mt-1 font-mono">{targetWins}</div>
            <p className="text-[10px] text-slate-500 mt-0.5">Ranked higher or sole mention</p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
            <span className="text-xs text-slate-400 font-semibold">{isEt ? 'Konkurent ees' : 'Competitor Ahead'}</span>
            <div className="text-2xl font-black text-amber-400 mt-1 font-mono">{competitorWins}</div>
            <p className="text-[10px] text-slate-500 mt-0.5">Ranked higher or stole query</p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
            <span className="text-xs text-slate-400 font-semibold">{isEt ? 'Võrdne / Mõlemad' : 'Co-Recommended'}</span>
            <div className="text-2xl font-black text-slate-300 mt-1 font-mono">{ties}</div>
            <p className="text-[10px] text-slate-500 mt-0.5">Both recommended together</p>
          </div>
        </div>

        {/* Head-to-Head Queries Won by this Competitor */}
        <div className="mt-8 space-y-3">
          <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center justify-between">
            <span>
              {isEt
                ? `Päringud, kus ${activeCompetitor.name} esile tõusis (${wonPrompts.length})`
                : `Prompts Where ${activeCompetitor.name} Captured AI Recommendations (${wonPrompts.length})`}
            </span>
          </h4>

          <div className="space-y-2">
            {wonPrompts.map((wp, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-slate-800 text-[10px] font-bold uppercase text-slate-400">
                      {wp.intent}
                    </span>
                    <span className="font-medium text-white">&ldquo;{wp.question}&rdquo;</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span className="px-2.5 py-1 rounded-lg bg-amber-400/10 border border-amber-400/20 text-amber-400 font-mono font-bold">
                    {activeCompetitor.name}: {wp.competitorPos ? `#${wp.competitorPos}` : 'Listed'}
                  </span>
                  {wp.targetMentioned ? (
                    <span className="px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono font-bold">
                      {targetBrand}: {wp.targetPos ? `#${wp.targetPos}` : 'Listed'}
                    </span>
                  ) : (
                    <span className="px-2.5 py-1 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 font-mono font-bold">
                      {targetBrand}: {isEt ? 'Puudu' : 'Missing'}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sources Driving Competitor Dominance */}
        {associatedDomains.size > 0 && (
          <div className="mt-8 p-4 rounded-xl bg-slate-950/60 border border-slate-800/70 space-y-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              {isEt ? 'Allikad, mis toetavad konkurendi nähtavust:' : 'Authority Domains Fueling This Competitor:'}
            </span>
            <div className="flex flex-wrap gap-2 pt-1">
              {Array.from(associatedDomains).slice(0, 8).map((dom, dIdx) => (
                <span
                  key={dIdx}
                  className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 text-xs font-mono"
                >
                  {dom}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
