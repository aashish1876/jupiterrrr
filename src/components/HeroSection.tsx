import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Sparkles, Cpu } from 'lucide-react';
import { IMAGES } from '../assets/images';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative bg-[#020B18] overflow-hidden pt-8 pb-16 md:pt-14 md:pb-24 border-b border-white/[0.08]">
      {/* Background Starfield and Atmospheric Glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-0 w-[550px] h-[550px] bg-[#18BFF2]/10 rounded-full blur-[120px]" />
        <div className="absolute top-1/3 left-10 w-[450px] h-[450px] bg-[#F4BC43]/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-[#F4BC43]/20 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* LEFT AREA: Prominent Official JupiterGenX AI Brand Emblem */}
          <div className="lg:col-span-4 flex flex-col items-center lg:items-start text-center lg:text-left">
            <div className="relative group max-w-[320px] sm:max-w-[380px] lg:max-w-full">
              {/* Subtle back ambient glow */}
              <div className="absolute -inset-4 bg-gradient-to-tr from-[#F4BC43]/10 to-[#18BFF2]/15 rounded-full blur-2xl opacity-75 group-hover:opacity-100 transition-opacity" />
              
              <img
                src="/jupiterlogo.png"
                alt="JupiterGenX AI - Innovate. Secure. Transform."
                className="relative w-full h-auto max-h-[380px] sm:max-h-[440px] lg:max-h-[480px] object-contain drop-shadow-[0_10px_35px_rgba(244,188,67,0.2)]"
              />
            </div>

            {/* Tagline Badge below logo on desktop / mobile */}
            <div className="mt-4 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#061426] border border-[#F4BC43]/30 text-[#F4BC43] text-xs font-bold tracking-[0.2em] uppercase font-sans">
              <Sparkles className="w-3.5 h-3.5 text-[#F4BC43]" />
              <span>INNOVATE. SECURE. TRANSFORM.</span>
            </div>
          </div>

          {/* CENTER / RIGHT AREA: Eyebrow, Cinematic Headline, Paragraph, CTAs & Earth Composite */}
          <div className="lg:col-span-8 flex flex-col xl:flex-row items-center justify-between gap-8">
            
            {/* Typography & Actions */}
            <div className="space-y-6 max-w-xl text-center lg:text-left">
              {/* Uppercase Eyebrow */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#091A2D] border border-white/10">
                <ShieldCheck className="w-3.5 h-3.5 text-[#18BFF2]" />
                <span className="text-xs sm:text-sm font-semibold tracking-[0.2em] text-[#18BFF2] uppercase font-sans">
                  TECHNOLOGY FOR A SECURE TOMORROW
                </span>
              </div>

              {/* Main Heading requested by user:
                  AI-Powered Innovation.
                  Secure Digital Transformation.
                  with gold accent */}
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-[1.14]">
                AI-Powered <br className="hidden sm:inline" />
                Innovation. <br />
                <span className="text-[#F4BC43]">Secure Digital Transformation.</span>
              </h1>

              {/* Supporting Text */}
              <p className="text-sm sm:text-base text-[#B7C0CC] leading-relaxed font-normal">
                JupiterGenX AI delivers artificial intelligence, cybersecurity, data protection, cloud, infrastructure and technology solutions that help organizations innovate, automate and transform securely.
              </p>

              {/* CTA Buttons */}
              <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-4">
                <Link
                  to="/solutions"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-md bg-[#F4BC43] hover:bg-[#FFD76A] text-[#020B18] font-bold text-sm tracking-wide transition-all shadow-md shadow-[#F4BC43]/20 hover:shadow-lg hover:shadow-[#F4BC43]/35 active:scale-98"
                >
                  <span>Explore Our Solutions</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-md bg-[#061426] hover:bg-[#091A2D] text-white border border-[#F4BC43]/50 hover:border-[#F4BC43] font-semibold text-sm tracking-wide transition-all active:scale-98"
                >
                  <span>Talk to an Expert</span>
                </Link>
              </div>

              {/* Feature Chips */}
              <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-y-2 gap-x-6 text-xs text-[#B7C0CC]">
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#18BFF2]" />
                  <span>Enterprise AI Architecture</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#F4BC43]" />
                  <span>Zero-Trust Security</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#38CFFF]" />
                  <span>Sovereign Data Governance</span>
                </div>
              </div>
            </div>

            {/* Earth Orbital Graphic with "HIGHER POSSIBILITIES TOGETHER" */}
            <div className="relative w-full max-w-[340px] sm:max-w-[400px] xl:max-w-[320px] shrink-0">
              <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-cyan-950/40 group">
                <img
                  src={IMAGES.heroEarth}
                  alt="Global Technology Infrastructure"
                  className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#020B18] via-transparent to-transparent opacity-60" />
                
                {/* Floating "HIGHER POSSIBILITIES TOGETHER" text */}
                <div className="absolute bottom-4 right-4 text-right">
                  <div className="text-[11px] font-bold tracking-[0.25em] text-white/90 uppercase leading-tight font-sans">
                    HIGHER <br />
                    POSSIBILITIES <br />
                    TOGETHER
                  </div>
                  <div className="w-12 h-[2px] bg-[#F4BC43] ml-auto mt-1.5" />
                </div>
              </div>

              {/* Micro Metric Badge */}
              <div className="mt-3 p-3 rounded-lg bg-[#061426]/90 border border-white/10 flex items-center justify-between text-xs">
                <span className="text-[#B7C0CC]">Institutional Motto:</span>
                <span className="font-bold text-[#F4BC43] tracking-wider">INNOVATE. SECURE. TRANSFORM.</span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
