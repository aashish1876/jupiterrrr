import React, { useState } from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, Terminal, GitBranch } from 'lucide-react';
import { APPROACH_STEPS } from '../data/jupiterData';
import { ApproachStep } from '../types';
import { subtleUpwardFadeVariants } from '../utils/motion';

export const ApproachSection: React.FC = () => {
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
  const activeStep: ApproachStep = APPROACH_STEPS[activeStepIndex];

  return (
    <section id="how-we-work" className="relative py-24 md:py-32 px-6 md:px-12 lg:px-16 bg-[#07080C] border-t border-white/[0.06]">
      <motion.div
        variants={subtleUpwardFadeVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.12 }}
        className="max-w-7xl mx-auto space-y-16"
      >
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-white/[0.06] pb-6 gap-6">
          <div>
            <div className="flex items-center gap-2 font-mono-tech text-xs tracking-widest text-[#E5C388] uppercase mb-2">
              <span>03 // HOW WE WORK</span>
              <span>•</span>
              <span>ENGINEERING LIFECYCLE</span>
            </div>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-[#F7F5F0] uppercase font-sans">
              OUR METHODOLOGY
            </h2>
          </div>
          <p className="max-w-md text-sm text-[#D4CEBF] font-mono-tech">
            A disciplined six-phase engineering pipeline ensuring architectural integrity, zero-loss migrations, and long-term systems resilience.
          </p>
        </div>

        {/* Timeline Progress Bar for All 6 Steps */}
        <div className="relative">
          <div className="hidden lg:block absolute top-6 left-6 right-6 h-[1px] bg-white/10 z-0" />
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 relative z-10">
            {APPROACH_STEPS.map((step, idx) => {
              const isActive = idx === activeStepIndex;
              const isPast = idx < activeStepIndex;
              return (
                <button
                  key={step.number}
                  onClick={() => setActiveStepIndex(idx)}
                  className={`p-4 rounded-lg text-left transition-colors duration-150 border flex flex-col justify-between cursor-pointer ${
                    isActive
                      ? 'bg-[#141825] border-[#E5C388]/60 shadow-lg shadow-black/40'
                      : isPast
                      ? 'bg-[#0D101A]/70 border-white/10 text-slate-300 hover:border-[#E5C388]/30'
                      : 'bg-[#0A0C13]/50 border-white/5 text-slate-400 hover:border-white/15'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className={`font-mono-tech text-sm font-bold ${
                      isActive ? 'text-[#E5C388]' : isPast ? 'text-emerald-400' : 'text-slate-400'
                    }`}>
                      {step.number}
                    </span>
                    <div className={`w-2.5 h-2.5 rounded-full flex items-center justify-center transition-colors ${
                      isActive
                        ? 'bg-[#E5C388]'
                        : isPast
                        ? 'bg-emerald-400'
                        : 'bg-slate-700'
                    }`} />
                  </div>
                  <span className="text-[11px] font-mono-tech uppercase tracking-wider text-slate-400 mb-1">
                    {step.phase}
                  </span>
                  <span className={`text-xs font-semibold line-clamp-1 ${
                    isActive ? 'text-[#FFF5E4]' : 'text-slate-300'
                  }`}>
                    {step.title.split(' ')[0]} {step.title.split(' ')[1]}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Phase Detail Showcase - Instant Swap (Zero Lag) */}
        <div className="card-luxury rounded-xl p-8 md:p-12 shadow-xl relative overflow-hidden">
          <div className="space-y-8">
            {/* Top Phase Header */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
              <div className="space-y-1">
                <span className="font-mono-tech text-xs text-[#E5C388] uppercase tracking-widest">
                  PHASE {activeStep.number} // {activeStep.phase}
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold text-[#F7F5F0] uppercase font-sans">
                  {activeStep.title}
                </h3>
              </div>
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded bg-[#E5C388]/10 border border-[#E5C388]/25 font-mono-tech text-xs text-[#EDE8DF]">
                  STAGE TIMELINE: {activeStep.durationEstimate}
                </span>
              </div>
            </div>

            {/* Description */}
            <p className="text-base sm:text-lg text-[#D4CEBF] leading-relaxed max-w-4xl font-sans">
              {activeStep.description}
            </p>

            {/* Artifacts & Controls Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
              {/* Formal Key Outputs */}
              <div className="p-6 rounded-lg bg-[#0F121C]/80 border border-white/[0.08] space-y-4">
                <div className="flex items-center gap-2 font-mono-tech text-xs tracking-wider text-[#E5C388] uppercase">
                  <Terminal className="w-4 h-4 text-[#E5C388]" />
                  <span>FORMAL ENGINEERING ARTIFACTS</span>
                </div>
                <ul className="space-y-2.5">
                  {activeStep.keyOutputs.map((output) => (
                    <li key={output} className="flex items-start gap-2.5 text-sm text-[#EDE8DF]">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                      <span>{output}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Quality & Risk Gates */}
              <div className="p-6 rounded-lg bg-[#0F121C]/80 border border-white/[0.08] space-y-4">
                <div className="flex items-center gap-2 font-mono-tech text-xs tracking-wider text-emerald-400 uppercase">
                  <GitBranch className="w-4 h-4 text-emerald-400" />
                  <span>GOVERNANCE & ENGINEERING CONTROLS</span>
                </div>
                <p className="text-sm text-[#D4CEBF] leading-relaxed font-sans">
                  {activeStep.engineeringControls}
                </p>
                <div className="pt-3 border-t border-white/[0.08] flex items-center justify-between text-xs font-mono-tech text-slate-400">
                  <span>GATE REQUIREMENT</span>
                  <span className="text-emerald-300 font-medium">100% Peer Verified</span>
                </div>
              </div>
            </div>

            {/* Step Navigation Controls */}
            <div className="flex items-center justify-between pt-6 border-t border-white/[0.08]">
              <button
                disabled={activeStepIndex === 0}
                onClick={() => setActiveStepIndex(prev => Math.max(0, prev - 1))}
                className="px-4 py-2 rounded bg-[#11141E] hover:bg-[#181D2C] disabled:opacity-30 disabled:cursor-not-allowed border border-white/10 text-xs font-mono-tech uppercase text-[#EDE8DF] transition-colors cursor-pointer"
              >
                ← PREVIOUS PHASE
              </button>
              <span className="font-mono-tech text-xs text-slate-400">
                PHASE {activeStepIndex + 1} OF {APPROACH_STEPS.length}
              </span>
              <button
                disabled={activeStepIndex === APPROACH_STEPS.length - 1}
                onClick={() => setActiveStepIndex(prev => Math.min(APPROACH_STEPS.length - 1, prev + 1))}
                className="px-5 py-2 rounded bg-gradient-to-r from-[#E5C388] via-[#DFC28E] to-[#C5A059] hover:brightness-110 disabled:opacity-30 disabled:cursor-not-allowed text-xs font-mono-tech uppercase font-bold text-[#0A0D12] transition-colors shadow-md cursor-pointer"
              >
                NEXT PHASE →
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
