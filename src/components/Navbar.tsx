import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { drawerVariants } from '../utils/motion';

interface NavbarProps {
  onOpenInquiry: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenInquiry }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'What We Do', href: '#what-we-do' },
    { label: 'Capabilities', href: '#capabilities' },
    { label: 'Methodology', href: '#how-we-work' },
    { label: 'Architecture', href: '#architecture' },
    { label: 'Selected Work', href: '#selected-work' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ease-out ${
          scrolled
            ? 'bg-[#07080C]/85 backdrop-blur-md py-3.5 shadow-lg shadow-black/40'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between">
          {/* Brand Logo */}
          <a
            href="#"
            className="flex items-center gap-3 group focus:outline-hidden"
            data-cursor-text="HOME"
          >
            <div className="w-7 h-7 flex items-center justify-center rounded bg-gradient-to-br from-[#1E222D] to-[#0A0C11] border border-[#E5C388]/30 group-hover:border-[#E5C388] transition-colors">
              <div className="w-2.5 h-2.5 border border-[#E5C388] rounded-xs rotate-45" />
            </div>

            <div className="flex items-baseline gap-1.5">
              <span className="text-base font-bold tracking-tight text-[#F7F5F0] font-sans">
                JUPITERGENX
              </span>
              <span className="text-xs font-mono-tech font-semibold text-[#E5C388] tracking-wider">
                AI
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links - Uncluttered, minimalist */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.href)}
                className="px-3.5 py-1.5 text-xs font-medium tracking-wider text-slate-300 hover:text-[#FFF8EE] transition-colors uppercase font-mono-tech rounded hover:bg-white/5"
                data-cursor-hover
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Actions */}
          <div className="hidden sm:flex items-center gap-4">
            <button
              onClick={onOpenInquiry}
              data-cursor-text="START"
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-mono-tech font-semibold uppercase tracking-wider text-[#0A0D12] bg-gradient-to-r from-[#E5C388] via-[#DFC28E] to-[#C5A059] hover:brightness-110 rounded transition-all shadow-md shadow-amber-950/30"
            >
              <span>Consult Engineering</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#0A0D12]" />
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-300 hover:text-white rounded bg-white/5 transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-[#E5C388]" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Fullscreen Mobile Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            variants={drawerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-30 bg-[#07080C]/98 backdrop-blur-xl pt-24 px-8 pb-12 flex flex-col justify-between lg:hidden overflow-y-auto"
          >
            <div className="space-y-6">
              <div className="border-b border-white/10 pb-3 flex items-center justify-between">
                <span className="font-mono-tech text-xs tracking-widest text-[#E5C388] uppercase">
                  JUPITERGENX AI NAVIGATION
                </span>
                <span className="font-mono-tech text-[10px] text-slate-400">
                  SAN FERNANDO, TT
                </span>
              </div>

              <div className="flex flex-col space-y-2">
                {navLinks.map((link, idx) => (
                  <button
                    key={link.label}
                    onClick={() => handleNavClick(link.href)}
                    className="flex items-baseline justify-between py-3 border-b border-white/5 text-left group"
                  >
                    <span className="text-xl font-semibold tracking-tight text-[#EDE8DF] group-hover:text-[#E5C388] transition-colors font-sans">
                      {link.label}
                    </span>
                    <span className="font-mono-tech text-xs text-[#E5C388]/60">
                      0{idx + 1}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-8 border-t border-white/10 space-y-4">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenInquiry();
                }}
                className="w-full py-3.5 px-6 rounded bg-gradient-to-r from-[#E5C388] via-[#DFC28E] to-[#C5A059] text-[#0A0D12] font-mono-tech text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2"
              >
                <span>Initiate Consultation</span>
                <ArrowUpRight className="w-4 h-4 text-[#0A0D12]" />
              </button>
              <p className="text-center font-mono-tech text-[10px] text-slate-400">
                JUPITERGENX AI // SYSTEMS THAT LAST
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
