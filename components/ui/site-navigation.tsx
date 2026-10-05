'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { SupportedLanguage } from '@/types/scanner';

interface SiteNavigationProps {
  language?: SupportedLanguage;
  onLanguageChange?: (lang: SupportedLanguage) => void;
  onOpenScan?: () => void;
  onOpenLeads?: () => void;
}

const navLinks = [
  { label: 'Overview', href: '#overview' },
  { label: 'Prompts', href: '#prompts' },
  { label: 'Citations', href: '#citations' },
  { label: 'Competitors', href: '#competitors' },
  { label: 'Opportunities', href: '#opportunities' },
];

export const SiteNavigation: React.FC<SiteNavigationProps> = ({
  language = 'en',
  onLanguageChange,
  onOpenScan,
  onOpenLeads,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isPastHero, setIsPastHero] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
      setIsPastHero(window.scrollY > window.innerHeight * 0.85);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 pointer-events-none"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between pointer-events-auto">
          {/* Brand Mark — adapts to dark/light context */}
          <a
            href="#"
            className={`group flex items-center gap-2.5 rounded-full backdrop-blur-xl px-4 py-2 border transition-all duration-500 ${
              isPastHero
                ? 'bg-white/90 border-[#E8E8E6] shadow-sm'
                : 'bg-black/60 border-white/[0.08] hover:border-[#E1E0CC]/30'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-amber-400 group-hover:scale-125 transition-transform" />
            <span
              className={`text-xs sm:text-sm font-semibold tracking-tight transition-colors duration-500 ${
                isPastHero ? 'text-[#1A1A1A]' : 'text-[#E1E0CC]'
              }`}
            >
              Picked<span className="text-amber-400 font-serif">*</span>
            </span>
          </a>

          {/* Desktop Floating Navigation Pill */}
          <nav
            className={`hidden lg:flex items-center gap-1 rounded-full backdrop-blur-2xl px-3 py-1.5 border transition-all duration-500 ${
              isPastHero
                ? 'bg-white/90 border-[#E8E8E6] shadow-sm'
                : 'bg-black/70 border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.5)]'
            }`}
          >
            {navLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={`px-3.5 py-1.5 text-xs tracking-wide rounded-full transition-all duration-300 ${
                  isPastHero
                    ? 'text-[#6B6B6B] hover:text-[#1A1A1A] hover:bg-[#F5F5F3]'
                    : 'text-[#E1E0CC]/70 hover:text-[#E1E0CC] hover:bg-white/[0.05]'
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Right Action Cluster */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Language Selector */}
            {onLanguageChange && (
              <div
                className={`flex items-center rounded-full backdrop-blur-xl p-1 border text-[11px] font-medium transition-all duration-500 ${
                  isPastHero
                    ? 'bg-white/90 border-[#E8E8E6] text-[#6B6B6B]'
                    : 'bg-black/60 border-white/[0.08] text-[#E1E0CC]/70'
                }`}
              >
                <button
                  type="button"
                  onClick={() => onLanguageChange('en')}
                  className={`px-2.5 py-1 rounded-full transition-all cursor-pointer ${
                    language === 'en'
                      ? isPastHero
                        ? 'bg-[#1A1A1A] text-white font-semibold shadow-sm'
                        : 'bg-[#E1E0CC] text-[#050505] font-semibold shadow-sm'
                      : isPastHero
                      ? 'hover:text-[#1A1A1A]'
                      : 'hover:text-[#E1E0CC]'
                  }`}
                >
                  EN
                </button>
                <button
                  type="button"
                  onClick={() => onLanguageChange('et')}
                  className={`px-2.5 py-1 rounded-full transition-all cursor-pointer ${
                    language === 'et'
                      ? isPastHero
                        ? 'bg-[#1A1A1A] text-white font-semibold shadow-sm'
                        : 'bg-[#E1E0CC] text-[#050505] font-semibold shadow-sm'
                      : isPastHero
                      ? 'hover:text-[#1A1A1A]'
                      : 'hover:text-[#E1E0CC]'
                  }`}
                >
                  ET
                </button>
              </div>
            )}

            {/* Leads Vault Drawer Trigger */}
            {onOpenLeads && (
              <button
                type="button"
                onClick={onOpenLeads}
                className={`hidden sm:inline-flex items-center gap-1.5 rounded-full backdrop-blur-xl px-3 py-1.5 border text-xs font-medium transition-all duration-500 cursor-pointer ${
                  isPastHero
                    ? 'bg-white/90 border-[#E8E8E6] text-[#1A1A1A] hover:bg-[#F5F5F3]'
                    : 'bg-black/60 border-white/[0.08] text-[#E1E0CC]/80 hover:text-white'
                }`}
                title="View captured scans & leads vault"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>Vault</span>
              </button>
            )}

            {/* Direct Console Route Link */}
            <a
              href="/console"
              className={`hidden md:inline-flex items-center gap-1.5 rounded-full backdrop-blur-xl px-3 py-1.5 border text-xs font-mono transition-all duration-500 ${
                isPastHero
                  ? 'bg-white/90 border-[#E8E8E6] text-[#E8B400] hover:bg-[#F5F5F3]'
                  : 'bg-black/60 border-white/[0.08] text-[#E8B400] hover:border-[#E8B400]/40'
              }`}
              title="Open Picked AI Intelligence Console"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#E8B400] animate-pulse" />
              <span>Console</span>
            </a>

            {/* Primary Action Button */}
            <button
              type="button"
              onClick={onOpenScan}
              className={`group inline-flex items-center gap-2 rounded-full px-3.5 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold transition-all duration-500 cursor-pointer ${
                isPastHero
                  ? 'bg-[#1A1A1A] hover:bg-black text-white hover:shadow-md'
                  : 'bg-[#E8E6D5] hover:bg-white text-[#050505] hover:shadow-[0_0_24px_rgba(232,230,213,0.3)]'
              }`}
            >
              <span>{language === 'et' ? 'Käivita audit' : 'Run audit'}</span>
              <span
                className={`flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center rounded-full transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${
                  isPastHero ? 'bg-white text-[#1A1A1A]' : 'bg-[#050505] text-[#E8E6D5]'
                }`}
              >
                <ArrowUpRight className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
              </span>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open mobile menu"
              className={`lg:hidden p-2 rounded-full backdrop-blur-xl border transition-all duration-500 ${
                isPastHero
                  ? 'bg-white/90 border-[#E8E8E6] text-[#1A1A1A]'
                  : 'bg-black/60 border-white/[0.08] text-[#E1E0CC] hover:text-white'
              }`}
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-[#FAFAF8]/98 backdrop-blur-2xl flex flex-col justify-between p-6 sm:p-10"
          >
            {/* Top Bar */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                <span className="text-base font-semibold tracking-tight text-[#1A1A1A]">
                  Picked<span className="text-amber-400 font-serif">*</span>
                </span>
              </div>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close mobile menu"
                className="p-2 rounded-full bg-[#F0F0EE] text-[#1A1A1A] hover:bg-[#E8E8E6] transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Mobile Navigation Links */}
            <div className="flex flex-col gap-4 py-8">
              {navLinks.map((item, idx) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * idx, duration: 0.4 }}
                  className="text-2xl sm:text-3xl font-medium tracking-tight text-[#1A1A1A]/80 hover:text-[#1A1A1A] transition-colors flex items-center justify-between group"
                >
                  <span>{item.label}</span>
                  <ArrowUpRight className="w-5 h-5 text-[#9B9B9B] group-hover:text-[#1A1A1A] group-hover:translate-x-1 transition-all" />
                </motion.a>
              ))}
            </div>

            {/* Bottom Actions */}
            <div className="pt-6 border-t border-[#E8E8E6] flex flex-col gap-4">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onOpenScan) onOpenScan();
                }}
                className="w-full flex items-center justify-between rounded-full bg-[#1A1A1A] text-white p-3 px-6 font-semibold text-sm"
              >
                <span>{language === 'et' ? 'Käivita audit' : 'Run audit'}</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-between text-xs text-[#9B9B9B]">
                <span>AI Visibility Intelligence</span>
                <span>© {new Date().getFullYear()} Picked AI</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
