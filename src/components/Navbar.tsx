import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowUpRight, Activity } from 'lucide-react';
import { COMPANY_DETAILS } from '../data/jupiterData';

interface NavbarProps {
  onOpenInquiry: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenInquiry }) => {
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>('');

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 30;
      setScrolled(isScrolled);

      // Simple scroll spy
      const sections = ['what-we-do', 'capabilities', 'how-we-work', 'architecture', 'selected-work', 'contact'];
      const scrollPos = window.scrollY + 120;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Overview', href: '#what-we-do', id: 'what-we-do' },
    { label: 'Disciplines', href: '#capabilities', id: 'capabilities' },
    { label: 'Methodology', href: '#how-we-work', id: 'how-we-work' },
    { label: 'Architecture', href: '#architecture', id: 'architecture' },
    { label: 'Work', href: '#selected-work', id: 'selected-work' },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 flex justify-center px-4 sm:px-6 pt-3 sm:pt-4 pointer-events-none">
        <motion.nav
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className={`pointer-events-auto transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] flex items-center justify-between ${
            scrolled
              ? 'w-full max-w-4xl py-2 px-3 sm:px-4 rounded-full glass-island shadow-[0_8px_30px_rgb(0,0,0,0.05)]'
              : 'w-full max-w-6xl py-3 px-4 sm:px-6 rounded-2xl bg-white/70 backdrop-blur-md border border-black/[0.05]'
          }`}
        >
          {/* Brand Logo & Telemetry */}
          <a
            href="#"
            className="flex items-center gap-2.5 group cursor-pointer"
          >
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#0071E3] to-[#005FCC] flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
              <div className="w-2.5 h-2.5 border-2 border-white transform rotate-45" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold tracking-tight text-[#0B0D12] uppercase font-sans leading-none flex items-center gap-1.5">
                {COMPANY_DETAILS.shortName}
                <span className="text-[10px] font-mono-tech font-semibold text-[#0071E3] bg-[#0071E3]/8 px-1.5 py-0.5 rounded-sm">
                  AI
                </span>
              </span>
              <span className="text-[9px] font-mono-tech text-[#667085] hidden sm:block mt-0.5">
                EST. 2015 // TT
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-1 bg-black/[0.03] p-1 rounded-full border border-black/[0.04]">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  className={`relative px-3.5 py-1.5 text-xs font-medium transition-colors rounded-full font-sans ${
                    isActive
                      ? 'text-[#0B0D12] font-semibold'
                      : 'text-[#667085] hover:text-[#0B0D12]'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavTab"
                      className="absolute inset-0 bg-white rounded-full shadow-xs border border-black/[0.06]"
                      transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </a>
              );
            })}
          </div>

          {/* Right Area: System Status & Primary CTA */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-[10px] font-mono-tech text-emerald-700">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>9 TIERS READY</span>
            </div>

            <button
              onClick={onOpenInquiry}
              className="relative inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#0071E3] hover:bg-[#005FCC] text-white text-xs font-semibold tracking-wide transition-all shadow-xs hover:shadow-md hover:shadow-blue-500/20 active:scale-97 cursor-pointer"
            >
              <span>Consultation</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-white/90" />
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </motion.nav>
      </header>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-x-4 top-20 z-50 p-6 rounded-3xl bg-white/95 backdrop-blur-2xl border border-black/[0.08] shadow-2xl md:hidden space-y-5"
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="font-mono-tech text-xs text-[#0071E3] font-semibold uppercase">
                SYSTEM NAVIGATION
              </span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-1 rounded-full hover:bg-slate-100 text-slate-500"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-3 rounded-xl text-sm font-semibold text-slate-800 hover:bg-blue-50 hover:text-[#0071E3] transition-colors flex items-center justify-between"
                >
                  <span>{link.label}</span>
                  <ArrowUpRight className="w-4 h-4 text-slate-400" />
                </a>
              ))}
            </div>

            <div className="pt-2 border-t border-slate-100">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenInquiry();
                }}
                className="w-full py-3.5 rounded-full bg-[#0071E3] text-white text-xs font-bold uppercase tracking-wider shadow-md shadow-blue-500/20 text-center flex items-center justify-center gap-2"
              >
                <span>Initiate System Consultation</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
