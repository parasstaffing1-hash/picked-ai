import React from 'react';
import { notFound } from 'next/navigation';
import { getReportByScanId, getScanRecord } from '@/lib/database/repository';
import { FullReportPage } from '@/components/report/FullReportPage';
import { ReportWaitingView } from '@/components/report/ReportWaitingView';

export default async function ReportPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  let reportData = (await getReportByScanId(id))?.report_json || null;

  // If in an isolated SSR process, fetch from internal API endpoint
  if (!reportData) {
    try {
      const appUrl = process.env.APP_URL || 'http://localhost:3000';
      const res = await fetch(`${appUrl}/api/scans/${id}`, { cache: 'no-store' });
      if (res.ok) {
        const json = await res.json();
        if (json.report) {
          reportData = json.report;
        }
      }
    } catch {}
  }

  // If report exists, render full report immediately
  if (reportData) {
    return <FullReportPage report={reportData} />;
  }

  // If report doesn't exist yet, check if scan is still active/queued
  const scan = await getScanRecord(id);
  if (scan && scan.status !== 'failed') {
    return (
      <ReportWaitingView
        scanId={id}
        initialProgress={scan.progress}
        status={scan.status}
      />
    );
  }

  return notFound();
}
