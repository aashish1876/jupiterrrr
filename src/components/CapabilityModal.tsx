import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle2, ArrowUpRight, Terminal } from 'lucide-react';
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
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-slate-900/40 backdrop-blur-md"
      >
        <motion.div
          variants={modalContentVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-3xl bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-10 text-slate-900 shadow-2xl space-y-8 my-8 max-h-[90vh] overflow-y-auto"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="space-y-2 border-b border-slate-100 pb-6 pr-10">
            <div className="flex items-center gap-2 font-mono-tech text-xs uppercase text-[#0071E3] font-semibold">
              <Terminal className="w-4 h-4" />
              <span>TECHNICAL SPECIFICATION // {capability.id}</span>
              <span className="text-slate-300">•</span>
              <span className="text-slate-500">{capability.badge}</span>
            </div>
            <h3 className="text-2xl sm:text-4xl font-bold uppercase font-sans text-slate-900">
              {capability.subtitle}
            </h3>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed mt-2 font-sans">
              {capability.leadParagraph}
            </p>
          </div>

          {/* Core Pillars */}
          <div className="space-y-4">
            <h4 className="font-mono-tech text-xs tracking-wider text-[#0071E3] uppercase font-semibold">
              ARCHITECTURAL FOCUS AREAS
            </h4>
            <div className="space-y-3">
              {capability.pillars.map((pillar, i) => (
                <div key={pillar.title} className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono-tech text-xs font-bold text-[#0071E3]">
                      0{i + 1}
                    </span>
                    <h5 className="text-sm font-semibold text-slate-900 font-sans">
                      {pillar.title}
                    </h5>
                  </div>
                  <p className="text-xs text-slate-600 pl-6 leading-relaxed font-sans">
                    {pillar.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Formal Deliverables */}
          <div className="space-y-3">
            <h4 className="font-mono-tech text-xs tracking-wider text-[#0071E3] uppercase font-semibold">
              ENGINEERED DELIVERABLES
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 font-mono-tech text-xs">
              {capability.deliverables.map((deliv) => (
                <div key={deliv} className="p-3 rounded-xl bg-slate-50 border border-slate-200/60 flex items-center gap-2.5 text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{deliv}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Operational Standard */}
          <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200/80 space-y-1">
            <span className="font-mono-tech text-[10px] uppercase text-slate-500 tracking-wider block font-semibold">
              SERVICE LEVEL OBJECTIVE (SLO) GUARANTEE
            </span>
            <p className="text-xs text-[#0071E3] font-mono-tech font-bold">
              {capability.operationalStandard}
            </p>
          </div>

          {/* Action Footer */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-slate-100">
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-xs font-semibold uppercase text-slate-700 transition-colors cursor-pointer"
            >
              Close Specification
            </button>
            <button
              onClick={() => {
                onClose();
                onOpenInquiry(capability.id);
              }}
              className="px-6 py-2.5 rounded-full bg-[#0071E3] hover:bg-[#0055B8] font-sans text-xs uppercase font-semibold text-white flex items-center gap-2 shadow-md shadow-blue-500/20 transition-all cursor-pointer"
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
