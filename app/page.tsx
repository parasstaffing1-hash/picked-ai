'use client';

import React, { useState, useEffect } from 'react';
import { SupportedLanguage } from '@/types/scanner';
import { SiteNavigation } from '@/components/ui/site-navigation';
import { PrismaHero } from '@/components/ui/prisma-hero';
import { HeroTransition } from '@/components/ui/workspace/hero-transition';
import { AiVisibilityOverview } from '@/components/ui/workspace/ai-visibility-overview';
import { BuyerPromptsTable } from '@/components/ui/workspace/buyer-prompts-table';
import { AiAnswerInspector } from '@/components/ui/workspace/ai-answer-inspector';
import { CitationIntelligence } from '@/components/ui/workspace/citation-intelligence';
import { CompetitiveVisibility } from '@/components/ui/workspace/competitive-visibility';
import { Opportunities } from '@/components/ui/workspace/opportunities';
import { VisibilityMonitor } from '@/components/ui/workspace/visibility-monitor';
import { SiteFooter } from '@/components/ui/site-footer';
import { QuickScanDrawer } from '@/components/ui/quick-scan-drawer';
import { RealProgressView, RealScanStatusData } from '@/components/scanner/RealProgressView';
import { FullReportPage, FullReportData } from '@/components/report/FullReportPage';
import { LeadsModal } from '@/components/scanner/LeadsModal';
import { AlertCircle, X, ArrowLeft } from 'lucide-react';

