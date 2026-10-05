'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ConsoleShell } from '@/components/console/console-shell';
import { RealProgressView, RealScanStatusData } from '@/components/scanner/RealProgressView';
import { FullReportPage, FullReportData } from '@/components/report/FullReportPage';

export default function ConsolePage() {
  const router = useRouter();
  const [activeScan, setActiveScan] = useState<RealScanStatusData | null>(null);
  const [completedReport, setCompletedReport] = useState<FullReportData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleStartRealScan = async (url: string, email: string) => {
    setIsLoading(true);
    setErrorMessage(null);
    setCompletedReport(null);

    try {
      const res = await fetch('/api/scans', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, email, language: 'en' }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to trigger scan.');
      }

      setActiveScan({
        id: data.scanId,
        url,
        status: 'queued',
        progress: 5,
        checks: {
          total: 30,
          completed: 0,
          message: 'Initializing multi-engine telemetry...',
        },
      });

      // Poll until completion
      const interval = setInterval(async () => {
        try {
          const checkRes = await fetch(`/api/scans/${data.scanId}`);
          if (!checkRes.ok) return;
          const checkData = await checkRes.json();
          if (checkData.scan) {
            setActiveScan(checkData.scan);
            if (checkData.scan.status === 'completed' && checkData.report) {
              setCompletedReport(checkData.report);
              setIsLoading(false);
              clearInterval(interval);
            } else if (checkData.scan.status === 'failed') {
              setIsLoading(false);
              clearInterval(interval);
            }
          }
        } catch (e) {
          console.error(e);
        }
      }, 1500);
    } catch (err: any) {
      setErrorMessage(err.message || 'Error occurred starting audit.');
      setIsLoading(false);
      throw err;
    }
  };

  if (activeScan && activeScan.status !== 'completed') {
    return (
      <div className="min-h-screen bg-[#050505] py-16 px-4 flex flex-col justify-center items-center">
        <RealProgressView
          scan={activeScan}
          language="en"
          onRetry={() => {
            setActiveScan(null);
            setIsLoading(false);
          }}
        />
      </div>
    );
  }

  if (completedReport) {
    return (
      <div className="min-h-screen bg-[#050505] py-10">
        <div className="max-w-7xl mx-auto px-4 mb-6">
          <button
            onClick={() => setCompletedReport(null)}
            className="text-xs font-mono text-[rgba(232,230,213,0.60)] hover:text-white"
          >
            ← Return to Console Overview
          </button>
        </div>
        <FullReportPage report={completedReport} />
      </div>
    );
  }

  return (
    <ConsoleShell
      onStartRealScan={handleStartRealScan}
      onSwitchToPublic={() => router.push('/')}
    />
  );
}
