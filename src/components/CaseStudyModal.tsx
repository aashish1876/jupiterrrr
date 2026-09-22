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
          <div className="space-y-3 border-b border-[#E5C388]/15 pb-6 pr-10">
            <div className="flex items-center gap-3 font-mono-tech text-xs text-[#E5C388] uppercase font-semibold">
              <Terminal className="w-4 h-4" />
              <span>ARCHITECTURAL REPORT // {caseStudy.id}</span>
              <span>•</span>
              <span>{caseStudy.classification}</span>
            </div>
            <h3 className="text-2xl sm:text-4xl font-bold uppercase font-sans leading-tight text-[#F7F5F0]">
              {caseStudy.headline}
            </h3>
            <p className="text-xs font-mono-tech text-[#D4CEBF]">
              OPERATIONAL DOMAIN: {caseStudy.domain}
            </p>
          </div>

          {/* Context */}
          <div className="space-y-2">
            <h4 className="font-mono-tech text-xs tracking-widest text-[#E5C388] uppercase font-semibold">
              SYSTEM CONTEXT
            </h4>
            <p className="text-[#D4CEBF] text-sm sm:text-base leading-relaxed font-sans">
              {caseStudy.context}
            </p>
          </div>

          {/* Challenge & Engineering Approach */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-xl bg-[#0E121E] border border-amber-500/30 space-y-2">
              <div className="flex items-center gap-2 text-amber-400 font-mono-tech text-xs uppercase font-semibold">
                <ShieldAlert className="w-4 h-4" />
                <span>ARCHITECTURAL BOTTLENECK</span>
              </div>
              <p className="text-xs sm:text-sm text-[#D4CEBF] leading-relaxed font-sans">
                {caseStudy.architecturalChallenge}
              </p>
            </div>

            <div className="p-5 rounded-xl bg-[#141825] border border-[#E5C388]/30 space-y-2">
              <div className="flex items-center gap-2 text-[#E5C388] font-mono-tech text-xs uppercase font-semibold">
                <Cpu className="w-4 h-4 text-[#E5C388]" />
                <span>JUPITER REMEDY</span>
              </div>
              <p className="text-xs sm:text-sm text-[#EDE8DF] leading-relaxed font-sans">
                {caseStudy.engineeringApproach}
              </p>
            </div>
          </div>

          {/* Technical Execution Stack */}
          <div className="space-y-3">
            <h4 className="font-mono-tech text-xs tracking-widest text-[#E5C388] uppercase font-semibold">
              IMPLEMENTATION SPECIFICATION
            </h4>
            <div className="space-y-2">
              {caseStudy.technicalExecution.map((tech, idx) => (
                <div key={idx} className="p-3 rounded-lg bg-[#0F1320] border border-[#E5C388]/15 flex items-start gap-2.5 text-xs text-[#EDE8DF] font-mono-tech">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{tech}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Impact Statement */}
          <div className="p-5 rounded-xl bg-[#0F1320] border border-emerald-500/30 space-y-1">
            <span className="font-mono-tech text-[10px] uppercase text-emerald-400 tracking-wider block font-semibold">
              OPERATIONAL RELIABILITY MEASUREMENT
            </span>
            <p className="text-sm text-[#F7F5F0] font-medium font-sans">
              {caseStudy.systemReliabilityImpact}
            </p>
          </div>

          {/* Action Footer */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-[#E5C388]/15">
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded bg-[#121622] hover:bg-[#181E30] border border-[#E5C388]/20 text-xs font-mono-tech uppercase text-[#EDE8DF] transition-colors"
            >
              Close Report
            </button>
            <button
              onClick={() => {
                onClose();
                onOpenInquiry();
              }}
              className="px-6 py-2.5 rounded bg-gradient-to-r from-[#E5C388] via-[#DFC28E] to-[#C5A059] hover:brightness-110 font-mono-tech text-xs uppercase font-bold text-[#0A0D12] flex items-center gap-2 shadow-lg shadow-amber-950/40 transition-all"
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
