import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Send, CheckCircle2, Terminal, MapPin, Clock, ShieldCheck } from 'lucide-react';
import { COMPANY_DETAILS } from '../data/jupiterData';
import { subtleUpwardFadeVariants } from '../utils/motion';

interface ContactSectionProps {
  initialCategory?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ initialCategory }) => {
  const [formData, setFormData] = useState({
    name: '',
    organization: '',
    email: '',
    interestArea: initialCategory || 'Enterprise Software',
    systemScope: 'Production Enterprise Deployment',
    technicalRequirements: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [astClock, setAstClock] = useState('00:00:00 AST');

  useEffect(() => {
    if (initialCategory) {
      setFormData(prev => ({ ...prev, interestArea: initialCategory }));
    }
  }, [initialCategory]);

  useEffect(() => {
    const updateAst = () => {
      try {
        const now = new Date();
        const str = now.toLocaleTimeString('en-US', {
          timeZone: 'America/Port_of_Spain',
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        });
        setAstClock(`${str} AST`);
      } catch {
        const now = new Date();
        setAstClock(`${now.getUTCHours() - 4}:${now.getMinutes()} AST`);
      }
    };
    updateAst();
    const interval = setInterval(updateAst, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.organization) return;
    setSubmitted(true);
  };

  return (
    <section id="contact" className="relative py-24 md:py-32 px-6 md:px-12 lg:px-16 bg-[#07080C] border-t border-white/[0.06]">
      <motion.div
        variants={subtleUpwardFadeVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.12 }}
        className="max-w-7xl mx-auto space-y-16"
      >
        {/* Section Header with Cinematic Typography */}
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#181510] border border-[#E5C388]/30 font-mono-tech text-xs text-[#E5C388] uppercase tracking-widest">
            <Terminal className="w-3.5 h-3.5" />
            <span>06 // CONTACT</span>
            <span>•</span>
            <span>INITIATE SYSTEM ENGAGEMENT</span>
          </div>

          <h2 className="text-4xl sm:text-6xl md:text-7xl xl:text-8xl font-black tracking-tight text-[#F7F5F0] uppercase font-sans leading-none">
            LET’S BUILD WHAT’S NEXT.
          </h2>

          <p className="max-w-2xl text-base sm:text-lg text-[#D4CEBF] font-normal leading-relaxed font-sans">
            Whether architecting an enterprise system from scratch, modernizing foundational software, or hardening critical infrastructure, JupiterGenX AI delivers high-reliability execution.
          </p>
        </div>

        {/* Two-Column Form & Telemetry Desk */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Interactive Consultation Dispatch Terminal */}
          <div className="lg:col-span-7 card-luxury rounded-2xl p-8 md:p-12 shadow-xl relative overflow-hidden">
            {submitted ? (
              <div className="py-12 text-center space-y-6">
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-[#F7F5F0] uppercase font-sans">
                    SYSTEM INQUIRY RECEIVED
                  </h3>
                  <p className="text-[#D4CEBF] text-sm max-w-md mx-auto leading-relaxed font-sans">
                    Thank you, <strong className="text-[#F7F5F0]">{formData.name}</strong>. Our engineering consultation lead has received your system brief for <strong className="text-[#E5C388]">{formData.organization}</strong>.
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-[#070910] border border-white/10 max-w-md mx-auto text-xs font-mono-tech text-slate-300 text-left space-y-1">
                  <div>DISPATCH REF: #JGX-{(Date.now() % 100000).toString().padStart(6, '0')}</div>
                  <div>PRIMARY AREA: {formData.interestArea}</div>
                  <div>TIMESTAMP: {astClock} (SAN FERNANDO, TT)</div>
                </div>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2.5 rounded bg-[#121622] hover:bg-[#181D2D] border border-white/10 text-xs font-mono-tech uppercase text-[#EDE8DF] transition-colors cursor-pointer"
                >
                  Submit Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="border-b border-white/[0.08] pb-4 mb-6 flex items-center justify-between">
                  <span className="font-mono-tech text-xs text-[#E5C388] uppercase tracking-wider font-semibold">
                    SPECIFICATION BRIEFING INQUIRY
                  </span>
                  <span className="font-mono-tech text-[10px] text-slate-400">
                    DIRECT DISPATCH
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Name */}
                  <div className="space-y-2">
                    <label className="block text-xs font-mono-tech uppercase text-slate-300">
                      Operator / Contact Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alex Thorne"
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded bg-[#0B0E16] border border-white/10 text-[#EDE8DF] placeholder-slate-500 focus:outline-hidden focus:border-[#E5C388] focus:ring-1 focus:ring-[#E5C388] text-sm font-sans"
                    />
                  </div>

                  {/* Organization */}
                  <div className="space-y-2">
                    <label className="block text-xs font-mono-tech uppercase text-slate-300">
                      Organization *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Industrial Enterprises Ltd"
                      value={formData.organization}
                      onChange={e => setFormData({ ...formData, organization: e.target.value })}
                      className="w-full px-4 py-3 rounded bg-[#0B0E16] border border-white/10 text-[#EDE8DF] placeholder-slate-500 focus:outline-hidden focus:border-[#E5C388] focus:ring-1 focus:ring-[#E5C388] text-sm font-sans"
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label className="block text-xs font-mono-tech uppercase text-slate-300">
                    Direct Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. alex@enterprise.com"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded bg-[#0B0E16] border border-white/10 text-[#EDE8DF] placeholder-slate-500 focus:outline-hidden focus:border-[#E5C388] focus:ring-1 focus:ring-[#E5C388] text-sm font-sans"
                  />
                </div>

                {/* Core Discipline Area */}
                <div className="space-y-2">
                  <label className="block text-xs font-mono-tech uppercase text-slate-300">
                    Primary Area of Engagement
                  </label>
                  <select
                    value={formData.interestArea}
                    onChange={e => setFormData({ ...formData, interestArea: e.target.value })}
                    className="w-full px-4 py-3 rounded bg-[#0B0E16] border border-white/10 text-[#EDE8DF] focus:outline-hidden focus:border-[#E5C388] focus:ring-1 focus:ring-[#E5C388] text-sm font-sans"
                  >
                    {COMPANY_DETAILS.coreAreas.map(area => (
                      <option key={area} value={area} className="bg-[#0B0E16] text-[#EDE8DF]">
                        {area}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Technical Overview */}
                <div className="space-y-2">
                  <label className="block text-xs font-mono-tech uppercase text-slate-300">
                    Architectural Objective / Technical Context
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Summarize the system you want to build, modernize, or operate..."
                    value={formData.technicalRequirements}
                    onChange={e => setFormData({ ...formData, technicalRequirements: e.target.value })}
                    className="w-full px-4 py-3 rounded bg-[#0B0E16] border border-white/10 text-[#EDE8DF] placeholder-slate-500 focus:outline-hidden focus:border-[#E5C388] focus:ring-1 focus:ring-[#E5C388] text-sm font-sans"
                  />
                </div>

                {/* Submit Action */}
                <button
                  type="submit"
                  className="w-full py-4 rounded bg-gradient-to-r from-[#E5C388] via-[#DFC28E] to-[#C5A059] hover:brightness-110 text-[#0A0D12] font-mono-tech text-xs font-bold uppercase tracking-widest transition-transform duration-150 active:scale-99 shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Transmit Consultation Brief</span>
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Institutional Coordinates & Location */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 rounded-2xl card-luxury space-y-6">
              <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
                <span className="font-mono-tech text-xs text-[#E5C388] uppercase tracking-widest font-semibold">
                  HEADQUARTERS // TRINIDAD & TOBAGO
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="p-2.5 rounded bg-[#121622] border border-white/10 text-[#E5C388] shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-[#F7F5F0] font-sans">
                      San Fernando, Trinidad & Tobago
                    </h4>
                    <p className="text-xs text-[#D4CEBF] mt-0.5 font-sans">
                      Established 2015. Operating across the Caribbean and international enterprise corridors.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-2.5 rounded bg-[#121622] border border-white/10 text-[#E5C388] shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-[#F7F5F0] font-sans">
                      Local Operating Clock
                    </h4>
                    <p className="text-xs font-mono-tech text-[#E5C388] mt-0.5 font-semibold">
                      {astClock} (UTC-4)
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-2.5 rounded bg-[#121622] border border-white/10 text-[#E5C388] shrink-0">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-[#F7F5F0] font-sans">
                      Strict Confidentiality
                    </h4>
                    <p className="text-xs text-[#D4CEBF] mt-0.5 font-sans">
                      All technical specifications and system designs are governed by rigorous institutional non-disclosure agreements.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Core Philosophy Callout */}
            <div className="p-6 rounded-2xl bg-[#181510]/80 border border-white/10">
              <span className="font-mono-tech text-xs text-[#E5C388] uppercase tracking-wider block mb-2 font-semibold">
                CORE PHILOSOPHY
              </span>
              <p className="text-sm text-[#EDE8DF] leading-relaxed font-sans italic">
                "{COMPANY_DETAILS.philosophy}"
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
