import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, MapPin, ArrowRight, Sparkles } from 'lucide-react';
import { careersApi, CareerOpportunity } from '../utils/careersApi';

export const CareersSection: React.FC = () => {
  const [opportunities, setOpportunities] = useState<CareerOpportunity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    careersApi
      .getOpportunities()
      .then((opps) => setOpportunities(opps.slice(0, 3)))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="careers" className="py-20 sm:py-24 bg-[#020B18] border-t border-white/[0.08] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#18BFF2]/10 border border-[#18BFF2]/20 text-[#18BFF2] text-xs font-semibold tracking-wider uppercase">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Join Our Team</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-sans">
            Career Opportunities
          </h2>
          <p className="text-sm sm:text-base text-[#B7C0CC] leading-relaxed">
            Build high-consequence enterprise AI systems, cybersecurity architectures, and cloud infrastructure with JupiterGenX AI.
          </p>
        </div>

        {/* Opportunities Grid / List */}
        <div className="mt-12 max-w-5xl mx-auto space-y-4">
          {loading ? (
            <div className="p-12 text-center text-xs text-[#7E8C9F]">
              Loading open opportunities...
            </div>
          ) : opportunities.length === 0 ? (
            <div className="rounded-2xl bg-[#061426]/70 border border-white/10 p-8 sm:p-12 text-center">
              <div className="w-12 h-12 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center mx-auto text-[#F4BC43] mb-4">
                <Briefcase className="w-6 h-6" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white mb-2 font-sans">
                Positions Being Finalized
              </h3>
              <p className="text-xs sm:text-sm text-[#7E8C9F] max-w-lg mx-auto">
                New positions across AI, Cybersecurity, and Cloud are opening shortly.
              </p>
            </div>
          ) : (
            opportunities.map((opp) => (
              <div
                key={opp.id}
                className="p-6 rounded-2xl bg-[#061426] border border-white/10 hover:border-[#18BFF2]/30 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
              >
                <div className="space-y-1.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded text-[11px] font-semibold bg-[#18BFF2]/10 text-[#18BFF2] border border-[#18BFF2]/20">
                      {opp.department}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-white/5 text-[#B7C0CC]">
                      {opp.employmentType}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white font-sans group-hover:text-[#F4BC43] transition-colors">
                    {opp.title}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-[#7E8C9F]">
                    <MapPin className="w-3.5 h-3.5 text-[#F4BC43]" />
                    <span>{opp.location}</span>
                  </div>
                </div>

                <div className="shrink-0">
                  <Link
                    to={`/careers?role=${opp.id}`}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 group-hover:border-[#F4BC43]/40 text-xs font-semibold text-white transition-all"
                  >
                    <span>View Role & Apply</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#F4BC43]" />
                  </Link>
                </div>
              </div>
            ))
          )}

          {/* Bottom Actions */}
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
            <Link
              to="/careers"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#F4BC43] hover:bg-[#FFD76A] text-[#020B18] font-bold text-xs sm:text-sm tracking-wide transition-all shadow-md shadow-[#F4BC43]/20"
            >
              <span>Explore All Opportunities</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/careers"
              className="inline-flex items-center gap-2 text-xs font-semibold text-[#18BFF2] hover:underline py-2"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Track Existing Application Status</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
