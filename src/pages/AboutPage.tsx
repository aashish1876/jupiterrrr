import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  Lightbulb, 
  Users, 
  Target, 
  Compass, 
  Award, 
  Building, 
  Clock,
  ArrowRight
} from 'lucide-react';
import { CtaSection } from '../components/CtaSection';

export const AboutPage: React.FC = () => {
  const values = [
    {
      title: 'Security-First Philosophy',
      description: 'Security is not an afterthought or an add-on; it is the structural cornerstone embedded into every line of code, network packet, and architectural diagram we create.',
      icon: ShieldCheck,
    },
    {
      title: 'Innovation with Purpose',
      description: 'We reject hype cycles and unproven vanity metrics. Every innovation we engineer must deliver verifiable commercial, operational, and institutional value.',
      icon: Lightbulb,
    },
    {
      title: 'Client-Centric Commitment',
      description: 'Your strategic objectives govern our technical execution. We act as an integrated engineering partner deeply invested in your long-term success.',
      icon: Users,
    },
    {
      title: 'Engineering Rigour',
      description: 'We adhere to deterministic software standards, continuous automated verification, and zero-defect deployment pipelines that survive real-world strain.',
      icon: Target,
    },
  ];

  return (
    <div className="bg-[#020B18] min-h-screen text-white">
      {/* Hero Header */}
      <section className="relative pt-16 pb-20 border-b border-white/[0.08] overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#18BFF2]/10 rounded-full blur-[140px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex items-center space-x-2 text-xs font-mono tracking-wider text-[#F4BC43] mb-4">
            <Link to="/" className="hover:underline">HOME</Link>
            <span>/</span>
            <span className="text-white">ABOUT</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-8 space-y-6">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.15]">
                Engineering Systems <br />
                <span className="text-[#F4BC43]">That Last.</span>
              </h1>
              <p className="text-base sm:text-lg text-[#B7C0CC] leading-relaxed max-w-2xl font-normal">
                JupiterGenX AI is an elite technology engineering and institutional advisory firm. We design, deploy, and safeguard the mission-critical systems that power forward-looking enterprises and government entities.
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <Link
                  to="/contact"
                  className="px-6 py-3 rounded-md bg-[#F4BC43] hover:bg-[#FFD76A] text-[#020B18] font-bold text-sm tracking-wide transition-all shadow-md shadow-[#F4BC43]/20"
                >
                  Connect with Leadership →
                </Link>
              </div>
            </div>

            <div className="lg:col-span-4 flex justify-center">
              <div className="relative p-6 rounded-2xl bg-[#061426] border border-white/10 shadow-2xl text-center max-w-sm w-full">
                <img
                  src="/jupiterlogo.png"
                  alt="JupiterGenX AI"
                  className="h-28 w-auto mx-auto object-contain mb-4 drop-shadow-[0_0_20px_rgba(244,188,67,0.2)]"
                />
                <div className="text-xs font-bold tracking-[0.2em] text-[#F4BC43] uppercase mb-1">
                  INNOVATE. SECURE. TRANSFORM.
                </div>
                <div className="text-xs text-[#B7C0CC]">
                  Founded 2015 • San Fernando, Trinidad & Tobago
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-20 border-b border-white/[0.08] bg-[#040F1E]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            
            <div className="p-8 rounded-2xl bg-[#081729] border border-white/10 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-white/[0.04] border border-[#F4BC43]/30 flex items-center justify-center text-[#F4BC43]">
                <Target className="w-6 h-6 stroke-[1.6]" />
              </div>
              <h3 className="text-2xl font-bold text-white font-sans">
                Our Mission
              </h3>
              <p className="text-sm sm:text-base text-[#B7C0CC] leading-relaxed">
                To equip organizations with sovereign, uncompromised technology infrastructure, artificial intelligence, and cybersecurity capabilities that enable them to operate securely, transform fearlessly, and scale without architectural bounds.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-[#081729] border border-white/10 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-white/[0.04] border border-[#18BFF2]/30 flex items-center justify-center text-[#18BFF2]">
                <Compass className="w-6 h-6 stroke-[1.6]" />
              </div>
              <h3 className="text-2xl font-bold text-white font-sans">
                Our Vision
              </h3>
              <p className="text-sm sm:text-base text-[#B7C0CC] leading-relaxed">
                A world where institutional technology empowers rather than constrains—where intelligence is ethical, systems are resilient against adversarial disruption, and high-impact software creates generational prosperity.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Core Principles & Philosophy */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-16">
          <div className="inline-block relative">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Institutional Values & Principles
            </h2>
            <div className="w-12 h-[2.5px] bg-[#F4BC43] mx-auto mt-3 rounded-full" />
          </div>
          <p className="text-sm sm:text-base text-[#B7C0CC] max-w-2xl mx-auto">
            The fundamental tenets that guide our engineering, advisory, and long-term client engagements.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((val, idx) => {
            const IconComp = val.icon;
            return (
              <div
                key={idx}
                className="enterprise-card p-6 rounded-xl space-y-4 group"
              >
                <div className="w-12 h-12 rounded-xl bg-white/[0.04] border border-[#F4BC43]/20 flex items-center justify-center text-[#F4BC43] group-hover:scale-110 group-hover:border-[#F4BC43] transition-all">
                  <IconComp className="w-6 h-6 stroke-[1.6]" />
                </div>
                <h3 className="text-lg font-bold text-white tracking-tight">
                  {val.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#B7C0CC] leading-relaxed">
                  {val.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Approach & Expertise Stats */}
      <section className="py-16 bg-[#061426] border-y border-white/[0.08]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl sm:text-4xl font-bold text-[#F4BC43] font-sans">
                10+ Years
              </div>
              <div className="text-xs sm:text-sm text-[#B7C0CC] mt-1 uppercase tracking-wider font-semibold">
                Engineering Provenance
              </div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-bold text-[#18BFF2] font-sans">
                99.999%
              </div>
              <div className="text-xs sm:text-sm text-[#B7C0CC] mt-1 uppercase tracking-wider font-semibold">
                Architecture SLA Standard
              </div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-bold text-[#F4BC43] font-sans">
                Zero-Loss
              </div>
              <div className="text-xs sm:text-sm text-[#B7C0CC] mt-1 uppercase tracking-wider font-semibold">
                Migration Track Record
              </div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-bold text-[#18BFF2] font-sans">
                Enterprise
              </div>
              <div className="text-xs sm:text-sm text-[#B7C0CC] mt-1 uppercase tracking-wider font-semibold">
                Security by Design
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <CtaSection />
    </div>
  );
};
