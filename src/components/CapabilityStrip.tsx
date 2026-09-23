import React from 'react';
import { Brain, Shield, TrendingUp, Users, Infinity } from 'lucide-react';

export const CapabilityStrip: React.FC = () => {
  const items = [
    {
      icon: Brain,
      title: 'AI-READY',
      subtitle: 'SOLUTIONS',
    },
    {
      icon: Shield,
      title: 'SECURE',
      subtitle: 'BY DESIGN',
    },
    {
      icon: TrendingUp,
      title: 'SCALABLE',
      subtitle: 'TECHNOLOGY',
    },
    {
      icon: Users,
      title: 'PARTNER',
      subtitle: 'FOCUSED',
    },
    {
      icon: Infinity,
      title: 'LONG-TERM',
      subtitle: 'VALUE',
    },
  ];

  return (
    <section className="bg-[#040F1E] border-b border-white/[0.08] py-5 sm:py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-0 lg:divide-x divide-white/10">
          {items.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <div
                key={index}
                className="flex items-center justify-center space-x-3 px-3 py-2 group cursor-default"
              >
                <div className="text-[#18BFF2] group-hover:text-[#38CFFF] transition-colors shrink-0">
                  <IconComponent className="w-6 h-6 stroke-[1.5]" />
                </div>
                <div className="text-left">
                  <div className="text-[11px] sm:text-xs font-bold tracking-wider text-white uppercase font-sans leading-tight">
                    {item.title}
                  </div>
                  <div className="text-[10px] sm:text-[11px] font-semibold tracking-wider text-[#B7C0CC] uppercase font-sans leading-tight">
                    {item.subtitle}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
