import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { IMAGES } from '../assets/images';

export const CtaSection: React.FC = () => {
  return (
    <section className="relative overflow-hidden py-20 sm:py-28 bg-[#020B18]">
      {/* Background Mountain Horizon Image with Overlays */}
      <div className="absolute inset-0 z-0">
        <img
          src={IMAGES.ctaMountain}
          alt="JupiterGenX Horizon"
          className="w-full h-full object-cover object-center"
        />
        {/* Navy and Gold Atmospheric Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#020B18]/95 via-[#020B18]/80 to-[#020B18]/90" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#020B18] via-transparent to-[#020B18]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
          
          {/* Left/Center Content */}
          <div className="text-center lg:text-left space-y-4 max-w-2xl">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight font-sans">
              Let’s Build a Smarter, Safer Tomorrow
            </h2>
            <p className="text-sm sm:text-base text-[#B7C0CC] leading-relaxed">
              Partner with JupiterGenX AI to turn your technology vision into reality.
            </p>
            <div className="pt-3">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-md bg-[#F4BC43] hover:bg-[#FFD76A] text-[#020B18] font-bold text-sm tracking-wide transition-all shadow-md shadow-[#F4BC43]/25 hover:shadow-lg hover:shadow-[#F4BC43]/35 active:scale-98"
              >
                <span>Get in Touch</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right Brand Motto Banner */}
          <div className="text-center lg:text-right shrink-0">
            <div className="space-y-1">
              <div className="text-base sm:text-lg font-bold tracking-[0.25em] text-white uppercase font-sans">
                INNOVATE.
              </div>
              <div className="text-base sm:text-lg font-bold tracking-[0.25em] text-white uppercase font-sans">
                SECURE.
              </div>
              <div className="text-base sm:text-lg font-bold tracking-[0.25em] text-white uppercase font-sans">
                TRANSFORM.
              </div>
            </div>
            <div className="w-16 h-[2.5px] bg-[#F4BC43] mx-auto lg:ml-auto lg:mr-0 mt-3 rounded-full" />
          </div>

        </div>
      </div>
    </section>
  );
};
