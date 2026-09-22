import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { IntroSection } from './components/IntroSection';
import { CapabilitiesSection } from './components/CapabilitiesSection';
import { ApproachSection } from './components/ApproachSection';
import { ArchitectureTopologySection } from './components/ArchitectureTopologySection';
import { CaseStudiesSection } from './components/CaseStudiesSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { CapabilityModal } from './components/CapabilityModal';
import { CaseStudyModal } from './components/CaseStudyModal';
import { CustomCursor } from './components/CustomCursor';
import { CapabilityItem, ArchitecturalCaseStudy } from './types';

export default function App() {
  const [selectedCapability, setSelectedCapability] = useState<CapabilityItem | null>(null);
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<ArchitecturalCaseStudy | null>(null);
  const [inquiryCategory, setInquiryCategory] = useState<string | undefined>(undefined);

  const handleOpenInquiry = (category?: string) => {
    if (category) {
      setInquiryCategory(category);
    }
    const contactEl = document.getElementById('contact');
    contactEl?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#FFFFFF] text-[#0B0D12] font-sans selection:bg-[#0071E3]/15 selection:text-[#005FCC] antialiased">
      {/* Desktop Precision Cursor */}
      <CustomCursor />

      {/* Primary Fixed Floating Navigation */}
      <Navbar onOpenInquiry={() => handleOpenInquiry()} />

      {/* Main Continuous Systemic Storytelling Flow:
          HERO → WHAT JUPITER DOES → BUILD / INTELLIGENCE / TRANSFORM / OPERATE → HOW WE WORK → SYSTEM ARCHITECTURE → SELECTED WORK → CONTACT */}
      <main className="relative">
        {/* 00: HERO */}
        <HeroSection onOpenInquiry={(cat) => handleOpenInquiry(cat)} />

        {/* 01: WHAT JUPITER DOES */}
        <IntroSection />

        {/* 02: BUILD / INTELLIGENCE / TRANSFORM / OPERATE */}
        <CapabilitiesSection
          onSelectCapability={(cap) => setSelectedCapability(cap)}
          onOpenInquiry={(cat) => handleOpenInquiry(cat)}
        />

        {/* 03: HOW WE WORK */}
        <ApproachSection />

        {/* 04: SYSTEM ARCHITECTURE */}
        <ArchitectureTopologySection />

        {/* 05: SELECTED WORK */}
        <CaseStudiesSection
          onSelectCaseStudy={(study) => setSelectedCaseStudy(study)}
        />

        {/* 06: CONTACT */}
        <ContactSection initialCategory={inquiryCategory} />
      </main>

      {/* Authoritative Global Footer */}
      <Footer />

      {/* Deep-dive specification modals (Progressive Disclosure) */}
      <CapabilityModal
        capability={selectedCapability}
        onClose={() => setSelectedCapability(null)}
        onOpenInquiry={(cat) => handleOpenInquiry(cat)}
      />

      <CaseStudyModal
        caseStudy={selectedCaseStudy}
        onClose={() => setSelectedCaseStudy(null)}
        onOpenInquiry={() => handleOpenInquiry()}
      />
    </div>
  );
}
