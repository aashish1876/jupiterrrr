import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, CheckCircle2, Terminal, ShieldAlert, Cpu } from 'lucide-react';
import { ARCHITECTURAL_CASE_STUDIES } from '../data/jupiterData';
import { ArchitecturalCaseStudy } from '../types';
import { subtleUpwardFadeVariants } from '../utils/motion';

interface CaseStudiesSectionProps {
  onSelectCaseStudy: (study: ArchitecturalCaseStudy) => void;
}

export const CaseStudiesSection: React.FC<CaseStudiesSectionProps> = ({ onSelectCaseStudy }) => {
  const [activeStudyIndex, setActiveStudyIndex] = useState<number>(0);
  const currentStudy = ARCHITECTURAL_CASE_STUDIES[activeStudyIndex];

  return (
    <section id="selected-work" className="relative py-24 md:py-32 px-6 md:px-12 lg:px-16 bg-[#07080C] border-t border-white/[0.06]">
      <motion.div
        variants={subtleUpwardFadeVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.12 }}
        className="max-w-7xl mx-auto space-y-16"
      >
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-white/[0.06] pb-6 gap-6">
          <div>
            <div className="flex items-center gap-2 font-mono-tech text-xs tracking-widest text-[#E5C388] uppercase mb-2">
              <span>05 // SELECTED WORK</span>
              <span>•</span>
              <span>IN-PRACTICE SYSTEMS</span>
            </div>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-[#F7F5F0] uppercase font-sans">
              SELECTED WORK
            </h2>
          </div>
          <p className="max-w-md text-sm text-[#D4CEBF] font-mono-tech">
            Real architectural challenges solved through first-principles engineering, rigorous testing, and disciplined execution.
          </p>
        </div>

        {/* Narrative Selector */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {ARCHITECTURAL_CASE_STUDIES.map((study, idx) => {
            const isSelected = idx === activeStudyIndex;
            return (
              <button
                key={study.id}
                onClick={() => setActiveStudyIndex(idx)}
                className={`p-6 rounded-xl text-left transition-colors duration-150 border flex flex-col justify-between cursor-pointer ${
                  isSelected
                    ? 'bg-[#141825] border-[#E5C388]/60 shadow-lg shadow-black/40'
                    : 'bg-[#0B0D15]/70 border-white/5 hover:border-white/15 hover:bg-[#101420]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3 text-[11px] font-mono-tech">
                    <span className="text-[#E5C388] font-semibold">
                      ARCH-0{idx + 1}
                    </span>
                    <span className="text-slate-400 uppercase">
                      {study.classification}
                    </span>
                  </div>
                  <h3 className={`text-lg font-bold tracking-tight mb-2 font-sans ${
                    isSelected ? 'text-[#FFF8EE]' : 'text-slate-200'
                  }`}>
                    {study.headline}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-2 font-sans">
                    {study.domain}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono-tech text-slate-400">
                  <span>SYSTEM PROFILE</span>
                  <span className={isSelected ? 'text-[#E5C388] font-semibold' : ''}>VIEW STORY →</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Case Study Story Presentation */}
        <div className="card-luxury rounded-2xl p-8 md:p-14 shadow-xl relative overflow-hidden">
          <div className="space-y-10">
            {/* Classification Banner */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
              <div className="flex items-center gap-3">
                <span className="px-3.5 py-1 rounded bg-[#E5C388]/10 border border-[#E5C388]/30 font-mono-tech text-xs text-[#E5C388] uppercase font-semibold">
                  DOMAIN: {currentStudy.domain}
                </span>
                <span className="font-mono-tech text-xs text-slate-400">
                  DISCIPLINE: {currentStudy.classification}
                </span>
              </div>
              <button
                onClick={() => onSelectCaseStudy(currentStudy)}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded bg-[#121622] hover:bg-[#181D2C] border border-white/10 text-xs font-mono-tech uppercase text-[#EDE8DF] transition-colors cursor-pointer"
              >
                <span>Full Architectural Report</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#E5C388]" />
              </button>
            </div>

            {/* Headline & Context */}
            <div className="space-y-4">
              <h3 className="text-2xl sm:text-4xl font-bold text-[#F7F5F0] uppercase leading-tight font-sans">
                {currentStudy.headline}
              </h3>
              <p className="text-base sm:text-lg text-[#D4CEBF] leading-relaxed max-w-4xl font-sans">
                {currentStudy.context}
              </p>
            </div>

            {/* Challenge vs Solution Breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Challenge */}
              <div className="p-6 rounded-xl bg-amber-950/20 border border-amber-500/20 space-y-3">
                <div className="flex items-center gap-2 text-amber-300 font-mono-tech text-xs uppercase tracking-wider font-semibold">
                  <ShieldAlert className="w-4 h-4 text-amber-400" />
                  <span>ARCHITECTURAL CHALLENGE</span>
                </div>
                <p className="text-sm text-slate-300 leading-relaxed font-sans">
                  {currentStudy.architecturalChallenge}
                </p>
              </div>

              {/* Engineering Approach */}
              <div className="p-6 rounded-xl bg-[#E5C388]/10 border border-[#E5C388]/20 space-y-3">
                <div className="flex items-center gap-2 text-[#E5C388] font-mono-tech text-xs uppercase tracking-wider font-semibold">
                  <Cpu className="w-4 h-4 text-[#E5C388]" />
                  <span>JUPITERGENX ENGINEERING APPROACH</span>
                </div>
                <p className="text-sm text-[#EDE8DF] leading-relaxed font-sans">
                  {currentStudy.engineeringApproach}
                </p>
              </div>
            </div>

            {/* Technical Execution Deliverables */}
            <div className="space-y-4 pt-4 border-t border-white/[0.08]">
              <span className="font-mono-tech text-xs text-slate-400 uppercase tracking-wider block">
                TECHNICAL EXECUTION HIGHLIGHTS
              </span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {currentStudy.technicalExecution.map((item, idx) => (
                  <div key={idx} className="p-3.5 rounded bg-[#0F121C] border border-white/[0.06] flex items-start gap-3 text-xs sm:text-sm text-[#EDE8DF] font-mono-tech">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Impact Banner */}
            <div className="p-5 rounded-xl bg-[#0F131E] border border-emerald-500/20 flex items-start gap-4">
              <div className="p-2 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                <Terminal className="w-4 h-4" />
              </div>
              <div>
                <span className="font-mono-tech text-[10px] text-emerald-300 uppercase tracking-widest block mb-1 font-semibold">
                  SYSTEM RELIABILITY IMPACT
                </span>
                <p className="text-sm text-[#EDE8DF] font-medium font-sans">
                  {currentStudy.systemReliabilityImpact}
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
