import React from 'react';
import { HeroSection } from '../components/HeroSection';
import { CapabilityStrip } from '../components/CapabilityStrip';
import { ServicesSection } from '../components/ServicesSection';
import { ResponsibleAiSection } from '../components/ResponsibleAiSection';
import { ApproachSection } from '../components/ApproachSection';
import { IndustriesSection } from '../components/IndustriesSection';
import { WhySection } from '../components/WhySection';
import { CareersSection } from '../components/CareersSection';
import { CtaSection } from '../components/CtaSection';

export const HomePage: React.FC = () => {
  return (
    <div className="bg-[#020B18]">
      {/* 01: Hero Section */}
      <HeroSection />

      {/* 02: Capability Strip */}
      <CapabilityStrip />

      {/* 03: What We Do (5 Service Cards) */}
      <ServicesSection />

      {/* 04: Responsible AI Section (AI Innovation Built on Trust) */}
      <ResponsibleAiSection />

      {/* 05: Our Approach (Horizontal 5-Step Process) */}
      <ApproachSection />

      {/* 06: Industries Served */}
      <IndustriesSection />

      {/* 07: Why JupiterGenX AI */}
      <WhySection />

      {/* 08: Careers Section */}
      <CareersSection />

      {/* 09: Institutional Call to Action */}
      <CtaSection />
    </div>
  );
};
