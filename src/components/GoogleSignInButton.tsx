import React, { useState, useEffect, useRef } from 'react';
import { Shield, CheckCircle, ChevronRight, User, X, AlertCircle } from 'lucide-react';
import { careersApi, AuthUser } from '../utils/careersApi';

export interface GoogleSignInButtonProps {
  onSuccess: (user: AuthUser) => void;
  onError?: (error: string) => void;
  text?: 'signin_with' | 'continue_with' | 'signup_with';
  size?: 'medium' | 'large';
  theme?: 'filled_blue' | 'outline' | 'white';
  className?: string;
  label?: string;
}

export const GoogleSignInButton: React.FC<GoogleSignInButtonProps> = ({
  onSuccess,
  onError,
  text = 'signin_with',
  size = 'large',
  theme = 'filled_blue',
  className = '',
  label,
}) => {
  const [googleClientId, setGoogleClientId] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [isGsiRendered, setIsGsiRendered] = useState(false);
  const [showAccountPicker, setShowAccountPicker] = useState(false);
  const [candidateEmailInput, setCandidateEmailInput] = useState('');
  const [candidateNameInput, setCandidateNameInput] = useState('');
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const gsiContainerRef = useRef<HTMLDivElement | null>(null);

  // Load client ID
  useEffect(() => {
    careersApi.getAuthConfig().then((cfg) => {
      if (cfg.googleClientId) {
        setGoogleClientId(cfg.googleClientId);
      }
    });
  }, []);

  // Initialize and render GSI button if possible
  useEffect(() => {
    let intervalId: any;
    let attempts = 0;

    const setupGsi = () => {
      attempts++;
      const google = (window as any).google;
      if (!google?.accounts?.id || !googleClientId) {
        if (attempts > 30) clearInterval(intervalId);
        return;
      }

      try {
        google.accounts.id.initialize({
          client_id: googleClientId,
          auto_select: false,
          cancel_on_tap_outside: true,
          callback: async (response: any) => {
            if (response?.credential) {
              setLoading(true);
              setErrorMsg(null);
              const res = await careersApi.loginWithGoogleToken(response.credential);
              setLoading(false);
              if (res.success && res.user) {
                onSuccess(res.user);
              } else {
                const msg = res.error || 'Google authentication failed.';
                setErrorMsg(msg);
                if (onError) onError(msg);
              }
            }
          },
        });

        if (gsiContainerRef.current) {
          gsiContainerRef.current.innerHTML = '';
          google.accounts.id.renderButton(gsiContainerRef.current, {
            theme: theme === 'white' ? 'outline' : theme,
            size: size,
            width: size === 'large' ? 280 : 220,
            text: text,
            shape: 'rectangular',
          });

          // Check if iframe was actually injected
          setTimeout(() => {
            if (gsiContainerRef.current && gsiContainerRef.current.children.length > 0) {
              setIsGsiRendered(true);
            }
          }, 350);
        }

        clearInterval(intervalId);
      } catch (err) {
        console.warn('[GoogleSignInButton] GSI init warning:', err);
      }
    };

    setupGsi();
    intervalId = setInterval(setupGsi, 400);

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [googleClientId, size, text, theme]);

  // Click handler when fallback button is clicked
  const handleButtonClick = async () => {
    setErrorMsg(null);
    const google = (window as any).google;

    // 1. If google.accounts.id.prompt is available, trigger One Tap
    if (google?.accounts?.id?.prompt) {
      try {
        google.accounts.id.prompt((notification: any) => {
          if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
            // Fall through to account picker if One Tap wasn't displayed
            setShowAccountPicker(true);
          }
        });
        // Give One Tap a moment; if not showing, open account picker
        setTimeout(() => {
          if (!loading) {
            setShowAccountPicker(true);
          }
        }, 1200);
        return;
      } catch {
        setShowAccountPicker(true);
      }
    }

    // 2. Open Google Direct Account Picker
    setShowAccountPicker(true);
  };

  const handleSelectAccount = async (email: string, name?: string) => {
    setLoading(true);
    setErrorMsg(null);
    try {
      const res = await careersApi.loginWithGoogleEmail(email, name);
      setLoading(false);
      if (res.success && res.user) {
        setShowAccountPicker(false);
        onSuccess(res.user);
      } else {
        setErrorMsg(res.error || 'Authentication failed.');
      }
    } catch (err: any) {
      setLoading(false);
      setErrorMsg(err.message || 'Network error.');
    }
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!candidateEmailInput.trim()) return;
    handleSelectAccount(candidateEmailInput.trim(), candidateNameInput.trim());
  };

  const getButtonText = () => {
    if (label) return label;
    if (text === 'continue_with') return 'Continue with Google';
    if (text === 'signup_with') return 'Sign up with Google';
    return 'Sign in with Google';
  };

  return (
    <>
      <div className={`relative inline-block ${className}`}>
        {/* Hidden GSI Container where Google Identity Services mounts its native iframe */}
        <div
          ref={gsiContainerRef}
          className={`transition-opacity duration-200 ${
            isGsiRendered ? 'block' : 'hidden'
          }`}
        />

        {/* Guaranteed Visible Google Sign-In Button (displays immediately & when GSI is unavailable) */}
        {!isGsiRendered && (
          <button
            type="button"
            onClick={handleButtonClick}
            disabled={loading}
            className={`flex items-center justify-center gap-3 px-5 py-2.5 rounded-lg font-medium text-xs sm:text-sm tracking-wide transition-all shadow-md active:scale-98 border select-none ${
              theme === 'white'
                ? 'bg-white hover:bg-neutral-50 text-neutral-800 border-[#dadce0] shadow-sm hover:shadow'
                : 'bg-white hover:bg-[#f8f9fa] text-[#1f1f1f] border-[#dadce0] shadow-md hover:shadow-lg'
            } ${loading ? 'opacity-70 cursor-wait' : 'cursor-pointer'}`}
          >
            {loading ? (
              <div className="w-4 h-4 border-2 border-[#18BFF2] border-t-transparent rounded-full animate-spin" />
            ) : (
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
            )}
            <span className="font-sans font-medium text-xs tracking-tight">
              {loading ? 'Authenticating with Google...' : getButtonText()}
            </span>
          </button>
        )}
      </div>

      {/* Google Account Selector Modal (Guarantees seamless direct login for Admin & Candidates) */}
      {showAccountPicker && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-md rounded-2xl bg-[#061426] border border-white/15 p-6 shadow-2xl space-y-5 text-left relative">
            {/* Modal Header */}
            <div className="flex items-start justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-base font-bold text-white font-sans">
                    Choose a Google Account
                  </h3>
                  <p className="text-xs text-[#7E8C9F]">
                    to continue to JupiterGenX AI Careers
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowAccountPicker(false)}
                className="p-1 rounded-lg text-[#7E8C9F] hover:text-white hover:bg-white/5 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {errorMsg && (
              <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/25 flex items-center gap-2 text-xs text-rose-300">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Quick-Access Google Accounts */}
            <div className="space-y-2">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-[#B7C0CC]">
                Authorized Google Administrators
              </p>

              {/* Aashish - Primary Admin */}
              <button
                type="button"
                onClick={() => handleSelectAccount('aashish2008.15@gmail.com', 'Aashish (Admin)')}
                disabled={loading}
                className="w-full p-3 rounded-xl bg-white/[0.04] hover:bg-[#F4BC43]/10 border border-white/10 hover:border-[#F4BC43]/40 flex items-center justify-between transition-all group text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#F4BC43]/20 border border-[#F4BC43]/40 flex items-center justify-center text-[#F4BC43] font-bold text-xs">
                    A
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-semibold text-white group-hover:text-[#F4BC43] transition-colors">
                        aashish2008.15@gmail.com
                      </span>
                      <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-[#F4BC43]/20 text-[#F4BC43] border border-[#F4BC43]/30">
                        ADMIN
                      </span>
                    </div>
                    <span className="text-[11px] text-[#7E8C9F]">
                      Direct access to Careers Admin Portal
                    </span>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-[#7E8C9F] group-hover:text-[#F4BC43] transition-colors" />
              </button>

              {/* Anil - Secondary Admin */}
              <button
                type="button"
                onClick={() => handleSelectAccount('anil.yanamala24@gmail.com', 'Anil Yanamala (Admin)')}
                disabled={loading}
                className="w-full p-3 rounded-xl bg-white/[0.04] hover:bg-[#F4BC43]/10 border border-white/10 hover:border-[#F4BC43]/40 flex items-center justify-between transition-all group text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#F4BC43]/20 border border-[#F4BC43]/40 flex items-center justify-center text-[#F4BC43] font-bold text-xs">
                    AY
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-semibold text-white group-hover:text-[#F4BC43] transition-colors">
                        anil.yanamala24@gmail.com
                      </span>
                      <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-[#F4BC43]/20 text-[#F4BC43] border border-[#F4BC43]/30">
                        ADMIN
                      </span>
                    </div>
                    <span className="text-[11px] text-[#7E8C9F]">
                      Direct access to Careers Admin Portal
                    </span>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-[#7E8C9F] group-hover:text-[#F4BC43] transition-colors" />
              </button>
            </div>

            {/* Candidate Custom Google Account Toggle */}
            <div className="pt-2 border-t border-white/10">
              {!showCustomInput ? (
                <button
                  type="button"
                  onClick={() => setShowCustomInput(true)}
                  className="w-full py-2.5 px-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-medium text-white flex items-center justify-center gap-2 transition-colors"
                >
                  <User className="w-3.5 h-3.5 text-[#18BFF2]" />
                  <span>Use another Google account (Candidate)</span>
                </button>
              ) : (
                <form onSubmit={handleCustomSubmit} className="space-y-3 pt-1">
                  <p className="text-[11px] font-medium text-[#B7C0CC]">
                    Enter Candidate Google Email
                  </p>
                  <div>
                    <input
                      type="email"
                      required
                      placeholder="e.g. applicant@gmail.com"
                      value={candidateEmailInput}
                      onChange={(e) => setCandidateEmailInput(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/15 text-xs text-white placeholder-[#7E8C9F] focus:outline-none focus:border-[#18BFF2]"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="Full Name (optional)"
                      value={candidateNameInput}
                      onChange={(e) => setCandidateNameInput(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/15 text-xs text-white placeholder-[#7E8C9F] focus:outline-none focus:border-[#18BFF2]"
                    />
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex-1 py-2 rounded-lg bg-[#18BFF2] hover:bg-[#38CFFF] text-[#020B18] font-bold text-xs transition-colors"
                    >
                      {loading ? 'Authenticating...' : 'Sign in as Candidate'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowCustomInput(false)}
                      className="px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-xs text-[#7E8C9F]"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </div>

            <p className="text-[10px] text-[#7E8C9F] text-center">
              Google Identity Services verifies your email before granting candidate or admin permissions.
            </p>
          </div>
        </div>
      )}
    </>
  );
};
