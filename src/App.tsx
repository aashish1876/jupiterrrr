import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';
import { CustomCursor } from './components/CustomCursor';

// Pages
import { HomePage } from './pages/HomePage';
import { AiAutomationPage } from './pages/AiAutomationPage';
import { CybersecurityPage } from './pages/CybersecurityPage';
import { CloudInfrastructurePage } from './pages/CloudInfrastructurePage';
import { ItSolutionsPage } from './pages/ItSolutionsPage';
import { SoftwareSolutionsPage } from './pages/SoftwareSolutionsPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { TermsPage } from './pages/TermsPage';

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen bg-[#020B18] text-[#FFFFFF] font-sans selection:bg-[#F4BC43]/25 selection:text-[#FFD76A] antialiased flex flex-col justify-between">
        {/* Precision Cursor */}
        <CustomCursor />

        {/* Global Navigation */}
        <Navbar />

        {/* Dynamic Route View */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/ai-automation" element={<AiAutomationPage />} />
            <Route path="/cybersecurity" element={<CybersecurityPage />} />
            <Route path="/cloud-infrastructure" element={<CloudInfrastructurePage />} />
            <Route path="/it-solutions" element={<ItSolutionsPage />} />
            <Route path="/software-digital-solutions" element={<SoftwareSolutionsPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/terms" element={<TermsPage />} />
            {/* Fallback to Home */}
            <Route path="*" element={<HomePage />} />
          </Routes>
        </main>

        {/* Global Authoritative Footer */}
        <Footer />
      </div>
    </BrowserRouter>
  );
}
