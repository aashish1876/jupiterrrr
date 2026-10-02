import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Briefcase,
  MapPin,
  ArrowRight,
  Sparkles,
  Shield,
  CheckCircle,
  UserCheck,
  AlertCircle,
  LogOut,
  ChevronRight,
  ExternalLink,
} from 'lucide-react';
import {
  careersApi,
  CareerOpportunity,
  AuthUser,
} from '../utils/careersApi';

export const CareersSection: React.FC = () => {
  const navigate = useNavigate();
  const [opportunities, setOpportunities] = useState<CareerOpportunity[]>([]);
  const [loading, setLoading] = useState(true);

  // Authentication State
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [authError, setAuthError] = useState<string | null>(null);
  const [googleClientId, setGoogleClientId] = useState<string>('');
  const [adminRedirectNotice, setAdminRedirectNotice] = useState<string | null>(null);

  const googleSectionBtnRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // 1. Fetch opportunities
    careersApi
      .getOpportunities()
      .then((opps) => setOpportunities(opps.filter((o) => o.status === 'OPEN').slice(0, 3)))
      .catch(() => {})
      .finally(() => setLoading(false));

    // 2. Fetch current session & auth config
    checkAuthSession();
  }, []);

  const checkAuthSession = async () => {
    setAuthLoading(true);
    try {
      const config = await careersApi.getAuthConfig();
      if (config.googleClientId) {
        setGoogleClientId(config.googleClientId);
      }

      const me = await careersApi.getAuthMe();
      if (me.authenticated && me.user) {
        setCurrentUser(me.user);
      }
    } catch (err) {
      console.error('[CareersSection] Failed to check auth session:', err);
    } finally {
      setAuthLoading(false);
    }
  };

  const renderGoogleButton = () => {
    const google = (window as any).google;
    if (googleSectionBtnRef.current && google?.accounts?.id && googleClientId) {
      try {
        googleSectionBtnRef.current.innerHTML = '';
        google.accounts.id.renderButton(googleSectionBtnRef.current, {
          theme: 'filled_blue',
          size: 'large',
          width: 280,
          text: 'signin_with',
          shape: 'rectangular',
        });
      } catch (err) {
        console.error('[CareersSection] renderButton error:', err);
      }
    }
  };

  // Initialize Google Identity Services
  useEffect(() => {
    let intervalId: any;

    const initGsi = () => {
      const google = (window as any).google;
      if (google?.accounts?.id && googleClientId) {
        try {
          google.accounts.id.initialize({
            client_id: googleClientId,
            auto_select: false,
            callback: async (response: any) => {
              if (response?.credential) {
                setAuthLoading(true);
                setAuthError(null);
                setAdminRedirectNotice(null);

                const res = await careersApi.loginWithGoogleToken(response.credential);
                setAuthLoading(false);

                if (!res.success || !res.user) {
                  setAuthError(res.error || 'Google authentication failed. Please try again.');
                  return;
                }

                const verifiedUser = res.user;
                setCurrentUser(verifiedUser);

                // Admin Authorization Check
                if (verifiedUser.isAdmin) {
                  setAdminRedirectNotice(
                    `Verified Administrator matched (${verifiedUser.email}). Opening Careers Admin Dashboard...`
                  );
                  setTimeout(() => {
                    navigate('/careers/admin');
                  }, 900);
                }
              }
            },
          });

          renderGoogleButton();
          clearInterval(intervalId);
        } catch (err) {
          console.error('[CareersSection] Google Identity init error:', err);
        }
      }
    };

    if (!currentUser) {
      initGsi();
      intervalId = setInterval(initGsi, 300);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [googleClientId, currentUser]);

  const handleLogout = async () => {
    await careersApi.logout();
    setCurrentUser(null);
    setAdminRedirectNotice(null);
    setAuthError(null);
  };

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

        {/* Google Identity Services Authentication Widget */}
        <div className="mt-8 max-w-3xl mx-auto">
          {adminRedirectNotice && (
            <div className="mb-4 p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between gap-3 text-xs text-amber-300 animate-pulse">
              <div className="flex items-center gap-2.5">
                <Shield className="w-4 h-4 text-[#F4BC43] shrink-0" />
                <span>{adminRedirectNotice}</span>
              </div>
              <Link
                to="/careers/admin"
                className="px-3 py-1 rounded bg-[#F4BC43] text-[#020B18] font-bold text-[11px] shrink-0 hover:bg-[#FFD76A] transition-colors"
              >
                Go Now
              </Link>
            </div>
          )}

          {authError && (
            <div className="mb-4 p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/25 flex items-start gap-2.5 text-xs text-rose-300">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-400" />
              <span>{authError}</span>
            </div>
          )}

          {/* Authenticated State */}
          {currentUser ? (
            <div className="p-4 sm:p-5 rounded-2xl bg-[#061426] border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-lg">
              <div className="flex items-center gap-3">
                {currentUser.picture ? (
                  <img
                    src={currentUser.picture}
                    alt={currentUser.name}
                    className="w-10 h-10 rounded-full border border-white/20 object-cover"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#F4BC43]">
                    <UserCheck className="w-5 h-5" />
                  </div>
                )}
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-white">{currentUser.name}</span>
                    {currentUser.isAdmin ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-[#F4BC43]/20 text-[#F4BC43] border border-[#F4BC43]/30">
                        <Shield className="w-2.5 h-2.5" />
                        Authorized Admin
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold bg-[#18BFF2]/10 text-[#18BFF2] border border-[#18BFF2]/20">
                        <CheckCircle className="w-2.5 h-2.5 text-emerald-400" />
                        Verified Candidate
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-[#7E8C9F]">{currentUser.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 shrink-0">
                {currentUser.isAdmin ? (
                  <Link
                    to="/careers/admin"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#F4BC43] hover:bg-[#FFD76A] text-[#020B18] font-bold text-xs transition-colors shadow-md shadow-[#F4BC43]/15"
                  >
                    <Shield className="w-3.5 h-3.5" />
                    <span>Open Admin Portal</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                ) : (
                  <Link
                    to="/careers?tab=tracking"
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white border border-white/10 font-medium text-xs transition-colors"
                  >
                    <span>Track Applications</span>
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  title="Sign out of Google"
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-[#7E8C9F] hover:text-white transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            /* Unauthenticated: Google Identity Services Sign-In Card */
            <div className="p-5 sm:p-6 rounded-2xl bg-[#061426]/90 border border-white/10 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-5">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-[#F4BC43]" />
                  <span className="text-xs font-bold text-white uppercase tracking-wider">
                    Google Identity Services Access
                  </span>
                </div>
                <p className="text-xs text-[#B7C0CC] max-w-md">
                  Sign in with Google to submit verified applications or access the Careers Admin Dashboard if authorized.
                </p>
              </div>

              <div className="shrink-0 flex items-center justify-center">
                {authLoading ? (
                  <div className="h-10 px-6 rounded-lg bg-white/5 border border-white/10 flex items-center gap-2 text-xs text-[#7E8C9F]">
                    <div className="w-3.5 h-3.5 border-2 border-[#F4BC43] border-t-transparent rounded-full animate-spin" />
                    <span>Connecting Google Identity...</span>
                  </div>
                ) : (
                  <div
                    ref={(el) => {
                      googleSectionBtnRef.current = el;
                      renderGoogleButton();
                    }}
                    id="google-section-signin-btn"
                    className="min-h-[44px] flex items-center justify-center"
                  />
                )}
              </div>
            </div>
          )}
        </div>

        {/* Opportunities Grid / List */}
        <div className="mt-10 max-w-5xl mx-auto space-y-4">
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

                <div className="shrink-0 flex items-center gap-2">
                  <Link
                    to={`/careers?role=${opp.id}`}
                    className="inline-flex items-center gap-1 px-4 py-2.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-medium text-[#B7C0CC] hover:text-white transition-all"
                  >
                    <span>View Role</span>
                  </Link>

                  {currentUser?.isAdmin ? (
                    <Link
                      to="/careers/admin"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#F4BC43]/20 hover:bg-[#F4BC43]/30 border border-[#F4BC43]/40 text-xs font-semibold text-[#F4BC43] transition-all"
                    >
                      <Shield className="w-3.5 h-3.5" />
                      <span>Review in Admin</span>
                    </Link>
                  ) : (
                    <Link
                      to={`/careers?apply=${opp.id}`}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 group-hover:border-[#F4BC43]/40 text-xs font-semibold text-white transition-all"
                    >
                      <span>{currentUser ? 'Quick Apply' : 'Apply with Google'}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#F4BC43]" />
                    </Link>
                  )}
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
              to="/careers?tab=tracking"
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
