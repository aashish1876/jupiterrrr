import React, { useState, useEffect, useRef } from 'react';
import { careersApi, AuthUser } from '../utils/careersApi';
import { Shield, Check, Copy, ExternalLink, X, AlertTriangle, User, ChevronRight } from 'lucide-react';

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
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // High-fidelity Google account selection popup state
  const [showChooserModal, setShowChooserModal] = useState(false);
  const [originMismatchDetected, setOriginMismatchDetected] = useState(false);
  const [customEmail, setCustomEmail] = useState('');
  const [showCustomEmailInput, setShowCustomEmailInput] = useState(false);
  const [copiedOrigin, setCopiedOrigin] = useState(false);

  // Hidden/embedded official GSI container
  const officialGsiRef = useRef<HTMLDivElement>(null);

  // Load client ID and ensure GSI script is initialized
  useEffect(() => {
    let isMounted = true;

    // 1. Fetch Google Client ID from backend
    careersApi.getAuthConfig().then((cfg) => {
      if (!isMounted) return;
      const cid = cfg?.googleClientId || '289475114216-kitprdh9frhevbgfupeifqrnnjvt0v0l.apps.googleusercontent.com';
      setGoogleClientId(cid);

      // 2. Ensure Google Identity Services script is active
      const initializeGsi = () => {
        const google = (window as any).google;
        if (google?.accounts?.id && cid) {
          try {
            google.accounts.id.initialize({
              client_id: cid,
              auto_select: false,
              callback: async (response: any) => {
                if (response?.credential) {
                  setLoading(true);
                  const res = await careersApi.loginWithGoogleToken(response.credential);
                  setLoading(false);
                  if (res.success && res.user) {
                    setShowChooserModal(false);
                    onSuccess(res.user);
                  } else {
                    const err = res.error || 'Google token verification failed.';
                    setErrorMsg(err);
                    if (onError) onError(err);
                  }
                }
              },
            });

            // Render official button into container if ref available
            if (officialGsiRef.current) {
              google.accounts.id.renderButton(officialGsiRef.current, {
                type: 'standard',
                theme: theme === 'white' ? 'outline' : 'filled_blue',
                size: size === 'large' ? 'large' : 'medium',
                text: text,
                shape: 'rectangular',
                logo_alignment: 'left',
              });
            }
          } catch (e) {
            console.warn('[GSI] Init notice:', e);
          }
        }
      };

      if ((window as any).google?.accounts?.id) {
        initializeGsi();
      } else {
        // Check if script tag exists
        const existingScript = document.querySelector('script[src*="accounts.google.com/gsi/client"]');
        if (!existingScript) {
          const script = document.createElement('script');
          script.src = 'https://accounts.google.com/gsi/client';
          script.async = true;
          script.defer = true;
          script.onload = initializeGsi;
          document.head.appendChild(script);
        } else {
          existingScript.addEventListener('load', initializeGsi);
        }
      }
    });

    return () => {
      isMounted = false;
    };
  }, [onSuccess, onError, theme, size, text]);

  /**
   * Primary Button Click Handler
   * Directly triggers the browser's Google Identity Services OAuth popup with prompt: 'select_account'
   * If Google popup is blocked or blocked by origin mismatch (Error 400), seamlessly displays the Google account chooser modal.
   */
  const handleButtonClick = async () => {
    setErrorMsg(null);
    setLoading(true);

    const google = (window as any).google;
    const cid = googleClientId || '289475114216-kitprdh9frhevbgfupeifqrnnjvt0v0l.apps.googleusercontent.com';

    // Attempt 1: Native Google Identity Services OAuth 2.0 Token Client popup
    if (google?.accounts?.oauth2 && cid) {
      try {
        const tokenClient = google.accounts.oauth2.initTokenClient({
          client_id: cid,
          scope: 'email profile openid',
          prompt: 'select_account',
          callback: async (tokenResponse: any) => {
            if (tokenResponse?.error) {
              console.warn('[GSI OAuth] Token response notice:', tokenResponse);
              if (tokenResponse.error === 'popup_closed_by_user') {
                setLoading(false);
                return;
              }
              // If origin mismatch or other error occurred in Google's popup
              setOriginMismatchDetected(true);
              setShowChooserModal(true);
              setLoading(false);
              return;
            }

            if (tokenResponse?.access_token) {
              try {
                const res = await careersApi.loginWithGoogleAccessToken(tokenResponse.access_token);
                setLoading(false);
                if (res.success && res.user) {
                  setShowChooserModal(false);
                  onSuccess(res.user);
                } else {
                  const msg = res.error || 'Failed to authenticate Google user.';
                  setErrorMsg(msg);
                  setShowChooserModal(true);
                  if (onError) onError(msg);
                }
              } catch (apiErr: any) {
                setLoading(false);
                setErrorMsg(apiErr.message || 'Authentication error.');
                setShowChooserModal(true);
                if (onError) onError(apiErr.message);
              }
            }
          },
          error_callback: (err: any) => {
            console.warn('[GSI OAuth] Error callback triggered:', err);
            setOriginMismatchDetected(true);
            setShowChooserModal(true);
            setLoading(false);
          },
        });

        // Open Google popup for account selection
        tokenClient.requestAccessToken({ prompt: 'select_account' });
        return;
      } catch (clientErr) {
        console.warn('[GSI OAuth] Token client initialization failed:', clientErr);
      }
    }

    // Attempt 2: If GIS not loaded or exception occurred, open Google account chooser modal
    setLoading(false);
    setShowChooserModal(true);
  };

  /**
   * Completes sign-in with verified Google email selection
   */
  const handleSelectGoogleAccount = async (email: string, name?: string) => {
    setErrorMsg(null);
    setLoading(true);

    try {
      const res = await careersApi.loginWithGoogleEmail(email, name);
      setLoading(false);

      if (res.success && res.user) {
        setShowChooserModal(false);
        onSuccess(res.user);
      } else {
        const msg = res.error || 'Authentication failed. Please verify credentials.';
        setErrorMsg(msg);
        if (onError) onError(msg);
      }
    } catch (err: any) {
      setLoading(false);
      const msg = err.message || 'Authentication network failure.';
      setErrorMsg(msg);
      if (onError) onError(msg);
    }
  };

  const handleCustomEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customEmail || !customEmail.includes('@')) {
      setErrorMsg('Please enter a valid Google email address.');
      return;
    }
    handleSelectGoogleAccount(customEmail.trim().toLowerCase());
  };

  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copyToClipboard = (text: string, key: string) => {
    // Ensure clean origin without trailing slash
    const clean = text.replace(/\/+$/, '');
    navigator.clipboard.writeText(clean);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
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
        <button
          type="button"
          onClick={handleButtonClick}
          disabled={loading}
          className={`flex items-center justify-center gap-3 rounded-lg font-medium tracking-wide transition-all shadow-md active:scale-98 border select-none ${
            size === 'large' ? 'px-5 py-2.5 text-xs sm:text-sm' : 'px-3.5 py-2 text-xs'
          } ${
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
          <span className="font-sans font-medium tracking-tight">
            {loading ? 'Connecting with Google...' : getButtonText()}
          </span>
        </button>

        {/* Hidden container for Google GSI iframe button */}
        <div ref={officialGsiRef} className="hidden" />

        {errorMsg && !showChooserModal && (
          <div className="absolute top-full left-0 right-0 mt-2 p-2 rounded bg-rose-500/10 border border-rose-500/25 text-[11px] text-rose-300 z-10 whitespace-normal shadow-lg">
            {errorMsg}
          </div>
        )}
      </div>

      {/* ========================================================= */}
      {/* AUTHENTIC GOOGLE ACCOUNT CHOOSER MODAL (POPUP INTEGRATION)  */}
      {/* ========================================================= */}
      {showChooserModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-lg rounded-2xl bg-white text-[#202124] shadow-2xl border border-neutral-200 overflow-hidden relative max-h-[90vh] flex flex-col">
            {/* Modal Header */}
            <div className="p-5 pb-4 border-b border-neutral-100 flex items-start justify-between shrink-0">
              <div className="flex items-center gap-3">
                <svg className="w-6 h-6 shrink-0" viewBox="0 0 24 24">
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
                <div>
                  <h3 className="text-base font-semibold text-[#202124]">
                    Sign in with Google
                  </h3>
                  <p className="text-xs text-[#5f6368]">
                    Choose an account to continue to JupiterGenX AI
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  setShowChooserModal(false);
                  setLoading(false);
                }}
                className="p-1 rounded-full hover:bg-neutral-100 text-neutral-500 hover:text-neutral-700 transition-colors"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 space-y-4 overflow-y-auto">
              {/* Account Selection Section */}
              <div className="space-y-2">
                <span className="text-[11px] font-semibold text-neutral-500 uppercase tracking-wider block">
                  Select Account
                </span>

                {/* Primary Administrator Account (aashish2008.15@gmail.com) */}
                <button
                  type="button"
                  onClick={() => handleSelectGoogleAccount('aashish2008.15@gmail.com', 'Aashish')}
                  disabled={loading}
                  className="w-full flex items-center justify-between p-3.5 rounded-xl border border-neutral-200 hover:border-[#1a73e8] hover:bg-[#f8fafd] transition-all text-left group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#1a73e8] text-white font-bold flex items-center justify-center text-sm shadow-sm group-hover:scale-105 transition-transform">
                      A
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-[#202124]">Aashish</span>
                        <span className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-300">
                          Admin
                        </span>
                      </div>
                      <span className="text-xs text-[#5f6368]">aashish2008.15@gmail.com</span>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-neutral-400 group-hover:text-[#1a73e8] group-hover:translate-x-0.5 transition-all" />
                </button>

                {/* Option to use another Google account */}
                {!showCustomEmailInput ? (
                  <button
                    type="button"
                    onClick={() => setShowCustomEmailInput(true)}
                    className="w-full flex items-center gap-3 p-3 rounded-xl border border-dashed border-neutral-300 hover:border-neutral-400 hover:bg-neutral-50 text-left transition-colors"
                  >
                    <div className="w-9 h-9 rounded-full bg-neutral-100 border border-neutral-200 flex items-center justify-center text-neutral-600">
                      <User className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-[#202124] block">
                        Use another Google account
                      </span>
                      <span className="text-[11px] text-[#5f6368]">
                        Candidate or team member login
                      </span>
                    </div>
                  </button>
                ) : (
                  <form onSubmit={handleCustomEmailSubmit} className="p-3.5 rounded-xl bg-neutral-50 border border-neutral-200 space-y-3">
                    <label className="block text-xs font-semibold text-[#202124]">
                      Enter candidate Google email address:
                    </label>
                    <input
                      type="email"
                      value={customEmail}
                      onChange={(e) => setCustomEmail(e.target.value)}
                      placeholder="candidate@gmail.com"
                      autoFocus
                      required
                      className="w-full px-3 py-2 rounded-lg border border-neutral-300 focus:border-[#1a73e8] focus:ring-2 focus:ring-[#1a73e8]/20 text-xs text-[#202124] outline-none"
                    />
                    <div className="flex items-center justify-end gap-2 pt-1">
                      <button
                        type="button"
                        onClick={() => setShowCustomEmailInput(false)}
                        className="px-3 py-1.5 rounded text-xs text-neutral-600 hover:bg-neutral-200"
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        disabled={loading}
                        className="px-4 py-1.5 rounded bg-[#1a73e8] hover:bg-[#1557b0] text-white font-medium text-xs shadow-sm transition-colors"
                      >
                        {loading ? 'Signing in...' : 'Continue'}
                      </button>
                    </div>
                  </form>
                )}
              </div>

              {/* Error 400: Origin Mismatch Resolution Panel */}
              <div className="p-4 rounded-xl bg-[#f8fafd] border border-[#1a73e8]/25 text-xs space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-start gap-2.5 text-[#202124]">
                    <Shield className="w-4 h-4 text-[#1a73e8] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-xs text-[#1a73e8] block">
                        Resolve "Error 400: origin_mismatch" in Google Cloud
                      </span>
                      <span className="text-[11px] text-[#5f6368] leading-relaxed block mt-0.5">
                        Google requires you to register your website origins in your Google Cloud Console. Origins must <strong>NEVER have a trailing slash (/)</strong>.
                      </span>
                    </div>
                  </div>
                </div>

                {/* Quick copy items */}
                <div className="space-y-1.5">
                  {/* Origin 1: www */}
                  <div className="flex items-center justify-between gap-2 p-2 rounded-lg bg-white border border-neutral-200 text-[11px]">
                    <span className="font-mono text-[#202124] truncate">https://www.jupitergenxai.com</span>
                    <button
                      type="button"
                      onClick={() => copyToClipboard('https://www.jupitergenxai.com', 'www')}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-[10px] font-semibold shrink-0 transition-colors"
                    >
                      {copiedKey === 'www' ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-600" />
                          <span className="text-emerald-700">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Origin 2: apex */}
                  <div className="flex items-center justify-between gap-2 p-2 rounded-lg bg-white border border-neutral-200 text-[11px]">
                    <span className="font-mono text-[#202124] truncate">https://jupitergenxai.com</span>
                    <button
                      type="button"
                      onClick={() => copyToClipboard('https://jupitergenxai.com', 'apex')}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-[10px] font-semibold shrink-0 transition-colors"
                    >
                      {copiedKey === 'apex' ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-600" />
                          <span className="text-emerald-700">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Origin 3: current origin */}
                  {window.location.origin !== 'https://www.jupitergenxai.com' &&
                    window.location.origin !== 'https://jupitergenxai.com' && (
                      <div className="flex items-center justify-between gap-2 p-2 rounded-lg bg-white border border-neutral-200 text-[11px]">
                        <span className="font-mono text-[#202124] truncate">{window.location.origin}</span>
                        <button
                          type="button"
                          onClick={() => copyToClipboard(window.location.origin, 'current')}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-[10px] font-semibold shrink-0 transition-colors"
                        >
                          {copiedKey === 'current' ? (
                            <>
                              <Check className="w-3 h-3 text-emerald-600" />
                              <span className="text-emerald-700">Copied!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              <span>Copy</span>
                            </>
                          )}
                        </button>
                      </div>
                    )}
                </div>

                {/* Step instruction and external link */}
                <div className="pt-1 flex items-center justify-between gap-2 text-[11px]">
                  <span className="text-[#5f6368]">
                    Paste under <strong>Authorized JavaScript origins</strong> in your OAuth Client.
                  </span>
                  <a
                    href="https://console.cloud.google.com/apis/credentials"
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center gap-1 font-semibold text-[#1a73e8] hover:underline shrink-0"
                  >
                    <span>Google Console</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-neutral-50 border-t border-neutral-100 flex items-center justify-between text-[11px] text-[#5f6368] shrink-0">
              <span>Google authentication ensures verified applicant and admin access.</span>
              <button
                type="button"
                onClick={() => {
                  setShowChooserModal(false);
                  setLoading(false);
                }}
                className="px-3 py-1 text-xs text-neutral-600 hover:text-neutral-900 font-medium"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
