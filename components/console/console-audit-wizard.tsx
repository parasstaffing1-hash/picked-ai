'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Globe,
  Building2,
  MapPin,
  Bot,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';

interface AuditWizardProps {
  onStartRealScan: (url: string, email: string) => Promise<void>;
  onClose?: () => void;
}

export const ConsoleAuditWizard: React.FC<AuditWizardProps> = ({
  onStartRealScan,
  onClose,
}) => {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1);

  // Step 1: Business Form
  const [url, setUrl] = useState('https://veriff.com');
  const [email, setEmail] = useState('aivisibilitymvp@gmail.com');
  const [businessName, setBusinessName] = useState('Veriff');
  const [industry, setIndustry] = useState('Identity Verification & Anti-Fraud SDK');
  const [location, setLocation] = useState('Tallinn, Estonia • Global Online');

  // Step 2: Target Queries
  const [queries, setQueries] = useState<string[]>([
    'best automated identity verification SDK for fintech',
    'fastest biometric KYC compliance provider in Europe',
    'most reliable identity fraud prevention partner',
    'top enterprise KYC alternatives to Jumio and Onfido',
  ]);
  const [newQuery, setNewQuery] = useState('');

  // Step 3: Engines Selection
  const [selectedEngines, setSelectedEngines] = useState<{
    chatgpt: boolean;
    gemini: boolean;
    google_aio: boolean;
  }>({
    chatgpt: true,
    gemini: true,
    google_aio: true,
  });

  // Step 4 / Submission State
  const [isLaunching, setIsLaunching] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleAddQuery = () => {
    if (newQuery.trim()) {
      setQueries([...queries, newQuery.trim()]);
      setNewQuery('');
    }
  };

  const handleLaunchScan = async () => {
    setIsLaunching(true);
    setErrorMsg(null);
    try {
      await onStartRealScan(url, email);
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to start audit job.');
      setIsLaunching(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 sm:p-10 rounded-3xl bg-[#0A0A09] border border-[rgba(232,230,213,0.14)] shadow-2xl relative overflow-hidden">
      <div className="noise-overlay pointer-events-none absolute inset-0 opacity-25" />

      {/* Wizard Progress Bar Header */}
      <div className="pb-8 border-b border-[rgba(232,230,213,0.08)]">
        <div className="flex items-center justify-between text-xs font-mono mb-4">
          <span className="text-[#E8B400] uppercase tracking-widest">
            INTELLIGENCE AUDIT CONFIGURATION
          </span>
          <span className="text-[rgba(232,230,213,0.40)]">
            STEP 0{currentStep} / 04
          </span>
        </div>

        {/* 4 Step Indicators */}
        <div className="grid grid-cols-4 gap-2">
          {[
            { step: 1, label: '01 / BUSINESS' },
            { step: 2, label: '02 / TARGET QUERIES' },
            { step: 3, label: '03 / AI ENGINES' },
            { step: 4, label: '04 / LAUNCH' },
          ].map((item) => (
            <div key={item.step} className="space-y-1.5">
              <div
                className={`h-1 rounded-full transition-all ${
                  currentStep >= item.step ? 'bg-[#E8B400]' : 'bg-white/[0.08]'
                }`}
              />
              <span
                className={`text-[10px] font-mono block ${
                  currentStep === item.step ? 'text-white' : 'text-[rgba(232,230,213,0.30)]'
                }`}
              >
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {errorMsg && (
        <div className="mt-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Step 1: Business Profile */}
      {currentStep === 1 && (
        <div className="py-8 space-y-6">
          <div>
            <h3 className="text-xl font-normal text-white">Target Business Perimeter</h3>
            <p className="text-xs text-[rgba(232,230,213,0.60)] font-light mt-1">
              Define the target digital asset and corporate entity to probe.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 font-mono text-xs">
            <div className="space-y-2">
              <label className="text-[rgba(232,230,213,0.60)] uppercase tracking-wider block">
                Target Website URL
              </label>
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="w-full rounded-xl bg-white/[0.03] border border-[rgba(232,230,213,0.10)] px-4 py-3 text-white focus:border-[#E8B400] focus:outline-none"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[rgba(232,230,213,0.60)] uppercase tracking-wider block">
                Work Email (For Dispatch)
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl bg-white/[0.03] border border-[rgba(232,230,213,0.10)] px-4 py-3 text-white focus:border-[#E8B400] focus:outline-none"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[rgba(232,230,213,0.60)] uppercase tracking-wider block">
                Recognized Brand Entity Name
              </label>
              <input
                type="text"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                className="w-full rounded-xl bg-white/[0.03] border border-[rgba(232,230,213,0.10)] px-4 py-3 text-white focus:border-[#E8B400] focus:outline-none"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[rgba(232,230,213,0.60)] uppercase tracking-wider block">
                Industry & Categorization
              </label>
              <input
                type="text"
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                className="w-full rounded-xl bg-white/[0.03] border border-[rgba(232,230,213,0.10)] px-4 py-3 text-white focus:border-[#E8B400] focus:outline-none"
              />
            </div>
          </div>
        </div>
      )}

      {/* Step 2: Target Queries */}
      {currentStep === 2 && (
        <div className="py-8 space-y-6">
          <div>
            <h3 className="text-xl font-normal text-white">Commercial Prompt Universe</h3>
            <p className="text-xs text-[rgba(232,230,213,0.60)] font-light mt-1">
              Select or supplement high-intent buyer questions to test across model engines.
            </p>
          </div>

          <div className="space-y-2">
            {queries.map((q, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-white/[0.02] border border-[rgba(232,230,213,0.08)] flex items-center justify-between text-xs font-mono"
              >
                <div className="flex items-center gap-3">
                  <span className="text-[#E8B400]">0{idx + 1}</span>
                  <span className="text-[#E8E6D5]">"{q}"</span>
                </div>
                <button
                  type="button"
                  onClick={() => setQueries(queries.filter((_, i) => i !== idx))}
                  className="text-[rgba(232,230,213,0.30)] hover:text-rose-400"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              value={newQuery}
              onChange={(e) => setNewQuery(e.target.value)}
              placeholder="Add custom buyer question..."
              className="flex-1 rounded-xl bg-white/[0.03] border border-[rgba(232,230,213,0.10)] px-4 py-2.5 text-xs font-mono text-white focus:border-[#E8B400] focus:outline-none"
            />
            <button
              type="button"
              onClick={handleAddQuery}
              className="px-4 py-2.5 rounded-xl bg-white/[0.08] hover:bg-white/[0.15] text-xs font-mono text-white"
            >
              Add Query
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Engine Selection */}
      {currentStep === 3 && (
        <div className="py-8 space-y-6">
          <div>
            <h3 className="text-xl font-normal text-white">Target AI Engines</h3>
            <p className="text-xs text-[rgba(232,230,213,0.60)] font-light mt-1">
              Select the conversational frontier engines to execute simultaneous simulated buyer queries.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* ChatGPT */}
            <div
              onClick={() =>
                setSelectedEngines({ ...selectedEngines, chatgpt: !selectedEngines.chatgpt })
              }
              className={`p-6 rounded-2xl border cursor-pointer transition-all ${
                selectedEngines.chatgpt
                  ? 'bg-white/[0.04] border-[#E8B400]'
                  : 'bg-white/[0.01] border-[rgba(232,230,213,0.08)] opacity-50'
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono uppercase text-[#E8B400]">GPT-4o</span>
                <input
                  type="checkbox"
                  checked={selectedEngines.chatgpt}
                  readOnly
                  className="rounded accent-[#E8B400]"
                />
              </div>
              <h4 className="text-base font-normal text-white">OpenAI ChatGPT</h4>
              <p className="text-xs text-[rgba(232,230,213,0.50)] mt-2 font-light">
                Tests conversational synthesis and affirmative recommendation lists.
              </p>
            </div>

            {/* Gemini */}
            <div
              onClick={() =>
                setSelectedEngines({ ...selectedEngines, gemini: !selectedEngines.gemini })
              }
              className={`p-6 rounded-2xl border cursor-pointer transition-all ${
                selectedEngines.gemini
                  ? 'bg-white/[0.04] border-[#E8B400]'
                  : 'bg-white/[0.01] border-[rgba(232,230,213,0.08)] opacity-50'
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono uppercase text-[#E8B400]">Gemini 1.5</span>
                <input
                  type="checkbox"
                  checked={selectedEngines.gemini}
                  readOnly
                  className="rounded accent-[#E8B400]"
                />
              </div>
              <h4 className="text-base font-normal text-white">Google Gemini</h4>
              <p className="text-xs text-[rgba(232,230,213,0.50)] mt-2 font-light">
                Evaluates Google Knowledge Graph and Search Grounding citations.
              </p>
            </div>

            {/* Google AI Overviews */}
            <div
              onClick={() =>
                setSelectedEngines({
                  ...selectedEngines,
                  google_aio: !selectedEngines.google_aio,
                })
              }
              className={`p-6 rounded-2xl border cursor-pointer transition-all ${
                selectedEngines.google_aio
                  ? 'bg-white/[0.04] border-[#E8B400]'
                  : 'bg-white/[0.01] border-[rgba(232,230,213,0.08)] opacity-50'
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono uppercase text-[#E8B400]">Google SGE</span>
                <input
                  type="checkbox"
                  checked={selectedEngines.google_aio}
                  readOnly
                  className="rounded accent-[#E8B400]"
                />
              </div>
              <h4 className="text-base font-normal text-white">AI Overviews</h4>
              <p className="text-xs text-[rgba(232,230,213,0.50)] mt-2 font-light">
                Measures zero-click visibility and primary domain link citations.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Step 4: Launch Confirmation & Cinematic Summary */}
      {currentStep === 4 && (
        <div className="py-8 space-y-6">
          <div>
            <h3 className="text-xl font-normal text-white">Confirm Intelligence Operation</h3>
            <p className="text-xs text-[rgba(232,230,213,0.60)] font-light mt-1">
              Review mission parameters before triggering the multi-model crawler.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white/[0.02] border border-[rgba(232,230,213,0.08)] space-y-4 font-mono text-xs">
            <div className="flex justify-between py-2 border-b border-white/[0.06]">
              <span className="text-[rgba(232,230,213,0.40)]">Target Asset:</span>
              <span className="text-white font-medium">{url}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-white/[0.06]">
              <span className="text-[rgba(232,230,213,0.40)]">Executive Recipient:</span>
              <span className="text-white font-medium">{email}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-white/[0.06]">
              <span className="text-[rgba(232,230,213,0.40)]">Simulated Intent Prompts:</span>
              <span className="text-[#E8B400] font-medium">{queries.length} Queries</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-[rgba(232,230,213,0.40)]">Frontier Engines:</span>
              <span className="text-white font-medium">ChatGPT 4o, Gemini 1.5, Google AIO</span>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Footer Controls */}
      <div className="pt-6 border-t border-[rgba(232,230,213,0.08)] flex items-center justify-between">
        {currentStep > 1 ? (
          <button
            type="button"
            onClick={() => setCurrentStep((currentStep - 1) as any)}
            className="flex items-center gap-2 text-xs font-mono text-[rgba(232,230,213,0.60)] hover:text-white"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Previous Step</span>
          </button>
        ) : (
          <div />
        )}

        {currentStep < 4 ? (
          <button
            type="button"
            onClick={() => setCurrentStep((currentStep + 1) as any)}
            className="inline-flex items-center gap-2 rounded-full bg-[#E8E6D5] hover:bg-white text-[#050505] px-6 py-2.5 text-xs font-mono font-semibold transition-all hover:scale-105"
          >
            <span>Proceed to Step 0{currentStep + 1}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        ) : (
          <button
            type="button"
            disabled={isLaunching}
            onClick={handleLaunchScan}
            className="inline-flex items-center gap-2 rounded-full bg-[#E8B400] hover:bg-amber-300 text-[#050505] px-8 py-3 text-xs font-mono font-bold transition-all hover:scale-105 shadow-[0_0_24px_rgba(232,180,0,0.3)] disabled:opacity-50"
          >
            {isLaunching ? (
              <span>TRIGGERING NEURAL RUNNER...</span>
            ) : (
              <>
                <span>EXECUTE MULTI-MODEL AUDIT</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
};
