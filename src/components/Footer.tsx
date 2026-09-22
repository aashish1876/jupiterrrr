import React from 'react';
import { ArrowUp, Terminal, Shield } from 'lucide-react';
import { COMPANY_DETAILS } from '../data/jupiterData';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#05060A] border-t border-[#E5C388]/15 text-slate-400 font-mono-tech text-xs py-16 px-6 md:px-12 lg:px-16">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Top bar with brand & back to top */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-[#E5C388]/15 pb-8">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded bg-[#121622] border border-[#E5C388]/40 flex items-center justify-center shadow-xs">
              <div className="w-2.5 h-2.5 border border-[#E5C388] transform rotate-45" />
            </div>
            <div>
              <span className="text-sm font-bold text-[#F7F5F0] tracking-wider font-sans uppercase">
                {COMPANY_DETAILS.legalName}
              </span>
              <span className="block text-[10px] text-slate-400">
                ESTABLISHED 2015 // SAN FERNANDO, TRINIDAD & TOBAGO
              </span>
            </div>
          </div>

          <button
            onClick={scrollToTop}
            data-cursor-hover
            className="self-start md:self-auto flex items-center gap-2 px-3 py-1.5 rounded bg-[#0D101C] border border-[#E5C388]/20 hover:border-[#E5C388]/50 text-slate-300 hover:text-[#FFF8EE] transition-colors"
          >
            <span>TOP OF SYSTEM</span>
            <ArrowUp className="w-3.5 h-3.5 text-[#E5C388]" />
          </button>
        </div>

        {/* Four Column Directory */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <span className="text-[#E5C388] uppercase tracking-wider block mb-3 font-semibold">
              CAPABILITIES
            </span>
            <ul className="space-y-2 text-slate-400">
              <li><a href="#capabilities" className="hover:text-[#E5C388] transition-colors">BUILD — Custom Engineering</a></li>
              <li><a href="#capabilities" className="hover:text-[#E5C388] transition-colors">INTELLIGENCE — Applied AI</a></li>
              <li><a href="#capabilities" className="hover:text-[#E5C388] transition-colors">TRANSFORM — Modernization</a></li>
              <li><a href="#capabilities" className="hover:text-[#E5C388] transition-colors">OPERATE — Infrastructure</a></li>
            </ul>
          </div>

          <div>
            <span className="text-[#E5C388] uppercase tracking-wider block mb-3 font-semibold">
              METHODOLOGY
            </span>
            <ul className="space-y-2 text-slate-400">
              <li><a href="#how-we-work" className="hover:text-[#E5C388] transition-colors">Engineering Approach</a></li>
              <li><a href="#architecture" className="hover:text-[#E5C388] transition-colors">System Architecture</a></li>
              <li><a href="#selected-work" className="hover:text-[#E5C388] transition-colors">Selected Work</a></li>
              <li><a href="#contact" className="hover:text-[#E5C388] transition-colors">Initiate Consultation</a></li>
            </ul>
          </div>

          <div>
            <span className="text-[#E5C388] uppercase tracking-wider block mb-3 font-semibold">
              ORGANIZATION
            </span>
            <ul className="space-y-2 text-slate-400">
              <li><a href="#what-we-do" className="hover:text-[#E5C388] transition-colors">What JupiterGenX Does</a></li>
              <li><a href="#architecture" className="hover:text-[#E5C388] transition-colors">Topological Hierarchy</a></li>
              <li><a href="#selected-work" className="hover:text-[#E5C388] transition-colors">Case Studies</a></li>
              <li><a href="#contact" className="hover:text-[#E5C388] transition-colors">Consultation Desk</a></li>
            </ul>
          </div>

          <div>
            <span className="text-[#E5C388] uppercase tracking-wider block mb-3 font-semibold">
              ETHOS
            </span>
            <p className="text-[#D4CEBF] text-[11px] leading-relaxed font-sans">
              "{COMPANY_DETAILS.philosophy}"
            </p>
            <div className="mt-4 pt-3 border-t border-[#E5C388]/15 text-[10px] text-[#C5A059]">
              ENGINEERING • INTELLIGENCE • RELIABILITY • TRANSFORMATION
            </div>
          </div>
        </div>

        {/* Bottom copyright & attribution */}
        <div className="pt-8 border-t border-[#E5C388]/15 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <div>
            © {new Date().getFullYear()} {COMPANY_DETAILS.legalName}. All rights reserved.
          </div>
          <div>
            San Fernando, Trinidad & Tobago // Atlantic Standard Time (AST UTC-4)
          </div>
        </div>
      </div>
    </footer>
  );
};
