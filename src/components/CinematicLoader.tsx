import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SYSTEM_EASING, DURATION } from '../motion';

interface CinematicLoaderProps {
  onComplete: () => void;
}

export const CinematicLoader: React.FC<CinematicLoaderProps> = ({ onComplete }) => {
  const [stepIndex, setStepIndex] = useState(0);
  const words = ['JUPITERGENX AI', 'SYSTEMS', 'ENGINEERING', 'WE BUILD SYSTEMS THAT LAST.'];

  useEffect(() => {
    // Crisp, fast sequence ~0.9s max
    const timers = [
      setTimeout(() => setStepIndex(1), 180),
      setTimeout(() => setStepIndex(2), 380),
      setTimeout(() => setStepIndex(3), 600),
      setTimeout(() => {
        onComplete();
      }, 920)
    ];

    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        key="loader"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, filter: 'blur(10px)' }}
        transition={{ duration: DURATION.normal, ease: SYSTEM_EASING }}
        onClick={onComplete}
        className="fixed inset-0 z-50 flex flex-col justify-between bg-[#07080C] p-8 md:p-14 text-[#EDE8DF] select-none cursor-pointer"
      >
        {/* Top bar */}
        <div className="flex items-center justify-between border-b border-[#E5C388]/15 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-2 rounded-full h-2 bg-[#E5C388] shadow-[0_0_10px_rgba(229,195,136,0.8)]" />
            <span className="font-mono-tech text-xs tracking-widest text-[#E5C388] uppercase">
              JUPITERGENX AI // SAN FERNANDO, TT
            </span>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onComplete();
            }}
            className="font-mono-tech text-xs tracking-widest text-[#E5C388] hover:text-[#FFF5E4] transition-colors uppercase px-3 py-1 rounded border border-[#E5C388]/30 hover:border-[#E5C388] bg-[#E5C388]/10"
          >
            ENTER SITE →
          </button>
        </div>

        {/* Center typography sequence */}
        <div className="flex flex-col justify-center items-start max-w-5xl">
          <div className="font-mono-tech text-xs text-[#E5C388] mb-4 tracking-widest uppercase">
            EST. 2015 // SAN FERNANDO, TT
          </div>
          <div className="overflow-hidden min-h-[90px] md:min-h-[140px] flex items-center">
            <motion.h1
              key={stepIndex}
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -30, opacity: 0 }}
              transition={{ duration: DURATION.fast, ease: SYSTEM_EASING }}
              className="text-3xl sm:text-5xl md:text-7xl font-bold tracking-tight text-[#F7F5F0] leading-none uppercase font-sans"
            >
              {stepIndex === 3 ? (
                <span className="metallic-gold-text">{words[stepIndex]}</span>
              ) : (
                words[stepIndex]
              )}
            </motion.h1>
          </div>
        </div>

        {/* Bottom progress track */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs font-mono-tech text-slate-400">
            <span className="text-slate-400">ENTERPRISE ARCHITECTURE RUNTIME</span>
            <span className="text-[#E5C388] font-semibold">{Math.min(100, (stepIndex + 1) * 25)}%</span>
          </div>
          <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden border border-[#E5C388]/10">
            <motion.div
              className="h-full bg-gradient-to-r from-[#9F8247] via-[#E5C388] to-[#FFF5E4]"
              initial={{ width: '0%' }}
              animate={{ width: `${Math.min(100, (stepIndex + 1) * 25)}%` }}
              transition={{ duration: 0.25, ease: 'linear' }}
            />
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
