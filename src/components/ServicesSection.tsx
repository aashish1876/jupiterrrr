import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Bot, ShieldCheck, Cloud, Cpu, Code2 } from 'lucide-react';
import { IMAGES } from '../assets/images';

export const ServicesSection: React.FC = () => {
  const services = [
    {
      title: 'AI & Automation',
      description:
        'Generative AI, AI agents, intelligent automation, enterprise AI integration and responsible AI adoption.',
      image: IMAGES.serviceAi,
      path: '/ai-automation',
      icon: Bot,
      tags: ['Generative AI', 'AI Agents', 'Automation'],
    },
    {
      title: 'Cybersecurity & Data Protection',
      description:
        'Security architecture, AI security, privacy, governance, cyber resilience, backup and data protection.',
      image: IMAGES.serviceSecurity,
      path: '/cybersecurity',
      icon: ShieldCheck,
      tags: ['AI Security', 'Zero Trust', 'Governance'],
    },
    {
      title: 'Cloud & Infrastructure',
      description:
        'Cloud transformation, enterprise infrastructure, storage, virtualization, backup, recovery and modernization.',
      image: IMAGES.serviceCloud,
      path: '/cloud-infrastructure',
      icon: Cloud,
      tags: ['Multi-Cloud', 'Modernization', 'Resilience'],
    },
    {
      title: 'IT Solutions & Consulting',
      description:
        'Technology strategy, architecture, implementation, migration, optimization and professional services.',
      image: IMAGES.serviceIt,
      path: '/it-solutions',
      icon: Cpu,
      tags: ['IT Strategy', 'Enterprise Architecture', 'Integration'],
    },
    {
      title: 'Software & Digital Solutions',
      description:
        'Custom applications, APIs, integrations, AI-enabled solutions and digital platforms.',
      image: IMAGES.serviceSoftware,
      path: '/software-digital-solutions',
      icon: Code2,
      tags: ['Custom Apps', 'APIs & Systems', 'AI-Enabled'],
    },
  ];

  return (
    <section id="what-we-do" className="bg-[#020B18] py-16 sm:py-24 border-b border-white/[0.08] relative">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[350px] bg-[#18BFF2]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading & Subheading */}
        <div className="text-center space-y-4 mb-14 sm:mb-16">
          <div className="inline-block">
            <span className="text-xs sm:text-sm font-bold tracking-[0.25em] text-[#18BFF2] uppercase font-sans">
              WHAT WE DO
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white font-sans">
            Technology Built for What’s Next
          </h2>

          <div className="w-16 h-[2.5px] bg-[#F4BC43] mx-auto rounded-full" />

          <p className="text-sm sm:text-base md:text-lg text-[#B7C0CC] max-w-3xl mx-auto font-normal leading-relaxed pt-2">
            From AI adoption to enterprise infrastructure, JupiterGenX AI brings together emerging technology, cybersecurity and practical IT expertise to solve complex business and technology challenges.
          </p>
        </div>

        {/* 5 Service Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className="enterprise-card rounded-xl overflow-hidden flex flex-col justify-between group transition-all duration-300 hover:border-[#18BFF2]/40"
              >
                <div>
                  {/* Visual Image Header */}
                  <div className="relative h-44 sm:h-40 overflow-hidden bg-[#061426]">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover transform group-hover:scale-106 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#091A2D] via-transparent to-transparent opacity-90" />
                    
                    {/* Floating service badge icon */}
                    <div className="absolute top-3 right-3 w-8 h-8 rounded-lg bg-[#020B18]/80 backdrop-blur-sm border border-white/10 flex items-center justify-center text-[#F4BC43] group-hover:text-[#38CFFF] transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5 space-y-3">
                    <h3 className="text-base sm:text-lg font-bold text-white tracking-tight group-hover:text-[#38CFFF] transition-colors font-sans line-clamp-2">
                      {service.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#B7C0CC] leading-relaxed line-clamp-4">
                      {service.description}
                    </p>

                    {/* Micro pills */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {service.tags.map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="text-[10px] px-2 py-0.5 rounded bg-white/[0.05] text-[#B7C0CC] border border-white/[0.08]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Footer: Learn More Link */}
                <div className="px-5 pb-5 pt-2 border-t border-white/[0.06] mt-4">
                  <Link
                    to={service.path}
                    className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#F4BC43] hover:text-[#FFD76A] transition-colors"
                  >
                    <span>Explore Capability</span>
                    <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1.5 transition-transform" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Global Action Footer */}
        <div className="mt-12 text-center">
          <Link
            to="/solutions"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-[#091A2D] hover:bg-[#061426] text-white border border-[#F4BC43]/40 hover:border-[#F4BC43] font-semibold text-sm transition-all shadow-sm"
          >
            <span>View Comprehensive Solutions Directory</span>
            <ArrowRight className="w-4 h-4 text-[#F4BC43]" />
          </Link>
        </div>

      </div>
    </section>
  );
};
