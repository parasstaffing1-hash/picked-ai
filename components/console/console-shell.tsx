'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  Search,
  Share2,
  Users2,
  Lightbulb,
  Cpu,
  History,
  Settings,
  CreditCard,
  Building,
  ArrowUpRight,
  Sparkles,
  Menu,
  X,
  ExternalLink,
  Zap,
} from 'lucide-react';
import { ConsoleDashboard } from './console-dashboard';
import { ConsoleQueries } from './console-queries';
import { ConsoleCitations } from './console-citations';
import { ConsoleCompetitors } from './console-competitors';
import { ConsoleRecommendations } from './console-recommendations';
import { ConsoleEngines } from './console-engines';
import { ConsoleAuditWizard } from './console-audit-wizard';

interface ConsoleShellProps {
  onStartRealScan: (url: string, email: string) => Promise<void>;
  onSwitchToPublic: () => void;
}

type TabKey =
  | 'overview'
  | 'audits'
  | 'queries'
  | 'citations'
  | 'competitors'
  | 'recommendations'
  | 'engines'
  | 'history'
  | 'settings';

export const ConsoleShell: React.FC<ConsoleShellProps> = ({
  onStartRealScan,
  onSwitchToPublic,
}) => {
  const [activeTab, setActiveTab] = useState<TabKey>('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navItems: { key: TabKey; label: string; icon: any }[] = [
    { key: 'overview', label: 'Overview', icon: LayoutDashboard },
    { key: 'audits', label: 'Audits', icon: Zap },
    { key: 'queries', label: 'Queries', icon: Search },
    { key: 'citations', label: 'Citations', icon: Share2 },
    { key: 'competitors', label: 'Competitors', icon: Users2 },
    { key: 'recommendations', label: 'Recommendations', icon: Lightbulb },
    { key: 'engines', label: 'Engines', icon: Cpu },
    { key: 'history', label: 'History', icon: History },
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-[#E8E6D5] flex antialiased font-sans selection:bg-[#E8E6D5] selection:text-[#050505] overflow-x-hidden">
      {/* Sidebar: Desktop */}
      <aside className="hidden lg:flex w-64 flex-col justify-between border-r border-[rgba(232,230,213,0.08)] bg-[#050505] p-6 shrink-0 sticky top-0 h-screen">
        {/* Top: Brand */}
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onSwitchToPublic();
              }}
              className="flex items-center gap-2 group"
            >
              <span className="w-2 h-2 rounded-full bg-[#E8B400] group-hover:scale-125 transition-transform" />
              <span className="text-base font-semibold tracking-tight text-white">
                Picked<span className="text-[#E8B400] font-serif">*</span>
              </span>
              <span className="text-[10px] font-mono uppercase tracking-widest text-[rgba(232,230,213,0.40)] border-l border-white/10 pl-2">
                Console
              </span>
            </a>
          </div>

          {/* Navigation Links with Thin Separators */}
          <nav className="space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[rgba(232,230,213,0.35)] px-3 mb-2 block">
              Intelligence
            </span>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.key;
              return (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => setActiveTab(item.key)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-mono transition-colors text-left cursor-pointer ${
                    isActive
                      ? 'bg-white/[0.06] text-white font-medium border border-[rgba(232,230,213,0.12)]'
                      : 'text-[rgba(232,230,213,0.60)] hover:text-white hover:bg-white/[0.02]'
                  }`}
                >
                  <Icon
                    className={`w-4 h-4 ${
                      isActive ? 'text-[#E8B400]' : 'text-[rgba(232,230,213,0.40)]'
                    }`}
                  />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Sidebar: Workspace & Settings */}
        <div className="pt-6 border-t border-[rgba(232,230,213,0.08)] space-y-3">
          <div className="p-3 rounded-xl bg-white/[0.02] border border-[rgba(232,230,213,0.06)] flex items-center justify-between text-xs font-mono">
            <div>
              <span className="text-[9px] uppercase tracking-wider text-[rgba(232,230,213,0.40)] block">
                Workspace
              </span>
              <span className="text-white font-medium">Veriff Enterprise</span>
            </div>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          </div>

          <div className="flex items-center justify-between text-xs font-mono text-[rgba(232,230,213,0.50)] pt-1">
            <button
              type="button"
              onClick={onSwitchToPublic}
              className="hover:text-white flex items-center gap-1.5"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Public Site</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('settings')}
              className="hover:text-white"
            >
              Settings
            </button>
          </div>
        </div>
      </aside>

      {/* Main Area: Top Bar + Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <header className="h-16 border-b border-[rgba(232,230,213,0.08)] bg-[#050505]/80 backdrop-blur-xl px-4 sm:px-8 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 rounded-lg bg-white/[0.04] text-[#E8E6D5]"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 text-xs font-mono">
              <span className="text-[rgba(232,230,213,0.40)]">Active Account:</span>
              <span className="text-white font-medium">Veriff Global (veriff.com)</span>
              <span className="hidden sm:inline-block px-2 py-0.5 rounded-full bg-[#E8B400]/10 border border-[#E8B400]/30 text-[#E8B400] text-[10px]">
                3 Engines Grounded
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setActiveTab('audits')}
              className="inline-flex items-center gap-2 rounded-full bg-[#E8E6D5] hover:bg-white text-[#050505] px-3.5 sm:px-4 py-1.5 text-xs font-mono font-semibold transition-all hover:scale-105 cursor-pointer"
            >
              <Zap className="w-3.5 h-3.5" />
              <span>New Audit</span>
            </button>

            <button
              type="button"
              onClick={onSwitchToPublic}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[rgba(232,230,213,0.12)] text-xs font-mono text-[rgba(232,230,213,0.60)] hover:text-white"
            >
              <span>Back to Film Site</span>
              <ArrowUpRight className="w-3 h-3" />
            </button>
          </div>
        </header>

        {/* Content Container */}
        <main className="flex-1 p-4 sm:p-8 lg:p-12 max-w-7xl w-full mx-auto">
          {activeTab === 'overview' && (
            <ConsoleDashboard
              onOpenAuditWizard={() => setActiveTab('audits')}
              onNavigateTab={(t: any) => setActiveTab(t)}
            />
          )}

          {activeTab === 'audits' && (
            <ConsoleAuditWizard
              onStartRealScan={onStartRealScan}
              onClose={() => setActiveTab('overview')}
            />
          )}

          {activeTab === 'queries' && <ConsoleQueries />}

          {activeTab === 'citations' && <ConsoleCitations />}

          {activeTab === 'competitors' && <ConsoleCompetitors />}

          {activeTab === 'recommendations' && <ConsoleRecommendations />}

          {activeTab === 'engines' && <ConsoleEngines />}

          {activeTab === 'history' && (
            <div className="p-8 rounded-2xl bg-[#0A0A09] border border-[rgba(232,230,213,0.10)] space-y-4">
              <h3 className="text-xl font-normal text-white">Audit Run Archive</h3>
              <p className="text-xs text-[rgba(232,230,213,0.60)] font-mono">
                Showing 12 persisted historical multi-model audits for veriff.com stored in Aiven PostgreSQL.
              </p>
              <div className="pt-4 divide-y divide-[rgba(232,230,213,0.06)] font-mono text-xs">
                {[
                  { id: 'scan_1791197635571_g1663p', date: 'Today, 10:54', score: 84, status: 'Completed' },
                  { id: 'scan_1791054231902_v9812x', date: 'Yesterday, 14:20', score: 81, status: 'Completed' },
                  { id: 'scan_1790921443198_a4501m', date: '3 days ago', score: 79, status: 'Completed' },
                ].map((run) => (
                  <div key={run.id} className="py-4 flex items-center justify-between">
                    <div>
                      <span className="text-white font-medium">{run.id}</span>
                      <span className="text-[rgba(232,230,213,0.40)] ml-3">{run.date}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-[#E8B400] font-semibold">{run.score}/100</span>
                      <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-[10px]">
                        {run.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="p-8 rounded-2xl bg-[#0A0A09] border border-[rgba(232,230,213,0.10)] space-y-6 max-w-2xl font-mono text-xs">
              <h3 className="text-xl font-normal font-sans text-white">Console Settings</h3>
              <div className="space-y-4 pt-2">
                <div>
                  <label className="text-[rgba(232,230,213,0.50)] uppercase block mb-1">
                    API Telemetry Webhook
                  </label>
                  <input
                    type="text"
                    readOnly
                    value="https://api.pickedai.com/v1/telemetry/wh_98a72b0c"
                    className="w-full rounded-xl bg-white/[0.03] border border-[rgba(232,230,213,0.10)] p-3 text-white"
                  />
                </div>
                <div>
                  <label className="text-[rgba(232,230,213,0.50)] uppercase block mb-1">
                    Executive Notification Recipient
                  </label>
                  <input
                    type="text"
                    readOnly
                    value="aivisibilitymvp@gmail.com"
                    className="w-full rounded-xl bg-white/[0.03] border border-[rgba(232,230,213,0.10)] p-3 text-white"
                  />
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
