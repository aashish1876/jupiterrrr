import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle2, ShieldAlert, Cpu, Terminal, ArrowUpRight } from 'lucide-react';
import { ArchitecturalCaseStudy } from '../types';
import { modalBackdropVariants, modalContentVariants } from '../utils/motion';

interface CaseStudyModalProps {
  caseStudy: ArchitecturalCaseStudy | null;
  onClose: () => void;
  onOpenInquiry: () => void;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({
  caseStudy,
  onClose,
  onOpenInquiry
}) => {
  if (!caseStudy) return null;

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
          <div className="space-y-3 border-b border-slate-100 pb-6 pr-10">
            <div className="flex items-center gap-2 font-mono-tech text-xs text-[#0071E3] uppercase font-semibold">
              <Terminal className="w-4 h-4" />
              <span>ARCHITECTURAL REPORT // {caseStudy.id}</span>
              <span className="text-slate-300">•</span>
              <span className="text-slate-500">{caseStudy.classification}</span>
            </div>
            <h3 className="text-2xl sm:text-4xl font-bold uppercase font-sans leading-tight text-slate-900">
              {caseStudy.headline}
            </h3>
            <p className="text-xs font-mono-tech text-slate-500">
              OPERATIONAL DOMAIN: {caseStudy.domain}
            </p>
          </div>

          {/* Context */}
          <div className="space-y-2">
            <h4 className="font-mono-tech text-xs tracking-wider text-[#0071E3] uppercase font-semibold">
              SYSTEM CONTEXT
            </h4>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-sans">
              {caseStudy.context}
            </p>
          </div>

          {/* Challenge & Engineering Approach */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-xl bg-amber-50/60 border border-amber-200/80 space-y-2">
              <div className="flex items-center gap-2 text-amber-800 font-mono-tech text-xs uppercase font-semibold">
                <ShieldAlert className="w-4 h-4 text-amber-600" />
                <span>ARCHITECTURAL BOTTLENECK</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-sans">
                {caseStudy.architecturalChallenge}
              </p>
            </div>

            <div className="p-5 rounded-xl bg-blue-50/60 border border-blue-200/80 space-y-2">
              <div className="flex items-center gap-2 text-[#0071E3] font-mono-tech text-xs uppercase font-semibold">
                <Cpu className="w-4 h-4 text-[#0071E3]" />
                <span>JUPITER REMEDY</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-sans">
                {caseStudy.engineeringApproach}
              </p>
            </div>
          </div>

          {/* Technical Execution Stack */}
          <div className="space-y-3">
            <h4 className="font-mono-tech text-xs tracking-wider text-[#0071E3] uppercase font-semibold">
              IMPLEMENTATION SPECIFICATION
            </h4>
            <div className="space-y-2">
              {caseStudy.technicalExecution.map((tech, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-200/60 flex items-start gap-2.5 text-xs text-slate-700 font-mono-tech">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{tech}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Impact Statement */}
          <div className="p-5 rounded-xl bg-emerald-50/60 border border-emerald-200/80 space-y-1">
            <span className="font-mono-tech text-[10px] uppercase text-emerald-800 tracking-wider block font-semibold">
              OPERATIONAL RELIABILITY MEASUREMENT
            </span>
            <p className="text-sm text-slate-800 font-medium font-sans">
              {caseStudy.systemReliabilityImpact}
            </p>
          </div>

          {/* Action Footer */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-slate-100">
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-xs font-semibold uppercase text-slate-700 transition-colors cursor-pointer"
            >
              Close Report
            </button>
            <button
              onClick={() => {
                onClose();
                onOpenInquiry();
              }}
              className="px-6 py-2.5 rounded-full bg-[#0071E3] hover:bg-[#0055B8] font-sans text-xs uppercase font-semibold text-white flex items-center gap-2 shadow-md shadow-blue-500/20 transition-all cursor-pointer"
            >
              <span>Consult on Similar Architecture</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
