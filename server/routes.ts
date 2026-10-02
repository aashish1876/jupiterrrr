import { Router, Request, Response } from 'express';
import { db } from './db';
import {
  authenticateMiddleware,
  requireAuth,
  requireAdmin,
  verifyGoogleIdToken,
  isEmailAuthorizedAdmin,
  createSessionToken,
  getAuthorizedAdminEmails,
} from './auth';
import { AuthUser, ApplicationStatus, OpportunityStatus } from './types';

export const apiRouter = Router();

apiRouter.use(authenticateMiddleware);

// ==========================================
// AUTHENTICATION ROUTES
// ==========================================

/**
 * GET /api/auth/me
 * Returns current authenticated user state and role
 */
apiRouter.get('/auth/me', (req: Request, res: Response) => {
  if (!req.user) {
    res.json({
      authenticated: false,
      user: null,
    });
    return;
  }

  res.json({
    authenticated: true,
    user: req.user,
  });
});

/**
 * GET /api/auth/config
 * Returns public Google Client ID for frontend button initialization
 */
apiRouter.get('/auth/config', (_req: Request, res: Response) => {
  const clientId = process.env.GOOGLE_CLIENT_ID || process.env.VITE_GOOGLE_CLIENT_ID || '';
  res.json({
    googleClientId: clientId,
    hasConfiguredAdmins: getAuthorizedAdminEmails().length > 0,
  });
});

/**
 * POST /api/auth/google
 * Authenticates user via Google Identity Services ID token
 */
apiRouter.post('/auth/google', async (req: Request, res: Response) => {
  try {
    const { credential, devEmail, devName } = req.body;

    let email = '';
    let name = '';
    let picture: string | undefined = undefined;
    let isEmailVerified = false;
    let userId = '';

    if (credential) {
      // Production Google ID Token verification
      const verified = await verifyGoogleIdToken(credential);
      if (!verified) {
        res.status(401).json({
          success: false,
          error: 'Invalid or expired Google credential.',
        });
        return;
      }
      email = verified.email;
      name = verified.name;
      picture = verified.picture;
      isEmailVerified = verified.email_verified;
      userId = `google_${verified.sub}`;
    } else if (devEmail) {
      // Development mode authentication for testing environments
      const normalizedEmail = devEmail.trim().toLowerCase();
      email = normalizedEmail;
      name = devName || normalizedEmail.split('@')[0];
      isEmailVerified = true;
      userId = `usr_${Buffer.from(email).toString('hex').slice(0, 16)}`;
    } else {
      res.status(400).json({
        success: false,
        error: 'Missing Google credential.',
      });
      return;
    }

    const isAdmin = isEmailAuthorizedAdmin(email) && isEmailVerified;

    const authUser: AuthUser = {
      id: userId,
      email,
      name,
      picture,
      isAdmin,
      isEmailVerified,
    };

    const token = createSessionToken(authUser);

    // Set secure httpOnly cookie
    res.cookie('jgx_auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.json({
      success: true,
      user: authUser,
      token,
    });
  } catch (err) {
    console.error('[Auth Error]', err);
    res.status(500).json({
      success: false,
      error: 'Authentication failed. Please try again.',
    });
  }
});

/**
 * POST /api/auth/logout
 */
apiRouter.post('/auth/logout', (_req: Request, res: Response) => {
  res.clearCookie('jgx_auth_token');
  res.json({ success: true, message: 'Logged out successfully.' });
});

// ==========================================
// CAREER OPPORTUNITIES ROUTES
// ==========================================

/**
 * GET /api/careers
 * Public users get active OPEN opportunities.
 * Authenticated admins get all opportunities with applicant counts.
 */
apiRouter.get('/careers', (req: Request, res: Response) => {
  const isAdmin = req.user?.isAdmin === true;

  if (isAdmin) {
    const opps = db.getOpportunities(true);
    // Enrich with database applicant count
    const enriched = opps.map((opp) => ({
      ...opp,
      applicantCount: db.getApplicantCountForOpportunity(opp.id),
    }));
    res.json({ success: true, opportunities: enriched });
    return;
  }

  // Public/applicant: only OPEN opportunities without applicant count
  const publicOpps = db.getOpportunities(false);
  res.json({ success: true, opportunities: publicOpps });
});

/**
 * GET /api/careers/:id
 */
