import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, CheckCircle2, Terminal, ShieldAlert, Cpu } from 'lucide-react';
import { ARCHITECTURAL_CASE_STUDIES } from '../data/jupiterData';
import { ArchitecturalCaseStudy } from '../types';

interface CaseStudiesSectionProps {
  onSelectCaseStudy: (study: ArchitecturalCaseStudy) => void;
}

export const CaseStudiesSection: React.FC<CaseStudiesSectionProps> = ({ onSelectCaseStudy }) => {
  const [activeStudyIndex, setActiveStudyIndex] = useState<number>(0);
  const currentStudy = ARCHITECTURAL_CASE_STUDIES[activeStudyIndex];

  return (
    <section id="selected-work" className="relative py-28 md:py-40 px-6 md:px-12 lg:px-16 bg-[#F7F9FC] border-t border-black/[0.06]">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-black/[0.08] pb-6 gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 font-mono-tech text-xs tracking-wider text-[#0071E3] uppercase font-bold">
              <span>05 // SELECTED WORK</span>
              <span className="text-slate-300">•</span>
              <span className="text-[#667085]">PROVEN DEPLOYMENTS</span>
            </div>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#0B0D12] uppercase font-sans">
              Case Studies.
            </h2>
          </div>
          <p className="max-w-md text-sm text-[#667085] font-sans leading-relaxed">
            Real enterprise architectural challenges resolved through first-principles engineering, rigorous stress testing, and disciplined execution.
          </p>
        </div>

        {/* Narrative Selector Tabs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {ARCHITECTURAL_CASE_STUDIES.map((study, idx) => {
            const isSelected = idx === activeStudyIndex;
            return (
              <button
                key={study.id}
                onClick={() => setActiveStudyIndex(idx)}
                className={`p-6 rounded-2xl text-left transition-all duration-150 border flex flex-col justify-between cursor-pointer ${
                  isSelected
                    ? 'bg-white border-[#0071E3] shadow-md shadow-blue-500/10 ring-2 ring-[#0071E3]/20'
                    : 'bg-white/70 border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-white'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3 text-[11px] font-mono-tech">
                    <span className="text-[#0071E3] font-bold">
                      ARCH-0{idx + 1}
                    </span>
                    <span className="text-slate-400 uppercase font-semibold">
                      {study.classification}
                    </span>
                  </div>
                  <h3 className={`text-base font-bold tracking-tight mb-2 font-sans ${
                    isSelected ? 'text-[#0B0D12]' : 'text-slate-800'
                  }`}>
                    {study.headline}
                  </h3>
                  <p className="text-xs text-[#667085] line-clamp-2 font-sans leading-relaxed">
                    {study.domain}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-mono-tech text-slate-400">
                  <span>SYSTEM PROFILE</span>
                  <span className={isSelected ? 'text-[#0071E3] font-bold' : ''}>
                    INSPECT STORY →
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Case Study Story Presentation Card */}
        <div className="bg-white border border-black/[0.08] rounded-3xl p-8 sm:p-12 shadow-sm space-y-10">
          {/* Classification Banner */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <span className="px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200 font-mono-tech text-xs text-[#0071E3] uppercase font-bold">
                DOMAIN: {currentStudy.domain}
              </span>
              <span className="font-mono-tech text-xs text-[#667085]">
                DISCIPLINE: {currentStudy.classification}
              </span>
            </div>
            <button
              onClick={() => onSelectCaseStudy(currentStudy)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0B0D12] hover:bg-[#0071E3] text-white text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer shadow-xs"
            >
              <span>Full Architectural Report</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-slate-200" />
            </button>
          </div>

          {/* Headline & Context */}
          <div className="space-y-3">
            <h3 className="text-2xl sm:text-3xl font-bold text-[#0B0D12] uppercase leading-snug font-sans">
              {currentStudy.headline}
            </h3>
            <p className="text-base sm:text-lg text-[#667085] leading-relaxed max-w-4xl font-sans">
              {currentStudy.context}
            </p>
          </div>

          {/* Challenge vs Solution Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Challenge */}
            <div className="p-6 rounded-2xl bg-amber-50/70 border border-amber-200/80 space-y-3">
              <div className="flex items-center gap-2 text-amber-900 font-mono-tech text-xs uppercase tracking-wider font-bold">
                <ShieldAlert className="w-4 h-4 text-amber-600" />
                <span>ARCHITECTURAL BOTTLENECK</span>
              </div>
              <p className="text-sm text-slate-700 leading-relaxed font-sans">
                {currentStudy.architecturalChallenge}
              </p>
            </div>

            {/* Engineering Approach */}
            <div className="p-6 rounded-2xl bg-blue-50/70 border border-blue-200/80 space-y-3">
              <div className="flex items-center gap-2 text-[#0071E3] font-mono-tech text-xs uppercase tracking-wider font-bold">
                <Cpu className="w-4 h-4 text-[#0071E3]" />
                <span>JUPITERGENX ENGINEERING REMEDY</span>
              </div>
              <p className="text-sm text-slate-700 leading-relaxed font-sans">
                {currentStudy.engineeringApproach}
              </p>
            </div>
          </div>

          {/* Technical Execution Deliverables */}
          <div className="space-y-4 pt-2">
            <span className="font-mono-tech text-xs text-slate-400 uppercase tracking-wider font-bold block">
              TECHNICAL EXECUTION HIGHLIGHTS
            </span>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {currentStudy.technicalExecution.map((item, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/60 flex items-start gap-3 text-xs sm:text-sm text-slate-700 font-mono-tech">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Impact Banner */}
          <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200 flex items-start gap-4">
            <div className="p-2 rounded-xl bg-emerald-100 text-emerald-700">
              <Terminal className="w-4 h-4" />
            </div>
            <div>
              <span className="font-mono-tech text-[10px] text-emerald-800 uppercase tracking-wider block mb-1 font-bold">
                SYSTEM RELIABILITY IMPACT
              </span>
              <p className="text-sm text-slate-800 font-medium font-sans">
                {currentStudy.systemReliabilityImpact}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
