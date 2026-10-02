import React from 'react';
import { ShieldCheck, Eye, Lock, FileCheck2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const ResponsibleAiSection: React.FC = () => {
  const pillars = [
    {
      title: 'Secure AI',
      summary: 'Protect AI systems, applications and data.',
      details:
        'Continuous red-teaming, prompt injection mitigation, model defense against data exfiltration, and resilient endpoint protection across LLM interfaces.',
      icon: ShieldCheck,
      color: '#18BFF2',
    },
    {
      title: 'Responsible AI',
      summary: 'Support transparent and governed AI adoption.',
      details:
        'Explainable AI metrics, bias minimization frameworks, hallucination mitigation controls, and human-in-the-loop decision auditing for enterprise deployment.',
      icon: Eye,
      color: '#F4BC43',
    },
    {
      title: 'Data Protection',
      summary: 'Protect sensitive information throughout AI workflows.',
      details:
        'Zero-retention model gateways, automated PII scrubbing, client data sovereign boundaries, and hardware-level encryption at rest, in flight, and in inference.',
      icon: Lock,
      color: '#38CFFF',
    },
    {
      title: 'AI Governance',
      summary: 'Establish controls for responsible enterprise use.',
      details:
        'Comprehensive compliance orchestration (NIST AI RMF, ISO 42001, EU AI Act), role-based invocation permissions, audit trails, and executive governance boards.',
      icon: FileCheck2,
      color: '#FFD76A',
    },
  ];

  return (
    <section className="bg-[#020B18] py-20 sm:py-28 border-b border-white/[0.08] relative overflow-hidden">
      {/* Background radial accent glow */}
      <div className="absolute top-1/3 right-10 w-[500px] h-[500px] bg-[#18BFF2]/8 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-[#F4BC43]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Block */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#061426] border border-[#18BFF2]/30 text-[#18BFF2] text-xs font-bold tracking-[0.2em] uppercase font-sans">
            <ShieldCheck className="w-3.5 h-3.5 text-[#18BFF2]" />
            <span>RESPONSIBLE & GOVERNED AI</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white font-sans">
            AI Innovation Built on Trust
          </h2>

          <div className="w-14 h-[2.5px] bg-[#F4BC43] mx-auto rounded-full" />

          <p className="text-sm sm:text-base md:text-lg text-[#B7C0CC] leading-relaxed pt-2">
            Innovation shouldn’t come at the expense of security, privacy or control. JupiterGenX AI helps organizations adopt artificial intelligence with security, data protection, governance and responsible AI principles integrated throughout the technology lifecycle.
          </p>
        </div>

        {/* Four Small Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="bg-[#061426] hover:bg-[#091A2D] rounded-xl p-6 sm:p-7 border border-white/[0.12] hover:border-[#F4BC43]/50 transition-all duration-300 flex flex-col justify-between group shadow-lg shadow-black/20"
              >
                <div className="space-y-4">
                  {/* Pillar Icon */}
                  <div className="w-12 h-12 rounded-xl bg-[#020B18] border border-white/10 flex items-center justify-center text-[#F4BC43] group-hover:scale-105 group-hover:border-[#F4BC43]/60 transition-all">
                    <Icon className="w-6 h-6 stroke-[1.75]" />
                  </div>

                  {/* Title & User Summary */}
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight font-sans group-hover:text-[#38CFFF] transition-colors">
                      {pillar.title}
                    </h3>
                    <p className="text-xs sm:text-sm font-semibold text-[#F4BC43] mt-1">
                      {pillar.summary}
                    </p>
                  </div>

                  {/* Detailed Description */}
                  <p className="text-xs sm:text-sm text-[#B7C0CC] leading-relaxed">
                    {pillar.details}
                  </p>
                </div>

                <div className="pt-5 mt-4 border-t border-white/[0.08] flex items-center justify-between text-xs text-[#7E8C9F]">
                  <span className="font-mono text-[11px] tracking-wider text-[#18BFF2]">PILLAR 0{idx + 1}</span>
                  <span className="text-white/60 group-hover:text-[#F4BC43] transition-colors font-medium">Verified Protocol</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Assurance Banner */}
        <div className="mt-12 rounded-xl bg-gradient-to-r from-[#061426] via-[#091A2D] to-[#061426] border border-white/[0.12] p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h4 className="text-base sm:text-lg font-bold text-white">
              Looking to deploy enterprise AI without exposing sovereign data?
            </h4>
            <p className="text-xs sm:text-sm text-[#B7C0CC]">
              Our engineers conduct AI readiness & threat assessments prior to production rollout.
            </p>
          </div>
          <Link
            to="/contact"
            className="shrink-0 px-6 py-3 rounded-md bg-[#F4BC43] hover:bg-[#FFD76A] text-[#020B18] font-bold text-xs sm:text-sm tracking-wide transition-all shadow-md shadow-[#F4BC43]/20"
          >
            Request AI Security Audit
          </Link>
        </div>

      </div>
    </section>
  );
};
