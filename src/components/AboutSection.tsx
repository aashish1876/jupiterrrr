import React from 'react';
import { motion } from 'motion/react';
import { Shield, Compass, Target, Clock, Terminal, Globe, CheckCircle2 } from 'lucide-react';
import { COMPANY_DETAILS } from '../data/jupiterData';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="relative py-24 md:py-36 px-6 md:px-12 lg:px-16 bg-[#07080C] border-t border-[#E5C388]/15">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#E5C388]/15 pb-6 gap-6">
          <div>
            <div className="flex items-center gap-2 font-mono-tech text-xs tracking-widest text-[#E5C388] uppercase mb-2">
              <span>12 // INSTITUTIONAL PROFILE</span>
              <span>•</span>
              <span>SAN FERNANDO, TT</span>
            </div>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-[#F7F5F0] uppercase font-sans">
              ABOUT JUPITER TECHNOLOGIES
            </h2>
          </div>
          <div className="text-xs font-mono-tech text-slate-400">
            <span>OPERATING CONTINUOUSLY SINCE </span>
            <strong className="text-[#E5C388]">2015</strong>
          </div>
        </div>

        {/* 3 Core Questions: Who We Are / Why We Exist / How We Work */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Who We Are */}
          <div className="p-8 rounded-2xl card-luxury space-y-4 relative group hover:border-[#E5C388]/40 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-[#181510] border border-[#E5C388]/30 flex items-center justify-center text-[#E5C388]">
              <Shield className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold text-[#F7F5F0] uppercase tracking-wide font-sans">
              Who We Are
            </h3>
            <p className="text-sm text-[#D4CEBF] leading-relaxed font-sans">
              Jupiter Technologies Limited is an engineering and technology company founded in 2015 in San Fernando, Trinidad & Tobago. We are systems architects, infrastructure engineers, and software craftsmen focused on delivering reliable, enterprise-grade technology solutions.
            </p>
            <div className="pt-4 border-t border-white/5 text-xs font-mono-tech text-slate-400">
              LEGAL: Jupiter Technologies Limited
            </div>
          </div>

          {/* Why We Exist */}
          <div className="p-8 rounded-2xl card-luxury space-y-4 relative group hover:border-[#E5C388]/40 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-[#1A1612] border border-[#E5C388]/30 flex items-center justify-center text-[#DFC28E]">
              <Compass className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold text-[#F7F5F0] uppercase tracking-wide font-sans">
              Why We Exist
            </h3>
            <p className="text-sm text-[#D4CEBF] leading-relaxed font-sans">
              Our core philosophy is simple: <em className="text-[#FFF8EE] not-italic font-medium">Technology should empower organizations rather than restrict them.</em> Too many organizations are constrained by brittle legacy software and fragile implementations. We exist to build systems that unlock capability and endure.
            </p>
            <div className="pt-4 border-t border-white/5 text-xs font-mono-tech text-slate-400">
              PURPOSE: Structural Empowerment
            </div>
          </div>

          {/* How We Work */}
          <div className="p-8 rounded-2xl card-luxury space-y-4 relative group hover:border-[#E5C388]/40 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-[#141820] border border-[#E5C388]/30 flex items-center justify-center text-emerald-400">
              <Target className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold text-[#F7F5F0] uppercase tracking-wide font-sans">
              How We Work
            </h3>
            <p className="text-sm text-[#D4CEBF] leading-relaxed font-sans">
              We operate with rigorous systems discipline. We avoid quick-fix bandages in favor of formal architectural discovery, type-safe implementations, strict automated testing, zero-downtime deployment pipelines, and long-term operational stewardship.
            </p>
            <div className="pt-4 border-t border-white/5 text-xs font-mono-tech text-slate-400">
              DISCIPLINE: First-Principles Engineering
            </div>
          </div>
        </div>

        {/* Operational Values Banner */}
        <div className="p-8 md:p-12 rounded-2xl card-luxury grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 font-mono-tech text-xs">
          <div className="space-y-1">
            <span className="text-slate-400 uppercase">HEADQUARTERS</span>
            <p className="text-[#F7F5F0] text-sm font-semibold">San Fernando, Trinidad & Tobago</p>
            <span className="text-slate-400 text-[11px]">Atlantic Standard Time (UTC-4)</span>
          </div>
          <div className="space-y-1">
            <span className="text-slate-400 uppercase">FOUNDATION YEAR</span>
            <p className="text-[#E5C388] text-sm font-semibold">Established 2015</p>
            <span className="text-slate-400 text-[11px]">Over a decade of systems practice</span>
          </div>
          <div className="space-y-1">
            <span className="text-slate-400 uppercase">CORE TENET</span>
            <p className="text-[#F7F5F0] text-sm font-semibold">Systems Reliability</p>
            <span className="text-slate-400 text-[11px]">Zero-compromise engineering</span>
          </div>
          <div className="space-y-1">
            <span className="text-slate-400 uppercase">ENGAGEMENT MODEL</span>
            <p className="text-emerald-400 text-sm font-semibold">Lifecycle Engineering</p>
            <span className="text-slate-400 text-[11px]">From blueprint to ongoing stewardship</span>
          </div>
        </div>
      </div>
    </section>
  );
};
