'use client';

import React from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ArrowUp, ArrowUpRight, ArrowRight } from 'lucide-react';

interface SiteFooterProps {
  language?: string;
  onOpenScan?: () => void;
}

export const SiteFooter: React.FC<SiteFooterProps> = ({ language = 'en', onOpenScan }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-10%' });

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer ref={ref} className="relative w-full bg-[#050505] text-[#E1E0CC]">
      {/* Transition from light workspace to dark footer */}
      <div className="w-full h-24 sm:h-32 bg-gradient-to-b from-[#FAFAF8] to-[#050505]" />

      {/* CTA Band */}
      <div className="max-w-5xl mx-auto px-6 py-16 sm:py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#E1E0CC]/40 block mb-4">
            Get started
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-white mb-6 leading-tight">
            See how AI recommends<br className="hidden sm:inline" /> your business
          </h2>
          <p className="text-sm sm:text-base text-[#E1E0CC]/60 max-w-lg mx-auto mb-8 leading-relaxed">
            Run your first AI visibility audit in under 60 seconds. No setup required.
          </p>
          <button
            type="button"
            onClick={onOpenScan}
            className="group inline-flex items-center gap-3 rounded-full bg-white hover:bg-[#F4F2E6] p-1 pl-6 pr-1 text-sm font-semibold text-[#050505] transition-all hover:scale-105 cursor-pointer"
          >
            <span>{language === 'et' ? 'Käivita audit' : 'Run your first audit'}</span>
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#050505] text-[#FFAE00] transition-transform group-hover:scale-105">
              <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
            </span>
          </button>
        </motion.div>
      </div>

      {/* Footer Content */}
      <div className="max-w-5xl mx-auto w-full px-6 pt-12 pb-12">
        <div className="border-t border-white/[0.08] pt-10 grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Brand */}
          <div className="md:col-span-4">
            <a href="#" className="inline-flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <span className="text-lg font-semibold tracking-tight text-white">
                Picked<span className="text-amber-400 font-serif">*</span>
              </span>
            </a>
            <p className="text-xs text-[#E1E0CC]/50 max-w-xs leading-relaxed">
              AI Visibility Intelligence. Audit, score, and optimize how frontier AI engines recommend your business.
            </p>
          </div>

          {/* Links */}
          <div className="md:col-span-3">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#E1E0CC]/30 block mb-3">
              Product
            </span>
            <ul className="space-y-2 text-xs text-[#E1E0CC]/60">
              <li><a href="#overview" className="hover:text-white transition-colors">Overview</a></li>
              <li><a href="#prompts" className="hover:text-white transition-colors">Prompts</a></li>
              <li><a href="#inspector" className="hover:text-white transition-colors">AI Inspector</a></li>
              <li><a href="#citations" className="hover:text-white transition-colors">Citations</a></li>
              <li><a href="#competitors" className="hover:text-white transition-colors">Competitors</a></li>
              <li><a href="#opportunities" className="hover:text-white transition-colors">Opportunities</a></li>
              <li><a href="/console" className="hover:text-amber-300 text-amber-400 font-medium transition-colors">Console App &rarr;</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-3">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#E1E0CC]/30 block mb-3">
              Connect
            </span>
            <ul className="space-y-2 text-xs text-[#E1E0CC]/60">
              <li>
                <a href="mailto:aivisibilitymvp@gmail.com" className="hover:text-white transition-colors">
                  aivisibilitymvp@gmail.com
                </a>
              </li>
              <li>
                <a href="https://twitter.com" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 hover:text-white transition-colors">
                  X / Twitter <ArrowUpRight className="w-3 h-3 text-white/20" />
                </a>
              </li>
              <li>
                <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 hover:text-white transition-colors">
                  LinkedIn <ArrowUpRight className="w-3 h-3 text-white/20" />
                </a>
              </li>
            </ul>
          </div>

          {/* Back to top */}
          <div className="md:col-span-2 flex md:justify-end items-start">
            <button
              type="button"
              onClick={scrollToTop}
              className="group flex items-center gap-2 text-xs text-[#E1E0CC]/50 hover:text-white transition-colors cursor-pointer"
            >
              <span>Top</span>
              <span className="p-1.5 rounded-full border border-white/10 group-hover:border-white/30 transition-colors">
                <ArrowUp className="w-3 h-3 group-hover:-translate-y-0.5 transition-transform" />
              </span>
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-3 text-[10px] text-[#E1E0CC]/30 font-mono">
          <span>© {new Date().getFullYear()} Picked AI. All rights reserved.</span>
          <span>AI Visibility Intelligence Platform</span>
        </div>
      </div>
    </footer>
  );
};
