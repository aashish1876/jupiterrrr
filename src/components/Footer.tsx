import React from 'react';
import { Link } from 'react-router-dom';
import { Linkedin, Youtube, Mail } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#020B18] border-t border-white/[0.08] pt-12 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Main Footer Row */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 pb-8 border-b border-white/[0.08]">
          
          {/* Left: Official Logo */}
          <Link to="/" className="flex items-center group">
            <img
              src="/jupiterlogo.png"
              alt="JupiterGenX AI - Innovate. Secure. Transform."
              className="h-10 sm:h-12 w-auto object-contain transition-transform group-hover:scale-102"
            />
          </Link>

          {/* Center: Nav Links with Divider Pipes */}
          <nav className="flex flex-wrap items-center justify-center gap-x-3 sm:gap-x-4 gap-y-2 text-xs sm:text-sm font-medium text-[#B7C0CC]">
            <Link to="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span className="text-white/20">|</span>
            <Link to="/ai-automation" className="hover:text-white transition-colors">
              Services
            </Link>
            <span className="text-white/20">|</span>
            <Link to="/about" className="hover:text-white transition-colors">
              About
            </Link>
            <span className="text-white/20">|</span>
            <Link to="/contact" className="hover:text-white transition-colors">
              Contact
            </Link>
            <span className="text-white/20">|</span>
            <Link to="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <span className="text-white/20">|</span>
            <Link to="/terms" className="hover:text-white transition-colors">
              Terms
            </Link>
          </nav>

          {/* Right: Social Icons */}
          <div className="flex items-center space-x-4">
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="w-9 h-9 rounded-lg bg-white/[0.04] border border-white/10 flex items-center justify-center text-[#18BFF2] hover:text-white hover:border-[#18BFF2]/50 hover:bg-[#18BFF2]/10 transition-all"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>

            {/* X (Twitter) custom SVG */}
            <a
              href="https://x.com"
              target="_blank"
              rel="noreferrer"
              className="w-9 h-9 rounded-lg bg-white/[0.04] border border-white/10 flex items-center justify-center text-[#18BFF2] hover:text-white hover:border-[#18BFF2]/50 hover:bg-[#18BFF2]/10 transition-all"
              aria-label="X"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>

            <a
              href="https://youtube.com"
              target="_blank"
              rel="noreferrer"
              className="w-9 h-9 rounded-lg bg-white/[0.04] border border-white/10 flex items-center justify-center text-[#18BFF2] hover:text-white hover:border-[#18BFF2]/50 hover:bg-[#18BFF2]/10 transition-all"
              aria-label="YouTube"
            >
              <Youtube className="w-4 h-4" />
            </a>

            <Link
              to="/contact"
              className="w-9 h-9 rounded-lg bg-white/[0.04] border border-white/10 flex items-center justify-center text-[#18BFF2] hover:text-white hover:border-[#18BFF2]/50 hover:bg-[#18BFF2]/10 transition-all"
              aria-label="Email Us"
            >
              <Mail className="w-4 h-4" />
            </Link>
          </div>

        </div>

        {/* Bottom Attribution Row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-sans text-[#7E8C9F]">
          <div>
            © 2026 JupiterGenX AI LLC. All rights reserved.
          </div>
          <div className="font-bold tracking-[0.2em] text-[#F4BC43] uppercase text-[11px] sm:text-xs">
            INNOVATE. SECURE. TRANSFORM.
          </div>
        </div>

      </div>
    </footer>
  );
};
