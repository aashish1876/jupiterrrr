import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle2, ArrowUpRight, Terminal, Shield, Layers } from 'lucide-react';
import { CapabilityItem } from '../types';
import { modalBackdropVariants, modalContentVariants } from '../utils/motion';

interface CapabilityModalProps {
  capability: CapabilityItem | null;
  onClose: () => void;
  onOpenInquiry: (category: string) => void;
}

export const CapabilityModal: React.FC<CapabilityModalProps> = ({
  capability,
  onClose,
  onOpenInquiry
}) => {
  if (!capability) return null;

  return (
    <AnimatePresence>
      <motion.div
        variants={modalBackdropVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        onClick={onClose}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-md"
      >
        <motion.div
          variants={modalContentVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-3xl card-luxury rounded-2xl p-6 sm:p-10 text-[#EDE8DF] shadow-2xl space-y-8 my-8 max-h-[90vh] overflow-y-auto"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-lg bg-[#121622] hover:bg-[#181E30] text-slate-400 hover:text-white border border-[#E5C388]/20 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="space-y-2 border-b border-[#E5C388]/15 pb-6 pr-10">
            <div className="flex items-center gap-2 font-mono-tech text-xs uppercase" style={{ color: capability.accentColor }}>
              <Terminal className="w-4 h-4" />
              <span>TECHNICAL SPECIFICATION // {capability.id}</span>
              <span>•</span>
              <span>{capability.badge}</span>
            </div>
            <h3 className="text-2xl sm:text-4xl font-bold uppercase font-sans text-[#F7F5F0]">
              {capability.subtitle}
            </h3>
            <p className="text-[#D4CEBF] text-sm sm:text-base leading-relaxed mt-2 font-sans">
              {capability.leadParagraph}
            </p>
          </div>

          {/* Core Pillars */}
          <div className="space-y-4">
            <h4 className="font-mono-tech text-xs tracking-widest text-[#E5C388] uppercase font-semibold">
              ARCHITECTURAL FOCUS AREAS
            </h4>
            <div className="space-y-3">
              {capability.pillars.map((pillar, i) => (
                <div key={pillar.title} className="p-4 rounded-lg bg-[#0E121E] border border-[#E5C388]/15 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono-tech text-xs font-semibold" style={{ color: capability.accentColor }}>
                      0{i + 1}
                    </span>
                    <h5 className="text-sm font-semibold text-[#F7F5F0] font-sans">
                      {pillar.title}
                    </h5>
                  </div>
                  <p className="text-xs text-[#D4CEBF] pl-6 leading-relaxed font-sans">
                    {pillar.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Formal Deliverables */}
          <div className="space-y-3">
            <h4 className="font-mono-tech text-xs tracking-widest text-[#E5C388] uppercase font-semibold">
              ENGINEERED DELIVERABLES
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 font-mono-tech text-xs">
              {capability.deliverables.map((deliv) => (
                <div key={deliv} className="p-3 rounded-lg bg-[#0F1320] border border-[#E5C388]/15 flex items-center gap-2 text-[#EDE8DF]">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{deliv}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Operational Standard */}
          <div className="p-4 rounded-lg bg-[#141825] border border-[#E5C388]/25 space-y-1">
            <span className="font-mono-tech text-[10px] uppercase text-slate-400 tracking-wider block">
              SERVICE LEVEL OBJECTIVE (SLO) GUARANTEE
            </span>
            <p className="text-xs text-[#E5C388] font-mono-tech font-semibold">
              {capability.operationalStandard}
            </p>
          </div>

          {/* Action Footer */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-[#E5C388]/15">
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded bg-[#121622] hover:bg-[#181E30] border border-[#E5C388]/20 text-xs font-mono-tech uppercase text-[#EDE8DF] transition-colors"
            >
              Close Specification
            </button>
            <button
              onClick={() => {
                onClose();
                onOpenInquiry(capability.id);
              }}
              className="px-6 py-2.5 rounded font-mono-tech text-xs uppercase font-bold text-[#0A0D12] flex items-center gap-2 shadow-lg hover:brightness-110 transition-all"
              style={{ backgroundColor: capability.accentColor }}
            >
              <span>Consult on {capability.id} Architecture</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
