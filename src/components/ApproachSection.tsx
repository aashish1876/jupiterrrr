import React, { useState } from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, Terminal, GitBranch, ShieldCheck, Clock } from 'lucide-react';
import { APPROACH_STEPS } from '../data/jupiterData';
import { ApproachStep } from '../types';

export const ApproachSection: React.FC = () => {
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
  const activeStep: ApproachStep = APPROACH_STEPS[activeStepIndex];

  return (
    <section id="how-we-work" className="relative py-28 md:py-40 px-6 md:px-12 lg:px-16 bg-[#F7F9FC] border-t border-black/[0.06]">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-black/[0.08] pb-6 gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 font-mono-tech text-xs tracking-wider text-[#0071E3] uppercase font-bold">
              <span>03 // HOW WE WORK</span>
              <span className="text-slate-300">•</span>
              <span className="text-[#667085]">DISCIPLINED EXECUTION</span>
            </div>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#0B0D12] uppercase font-sans">
              Our Methodology.
            </h2>
          </div>
          <p className="max-w-md text-sm text-[#667085] font-sans leading-relaxed">
            A six-phase formal engineering pipeline ensuring architectural rigor, deterministic testing, zero-data-loss cutovers, and long-term systems resilience.
          </p>
        </div>

        {/* Tactile Phase Scrubber Bar */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {APPROACH_STEPS.map((step, idx) => {
            const isActive = idx === activeStepIndex;
            const isPast = idx < activeStepIndex;
            return (
              <button
                key={step.number}
                onClick={() => setActiveStepIndex(idx)}
                className={`p-4 rounded-2xl text-left transition-all duration-150 border flex flex-col justify-between cursor-pointer ${
                  isActive
                    ? 'bg-white border-[#0071E3] shadow-md shadow-blue-500/10 ring-2 ring-[#0071E3]/20'
                    : isPast
                    ? 'bg-white/80 border-slate-200 text-slate-700 hover:border-slate-300'
                    : 'bg-white/50 border-slate-200/60 text-slate-500 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className={`font-mono-tech text-xs font-bold ${
                    isActive ? 'text-[#0071E3]' : isPast ? 'text-emerald-600' : 'text-slate-400'
                  }`}>
                    {step.number}
                  </span>
                  <div className={`w-2 h-2 rounded-full transition-colors ${
                    isActive
                      ? 'bg-[#0071E3]'
                      : isPast
                      ? 'bg-emerald-500'
                      : 'bg-slate-300'
                  }`} />
                </div>
                <span className="text-[10px] font-mono-tech uppercase tracking-wider text-slate-400 mb-1">
                  {step.phase}
                </span>
                <span className={`text-xs font-bold line-clamp-1 font-sans ${
                  isActive ? 'text-[#0B0D12]' : 'text-slate-700'
                }`}>
                  {step.title.split(' ')[0]} {step.title.split(' ')[1]}
                </span>
              </button>
            );
          })}
        </div>

        {/* Selected Phase Showcase */}
        <div className="bg-white border border-black/[0.08] rounded-3xl p-8 sm:p-12 shadow-sm relative overflow-hidden space-y-8">
          {/* Header */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-100">
            <div className="space-y-1">
              <span className="font-mono-tech text-xs text-[#0071E3] font-bold uppercase tracking-wider">
                PHASE {activeStep.number} // {activeStep.phase}
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-[#0B0D12] font-sans">
                {activeStep.title}
              </h3>
            </div>
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 font-mono-tech text-xs font-semibold text-[#0071E3]">
              <Clock className="w-3.5 h-3.5" />
              <span>STAGE ESTIMATE: {activeStep.durationEstimate}</span>
            </div>
          </div>

          {/* Description */}
          <p className="text-base sm:text-lg text-[#667085] leading-relaxed max-w-4xl font-sans">
            {activeStep.description}
          </p>

          {/* Artifacts & Quality Controls Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            {/* Artifacts */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-4">
              <div className="flex items-center gap-2 font-mono-tech text-xs tracking-wider text-[#0071E3] font-bold uppercase">
                <Terminal className="w-4 h-4 text-[#0071E3]" />
                <span>FORMAL ENGINEERING ARTIFACTS</span>
              </div>
              <ul className="space-y-2.5">
                {activeStep.keyOutputs.map((output) => (
                  <li key={output} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 font-sans">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                    <span>{output}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quality & Risk Gates */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-4">
              <div className="flex items-center gap-2 font-mono-tech text-xs tracking-wider text-emerald-700 font-bold uppercase">
                <GitBranch className="w-4 h-4 text-emerald-600" />
                <span>GOVERNANCE & RISK GATES</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
                {activeStep.engineeringControls}
              </p>
              <div className="pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs font-mono-tech text-slate-500">
                <span>VERIFICATION GATE</span>
                <span className="text-emerald-700 font-bold flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  100% Peer Verified
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