apiRouter.get('/careers/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const opp = db.getOpportunityById(id);

  if (!opp) {
    res.status(404).json({ success: false, error: 'Opportunity not found.' });
    return;
  }

  const isAdmin = req.user?.isAdmin === true;
  if (!isAdmin && opp.status !== 'OPEN') {
    res.status(404).json({ success: false, error: 'Opportunity is no longer available.' });
    return;
  }

  if (isAdmin) {
    res.json({
      success: true,
      opportunity: {
        ...opp,
        applicantCount: db.getApplicantCountForOpportunity(opp.id),
      },
    });
    return;
  }

  res.json({ success: true, opportunity: opp });
});

/**
 * POST /api/careers
 * ADMIN ONLY: Create career opportunity
 */
apiRouter.post('/careers', requireAdmin, (req: Request, res: Response) => {
  const {
    title,
    department,
    location,
    employmentType,
    experienceLevel,
    description,
    responsibilities,
    requirements,
    skills,
    deadline,
    status,
  } = req.body;

  if (!title || !department || !location || !description) {
    res.status(400).json({
      success: false,
      error: 'Title, department, location, and description are required.',
    });
    return;
  }

  const newOpp = db.createOpportunity({
    title: String(title).trim(),
    department: String(department).trim(),
    location: String(location).trim(),
    employmentType: employmentType || 'Full-time',
    experienceLevel: experienceLevel || 'Mid-Level',
    description: String(description).trim(),
    responsibilities: Array.isArray(responsibilities) ? responsibilities : [],
    requirements: Array.isArray(requirements) ? requirements : [],
    skills: Array.isArray(skills) ? skills : [],
    deadline: deadline || '',
    status: (status as OpportunityStatus) || 'OPEN',
    createdBy: req.user!.email,
  });

  res.status(201).json({
    success: true,
    opportunity: {
      ...newOpp,
      applicantCount: 0,
    },
  });
});

/**
 * PATCH /api/careers/:id
 * ADMIN ONLY: Edit or update status
 */
apiRouter.patch('/careers/:id', requireAdmin, (req: Request, res: Response) => {
  const { id } = req.params;
  const existing = db.getOpportunityById(id);
  if (!existing) {
    res.status(404).json({ success: false, error: 'Opportunity not found.' });
    return;
  }

  const updated = db.updateOpportunity(id, req.body);
  res.json({
    success: true,
    opportunity: {
      ...updated,
      applicantCount: db.getApplicantCountForOpportunity(id),
    },
  });
});

/**
 * DELETE /api/careers/:id
 * ADMIN ONLY: Delete opportunity
 */
apiRouter.delete('/careers/:id', requireAdmin, (req: Request, res: Response) => {
  const { id } = req.params;
  const deleted = db.deleteOpportunity(id);
  if (!deleted) {
    res.status(404).json({ success: false, error: 'Opportunity not found.' });
    return;
  }

  res.json({ success: true, message: 'Opportunity deleted successfully.' });
});

// ==========================================
// APPLICATION ROUTES
// ==========================================

/**
 * POST /api/applications
 * Public or Authenticated Applicant applies for an opportunity
 */
apiRouter.post('/applications', async (req: Request, res: Response) => {
  try {
    const {
      careerId,
      applicantName,
      applicantEmail,
      phone,
      resume,
      coverLetter,
      linkedin,
      portfolio,
    } = req.body;

    if (!careerId || !applicantName || !applicantEmail) {
      res.status(400).json({
        success: false,
        error: 'Career ID, full name, and email address are required.',
      });
      return;
    }

    const opp = db.getOpportunityById(careerId);
    if (!opp) {
      res.status(404).json({ success: false, error: 'Career opportunity not found.' });
      return;
    }

    if (opp.status !== 'OPEN') {
      res.status(400).json({
        success: false,
        error: 'This career opportunity is no longer open for applications.',
      });
      return;
    }

    const normalizedEmail = String(applicantEmail).trim().toLowerCase();
    const userId = req.user?.id || `anon_${Buffer.from(normalizedEmail).toString('hex').slice(0, 16)}`;

    // DUPLICATE APPLICATION CHECK:
    // Check if an application already exists for this careerId from this email
    const existing = db.getApplications({
      careerId,
      applicantEmail: normalizedEmail,
    });

    if (existing.length > 0) {
      res.status(409).json({
        success: false,
        error: 'You have already submitted an application for this opportunity.',
      });
      return;
    }

    const application = db.createApplication({
      careerId,
      careerTitle: opp.title,
      applicantUserId: userId,
      applicantName: String(applicantName).trim(),
      applicantEmail: normalizedEmail,
      phone: phone ? String(phone).trim() : '',
      resume: resume ? String(resume).trim() : '',
      coverLetter: coverLetter ? String(coverLetter).trim() : '',
      linkedin: linkedin ? String(linkedin).trim() : '',
      portfolio: portfolio ? String(portfolio).trim() : '',
    });

    res.status(201).json({
      success: true,
      message: 'Your application has been received successfully.',
      application: {
        id: application.id,
        careerId: application.careerId,
        careerTitle: application.careerTitle,
        status: application.status,
        submittedAt: application.submittedAt,
      },
    });
  } catch (err) {
    console.error('[Application Submit Error]', err);
    res.status(500).json({
      success: false,
      error: 'Failed to submit application. Please try again.',
    });
  }
});

