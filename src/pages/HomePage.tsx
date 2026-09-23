import React from 'react';
import { HeroSection } from '../components/HeroSection';
import { CapabilityStrip } from '../components/CapabilityStrip';
import { ServicesSection } from '../components/ServicesSection';
import { IndustriesSection } from '../components/IndustriesSection';
import { WhySection } from '../components/WhySection';
import { CtaSection } from '../components/CtaSection';

export const HomePage: React.FC = () => {
  return (
    <div className="bg-[#020B18]">
      <HeroSection />
      <CapabilityStrip />
      <ServicesSection />
      <IndustriesSection />
      <WhySection />
      <CtaSection />
    </div>
  );
};
