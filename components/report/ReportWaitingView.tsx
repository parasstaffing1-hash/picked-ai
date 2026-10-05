'use client';

import React, { useEffect, useState } from 'react';
import { Loader2, Sparkles, CheckCircle2 } from 'lucide-react';
import { FullReportPage } from './FullReportPage';

interface ReportWaitingViewProps {
  scanId: string;
  initialProgress?: number;
  status?: string;
}

export function ReportWaitingView({
  scanId,
  initialProgress = 10,
  status = 'queued',
}: ReportWaitingViewProps) {
  const [progress, setProgress] = useState(initialProgress);
  const [currentMessage, setCurrentMessage] = useState('Initializing AI visibility audit...');
  const [completedReport, setCompletedReport] = useState<any | null>(null);
  const [isFailed, setIsFailed] = useState(false);

  useEffect(() => {
    let isSubscribed = true;

    const interval = setInterval(async () => {
      try {
        const res = await fetch(`/api/scans/${scanId}`);
        if (!res.ok) return;

        const data = await res.json();
        if (!isSubscribed) return;

        if (data.scan) {
          setProgress(data.scan.progress || 10);
          if (data.scan.checks?.message) {
            setCurrentMessage(data.scan.checks.message);
          } else if (data.scan.current_message) {
            setCurrentMessage(data.scan.current_message);
          }

          if (data.scan.status === 'completed' && data.report) {
            setCompletedReport(data.report);
            clearInterval(interval);
          } else if (data.scan.status === 'completed') {
            // Fetch report directly
            const repRes = await fetch(`/api/report/${scanId}`);
            if (repRes.ok) {
              const repJson = await repRes.json();
              if (repJson.report) {
                setCompletedReport(repJson.report);
                clearInterval(interval);
              }
            }
          } else if (data.scan.status === 'failed') {
            setIsFailed(true);
            clearInterval(interval);
          }
        }
      } catch (err) {
        console.error('[ReportWaitingView] Polling error:', err);
      }
    }, 1500);

    return () => {
      isSubscribed = false;
      clearInterval(interval);
    };
  }, [scanId]);

  if (completedReport) {
    return <FullReportPage report={completedReport} />;
  }

  return (
    <div className="min-h-screen bg-[#07090E] text-white flex flex-col items-center justify-center px-6">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="relative mx-auto w-16 h-16 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border border-sky-500/20 animate-ping" />
          <div className="w-14 h-14 rounded-full bg-sky-500/10 border border-sky-500/30 flex items-center justify-center">
            {isFailed ? (
              <span className="text-rose-400 text-xl font-bold">✕</span>
            ) : (
              <Loader2 className="w-6 h-6 text-sky-400 animate-spin" />
            )}
          </div>
        </div>

        <div className="space-y-2">
          <h2 className="text-xl font-semibold tracking-tight">
            {isFailed ? 'Audit Encountered an Issue' : 'Analyzing AI Visibility'}
          </h2>
          <p className="text-sm text-zinc-400">
            {isFailed
              ? 'We could not complete this scan. Please try scanning again from the homepage.'
              : currentMessage}
          </p>
        </div>

        {!isFailed && (
          <div className="space-y-2">
            <div className="w-full bg-zinc-800/80 rounded-full h-2 overflow-hidden">
              <div
                className="bg-gradient-to-r from-sky-500 to-indigo-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${Math.max(8, progress)}%` }}
              />
            </div>
            <div className="flex justify-between text-[11px] font-mono text-zinc-500">
              <span>Checking ChatGPT, Gemini & AI Overviews</span>
              <span>{progress}%</span>
            </div>
          </div>
        )}

        <div className="pt-4 border-t border-zinc-800/60">
          <a
            href="/"
            className="text-xs text-zinc-400 hover:text-white transition-colors underline underline-offset-4"
          >
            ← Return to homepage
          </a>
        </div>
      </div>
    </div>
  );
}
