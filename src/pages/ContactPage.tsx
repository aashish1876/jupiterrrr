import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle2, 
  ShieldCheck, 
  Handshake, 
  MessageSquare,
  Sparkles
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    areaOfInterest: 'AI & Automation',
    inquiryType: 'Consultation Request',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="bg-[#020B18] min-h-screen text-white">
      {/* Hero Header */}
      <section className="relative pt-16 pb-16 border-b border-white/[0.08] overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#18BFF2]/10 rounded-full blur-[140px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex items-center space-x-2 text-xs font-mono tracking-wider text-[#F4BC43] mb-4">
            <Link to="/" className="hover:underline">HOME</Link>
            <span>/</span>
            <span className="text-white">CONTACT</span>
          </div>

          <div className="max-w-3xl space-y-4">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.15]">
              Let’s Build a Smarter, <br />
              <span className="text-[#F4BC43]">Safer Tomorrow.</span>
            </h1>
            <p className="text-base sm:text-lg text-[#B7C0CC] leading-relaxed font-normal">
              Initiate a confidential technology consultation with our principal architects and engineering leadership.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content: Form & Inquiries Channels */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left: Enterprise Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="enterprise-card p-6 sm:p-8 rounded-2xl">
              {submitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-[#F4BC43]/10 border border-[#F4BC43]/40 flex items-center justify-center text-[#F4BC43] mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-white font-sans">
                    Inquiry Transmitted Successfully
                  </h3>
                  <p className="text-sm text-[#B7C0CC] max-w-md mx-auto leading-relaxed">
                    Thank you, {formData.name}. Our principal engineering team has received your brief regarding {formData.areaOfInterest} and will reach out to {formData.email} within 1 business day.
                  </p>
                  <div className="pt-4">
                    <button
                      onClick={() => setSubmitted(false)}
                      className="px-6 py-2.5 rounded-md bg-[#061426] border border-white/10 hover:border-white/20 text-xs font-semibold uppercase tracking-wider text-white"
                    >
                      Send Another Message
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-white font-sans">
                      Consultation Request & Brief
                    </h3>
                    <p className="text-xs text-[#B7C0CC] mt-1">
                      All technical transmissions are governed by mutual non-disclosure and strict confidentiality.
                    </p>
                  </div>

                  {/* Inquiry Type Radio / Pill Tabs */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-[#B7C0CC] uppercase tracking-wider">
                      Engagement Category
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {['Consultation Request', 'Partnership Inquiries', 'General Inquiries'].map((type) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => setFormData({ ...formData, inquiryType: type })}
                          className={`py-2 px-3 text-xs font-semibold rounded-md border text-center transition-all ${
                            formData.inquiryType === type
                              ? 'bg-[#F4BC43] text-[#020B18] border-[#F4BC43]'
                              : 'bg-white/[0.03] text-[#B7C0CC] border-white/10 hover:border-white/20'
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Two Columns: Name & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-[#B7C0CC]">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Johnathan Davis"
                        className="w-full px-4 py-2.5 rounded-lg bg-[#061426] border border-white/10 text-white text-sm focus:outline-none focus:border-[#F4BC43] transition-colors"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-[#B7C0CC]">
                        Business Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="j.davis@enterprise.com"
                        className="w-full px-4 py-2.5 rounded-lg bg-[#061426] border border-white/10 text-white text-sm focus:outline-none focus:border-[#F4BC43] transition-colors"
                      />
                    </div>
                  </div>

                  {/* Two Columns: Company & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-[#B7C0CC]">
                        Company / Organization *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder="Apex Global Financial"
                        className="w-full px-4 py-2.5 rounded-lg bg-[#061426] border border-white/10 text-white text-sm focus:outline-none focus:border-[#F4BC43] transition-colors"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-[#B7C0CC]">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+1 (868) 000-0000"
                        className="w-full px-4 py-2.5 rounded-lg bg-[#061426] border border-white/10 text-white text-sm focus:outline-none focus:border-[#F4BC43] transition-colors"
                      />
                    </div>
                  </div>

                  {/* Area of Interest */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-[#B7C0CC]">
                      Area of Interest *
                    </label>
                    <select
                      value={formData.areaOfInterest}
                      onChange={(e) => setFormData({ ...formData, areaOfInterest: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-lg bg-[#061426] border border-white/10 text-white text-sm focus:outline-none focus:border-[#F4BC43] transition-colors"
                    >
                      <option value="AI & Automation">AI & Automation</option>
                      <option value="Cybersecurity & Data Protection">Cybersecurity & Data Protection</option>
                      <option value="Cloud & Infrastructure">Cloud & Infrastructure</option>
                      <option value="IT Solutions & Consulting">IT Solutions & Consulting</option>
                      <option value="Software & Digital Solutions">Software & Digital Solutions</option>
                    </select>
                  </div>

                  {/* Message */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-[#B7C0CC]">
                      Project Requirements or Scope *
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Outline your timeline, architectural requirements, or modernization goals..."
                      className="w-full px-4 py-2.5 rounded-lg bg-[#061426] border border-white/10 text-white text-sm focus:outline-none focus:border-[#F4BC43] transition-colors resize-none"
                    />
                  </div>

                  {/* Submit CTA */}
                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-md bg-[#F4BC43] hover:bg-[#FFD76A] text-[#020B18] font-bold text-sm tracking-wide transition-all shadow-md shadow-[#F4BC43]/20 flex items-center justify-center space-x-2 active:scale-98 cursor-pointer"
                  >
                    <span>Talk to JupiterGenX AI</span>
                    <Send className="w-4 h-4 ml-1" />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Right: Direct Channels & Corporate Coordinates */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* 3 Channels */}
            <div className="p-6 rounded-2xl bg-[#081729] border border-white/10 space-y-4">
              <div className="flex items-center space-x-3 text-[#F4BC43]">
                <MessageSquare className="w-5 h-5" />
                <h4 className="text-base font-bold text-white font-sans">
                  General Inquiries
                </h4>
              </div>
              <p className="text-xs sm:text-sm text-[#B7C0CC] leading-relaxed">
                For corporate communications, media relations, or broad questions regarding JupiterGenX AI capabilities.
              </p>
              <div className="text-xs font-mono text-[#18BFF2]">
                inquiries@jupitergenx.ai
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#081729] border border-white/10 space-y-4">
              <div className="flex items-center space-x-3 text-[#18BFF2]">
                <Handshake className="w-5 h-5" />
                <h4 className="text-base font-bold text-white font-sans">
                  Partnership Inquiries
                </h4>
              </div>
              <p className="text-xs sm:text-sm text-[#B7C0CC] leading-relaxed">
                For cloud hyperscalers, systems integrators, and technology vendors seeking alliance opportunities.
              </p>
              <div className="text-xs font-mono text-[#18BFF2]">
                alliances@jupitergenx.ai
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#081729] border border-white/10 space-y-4">
              <div className="flex items-center space-x-3 text-[#F4BC43]">
                <ShieldCheck className="w-5 h-5" />
                <h4 className="text-base font-bold text-white font-sans">
                  Consultation Requests
                </h4>
              </div>
              <p className="text-xs sm:text-sm text-[#B7C0CC] leading-relaxed">
                Direct route to our senior solutions architects and practice leads for urgent project scoping.
              </p>
              <div className="text-xs font-mono text-[#18BFF2]">
                advisory@jupitergenx.ai
              </div>
            </div>

            {/* Corporate Coordinates */}
            <div className="p-6 rounded-2xl bg-[#061426] border border-white/10 space-y-3">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider font-sans">
                Corporate Coordinates
              </h4>
              <div className="space-y-2 text-xs text-[#B7C0CC]">
                <div className="flex items-start space-x-2.5">
                  <MapPin className="w-4 h-4 text-[#F4BC43] shrink-0 mt-0.5" />
                  <span>San Fernando, Trinidad & Tobago</span>
                </div>
                <div className="flex items-center space-x-2.5">
                  <Clock className="w-4 h-4 text-[#18BFF2] shrink-0" />
                  <span>Timezone: Atlantic Standard Time (UTC-4)</span>
                </div>
                <div className="flex items-center space-x-2.5">
                  <Sparkles className="w-4 h-4 text-[#F4BC43] shrink-0" />
                  <span>Global Client Coverage: Americas, EMEA, LATAM</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>
    </div>
  );
};
