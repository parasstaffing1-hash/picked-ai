'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import {
  Award,
  CheckCircle2,
  XCircle,
  ExternalLink,
  ChevronDown,
  Mail,
  ArrowLeft,
  Building2,
  MapPin,
  Briefcase,
  TrendingUp,
  Link2,
  FileText,
  Lightbulb,
  ShieldCheck,
  Share2,
  Printer,
  Copy,
  Check,
  X,
  Bot,
  Globe,
  Swords,
  ListChecks,
  Search,
  Filter,
  AlertCircle,
  Sparkles,
  Zap,
} from 'lucide-react';
import { ScoreGauge } from './ScoreGauge';
import { CompetitorBattlecards } from './CompetitorBattlecards';
import { CitationOpportunitiesView } from './CitationOpportunitiesView';
import { ModelResponseDrawer } from './ModelResponseDrawer';

export interface FullReportData {
  scanId: string;
  userEmail?: string;
  business: {
    name: string;
    url: string;
    domain: string;
    industry: string;
    city: string;
    language: string;
    services: string[];
    description: string;
  };
  scores: {
    overall_score: number;
    openai_score: number;
    gemini_score: number;
    google_score: number;
    openai_available?: boolean;
    gemini_available?: boolean;
    google_available?: boolean;
    is_partial?: boolean;
    questions_checked: number;
    questions_mentioned: number;
    mention_rate: number;
    competitor_count: number;
    citation_count: number;
    grade: string;
    methodology: {
      description: string;
      engineWeights: Record<string, string>;
      scoringRules: string[];
    };
  };
  questionResults: Array<{
    orderIndex: number;
    question: string;
    intent: string;
    openai: {
      mentioned: boolean;
      position: number | null;
      evidence: string;
      competitors?: Array<{ name: string; position?: number }>;
      sources?: Array<{ title?: string; url: string; domain?: string }>;
      rawResponse?: string;
      status?: string;
      error?: string;
    } | null;
    gemini: {
      mentioned: boolean;
      position: number | null;
      evidence: string;
      competitors?: Array<{ name: string; position?: number }>;
      sources?: Array<{ title?: string; url: string; domain?: string }>;
      rawResponse?: string;
      status?: string;
      error?: string;
    } | null;
    google: {
      visible: boolean;
      position: number | null;
      snippet: string;
      sources?: Array<{ title?: string; url: string; domain?: string }>;
      rawResponse?: string;
      status?: string;
      error?: string;
    } | null;
  }>;
  topCompetitors: Array<{
    name: string;
    appearances: number;
    averagePosition: number | null;
  }>;
  topSources: Array<{
    domain: string;
    title: string;
    url: string;
    occurrences: number;
  }>;
  recommendations: string[];
  createdAt: string;
  scanDurationSeconds?: number;
}

interface FullReportPageProps {
  report: FullReportData;
}

type TabKey = 'queries' | 'battlecards' | 'citations' | 'recommendations';

