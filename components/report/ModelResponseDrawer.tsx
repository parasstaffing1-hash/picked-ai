'use client';

import React, { useState } from 'react';
import {
  X,
  Copy,
  Check,
  ExternalLink,
  Bot,
  Globe,
  ShieldAlert,
  CheckCircle2,
  XCircle,
  Sparkles,
  Link2,
  Quote,
  Terminal,
} from 'lucide-react';

interface ModelResponseDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  questionNumber: number;
  questionText: string;
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
  language: 'en' | 'et';
}

export function ModelResponseDrawer({
  isOpen,
  onClose,
  questionNumber,
  questionText,
  intent,
  openai,
  gemini,
  google,
  language,
}: ModelResponseDrawerProps) {
  const [activeTab, setActiveTab] = useState<'openai' | 'gemini' | 'google'>('openai');
  const [copied, setCopied] = useState(false);

  const isEt = language === 'et';

  if (!isOpen) return null;

  const currentData =
    activeTab === 'openai' ? openai : activeTab === 'gemini' ? gemini : google;

  const rawText =
    currentData && 'rawResponse' in currentData && currentData.rawResponse
      ? currentData.rawResponse
      : currentData && 'evidence' in currentData
      ? currentData.evidence
      : currentData && 'snippet' in currentData
      ? currentData.snippet
      : '';

  const handleCopy = () => {
    if (!rawText) return;
    navigator.clipboard.writeText(rawText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isMentioned =
    activeTab === 'google'
      ? Boolean(google?.visible)
      : activeTab === 'openai'
      ? Boolean(openai?.mentioned)
      : Boolean(gemini?.mentioned);

  const position =
    activeTab === 'google'
      ? google?.position
      : activeTab === 'openai'
      ? openai?.position
      : gemini?.position;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl flex flex-col max-h-[92vh] overflow-hidden relative">
        {/* Header */}
        <div className="flex items-start justify-between pb-5 border-b border-slate-800 shrink-0">
          <div className="space-y-1.5 pr-6">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-amber-400 bg-amber-400/10 px-2.5 py-0.5 rounded-full border border-amber-400/20">
                Prompt #{questionNumber}
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 text-[10px] font-bold uppercase tracking-wider">
                {intent} intent
              </span>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-white leading-snug">
              &ldquo;{questionText}&rdquo;
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-2 rounded-xl hover:bg-slate-800 transition-colors cursor-pointer shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Engine Tabs */}
        <div className="flex items-center gap-2 pt-4 pb-3 border-b border-slate-800 shrink-0 overflow-x-auto">
          <button
            onClick={() => setActiveTab('openai')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'openai'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Bot className="w-3.5 h-3.5 text-emerald-400" />
            <span>ChatGPT (OpenAI)</span>
            {openai?.mentioned && <span className="w-2 h-2 rounded-full bg-emerald-400" />}
          </button>

          <button
            onClick={() => setActiveTab('gemini')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'gemini'
                ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40 shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Bot className="w-3.5 h-3.5 text-sky-400" />
            <span>Google Gemini</span>
            {gemini?.mentioned && <span className="w-2 h-2 rounded-full bg-sky-400" />}
          </button>

          <button
            onClick={() => setActiveTab('google')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'google'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Globe className="w-3.5 h-3.5 text-amber-400" />
            <span>Google AI Overviews</span>
            {google?.visible && <span className="w-2 h-2 rounded-full bg-amber-400" />}
          </button>
        </div>

        {/* Body Content */}
        <div className="flex-1 overflow-y-auto py-5 space-y-5">
          {/* Status Indicator Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-slate-950 border border-slate-800/80">
            <div className="flex items-center gap-2.5">
              <span className="text-xs text-slate-400 font-semibold">
                {isEt ? 'Nähtavuse tulemus:' : 'Visibility Outcome:'}
              </span>
              {isMentioned ? (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-bold text-xs">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>
                    {isEt ? 'Soovitatud' : 'Recommended'} {position ? `#${position}` : ''}
                  </span>
                </span>
              ) : currentData?.status === 'failed' ? (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/20 text-rose-400 border border-rose-500/30 font-bold text-xs">
                  <ShieldAlert className="w-3.5 h-3.5" />
                  <span>{isEt ? 'Päring ebaõnnestus' : 'Query Failed / Timeout'}</span>
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 text-slate-400 font-bold text-xs">
                  <XCircle className="w-3.5 h-3.5" />
                  <span>{isEt ? 'Pole vastuses mainitud' : 'Not Mentioned in Answer'}</span>
                </span>
              )}
            </div>

            {/* Copy Button */}
            <button
              onClick={handleCopy}
              disabled={!rawText}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer border border-slate-700"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">{isEt ? 'Kopeeritud!' : 'Copied!'}</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>{isEt ? 'Kopeeri vastus' : 'Copy Response'}</span>
                </>
              )}
            </button>
          </div>

          {/* Raw AI Model Response Terminal */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-400 px-1">
              <span className="flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-amber-400" />
                <span>{isEt ? 'Reaalne mudeli vastus (Täistekst)' : 'Verbatim Model Response'}</span>
              </span>
              <span className="text-[10px] font-mono text-slate-500">Unfiltered Model Output</span>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-slate-950/90 border border-slate-800 text-xs sm:text-sm text-slate-200 font-mono whitespace-pre-wrap leading-relaxed max-h-80 overflow-y-auto shadow-inner">
              {rawText || (
                <span className="text-slate-500 italic">
                  {isEt ? 'Selle mudeli jaoks pole salvestatud vastust.' : 'No response text captured for this query.'}
                </span>
              )}
            </div>
          </div>

          {/* Evidence Highlight Quote */}
          {currentData && 'evidence' in currentData && currentData.evidence && (
            <div className="p-4 rounded-2xl bg-slate-950/60 border border-amber-400/20 text-xs space-y-1.5">
              <div className="font-bold text-amber-400 uppercase tracking-wider text-[10px] flex items-center gap-1.5">
                <Quote className="w-3.5 h-3.5" />
                <span>{isEt ? 'Tuvastatud tõend / tsitaat' : 'Extracted Mention Evidence'}</span>
              </div>
              <p className="text-slate-300 italic leading-relaxed">&ldquo;{currentData.evidence}&rdquo;</p>
            </div>
          )}

          {/* Cited Web Sources */}
          {currentData?.sources && currentData.sources.length > 0 && (
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 px-1 flex items-center gap-1.5">
                <Link2 className="w-3.5 h-3.5 text-slate-400" />
                <span>{isEt ? 'Tsiteeritud veebiallikad' : 'Cited Web Sources'} ({currentData.sources.length})</span>
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {currentData.sources.map((s, idx) => (
                  <a
                    key={idx}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 hover:border-slate-700 text-xs flex items-center justify-between gap-2 transition-colors group"
                  >
                    <div className="min-w-0">
                      <div className="font-mono text-white text-xs truncate group-hover:text-amber-400 transition-colors">
                        {s.domain || 'web'}
                      </div>
                      <div className="text-[11px] text-slate-500 truncate">{s.title || s.url}</div>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-600 group-hover:text-amber-400 shrink-0" />
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
