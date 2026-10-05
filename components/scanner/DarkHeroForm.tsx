'use client';

import React, { useState } from 'react';
import { SupportedLanguage } from '@/types/scanner';
import {
  Search,
  Mail,
  Globe,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  CheckCircle2,
  Zap,
  Bot,
  Swords,
  Link2,
  TrendingUp,
  Award,
  Layers,
} from 'lucide-react';

interface DarkHeroFormProps {
  language: SupportedLanguage;
  onLanguageChange: (lang: SupportedLanguage) => void;
  onSubmit: (url: string, email: string) => void;
  isLoading: boolean;
}

export function DarkHeroForm({
  language,
  onLanguageChange,
  onSubmit,
  isLoading,
}: DarkHeroFormProps) {
  const [url, setUrl] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);

  const isEt = language === 'et';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const cleanUrl = url.trim();
    if (!cleanUrl) {
      setError(isEt ? 'Palun sisestage veebisaidi aadress.' : 'Please enter your website URL.');
      return;
    }

    const cleanEmail = email.trim();
    if (!cleanEmail || !cleanEmail.includes('@')) {
      setError(isEt ? 'Palun sisestage kehtiv e-posti aadress.' : 'Please enter a valid work email address.');
      return;
    }

    onSubmit(cleanUrl, cleanEmail);
  };

  const sampleBusinesses = [
    { name: 'Veriff', url: 'https://veriff.com', email: 'audit@veriff.com', lang: 'en' as const, category: 'Identity Verification' },
    { name: 'Wise', url: 'https://wise.com', email: 'audit@wise.com', lang: 'en' as const, category: 'Fintech & FX' },
    { name: 'Pipedrive', url: 'https://pipedrive.com', email: 'audit@pipedrive.com', lang: 'en' as const, category: 'Sales CRM' },
    { name: 'Kliinik 32', url: 'https://kliinik32.ee', email: 'audit@kliinik32.ee', lang: 'et' as const, category: 'Hambaravi' },
    { name: 'Confido', url: 'https://confido.ee', email: 'audit@confido.ee', lang: 'et' as const, category: 'Meditsiin' },
    { name: 'Sorainen', url: 'https://sorainen.com', email: 'audit@sorainen.com', lang: 'et' as const, category: 'Äriõigus' },
  ];

  return (
    <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 pt-10 pb-20 select-none">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-amber-500/10 via-yellow-500/5 to-transparent blur-3xl pointer-events-none rounded-full" />

      {/* Language Switcher Badge */}
      <div className="flex justify-center mb-8">
        <div className="inline-flex items-center bg-slate-900/90 border border-slate-800 rounded-full p-1 shadow-lg backdrop-blur-md">
          <Globe className="w-3.5 h-3.5 text-amber-400 ml-2.5 mr-2" />
          <button
            type="button"
            onClick={() => onLanguageChange('en')}
            className={`px-3.5 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              language === 'en'
                ? 'bg-amber-400 text-slate-950 shadow-md font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            English
          </button>
          <button
            type="button"
            onClick={() => onLanguageChange('et')}
            className={`px-3.5 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              language === 'et'
                ? 'bg-amber-400 text-slate-950 shadow-md font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Eesti keel
          </button>
        </div>
      </div>

      {/* Hero Headline & Subhead */}
      <div className="text-center space-y-5 mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-400 text-xs font-bold tracking-wide uppercase shadow-sm">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          <span>{isEt ? 'Generatiivse Otsingu Optimiseerimise (GEO) Audit' : 'Generative Engine Optimization (GEO) Audit'}</span>
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.1]">
          {isEt ? (
            <>
              Vaata, kuidas <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500">tehisintellekt</span> soovitab Sinu ettevõtet
            </>
          ) : (
            <>
              See How <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500">AI Assistants</span> Recommend Your Business
            </>
          )}
        </h1>

        <p className="text-base sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed font-normal">
          {isEt
            ? 'Uuri välja, kas ChatGPT, Gemini ja Google AI Overviews soovitavad Sinu teenuseid reaalsetele ostjatele — või millised konkurendid Sinu asemel esikohale seatakse.'
            : 'Audit whether ChatGPT, Gemini, and Google AI Overviews cite and recommend your brand when potential customers search for your services.'}
        </p>
      </div>

      {/* Main Submission Card */}
      <div className="glass-panel-elevated rounded-3xl p-6 sm:p-10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-amber-500/10 via-transparent to-transparent pointer-events-none rounded-tr-3xl" />

        <form onSubmit={handleSubmit} className="space-y-5 relative">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Website URL */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                {isEt ? 'Ettevõtte veebisait' : 'Company Website'}
              </label>
              <div className="relative">
                <Search className="w-4 h-4 text-slate-500 absolute left-4 top-4" />
                <input
                  type="text"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder={isEt ? 'nt. minu-ettevote.ee' : 'e.g. yourcompany.com'}
                  disabled={isLoading}
                  required
                  className="w-full pl-11 pr-4 py-3.5 bg-slate-950/80 border border-slate-700/80 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 rounded-2xl text-white text-sm transition-all outline-hidden font-medium placeholder:text-slate-500"
                />
              </div>
            </div>

            {/* Email Address */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                {isEt ? 'Tööalane e-post raporti saamiseks' : 'Work Email Address'}
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-4 top-4" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={isEt ? 'juht@ettevote.ee' : 'founder@company.com'}
                  disabled={isLoading}
                  required
                  className="w-full pl-11 pr-4 py-3.5 bg-slate-950/80 border border-slate-700/80 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 rounded-2xl text-white text-sm transition-all outline-hidden font-medium placeholder:text-slate-500"
                />
              </div>
            </div>
          </div>

          {error && (
            <div className="p-3.5 bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs rounded-xl font-medium flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-rose-500 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Large Gold CTA */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 text-slate-950 font-black text-base sm:text-lg flex items-center justify-center gap-2.5 shadow-xl shadow-amber-500/20 transition-all hover:shadow-amber-500/30 active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer mt-3"
          >
            {isLoading ? (
              <span className="flex items-center gap-2.5">
                <span className="w-5 h-5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                {isEt ? 'Skannimine algab taustal...' : 'Initiating AI Visibility Scan...'}
              </span>
            ) : (
              <span className="flex items-center gap-2.5">
                {isEt ? 'Skanni minu ettevõtte AI nähtavust' : 'Scan My Business AI Visibility'}
                <ArrowRight className="w-5 h-5 text-slate-950" />
              </span>
            )}
          </button>
        </form>

        {/* 3 Core Value Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-6 mt-6 border-t border-slate-800/80">
          <div className="flex items-center gap-2.5 text-slate-300 text-xs font-semibold">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{isEt ? 'Täpselt 10 ostukavatsusega päringut' : 'Exactly 10 buyer-intent queries'}</span>
          </div>
          <div className="flex items-center gap-2.5 text-slate-300 text-xs font-semibold">
            <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0" />
            <span>{isEt ? 'ChatGPT, Gemini & AI Overviews' : 'ChatGPT, Gemini & AI Overviews'}</span>
          </div>
          <div className="flex items-center gap-2.5 text-slate-300 text-xs font-semibold">
            <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
            <span>{isEt ? 'Täielikud tehisintellekti toorvastused' : 'Verbatim responses & cited URLs'}</span>
          </div>
        </div>

        {/* Quick Sample Presets */}
        <div className="mt-6 pt-5 border-t border-slate-800/60 flex flex-wrap items-center gap-2">
          <span className="text-xs text-slate-400 font-bold uppercase tracking-wider mr-1">
            {isEt ? 'Proovi näidistega:' : 'Try Presets:'}
          </span>
          {sampleBusinesses.map((b, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                setUrl(b.url);
                setEmail(b.email);
                onLanguageChange(b.lang);
              }}
              className="px-3 py-1.5 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5"
            >
              <span className="font-semibold text-white">{b.name}</span>
              <span className="text-[10px] text-slate-500 font-mono">({b.category})</span>
            </button>
          ))}
        </div>
      </div>

      {/* Feature Showcase Matrix beneath form */}
      <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Card 1: 3-Engine Concurrent Auditing */}
        <div className="glass-panel rounded-2xl p-6 space-y-3 relative overflow-hidden">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
            <Bot className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-white">
            {isEt ? '3 AI mootorit paralleelselt' : '3 Major AI Search Engines'}
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            {isEt
              ? 'Kontrollib reaalajas ChatGPT (OpenAI), Google Gemini ja Google AI Overviews soovitusi 10 ostupäringu lõikes.'
              : 'Directly tests ChatGPT, Gemini, and Google AI Overviews to evaluate where your brand is ranked.'}
          </p>
          <div className="flex items-center gap-2 pt-1 text-[11px] font-mono text-slate-500">
            <span className="text-emerald-400">● OpenAI</span>
            <span className="text-sky-400">● Gemini</span>
            <span className="text-amber-400">● AI Overviews</span>
          </div>
        </div>

        {/* Card 2: Competitor Battlecards */}
        <div className="glass-panel rounded-2xl p-6 space-y-3 relative overflow-hidden">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center">
            <Swords className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-white">
            {isEt ? 'Konkurentide lahingukaardid' : 'Competitor Share of Voice'}
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            {isEt
              ? 'Näitab täpselt, millised konkurendid varastavad AI soovitusi Sinu teenindatavas asukohas ja tegevusalal.'
              : 'Measures head-to-head recommendation share and surfaces rivals stealing clicks when your business is missed.'}
          </p>
          <div className="pt-1 text-[11px] font-mono text-amber-400 font-semibold">
            Win/Loss Record & Rank Positions
          </div>
        </div>

        {/* Card 3: Authority Citation Gaps */}
        <div className="glass-panel rounded-2xl p-6 space-y-3 relative overflow-hidden">
          <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-400 flex items-center justify-center">
            <Link2 className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-white">
            {isEt ? 'Viidete ja allikate võimalused' : 'Authority Citation Gaps'}
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            {isEt
              ? 'Tuvastab kataloogid, ülevaated ja väljaanded, mille kaudu AI mudelid konkurente leiavad, koos 1-kliki CSV ekspordiga.'
              : 'Identifies the exact third-party directories, PR articles, and review platforms training generative engines.'}
          </p>
          <div className="pt-1 text-[11px] font-mono text-sky-400 font-semibold">
            1-Click CSV Export & Outreach Matrix
          </div>
        </div>
      </div>

      {/* Transparency Guarantee Note */}
      <div className="mt-12 text-center">
        <p className="text-xs text-slate-500 max-w-xl mx-auto flex items-center justify-center gap-2">
          <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
          <span>
            {isEt
              ? 'Läbipaistvusgarantii: Kõik tehisintellekti päringud ja vastused talletatakse täielikult ilma tehislike või simuleeritud andmeteta.'
              : 'Transparency Guarantee: Real LLM queries and actual citations stored verbatim. Zero simulated or fabricated production results.'}
          </span>
        </p>
      </div>
    </div>
  );
}
