import React from 'react';
import { motion } from 'motion/react';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { subtleUpwardFadeVariants } from '../utils/motion';
import { MagneticButton } from './MagneticButton';

interface HeroSectionProps {
  onOpenInquiry: (category?: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenInquiry }) => {
  const scrollToCapabilities = () => {
    const el = document.getElementById('capabilities');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      className="relative min-h-[90vh] w-full flex flex-col justify-between pt-28 pb-14 px-6 md:px-12 lg:px-16 overflow-hidden bg-[#07080C]"
      id="hero"
    >
      {/* Zero-Lag atmospheric background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 grid-blueprint opacity-20" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-[radial-gradient(ellipse_at_center,rgba(229,195,136,0.08)_0%,rgba(7,8,12,0)_70%)] pointer-events-none" />
      </div>

      {/* Top Status Strip */}
      <div className="relative z-10 max-w-7xl mx-auto w-full flex items-center justify-between border-b border-white/[0.06] pb-4 text-xs font-mono-tech">
        <div className="flex items-center gap-2.5 text-[#EDE8DF]">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span className="tracking-widest uppercase text-slate-300">
            JUPITERGENX AI // SYSTEMS RUNTIME
          </span>
        </div>
        <span className="hidden sm:inline text-slate-400">
          SAN FERNANDO, TT • EST. 2015
        </span>
      </div>

      {/* Center Hero Content - Perfectly Centered, Subtle Upward Fade-In */}
      <motion.div
        variants={subtleUpwardFadeVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-4xl mx-auto w-full my-auto py-10 text-center flex flex-col items-center space-y-7"
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#181510] border border-[#E5C388]/30 text-[#E5C388] font-mono-tech text-xs tracking-widest uppercase">
          <span>ENTERPRISE SYSTEMS ARCHITECTURE</span>
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-[#F7F5F0] uppercase leading-[0.95] font-sans">
          WE BUILD <br className="hidden sm:inline" />
          <span className="metallic-gold-text">SYSTEMS THAT LAST.</span>
        </h1>

        {/* Supporting text reduced to a single, high-impact sentence */}
        <p className="max-w-2xl text-base sm:text-lg md:text-xl text-[#D5CEBF] font-normal leading-relaxed font-sans">
          JupiterGenX AI engineers deterministic enterprise software, applied artificial intelligence pipelines, and mission-critical cloud infrastructure designed to operate faultlessly under institutional load.
        </p>

        {/* Clean, Centered Call-To-Action Controls with Magnetic Spring Physics */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <MagneticButton
            onClick={() => onOpenInquiry()}
            strength={0.32}
            innerStrength={0.16}
            glow
            data-cursor-text="CONSULT"
            className="px-8 py-3.5 rounded bg-gradient-to-r from-[#E5C388] via-[#DFC28E] to-[#C5A059] hover:brightness-110 text-[#0A0D12] font-mono-tech text-xs font-bold uppercase tracking-widest transition-colors duration-150 shadow-lg shadow-black/40 flex items-center gap-2 group border border-[#E5C388]/40"
          >
            <span>Initiate Consultation</span>
            <ArrowUpRight className="w-4 h-4 text-[#0A0D12] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </MagneticButton>

          <MagneticButton
            onClick={scrollToCapabilities}
            strength={0.25}
            innerStrength={0.12}
            data-cursor-text="EXPLORE"
            className="px-7 py-3.5 rounded bg-[#11141D]/90 hover:bg-[#181C28] border border-[#E5C388]/20 hover:border-[#E5C388]/40 text-[#EDE8DF] font-mono-tech text-xs font-semibold uppercase tracking-wider transition-colors flex items-center gap-2"
          >
            <span>Explore Core Disciplines</span>
            <ArrowDown className="w-3.5 h-3.5 text-[#E5C388]" />
          </MagneticButton>
        </div>
      </motion.div>

      {/* Bottom Technical Strip */}
      <div className="relative z-10 max-w-7xl mx-auto w-full border-t border-white/[0.06] pt-4 flex items-center justify-between text-xs font-mono-tech text-slate-400">
        <span className="tracking-widest uppercase">
          01 // BUILD • 02 // INTELLIGENCE • 03 // TRANSFORM • 04 // OPERATE
        </span>
        <button
          onClick={scrollToCapabilities}
          className="hidden sm:flex items-center gap-2 text-[#E5C388] hover:text-[#FFF5E4] transition-colors"
        >
          <span>CONTINUUM</span>
          <ArrowDown className="w-3 h-3" />
        </button>
      </div>
    </section>
  );
};
