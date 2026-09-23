import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'AI & Automation', path: '/ai-automation' },
    { name: 'Cybersecurity', path: '/cybersecurity' },
    { name: 'Cloud & Infrastructure', path: '/cloud-infrastructure' },
    { name: 'IT Solutions', path: '/it-solutions' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#020B18]/90 backdrop-blur-md border-b border-white/10 shadow-lg shadow-black/40 py-3'
          : 'bg-[#020B18] border-b border-white/[0.08] py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo on Left: Official jupiterlogo.png */}
          <Link to="/" className="flex items-center group">
            <img
              src="/jupiterlogo.png"
              alt="JupiterGenX AI"
              className="h-9 sm:h-11 w-auto object-contain transition-transform group-hover:scale-102"
            />
          </Link>

          {/* Desktop Center/Right Navigation */}
          <div className="hidden lg:flex items-center space-x-7 xl:space-x-8">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-xs xl:text-sm font-medium tracking-wide transition-colors relative py-1 ${
                    active
                      ? 'text-white font-semibold'
                      : 'text-[#B7C0CC] hover:text-white'
                  }`}
                >
                  {link.name}
                  {active && (
                    <span className="absolute -bottom-1.5 left-0 right-0 h-[2px] bg-[#F4BC43] rounded-full" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Right CTA: Premium Gold Button */}
          <div className="hidden sm:flex items-center">
            <Link
              to="/contact"
              className="px-5 py-2 rounded-md bg-[#F4BC43] hover:bg-[#FFD76A] text-[#020B18] text-xs xl:text-sm font-bold tracking-wide transition-all duration-200 shadow-sm hover:shadow-md hover:shadow-[#F4BC43]/20 active:scale-98"
            >
              Get in Touch
            </Link>
          </div>

          {/* Mobile Hamburger Menu Toggle */}
          <div className="flex lg:hidden items-center space-x-3">
            <Link
              to="/contact"
              className="px-3.5 py-1.5 rounded-md bg-[#F4BC43] text-[#020B18] text-xs font-bold sm:hidden"
            >
              Contact
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-[#B7C0CC] hover:text-white hover:bg-white/5 focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#061426] border-b border-white/10 px-4 pt-3 pb-6 space-y-2">
          {navLinks.map((link) => {
            const active = isActive(link.path);
            return (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  active
                    ? 'text-[#F4BC43] bg-white/5 font-semibold'
                    : 'text-[#B7C0CC] hover:text-white hover:bg-white/5'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
          <div className="pt-4 border-t border-white/10">
            <Link
              to="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full text-center py-2.5 rounded-md bg-[#F4BC43] text-[#020B18] font-bold text-sm"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};
