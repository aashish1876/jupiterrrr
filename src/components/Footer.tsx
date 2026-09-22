import React from 'react';
import { ArrowUp, Terminal, ShieldCheck } from 'lucide-react';
import { COMPANY_DETAILS } from '../data/jupiterData';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#F7F9FC] text-[#0B0D12] border-t border-black/[0.07] px-6 md:px-12 lg:px-16 pt-20 pb-16">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Top Brand & Directory Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-[#0071E3] flex items-center justify-center text-white shadow-xs">
                <div className="w-2.5 h-2.5 border-2 border-white transform rotate-45" />
              </div>
              <span className="text-base font-bold tracking-tight text-[#0B0D12] uppercase font-sans">
                {COMPANY_DETAILS.shortName}
              </span>
            </div>
            <p className="text-sm text-[#667085] max-w-sm leading-relaxed font-sans">
              An engineering firm designing resilient enterprise software, applied intelligence, and mission-critical cloud infrastructure.
            </p>
            <div className="pt-2 font-mono-tech text-xs text-slate-400">
              SAN FERNANDO, TRINIDAD & TOBAGO // EST. 2015
            </div>
          </div>

          {/* Nav Directory */}
          <div className="space-y-3">
            <span className="font-mono-tech text-xs text-[#0071E3] uppercase font-bold tracking-wider block">
              ARCHITECTURE
            </span>
            <ul className="space-y-2 text-xs font-sans text-[#667085]">
              <li><a href="#what-we-do" className="hover:text-[#0071E3] transition-colors">Overview & Purpose</a></li>
              <li><a href="#capabilities" className="hover:text-[#0071E3] transition-colors">Four Disciplines</a></li>
              <li><a href="#how-we-work" className="hover:text-[#0071E3] transition-colors">Engineering Lifecycle</a></li>
              <li><a href="#architecture" className="hover:text-[#0071E3] transition-colors">Topological Hierarchy</a></li>
              <li><a href="#selected-work" className="hover:text-[#0071E3] transition-colors">Selected Case Studies</a></li>
            </ul>
          </div>

          {/* Disciplines */}
          <div className="space-y-3">
            <span className="font-mono-tech text-xs text-[#0071E3] uppercase font-bold tracking-wider block">
              DISCIPLINES
            </span>
            <ul className="space-y-2 text-xs font-sans text-[#667085]">
              <li><a href="#service-build" className="hover:text-[#0071E3] transition-colors">Custom Systems (BUILD)</a></li>
              <li><a href="#service-intelligence" className="hover:text-[#0071E3] transition-colors">Applied AI (INTELLIGENCE)</a></li>
              <li><a href="#service-transform" className="hover:text-[#0071E3] transition-colors">Modernization (TRANSFORM)</a></li>
              <li><a href="#service-operate" className="hover:text-[#0071E3] transition-colors">SRE Operations (OPERATE)</a></li>
            </ul>
          </div>

          {/* Standards & Top of System Button */}
          <div className="space-y-4">
            <span className="font-mono-tech text-xs text-[#0071E3] uppercase font-bold tracking-wider block">
              OPERATIONAL
            </span>
            <div className="p-3.5 rounded-2xl bg-white border border-black/[0.06] text-xs font-mono-tech space-y-1.5 shadow-2xs">
              <div className="text-emerald-700 font-bold flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                99.999% SLA TARGET
              </div>
              <div className="text-slate-500">
                Deterministic Failover
              </div>
            </div>

            <button
              onClick={scrollToTop}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-white hover:bg-slate-100/80 border border-black/[0.08] text-slate-800 text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer shadow-2xs"
            >
              <span>Top of System</span>
              <ArrowUp className="w-3.5 h-3.5 text-slate-500" />
            </button>
          </div>
        </div>

        {/* Bottom Legal & Security Attribution */}
        <div className="pt-8 border-t border-black/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono-tech text-slate-400">
          <div>
            © {new Date().getFullYear()} {COMPANY_DETAILS.legalName}. All Rights Reserved.
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-slate-500">
              <ShieldCheck className="w-3.5 h-3.5 text-[#0071E3]" />
              Enterprise Tier Governance
            </span>
            <span>•</span>
            <span>San Fernando, TT (AST UTC-4)</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
