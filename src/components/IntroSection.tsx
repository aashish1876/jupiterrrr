import React from 'react';
import { motion } from 'motion/react';
import { Terminal, ArrowRight } from 'lucide-react';
import { COMPANY_DETAILS } from '../data/jupiterData';
import { subtleUpwardFadeVariants } from '../utils/motion';

export const IntroSection: React.FC = () => {
  return (
    <section id="what-we-do" className="relative py-24 md:py-32 px-6 md:px-12 lg:px-16 bg-[#07080C] border-t border-white/[0.06] overflow-hidden">
      {/* Subtle blueprint grid overlay */}
      <div className="absolute inset-0 grid-blueprint opacity-20 pointer-events-none" />

      <motion.div
        variants={subtleUpwardFadeVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.12 }}
        className="relative max-w-7xl mx-auto space-y-16"
      >
        {/* Section Marker */}
        <div className="flex items-center justify-between border-b border-white/[0.06] pb-4">
          <div className="flex items-center gap-3">
            <span className="font-mono-tech text-xs tracking-widest text-[#E5C388]">01 // WHAT JUPITERGENX DOES</span>
            <span className="text-slate-500 font-mono-tech text-xs">•</span>
            <span className="text-slate-300 font-mono-tech text-xs uppercase">INSTITUTIONAL PURPOSE</span>
          </div>
          <span className="font-mono-tech text-xs text-slate-400">SAN FERNANDO, TT // EST. 2015</span>
        </div>

        {/* Large Typography Editorial Moment */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-8 space-y-8">
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#F7F5F0] leading-[1.1] font-sans">
              Technology should empower organizations rather than restrict them.
            </h2>
            <div className="w-20 h-0.5 bg-gradient-to-r from-[#E5C388] to-transparent" />
            <p className="text-lg sm:text-xl text-[#D4CEBF] font-normal leading-relaxed max-w-3xl font-sans">
              Established in 2015 in San Fernando, Trinidad & Tobago, <strong className="text-[#FFF5E4] font-semibold">JupiterGenX AI</strong> is an engineering firm dedicated to building enterprise technology systems that endure. We do not build throwaway prototypes or fragile wrappers. We design, harden, and operate resilient systems that organizations rely on for mission-critical operations.
            </p>
          </div>

          {/* Right Editorial Pillar Card */}
          <div className="lg:col-span-4 card-luxury p-8 rounded-xl space-y-6">
            <div className="flex items-center gap-2 text-[#E5C388] font-mono-tech text-xs tracking-widest uppercase">
              <Terminal className="w-4 h-4" />
              <span>THE JUPITERGENX STANDARD</span>
            </div>

            <div className="space-y-4">
              {COMPANY_DETAILS.corePillars.map((pillar, i) => (
                <div key={pillar} className="flex items-baseline gap-3 pb-3 border-b border-[#E5C388]/10 last:border-0">
                  <span className="font-mono-tech text-xs text-[#E5C388] font-semibold">0{i + 1}</span>
                  <div>
                    <h3 className="text-sm font-semibold text-[#F7F5F0] tracking-wide uppercase font-mono-tech">
                      {pillar}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed font-sans">
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

        {/* Editorial Continuum Transition */}
        <div className="pt-8 border-t border-white/[0.06] grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-5">
            <span className="font-mono-tech text-xs tracking-widest text-[#E5C388] uppercase block mb-1">
              SYSTEMIC ARCHITECTURE
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-[#F7F5F0] font-sans">
              Four Specialized Engineering Disciplines
            </h3>
          </div>
          <div className="md:col-span-7 flex flex-wrap items-center justify-start md:justify-end gap-x-6 gap-y-3 font-mono-tech text-xs">
            {[
              { id: 'service-build', num: '01', name: 'BUILD', desc: 'Custom Software' },
              { id: 'service-intelligence', num: '02', name: 'INTELLIGENCE', desc: 'Applied AI' },
              { id: 'service-transform', num: '03', name: 'TRANSFORM', desc: 'Modernization' },
              { id: 'service-operate', num: '04', name: 'OPERATE', desc: 'Reliability & Cloud' },
            ].map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="group flex items-center gap-1.5 text-[#EDE8DF] hover:text-[#E5C388] transition-colors py-1"
              >
                <span className="text-[#E5C388] font-bold">{s.num} //</span>
                <span className="font-semibold">{s.name}</span>
                <ArrowRight className="w-3 h-3 text-slate-500 group-hover:text-[#E5C388] group-hover:translate-x-0.5 transition-all" />
              </a>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};
