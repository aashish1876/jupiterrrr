import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Compass, 
  Layers, 
  Hammer, 
  Network, 
  Briefcase, 
  Headphones, 
  RefreshCcw, 
  Lightbulb,
  CheckCircle2
} from 'lucide-react';
import { IMAGES } from '../assets/images';
import { CtaSection } from '../components/CtaSection';

export const ItSolutionsPage: React.FC = () => {
  const pillars = [
    {
      title: 'Technology Strategy',
      description: 'Aligning business strategy with digital engineering, technical roadmap definition, and technology lifecycle planning.',
      icon: Compass,
    },
    {
      title: 'Enterprise Architecture',
      description: 'TOGAF and domain-driven design architectures that eliminate technical debt and ensure sustainable cross-system cohesion.',
      icon: Layers,
    },
    {
      title: 'Systems Implementation',
      description: 'Flawless execution of complex enterprise deployments with zero unscheduled downtime and automated verification.',
      icon: Hammer,
    },
    {
      title: 'Seamless Integration',
      description: 'Custom API gateways, event buses, and asynchronous messaging brokers uniting disparate enterprise software suites.',
      icon: Network,
    },
    {
      title: 'Professional Services',
      description: 'Senior embedded engineering teams providing hands-on staff augmentation and specialized deep-tech leadership.',
      icon: Briefcase,
    },
    {
      title: 'Managed Services',
      description: '24/7/365 proactive infrastructure monitoring, incident remediation, and SLA-backed operational continuity.',
      icon: Headphones,
    },
    {
      title: 'Enterprise Modernization',
      description: 'Deconstructing brittle monolithic architectures into modern modular services without interrupting production business.',
      icon: RefreshCcw,
    },
    {
      title: 'Technology Consulting',
      description: 'Independent vendor assessment, hardware/software procurement strategy, and digital transformation audits.',
      icon: Lightbulb,
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
            <span>SERVICES</span>
            <span>/</span>
            <span className="text-white">IT SOLUTIONS</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-6">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.15]">
                IT Solutions & <br />
                <span className="text-[#F4BC43]">Consulting.</span>
              </h1>
              <p className="text-base sm:text-lg text-[#B7C0CC] leading-relaxed max-w-2xl font-normal">
                Strategy, architecture, implementation, and managed services. We bridge the gap between organizational ambition and hardened technology execution.
              </p>
              <div className="pt-2 flex flex-wrap gap-4">
                <Link
                  to="/contact"
                  className="px-6 py-3 rounded-md bg-[#F4BC43] hover:bg-[#FFD76A] text-[#020B18] font-bold text-sm tracking-wide transition-all shadow-md shadow-[#F4BC43]/20"
                >
                  Consult Senior Strategists →
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-cyan-950/40 relative">
                <img
                  src={IMAGES.serviceIt}
                  alt="IT Solutions and Consulting"
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#020B18] via-transparent to-transparent opacity-60" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8 Core Pillars Grid */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-16">
          <div className="inline-block relative">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              End-to-End Enterprise Advisory
            </h2>
            <div className="w-12 h-[2.5px] bg-[#F4BC43] mx-auto mt-3 rounded-full" />
          </div>
          <p className="text-sm sm:text-base text-[#B7C0CC] max-w-2xl mx-auto">
            From board-level digital strategy to 24/7 managed infrastructure operations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((item, idx) => {
            const IconComp = item.icon;
            return (
              <div
                key={idx}
                className="enterprise-card p-6 rounded-xl flex flex-col justify-between group space-y-4"
              >
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-xl bg-white/[0.04] border border-[#18BFF2]/30 flex items-center justify-center text-[#18BFF2] group-hover:text-[#F4BC43] group-hover:border-[#F4BC43] transition-all">
                    <IconComp className="w-6 h-6 stroke-[1.6]" />
                  </div>
                  <h3 className="text-lg font-bold text-white tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#B7C0CC] leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-white/[0.06] flex items-center text-xs font-semibold text-[#F4BC43] group-hover:text-[#FFD76A]">
                  <span>Proven Practice</span>
                  <CheckCircle2 className="w-3.5 h-3.5 ml-1.5 text-emerald-400" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Final CTA */}
      <CtaSection />
    </div>
  );
};
