import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { CAPABILITIES } from '../data/jupiterData';
import { CapabilityItem, ServiceCategory } from '../types';
import { subtleUpwardFadeVariants } from '../utils/motion';

interface CapabilitiesSectionProps {
  onSelectCapability: (cap: CapabilityItem) => void;
  onOpenInquiry: (category?: ServiceCategory) => void;
}

export const CapabilitiesSection: React.FC<CapabilitiesSectionProps> = ({
  onSelectCapability
}) => {
  return (
    <section id="capabilities" className="relative py-24 md:py-32 px-6 md:px-12 lg:px-16 bg-[#07080C] border-t border-white/[0.06]">
      <div className="max-w-6xl mx-auto space-y-20">
        {/* Section Header */}
        <motion.div
          variants={subtleUpwardFadeVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="space-y-4 max-w-3xl"
        >
          <div className="inline-flex items-center gap-2 font-mono-tech text-xs tracking-widest text-[#E5C388] uppercase">
            <span>02 // CORE SERVICES</span>
            <span>•</span>
            <span>THE FOUR DISCIPLINES</span>
          </div>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-[#F7F5F0] uppercase font-sans">
            ENGINEERED DISCIPLINES
          </h2>
          <p className="text-base sm:text-lg text-[#D4CEBF] font-sans leading-relaxed">
            Four specialized engineering divisions structured as a unified continuum: from bespoke systems creation and applied intelligence, to enterprise modernization and high-availability cloud operations.
          </p>
        </motion.div>

        {/* Four Full-Width Editorial Blocks - Subtle Upward Fade-In */}
        <div className="divide-y divide-white/[0.08]">
          {CAPABILITIES.map((cap, index) => {
            const anchorId = `service-${cap.id.toLowerCase()}`;
            return (
              <motion.article
                key={cap.id}
                id={anchorId}
                variants={subtleUpwardFadeVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.12 }}
                className="scroll-mt-28 py-14 sm:py-18 md:py-20 first:pt-0 last:pb-0 space-y-6"
              >
                {/* Discipline Tag & Index */}
                <div className="flex items-center gap-3 font-mono-tech text-xs">
                  <span className="text-[#E5C388] font-bold tracking-widest">
                    0{index + 1} //
                  </span>
                  <span className="text-slate-400 uppercase tracking-wider">
                    {cap.badge}
                  </span>
                </div>

                {/* Large, Elegant Typography Headline */}
                <div className="space-y-2">
                  <h3 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-[#F7F5F0] uppercase font-sans">
                    <span className="text-[#E5C388]">{cap.id}</span>
                    <span className="text-slate-400 font-light ml-3 sm:ml-5">/ {cap.subtitle}</span>
                  </h3>
                </div>

                {/* Short, High-Impact Descriptive Text */}
                <p className="max-w-3xl text-base sm:text-lg text-[#D4CEBF] font-sans leading-relaxed">
                  {cap.descriptor} {cap.leadParagraph}
                </p>

                {/* Single Elegant Call-To-Action Button */}
                <div className="pt-2">
                  <button
                    onClick={() => onSelectCapability(cap)}
                    className="inline-flex items-center gap-2.5 px-6 py-3 rounded bg-[#11141D] hover:bg-[#181D2A] border border-[#E5C388]/30 hover:border-[#E5C388]/70 text-xs font-mono-tech uppercase font-bold text-[#F7F5F0] hover:text-white transition-colors group cursor-pointer"
                  >
                    <span>Inspect {cap.id} Specifications</span>
                    <ArrowUpRight className="w-4 h-4 text-[#E5C388] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </button>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
