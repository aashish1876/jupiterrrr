import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Layers, ShieldCheck, Cpu, Database, Network, Server, ArrowDown, ChevronRight, Lock } from 'lucide-react';
import { TECH_ECOSYSTEM_LAYERS } from '../data/jupiterData';
import { ArchitectureLayer } from '../types';
import { verticalStepVariants } from '../utils/motion';

export const TechEcosystemSection: React.FC = () => {
  const [selectedLayerId, setSelectedLayerId] = useState<string>(TECH_ECOSYSTEM_LAYERS[2].id); // default to Compute
  const selectedLayer = TECH_ECOSYSTEM_LAYERS.find(l => l.id === selectedLayerId) || TECH_ECOSYSTEM_LAYERS[0];

  return (
    <section id="technology" className="relative py-24 md:py-36 px-6 md:px-12 lg:px-16 bg-[#07080C] border-t border-[#E5C388]/15">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#E5C388]/15 pb-6 gap-6">
          <div>
            <div className="flex items-center gap-2 font-mono-tech text-xs tracking-widest text-[#E5C388] uppercase mb-2">
              <span>06 // ARCHITECTURAL STACK</span>
              <span>•</span>
              <span>NO LOGO CLUTTER</span>
            </div>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-[#F7F5F0] uppercase font-sans">
              TECHNOLOGY ECOSYSTEM
            </h2>
          </div>
          <p className="max-w-md text-sm text-[#D4CEBF] font-mono-tech">
            We structure systems into decoupled, verifiable layers. Inspect the stack to view architectural responsibilities and resilience boundaries.
          </p>
        </div>

        {/* Layer Stack Interactive Explorer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Stack Layers Visual Representation */}
          <div className="lg:col-span-6 space-y-3">
            <div className="flex items-center justify-between text-xs font-mono-tech text-slate-400 mb-2 px-1">
              <span>TOP OF STACK (SURFACE)</span>
              <span>SEVEN RESILIENT LAYERS</span>
            </div>

            {/* Render from top level (7) down to bottom level (1) */}
            {[...TECH_ECOSYSTEM_LAYERS].reverse().map((layer) => {
              const isSelected = layer.id === selectedLayerId;
              return (
                <button
                  key={layer.id}
                  onClick={() => setSelectedLayerId(layer.id)}
                  data-cursor-text="LAYER"
                  className={`w-full p-4 rounded-lg text-left transition-system border flex items-center justify-between relative group ${
                    isSelected
                      ? 'bg-[#141825] border-[#E5C388]/70 shadow-lg shadow-amber-950/30 translate-x-2'
                      : 'bg-[#0A0D15]/50 border-white/5 hover:border-[#E5C388]/25 hover:bg-[#101420]'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span className={`font-mono-tech text-xs font-bold w-6 h-6 rounded flex items-center justify-center ${
                      isSelected ? 'bg-gradient-to-r from-[#E5C388] to-[#C5A059] text-[#0A0D12]' : 'bg-[#121622] text-slate-400'
                    }`}>
                      L{layer.level}
                    </span>
                    <div>
                      <h4 className={`text-sm font-semibold tracking-wide font-sans ${
                        isSelected ? 'text-[#FFF8EE]' : 'text-slate-200 group-hover:text-white'
                      }`}>
                        {layer.name}
                      </h4>
                      <p className="text-[11px] text-slate-400 line-clamp-1 font-mono-tech">
                        {layer.role}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="hidden sm:inline text-[10px] font-mono-tech text-slate-400">
                      {layer.components.length} DOMAINS
                    </span>
                    <ChevronRight className={`w-4 h-4 transition-transform ${
                      isSelected ? 'text-[#E5C388] translate-x-1' : 'text-slate-500'
                    }`} />
                  </div>
                </button>
              );
            })}

            <div className="flex items-center justify-between text-xs font-mono-tech text-slate-400 mt-2 px-1">
              <span>BOTTOM OF STACK (PHYSICAL FOUNDATION)</span>
              <span>HARDWARE BOUNDARY</span>
            </div>
          </div>

          {/* Right Column: Layer Detailed Inspection Panel */}
          <div className="lg:col-span-6 card-luxury rounded-2xl p-6 md:p-10 shadow-2xl relative overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedLayer.id}
                variants={verticalStepVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="space-y-6"
              >
                {/* Header */}
                <div className="border-b border-[#E5C388]/15 pb-4">
                  <div className="flex items-center justify-between text-xs font-mono-tech text-[#E5C388] uppercase mb-1">
                    <span>LAYER LEVEL {selectedLayer.level} OF 7</span>
                    <span>ACTIVE INSPECTION</span>
                  </div>
                  <h3 className="text-2xl font-bold text-[#F7F5F0] uppercase font-sans">
                    {selectedLayer.name}
                  </h3>
                  <p className="text-sm font-mono-tech text-slate-400 mt-1">
                    {selectedLayer.role}
                  </p>
                </div>

                {/* Description */}
                <p className="text-sm sm:text-base text-[#D4CEBF] leading-relaxed font-sans">
                  {selectedLayer.description}
                </p>

                {/* Layer Components */}
                <div className="space-y-2">
                  <span className="font-mono-tech text-xs text-slate-400 uppercase tracking-wider block">
                    GOVERNED COMPONENTS
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {selectedLayer.components.map((comp) => (
                      <div
                        key={comp}
                        className="p-3 rounded-lg bg-[#0F121C] border border-[#E5C388]/15 text-xs text-[#EDE8DF] flex items-center gap-2 font-mono-tech"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-[#E5C388]" />
                        <span>{comp}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Resilience Mechanism */}
                <div className="p-5 rounded-lg bg-[#141825]/80 border border-[#E5C388]/25 space-y-2">
                  <div className="flex items-center gap-2 font-mono-tech text-xs tracking-wider text-[#E5C388] uppercase font-semibold">
                    <ShieldCheck className="w-4 h-4 text-[#E5C388]" />
                    <span>FAULT ISOLATION & RESILIENCE MECHANISM</span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#EDE8DF] leading-relaxed font-sans">
                    {selectedLayer.resilienceMechanism}
                  </p>
                </div>

                {/* Security Perimeter Boundary */}
                <div className="p-5 rounded-lg bg-[#0A0D15] border border-white/10 space-y-2">
                  <div className="flex items-center gap-2 font-mono-tech text-xs tracking-wider text-slate-300 uppercase">
                    <Lock className="w-4 h-4 text-[#DFC28E]" />
                    <span>SECURITY BOUNDARY & TRUST ENVELOPE</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                    {selectedLayer.securityBoundary}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
