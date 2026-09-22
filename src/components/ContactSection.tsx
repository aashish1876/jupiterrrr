import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Send, CheckCircle2, Terminal, MapPin, Clock, ShieldCheck, ArrowUpRight } from 'lucide-react';
import { COMPANY_DETAILS } from '../data/jupiterData';

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
    <section id="contact" className="relative py-28 md:py-40 px-6 md:px-12 lg:px-16 bg-[#FFFFFF] border-t border-black/[0.06]">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 font-mono-tech text-xs text-[#0071E3] uppercase tracking-wider font-bold">
            <Terminal className="w-3.5 h-3.5" />
            <span>06 // CONSULTATION DESK</span>
            <span className="text-slate-300">•</span>
            <span>DIRECT SPECIFICATION BRIEFING</span>
          </div>

          <h2 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[#0B0D12] uppercase font-sans leading-none">
            Let’s Build <br className="hidden sm:inline" />
            <span className="apple-blue-text">What’s Next.</span>
          </h2>

          <p className="max-w-2xl text-base sm:text-lg text-[#667085] font-normal leading-relaxed font-sans">
            Whether architecting an enterprise system from scratch, modernizing foundational software, or hardening critical infrastructure, JupiterGenX AI delivers high-reliability execution.
          </p>
        </div>

        {/* Two-Column Form & Telemetry Desk */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Interactive Consultation Dispatch Terminal */}
          <div className="lg:col-span-7 bg-white border border-black/[0.08] rounded-3xl p-8 sm:p-12 shadow-sm relative overflow-hidden">
            {submitted ? (
              <div className="py-12 text-center space-y-6">
                <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center mx-auto text-emerald-600">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-[#0B0D12] uppercase font-sans">
                    SYSTEM INQUIRY RECEIVED
                  </h3>
                  <p className="text-[#667085] text-sm max-w-md mx-auto leading-relaxed font-sans">
                    Thank you, <strong className="text-[#0B0D12]">{formData.name}</strong>. Our engineering consultation lead has received your system brief for <strong className="text-[#0071E3]">{formData.organization}</strong>.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 max-w-md mx-auto text-xs font-mono-tech text-slate-700 text-left space-y-1.5">
                  <div>DISPATCH REF: #JGX-{(Date.now() % 100000).toString().padStart(6, '0')}</div>
                  <div>PRIMARY AREA: {formData.interestArea}</div>
                  <div>TIMESTAMP: {astClock} (SAN FERNANDO, TT)</div>
                </div>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2.5 rounded-full bg-[#0B0D12] hover:bg-[#0071E3] text-xs font-semibold uppercase text-white transition-colors cursor-pointer shadow-xs"
                >
                  Submit Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="border-b border-slate-100 pb-4 mb-6 flex items-center justify-between">
                  <span className="font-mono-tech text-xs text-[#0071E3] uppercase tracking-wider font-bold">
                    SPECIFICATION BRIEFING INQUIRY
                  </span>
                  <span className="font-mono-tech text-[10px] text-slate-400">
                    DIRECT DISPATCH
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Name */}
                  <div className="space-y-2">
                    <label className="block text-xs font-mono-tech uppercase text-slate-700 font-semibold">
                      Operator / Contact Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alex Thorne"
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-[#0B0D12] placeholder-slate-400 focus:bg-white focus:outline-hidden focus:border-[#0071E3] focus:ring-2 focus:ring-[#0071E3]/20 text-sm font-sans transition-all"
                    />
                  </div>

                  {/* Organization */}
                  <div className="space-y-2">
                    <label className="block text-xs font-mono-tech uppercase text-slate-700 font-semibold">
                      Organization *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Industrial Enterprises Ltd"
                      value={formData.organization}
                      onChange={e => setFormData({ ...formData, organization: e.target.value })}
                      className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-[#0B0D12] placeholder-slate-400 focus:bg-white focus:outline-hidden focus:border-[#0071E3] focus:ring-2 focus:ring-[#0071E3]/20 text-sm font-sans transition-all"
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label className="block text-xs font-mono-tech uppercase text-slate-700 font-semibold">
                    Direct Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. alex@enterprise.com"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-[#0B0D12] placeholder-slate-400 focus:bg-white focus:outline-hidden focus:border-[#0071E3] focus:ring-2 focus:ring-[#0071E3]/20 text-sm font-sans transition-all"
                  />
                </div>

                {/* Core Discipline Area */}
                <div className="space-y-2">
                  <label className="block text-xs font-mono-tech uppercase text-slate-700 font-semibold">
                    Primary Area of Engagement
                  </label>
                  <select
                    value={formData.interestArea}
                    onChange={e => setFormData({ ...formData, interestArea: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-[#0B0D12] focus:bg-white focus:outline-hidden focus:border-[#0071E3] focus:ring-2 focus:ring-[#0071E3]/20 text-sm font-sans transition-all"
                  >
                    {COMPANY_DETAILS.coreAreas.map(area => (
                      <option key={area} value={area}>
                        {area}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Technical Overview */}
                <div className="space-y-2">
                  <label className="block text-xs font-mono-tech uppercase text-slate-700 font-semibold">
                    Architectural Objective / Technical Context
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Summarize the system you want to build, modernize, or operate..."
                    value={formData.technicalRequirements}
                    onChange={e => setFormData({ ...formData, technicalRequirements: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-[#0B0D12] placeholder-slate-400 focus:bg-white focus:outline-hidden focus:border-[#0071E3] focus:ring-2 focus:ring-[#0071E3]/20 text-sm font-sans transition-all"
                  />
                </div>

                {/* Submit Action */}
                <button
                  type="submit"
                  className="w-full py-4 rounded-full bg-[#0071E3] hover:bg-[#005FCC] text-white font-sans text-xs font-bold uppercase tracking-wider transition-all duration-150 active:scale-98 shadow-md shadow-blue-500/20 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Transmit Consultation Brief</span>
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Institutional Coordinates & Location */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 rounded-3xl bg-[#F7F9FC] border border-black/[0.07] space-y-6">
              <div className="flex items-center justify-between border-b border-black/[0.06] pb-4">
                <span className="font-mono-tech text-xs text-[#0071E3] uppercase tracking-wider font-bold">
                  HEADQUARTERS // TRINIDAD & TOBAGO
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              </div>

              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="p-2.5 rounded-xl bg-white border border-slate-200 text-[#0071E3] shrink-0 shadow-2xs">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#0B0D12] font-sans">
                      San Fernando, Trinidad & Tobago
                    </h4>
                    <p className="text-xs text-[#667085] mt-0.5 font-sans leading-relaxed">
                      Established 2015. Operating across Caribbean critical infrastructure and international enterprise corridors.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-2.5 rounded-xl bg-white border border-slate-200 text-[#0071E3] shrink-0 shadow-2xs">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#0B0D12] font-sans">
                      Local Operating Clock
                    </h4>
                    <p className="text-xs font-mono-tech text-[#0071E3] mt-0.5 font-bold">
                      {astClock} (UTC-4)
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-2.5 rounded-xl bg-white border border-slate-200 text-[#0071E3] shrink-0 shadow-2xs">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#0B0D12] font-sans">
                      Strict Institutional Confidentiality
                    </h4>
                    <p className="text-xs text-[#667085] mt-0.5 font-sans leading-relaxed">
                      All technical specifications, data schemas, and architecture documents are covered by institutional mutual NDA.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Core Philosophy Callout */}
            <div className="p-6 rounded-3xl bg-blue-50/50 border border-blue-200/60">
              <span className="font-mono-tech text-xs text-[#0071E3] uppercase tracking-wider block mb-2 font-bold">
                CORE PHILOSOPHY
              </span>
              <p className="text-sm text-slate-700 leading-relaxed font-sans italic">
                "{COMPANY_DETAILS.philosophy}"
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
