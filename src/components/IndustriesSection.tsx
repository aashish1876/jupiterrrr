import React from 'react';
import { 
  Landmark, 
  Coins, 
  HeartPulse, 
  Factory, 
  Cpu, 
  GraduationCap, 
  Zap, 
  Building2 
} from 'lucide-react';

export const IndustriesSection: React.FC = () => {
  const industries = [
    { name: 'Government', icon: Landmark },
    { name: 'Financial Services', icon: Coins },
    { name: 'Healthcare', icon: HeartPulse },
    { name: 'Manufacturing', icon: Factory },
    { name: 'Technology', icon: Cpu },
    { name: 'Education', icon: GraduationCap },
    { name: 'Energy & Utilities', icon: Zap },
    { name: 'Commercial', icon: Building2 },
  ];

  return (
    <section className="bg-[#040F1E] py-16 sm:py-20 border-b border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Heading */}
        <div className="text-center space-y-3 mb-12 sm:mb-16">
          <div className="inline-block relative">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white font-sans">
              Industries We Serve
            </h2>
            <div className="w-12 h-[2.5px] bg-[#F4BC43] mx-auto mt-3 rounded-full" />
          </div>
        </div>

        {/* 8 Industry Items Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-6 sm:gap-4 text-center">
          {industries.map((ind, index) => {
            const IconComp = ind.icon;
            return (
              <div
                key={index}
                className="flex flex-col items-center justify-center space-y-3 p-4 rounded-xl hover:bg-white/[0.03] transition-all group cursor-default"
              >
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-[#F4BC43] group-hover:scale-110 group-hover:text-[#FFD76A] transition-all">
                  <IconComp className="w-8 h-8 stroke-[1.4]" />
                </div>
                <span className="text-xs sm:text-sm font-semibold text-[#B7C0CC] group-hover:text-white transition-colors leading-tight">
                  {ind.name}
                </span>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
