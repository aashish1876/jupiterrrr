import { Request, Response, NextFunction } from 'express';
import crypto from 'crypto';
import { OAuth2Client } from 'google-auth-library';
import { AuthUser } from './types';

const SESSION_SECRET =
  process.env.SESSION_SECRET ||
  'jupitergenx_enterprise_careers_secret_key_849204910284729103847219';

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || process.env.VITE_GOOGLE_CLIENT_ID || '';

const googleClient = new OAuth2Client(GOOGLE_CLIENT_ID);

const DEFAULT_ADMIN_EMAILS = [
  'aashish2008.15@gmail.com',
  'anil.yanamala24@gmail.com',
  'admin@jupitergenx.ai',
];

/**
 * Parses and normalizes the administrator allowlist from ADMIN_EMAILS environment variable.
 */
export function getAuthorizedAdminEmails(): string[] {
  const envVal = process.env.ADMIN_EMAILS || '';
  const fromEnv = envVal
    .split(',')
    .map((e) => e.trim().toLowerCase())
    .filter((e) => e.length > 0);

  const combined = new Set([...DEFAULT_ADMIN_EMAILS, ...fromEnv]);
  return Array.from(combined);
}

/**
 * Checks if a verified email is in the authorized admin allowlist.
 */
export function isEmailAuthorizedAdmin(email: string): boolean {
  if (!email) return false;
  const normalized = email.trim().toLowerCase();
  const allowlist = getAuthorizedAdminEmails();
  return allowlist.includes(normalized);
}

// Token creation using Node.js crypto HMAC-SHA256
export function createSessionToken(user: AuthUser, expiresInHours = 24): string {
  const payload = {
    ...user,
    exp: Math.floor(Date.now() / 1000) + expiresInHours * 3600,
  };
  const body = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const signature = crypto
    .createHmac('sha256', SESSION_SECRET)
    .update(body)
    .digest('base64url');
  return `${body}.${signature}`;
}

export function verifySessionToken(token: string): AuthUser | null {
  try {
    if (!token || typeof token !== 'string') return null;
    const parts = token.split('.');
    if (parts.length !== 2) return null;

    const [body, signature] = parts;
    const expectedSignature = crypto
      .createHmac('sha256', SESSION_SECRET)
      .update(body)
      .digest('base64url');

    if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature))) {
      return null;
    }

    const payload = JSON.parse(Buffer.from(body, 'base64url').toString('utf-8'));
    if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) {
      return null; // Expired
    }

    // Always re-verify admin status against the current ADMIN_EMAILS allowlist server-side!
    const isNowAdmin = isEmailAuthorizedAdmin(payload.email);

    return {
      id: payload.id,
      email: payload.email,
      name: payload.name,
      picture: payload.picture,
      isAdmin: isNowAdmin && Boolean(payload.isEmailVerified),
      isEmailVerified: Boolean(payload.isEmailVerified),
    };
  } catch (err) {
    return null;
  }
}

/**
 * Verifies a Google ID token from Google Identity Services.
 */
export async function verifyGoogleIdToken(idToken: string): Promise<{
  email: string;
  name: string;
  sub: string;
  picture?: string;
  email_verified: boolean;
} | null> {
  try {
    // If GOOGLE_CLIENT_ID is configured, verify with audience
    if (GOOGLE_CLIENT_ID) {
      const ticket = await googleClient.verifyIdToken({
        idToken,
        audience: GOOGLE_CLIENT_ID,
      });
      const payload = ticket.getPayload();
      if (!payload || !payload.email) return null;
      return {
        email: payload.email,
        name: payload.name || payload.email.split('@')[0],
        sub: payload.sub,
        picture: payload.picture,
        email_verified: Boolean(payload.email_verified),
      };
    } else {
      // Fallback: Verify token directly against Google's public tokeninfo endpoint
      const response = await fetch(
        `https://oauth2.googleapis.com/tokeninfo?id_token=${encodeURIComponent(idToken)}`
      );
      if (!response.ok) return null;
      const data = await response.json();
      if (!data.email) return null;
      return {
        email: data.email,
        name: data.name || data.email.split('@')[0],
        sub: data.sub,
        picture: data.picture,
        email_verified: data.email_verified === 'true' || data.email_verified === true,
      };
    }
  } catch (err) {
    console.error('[Auth] Failed to verify Google ID token:', err);
    return null;
  }
}

// Extend Express Request
declare global {
  namespace Express {
    interface Request {
      user?: AuthUser;
    }
  }
}

/**
 * Extracts and verifies auth token from cookie or Authorization header
 */
export function authenticateMiddleware(
  req: Request,
  _res: Response,
  next: NextFunction
): void {
  let token: string | undefined;

  // 1. Check Authorization Bearer header
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.substring(7);
  }

  // 2. Check cookie
  if (!token && req.cookies && req.cookies.jgx_auth_token) {
    token = req.cookies.jgx_auth_token;
  }

  if (token) {
    const verifiedUser = verifySessionToken(token);
    if (verifiedUser) {
      req.user = verifiedUser;
    }
  }

  next();
}

/**
 * Middleware: Requires any authenticated user (Admin or Applicant)
 */
export function requireAuth(req: Request, res: Response, next: NextFunction): void {
  if (!req.user) {
    res.status(401).json({
      success: false,
      error: 'Authentication required. Please sign in to continue.',
    });
    return;
  }
  next();
}

/**
 * Middleware: Strictly requires verified ADMIN authorization.
 * Rejects with exact requirement copy if not authorized.
 */
export function requireAdmin(req: Request, res: Response, next: NextFunction): void {
  if (!req.user) {
    res.status(401).json({
      success: false,
      error: 'Authentication required. Please sign in with an authorized Google account.',
    });
    return;
  }

  if (!req.user.isEmailVerified) {
    res.status(403).json({
      success: false,
      error: 'Google email verification is required for administrative access.',
    });
    return;
  }

  if (!req.user.isAdmin || !isEmailAuthorizedAdmin(req.user.email)) {
    res.status(403).json({
      success: false,
      error: 'Your account is not authorized to access the Careers Admin Dashboard.',
    });
    return;
  }

  next();
}
