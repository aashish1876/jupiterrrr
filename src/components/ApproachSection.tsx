import React, { useState } from 'react';
import { Compass, PencilRuler, ShieldCheck, Cpu, Gauge, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export const ApproachSection: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'Discover',
      tagline: 'Understand & Assess',
      summary: 'Understand business objectives, technology environments and challenges.',
      deliverables: [
        'Stakeholder & objective alignment',
        'Legacy architecture baseline audit',
        'Security & data boundary mapping',
        'Opportunity matrix & ROI roadmap',
      ],
      icon: Compass,
      tag: 'INNOVATE',
    },
    {
      num: '02',
      title: 'Design',
      tagline: 'Architect & Engineer',
      summary: 'Develop practical architectures and solutions aligned with business requirements.',
      deliverables: [
        'Target-state technical architecture',
        'Scalable cloud & compute topology',
        'API & integration specifications',
        'Phased cutover strategy',
      ],
      icon: PencilRuler,
      tag: 'INNOVATE',
    },
    {
      num: '03',
      title: 'Secure',
      tagline: 'Harden & Protect',
      summary: 'Build security, privacy, resilience and governance into the solution.',
      deliverables: [
        'Zero-trust access orchestration',
        'Data encryption & compliance gates',
        'AI governance & model defense',
        'Failover & disaster recovery protocols',
      ],
      icon: ShieldCheck,
      tag: 'SECURE',
    },
    {
      num: '04',
      title: 'Implement',
      tagline: 'Deploy & Integrate',
      summary: 'Deploy and integrate technologies with existing enterprise environments.',
      deliverables: [
        'Automated CI/CD production rollout',
        'Enterprise system interoperability',
        'Zero-downtime database migration',
        'Team enablement & ops handoff',
      ],
      icon: Cpu,
      tag: 'TRANSFORM',
    },
    {
      num: '05',
      title: 'Optimize',
      tagline: 'Scale & Elevate',
      summary: 'Continuously improve performance, scalability, security and business value.',
      deliverables: [
        'Real-time latency & observability',
        'Cost optimization & rightsizing',
        'Continuous AI refinement & updates',
        'Sustained enterprise value reviews',
      ],
      icon: Gauge,
      tag: 'TRANSFORM',
    },
  ];

  const [activeStep, setActiveStep] = useState<number>(0);

  return (
    <section id="our-approach" className="bg-[#020B18] py-20 sm:py-28 border-b border-white/[0.08] relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-[#18BFF2]/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-[#F4BC43]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#061426] border border-[#F4BC43]/30 text-[#F4BC43] text-xs font-bold tracking-[0.2em] uppercase font-sans">
            <span>OUR APPROACH</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white font-sans">
            From Vision to Value
          </h2>

          <div className="w-16 h-[2.5px] bg-[#F4BC43] mx-auto rounded-full" />

          <p className="text-sm sm:text-base md:text-lg text-[#B7C0CC] max-w-2xl mx-auto leading-relaxed pt-1">
            A disciplined, five-step delivery pipeline engineered to turn ambitious technology vision into secure, measurable enterprise outcomes.
          </p>
        </div>

        {/* Horizontal 5-Step Process Flow (Desktop & Mobile) */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative mb-12">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            const isSelected = activeStep === idx;
            return (
              <div
                key={step.num}
                onClick={() => setActiveStep(idx)}
                className={`cursor-pointer rounded-xl p-5 border transition-all duration-300 relative flex flex-col justify-between ${
                  isSelected
                    ? 'bg-[#091A2D] border-[#F4BC43] shadow-lg shadow-[#F4BC43]/10 ring-1 ring-[#F4BC43]/30 scale-[1.02]'
                    : 'bg-[#061426] border-white/[0.12] hover:border-white/25 hover:bg-[#08182B]'
                }`}
              >
                {/* Step indicator header */}
                <div className="flex items-center justify-between mb-4">
                  <span className={`font-mono text-sm font-bold ${isSelected ? 'text-[#F4BC43]' : 'text-[#18BFF2]'}`}>
                    {step.num}
                  </span>
                  <span className="text-[10px] font-bold tracking-wider px-2 py-0.5 rounded bg-white/[0.06] text-[#B7C0CC] uppercase">
                    {step.tag}
                  </span>
                </div>

                {/* Step Icon & Title */}
                <div className="space-y-2">
                  <div className="w-10 h-10 rounded-lg bg-[#020B18] border border-white/10 flex items-center justify-center text-[#F4BC43]">
                    <Icon className="w-5 h-5 stroke-[1.75]" />
                  </div>
                  <h3 className="text-lg font-bold text-white tracking-tight font-sans">
                    {step.title}
                  </h3>
                  <p className="text-xs text-[#B7C0CC] leading-relaxed line-clamp-3">
                    {step.summary}
                  </p>
                </div>

                {/* Arrow to next step (horizontal on desktop) */}
                {idx < steps.length - 1 && (
                  <div className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 z-20 pointer-events-none">
                    <div className="w-6 h-6 rounded-full bg-[#020B18] border border-white/20 flex items-center justify-center text-[#F4BC43]">
                      <ArrowRight className="w-3 h-3" />
                    </div>
                  </div>
                )}

                {/* Active indicator bar */}
                <div className="mt-4 pt-3 border-t border-white/[0.08] flex items-center justify-between text-[11px]">
                  <span className={isSelected ? 'text-[#F4BC43] font-semibold' : 'text-[#7E8C9F]'}>
                    {isSelected ? 'Viewing Details' : 'Click to View'}
                  </span>
                  <span className="text-white/40">→</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Step Detailed Feature Spotlight */}
        <div className="bg-[#061426] border border-white/[0.12] rounded-2xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Column: Deep Step Insight */}
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#18BFF2] uppercase tracking-wider">
                <span>PHASE {steps[activeStep].num} EXECUTION</span>
                <span className="text-white/30">•</span>
                <span className="text-[#F4BC43]">{steps[activeStep].tagline}</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-white font-sans">
                {steps[activeStep].title}: {steps[activeStep].summary}
              </h3>

              <p className="text-sm text-[#B7C0CC] leading-relaxed">
                By aligning our multidisciplinary talent directly with your business stakeholders, this phase ensures that every technical decision actively accelerates enterprise value without introducing security compromises.
              </p>

              {/* Tagline connection */}
              <div className="pt-2 flex items-center gap-3">
                <span className="text-xs text-[#7E8C9F] uppercase tracking-wider font-mono">Governing Discipline:</span>
                <span className="px-3 py-1 rounded bg-[#020B18] border border-[#F4BC43]/40 text-[#F4BC43] text-xs font-bold tracking-widest uppercase">
                  {steps[activeStep].tag}
                </span>
              </div>
            </div>

            {/* Right Column: Key Deliverables Checklist */}
            <div className="lg:col-span-5 bg-[#091A2D] border border-white/[0.08] rounded-xl p-5 sm:p-6 space-y-3">
              <div className="text-xs font-bold tracking-wider text-white uppercase font-sans border-b border-white/[0.08] pb-2 flex items-center justify-between">
                <span>Core Phase Deliverables</span>
                <span className="text-[#18BFF2] font-mono text-[11px]">{steps[activeStep].num} / 05</span>
              </div>

              <ul className="space-y-2.5 pt-1">
                {steps[activeStep].deliverables.map((item, dIdx) => (
                  <li key={dIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#B7C0CC]">
                    <CheckCircle2 className="w-4 h-4 text-[#F4BC43] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between">
                <span className="text-[11px] text-[#7E8C9F]">Ready to execute?</span>
                <Link
                  to="/contact"
                  className="text-xs font-bold text-[#F4BC43] hover:text-[#FFD76A] inline-flex items-center gap-1 transition-colors"
                >
                  <span>Schedule Consultation</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
