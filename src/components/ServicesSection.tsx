import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { IMAGES } from '../assets/images';

export const ServicesSection: React.FC = () => {
  const services = [
    {
      title: 'AI & Automation',
      description: 'Generative AI, AI agents, workflow automation and enterprise AI adoption.',
      image: IMAGES.serviceAi,
      path: '/ai-automation',
    },
    {
      title: 'Cybersecurity & Data Protection',
      description: 'Security, privacy, governance and cyber resilience for a safer tomorrow.',
      image: IMAGES.serviceSecurity,
      path: '/cybersecurity',
    },
    {
      title: 'Cloud & Infrastructure',
      description: 'Cloud transformation, enterprise infrastructure, storage, backup and modernization.',
      image: IMAGES.serviceCloud,
      path: '/cloud-infrastructure',
    },
    {
      title: 'IT Solutions & Consulting',
      description: 'Strategy, architecture, implementation and managed services.',
      image: IMAGES.serviceIt,
      path: '/it-solutions',
    },
    {
      title: 'Software & Digital Solutions',
      description: 'Custom applications, integrations and AI-enabled solutions.',
      image: IMAGES.serviceSoftware,
      path: '/software-digital-solutions',
    },
  ];

  return (
    <section className="bg-[#020B18] py-16 sm:py-24 border-b border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center space-y-3 mb-12 sm:mb-16">
          <div className="inline-block relative">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white font-sans">
              Our Services
            </h2>
            <div className="w-12 h-[2.5px] bg-[#F4BC43] mx-auto mt-3 rounded-full" />
          </div>
          <p className="text-sm sm:text-base text-[#B7C0CC] max-w-2xl mx-auto font-normal">
            End-to-end technology solutions to help you innovate, stay secure, and achieve more.
          </p>
        </div>

        {/* 5 Service Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="enterprise-card rounded-xl overflow-hidden flex flex-col justify-between group"
            >
              <div>
                {/* Visual Image Header */}
                <div className="relative h-44 sm:h-40 overflow-hidden bg-[#061426]">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transform group-hover:scale-106 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#081729] via-transparent to-transparent opacity-80" />
                </div>

                {/* Content */}
                <div className="p-5 space-y-2.5">
                  <h3 className="text-base sm:text-lg font-bold text-white tracking-tight group-hover:text-[#38CFFF] transition-colors font-sans">
                    {service.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#B7C0CC] leading-relaxed line-clamp-3">
                    {service.description}
                  </p>
                </div>
              </div>

              {/* Card Footer: Learn More Link */}
              <div className="px-5 pb-5 pt-1">
                <Link
                  to={service.path}
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#F4BC43] hover:text-[#FFD76A] transition-colors"
                >
                  <span>Learn More</span>
                  <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
