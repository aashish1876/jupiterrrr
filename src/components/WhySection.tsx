import React from 'react';
import { Gem, Target, ShieldCheck, Users } from 'lucide-react';

export const WhySection: React.FC = () => {
  const pillars = [
    {
      title: 'Deep Expertise',
      description: 'Real-world experience across AI, cybersecurity, cloud and enterprise IT.',
      icon: Gem,
    },
    {
      title: 'Practical Solutions',
      description: 'Results-driven, scalable and efficient.',
      icon: Target,
    },
    {
      title: 'Security by Design',
      description: 'Privacy, protection and compliance built in.',
      icon: ShieldCheck,
    },
    {
      title: 'Client-Centric',
      description: 'Your goals, our priority.',
      icon: Users,
    },
  ];

  return (
    <section className="bg-[#020B18] py-16 sm:py-24 border-b border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Heading */}
        <div className="text-center space-y-3 mb-12 sm:mb-16">
          <div className="inline-block relative">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white font-sans">
              Why JupiterGenX AI
            </h2>
            <div className="w-12 h-[2.5px] bg-[#F4BC43] mx-auto mt-3 rounded-full" />
          </div>
        </div>

        {/* 4 Pillars with Vertical Dividers */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 lg:divide-x divide-white/10 text-center">
          {pillars.map((pillar, index) => {
            const IconComp = pillar.icon;
            return (
              <div
                key={index}
                className="flex flex-col items-center px-4 sm:px-6 space-y-4 group cursor-default"
              >
                <div className="w-14 h-14 rounded-2xl bg-white/[0.03] border border-[#F4BC43]/20 flex items-center justify-center text-[#F4BC43] group-hover:border-[#F4BC43] group-hover:scale-108 transition-all">
                  <IconComp className="w-7 h-7 stroke-[1.5]" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight font-sans">
                  {pillar.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#B7C0CC] leading-relaxed max-w-xs mx-auto">
                  {pillar.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
