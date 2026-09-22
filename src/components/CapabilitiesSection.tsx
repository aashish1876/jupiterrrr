import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, ArrowRight, Code2, Cpu, RefreshCw, ShieldCheck, Terminal, CheckCircle2 } from 'lucide-react';
import { CAPABILITIES } from '../data/jupiterData';
import { CapabilityItem, ServiceCategory } from '../types';

interface CapabilitiesSectionProps {
  onSelectCapability: (cap: CapabilityItem) => void;
  onOpenInquiry: (category?: ServiceCategory) => void;
}

export const CapabilitiesSection: React.FC<CapabilitiesSectionProps> = ({
  onSelectCapability,
  onOpenInquiry
}) => {
  const [activeTab, setActiveTab] = useState<ServiceCategory>('BUILD');

  const disciplineIcons = {
    BUILD: Code2,
    INTELLIGENCE: Cpu,
    TRANSFORM: RefreshCw,
    OPERATE: ShieldCheck,
  };

  return (
    <section id="capabilities" className="relative py-28 md:py-40 px-6 md:px-12 lg:px-16 bg-[#FFFFFF] border-t border-black/[0.06]">
      <div className="max-w-7xl mx-auto space-y-20">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-black/[0.08] pb-6 gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 font-mono-tech text-xs tracking-wider text-[#0071E3] uppercase font-bold">
              <span>02 // CORE DISCIPLINES</span>
              <span className="text-slate-300">•</span>
              <span className="text-[#667085]">ENGINEERED CONTINUUM</span>
            </div>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#0B0D12] uppercase font-sans">
              Four Core Disciplines.
            </h2>
          </div>
          <p className="max-w-md text-sm text-[#667085] font-sans leading-relaxed">
            Specialized engineering divisions operating as an integrated continuum: from bespoke software creation and applied intelligence, to enterprise modernization and high-availability cloud operations.
          </p>
        </div>

        {/* Four Distinct Editorial Showcase Blocks */}
        <div className="space-y-16">
          {CAPABILITIES.map((cap, index) => {
            const anchorId = `service-${cap.id.toLowerCase()}`;
            const Icon = disciplineIcons[cap.id] || Code2;
            const isEven = index % 2 === 0;

            return (
              <div
                key={cap.id}
                id={anchorId}
                className="scroll-mt-28 p-8 sm:p-12 rounded-3xl bg-[#F7F9FC] border border-black/[0.07] shadow-xs relative overflow-hidden space-y-8"
              >
                {/* Discipline Tag & Index */}
                <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-black/[0.06]">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#0071E3]/10 flex items-center justify-center text-[#0071E3]">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="font-mono-tech text-xs text-[#0071E3] font-bold tracking-wider">
                      DISCIPLINE 0{index + 1} //
                    </span>
                    <span className="font-mono-tech text-xs text-slate-500 uppercase tracking-wider font-semibold">
                      {cap.badge}
                    </span>
                  </div>

                  <span className="font-mono-tech text-xs text-slate-400 bg-white px-3 py-1 rounded-full border border-black/[0.05]">
                    SLO: {cap.operationalStandard.split(' ')[0]} {cap.operationalStandard.split(' ')[1]}
                  </span>
                </div>

                {/* Main Content Grid: Text & Interactive Deep-Dive Preview */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  {/* Left Column: Typography & Narrative */}
                  <div className="lg:col-span-7 space-y-6">
                    <div className="space-y-1">
                      <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#0B0D12] uppercase font-sans">
                        <span className="text-[#0071E3]">{cap.id}</span>
                        <span className="text-slate-400 font-normal ml-3 text-2xl sm:text-3xl lowercase">
                          / {cap.subtitle}
                        </span>
                      </h3>
                    </div>

                    <p className="text-base sm:text-lg text-[#667085] font-sans leading-relaxed">
                      {cap.descriptor} {cap.leadParagraph}
                    </p>

                    {/* Technology Focus Pills */}
                    <div className="space-y-2 pt-2">
                      <span className="font-mono-tech text-[11px] text-slate-400 uppercase tracking-wider block">
                        CORE ENGINEERING STACK & METHODOLOGY
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {cap.techFocus.map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 rounded-full text-xs font-mono-tech bg-white text-slate-700 border border-black/[0.07] shadow-2xs"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap items-center gap-3 pt-4">
                      <button
                        onClick={() => onSelectCapability(cap)}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#0B0D12] hover:bg-[#0071E3] text-white text-xs font-semibold uppercase tracking-wider transition-colors duration-150 group cursor-pointer shadow-xs"
                      >
                        <span>Inspect {cap.id} Specifications</span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                      </button>

                      <button
                        onClick={() => onOpenInquiry(cap.id)}
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white hover:bg-slate-100/80 border border-black/[0.08] text-slate-800 text-xs font-semibold uppercase tracking-wider transition-colors duration-150 cursor-pointer"
                      >
                        <span>Request Briefing</span>
                        <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                      </button>
                    </div>
                  </div>

                  {/* Right Column: Architectural Focus Areas Card */}
                  <div className="lg:col-span-5 bg-white rounded-2xl p-6 border border-black/[0.07] shadow-2xs space-y-4">
                    <span className="font-mono-tech text-xs text-[#0071E3] uppercase font-bold tracking-wider block pb-2 border-b border-slate-100">
                      KEY DELIVERABLES & GUARANTEES
                    </span>

                    <div className="space-y-3">
                      {cap.pillars.map((pillar, pIdx) => (
                        <div key={pillar.title} className="space-y-1 pb-3 border-b border-slate-100 last:border-0 last:pb-0">
                          <div className="flex items-center gap-2">
                            <span className="font-mono-tech text-xs text-[#0071E3] font-bold">
                              0{pIdx + 1}
                            </span>
                            <h4 className="text-xs font-bold text-[#0B0D12] uppercase font-sans">
                              {pillar.title}
                            </h4>
                          </div>
                          <p className="text-xs text-[#667085] pl-6 leading-relaxed font-sans">
                            {pillar.description}
                          </p>
                        </div>
                      ))}
                    </div>

                    <div className="pt-2">
                      <div className="p-3 rounded-xl bg-blue-50/60 border border-blue-200/60 flex items-center gap-2 text-xs font-mono-tech text-[#0071E3]">
                        <CheckCircle2 className="w-4 h-4 text-[#0071E3] shrink-0" />
                        <span>{cap.operationalStandard}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