export function FullReportPage({ report }: FullReportPageProps) {
  const [activeTab, setActiveTab] = useState<TabKey>('queries');
  const [expandedQuestion, setExpandedQuestion] = useState<number | null>(0);
  const [inspectQuestionIdx, setInspectQuestionIdx] = useState<number | null>(null);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [recipientEmail, setRecipientEmail] = useState(report.userEmail || '');
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const [emailStatus, setEmailStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  // Filters for Queries
  const [searchQuery, setSearchQuery] = useState('');
  const [intentFilter, setIntentFilter] = useState<'all' | 'commercial' | 'transactional' | 'local' | 'informational'>('all');
  const [mentionFilter, setMentionFilter] = useState<'all' | 'mentioned' | 'not_mentioned'>('all');

  const { business, scores, questionResults, topCompetitors, topSources, recommendations } = report;
  const isEt = business.language === 'et';

  // Per-engine counts
  const openaiMentions = useMemo(
    () => questionResults.filter((q) => q.openai?.mentioned).length,
    [questionResults]
  );
  const geminiMentions = useMemo(
    () => questionResults.filter((q) => q.gemini?.mentioned).length,
    [questionResults]
  );
  const googleVisibles = useMemo(
    () => questionResults.filter((q) => q.google?.visible).length,
    [questionResults]
  );

  // Filtered queries
  const filteredQuestions = useMemo(() => {
    return questionResults.filter((q) => {
      if (intentFilter !== 'all' && q.intent.toLowerCase() !== intentFilter) return false;
      const isMentioned = Boolean(q.openai?.mentioned || q.gemini?.mentioned || q.google?.visible);
      if (mentionFilter === 'mentioned' && !isMentioned) return false;
      if (mentionFilter === 'not_mentioned' && isMentioned) return false;
      if (!searchQuery.trim()) return true;
      const s = searchQuery.toLowerCase();
      return (
        q.question.toLowerCase().includes(s) ||
        q.intent.toLowerCase().includes(s) ||
        q.openai?.evidence?.toLowerCase().includes(s) ||
        q.gemini?.evidence?.toLowerCase().includes(s)
      );
    });
  }, [questionResults, intentFilter, mentionFilter, searchQuery]);

  const openEmailModal = () => {
    if (!recipientEmail && typeof window !== 'undefined') {
      const saved = localStorage.getItem('picked_ai_last_email');
      if (saved) setRecipientEmail(saved);
    }
    setIsEmailModalOpen(true);
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    } catch {}
  };

  const handleSendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!recipientEmail || !recipientEmail.includes('@')) {
      setEmailStatus({
        type: 'error',
        message: isEt ? 'Palun sisestage kehtiv e-posti aadress.' : 'Please enter a valid email address.',
      });
      return;
    }

    setIsSendingEmail(true);
    setEmailStatus(null);

    try {
      const res = await fetch('/api/email-report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          reportId: report.scanId,
          email: recipientEmail.trim(),
        }),
      });

      const data = await res.json();
      if (!res.ok || data.success === false) {
        throw new Error(data.message || data.error || 'Failed to send email.');
      }

      setEmailStatus({
        type: 'success',
        message: isEt
          ? `Auditiraport saadeti edukalt aadressile ${recipientEmail}!`
          : `Executive report successfully delivered to ${recipientEmail}!`,
      });

      localStorage.setItem('picked_ai_last_email', recipientEmail.trim());

      setTimeout(() => {
        setIsEmailModalOpen(false);
        setEmailStatus(null);
      }, 3000);
    } catch (err: any) {
      setEmailStatus({
        type: 'error',
        message: err.message || (isEt ? 'Viga kirja saatmisel.' : 'Failed to deliver email. Check RESEND_API_KEY configuration.'),
      });
    } finally {
      setIsSendingEmail(false);
    }
  };

  const selectedForDrawer =
    inspectQuestionIdx !== null ? questionResults[inspectQuestionIdx] : null;

  const tabs = [
    {
      id: 'queries' as const,
      label: isEt ? '10 kliendipäringut' : '10 Buyer Queries Audit',
      icon: ListChecks,
      count: questionResults.length,
    },
    {
      id: 'battlecards' as const,
      label: isEt ? 'Konkurentide lahingukaardid' : 'Competitor Battlecards',
      icon: Swords,
      count: topCompetitors.length,
    },
    {
      id: 'citations' as const,
      label: isEt ? 'Viidete ja allikate võimalused' : 'Citation Opportunities',
      icon: Link2,
      count: topSources.length,
    },
    {
      id: 'recommendations' as const,
      label: isEt ? 'GEO Strateegia ja soovitused' : 'Actionable Recommendations',
      icon: Lightbulb,
      count: recommendations.length,
    },
  ];

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 selection:bg-amber-400 selection:text-slate-950 font-sans relative overflow-x-hidden">
      {/* Ambient background lighting */}
      <div className="fixed top-0 left-1/4 w-[500px] h-[350px] bg-amber-500/5 blur-[120px] pointer-events-none rounded-full" />
      <div className="fixed top-1/3 right-1/4 w-[450px] h-[350px] bg-sky-500/5 blur-[120px] pointer-events-none rounded-full" />

      {/* Top Navbar */}
      <header className="border-b border-slate-800/80 bg-[#070b14]/80 backdrop-blur-xl sticky top-0 z-30 print:hidden transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-slate-400 hover:text-white text-xs sm:text-sm font-semibold transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            <span>{isEt ? 'Tagasi avalehele' : 'Back to Scanner'}</span>
          </Link>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={handleCopyLink}
              className="px-3 py-1.5 rounded-xl bg-slate-900/80 hover:bg-slate-800/90 border border-slate-700/70 text-xs font-bold text-slate-300 hover:text-white flex items-center gap-1.5 transition-all cursor-pointer shadow-xs active:scale-95"
              title="Copy public link to share"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-amber-400" />}
              <span className="hidden sm:inline">{copiedLink ? (isEt ? 'Kopeeritud!' : 'Copied!') : (isEt ? 'Jaga linki' : 'Share Link')}</span>
            </button>

            <button
              onClick={() => window.print()}
              className="px-3 py-1.5 rounded-xl bg-slate-900/80 hover:bg-slate-800/90 border border-slate-700/70 text-xs font-bold text-slate-300 hover:text-white flex items-center gap-1.5 transition-all cursor-pointer shadow-xs active:scale-95"
              title="Print or save as PDF"
            >
              <Printer className="w-3.5 h-3.5 text-slate-400" />
              <span className="hidden sm:inline">{isEt ? 'Prindi / PDF' : 'Print PDF'}</span>
            </button>

            <button
              onClick={openEmailModal}
              className="px-3.5 py-1.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-amber-400/30 text-xs font-bold text-amber-300 hover:text-amber-200 flex items-center gap-1.5 transition-all cursor-pointer shadow-xs shadow-amber-400/10 active:scale-95"
            >
              <Mail className="w-3.5 h-3.5 text-amber-400" />
              <span>{isEt ? 'Saada e-postile' : 'Email Report'}</span>
            </button>

            <Link
              href="/"
              className="px-3.5 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-black transition-all cursor-pointer shadow-md shadow-amber-400/20 active:scale-95"
            >
              {isEt ? 'Uus audit' : 'New Scan'}
            </Link>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-10 space-y-8 sm:space-y-10 relative z-10">
        {/* Header Block */}
        <div className="border-b border-slate-800/80 pb-8 space-y-4">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-400 text-xs font-black uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              AI VISIBILITY & GEO REPORT
            </span>
            <span className="text-[11px] text-slate-500 font-mono hidden sm:inline">
              Audit ID: {report.scanId.slice(0, 8)}...
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
                {business.name}
              </h1>
              <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-slate-400 mt-2">
                <a
                  href={business.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-amber-400 hover:underline flex items-center gap-1 font-semibold"
                >
                  <Globe className="w-3.5 h-3.5" />
                  <span>{business.domain}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
                <span className="text-slate-600">•</span>
                <span className="text-slate-300 font-medium">{business.industry}</span>
                <span className="text-slate-600">•</span>
                <span className="text-slate-300 font-medium">{business.city}</span>
              </div>
            </div>

            <div className="text-left sm:text-right text-xs text-slate-400 font-mono space-y-1">
              <div>Date: {new Date(report.createdAt).toLocaleDateString()}</div>
              <div className="text-slate-500 text-[11px]">
                {isEt ? 'Mitme mudeli kontroll' : '3-Engine Parallel Audit'}
              </div>
            </div>
          </div>
        </div>

        {/* Executive Score & Radial Engine Gauges Strip */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          {/* Main Hero Score Gauge Card */}
          <div className="lg:col-span-1 glass-panel-elevated rounded-2xl p-6 flex flex-col items-center justify-between relative overflow-hidden border border-amber-400/30 shadow-2xl">
            <div className="absolute top-0 right-0 w-36 h-36 bg-amber-400/10 rounded-full blur-2xl pointer-events-none" />

            <div className="w-full text-center">
              <span className="text-xs uppercase font-black text-amber-400 tracking-wider">
                Overall AI Visibility
              </span>
            </div>

            <div className="my-4">
              <ScoreGauge
                score={scores.overall_score}
                grade={scores.grade}
                size={145}
                strokeWidth={10}
              />
            </div>

            <div className="w-full pt-4 border-t border-slate-800/80 text-xs text-slate-400 space-y-2 font-medium">
              <div className="flex justify-between items-center">
                <span>{isEt ? 'Mainimismäär:' : 'Mention Rate:'}</span>
                <span className="font-bold text-white bg-slate-900/80 px-2 py-0.5 rounded-md border border-slate-800">
                  {scores.questions_mentioned} / {scores.questions_checked} ({scores.mention_rate}%)
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span>{isEt ? 'Tuvastatud konkurendid:' : 'Competitors Seen:'}</span>
                <span className="font-bold text-amber-400">{scores.competitor_count}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>{isEt ? 'Tsiteeritud allikaid:' : 'Cited Sources:'}</span>
                <span className="font-bold text-sky-400">{scores.citation_count}</span>
              </div>
            </div>
          </div>

          {/* Engine Cards Strip */}
          <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* OpenAI / ChatGPT Card */}
            <div className="glass-panel rounded-2xl p-6 flex flex-col items-center justify-between text-center relative border-t-2 border-t-emerald-500/80">
              <div className="w-full flex items-center justify-between">
                <span className="text-xs font-black text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Bot className="w-3.5 h-3.5 text-emerald-400" />
                  ChatGPT
                </span>
                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  GPT-4o
                </span>
              </div>

              <div className="my-3">
                <ScoreGauge
                  score={scores.openai_score}
                  size={105}
                  strokeWidth={8}
                  color="#10b981"
                />
              </div>

              <div className="w-full pt-3 border-t border-slate-800/80 text-xs text-slate-400 flex justify-between items-center font-medium">
                <span>{isEt ? 'Soovituste määr:' : 'Mention Rate:'}</span>
                <span className="font-bold text-emerald-400 font-mono">
                  {openaiMentions} / {scores.questions_checked}
                </span>
              </div>
            </div>

            {/* Google Gemini Card */}
            <div className="glass-panel rounded-2xl p-6 flex flex-col items-center justify-between text-center relative border-t-2 border-t-sky-500/80">
              <div className="w-full flex items-center justify-between">
                <span className="text-xs font-black text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Bot className="w-3.5 h-3.5 text-sky-400" />
                  Gemini
                </span>
                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded-full border border-sky-500/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
                  Gemini 2.5
                </span>
              </div>

              <div className="my-3">
                <ScoreGauge
                  score={scores.gemini_score}
                  size={105}
                  strokeWidth={8}
                  color="#38bdf8"
                />
              </div>

              <div className="w-full pt-3 border-t border-slate-800/80 text-xs text-slate-400 flex justify-between items-center font-medium">
                <span>{isEt ? 'Soovituste määr:' : 'Mention Rate:'}</span>
                <span className="font-bold text-sky-400 font-mono">
                  {geminiMentions} / {scores.questions_checked}
                </span>
              </div>
            </div>

            {/* Google AI Overviews Card */}
            <div className="glass-panel rounded-2xl p-6 flex flex-col items-center justify-between text-center relative border-t-2 border-t-amber-500/80">
              <div className="w-full flex items-center justify-between">
                <span className="text-xs font-black text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Search className="w-3.5 h-3.5 text-amber-400" />
                  AI Overviews
                </span>
                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                  Search Grounding
                </span>
              </div>

              <div className="my-3">
                <ScoreGauge
                  score={scores.google_score}
                  size={105}
                  strokeWidth={8}
                  color="#f59e0b"
                />
              </div>

              <div className="w-full pt-3 border-t border-slate-800/80 text-xs text-slate-400 flex justify-between items-center font-medium">
                <span>{isEt ? 'Nähtavuse määr:' : 'Visibility Rate:'}</span>
                <span className="font-bold text-amber-400 font-mono">
                  {googleVisibles} / {scores.questions_checked}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Business Entity Profile Pill Strip */}
        <div className="glass-panel rounded-2xl p-5 sm:p-6 space-y-4">
          <div className="text-xs font-black text-slate-400 uppercase tracking-wider flex items-center gap-2">
            <Building2 className="w-4 h-4 text-amber-400" />
            <span>{isEt ? 'Analüüsitud ettevõtte profiil' : 'Extracted Business Profile'}</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 text-xs">
            <div className="p-3.5 bg-slate-950/70 rounded-xl border border-slate-800/90">
              <div className="text-slate-500 uppercase font-bold text-[10px] tracking-wider">Location & Industry</div>
              <div className="text-white font-bold mt-1 text-sm">{business.city}</div>
              <div className="text-amber-400/90 text-xs mt-0.5 font-medium">{business.industry}</div>
            </div>

            <div className="p-3.5 bg-slate-950/70 rounded-xl border border-slate-800/90 sm:col-span-2">
              <div className="text-slate-500 uppercase font-bold text-[10px] tracking-wider">Identified Core Services</div>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {business.services.map((srv, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-lg bg-slate-900/90 border border-slate-700/70 text-slate-200 text-xs font-medium hover:border-slate-500 transition-colors"
                  >
                    {srv}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Dashboard Tabs Navigation */}
        <div className="flex items-center gap-2 overflow-x-auto p-1.5 bg-slate-900/60 border border-slate-800/80 rounded-2xl backdrop-blur-md">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-colors flex items-center gap-2.5 cursor-pointer shrink-0 ${
                  isActive ? 'text-amber-300 font-extrabold' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeReportTab"
                    className="absolute inset-0 bg-gradient-to-r from-amber-400/15 via-amber-400/10 to-yellow-400/15 border border-amber-400/30 rounded-xl shadow-[0_0_15px_rgba(245,158,11,0.15)]"
                    transition={{ type: 'spring', stiffness: 380, damping: 28 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-amber-400' : 'text-slate-500'}`} />
                  <span>{tab.label}</span>
                  {typeof tab.count === 'number' && (
                    <span
                      className={`px-1.5 py-0.5 rounded-md text-[10px] font-mono font-bold ${
                        isActive ? 'bg-amber-400/20 text-amber-300' : 'bg-slate-800/80 text-slate-500'
                      }`}
                    >
                      {tab.count}
                    </span>
                  )}
                </span>
              </button>
            );
          })}
        </div>

        {/* Tab 1: 10 Buyer Queries Audit */}
        {activeTab === 'queries' && (
          <div className="space-y-4">
            {/* Filter and Search Bar for Queries */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-slate-900/70 p-4 rounded-2xl border border-slate-800/80">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={isEt ? 'Otsi päringutest või vastustest...' : 'Filter questions or AI answers...'}
                  className="w-full pl-9 pr-4 py-2 bg-slate-950/80 border border-slate-800 focus:border-amber-400/70 rounded-xl text-xs text-white placeholder:text-slate-500 outline-hidden transition-colors"
                />
              </div>

              {/* Intent Filter */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
                {(['all', 'commercial', 'transactional', 'local'] as const).map((it) => (
                  <button
                    key={it}
                    onClick={() => setIntentFilter(it)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                      intentFilter === it
                        ? 'bg-amber-400 text-slate-950 font-bold shadow-xs shadow-amber-400/30'
                        : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                    }`}
                  >
                    {it}
                  </button>
                ))}
              </div>

              {/* Mention Filter */}
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setMentionFilter('all')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    mentionFilter === 'all'
                      ? 'bg-slate-800 text-white font-bold'
                      : 'text-slate-500 hover:text-white'
                  }`}
                >
                  {isEt ? 'Kõik' : 'All'}
                </button>
                <button
                  onClick={() => setMentionFilter('mentioned')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    mentionFilter === 'mentioned'
                      ? 'bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30'
                      : 'text-slate-500 hover:text-white'
                  }`}
                >
                  ✓ {isEt ? 'Mainitud' : 'Mentioned'}
                </button>
                <button
                  onClick={() => setMentionFilter('not_mentioned')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    mentionFilter === 'not_mentioned'
                      ? 'bg-rose-500/20 text-rose-300 font-bold border border-rose-500/30'
                      : 'text-slate-500 hover:text-white'
                  }`}
                >
                  ✗ {isEt ? 'Puudu' : 'Missing'}
                </button>
              </div>
            </div>

            {/* Questions List */}
            <div className="space-y-3">
              {filteredQuestions.map((qr) => {
                const realIdx = qr.orderIndex - 1;
                const isExpanded = expandedQuestion === realIdx;

                return (
                  <div
                    key={realIdx}
                    className="glass-panel rounded-2xl overflow-hidden transition-all border border-slate-800/80 hover:border-slate-700/80"
                  >
                    <div
                      onClick={() => setExpandedQuestion((prev) => (prev === realIdx ? null : realIdx))}
                      className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer hover:bg-slate-900/60 transition-colors"
                    >
                      <div className="space-y-1.5 max-w-xl">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono font-black text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded-md border border-amber-400/20">
                            #{String(qr.orderIndex).padStart(2, '0')}
                          </span>
                          <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[10px] font-bold uppercase tracking-wider">
                            {qr.intent}
                          </span>
                        </div>
                        <h3 className="text-base font-bold text-white leading-snug">
                          &ldquo;{qr.question}&rdquo;
                        </h3>
                      </div>

                      <div className="flex items-center gap-2 sm:gap-3 shrink-0 flex-wrap sm:flex-nowrap">
                        {/* OpenAI Result */}
                        <div
                          className={`px-3 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 ${
                            qr.openai?.mentioned
                              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                              : 'bg-slate-950/80 border-slate-800 text-slate-500'
                          }`}
                        >
                          <span>ChatGPT</span>
                          {qr.openai?.mentioned ? (
                            <>
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                              {qr.openai.position && (
                                <span className="text-[10px] bg-emerald-500/20 px-1 rounded font-mono">
                                  #{qr.openai.position}
                                </span>
                              )}
                            </>
                          ) : (
                            <XCircle className="w-3.5 h-3.5 text-slate-600" />
                          )}
                        </div>

                        {/* Gemini Result */}
                        <div
                          className={`px-3 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 ${
                            qr.gemini?.mentioned
                              ? 'bg-sky-500/10 border-sky-500/30 text-sky-400'
                              : 'bg-slate-950/80 border-slate-800 text-slate-500'
                          }`}
                        >
                          <span>Gemini</span>
                          {qr.gemini?.mentioned ? (
                            <>
                              <CheckCircle2 className="w-3.5 h-3.5 text-sky-400" />
                              {qr.gemini.position && (
                                <span className="text-[10px] bg-sky-500/20 px-1 rounded font-mono">
                                  #{qr.gemini.position}
                                </span>
                              )}
                            </>
                          ) : (
                            <XCircle className="w-3.5 h-3.5 text-slate-600" />
                          )}
                        </div>

                        {/* Google AI Overview Result */}
                        <div
                          className={`px-3 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 ${
                            qr.google?.visible
                              ? 'bg-amber-500/10 border-amber-500/30 text-amber-400'
                              : 'bg-slate-950/80 border-slate-800 text-slate-500'
                          }`}
                        >
                          <span>Google AI</span>
                          {qr.google?.visible ? (
                            <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                          ) : (
                            <XCircle className="w-3.5 h-3.5 text-slate-600" />
                          )}
                        </div>

                        <div className="text-slate-500 hover:text-white p-1">
                          <ChevronDown
                            className={`w-4 h-4 transition-transform duration-200 ${
                              isExpanded ? 'rotate-180 text-amber-400' : ''
                            }`}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Animated Expanded Detail View */}
                    <AnimatePresence initial={false}>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: 'easeInOut' }}
                          className="overflow-hidden"
                        >
                          <div className="p-5 border-t border-slate-800/80 bg-slate-950/70 text-xs space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {/* OpenAI Evidence */}
                              <div className="p-4 rounded-xl border border-slate-800/90 bg-slate-900/60 space-y-2">
                                <div className="font-bold text-slate-300 flex items-center justify-between">
                                  <span className="flex items-center gap-1.5">
                                    <Bot className="w-3.5 h-3.5 text-emerald-400" />
                                    <span>OpenAI Observation</span>
                                  </span>
                                  <span className="text-slate-400 font-mono text-[11px] bg-slate-800/80 px-2 py-0.5 rounded">
                                    {qr.openai?.mentioned ? `Rank #${qr.openai.position || '—'}` : 'Not Mentioned'}
                                  </span>
                                </div>
                                <p className="text-slate-300 leading-relaxed italic border-l-2 border-emerald-500/40 pl-3 py-1">
                                  &ldquo;{qr.openai?.evidence || 'No direct brand mention detected in returned output.'}&rdquo;
                                </p>
                              </div>

                              {/* Gemini Evidence */}
                              <div className="p-4 rounded-xl border border-slate-800/90 bg-slate-900/60 space-y-2">
                                <div className="font-bold text-slate-300 flex items-center justify-between">
                                  <span className="flex items-center gap-1.5">
                                    <Bot className="w-3.5 h-3.5 text-sky-400" />
                                    <span>Gemini Observation</span>
                                  </span>
                                  <span className="text-slate-400 font-mono text-[11px] bg-slate-800/80 px-2 py-0.5 rounded">
                                    {qr.gemini?.mentioned ? `Rank #${qr.gemini.position || '—'}` : 'Not Mentioned'}
                                  </span>
                                </div>
                                <p className="text-slate-300 leading-relaxed italic border-l-2 border-sky-500/40 pl-3 py-1">
                                  &ldquo;{qr.gemini?.evidence || 'No direct brand mention detected in returned output.'}&rdquo;
                                </p>
                              </div>
                            </div>

                            {/* Google AI Overview Snippet if present */}
                            {qr.google && (
                              <div className="p-3.5 rounded-xl border border-slate-800/90 bg-slate-900/40 text-xs flex items-center justify-between">
                                <span className="text-slate-400 font-medium">
                                  Google AI Overviews Grounding: {qr.google.visible ? '✓ Visible in SERP overview' : '— Not featured in AI Overview summary'}
                                </span>
                                {qr.google.snippet && (
                                  <span className="text-slate-500 truncate max-w-sm ml-4 italic">
                                    &ldquo;{qr.google.snippet}&rdquo;
                                  </span>
                                )}
                              </div>
                            )}

                            {/* Stored Response Inspector CTA */}
                            <div className="pt-2 flex justify-end">
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setInspectQuestionIdx(realIdx);
                                }}
                                className="px-3.5 py-2 rounded-xl bg-amber-400/10 hover:bg-amber-400/20 text-amber-300 border border-amber-400/30 text-xs font-bold flex items-center gap-2 cursor-pointer transition-all hover:scale-[1.02] active:scale-95 shadow-xs"
                              >
                                <FileText className="w-3.5 h-3.5 text-amber-400" />
                                <span>{isEt ? 'Võrdle täielikke AI vastuseid kõrvuti' : 'Inspect Side-by-Side Raw Responses'}</span>
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
          </div>
        )}

        {/* Tab 2: Competitor Battlecards */}
        {activeTab === 'battlecards' && (
          <CompetitorBattlecards
            targetBrand={business.name}
            targetDomain={business.domain}
            competitors={topCompetitors}
            questions={questionResults}
            language={isEt ? 'et' : 'en'}
          />
        )}

        {/* Tab 3: Citation Opportunities */}
        {activeTab === 'citations' && (
          <CitationOpportunitiesView
            sources={topSources}
            questions={questionResults}
            targetDomain={business.domain}
            language={isEt ? 'et' : 'en'}
          />
        )}

        {/* Tab 4: Actionable Recommendations */}
        {activeTab === 'recommendations' && (
          <div className="space-y-6">
            <div className="glass-panel-elevated rounded-2xl p-6 sm:p-8 space-y-6">
              <div>
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-amber-400" />
                  <span>{isEt ? 'Strateegilised soovitused nähtavuse tõstmiseks' : 'Actionable GEO Recommendations'}</span>
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  {isEt
                    ? 'Konkreetsed soovitused, mis põhinevad Sinu auditi tulemustel ja konkurentide eelistel:'
                    : 'Data-driven recommendations tailored specifically to your scan results and competitor strengths:'}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {recommendations.map((rec, i) => (
                  <div
                    key={i}
                    className="p-5 rounded-xl border border-slate-800/90 bg-slate-950/70 flex items-start gap-3.5 hover:border-amber-400/30 transition-colors"
                  >
                    <div className="w-7 h-7 rounded-xl bg-amber-400/10 border border-amber-400/30 text-amber-400 text-xs font-black flex items-center justify-center shrink-0 mt-0.5">
                      {i + 1}
                    </div>
                    <div className="space-y-1">
                      <span className="text-[10px] font-black uppercase tracking-wider text-amber-400/80">
                        Priority Action #{i + 1}
                      </span>
                      <p className="text-xs text-slate-200 leading-relaxed font-medium">{rec}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Transparency Statement */}
        <div className="p-4 rounded-xl border border-slate-800/80 bg-slate-950/60 text-xs text-slate-500 flex items-center gap-3">
          <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0" />
          <span>
            {isEt
              ? 'Läbipaistvuse põhimõte: Google AI Overviews audit viiakse läbi ametliku Google Search Grounding või SERP ülevaate plokkide kaudu. Kõik vastused salvestatakse auditeeritavuse tagamiseks.'
              : 'Methodology Transparency: Google AI Overviews audits are executed via Google Search Grounding and SERP AI overview data without fabricating responses. All raw queries and responses are stored verbatim for auditability.'}
          </span>
        </div>
      </div>

      {/* Side-by-Side Model Response Modal / Drawer */}
      {selectedForDrawer && (
        <ModelResponseDrawer
          isOpen={inspectQuestionIdx !== null}
          onClose={() => setInspectQuestionIdx(null)}
          questionNumber={selectedForDrawer.orderIndex}
          questionText={selectedForDrawer.question}
          intent={selectedForDrawer.intent}
          openai={selectedForDrawer.openai}
          gemini={selectedForDrawer.gemini}
          google={selectedForDrawer.google}
          language={isEt ? 'et' : 'en'}
        />
      )}

      {/* Email Report Modal */}
      {isEmailModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 max-w-md w-full shadow-2xl relative">
            <button
              onClick={() => {
                setIsEmailModalOpen(false);
                setEmailStatus(null);
              }}
              className="absolute top-4 right-4 text-slate-500 hover:text-white p-1 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-2 mb-6">
              <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/30 text-amber-400 flex items-center justify-center">
                <Mail className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white">
                {isEt ? 'Saada auditiraport e-postile' : 'Email Executive Audit Report'}
              </h3>
              <p className="text-xs text-slate-400">
                {isEt
                  ? 'Sisestage oma e-posti aadress ja me saadame teile kokkuvõtva raporti koos otselingiga.'
                  : 'Enter your email address and we will dispatch the complete executive summary report.'}
              </p>
            </div>

            <form onSubmit={handleSendEmail} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                  {isEt ? 'Saaja e-post' : 'Recipient Email'}
                </label>
                <input
                  type="email"
                  value={recipientEmail}
                  onChange={(e) => setRecipientEmail(e.target.value)}
                  placeholder="name@company.com"
                  required
                  disabled={isSendingEmail}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white text-xs outline-hidden focus:border-amber-400"
                />
              </div>

              {emailStatus && (
                <div
                  className={`p-3 rounded-xl text-xs font-medium ${
                    emailStatus.type === 'success'
                      ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400'
                      : 'bg-rose-500/10 border border-rose-500/30 text-rose-400'
                  }`}
                >
                  {emailStatus.message}
                </div>
              )}

              <button
                type="submit"
                disabled={isSendingEmail}
                className="w-full py-3 bg-amber-400 hover:bg-amber-300 disabled:opacity-50 text-slate-950 text-xs font-black rounded-xl transition-all cursor-pointer shadow-md shadow-amber-400/20 active:scale-95"
              >
                {isSendingEmail ? (
                  <span>{isEt ? 'Saadan...' : 'Sending...'}</span>
                ) : (
                  <span>{isEt ? 'Saada raport kohe' : 'Send Report Now'}</span>
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
