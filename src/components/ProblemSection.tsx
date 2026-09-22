import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AlertTriangle, CheckCircle2, RefreshCw, Layers, ArrowRight, Zap, ShieldAlert, Cpu } from 'lucide-react';
import { ENTERPRISE_PROBLEMS } from '../data/jupiterData';
import { verticalStepVariants, transitionSpring } from '../motion';

export const ProblemSection: React.FC = () => {
  const [activeProblemId, setActiveProblemId] = useState<string>('scaling');
  const activeProblem = ENTERPRISE_PROBLEMS.find(p => p.id === activeProblemId) || ENTERPRISE_PROBLEMS[0];

  return (
    <section id="the-problem" className="relative py-24 md:py-36 px-6 md:px-12 lg:px-16 bg-[#07080C] border-t border-[#E5C388]/15">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#E5C388]/15 pb-6 gap-4">
          <div>
            <div className="flex items-center gap-2 font-mono-tech text-xs tracking-widest text-[#E5C388] uppercase mb-2">
              <span>03 // THE PROBLEM</span>
              <span>•</span>
              <span>SYSTEMIC FAILURE MODES</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#F7F5F0] uppercase font-sans">
              WHERE ORGANIZATIONAL SYSTEMS BREAK DOWN
            </h2>
          </div>
          <p className="max-w-md text-sm text-[#D4CEBF] font-mono-tech">
            Interactive Diagnostic Engine: Select a failure domain to inspect typical breakdown points versus Jupiter’s engineered remedies.
          </p>
        </div>

        {/* Interactive Diagnostic System */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Domain Selector Tabs */}
          <div className="lg:col-span-4 flex flex-col space-y-3">
            {ENTERPRISE_PROBLEMS.map((prob, idx) => {
              const isActive = prob.id === activeProblemId;
              return (
                <button
                  key={prob.id}
                  onClick={() => setActiveProblemId(prob.id)}
                  data-cursor-text="INSPECT"
                  className={`p-5 rounded-lg text-left transition-system border relative group ${
                    isActive
                      ? 'bg-[#141824] border-[#E5C388]/45 shadow-xl shadow-black/50'
                      : 'bg-[#0B0D14]/70 border-white/5 hover:border-[#E5C388]/25 hover:bg-[#101420]'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="problem-active-indicator"
                      transition={transitionSpring}
                      className="absolute left-0 top-0 bottom-0 w-1 bg-[#E5C388] rounded-l-lg shadow-[0_0_8px_rgba(229,195,136,0.8)]"
                    />
                  )}
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-mono-tech text-xs text-slate-400 group-hover:text-[#E5C388] transition-colors">
                      DOMAIN 0{idx + 1}
                    </span>
                    <span className={`text-[10px] font-mono-tech uppercase px-2 py-0.5 rounded ${
                      isActive ? 'bg-[#E5C388]/15 text-[#FFF5E4] border border-[#E5C388]/30 font-semibold' : 'text-slate-400'
                    }`}>
                      {prob.id}
                    </span>
                  </div>
                  <h3 className={`text-lg font-semibold tracking-wide transition-colors ${
                    isActive ? 'text-[#FFF8EE]' : 'text-slate-300 group-hover:text-[#FFF5E4]'
                  }`}>
                    {prob.name}
                  </h3>
                  <p className="text-xs text-slate-400 mt-2 line-clamp-2">
                    {prob.challenge}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Right: Architectural Diagnostic Stage */}
          <div className="lg:col-span-8 card-luxury rounded-xl p-6 md:p-10 shadow-2xl relative overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeProblem.id}
                variants={verticalStepVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="space-y-8"
              >
                {/* Active Header */}
                <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#E5C388]/15">
                  <div>
                    <span className="font-mono-tech text-xs text-[#E5C388] tracking-wider uppercase">
                      DIAGNOSTIC ANALYSIS // {activeProblem.name}
                    </span>
                    <h3 className="text-2xl font-bold text-[#F7F5F0] mt-1 font-sans">
                      {activeProblem.name}
                    </h3>
                  </div>
                  <div className="px-3 py-1 rounded bg-[#E5C388]/10 border border-[#E5C388]/25 text-xs font-mono-tech text-[#E5C388]">
                    DIAGNOSTIC STATUS: RESOLVABLE
                  </div>
                </div>

                {/* Challenge description */}
                <div className="p-4 rounded bg-[#0A0D15]/80 border border-[#E5C388]/10">
                  <span className="font-mono-tech text-xs text-[#E5C388] uppercase tracking-wider block mb-1">
                    UNDERLYING ARCHITECTURAL SORE POINT
                  </span>
                  <p className="text-sm md:text-base text-[#D4CEBF] leading-relaxed font-sans">
                    {activeProblem.challenge}
                  </p>
                </div>

                {/* Two-part Diagnostic Comparison */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Traditional Failure Mode */}
                  <div className="p-6 rounded-lg bg-rose-950/15 border border-rose-500/25 space-y-4">
                    <div className="flex items-center gap-2 text-rose-300 font-mono-tech text-xs tracking-wider uppercase">
                      <AlertTriangle className="w-4 h-4 text-rose-400" />
                      <span>TRADITIONAL FAILURE MODE</span>
                    </div>
                    <p className="text-sm text-slate-300 leading-relaxed font-sans">
                      {activeProblem.traditionalFailureMode}
                    </p>
                    <div className="pt-2 border-t border-rose-500/15 flex items-center justify-between text-[11px] font-mono-tech text-rose-300/80">
                      <span>OUTCOME:</span>
                      <span>HIGH OPERATIONAL RISK</span>
                    </div>
                  </div>

                  {/* Jupiter Engineered Remedy */}
                  <div className="p-6 rounded-lg bg-emerald-950/20 border border-emerald-500/30 space-y-4 shadow-xs">
                    <div className="flex items-center gap-2 text-emerald-300 font-mono-tech text-xs tracking-wider uppercase font-semibold">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>JUPITER ENGINEERED REMEDY</span>
                    </div>
                    <p className="text-sm text-[#EDE8DF] leading-relaxed font-sans">
                      {activeProblem.jupiterEngineeredRemedy}
                    </p>
                    <div className="pt-2 border-t border-emerald-500/20 flex items-center justify-between text-[11px] font-mono-tech text-emerald-300">
                      <span>RESULT:</span>
                      <span className="font-semibold">DETERMINISTIC STABILITY</span>
                    </div>
                  </div>
                </div>

                {/* Technical Impact Banner */}
                <div className="p-4 rounded-lg bg-[#0F131E] border border-[#E5C388]/20 flex items-start gap-4">
                  <div className="p-2 rounded bg-[#E5C388]/10 border border-[#E5C388]/30 text-[#E5C388] mt-0.5">
                    <Zap className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="text-xs font-mono-tech uppercase tracking-wider text-[#E5C388] mb-1">
                      MEASURABLE ARCHITECTURAL IMPACT
                    </h5>
                    <p className="text-sm text-[#D4CEBF] font-sans">
                      {activeProblem.technicalImpact}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
