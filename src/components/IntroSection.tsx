import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, ShieldCheck, Cpu, Code2, RefreshCw } from 'lucide-react';
import { COMPANY_DETAILS } from '../data/jupiterData';

export const IntroSection: React.FC = () => {
  const metrics = [
    { value: '10+ Years', label: 'Continuous Enterprise Delivery', note: 'Est. 2015 // San Fernando, TT' },
    { value: '99.999%', label: 'Target Availability SLA', note: 'Deterministic uptime standard' },
    { value: 'Zero-Loss', label: 'Migration Protocol', note: 'Verified zero-data loss cutovers' },
    { value: '9 Tiers', label: 'End-to-End Hierarchy', note: 'Hardware through applied AI' },
  ];

  return (
    <section id="what-we-do" className="relative py-28 md:py-40 px-6 md:px-12 lg:px-16 bg-[#F7F9FC] border-t border-black/[0.06] overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-20">
        {/* Top Section Marker */}
        <div className="flex items-center justify-between border-b border-black/[0.08] pb-4">
          <div className="flex items-center gap-3">
            <span className="font-mono-tech text-xs tracking-wider text-[#0071E3] font-bold">
              01 // INSTITUTIONAL PURPOSE
            </span>
            <span className="text-slate-300 font-mono-tech text-xs">•</span>
            <span className="text-[#667085] font-mono-tech text-xs uppercase tracking-wider">
              PHILOSOPHY & METRICS
            </span>
          </div>
          <span className="font-mono-tech text-xs text-slate-400">
            SAN FERNANDO, TT // EST. 2015
          </span>
        </div>

        {/* Massive Editorial Typographic Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Bold Editorial Statement */}
          <div className="lg:col-span-7 space-y-8">
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#0B0D12] leading-[1.08] font-sans">
              Technology should empower organizations rather than restrict them.
            </h2>
            
            <div className="w-14 h-1 bg-[#0071E3] rounded-full" />

            <div className="space-y-5 text-base sm:text-lg text-[#667085] font-normal leading-relaxed font-sans max-w-2xl">
              <p>
                Established in 2015 in San Fernando, Trinidad & Tobago, <strong className="text-[#0B0D12] font-semibold">JupiterGenX AI</strong> is an engineering firm dedicated to building enterprise technology systems that endure.
              </p>
              <p>
                We do not build throwaway prototypes, fragile wrapper applications, or unvetted experiments. We design, harden, and operate mission-critical architectures that industrial institutions, energy trading desks, and government bodies rely upon for uninterrupted operations.
              </p>
            </div>

            {/* Disciplines Continuum Quick Navigation */}
            <div className="pt-4 flex flex-wrap gap-2.5">
              {[
                { id: 'service-build', num: '01', name: 'BUILD' },
                { id: 'service-intelligence', num: '02', name: 'INTELLIGENCE' },
                { id: 'service-transform', num: '03', name: 'TRANSFORM' },
                { id: 'service-operate', num: '04', name: 'OPERATE' },
              ].map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white hover:bg-slate-100/80 border border-black/[0.07] text-xs font-mono-tech text-slate-800 hover:text-[#0071E3] transition-colors shadow-2xs"
                >
                  <span className="text-[#0071E3] font-bold">{s.num}</span>
                  <span className="font-semibold">{s.name}</span>
                  <ArrowRight className="w-3 h-3 text-slate-400" />
                </a>
              ))}
            </div>
          </div>

          {/* Right Column: High-Impact Metric Blocks & Core Pillars */}
          <div className="lg:col-span-5 space-y-8">
            {/* 2x2 Metric Matrix */}
            <div className="grid grid-cols-2 gap-4">
              {metrics.map((m) => (
                <div
                  key={m.label}
                  className="p-5 rounded-2xl bg-white border border-black/[0.07] shadow-2xs space-y-1.5"
                >
                  <span className="font-mono-tech text-2xl sm:text-3xl font-bold text-[#0071E3] block">
                    {m.value}
                  </span>
                  <span className="text-xs font-semibold text-[#0B0D12] block font-sans">
                    {m.label}
                  </span>
                  <span className="text-[11px] text-[#667085] block font-mono-tech">
                    {m.note}
                  </span>
                </div>
              ))}
            </div>

            {/* Foundational Pillars Typographic Ledger */}
            <div className="p-6 sm:p-7 rounded-2xl bg-white border border-black/[0.07] shadow-2xs space-y-4">
              <span className="font-mono-tech text-xs tracking-wider text-[#0071E3] uppercase font-bold block pb-2 border-b border-slate-100">
                THE JUPITERGENX ENGINEERING DOCTRINE
              </span>

              <div className="space-y-3.5">
                {COMPANY_DETAILS.corePillars.map((pillar, i) => (
                  <div key={pillar} className="flex items-start gap-3">
                    <span className="font-mono-tech text-xs text-[#0071E3] font-bold mt-0.5">
                      0{i + 1}
                    </span>
                    <div>
                      <h3 className="text-xs font-bold text-[#0B0D12] uppercase font-sans">
                        {pillar}
                      </h3>
                      <p className="text-xs text-[#667085] mt-0.5 leading-relaxed font-sans">
                        {i === 0 && 'Deterministic architecture, type-safety, and stateless execution.'}
                        {i === 1 && 'Applied machine intelligence as repeatable, auditable software.'}
                        {i === 2 && 'Zero-downtime infrastructure and verified disaster recovery.'}
                        {i === 3 && 'Orderly modernization of foundational legacy assets.'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
