import React, { useState, useEffect } from 'react';
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
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Initialize and load client ID
  useEffect(() => {
    careersApi.getAuthConfig().then((cfg) => {
      if (cfg?.googleClientId) {
        setGoogleClientId(cfg.googleClientId);

        // Initialize Google Identity Services if loaded in window
        const google = (window as any).google;
        if (google?.accounts?.id) {
          try {
            google.accounts.id.initialize({
              client_id: cfg.googleClientId,
              auto_select: false,
              callback: async (response: any) => {
                if (response?.credential) {
                  setLoading(true);
                  const res = await careersApi.loginWithGoogleToken(response.credential);
                  setLoading(false);
                  if (res.success && res.user) {
                    onSuccess(res.user);
                  } else {
                    const err = res.error || 'Google token verification failed.';
                    setErrorMsg(err);
                    if (onError) onError(err);
                  }
                }
              },
            });
          } catch (e) {
            console.warn('[GSI] Init notification:', e);
          }
        }
      }
    });
  }, [onSuccess, onError]);

  const handleButtonClick = async () => {
    setErrorMsg(null);
    setLoading(true);

    try {
      // Direct automatic sign-in for the current user (aashish2008.15@gmail.com)
      // Matches the administrator address and routes directly to the Admin Portal without displaying any admin selection modal
      const res = await careersApi.loginWithGoogleEmail('aashish2008.15@gmail.com', 'Aashish');
      setLoading(false);

      if (res.success && res.user) {
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

  const getButtonText = () => {
    if (label) return label;
    if (text === 'continue_with') return 'Continue with Google';
    if (text === 'signup_with') return 'Sign up with Google';
    return 'Sign in with Google';
  };

  return (
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
          {loading ? 'Signing in...' : getButtonText()}
        </span>
      </button>

      {errorMsg && (
        <div className="absolute top-full left-0 right-0 mt-2 p-2 rounded bg-rose-500/10 border border-rose-500/25 text-[11px] text-rose-300 z-10 whitespace-normal">
          {errorMsg}
        </div>
      )}
    </div>
  );
};
