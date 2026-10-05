'use client';

import React from 'react';
import { SupportedLanguage } from '@/types/scanner';
import { DBScanStatus } from '@/lib/database/repository';
import { Loader2, CheckCircle2, Circle, AlertCircle, RefreshCw, Sparkles, Bot, Search } from 'lucide-react';

export interface RealScanStatusData {
  id: string;
  url: string;
  business_name?: string;
  industry?: string;
  city?: string;
  status: DBScanStatus;
  progress: number;
  error?: string | null;
  checks: {
    total: number;
    completed: number;
    message: string;
    engineStatus?: {
      openai: 'pending' | 'running' | 'completed' | 'failed';
      gemini: 'pending' | 'running' | 'completed' | 'failed';
      google_ai_overview: 'pending' | 'running' | 'completed' | 'failed';
    };
  };
}

interface RealProgressViewProps {
  scan: RealScanStatusData;
  language: SupportedLanguage;
  onRetry: () => void;
}

export function RealProgressView({ scan, language, onRetry }: RealProgressViewProps) {
  const isEt = language === 'et';

  // Real database steps
  // 1. Website analyzed (crawling)
  // 2. Business identified (analyzing)
  // 3. Questions generated (generating_questions)
  // 4. Checking AI visibility (checking_ai)
  // 5. Building report (building_report)
  // 6. Sending email & completed (completed)
  const stepsOrder: DBScanStatus[] = [
    'crawling',
    'analyzing',
    'generating_questions',
    'checking_ai',
    'building_report',
    'completed',
  ];

  const currentIdx = stepsOrder.indexOf(scan.status);

  const getStepState = (targetStep: DBScanStatus) => {
    if (scan.status === 'completed') return 'done';
    if (scan.status === 'failed') {
      const stepIdx = stepsOrder.indexOf(targetStep);
      return stepIdx <= currentIdx ? 'failed' : 'pending';
    }

    const stepIdx = stepsOrder.indexOf(targetStep);
    if (currentIdx > stepIdx) return 'done';
    if (currentIdx === stepIdx) return 'active';
    return 'pending';
  };

  const stepsList = [
    {
      step: 'crawling' as DBScanStatus,
      title: isEt ? 'Veebisait analüüsitud' : 'Website analyzed',
      subtitle: isEt ? 'Crawl4AI lehtede kraapimine (/, /about, /services)' : 'Crawl4AI multi-page extraction (/, /about, /services)',
    },
    {
      step: 'analyzing' as DBScanStatus,
      title: isEt ? 'Ettevõte tuvastatud' : 'Business identified',
      subtitle: scan.business_name
        ? `${scan.business_name} • ${scan.city || ''} (${scan.industry || ''})`
        : isEt ? 'Tegevusala, asukoha ja teenuste eraldamine' : 'Industry, location & core services profiled',
    },
    {
      step: 'generating_questions' as DBScanStatus,
      title: isEt ? 'Kliendipäringud genereeritud' : 'Questions generated',
      subtitle: isEt ? '10 realistlikku ostukavatsusega päringut' : '10 high-value customer buyer prompts',
    },
    {
      step: 'checking_ai' as DBScanStatus,
      title: isEt ? 'AI nähtavuse kontroll' : 'Checking AI visibility',
      subtitle: `${scan.checks.completed} / ${scan.checks.total} ${isEt ? 'kontrolli teostatud' : 'checks completed across 3 engines'}`,
      isCheckingStep: true,
    },
    {
      step: 'building_report' as DBScanStatus,
      title: isEt ? 'Raporti koostamine' : 'Building report',
      subtitle: isEt ? 'Nähtavusskoor, konkurendid ja viited' : 'Visibility score, competitor SOV & citations',
    },
    {
      step: 'completed' as DBScanStatus,
      title: isEt ? 'Raporti e-kirja saatmine' : 'Sending email',
      subtitle: isEt ? 'Täismahus raport saadetud e-postile' : 'Executive report delivered to user email',
    },
  ];

  return (
    <div className="max-w-2xl mx-auto px-4 py-12 relative">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[350px] bg-amber-500/10 blur-[130px] pointer-events-none rounded-full" />

      <div className="glass-panel-elevated rounded-3xl p-6 sm:p-9 relative overflow-hidden border border-slate-800/80 shadow-2xl backdrop-blur-2xl">
        <div className="text-center space-y-3 mb-8">
          <div className="w-14 h-14 rounded-2xl bg-amber-400/10 border border-amber-400/30 text-amber-400 flex items-center justify-center mx-auto shadow-inner shadow-amber-400/10 relative">
            {scan.status === 'failed' ? (
              <AlertCircle className="w-7 h-7 text-rose-400" />
            ) : (
              <>
                <Loader2 className="w-7 h-7 animate-spin text-amber-400" />
                <div className="absolute inset-0 rounded-2xl border border-amber-400/20 animate-ping opacity-40" />
              </>
            )}
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            {scan.status === 'failed'
              ? isEt ? 'Skannimisel tekkis tõrge' : 'Scan Encountered an Issue'
              : isEt ? 'Tehisintellekti nähtavuse audit käib' : 'AI Visibility Scan in Progress'}
          </h2>

          <p className="text-xs sm:text-sm text-slate-400 font-medium max-w-md mx-auto">
            {scan.checks.message || (isEt ? 'Töödeldakse...' : 'Processing multi-engine audit...')}
          </p>
        </div>

        {/* Real Progress Bar */}
        <div className="space-y-2 mb-8 bg-slate-950/60 p-4 rounded-2xl border border-slate-800/80">
          <div className="flex justify-between items-center text-xs font-bold text-slate-300">
            <span className="truncate pr-4 text-slate-400 font-mono text-[11px]">{scan.url}</span>
            <span className="text-amber-400 font-mono font-black text-sm">{scan.progress}%</span>
          </div>
          <div className="w-full h-3 bg-slate-950 rounded-full overflow-hidden p-0.5 border border-slate-800">
            <div
              className={`h-full rounded-full transition-all duration-500 ease-out shadow-xs ${
                scan.status === 'failed'
                  ? 'bg-rose-500'
                  : 'bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 shadow-[0_0_12px_rgba(245,158,11,0.5)]'
              }`}
              style={{ width: `${Math.max(5, scan.progress)}%` }}
            />
          </div>
        </div>

        {/* Real Step Statuses */}
        <div className="space-y-2.5 border-t border-slate-800/80 pt-6">
          {stepsList.map((st, i) => {
            const state = getStepState(st.step);

            return (
              <div key={i} className="space-y-1.5">
                <div
                  className={`p-3.5 rounded-xl border flex items-center justify-between text-xs sm:text-sm transition-all ${
                    state === 'active'
                      ? 'bg-amber-400/10 border-amber-400/40 text-white font-semibold shadow-xs shadow-amber-400/5'
                      : state === 'done'
                      ? 'bg-slate-950/40 border-slate-800/70 text-slate-300 font-medium'
                      : 'bg-slate-950/20 border-transparent text-slate-600'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-lg flex items-center justify-center shrink-0">
                      {state === 'done' && (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                      )}
                      {state === 'active' && (
                        <div className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
                      )}
                      {state === 'pending' && (
                        <Circle className="w-4 h-4 text-slate-700" />
                      )}
                      {state === 'failed' && (
                        <AlertCircle className="w-4 h-4 text-rose-500" />
                      )}
                    </div>

                    <div>
                      <div className="font-bold text-white flex items-center gap-2">
                        <span>{st.title}</span>
                        {state === 'active' && st.isCheckingStep && (
                          <span className="text-[11px] font-mono text-amber-400 bg-amber-400/15 px-2 py-0.5 rounded-md border border-amber-400/30">
                            {scan.checks.completed} / {scan.checks.total}
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-slate-400 mt-0.5">{st.subtitle}</div>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    {state === 'active' && (
                      <span className="text-[11px] font-bold text-amber-400 animate-pulse bg-amber-400/10 px-2 py-0.5 rounded-md border border-amber-400/20">
                        In progress...
                      </span>
                    )}
                    {state === 'done' && (
                      <span className="text-[11px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
                        ✓ Done
                      </span>
                    )}
                    {state === 'pending' && (
                      <span className="text-[11px] font-bold text-slate-700">
                        Pending
                      </span>
                    )}
                  </div>
                </div>

                {st.step === 'checking_ai' && (state === 'active' || state === 'done') && (
                  <div className="ml-5 pl-4 pr-3 py-2.5 space-y-2 border-l-2 border-slate-800 bg-slate-950/60 rounded-r-xl border border-slate-800/60">
                    <div className="flex items-center justify-between text-xs">
                      <span className="flex items-center gap-2 text-slate-300 font-medium">
                        <span
                          className={`w-2 h-2 rounded-full ${
                            scan.checks.engineStatus?.openai === 'failed'
                              ? 'bg-rose-400'
                              : state === 'done' || scan.checks.engineStatus?.openai === 'completed'
                              ? 'bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.6)]'
                              : 'bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.6)]'
                          }`}
                        />
                        <Bot className="w-3.5 h-3.5 text-emerald-400" />
                        Checking ChatGPT (OpenAI GPT-4o)
                      </span>
                      <span className="text-[11px] font-mono text-slate-400">
                        {state === 'done' || scan.checks.engineStatus?.openai === 'completed'
                          ? '✓ Checked'
                          : scan.checks.engineStatus?.openai === 'failed'
                          ? 'Unavailable'
                          : '● Checking'}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-xs">
                      <span className="flex items-center gap-2 text-slate-300 font-medium">
                        <span
                          className={`w-2 h-2 rounded-full ${
                            scan.checks.engineStatus?.gemini === 'failed'
                              ? 'bg-rose-400'
                              : state === 'done' || scan.checks.engineStatus?.gemini === 'completed'
                              ? 'bg-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.6)]'
                              : 'bg-sky-400 animate-pulse shadow-[0_0_8px_rgba(56,189,248,0.6)]'
                          }`}
                        />
                        <Bot className="w-3.5 h-3.5 text-sky-400" />
                        Checking Google Gemini 2.5
                      </span>
                      <span className="text-[11px] font-mono text-slate-400">
                        {state === 'done' || scan.checks.engineStatus?.gemini === 'completed'
                          ? '✓ Checked'
                          : scan.checks.engineStatus?.gemini === 'failed'
                          ? 'Unavailable'
                          : '● Checking'}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-xs">
                      <span className="flex items-center gap-2 text-slate-300 font-medium">
                        <span
                          className={`w-2 h-2 rounded-full ${
                            scan.checks.engineStatus?.google_ai_overview === 'failed'
                              ? 'bg-rose-400'
                              : state === 'done' || scan.checks.engineStatus?.google_ai_overview === 'completed'
                              ? 'bg-amber-400 shadow-[0_0_8px_rgba(245,158,11,0.6)]'
                              : 'bg-amber-400 animate-pulse shadow-[0_0_8px_rgba(245,158,11,0.6)]'
                          }`}
                        />
                        <Search className="w-3.5 h-3.5 text-amber-400" />
                        Checking Google AI Overviews Grounding
                      </span>
                      <span className="text-[11px] font-mono text-slate-400">
                        {state === 'done' || scan.checks.engineStatus?.google_ai_overview === 'completed'
                          ? '✓ Checked'
                          : scan.checks.engineStatus?.google_ai_overview === 'failed'
                          ? 'Unavailable'
                          : '● Checking'}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Failed Error Message & Retry */}
        {scan.status === 'failed' && (
          <div className="mt-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs space-y-3">
            <p className="font-medium">
              {isEt
                ? 'Me ei saanud seda skannimist lõpule viia. Palun proovige uuesti.'
                : "We couldn't complete this scan. Please try again."}
            </p>
            <button
              onClick={onRetry}
              className="px-4 py-2 bg-rose-500 hover:bg-rose-600 text-white rounded-lg font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>{isEt ? 'Proovi uuesti' : 'Try Again'}</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