export default function HomePage() {
  const [language, setLanguage] = useState<SupportedLanguage>('en');
  const [activeScan, setActiveScan] = useState<RealScanStatusData | null>(null);
  const [completedReport, setCompletedReport] = useState<FullReportData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLeadsModalOpen, setIsLeadsModalOpen] = useState(false);
  const [isScanDrawerOpen, setIsScanDrawerOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Poll for scan status when a scan is active
  useEffect(() => {
    if (!activeScan || activeScan.status === 'completed' || activeScan.status === 'failed') {
      return;
    }

    const interval = setInterval(async () => {
      try {
        const res = await fetch(`/api/scans/${activeScan.id}`);
        if (!res.ok) return;

        const data = await res.json();
        if (data.scan) {
          setActiveScan(data.scan);

          if (data.scan.status === 'completed' && data.report) {
            setCompletedReport(data.report);
            setIsLoading(false);
          } else if (data.scan.status === 'failed') {
            setIsLoading(false);
          }
        }
      } catch (err) {
        console.error('Polling error:', err);
      }
    }, 1500);

    return () => clearInterval(interval);
  }, [activeScan]);

  const handleStartScan = async (url: string, email: string) => {
    setIsLoading(true);
    setErrorMessage(null);
    setCompletedReport(null);

    try {
      localStorage.setItem('picked_ai_last_email', email);

      const res = await fetch('/api/scans', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, email, language }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to initiate scan.');
      }

      setActiveScan({
        id: data.scanId,
        url,
        status: 'queued',
        progress: 5,
        checks: {
          total: 30,
          completed: 0,
          message: language === 'et' ? 'Töö lisati järjekorda...' : 'Scan queued in background runner...',
        },
      });
      setIsScanDrawerOpen(false);
    } catch (err: any) {
      setErrorMessage(err.message || 'An error occurred while starting the scan.');
      setIsLoading(false);
      throw err;
    }
  };

  const handleReset = () => {
    setActiveScan(null);
    setCompletedReport(null);
    setIsLoading(false);
    setErrorMessage(null);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#E8E6D5] selection:bg-[#E8E6D5] selection:text-[#050505] font-sans antialiased overflow-x-hidden">
      {/* Global Error Banner */}
      {errorMessage && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 max-w-xl w-[92%]">
          <div className="p-3.5 bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs rounded-xl flex items-center justify-between gap-3 backdrop-blur-xl">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
              <span>{errorMessage}</span>
            </div>
            <button
              type="button"
              onClick={() => setErrorMessage(null)}
              className="text-rose-400 hover:text-rose-200 p-0.5"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Render Active Scan Progress View */}
      {activeScan && activeScan.status !== 'completed' ? (
        <div className="min-h-screen py-16 px-4 sm:px-6 flex flex-col justify-center items-center">
          <div className="w-full max-w-4xl mb-6 flex justify-between items-center">
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-2 text-xs font-mono text-[rgba(232,230,213,0.60)] hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Studio</span>
            </button>
          </div>
          <RealProgressView scan={activeScan} language={language} onRetry={handleReset} />
        </div>
      ) : completedReport ? (
        /* Render Full Report View */
        <div className="min-h-screen py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-2 text-xs font-mono text-[rgba(232,230,213,0.60)] hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Return to Public Site</span>
            </button>
          </div>
          <FullReportPage report={completedReport} />
        </div>
      ) : (
        /* ══════════════════════════════════════════════════════
           PICKED AI — Cinematic Hero + Notion/Linear Workspace
           ══════════════════════════════════════════════════════ */
        <>
          {/* Floating Adaptive Navigation */}
          <SiteNavigation
            language={language}
            onLanguageChange={setLanguage}
            onOpenScan={() => setIsScanDrawerOpen(true)}
            onOpenLeads={() => setIsLeadsModalOpen(true)}
          />

          {/* ── HERO (Canonical Picked Hero — Preserved Exactly) ── */}
          <PrismaHero
            language={language}
            onLanguageChange={setLanguage}
            onOpenScan={() => setIsScanDrawerOpen(true)}
            onOpenLeads={() => setIsLeadsModalOpen(true)}
            onSubmit={handleStartScan}
            isLoading={isLoading}
          />

          {/* ── TRANSITION: Dark Hero → Light Workspace ── */}
          <HeroTransition />

          {/* ══════════════════════════════════════════════
              WORKSPACE SECTIONS (Notion / Linear Aesthetic)
              Light background · Editorial typography · Clean data
              ══════════════════════════════════════════════ */}
          <div className="workspace-surface bg-[#FAFAF8] text-[#1A1A1A] selection:bg-[#1A1A1A] selection:text-white">

            {/* 01 — AI VISIBILITY OVERVIEW */}
            <section id="overview">
              <AiVisibilityOverview onOpenScan={() => setIsScanDrawerOpen(true)} />
            </section>

            {/* 02 — BUYER PROMPTS TABLE */}
            <section id="prompts">
              <BuyerPromptsTable />
            </section>

            {/* 03 — AI ANSWER INSPECTOR */}
            <section id="inspector">
              <AiAnswerInspector />
            </section>

            {/* 04 — CITATION INTELLIGENCE */}
            <section id="citations">
              <CitationIntelligence />
            </section>

            {/* 05 — COMPETITIVE VISIBILITY */}
            <section id="competitors">
              <CompetitiveVisibility />
            </section>

            {/* 06 — OPPORTUNITIES */}
            <section id="opportunities">
              <Opportunities />
            </section>

            {/* 07 — VISIBILITY MONITOR */}
            <section id="monitor">
              <VisibilityMonitor />
            </section>
          </div>

          {/* ── FOOTER ── */}
          <SiteFooter
            language={language}
            onOpenScan={() => setIsScanDrawerOpen(true)}
          />
        </>
      )}

      {/* Interactive Quick Scan Drawer / Modal */}
      <QuickScanDrawer
        isOpen={isScanDrawerOpen}
        onClose={() => setIsScanDrawerOpen(false)}
        onSubmit={handleStartScan}
        isLoading={isLoading}
        language={language}
      />

      {/* Captured Leads Vault Modal */}
      <LeadsModal
        isOpen={isLeadsModalOpen}
        onClose={() => setIsLeadsModalOpen(false)}
        language={language}
      />
    </div>
  );
}