/**
 * GET /api/applications/my
 * Authenticated Applicant: returns their own submitted applications
 */
apiRouter.get('/applications/my', requireAuth, (req: Request, res: Response) => {
  const user = req.user!;
  const myApplications = db.getApplications({
    applicantEmail: user.email,
  });

  // Return only safe applicant view
  const safeList = myApplications.map((app) => ({
    id: app.id,
    careerId: app.careerId,
    careerTitle: app.careerTitle,
    applicantName: app.applicantName,
    applicantEmail: app.applicantEmail,
    status: app.status,
    submittedAt: app.submittedAt,
    updatedAt: app.updatedAt,
  }));

  res.json({ success: true, applications: safeList });
});

/**
 * GET /api/applications/opportunity/:careerId
 * ADMIN ONLY: returns list of applications for a specific opportunity
 */
apiRouter.get(
  '/applications/opportunity/:careerId',
  requireAdmin,
  (req: Request, res: Response) => {
    const { careerId } = req.params;
    const opp = db.getOpportunityById(careerId);
    if (!opp) {
      res.status(404).json({ success: false, error: 'Opportunity not found.' });
      return;
    }

    const applications = db.getApplications({ careerId });
    res.json({
      success: true,
      opportunity: opp,
      applications,
    });
  }
);

/**
 * GET /api/applications/:id
 * CRITICAL REQUIREMENT 15:
 * When an authorized admin opens an application:
 * 1. Verify admin authentication
 * 2. Verify admin authorization
 * 3. Fetch application
 * 4. If status == SUBMITTED:
 *      update status to UNDER_REVIEW
 * 5. Set:
 *      reviewedAt
 *      reviewedBy
 * 6. Return application data
 *
 * If requested by an applicant:
 * Only permitted if application.applicantUserId === req.user.id || application.applicantEmail === req.user.email
 * (Does NOT trigger review)
 */
apiRouter.get('/applications/:id', requireAuth, (req: Request, res: Response) => {
  const { id } = req.params;
  const user = req.user!;
  const app = db.getApplicationById(id);

  if (!app) {
    res.status(404).json({ success: false, error: 'Application not found.' });
    return;
  }

  // Check if Admin
  if (user.isAdmin) {
    // CRITICAL: Auto-mark as UNDER_REVIEW if status is SUBMITTED
    const updated = db.markApplicationUnderReview(id, user.email);
    res.json({
      success: true,
      application: updated || app,
    });
    return;
  }

  // Check if Owner Applicant
  const isOwner =
    app.applicantUserId === user.id ||
    app.applicantEmail.toLowerCase() === user.email.toLowerCase();

  if (!isOwner) {
    res.status(403).json({
      success: false,
      error: 'You do not have permission to view this application.',
    });
    return;
  }

  // Applicant viewing their own application
  res.json({
    success: true,
    application: app,
  });
});

/**
 * PATCH /api/applications/:id/status
 * ADMIN ONLY: Change application status
 */
apiRouter.patch('/applications/:id/status', requireAdmin, (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;

  const validStatuses: ApplicationStatus[] = [
    'SUBMITTED',
    'UNDER_REVIEW',
    'SHORTLISTED',
    'REJECTED',
    'HIRED',
  ];

  if (!status || !validStatuses.includes(status)) {
    res.status(400).json({
      success: false,
      error: `Invalid status. Valid values: ${validStatuses.join(', ')}`,
    });
    return;
  }

  const updated = db.updateApplicationStatus(id, status as ApplicationStatus, req.user!.email);
  if (!updated) {
    res.status(404).json({ success: false, error: 'Application not found.' });
    return;
  }

  res.json({
    success: true,
    application: updated,
  });
});
